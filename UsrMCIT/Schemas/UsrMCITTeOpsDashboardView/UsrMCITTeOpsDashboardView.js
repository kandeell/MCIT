define("UsrMCITTeOpsDashboardView", ["@creatio-devkit/common"], function(sdk) {
  "use strict";
  const TAG="usr-mcit-teops-dashboard", TYPE="usr.MCITTeOpsDashboard";
  const safe=v=>String(v==null?"":v).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
  const root=()=>location.pathname.split(/\/0(?:\/|$)/)[0].replace(/\/$/,"")+"/0";
  class Dashboard extends HTMLElement {
    constructor(){super();this.attachShadow({mode:"open"});this.contractId="";}
    connectedCallback(){this.render();this.loadContracts();this.load();}
    async loadContracts(){
      const csrf=document.cookie.match(/(?:^|;\s*)BPMCSRF=([^;]*)/);
      if(!csrf)return;
      try{
        const response=await fetch(root()+"/ServiceModel/UsrMCITOperationalReadService.svc/DashboardContracts",{
          method:"POST",credentials:"same-origin",
          headers:{"Content-Type":"application/json","BPMCSRF":decodeURIComponent(csrf[1]),"ForceUseSession":"true"},
          body:"{}"
        });
        if(!response.ok)throw Error("Authorized contracts unavailable.");
        const json=await response.json(), rows=json.DashboardContractsResult??json;
        if(!Array.isArray(rows))throw Error("Authorized contracts unavailable.");
        const selector=this.shadowRoot.querySelector("#contract");
        for(const row of rows){const option=document.createElement("option");option.value=row.Id;option.textContent=row.Name;selector.append(option);}
      }catch(e){this.shadowRoot.querySelector("#message").textContent=e.message;}
    }
    async load(){
      const message=this.shadowRoot.querySelector("#message");message.textContent="Loading authorized operational data…";
      const csrf=document.cookie.match(/(?:^|;\s*)BPMCSRF=([^;]*)/);
      if(!csrf){message.textContent="Session expired. Sign in again.";return;}
      try{
        const response=await fetch(root()+"/ServiceModel/UsrMCITOperationalReadService.svc/Dashboard",{
          method:"POST",credentials:"same-origin",
          headers:{"Content-Type":"application/json","BPMCSRF":decodeURIComponent(csrf[1]),"ForceUseSession":"true"},
          body:JSON.stringify({contractId:this.contractId||"00000000-0000-0000-0000-000000000000"})
        });
        if(!response.ok)throw Error("Access denied or operational data unavailable (HTTP "+response.status+").");
        const json=await response.json(),data=json.DashboardResult??json;
        if(typeof data.TotalContracts!=="number")throw Error("Operational summary is unavailable.");
        const metric=(label,value)=>[label,value==null?"Unavailable":value];
        this.shadowRoot.querySelector("#cards").innerHTML=[
          metric("Total contracts",data.TotalContracts),metric("Active contracts",data.ActiveContracts),
          metric("Approaching expiration",data.ApproachingExpiration),
          metric("Total VM inventory",data.TotalVirtualMachines),metric("Active VMs",data.ActiveVirtualMachines),
          metric("Pending technical review",data.PendingTechnicalReview),
          metric("Pending financial review",data.PendingFinancialReview),
          metric("Pending provisioning",data.PendingProvisioning),
          metric("Available points",data.AvailablePoints),metric("Remaining restored points",data.RemainingRestoredPoints),
          metric("Expiring within 30 days",data.Expiring30Days),metric("Expiring within 90 days",data.Expiring90Days)
        ].map(([name,value])=>`<div class="card"><span>${safe(name)}</span><strong>${safe(value)}</strong></div>`).join("");
        const percent=data.TotalContracts?Math.round(100*data.ActiveContracts/data.TotalContracts):0;
        const vmPercent=data.TotalVirtualMachines?Math.round(100*data.ActiveVirtualMachines/data.TotalVirtualMachines):0;
        this.shadowRoot.querySelector("#chart").innerHTML=
          `<h2>Contract status</h2><div class="plot" role="img" aria-label="${percent}% of visible contracts active"><span style="width:${percent}%"></span></div><p>${safe(data.ActiveContracts)} active of ${safe(data.TotalContracts)} visible contracts</p>
          <h2>VM status</h2><div class="plot" role="img" aria-label="${vmPercent}% of visible VMs active"><span style="width:${vmPercent}%"></span></div><p>${safe(data.ActiveVirtualMachines)} active of ${safe(data.TotalVirtualMachines)} visible VMs</p>`;
        const issues=data.ReconciliationExceptions;
        this.shadowRoot.querySelector("#exceptions").innerHTML=issues?
          `<h2>Reconciliation exceptions</h2><ul>${Object.entries(issues) .map(([key,value])=>`<li>${safe(key.replace(/([a-z])([A-Z])/g,"$1 $2"))}: ${safe(value)}</li>`).join("")}</ul><button id="loadFindingDetails">Show authorized records</button><div id="findingDetails"></div>`:
          `<h2>Reconciliation exceptions</h2><p>${safe(data.ReconciliationAvailability||"Unavailable")}</p>`;
        const detailsButton=this.shadowRoot.querySelector("#loadFindingDetails");
        if(detailsButton)detailsButton.onclick=async()=>{
          const panel=this.shadowRoot.querySelector("#findingDetails");
          panel.textContent="Loading authorized findings…";
          try {
            const result=await fetch(root()+"/ServiceModel/UsrMCITOperationalReadService.svc/ReconciliationDetails",{
              method:"POST",credentials:"same-origin",
              headers:{"Content-Type":"application/json","BPMCSRF":decodeURIComponent(csrf[1]),"ForceUseSession":"true"},
              body:JSON.stringify({contractId:this.contractId||"00000000-0000-0000-0000-000000000000"})
            });
            if(!result.ok)throw Error("Reconciliation details unavailable.");
            const payload=await result.json(), findings=payload.ReconciliationDetailsResult??payload;
            if(!Array.isArray(findings))throw Error("Reconciliation details unavailable.");
            panel.innerHTML=findings.length?
              "<ul>"+findings.map(f=>`<li>${safe(f.Category)} — ${safe(f.EntityName)} ${safe(f.RecordId)} (contract ${safe(f.ContractId)})</li>`).join("")+"</ul>":
              "<p>No authorized exceptions.</p>";
          } catch(error) {panel.textContent=error.message||"Reconciliation details unavailable.";}
        };
        this.shadowRoot.querySelector("#ledger").textContent=data.LedgerAvailability||"";
        const activity=Array.isArray(data.RecentActivity)?data.RecentActivity:[];
        this.shadowRoot.querySelector("#activity").innerHTML=`<h2>Recent operational activity</h2>${activity.length?
          `<ul>${activity.map(r=>`<li><button class="record" data-id="${safe(r.RequestId)}">${safe(r.Name||"Request")}</button> — ${safe((r.ModifiedOn||"").slice(0,10))}</li>`).join("")}</ul>`:
          "<p>No authorized recent requests.</p>"}`;
        this.shadowRoot.querySelector("#activity").querySelectorAll("button.record").forEach(button=>{
          button.onclick=()=>sdk.HandlerChainService.instance.process({
            type:"crt.OpenPageRequest",schemaName:"UsrMCITRequestDetail_Page",
            modelInitConfigs:[{action:"edit",recordId:button.dataset.id}],$context:Dashboard.pageContext
          });
        });
        message.textContent="";
      }catch(e){message.textContent=e.message||"Operational summary could not be loaded.";}
    }
    render(){
      this.shadowRoot.innerHTML=`<style>
        :host{display:block;padding:24px;background:#f8f7fc;color:#35135d;font-family:Rubik,Arial,sans-serif}
        h1{font-size:25px;margin:0 0 6px}h2{font-size:18px;margin:0 0 16px}p{color:#646074}
        .controls{display:flex;gap:12px;flex-wrap:wrap;margin:22px 0}
        input,select,button{font:inherit;border:1px solid #e2e6ef;border-radius:8px;padding:10px;background:white;color:#35135d}
        button{color:#5b21a5;font-weight:600;cursor:pointer}
        .cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:16px}
        .card,#chart,#exceptions,#activity{background:#fff;border:1px solid #e2e6ef;border-radius:12px;padding:20px}
        .card strong{display:block;font-size:28px;margin-top:12px}
        #chart,#exceptions,#activity{margin-top:18px}.record{border:0;background:transparent;color:#5b21a5;text-decoration:underline;padding:0}.plot{height:18px;background:#e2e6ef;border-radius:9px;overflow:hidden}
        .plot span{display:block;height:100%;background:#5b21a5}#message{min-height:24px;margin-top:16px}
      </style><h1>TE OPS Dashboard</h1><p>Operational view of records available to your MCIT role and data scope.</p>
      <div class="controls"><select id="contract" aria-label="Contract"><option value="">All authorized contracts</option></select>
        <button id="apply">Apply filter</button><button id="refresh">Refresh</button></div>
      <div class="cards" id="cards"></div><div id="chart"></div><p id="ledger"></p><div id="exceptions"></div><div id="activity"></div><nav><a href="${root()}/Shell/#Section/UsrPointExpiry">Point Expiry</a> · <a href="${root()}/Shell/#Section/UsrProvisioning">Provisioning</a></nav><div id="message" role="status"></div>`;
      this.shadowRoot.querySelector("#apply").onclick=()=>{this.contractId=this.shadowRoot.querySelector("#contract").value.trim();this.load();};
      this.shadowRoot.querySelector("#refresh").onclick=()=>this.load();
    }
  }
  if(!customElements.get(TAG)){customElements.define(TAG,Dashboard);sdk.registerViewElement({type:TYPE,selector:TAG});}
  return {type:TYPE,setContext:context=>{Dashboard.pageContext=context;}};
});