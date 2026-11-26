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

	#region Class: UsrMCITManualProvisioningMethodsWrapper

	/// <exclude/>
	public class UsrMCITManualProvisioningMethodsWrapper : ProcessModel
	{

		public UsrMCITManualProvisioningMethodsWrapper(Process process)
			: base(process) {
			AddScriptTaskMethod("CommitApprovedProvisioningExecute", CommitApprovedProvisioningExecute);
			AddScriptTaskMethod("RetryApprovedCommitmentExecute", RetryApprovedCommitmentExecute);
			AddScriptTaskMethod("CommitApprovedExistingVMResizeExecute", CommitApprovedExistingVMResizeExecute);
		}

		#region Methods: Private

		private bool CommitApprovedProvisioningExecute(ProcessExecutingContext context) {
			Set<bool>("CommitmentSucceeded", false);
			Set<string>("CommitmentError", "");
			try {
			    var requestId = Get<Guid>("CommitmentRequestId");
			    Guid instanceId;
			    if (requestId == Guid.Empty || context == null || context.Process == null ||
			        !Guid.TryParse(context.Process.InstanceUId, out instanceId) ||
			        instanceId == Guid.Empty || UserConnection.CurrentUser == null)
			        throw new UnauthorizedAccessException("Commitment initiator cannot be verified.");
			    Guid ownerId;
			    using (var db = UserConnection.EnsureDBConnection()) {
			        ownerId = new Terrasoft.Core.DB.CustomQuery(UserConnection,
			            "SELECT OwnerId FROM dbo.SysProcessLog WHERE Id=@Id")
			            .WithParameter("Id", instanceId).ExecuteScalar<Guid>(db);
			    }
			    if (ownerId == Guid.Empty || ownerId != UserConnection.CurrentUser.ContactId)
			        throw new UnauthorizedAccessException("Execution identity differs from process owner.");
			    var committed = new Terrasoft.Configuration.UsrMCITAtomicCommitmentService(UserConnection)
			        .CommitProvisionedRequest(requestId, ownerId);
			    Set<bool>("CommitmentSucceeded", committed);
			} catch (Exception ex) {
			    global::Common.Logging.LogManager.GetLogger("UsrMCITManualProvisioning")
			        .Error("Atomic commitment rejected for request " +
			            Get<Guid>("CommitmentRequestId") + ": " + ex);
			    Set<string>("CommitmentError", "Posting failed; provisioning remains complete for safe retry.");
			}
			return true;
		}

		private bool RetryApprovedCommitmentExecute(ProcessExecutingContext context) {
			Set<bool>("RetryCommitmentSucceeded", false);
			try {
			    var requestId = Get<Guid>("RetryRequestId");
			    Guid instanceId;
			    if (requestId == Guid.Empty || context == null || context.Process == null ||
			        !Guid.TryParse(context.Process.InstanceUId, out instanceId) ||
			        instanceId == Guid.Empty || UserConnection.CurrentUser == null)
			        throw new UnauthorizedAccessException("Retry initiator cannot be verified.");
			    Guid ownerId;
			    using (var db = UserConnection.EnsureDBConnection()) {
			        ownerId = new Terrasoft.Core.DB.CustomQuery(UserConnection,
			            "SELECT OwnerId FROM dbo.SysProcessLog WHERE Id=@Id")
			            .WithParameter("Id", instanceId).ExecuteScalar<Guid>(db);
			    }
			    if (ownerId == Guid.Empty || ownerId != UserConnection.CurrentUser.ContactId)
			        throw new UnauthorizedAccessException("Retry execution identity differs from process owner.");
			    Set<bool>("RetryCommitmentSucceeded",
			        new Terrasoft.Configuration.UsrMCITAtomicCommitmentService(UserConnection)
			            .CommitProvisionedRequest(requestId, ownerId));
			} catch (Exception ex) {
			    global::Common.Logging.LogManager.GetLogger("UsrMCITManualProvisioning")
			        .Error("Atomic commitment retry rejected for request " +
			            Get<Guid>("RetryRequestId") + ": " + ex);
			}
			return true;
		}

		private bool CommitApprovedExistingVMResizeExecute(ProcessExecutingContext context) {
			Set<bool>("RetryCommitmentSucceeded", false);
			Set<string>("CommitmentError", string.Empty);
			try {
			    var requestId=Get<Guid>("RetryRequestId");
			    var allowedContractId=Get<Guid>("AllowedResizeTestContractId");
			    Guid instanceId;
			    if(requestId==Guid.Empty || allowedContractId==Guid.Empty ||
			       context==null || context.Process==null ||
			       !Guid.TryParse(context.Process.InstanceUId,out instanceId) ||
			       instanceId==Guid.Empty || UserConnection.CurrentUser==null)
			        throw new UnauthorizedAccessException("Resize execution identity cannot be verified.");
			    Guid ownerId;
			    Guid contractId=Guid.Empty,vmId=Guid.Empty,itemId=Guid.Empty;
			    decimal additional=0,reduction=0;
			    using(var db=UserConnection.EnsureDBConnection()) {
			        ownerId=new Terrasoft.Core.DB.CustomQuery(UserConnection,
			            "SELECT OwnerId FROM dbo.SysProcessLog WHERE Id=@Id")
			            .WithParameter("Id",instanceId).ExecuteScalar<Guid>(db);
			        using(var reader=new Terrasoft.Core.DB.CustomQuery(UserConnection,"SELECT r.UsrContractId,r.UsrTargetVirtualMachineId, r.UsrResizeAdditionalPointsPreview,r.UsrResizeReductionPointsPreview,i.Id FROM dbo.UsrVMRequest r JOIN dbo.UsrVMRequestItem i ON i.UsrRequestId=r.Id WHERE r.Id=@RequestId AND r.UsrTargetVirtualMachineId IS NOT NULL AND r.UsrTargetVirtualMachineId<>@Zero AND (SELECT COUNT(*) FROM dbo.UsrVMRequestItem WHERE UsrRequestId=r.Id)=1")
			            .WithParameter("RequestId",requestId)
			            .WithParameter("Zero",Guid.Empty).ExecuteReader(db)) {
			            if(!reader.Read() || reader.IsDBNull(0) || reader.IsDBNull(1) ||
			               reader.IsDBNull(2) || reader.IsDBNull(3) || reader.IsDBNull(4))
			                throw new InvalidOperationException("Exactly one existing VM request item is required.");
			            contractId=reader.GetGuid(0);vmId=reader.GetGuid(1);
			            additional=reader.GetDecimal(2);reduction=reader.GetDecimal(3);
			            itemId=reader.GetGuid(4);
			        }
			    }
			    if(ownerId==Guid.Empty || ownerId!=UserConnection.CurrentUser.ContactId ||
			       allowedContractId!=contractId)
			        throw new UnauthorizedAccessException("Resize owner or isolated contract mismatch.");
			    var service=new Terrasoft.Configuration.UsrMCITAtomicCommitmentService(UserConnection);
			    bool done;
			    if(additional>0 && reduction==0)
			        done=service.CommitApprovedResize(requestId,ownerId,vmId,itemId,
			            allowedContractId,Get<bool>("ResizeMonetaryPostingEnabled"));
			    else if(reduction>0 && additional==0)
			        done=service.ApplyApprovedDowngrade(requestId,ownerId,vmId,itemId,
			            allowedContractId,Get<bool>("DowngradeRestorationEnabled"));
			    else
			        throw new InvalidOperationException("Approved upgrade or downgrade preview is required.");
			    Set<bool>("RetryCommitmentSucceeded",done);
			} catch(Exception ex) {
			    Set<string>("CommitmentError", ex.Message);
			    global::Common.Logging.LogManager.GetLogger("UsrMCITManualProvisioning")
			        .Error("Existing-VM resize retry rejected for request "+
			            Get<Guid>("RetryRequestId")+": "+ex);
			}
			return true;
		}

		#endregion

	}

	#endregion

}

