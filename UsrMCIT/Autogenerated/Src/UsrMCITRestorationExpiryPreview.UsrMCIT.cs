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

	#region Class: UsrMCITRestorationExpiryPreviewMethodsWrapper

	/// <exclude/>
	public class UsrMCITRestorationExpiryPreviewMethodsWrapper : ProcessModel
	{

		public UsrMCITRestorationExpiryPreviewMethodsWrapper(Process process)
			: base(process) {
			AddScriptTaskMethod("ScriptTask1Execute", ScriptTask1Execute);
		}

		#region Methods: Private

		private bool ScriptTask1Execute(ProcessExecutingContext context) {
			
			
			var contractId = Get<System.Guid>("ContractID");
			
			if (contractId == System.Guid.Empty) {
			    throw new System.InvalidOperationException(
			        "ContractId is required.");
			}
			
			var sql = @"
			SET NOCOUNT ON;
			
			DECLARE @Today date = CONVERT(date, GETDATE());
			
			IF NOT EXISTS (
			    SELECT 1 FROM dbo.UsrMCITContract
			    WHERE Id = @ContractId
			)
			    THROW 51001, 'Contract not found.', 1;
			
			IF EXISTS (
			    SELECT 1
			    FROM dbo.UsrPointTransaction r
			    OUTER APPLY (
			        SELECT COALESCE(SUM(a.UsrQuantity), 0) AS Used
			        FROM dbo.UsrPointAllocation a
			        WHERE a.UsrSourceTransactionId = r.Id
			    ) a
			    WHERE r.UsrContractId = @ContractId
			      AND r.UsrTransactionTypeId IN (
			          @RestorationType, @VmRestorationType
			      )
			      AND (
			          r.UsrExpirationDate IS NULL
			          OR r.UsrQuantity < 0
			          OR a.Used > r.UsrQuantity
			      )
			)
			    THROW 51002, 'Invalid restoration ledger.', 1;
			
			;WITH Outstanding AS (
			    SELECT
			        r.UsrExpirationDate,
			        r.UsrQuantity - a.Used AS Remaining
			    FROM dbo.UsrPointTransaction r
			    OUTER APPLY (
			        SELECT COALESCE(SUM(x.UsrQuantity), 0) AS Used
			        FROM dbo.UsrPointAllocation x
			        WHERE x.UsrSourceTransactionId = r.Id
			    ) a
			    WHERE r.UsrContractId = @ContractId
			      AND r.UsrTransactionTypeId IN (
			          @RestorationType, @VmRestorationType
			      )
			),
			Totals AS (
			    SELECT
			        COALESCE(SUM(CASE
			            WHEN UsrExpirationDate > @Today
			             AND UsrExpirationDate <= DATEADD(day,30,@Today)
			            THEN Remaining ELSE 0 END), 0) AS Points30,
			        COALESCE(SUM(CASE
			            WHEN UsrExpirationDate > @Today
			             AND UsrExpirationDate <= DATEADD(day,90,@Today)
			            THEN Remaining ELSE 0 END), 0) AS Points90
			    FROM Outstanding
			)
			UPDATE c
			SET
			    UsrRestoredPointsExpiring30Days = t.Points30,
			    UsrRestoredPointsExpiring90Days = t.Points90
			FROM dbo.UsrMCITContract c
			CROSS JOIN Totals t
			WHERE c.Id = @ContractId;
			
			IF @@ROWCOUNT <> 1
			    THROW 51003, 'Preview update failed.', 1;
			";
			
			new Terrasoft.Core.DB.CustomQuery(UserConnection, sql)
			    .WithParameter("ContractId", contractId)
			    .WithParameter("RestorationType",
			        new System.Guid(
			            "A73D30E6-E5E0-4DDB-A62C-CA1A29EB2BF9"))
			    .WithParameter("VmRestorationType",
			        new System.Guid(
			            "65A9C955-4B2A-4E70-9BAC-4AF75F1E0AED"))
			    .Execute();
			
			return true;
		}

		#endregion

	}

	#endregion

}

