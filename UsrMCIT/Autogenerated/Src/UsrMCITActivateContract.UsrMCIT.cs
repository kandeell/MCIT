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
			    var owner = Get<Guid>("InitiatorContact");
			
			    if (contractId == Guid.Empty)
			        throw new InvalidOperationException(
			            "A contract is required."
			        );
			
			    Guid instanceId;
			
			    if (context == null ||
			        context.Process == null ||
			        !Guid.TryParse(
			            context.Process.InstanceUId,
			            out instanceId
			        ) ||
			        instanceId == Guid.Empty)
			    {
			        throw new UnauthorizedAccessException(
			            "Cannot verify process context."
			        );
			    }
			
			    // Verify activation initiator
			
			    if (owner == Guid.Empty ||
			        UserConnection.CurrentUser == null ||
			        owner != UserConnection.CurrentUser.ContactId)
			    {
			        throw new UnauthorizedAccessException(
			            "Cannot verify the contract activation initiator."
			        );
			    }
			
			    // Verify screen permissions
			
			    Terrasoft.Configuration.UsrMCITScreenAccess.Demand(
			        UserConnection,
			        "CONTRACTS",
			        "Activate"
			    );
			
			    // Verify contract data scope
			
			    if (!Terrasoft.Configuration.UsrMCITDataScopeRuntime
			        .ReadAuthorizedContractIds(UserConnection)
			        .Contains(contractId))
			    {
			        throw new UnauthorizedAccessException(
			            "Contract scope denied."
			        );
			    }
			
			    // Verify object editing permissions
			
			    var security = UserConnection.DBSecurityEngine;
			
			    var rights =
			        security.GetEntitySchemaOperationsRightLevel(
			            UserConnection.CurrentUser.Id,
			            "UsrMCITContract"
			        );
			
			    if ((rights &
			        Terrasoft.Core.DB.SchemaOperationRightLevels.CanEdit) == 0)
			    {
			        throw new UnauthorizedAccessException(
			            "Contract edit denied."
			        );
			    }
			
			    // Verify record editing permissions
			
			    var recordRights =
			        security.GetEntitySchemaRecordRightLevel(
			            UserConnection.CurrentUser.Id,
			            "UsrMCITContract",
			            contractId
			        );
			
			    if ((recordRights &
			        Terrasoft.Core.DB.SchemaRecordRightLevels.CanEdit) == 0)
			    {
			        throw new UnauthorizedAccessException(
			            "Contract record edit denied."
			        );
			    }
			
			    const string sql = @"
			
			SET XACT_ABORT ON;
			SET NOCOUNT ON;
			
			DECLARE @Now datetime2 = GETDATE();
			DECLARE @Today date = CONVERT(date, @Now);
			
			DECLARE @Status uniqueidentifier;
			DECLARE @Start date;
			DECLARE @End date;
			DECLARE @Name nvarchar(max);
			DECLARE @Number nvarchar(max);
			DECLARE @Account uniqueidentifier;
			DECLARE @Currency uniqueidentifier;
			DECLARE @Budget decimal(18,4);
			DECLARE @Points decimal(18,4);
			DECLARE @ConfigVersionId uniqueidentifier;
			
			DECLARE @DraftId uniqueidentifier =
			    '8F2D39E9-7C3F-408F-8C8D-F5385AFFC5EA';
			
			DECLARE @ActiveContractId uniqueidentifier =
			    '5F9739E9-4F5C-42BA-8157-D1E2468A27E4';
			
			DECLARE @ActiveConfigId uniqueidentifier =
			    'E7D05248-9D33-41C3-B688-C0B172B039CC';
			
			DECLARE @InitialAllocationType uniqueidentifier =
			    'F5E6739B-9EBA-4B66-B581-E1408BC06240';
			
			DECLARE @AvailableBalanceType uniqueidentifier =
			    'E815D3E7-FF4B-4986-AE79-806570585C4F';
			
			-- 1. Lock and read contract
			
			SELECT
			    @Status = UsrStatusId,
			    @Start = UsrStartDate,
			    @End = UsrEndDate,
			    @Name = UsrName,
			    @Number = UsrNumber,
			    @Account = UsrAccountId,
			    @Currency = UsrCurrencyId,
			    @Budget = UsrInitialBudget,
			    @Points = UsrInitialPoints
			FROM dbo.UsrMCITContract
			WITH (UPDLOCK, HOLDLOCK)
			WHERE Id = @ContractId;
			
			-- 2. Validate contract status
			
			IF @Status IS NULL OR @Status <> @DraftId
			    THROW 51501,
			        'Only a Draft contract can be activated.',
			        1;
			
			-- 3. Validate contract details
			
			IF @Start IS NULL
			   OR @End IS NULL
			   OR @End <= @Start
			   OR @Today < @Start
			   OR @Today > @End
			   OR NULLIF(LTRIM(RTRIM(@Name)), '') IS NULL
			   OR NULLIF(LTRIM(RTRIM(@Number)), '') IS NULL
			   OR @Account IS NULL
			   OR @Currency IS NULL
			   OR @Budget IS NULL
			   OR @Budget < 0
			   OR @Points IS NULL
			   OR @Points < 0
			
			    THROW 51502,
			        'Contract details or effective dates are invalid.',
			        1;
			
			-- 4. Validate effective Active configuration
			
			IF (
			    SELECT COUNT(*)
			    FROM dbo.UsrContractConfigVersion
			    WITH (UPDLOCK, HOLDLOCK)
			    WHERE UsrContractId = @ContractId
			      AND UsrConfigVersionStatusId = @ActiveConfigId
			      AND CONVERT(date, UsrEffectiveFrom) <= @Today
			      AND (
			          UsrEffectiveTo IS NULL
			          OR CONVERT(date, UsrEffectiveTo) >= @Today
			      )
			) <> 1
			
			    THROW 51503,
			        'Exactly one effective Active configuration is required.',
			        1;
			
			SELECT @ConfigVersionId = Id
			FROM dbo.UsrContractConfigVersion
			WITH (UPDLOCK, HOLDLOCK)
			WHERE UsrContractId = @ContractId
			  AND UsrConfigVersionStatusId = @ActiveConfigId
			  AND CONVERT(date, UsrEffectiveFrom) <= @Today
			  AND (
			      UsrEffectiveTo IS NULL
			      OR CONVERT(date, UsrEffectiveTo) >= @Today
			  );
			
			IF @ConfigVersionId IS NULL
			    THROW 51507,
			        'Active configuration not found.',
			        1;
			
			-- 5. Verify resource pricing exists
			
			IF NOT EXISTS (
			    SELECT 1
			    FROM dbo.UsrConfigResourceRate
			    WITH (UPDLOCK, HOLDLOCK)
			    WHERE UsrConfigVersionId = @ConfigVersionId
			)
			
			    THROW 51504,
			        'Resource pricing is required.',
			        1;
			
			-- 6. Validate resource pricing
			
			IF EXISTS (
			    SELECT 1
			    FROM dbo.UsrConfigResourceRate
			    WITH (UPDLOCK, HOLDLOCK)
			    WHERE UsrConfigVersionId = @ConfigVersionId
			      AND (
			          UsrCurrencyId IS NULL
			          OR UsrCurrencyId <> @Currency
			          OR UsrResourceTypeId IS NULL
			          OR UsrPricingUnitLookupId IS NULL
			          OR UsrAmountPerUnit IS NULL
			          OR UsrAmountPerUnit < 0
			          OR UsrPointsPerUnit IS NULL
			          OR UsrPointsPerUnit < 0
			      )
			)
			
			    THROW 51506,
			        'Active configuration has invalid resource pricing.',
			        1;
			
			-- 7. Prevent duplicate initial allocation
			-- Unexpected ledger history requires reconciliation.
			
			IF EXISTS (
			    SELECT 1
			    FROM dbo.UsrPointTransaction
			    WITH (UPDLOCK, HOLDLOCK)
			    WHERE UsrContractId = @ContractId
			)
			
			    THROW 51508,
			        'Contract already has ledger transactions. Reconciliation required.',
			        1;
			
			-- 8. Automatically allocate initial points
			
			IF @Points > 0
			BEGIN
			
			    INSERT INTO dbo.UsrPointTransaction (
			        Id,
			        CreatedOn,
			        CreatedById,
			        ModifiedOn,
			        ModifiedById,
			        ProcessListeners,
			        UsrName,
			        UsrReason,
			        UsrTransactionDate,
			        UsrActorId,
			        UsrQuantity,
			        UsrTransactionTypeId,
			        UsrContractId,
			        UsrConfigVersionId,
			        UsrSourceBalanceId
			    )
			
			    VALUES (
			        NEWID(),
			        @Now,
			        @ActorContact,
			        @Now,
			        @ActorContact,
			        0,
			        @Number + ' - Initial Allocation',
			        'Initial contract points allocation',
			        @Now,
			        @ActorContact,
			        @Points,
			        @InitialAllocationType,
			        @ContractId,
			        @ConfigVersionId,
			        @AvailableBalanceType
			    );
			
			    IF @@ROWCOUNT <> 1
			        THROW 51509,
			            'Initial allocation failed.',
			            1;
			
			    -- Verify initial allocation
			
			    IF (
			        SELECT COUNT(*)
			        FROM dbo.UsrPointTransaction
			        WHERE UsrContractId = @ContractId
			          AND UsrTransactionTypeId = @InitialAllocationType
			    ) <> 1
			
			        THROW 51510,
			            'Initial allocation verification failed.',
			            1;
			
			    IF NOT EXISTS (
			        SELECT 1
			        FROM dbo.UsrPointTransaction
			        WHERE UsrContractId = @ContractId
			          AND UsrTransactionTypeId = @InitialAllocationType
			          AND UsrSourceBalanceId = @AvailableBalanceType
			          AND UsrConfigVersionId = @ConfigVersionId
			          AND UsrQuantity = @Points
			    )
			
			        THROW 51511,
			            'Initial points quantity verification failed.',
			            1;
			
			END;
			
			-- 9. Activate contract
			
			UPDATE dbo.UsrMCITContract
			SET
			    UsrStatusId = @ActiveContractId,
			    ModifiedOn = @Now,
			    ModifiedById = @ActorContact
			WHERE Id = @ContractId
			  AND UsrStatusId = @DraftId;
			
			IF @@ROWCOUNT <> 1
			
			    THROW 51505,
			        'Concurrent contract activation detected.',
			        1;
			
			-- 10. Confirm final status
			
			IF NOT EXISTS (
			    SELECT 1
			    FROM dbo.UsrMCITContract
			    WHERE Id = @ContractId
			      AND UsrStatusId = @ActiveContractId
			)
			
			    THROW 51512,
			        'Contract activation verification failed.',
			        1;
			
			SELECT CAST(1 AS int);
			
			";
			
			    // Execute activation and initial allocation
			    // within a single atomic transaction.
			
			    using (var db = UserConnection.EnsureDBConnection()) {
			
			        db.StartTransaction(
			            System.Data.IsolationLevel.Serializable
			        );
			
			        try {
			
			            var confirmed = new CustomQuery(
			                UserConnection,
			                sql
			            )
			            .WithParameter("ContractId", contractId)
			            .WithParameter("ActorContact", owner)
			            .ExecuteScalar<int>(db);
			
			            if (confirmed != 1)
			            {
			                throw new InvalidOperationException(
			                    "Activation not confirmed."
			                );
			            }
			
			            db.CommitTransaction();
			
			        }
			        catch {
			
			            db.RollbackTransaction();
			            throw;
			        }
			    }
			
			    Set<bool>("Success", true);
			
			    Set<string>(
			        "ResultMessage",
			        "Contract activated and initial points initialized successfully."
			    );
			
			}
			catch (Exception) {
			
			    Set<bool>("Success", false);
			
			    Set<string>(
			        "ResultMessage",
			        "Contract activation rejected; no activation changes committed."
			    );
			
			    // Temporary diagnostic for acceptance testing.
			
			    throw;
			}
			
			return true;
		}

		#endregion

	}

	#endregion

}

