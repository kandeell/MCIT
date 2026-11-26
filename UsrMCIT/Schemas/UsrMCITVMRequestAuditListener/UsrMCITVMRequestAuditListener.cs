/*
 * MCIT Business Audit — VM Request Entity Event Listener (V1)
 * Create as a Creatio "Source code" schema in the UsrMCIT package.
 * Schema name suggestion: UsrMCITVMRequestAuditListener
 *
 * Requires:
 *   UsrVMRequest object, columns UsrNumber and UsrStatus (lookup).
 *   UsrMCITBusinessAuditEvent object registered in Creatio with the fields used below.
 *
 * Server-side entity events capture ORM saves, NOT direct SQL writes. This initial
 * version records successful inserts and updates. Permission/retention hardening
 * is required before production.
 */
using System;
using System.Data;
using Terrasoft.Core.DB;
using Terrasoft.Core;
using Terrasoft.Core.Entities;
using Terrasoft.Core.Entities.Events;

namespace Terrasoft.Configuration
{
    [EntityEventListener(SchemaName = "UsrVMRequest")]
    public class UsrMCITVMRequestAuditListener : BaseEntityEventListener
    {
        private const string AuditSchema = "UsrMCITBusinessAuditEvent";
        private const string RequestSchema = "UsrVMRequest";

        private static readonly Guid SubmittedStatus =
            new Guid("413c2c0c-63c6-49c1-8589-4923ced10b56");

        public override void OnUpdating(object sender, EntityBeforeEventArgs e)
        {
            base.OnUpdating(sender, e);
            var request = (Entity)sender;
            var oldStatus = request.GetTypedOldColumnValue<Guid>("UsrStatusId");
            var newStatus = request.GetTypedColumnValue<Guid>("UsrStatusId");
            if (newStatus == SubmittedStatus && oldStatus != SubmittedStatus)
            {
                var targetVmId = request.GetTypedColumnValue<Guid>("UsrTargetVirtualMachineId");
                var validated = ValidateSubmission(request.UserConnection, request.PrimaryColumnValue, targetVmId);
                request.SetColumnValue("UsrEstimatedPoints", validated.Item1);
                request.SetColumnValue("UsrConfigVersionId", validated.Item2);
                request.SetColumnValue("UsrResizeAdditionalPointsPreview", validated.Item3);
                request.SetColumnValue("UsrResizeReductionPointsPreview", validated.Item4);
            }
        }

        private static Tuple<decimal, Guid, decimal, decimal> ValidateSubmission(UserConnection uc, Guid requestId, Guid targetVmId)
        {
            if (requestId == Guid.Empty)
                throw new InvalidOperationException("Save the VM request before submission.");

            const string sql = @"
SET NOCOUNT ON;
DECLARE @ContractId uniqueidentifier, @VersionId uniqueidentifier,
        @CurrencyId uniqueidentifier,
        @Today date = CONVERT(date, GETDATE());
SELECT @ContractId = r.UsrContractId, @VersionId = r.UsrConfigVersionId,
       @CurrencyId = c.UsrCurrencyId
FROM dbo.UsrVMRequest r
JOIN dbo.UsrMCITContract c ON c.Id = r.UsrContractId
WHERE r.Id = @RequestId
  AND c.UsrStatusId = '5f9739e9-4f5c-42ba-8157-d1e2468a27e4'
  AND c.UsrStartDate <= @Today
  AND (c.UsrEndDate IS NULL OR c.UsrEndDate >= @Today);
IF @VersionId IS NULL
BEGIN
    IF (SELECT COUNT(DISTINCT UsrConfigVersionId) FROM dbo.UsrVMRequestItem
        WHERE UsrRequestId = @RequestId) <> 1
        THROW 51311, 'All VM items must select one configuration version.', 1;
    SELECT TOP (1) @VersionId = UsrConfigVersionId FROM dbo.UsrVMRequestItem
        WHERE UsrRequestId = @RequestId;
END;
IF @ContractId IS NULL OR @VersionId IS NULL OR @CurrencyId IS NULL
    THROW 51301, 'An active, effective contract, configuration and currency are required.', 1;
IF (SELECT COUNT(*) FROM dbo.UsrContractConfigVersion v
    WHERE v.UsrContractId = @ContractId
      AND v.UsrConfigVersionStatusId = 'e7d05248-9d33-41c3-b688-c0b172b039cc'
      AND v.UsrEffectiveFrom <= GETDATE()
      AND (v.UsrEffectiveTo IS NULL OR v.UsrEffectiveTo >= @Today)) <> 1
    THROW 51302, 'The contract must have exactly one effective active configuration.', 1;
IF NOT EXISTS (SELECT 1 FROM dbo.UsrContractConfigVersion v
    WHERE v.Id = @VersionId AND v.UsrContractId = @ContractId
      AND v.UsrConfigVersionStatusId = 'e7d05248-9d33-41c3-b688-c0b172b039cc'
      AND v.UsrEffectiveFrom <= GETDATE()
      AND (v.UsrEffectiveTo IS NULL OR v.UsrEffectiveTo >= @Today))
    THROW 51303, 'Request configuration is not the effective active contract version.', 1;
IF NOT EXISTS (SELECT 1 FROM dbo.UsrVMRequestItem WHERE UsrRequestId = @RequestId)
    THROW 51304, 'Add at least one VM request item.', 1;
IF EXISTS (SELECT 1 FROM dbo.UsrVMRequestItem i
    JOIN dbo.UsrContractConfigVersion v ON v.Id = @VersionId
    WHERE i.UsrRequestId = @RequestId AND
      (i.UsrConfigVersionId <> @VersionId OR i.UsrConfigVersionId IS NULL
       OR i.UsrEstimatedPoints <= 0 OR i.UsrEstimatedPoints IS NULL
       OR v.UsrCPUPerPoint <= 0 OR v.UsrRAMGBPerPoint <= 0
       OR v.UsrStorageGBPerPoint <= 0
       OR i.UsrEstimatedPoints < v.UsrMinPointsPerVM
       OR i.UsrEstimatedPoints > v.UsrMaxPointsPerVM
       OR (v.UsrPointIncrement > 0 AND
           (i.UsrEstimatedPoints - v.UsrMinPointsPerVM) / v.UsrPointIncrement
           <> FLOOR((i.UsrEstimatedPoints - v.UsrMinPointsPerVM) / v.UsrPointIncrement))
       OR i.UsrCPU <> i.UsrEstimatedPoints * v.UsrCPUPerPoint
       OR i.UsrRAMGB <> i.UsrEstimatedPoints * v.UsrRAMGBPerPoint + COALESCE(i.UsrAdditionalRAMGB,0)
       OR i.UsrStorageGB <> i.UsrEstimatedPoints * v.UsrStorageGBPerPoint + COALESCE(i.UsrAdditionalStorageGB,0)
       OR COALESCE(i.UsrAdditionalRAMGB,0) < 0
       OR COALESCE(i.UsrAdditionalStorageGB,0) < 0
       OR COALESCE(i.UsrVPNMbps,0) < 0
       OR COALESCE(i.UsrInternetMbps,0) < 0))
    THROW 51305, 'A VM item has invalid quantity, dimensions or configuration.', 1;
IF EXISTS (
    SELECT 1 FROM dbo.UsrVMRequestItem i
    CROSS APPLY (VALUES
       ('ADD_RAM', COALESCE(i.UsrAdditionalRAMGB,0), 'GB'),
       ('ADD_STORAGE', COALESCE(i.UsrAdditionalStorageGB,0), 'GB'),
       ('VPN', COALESCE(i.UsrVPNMbps,0), 'Mbps'),
       ('INTERNET', COALESCE(i.UsrInternetMbps,0), 'Mbps')
    ) x(Code, Qty, Unit)
    OUTER APPLY (
       SELECT COUNT(*) AS Cnt, MAX(rr.UsrPointsPerUnit) AS PointsPerUnit,
              MAX(rr.UsrAmountPerUnit) AS AmountPerUnit,
              MAX(CONVERT(nvarchar(36), rr.UsrCurrencyId)) AS RateCurrency,
              MAX(p.Name) AS UnitName
       FROM dbo.UsrConfigResourceRate rr
       JOIN dbo.UsrMCITResourceType t ON t.Id = rr.UsrResourceTypeId
       LEFT JOIN dbo.UsrPricingUnit p ON p.Id = rr.UsrPricingUnitLookupId
       WHERE rr.UsrConfigVersionId = @VersionId AND t.UsrCode = x.Code
         AND t.UsrActive = 1
    ) rate
    WHERE i.UsrRequestId = @RequestId AND x.Qty > 0 AND
      (rate.Cnt <> 1 OR rate.PointsPerUnit IS NULL OR rate.PointsPerUnit < 0
       OR rate.AmountPerUnit IS NULL OR rate.AmountPerUnit < 0
       OR rate.RateCurrency <> CONVERT(nvarchar(36), @CurrencyId) OR rate.RateCurrency IS NULL
       OR rate.UnitName IS NULL OR rate.UnitName NOT LIKE '%' + x.Unit + '%')
) THROW 51306, 'A selected resource lacks one valid version rate, unit or currency.', 1;
IF EXISTS (
    SELECT 1 FROM dbo.UsrVMRequestItem i
    OUTER APPLY (
       SELECT SUM(x.Qty * rr.UsrPointsPerUnit) AS ExtraPoints,
              SUM(x.Qty * rr.UsrAmountPerUnit) AS ExtraAmount
       FROM (VALUES
         ('ADD_RAM',COALESCE(i.UsrAdditionalRAMGB,0)),
         ('ADD_STORAGE',COALESCE(i.UsrAdditionalStorageGB,0)),
         ('VPN',COALESCE(i.UsrVPNMbps,0)),
         ('INTERNET',COALESCE(i.UsrInternetMbps,0))
       ) x(Code,Qty)
       JOIN dbo.UsrMCITResourceType t ON t.UsrCode = x.Code
       JOIN dbo.UsrConfigResourceRate rr ON rr.UsrResourceTypeId = t.Id
            AND rr.UsrConfigVersionId = @VersionId
       WHERE x.Qty > 0
    ) calc
    WHERE i.UsrRequestId = @RequestId AND
      (ABS(COALESCE(i.UsrTotalPointsSnapshot,0)
           - i.UsrEstimatedPoints - COALESCE(calc.ExtraPoints,0)) > 0.000001
       OR ABS(COALESCE(i.UsrTotalAmountSnapshot,0)
           - COALESCE(calc.ExtraAmount,0)) > 0.000001
       OR (COALESCE(calc.ExtraAmount,0) > 0 AND i.UsrCurrencyId <> @CurrencyId))
) THROW 51307, 'VM item pricing snapshots do not match version resource rates.', 1;
IF EXISTS (
    SELECT 1 FROM dbo.UsrVMRequestItemAddOn a
    JOIN dbo.UsrVMRequestItem i ON i.Id = a.UsrRequestItemId
    LEFT JOIN dbo.UsrConfigAddOnRate ar ON ar.Id = a.UsrConfigAddOnRateId
    WHERE i.UsrRequestId = @RequestId AND
      (ar.Id IS NULL OR a.UsrAddOnId <> ar.UsrAddOnId
       OR a.UsrConfigVersionId <> @VersionId
       OR ar.UsrConfigVersionId <> @VersionId OR ISNULL(ar.UsrActive,0) <> 1
       OR a.UsrQuantity <= 0 OR a.UsrQuantity IS NULL
       OR (ar.UsrMinQuantity > 0 AND a.UsrQuantity < ar.UsrMinQuantity)
       OR (ar.UsrMaxQuantity > 0 AND a.UsrQuantity > ar.UsrMaxQuantity)
       OR (ar.UsrIncrement > 0 AND
           (a.UsrQuantity - COALESCE(ar.UsrMinQuantity,0)) / ar.UsrIncrement
           <> FLOOR((a.UsrQuantity - COALESCE(ar.UsrMinQuantity,0)) / ar.UsrIncrement))
       OR a.UsrCurrencyId <> @CurrencyId OR ar.UsrCurrencyId <> @CurrencyId
       OR a.UsrUnitSnapshot IS NULL OR a.UsrUnitSnapshot <> ar.UsrUnit
       OR a.UsrUnitPriceSnapshot IS NULL OR ar.UsrUnitPrice IS NULL
       OR ABS(a.UsrUnitPriceSnapshot - ar.UsrUnitPrice) > 0.000001
       OR a.UsrTotalAmountSnapshot IS NULL
       OR ABS(a.UsrTotalAmountSnapshot - a.UsrQuantity * ar.UsrUnitPrice) > 0.000001)
) THROW 51308, 'An add-on snapshot is invalid for this contract version.', 1;
DECLARE @Required decimal(18,8) = 0, @Free decimal(18,8) = 0;
SELECT @Required = COALESCE(SUM(UsrTotalPointsSnapshot),0)
FROM dbo.UsrVMRequestItem WHERE UsrRequestId = @RequestId;
IF @Required <= 0
    THROW 51309, 'Validated item point total must be positive.', 1;
SELECT @Free = COALESCE(SUM(CASE WHEN t.UsrQuantity > COALESCE(a.Used,0)
           THEN t.UsrQuantity - COALESCE(a.Used,0) ELSE 0 END),0)
FROM dbo.UsrPointTransaction t
OUTER APPLY (SELECT SUM(UsrQuantity) AS Used FROM dbo.UsrPointAllocation
             WHERE UsrSourceTransactionId = t.Id) a
WHERE t.UsrContractId = @ContractId AND
 (t.UsrTransactionTypeId = 'F5E6739B-9EBA-4B66-B581-E1408BC06240'
 OR (t.UsrTransactionTypeId IN
       ('A73D30E6-E5E0-4DDB-A62C-CA1A29EB2BF9',
        '65A9C955-4B2A-4E70-9BAC-4AF75F1E0AED')
     AND t.UsrExpirationDate > @Today));
DECLARE @CurrentVmPoints decimal(18,8) = NULL;
IF @TargetVmId <> '00000000-0000-0000-0000-000000000000'
BEGIN
    IF (SELECT COUNT(*) FROM dbo.UsrVMRequestItem WHERE UsrRequestId = @RequestId) <> 1
        THROW 51312, 'A resize request must contain exactly one VM item.', 1;
    SELECT @CurrentVmPoints = v.UsrAllocatedPoints
    FROM dbo.UsrVirtualMachine v
    WHERE v.Id = @TargetVmId AND v.UsrContractId = @ContractId
      AND v.UsrStatusId = '41bb88e4-90bf-4a7e-8544-0af669ab6cbe';
    IF @CurrentVmPoints IS NULL OR @CurrentVmPoints < 0
        THROW 51313, 'Target VM must be active and belong to the request contract.', 1;
END;
DECLARE @AdditionalPoints decimal(18,8) = 0;
DECLARE @ReductionPoints decimal(18,8) = 0;
DECLARE @PointsToValidate decimal(18,8) = @Required;

IF @CurrentVmPoints IS NOT NULL
BEGIN
    SET @AdditionalPoints =
        CASE WHEN @Required > @CurrentVmPoints
             THEN @Required - @CurrentVmPoints ELSE 0 END;
    SET @ReductionPoints =
        CASE WHEN @CurrentVmPoints > @Required
             THEN @CurrentVmPoints - @Required ELSE 0 END;
    SET @PointsToValidate = @AdditionalPoints;
END;

IF @Free < @PointsToValidate
    THROW 51310, 'Insufficient available and unexpired restored points for this request.', 1;

SELECT @Required, @VersionId, @ContractId,
       @AdditionalPoints, @ReductionPoints;";
            using (var db = uc.EnsureDBConnection())
            {
                using (var reader = new Terrasoft.Core.DB.CustomQuery(uc, sql)
                    .WithParameter("RequestId", requestId)
                    .WithParameter("TargetVmId", targetVmId).ExecuteReader(db))
                {
                    if (!reader.Read())
                        throw new InvalidOperationException("Submission validation returned no result.");
                    var selected = UsrMCITEffectiveConfigurationSelector.ResolveForNewRequest(uc, reader.GetGuid(2), DateTime.Now);
                    if (selected != reader.GetGuid(1))
                        throw new InvalidOperationException("The selected configuration is not the authorized effective version.");
                    return Tuple.Create(reader.GetDecimal(0), reader.GetGuid(1),
                        reader.GetDecimal(3), reader.GetDecimal(4));
                }
            }
        }

        public override void OnInserted(object sender, EntityAfterEventArgs e)
        {
            base.OnInserted(sender, e);
            var request = (Entity)sender;
            WriteAudit(request, e.PrimaryColumnValue, "VM_REQUEST_CREATED",
                "Created", "Request created", null, null, null);
        }

        public override void OnUpdated(object sender, EntityAfterEventArgs e)
        {
            base.OnUpdated(sender, e);
            var request = (Entity)sender;
            var changed = e.ModifiedColumnValues;
            var status = changed == null ? null :
                (changed.FindByName("UsrStatus") ?? changed.FindByName("UsrStatusId"));

            if (status != null && !Object.Equals(status.OldValue, status.Value))
            {
                // Only status lookup IDs are logged here, not arbitrary field data.
                WriteAudit(request, e.PrimaryColumnValue, "VM_REQUEST_STATUS_CHANGED",
                    "Status changed", "Request status changed", "UsrStatus",
                    ToSafeText(status.OldValue), ToSafeText(status.Value));
            }
            else
            {
                // One generic update event; do not log possibly sensitive field values.
                WriteAudit(request, e.PrimaryColumnValue, "VM_REQUEST_UPDATED",
                    "Updated", "Request updated", null, null, null);
            }
        }

        private static string ToSafeText(object value)
        {
            return value == null ? "" : value.ToString();
        }

        private static string RequestNumber(Entity request)
        {
            // Partial entity updates might not have UsrNumber loaded.
            if (!request.GetIsColumnValueLoaded("UsrNumber"))
            {
                return "";
            }
            var number = request.GetTypedColumnValue<string>("UsrNumber") ?? "";
            return number.Length <= 100 ? number : number.Substring(0, 100);
        }

        private static void WriteAudit(
            Entity request,
            Guid requestId,
            string eventCode,
            string action,
            string description,
            string fieldName,
            string oldValue,
            string newValue)
        {
            var userConnection = request.UserConnection;
            var schema = userConnection.EntitySchemaManager.GetInstanceByName(AuditSchema);
            var audit = schema.CreateEntity(userConnection);
            audit.SetDefColumnValues();

            var requestNumber = RequestNumber(request);
            var label = String.IsNullOrWhiteSpace(requestNumber)
                ? "VM Request " + requestId.ToString("D")
                : "VM Request " + requestNumber;

            audit.SetColumnValue("UsrName", label);
            audit.SetColumnValue("UsrEventCode", eventCode);
            audit.SetColumnValue("UsrModule", "VM Requests");
            audit.SetColumnValue("UsrRecordSchema", RequestSchema);
            audit.SetColumnValue("UsrRecordId", requestId);
            audit.SetColumnValue("UsrRecordNumber", requestNumber);
            audit.SetColumnValue("UsrAction", action);
            audit.SetColumnValue("UsrOutcome", "Success");
            audit.SetColumnValue("UsrDescription", description);

            var contactId = userConnection.CurrentUser.ContactId;
            if (contactId != Guid.Empty)
            {
                audit.SetColumnValue("UsrActorId", contactId);
            }
            if (!String.IsNullOrEmpty(fieldName))
            {
                audit.SetColumnValue("UsrFieldName", fieldName);
            }
            if (!String.IsNullOrEmpty(oldValue))
            {
                audit.SetColumnValue("UsrOldValue", oldValue);
            }
            if (!String.IsNullOrEmpty(newValue))
            {
                audit.SetColumnValue("UsrNewValue", newValue);
            }

            // Intentionally no UsrCorrelationId: no shared process correlation is known.
            // Save through Creatio's entity ORM, not an ad-hoc SQL statement.
            audit.Save(false);
        }
    }
    [EntityEventListener(SchemaName = "UsrVMRequestItemAddOn")]
    public class UsrMCITVMRequestItemAddOnSnapshotListener : BaseEntityEventListener
    {
        public override void OnInserting(object sender, EntityBeforeEventArgs e)
        {
            base.OnInserting(sender, e);
            Capture((Entity)sender);
        }

        public override void OnUpdating(object sender, EntityBeforeEventArgs e)
        {
            base.OnUpdating(sender, e);
            Capture((Entity)sender);
        }

        private static void Capture(Entity row)
        {
            var itemId = row.GetTypedColumnValue<Guid>("UsrRequestItemId");
            var rateId = row.GetTypedColumnValue<Guid>("UsrConfigAddOnRateId");
            var quantity = row.GetTypedColumnValue<decimal>("UsrQuantity");
            if (itemId == Guid.Empty || rateId == Guid.Empty || quantity <= 0)
                throw new InvalidOperationException("An add-on needs a request item, configured rate and positive quantity.");

            const string sql = @"
SELECT ar.UsrAddOnId, ar.UsrConfigVersionId, ar.UsrCurrencyId,
       ar.UsrUnit, ar.UsrUnitPrice, a.UsrName
FROM dbo.UsrConfigAddOnRate ar
JOIN dbo.UsrVMRequestItem i ON i.Id = @ItemId
JOIN dbo.UsrVMRequest r ON r.Id = i.UsrRequestId
JOIN dbo.UsrMCITContract c ON c.Id = r.UsrContractId
JOIN dbo.UsrMCITAddOn a ON a.Id = ar.UsrAddOnId
WHERE ar.Id = @RateId AND ar.UsrActive = 1
  AND ar.UsrConfigVersionId = i.UsrConfigVersionId
  AND (r.UsrConfigVersionId IS NULL OR i.UsrConfigVersionId = r.UsrConfigVersionId)
  AND ar.UsrCurrencyId = c.UsrCurrencyId
  AND ar.UsrUnit IS NOT NULL AND ar.UsrUnitPrice >= 0
  AND r.UsrStatusId IN
    ('7ea8f4ea-01ee-456d-8825-44bacf87f9df',
     '049976cb-681d-484a-b95f-e8f0cba3a1ac')
  AND (@Quantity >= ISNULL(NULLIF(ar.UsrMinQuantity,0), @Quantity))
  AND (@Quantity <= ISNULL(NULLIF(ar.UsrMaxQuantity,0), @Quantity))
  AND (ISNULL(ar.UsrIncrement,0) <= 0 OR
       (@Quantity - ISNULL(ar.UsrMinQuantity,0)) / ar.UsrIncrement =
       FLOOR((@Quantity - ISNULL(ar.UsrMinQuantity,0)) / ar.UsrIncrement));";

            using (var db = row.UserConnection.EnsureDBConnection())
            using (var reader = new CustomQuery(row.UserConnection, sql)
                .WithParameter("ItemId", itemId)
                .WithParameter("RateId", rateId)
                .WithParameter("Quantity", quantity)
                .ExecuteReader(db))
            {
                if (!reader.Read())
                    throw new InvalidOperationException(
                        "Add-on rate, configuration, currency, quantity or editable request status is invalid.");
                row.SetColumnValue("UsrAddOnId", reader.GetGuid(0));
                row.SetColumnValue("UsrConfigVersionId", reader.GetGuid(1));
                row.SetColumnValue("UsrCurrencyId", reader.GetGuid(2));
                row.SetColumnValue("UsrUnitSnapshot", reader.GetString(3));
                var unitPrice = reader.GetDecimal(4);
                row.SetColumnValue("UsrUnitPriceSnapshot", unitPrice);
                row.SetColumnValue("UsrTotalAmountSnapshot", unitPrice * quantity);
                row.SetColumnValue("UsrName", reader.IsDBNull(5) ? "Add-on" : reader.GetString(5));
            }
        }
    }

    [EntityEventListener(SchemaName = "UsrPointTransaction")]
    public class UsrMCITRestorationPreviewListener : BaseEntityEventListener
    {
        private static readonly Guid OrdinaryRestoration =
            new Guid("A73D30E6-E5E0-4DDB-A62C-CA1A29EB2BF9");
        private static readonly Guid TerminationRestoration =
            new Guid("65A9C955-4B2A-4E70-9BAC-4AF75F1E0AED");

        public override void OnInserted(object sender, EntityAfterEventArgs e)
        {
            base.OnInserted(sender, e);
            var transaction = (Entity)sender;
            var typeId = transaction.GetTypedColumnValue<Guid>("UsrTransactionTypeId");
            if (typeId != OrdinaryRestoration && typeId != TerminationRestoration)
                return;
            var contractId = transaction.GetTypedColumnValue<Guid>("UsrContractId");
            if (contractId == Guid.Empty)
                return;
            new UsrMCITRestoredPointsExpiryService(transaction.UserConnection)
                .RefreshContractPreview(contractId);
        }
    }

}
