using System;
using System.Data;
using System.Collections.Generic;
using System.ServiceModel;
using System.ServiceModel.Activation;
using System.ServiceModel.Web;
using Terrasoft.Core;
using Terrasoft.Core.DB;
using Terrasoft.Web.Common;

namespace Terrasoft.Configuration {
    /// <summary>
    /// Creates a new Draft from the single Active configuration. The original version,
    /// its rates, requests and transaction references are never updated.
    /// </summary>
    [ServiceContract]
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Required)]
    public class UsrMCITConfigurationAmendmentService : BaseService {
        private static readonly Guid ActiveVersion =
            new Guid("e7d05248-9d33-41c3-b688-c0b172b039cc");
        private static readonly Guid DraftVersion =
            new Guid("d153cb20-1a9c-44bf-8ced-1a53f88eed22");

        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json,
            ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped)]

public Guid CreateDraftAmendment(Guid contractId,
    DateTime effectiveFrom, string changeReason) {

    return CreateDraftAmendmentForUser(
        UserConnection,
        contractId,
        effectiveFrom,
        changeReason
    );
}

public static Guid CreateDraftAmendmentForUser(
    UserConnection uc,
    Guid contractId,
    DateTime effectiveFrom,
    string changeReason) {

    if (uc == null)
        throw new ArgumentNullException("uc");

    if (uc.CurrentUser == null ||
        uc.CurrentUser.ContactId == Guid.Empty)
        throw new UnauthorizedAccessException(
            "A valid initiating user is required."
        );

            if (contractId == Guid.Empty || effectiveFrom == DateTime.MinValue ||
                String.IsNullOrWhiteSpace(changeReason) || changeReason.Length > 1000)
                throw new ArgumentException("Contract, effective date and change reason are required.");
            // Both MCIT screen permissions and native record rights are required.
            UsrMCITScreenAccess.Demand(uc, "CONTRACTS", "Edit");
            UsrMCITScreenAccess.Demand(uc, "FINANCE_CONFIGURATION", "Edit");
            if (!UsrMCITDataScopeRuntime.ReadAuthorizedContractIds(uc).Contains(contractId))
                throw new UnauthorizedAccessException("Contract access denied.");
            var rights = uc.DBSecurityEngine.GetEntitySchemaOperationsRightLevel(
                uc.CurrentUser.Id, "UsrMCITContract");
            if ((rights & SchemaOperationRightLevels.CanEdit) == 0)
                throw new UnauthorizedAccessException("Contract edit permission required.");
            var recordRights = uc.DBSecurityEngine.GetEntitySchemaRecordRightLevel(
                uc.CurrentUser.Id, "UsrMCITContract", contractId);
            if ((recordRights & SchemaRecordRightLevels.CanEdit) == 0)
                throw new UnauthorizedAccessException("Contract record edit permission required.");

            // Direct SQL copying does not perform Creatio's per-record read checks.
            // Check the source and each copied rate under the actual initiating
            // connection, then pin that source ID in the serializable transaction.
            foreach (var schema in new[] { "UsrContractConfigVersion",
                    "UsrConfigResourceRate", "UsrConfigAddOnRate" }) {
                var level = uc.DBSecurityEngine.GetEntitySchemaOperationsRightLevel(
                    uc.CurrentUser.Id, schema);
                if ((level & SchemaOperationRightLevels.CanRead) == 0 ||
                    (level & SchemaOperationRightLevels.CanAppend) == 0)
                    throw new UnauthorizedAccessException("Configuration read and create rights are required.");
            }
            Guid expectedSource = Guid.Empty;
            var rateIds = new List<KeyValuePair<string, Guid>>();
            using (var preflight = uc.EnsureDBConnection()) {
                using (var reader = new CustomQuery(uc,
                    "SELECT Id FROM dbo.UsrContractConfigVersion " +
                    "WHERE UsrContractId=@ContractId AND UsrConfigVersionStatusId=@ActiveVersion")
                    .WithParameter("ContractId", contractId)
                    .WithParameter("ActiveVersion", ActiveVersion).ExecuteReader(preflight)) {
                    if (!reader.Read())
                        throw new InvalidOperationException("One active source is required.");
                    expectedSource = reader.GetGuid(0);
                    if (reader.Read())
                        throw new InvalidOperationException("Multiple active sources are not allowed.");
                }
                foreach (var schema in new[] { "UsrConfigResourceRate", "UsrConfigAddOnRate" }) {
                    using (var reader = new CustomQuery(uc,
                        "SELECT Id FROM dbo." + schema + " WHERE UsrConfigVersionId=@Source")
                        .WithParameter("Source", expectedSource).ExecuteReader(preflight)) {
                        while (reader.Read()) rateIds.Add(
                            new KeyValuePair<string, Guid>(schema, reader.GetGuid(0)));
                    }
                }
            }
            if ((uc.DBSecurityEngine.GetEntitySchemaRecordRightLevel(
                    uc.CurrentUser.Id, "UsrContractConfigVersion", expectedSource) &
                    SchemaRecordRightLevels.CanRead) == 0)
                throw new UnauthorizedAccessException("Source configuration read access denied.");
            foreach (var rate in rateIds) {
                if ((uc.DBSecurityEngine.GetEntitySchemaRecordRightLevel(
                        uc.CurrentUser.Id, rate.Key, rate.Value) &
                        SchemaRecordRightLevels.CanRead) == 0)
                    throw new UnauthorizedAccessException("Source rate read access denied.");
            }

            // A single SQL transaction locks the contract before allocating the version
            // number and copies all explicitly configured version-linked rate values.
            // The draft is not scheduled or activated by this endpoint.
            const string sql = @"
SET XACT_ABORT ON;
SET NOCOUNT ON;
DECLARE @Now datetime2 = GETDATE();
DECLARE @ContractStart date, @ContractEnd date, @ContractStatus uniqueidentifier;
SELECT @ContractStart = UsrStartDate, @ContractEnd = UsrEndDate,
       @ContractStatus = UsrStatusId
FROM dbo.UsrMCITContract WITH (UPDLOCK, HOLDLOCK)
WHERE Id = @ContractId;
IF @ContractStart IS NULL OR @ContractEnd IS NULL OR
   @ContractStart >= @ContractEnd OR
   CONVERT(date, @EffectiveFrom) < @ContractStart OR
   CONVERT(date, @EffectiveFrom) > @ContractEnd
    THROW 51401, 'The amendment effective date is outside the contract.', 1;
IF @ContractStatus NOT IN (
    '5f9739e9-4f5c-42ba-8157-d1e2468a27e4', -- Active
    '69e3f764-e785-4e2d-bff1-4c06e0552a13'  -- Expiring
)
    THROW 51402, 'The contract is not eligible for an amendment.', 1;

DECLARE @Source uniqueidentifier, @Count int, @Next int;
-- Serializes amendments for this contract, including the version-number allocation.
SELECT @Count = COUNT(1) FROM dbo.UsrContractConfigVersion WITH (UPDLOCK, HOLDLOCK)
WHERE UsrContractId = @ContractId;
SELECT @Source = MIN(Id), @Count = COUNT(1)
FROM dbo.UsrContractConfigVersion WITH (UPDLOCK, HOLDLOCK)
WHERE UsrContractId = @ContractId AND UsrConfigVersionStatusId = @ActiveVersion;
IF @Count <> 1 THROW 51403, 'Exactly one active source version is required.', 1;
IF @Source <> @ExpectedSource
    THROW 51413, 'The authorized source changed before amendment creation.', 1;
IF (SELECT COUNT(*) FROM dbo.UsrConfigResourceRate WITH (UPDLOCK,HOLDLOCK)
    WHERE UsrConfigVersionId=@Source) <> @ExpectedResourceRateCount OR
   (SELECT COUNT(*) FROM dbo.UsrConfigAddOnRate WITH (UPDLOCK,HOLDLOCK)
    WHERE UsrConfigVersionId=@Source) <> @ExpectedAddOnRateCount
    THROW 51414, 'Source rates changed after authorization.', 1;
IF EXISTS (SELECT 1 FROM dbo.UsrContractConfigVersion
           WHERE Id = @Source AND CONVERT(date, UsrEffectiveFrom) > CONVERT(date, @EffectiveFrom))
    THROW 51411, 'The amendment cannot precede the active configuration.', 1;
-- One draft or scheduled amendment may claim a given effective date. The
-- contract and version range locks above serialize concurrent attempts.
IF EXISTS (SELECT 1 FROM dbo.UsrContractConfigVersion WITH (UPDLOCK, HOLDLOCK)
           WHERE UsrContractId = @ContractId
             AND UsrConfigVersionStatusId IN (@DraftVersion,
                 '1cd0011f-6971-49b3-a5b8-04d46130daee')
             AND CONVERT(date, UsrEffectiveFrom) = CONVERT(date, @EffectiveFrom))
    THROW 51412, 'An amendment already claims that effective date.', 1;
IF EXISTS (SELECT 1 FROM dbo.UsrContractConfigVersion
           WHERE Id = @Source AND UsrEffectiveTo IS NOT NULL
             AND CONVERT(date, UsrEffectiveTo) < CONVERT(date, @EffectiveFrom))
    THROW 51410, 'The amendment starts after the source configuration ends.', 1;
IF EXISTS (SELECT 1 FROM dbo.UsrContractConfigVersion
           WHERE UsrContractId = @ContractId AND
           TRY_CONVERT(int, UsrVersionNumber) IS NULL)
    THROW 51404, 'A configuration version number is not numeric.', 1;
SELECT @Next = ISNULL(MAX(TRY_CONVERT(int, UsrVersionNumber)), 0) + 1
FROM dbo.UsrContractConfigVersion WHERE UsrContractId = @ContractId;
IF @Next <= 0 THROW 51405, 'Cannot allocate a configuration version number.', 1;

INSERT dbo.UsrContractConfigVersion
    (Id, UsrName, UsrContractId, UsrConfigVersionStatusId, UsrVersionNumber,
     UsrPreviousVersionId, UsrChangeReason, UsrEffectiveFrom, UsrEffectiveTo,
     UsrCPUPerPoint, UsrRAMGBPerPoint, UsrStorageGBPerPoint,
     UsrMinPointsPerVM, UsrMaxPointsPerVM, UsrPointIncrement, UsrNotes,
     CreatedOn, CreatedById, ModifiedOn, ModifiedById)
SELECT @NewId, CONCAT(UsrName, ' amendment ', @Next), UsrContractId, @DraftVersion,
       CONVERT(varchar(20), @Next), Id, @Reason, @EffectiveFrom, UsrEffectiveTo,
       UsrCPUPerPoint, UsrRAMGBPerPoint, UsrStorageGBPerPoint,
       UsrMinPointsPerVM, UsrMaxPointsPerVM, UsrPointIncrement, UsrNotes,
       @Now, @ActorContactId, @Now, @ActorContactId
FROM dbo.UsrContractConfigVersion WHERE Id = @Source;
IF @@ROWCOUNT <> 1 THROW 51406, 'Could not copy the source configuration.', 1;

INSERT dbo.UsrConfigResourceRate
    (Id, UsrName, UsrConfigVersionId, UsrResourceTypeId,
     UsrPricingUnitLookupId, UsrAmountPerUnit, UsrPointsPerUnit,
     UsrCurrencyId, UsrDescription, CreatedOn, CreatedById, ModifiedOn, ModifiedById)
SELECT NEWID(), UsrName, @NewId, UsrResourceTypeId,
       UsrPricingUnitLookupId, UsrAmountPerUnit, UsrPointsPerUnit,
       UsrCurrencyId, UsrDescription, @Now, @ActorContactId, @Now, @ActorContactId
FROM dbo.UsrConfigResourceRate WHERE UsrConfigVersionId = @Source;
IF @@ROWCOUNT = 0 THROW 51407, 'The source has no resource rates.', 1;

INSERT dbo.UsrConfigAddOnRate
    (Id, UsrConfigVersionId, UsrAddOnId, UsrCurrencyId,
     UsrUnit, UsrUnitPrice, UsrMinQuantity, UsrMaxQuantity, UsrIncrement,
     UsrActive, CreatedOn, CreatedById, ModifiedOn, ModifiedById)
SELECT NEWID(), @NewId, UsrAddOnId, UsrCurrencyId,
       UsrUnit, UsrUnitPrice, UsrMinQuantity, UsrMaxQuantity, UsrIncrement,
       UsrActive, @Now, @ActorContactId, @Now, @ActorContactId
FROM dbo.UsrConfigAddOnRate WHERE UsrConfigVersionId = @Source;
-- Zero add-ons is valid: no add-on charging rule is invented.

IF (SELECT COUNT(*) FROM dbo.UsrConfigResourceRate WHERE UsrConfigVersionId = @NewId)
   <> (SELECT COUNT(*) FROM dbo.UsrConfigResourceRate WHERE UsrConfigVersionId = @Source)
    THROW 51408, 'Resource rate copy is incomplete.', 1;
IF (SELECT COUNT(*) FROM dbo.UsrConfigAddOnRate WHERE UsrConfigVersionId = @NewId)
   <> (SELECT COUNT(*) FROM dbo.UsrConfigAddOnRate WHERE UsrConfigVersionId = @Source)
    THROW 51409, 'Add-on rate copy is incomplete.', 1;
SELECT @NewId;
";
            var newId = Guid.NewGuid();
            using (var db = uc.EnsureDBConnection()) {
                db.StartTransaction(IsolationLevel.Serializable);
                try {
                    var result = new CustomQuery(uc, sql)
                        .WithParameter("ContractId", contractId)
                        .WithParameter("EffectiveFrom", effectiveFrom)
                        .WithParameter("Reason", changeReason.Trim())
                        .WithParameter("ActiveVersion", ActiveVersion)
                        .WithParameter("ExpectedSource", expectedSource)
                        .WithParameter("ExpectedResourceRateCount", rateIds.FindAll(
                            r => r.Key == "UsrConfigResourceRate").Count)
                        .WithParameter("ExpectedAddOnRateCount", rateIds.FindAll(
                            r => r.Key == "UsrConfigAddOnRate").Count)
                        .WithParameter("DraftVersion", DraftVersion)
                        .WithParameter("NewId", newId)
                        .WithParameter("ActorContactId", uc.CurrentUser.ContactId)
                        .ExecuteScalar<Guid>(db);
                    if (result != newId)
                        throw new InvalidOperationException("Amendment copy was not confirmed.");
                    db.CommitTransaction();
                } catch {
                    db.RollbackTransaction();
                    throw;
                }
            }
            return newId;
        }
    }
}
