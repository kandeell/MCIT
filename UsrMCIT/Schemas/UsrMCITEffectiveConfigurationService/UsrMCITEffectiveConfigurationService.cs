using System;
using System.ServiceModel;
using System.ServiceModel.Activation;
using System.ServiceModel.Web;
using Terrasoft.Web.Common;

namespace Terrasoft.Configuration {
    [ServiceContract]
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Required)]
    public class UsrMCITEffectiveConfigurationService : BaseService {
        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json,
            ResponseFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped)]
        public Guid ResolveForNewRequest(Guid contractId) {
            return UsrMCITEffectiveConfigurationSelector.ResolveForNewRequest(
                UserConnection, contractId, DateTime.Now);
        }
    }
}
