using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Activation;
using System.ServiceModel.Web;
using Terrasoft.Core;
using Terrasoft.Core.Entities;
using Terrasoft.Core.DB;
using Terrasoft.Web.Common;

namespace Terrasoft.Configuration {
    [DataContract]
    public sealed class UsrMCITOperationalSummary {
        [DataMember] public int TotalContracts { get; set; }
        [DataMember] public int ActiveContracts { get; set; }
        [DataMember] public int TotalVirtualMachines { get; set; }
        [DataMember] public int ActiveVirtualMachines { get; set; }
        [DataMember] public int ApproachingExpiration { get; set; }
        [DataMember] public int PendingProvisioning { get; set; }
        [DataMember] public int? PendingTechnicalReview { get; set; }
        [DataMember] public int? PendingFinancialReview { get; set; }
        [DataMember] public decimal? AvailablePoints { get; set; }
        [DataMember] public decimal? RemainingRestoredPoints { get; set; }
        [DataMember] public decimal? Expiring30Days { get; set; }
        [DataMember] public decimal? Expiring90Days { get; set; }
        [DataMember] public string LedgerAvailability { get; set; }
        [DataMember] public List<UsrMCITOperationalActivity> RecentActivity { get; set; }
        [DataMember] public IDictionary<string,int> ReconciliationExceptions { get; set; }
        [DataMember] public string ReconciliationAvailability { get; set; }
        [DataMember] public int TotalRequests { get; set; }
        [DataMember] public int VisiblePointTransactions { get; set; }
        [DataMember] public int VisibleFinancialTransactions { get; set; }
        // TE OPS queue dashboard (null means unavailable, never a fabricated zero).
        [DataMember] public int? AwaitingReview { get; set; }
        [DataMember] public int? FinancialQueue { get; set; }
        [DataMember] public int? TechnicalQueue { get; set; }
        [DataMember] public int? AwaitingMCIT { get; set; }
        [DataMember] public int? ProvisioningQueue { get; set; }
        [DataMember] public int? ApproachingSLA { get; set; }
        [DataMember] public int? Overdue { get; set; }
        [DataMember] public int? FailedProvisions { get; set; }
        [DataMember] public int? CompletedToday { get; set; }
        [DataMember] public int? SLAOnTime { get; set; }
        [DataMember] public int? SLAMissingDeadlines { get; set; }
        [DataMember] public decimal? SLACompliancePercent { get; set; }
        [DataMember] public int? SLAWarningHours { get; set; }
        [DataMember] public bool CanExport { get; set; }
    }

    [DataContract]
    public sealed class UsrMCITOperationalActivity {
        [DataMember] public Guid RequestId { get; set; }
        [DataMember] public string Name { get; set; }
        [DataMember] public DateTime ModifiedOn { get; set; }
        [DataMember] public Guid ContractId { get; set; }
    }
    [DataContract]
    public sealed class UsrMCITAuthorizedContract {
        [DataMember] public Guid Id { get; set; }
        [DataMember] public string Name { get; set; }
    }
    [DataContract]
    public sealed class UsrMCITExpiryReadRow {
        [DataMember] public Guid Id { get; set; }
        [DataMember] public Guid ContractId { get; set; }
        [DataMember] public string ContractName { get; set; }
        [DataMember] public string VirtualMachineName { get; set; }
        [DataMember] public string RestorationReference { get; set; }
        [DataMember] public Guid VirtualMachineId { get; set; }
        [DataMember] public DateTime RestorationDate { get; set; }
        [DataMember] public DateTime ExpirationDate { get; set; }
        [DataMember] public decimal OriginalQuantity { get; set; }
        [DataMember] public decimal ConsumedQuantity { get; set; }
        [DataMember] public decimal ExpiredQuantity { get; set; }
        [DataMember] public decimal RemainingQuantity { get; set; }
        [DataMember] public string RestorationType { get; set; }
        [DataMember] public string Status { get; set; }
        [DataMember] public int DaysRemaining { get; set; }
    }

    [DataContract]
    public sealed class UsrMCITExpiryReadResult {
        [DataMember] public int TotalCount { get; set; }
        [DataMember] public decimal TotalRemaining { get; set; }
        [DataMember] public decimal AvailablePoints { get; set; }
        [DataMember] public decimal Expiring30Days { get; set; }
        [DataMember] public decimal Expiring90Days { get; set; }
        [DataMember] public List<UsrMCITExpiryReadRow> Rows { get; set; }
    }

    [ServiceContract]
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Required)]
    public class UsrMCITOperationalReadService : BaseService {
        private static readonly Guid ExpiringContractStatus = new Guid("69e3f764-e785-4e2d-bff1-4c06e0552a13");
        private static readonly Guid ActiveVMStatus = new Guid("41bb88e4-90bf-4a7e-8544-0af669ab6cbe");
        private static readonly Guid PendingProvisioningStatus = new Guid("d16b6935-b617-41c3-9acd-08b4034ab2a8");
        private static readonly Guid FinancialReviewStage = new Guid("a7999b08-2803-4b7c-b381-d66b99089cea");
        private static readonly Guid TechnicalReviewStage = new Guid("49f3c5d8-4ffa-452f-872e-63309e4fcafa");
        private static readonly Guid ActiveContractStatus =
            new Guid("5f9739e9-4f5c-42ba-8157-d1e2468a27e4");
        private static readonly Guid InitialAllocation = new Guid("f5e6739b-9eba-4b66-b581-e1408bc06240");
        private static readonly Guid OrdinaryRestoration =
            new Guid("a73d30e6-e5e0-4ddb-a62c-ca1a29eb2bf9");
        private static readonly Guid TerminationRestoration =
            new Guid("65a9c955-4b2a-4e70-9bac-4af75f1e0aed");
        private static readonly Guid Expiry =
            new Guid("d453d044-57bc-46ce-87fa-90e640b2e6f8");
        private static readonly Guid ExpiryReset =
            new Guid("9e69bf3a-0e7e-48e5-8f13-e120bc03b8f4");

        private static readonly Guid UnderTEReviewStatus =
            new Guid("5d87de31-758b-4218-929b-2a8363d01f32");
        private static readonly Guid RequiresCorrectionStatus =
            new Guid("049976cb-681d-484a-b95f-e8f0cba3a1ac");
        private static readonly Guid CompletedRequestStatus =
            new Guid("6fd13800-6f13-4515-b803-8b86d4a5ee6d");
        private static readonly Guid FailedProvisioningStatus =
            new Guid("f1043f3a-752c-4fbe-b27a-10e59fbaeafd");

        private static Guid Id(Entity e, string column) {
            var c = e.Schema.Columns.FirstOrDefault(x => x.Name == column);
            if (c == null) return Guid.Empty;
            var v = e.GetColumnValue(c.ColumnValueName);
            return v is Guid ? (Guid)v : Guid.Empty;
        }
        private static decimal Amount(Entity e, string column) {
            var c = e.Schema.Columns.FirstOrDefault(x => x.Name == column);
            if (c == null) throw new InvalidOperationException("Ledger quantity is unavailable.");
            var v = e.GetColumnValue(c.ColumnValueName);
            if (v == null || v == DBNull.Value) throw new InvalidOperationException("Ledger quantity is null.");
            return Convert.ToDecimal(v);
        }
        private static DateTime Date(Entity e, string column) {
            var c = e.Schema.Columns.FirstOrDefault(x => x.Name == column);
            if (c == null) throw new InvalidOperationException("Ledger date is unavailable.");
            var v = e.GetColumnValue(c.ColumnValueName);
            return v == null || v == DBNull.Value ? DateTime.MinValue : Convert.ToDateTime(v);
        }
        private List<Entity> NativeRows(string schema) {
            var q = new EntitySchemaQuery(UserConnection.EntitySchemaManager, schema) {
                UseAdminRights = false
            };
            q.PrimaryQueryColumn.IsAlwaysSelect = true;
            q.AddAllSchemaColumns();
            var rows = q.GetEntityCollection(UserConnection).ToList();
            if (rows.Count > 10000) throw new InvalidOperationException("Operational read exceeds limit.");
            return rows;
        }


        [OperationContract]
        [WebInvoke(Method="POST", RequestFormat=WebMessageFormat.Json,
            ResponseFormat=WebMessageFormat.Json, BodyStyle=WebMessageBodyStyle.Wrapped)]
        public List<UsrMCITReconciliationFinding> ReconciliationDetails(Guid contractId) {
            var counts = Reconciliation(contractId); // Checks screen and complete ledger visibility.
            var allowed = UsrMCITDataScopeRuntime.ReadAuthorizedContractIds(UserConnection);
            var selection = contractId == Guid.Empty ? allowed :
                new HashSet<Guid> { contractId };
            var pointIds = UsrMCITDataScopeRuntime.ReadAuthorizedOperationalRecordIds(
                UserConnection, "UsrPointTransaction");
            var financialIds = UsrMCITDataScopeRuntime.ReadAuthorizedOperationalRecordIds(
                UserConnection, "UsrFinancialTransaction");
            var contractIds = new HashSet<Guid>(NativeRows("UsrMCITContract")
                .Where(e => selection.Contains(e.PrimaryColumnValue))
                .Select(e => e.PrimaryColumnValue));
            var findings = new UsrMCITRestoredPointsExpiryService(UserConnection)
                .ReadReconciliationDetailsForContracts(selection).ToList();
            foreach (var finding in findings) {
                if (!selection.Contains(finding.ContractId) ||
                    !contractIds.Contains(finding.ContractId))
                    throw new UnauthorizedAccessException("Reconciliation scope is incomplete.");
                if (finding.EntityName == "UsrPointTransaction") {
                    if (!pointIds.Contains(finding.RecordId))
                        throw new UnauthorizedAccessException("Point record visibility is incomplete.");
                } else if (finding.EntityName == "UsrFinancialTransaction") {
                    if (!financialIds.Contains(finding.RecordId))
                        throw new UnauthorizedAccessException("Financial record visibility is incomplete.");
                } else if (finding.EntityName == "UsrMCITContract") {
                    if (!contractIds.Contains(finding.RecordId))
                        throw new UnauthorizedAccessException("Contract record visibility is incomplete.");
                } else {
                    throw new InvalidOperationException("Unsupported reconciliation entity.");
                }
            }
            var detailCounts = findings.GroupBy(x => x.Category)
                .ToDictionary(x => x.Key, x => x.Count());
            foreach (var pair in counts) {
                int actual;
                detailCounts.TryGetValue(pair.Key, out actual);
                if (actual != pair.Value)
                    throw new InvalidOperationException("Reconciliation details are incomplete.");
            }
            return findings;
        }

        [OperationContract]
        [WebInvoke(Method="POST", RequestFormat=WebMessageFormat.Json,
            ResponseFormat=WebMessageFormat.Json, BodyStyle=WebMessageBodyStyle.Wrapped)]
        public IDictionary<string,int> Reconciliation(Guid contractId) {
            UsrMCITScreenAccess.Demand(UserConnection, "TE_OPS_DASHBOARD", "View");
            var allowed = UsrMCITDataScopeRuntime.ReadAuthorizedContractIds(UserConnection);
            if (contractId != Guid.Empty && !allowed.Contains(contractId))
                throw new UnauthorizedAccessException("Contract access denied.");
            // The expiry read checks full native point and allocation visibility first.
            PointExpiry(contractId, 0, 1, "", null, null, "", "expiration");
            var financialIds = UsrMCITDataScopeRuntime.ReadAuthorizedOperationalRecordIds(
                UserConnection, "UsrFinancialTransaction");
            var nativeFinancial = NativeRows("UsrFinancialTransaction")
                .Count(e => allowed.Contains(Id(e, "UsrContract")) &&
                    financialIds.Contains(e.PrimaryColumnValue));
            var nativeVersions = NativeRows("UsrContractConfigVersion")
                .Count(e => allowed.Contains(Id(e, "UsrContract")));
            if (allowed.Count > 0) {
                var literals = String.Join(",", allowed.Select(id => "'" + id.ToString("D") + "'"));
                using (var db = UserConnection.EnsureDBConnection()) {
                    int allFinancial = new CustomQuery(UserConnection,
                        "SELECT COUNT(1) FROM dbo.UsrFinancialTransaction WHERE UsrContractId IN (" +
                        literals + ")").ExecuteScalar<int>(db);
                    int allVersions = new CustomQuery(UserConnection,
                        "SELECT COUNT(1) FROM dbo.UsrContractConfigVersion WHERE UsrContractId IN (" +
                        literals + ")").ExecuteScalar<int>(db);
                    if (nativeFinancial != allFinancial || nativeVersions != allVersions)
                        throw new UnauthorizedAccessException("Reconciliation visibility is incomplete.");
                }
            }
            var selection = contractId == Guid.Empty ? allowed : new HashSet<Guid> {contractId};
            return new UsrMCITRestoredPointsExpiryService(UserConnection)
                .ReadReconciliationCountsForContracts(selection);
        }

        // Read only native-visible child rows of already authorized requests.
        // Compare counts against the same request scope to detect hidden child rows.
        // No unauthorized child row or count is returned to the caller.
        private List<Entity> TeOpsRequestChildren(string schema, HashSet<Guid> requestIds) {
            if (schema != "UsrRequestApproval" && schema != "UsrVMRequestItem" &&
                schema != "UsrRequestStatusHistory") {
                throw new ArgumentException("Unsupported dashboard source.");
            }
            if (requestIds.Count == 0) return new List<Entity>();
            var rows = NativeRows(schema)
                .Where(e => requestIds.Contains(Id(e, "UsrRequest"))).ToList();
            var literals = String.Join(",", requestIds.Select(id => "'" + id.ToString("D") + "'"));
            int actual;
            using (var db = UserConnection.EnsureDBConnection()) {
                actual = new CustomQuery(UserConnection,
                    "SELECT COUNT(1) FROM dbo." + schema +
                    " WHERE UsrRequestId IN (" + literals + ")").ExecuteScalar<int>(db);
            }
            if (actual != rows.Count) {
                throw new UnauthorizedAccessException("Dashboard child visibility is incomplete.");
            }
            return rows;
        }

        private int ReadTeOpsWarningHours() {
            try {
                var value = Terrasoft.Core.Configuration.SysSettings.GetValue(
                    UserConnection, "UsrMCITSlaWarningHours");
                int hours;
                if (value != null && Int32.TryParse(value.ToString(), out hours) &&
                    hours > 0 && hours <= 8760) return hours;
            } catch (Exception) { /* Missing/unreadable setting is unavailable. */ }
            return 0;
        }

        private void PopulateTeOpsMetrics(UsrMCITOperationalSummary summary,
                List<Entity> requestRows, HashSet<Guid> authorizedContracts) {
            var now = DateTime.UtcNow;
            int warningHours = ReadTeOpsWarningHours();
            summary.SLAWarningHours = warningHours > 0 ? (int?)warningHours : null;
            var today = now.Date;
            var tomorrow = today.AddDays(1);
            var minValidDate = new DateTime(1900, 1, 1);
            // Intersect the existing request authorization with the contract scope.
            var visibleRequests = requestRows.Where(r =>
                authorizedContracts.Contains(Id(r, "UsrContract")) &&
                !r.GetTypedColumnValue<bool>("UsrIsArchived")).ToList();
            var requestIds = new HashSet<Guid>(visibleRequests.Select(r => r.PrimaryColumnValue));
            var reviewRequestIds = new HashSet<Guid>(visibleRequests
                .Where(r => Id(r, "UsrStatus") == UnderTEReviewStatus)
                .Select(r => r.PrimaryColumnValue));

            summary.AwaitingReview = reviewRequestIds.Count;
            summary.AwaitingMCIT = visibleRequests.Count(r =>
                Id(r, "UsrStatus") == RequiresCorrectionStatus);
            summary.ProvisioningQueue = visibleRequests.Count(r =>
                Id(r, "UsrStatus") == PendingProvisioningStatus);

            try {
                var approvals = TeOpsRequestChildren("UsrRequestApproval", reviewRequestIds)
                    .Where(a => !a.GetTypedColumnValue<bool>("UsrIsCompleted")).ToList();
                summary.FinancialQueue = approvals
                    .Where(a => Id(a, "UsrStage") == FinancialReviewStage)
                    .Select(a => Id(a, "UsrRequest")).Distinct().Count();
                summary.TechnicalQueue = approvals
                    .Where(a => Id(a, "UsrStage") == TechnicalReviewStage)
                    .Select(a => Id(a, "UsrRequest")).Distinct().Count();

                // One SLA classification per request, using its earliest open approval deadline.
                // SLA figures cover active reviews, not historical SLA achievement.
                var deadlineGroups = approvals.GroupBy(a => Id(a, "UsrRequest"))
                    .Select(g => g.Select(a => Date(a, "UsrDueOn")).ToList()).ToList();
                summary.SLAMissingDeadlines = deadlineGroups.Count(g =>
                    g.Any(d => d <= minValidDate)) +
                    (reviewRequestIds.Count - deadlineGroups.Count);
                if (summary.SLAMissingDeadlines == 0) {
                    var deadlines = deadlineGroups.Select(g => g.Min()).ToList();
                    summary.Overdue = deadlines.Count(d => d < now);
                    if (deadlines.Count == 0) {
                        // An empty monitored population has zero requests in every bucket,
                        // but no percentage denominator. Missing configuration is reported separately.
                        summary.ApproachingSLA = 0;
                        summary.SLAOnTime = 0;
                    } else if (warningHours > 0) {
                        var warningLimit = now.AddHours(warningHours);
                        summary.ApproachingSLA = deadlines.Count(d => d >= now && d <= warningLimit);
                        summary.SLAOnTime = deadlines.Count(d => d > warningLimit);
                        if (deadlines.Count > 0) {
                            summary.SLACompliancePercent = Math.Round(
                                100m * summary.SLAOnTime.Value / deadlines.Count, 1);
                        }
                    }
                }
            } catch (Exception) {
                summary.FinancialQueue = null;
                summary.TechnicalQueue = null;
                summary.ApproachingSLA = null;
                summary.Overdue = null;
                summary.SLAOnTime = null;
                summary.SLAMissingDeadlines = null;
                summary.SLACompliancePercent = null;
            }

            try {
                // Count current failed VM items, not repeated provisioning attempts.
                summary.FailedProvisions = TeOpsRequestChildren("UsrVMRequestItem", requestIds)
                    .Count(item => Id(item, "UsrProvisioningStatus") == FailedProvisioningStatus);
            } catch (Exception) { summary.FailedProvisions = null; }

            try {
                var completedIds = new HashSet<Guid>(visibleRequests
                    .Where(r => Id(r, "UsrStatus") == CompletedRequestStatus)
                    .Select(r => r.PrimaryColumnValue));
                var history = TeOpsRequestChildren("UsrRequestStatusHistory", completedIds)
                    .Where(h => Id(h, "UsrNewStatus") == CompletedRequestStatus)
                    .GroupBy(h => Id(h, "UsrRequest"))
                    .ToDictionary(g => g.Key, g => g.Max(h => Date(h, "UsrChangedOn")));
                // Do not substitute ModifiedOn for the actual completion event.
                if (!completedIds.Any(id => !history.ContainsKey(id) || history[id] <= minValidDate)) {
                    summary.CompletedToday = history.Values.Count(d => d >= today && d < tomorrow);
                }
            } catch (Exception) { summary.CompletedToday = null; }
        }

        [OperationContract]
        [WebInvoke(Method="POST", RequestFormat=WebMessageFormat.Json,
            ResponseFormat=WebMessageFormat.Json, BodyStyle=WebMessageBodyStyle.Wrapped)]
        public UsrMCITOperationalSummary Dashboard(Guid contractId) {
            UsrMCITScreenAccess.Demand(UserConnection, "TE_OPS_DASHBOARD", "View");
            var contracts = UsrMCITDataScopeRuntime.ReadAuthorizedContractIds(UserConnection);
            if (contractId != Guid.Empty && !contracts.Contains(contractId))
                throw new UnauthorizedAccessException("Contract access denied.");
            var vms = UsrMCITDataScopeRuntime.ReadAuthorizedOperationalRecordIds(UserConnection, "UsrVirtualMachine");
            var requests = UsrMCITDataScopeRuntime.ReadAuthorizedOperationalRecordIds(UserConnection, "UsrVMRequest");
            var contractRows = NativeRows("UsrMCITContract")
                .Where(e => contracts.Contains(e.PrimaryColumnValue) &&
                    (contractId == Guid.Empty || e.PrimaryColumnValue == contractId)).ToList();
            var vmRows = NativeRows("UsrVirtualMachine")
                .Where(e => vms.Contains(e.PrimaryColumnValue) &&
                    (contractId == Guid.Empty || Id(e, "UsrContract") == contractId)).ToList();
            var requestRows = NativeRows("UsrVMRequest")
                .Where(e => requests.Contains(e.PrimaryColumnValue) &&
                    (contractId == Guid.Empty || Id(e, "UsrContract") == contractId)).ToList();
            var summary = new UsrMCITOperationalSummary {
                TotalContracts = contractRows.Count,
                ActiveContracts = contractRows.Count(e => Id(e, "UsrStatus") == ActiveContractStatus),
                ApproachingExpiration = contractRows.Count(e => Id(e, "UsrStatus") == ExpiringContractStatus),
                TotalVirtualMachines = vmRows.Count,
                ActiveVirtualMachines = vmRows.Count(e => Id(e, "UsrStatus") == ActiveVMStatus),
                TotalRequests = requestRows.Count,
                PendingProvisioning = requestRows.Count(e => Id(e, "UsrStatus") == PendingProvisioningStatus),
                RecentActivity = requestRows.OrderByDescending(e => Date(e, "ModifiedOn"))
                    .Take(10).Select(e => new UsrMCITOperationalActivity {
                        RequestId = e.PrimaryColumnValue,
                        Name = e.GetTypedColumnValue<string>("UsrName"),
                        ModifiedOn = Date(e, "ModifiedOn"),
                        ContractId = Id(e, "UsrContract")
                    }).ToList(),
                LedgerAvailability = "Unavailable: ledger visibility has not been established.",
                ReconciliationAvailability = "Unavailable for this scoped view."
            };
            try {
                var approvals = NativeRows("UsrRequestApproval")
                    .Where(e => requests.Contains(Id(e, "UsrRequest")) &&
                        (contractId == Guid.Empty || requestRows.Any(r => r.PrimaryColumnValue == Id(e, "UsrRequest"))))
                    .Where(e => !e.GetTypedColumnValue<bool>("UsrIsCompleted")).ToList();
                summary.PendingTechnicalReview = approvals.Count(e => Id(e, "UsrStage") == TechnicalReviewStage);
                summary.PendingFinancialReview = approvals.Count(e => Id(e, "UsrStage") == FinancialReviewStage);
            } catch (Exception) {
                summary.PendingTechnicalReview = null;
                summary.PendingFinancialReview = null;
            }
            try {
                var balances = PointExpiry(contractId, 0, 1, "", null, null, "", "expiration");
                summary.AvailablePoints = balances.AvailablePoints;
                summary.RemainingRestoredPoints = balances.TotalRemaining;
                summary.Expiring30Days = balances.Expiring30Days;
                summary.Expiring90Days = balances.Expiring90Days;
                summary.LedgerAvailability = "Available";
            } catch (Exception) {
                // Never report an incomplete ledger read as a zero balance.
            }
            try {
                summary.ReconciliationExceptions = Reconciliation(contractId);
                summary.ReconciliationAvailability = "Available";
            } catch (Exception) { /* authorization and visibility fail closed */ }
            PopulateTeOpsMetrics(summary, requestRows, contracts);
            var grant = UsrMCITScreenAccess.Resolve(UserConnection, "TE_OPS_DASHBOARD");
            summary.CanExport = grant.Success && grant.CanView && grant.CanExport;
            return summary;
        }

        [OperationContract]
        [WebInvoke(Method="POST", RequestFormat=WebMessageFormat.Json,
            ResponseFormat=WebMessageFormat.Json, BodyStyle=WebMessageBodyStyle.Wrapped)]
        public List<UsrMCITAuthorizedContract> DashboardContracts() {
            UsrMCITScreenAccess.Demand(UserConnection, "TE_OPS_DASHBOARD", "View");
            var allowed = UsrMCITDataScopeRuntime.ReadAuthorizedContractIds(UserConnection);
            return NativeRows("UsrMCITContract")
                .Where(e => allowed.Contains(e.PrimaryColumnValue))
                .OrderBy(e => e.GetTypedColumnValue<string>("UsrName"))
                .Select(e => new UsrMCITAuthorizedContract {
                    Id = e.PrimaryColumnValue, Name = e.GetTypedColumnValue<string>("UsrName")
                }).ToList();
        }

        [OperationContract]
        [WebInvoke(Method="POST", RequestFormat=WebMessageFormat.Json,
            ResponseFormat=WebMessageFormat.Json, BodyStyle=WebMessageBodyStyle.Wrapped)]
        public List<UsrMCITAuthorizedContract> Contracts() {
            UsrMCITScreenAccess.Demand(UserConnection, "POINT_EXPIRY", "View");
            var allowed = UsrMCITDataScopeRuntime.ReadAuthorizedContractIds(UserConnection);
            return NativeRows("UsrMCITContract")
                .Where(e => allowed.Contains(e.PrimaryColumnValue))
                .OrderBy(e => e.GetTypedColumnValue<string>("UsrName"))
                .Select(e => new UsrMCITAuthorizedContract {
                    Id = e.PrimaryColumnValue, Name = e.GetTypedColumnValue<string>("UsrName")
                }).ToList();
        }

        // Explicit REST operation for the native Point Expiry page. Keep the existing
        // PointExpiry method intact for internal callers and all authorization checks.
        [OperationContract]
        [WebInvoke(Method="POST", RequestFormat=WebMessageFormat.Json,
            ResponseFormat=WebMessageFormat.Json, BodyStyle=WebMessageBodyStyle.Wrapped)]
        public UsrMCITExpiryReadResult ReadPointExpiry(Guid contractId, int page, int pageSize,
            string status, string fromDate, string toDate, string search, string sort) {
            DateTime? from = ParseExpiryDate(fromDate);
            DateTime? to = ParseExpiryDate(toDate);
            if (from.HasValue && to.HasValue && from.Value > to.Value)
                throw new ArgumentException("Invalid expiry date range.");
            return PointExpiry(contractId, page, pageSize, status, from, to, search, sort);
        }

        private static DateTime? ParseExpiryDate(string value) {
            if (String.IsNullOrWhiteSpace(value)) return null;
            DateTime parsed;
            if (!DateTime.TryParseExact(value, "yyyy-MM-dd",
                System.Globalization.CultureInfo.InvariantCulture,
                System.Globalization.DateTimeStyles.None, out parsed))
                throw new ArgumentException("Date must be yyyy-MM-dd.");
            return parsed.Date;
        }

        public UsrMCITExpiryReadResult PointExpiry(Guid contractId, int page, int pageSize,
            string status, DateTime? fromDate, DateTime? toDate, string search, string sort) {
            UsrMCITScreenAccess.Demand(UserConnection, "POINT_EXPIRY", "View");
            if (page < 0 || pageSize < 1 || pageSize > 100 || (search != null && search.Length > 100))
                throw new ArgumentException("Invalid page or search.");
            var contracts = UsrMCITDataScopeRuntime.ReadAuthorizedContractIds(UserConnection);
            if (contractId != Guid.Empty && !contracts.Contains(contractId))
                throw new UnauthorizedAccessException("Contract access denied.");
            var ids = UsrMCITDataScopeRuntime.ReadAuthorizedOperationalRecordIds(UserConnection, "UsrPointTransaction");
            var contractNames = NativeRows("UsrMCITContract")
                .Where(e => contracts.Contains(e.PrimaryColumnValue))
                .ToDictionary(e => e.PrimaryColumnValue, e => e.GetTypedColumnValue<string>("UsrName") ?? "");
            var vmIds = UsrMCITDataScopeRuntime.ReadAuthorizedOperationalRecordIds(UserConnection, "UsrVirtualMachine");
            var vmNames = NativeRows("UsrVirtualMachine")
                .Where(e => vmIds.Contains(e.PrimaryColumnValue))
                .ToDictionary(e => e.PrimaryColumnValue, e => e.GetTypedColumnValue<string>("UsrName") ?? "");
            var transactions = NativeRows("UsrPointTransaction")
                .Where(e => ids.Contains(e.PrimaryColumnValue)).ToDictionary(e => e.PrimaryColumnValue);
            if (contracts.Count > 0) {
                var contractLiterals = String.Join(",", contracts.Select(id => "'" + id.ToString("D") + "'"));
                var countSql = "SELECT COUNT(1) FROM dbo.UsrPointTransaction WHERE UsrContractId IN (" +
                    contractLiterals + ")";
                int actual;
                using (var db = UserConnection.EnsureDBConnection())
                    actual = new CustomQuery(UserConnection, countSql).ExecuteScalar<int>(db);
                if (actual != transactions.Count)
                    throw new UnauthorizedAccessException("Point ledger visibility is incomplete.");
            }
            var allocationQuery = new EntitySchemaQuery(UserConnection.EntitySchemaManager, "UsrPointAllocation") {
                UseAdminRights = false
            };
            allocationQuery.PrimaryQueryColumn.IsAlwaysSelect = true;
            allocationQuery.AddAllSchemaColumns();
            var allocations = allocationQuery.GetEntityCollection(UserConnection).ToList();
            if (allocations.Count > 30000) throw new InvalidOperationException("Allocation read exceeds limit.");
            // Native allocation visibility must be complete for each visible source.
            // A missing row would otherwise overstate the remaining balance.
            var sourceIds = new HashSet<Guid>(transactions.Values
                .Where(t => Id(t, "UsrTransactionType") == InitialAllocation ||
                            Id(t, "UsrTransactionType") == OrdinaryRestoration ||
                            Id(t, "UsrTransactionType") == TerminationRestoration)
                .Select(t => t.PrimaryColumnValue));
            if (sourceIds.Count > 0) {
                var visibleCounts = allocations
                    .Where(a => sourceIds.Contains(Id(a, "UsrSourceTransaction")))
                    .GroupBy(a => Id(a, "UsrSourceTransaction"))
                    .ToDictionary(g => g.Key, g => g.Count());
                var literals = String.Join(",", sourceIds.Select(id => "'" + id.ToString("D") + "'"));
                var sql = "SELECT UsrSourceTransactionId, COUNT(1) FROM dbo.UsrPointAllocation " +
                    "WHERE UsrSourceTransactionId IN (" + literals + ") GROUP BY UsrSourceTransactionId";
                using (var db = UserConnection.EnsureDBConnection())
                using (var reader = new CustomQuery(UserConnection, sql).ExecuteReader(db)) {
                    while (reader.Read()) {
                        var source = reader.GetGuid(0);
                        int visible;
                        visibleCounts.TryGetValue(source, out visible);
                        if (visible != reader.GetInt32(1))
                            throw new UnauthorizedAccessException("Allocation visibility is incomplete.");
                    }
                }
            }
            var consumed = new Dictionary<Guid, decimal>();
            var expired = new Dictionary<Guid, decimal>();
            foreach (var a in allocations) {
                Guid source = Id(a, "UsrSourceTransaction");
                Guid usage = Id(a, "UsrUsageTransaction");
                Entity use;
                if (!transactions.ContainsKey(source)) continue;
                if (!transactions.TryGetValue(usage, out use))
                    throw new UnauthorizedAccessException("Allocation usage visibility is incomplete.");
                Guid type = Id(use, "UsrTransactionType");
                var target = type == Expiry || type == ExpiryReset ? expired : consumed;
                decimal old;
                target.TryGetValue(source, out old);
                target[source] = old + Amount(a, "UsrQuantity");
            }
            DateTime today = DateTime.UtcNow.Date;
            var all = new List<UsrMCITExpiryReadRow>();
            var totalsRows = new List<UsrMCITExpiryReadRow>();
            foreach (var t in transactions.Values) {
                Guid type = Id(t, "UsrTransactionType");
                if (type != OrdinaryRestoration && type != TerminationRestoration) continue;
                Guid parent = Id(t, "UsrContract");
                if (contractId != Guid.Empty && parent != contractId) continue;
                DateTime expiry = Date(t, "UsrExpirationDate");
                if (expiry == DateTime.MinValue) continue;
                decimal original = Amount(t, "UsrQuantity");
                decimal used, lapsed;
                consumed.TryGetValue(t.PrimaryColumnValue, out used);
                expired.TryGetValue(t.PrimaryColumnValue, out lapsed);
                decimal remaining = original - used - lapsed;
                if (remaining < 0) throw new InvalidOperationException("Inconsistent restored balance.");
                int days = (expiry.Date - today).Days;
                string state = lapsed > 0 && remaining == 0 ? "Expired" :
                    used >= original && lapsed == 0 ? "Fully consumed" :
                    days < 0 && remaining > 0 ? "Overdue" :
                    used > 0 && remaining > 0 ? "Partially consumed" : "Pending expiration";
                string contractName, vmName;
                contractNames.TryGetValue(parent, out contractName);
                vmNames.TryGetValue(Id(t, "UsrVirtualMachine"), out vmName);
                string reference = t.GetTypedColumnValue<string>("UsrName") ?? "";
                var row = new UsrMCITExpiryReadRow {
                    Id = t.PrimaryColumnValue, ContractId = parent,
                    ContractName = contractName, VirtualMachineName = vmName,
                    RestorationReference = reference,
                    VirtualMachineId = Id(t, "UsrVirtualMachine"),
                    RestorationDate = Date(t, "UsrTransactionDate"),
                    ExpirationDate = expiry, OriginalQuantity = original,
                    ConsumedQuantity = used, ExpiredQuantity = lapsed,
                    RemainingQuantity = remaining,
                    RestorationType = type == OrdinaryRestoration ? "Restoration" : "Termination restoration",
                    DaysRemaining = days, Status = state
                };
                totalsRows.Add(row);
                if (!String.IsNullOrEmpty(status) &&
                    !String.Equals(status, state, StringComparison.OrdinalIgnoreCase)) continue;
                if (fromDate.HasValue && expiry.Date < fromDate.Value.Date) continue;
                if (toDate.HasValue && expiry.Date > toDate.Value.Date) continue;
                if (!String.IsNullOrWhiteSpace(search) &&
                    t.PrimaryColumnValue.ToString("D").IndexOf(search.Trim(), StringComparison.OrdinalIgnoreCase) < 0 &&
                    (contractName ?? "").IndexOf(search.Trim(), StringComparison.OrdinalIgnoreCase) < 0 &&
                    (vmName ?? "").IndexOf(search.Trim(), StringComparison.OrdinalIgnoreCase) < 0 &&
                    reference.IndexOf(search.Trim(), StringComparison.OrdinalIgnoreCase) < 0)
                    continue;
                all.Add(row);
            }
            var usedBySource = allocations.GroupBy(a => Id(a, "UsrSourceTransaction"))
                .ToDictionary(g => g.Key, g => g.Sum(a => Amount(a, "UsrQuantity")));
            List<UsrMCITExpiryReadRow> sorted;
            switch ((sort ?? "expiration").ToLowerInvariant()) {
                case "remaining": sorted = all.OrderByDescending(x => x.RemainingQuantity).ThenBy(x => x.Id).ToList(); break;
                case "restoration": sorted = all.OrderByDescending(x => x.RestorationDate).ThenBy(x => x.Id).ToList(); break;
                case "expiration": sorted = all.OrderBy(x => x.ExpirationDate).ThenBy(x => x.Id).ToList(); break;
                default: throw new ArgumentException("Unsupported sort.");
            }
            return new UsrMCITExpiryReadResult {
                TotalCount = sorted.Count,
                AvailablePoints = transactions.Values.Where(t => Id(t, "UsrTransactionType") == InitialAllocation)
                    .Where(t => contractId == Guid.Empty || Id(t, "UsrContract") == contractId)
                    .Sum(t => Amount(t, "UsrQuantity") -
                        (usedBySource.ContainsKey(t.PrimaryColumnValue) ?
                            usedBySource[t.PrimaryColumnValue] : 0m)),
                TotalRemaining = totalsRows.Where(x => x.DaysRemaining >= 0).Sum(x => x.RemainingQuantity),
                Expiring30Days = totalsRows.Where(x => x.DaysRemaining >= 0 && x.DaysRemaining <= 30)
                    .Sum(x => x.RemainingQuantity),
                Expiring90Days = totalsRows.Where(x => x.DaysRemaining >= 0 && x.DaysRemaining <= 90)
                    .Sum(x => x.RemainingQuantity),
                Rows = sorted.Skip(checked(page * pageSize)).Take(pageSize).ToList()
            };
        }
    }
}