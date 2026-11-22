 using System;
using Terrasoft.Core;
using Terrasoft.Core.Entities;
using Terrasoft.Core.Entities.Events;

namespace Terrasoft.Configuration
{
    /// <summary>
    /// Creatio event-layer bridge for completing a VM termination WITHOUT a new BPMN/API.
    ///
    /// Installation prerequisites:
    ///   1. UsrVirtualMachine Boolean column UsrDecommissionConfirmed (default false).
    ///   2. System operation UsrMCITConfirmVMDecommission, granted ONLY to trusted
    ///      decommissioning operators / the provisioning integration identity.
    ///   3. A compiled UsrMCITVMTerminationRestorationService.
    ///   4. The termination service's existing VM-resource consumption requirements
    ///      (VM Id, original usage allocation, dedicated refundable reason) are met.
    ///
    /// Usage:
    ///   - Request/approve termination through the existing lifecycle.
    ///   - Set VM status to Terminating (not Terminated).
    ///   - Complete and verify actual external/manual decommissioning.
    ///   - An authorized operator changes UsrDecommissionConfirmed false -> true.
    ///   - OnUpdated invokes the existing service, which posts the immutable ledger
    ///     restoration AND sets status to Terminated in one DB transaction.
    ///
    /// IMPORTANT: This Boolean is an OPERATOR ATTESTATION, not independent proof
    /// of decommissioning. Protect its edit rights and restrict the operation.
    /// A failure after the confirmation field was saved may leave confirmation=true
    /// but status=Terminating. Only the privileged operator may reset the field
    /// false then true to retry after correcting the underlying issue.
    /// </summary>
    [EntityEventListener(SchemaName = "UsrVirtualMachine")]
    public class UsrMCITVMTerminationListener : BaseEntityEventListener
    {
        private const string ConfirmColumn = "UsrDecommissionConfirmed";
        private const string PermissionCode = "UsrMCITConfirmVMDecommission";

        // GUIDs are from UsrMCIT/UsrMCITVMStatus package bindings.
        // VERIFY them against the LIVE Realese lookup before publishing.
        private static readonly Guid TerminatingStatus =
            new Guid("F70A3E1A-DED5-40CC-B75D-0F8B659BF3A1");
        private static readonly Guid TerminatedStatus =
            new Guid("8E596E69-3281-447F-AB09-13BB75309260");

        public override void OnInserting(object sender, EntityBeforeEventArgs e)
        {
            base.OnInserting(sender, e);
            var vm = (Entity)sender;
            if (vm.GetTypedColumnValue<bool>(ConfirmColumn))
            {
                throw new InvalidOperationException(
                    "A new VM cannot be created with decommissioning already confirmed.");
            }
        }

        public override void OnUpdating(object sender, EntityBeforeEventArgs e)
        {
            base.OnUpdating(sender, e);
            var vm = (Entity)sender;
            var oldStatus = vm.GetTypedOldColumnValue<Guid>("UsrStatusId");
            var newStatus = vm.GetTypedColumnValue<Guid>("UsrStatusId");
            var wasConfirmed = vm.GetTypedOldColumnValue<bool>(ConfirmColumn);
            var isConfirmed = vm.GetTypedColumnValue<bool>(ConfirmColumn);

            // All ordinary Entity.Save() paths are prohibited from directly marking
            // a VM as Terminated. Only the atomic C# service may finalize that status.
            // Its direct SQL status update does not raise entity-layer events.
            if (oldStatus != TerminatedStatus && newStatus == TerminatedStatus)
            {
                throw new InvalidOperationException(
                    "Do not edit VM status directly to Terminated. " +
                    "Use the verified decommission-confirmation action.");
            }
            if (oldStatus == TerminatedStatus && newStatus != TerminatedStatus)
            {
                throw new InvalidOperationException(
                    "A terminated VM cannot be reopened by editing its status.");
            }

            if (wasConfirmed == isConfirmed)
            {
                return;
            }

            // Even turning the confirmation OFF is restricted: it controls the
            // event that can create financially meaningful restoration entries.
            var uc = vm.UserConnection;
            uc.DBSecurityEngine.CheckCanExecuteOperation(PermissionCode);

            if (!wasConfirmed && isConfirmed && newStatus != TerminatingStatus)
            {
                throw new InvalidOperationException(
                    "Confirm decommissioning only when VM status is Terminating.");
            }
            if (wasConfirmed && !isConfirmed && newStatus == TerminatedStatus)
            {
                throw new InvalidOperationException(
                    "Decommission confirmation cannot be reset on a terminated VM.");
            }
        }

        public override void OnUpdated(object sender, EntityAfterEventArgs e)
        {
            base.OnUpdated(sender, e);
            var vm = (Entity)sender;
            var wasConfirmed = vm.GetTypedOldColumnValue<bool>(ConfirmColumn);
            var isConfirmed = vm.GetTypedColumnValue<bool>(ConfirmColumn);

            // Trigger exactly on false -> true (not on any other VM edit).
            if (wasConfirmed || !isConfirmed)
            {
                return;
            }

            var uc = vm.UserConnection;
            uc.DBSecurityEngine.CheckCanExecuteOperation(PermissionCode);

            Guid vmId = vm.PrimaryColumnValue;
            Guid contractId = vm.GetTypedColumnValue<Guid>("UsrContractId");
            if (vmId == Guid.Empty || contractId == Guid.Empty)
            {
                throw new InvalidOperationException(
                    "VM/Contract ID is missing; no restoration was posted.");
            }

            // Stable operation ID per VM: same VM cannot get a new refund when
            // the confirmation action is repeated after a failed attempt.
            Guid terminationOperationId = vmId;
            var service = new UsrMCITVMTerminationRestorationService(uc);
            var result = service.FinalizeTermination(
                vmId, contractId, terminationOperationId, true);

            if (result == null || !result.Success)
            {
                throw new InvalidOperationException(
                    "VM termination restoration did not complete: " +
                    (result == null ? "No response" : result.ErrorMessage));
            }
        }
    }
}
