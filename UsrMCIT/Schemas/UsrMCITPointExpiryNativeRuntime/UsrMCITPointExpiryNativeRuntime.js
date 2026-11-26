define("UsrMCITPointExpiryNativeRuntime", ["@creatio-devkit/common"], function(sdk) {
    "use strict";
    const EMPTY="00000000-0000-0000-0000-000000000000", SIZE=25;
    const FIELDS=["Contract","VM","Reference","Restored","Expires","Original","Consumed","Expired","Remaining","Type","Status","Days"];
    const KPI=["TotalRemaining","Expiring30Days","Expiring90Days"];
    const STATUSES=["Pending expiration","Partially consumed","Fully consumed","Overdue","Expired"];
    const SORTS=["expiration","remaining","restoration"];
    const SORT_LABELS=Object.freeze({expiration:"Expiration date",remaining:"Remaining points",restoration:"Restoration date"});
    const states=new WeakMap();
    const guid=v=>typeof v==="string"&&/^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i.test(v);
    const count=v=>Number.isSafeInteger(v)&&v>=0;
    const amount=v=>typeof v==="number"&&Number.isFinite(v)&&v>=0;
    const format=v=>new Intl.NumberFormat(undefined,{maximumFractionDigits:8}).format(v);
    const blank=()=>({status:"",fromDate:null,toDate:null,search:"",sort:"expiration"});
    function state(c){
        if(!states.has(c))states.set(c,{busy:false,disposed:false,contracts:null,page:0,total:0,filters:blank(),rows:null,ready:false,dirty:false,timer:null});
        return states.get(c);
    }
    async function call(method,body){
        const root=location.pathname.split(/\/0(?:\/|$)/)[0].replace(/\/$/,"")+"/0";
        const csrf=document.cookie.match(/(?:^|;\s*)BPMCSRF=([^;]*)/);
        if(!csrf)throw Error("Session token unavailable");
        const response=await fetch(root+"/rest/UsrMCITOperationalReadService/"+method,{
            method:"POST",credentials:"same-origin",cache:"no-store",
            headers:{"Content-Type":"application/json","BPMCSRF":decodeURIComponent(csrf[1]),"ForceUseSession":"true"},body:JSON.stringify(body)
        });
        if(!response.ok)throw Error(method+" HTTP "+response.status);
        const json=await response.json();
        if(!json||json.Success===false||json.success===false||json.ErrorInfo||json.errorInfo||json[method+"Result"]==null)throw Error("Invalid "+method+" response");
        return json[method+"Result"];
    }
    function clear(c,s){
        s.rows=null;s.total=0;
        KPI.forEach(k=>c["Expiry"+k]="—");
        for(let i=0;i<SIZE;i++){
            c["ExpiryRecord"+i+"Visible"]=false;
            FIELDS.forEach(k=>c["ExpiryRow"+i+k]="");
        }
        c.ExpiryPageText="No data loaded";c.ExpiryHasPrevious=false;c.ExpiryHasNext=false;
    }
    function dateText(v){
        if(!v)return "—";
        const m=String(v).match(/^\/Date\((-?\d+)(?:[+-]\d{4})?\)\/$/);
        const d=m?new Date(Number(m[1])):new Date(v);
        return Number.isFinite(d.getTime())&&d.getUTCFullYear()>1900?d.toISOString().slice(0,10):"—";
    }
    function toRow(r){
        if(!r||!guid(r.Id)||!guid(r.ContractId)||![r.OriginalQuantity,r.ConsumedQuantity,r.ExpiredQuantity,r.RemainingQuantity].every(amount)||!Number.isSafeInteger(r.DaysRemaining))throw Error("Invalid restoration row");
        return {contractId:r.ContractId,vmId:guid(r.VirtualMachineId)?r.VirtualMachineId:EMPTY,Contract:String(r.ContractName||"Contract"),VM:String(r.VirtualMachineName||"—"),Reference:String(r.RestorationReference||r.Id),Restored:dateText(r.RestorationDate),Expires:dateText(r.ExpirationDate),Original:format(r.OriginalQuantity),Consumed:format(r.ConsumedQuantity),Expired:format(r.ExpiredQuantity),Remaining:format(r.RemainingQuantity),Type:String(r.RestorationType||"—"),Status:String(r.Status||"—"),Days:String(r.DaysRemaining)};
    }
    async function loadContracts(c,s){
        const list=await call("Contracts",{});
        if(!Array.isArray(list)||list.some(r=>!r||!guid(r.Id)||typeof r.Name!=="string"))throw Error("Invalid authorized contract list");
        if(s.disposed)return;
        const unique=new Map();
        list.forEach(row=>{if(row.Id.toLowerCase()!==EMPTY)unique.set(row.Id.toLowerCase(),row);});
        s.contracts=[...unique.values()];
    }
    async function load(c,s){
        if(s.disposed)return;
        clear(c,s);c.ExpiryNoticeText="Loading authorized ledger…";
        if(s.contracts.length===0){c.ExpiryNoticeText="No authorized contracts. Verify your contract scope.";return;}
        const body={contractId:EMPTY,page:s.page,pageSize:SIZE,...s.filters};
        let data=await call("ReadPointExpiry",body);
        if(!count(data.TotalCount))throw Error("Invalid restoration count");
        if(s.page>0&&s.page*SIZE>=data.TotalCount){s.page=Math.max(0,Math.ceil(data.TotalCount/SIZE)-1);data=await call("ReadPointExpiry",{...body,page:s.page});}
        if(s.disposed)return;
        if(!count(data.TotalCount)||!Array.isArray(data.Rows)||data.Rows.length>SIZE||!KPI.every(k=>amount(data[k]))||data.Expiring30Days>data.Expiring90Days||data.Expiring90Days>data.TotalRemaining)throw Error("Invalid ledger response");
        if(data.Rows.length!==Math.min(SIZE,Math.max(0,data.TotalCount-s.page*SIZE)))throw Error("Incomplete restoration page");
        const rows=data.Rows.map(toRow);
        const visible=new Set(s.contracts.map(x=>x.Id.toLowerCase()));
        if(rows.some(r=>!visible.has(r.contractId.toLowerCase())))throw Error("Unexpected contract in ledger response");
        KPI.forEach(k=>c["Expiry"+k]=format(data[k]));
        rows.forEach((r,i)=>{FIELDS.forEach(k=>c["ExpiryRow"+i+k]=r[k]);c["ExpiryRecord"+i+"Visible"]=true;});
        s.rows=rows;s.total=data.TotalCount;
        c.ExpiryPageText=data.TotalCount?`${s.page*SIZE+1}–${s.page*SIZE+rows.length} of ${data.TotalCount}`:"0 records";
        c.ExpiryHasPrevious=s.page>0;
        c.ExpiryHasNext=(s.page+1)*SIZE<s.total;
        c.ExpiryNoticeText=(rows.length?"Showing all authorized contracts.":"No matching authorized restoration rows.")+" The 90-day total includes the 30-day total. Filters affect the table only.";
    }
    async function run(c,action){
        const s=state(c);if(s.busy||s.disposed)return;s.busy=true;
        try{await action(s);}catch(e){if(!s.disposed){clear(c,s);console.error("MCIT Point Expiry:",e);c.ExpiryNoticeText="Point expiry unavailable. Check service connectivity and complete ledger visibility.";}}finally{s.busy=false;if(s.dirty&&!s.disposed)schedule(c,s);}
    }
    async function init(c){const s=state(c);c.ExpirySortCaption=SORT_LABELS.expiration;c.ExpiryStatusCaption="All statuses";try{return await refresh(c);}finally{s.ready=true;if(s.dirty&&!s.disposed)schedule(c,s);}}
    async function refresh(c){return run(c,async s=>{clear(c,s);c.ExpiryNoticeText="Loading authorized contracts…";await loadContracts(c,s);if(!s.disposed)await load(c,s);});}
    function arg(r,k){return r[k]??r.params?.[k];}
    const filterAttributes=new Set(["ExpirySearch","ExpiryStatus","ExpiryFrom","ExpiryTo","ExpirySort"]);
    function schedule(c,s){
        if(s.timer!==null)clearTimeout(s.timer);
        s.timer=setTimeout(async()=>{
            s.timer=null;
            if(s.disposed||!s.ready||s.busy)return;
            s.dirty=false;
            await apply(c);
        },450);
    }
    function attributeChanged(c,name){
        if(!filterAttributes.has(name))return;
        const s=state(c);
        if(s.disposed)return;
        s.dirty=true;if(s.ready)schedule(c,s);
    }
    // Calendar values are local civil dates, not UTC instants. Never
    // use toISOString().slice(0,10) on a local-midnight Date object.
    function dateInput(v){
        if(v==null||v==="")return null;
        if(typeof v==="object"&&typeof v.getTime!=="function"&&"value" in v)v=v.value;
        if(v==null||v==="")return null;
        const pad=n=>String(n).padStart(2,"0");
        let text;
        if(typeof v==="string"&&/^\d{4}-\d{2}-\d{2}$/.test(v.trim()))text=v.trim();
        else {
            const d=typeof v.getTime==="function"?v:new Date(v);
            if(!Number.isFinite(d.getTime()))throw Error("Select a valid calendar date.");
            text=String(d.getFullYear()).padStart(4,"0")+"-"+pad(d.getMonth()+1)+"-"+pad(d.getDate());
        }
        const d=new Date(text+"T00:00:00Z");
        if(!Number.isFinite(d.getTime())||d.toISOString().slice(0,10)!==text)throw Error("Select a valid calendar date.");
        return text;
    }
    async function apply(c){
        const s=state(c);if(s.busy||s.disposed)return;
        let filters;
        try{
            const read=async k=>String((await c["Expiry"+k])??"").trim();
            const search=await read("Search"),statusText=await read("Status"),sort=(await read("Sort")||"expiration").toLowerCase();
            const fromDate=dateInput(await c.ExpiryFrom),toDate=dateInput(await c.ExpiryTo);
            const status=statusText?STATUSES.find(x=>x.toLowerCase()===statusText.toLowerCase()):"";
            if(status===undefined)throw Error("Status: blank or "+STATUSES.join(", ")+".");
            if(!SORTS.includes(sort))throw Error("Sort: expiration, restoration or remaining.");
            if(search.length>100)throw Error("Search must be at most 100 characters.");
            if(fromDate&&toDate&&fromDate>toDate)throw Error("From date must not be later than To date.");
            filters={search,status,sort,fromDate,toDate};
        }catch(e){c.ExpiryNoticeText=e.message+" Showing the last applied results, if available.";return;}
        return run(c,async s=>{s.filters=filters;s.page=0;await loadContracts(c,s);if(!s.disposed)await load(c,s);});
    }
    // Menu selections use the same validated backend sort keys as before.
    function selectSort(c,r){
        const sort=arg(r,"sort");
        if(!SORTS.includes(sort)||state(c).disposed)return;
        c.ExpirySort=sort;
        c.ExpirySortCaption=SORT_LABELS[sort];
        attributeChanged(c,"ExpirySort");
    }
    // Select only an existing server-supported status or the all-statuses option.
    function selectStatus(c,r){
        const status=arg(r,"status");
        if((status!==""&&!STATUSES.includes(status))||state(c).disposed)return;
        c.ExpiryStatus=status;
        c.ExpiryStatusCaption=status||"All statuses";
        attributeChanged(c,"ExpiryStatus");
    }
    async function page(c,r){const s=state(c),step=arg(r,"step");if(s.busy||!s.rows||(step!==1&&step!==-1))return;const p=s.page+step;if(p<0||p*SIZE>=s.total)return;return run(c,async s=>{s.page=p;await load(c,s);});}
    async function openRecord(c,r){
        const s=state(c),i=arg(r,"index"),kind=arg(r,"kind");
        if(s.busy||s.disposed||!s.rows||!Number.isInteger(i)||i<0||i>=s.rows.length)return;
        const row=s.rows[i];
        const id=kind==="Contract"?row.contractId:kind==="VM"&&row.VM!=="—"?row.vmId:null;
        if(!guid(id)||id.toLowerCase()===EMPTY)return;
        try{await sdk.HandlerChainService.instance.process({type:"crt.OpenPageRequest",schemaName:kind==="Contract"?"UsrPage_1fdg3ul":"UsrVMInventory_FormPage",modelInitConfigs:[{action:"edit",recordId:id}],$context:c});}catch(e){console.error("MCIT navigation:",e);c.ExpiryNoticeText="Record could not be opened. Check native record permissions.";}
    }
    function dispose(c){const s=states.get(c);if(s){s.disposed=true;s.rows=null;s.contracts=null;if(s.timer!==null)clearTimeout(s.timer);}}
    return {init,refresh,attributeChanged,apply,selectSort,selectStatus,page,openRecord,dispose};
});
