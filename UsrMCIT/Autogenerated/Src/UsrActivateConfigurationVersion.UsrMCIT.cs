namespace Terrasoft.Core.Process
{

	using System;
	using System.Collections.Generic;
	using System.Collections.ObjectModel;
	using System.Data;
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

	#region Class: UsrActivateConfigurationVersionMethodsWrapper

	/// <exclude/>
	public class UsrActivateConfigurationVersionMethodsWrapper : ProcessModel
	{

		public UsrActivateConfigurationVersionMethodsWrapper(Process process)
			: base(process) {
			AddScriptTaskMethod("CommitConfigurationActivationExecute", CommitConfigurationActivationExecute);
		}

		#region Methods: Private

		private bool CommitConfigurationActivationExecute(ProcessExecutingContext context) {
			var versionId = Get<Guid>("ConfigurationVersion");
			var activationTime = Get<DateTime>("ActivationTime");
			
			Set<bool>("Success", false);
			Set<string>("ResultMessage", "Configuration activation failed.");
			
			// Status IDs confirmed in Realese.
			var activeId = new Guid("e7d05248-9d33-41c3-b688-c0b172b039cc");
			var supersededId = new Guid("395d50d4-e3b8-4bcf-bba0-e6b1d9895348");
			var draftId = new Guid("d153cb20-1a9c-44bf-8ced-1a53f88eed22");
			var scheduledId = new Guid("1cd0011f-6971-49b3-a5b8-04d46130daee");
			
			// For now, activation is restricted to administrators.
			// Replace this with a dedicated permission once configured.
			const string requiredOperation = "CanManageAdministration";
			const string contractSchema = "UsrMCITContract";
			
			// -----------------------------------------------------
			// 1. Validate input parameters
			// -----------------------------------------------------
			
			if (versionId == Guid.Empty) {
			    Set<string>(
			        "ResultMessage",
			        "A configuration version is required."
			    );
			    return true;
			}
			
			if (activationTime == default(DateTime)) {
			    Set<string>(
			        "ResultMessage",
			        "A valid activation time is required."
			    );
			    return true;
			}
			
			// -----------------------------------------------------
			// 2. Identify the process owner
			//
			// The Script Task runs under system security context.
			// Do NOT use UserConnection.CurrentUser as the actor.
			// Read the owner of this process instance instead.
			// -----------------------------------------------------
			
			Guid actorContactId = Guid.Empty;
			Guid actorUserId = Guid.Empty;
			Guid contractId = Guid.Empty;
			
			try {
			    Guid processInstanceId;
			
			    if (context == null ||
			        context.Process == null ||
			        !Guid.TryParse(
			            context.Process.InstanceUId,
			            out processInstanceId
			        ) ||
			        processInstanceId == Guid.Empty) {
			
			        Set<string>(
			            "ResultMessage",
			            "Cannot verify the process initiator."
			        );
			        return true;
			    }
			
			    using (var db = UserConnection.EnsureDBConnection()) {
			
			        const string ownerSql = @"
			SELECT TOP (2)
			    p.OwnerId,
			    u.Id
			FROM dbo.SysProcessLog p
			INNER JOIN dbo.SysAdminUnit u
			    ON u.ContactId = p.OwnerId
			WHERE p.Id = @ProcessInstanceId
			  AND p.OwnerId IS NOT NULL
			  AND u.Active = 1;
			";
			
			        var ownerQuery = new CustomQuery(
			            UserConnection,
			            ownerSql
			        ).WithParameter(
			            "ProcessInstanceId",
			            processInstanceId
			        );
			
			        using (System.Data.IDataReader reader =
			            ownerQuery.ExecuteReader(db)) {
			
			            if (!reader.Read()) {
			                Set<string>(
			                    "ResultMessage",
			                    "No active process owner was found."
			                );
			                return true;
			            }
			
			            actorContactId = reader.GetGuid(0);
			            actorUserId = reader.GetGuid(1);
			
			            // Reject ambiguous contact-to-user mappings.
			            if (reader.Read()) {
			                Set<string>(
			                    "ResultMessage",
			                    "The process owner maps to multiple users."
			                );
			                return true;
			            }
			        }
			
			        if (actorContactId == Guid.Empty ||
			            actorUserId == Guid.Empty) {
			
			            Set<string>(
			                "ResultMessage",
			                "Invalid process owner."
			            );
			            return true;
			        }
			
			        // The Script Task uses system security. Never accept an initiator whose
			        // identity differs from this execution connection. This fails closed for
			        // delegated/background launches until an explicit execution identity is set.
			        if (UserConnection.CurrentUser == null ||
			            UserConnection.CurrentUser.Id != actorUserId ||
			            UserConnection.CurrentUser.ContactId != actorContactId) {
			            Set<string>("ResultMessage", "The execution identity does not match the process owner.");
			            return true;
			        }
			
			        // -------------------------------------------------
			        // 3. Resolve the contract associated with the version
			        // -------------------------------------------------
			
			        const string contractSql = @"
			SELECT UsrContractId
			FROM dbo.UsrContractConfigVersion
			WHERE Id = @VersionId;
			";
			
			        var contractQuery = new CustomQuery(
			            UserConnection,
			            contractSql
			        ).WithParameter(
			            "VersionId",
			            versionId
			        );
			
			        using (System.Data.IDataReader reader =
			            contractQuery.ExecuteReader(db)) {
			
			            if (!reader.Read() || reader.IsDBNull(0)) {
			                Set<string>(
			                    "ResultMessage",
			                    "The configuration version was not found."
			                );
			                return true;
			            }
			
			            contractId = reader.GetGuid(0);
			        }
			
			        if (contractId == Guid.Empty) {
			            Set<string>(
			                "ResultMessage",
			                "The configuration has no valid contract."
			            );
			            return true;
			        }
			
			        // -------------------------------------------------
			        // 4. Check the initiating user's permissions
			        // -------------------------------------------------
			
			        var security = UserConnection.DBSecurityEngine;
			
			        if (!security.GetCanExecuteOperation(
			            requiredOperation,
			            actorUserId
			        )) {
			            Set<string>(
			                "ResultMessage",
			                "You do not have permission to activate configurations."
			            );
			            return true;
			        }
			
			        var objectRights =
			            security.GetEntitySchemaOperationsRightLevel(
			                actorUserId,
			                contractSchema
			            );
			
			        if ((objectRights &
			            Terrasoft.Core.DB.SchemaOperationRightLevels.CanEdit)
			            == 0) {
			
			            Set<string>(
			                "ResultMessage",
			                "You do not have contract editing permission."
			            );
			            return true;
			        }
			
			        var recordRights =
			            security.GetEntitySchemaRecordRightLevel(
			                actorUserId,
			                contractSchema,
			                contractId
			            );
			
			        if ((recordRights &
			            Terrasoft.Core.DB.SchemaRecordRightLevels.CanEdit)
			            == 0) {
			
			            Set<string>(
			                "ResultMessage",
			                "You cannot modify this contract."
			            );
			            return true;
			        }
			
			        // -------------------------------------------------
			        // 5. Atomically activate the selected version
			        // -------------------------------------------------
			
			        const string activationSql = @"
			SET XACT_ABORT ON;
			SET NOCOUNT ON;
			
			DECLARE @ContractId uniqueidentifier;
			DECLARE @StatusId uniqueidentifier;
			DECLARE @EffectiveFrom date, @EffectiveTo date;
			DECLARE @ContractStatus uniqueidentifier, @ContractStart date, @ContractEnd date;
			DECLARE @ContractCurrency uniqueidentifier, @ContractAccount uniqueidentifier;
			
			-- Lock the selected configuration version.
			SELECT
			    @ContractId = UsrContractId,
			    @StatusId = UsrConfigVersionStatusId,
			    @EffectiveFrom = CONVERT(date, UsrEffectiveFrom),
			    @EffectiveTo = CONVERT(date, UsrEffectiveTo)
			FROM dbo.UsrContractConfigVersion
			    WITH (UPDLOCK, HOLDLOCK)
			WHERE Id = @VersionId;
			
			-- Recheck contract identity inside the transaction.
			IF @ContractId IS NULL
			   OR @ContractId <> @ExpectedContractId
			    THROW 51001,
			        'Selected configuration is missing or belongs to another contract.',
			        1;
			
			-- Only Draft or Scheduled versions can be activated.
			IF @StatusId IS NULL
			   OR @StatusId NOT IN (@DraftId, @ScheduledId)
			    THROW 51002,
			        'Selected configuration has an ineligible status.',
			        1;
			
			-- Recheck dates and contract eligibility under the same transaction as the switch.
			IF @EffectiveFrom IS NULL
			   OR @EffectiveFrom > CONVERT(date, @ActivationTime)
			   OR (@EffectiveTo IS NOT NULL AND @EffectiveTo < CONVERT(date, @ActivationTime))
			    THROW 51005, 'Configuration is not effective on the activation date.', 1;
			SELECT @ContractStatus = UsrStatusId,
			       @ContractStart = CONVERT(date, UsrStartDate),
			       @ContractEnd = CONVERT(date, UsrEndDate),
			       @ContractCurrency = UsrCurrencyId,
			       @ContractAccount = UsrAccountId
			FROM dbo.UsrMCITContract WITH (UPDLOCK, HOLDLOCK)
			WHERE Id = @ContractId;
			IF @ContractStatus IS NULL OR @ContractCurrency IS NULL OR @ContractAccount IS NULL
			   OR @ContractStatus NOT IN (
			       '8f2d39e9-7c3f-408f-8c8d-f5385affc5ea', -- Draft: configuration precedes contract activation
			       '5f9739e9-4f5c-42ba-8157-d1e2468a27e4', -- Active
			       '69e3f764-e785-4e2d-bff1-4c06e0552a13'  -- Expiring
			   ) OR @ContractStart IS NULL OR @ContractEnd IS NULL
			   OR @ContractStart >= @ContractEnd
			   OR CONVERT(date, @ActivationTime) < @ContractStart
			   OR CONVERT(date, @ActivationTime) > @ContractEnd
			    THROW 51006, 'The contract is ineligible on the activation date.', 1;
			
			-- Lock all configuration versions belonging to this contract.
			DECLARE @LockedCount int;
			
			SELECT @LockedCount = COUNT(1)
			FROM dbo.UsrContractConfigVersion
			    WITH (UPDLOCK, HOLDLOCK)
			WHERE UsrContractId = @ContractId;
			
			-- Supersede existing active versions and activate the selected one.
			UPDATE dbo.UsrContractConfigVersion
			SET
			    UsrConfigVersionStatusId =
			        CASE
			            WHEN Id = @VersionId THEN @ActiveId
			            ELSE @SupersededId
			        END,
			
			    UsrActivatedOn =
			        CASE
			            WHEN Id = @VersionId THEN @ActivationTime
			            ELSE UsrActivatedOn
			        END,
			
			    UsrActivatedById =
			        CASE
			            WHEN Id = @VersionId THEN @ActorContactId
			            ELSE UsrActivatedById
			        END,
			
			    ModifiedOn = @ActivationTime,
			    ModifiedById = @ActorContactId
			
			WHERE UsrContractId = @ContractId
			  AND (
			       Id = @VersionId
			       OR UsrConfigVersionStatusId = @ActiveId
			  );
			
			-- Exactly one configuration must remain active.
			IF (
			    SELECT COUNT(1)
			    FROM dbo.UsrContractConfigVersion
			    WHERE UsrContractId = @ContractId
			      AND UsrConfigVersionStatusId = @ActiveId
			) <> 1
			    THROW 51003,
			        'Activation did not leave exactly one active version.',
			        1;
			
			-- Verify the selected version became active.
			IF NOT EXISTS (
			    SELECT 1
			    FROM dbo.UsrContractConfigVersion
			    WHERE Id = @VersionId
			      AND UsrContractId = @ContractId
			      AND UsrConfigVersionStatusId = @ActiveId
			      AND UsrActivatedById = @ActorContactId
			)
			    THROW 51004,
			        'Selected configuration activation verification failed.',
			        1;
			
			SELECT CAST(1 AS int) AS ActivationSucceeded;
			";
			
			        db.StartTransaction(
			            System.Data.IsolationLevel.Serializable
			        );
			
			        try {
			            var query = new CustomQuery(
			                UserConnection,
			                activationSql
			            )
			            .WithParameter("VersionId", versionId)
			            .WithParameter("ExpectedContractId", contractId)
			            .WithParameter("DraftId", draftId)
			            .WithParameter("ScheduledId", scheduledId)
			            .WithParameter("ActiveId", activeId)
			            .WithParameter("SupersededId", supersededId)
			            .WithParameter("ActivationTime", activationTime)
			            .WithParameter("ActorContactId", actorContactId);
			
			            using (System.Data.IDataReader reader =
			                query.ExecuteReader(db)) {
			
			                if (!reader.Read() ||
			                    reader.GetInt32(0) != 1) {
			
			                    throw new InvalidOperationException(
			                        "Activation returned no confirmation."
			                    );
			                }
			            }
			
			// Both status changes commit together.
			            db.CommitTransaction();
			        }
			        catch {
			            // Roll back both changes on any failure.
			            db.RollbackTransaction();
			            throw;
			        }
			    }
			
			    // -------------------------------------------------
			    // 6. Report success only after commit
			    // -------------------------------------------------
			
			    Set<bool>("Success", true);
			    Set<string>(
			        "ResultMessage",
			        "Configuration version activated successfully."
			    );
			}
			catch (Exception) {
			
			    Set<bool>("Success", false);
			    Set<string>(
			        "ResultMessage",
			        "Activation failed. No configuration status changes were committed."
			    );
			}
			
			return true;
		}

		#endregion

	}

	#endregion

}

