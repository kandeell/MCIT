namespace Terrasoft.Core.Process
{

	using System;
	using System.Collections.Generic;
	using System.Collections.ObjectModel;
	using System.Drawing;
	using System.Globalization;
	using System.Text;
	using Terrasoft.Common;
	using Terrasoft.Core;
	using Terrasoft.Core.Configuration;
	using Terrasoft.Core.DB;
	using Terrasoft.Core.Entities;
	using Terrasoft.Core.Process;
	using Terrasoft.Core.Process.Configuration;

	#region Class: UsrMCITActivateContractMethodsWrapper

	/// <exclude/>
	public class UsrMCITActivateContractMethodsWrapper : ProcessModel
	{

		public UsrMCITActivateContractMethodsWrapper(Process process)
			: base(process) {
			AddScriptTaskMethod("CommitContractActivationExecute", CommitContractActivationExecute);
		}

		#region Methods: Private

		private bool CommitContractActivationExecute(ProcessExecutingContext context) {
			Set<bool>("Success", false);
			Set<string>("ResultMessage", "Contract activation failed.");
			try {
			    var contractId = Get<Guid>("ContractId");
			    Guid instanceId;
			    if (contractId == Guid.Empty || context == null || context.Process == null ||
			        !Guid.TryParse(context.Process.InstanceUId, out instanceId) ||
			        instanceId == Guid.Empty || UserConnection.CurrentUser == null)
			        throw new UnauthorizedAccessException("Cannot verify activation initiator.");
			    using (var db = UserConnection.EnsureDBConnection()) {
			        var owner = new CustomQuery(UserConnection,
			            "SELECT OwnerId FROM dbo.SysProcessLog WHERE Id = @Id")
			            .WithParameter("Id", instanceId).ExecuteScalar<Guid>(db);
			        if (owner == Guid.Empty || owner != UserConnection.CurrentUser.ContactId)
			            throw new UnauthorizedAccessException("Execution identity differs from initiator.");
			        Terrasoft.Configuration.UsrMCITScreenAccess.Demand(UserConnection, "CONTRACTS", "Activate");
			        if (!Terrasoft.Configuration.UsrMCITDataScopeRuntime
			            .ReadAuthorizedContractIds(UserConnection).Contains(contractId))
			            throw new UnauthorizedAccessException("Contract scope denied.");
			        var security = UserConnection.DBSecurityEngine;
			        var rights = security.GetEntitySchemaOperationsRightLevel(
			            UserConnection.CurrentUser.Id, "UsrMCITContract");
			        if ((rights & Terrasoft.Core.DB.SchemaOperationRightLevels.CanEdit) == 0)
			            throw new UnauthorizedAccessException("Contract edit denied.");
			        var recordRights = security.GetEntitySchemaRecordRightLevel(
			            UserConnection.CurrentUser.Id, "UsrMCITContract", contractId);
			        if ((recordRights & Terrasoft.Core.DB.SchemaRecordRightLevels.CanEdit) == 0)
			            throw new UnauthorizedAccessException("Contract record edit denied.");
			        const string sql = @"
			SET XACT_ABORT ON;
			SET NOCOUNT ON;
			DECLARE @Today date = CONVERT(date, GETDATE());
			DECLARE @Status uniqueidentifier, @Start date, @End date;
			DECLARE @Name nvarchar(max), @Number nvarchar(max);
			DECLARE @Account uniqueidentifier, @Currency uniqueidentifier;
			DECLARE @Budget decimal(18,4), @Points decimal(18,4);
			SELECT @Status=UsrStatusId, @Start=UsrStartDate, @End=UsrEndDate,
			       @Name=UsrName, @Number=UsrNumber, @Account=UsrAccountId,
			       @Currency=UsrCurrencyId, @Budget=UsrInitialBudget,
			       @Points=UsrInitialPoints
			FROM dbo.UsrMCITContract WITH (UPDLOCK,HOLDLOCK) WHERE Id=@ContractId;
			IF @Status <> '8f2d39e9-7c3f-408f-8c8d-f5385affc5ea'
			    THROW 51501, 'Only a Draft contract can be activated.', 1;
			IF @Start IS NULL OR @End IS NULL OR @End <= @Start
			   OR @Today < @Start OR @Today > @End
			   OR NULLIF(LTRIM(RTRIM(@Name)),'') IS NULL
			   OR NULLIF(LTRIM(RTRIM(@Number)),'') IS NULL
			   OR @Account IS NULL OR @Currency IS NULL
			   OR @Budget IS NULL OR @Budget < 0 OR @Points IS NULL OR @Points < 0
			    THROW 51502, 'Contract details or effective dates are invalid.', 1;
			IF (SELECT COUNT(*) FROM dbo.UsrContractConfigVersion WITH (UPDLOCK,HOLDLOCK)
			    WHERE UsrContractId=@ContractId
			      AND UsrConfigVersionStatusId='e7d05248-9d33-41c3-b688-c0b172b039cc'
			      AND CONVERT(date,UsrEffectiveFrom)<=@Today
			      AND (UsrEffectiveTo IS NULL OR CONVERT(date,UsrEffectiveTo)>=@Today)) <> 1
			    THROW 51503, 'Exactly one effective Active configuration is required.', 1;
			IF NOT EXISTS (SELECT 1 FROM dbo.UsrConfigResourceRate r
			    JOIN dbo.UsrContractConfigVersion v ON v.Id=r.UsrConfigVersionId
			    WHERE v.UsrContractId=@ContractId
			      AND v.UsrConfigVersionStatusId='e7d05248-9d33-41c3-b688-c0b172b039cc')
			    THROW 51504, 'Resource pricing is required.', 1;
			IF EXISTS (SELECT 1 FROM dbo.UsrConfigResourceRate r
			    JOIN dbo.UsrContractConfigVersion v ON v.Id=r.UsrConfigVersionId
			    WHERE v.UsrContractId=@ContractId
			      AND v.UsrConfigVersionStatusId='e7d05248-9d33-41c3-b688-c0b172b039cc'
			      AND (r.UsrCurrencyId IS NULL OR r.UsrCurrencyId<>@Currency
			           OR r.UsrResourceTypeId IS NULL OR r.UsrPricingUnitLookupId IS NULL
			           OR r.UsrAmountPerUnit IS NULL OR r.UsrAmountPerUnit<0
			           OR r.UsrPointsPerUnit IS NULL OR r.UsrPointsPerUnit<0))
			    THROW 51506, 'Active configuration has invalid resource pricing.', 1;
			UPDATE dbo.UsrMCITContract SET
			    UsrStatusId='5f9739e9-4f5c-42ba-8157-d1e2468a27e4',
			    ModifiedOn=GETDATE(), ModifiedById=@ActorContact
			WHERE Id=@ContractId AND UsrStatusId=@Status;
			IF @@ROWCOUNT<>1 THROW 51505, 'Concurrent contract activation detected.', 1;
			SELECT CAST(1 AS int);
			";
			        db.StartTransaction(System.Data.IsolationLevel.Serializable);
			        try {
			            var confirmed = new CustomQuery(UserConnection, sql)
			                .WithParameter("ContractId", contractId)
			                .WithParameter("ActorContact", owner).ExecuteScalar<int>(db);
			            if (confirmed != 1) throw new InvalidOperationException("Activation not confirmed.");
			            db.CommitTransaction();
			        } catch { db.RollbackTransaction(); throw; }
			    }
			    Set<bool>("Success", true);
			    Set<string>("ResultMessage", "Contract activated.");
			} catch (Exception) {
			    Set<bool>("Success", false);
			    Set<string>("ResultMessage", "Contract activation rejected; no status change committed.");
			}
			return true;
		}

		#endregion

	}

	#endregion

}

