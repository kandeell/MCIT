using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using Terrasoft.Core;
using Terrasoft.Core.DB;

namespace Terrasoft.Configuration {
    // Invoked only after all VM items have been provisioned. This class never starts a process.
    public sealed class UsrMCITAtomicCommitmentService {
        private readonly UserConnection _uc;
        private static readonly Guid PendingProvisioning = new Guid("d16b6935-b617-41c3-9acd-08b4034ab2a8");
        private static readonly Guid ProvisioningInProgress = new Guid("6a672c37-8140-45c6-aea7-a2e82a7e55e3");
        private static readonly Guid Completed = new Guid("6fd13800-6f13-4515-b803-8b86d4a5ee6d");
        private static readonly Guid Provisioned = new Guid("bf38ce52-dd76-41f3-8338-a78b42c3daa4");

        private sealed class Item {
            internal Guid Id;
            internal Guid VmId;
            internal Guid ResourceRateId;
            internal decimal Points;
            internal decimal Amount;
        }

        public UsrMCITAtomicCommitmentService(UserConnection uc) {
            _uc = uc ?? throw new ArgumentNullException(nameof(uc));
        }

        // The caller supplies the process log owner, not an arbitrary charge or pricing snapshot.
        public bool CommitProvisionedRequest(Guid requestId, Guid initiatingContactId) {
            if (requestId == Guid.Empty || initiatingContactId == Guid.Empty ||
                _uc.CurrentUser == null || _uc.CurrentUser.ContactId != initiatingContactId)
                throw new UnauthorizedAccessException("Commitment initiator cannot be verified.");
            UsrMCITScreenAccess.Demand(_uc, "REQUEST_QUEUE", "Edit");
            // Script tasks may execute with elevated security. Check the initiator's
            // explicit MCIT role grant rather than relying on the admin shortcut.
            using (var permissionDb = _uc.EnsureDBConnection()) {
                var roleStatusColumn = _uc.EntitySchemaManager
                    .GetInstanceByName("UsrMCITRole").Columns
                    .FirstOrDefault(c => c.Name == "UsrMCITRoleStatuses");
                if (roleStatusColumn == null || roleStatusColumn.ReferenceSchema == null ||
                    roleStatusColumn.ReferenceSchema.PrimaryDisplayColumn == null)
                    throw new UnauthorizedAccessException("MCIT role status cannot be verified.");
                var statusSchema = roleStatusColumn.ReferenceSchema;
                var activeStatusQuery = new Select(_uc);
                activeStatusQuery.Column("Id").From(statusSchema.Name)
                    .Where(statusSchema.PrimaryDisplayColumn.Name)
                    .IsEqual(Column.Parameter("Active"));
                var activeStatusId = activeStatusQuery.ExecuteScalar<Guid>(permissionDb);
                if (activeStatusId == Guid.Empty)
                    throw new UnauthorizedAccessException("Active MCIT role status is missing.");
                var directGrant = new CustomQuery(_uc, @"
SELECT COUNT(*) FROM dbo.UsrMCITRoleScreenPermission p
JOIN dbo.UsrMCITPermissionScreen s ON s.Id=p.UsrScreenId
JOIN dbo.UsrMCITRole r ON r.Id=p.UsrMCITRoleId
JOIN dbo.SysUserInRole ur ON ur.SysRoleId=r.UsrRoleId AND ur.SysUserId=@UserId
JOIN dbo.SysAdminUnit au ON au.Id=r.UsrRoleId AND au.Active=1
WHERE s.UsrScreenCode=N'REQUEST_QUEUE' AND s.UsrIsActive=1
 AND p.UsrCanView=1 AND p.UsrCanEdit=1
 AND r.UsrMCITRoleStatusesId=@ActiveStatusId")
                    .WithParameter("UserId", _uc.CurrentUser.Id)
                    .WithParameter("ActiveStatusId", activeStatusId)
                    .ExecuteScalar<int>(permissionDb);
                if (directGrant < 1)
                    throw new UnauthorizedAccessException("Initiator has no active MCIT request edit grant.");
            }
            var rights = _uc.DBSecurityEngine.GetEntitySchemaOperationsRightLevel(
                _uc.CurrentUser.Id, "UsrVMRequest");
            if ((rights & Terrasoft.Core.DB.SchemaOperationRightLevels.CanEdit) == 0)
                throw new UnauthorizedAccessException("Request edit right is required.");
            foreach (var schemaName in new[] {
                "UsrPointTransaction", "UsrPointAllocation", "UsrFinancialTransaction" }) {
                var create = _uc.DBSecurityEngine.GetEntitySchemaOperationsRightLevel(
                    _uc.CurrentUser.Id, schemaName);
                if ((create & Terrasoft.Core.DB.SchemaOperationRightLevels.CanAppend) == 0)
                    throw new UnauthorizedAccessException("Ledger create right is required.");
            }

            Guid contractId = Guid.Empty;
            var points = new UsrMCITPointsConsumptionService(_uc);
            using (var db = _uc.EnsureDBConnection()) {
                db.StartTransaction(IsolationLevel.Serializable);
                try {
                    Guid versionId, currencyId = Guid.Empty;
                    Guid statusId;
                    using (var reader = new CustomQuery(_uc, @"
SELECT UsrContractId, UsrConfigVersionId, UsrStatusId,
       UsrTargetVirtualMachineId
FROM dbo.UsrVMRequest WITH (UPDLOCK,HOLDLOCK) WHERE Id=@RequestId")
                            .WithParameter("RequestId", requestId).ExecuteReader(db)) {
                        if (!reader.Read() || reader.IsDBNull(0) || reader.IsDBNull(1) || reader.IsDBNull(2))
                            throw new InvalidOperationException("Request lacks contract, version or status.");
                        contractId = reader.GetGuid(0);
                        versionId = reader.GetGuid(1);
                        statusId = reader.GetGuid(2);
                        // Resize must use a dedicated incremental commitment path.
                        if (!reader.IsDBNull(3) &&
                            reader.GetGuid(3) != Guid.Empty) {
                            throw new InvalidOperationException(
                                "Resize requests require the dedicated resize commitment path.");
                        }
                    }
                    if (contractId == Guid.Empty || versionId == Guid.Empty ||
                        !UsrMCITDataScopeRuntime.ReadAuthorizedContractIds(_uc).Contains(contractId))
                        throw new UnauthorizedAccessException("Contract scope denied.");
                    var recordRights = _uc.DBSecurityEngine.GetEntitySchemaRecordRightLevel(
                        _uc.CurrentUser.Id, "UsrVMRequest", requestId);
                    if ((recordRights & Terrasoft.Core.DB.SchemaRecordRightLevels.CanEdit) == 0)
                        throw new UnauthorizedAccessException("Request record edit right is required.");

                    // The consumption and expiry services use the same transaction-owned contract lock.
                    int lockResult = new CustomQuery(_uc, @"
DECLARE @Result int;
EXEC @Result=sys.sp_getapplock
 @Resource=@LockName, @LockMode='Exclusive', @LockOwner='Transaction', @LockTimeout=15000;
SELECT @Result")
                        .WithParameter("LockName", "MCIT-Consume-" + contractId)
                        .ExecuteScalar<int>(db);
                    if (lockResult < 0)
                        throw new InvalidOperationException("Contract commitment is already in progress.");

                    var items = new List<Item>();
                    decimal totalAmount = 0;
                    using (var reader = new CustomQuery(_uc, @"
SELECT i.Id, i.UsrTotalPointsSnapshot, i.UsrTotalAmountSnapshot,
       i.UsrConfigVersionId, i.UsrCurrencyId, i.UsrProvisioningStatusId,
       i.UsrResourceRateId, vm.Id
FROM dbo.UsrVMRequestItem i WITH (UPDLOCK,HOLDLOCK)
OUTER APPLY (
  SELECT TOP (1) v.Id FROM dbo.UsrVirtualMachine v WITH (UPDLOCK,HOLDLOCK)
  WHERE v.UsrSourceRequestItemId=i.Id AND v.UsrContractId=@ContractId
  ORDER BY v.Id
) vm
WHERE i.UsrRequestId=@RequestId ORDER BY i.Id")
                            .WithParameter("RequestId", requestId)
                            .WithParameter("ContractId", contractId).ExecuteReader(db)) {
                        while (reader.Read()) {
                            if (reader.IsDBNull(1) || reader.IsDBNull(2) || reader.IsDBNull(3) ||
                                reader.IsDBNull(4) || reader.IsDBNull(5) || reader.IsDBNull(7) ||
                                reader.GetGuid(3) != versionId || reader.GetGuid(5) != Provisioned)
                                throw new InvalidOperationException("An item is not provisioned or its approved snapshot is incomplete.");
                            var item = new Item {
                                Id = reader.GetGuid(0), Points = reader.GetDecimal(1),
                                Amount = reader.GetDecimal(2), VmId = reader.GetGuid(7),
                                ResourceRateId = reader.IsDBNull(6) ? Guid.Empty : reader.GetGuid(6)
                            };
                            if (item.Points < 0 || item.Amount < 0 || item.VmId == Guid.Empty)
                                throw new InvalidOperationException("Item points, amount or VM is invalid.");
                            if (reader.GetGuid(4) == Guid.Empty ||
                                (currencyId != Guid.Empty && reader.GetGuid(4) != currencyId))
                                throw new InvalidOperationException("Mixed pricing currencies.");
                            currencyId = reader.GetGuid(4);
                            totalAmount += item.Amount;
                            items.Add(item);
                        }
                    }
                    if (items.Count == 0)
                        throw new InvalidOperationException("Request has no approved item snapshots.");
                    int duplicateVMs = new CustomQuery(_uc, @"
SELECT COUNT(*) FROM dbo.UsrVMRequestItem i
WHERE i.UsrRequestId=@RequestId AND
 (SELECT COUNT(*) FROM dbo.UsrVirtualMachine v
  WHERE v.UsrSourceRequestItemId=i.Id AND v.UsrContractId=@ContractId)<>1")
                        .WithParameter("RequestId", requestId)
                        .WithParameter("ContractId", contractId).ExecuteScalar<int>(db);
                    if (duplicateVMs != 0)
                        throw new InvalidOperationException("VM inventory is missing or duplicated for an item.");

                    // Add-on snapshots are explicit monetary charges. The installed add-on row has no points column.
                    using (var reader = new CustomQuery(_uc, @"
SELECT a.UsrRequestItemId, a.UsrConfigVersionId, a.UsrCurrencyId,
       a.UsrQuantity, a.UsrUnitPriceSnapshot, a.UsrTotalAmountSnapshot,
       r.UsrConfigVersionId, r.UsrCurrencyId
FROM dbo.UsrVMRequestItemAddOn a WITH (UPDLOCK,HOLDLOCK)
JOIN dbo.UsrVMRequestItem i ON i.Id=a.UsrRequestItemId AND i.UsrRequestId=@RequestId
LEFT JOIN dbo.UsrConfigAddOnRate r ON r.Id=a.UsrConfigAddOnRateId")
                            .WithParameter("RequestId", requestId).ExecuteReader(db)) {
                        while (reader.Read()) {
                            if (reader.IsDBNull(1) || reader.IsDBNull(2) || reader.IsDBNull(3) ||
                                reader.IsDBNull(4) || reader.IsDBNull(5) || reader.IsDBNull(6) ||
                                reader.IsDBNull(7) || reader.GetGuid(1) != versionId ||
                                reader.GetGuid(6) != versionId || reader.GetGuid(2) != currencyId ||
                                reader.GetGuid(7) != currencyId)
                                throw new InvalidOperationException("Add-on version or currency mismatch.");
                            var qty = reader.GetDecimal(3);
                            var unit = reader.GetDecimal(4);
                            var amount = reader.GetDecimal(5);
                            if (qty <= 0 || unit < 0 || amount < 0 || qty * unit != amount)
                                throw new InvalidOperationException("Add-on pricing snapshot mismatch.");
                            var item = items.Find(x => x.Id == reader.GetGuid(0));
                            if (item == null)
                                throw new InvalidOperationException("Add-on is detached from a provisioned item.");
                            item.Amount += amount;
                            totalAmount += amount;
                        }
                    }
                    if (items.Exists(x => x.Points == 0 && x.Amount == 0))
                        throw new InvalidOperationException("An item has no configured financial or points charge.");

                    int previouslyPosted = new CustomQuery(_uc, @"
SELECT COUNT(*) FROM dbo.UsrFinancialTransaction WITH (UPDLOCK,HOLDLOCK)
WHERE UsrRequestId=@RequestId AND UsrTransactionTypeId=@ConsumptionType")
                        .WithParameter("RequestId", requestId)
                        .WithParameter("ConsumptionType", new Guid("4e5e00af-f080-40e7-aa98-b6bbcaa474ba"))
                        .ExecuteScalar<int>(db);
                    if (previouslyPosted != 0 && previouslyPosted != items.Count)
                        throw new InvalidOperationException("Incomplete prior financial commitment.");
                    if (statusId != PendingProvisioning && statusId != ProvisioningInProgress &&
                        !(statusId == Completed && previouslyPosted == items.Count))
                        throw new InvalidOperationException("Request has not reached approved provisioning completion.");
                    int approvedStages = new CustomQuery(_uc, @"
WITH latest AS (
 SELECT UsrStageId, UsrDecisionId, UsrIsCompleted, UsrDecidedById,
  ROW_NUMBER() OVER (PARTITION BY UsrStageId
   ORDER BY UsrReviewRound DESC, UsrDecidedOn DESC, Id DESC) AS rn
 FROM dbo.UsrRequestApproval WITH (UPDLOCK,HOLDLOCK)
 WHERE UsrRequestId=@RequestId AND UsrStageId IN (@FinanceStage,@TechnicalStage)
)
SELECT COUNT(*) FROM latest WHERE rn=1 AND UsrIsCompleted=1
 AND UsrDecisionId=@ApprovedDecision AND UsrDecidedById IS NOT NULL")
                        .WithParameter("RequestId", requestId)
                        .WithParameter("FinanceStage", new Guid("a7999b08-2803-4b7c-b381-d66b99089cea"))
                        .WithParameter("TechnicalStage", new Guid("49f3c5d8-4ffa-452f-872e-63309e4fcafa"))
                        .WithParameter("ApprovedDecision", new Guid("4e327a21-b74e-4a0f-8c7c-06d4da404c43"))
                        .ExecuteScalar<int>(db);
                    if (approvedStages != 2)
                        throw new InvalidOperationException("Financial and technical approval must both be current.");

                    decimal remainingBudget = new CustomQuery(_uc, @"
SELECT CAST(c.UsrInitialBudget AS decimal(18,8)) + COALESCE(SUM(
  CASE f.UsrTransactionTypeId
    WHEN '3cc409ac-186e-480f-a145-6f25acb2e34a' THEN f.UsrAmount
    WHEN '9b62fcca-8d7d-472b-bfcb-15076cd67ddd' THEN -f.UsrAmount
    WHEN '4e5e00af-f080-40e7-aa98-b6bbcaa474ba' THEN -f.UsrAmount
    ELSE 0 END),0)
FROM dbo.UsrMCITContract c WITH (UPDLOCK,HOLDLOCK)
LEFT JOIN dbo.UsrFinancialTransaction f WITH (UPDLOCK,HOLDLOCK)
 ON f.UsrContractId=c.Id
WHERE c.Id=@ContractId AND c.UsrCurrencyId=@CurrencyId
GROUP BY c.UsrInitialBudget")
                        .WithParameter("ContractId", contractId)
                        .WithParameter("CurrencyId", currencyId).ExecuteScalar<decimal>(db);
                    if (remainingBudget < 0)
                        throw new InvalidOperationException("Financial balance is inconsistent.");
                    if (previouslyPosted == 0 && remainingBudget < totalAmount)
                        throw new InvalidOperationException("Insufficient approved financial budget.");

                    foreach (var item in items) {
                        // The item Id is the stable operation key across retries.
                        int financialCount = new CustomQuery(_uc, @"
SELECT COUNT(*) FROM dbo.UsrFinancialTransaction WITH (UPDLOCK,HOLDLOCK)
WHERE UsrRequestId=@RequestId AND UsrRequestItemId=@ItemId
  AND UsrTransactionTypeId=@ConsumptionType")
                            .WithParameter("RequestId", requestId).WithParameter("ItemId", item.Id)
                            .WithParameter("ConsumptionType", new Guid("4e5e00af-f080-40e7-aa98-b6bbcaa474ba"))
                            .ExecuteScalar<int>(db);
                        if (financialCount > 1)
                            throw new InvalidOperationException("Duplicate financial item transactions.");
                        if (financialCount == 0 && previouslyPosted > 0)
                            throw new InvalidOperationException("Partial financial commitment requires reconciliation.");
                        int pointCount = new CustomQuery(_uc, @"
SELECT COUNT(*) FROM dbo.UsrPointTransaction WITH (UPDLOCK,HOLDLOCK)
WHERE UsrContractId=@ContractId AND UsrRequestId=@RequestId
 AND UsrRequestItemId=@ItemId AND UsrName=@OperationName
 AND UsrTransactionTypeId IN (
 '9714B14C-2A5F-4D72-A114-78833EF52F42',
 'DB304861-706C-4974-94AF-F337300181D0')")
                            .WithParameter("ContractId", contractId).WithParameter("RequestId", requestId)
                            .WithParameter("ItemId", item.Id)
                            .WithParameter("OperationName", "MCIT-CONSUME-" + item.Id)
                            .ExecuteScalar<int>(db);
                        if (item.Points > 0 && ((pointCount > 0) != (financialCount == 1)))
                            throw new InvalidOperationException("Point and financial posting history disagree.");
                        if (item.Points == 0 && pointCount != 0)
                            throw new InvalidOperationException("Unexpected points posted for monetary-only item.");
                        if (financialCount == 1) {
                            int exact = new CustomQuery(_uc, @"
SELECT COUNT(*) FROM dbo.UsrFinancialTransaction WITH (UPDLOCK,HOLDLOCK)
WHERE UsrRequestId=@RequestId AND UsrRequestItemId=@ItemId
 AND UsrTransactionTypeId=@ConsumptionType AND UsrName=@Name
 AND UsrAmount=@Amount AND UsrConfigVersionId=@VersionId
 AND UsrCurrencyId=@CurrencyId AND UsrContractId=@ContractId
 AND UsrVirtualMachineId=@VmId")
                                .WithParameter("RequestId", requestId).WithParameter("ItemId", item.Id)
                                .WithParameter("ConsumptionType", new Guid("4e5e00af-f080-40e7-aa98-b6bbcaa474ba"))
                                .WithParameter("Name", "MCIT-COMMIT-" + item.Id)
                                .WithParameter("Amount", item.Amount).WithParameter("VersionId", versionId)
                                .WithParameter("CurrencyId", currencyId).WithParameter("ContractId", contractId)
                                .WithParameter("VmId", item.VmId).ExecuteScalar<int>(db);
                            if (exact != 1)
                                throw new InvalidOperationException("Prior financial posting differs from approved snapshots.");
                        }
                        if (item.Points > 0) {
                            var consumption = points.PostConsumptionWithinTransaction(db,
                                contractId, requestId, item.Id, item.VmId, item.Id, item.Points);
                            if (!consumption.Success)
                                throw new InvalidOperationException("Point consumption did not succeed.");
                        }
                        if (financialCount == 0) {
                            int inserted = new CustomQuery(_uc, @"
INSERT INTO dbo.UsrFinancialTransaction
 (Id,CreatedOn,CreatedById,ModifiedOn,ModifiedById,UsrName,UsrAmount,
  UsrTransactionDate,UsrTransactionTypeId,UsrContractId,UsrRequestId,
  UsrRequestItemId,UsrConfigVersionId,UsrCurrencyId,UsrVirtualMachineId,
  UsrResourceRateId,UsrActorId,UsrReason)
VALUES (NEWID(),GETDATE(),@Actor,GETDATE(),@Actor,@Name,@Amount,
  GETDATE(),@ConsumptionType,@ContractId,@RequestId,@ItemId,
  @VersionId,@CurrencyId,@VmId,@RateId,@Actor,N'Approved VM provisioning commitment')")
                                .WithParameter("Actor", initiatingContactId)
                                .WithParameter("Name", "MCIT-COMMIT-" + item.Id)
                                .WithParameter("Amount", item.Amount)
                                .WithParameter("ConsumptionType", new Guid("4e5e00af-f080-40e7-aa98-b6bbcaa474ba"))
                                .WithParameter("ContractId", contractId).WithParameter("RequestId", requestId)
                                .WithParameter("ItemId", item.Id).WithParameter("VersionId", versionId)
                                .WithParameter("CurrencyId", currencyId).WithParameter("VmId", item.VmId)
                                .WithParameter("RateId", item.ResourceRateId == Guid.Empty ? (object)DBNull.Value : item.ResourceRateId)
                                .Execute(db);
                            if (inserted != 1)
                                throw new InvalidOperationException("Financial insert was not confirmed.");
                        }
                    }
                    db.CommitTransaction();
                } catch {
                    db.RollbackTransaction();
                    throw;
                }
            }
            // A projection refresh cannot undo a successfully committed pair of ledger writes.
            try {
                points.RefreshPreview(contractId, requestId);
            } catch (Exception refreshError) {
                System.Diagnostics.Trace.TraceError(
                    "MCIT commitment preview refresh failed for request {0}: {1}",
                    requestId, refreshError);
            }
            return true;
        }

        // Downgrade changes VM resources only. The original allocation remains
        // committed until a customer-approved restoration policy is configured.
        public bool ApplyApprovedDowngrade(Guid requestId, Guid initiatingContactId,
            Guid vmId, Guid itemId, Guid allowedTestContractId, bool restorePoints) {
            if (restorePoints)
                throw new InvalidOperationException("Downgrade point restoration is disabled pending approval.");
            if (requestId==Guid.Empty || initiatingContactId==Guid.Empty ||
                vmId==Guid.Empty || itemId==Guid.Empty || allowedTestContractId==Guid.Empty ||
                _uc.CurrentUser==null ||
                _uc.CurrentUser.ContactId!=initiatingContactId)
                throw new UnauthorizedAccessException("Downgrade initiator cannot be verified.");
            UsrMCITScreenAccess.Demand(_uc,"REQUEST_QUEUE","Edit");
            var statusColumn=_uc.EntitySchemaManager.GetInstanceByName("UsrMCITRole")
                .Columns.FirstOrDefault(c=>c.Name=="UsrMCITRoleStatuses");
            if(statusColumn==null || statusColumn.ReferenceSchema==null ||
                statusColumn.ReferenceSchema.PrimaryDisplayColumn==null)
                throw new UnauthorizedAccessException("MCIT role status cannot be established.");
            using(var permissionDb=_uc.EnsureDBConnection()) {
                var status=new Select(_uc);
                status.Column("Id").From(statusColumn.ReferenceSchema.Name)
                    .Where(statusColumn.ReferenceSchema.PrimaryDisplayColumn.Name)
                    .IsEqual(Column.Parameter("Active"));
                var active=status.ExecuteScalar<Guid>(permissionDb);
                if(active==Guid.Empty || new CustomQuery(_uc,@"
SELECT COUNT(*) FROM dbo.UsrMCITRoleScreenPermission p
JOIN dbo.UsrMCITPermissionScreen s ON s.Id=p.UsrScreenId
JOIN dbo.UsrMCITRole r ON r.Id=p.UsrMCITRoleId
JOIN dbo.SysUserInRole ur ON ur.SysRoleId=r.UsrRoleId AND ur.SysUserId=@UserId
JOIN dbo.SysAdminUnit au ON au.Id=r.UsrRoleId AND au.Active=1
WHERE s.UsrScreenCode=N'REQUEST_QUEUE' AND s.UsrIsActive=1
 AND p.UsrCanView=1 AND p.UsrCanEdit=1
 AND r.UsrMCITRoleStatusesId=@StatusId")
                    .WithParameter("UserId",_uc.CurrentUser.Id)
                    .WithParameter("StatusId",active).ExecuteScalar<int>(permissionDb)<1)
                    throw new UnauthorizedAccessException("No active downgrade permission.");
            }
            Guid contractId=Guid.Empty;
            using(var db=_uc.EnsureDBConnection()) {
                db.StartTransaction(IsolationLevel.Serializable);
                try {
                    Guid statusId;
                    int currentCpu,newCpu;
                    decimal currentRam,currentStorage,newRam,newStorage,oldPoints,newPoints,reduction;
                    using(var reader=new CustomQuery(_uc,@"
SELECT r.UsrContractId,r.UsrStatusId,
 r.UsrResizeReductionPointsPreview,i.UsrTotalPointsSnapshot,
 v.UsrAllocatedPoints,v.UsrCPU,v.UsrRAMGB,v.UsrStorageGB,
 i.UsrCPU,i.UsrRAMGB,i.UsrStorageGB
FROM dbo.UsrVMRequest r WITH(UPDLOCK,HOLDLOCK)
JOIN dbo.UsrVMRequestItem i WITH(UPDLOCK,HOLDLOCK)
 ON i.Id=@ItemId AND i.UsrRequestId=r.Id
JOIN dbo.UsrVirtualMachine v WITH(UPDLOCK,HOLDLOCK)
 ON v.Id=r.UsrTargetVirtualMachineId AND v.Id=@VmId
 AND v.UsrContractId=r.UsrContractId
JOIN dbo.UsrConfigResourceRate rate WITH(UPDLOCK,HOLDLOCK)
 ON rate.Id=i.UsrResourceRateId
 AND rate.UsrConfigVersionId=r.UsrConfigVersionId
 AND rate.UsrCurrencyId=i.UsrCurrencyId
WHERE r.Id=@RequestId AND ISNULL(r.UsrIsArchived,0)=0
 AND r.UsrResizeAdditionalPointsPreview=0
 AND r.UsrResizeReductionPointsPreview>0
 AND v.UsrStatusId=@ActiveVmStatus
 AND i.UsrProvisioningStatusId=@Provisioned
 AND i.UsrConfigVersionId=r.UsrConfigVersionId
 AND i.UsrPointsPerUnitSnapshot=rate.UsrPointsPerUnit
 AND i.UsrAmountPerUnitSnapshot=rate.UsrAmountPerUnit
 AND i.UsrTotalPointsSnapshot=i.UsrBillableUnits*i.UsrPointsPerUnitSnapshot
 AND i.UsrTotalAmountSnapshot=i.UsrBillableUnits*i.UsrAmountPerUnitSnapshot
 AND i.UsrEstimatedPoints=i.UsrTotalPointsSnapshot
 AND ISNULL(i.UsrAdditionalRAMGB,0)=0
 AND ISNULL(i.UsrAdditionalStorageGB,0)=0
 AND ISNULL(i.UsrVPNMbps,0)=0 AND ISNULL(i.UsrInternetMbps,0)=0
 AND ISNULL(i.UsrOperatingSystemId,'00000000-0000-0000-0000-000000000000')=
     ISNULL(v.UsrOperatingSystemId,'00000000-0000-0000-0000-000000000000')
 AND (SELECT COUNT(*) FROM dbo.UsrVMRequestItem WHERE UsrRequestId=r.Id)=1
 AND NOT EXISTS(SELECT 1 FROM dbo.UsrVMRequestItemAddOn a
                WHERE a.UsrRequestItemId=i.Id)")
                        .WithParameter("RequestId",requestId).WithParameter("ItemId",itemId)
                        .WithParameter("VmId",vmId).WithParameter("Provisioned",Provisioned)
                        .WithParameter("ActiveVmStatus",new Guid("41bb88e4-90bf-4a7e-8544-0af669ab6cbe"))
                        .ExecuteReader(db)) {
                        if(!reader.Read() || Enumerable.Range(0,11).Any(reader.IsDBNull))
                            throw new InvalidOperationException("Approved base-only downgrade is required.");
                        contractId=reader.GetGuid(0);statusId=reader.GetGuid(1);
                        reduction=reader.GetDecimal(2);newPoints=reader.GetDecimal(3);
                        oldPoints=reader.GetDecimal(4);currentCpu=reader.GetInt32(5);
                        currentRam=reader.GetDecimal(6);currentStorage=reader.GetDecimal(7);
                        newCpu=reader.GetInt32(8);newRam=reader.GetDecimal(9);
                        newStorage=reader.GetDecimal(10);
                    }
                    if(contractId==Guid.Empty || contractId!=allowedTestContractId ||
                        oldPoints<=newPoints ||
                        oldPoints-newPoints!=reduction || newCpu>currentCpu ||
                        newRam>currentRam || newStorage>currentStorage)
                        throw new InvalidOperationException("Downgrade reduction or VM specifications are inconsistent.");
                    if(statusId!=PendingProvisioning && statusId!=ProvisioningInProgress &&
                        statusId!=Completed)
                        throw new InvalidOperationException("Downgrade has not reached manual provisioning.");
                    if(!UsrMCITDataScopeRuntime.ReadAuthorizedContractIds(_uc).Contains(contractId))
                        throw new UnauthorizedAccessException("Downgrade contract scope denied.");
                    var operationRights=_uc.DBSecurityEngine.GetEntitySchemaOperationsRightLevel(
                        _uc.CurrentUser.Id,"UsrVirtualMachine");
                    var recordRights=_uc.DBSecurityEngine.GetEntitySchemaRecordRightLevel(
                        _uc.CurrentUser.Id,"UsrVirtualMachine",vmId);
                    var requestRights=_uc.DBSecurityEngine.GetEntitySchemaRecordRightLevel(
                        _uc.CurrentUser.Id,"UsrVMRequest",requestId);
                    if((operationRights & Terrasoft.Core.DB.SchemaOperationRightLevels.CanEdit)==0 ||
                       (recordRights & Terrasoft.Core.DB.SchemaRecordRightLevels.CanEdit)==0 ||
                       (requestRights & Terrasoft.Core.DB.SchemaRecordRightLevels.CanEdit)==0)
                        throw new UnauthorizedAccessException("Request and VM edit rights are required.");
                    int approved=new CustomQuery(_uc,@"
WITH latest AS (
 SELECT UsrStageId,UsrDecisionId,UsrIsCompleted,UsrDecidedById,
 ROW_NUMBER() OVER(PARTITION BY UsrStageId ORDER BY UsrReviewRound DESC,UsrDecidedOn DESC,Id DESC) rn
 FROM dbo.UsrRequestApproval WITH(UPDLOCK,HOLDLOCK)
 WHERE UsrRequestId=@RequestId AND UsrStageId IN(@Finance,@Technical))
SELECT COUNT(*) FROM latest WHERE rn=1 AND UsrIsCompleted=1
 AND UsrDecisionId=@Approved AND UsrDecidedById IS NOT NULL")
                        .WithParameter("RequestId",requestId)
                        .WithParameter("Finance",new Guid("a7999b08-2803-4b7c-b381-d66b99089cea"))
                        .WithParameter("Technical",new Guid("49f3c5d8-4ffa-452f-872e-63309e4fcafa"))
                        .WithParameter("Approved",new Guid("4e327a21-b74e-4a0f-8c7c-06d4da404c43"))
                        .ExecuteScalar<int>(db);
                    if(approved!=2)throw new InvalidOperationException("Both downgrade approvals are required.");
                    var lockResult=new CustomQuery(_uc,@"
DECLARE @Result int;
EXEC @Result=sys.sp_getapplock @Resource=@Resource,@LockMode='Exclusive',
 @LockOwner='Transaction',@LockTimeout=15000;
SELECT @Result")
                        .WithParameter("Resource","MCIT-Consume-"+contractId)
                        .ExecuteScalar<int>(db);
                    if(lockResult<0)throw new InvalidOperationException("Contract lifecycle lock unavailable.");
                    // No refund is posted. Preserve ledger allocation and the VM's
                    // allocated-points baseline until the restoration policy is approved.
                    if(newCpu==currentCpu && newRam==currentRam && newStorage==currentStorage) {
                        db.CommitTransaction();
                        return true;
                    }
                    if(statusId==Completed)
                        throw new InvalidOperationException("Completed downgrade differs from VM inventory.");
                    if(newCpu>=currentCpu && newRam>=currentRam && newStorage>=currentStorage)
                        throw new InvalidOperationException("Downgrade does not reduce any resource.");
                    int changed=new CustomQuery(_uc,@"
UPDATE dbo.UsrVirtualMachine
SET UsrCPU=@Cpu,UsrRAMGB=@Ram,UsrStorageGB=@Storage,
 ModifiedOn=GETDATE(),ModifiedById=@Actor
WHERE Id=@VmId AND UsrContractId=@ContractId AND UsrStatusId=@ActiveVmStatus
 AND UsrCPU=@CurrentCpu AND UsrRAMGB=@CurrentRam AND UsrStorageGB=@CurrentStorage")
                        .WithParameter("Cpu",newCpu).WithParameter("Ram",newRam)
                        .WithParameter("Storage",newStorage).WithParameter("Actor",initiatingContactId)
                        .WithParameter("VmId",vmId).WithParameter("ContractId",contractId)
                        .WithParameter("ActiveVmStatus",new Guid("41bb88e4-90bf-4a7e-8544-0af669ab6cbe"))
                        .WithParameter("CurrentCpu",currentCpu)
                        .WithParameter("CurrentRam",currentRam)
                        .WithParameter("CurrentStorage",currentStorage).Execute(db);
                    if(changed!=1)throw new InvalidOperationException("Target VM downgrade was not applied.");
                    db.CommitTransaction();
                } catch {db.RollbackTransaction();throw;}
            }
            return true;
        }

        // Called only by the approved resize branch after manual provisioning confirms
        // the existing VM. The monetary delta comes from saved, validated snapshots.
        public bool CommitApprovedResize(Guid requestId, Guid initiatingContactId,
            Guid vmId, Guid itemId, Guid allowedTestContractId,
            bool allowMonetaryCharges) {
            if (requestId == Guid.Empty || initiatingContactId == Guid.Empty ||
                vmId == Guid.Empty || itemId == Guid.Empty || allowedTestContractId==Guid.Empty ||
                _uc.CurrentUser == null || _uc.CurrentUser.ContactId != initiatingContactId)
                throw new UnauthorizedAccessException("Resize initiator and identifiers must be verified.");
            UsrMCITScreenAccess.Demand(_uc, "REQUEST_QUEUE", "Edit");
            // System-context Script Tasks can bypass native permission checks. Require
            // an explicit active MCIT role grant bound to the initiating user as well.
            var statusColumn = _uc.EntitySchemaManager.GetInstanceByName("UsrMCITRole")
                .Columns.FirstOrDefault(c => c.Name == "UsrMCITRoleStatuses");
            if (statusColumn == null || statusColumn.ReferenceSchema == null ||
                statusColumn.ReferenceSchema.PrimaryDisplayColumn == null)
                throw new UnauthorizedAccessException("MCIT role status is unavailable.");
            Guid activeRoleStatus;
            using (var permissionDb = _uc.EnsureDBConnection()) {
                var activeStatusQuery = new Select(_uc);
                activeStatusQuery.Column("Id").From(statusColumn.ReferenceSchema.Name)
                    .Where(statusColumn.ReferenceSchema.PrimaryDisplayColumn.Name)
                    .IsEqual(Column.Parameter("Active"));
                activeRoleStatus = activeStatusQuery.ExecuteScalar<Guid>(permissionDb);
                if (activeRoleStatus == Guid.Empty || new CustomQuery(_uc, @"
SELECT COUNT(*) FROM dbo.UsrMCITRoleScreenPermission p
JOIN dbo.UsrMCITPermissionScreen s ON s.Id=p.UsrScreenId
JOIN dbo.UsrMCITRole r ON r.Id=p.UsrMCITRoleId
JOIN dbo.SysUserInRole ur ON ur.SysRoleId=r.UsrRoleId AND ur.SysUserId=@UserId
JOIN dbo.SysAdminUnit au ON au.Id=r.UsrRoleId AND au.Active=1
WHERE s.UsrScreenCode=N'REQUEST_QUEUE' AND s.UsrIsActive=1
 AND p.UsrCanView=1 AND p.UsrCanEdit=1
 AND r.UsrMCITRoleStatusesId=@StatusId")
                    .WithParameter("UserId", _uc.CurrentUser.Id)
                    .WithParameter("StatusId", activeRoleStatus)
                    .ExecuteScalar<int>(permissionDb) < 1)
                    throw new UnauthorizedAccessException("No active MCIT resize permission.");
            }
            var rights = _uc.DBSecurityEngine.GetEntitySchemaOperationsRightLevel(
                _uc.CurrentUser.Id, "UsrVMRequest");
            if ((rights & Terrasoft.Core.DB.SchemaOperationRightLevels.CanEdit) == 0)
                throw new UnauthorizedAccessException("Request edit permission is required.");
            foreach(var ledger in new[]{"UsrPointTransaction","UsrPointAllocation",
                "UsrFinancialTransaction"}) {
                var create=_uc.DBSecurityEngine.GetEntitySchemaOperationsRightLevel(
                    _uc.CurrentUser.Id,ledger);
                if((create & Terrasoft.Core.DB.SchemaOperationRightLevels.CanAppend)==0)
                    throw new UnauthorizedAccessException("Ledger create right is required.");
            }

            Guid contractId = Guid.Empty;
            var points = new UsrMCITPointsConsumptionService(_uc);
            using (var db = _uc.EnsureDBConnection()) {
                db.StartTransaction(IsolationLevel.Serializable);
                try {
                    Guid versionId, currencyId, rateId, originalItemId;
                    Guid statusId;
                    decimal oldPoints, newPoints, oldAmount, newAmount;
                    int cpu;
                    int currentCpu;
                    decimal ram, storage, currentRam, currentStorage;
                    using (var reader = new CustomQuery(_uc, @"
SELECT r.UsrContractId,r.UsrConfigVersionId,r.UsrStatusId,
 r.UsrResizeAdditionalPointsPreview,i.UsrTotalPointsSnapshot,
 i.UsrTotalAmountSnapshot,i.UsrCurrencyId,i.UsrResourceRateId,
 v.UsrAllocatedPoints,v.UsrCPU,v.UsrRAMGB,v.UsrStorageGB,
 origin.UsrTotalAmountSnapshot,i.UsrCPU,i.UsrRAMGB,i.UsrStorageGB,
 origin.Id
FROM dbo.UsrVMRequest r WITH (UPDLOCK,HOLDLOCK)
JOIN dbo.UsrVMRequestItem i WITH (UPDLOCK,HOLDLOCK)
 ON i.UsrRequestId=r.Id AND i.Id=@ItemId
JOIN dbo.UsrVirtualMachine v WITH (UPDLOCK,HOLDLOCK)
 ON v.Id=r.UsrTargetVirtualMachineId AND v.Id=@VmId
 AND v.UsrContractId=r.UsrContractId
JOIN dbo.UsrVMRequestItem origin WITH (UPDLOCK,HOLDLOCK)
 ON origin.Id=v.UsrSourceRequestItemId
JOIN dbo.UsrConfigResourceRate rate WITH (UPDLOCK,HOLDLOCK)
 ON rate.Id=i.UsrResourceRateId
 AND rate.UsrConfigVersionId=r.UsrConfigVersionId
 AND rate.UsrCurrencyId=i.UsrCurrencyId
WHERE r.Id=@RequestId AND ISNULL(r.UsrIsArchived,0)=0
 AND r.UsrResizeAdditionalPointsPreview>0
 AND r.UsrResizeReductionPointsPreview=0
 AND v.UsrStatusId=@ActiveVmStatus
 AND i.UsrProvisioningStatusId=@Provisioned
 AND i.UsrConfigVersionId=r.UsrConfigVersionId
 AND origin.UsrCurrencyId=i.UsrCurrencyId
 AND i.UsrPointsPerUnitSnapshot=rate.UsrPointsPerUnit
 AND i.UsrAmountPerUnitSnapshot=rate.UsrAmountPerUnit
 AND i.UsrTotalPointsSnapshot=i.UsrBillableUnits*i.UsrPointsPerUnitSnapshot
 AND i.UsrTotalAmountSnapshot=i.UsrBillableUnits*i.UsrAmountPerUnitSnapshot
 AND i.UsrEstimatedPoints=i.UsrTotalPointsSnapshot
 AND i.UsrAdditionalRAMGB=0 AND i.UsrAdditionalStorageGB=0
 AND i.UsrVPNMbps=0 AND i.UsrInternetMbps=0
 AND (SELECT COUNT(*) FROM dbo.UsrVMRequestItem WHERE UsrRequestId=r.Id)=1
 AND NOT EXISTS(SELECT 1 FROM dbo.UsrVMRequestItemAddOn a WHERE a.UsrRequestItemId=i.Id)
 AND NOT EXISTS(SELECT 1 FROM dbo.UsrVMRequestItemAddOn a WHERE a.UsrRequestItemId=origin.Id)")
                            .WithParameter("RequestId", requestId).WithParameter("ItemId", itemId)
                            .WithParameter("VmId", vmId).WithParameter("Provisioned", Provisioned)
                            .WithParameter("ActiveVmStatus", new Guid("41bb88e4-90bf-4a7e-8544-0af669ab6cbe"))
                            .ExecuteReader(db)) {
                        if (!reader.Read() || Enumerable.Range(0,17).Any(reader.IsDBNull))
                            throw new InvalidOperationException("A base-only approved resize snapshot is required.");
                        contractId=reader.GetGuid(0);versionId=reader.GetGuid(1);statusId=reader.GetGuid(2);
                        var delta=reader.GetDecimal(3);newPoints=reader.GetDecimal(4);
                        newAmount=reader.GetDecimal(5);currencyId=reader.GetGuid(6);
                        rateId=reader.GetGuid(7);oldPoints=reader.GetDecimal(8);
                        oldAmount=reader.GetDecimal(12);
                        cpu=reader.GetInt32(13);ram=reader.GetDecimal(14);storage=reader.GetDecimal(15);
                        currentCpu=reader.GetInt32(9);
                        currentRam=reader.GetDecimal(10);currentStorage=reader.GetDecimal(11);
                        originalItemId=reader.GetGuid(16);
                        if (contractId==Guid.Empty || versionId==Guid.Empty ||
                            currencyId==Guid.Empty || rateId==Guid.Empty ||
                            delta<=0 || newPoints<oldPoints ||
                            newAmount<0 || oldAmount<0 || cpu<currentCpu ||
                            ram<currentRam || storage<currentStorage)
                            throw new InvalidOperationException("Resize delta or VM resources do not match the approved snapshot.");
                    }
                    if (contractId!=allowedTestContractId ||
                        !UsrMCITDataScopeRuntime.ReadAuthorizedContractIds(_uc).Contains(contractId))
                        throw new UnauthorizedAccessException("Target VM contract is outside the initiator's scope.");
                    foreach(var entity in new[]{"UsrVMRequest","UsrVirtualMachine"}) {
                        var objectRights=_uc.DBSecurityEngine.GetEntitySchemaOperationsRightLevel(
                            _uc.CurrentUser.Id,entity);
                        if((objectRights & Terrasoft.Core.DB.SchemaOperationRightLevels.CanEdit)==0)
                            throw new UnauthorizedAccessException("Request or VM object edit right is required.");
                        var record = entity=="UsrVMRequest" ? requestId : vmId;
                        var effective=_uc.DBSecurityEngine.GetEntitySchemaRecordRightLevel(
                            _uc.CurrentUser.Id,entity,record);
                        if ((effective & Terrasoft.Core.DB.SchemaRecordRightLevels.CanEdit)==0)
                            throw new UnauthorizedAccessException("Request or target VM edit right is required.");
                    }
                    if (statusId!=PendingProvisioning && statusId!=ProvisioningInProgress &&
                        statusId!=Completed)
                        throw new InvalidOperationException("Resize has not reached approved provisioning.");
                    var lockResult=new CustomQuery(_uc,@"
DECLARE @Result int;
EXEC @Result=sys.sp_getapplock @Resource=@Name,@LockMode='Exclusive',
 @LockOwner='Transaction',@LockTimeout=15000;
SELECT @Result")
                        .WithParameter("Name","MCIT-Consume-"+contractId).ExecuteScalar<int>(db);
                    if(lockResult<0) throw new InvalidOperationException("Contract resize lock unavailable.");
                    var approved=new CustomQuery(_uc,@"
WITH latest AS (
 SELECT UsrStageId,UsrDecisionId,UsrIsCompleted,UsrDecidedById,
 ROW_NUMBER() OVER(PARTITION BY UsrStageId ORDER BY UsrReviewRound DESC,UsrDecidedOn DESC,Id DESC) rn
 FROM dbo.UsrRequestApproval WITH(UPDLOCK,HOLDLOCK)
 WHERE UsrRequestId=@RequestId AND UsrStageId IN(@Finance,@Technical))
SELECT COUNT(*) FROM latest WHERE rn=1 AND UsrIsCompleted=1
 AND UsrDecisionId=@Approved AND UsrDecidedById IS NOT NULL")
                        .WithParameter("RequestId",requestId)
                        .WithParameter("Finance",new Guid("a7999b08-2803-4b7c-b381-d66b99089cea"))
                        .WithParameter("Technical",new Guid("49f3c5d8-4ffa-452f-872e-63309e4fcafa"))
                        .WithParameter("Approved",new Guid("4e327a21-b74e-4a0f-8c7c-06d4da404c43"))
                        .ExecuteScalar<int>(db);
                    if(approved!=2) throw new InvalidOperationException("Both approvals must be current.");
                    if(new CustomQuery(_uc,@"
SELECT COUNT(*) FROM dbo.UsrFinancialTransaction WITH(UPDLOCK,HOLDLOCK)
WHERE UsrRequestItemId=@OriginItemId AND UsrVirtualMachineId=@VmId
 AND UsrContractId=@ContractId AND UsrCurrencyId=@CurrencyId
 AND UsrAmount=@OldAmount AND UsrTransactionTypeId=@Type")
                        .WithParameter("OriginItemId",originalItemId).WithParameter("VmId",vmId)
                        .WithParameter("ContractId",contractId).WithParameter("CurrencyId",currencyId)
                        .WithParameter("OldAmount",oldAmount)
                        .WithParameter("Type",new Guid("4e5e00af-f080-40e7-aa98-b6bbcaa474ba"))
                        .ExecuteScalar<int>(db)!=1)
                        throw new InvalidOperationException("Original VM financial charge is missing or ambiguous.");
                    // Financial policy remains explicit. Earlier charges for this VM
                    // and its origin form its historical, immutable monetary baseline.
                    var priorResizeCharges=new CustomQuery(_uc,@"
SELECT COALESCE(SUM(UsrAmount),0) FROM dbo.UsrFinancialTransaction WITH(UPDLOCK,HOLDLOCK)
WHERE UsrVirtualMachineId=@VmId AND UsrRequestId<>@RequestId
 AND UsrName LIKE N'MCIT-COMMIT-RESIZE-%'")
                        .WithParameter("VmId",vmId).WithParameter("RequestId",requestId)
                        .ExecuteScalar<decimal>(db);
                    var expectedAmount=Math.Max(0,newAmount-oldAmount-priorResizeCharges);
                    if(expectedAmount>0 && !allowMonetaryCharges)
                        throw new InvalidOperationException("Incremental monetary posting is disabled by process policy.");
                    var approvedMonetaryDelta=expectedAmount;
                    if(approvedMonetaryDelta>0) {
                        var budget=new CustomQuery(_uc,@"
SELECT CAST(c.UsrInitialBudget AS decimal(18,8)) + COALESCE(SUM(
 CASE f.UsrTransactionTypeId
 WHEN '3cc409ac-186e-480f-a145-6f25acb2e34a' THEN f.UsrAmount
 WHEN '9b62fcca-8d7d-472b-bfcb-15076cd67ddd' THEN -f.UsrAmount
 WHEN '4e5e00af-f080-40e7-aa98-b6bbcaa474ba' THEN -f.UsrAmount ELSE 0 END),0)
FROM dbo.UsrMCITContract c WITH(UPDLOCK,HOLDLOCK)
LEFT JOIN dbo.UsrFinancialTransaction f WITH(UPDLOCK,HOLDLOCK) ON f.UsrContractId=c.Id
WHERE c.Id=@ContractId AND c.UsrCurrencyId=@CurrencyId GROUP BY c.UsrInitialBudget")
                            .WithParameter("ContractId",contractId).WithParameter("CurrencyId",currencyId)
                            .ExecuteScalar<decimal>(db);
                        var postedForRequest=new CustomQuery(_uc,@"
SELECT COALESCE(SUM(UsrAmount),0) FROM dbo.UsrFinancialTransaction WITH(UPDLOCK,HOLDLOCK)
WHERE UsrRequestId=@RequestId AND UsrRequestItemId=@ItemId
 AND UsrTransactionTypeId=@Type")
                            .WithParameter("RequestId",requestId).WithParameter("ItemId",itemId)
                            .WithParameter("Type",new Guid("4e5e00af-f080-40e7-aa98-b6bbcaa474ba"))
                            .ExecuteScalar<decimal>(db);
                        if(budget+postedForRequest<approvedMonetaryDelta)
                            throw new InvalidOperationException("Insufficient financial budget for approved resize.");
                    }
                    var financialCount=new CustomQuery(_uc,@"
SELECT COUNT(*) FROM dbo.UsrFinancialTransaction WITH(UPDLOCK,HOLDLOCK)
WHERE UsrRequestId=@RequestId AND UsrRequestItemId=@ItemId
 AND UsrTransactionTypeId=@Type")
                        .WithParameter("RequestId",requestId).WithParameter("ItemId",itemId)
                        .WithParameter("Type",new Guid("4e5e00af-f080-40e7-aa98-b6bbcaa474ba"))
                        .ExecuteScalar<int>(db);
                    if(financialCount>1 || (approvedMonetaryDelta==0 && financialCount!=0))
                        throw new InvalidOperationException("Resize financial history is inconsistent.");
                    if(financialCount==1 && new CustomQuery(_uc,@"
SELECT COUNT(*) FROM dbo.UsrFinancialTransaction WITH(UPDLOCK,HOLDLOCK)
WHERE UsrRequestId=@RequestId AND UsrRequestItemId=@ItemId
 AND UsrName=@Name AND UsrAmount=@Amount AND UsrCurrencyId=@CurrencyId
 AND UsrConfigVersionId=@VersionId AND UsrVirtualMachineId=@VmId
 AND UsrResourceRateId=@RateId AND UsrContractId=@ContractId")
                        .WithParameter("RequestId",requestId).WithParameter("ItemId",itemId)
                        .WithParameter("Name","MCIT-COMMIT-RESIZE-"+itemId)
                        .WithParameter("Amount",approvedMonetaryDelta)
                        .WithParameter("CurrencyId",currencyId).WithParameter("VersionId",versionId)
                        .WithParameter("VmId",vmId).WithParameter("RateId",rateId)
                        .WithParameter("ContractId",contractId).ExecuteScalar<int>(db)!=1)
                        throw new InvalidOperationException("Prior resize financial charge differs from approval.");
                    var priorPointCount=new CustomQuery(_uc,@"
SELECT COUNT(*) FROM dbo.UsrPointTransaction WITH(UPDLOCK,HOLDLOCK)
WHERE UsrRequestId=@RequestId AND UsrRequestItemId=@ItemId
 AND UsrName=@Operation AND UsrVirtualMachineId=@VmId
 AND UsrTransactionTypeId IN
 ('9714B14C-2A5F-4D72-A114-78833EF52F42',
  'DB304861-706C-4974-94AF-F337300181D0')")
                        .WithParameter("RequestId",requestId).WithParameter("ItemId",itemId)
                        .WithParameter("VmId",vmId)
                        .WithParameter("Operation","MCIT-CONSUME-"+itemId)
                        .ExecuteScalar<int>(db);
                    if((financialCount==1 && priorPointCount==0) ||
                        (approvedMonetaryDelta>0 && financialCount==0 && priorPointCount>0))
                        throw new InvalidOperationException("Resize point and financial histories disagree.");
                    if(statusId==Completed && priorPointCount==0)
                        throw new InvalidOperationException("Completed resize has no prior point commitment.");
                    if(newPoints==oldPoints) {
                        if(priorPointCount==0)
                            throw new InvalidOperationException("VM already resized without a linked consumption.");
                        if(cpu!=currentCpu || ram!=currentRam || storage!=currentStorage)
                            throw new InvalidOperationException("Previously resized VM does not match its approved specification.");
                        var posted=new CustomQuery(_uc,@"
SELECT COALESCE(SUM(UsrQuantity),0) FROM dbo.UsrPointTransaction WITH(UPDLOCK,HOLDLOCK)
WHERE UsrRequestId=@RequestId AND UsrRequestItemId=@ItemId
 AND UsrName=@Operation AND UsrVirtualMachineId=@VmId
 AND UsrTransactionTypeId IN
 ('9714B14C-2A5F-4D72-A114-78833EF52F42',
  'DB304861-706C-4974-94AF-F337300181D0')")
                            .WithParameter("RequestId",requestId).WithParameter("ItemId",itemId)
                            .WithParameter("VmId",vmId)
                            .WithParameter("Operation","MCIT-CONSUME-"+itemId)
                            .ExecuteScalar<decimal>(db);
                        var savedDelta=new CustomQuery(_uc,
                            "SELECT UsrResizeAdditionalPointsPreview FROM dbo.UsrVMRequest WHERE Id=@RequestId")
                            .WithParameter("RequestId",requestId).ExecuteScalar<decimal>(db);
                        if(posted!=savedDelta || (approvedMonetaryDelta>0 && financialCount!=1))
                            throw new InvalidOperationException("Resize retry has incomplete ledger history.");
                        db.CommitTransaction();
                        return true;
                    }
                    if(newPoints-oldPoints!=new CustomQuery(_uc,
                        "SELECT UsrResizeAdditionalPointsPreview FROM dbo.UsrVMRequest WHERE Id=@RequestId")
                        .WithParameter("RequestId",requestId).ExecuteScalar<decimal>(db))
                        throw new InvalidOperationException("Resize points differ from approved delta.");
                    var required=newPoints-oldPoints;
                    var result=points.PostConsumptionWithinTransaction(db,contractId,requestId,
                        itemId,vmId,itemId,required,true);
                    if(!result.Success) throw new InvalidOperationException("Resize points were not committed.");
                    if(financialCount==0 && approvedMonetaryDelta>0) {
                        var inserted=new CustomQuery(_uc,@"
INSERT dbo.UsrFinancialTransaction
(Id,CreatedOn,CreatedById,ModifiedOn,ModifiedById,UsrName,UsrAmount,
 UsrTransactionDate,UsrTransactionTypeId,UsrContractId,UsrRequestId,UsrRequestItemId,
 UsrConfigVersionId,UsrCurrencyId,UsrVirtualMachineId,UsrResourceRateId,UsrActorId,UsrReason)
VALUES(NEWID(),GETDATE(),@Actor,GETDATE(),@Actor,@Name,@Amount,GETDATE(),
 @Type,@ContractId,@RequestId,@ItemId,@VersionId,@CurrencyId,@VmId,@RateId,
 @Actor,N'Approved incremental VM resource resize')")
                            .WithParameter("Actor",initiatingContactId)
                            .WithParameter("Name","MCIT-COMMIT-RESIZE-"+itemId)
                            .WithParameter("Amount",approvedMonetaryDelta)
                            .WithParameter("Type",new Guid("4e5e00af-f080-40e7-aa98-b6bbcaa474ba"))
                            .WithParameter("ContractId",contractId).WithParameter("RequestId",requestId)
                            .WithParameter("ItemId",itemId).WithParameter("VersionId",versionId)
                            .WithParameter("CurrencyId",currencyId).WithParameter("VmId",vmId)
                            .WithParameter("RateId",rateId).Execute(db);
                        if(inserted!=1)throw new InvalidOperationException("Resize financial insert failed.");
                    }
                    var updated=new CustomQuery(_uc,@"
UPDATE dbo.UsrVirtualMachine
SET UsrCPU=@Cpu,UsrRAMGB=@Ram,UsrStorageGB=@Storage,
 UsrAllocatedPoints=@Points,ModifiedOn=GETDATE(),ModifiedById=@Actor
WHERE Id=@VmId AND UsrContractId=@ContractId AND UsrAllocatedPoints=@OldPoints
 AND UsrStatusId=@ActiveStatus")
                        .WithParameter("Cpu",cpu).WithParameter("Ram",ram)
                        .WithParameter("Storage",storage).WithParameter("Points",newPoints)
                        .WithParameter("Actor",initiatingContactId).WithParameter("VmId",vmId)
                        .WithParameter("ContractId",contractId).WithParameter("OldPoints",oldPoints)
                        .WithParameter("ActiveStatus",new Guid("41bb88e4-90bf-4a7e-8544-0af669ab6cbe"))
                        .Execute(db);
                    if(updated!=1) throw new InvalidOperationException("Existing VM was not updated.");
                    db.CommitTransaction();
                } catch {
                    db.RollbackTransaction();
                    throw;
                }
            }
            try { points.RefreshPreview(contractId,requestId); }
            catch(Exception ex) { System.Diagnostics.Trace.TraceError(
                "MCIT resize preview refresh failed for request {0}: {1}",requestId,ex); }
            return true;
        }
    }
}
