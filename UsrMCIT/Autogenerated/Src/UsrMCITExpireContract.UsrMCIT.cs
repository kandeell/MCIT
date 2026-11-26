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

	#region Class: UsrMCITExpireContractMethodsWrapper

	/// <exclude/>
	public class UsrMCITExpireContractMethodsWrapper : ProcessModel
	{

		public UsrMCITExpireContractMethodsWrapper(Process process)
			: base(process) {
			AddScriptTaskMethod("CommitContractExpirationExecute", CommitContractExpirationExecute);
		}

		#region Methods: Private

		private bool CommitContractExpirationExecute(ProcessExecutingContext context) {
			Set<bool>("Success", false);
			Set<string>("ResultMessage", "Contract expiration failed.");
			try {
			    var contractId = Get<Guid>("ContractId");
			    Guid instanceId;
			    if (contractId == Guid.Empty || context == null || context.Process == null ||
			        !Guid.TryParse(context.Process.InstanceUId, out instanceId) ||
			        instanceId == Guid.Empty || UserConnection.CurrentUser == null)
			        throw new UnauthorizedAccessException("Cannot verify expiration initiator.");
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
			DECLARE @Status uniqueidentifier, @End date;
			SELECT @Status=UsrStatusId, @End=CONVERT(date,UsrEndDate)
			FROM dbo.UsrMCITContract WITH (UPDLOCK,HOLDLOCK) WHERE Id=@ContractId;
			IF @Status NOT IN (
			    '5f9739e9-4f5c-42ba-8157-d1e2468a27e4', -- Active
			    '69e3f764-e785-4e2d-bff1-4c06e0552a13'  -- Expiring
			) THROW 51511, 'Contract status is ineligible for expiration.', 1;
			IF @End IS NULL OR @End >= CONVERT(date,GETDATE())
			    THROW 51512, 'Contract end date has not passed.', 1;
			UPDATE dbo.UsrMCITContract SET
			    UsrStatusId='357bf1f4-5487-4c08-b532-6bda21c95d98',
			    ModifiedOn=GETDATE(), ModifiedById=@ActorContact
			WHERE Id=@ContractId AND UsrStatusId=@Status;
			IF @@ROWCOUNT<>1 THROW 51513, 'Concurrent contract expiration detected.', 1;
			SELECT CAST(1 AS int);
			";
			        db.StartTransaction(System.Data.IsolationLevel.Serializable);
			        try {
			            var confirmed = new CustomQuery(UserConnection, sql)
			                .WithParameter("ContractId", contractId)
			                .WithParameter("ActorContact", owner).ExecuteScalar<int>(db);
			            if (confirmed != 1) throw new InvalidOperationException("Expiration not confirmed.");
			            db.CommitTransaction();
			        } catch { db.RollbackTransaction(); throw; }
			    }
			    Set<bool>("Success", true);
			    Set<string>("ResultMessage", "Contract expired.");
			} catch (Exception) {
			    Set<bool>("Success", false);
			    Set<string>("ResultMessage", "Contract expiration rejected; no status change committed.");
			}
			return true;
		}

		#endregion

	}

	#endregion

}

