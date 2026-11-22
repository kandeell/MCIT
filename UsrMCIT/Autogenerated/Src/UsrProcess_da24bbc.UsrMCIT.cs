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

	#region Class: UsrProcess_da24bbcMethodsWrapper

	/// <exclude/>
	public class UsrProcess_da24bbcMethodsWrapper : ProcessModel
	{

		public UsrProcess_da24bbcMethodsWrapper(Process process)
			: base(process) {
			AddScriptTaskMethod("ScriptTask1Execute", ScriptTask1Execute);
			AddScriptTaskMethod("ScriptTask2Execute", ScriptTask2Execute);
			AddScriptTaskMethod("ScriptTask4Execute", ScriptTask4Execute);
			AddScriptTaskMethod("ScriptTask5Execute", ScriptTask5Execute);
			AddScriptTaskMethod("ScriptTask3Execute", ScriptTask3Execute);
		}

		#region Methods: Private

		private bool ScriptTask1Execute(ProcessExecutingContext context) {
			
			var contractId = Get<Guid>("ContractId");
			var requestId = Get<Guid>("RequestId");
			var operationId = Get<Guid>("OperationId");
			var points = Get<decimal>("PointsRequired");
			
			bool isValid =
			    contractId != Guid.Empty &&
			    requestId != Guid.Empty &&
			    operationId != Guid.Empty &&
			    points > 0m;
			
			Set<bool>("InputsValid", isValid);
			Set<bool>("ConsumptionSucceeded", false);
			Set<decimal>("AvailablePointsUsed", 0m);
			Set<decimal>("RestoredPointsUsed", 0m);
			
			Set<string>(
			    "ErrorMessage",
			    isValid
			        ? ""
			        : "ContractId, RequestId, OperationId and positive PointsRequired are mandatory."
			);
			
			return true;
		}

		private bool ScriptTask2Execute(ProcessExecutingContext context) {
			
			Set<bool>("ConsumptionSucceeded", false);
			Set<string>(
			    "ErrorMessage",
			    "The specified MCIT contract was not found."
			);
			
			return true;
		}

		private bool ScriptTask4Execute(ProcessExecutingContext context) {
			
			Set<bool>("ConsumptionSucceeded", false);
			
			Set<decimal>("AvailablePointsUsed", 0m);
			Set<decimal>("RestoredPointsUsed", 0m);
			
			Set<string>(
			    "ErrorMessage",
			    "VM Request is invalid, not approved, or does not match the contract."
			);
			
			return true;
		}

		private bool ScriptTask5Execute(ProcessExecutingContext context) {
			
			Set<bool>("ConsumptionSucceeded", false);
			Set<string>(
			    "ErrorMessage",
			    "Points have already been consumed for this request item."
			);
			return true;
		}

		private bool ScriptTask3Execute(ProcessExecutingContext context) {
			
			var service =
			    new Terrasoft.Configuration.UsrMCITPointsConsumptionService(
			        Get<Terrasoft.Core.UserConnection>("UserConnection")
			    );
			
			var result = service.PostConsumption(
			    Get<Guid>("ContractId"),
			    Get<Guid>("RequestId"),
			    Get<Guid>("RequestItemId"),
			    Get<Guid>("VirtualMachineId"),
			    Get<Guid>("OperationId"),
			    Get<decimal>("PointsRequired")
			);
			
			Set<bool>("ConsumptionSucceeded", result.Success);
			
			Set<decimal>(
			    "AvailablePointsUsed",
			    result.AvailableUsed
			);
			
			Set<decimal>(
			    "RestoredPointsUsed",
			    result.RestoredUsed
			);
			
			Set<string>("ErrorMessage", result.ErrorMessage);
			
			return true;
		}

		#endregion

	}

	#endregion

}

