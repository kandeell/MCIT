namespace Terrasoft.Configuration
{

	using System;
	using System.Collections.Generic;
	using System.Collections.ObjectModel;
	using System.Globalization;
	using Terrasoft.Common;
	using Terrasoft.Core;
	using Terrasoft.Core.Configuration;

	#region Class: UsrMCITEffectiveConfigurationServiceSchema

	/// <exclude/>
	public class UsrMCITEffectiveConfigurationServiceSchema : Terrasoft.Core.SourceCodeSchema
	{

		#region Constructors: Public

		public UsrMCITEffectiveConfigurationServiceSchema(SourceCodeSchemaManager sourceCodeSchemaManager)
			: base(sourceCodeSchemaManager) {
		}

		public UsrMCITEffectiveConfigurationServiceSchema(UsrMCITEffectiveConfigurationServiceSchema source)
			: base( source) {
		}

		#endregion

		#region Methods: Protected

		protected override void InitializeProperties() {
			base.InitializeProperties();
			UId = new Guid("97331df3-e1d4-4d7c-9930-814e4017f0ff");
			Name = "UsrMCITEffectiveConfigurationService";
			ParentSchemaUId = new Guid("50e3acc0-26fc-4237-a095-849a1d534bd3");
			CreatedInPackageId = new Guid("0a07faf7-f6e2-439e-ab7c-961d7c56566e");
			ZipBody = new byte[] { 31,139,8,0,0,0,0,0,4,0,133,80,203,110,194,48,16,188,231,43,44,78,32,33,127,64,81,15,64,31,162,82,160,34,65,28,170,30,76,178,161,86,19,59,245,110,130,162,138,127,175,157,132,144,72,21,236,193,146,103,103,103,103,167,64,169,142,44,168,144,32,155,121,69,239,199,3,48,165,140,192,215,49,164,55,90,124,30,145,44,5,73,173,110,177,246,112,184,180,67,48,70,160,78,200,129,124,169,179,204,141,122,74,100,128,185,136,160,71,88,106,149,200,99,97,106,121,246,235,49,91,31,173,174,237,145,17,17,125,54,232,28,243,53,144,85,203,45,249,32,83,73,213,22,126,10,105,32,3,69,56,238,127,156,37,246,200,238,140,56,22,111,129,120,210,172,201,139,67,42,35,22,165,2,145,237,208,248,203,85,248,156,36,224,50,128,129,219,214,37,123,96,11,129,112,249,53,39,212,134,55,57,52,204,225,33,117,207,6,179,82,165,254,134,177,15,244,165,99,107,118,244,190,9,194,209,148,57,67,128,244,162,77,38,200,226,150,234,3,162,56,66,3,241,55,212,106,218,73,185,218,218,92,181,66,184,51,195,22,58,174,2,170,82,24,80,58,148,239,141,200,243,46,138,94,28,175,133,140,221,22,157,150,78,113,13,167,214,229,184,238,68,237,129,171,120,210,11,192,149,1,42,140,186,23,100,106,81,109,248,191,11,6,114,174,118,8,198,206,43,167,228,142,186,46,159,178,39,65,16,202,12,248,90,159,38,179,110,244,236,53,239,217,251,3,6,208,94,72,15,3,0,0 };
		}

		#endregion

		#region Methods: Public

		public override void GetParentRealUIds(Collection<Guid> realUIds) {
			base.GetParentRealUIds(realUIds);
			realUIds.Add(new Guid("97331df3-e1d4-4d7c-9930-814e4017f0ff"));
		}

		#endregion

	}

	#endregion

}

