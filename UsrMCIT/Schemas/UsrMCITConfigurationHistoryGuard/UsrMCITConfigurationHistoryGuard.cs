using System;
using Terrasoft.Core;
using Terrasoft.Core.DB;
using Terrasoft.Core.Entities;
using Terrasoft.Core.Entities.Events;

namespace Terrasoft.Configuration {
    internal static class UsrMCITConfigurationHistoryState {
        private static readonly Guid Active = new Guid("e7d05248-9d33-41c3-b688-c0b172b039cc");
        private static readonly Guid Superseded = new Guid("395d50d4-e3b8-4bcf-bba0-e6b1d9895348");

        internal static void RequireEditable(UserConnection uc, Guid versionId) {
            if (versionId == Guid.Empty) {
                throw new InvalidOperationException("A configuration version is required.");
            }
            using (var db = uc.EnsureDBConnection()) {
                var status = new CustomQuery(uc,
                    "SELECT UsrConfigVersionStatusId FROM dbo.UsrContractConfigVersion WHERE Id = @VersionId")
                    .WithParameter("VersionId", versionId).ExecuteScalar<Guid>(db);
                if (status == Guid.Empty || status == Active || status == Superseded) {
                    throw new InvalidOperationException("Active and superseded configuration history is immutable.");
                }
            }
        }

        internal static Guid RateVersion(UserConnection uc, string table, Guid rateId) {
            if (rateId == Guid.Empty) {
                throw new InvalidOperationException("A saved rate is required.");
            }
            // The table names are constants supplied only by the three listeners below.
            if (table != "UsrConfigResourceRate" && table != "UsrConfigAddOnRate") {
                throw new ArgumentException("Unsupported rate table.");
            }
            using (var db = uc.EnsureDBConnection()) {
                return new CustomQuery(uc,
                    "SELECT UsrConfigVersionId FROM dbo." + table + " WHERE Id = @RateId")
                    .WithParameter("RateId", rateId).ExecuteScalar<Guid>(db);
            }
        }
    }

    [EntityEventListener(SchemaName = "UsrContractConfigVersion")]
    public class UsrMCITConfigurationVersionHistoryGuard : BaseEntityEventListener {
        public override void OnUpdating(object sender, EntityBeforeEventArgs e) {
            base.OnUpdating(sender, e);
            var entity = (Entity)sender;
            UsrMCITConfigurationHistoryState.RequireEditable(entity.UserConnection, entity.PrimaryColumnValue);
        }
        public override void OnDeleting(object sender, EntityBeforeEventArgs e) {
            base.OnDeleting(sender, e);
            var entity = (Entity)sender;
            UsrMCITConfigurationHistoryState.RequireEditable(entity.UserConnection, entity.PrimaryColumnValue);
        }
    }

    [EntityEventListener(SchemaName = "UsrConfigResourceRate")]
    public class UsrMCITResourceRateHistoryGuard : BaseEntityEventListener {
        private static void Check(Entity entity, bool existing, bool checkTarget) {
            if (existing) {
                var original = UsrMCITConfigurationHistoryState.RateVersion(
                    entity.UserConnection, "UsrConfigResourceRate", entity.PrimaryColumnValue);
                UsrMCITConfigurationHistoryState.RequireEditable(entity.UserConnection, original);
            }
            if (checkTarget) {
                UsrMCITConfigurationHistoryState.RequireEditable(entity.UserConnection,
                    entity.GetTypedColumnValue<Guid>("UsrConfigVersionId"));
            }
        }
        public override void OnInserting(object sender, EntityBeforeEventArgs e) {
            base.OnInserting(sender, e); Check((Entity)sender, false, true);
        }
        public override void OnUpdating(object sender, EntityBeforeEventArgs e) {
            base.OnUpdating(sender, e); Check((Entity)sender, true, true);
        }
        public override void OnDeleting(object sender, EntityBeforeEventArgs e) {
            base.OnDeleting(sender, e); Check((Entity)sender, true, false);
        }
    }

    [EntityEventListener(SchemaName = "UsrConfigAddOnRate")]
    public class UsrMCITAddOnRateHistoryGuard : BaseEntityEventListener {
        private static void Check(Entity entity, bool existing, bool checkTarget) {
            if (existing) {
                var original = UsrMCITConfigurationHistoryState.RateVersion(
                    entity.UserConnection, "UsrConfigAddOnRate", entity.PrimaryColumnValue);
                UsrMCITConfigurationHistoryState.RequireEditable(entity.UserConnection, original);
            }
            if (checkTarget) {
                UsrMCITConfigurationHistoryState.RequireEditable(entity.UserConnection,
                    entity.GetTypedColumnValue<Guid>("UsrConfigVersionId"));
            }
        }
        public override void OnInserting(object sender, EntityBeforeEventArgs e) {
            base.OnInserting(sender, e); Check((Entity)sender, false, true);
        }
        public override void OnUpdating(object sender, EntityBeforeEventArgs e) {
            base.OnUpdating(sender, e); Check((Entity)sender, true, true);
        }
        public override void OnDeleting(object sender, EntityBeforeEventArgs e) {
            base.OnDeleting(sender, e); Check((Entity)sender, true, false);
        }
    }
}
