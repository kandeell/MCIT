using System;
using System.Collections.Generic;
using System.Linq;
using Terrasoft.Core;
using Terrasoft.Core.DB;
using Terrasoft.Core.Entities;

namespace Terrasoft.Configuration {
    /// <summary>
    /// Read-only, fail-closed contract version selection for new operational work.
    /// Callers must use the returned version ID for resource and add-on rate reads.
    /// Completed transactions continue to use their recorded configuration ID.
    /// </summary>
    public static class UsrMCITEffectiveConfigurationSelector {
        private static readonly Guid ActiveContract =
            new Guid("5f9739e9-4f5c-42ba-8157-d1e2468a27e4");
        private static readonly Guid ActiveVersion =
            new Guid("e7d05248-9d33-41c3-b688-c0b172b039cc");

        private static Guid Lookup(Entity entity, string column) {
            var schemaColumn = entity.Schema.Columns.FirstOrDefault(c => c.Name == column);
            if (schemaColumn == null) throw new InvalidOperationException("Required configuration field is missing: " + column);
            var value = entity.GetColumnValue(schemaColumn.ColumnValueName);
            return value is Guid ? (Guid)value : Guid.Empty;
        }

        private static DateTime Date(Entity entity, string column) {
            var schemaColumn = entity.Schema.Columns.FirstOrDefault(c => c.Name == column);
            if (schemaColumn == null) throw new InvalidOperationException("Required configuration date is missing: " + column);
            var value = entity.GetColumnValue(schemaColumn.ColumnValueName);
            return value == null || value == DBNull.Value ? DateTime.MinValue : Convert.ToDateTime(value);
        }

        private static decimal Amount(Entity entity, string column) {
            var schemaColumn = entity.Schema.Columns.FirstOrDefault(c => c.Name == column);
            if (schemaColumn == null) throw new InvalidOperationException("Required contract amount is missing: " + column);
            var value = entity.GetColumnValue(schemaColumn.ColumnValueName);
            return value == null || value == DBNull.Value ? -1 : Convert.ToDecimal(value);
        }

        private static string Text(Entity entity, string column) {
            var schemaColumn = entity.Schema.Columns.FirstOrDefault(c => c.Name == column);
            if (schemaColumn == null) throw new InvalidOperationException("Required contract text is missing: " + column);
            return Convert.ToString(entity.GetColumnValue(schemaColumn.ColumnValueName)) ?? "";
        }

        private static List<Entity> Visible(UserConnection uc, string schema) {
            var query = new EntitySchemaQuery(uc.EntitySchemaManager, schema) { UseAdminRights = false };
            query.PrimaryQueryColumn.IsAlwaysSelect = true;
            query.AddAllSchemaColumns();
            return query.GetEntityCollection(uc).ToList();
        }

        public static Guid ResolveForNewRequest(UserConnection uc, Guid contractId, DateTime asOf) {
            if (uc == null) throw new ArgumentNullException("uc");
            if (contractId == Guid.Empty || asOf == DateTime.MinValue)
                throw new ArgumentException("Contract and calculation time are required.");
            if (!UsrMCITDataScopeRuntime.ReadAuthorizedContractIds(uc).Contains(contractId))
                throw new UnauthorizedAccessException("Contract access denied.");

            var contractRows = Visible(uc, "UsrMCITContract")
                .Where(e => e.PrimaryColumnValue == contractId).Take(2).ToList();
            if (contractRows.Count != 1) throw new UnauthorizedAccessException("Contract visibility is incomplete.");
            var contract = contractRows[0];
            var start = Date(contract, "UsrStartDate");
            var end = Date(contract, "UsrEndDate");
            if (String.IsNullOrWhiteSpace(Text(contract, "UsrName")) ||
                String.IsNullOrWhiteSpace(Text(contract, "UsrNumber")) ||
                Lookup(contract, "UsrAccount") == Guid.Empty ||
                Lookup(contract, "UsrCurrency") == Guid.Empty ||
                Amount(contract, "UsrInitialBudget") < 0 ||
                Amount(contract, "UsrInitialPoints") < 0 ||
                start == DateTime.MinValue || end <= start ||
                asOf.Date < start.Date || asOf.Date > end.Date ||
                Lookup(contract, "UsrStatus") != ActiveContract)
                throw new InvalidOperationException("Contract is not eligible for new operational work.");

            var visibleVersions = Visible(uc, "UsrContractConfigVersion")
                .Where(e => Lookup(e, "UsrContract") == contractId).ToList();
            // A hidden version could otherwise make a visible Active version look unique.
            using (var db = uc.EnsureDBConnection()) {
                var count = new CustomQuery(uc,
                    "SELECT COUNT(1) FROM dbo.UsrContractConfigVersion WHERE UsrContractId = @ContractId")
                    .WithParameter("ContractId", contractId).ExecuteScalar<int>(db);
                if (count != visibleVersions.Count)
                    throw new UnauthorizedAccessException("Configuration visibility is incomplete.");
            }
            var active = visibleVersions.Where(e => Lookup(e, "UsrConfigVersionStatus") == ActiveVersion).ToList();
            if (active.Count != 1)
                throw new InvalidOperationException("Contract does not have exactly one active configuration.");
            var version = active[0];
            var effectiveFrom = Date(version, "UsrEffectiveFrom");
            var effectiveTo = Date(version, "UsrEffectiveTo");
            if (effectiveFrom == DateTime.MinValue || asOf < effectiveFrom ||
                (effectiveTo != DateTime.MinValue && asOf.Date > effectiveTo.Date))
                throw new InvalidOperationException("The active configuration is not effective at calculation time.");
            return version.PrimaryColumnValue;
        }
    }
}
