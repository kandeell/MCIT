define("UsrMCITPointExpiryView", ["@creatio-devkit/common"], function(sdk) {
  const TAG="usr-mcit-point-expiry-readonly", TYPE="usr.MCITPointExpiryReadOnly";
  const safe=v=>String(v==null?"":v).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;");
  const root=()=>location.pathname.split(/\/0(?:\/|$)/)[0].replace(/\/$/,"")+"/0";
  class PointExpiry extends HTMLElement {
    constructor(){super();this.attachShadow({mode:"open"});this.page=0;this.size=25;this.filters={contractId:"",status:"",fromDate:"",toDate:"",search:""};}
    connectedCallback(){this.render();this.loadContracts();this.load();}
    async loadContracts(){
      const csrf=document.cookie.match(/(?:^|;\s*)BPMCSRF=([^;]*)/);
      if(!csrf)return;
      try {
        const response=await fetch(root()+"/ServiceModel/UsrMCITOperationalReadService.svc/Contracts",{
          method:"POST",credentials:"same-origin",
          headers:{"Content-Type":"application/json","BPMCSRF":decodeURIComponent(csrf[1]),"ForceUseSession":"true"},
          body:"{}"
        });
        if(!response.ok)throw Error("Authorized contracts unavailable.");
        const json=await response.json(), rows=json.ContractsResult??json;
        if(!Array.isArray(rows))throw Error("Authorized contracts unavailable.");
        const selector=this.shadowRoot.querySelector("#contract");
        for(const row of rows){const option=document.createElement("option");option.value=row.Id;option.textContent=row.Name;selector.append(option);}
      }catch(e){this.shadowRoot.querySelector("#message").textContent=e.message;}
    }
    async load(){
      this.shadowRoot.querySelector("#message").textContent="Loading scoped expiry data…";
      const csrf=document.cookie.match(/(?:^|;\s*)BPMCSRF=([^;]*)/);
      if(!csrf){this.shadowRoot.querySelector("#message").textContent="Session expired. Sign in again.";return;}
      try{
        const response=await fetch(root()+"/ServiceModel/UsrMCITOperationalReadService.svc/PointExpiry",{
          method:"POST",credentials:"same-origin",
          headers:{"Content-Type":"application/json","BPMCSRF":decodeURIComponent(csrf[1]),"ForceUseSession":"true"},
          body:JSON.stringify({
            contractId:this.filters.contractId||"00000000-0000-0000-0000-000000000000",
            page:this.page,pageSize:this.size,status:this.filters.status,
            fromDate:this.filters.fromDate||null,toDate:this.filters.toDate||null,
            search:this.filters.search,sort:this.shadowRoot.querySelector("#sort").value
          })
        });
        if(!response.ok)throw Error("Access denied or data unavailable (HTTP "+response.status+").");
        const json=await response.json(), data=json.PointExpiryResult??json;
        if(!Array.isArray(data.Rows))throw Error("Expiry data is unavailable.");
        this.data=data;this.paint();
      }catch(e){this.shadowRoot.querySelector("#message").textContent=e.message||"Expiry data could not be loaded.";}
    }
    render(){
      this.shadowRoot.innerHTML=`<style>
        :host{display:block;font-family:Rubik,Arial,sans-serif;color:#35135d;background:#f8f7fc;padding:24px}
        h1{font-size:24px;margin:0 0 6px}p{margin:0 0 20px;color:#646074}
        .bar,.cards{display:flex;flex-wrap:wrap;gap:12px;margin:16px 0}
        input,select,button{font:inherit;border:1px solid #e2e6ef;border-radius:8px;padding:9px;background:white;color:#35135d}
        button{cursor:pointer;color:#5b21a5;font-weight:600}
        input[aria-label="Search"]{min-width:190px}
        .card{flex:1;min-width:180px;background:white;border:1px solid #e2e6ef;border-radius:12px;padding:16px}
        .card strong{display:block;font-size:24px;margin-top:8px}
        .table{overflow:auto;background:white;border:1px solid #e2e6ef;border-radius:12px}
        table{width:100%;border-collapse:collapse;min-width:1100px}th,td{padding:12px;text-align:left;border-bottom:1px solid #e2e6ef}
        th{font-weight:600;background:#f8f7fc}.record{border:0;background:transparent;color:#5b21a5;text-decoration:underline;padding:0;text-align:left}td{font-size:13px}.pager{display:flex;gap:12px;align-items:center;margin-top:16px}
        #message{min-height:24px;color:#5b21a5}
      </style><h1>Point Expiry</h1><p>Read-only restored points and expiry history</p>
      <div class="bar">
        <select id="contract" aria-label="Contract"><option value="">All authorized contracts</option></select>
        <select id="status" aria-label="Expiry status"><option value="">All statuses</option><option>Pending expiration</option><option>Partially consumed</option><option>Fully consumed</option><option>Overdue</option><option>Expired</option></select>
        <input id="from" type="date" aria-label="Expiration from" />
        <input id="to" type="date" aria-label="Expiration to" />
        <input id="search" aria-label="Search" placeholder="Contract, VM, restoration reference" />
        <select id="sort" aria-label="Sort rows"><option value="expiration">Expiration date</option><option value="remaining">Remaining points</option><option value="restoration">Restoration date</option></select><button id="apply">Apply filters</button><button id="refresh">Refresh</button>
      </div><div class="cards" id="cards"></div><div id="message" role="status"></div>
      <div class="table"><table><thead><tr><th>Contract</th><th>VM</th><th>Restoration</th><th>Restoration date</th><th>Expiration date</th>
        <th>Original</th><th>Consumed</th><th>Expired</th><th>Remaining</th><th>Type</th><th>Status</th><th>Days left</th></tr></thead><tbody id="rows"></tbody></table></div>
      <div class="pager"><button id="previous">Previous</button><span id="position"></span><button id="next">Next</button></div>`;
      this.shadowRoot.querySelector("#apply").onclick=()=>{
        const q=id=>this.shadowRoot.querySelector(id).value.trim();
        this.filters={contractId:q("#contract"),status:q("#status"),fromDate:q("#from"),toDate:q("#to"),search:q("#search")};
        this.page=0;this.load();
      };
      this.shadowRoot.querySelector("#refresh").onclick=()=>this.load();
      this.shadowRoot.querySelector("#previous").onclick=()=>{if(this.page){this.page--;this.load();}};
      this.shadowRoot.querySelector("#next").onclick=()=>{if(this.data&&(this.page+1)*this.size<this.data.TotalCount){this.page++;this.load();}};
    }
    paint(){
      const d=this.data, num=v=>Number(v||0).toLocaleString(undefined,{maximumFractionDigits:2});
      this.shadowRoot.querySelector("#cards").innerHTML=[
        ["Remaining restored points",d.TotalRemaining],["Expiring within 30 days",d.Expiring30Days],["Expiring within 90 days",d.Expiring90Days]
      ].map(([label,value])=>`<div class="card">${safe(label)}<strong>${safe(num(value))}</strong></div>`).join("");
      this.shadowRoot.querySelector("#rows").innerHTML=d.Rows.map(r=>`<tr><td><button class="record" data-kind="contract" data-id="${safe(r.ContractId)}">${safe(r.ContractName||"Contract")}</button></td><td>${r.VirtualMachineName?`<button class="record" data-kind="vm" data-id="${safe(r.VirtualMachineId)}">${safe(r.VirtualMachineName)}</button>`:"—"}</td><td>${safe(r.RestorationReference)}</td>
        <td>${safe((r.RestorationDate||"").slice(0,10))}</td><td>${safe((r.ExpirationDate||"").slice(0,10))}</td>
        <td>${safe(num(r.OriginalQuantity))}</td><td>${safe(num(r.ConsumedQuantity))}</td><td>${safe(num(r.ExpiredQuantity))}</td>
        <td>${safe(num(r.RemainingQuantity))}</td><td>${safe(r.RestorationType)}</td><td>${safe(r.Status)}</td><td>${safe(r.DaysRemaining)}</td></tr>`).join("")||
        '<tr><td colspan="12">No authorized restoration rows match these filters.</td></tr>';
      this.shadowRoot.querySelector("#rows").querySelectorAll("button.record").forEach(button=>{
        button.onclick=()=>sdk.HandlerChainService.instance.process({
          type:"crt.OpenPageRequest",
          schemaName:button.dataset.kind==="contract"?"UsrPage_1fdg3ul":"UsrVMInventory_FormPage",
          modelInitConfigs:[{action:"edit",recordId:button.dataset.id}],
          $context:PointExpiry.pageContext
        });
      });
      this.shadowRoot.querySelector("#position").textContent=`${this.page*this.size+1}–${Math.min((this.page+1)*this.size,d.TotalCount)} of ${d.TotalCount}`;
      this.shadowRoot.querySelector("#message").textContent="";
    }
  }
  if(!customElements.get(TAG)){customElements.define(TAG,PointExpiry);sdk.registerViewElement({type:TYPE,selector:TAG});}
  return { type: TYPE, setContext: context => { PointExpiry.pageContext = context; } };
});