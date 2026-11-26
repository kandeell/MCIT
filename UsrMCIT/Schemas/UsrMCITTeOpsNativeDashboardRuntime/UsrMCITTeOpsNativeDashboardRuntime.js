define("UsrMCITTeOpsNativeDashboardRuntime", [], function() {
    "use strict";
    const EMPTY_GUID = "00000000-0000-0000-0000-000000000000";
    const METRICS = [["AwaitingReview","Awaiting Review"],["FinancialQueue","Financial Queue"],["TechnicalQueue","Technical Queue"],["AwaitingMCIT","Awaiting MCIT"],["ApproachingSLA","Approaching SLA"],["Overdue","Overdue"],["ProvisioningQueue","Provisioning Queue"],["FailedProvisions","Failed Provisions"],["CompletedToday","Completed Today"]];
    const STAGES = [["FinancialQueue","Financial Review"],["TechnicalQueue","Technical Review"],["ProvisioningQueue","Provisioning"],["AwaitingMCIT","Awaiting MCIT"]];
    const SLA = [["SLAOnTime","On Time"],["ApproachingSLA","Approaching"],["Overdue","Overdue"]];
    const ALL = {Id:EMPTY_GUID,Name:"All authorized contracts"};
    const states = new WeakMap();
    const count = v => Number.isSafeInteger(v) && v >= 0;
    const guid = v => typeof v === "string" && /^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i.test(v);
    function state(c) {
        if (!states.has(c)) states.set(c,{busy:false,contracts:[ALL],index:0,snapshot:null});
        return states.get(c);
    }
    async function call(method, body) {
        const root = location.pathname.split(/\/0(?:\/|$)/)[0].replace(/\/$/, "") + "/0";
        const csrf = document.cookie.match(/(?:^|;\s*)BPMCSRF=([^;]*)/);
        if (!csrf) throw Error("Session token unavailable");
        const response = await fetch(root+"/rest/UsrMCITOperationalReadService/"+method, {method:"POST",credentials:"same-origin",cache:"no-store",headers:{"Content-Type":"application/json","BPMCSRF":decodeURIComponent(csrf[1]),"ForceUseSession":"true"},body:JSON.stringify(body)});
        if (!response.ok) throw Error(method+" HTTP "+response.status);
        const json=await response.json();
        if (!json || json.Success===false || json.success===false || json.ErrorInfo || json.errorInfo || json[method+"Result"]==null) throw Error("Invalid "+method+" response");
        return json[method+"Result"];
    }
    function clear(c,s) {
        s.snapshot=null;
        METRICS.forEach(([k])=>c["TeOps"+k]="—");
        c.TeOpsStageSeries=[[]]; c.TeOpsSlaSeries=[[]];
        c.TeOpsStageChartVisible=false; c.TeOpsSlaChartVisible=false;
        c.TeOpsStageText="Stage data unavailable."; c.TeOpsSlaText="SLA data unavailable.";
        c.TeOpsCanExport=false;
    }
    // Candidate direct native ChartWidget input: do not bind a broader entity data source.
    // Hide empty/incomplete charts and display their exact authorized text values instead.
    function series(pairs, data) {
        return pairs.every(([k])=>count(data[k])) && pairs.some(([k])=>data[k]>0)
            ? [pairs.map(([k,label])=>({grouping:{value:k,displayValue:label},aggregation:{value:data[k]}}))] : [[]];
    }
    function summary(pairs,data) {return pairs.map(([k,label])=>label+": "+(count(data[k])?data[k]:"Unavailable")).join(" · ");}
    async function refresh(c, reloadContracts=true) {
        const s=state(c); if(s.busy)return; s.busy=true; clear(c,s);
        c.TeOpsNoticeText="Loading authorized dashboard metrics…";
        try {
            if(reloadContracts){
                const previous=s.contracts[s.index].Id.toLowerCase();
                s.contracts=[ALL];s.index=0;c.TeOpsContractName=ALL.Name;
                const rows=await call("DashboardContracts",{});
                if(!Array.isArray(rows)||rows.some(r=>!r||!guid(r.Id)||typeof r.Name!=="string"))throw Error("Invalid contract list");
                const seen=new Set([EMPTY_GUID]);
                for(const r of rows){const id=r.Id.toLowerCase();if(!seen.has(id)){seen.add(id);s.contracts.push(r);}}
                s.index=Math.max(0,s.contracts.findIndex(r=>r.Id.toLowerCase()===previous));
            }
            const selected=s.contracts[s.index]; c.TeOpsContractName=selected.Name;
            const data=await call("Dashboard",{contractId:selected.Id});
            if(!count(data.TotalRequests)||!count(data.TotalContracts))throw Error("Invalid dashboard counts");
            if(data.TotalContracts===0){
                c.TeOpsNoticeText="No authorized contracts returned. Verify the current user's contract scope.";
                c.TeOpsStageText="No authorized contract data.";c.TeOpsSlaText="No authorized contract data.";
                return;
            }
            const values={}; let available=0;
            METRICS.forEach(([k])=>{values[k]=count(data[k])?data[k]:null; if(values[k]!==null)available++; c["TeOps"+k]=values[k]===null?"—":String(values[k]);});
            if(!available)throw Error("No metrics available");
            c.TeOpsStageSeries=series(STAGES,data); c.TeOpsSlaSeries=series(SLA,data);
            c.TeOpsStageChartVisible=STAGES.every(([k])=>count(data[k]))&&STAGES.some(([k])=>data[k]>0);
            c.TeOpsSlaChartVisible=SLA.every(([k])=>count(data[k]))&&SLA.some(([k])=>data[k]>0);
            c.TeOpsStageText=summary(STAGES,data)+(STAGES.every(([k])=>data[k]===0)?". No active work in these stages.":". Review stages can overlap.");
            const noSla=SLA.every(([k])=>data[k]===0);
            c.TeOpsSlaText=summary(SLA,data)+(noSla?". No monitored open approval deadlines.":" · On-time share: "+(typeof data.SLACompliancePercent==="number"?data.SLACompliancePercent+"%":"Unavailable"))+" (active approval deadline health, not historical compliance).";
            s.snapshot={values,contract:selected.Name,timestamp:new Date().toISOString(),slaOnTime:count(data.SLAOnTime)?data.SLAOnTime:null,canExport:data.CanExport===true};
            c.TeOpsCanExport=s.snapshot.canExport;
            let notice=values.Overdue===null?"SLA overdue count unavailable.":values.Overdue+" overdue request(s) in the monitored approval scope.";
            if(!count(data.SLAWarningHours)||data.SLAWarningHours===0)notice+=" SLA warning threshold is not configured.";
            if(count(data.SLAMissingDeadlines)&&data.SLAMissingDeadlines>0)notice+=" "+data.SLAMissingDeadlines+" under-review request(s) lack a complete deadline.";
            if(available<METRICS.length)notice+=" Some metrics are unavailable; check configuration and record visibility.";
            c.TeOpsNoticeText=notice;
        } catch(e){clear(c,s);console.error("MCIT dashboard read failed:",e);c.TeOpsNoticeText="Dashboard data unavailable. Check authorization and service connectivity.";} finally{s.busy=false;}
    }
    async function init(c){await refresh(c,true);}
    async function select(c,request){const s=state(c);if(s.busy)return;const step=request.step??request.params?.step;const all=request.all??request.params?.all;if(all===true)s.index=0;else if(step===1||step===-1)s.index=(s.index+step+s.contracts.length)%s.contracts.length;await refresh(c,false);}
    function download(rows,name){const quote=v=>{let t=String(v??"");if(/^[\s]*[=+\-@]/.test(t))t="'"+t;return '"'+t.replace(/"/g,'""')+'"';};const csv="\uFEFF"+rows.map(r=>r.map(quote).join(",")).join("\r\n");const url=URL.createObjectURL(new Blob([csv],{type:"text/csv;charset=utf-8"}));const link=document.createElement("a");link.href=url;link.download=name;document.body.appendChild(link);try{link.click();}finally{link.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);}}
    async function exportReport(c){
        const s=state(c);if(s.busy||!s.snapshot){c.TeOpsNoticeText="Refresh the dashboard before exporting.";return;}
        // Recheck the existing server-owned screen grant on each explicit export.
        const selectedId=s.contracts[s.index].Id.toLowerCase();
        await refresh(c,true);
        if(s.contracts[s.index].Id.toLowerCase()!==selectedId){c.TeOpsNoticeText="Selected contract changed. Review the refreshed dashboard before exporting.";return;}
        if(s.busy||!s.snapshot||!s.snapshot.canExport){c.TeOpsNoticeText="Export unavailable or not permitted for this screen.";return;}
        const d=s.snapshot;const rows=[["Metric","Value","Contract","Read at (UTC)"]];METRICS.forEach(([k,l])=>rows.push([l,d.values[k]??"Unavailable",d.contract,d.timestamp]));rows.push(["SLA on time",d.slaOnTime??"Unavailable",d.contract,d.timestamp]);download(rows,"TE-OPS-Dashboard-"+d.timestamp.slice(0,10)+".csv");
    }
    return {init,refresh,select,exportReport};
});
