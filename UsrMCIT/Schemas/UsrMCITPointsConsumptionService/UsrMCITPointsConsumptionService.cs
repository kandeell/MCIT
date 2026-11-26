using System;
using System.Data;
using Terrasoft.Core;
using Terrasoft.Core.DB;

namespace Terrasoft.Configuration
{
    public class UsrMCITPointsConsumptionResult
    {
        public bool Success { get; set; }
        public decimal AvailableUsed { get; set; }
        public decimal RestoredUsed { get; set; }
        public string ErrorMessage { get; set; }
    }

    public class UsrMCITPointsConsumptionService
    {
        private readonly UserConnection _uc;

        public UsrMCITPointsConsumptionService(UserConnection uc)
        {
            _uc = uc ?? throw new ArgumentNullException(nameof(uc));
        }

        public UsrMCITPointsConsumptionResult PostConsumption(
            Guid contractId, Guid requestId, Guid requestItemId,
            Guid virtualMachineId, Guid operationId, decimal pointsRequired)
        {
            UsrMCITPointsConsumptionResult result;
            using (var db = _uc.EnsureDBConnection()) {
                db.StartTransaction(IsolationLevel.Serializable);
                try {
                    result = PostConsumptionWithinTransaction(db, contractId,
                        requestId, requestItemId, virtualMachineId, operationId, pointsRequired);
                    db.CommitTransaction();
                } catch {
                    db.RollbackTransaction();
                    throw;
                }
            }
            try {
                RefreshPreview(contractId, operationId);
            } catch (Exception refreshError) {
                System.Diagnostics.Trace.TraceError(
                    "MCIT consumption preview refresh failed for operation {0}: {1}",
                    operationId, refreshError);
            }
            return result;
        }

        internal UsrMCITPointsConsumptionResult PostConsumptionWithinTransaction(
            DBExecutor db, Guid contractId, Guid requestId, Guid requestItemId,
            Guid virtualMachineId, Guid operationId, decimal pointsRequired,
            bool isBaseResize = false)
        {
            if (db == null || contractId == Guid.Empty || requestId == Guid.Empty ||
                operationId == Guid.Empty || pointsRequired <= 0)
                throw new ArgumentException("Invalid consumption input parameters.");
            if (isBaseResize && (requestItemId == Guid.Empty ||
                virtualMachineId == Guid.Empty || operationId != requestItemId))
                throw new ArgumentException("Invalid base-resize operation identity.");
            Guid actorId = _uc.CurrentUser.ContactId;
            const string sql = @"
SET NOCOUNT ON;

DECLARE @Zero uniqueidentifier =
    '00000000-0000-0000-0000-000000000000';

DECLARE @InitialType uniqueidentifier =
    'F5E6739B-9EBA-4B66-B581-E1408BC06240';

DECLARE @RestorationType uniqueidentifier =
    'A73D30E6-E5E0-4DDB-A62C-CA1A29EB2BF9';

DECLARE @TerminationRestorationType uniqueidentifier =
    '65A9C955-4B2A-4E70-9BAC-4AF75F1E0AED';

DECLARE @GenericConsumptionType uniqueidentifier =
    'CCE3062D-A79E-4ADB-BAFE-F731CA2B3340';

DECLARE @AvailableConsumptionType uniqueidentifier =
    '9714B14C-2A5F-4D72-A114-78833EF52F42';

DECLARE @RestoredConsumptionType uniqueidentifier =
    'DB304861-706C-4974-94AF-F337300181D0';

DECLARE @AvailableBalance uniqueidentifier =
    'E815D3E7-FF4B-4986-AE79-806570585C4F';

DECLARE @RestoredBalance uniqueidentifier =
    'BA34D604-C14E-49E1-80A4-1AAE00302C3F';

DECLARE @OperationName nvarchar(100) =
    N'MCIT-CONSUME-' + CONVERT(nvarchar(36), @OperationId);

DECLARE @ContractLock nvarchar(255) =
    N'MCIT-Consume-' + CONVERT(nvarchar(36), @ContractId);

DECLARE @LockResult int;

EXEC @LockResult = sys.sp_getapplock
    @Resource = @ContractLock,
    @LockMode = 'Exclusive',
    @LockOwner = 'Transaction',
    @LockTimeout = 15000;

IF @LockResult < 0
    THROW 51101, 'Consumption lock unavailable.', 1;

-- New-VM posting and resize posting must never share the same charge path.
-- The resize flag is internal: only the atomic lifecycle orchestrator may use it.
IF NOT EXISTS (
    SELECT 1
    FROM dbo.UsrVMRequest r WITH (UPDLOCK, HOLDLOCK)
    WHERE r.Id = @RequestId
      AND r.UsrContractId = @ContractId
      AND (
        (@IsBaseResize = 0 AND ISNULL(r.UsrTargetVirtualMachineId, @Zero) = @Zero)
        OR
        (@IsBaseResize = 1 AND r.UsrTargetVirtualMachineId = @VmId
         AND @VmId <> @Zero AND @RequestItemId <> @Zero
         AND @OperationId = @RequestItemId)
      )
)
    THROW 51115, 'Request is not eligible for this consumption path.', 1;

-- Do not reuse an operation identifier for another request.
IF EXISTS (
    SELECT 1
    FROM dbo.UsrPointTransaction
    WHERE UsrName = @OperationName
      AND (
        UsrContractId <> @ContractId
        OR UsrRequestId <> @RequestId
        OR ISNULL(UsrRequestItemId, @Zero) <> @RequestItemId
      )
)
    THROW 51102, 'Operation ID belongs to another request.', 1;

-- Return the original result for a successful retry.
DECLARE @ExistingCount int = 0;
DECLARE @ExistingAmount decimal(18,8) = 0;
DECLARE @ExistingAvailable decimal(18,8) = 0;
DECLARE @ExistingRestored decimal(18,8) = 0;

SELECT
    @ExistingCount = COUNT(*),
    @ExistingAmount = COALESCE(SUM(UsrQuantity), 0),
    @ExistingAvailable = COALESCE(SUM(
        CASE WHEN UsrTransactionTypeId = @AvailableConsumptionType
             THEN UsrQuantity ELSE 0 END), 0),
    @ExistingRestored = COALESCE(SUM(
        CASE WHEN UsrTransactionTypeId = @RestoredConsumptionType
             THEN UsrQuantity ELSE 0 END), 0)
FROM dbo.UsrPointTransaction WITH (UPDLOCK, HOLDLOCK)
WHERE UsrName = @OperationName
  AND UsrContractId = @ContractId
  AND UsrRequestId = @RequestId;

IF @ExistingCount > 0
BEGIN
    IF @ExistingAmount <> @Required
       OR @ExistingAvailable + @ExistingRestored <> @Required
        THROW 51103, 'Existing operation amount does not match.', 1;

    IF EXISTS (
        SELECT 1
        FROM dbo.UsrPointTransaction t
        OUTER APPLY (
            SELECT
                COUNT(*) AS Cnt,
                COALESCE(SUM(a.UsrQuantity), 0) AS Qty
            FROM dbo.UsrPointAllocation a
            WHERE a.UsrUsageTransactionId = t.Id
              AND a.UsrSourceTransactionId =
                  t.UsrOriginTransactionId
        ) a
        WHERE t.UsrName = @OperationName
          AND (a.Cnt <> 1 OR a.Qty <> t.UsrQuantity)
    )
        THROW 51104, 'Existing operation has invalid allocations.', 1;

    IF @IsBaseResize = 1 AND EXISTS (
        SELECT 1
        FROM dbo.UsrPointTransaction t
        JOIN dbo.UsrVMRequest r ON r.Id = @RequestId
        WHERE t.UsrName = @OperationName
          AND (
            ISNULL(t.UsrVirtualMachineId, @Zero) <> @VmId
            OR ISNULL(t.UsrRequestItemId, @Zero) <> @RequestItemId
            OR ISNULL(t.UsrContractId, @Zero) <> @ContractId
            OR ISNULL(t.UsrRequestId, @Zero) <> @RequestId
            OR ISNULL(t.UsrConfigVersionId, @Zero) <> ISNULL(r.UsrConfigVersionId, @Zero)
            OR t.UsrQuantity IS NULL OR t.UsrQuantity <= 0
            OR t.UsrTransactionTypeId IS NULL
            OR t.UsrTransactionTypeId NOT IN (@AvailableConsumptionType, @RestoredConsumptionType)
            OR ISNULL(t.UsrReason, N'') <> N'MCIT VM resource consumption'
          )
    )
        THROW 51116, 'Existing resize consumption does not match the operation.', 1;

    SELECT CAST(1 AS int),
           @ExistingAvailable,
           @ExistingRestored;
    RETURN;
END;

-- Recheck request identity and charge.
-- The BPMN remains responsible for its approval decision.
IF @IsBaseResize = 0
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM dbo.UsrVMRequest r
        WHERE r.Id = @RequestId
          AND r.UsrContractId = @ContractId
          AND ((@RequestItemId = @Zero AND r.UsrEstimatedPoints = @Required)
          OR EXISTS (
              SELECT 1 FROM dbo.UsrVMRequestItem i
              WHERE i.Id = @RequestItemId AND i.UsrRequestId = r.Id
                AND i.UsrTotalPointsSnapshot = @Required))
    )
        THROW 51105, 'Request, contract or points mismatch.', 1;
END
ELSE
BEGIN
    -- Only a positive base-resource upgrade is supported here.
    -- Approval, authorization, approved-specification integrity, original
    -- resource eligibility, and inventory update are the caller's duties.
    IF NOT EXISTS (
        SELECT 1
        FROM dbo.UsrVMRequest r WITH (UPDLOCK, HOLDLOCK)
        JOIN dbo.UsrVMRequestItem i WITH (UPDLOCK, HOLDLOCK)
          ON i.UsrRequestId = r.Id AND i.Id = @RequestItemId
        JOIN dbo.UsrVirtualMachine v WITH (UPDLOCK, HOLDLOCK)
          ON v.Id = @VmId AND v.UsrContractId = @ContractId
        WHERE r.Id = @RequestId AND r.UsrContractId = @ContractId
          AND r.UsrTargetVirtualMachineId = v.Id
          AND v.UsrStatusId = '41bb88e4-90bf-4a7e-8544-0af669ab6cbe'
          AND r.UsrConfigVersionId IS NOT NULL
          AND r.UsrConfigVersionId <> @Zero
          AND i.UsrConfigVersionId = r.UsrConfigVersionId
          AND i.UsrProvisioningStatusId = 'bf38ce52-dd76-41f3-8338-a78b42c3daa4'
          AND r.UsrStatusId IN (
            'd16b6935-b617-41c3-9acd-08b4034ab2a8',
            '6a672c37-8140-45c6-aea7-a2e82a7e55e3')
          AND ISNULL(r.UsrIsArchived, 0) = 0
          AND r.UsrResizeAdditionalPointsPreview = @Required
          AND r.UsrResizeReductionPointsPreview = 0
          AND v.UsrAllocatedPoints > 0
          AND i.UsrEstimatedPoints = i.UsrTotalPointsSnapshot
          AND i.UsrTotalPointsSnapshot = v.UsrAllocatedPoints + @Required
          AND i.UsrTotalAmountSnapshot >= 0
          AND ISNULL(i.UsrAdditionalRAMGB, 0) = 0
          AND ISNULL(i.UsrAdditionalStorageGB, 0) = 0
          AND ISNULL(i.UsrVPNMbps, 0) = 0
          AND ISNULL(i.UsrInternetMbps, 0) = 0
          AND i.UsrCPU >= v.UsrCPU
          AND i.UsrRAMGB >= v.UsrRAMGB
          AND i.UsrStorageGB >= v.UsrStorageGB
          AND ISNULL(i.UsrOperatingSystemId, @Zero) = ISNULL(v.UsrOperatingSystemId, @Zero)
          AND (SELECT COUNT(*) FROM dbo.UsrVMRequestItem
               WHERE UsrRequestId = @RequestId) = 1
          AND NOT EXISTS (
              SELECT 1 FROM dbo.UsrVMRequestItemAddOn
              WHERE UsrRequestItemId = i.Id)
    )
        THROW 51117, 'Base resize delta or target VM is inconsistent.', 1;
END;

IF @RequestItemId <> @Zero
   AND NOT EXISTS (
       SELECT 1
       FROM dbo.UsrVMRequestItem
       WHERE Id = @RequestItemId
         AND UsrRequestId = @RequestId
   )
    THROW 51106, 'Request item does not belong to request.', 1;

-- Reject another posted operation for the same request scope.
IF EXISTS (
    SELECT 1
    FROM dbo.UsrPointTransaction WITH (UPDLOCK, HOLDLOCK)
    WHERE UsrRequestId = @RequestId
      AND (
           @RequestItemId = @Zero
           OR ISNULL(UsrRequestItemId, @Zero) = @RequestItemId
      )
      AND UsrTransactionTypeId IN (
          @GenericConsumptionType,
          @AvailableConsumptionType,
          @RestoredConsumptionType
      )
)
    THROW 51107, 'Request already has Consumption transactions.', 1;

DECLARE @Remaining decimal(18,8) = @Required;
DECLARE @UsedAvailable decimal(18,8) = 0;
DECLARE @UsedRestored decimal(18,8) = 0;

DECLARE @Sources TABLE (
    Id uniqueidentifier PRIMARY KEY,
    Kind int NOT NULL,
    Expiry date NULL,
    Processed bit NOT NULL DEFAULT 0
);

INSERT INTO @Sources (Id, Kind, Expiry)
SELECT
    t.Id,
    CASE WHEN t.UsrTransactionTypeId = @InitialType
         THEN 0 ELSE 1 END,
    t.UsrExpirationDate
FROM dbo.UsrPointTransaction t
WHERE t.UsrContractId = @ContractId
  AND t.UsrQuantity > 0
  AND (
      t.UsrTransactionTypeId = @InitialType
      OR (
          t.UsrTransactionTypeId IN (@RestorationType, @TerminationRestorationType)
          AND t.UsrExpirationDate > CONVERT(date, GETDATE())
      )
  );

DECLARE @SourceId uniqueidentifier;
DECLARE @Kind int;
DECLARE @SourceQty decimal(18,8);
DECLARE @Allocated decimal(18,8);
DECLARE @Free decimal(18,8);
DECLARE @Take decimal(18,8);
DECLARE @UsageId uniqueidentifier;
DECLARE @UsageType uniqueidentifier;
DECLARE @BalanceType uniqueidentifier;
DECLARE @ExpiryLock nvarchar(255);

WHILE @Remaining > 0
BEGIN
    SET @SourceId = NULL;

    SELECT TOP (1)
        @SourceId = Id,
        @Kind = Kind
    FROM @Sources
    WHERE Processed = 0
    ORDER BY Kind, Expiry, Id;

    IF @SourceId IS NULL
        BREAK;

    UPDATE @Sources
    SET Processed = 1
    WHERE Id = @SourceId;

    -- Use the same restoration lock name as the expiry service.
    IF @Kind = 1
    BEGIN
        SET @ExpiryLock =
            N'MCIT-Expiry-' + CONVERT(nvarchar(36), @SourceId);

        EXEC @LockResult = sys.sp_getapplock
            @Resource = @ExpiryLock,
            @LockMode = 'Exclusive',
            @LockOwner = 'Transaction',
            @LockTimeout = 15000;

        IF @LockResult < 0
            THROW 51108, 'Restoration lock unavailable.', 1;
    END;

    SET @SourceQty = NULL;

    SELECT @SourceQty = UsrQuantity
    FROM dbo.UsrPointTransaction WITH (UPDLOCK, HOLDLOCK)
    WHERE Id = @SourceId
      AND UsrContractId = @ContractId
      AND (
          (@Kind = 0 AND UsrTransactionTypeId = @InitialType)
          OR
          (@Kind = 1
           AND UsrTransactionTypeId IN (@RestorationType, @TerminationRestorationType)
           AND UsrExpirationDate > CONVERT(date, GETDATE()))
      );

    IF @SourceQty IS NULL
        CONTINUE;

    SELECT @Allocated = COALESCE(SUM(UsrQuantity), 0)
    FROM dbo.UsrPointAllocation WITH (UPDLOCK, HOLDLOCK)
    WHERE UsrSourceTransactionId = @SourceId;

    SET @Free = @SourceQty - @Allocated;

    IF @Free < 0
        THROW 51109, 'Funding source is over-allocated.', 1;

    IF @Free = 0
        CONTINUE;

    SET @Take =
        CASE WHEN @Remaining < @Free
             THEN @Remaining ELSE @Free END;

    SET @UsageId = NEWID();

    SET @UsageType =
        CASE WHEN @Kind = 0
             THEN @AvailableConsumptionType
             ELSE @RestoredConsumptionType END;

    SET @BalanceType =
        CASE WHEN @Kind = 0
             THEN @AvailableBalance
             ELSE @RestoredBalance END;

    INSERT INTO dbo.UsrPointTransaction (
        Id,
        CreatedOn, CreatedById,
        ModifiedOn, ModifiedById,
        UsrName,
        UsrQuantity,
        UsrTransactionDate,
        UsrTransactionTypeId,
        UsrContractId,
        UsrOriginTransactionId,
        UsrSourceBalanceId,
        UsrConfigVersionId,
        UsrVirtualMachineId,
        UsrRequestId,
        UsrRequestItemId,
        UsrActorId,
        UsrReason
    )
    SELECT
        @UsageId,
        GETDATE(), @ActorId,
        GETDATE(), @ActorId,
        @OperationName,
        @Take,
        GETDATE(),
        @UsageType,
        @ContractId,
        @SourceId,
        @BalanceType,
        (SELECT r.UsrConfigVersionId FROM dbo.UsrVMRequest r WHERE r.Id = @RequestId),
        NULLIF(@VmId, @Zero),
        @RequestId,
        NULLIF(@RequestItemId, @Zero),
        @ActorId,
        CASE WHEN @IsBaseResize = 1
             THEN N'MCIT VM resource consumption'
             ELSE N'MCIT points consumption' END
    FROM dbo.UsrPointTransaction s
    WHERE s.Id = @SourceId;

    IF @@ROWCOUNT <> 1
        THROW 51110, 'Consumption insert failed.', 1;

    INSERT INTO dbo.UsrPointAllocation (
        Id,
        CreatedOn, CreatedById,
        ModifiedOn, ModifiedById,
        UsrName,
        UsrSourceTransactionId,
        UsrUsageTransactionId,
        UsrQuantity
    )
    VALUES (
        NEWID(),
        GETDATE(), @ActorId,
        GETDATE(), @ActorId,
        N'MCIT Consumption Allocation',
        @SourceId,
        @UsageId,
        @Take
    );

    IF @@ROWCOUNT <> 1
        THROW 51111, 'Allocation insert failed.', 1;

    SET @Remaining = @Remaining - @Take;

    IF @Kind = 0
        SET @UsedAvailable = @UsedAvailable + @Take;
    ELSE
        SET @UsedRestored = @UsedRestored + @Take;
END;

IF @Remaining <> 0
    THROW 51112, 'Insufficient eligible points.', 1;

-- Verify every posted transaction has exactly one matching allocation.
IF EXISTS (
    SELECT 1
    FROM dbo.UsrPointTransaction t
    OUTER APPLY (
        SELECT
            COUNT(*) AS Cnt,
            COALESCE(SUM(a.UsrQuantity), 0) AS Qty
        FROM dbo.UsrPointAllocation a
        WHERE a.UsrUsageTransactionId = t.Id
          AND a.UsrSourceTransactionId =
              t.UsrOriginTransactionId
    ) a
    WHERE t.UsrName = @OperationName
      AND (a.Cnt <> 1 OR a.Qty <> t.UsrQuantity)
)
    THROW 51113, 'Consumption allocation verification failed.', 1;

IF @UsedAvailable + @UsedRestored <> @Required
    THROW 51114, 'Consumption total mismatch.', 1;

SELECT CAST(1 AS int),
       @UsedAvailable,
       @UsedRestored;
";

            var query = new CustomQuery(_uc, sql)
                .WithParameter("ContractId", contractId)
                .WithParameter("RequestId", requestId)
                .WithParameter("RequestItemId", requestItemId)
                .WithParameter("VmId", virtualMachineId)
                .WithParameter("OperationId", operationId)
                .WithParameter("Required", pointsRequired)
                .WithParameter("IsBaseResize", isBaseResize)
                .WithParameter("ActorId", actorId);
            using (IDataReader reader = query.ExecuteReader(db)) {
                if (!reader.Read())
                    throw new InvalidOperationException("Consumption did not return a result.");
                return new UsrMCITPointsConsumptionResult {
                    Success = reader.GetInt32(0) == 1,
                    AvailableUsed = reader.GetDecimal(1),
                    RestoredUsed = reader.GetDecimal(2),
                    ErrorMessage = ""
                };
            }
        }

        internal void RefreshPreview(Guid contractId, Guid operationId)
        {
            try {
                new UsrMCITRestoredPointsExpiryService(_uc).RefreshContractPreview(contractId);
            } catch (Exception ex) {
                global::Common.Logging.LogManager
                    .GetLogger("UsrMCITPointsConsumptionService")
                    .Error("Consumption committed but expiry preview refresh failed: " +
                           "ContractId=" + contractId + ", OperationId=" + operationId + ": " + ex);
            }
        }
    }
}
