using System;
using System.Data;
using System.Collections.Generic;
using Terrasoft.Core;
using Terrasoft.Core.DB;

namespace Terrasoft.Configuration
{
    public sealed class UsrMCITVmTerminationRestorationResult
    {
        public bool Success { get; set; }
        public bool AlreadyRestored { get; set; }
        public int RestorationCount { get; set; }
        public decimal RestoredPoints { get; set; }
        public string ErrorMessage { get; set; }
    }

    /// <summary>
    /// FR-TRM-002: restore the ORIGINAL VM-resource consumption amounts,
    /// using their original configuration versions, without repricing.
    /// Call ONLY after the BPMN confirms decommissioning and approvals.
    /// This service finalizes the VM status and ledger in one SQL transaction.
    /// </summary>
    public sealed class UsrMCITVMTerminationRestorationService
    {
        private readonly UserConnection _uc;

        public UsrMCITVMTerminationRestorationService(UserConnection userConnection)
        {
            _uc = userConnection ?? throw new ArgumentNullException(nameof(userConnection));
        }

        public UsrMCITVmTerminationRestorationResult FinalizeTermination(
            Guid vmId,
            Guid contractId,
            Guid operationId,
            bool decommissionConfirmed)
        {
            if (vmId == Guid.Empty || contractId == Guid.Empty || operationId == Guid.Empty)
                throw new ArgumentException("VM, contract and termination operation IDs are required.");
            if (!decommissionConfirmed)
                throw new InvalidOperationException("VM decommissioning must be confirmed first.");

            // Same audit identity pattern as the existing MCIT expiry service.
            Guid actorId = _uc.CurrentUser.ContactId;

            const string sql = @"
SET NOCOUNT ON;

DECLARE @Now datetime2 = SYSDATETIME();
DECLARE @EmptyGuid uniqueidentifier = '00000000-0000-0000-0000-000000000000';
DECLARE @ConsumptionGeneric uniqueidentifier = 'CCE3062D-A79E-4ADB-BAFE-F731CA2B3340';
DECLARE @ConsumptionAvailable uniqueidentifier = '9714B14C-2A5F-4D72-A114-78833EF52F42';
DECLARE @ConsumptionRestored uniqueidentifier = 'DB304861-706C-4974-94AF-F337300181D0';
DECLARE @TerminationRestoration uniqueidentifier = '65A9C955-4B2A-4E70-9BAC-4AF75F1E0AED';
DECLARE @RestoredBalance uniqueidentifier = 'BA34D604-C14E-49E1-80A4-1AAE00302C3F';
DECLARE @OperationName nvarchar(100) = N'MCIT-VM-TERMINATE-' + CONVERT(nvarchar(36), @OperationId);
DECLARE @LockResult int;

-- Use the same contract lock namespace as the consumption service.
-- Serialize reuse of the same operation ID, even across different VMs/contracts.
DECLARE @OperationLock nvarchar(255) = N'MCIT-VM-TermOp-' + CONVERT(nvarchar(36), @OperationId);
EXEC @LockResult = sys.sp_getapplock
    @Resource = @OperationLock, @LockMode = 'Exclusive',
    @LockOwner = 'Transaction', @LockTimeout = 15000;
IF @LockResult < 0 THROW 51200, 'Cannot lock termination operation.', 1;

DECLARE @ContractLock nvarchar(255) = N'MCIT-Consume-' + CONVERT(nvarchar(36), @ContractId);
EXEC @LockResult = sys.sp_getapplock
    @Resource = @ContractLock, @LockMode = 'Exclusive',
    @LockOwner = 'Transaction', @LockTimeout = 15000;
IF @LockResult < 0 THROW 51201, 'Cannot lock contract for VM restoration.', 1;

DECLARE @VmLock nvarchar(255) = N'MCIT-VM-Termination-' + CONVERT(nvarchar(36), @VmId);
EXEC @LockResult = sys.sp_getapplock
    @Resource = @VmLock, @LockMode = 'Exclusive',
    @LockOwner = 'Transaction', @LockTimeout = 15000;
IF @LockResult < 0 THROW 51202, 'Cannot lock VM termination.', 1;

DECLARE @StatusName nvarchar(250);
DECLARE @TerminatedStatusId uniqueidentifier;

SELECT @StatusName = s.Name
FROM dbo.UsrVirtualMachine v WITH (UPDLOCK, HOLDLOCK)
INNER JOIN dbo.UsrMCITVMStatus s ON s.Id = v.UsrStatusId
WHERE v.Id = @VmId AND v.UsrContractId = @ContractId;

IF @StatusName IS NULL
    THROW 51203, 'VM was not found for the specified contract/status.', 1;

-- The BPMN must have approved termination and completed decommissioning.
IF @StatusName NOT IN (N'Terminating', N'Terminated')
    THROW 51204, 'VM must be Terminating or Terminated before restoration.', 1;

SELECT @TerminatedStatusId = Id
FROM dbo.UsrMCITVMStatus
WHERE Name = N'Terminated';

IF @TerminatedStatusId IS NULL
    THROW 51205, 'Terminated VM status lookup is missing.', 1;

IF EXISTS (
    SELECT 1 FROM dbo.UsrPointTransaction WITH (UPDLOCK, HOLDLOCK)
    WHERE UsrName = @OperationName
      AND (UsrTransactionTypeId <> @TerminationRestoration
           OR UsrContractId <> @ContractId
           OR ISNULL(UsrVirtualMachineId, @EmptyGuid) <> @VmId)
)
    THROW 51206, 'Termination operation ID was used for a different operation.', 1;

-- Fail closed for legacy/ambiguous consumption: it may include add-ons.
-- Only the dedicated VM-RESOURCE consumption flow may write this reason tag.
-- The point-consumption service must NOT use the tag for nonrefundable add-ons.
IF EXISTS (
    SELECT 1 FROM dbo.UsrPointTransaction t
    WHERE t.UsrContractId = @ContractId
      AND t.UsrVirtualMachineId = @VmId
      AND t.UsrTransactionTypeId IN (
          @ConsumptionGeneric, @ConsumptionAvailable, @ConsumptionRestored)
      AND (t.UsrTransactionTypeId = @ConsumptionGeneric
           OR ISNULL(t.UsrReason, N'') <> N'MCIT VM resource consumption'
           OR t.UsrOriginTransactionId IS NULL
           OR t.UsrQuantity <= 0)
)
    THROW 51207, 'Ambiguous VM consumption; classify resource versus add-on charges before refunding.', 1;

DECLARE @Original TABLE (
    Id uniqueidentifier NOT NULL PRIMARY KEY,
    Quantity decimal(18,8) NOT NULL
);

INSERT INTO @Original (Id, Quantity)
SELECT t.Id, t.UsrQuantity
FROM dbo.UsrPointTransaction t WITH (UPDLOCK, HOLDLOCK)
WHERE t.UsrContractId = @ContractId
  AND t.UsrVirtualMachineId = @VmId
  AND t.UsrTransactionTypeId IN (@ConsumptionAvailable, @ConsumptionRestored)
  AND t.UsrReason = N'MCIT VM resource consumption'
  AND t.UsrOriginTransactionId IS NOT NULL
  AND t.UsrQuantity > 0;

DECLARE @OriginalCount int = (SELECT COUNT(*) FROM @Original);
DECLARE @OriginalTotal decimal(18,8) =
    (SELECT COALESCE(SUM(Quantity), 0) FROM @Original);

IF @OriginalCount = 0
    THROW 51208, 'No eligible VM-resource consumption transactions are linked to this VM.', 1;

-- Every original consumption must be traceable to a matching allocation.
IF EXISTS (
    SELECT 1
    FROM @Original c
    JOIN dbo.UsrPointTransaction t ON t.Id = c.Id
    OUTER APPLY (
        SELECT COUNT(*) AS Cnt,
               COALESCE(SUM(a.UsrQuantity), 0) AS Qty
        FROM dbo.UsrPointAllocation a
        WHERE a.UsrUsageTransactionId = t.Id
          AND a.UsrSourceTransactionId = t.UsrOriginTransactionId
    ) a
    WHERE a.Cnt <> 1 OR a.Qty <> c.Quantity
)
    THROW 51209, 'Original consumption allocations do not match the ledger.', 1;

DECLARE @ExistingCount int = 0;
DECLARE @ExistingTotal decimal(18,8) = 0;

SELECT @ExistingCount = COUNT(*),
       @ExistingTotal = COALESCE(SUM(r.UsrQuantity), 0)
FROM dbo.UsrPointTransaction r WITH (UPDLOCK, HOLDLOCK)
WHERE r.UsrContractId = @ContractId
  AND r.UsrVirtualMachineId = @VmId
  AND r.UsrTransactionTypeId = @TerminationRestoration;

-- Another VM/operation cannot restore one of these source usages.
IF EXISTS (
    SELECT 1
    FROM dbo.UsrPointTransaction r WITH (UPDLOCK, HOLDLOCK)
    INNER JOIN @Original c ON c.Id = r.UsrOriginTransactionId
    WHERE r.UsrTransactionTypeId = @TerminationRestoration
      AND (r.UsrContractId <> @ContractId
           OR ISNULL(r.UsrVirtualMachineId, @EmptyGuid) <> @VmId)
)
    THROW 51214, 'Original consumption was already restored for another VM/contract.', 1;

IF @ExistingCount > 0
BEGIN
    -- Successful retry only if the entire prior restoration matches this operation.
    IF @ExistingCount <> @OriginalCount OR @ExistingTotal <> @OriginalTotal
       OR EXISTS (
           SELECT 1 FROM @Original c
           WHERE NOT EXISTS (
               SELECT 1 FROM dbo.UsrPointTransaction r
               WHERE r.UsrContractId = @ContractId
                 AND r.UsrVirtualMachineId = @VmId
                 AND r.UsrTransactionTypeId = @TerminationRestoration
                 AND r.UsrOriginTransactionId = c.Id
                 AND r.UsrName = @OperationName
                 AND r.UsrQuantity = c.Quantity
           )
       )
       OR EXISTS (
           SELECT 1 FROM dbo.UsrPointTransaction r
           WHERE r.UsrContractId = @ContractId
             AND r.UsrVirtualMachineId = @VmId
             AND r.UsrTransactionTypeId = @TerminationRestoration
             AND r.UsrName <> @OperationName
       )
        THROW 51210, 'VM has a partial, mismatched or different-operation restoration.', 1;

    UPDATE dbo.UsrVirtualMachine
    SET UsrStatusId = @TerminatedStatusId,
        ModifiedOn = @Now, ModifiedById = @ActorId
    WHERE Id = @VmId AND UsrContractId = @ContractId;

    SELECT CAST(1 AS int) AS Success,
           CAST(1 AS int) AS AlreadyRestored,
           @ExistingCount AS RestorationCount,
           @ExistingTotal AS RestoredPoints;
    RETURN;
END;

-- One immutable restoration source per original consumption source.
-- No allocation is written here: new restored points become an unallocated
-- funding source; future consumption/expiry will create allocations against it.
INSERT INTO dbo.UsrPointTransaction (
    Id,
    CreatedOn, CreatedById,
    ModifiedOn, ModifiedById,
    UsrName, UsrQuantity,
    UsrTransactionDate, UsrExpirationDate,
    UsrTransactionTypeId, UsrContractId,
    UsrOriginTransactionId, UsrSourceBalanceId,
    UsrConfigVersionId, UsrVirtualMachineId,
    UsrRequestId, UsrRequestItemId,
    UsrActorId, UsrReason
)
SELECT
    NEWID(),
    @Now, @ActorId,
    @Now, @ActorId,
    @OperationName, c.Quantity,
    @Now, DATEADD(YEAR, 1, CONVERT(date, @Now)),
    @TerminationRestoration, @ContractId,
    t.Id, @RestoredBalance,
    t.UsrConfigVersionId, @VmId,
    t.UsrRequestId, t.UsrRequestItemId,
    @ActorId, N'VM termination restoration; original consumption quantity and version'
FROM @Original c
INNER JOIN dbo.UsrPointTransaction t ON t.Id = c.Id;

IF @@ROWCOUNT <> @OriginalCount
    THROW 51211, 'Not every original consumption received a restoration.', 1;

-- Finalize the VM status in the same transaction as the refund posting.
UPDATE dbo.UsrVirtualMachine
SET UsrStatusId = @TerminatedStatusId,
    ModifiedOn = @Now, ModifiedById = @ActorId
WHERE Id = @VmId AND UsrContractId = @ContractId;

IF @@ROWCOUNT <> 1
    THROW 51212, 'VM status could not be finalized.', 1;

IF EXISTS (
    SELECT 1 FROM @Original c
    WHERE (SELECT COUNT(*)
           FROM dbo.UsrPointTransaction r
           WHERE r.UsrTransactionTypeId = @TerminationRestoration
             AND r.UsrOriginTransactionId = c.Id
             AND r.UsrVirtualMachineId = @VmId) <> 1
)
    THROW 51213, 'Restoration linkage verification failed.', 1;

SELECT CAST(1 AS int) AS Success,
       CAST(0 AS int) AS AlreadyRestored,
       @OriginalCount AS RestorationCount,
       @OriginalTotal AS RestoredPoints;";

            UsrMCITVmTerminationRestorationResult committedResult;
            using (var db = _uc.EnsureDBConnection())
            {
                db.StartTransaction(IsolationLevel.Serializable);
                try
                {
                    var query = new CustomQuery(_uc, sql)
                        .WithParameter("VmId", vmId)
                        .WithParameter("ContractId", contractId)
                        .WithParameter("OperationId", operationId)
                        .WithParameter("ActorId", actorId);

                    UsrMCITVmTerminationRestorationResult result;
                    using (IDataReader reader = query.ExecuteReader(db))
                    {
                        if (!reader.Read())
                            throw new InvalidOperationException("VM restoration did not return a result.");

                        result = new UsrMCITVmTerminationRestorationResult
                        {
                            Success = reader.GetInt32(0) == 1,
                            AlreadyRestored = reader.GetInt32(1) == 1,
                            RestorationCount = reader.GetInt32(2),
                            RestoredPoints = reader.GetDecimal(3),
                            ErrorMessage = string.Empty
                        };
                    }

                    db.CommitTransaction();
                    committedResult = result;
                }
                catch
                {
                    db.RollbackTransaction();
                    throw;
                }
            }

            // Preview-only refresh starts after the refund is committed.
            // Never report a committed refund as failed because its preview failed.
            if (committedResult.Success)
            {
                try
                {
                    var parameters = new Dictionary<string, string>
                    {
                        { "ContractID", contractId.ToString("D") }
                    };
                    _uc.ProcessEngine.ProcessExecutor.Execute(
                        "UsrMCITRestorationExpiryPreview", parameters);
                }
                catch (Exception ex)
                {
                    global::Common.Logging.LogManager
                        .GetLogger("UsrMCITVMTerminationRestorationService")
                        .Error("VM restoration committed but preview refresh failed: " +
                               "VmId=" + vmId + ", ContractId=" + contractId +
                               ", OperationId=" + operationId + ": " + ex);
                }
            }
            return committedResult;
        }
    }
}
