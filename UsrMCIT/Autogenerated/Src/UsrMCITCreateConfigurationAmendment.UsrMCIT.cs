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

	#region Class: UsrMCITCreateConfigurationAmendmentMethodsWrapper

	/// <exclude/>
	public class UsrMCITCreateConfigurationAmendmentMethodsWrapper : ProcessModel
	{

		public UsrMCITCreateConfigurationAmendmentMethodsWrapper(Process process)
			: base(process) {
			AddScriptTaskMethod("ScriptTask1Execute", ScriptTask1Execute);
		}

		#region Methods: Private

		private bool ScriptTask1Execute(ProcessExecutingContext context) {
			Set<bool>("Success", false);
			Set<Guid>("NewVersionId", Guid.Empty);
			Set<string>("ResultMessage", "");
			
			try {
			    // Reject a system connection that does not represent the process owner.
			    Guid processInstanceId;
			    if (context == null || context.Process == null ||
			        !Guid.TryParse(context.Process.InstanceUId, out processInstanceId) ||
			        processInstanceId == Guid.Empty || UserConnection.CurrentUser == null ||
			        UserConnection.CurrentUser.ContactId == Guid.Empty) {
			        throw new UnauthorizedAccessException("Cannot verify the initiating user.");
			    }
			    Guid ownerContactId;
			    using (var db = UserConnection.EnsureDBConnection()) {
			        ownerContactId = new Terrasoft.Core.DB.CustomQuery(UserConnection,
			            "SELECT OwnerId FROM dbo.SysProcessLog WHERE Id = @ProcessInstanceId")
			            .WithParameter("ProcessInstanceId", processInstanceId)
			            .ExecuteScalar<Guid>(db);
			    }
			    if (ownerContactId == Guid.Empty ||
			        ownerContactId != UserConnection.CurrentUser.ContactId) {
			        throw new UnauthorizedAccessException("Process owner differs from execution identity.");
			    }
			    var contractId = Get<Guid>("ContractId");
			    var effectiveFrom = Get<DateTime>("EffectiveFrom");
			    var changeReason = Get<string>("ChangeReason");
			
			    var newVersionId =
			        Terrasoft.Configuration
			        .UsrMCITConfigurationAmendmentService
			        .CreateDraftAmendmentForUser(
			            UserConnection,
			            contractId,
			            effectiveFrom,
			            changeReason
			        );
			
			    if (newVersionId == Guid.Empty) {
			        throw new InvalidOperationException(
			            "Draft amendment creation was not confirmed."
			        );
			    }
			
			    Set<Guid>("NewVersionId", newVersionId);
			    Set<bool>("Success", true);
			    Set<string>(
			        "ResultMessage",
			        "Draft configuration amendment created successfully."
			    );
			}
			catch (UnauthorizedAccessException) {
			    Set<string>(
			        "ResultMessage",
			        "You do not have permission to create this amendment."
			    );
			}
			catch (Exception) {
			    Set<string>(
			        "ResultMessage",
			        "Amendment creation failed. Contact your administrator."
			    );
			}
			
			return true;
		}

		#endregion

	}

	#endregion

}

