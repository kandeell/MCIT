
using System;
using System.Collections.Generic;
using System.Linq;
using System.Data;
using System.Runtime.Serialization;
using Terrasoft.Core;
using Terrasoft.Core.DB;

namespace Terrasoft.Configuration
{
    [DataContract]
    public sealed class UsrMCITReconciliationFinding {
        [DataMember] public string Category { get; set; }
        [DataMember] public Guid RecordId { get; set; }
        [DataMember] public Guid ContractId { get; set; }
        [DataMember] public string EntityName { get; set; }
    }

    public class UsrMCITRestoredPointsExpiryService
    {
        private readonly UserConnection _userConnection;

        private static readonly Guid RestorationTypeId =
            new Guid("A73D30E6-E5E0-4DDB-A62C-CA1A29EB2BF9");

        private static readonly Guid TerminationRestorationTypeId =
            new Guid("65A9C955-4B2A-4E70-9BAC-4AF75F1E0AED");

        private static readonly Guid ConsumptionTypeId =
            new Guid("CCE3062D-A79E-4ADB-BAFE-F731CA2B3340");

        private static readonly Guid ConsumptionFromRestoredTypeId =
            new Guid("DB304861-706C-4974-94AF-F337300181D0");

        private static readonly Guid ExpiryTypeId =
            new Guid("D453D044-57BC-46CE-87FA-90E640B2E6F8");

        private static readonly Guid RestoredBalanceId =
            new Guid("BA34D604-C14E-49E1-80A4-1AAE00302C3F");

        public UsrMCITRestoredPointsExpiryService(
            UserConnection userConnection)
        {
            _userConnection = userConnection
                ?? throw new ArgumentNullException(
                    nameof(userConnection));
        }

        private sealed class Candidate
        {
            public Guid Id { get; set; }
            public DateTime ExpirationDate { get; set; }
        }

        // Find expired restorations that still have
        // unused points and have not been processed.
        // Uses keyset pagination for bounded batches.
        private List<Candidate> FindPending(
            int batchSize,
            DateTime lastDate,
            Guid lastId)
        {
            const string sql = @"
SELECT TOP (@BatchSize)
    r.Id,
    r.UsrExpirationDate
FROM dbo.UsrPointTransaction r
WHERE r.UsrTransactionTypeId IN (@RestorationTypeId, @TerminationRestorationTypeId)
  AND r.UsrExpirationDate <= CONVERT(date, GETDATE())

  AND (
        r.UsrExpirationDate > @LastDate
        OR (
            r.UsrExpirationDate = @LastDate
            AND r.Id > @LastId
        )
  )

  AND NOT EXISTS (
      SELECT 1
      FROM dbo.UsrPointTransaction e
      WHERE e.UsrOriginTransactionId = r.Id
        AND e.UsrTransactionTypeId = @ExpiryTypeId
  )

  AND r.UsrQuantity > COALESCE((
      SELECT SUM(a.UsrQuantity)
      FROM dbo.UsrPointAllocation a
      INNER JOIN dbo.UsrPointTransaction t
          ON t.Id = a.UsrUsageTransactionId
      WHERE a.UsrSourceTransactionId = r.Id
        AND t.UsrTransactionTypeId IN (
            @ConsumptionTypeId,
            @ConsumptionFromRestoredTypeId
        )
  ), 0)

ORDER BY
    r.UsrExpirationDate,
    r.Id;";

            var results = new List<Candidate>();

            using (var db = _userConnection.EnsureDBConnection())
            {
                var query = new CustomQuery(_userConnection, sql)
                    .WithParameter("BatchSize", batchSize)
                    .WithParameter(
                        "RestorationTypeId",
                        RestorationTypeId)
                    .WithParameter("TerminationRestorationTypeId", TerminationRestorationTypeId)
                    .WithParameter(
                        "ConsumptionTypeId",
                        ConsumptionTypeId)
                    .WithParameter(
                        "ConsumptionFromRestoredTypeId",
                        ConsumptionFromRestoredTypeId)
                    .WithParameter(
                        "ExpiryTypeId",
                        ExpiryTypeId)
                    .WithParameter("LastDate", lastDate)
                    .WithParameter("LastId", lastId);

                using (IDataReader reader = query.ExecuteReader(db))
                {
                    while (reader.Read())
                    {
                        results.Add(new Candidate
                        {
                            Id = reader.GetGuid(0),
                            ExpirationDate = reader.GetDateTime(1)
                        });
                    }
                }
            }

            return results;
        }

        // Atomically post one expiry transaction
        // and one matching allocation.
        // Returns false if already processed,
        // ineligible, or fully consumed.
        public bool PostExpiry(Guid restorationId)
        {
            if (restorationId == Guid.Empty)
            {
                throw new ArgumentException(
                    "Restoration Transaction ID is missing.");
            }

            Guid actorId =
                _userConnection.CurrentUser.ContactId;

            const string sql = @"
SET NOCOUNT ON;

DECLARE @LockResult int;

DECLARE @Resource nvarchar(255) =
    N'MCIT-Expiry-' +
    CONVERT(nvarchar(36), @RestorationId);

EXEC @LockResult = sys.sp_getapplock
    @Resource = @Resource,
    @LockMode = 'Exclusive',
    @LockOwner = 'Transaction',
    @LockTimeout = 15000;

IF @LockResult < 0
    THROW 51001,
        'Could not acquire restoration expiry lock.', 1;

DECLARE @Restored decimal(18,8);
DECLARE @Consumed decimal(18,8) = 0;
DECLARE @Remaining decimal(18,8);

-- Lock the source restoration.
SELECT @Restored = UsrQuantity
FROM dbo.UsrPointTransaction WITH (UPDLOCK, HOLDLOCK)
WHERE Id = @RestorationId
  AND UsrTransactionTypeId IN (@RestorationTypeId, @TerminationRestorationTypeId)
  AND UsrExpirationDate <= CONVERT(date, GETDATE());

IF @Restored IS NULL
BEGIN
    SELECT CAST(0 AS int);
    RETURN;
END;

-- Prevent duplicate expiry posting.
IF EXISTS (
    SELECT 1
    FROM dbo.UsrPointTransaction WITH (UPDLOCK, HOLDLOCK)
    WHERE UsrOriginTransactionId = @RestorationId
      AND UsrTransactionTypeId = @ExpiryTypeId
)
BEGIN
    SELECT CAST(0 AS int);
    RETURN;
END;

-- Count both generic and restored-specific
-- consumption transactions allocated
-- against this restoration.
SELECT @Consumed =
    COALESCE(SUM(a.UsrQuantity), 0)
FROM dbo.UsrPointAllocation a WITH (UPDLOCK, HOLDLOCK)
INNER JOIN dbo.UsrPointTransaction t
    ON t.Id = a.UsrUsageTransactionId
WHERE a.UsrSourceTransactionId = @RestorationId
  AND t.UsrTransactionTypeId IN (
      @ConsumptionTypeId,
      @ConsumptionFromRestoredTypeId
  );

SET @Remaining = @Restored - @Consumed;

IF @Remaining < 0
    THROW 51002,
        'Consumed points exceed restored points.', 1;

-- Nothing left to expire.
IF @Remaining = 0
BEGIN
    SELECT CAST(0 AS int);
    RETURN;
END;

DECLARE @ExpiryId uniqueidentifier = NEWID();

-- Create expiry transaction.
INSERT INTO dbo.UsrPointTransaction (
    Id,
    CreatedOn,
    CreatedById,
    ModifiedOn,
    ModifiedById,
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
    @ExpiryId,
    GETDATE(),
    @ActorId,
    GETDATE(),
    @ActorId,
    N'Restored Points Expiry',
    @Remaining,
    GETDATE(),
    @ExpiryTypeId,
    r.UsrContractId,
    @RestorationId,
    @RestoredBalanceId,
    r.UsrConfigVersionId,
    r.UsrVirtualMachineId,
    r.UsrRequestId,
    r.UsrRequestItemId,
    @ActorId,
    N'Unused restored points expired after one year'
FROM dbo.UsrPointTransaction r
WHERE r.Id = @RestorationId;

IF @@ROWCOUNT <> 1
    THROW 51003,
        'Could not create expiry transaction.', 1;

-- Create matching expiry allocation.
INSERT INTO dbo.UsrPointAllocation (
    Id,
    CreatedOn,
    CreatedById,
    ModifiedOn,
    ModifiedById,
    UsrName,
    UsrSourceTransactionId,
    UsrUsageTransactionId,
    UsrQuantity
)
VALUES (
    NEWID(),
    GETDATE(),
    @ActorId,
    GETDATE(),
    @ActorId,
    N'Restored Points Expiry Allocation',
    @RestorationId,
    @ExpiryId,
    @Remaining
);

IF @@ROWCOUNT <> 1
    THROW 51004,
        'Could not create expiry allocation.', 1;

SELECT CAST(1 AS int);";

            using (var db =
                _userConnection.EnsureDBConnection())
            {
                db.StartTransaction(
                    IsolationLevel.Serializable);

                try
                {
                    var query =
                        new CustomQuery(_userConnection, sql)
                        .WithParameter(
                            "RestorationId",
                            restorationId)
                        .WithParameter(
                            "RestorationTypeId",
                            RestorationTypeId)
                    .WithParameter("TerminationRestorationTypeId", TerminationRestorationTypeId)
                        .WithParameter(
                            "ConsumptionTypeId",
                            ConsumptionTypeId)
                        .WithParameter(
                            "ConsumptionFromRestoredTypeId",
                            ConsumptionFromRestoredTypeId)
                        .WithParameter(
                            "ExpiryTypeId",
                            ExpiryTypeId)
                        .WithParameter(
                            "RestoredBalanceId",
                            RestoredBalanceId)
                        .WithParameter(
                            "ActorId",
                            actorId);

                    int result =
                        query.ExecuteScalar<int>(db);

                    db.CommitTransaction();

                    if (result == 1)
                    {
                        try
                        {
                            var contractId = new CustomQuery(_userConnection,
                                "SELECT UsrContractId FROM dbo.UsrPointTransaction WHERE Id = @SourceId")
                                .WithParameter("SourceId", restorationId)
                                .ExecuteScalar<Guid>(db);
                            RefreshContractPreview(contractId);
                        }
                        catch (Exception ex)
                        {
                            global::Common.Logging.LogManager
                                .GetLogger("UsrMCITRestoredPointsExpiryService")
                                .Error("Expiry committed but preview refresh failed: " +
                                       "RestorationId=" + restorationId + ": " + ex);
                        }
                    }
                    return result == 1;
                }
                catch
                {
                    db.RollbackTransaction();
                    throw;
                }
            }
        }

        // Recalculate the remaining unallocated restored points by source expiry date.
        // Both ordinary and termination restorations retain their original ledger types.
        public void RefreshContractPreview(Guid contractId)
        {
            if (contractId == Guid.Empty)
                throw new ArgumentException("Contract ID is required.", nameof(contractId));

            const string sql = @"
SET NOCOUNT ON;
;WITH Eligible AS (
    SELECT r.Id, r.UsrExpirationDate,
        CASE WHEN r.UsrQuantity - COALESCE(a.Allocated, 0) > 0
             THEN r.UsrQuantity - COALESCE(a.Allocated, 0)
             ELSE 0 END AS Remaining
    FROM dbo.UsrPointTransaction r
    OUTER APPLY (
        SELECT SUM(x.UsrQuantity) AS Allocated
        FROM dbo.UsrPointAllocation x
        WHERE x.UsrSourceTransactionId = r.Id
    ) a
    WHERE r.UsrContractId = @ContractId
      AND r.UsrTransactionTypeId IN (@RestorationTypeId, @TerminationRestorationTypeId)
      AND r.UsrExpirationDate >= CONVERT(date, GETDATE())
)
UPDATE c
SET UsrRestoredPointsExpiring30Days = COALESCE((
        SELECT SUM(Remaining) FROM Eligible
        WHERE UsrExpirationDate <= DATEADD(day, 30, CONVERT(date, GETDATE()))
    ), 0),
    UsrRestoredPointsExpiring90Days = COALESCE((
        SELECT SUM(Remaining) FROM Eligible
        WHERE UsrExpirationDate <= DATEADD(day, 90, CONVERT(date, GETDATE()))
    ), 0)
FROM dbo.UsrMCITContract c
WHERE c.Id = @ContractId;";
            using (var db = _userConnection.EnsureDBConnection())
            {
                new CustomQuery(_userConnection, sql)
                    .WithParameter("ContractId", contractId)
                    .WithParameter("RestorationTypeId", RestorationTypeId)
                    .WithParameter("TerminationRestorationTypeId", TerminationRestorationTypeId)
                    .Execute(db);
            }
        }

        // Read-only diagnostics. No ledger, contract or financial row is corrected here.
        public IDictionary<string, int> ReadReconciliationCounts()
        {
            return ReadReconciliationCountsForContracts(null);
        }

        public IDictionary<string, int> ReadReconciliationCountsForContracts(
            IEnumerable<Guid> authorizedContracts)
        {
            string sql = @"
SET NOCOUNT ON;
SELECT
 (SELECT COUNT(*) FROM (
    SELECT t.UsrRequestId, t.UsrRequestItemId, t.UsrVirtualMachineId,
           t.UsrTransactionTypeId, t.UsrOriginTransactionId, t.UsrQuantity
    FROM dbo.UsrPointTransaction t
    WHERE t.UsrRequestId IS NOT NULL AND t.UsrTransactionTypeId IN
       ('9714B14C-2A5F-4D72-A114-78833EF52F42',
        'DB304861-706C-4974-94AF-F337300181D0',
        'CCE3062D-A79E-4ADB-BAFE-F731CA2B3340')
    GROUP BY t.UsrRequestId, t.UsrRequestItemId, t.UsrVirtualMachineId,
             t.UsrTransactionTypeId, t.UsrOriginTransactionId, t.UsrQuantity
    HAVING COUNT(*) > 1) d) AS DuplicateConsumptionGroups,
 (SELECT COUNT(*) FROM dbo.UsrPointTransaction t
    WHERE t.UsrTransactionTypeId IN
       ('9714B14C-2A5F-4D72-A114-78833EF52F42',
        'DB304861-706C-4974-94AF-F337300181D0',
        'D453D044-57BC-46CE-87FA-90E640B2E6F8',
        '9E69BF3A-0E7E-48E5-8F13-E120BC03B8F4')
      AND NOT EXISTS (SELECT 1 FROM dbo.UsrPointAllocation a
                      WHERE a.UsrUsageTransactionId = t.Id)) AS MissingAllocationTransactions,
 (SELECT COUNT(*) FROM dbo.UsrPointTransaction s
    OUTER APPLY (SELECT COALESCE(SUM(a.UsrQuantity),0) AS Used
                 FROM dbo.UsrPointAllocation a
                 WHERE a.UsrSourceTransactionId = s.Id) x
    WHERE s.UsrTransactionTypeId IN
       ('F5E6739B-9EBA-4B66-B581-E1408BC06240',
        'A73D30E6-E5E0-4DDB-A62C-CA1A29EB2BF9',
        '65A9C955-4B2A-4E70-9BAC-4AF75F1E0AED')
      AND (s.UsrQuantity < 0 OR x.Used > s.UsrQuantity)) AS OverallocatedSources,
 (SELECT COUNT(*) FROM dbo.UsrPointTransaction r
    WHERE r.UsrTransactionTypeId IN
       ('A73D30E6-E5E0-4DDB-A62C-CA1A29EB2BF9',
        '65A9C955-4B2A-4E70-9BAC-4AF75F1E0AED')
      AND (r.UsrQuantity <= 0 OR r.UsrExpirationDate IS NULL
           OR r.UsrContractId IS NULL
           OR (r.UsrTransactionTypeId =
               '65A9C955-4B2A-4E70-9BAC-4AF75F1E0AED'
               AND r.UsrOriginTransactionId IS NULL))) AS InvalidRestorations,
 (SELECT COUNT(*) FROM (
    SELECT r.UsrOriginTransactionId
    FROM dbo.UsrPointTransaction r
    WHERE r.UsrTransactionTypeId =
      '65A9C955-4B2A-4E70-9BAC-4AF75F1E0AED'
      AND r.UsrOriginTransactionId IS NOT NULL
    GROUP BY r.UsrOriginTransactionId
    HAVING SUM(r.UsrQuantity) >
      COALESCE((SELECT MAX(c.UsrQuantity) FROM dbo.UsrPointTransaction c
                WHERE c.Id = r.UsrOriginTransactionId),0)) x) AS ExcessTerminationRestorations,
 (SELECT COUNT(*) FROM (
    SELECT v.UsrContractId FROM dbo.UsrContractConfigVersion v
    WHERE v.UsrConfigVersionStatusId =
      'E7D05248-9D33-41C3-B688-C0B172B039CC'
    GROUP BY v.UsrContractId HAVING COUNT(*) > 1) x) AS ContractsWithMultipleActiveVersions,
 (SELECT COUNT(*) FROM dbo.UsrFinancialTransaction f
    WHERE f.UsrContractId IS NULL OR f.UsrCurrencyId IS NULL
       OR f.UsrAmount IS NULL) AS IncompleteFinancialTransactions;";
            if (authorizedContracts != null)
            {
                var ids = new HashSet<Guid>(authorizedContracts.Where(id => id != Guid.Empty));
                if (ids.Count == 0)
                    return new Dictionary<string, int> {
                        {"DuplicateConsumptionGroups",0}, {"MissingAllocationTransactions",0},
                        {"OverallocatedSources",0}, {"InvalidRestorations",0},
                        {"ExcessTerminationRestorations",0},
                        {"ContractsWithMultipleActiveVersions",0},
                        {"IncompleteFinancialTransactions",0}
                    };
                var list = String.Join(",", ids.Select(id => "'" + id.ToString("D") + "'"));
                var prefix = @";WITH ScopedPoint AS (
                    SELECT * FROM dbo.UsrPointTransaction WHERE UsrContractId IN (" + list + @")
                ), ScopedAllocation AS (
                    SELECT a.* FROM dbo.UsrPointAllocation a
                    JOIN ScopedPoint s ON s.Id = a.UsrSourceTransactionId
                    JOIN ScopedPoint u ON u.Id = a.UsrUsageTransactionId
                ), ScopedFinancial AS (
                    SELECT * FROM dbo.UsrFinancialTransaction WHERE UsrContractId IN (" + list + @")
                ), ScopedVersion AS (
                    SELECT * FROM dbo.UsrContractConfigVersion WHERE UsrContractId IN (" + list + @")
                ) ";
                sql = prefix + sql.Replace("SET NOCOUNT ON;", "")
                    .Replace("dbo.UsrPointTransaction", "ScopedPoint")
                    .Replace("dbo.UsrPointAllocation", "ScopedAllocation")
                    .Replace("dbo.UsrFinancialTransaction", "ScopedFinancial")
                    .Replace("dbo.UsrContractConfigVersion", "ScopedVersion");
            }
            using (var db = _userConnection.EnsureDBConnection())
            using (var reader = new CustomQuery(_userConnection, sql).ExecuteReader(db))
            {
                if (!reader.Read())
                    throw new InvalidOperationException("Reconciliation query returned no summary.");
                var names = new[] {
                    "DuplicateConsumptionGroups", "MissingAllocationTransactions",
                    "OverallocatedSources", "InvalidRestorations",
                    "ExcessTerminationRestorations",
                    "ContractsWithMultipleActiveVersions",
                    "IncompleteFinancialTransactions"
                };
                var result = new Dictionary<string, int>();
                for (var i = 0; i < names.Length; i++)
                    result[names[i]] = reader.GetInt32(i);
                return result;
            }
        }


        // Read-only, contract-bounded exception records. No ledger repair is performed.
        public IList<UsrMCITReconciliationFinding> ReadReconciliationDetailsForContracts(
            IEnumerable<Guid> authorizedContracts)
        {
            if (authorizedContracts == null)
                throw new ArgumentNullException(nameof(authorizedContracts));
            var ids = new HashSet<Guid>(authorizedContracts.Where(id => id != Guid.Empty));
            if (ids.Count == 0) return new List<UsrMCITReconciliationFinding>();
            var list = String.Join(",", ids.Select(id => "'" + id.ToString("D") + "'"));
            var sql = @";WITH P AS (
 SELECT * FROM dbo.UsrPointTransaction WHERE UsrContractId IN (" + list + @")
), A AS (
 SELECT a.* FROM dbo.UsrPointAllocation a
 JOIN P s ON s.Id=a.UsrSourceTransactionId
 JOIN P u ON u.Id=a.UsrUsageTransactionId
), F AS (
 SELECT * FROM dbo.UsrFinancialTransaction WHERE UsrContractId IN (" + list + @")
), V AS (
 SELECT * FROM dbo.UsrContractConfigVersion WHERE UsrContractId IN (" + list + @")
), Findings AS (
 SELECT 'DuplicateConsumptionGroups' Category, MIN(t.Id) RecordId,
        MIN(t.UsrContractId) ContractId, 'UsrPointTransaction' EntityName
 FROM P t
 WHERE t.UsrRequestId IS NOT NULL AND t.UsrTransactionTypeId IN
 ('9714B14C-2A5F-4D72-A114-78833EF52F42',
  'DB304861-706C-4974-94AF-F337300181D0',
  'CCE3062D-A79E-4ADB-BAFE-F731CA2B3340')
 GROUP BY t.UsrRequestId,t.UsrRequestItemId,t.UsrVirtualMachineId,
          t.UsrTransactionTypeId,t.UsrOriginTransactionId,t.UsrQuantity
 HAVING COUNT(*)>1
 UNION ALL
 SELECT 'MissingAllocationTransactions',t.Id,t.UsrContractId,'UsrPointTransaction'
 FROM P t WHERE t.UsrTransactionTypeId IN
 ('9714B14C-2A5F-4D72-A114-78833EF52F42',
  'DB304861-706C-4974-94AF-F337300181D0',
  'D453D044-57BC-46CE-87FA-90E640B2E6F8',
  '9E69BF3A-0E7E-48E5-8F13-E120BC03B8F4')
 AND NOT EXISTS(SELECT 1 FROM A a WHERE a.UsrUsageTransactionId=t.Id)
 UNION ALL
 SELECT 'OverallocatedSources',s.Id,s.UsrContractId,'UsrPointTransaction'
 FROM P s OUTER APPLY
 (SELECT COALESCE(SUM(a.UsrQuantity),0) Used FROM A a
  WHERE a.UsrSourceTransactionId=s.Id) x
 WHERE s.UsrTransactionTypeId IN
 ('F5E6739B-9EBA-4B66-B581-E1408BC06240',
  'A73D30E6-E5E0-4DDB-A62C-CA1A29EB2BF9',
  '65A9C955-4B2A-4E70-9BAC-4AF75F1E0AED')
 AND (s.UsrQuantity<0 OR x.Used>s.UsrQuantity)
 UNION ALL
 SELECT 'InvalidRestorations',r.Id,r.UsrContractId,'UsrPointTransaction'
 FROM P r WHERE r.UsrTransactionTypeId IN
 ('A73D30E6-E5E0-4DDB-A62C-CA1A29EB2BF9',
  '65A9C955-4B2A-4E70-9BAC-4AF75F1E0AED')
 AND (r.UsrQuantity<=0 OR r.UsrExpirationDate IS NULL
  OR r.UsrContractId IS NULL OR
  (r.UsrTransactionTypeId='65A9C955-4B2A-4E70-9BAC-4AF75F1E0AED'
   AND r.UsrOriginTransactionId IS NULL))
 UNION ALL
 SELECT 'ExcessTerminationRestorations',MIN(r.Id),
        MIN(r.UsrContractId),'UsrPointTransaction'
 FROM P r
 WHERE r.UsrTransactionTypeId='65A9C955-4B2A-4E70-9BAC-4AF75F1E0AED'
 AND r.UsrOriginTransactionId IS NOT NULL
 GROUP BY r.UsrOriginTransactionId
 HAVING SUM(r.UsrQuantity)>
 COALESCE((SELECT MAX(c.UsrQuantity) FROM P c
           WHERE c.Id=r.UsrOriginTransactionId),0)
 UNION ALL
 SELECT 'ContractsWithMultipleActiveVersions',v.UsrContractId,
        v.UsrContractId,'UsrMCITContract'
 FROM V v
 WHERE v.UsrConfigVersionStatusId='E7D05248-9D33-41C3-B688-C0B172B039CC'
 GROUP BY v.UsrContractId HAVING COUNT(*)>1
 UNION ALL
 SELECT 'IncompleteFinancialTransactions',f.Id,f.UsrContractId,
        'UsrFinancialTransaction'
 FROM F f WHERE f.UsrContractId IS NULL OR f.UsrCurrencyId IS NULL
 OR f.UsrAmount IS NULL
)
SELECT Category,RecordId,ContractId,EntityName FROM Findings
ORDER BY Category,ContractId,RecordId;";
            var result = new List<UsrMCITReconciliationFinding>();
            using (var db = _userConnection.EnsureDBConnection())
            using (var reader = new CustomQuery(_userConnection, sql).ExecuteReader(db))
            {
                while (reader.Read())
                {
                    if (result.Count >= 10000)
                        throw new InvalidOperationException("Reconciliation detail limit exceeded.");
                    result.Add(new UsrMCITReconciliationFinding {
                        Category = reader.GetString(0), RecordId = reader.GetGuid(1),
                        ContractId = reader.GetGuid(2), EntityName = reader.GetString(3)
                    });
                }
            }
            return result;
        }

        // Verify that every expiry transaction
        // has exactly one matching allocation
        // with the correct source and quantity.
        public int CountExpiryLedgerIssues()
        {
            const string sql = @"
SELECT COUNT(*)
FROM dbo.UsrPointTransaction e

OUTER APPLY (
    SELECT
        COUNT(*) AS AllocationCount,
        COALESCE(SUM(a.UsrQuantity), 0)
            AS AllocatedPoints
    FROM dbo.UsrPointAllocation a
    WHERE a.UsrUsageTransactionId = e.Id
) x

OUTER APPLY (
    SELECT
        COUNT(*) AS MatchingSourceCount
    FROM dbo.UsrPointAllocation a
    WHERE a.UsrUsageTransactionId = e.Id
      AND a.UsrSourceTransactionId =
          e.UsrOriginTransactionId
) y

WHERE e.UsrTransactionTypeId = @ExpiryTypeId
  AND (
       e.UsrOriginTransactionId IS NULL
       OR x.AllocationCount <> 1
       OR y.MatchingSourceCount <> 1
       OR x.AllocatedPoints <> e.UsrQuantity
  );";

            using (var db =
                _userConnection.EnsureDBConnection())
            {
                return new CustomQuery(_userConnection, sql)
                    .WithParameter(
                        "ExpiryTypeId",
                        ExpiryTypeId)
                    .ExecuteScalar<int>(db);
            }
        }

        // Process bounded batches without
        // selecting the same candidate twice
        // in one run.
        public int ProcessPendingExpiries(
            int batchSize = 100,
            int maxRecordsPerRun = 1000)
        {
            if (batchSize < 1 || batchSize > 1000)
            {
                throw new ArgumentOutOfRangeException(
                    nameof(batchSize));
            }

            if (maxRecordsPerRun < 1)
            {
                throw new ArgumentOutOfRangeException(
                    nameof(maxRecordsPerRun));
            }

            int scanned = 0;
            int posted = 0;

            var failures = new List<string>();

            DateTime lastDate =
                new DateTime(1753, 1, 1);

            Guid lastId = Guid.Empty;

            while (scanned < maxRecordsPerRun)
            {
                int take = Math.Min(
                    batchSize,
                    maxRecordsPerRun - scanned);

                List<Candidate> candidates =
                    FindPending(take, lastDate, lastId);

                if (candidates.Count == 0)
                {
                    break;
                }

                foreach (Candidate candidate in candidates)
                {
                    lastDate = candidate.ExpirationDate;
                    lastId = candidate.Id;
                    scanned++;

                    try
                    {
                        if (PostExpiry(candidate.Id))
                        {
                            posted++;
                        }
                    }
                    catch (Exception ex)
                    {
                        failures.Add(
                            candidate.Id + ": " + ex.Message);
                    }
                }

                if (candidates.Count < take)
                {
                    break;
                }
            }

            if (failures.Count > 0)
            {
                throw new InvalidOperationException(
                    "MCIT expiry processing failed for " +
                    failures.Count +
                    " restoration(s). Details: " +
                    string.Join("; ", failures));
            }

            // Report an unfinished backlog
            // when the safety limit is reached.
            if (scanned == maxRecordsPerRun &&
                FindPending(1, lastDate, lastId).Count > 0)
            {
                throw new InvalidOperationException(
                    "MCIT expiry processing reached its " +
                    "per-run limit. Additional pending " +
                    "restorations remain.");
            }

            return posted;
        }
    }
}
