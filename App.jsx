import { useState, useEffect, useCallback } from "react";

const uid = () => Math.random().toString(36).slice(2,8)+Date.now().toString(36).slice(-3);
const todayStr = () => new Date().toISOString().slice(0,10);
const fmtDate = d => { if(!d) return "—"; try{const[y,m,dd]=d.split("-");return`${dd}/${m}/${y.slice(2)}`;}catch{return d;}};
const fmtKD = n => new Intl.NumberFormat("en-KW",{minimumFractionDigits:3}).format(n||0)+" KD";
const fmtPct = n => (n||0).toFixed(1)+"%";
const MONTHS=["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"];
const DAY_AR=["الأحد","الاثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"];
const getWeek=()=>{const d=new Date(),s=new Date(d);s.setDate(d.getDate()-d.getDay());return Array.from({length:7},(_,i)=>{const x=new Date(s);x.setDate(s.getDate()+i);return x.toISOString().slice(0,10);});};
function useIsMobile(){const[is,set]=useState(()=>window.innerWidth<768);useEffect(()=>{const h=()=>set(window.innerWidth<768);window.addEventListener("resize",h);return()=>window.removeEventListener("resize",h);},[]);return is;}

const SEED_COS=[
  {id:"c1",name:"Wadha Al-Sanad",desc:"البراند الشخصي — المظلة الرئيسية",active:true},
  {id:"c2",name:"The Stylist",desc:"خدمات الستايل والتوجيه الإبداعي",active:true},
  {id:"c3",name:"Curated Labels",desc:"ماركت بليس العباءات الخليجية",active:true},
  {id:"c4",name:"Abaya Talk",desc:"بودكاست Let's Talk Abaya",active:true},
  {id:"c5",name:"Abaya Pop Up",desc:"معارض وفعاليات العباءات",active:true},
  {id:"c6",name:"Styling the Brands",desc:"استشارات براند الشركات",active:true},
  {id:"c7",name:"Beyond Pattern",desc:"بودكاست",active:true},
  {id:"c8",name:"Atelier OS",desc:"SaaS للمصممين الخليجيين",active:true},
  {id:"c9",name:"Consulting Room",desc:"استشارات تطوير الأعمال",active:true},
];

const T={b:"1px solid #eaeaea",bg:"#fff",bg2:"#f9f9f9",bg3:"#f3f3f3",tx:"#111",tx2:"#555",tx3:"#999",serif:"Georgia,serif",sans:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"};
const inp={height:40,border:"1px solid #e0e0e0",borderRadius:8,padding:"0 12px",fontSize:14,background:"#fff",fontFamily:T.sans,outline:"none",color:T.tx,boxSizing:"border-box",width:"100%"};
const inpSm={...inp,height:32,fontSize:12,borderRadius:6};
const inpTxt={...inp,height:72,padding:"10px 12px",resize:"vertical"};
const sel={...inp,cursor:"pointer"};
const selSm={...inpSm,cursor:"pointer"};
const btn={height:40,border:"1px solid #d8d8d8",borderRadius:8,padding:"0 16px",fontSize:13,background:"#fff",fontFamily:T.sans,cursor:"pointer",color:T.tx,display:"inline-flex",alignItems:"center",gap:6,whiteSpace:"nowrap"};
const btnPrim={...btn,background:"#111",color:"#fff",border:"none"};
const btnSm={...btn,height:30,padding:"0 12px",fontSize:11,borderRadius:6};
const btnPrimSm={...btnSm,background:"#111",color:"#fff",border:"none"};
const TH={fontSize:10,color:T.tx3,padding:"9px 14px",textAlign:"right",fontWeight:700,letterSpacing:.5,borderBottom:"1px solid #eaeaea",background:T.bg2,whiteSpace:"nowrap"};
const TD={fontSize:13,padding:"11px 14px",borderBottom:"1px solid #f5f5f5",verticalAlign:"middle",color:T.tx};
const TDm={...TD,color:T.tx2};

const BDEFS={active:{bg:"#ecfdf5",c:"#065f46"},inactive:{bg:"#f5f5f5",c:"#6b7280"},done:{bg:"#ecfdf5",c:"#065f46"},"in-progress":{bg:"#eff6ff",c:"#1d4ed8"},todo:{bg:"#f9fafb",c:"#6b7280"},blocked:{bg:"#fef2f2",c:"#991b1b"},high:{bg:"#fef2f2",c:"#991b1b"},medium:{bg:"#fffbeb",c:"#92400e"},low:{bg:"#f0fdf4",c:"#166534"},income:{bg:"#ecfdf5",c:"#065f46"},expense:{bg:"#fef2f2",c:"#991b1b"},idea:{bg:"#fdf4ff",c:"#7e22ce"},draft:{bg:"#f9fafb",c:"#6b7280"},ready:{bg:"#eff6ff",c:"#1d4ed8"},posted:{bg:"#ecfdf5",c:"#065f46"},confirmed:{bg:"#ecfdf5",c:"#065f46"},upcoming:{bg:"#eff6ff",c:"#1d4ed8"},completed:{bg:"#ecfdf5",c:"#065f46"},cancelled:{bg:"#fef2f2",c:"#991b1b"},pending:{bg:"#f5f5f5",c:"#6b7280"},client:{bg:"#fdf4ff",c:"#7e22ce"},customer:{bg:"#eff6ff",c:"#1d4ed8"},influencer:{bg:"#fff7ed",c:"#c2410c"},collaboration:{bg:"#fdf2f8",c:"#9d174d"},photographer:{bg:"#f0fdf4",c:"#166534"},other:{bg:"#f5f5f5",c:"#6b7280"},event:{bg:"#eff6ff",c:"#1d4ed8"},launch:{bg:"#fdf4ff",c:"#7e22ce"},campaign:{bg:"#fff7ed",c:"#c2410c"},pr:{bg:"#f0fdf4",c:"#166534"},meeting:{bg:"#eff6ff",c:"#1d4ed8"},call:{bg:"#f0fdf4",c:"#166534"},appointment:{bg:"#fdf4ff",c:"#7e22ce"},new:{bg:"#fdf4ff",c:"#7e22ce"},exploring:{bg:"#fff7ed",c:"#c2410c"},planned:{bg:"#eff6ff",c:"#1d4ed8"},validation:{bg:"#fdf4ff",c:"#7e22ce"},active:{bg:"#ecfdf5",c:"#065f46"},planning:{bg:"#eff6ff",c:"#1d4ed8"},development:{bg:"#fff7ed",c:"#c2410c"},};
const Badge=({v,label,style})=>{const b=BDEFS[v]||{bg:"#f5f5f5",c:"#6b7280"};return <span style={{display:"inline-block",fontSize:10,padding:"2px 8px",borderRadius:20,background:b.bg,color:b.c,fontWeight:700,whiteSpace:"nowrap",...style}}>{label||v}</span>;};

const Field=({label,children,full})=><div style={{display:"flex",flexDirection:"column",gap:4,gridColumn:full?"1/-1":undefined}}><span style={{fontSize:11,color:T.tx3,fontWeight:700,letterSpacing:.4}}>{label}</span>{children}</div>;
const Empty=({msg="لا بيانات — أضف أول إدخال"})=><div style={{textAlign:"center",padding:"32px 16px",color:T.tx3,fontSize:13}}>{msg}</div>;
const ViewHeader=({title,sub,action,onBack})=>(<div style={{padding:"16px 20px 12px",borderBottom:T.b,display:"flex",alignItems:"center",gap:10,flexShrink:0}}>{onBack&&<button onClick={onBack} style={{...btnSm,paddingRight:10}}>←</button>}<div style={{flex:1,minWidth:0}}><h1 style={{fontSize:18,fontFamily:T.serif,fontStyle:"italic",fontWeight:700,margin:0,color:T.tx,letterSpacing:"-.5px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{title}</h1>{sub&&<p style={{fontSize:11,color:T.tx3,margin:"2px 0 0"}}>{sub}</p>}</div>{action&&<div style={{flexShrink:0,display:"flex",gap:6}}>{action}</div>}</div>);
const SCard=({title,count,children,accent})=>(<div style={{border:accent||T.b,borderRadius:10,overflow:"hidden"}}><div style={{padding:"10px 14px",borderBottom:T.b,display:"flex",justifyContent:"space-between",alignItems:"center",background:T.bg2}}><span style={{fontSize:12,fontWeight:700}}>{title}</span>{count!==undefined&&<span style={{fontSize:10,color:T.tx3,background:"#e8e8e8",borderRadius:20,padding:"1px 8px"}}>{count}</span>}</div>{children}</div>);
const MRow=({children,onClick})=><div onClick={onClick} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 14px",borderBottom:"1px solid #f8f8f8",fontSize:13,cursor:onClick?"pointer":"default"}} onMouseEnter={e=>{if(onClick)e.currentTarget.style.background="#f9f9f9"}} onMouseLeave={e=>e.currentTarget.style.background=""}>{children}</div>;
const Tabs=({tabs,active,onChange})=><div style={{display:"flex",background:"#f0f0f0",borderRadius:8,padding:2,gap:2,flexWrap:"wrap"}}>{tabs.map(([v,l])=><button key={v} onClick={()=>onChange(v)} style={{padding:"6px 12px",border:"none",borderRadius:6,cursor:"pointer",fontSize:11,fontFamily:T.sans,background:active===v?"#fff":"transparent",color:active===v?T.tx:T.tx3,fontWeight:active===v?700:400,boxShadow:active===v?"0 1px 3px rgba(0,0,0,.08)":"none"}}>{l}</button>)}</div>;
const Grid2=({children,gap=12,style})=><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:gap,...(style||{})}}>{children}</div>;
const Stat=({label,val,color,sub})=><div style={{background:T.bg2,border:T.b,borderRadius:10,padding:"14px 16px"}}><div style={{fontSize:10,color:T.tx3,fontWeight:700,letterSpacing:.4,marginBottom:6}}>{label}</div><div style={{fontSize:22,fontWeight:700,fontFamily:T.serif,color:color||T.tx,letterSpacing:"-1px"}}>{val}</div>{sub&&<div style={{fontSize:10,color:T.tx3,marginTop:4}}>{sub}</div>}</div>;

const Modal=({title,onClose,onSave,children,isMobile,wide})=>(<div style={{position:"absolute",inset:0,background:"rgba(0,0,0,.22)",display:"flex",alignItems:isMobile?"flex-end":"center",justifyContent:"center",zIndex:200}}><div style={{background:"#fff",borderRadius:isMobile?"16px 16px 0 0":12,padding:20,width:isMobile?"100%":wide?560:460,maxHeight:isMobile?"90vh":"85vh",overflowY:"auto",border:T.b,boxShadow:"0 8px 40px rgba(0,0,0,.14)"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}><div style={{fontSize:16,fontFamily:T.serif,fontStyle:"italic",fontWeight:700}}>{title}</div><button onClick={onClose} style={{height:30,width:30,border:"none",background:T.bg2,borderRadius:"50%",cursor:"pointer",fontSize:18}}>×</button></div><div style={{display:"flex",flexDirection:"column",gap:14}}>{children}</div><div style={{display:"flex",gap:8,justifyContent:"flex-end",marginTop:20,paddingTop:16,borderTop:T.b}}><button onClick={onClose} style={btn}>إلغاء</button><button onClick={onSave} style={btnPrim}>حفظ</button></div></div></div>);

function useDB(key,seed=[]){const[data,raw]=useState(null);useEffect(()=>{(async()=>{try{const r=await window.storage.get(key);raw(r?JSON.parse(r.value):seed);}catch(e){raw(seed);}})();},[]);const set=useCallback(fn=>{raw(prev=>{const v=typeof fn==="function"?fn(prev):fn;window.storage.set(key,JSON.stringify(v)).catch(()=>{});return v;});},[key]);return[data,set];}

// ════════════════════════════════════════════════════
// DASHBOARD
// ════════════════════════════════════════════════════
function DashView({shared,onQuickAction}){
  const{db,coName,setView,setCoDetail,cos}=shared;
  const{tasks,projects,marketing,finance,cal,crm,ideas}=db;
  const today=todayStr(),week=getWeek(),thisMo=today.slice(0,7);
  const inc=finance.filter(f=>f.type==="income"&&f.date?.startsWith(thisMo)).reduce((s,f)=>s+f.amount,0);
  const todayTasks=tasks.filter(t=>t.dueDate===today&&!t.done&&!t.parentId);
  const todayCal=[...cal].filter(e=>e.date===today).sort((a,b)=>a.time>b.time?1:-1);
  const latestIdeas=[...ideas].sort((a,b)=>b.date>a.date?1:-1).slice(0,3);
  const urgent=tasks.filter(t=>!t.done&&t.priority==="high"&&!t.parentId).slice(0,4);
  const QUICK=[{l:"مهمة",icon:"✓",fn:()=>onQuickAction("task")},{l:"مشروع",icon:"◫",fn:()=>onQuickAction("project")},{l:"عميل",icon:"◐",fn:()=>onQuickAction("crm")},{l:"فكرة 💡",icon:"",fn:()=>onQuickAction("idea")},{l:"محتوى",icon:"◎",fn:()=>onQuickAction("content")},{l:"موعد",icon:"📅",fn:()=>onQuickAction("cal")},{l:"إيراد",icon:"＋",fn:()=>onQuickAction("income")},{l:"مصروف",icon:"−",fn:()=>onQuickAction("expense")},{l:"BOM",icon:"📦",fn:()=>setView("bom")},{l:"خطة الأعمال",icon:"📋",fn:()=>setView("bizplan")},];
  return(<div style={{display:"flex",flexDirection:"column",height:"100%",overflow:"hidden"}}>
    <ViewHeader title="لوحة التحكم" sub={new Date().toLocaleDateString("ar-KW",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}/>
    <div style={{flex:1,overflowY:"auto",padding:16}}>
      <div style={{overflowX:"auto",marginBottom:16}}><div style={{display:"flex",gap:8,paddingBottom:4,minWidth:"max-content"}}>{QUICK.map(q=><button key={q.l} onClick={q.fn} style={{...btnSm,flexDirection:"column",height:"auto",padding:"10px 12px",gap:4,minWidth:72,justifyContent:"center",alignItems:"center",borderRadius:10}}><span style={{fontSize:q.icon?18:0}}>{q.icon}</span><span style={{fontSize:10}}>{q.l}</span></button>)}</div></div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:10,marginBottom:16}}>
        <Stat label="مهام معلقة" val={tasks.filter(t=>!t.done&&!t.parentId).length}/>
        <Stat label="إيرادات الشهر" val={fmtKD(inc)} color="#065f46"/>
        <Stat label="مشاريع جارية" val={projects.filter(p=>p.status==="in-progress").length}/>
        <Stat label="أفكار جديدة" val={ideas.filter(i=>i.status==="new").length}/>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}>
        <SCard title="مهام اليوم" count={todayTasks.length}>{todayTasks.length?todayTasks.map(t=><MRow key={t.id}><input type="checkbox" style={{accentColor:"#111",cursor:"pointer",flexShrink:0}} onChange={()=>shared.updItem("tasks",t.id,{done:true})}/><span style={{flex:1,fontSize:12}}>{t.title}</span><Badge v={t.priority||"medium"}/></MRow>):<Empty msg="لا مهام اليوم ✓"/>}</SCard>
        <SCard title="مواعيد اليوم" count={todayCal.length}>{todayCal.length?todayCal.map(e=><MRow key={e.id}><span style={{fontSize:11,color:T.tx3,minWidth:36,fontFamily:"monospace"}}>{e.time||"—"}</span><span style={{flex:1,fontSize:12}}>{e.title}</span></MRow>):<Empty msg="لا مواعيد"/>}</SCard>
      </div>
      <SCard title="أعمال الأسبوع" style={{marginBottom:12}}>
        <div style={{overflowX:"auto"}}><div style={{display:"flex",gap:0,minWidth:"max-content"}}>{week.map((d,i)=>{const isT=d===today,dT=tasks.filter(t=>t.dueDate===d&&!t.done&&!t.parentId),dC=cal.filter(e=>e.date===d),dCnt=db.content.filter(c=>c.scheduledDate===d),dM=marketing.filter(m=>m.date===d);return(<div key={d} style={{minWidth:90,padding:"8px 10px",borderLeft:i>0?"1px solid #f0f0f0":"none",background:isT?"#f8f8f8":"#fff"}}><div style={{fontSize:10,color:isT?T.tx:T.tx3,fontWeight:isT?700:500,marginBottom:4}}>{DAY_AR[i].slice(0,3)}</div><div style={{fontSize:11,color:T.tx2,fontWeight:isT?700:400,marginBottom:6}}>{fmtDate(d)}</div>{dT.map(t=><div key={t.id} style={{fontSize:10,padding:"2px 5px",background:"#eff6ff",color:"#1d4ed8",borderRadius:4,marginBottom:2,overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis"}}>{t.title}</div>)}{dC.map(e=><div key={e.id} style={{fontSize:10,padding:"2px 5px",background:"#ecfdf5",color:"#065f46",borderRadius:4,marginBottom:2,overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis"}}>📅 {e.title}</div>)}{dCnt.map(c=><div key={c.id} style={{fontSize:10,padding:"2px 5px",background:"#fdf4ff",color:"#7e22ce",borderRadius:4,marginBottom:2,overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis"}}>◎ {c.title}</div>)}{dM.map(m=><div key={m.id} style={{fontSize:10,padding:"2px 5px",background:"#fff7ed",color:"#c2410c",borderRadius:4,marginBottom:2,overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis"}}>◉ {m.title}</div>)}{!dT.length&&!dC.length&&!dCnt.length&&!dM.length&&<div style={{fontSize:10,color:"#ccc"}}>—</div>}</div>);})}</div></div>
      </SCard>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}>
        <SCard title="مهام عاجلة" count={urgent.length}>{urgent.length?urgent.map(t=><MRow key={t.id}><span style={{flex:1,fontSize:12}}>{t.title}</span><span style={{fontSize:10,color:T.tx3}}>{fmtDate(t.dueDate)}</span></MRow>):<Empty msg="لا مهام عاجلة ✓"/>}</SCard>
        <SCard title="💡 آخر الأفكار" count={latestIdeas.length}>{latestIdeas.length?latestIdeas.map(i=><MRow key={i.id}><span style={{flex:1,fontSize:12}}>{i.title}</span><Badge v={i.status||"new"}/></MRow>):<Empty msg="لا أفكار بعد"/>}</SCard>
      </div>
      <SCard title="الشركات — نشطة فقط"><div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)"}}>{cos.filter(co=>co.active).map((co,i)=>{const cT=tasks.filter(t=>t.companyId===co.id&&!t.done).length,cP=projects.filter(p=>p.companyId===co.id).length;return <div key={co.id} onClick={()=>{setView("cos");setCoDetail(co.id);}} style={{padding:"12px 14px",borderBottom:i<6?T.b:"none",borderLeft:i%3!==0?T.b:"none",cursor:"pointer"}} onMouseEnter={e=>e.currentTarget.style.background="#fafafa"} onMouseLeave={e=>e.currentTarget.style.background=""}><div style={{fontSize:12,fontWeight:700,marginBottom:2}}>{co.name}</div><div style={{display:"flex",gap:10}}><span style={{fontSize:10,color:T.tx3}}>{cP} مشروع</span><span style={{fontSize:10,color:T.tx3}}>{cT} مهمة</span></div></div>;})} </div></SCard>
    </div>
  </div>);
}

// ════════════════════════════════════════════════════
// COMPANIES (simplified)
// ════════════════════════════════════════════════════
function CoView({shared}){
  const{db,coName,coDetail,setCoDetail,addItem,delItem,updItem,cos}=shared;
  const{projects,tasks,marketing,finance,cal,crm,content}=db;
  const[form,setForm]=useState(null);
  const[showInactive,setShowInactive]=useState(false);
  const visibleCos=showInactive?cos:cos.filter(c=>c.active);
  const inactiveCount=cos.filter(c=>!c.active).length;
  const save=()=>{if(!form?.name)return;if(form.id)updItem("cos",form.id,form);else addItem("cos",form);setForm(null);};
  if(coDetail){
    const co=cos.find(c=>c.id===coDetail);if(!co)return null;
    const cP=projects.filter(p=>p.companyId===coDetail),cT=tasks.filter(t=>t.companyId===coDetail&&!t.parentId),cM=marketing.filter(m=>m.companyId===coDetail),cC=content.filter(c=>c.companyId===coDetail),cF=finance.filter(f=>f.companyId===coDetail),cCrm=crm.filter(c=>c.companyId===coDetail);
    const inc=cF.filter(f=>f.type==="income").reduce((s,f)=>s+f.amount,0),exp=cF.filter(f=>f.type==="expense").reduce((s,f)=>s+f.amount,0);
    return(<div style={{display:"flex",flexDirection:"column",height:"100%",overflow:"hidden"}}><ViewHeader title={co.name} sub={co.desc} onBack={()=>setCoDetail(null)} action={<button style={btnSm} onClick={()=>setForm({...co})}>تعديل</button>}/>
    <div style={{flex:1,overflowY:"auto",padding:16}}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:16}}>{[["مشاريع",cP.length],["مهام معلقة",cT.filter(t=>!t.done).length],["إيرادات KD",fmtKD(inc)],["مصاريف KD",fmtKD(exp)],["محتوى",cC.length],["CRM",cCrm.length]].map(([l,v])=><div key={l} style={{background:T.bg2,border:T.b,borderRadius:8,padding:"10px 12px"}}><div style={{fontSize:9,color:T.tx3,fontWeight:700,marginBottom:4}}>{l}</div><div style={{fontSize:16,fontWeight:700,fontFamily:T.serif}}>{v}</div></div>)}</div>
      {[["المشاريع",cP,p=><MRow key={p.id}><span style={{flex:1,fontSize:12}}>{p.name}</span><Badge v={p.status}/></MRow>],["المهام المعلقة",cT.filter(t=>!t.done),t=><MRow key={t.id}><span style={{flex:1,fontSize:12}}>{t.title}</span><Badge v={t.priority||"medium"}/><span style={{fontSize:10,color:T.tx3}}>{fmtDate(t.dueDate)}</span></MRow>],["CRM",cCrm,c=><MRow key={c.id}><span style={{flex:1,fontSize:12}}>{c.name}</span><Badge v={c.type}/></MRow>],].map(([title,items,render])=><div key={title} style={{marginBottom:12}}><SCard title={title} count={items.length}>{items.slice(0,5).map(render)}{!items.length&&<Empty/>}</SCard></div>)}
    </div>
    {form?.id&&<Modal title="تعديل الشركة" onClose={()=>setForm(null)} onSave={save} isMobile={shared.isMobile}><Field label="الاسم"><input style={inp} value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></Field><Field label="الوصف"><input style={inp} value={form.desc} onChange={e=>setForm({...form,desc:e.target.value})}/></Field></Modal>}
    </div>);
  }
  return(<div style={{display:"flex",flexDirection:"column",height:"100%",overflow:"hidden"}}><ViewHeader title="الشركات" action={<div style={{display:"flex",gap:6}}>{inactiveCount>0&&<button onClick={()=>setShowInactive(!showInactive)} style={{...btnSm,color:showInactive?T.tx:"#6b7280",border:showInactive?"1px solid #111":"1px solid #e0e0e0"}}>{showInactive?`إخفاء المتوقفة (${inactiveCount})`:`إظهار المتوقفة (${inactiveCount})`}</button>}<button style={btnPrim} onClick={()=>setForm({name:"",desc:"",active:true})}>+ شركة</button></div>}/>
  <div style={{flex:1,overflowY:"auto",padding:16}}><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:12}}>{visibleCos.map(co=>{const cT=tasks.filter(t=>t.companyId===co.id&&!t.done).length,cP=projects.filter(p=>p.companyId===co.id).length,cI=finance.filter(f=>f.companyId===co.id&&f.type==="income").reduce((s,f)=>s+f.amount,0);return <div key={co.id} style={{border:T.b,borderRadius:12,padding:16,cursor:"pointer",transition:"all .15s",opacity:co.active?1:.55}} onClick={()=>setCoDetail(co.id)} onMouseEnter={e=>{e.currentTarget.style.borderColor="#bbb";e.currentTarget.style.boxShadow="0 4px 16px rgba(0,0,0,.07)";}} onMouseLeave={e=>{e.currentTarget.style.borderColor="#eaeaea";e.currentTarget.style.boxShadow="none";}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}><div style={{fontFamily:T.serif,fontStyle:"italic",fontSize:14,fontWeight:700}}>{co.name}</div><Badge v={co.active?"active":"inactive"} label={co.active?"نشط":"متوقف"}/></div><div style={{fontSize:11,color:T.tx3,marginBottom:12}}>{co.desc}</div><div style={{display:"flex",gap:16,paddingTop:12,borderTop:"1px solid #f5f5f5"}}><div><div style={{fontSize:9,color:T.tx3}}>مشاريع</div><div style={{fontSize:16,fontWeight:700}}>{cP}</div></div><div><div style={{fontSize:9,color:T.tx3}}>مهام</div><div style={{fontSize:16,fontWeight:700}}>{cT}</div></div><div><div style={{fontSize:9,color:"#065f46"}}>إيرادات</div><div style={{fontSize:14,fontWeight:700,color:"#065f46"}}>{fmtKD(cI)}</div></div></div></div>;})} <div style={{border:"1px dashed #d0d0d0",borderRadius:12,padding:16,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:T.tx3,gap:8,fontSize:13}} onClick={()=>setForm({name:"",desc:"",active:true})}>+ إضافة شركة</div></div></div>
  {form&&!form.id&&<Modal title="شركة جديدة" onClose={()=>setForm(null)} onSave={save} isMobile={shared.isMobile}><Field label="الاسم"><input style={inp} value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="اسم الشركة..."/></Field><Field label="الوصف"><input style={inp} value={form.desc} onChange={e=>setForm({...form,desc:e.target.value})} placeholder="وصف مختصر..."/></Field></Modal>}
  </div>);
}

// ════════════════════════════════════════════════════
// TASKS (simplified with subtasks + daily)
// ════════════════════════════════════════════════════
function TasksView({shared,initForm}){
  const{db,coName,addItem,delItem,updItem,cos,isMobile}=shared;
  const{tasks,projects,crm}=db;
  const[tab,setTab]=useState("daily");
  const[coF,setCoF]=useState("");
  const[projDetail,setProjDetail]=useState(null);
  const[tForm,setTForm]=useState(null);
  const[pForm,setPForm]=useState(null);
  const[expanded,setExpanded]=useState({});
  useEffect(()=>{if(initForm==="task")setTForm({title:"",companyId:"",projectId:"",parentId:"",priority:"medium",dueDate:todayStr(),notes:"",url:"",done:false,isDaily:true});if(initForm==="project")setPForm({name:"",companyId:"",status:"todo",priority:"medium",deadline:"",notes:"",crmIds:[],url:""});},[initForm]);
  const saveTask=()=>{if(!tForm?.title)return;if(tForm.id)updItem("tasks",tForm.id,tForm);else addItem("tasks",{...tForm,done:false});setTForm(null);};
  const saveProj=()=>{if(!pForm?.name)return;if(pForm.id)updItem("projects",pForm.id,pForm);else addItem("projects",{...pForm,crmIds:pForm.crmIds||[]});setPForm(null);};
  const topTasks=tasks.filter(t=>!t.parentId&&(!coF||t.companyId===coF));
  const dailyTasks=topTasks.filter(t=>t.isDaily||!t.projectId);
  const fProjects=projects.filter(p=>!coF||p.companyId===coF);
  const renderTaskRow=(t,indent=0)=>{const subs=tasks.filter(x=>x.parentId===t.id),exp=expanded[t.id];return(<><tr key={t.id} style={{background:t.done?"#fafafa":"#fff"}} onMouseEnter={e=>e.currentTarget.style.background="#f9f9f9"} onMouseLeave={e=>e.currentTarget.style.background=t.done?"#fafafa":"#fff"}><td style={{...TD,width:30}}><div style={{display:"flex",alignItems:"center",gap:4,paddingRight:indent*16}}>{subs.length>0&&<button onClick={()=>setExpanded(p=>({...p,[t.id]:!p[t.id]}))} style={{background:"none",border:"none",cursor:"pointer",color:T.tx3,fontSize:10,padding:0}}>{exp?"▾":"▸"}</button>}<input type="checkbox" checked={!!t.done} style={{accentColor:"#111",cursor:"pointer"}} onChange={()=>updItem("tasks",t.id,{done:!t.done})}/></div></td><td style={{...TD,textDecoration:t.done?"line-through":"none",color:t.done?T.tx3:T.tx,cursor:"pointer"}} onClick={()=>setTForm({...t})}>{t.title}{subs.length>0&&<span style={{fontSize:10,color:T.tx3,marginRight:6}}>({subs.filter(s=>!s.done).length}/{subs.length})</span>}</td><td style={TDm}>{coName(t.companyId)}</td><td style={TD}><Badge v={t.priority||"medium"}/></td><td style={TDm}>{fmtDate(t.dueDate)}</td><td style={{...TD,width:60}}><div style={{display:"flex",gap:4}}><button style={{background:"none",border:"none",cursor:"pointer",color:T.tx3,fontSize:11,padding:"2px 4px"}} onClick={()=>setTForm({title:"",companyId:t.companyId,projectId:t.projectId,parentId:t.id,priority:"medium",dueDate:todayStr(),notes:"",url:"",done:false})}>+sub</button><button style={{background:"none",border:"none",cursor:"pointer",color:T.tx3,fontSize:16}} onClick={()=>delItem("tasks",t.id)}>×</button></div></td></tr>{exp&&subs.map(s=>renderTaskRow(s,1))}</>);};
  const renderTaskTable=(items)=><div style={{border:T.b,borderRadius:10,overflow:"hidden"}}><table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr><th style={TH}>✓</th><th style={TH}>المهمة</th><th style={TH}>الشركة</th><th style={TH}>الأولوية</th><th style={TH}>الموعد</th><th style={TH}></th></tr></thead><tbody>{items.length?items.map(t=>renderTaskRow(t,0)):<tr><td colSpan={6}><Empty/></td></tr>}</tbody></table></div>;
  return(<div style={{display:"flex",flexDirection:"column",height:"100%",overflow:"hidden"}}><ViewHeader title="المهام والمشاريع" action={<div style={{display:"flex",gap:6}}>{tab==="projects"&&<button style={btnSm} onClick={()=>setPForm({name:"",companyId:"",status:"todo",priority:"medium",deadline:"",notes:"",crmIds:[],url:""})}>+ مشروع</button>}<button style={btnPrim} onClick={()=>setTForm({title:"",companyId:"",projectId:"",parentId:"",priority:"medium",dueDate:todayStr(),notes:"",url:"",done:false,isDaily:tab==="daily"})}>+ مهمة</button></div>}/>
  <div style={{padding:"10px 16px",borderBottom:T.b,display:"flex",alignItems:"center",gap:10,flexWrap:"wrap"}}><Tabs tabs={[["daily",`يومية (${dailyTasks.filter(t=>!t.done).length})`],["projects",`مشاريع (${projects.length})`],["all",`كل المهام (${topTasks.filter(t=>!t.done).length})`]]} active={tab} onChange={setTab}/><select style={{...selSm,width:160}} value={coF} onChange={e=>setCoF(e.target.value)}><option value="">كل الشركات</option>{cos.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}</select></div>
  <div style={{flex:1,overflowY:"auto",padding:16}}>
    {tab==="daily"&&renderTaskTable(dailyTasks)}
    {tab==="projects"&&<div style={{display:"flex",flexDirection:"column",gap:10}}>{fProjects.length?fProjects.map(p=>{const pT=tasks.filter(t=>t.projectId===p.id&&!t.parentId),done=pT.filter(t=>t.done).length;return <div key={p.id} style={{border:T.b,borderRadius:10,overflow:"hidden"}}><div style={{padding:"12px 16px",background:T.bg2,display:"flex",alignItems:"center",gap:10,cursor:"pointer"}} onClick={()=>setProjDetail(p.id)}><div style={{flex:1}}><div style={{fontSize:14,fontWeight:700}}>{p.name}</div><div style={{fontSize:11,color:T.tx3}}>{coName(p.companyId)} · {done}/{pT.length} مهمة</div></div><Badge v={p.status}/><Badge v={p.priority||"medium"}/>{p.deadline&&<span style={{fontSize:10,color:T.tx3}}>{fmtDate(p.deadline)}</span>}<span style={{fontSize:14,color:T.tx3}}>›</span></div></div>;}):<Empty msg="لا مشاريع"/>}</div>}
    {tab==="all"&&renderTaskTable(topTasks.filter(t=>!t.done))}
  </div>
  {tForm&&<Modal title={tForm.id?"تعديل مهمة":"مهمة جديدة"} onClose={()=>setTForm(null)} onSave={saveTask} isMobile={isMobile}><Field label="المهمة"><input style={inp} value={tForm.title} onChange={e=>setTForm({...tForm,title:e.target.value})} placeholder="وصف المهمة..."/></Field><Grid2><Field label="الشركة"><select style={sel} value={tForm.companyId} onChange={e=>setTForm({...tForm,companyId:e.target.value})}><option value="">اختر...</option>{cos.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}</select></Field><Field label="المشروع"><select style={sel} value={tForm.projectId} onChange={e=>setTForm({...tForm,projectId:e.target.value})}><option value="">يومية</option>{projects.filter(p=>!tForm.companyId||p.companyId===tForm.companyId).map(p=><option key={p.id} value={p.id}>{p.name}</option>)}</select></Field><Field label="الأولوية"><select style={sel} value={tForm.priority} onChange={e=>setTForm({...tForm,priority:e.target.value})}><option value="high">عالية</option><option value="medium">متوسطة</option><option value="low">منخفضة</option></select></Field><Field label="الموعد"><input type="date" style={inp} value={tForm.dueDate} onChange={e=>setTForm({...tForm,dueDate:e.target.value})}/></Field></Grid2><Field label="رابط"><input style={inp} value={tForm.url||""} onChange={e=>setTForm({...tForm,url:e.target.value})} placeholder="https://..."/></Field><Field label="ملاحظات"><textarea style={inpTxt} value={tForm.notes} onChange={e=>setTForm({...tForm,notes:e.target.value})}/></Field></Modal>}
  {pForm&&<Modal title={pForm.id?"تعديل مشروع":"مشروع جديد"} onClose={()=>setPForm(null)} onSave={saveProj} isMobile={isMobile}><Field label="اسم المشروع"><input style={inp} value={pForm.name} onChange={e=>setPForm({...pForm,name:e.target.value})} placeholder="اسم المشروع..."/></Field><Field label="الشركة"><select style={sel} value={pForm.companyId} onChange={e=>setPForm({...pForm,companyId:e.target.value})}><option value="">اختر...</option>{cos.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}</select></Field><Grid2><Field label="الحالة"><select style={sel} value={pForm.status} onChange={e=>setPForm({...pForm,status:e.target.value})}><option value="todo">لم يبدأ</option><option value="in-progress">جاري</option><option value="done">منتهي</option><option value="blocked">متوقف</option></select></Field><Field label="الأولوية"><select style={sel} value={pForm.priority} onChange={e=>setPForm({...pForm,priority:e.target.value})}><option value="high">عالية</option><option value="medium">متوسطة</option><option value="low">منخفضة</option></select></Field></Grid2><Field label="الموعد النهائي"><input type="date" style={inp} value={pForm.deadline} onChange={e=>setPForm({...pForm,deadline:e.target.value})}/></Field><Field label="رابط"><input style={inp} value={pForm.url||""} onChange={e=>setPForm({...pForm,url:e.target.value})} placeholder="https://..."/></Field><Field label="ملاحظات"><textarea style={inpTxt} value={pForm.notes} onChange={e=>setPForm({...pForm,notes:e.target.value})}/></Field></Modal>}
  </div>);
}

// ════════════════════════════════════════════════════
// CONTENT + MARKETING + IDEAS
// ════════════════════════════════════════════════════
function ContentView({shared,initForm}){
  const{db,coName,addItem,delItem,updItem,cos,isMobile}=shared;
  const{marketing,content,ideas}=db;
  const[tab,setTab]=useState("ideas");
  const[coF,setCoF]=useState("");
  const[viewMode,setViewMode]=useState("list");
  const[mForm,setMForm]=useState(null);
  const[cForm,setCForm]=useState(null);
  const[iForm,setIForm]=useState(null);
  useEffect(()=>{if(initForm==="content"){setTab("content");setCForm({title:"",platform:"Instagram",type:"Reel",companyId:"",scheduledDate:todayStr(),status:"idea",caption:"",notes:"",mediaUrl:"",url:""});}if(initForm==="idea"){setTab("ideas");setIForm({title:"",desc:"",companyId:"",type:"content",date:todayStr(),url:"",status:"new"});}},[initForm]);
  const PLATS=["Instagram","TikTok","Snapchat","YouTube","Podcast","Twitter/X","Other"];
  const CNT_TYPES=["Reel","Post","Story","Carousel","Video","Episode","Newsletter","Other"];
  const MKT_TYPES=["event","launch","campaign","pr","collaboration","other"];
  const IDEA_STATUS=["new","exploring","planned","done","archived"];
  const fM=marketing.filter(m=>!coF||m.companyId===coF);
  const fC=content.filter(c=>!coF||c.companyId===coF);
  const fI=ideas.filter(i=>!coF||i.companyId===coF);
  const saveMkt=()=>{if(!mForm?.title)return;if(mForm.id)updItem("marketing",mForm.id,mForm);else addItem("marketing",mForm);setMForm(null);};
  const saveCnt=()=>{if(!cForm?.title)return;if(cForm.id)updItem("content",cForm.id,cForm);else addItem("content",cForm);setCForm(null);};
  const saveIdea=()=>{if(!iForm?.title)return;if(iForm.id)updItem("ideas",iForm.id,iForm);else addItem("ideas",iForm);setIForm(null);};
  return(<div style={{display:"flex",flexDirection:"column",height:"100%",overflow:"hidden"}}><ViewHeader title="التسويق، المحتوى والأفكار" action={<div style={{display:"flex",gap:6}}>{tab==="marketing"&&<button style={btnPrim} onClick={()=>setMForm({title:"",type:"event",companyId:"",date:todayStr(),status:"upcoming",budget:0,notes:"",url:""})}>+ نشاط</button>}{tab==="content"&&<><button style={btnSm} onClick={()=>setViewMode(v=>v==="list"?"feed":"list")}>{viewMode==="list"?"🖼 فيد":"≡ قائمة"}</button><button style={btnPrim} onClick={()=>setCForm({title:"",platform:"Instagram",type:"Reel",companyId:"",scheduledDate:todayStr(),status:"idea",caption:"",notes:"",mediaUrl:"",url:""})}>+ محتوى</button></>}{tab==="ideas"&&<button style={btnPrim} onClick={()=>setIForm({title:"",desc:"",companyId:"",type:"content",date:todayStr(),url:"",status:"new"})}>+ فكرة</button>}</div>}/>
  <div style={{padding:"10px 16px",borderBottom:T.b,display:"flex",gap:10,flexWrap:"wrap",alignItems:"center"}}><Tabs tabs={[["ideas",`💡 أفكار (${ideas.length})`],["marketing",`تسويق (${marketing.length})`],["content",`محتوى (${content.length})`]]} active={tab} onChange={setTab}/><select style={{...selSm,width:150}} value={coF} onChange={e=>setCoF(e.target.value)}><option value="">كل الشركات</option>{cos.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}</select></div>
  <div style={{flex:1,overflowY:"auto",padding:16}}>
    {tab==="ideas"&&<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:12}}>{fI.length?fI.map(i=><div key={i.id} style={{border:T.b,borderRadius:10,padding:14,cursor:"pointer"}} onClick={()=>setIForm({...i})} onMouseEnter={e=>{e.currentTarget.style.borderColor="#bbb";}} onMouseLeave={e=>{e.currentTarget.style.borderColor="#eaeaea";}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}><div style={{fontSize:13,fontWeight:700}}>{i.title}</div><Badge v={i.status||"new"}/></div>{i.desc&&<div style={{fontSize:12,color:T.tx2,marginBottom:8}}>{i.desc}</div>}<div style={{display:"flex",gap:6,alignItems:"center"}}>{i.companyId&&<span style={{fontSize:10,color:T.tx3}}>{coName(i.companyId)}</span>}<span style={{fontSize:10,color:T.tx3,marginRight:"auto"}}>{fmtDate(i.date)}</span></div>{i.url&&<div style={{marginTop:8,fontSize:11}}><a href={i.url} target="_blank" rel="noreferrer" style={{color:"#1d4ed8"}}>🔗 رابط</a></div>}</div>):<div style={{gridColumn:"1/-1"}}><Empty msg="لا أفكار بعد — أضف فكرتك الأولى 💡"/></div>}</div>}
    {tab==="marketing"&&<div style={{border:T.b,borderRadius:10,overflow:"hidden"}}><table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr>{["النشاط","النوع","الشركة","التاريخ","الحالة","الميزانية",""].map(h=><th key={h} style={TH}>{h}</th>)}</tr></thead><tbody>{fM.length?[...fM].sort((a,b)=>a.date>b.date?1:-1).map(m=><tr key={m.id} onMouseEnter={e=>e.currentTarget.style.background="#f9f9f9"} onMouseLeave={e=>e.currentTarget.style.background=""}><td style={{...TD,fontWeight:600,cursor:"pointer"}} onClick={()=>setMForm({...m})}>{m.title}{m.url&&<a href={m.url} target="_blank" rel="noreferrer" onClick={e=>e.stopPropagation()} style={{marginRight:6,fontSize:11,color:"#1d4ed8"}}>🔗</a>}</td><td style={TD}><Badge v={m.type}/></td><td style={TDm}>{coName(m.companyId)}</td><td style={TDm}>{fmtDate(m.date)}</td><td style={TD}><Badge v={m.status}/></td><td style={TDm}>{m.budget?fmtKD(m.budget):"—"}</td><td style={{...TD,width:30}}><button style={{background:"none",border:"none",cursor:"pointer",color:T.tx3,fontSize:16}} onClick={()=>delItem("marketing",m.id)}>×</button></td></tr>):<tr><td colSpan={7}><Empty/></td></tr>}</tbody></table></div>}
    {tab==="content"&&viewMode==="list"&&<div style={{border:T.b,borderRadius:10,overflow:"hidden"}}><table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr>{["العنوان","المنصة","النوع","الشركة","التاريخ","الحالة",""].map(h=><th key={h} style={TH}>{h}</th>)}</tr></thead><tbody>{fC.length?[...fC].sort((a,b)=>a.scheduledDate>b.scheduledDate?1:-1).map(c=><tr key={c.id} onMouseEnter={e=>e.currentTarget.style.background="#f9f9f9"} onMouseLeave={e=>e.currentTarget.style.background=""}><td style={{...TD,fontWeight:600,cursor:"pointer"}} onClick={()=>setCForm({...c})}>{c.title}</td><td style={TDm}>{c.platform}</td><td style={TDm}>{c.type}</td><td style={TDm}>{coName(c.companyId)}</td><td style={TDm}>{fmtDate(c.scheduledDate)}</td><td style={TD}><Badge v={c.status}/></td><td style={{...TD,width:30}}><button style={{background:"none",border:"none",cursor:"pointer",color:T.tx3,fontSize:16}} onClick={()=>delItem("content",c.id)}>×</button></td></tr>):<tr><td colSpan={7}><Empty/></td></tr>}</tbody></table></div>}
    {tab==="content"&&viewMode==="feed"&&<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(130px,1fr))",gap:8}}>{fC.length?[...fC].sort((a,b)=>a.scheduledDate>b.scheduledDate?1:-1).map(c=><div key={c.id} style={{border:T.b,borderRadius:10,overflow:"hidden",cursor:"pointer"}} onClick={()=>setCForm({...c})}>{c.mediaUrl?<img src={c.mediaUrl} alt={c.title} style={{width:"100%",aspectRatio:"1",objectFit:"cover",display:"block"}} onError={e=>{e.target.style.display="none";}}/>:<div style={{width:"100%",aspectRatio:"1",background:BDEFS[c.status]?.bg||"#f5f5f5",display:"flex",alignItems:"center",justifyContent:"center",fontSize:28}}>{c.platform==="Instagram"?"📸":c.platform==="TikTok"?"🎵":c.platform==="Podcast"?"🎙":"◎"}</div>}<div style={{padding:"8px 10px"}}><div style={{fontSize:11,fontWeight:700,marginBottom:3,overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis"}}>{c.title}</div><div style={{display:"flex",justifyContent:"space-between"}}><span style={{fontSize:10,color:T.tx3}}>{c.platform}</span><Badge v={c.status}/></div></div></div>):<div style={{gridColumn:"1/-1"}}><Empty/></div>}</div>}
  </div>
  {mForm&&<Modal title={mForm.id?"تعديل نشاط":"نشاط تسويقي جديد"} onClose={()=>setMForm(null)} onSave={saveMkt} isMobile={isMobile}><Field label="العنوان"><input style={inp} value={mForm.title} onChange={e=>setMForm({...mForm,title:e.target.value})} placeholder="اسم النشاط..."/></Field><Grid2><Field label="النوع"><select style={sel} value={mForm.type} onChange={e=>setMForm({...mForm,type:e.target.value})}>{MKT_TYPES.map(t=><option key={t}>{t}</option>)}</select></Field><Field label="الشركة"><select style={sel} value={mForm.companyId} onChange={e=>setMForm({...mForm,companyId:e.target.value})}><option value="">اختر...</option>{cos.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}</select></Field><Field label="التاريخ"><input type="date" style={inp} value={mForm.date} onChange={e=>setMForm({...mForm,date:e.target.value})}/></Field><Field label="الحالة"><select style={sel} value={mForm.status} onChange={e=>setMForm({...mForm,status:e.target.value})}>{["upcoming","confirmed","completed","cancelled","pending"].map(s=><option key={s}>{s}</option>)}</select></Field></Grid2><Field label="الميزانية (KD)"><input type="number" style={inp} value={mForm.budget||""} onChange={e=>setMForm({...mForm,budget:parseFloat(e.target.value)||0})}/></Field><Field label="رابط"><input style={inp} value={mForm.url||""} onChange={e=>setMForm({...mForm,url:e.target.value})} placeholder="https://..."/></Field><Field label="ملاحظات"><textarea style={inpTxt} value={mForm.notes} onChange={e=>setMForm({...mForm,notes:e.target.value})}/></Field></Modal>}
  {cForm&&<Modal title={cForm.id?"تعديل محتوى":"محتوى جديد"} onClose={()=>setCForm(null)} onSave={saveCnt} isMobile={isMobile}><Field label="العنوان"><input style={inp} value={cForm.title} onChange={e=>setCForm({...cForm,title:e.target.value})} placeholder="عنوان المحتوى..."/></Field><Grid2><Field label="المنصة"><select style={sel} value={cForm.platform} onChange={e=>setCForm({...cForm,platform:e.target.value})}>{PLATS.map(p=><option key={p}>{p}</option>)}</select></Field><Field label="النوع"><select style={sel} value={cForm.type} onChange={e=>setCForm({...cForm,type:e.target.value})}>{CNT_TYPES.map(t=><option key={t}>{t}</option>)}</select></Field><Field label="الشركة"><select style={sel} value={cForm.companyId} onChange={e=>setCForm({...cForm,companyId:e.target.value})}><option value="">اختر...</option>{cos.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}</select></Field><Field label="تاريخ النشر"><input type="date" style={inp} value={cForm.scheduledDate} onChange={e=>setCForm({...cForm,scheduledDate:e.target.value})}/></Field></Grid2><Field label="المرحلة"><select style={sel} value={cForm.status} onChange={e=>setCForm({...cForm,status:e.target.value})}>{["idea","draft","ready","posted"].map(s=><option key={s}>{s}</option>)}</select></Field><Field label="رابط الصورة / فيديو"><input style={inp} value={cForm.mediaUrl||""} onChange={e=>setCForm({...cForm,mediaUrl:e.target.value})} placeholder="https://... (للمعاينة في الفيد)"/></Field><Field label="رابط المنشور"><input style={inp} value={cForm.url||""} onChange={e=>setCForm({...cForm,url:e.target.value})} placeholder="https://..."/></Field><Field label="Caption"><textarea style={inpTxt} value={cForm.caption||""} onChange={e=>setCForm({...cForm,caption:e.target.value})} placeholder="نص المحتوى..."/></Field></Modal>}
  {iForm&&<Modal title={iForm.id?"تعديل فكرة":"فكرة جديدة 💡"} onClose={()=>setIForm(null)} onSave={saveIdea} isMobile={isMobile}><Field label="عنوان الفكرة"><input style={inp} value={iForm.title} onChange={e=>setIForm({...iForm,title:e.target.value})} placeholder="الفكرة في جملة..."/></Field><Grid2><Field label="النوع"><select style={sel} value={iForm.type} onChange={e=>setIForm({...iForm,type:e.target.value})}>{["content","project","business","product","collab","other"].map(t=><option key={t}>{t}</option>)}</select></Field><Field label="الشركة"><select style={sel} value={iForm.companyId} onChange={e=>setIForm({...iForm,companyId:e.target.value})}><option value="">اختر...</option>{cos.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}</select></Field></Grid2><Field label="الحالة"><select style={sel} value={iForm.status} onChange={e=>setIForm({...iForm,status:e.target.value})}>{IDEA_STATUS.map(s=><option key={s}>{s}</option>)}</select></Field><Field label="رابط مرجعي"><input style={inp} value={iForm.url||""} onChange={e=>setIForm({...iForm,url:e.target.value})} placeholder="https://..."/></Field><Field label="التفاصيل"><textarea style={inpTxt} value={iForm.desc||""} onChange={e=>setIForm({...iForm,desc:e.target.value})} placeholder="تفاصيل الفكرة..."/></Field></Modal>}
  </div>);
}

// ════════════════════════════════════════════════════
// FINANCE + BOOKKEEPING
// ════════════════════════════════════════════════════
function FinView({shared,initForm}){
  const{db,coName,addItem,delItem,cos,isMobile}=shared;
  const{finance,projects}=db;
  const[tab,setTab]=useState("ledger");
  const[form,setForm]=useState(null);
  const[coF,setCoF]=useState("");
  const[mF,setMonthF]=useState(todayStr().slice(0,7));
  const[typeF,setTypeF]=useState("");
  const CATS_IN=["استشارات","تصوير وستايل","مبيعات","تعاونات","رواتب","عمولات","BOM إنتاج","أخرى"];
  const CATS_EX=["إنتاج/BOM","تسويق","معدات","اشتراكات","سفر","مستلزمات","رواتب","أخرى"];
  useEffect(()=>{if(initForm==="income")setForm({title:"",type:"income",amount:0,category:"",companyId:"",projectId:"",date:todayStr(),notes:"",url:""});if(initForm==="expense")setForm({title:"",type:"expense",amount:0,category:"",companyId:"",projectId:"",date:todayStr(),notes:"",url:""});},[initForm]);
  const fF=finance.filter(f=>(!coF||f.companyId===coF)&&(!mF||f.date?.startsWith(mF))&&(!typeF||f.type===typeF));
  const inc=fF.filter(f=>f.type==="income").reduce((s,f)=>s+f.amount,0);
  const exp=fF.filter(f=>f.type==="expense").reduce((s,f)=>s+f.amount,0);
  const coSum=cos.map(co=>{const cf=finance.filter(f=>f.companyId===co.id&&(!mF||f.date?.startsWith(mF)));const i=cf.filter(f=>f.type==="income").reduce((s,f)=>s+f.amount,0),e=cf.filter(f=>f.type==="expense").reduce((s,f)=>s+f.amount,0);return{...co,inc:i,exp:e};}).filter(c=>c.inc>0||c.exp>0);
  const catSummary=(type)=>{const cats={};finance.filter(f=>f.type===type&&(!mF||f.date?.startsWith(mF))).forEach(f=>{cats[f.category||"بدون تصنيف"]=(cats[f.category||"بدون تصنيف"]||0)+f.amount;});return Object.entries(cats).sort((a,b)=>b[1]-a[1]);};
  const saveF=()=>{if(!form?.title||!form?.amount)return;addItem("finance",form);setForm(null);};
  return(<div style={{display:"flex",flexDirection:"column",height:"100%",overflow:"hidden"}}><ViewHeader title="المالية والمحاسبة" action={<button style={btnPrim} onClick={()=>setForm({title:"",type:"income",amount:0,category:"",companyId:"",projectId:"",date:todayStr(),notes:"",url:""})}>+ إضافة</button>}/>
  <div style={{padding:"10px 16px",borderBottom:T.b,display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}}><Tabs tabs={[["ledger","الدفتر"],["summary","الملخص"],["cats","التصنيفات"]]} active={tab} onChange={setTab}/><input type="month" style={{...inpSm,width:150}} value={mF} onChange={e=>setMonthF(e.target.value)}/><select style={{...selSm,width:150}} value={coF} onChange={e=>setCoF(e.target.value)}><option value="">كل الشركات</option>{cos.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}</select><select style={{...selSm,width:120}} value={typeF} onChange={e=>setTypeF(e.target.value)}><option value="">الكل</option><option value="income">إيرادات</option><option value="expense">مصاريف</option></select></div>
  <div style={{flex:1,overflowY:"auto",padding:16}}>
    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:16}}>
      <div style={{background:"#ecfdf5",border:"1px solid #d1fae5",borderRadius:10,padding:"14px 16px"}}><div style={{fontSize:10,color:"#065f46",fontWeight:700,marginBottom:6}}>إجمالي الإيرادات</div><div style={{fontSize:20,fontWeight:700,fontFamily:T.serif,color:"#065f46"}}>{fmtKD(inc)}</div></div>
      <div style={{background:"#fef2f2",border:"1px solid #fecaca",borderRadius:10,padding:"14px 16px"}}><div style={{fontSize:10,color:"#991b1b",fontWeight:700,marginBottom:6}}>إجمالي المصاريف</div><div style={{fontSize:20,fontWeight:700,fontFamily:T.serif,color:"#991b1b"}}>{fmtKD(exp)}</div></div>
      <div style={{background:inc-exp>=0?"#ecfdf5":"#fef2f2",border:`1px solid ${inc-exp>=0?"#d1fae5":"#fecaca"}`,borderRadius:10,padding:"14px 16px"}}><div style={{fontSize:10,color:inc-exp>=0?"#065f46":"#991b1b",fontWeight:700,marginBottom:6}}>صافي الربح</div><div style={{fontSize:20,fontWeight:700,fontFamily:T.serif,color:inc-exp>=0?"#065f46":"#991b1b"}}>{fmtKD(inc-exp)}</div></div>
    </div>
    {tab==="ledger"&&<div style={{border:T.b,borderRadius:10,overflow:"hidden"}}><table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr>{["البيان","المبلغ","النوع","التصنيف","الشركة","المشروع","التاريخ",""].map(h=><th key={h} style={TH}>{h}</th>)}</tr></thead><tbody>{fF.length?[...fF].sort((a,b)=>b.date>a.date?1:-1).map(f=><tr key={f.id} onMouseEnter={e=>e.currentTarget.style.background="#f9f9f9"} onMouseLeave={e=>e.currentTarget.style.background=""}><td style={{...TD,fontWeight:600}}>{f.title}{f.url&&<a href={f.url} target="_blank" rel="noreferrer" style={{marginRight:6,fontSize:11,color:"#1d4ed8"}}>🔗</a>}</td><td style={{...TD,fontWeight:700,color:f.type==="income"?"#065f46":"#991b1b"}}>{f.type==="expense"?"−":"+"} {fmtKD(f.amount)}</td><td style={TD}><Badge v={f.type} label={f.type==="income"?"إيراد":"مصروف"}/></td><td style={TDm}>{f.category||"—"}</td><td style={TDm}>{coName(f.companyId)}</td><td style={TDm}>{projects.find(p=>p.id===f.projectId)?.name||"—"}</td><td style={TDm}>{fmtDate(f.date)}</td><td style={{...TD,width:30}}><button style={{background:"none",border:"none",cursor:"pointer",color:T.tx3,fontSize:16}} onClick={()=>delItem("finance",f.id)}>×</button></td></tr>):<tr><td colSpan={8}><Empty/></td></tr>}</tbody></table></div>}
    {tab==="summary"&&<div><div style={{fontSize:10,color:T.tx3,fontWeight:700,letterSpacing:.5,marginBottom:8}}>توزيع حسب الشركة</div><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:8}}>{coSum.length?coSum.map(co=><div key={co.id} style={{border:T.b,borderRadius:8,padding:"12px 14px"}}><div style={{fontSize:12,fontWeight:700,marginBottom:8}}>{co.name}</div><div style={{display:"flex",gap:10}}><div><div style={{fontSize:9,color:"#065f46"}}>إيرادات</div><div style={{fontSize:12,fontWeight:700,color:"#065f46"}}>{fmtKD(co.inc)}</div></div><div><div style={{fontSize:9,color:"#991b1b"}}>مصاريف</div><div style={{fontSize:12,fontWeight:700,color:"#991b1b"}}>{fmtKD(co.exp)}</div></div><div><div style={{fontSize:9,color:T.tx3}}>صافي</div><div style={{fontSize:12,fontWeight:700,color:co.inc-co.exp>=0?"#065f46":"#991b1b"}}>{fmtKD(co.inc-co.exp)}</div></div></div></div>):<Empty msg="لا بيانات مالية بعد"/>}</div></div>}
    {tab==="cats"&&<Grid2 gap={16}><SCard title="الإيرادات حسب التصنيف">{catSummary("income").length?catSummary("income").map(([cat,amt])=><MRow key={cat}><span style={{flex:1,fontSize:12}}>{cat}</span><span style={{fontWeight:700,color:"#065f46",fontSize:12}}>{fmtKD(amt)}</span></MRow>):<Empty/>}</SCard><SCard title="المصاريف حسب التصنيف">{catSummary("expense").length?catSummary("expense").map(([cat,amt])=><MRow key={cat}><span style={{flex:1,fontSize:12}}>{cat}</span><span style={{fontWeight:700,color:"#991b1b",fontSize:12}}>{fmtKD(amt)}</span></MRow>):<Empty/>}</SCard></Grid2>}
  </div>
  {form&&<Modal title="معاملة مالية جديدة" onClose={()=>setForm(null)} onSave={saveF} isMobile={isMobile}><Field label="البيان"><input style={inp} value={form.title} onChange={e=>setForm({...form,title:e.target.value})} placeholder="وصف المعاملة..."/></Field><Grid2><Field label="النوع"><select style={sel} value={form.type} onChange={e=>setForm({...form,type:e.target.value,category:""})}><option value="income">إيراد</option><option value="expense">مصروف</option></select></Field><Field label="المبلغ (KD)"><input type="number" style={inp} value={form.amount||""} onChange={e=>setForm({...form,amount:parseFloat(e.target.value)||0})} step="0.001" placeholder="0.000"/></Field><Field label="التصنيف"><select style={sel} value={form.category} onChange={e=>setForm({...form,category:e.target.value})}><option value="">بدون</option>{(form.type==="income"?CATS_IN:CATS_EX).map(c=><option key={c}>{c}</option>)}</select></Field><Field label="الشركة"><select style={sel} value={form.companyId} onChange={e=>setForm({...form,companyId:e.target.value})}><option value="">اختر...</option>{cos.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}</select></Field></Grid2><Field label="المشروع المرتبط"><select style={sel} value={form.projectId||""} onChange={e=>setForm({...form,projectId:e.target.value})}><option value="">بدون مشروع</option>{projects.filter(p=>!form.companyId||p.companyId===form.companyId).map(p=><option key={p.id} value={p.id}>{p.name}</option>)}</select></Field><Field label="التاريخ"><input type="date" style={inp} value={form.date} onChange={e=>setForm({...form,date:e.target.value})}/></Field><Field label="رابط (فاتورة، عقد...)"><input style={inp} value={form.url||""} onChange={e=>setForm({...form,url:e.target.value})} placeholder="https://..."/></Field><Field label="ملاحظات"><textarea style={inpTxt} value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})}/></Field></Modal>}
  </div>);
}

// ════════════════════════════════════════════════════
// BOM — Bill of Materials / حاسبة تكلفة المنتج
// ════════════════════════════════════════════════════
function BomView({shared}){
  const{db,coName,addItem,delItem,updItem,cos,isMobile}=shared;
  const{bom}=db;
  const[selected,setSelected]=useState(null);
  const[pForm,setPForm]=useState(null);
  const[mForm,setMForm]=useState(null);
  const UNITS=["قطعة","متر","كيلو","لتر","ورقة","خيط","زر","دزينة","ياردة","سم","غرام","أخرى"];

  const saveProduct=()=>{
    if(!pForm?.name)return;
    const item={...pForm,materials:pForm.materials||[],overhead:pForm.overhead||0,labor:pForm.labor||0,margin:pForm.margin||0};
    if(item.id)updItem("bom",item.id,item);else addItem("bom",item);
    setPForm(null);
  };
  const addMaterial=()=>{if(!mForm?.name)return;updItem("bom",selected.id,{materials:[...(selected.materials||[]),{id:uid(),...mForm}]});setMForm(null);};
  const delMaterial=(mid)=>updItem("bom",selected.id,{materials:(selected.materials||[]).filter(m=>m.id!==mid)});

  const calcCOGS=(product)=>{
    const matCost=(product.materials||[]).reduce((s,m)=>s+(m.unitCost||0)*(m.qty||0),0);
    return matCost+(product.labor||0)+(product.overhead||0);
  };
  const calcSell=(product)=>{const cogs=calcCOGS(product);return cogs*(1+(product.margin||0)/100);};
  const calcProfit=(product)=>{const cogs=calcCOGS(product);return calcSell(product)-cogs;};

  const selProduct=selected?bom.find(b=>b.id===selected.id):null;

  return(<div style={{display:"flex",flexDirection:"column",height:"100%",overflow:"hidden"}}>
    <ViewHeader title="📦 حاسبة BOM — تكلفة المنتج" sub="Bill of Materials — احسبي تكلفة كل منتج وهامش الربح" action={<button style={btnPrim} onClick={()=>setPForm({name:"",companyId:"",category:"عباءة",notes:"",materials:[],overhead:0,labor:0,margin:30})}>+ منتج جديد</button>}/>
    <div style={{flex:1,overflow:"hidden",display:"flex",flexDirection:isMobile?"column":"row"}}>
      {/* Products list */}
      <div style={{width:isMobile?"auto":240,borderLeft:T.b,overflowY:"auto",flexShrink:0}}>
        <div style={{padding:"10px 14px",borderBottom:T.b,fontSize:11,fontWeight:700,color:T.tx3}}>المنتجات ({bom.length})</div>
        {bom.length?bom.map(p=>{const cogs=calcCOGS(p),sell=calcSell(p),profit=calcProfit(p);return <div key={p.id} onClick={()=>setSelected(p)} style={{padding:"12px 14px",borderBottom:T.b,cursor:"pointer",background:selected?.id===p.id?"#f3f3f3":"#fff"}} onMouseEnter={e=>{if(selected?.id!==p.id)e.currentTarget.style.background="#fafafa";}} onMouseLeave={e=>{if(selected?.id!==p.id)e.currentTarget.style.background="#fff";}}><div style={{fontSize:13,fontWeight:700,marginBottom:2}}>{p.name}</div><div style={{fontSize:10,color:T.tx3,marginBottom:4}}>{coName(p.companyId)} · {p.category}</div><div style={{display:"flex",gap:10}}><div><div style={{fontSize:9,color:T.tx3}}>تكلفة</div><div style={{fontSize:12,fontWeight:700}}>{fmtKD(cogs)}</div></div><div><div style={{fontSize:9,color:"#065f46"}}>سعر البيع</div><div style={{fontSize:12,fontWeight:700,color:"#065f46"}}>{fmtKD(sell)}</div></div><div><div style={{fontSize:9,color:"#1d4ed8"}}>هامش</div><div style={{fontSize:12,fontWeight:700,color:"#1d4ed8"}}>{fmtPct(profit/sell*100)}</div></div></div></div>;}):
        <div style={{padding:20}}><Empty msg="لا منتجات بعد — أضف أول منتج"/></div>}
      </div>
      {/* Product detail */}
      <div style={{flex:1,overflowY:"auto",padding:16}}>
        {selProduct?(
          <div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16}}>
              <div><div style={{fontFamily:T.serif,fontStyle:"italic",fontSize:20,fontWeight:700}}>{selProduct.name}</div><div style={{fontSize:12,color:T.tx3}}>{coName(selProduct.companyId)} · {selProduct.category}</div></div>
              <div style={{display:"flex",gap:8}}><button style={btnSm} onClick={()=>setPForm({...selProduct})}>تعديل</button><button style={btnPrimSm} onClick={()=>setMForm({name:"",unit:"قطعة",unitCost:0,qty:1,notes:""})}>+ مادة</button></div>
            </div>
            {/* Cost summary */}
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:16}}>
              {[["تكلفة المواد",((selProduct.materials||[]).reduce((s,m)=>s+(m.unitCost||0)*(m.qty||0),0)),"",],["عمالة",selProduct.labor||0,"",],["مصاريف عامة",selProduct.overhead||0,"",],["إجمالي التكلفة (COGS)",calcCOGS(selProduct),"",]].map(([l,v])=><div key={l} style={{background:T.bg2,border:T.b,borderRadius:8,padding:"10px 12px"}}><div style={{fontSize:9,color:T.tx3,fontWeight:700,marginBottom:4}}>{l}</div><div style={{fontSize:15,fontWeight:700,fontFamily:T.serif}}>{fmtKD(v)}</div></div>)}
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:16}}>
              <div style={{background:"#ecfdf5",border:"1px solid #d1fae5",borderRadius:8,padding:"10px 12px"}}><div style={{fontSize:9,color:"#065f46",fontWeight:700,marginBottom:4}}>سعر البيع المقترح ({selProduct.margin||0}% هامش)</div><div style={{fontSize:18,fontWeight:700,fontFamily:T.serif,color:"#065f46"}}>{fmtKD(calcSell(selProduct))}</div></div>
              <div style={{background:"#eff6ff",border:"1px solid #bfdbfe",borderRadius:8,padding:"10px 12px"}}><div style={{fontSize:9,color:"#1d4ed8",fontWeight:700,marginBottom:4}}>صافي الربح</div><div style={{fontSize:18,fontWeight:700,fontFamily:T.serif,color:"#1d4ed8"}}>{fmtKD(calcProfit(selProduct))}</div></div>
              <div style={{background:T.bg2,border:T.b,borderRadius:8,padding:"10px 12px"}}><div style={{fontSize:9,color:T.tx3,fontWeight:700,marginBottom:4}}>هامش الربح الفعلي</div><div style={{fontSize:18,fontWeight:700,fontFamily:T.serif}}>{fmtPct(calcSell(selProduct)>0?calcProfit(selProduct)/calcSell(selProduct)*100:0)}</div></div>
            </div>
            {/* Materials table */}
            <SCard title="قائمة المواد والمكونات" count={(selProduct.materials||[]).length}>
              <table style={{width:"100%",borderCollapse:"collapse"}}>
                <thead><tr>{["المادة / المكون","الوحدة","الكمية","التكلفة / وحدة","الإجمالي",""].map(h=><th key={h} style={TH}>{h}</th>)}</tr></thead>
                <tbody>
                  {(selProduct.materials||[]).map(m=><tr key={m.id} onMouseEnter={e=>e.currentTarget.style.background="#f9f9f9"} onMouseLeave={e=>e.currentTarget.style.background=""}><td style={{...TD,fontWeight:600}}>{m.name}</td><td style={TDm}>{m.unit}</td><td style={TDm}>{m.qty}</td><td style={TDm}>{fmtKD(m.unitCost)}</td><td style={{...TD,fontWeight:700}}>{fmtKD((m.unitCost||0)*(m.qty||0))}</td><td style={{...TD,width:30}}><button style={{background:"none",border:"none",cursor:"pointer",color:T.tx3,fontSize:16}} onClick={()=>delMaterial(m.id)}>×</button></td></tr>)}
                  {(selProduct.materials||[]).length>0&&<tr style={{background:"#f8f8f8"}}><td colSpan={4} style={{...TD,fontWeight:700,fontSize:11}}>مجموع المواد</td><td style={{...TD,fontWeight:700,color:"#1d4ed8"}}>{fmtKD((selProduct.materials||[]).reduce((s,m)=>s+(m.unitCost||0)*(m.qty||0),0))}</td><td></td></tr>}
                  {!(selProduct.materials||[]).length&&<tr><td colSpan={6}><Empty msg="لا مواد بعد — أضف مكونات المنتج"/></td></tr>}
                </tbody>
              </table>
            </SCard>
            {selProduct.notes&&<div style={{marginTop:12,padding:"10px 14px",background:T.bg2,borderRadius:8,fontSize:13,color:T.tx2}}>{selProduct.notes}</div>}
          </div>
        ):<Empty msg="اختاري منتجاً من القائمة أو أضيفي منتجاً جديداً"/>}
      </div>
    </div>

    {/* Product form */}
    {pForm&&<Modal title={pForm.id?"تعديل منتج":"منتج جديد"} onClose={()=>setPForm(null)} onSave={saveProduct} isMobile={isMobile}><Field label="اسم المنتج"><input style={inp} value={pForm.name} onChange={e=>setPForm({...pForm,name:e.target.value})} placeholder="اسم المنتج..."/></Field><Grid2><Field label="الشركة / البراند"><select style={sel} value={pForm.companyId} onChange={e=>setPForm({...pForm,companyId:e.target.value})}><option value="">اختر...</option>{cos.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}</select></Field><Field label="الفئة"><input style={inp} value={pForm.category||""} onChange={e=>setPForm({...pForm,category:e.target.value})} placeholder="عباءة، فستان..."/></Field><Field label="تكلفة العمالة (KD)"><input type="number" step="0.001" style={inp} value={pForm.labor||""} onChange={e=>setPForm({...pForm,labor:parseFloat(e.target.value)||0})}/></Field><Field label="المصاريف العامة (KD)"><input type="number" step="0.001" style={inp} value={pForm.overhead||""} onChange={e=>setPForm({...pForm,overhead:parseFloat(e.target.value)||0})}/></Field></Grid2><Field label="هامش الربح المطلوب (%)"><input type="number" style={inp} value={pForm.margin||""} onChange={e=>setPForm({...pForm,margin:parseFloat(e.target.value)||0})} placeholder="30"/></Field><Field label="ملاحظات"><textarea style={inpTxt} value={pForm.notes||""} onChange={e=>setPForm({...pForm,notes:e.target.value})}/></Field></Modal>}

    {/* Material form */}
    {mForm&&selProduct&&<Modal title="إضافة مادة / مكون" onClose={()=>setMForm(null)} onSave={addMaterial} isMobile={isMobile}><Field label="اسم المادة"><input style={inp} value={mForm.name} onChange={e=>setMForm({...mForm,name:e.target.value})} placeholder="قماش، بطانة، خيط..."/></Field><Grid2><Field label="الوحدة"><select style={sel} value={mForm.unit} onChange={e=>setMForm({...mForm,unit:e.target.value})}>{UNITS.map(u=><option key={u}>{u}</option>)}</select></Field><Field label="الكمية المطلوبة"><input type="number" style={inp} value={mForm.qty} onChange={e=>setMForm({...mForm,qty:parseFloat(e.target.value)||0})} step="0.01"/></Field></Grid2><Field label="التكلفة لكل وحدة (KD)"><input type="number" step="0.001" style={inp} value={mForm.unitCost} onChange={e=>setMForm({...mForm,unitCost:parseFloat(e.target.value)||0})}/></Field>{mForm.unitCost&&mForm.qty&&<div style={{padding:"10px 14px",background:"#ecfdf5",borderRadius:8,fontSize:13,fontWeight:700,color:"#065f46"}}>إجمالي هذه المادة: {fmtKD((mForm.unitCost||0)*(mForm.qty||0))}</div>}<Field label="ملاحظات"><input style={inp} value={mForm.notes||""} onChange={e=>setMForm({...mForm,notes:e.target.value})} placeholder="مورد، مصدر..."/></Field></Modal>}
  </div>);
}

// ════════════════════════════════════════════════════
// CALENDAR
// ════════════════════════════════════════════════════
function CalView({shared,initForm}){
  const{db,coName,addItem,delItem,cos,isMobile}=shared;
  const{cal,tasks,marketing,content}=db;
  const[form,setForm]=useState(null);
  const[curr,setCurr]=useState(()=>{const d=new Date();return{y:d.getFullYear(),m:d.getMonth()};});
  const[selDay,setSelDay]=useState(todayStr());
  const[show,setShow]=useState({cal:true,task:true,mkt:true,cnt:true});
  useEffect(()=>{if(initForm==="cal")setForm({title:"",type:"meeting",companyId:"",date:selDay,time:"",duration:60,attendees:"",notes:"",url:""});},[initForm]);
  const{y,m}=curr;
  const daysInM=new Date(y,m+1,0).getDate();
  const firstDay=new Date(y,m,1).getDay();
  const ds=d=>`${y}-${String(m+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
  const getAll=date=>{const evs=[];if(show.cal)cal.filter(e=>e.date===date).forEach(e=>evs.push({...e,_type:"cal",_color:"#eff6ff",_tc:"#1d4ed8",_icon:"📅"}));if(show.task)tasks.filter(t=>t.dueDate===date&&!t.done&&!t.parentId).forEach(t=>evs.push({...t,_type:"task",_color:"#f0fdf4",_tc:"#166534",_icon:"✓"}));if(show.mkt)marketing.filter(m=>m.date===date).forEach(m=>evs.push({...m,_type:"mkt",_color:"#fff7ed",_tc:"#c2410c",_icon:"◉"}));if(show.cnt)content.filter(c=>c.scheduledDate===date).forEach(c=>evs.push({...c,_type:"cnt",_color:"#fdf4ff",_tc:"#7e22ce",_icon:"◎"}));return evs;};
  const selEvs=getAll(selDay);
  const saveCal=()=>{if(!form?.title)return;addItem("cal",form);setForm(null);};
  return(<div style={{display:"flex",flexDirection:"column",height:"100%",overflow:"hidden"}}><ViewHeader title="الرزنامة الموحدة" action={<button style={btnPrim} onClick={()=>setForm({title:"",type:"meeting",companyId:"",date:selDay,time:"",duration:60,attendees:"",notes:"",url:""})}>+ موعد</button>}/>
  <div style={{padding:"8px 16px",borderBottom:T.b,display:"flex",gap:8,flexWrap:"wrap"}}>{[["cal","📅 مواعيد"],["task","✓ مهام"],["mkt","◉ تسويق"],["cnt","◎ محتوى"]].map(([k,l])=><button key={k} onClick={()=>setShow(p=>({...p,[k]:!p[k]}))} style={{...btnSm,background:show[k]?"#111":"transparent",color:show[k]?"#fff":T.tx2,border:show[k]?"none":"1px solid #e0e0e0"}}>{l}</button>)}</div>
  <div style={{flex:1,overflow:"hidden",display:"flex",flexDirection:isMobile?"column":"row"}}>
    <div style={{flex:1,overflowY:"auto",padding:16}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}><button style={btnSm} onClick={()=>setCurr(p=>p.m===0?{y:p.y-1,m:11}:{y:p.y,m:p.m-1})}>←</button><div style={{fontFamily:T.serif,fontStyle:"italic",fontSize:18,fontWeight:700}}>{MONTHS[m]} {y}</div><button style={btnSm} onClick={()=>setCurr(p=>p.m===11?{y:p.y+1,m:0}:{y:p.y,m:p.m+1})}>→</button></div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:1,marginBottom:1}}>{["أح","إث","ثل","أر","خم","جم","سب"].map(d=><div key={d} style={{textAlign:"center",fontSize:10,color:T.tx3,padding:"4px 0",fontWeight:700}}>{d}</div>)}</div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:2}}>{Array.from({length:firstDay}).map((_,i)=><div key={"e"+i} style={{minHeight:60,background:T.bg3,borderRadius:4}}/>)}{Array.from({length:daysInM}).map((_,i)=>{const d=i+1,date=ds(d);const evs=getAll(date);const isT=date===todayStr(),isSel=date===selDay;return <div key={d} onClick={()=>setSelDay(date)} style={{minHeight:60,background:isSel?"#111":isT?"#f5f5f5":T.bg2,borderRadius:6,padding:"5px 6px",cursor:"pointer",border:isSel?"1px solid #111":T.b}} onMouseEnter={e=>{if(!isSel)e.currentTarget.style.borderColor="#bbb";}} onMouseLeave={e=>{if(!isSel)e.currentTarget.style.borderColor="#eaeaea";}}><div style={{fontSize:12,fontWeight:isT||isSel?700:400,color:isSel?"#fff":isT?T.tx:T.tx2,marginBottom:3}}>{d}</div>{evs.slice(0,2).map((e,ei)=><div key={ei} style={{fontSize:9,background:isSel?"rgba(255,255,255,.2)":e._color,color:isSel?"#fff":e._tc,borderRadius:3,padding:"1px 4px",marginBottom:1,overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis"}}>{e._icon} {e.title}</div>)}{evs.length>2&&<div style={{fontSize:8,color:isSel?"rgba(255,255,255,.6)":T.tx3}}>+{evs.length-2}</div>}</div>;})}</div>
    </div>
    <div style={{width:isMobile?"auto":230,borderRight:isMobile?"none":T.b,borderTop:isMobile?T.b:"none",padding:14,overflowY:"auto",flexShrink:0,maxHeight:isMobile?200:"auto"}}>
      <div style={{fontFamily:T.serif,fontStyle:"italic",fontSize:14,fontWeight:700,marginBottom:12}}>{new Date(selDay+"T12:00").toLocaleDateString("ar-KW",{weekday:"long",day:"numeric",month:"long"})}</div>
      {selEvs.length?selEvs.map((e,i)=><div key={i} style={{border:T.b,borderRadius:8,padding:10,marginBottom:8}}><div style={{display:"flex",gap:6,alignItems:"flex-start"}}><span style={{fontSize:14}}>{e._icon}</span><div style={{flex:1}}><div style={{fontSize:12,fontWeight:700}}>{e.title}</div>{e.time&&<div style={{fontSize:11,color:T.tx3}}>{e.time}</div>}{e.companyId&&<div style={{fontSize:11,color:T.tx3}}>{coName(e.companyId)}</div>}</div>{e._type==="cal"&&<button style={{background:"none",border:"none",cursor:"pointer",color:T.tx3,fontSize:14}} onClick={()=>delItem("cal",e.id)}>×</button>}</div></div>):<div style={{color:T.tx3,fontSize:12,textAlign:"center",marginTop:20}}>لا أحداث</div>}
      <button style={{...btn,width:"100%",justifyContent:"center",marginTop:10}} onClick={()=>setForm({title:"",type:"meeting",companyId:"",date:selDay,time:"",duration:60,attendees:"",notes:"",url:""})}>+ موعد جديد</button>
    </div>
  </div>
  {form&&<Modal title="موعد جديد" onClose={()=>setForm(null)} onSave={saveCal} isMobile={isMobile}><Field label="العنوان"><input style={inp} value={form.title} onChange={e=>setForm({...form,title:e.target.value})} placeholder="عنوان الموعد..."/></Field><Grid2><Field label="النوع"><select style={sel} value={form.type} onChange={e=>setForm({...form,type:e.target.value})}>{["meeting","appointment","call","event","other"].map(t=><option key={t}>{t}</option>)}</select></Field><Field label="الشركة"><select style={sel} value={form.companyId} onChange={e=>setForm({...form,companyId:e.target.value})}><option value="">اختر...</option>{cos.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}</select></Field><Field label="التاريخ"><input type="date" style={inp} value={form.date} onChange={e=>setForm({...form,date:e.target.value})}/></Field><Field label="الوقت"><input type="time" style={inp} value={form.time} onChange={e=>setForm({...form,time:e.target.value})}/></Field></Grid2><Field label="الحضور"><input style={inp} value={form.attendees||""} onChange={e=>setForm({...form,attendees:e.target.value})} placeholder="أسماء الحضور..."/></Field><Field label="رابط (Zoom, Meet...)"><input style={inp} value={form.url||""} onChange={e=>setForm({...form,url:e.target.value})} placeholder="https://..."/></Field><Field label="ملاحظات"><textarea style={inpTxt} value={form.notes||""} onChange={e=>setForm({...form,notes:e.target.value})}/></Field></Modal>}
  </div>);
}

// ════════════════════════════════════════════════════
// CRM
// ════════════════════════════════════════════════════
function CrmView({shared,initForm}){
  const{db,coName,addItem,delItem,updItem,cos,isMobile}=shared;
  const{crm}=db;
  const[form,setForm]=useState(null);
  const[typeF,setTypeF]=useState("");
  const[srch,setSearch]=useState("");
  const TYPES=["client","customer","influencer","collaboration","photographer","other"];
  const TYPE_AR={client:"عميل",customer:"زبون",influencer:"مؤثر",collaboration:"تعاون",photographer:"مصور",other:"أخرى"};
  useEffect(()=>{if(initForm==="crm")setForm({name:"",type:"client",companyId:"",email:"",phone:"",instagram:"",status:"active",notes:"",url:""});},[initForm]);
  const fC=crm.filter(c=>(!typeF||c.type===typeF)&&(!srch||c.name?.toLowerCase().includes(srch.toLowerCase())||c.instagram?.toLowerCase().includes(srch.toLowerCase())));
  const save=()=>{if(!form?.name)return;if(form.id)updItem("crm",form.id,form);else addItem("crm",form);setForm(null);};
  return(<div style={{display:"flex",flexDirection:"column",height:"100%",overflow:"hidden"}}><ViewHeader title="CRM" sub="العملاء، الزبائن، المؤثرين، التعاونات، المصورين" action={<button style={btnPrim} onClick={()=>setForm({name:"",type:"client",companyId:"",email:"",phone:"",instagram:"",status:"active",notes:"",url:""})}>+ إضافة</button>}/>
  <div style={{padding:"10px 16px",borderBottom:T.b,display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}}><input style={{...inpSm,width:160}} placeholder="🔍 بحث..." value={srch} onChange={e=>setSearch(e.target.value)}/><div style={{display:"flex",gap:4,flexWrap:"wrap"}}><button onClick={()=>setTypeF("")} style={{...btnSm,background:!typeF?"#111":"transparent",color:!typeF?"#fff":T.tx2,border:!typeF?"none":"1px solid #e0e0e0"}}>الكل</button>{TYPES.map(t=><button key={t} onClick={()=>setTypeF(t)} style={{...btnSm,background:typeF===t?"#111":"transparent",color:typeF===t?"#fff":T.tx2,border:typeF===t?"none":"1px solid #e0e0e0"}}>{TYPE_AR[t]} ({crm.filter(c=>c.type===t).length})</button>)}</div></div>
  <div style={{flex:1,overflowY:"auto",padding:16}}><div style={{border:T.b,borderRadius:10,overflow:"hidden"}}><table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr>{["الاسم","النوع","الشركة","@Instagram","الهاتف","الحالة",""].map(h=><th key={h} style={TH}>{h}</th>)}</tr></thead><tbody>{fC.length?fC.map(c=><tr key={c.id} onMouseEnter={e=>e.currentTarget.style.background="#f9f9f9"} onMouseLeave={e=>e.currentTarget.style.background=""}><td style={{...TD,fontWeight:700,cursor:"pointer"}} onClick={()=>setForm({...c})}>{c.name}{c.url&&<a href={c.url} target="_blank" rel="noreferrer" onClick={e=>e.stopPropagation()} style={{marginRight:6,fontSize:11,color:"#1d4ed8"}}>🔗</a>}</td><td style={TD}><Badge v={c.type} label={TYPE_AR[c.type]}/></td><td style={TDm}>{coName(c.companyId)}</td><td style={TDm}>{c.instagram?`@${c.instagram.replace("@","")}`:""}</td><td style={TDm}>{c.phone||"—"}</td><td style={TD}><Badge v={c.status||"active"} label={c.status==="inactive"?"غير نشط":"نشط"}/></td><td style={{...TD,width:30}}><button style={{background:"none",border:"none",cursor:"pointer",color:T.tx3,fontSize:16}} onClick={()=>delItem("crm",c.id)}>×</button></td></tr>):<tr><td colSpan={7}><Empty/></td></tr>}</tbody></table></div></div>
  {form&&<Modal title={form.id?"تعديل جهة اتصال":"جهة اتصال جديدة"} onClose={()=>setForm(null)} onSave={save} isMobile={isMobile}><Field label="الاسم"><input style={inp} value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="الاسم الكامل..."/></Field><Grid2><Field label="النوع"><select style={sel} value={form.type} onChange={e=>setForm({...form,type:e.target.value})}>{TYPES.map(t=><option key={t} value={t}>{TYPE_AR[t]}</option>)}</select></Field><Field label="الشركة"><select style={sel} value={form.companyId} onChange={e=>setForm({...form,companyId:e.target.value})}><option value="">اختر...</option>{cos.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}</select></Field><Field label="Instagram"><input style={inp} value={form.instagram||""} onChange={e=>setForm({...form,instagram:e.target.value})} placeholder="@handle"/></Field><Field label="الهاتف"><input style={inp} value={form.phone||""} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="+965..."/></Field></Grid2><Field label="الإيميل"><input style={inp} value={form.email||""} onChange={e=>setForm({...form,email:e.target.value})} placeholder="email@..."/></Field><Field label="الموقع / رابط"><input style={inp} value={form.url||""} onChange={e=>setForm({...form,url:e.target.value})} placeholder="https://..."/></Field><Field label="الحالة"><select style={sel} value={form.status||"active"} onChange={e=>setForm({...form,status:e.target.value})}><option value="active">نشط</option><option value="inactive">غير نشط</option></select></Field><Field label="ملاحظات"><textarea style={inpTxt} value={form.notes||""} onChange={e=>setForm({...form,notes:e.target.value})}/></Field></Modal>}
  </div>);
}

// ════════════════════════════════════════════════════
// BUSINESS PLAN — خطة الأعمال الكاملة
// ════════════════════════════════════════════════════
const BIZ_PLANS = [
  {
    coId:"c1", name:"Wadha Al-Sanad", icon:"◈",
    status:"active", phase:"المرحلة الأولى — التأسيس",
    vision:"بناء مظلة براند شخصي تجمع كل المشاريع تحتها — أنتِ الأساس والمشاريع فروع",
    mission:"خبيرة صناعة الموضا الخليجية المتواجدة منذ 2009 — تُعلّم، تستشير، تُبدع، وتبني",
    positioning:"المرجع الأول في السوق الكويتي والخليجي لقطاع العباءات والموضا المحتشمة",
    channels:["TikTok @wadhaalsanad — المنصة الرئيسية","Snapchat — المنصة الرئيسية الثانية","Instagram @wadhaofficial — البراند الشخصي"],
    strategy:"التيك توك والسناب شات يكونان منصتي البراند الشخصي — المحتوى عن الخبرة والقصة منذ 2009. كل مشروع له حساب إنستغرام خاص.",
    principle:"⚠️ القاعدة الذهبية: صفر التزامات مالية ثابتة",
    milestones:["إطلاق فعالية تعليمية مجانية مع استوديو التصوير (Fatima Al-Humaidi)","بناء محتوى قصة العودة على TikTok/Snap","توحيد الهوية البصرية عبر كل الحسابات"],
    notes:"الإحراق الوظيفي كان سببه الالتزامات المالية الثابتة — ليس العمل نفسه. حُرية الحركة هي الحماية الأساسية."
  },
  {
    coId:"c2", name:"The Stylist", icon:"✨",
    status:"active", phase:"إعادة إطلاق",
    vision:"الاسم الأول في الستايل والتوجيه الإبداعي في الكويت والخليج",
    mission:"تقديم خدمات الستايل الفردية والمؤسسية بمستوى دولي — شهادات UAL London وEsmod Paris",
    positioning:"ستايلست خبيرة بمزج الموضا الخليجية مع الأسلوب الإبداعي المعاصر",
    channels:["Instagram @wadhathestylist","TikTok @wadhaalsanad (كمحتوى)"],
    services:[
      {name:"جلسة ستايل فردية",price:"80-150 KD/ساعة"},
      {name:"تنسيق مظهر للتصوير التجاري",price:"150-250 KD"},
      {name:"التوجيه الإبداعي للبراندات",price:"حسب المشروع"},
      {name:"استشارة براند وهوية بصرية",price:"120-200 KD"},
    ],
    strategy:"البداية بالتواصل الشخصي المباشر مع العملاء القدامى — ثم الفعالية المجانية كنقطة إعادة دخول. الجلسة الواحدة تساوي أرباح عدة اشتراكات.",
    milestones:["ترتيب الـ portfolio من الأعمال السابقة","تحديد 5-10 عملاء مستهدفين للتواصل المباشر","الفعالية المجانية التعليمية مع الاستوديو"],
    notes:"المحتوى على السوشيال يُبنى بعد البداية — ليس شرطاً للبداية."
  },
  {
    coId:"c3", name:"Curated Labels", icon:"🛍️",
    status:"development", phase:"تطوير وإطلاق",
    vision:"أول ماركت بليس خليجي متخصص في العباءات يربط المصممين بالعملاء والمؤثرين",
    mission:"منصة تجمع مصممات العباءة الخليجية في مكان واحد — قيّمة، مختارة، موثوقة",
    positioning:"ماركت بليس عالي الجودة — ليس كل شيء، بل المختار المتميز",
    channels:["Instagram @abayadistrictkw → Curated Labels","Shopify Store (شبه جاهز)"],
    strategy:"تحويل @abayadistrictkw إلى Curated Labels مع بناء قصة الانتقال. Shopify الحالي هو الخطوة الأولى نحو الماركت بليس الكبير. الإطلاق يكون بعد تثبيت النموذج.",
    milestones:["إكمال Shopify وإطلاقه","تحويل اسم @abayadistrictkw","تجنيد أول 5-10 مصممات","بناء قصة الانتقال من Abaya District"],
    notes:"من Abaya District (أُغلق منتصف 2025) إلى Curated Labels — القصة هي نفسها الأصل. المخزون الحالي يبدأ به."
  },
  {
    coId:"c4", name:"Abaya Talk", icon:"🎙️",
    status:"planning", phase:"إعادة إطلاق البودكاست",
    vision:"البودكاست العربي الأول المتخصص في صناعة العباءات وريادة الأعمال في الموضا الخليجية",
    mission:"إعادة إحياء Let's Talk Abaya (أُطلق 2018) بشكل جديد ومتجدد",
    channels:["@letstalkabaya","Spotify / Apple Podcasts","YouTube"],
    strategy:"محتوى يُبث عبر قنوات البودكاست المعتادة + مقاطع على التيك توك والإنستغرام. يُعزز مكانة وضحى كمرجع في الصناعة.",
    milestones:["تحديد شكل الحلقات الجديدة","أول ثلاث حلقات كبداية","ربطه بالفعالية التعليمية"],
    notes:"البودكاست يبني مكانة طويلة الأمد — ليس بالضرورة دخلاً مباشراً فوراً."
  },
  {
    coId:"c5", name:"Abaya Pop Up", icon:"🏪",
    status:"planning", phase:"تخطيط",
    vision:"تنظيم أكبر وأفضل معارض عباءات في الكويت والخليج",
    mission:"إعادة الريادة في معارض العباءات — وضحى كانت أول من نظّم هذا النوع في الكويت",
    channels:["@abayapopupexpo (مؤقتاً يُستخدم لـ Atelier OS)"],
    strategy:"الحساب يُستخدم مؤقتاً للترويج لـ Atelier OS. المعرض القادم يُخطط له عندما تتوفر الموارد والوقت.",
    milestones:["تحديد موعد المعرض القادم","تجنيد المصممات المشاركات","التخطيط اللوجستي"],
    notes:"خبرة سابقة كبيرة في التنظيم — هذا المشروع لا يحتاج تعلماً من الصفر."
  },
  {
    coId:"c6", name:"Styling the Brands", icon:"◎",
    status:"active", phase:"نشط",
    vision:"الشريك الاستراتيجي للشركات الكبرى في تطوير هويتها البصرية",
    mission:"استشارات الستايل والهوية البصرية للشركات والبراندات الكويتية والخليجية",
    channels:["B2B — علاقات مباشرة","LinkedIn","Instagram @wadhathestylist"],
    services:[
      {name:"تطوير الهوية البصرية للبراند",price:"2,000-8,000 KD"},
      {name:"إدارة جلسات التصوير التجاري",price:"500-2,000 KD/جلسة"},
      {name:"استشارة هوية بصرية",price:"150-300 KD"},
    ],
    strategy:"الشركات الكويتية الكبرى هي الهدف الأمثل — دخل أعلى وعقد واضح. استهداف شركات المنطقة تدريجياً.",
    milestones:["قائمة بالشركات المستهدفة","عروض تقديمية احترافية","شبكة علاقات قديمة للتفعيل"],
    notes:"أعلى دخل بأقل عدد عملاء — مثالي لمبدأ صفر الالتزامات."
  },
  {
    coId:"c7", name:"Beyond Pattern", icon:"🎙",
    status:"planning", phase:"تخطيط أولي",
    vision:"بودكاست يتجاوز حدود الموضا إلى ريادة الأعمال والإبداع",
    mission:"محتوى صوتي لرائدات الأعمال الخليجيات في قطاع الإبداع والأزياء",
    channels:["Podcast platforms","Instagram @beyond_pattern"],
    strategy:"يُطلق بعد استقرار Abaya Talk — يكمله ولا يتعارض معه.",
    milestones:["تحديد الزاوية المختلفة عن Abaya Talk","التخطيط للحلقات الأولى"],
    notes:"مشروع مستقبلي — الأولوية لـ Abaya Talk أولاً."
  },
  {
    coId:"c8", name:"Atelier OS", icon:"💻",
    status:"validation", phase:"التحقق والتطوير",
    vision:"نظام تشغيل رقمي متكامل لمصممي الأزياء الخليجيين",
    mission:"أداة SaaS تساعد أصحاب براندات العباءات على إدارة أعمالهم بكفاءة — البروفايل، المالية، المحتوى، العملاء",
    positioning:"Notion للمصممين الخليجيين — سهل، عربي، ومصمم لاحتياجاتهم",
    channels:["@abayapopupexpo (مؤقتاً للترويج)","Instagram جديد عند الإطلاق"],
    strategy:"التحقق من الفكرة عبر Notion MVP قبل أي استثمار تقني. التحدث مع مصممات حقيقيات. جمهور @abayapopupexpo نقطة البداية.",
    milestones:["اختبار الـ Notion MVP مع 5-10 مصممات","جمع الـ feedback","تحديد ميزات الإصدار الأول"],
    notes:"هذا النظام الذي تبنينه الآن هو Atelier OS نفسه تقريباً — اختبريه على نفسك أولاً."
  },
  {
    coId:"c9", name:"Consulting Room", icon:"💼",
    status:"active", phase:"نشط — عميل حالي: LILI Abaya",
    vision:"مرجع الاستشارات الأول في صناعة الموضا الخليجية",
    mission:"تطوير الأعمال الاستراتيجية لبراندات العباءات والموضا بخبرة 16+ سنة",
    services:[
      {name:"جلسة Discovery",price:"150-250 KD"},
      {name:"استشارة بالساعة",price:"80-150 KD/ساعة"},
      {name:"مشروع متكامل",price:"1,200-12,000 KD"},
      {name:"Retainer شهري",price:"700-1,800 KD/شهر"},
    ],
    framework:["المرحلة 1: Discovery — فهم الوضع الحالي","المرحلة 2: التشخيص — تحليل البيانات","المرحلة 3: الاستراتيجية — الخطة المقترحة","المرحلة 4: التنفيذ — خطوات عملية","المرحلة 5: المتابعة — قياس النتائج","المرحلة 6: التقييم والتطوير"],
    positioning:"Modest Fashion Business Consultant — خبيرة صناعة العباءة والموضا الخليجية",
    strategy:"العملاء من براندات العباءات الجادة والشركات الكبرى — ليس المبتدئين فقط.",
    milestones:["استمرار عمل LILI Abaya","توثيق نتائج ملموسة","بناء قائمة انتظار العملاء"],
    notes:"16+ سنة خبرة + عمل مع شركات كويتية كبرى = تسعير متميز مبرر ومستحق."
  }
];

function BizPlanView({shared}){
  const{cos,isMobile}=shared;
  const[plans,setPlans]=useDB("wbos3_bizplans", BIZ_PLANS);
  const[selPlan,setSelPlan]=useState("c1");
  const[editing,setEditing]=useState(false);
  const[draft,setDraft]=useState(null);

  const plan=(plans||BIZ_PLANS).find(p=>p.coId===selPlan)||(plans||BIZ_PLANS)[0];

  const startEdit=()=>{ setDraft(JSON.parse(JSON.stringify(plan))); setEditing(true); };
  const cancelEdit=()=>{ setEditing(false); setDraft(null); };
  const saveEdit=()=>{
    setPlans(prev=>(prev||BIZ_PLANS).map(p=>p.coId===selPlan?{...draft}:p));
    setEditing(false); setDraft(null);
  };

  // Array field helpers
  const addItem=(field)=>setDraft(d=>({...d,[field]:[...(d[field]||[]),"جديد"]}));
  const updItem=(field,i,val)=>setDraft(d=>{const a=[...(d[field]||[])];a[i]=val;return{...d,[field]:a};});
  const delItem=(field,i)=>setDraft(d=>({...d,[field]:(d[field]||[]).filter((_,idx)=>idx!==i)}));

  // Service helpers
  const addSvc=()=>setDraft(d=>({...d,services:[...(d.services||[]),{name:"",price:""}]}));
  const updSvc=(i,k,v)=>setDraft(d=>{const a=[...(d.services||[])];a[i]={...a[i],[k]:v};return{...d,services:a};});
  const delSvc=(i)=>setDraft(d=>({...d,services:(d.services||[]).filter((_,idx)=>idx!==i)}));

  const statusColors={active:{bg:"#ecfdf5",c:"#065f46",l:"نشط"},planning:{bg:"#f9fafb",c:"#6b7280",l:"تخطيط"},development:{bg:"#fff7ed",c:"#c2410c",l:"تطوير"},validation:{bg:"#fdf4ff",c:"#7e22ce",l:"تحقق"}};

  const EditText=({label,field,multiline})=>(
    <div style={{display:"flex",flexDirection:"column",gap:4,marginBottom:12}}>
      <span style={{fontSize:10,color:T.tx3,fontWeight:700,letterSpacing:.4}}>{label}</span>
      {multiline
        ? <textarea style={{...inpTxt,height:80,fontSize:13}} value={draft[field]||""} onChange={e=>setDraft(d=>({...d,[field]:e.target.value}))}/>
        : <input style={{...inp,fontSize:13}} value={draft[field]||""} onChange={e=>setDraft(d=>({...d,[field]:e.target.value}))}/>
      }
    </div>
  );

  const EditStatus=()=>(
    <div style={{display:"flex",flexDirection:"column",gap:4,marginBottom:12}}>
      <span style={{fontSize:10,color:T.tx3,fontWeight:700,letterSpacing:.4}}>الحالة</span>
      <select style={selSm} value={draft.status} onChange={e=>setDraft(d=>({...d,status:e.target.value}))}>
        {Object.entries(statusColors).map(([k,v])=><option key={k} value={k}>{v.l}</option>)}
      </select>
    </div>
  );

  const EditList=({label,field})=>(
    <div style={{marginBottom:12}}>
      <div style={{fontSize:10,color:T.tx3,fontWeight:700,letterSpacing:.4,marginBottom:6}}>{label}</div>
      {(draft[field]||[]).map((item,i)=>(
        <div key={i} style={{display:"flex",gap:6,marginBottom:6}}>
          <input style={{...inp,flex:1,height:36,fontSize:12}} value={item} onChange={e=>updItem(field,i,e.target.value)}/>
          <button onClick={()=>delItem(field,i)} style={{...btnSm,border:"none",color:T.tx3,padding:"0 10px"}}>×</button>
        </div>
      ))}
      <button onClick={()=>addItem(field)} style={{...btnSm,fontSize:11,color:T.tx3}}>+ إضافة</button>
    </div>
  );

  return(<div style={{display:"flex",flexDirection:"column",height:"100%",overflow:"hidden"}}>
    <ViewHeader title="📋 خطة الأعمال" sub="اضغطي تعديل لتخصيص أي قسم"/>
    <div style={{padding:"10px 16px",borderBottom:T.b,overflowX:"auto"}}>
      <div style={{display:"flex",gap:6,minWidth:"max-content"}}>
        {(plans||BIZ_PLANS).map(p=><button key={p.coId} onClick={()=>{setSelPlan(p.coId);setEditing(false);setDraft(null);}} style={{...btnSm,background:selPlan===p.coId?"#111":"transparent",color:selPlan===p.coId?"#fff":T.tx2,border:selPlan===p.coId?"none":"1px solid #e0e0e0"}}>{p.icon} {p.name}</button>)}
      </div>
    </div>
    <div style={{flex:1,overflowY:"auto",padding:20}}>

      {/* Header */}
      <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:20,gap:12}}>
        <div>
          <div style={{fontFamily:T.serif,fontStyle:"italic",fontSize:22,fontWeight:700,marginBottom:4}}>{plan.icon} {plan.name}</div>
          <div style={{fontSize:12,color:T.tx3}}>{plan.phase}</div>
        </div>
        <div style={{display:"flex",gap:8,alignItems:"center",flexShrink:0}}>
          {(()=>{const sc=statusColors[plan.status]||statusColors.planning;return <span style={{fontSize:11,padding:"4px 12px",borderRadius:20,background:sc.bg,color:sc.c,fontWeight:700}}>{sc.l}</span>;})()}
          {editing
            ? <><button onClick={cancelEdit} style={btnSm}>إلغاء</button><button onClick={saveEdit} style={btnPrimSm}>حفظ</button></>
            : <button onClick={startEdit} style={btnSm}>✏️ تعديل</button>
          }
        </div>
      </div>

      {/* EDIT MODE */}
      {editing && draft && (
        <div style={{border:"1px solid #bfdbfe",borderRadius:12,padding:18,background:"#f0f7ff",marginBottom:20}}>
          <div style={{fontSize:12,fontWeight:700,color:"#1d4ed8",marginBottom:14}}>✏️ وضع التعديل</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            <div><EditText label="اسم المشروع" field="name"/></div>
            <div><EditStatus/></div>
          </div>
          <EditText label="الرمز (emoji)" field="icon"/>
          <EditText label="المرحلة الحالية" field="phase"/>
          <EditText label="الرؤية" field="vision" multiline/>
          <EditText label="المهمة" field="mission" multiline/>
          <EditText label="الموقع التنافسي" field="positioning"/>
          <EditText label="الاستراتيجية" field="strategy" multiline/>
          <EditText label="القاعدة الذهبية / تنبيه مهم" field="principle"/>
          <EditText label="ملاحظات" field="notes" multiline/>
          <EditList label="القنوات" field="channels"/>
          <EditList label="المحطات القادمة" field="milestones"/>
          <EditList label="إطار العمل / المراحل" field="framework"/>
          {/* Services */}
          <div style={{marginBottom:12}}>
            <div style={{fontSize:10,color:T.tx3,fontWeight:700,letterSpacing:.4,marginBottom:6}}>الخدمات والأسعار</div>
            {(draft.services||[]).map((s,i)=>(
              <div key={i} style={{display:"flex",gap:6,marginBottom:6}}>
                <input style={{...inp,flex:2,height:36,fontSize:12}} value={s.name} onChange={e=>updSvc(i,"name",e.target.value)} placeholder="اسم الخدمة"/>
                <input style={{...inp,flex:1,height:36,fontSize:12}} value={s.price} onChange={e=>updSvc(i,"price",e.target.value)} placeholder="السعر"/>
                <button onClick={()=>delSvc(i)} style={{...btnSm,border:"none",color:T.tx3,padding:"0 10px"}}>×</button>
              </div>
            ))}
            <button onClick={addSvc} style={{...btnSm,fontSize:11,color:T.tx3}}>+ خدمة</button>
          </div>
          <div style={{display:"flex",gap:8,justifyContent:"flex-end",paddingTop:12,borderTop:T.b,marginTop:4}}>
            <button onClick={cancelEdit} style={btn}>إلغاء</button>
            <button onClick={saveEdit} style={btnPrim}>حفظ التعديلات</button>
          </div>
        </div>
      )}

      {/* VIEW MODE */}
      {!editing && (<>
        {/* Vision + Mission */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:16}}>
          <div style={{background:T.bg2,border:T.b,borderRadius:10,padding:14}}><div style={{fontSize:10,color:T.tx3,fontWeight:700,letterSpacing:.5,marginBottom:8}}>الرؤية</div><div style={{fontSize:13,lineHeight:1.6}}>{plan.vision}</div></div>
          <div style={{background:T.bg2,border:T.b,borderRadius:10,padding:14}}><div style={{fontSize:10,color:T.tx3,fontWeight:700,letterSpacing:.5,marginBottom:8}}>المهمة</div><div style={{fontSize:13,lineHeight:1.6}}>{plan.mission}</div></div>
        </div>
        {plan.positioning&&<div style={{background:"#f0f7ff",border:"1px solid #bfdbfe",borderRadius:10,padding:14,marginBottom:16}}><div style={{fontSize:10,color:"#1d4ed8",fontWeight:700,marginBottom:6}}>الموقع التنافسي</div><div style={{fontSize:13,color:"#1d4ed8",fontWeight:600}}>{plan.positioning}</div></div>}
        {plan.principle&&<div style={{background:"#fef2f2",border:"1px solid #fecaca",borderRadius:10,padding:14,marginBottom:16}}><div style={{fontSize:13,fontWeight:700,color:"#991b1b"}}>{plan.principle}</div></div>}
        <div style={{border:T.b,borderRadius:10,padding:14,marginBottom:16}}><div style={{fontSize:10,color:T.tx3,fontWeight:700,letterSpacing:.5,marginBottom:8}}>الاستراتيجية</div><div style={{fontSize:13,lineHeight:1.8}}>{plan.strategy}</div></div>
        {plan.services&&<div style={{marginBottom:16}}><div style={{fontSize:10,color:T.tx3,fontWeight:700,letterSpacing:.5,marginBottom:8}}>الخدمات والأسعار</div><div style={{border:T.b,borderRadius:10,overflow:"hidden"}}><table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr><th style={TH}>الخدمة</th><th style={TH}>السعر</th></tr></thead><tbody>{plan.services.map((s,i)=><tr key={i}><td style={{...TD,fontWeight:600}}>{s.name}</td><td style={{...TD,color:"#065f46",fontWeight:700}}>{s.price}</td></tr>)}</tbody></table></div></div>}
        {plan.framework&&<div style={{marginBottom:16}}><div style={{fontSize:10,color:T.tx3,fontWeight:700,letterSpacing:.5,marginBottom:8}}>إطار العمل — {plan.framework.length} مراحل</div><div style={{display:"flex",flexDirection:"column",gap:6}}>{plan.framework.map((f,i)=><div key={i} style={{display:"flex",gap:10,alignItems:"flex-start",padding:"8px 12px",background:T.bg2,borderRadius:8}}><span style={{fontSize:12,fontWeight:700,color:T.tx3,minWidth:20}}>{i+1}</span><span style={{fontSize:13}}>{f}</span></div>)}</div></div>}
        {plan.channels&&<div style={{marginBottom:16}}><div style={{fontSize:10,color:T.tx3,fontWeight:700,letterSpacing:.5,marginBottom:8}}>القنوات</div><div style={{display:"flex",gap:8,flexWrap:"wrap"}}>{plan.channels.map((c,i)=><span key={i} style={{fontSize:12,padding:"4px 12px",background:"#f0f0f0",borderRadius:20}}>{c}</span>)}</div></div>}
        {plan.milestones&&<div style={{marginBottom:16}}><div style={{fontSize:10,color:T.tx3,fontWeight:700,letterSpacing:.5,marginBottom:8}}>المحطات القادمة</div><div style={{display:"flex",flexDirection:"column",gap:6}}>{plan.milestones.map((m,i)=><div key={i} style={{display:"flex",gap:10,alignItems:"flex-start",padding:"8px 12px",border:T.b,borderRadius:8}}><span style={{color:"#065f46",fontWeight:700}}>◎</span><span style={{fontSize:13}}>{m}</span></div>)}</div></div>}
        {plan.notes&&<div style={{background:"#fffbeb",border:"1px solid #fef08a",borderRadius:10,padding:14}}><div style={{fontSize:10,color:"#92400e",fontWeight:700,marginBottom:6}}>ملاحظات مهمة</div><div style={{fontSize:13,color:"#92400e",lineHeight:1.6}}>{plan.notes}</div></div>}
      </>)}
    </div>
  </div>);
}

// ════════════════════════════════════════════════════
// ROADMAP — خارطة الطريق الكاملة (7 مشاريع)
// ════════════════════════════════════════════════════
const ROADMAP_PROJECTS = [
  {
    id:"proj1", name:"The Stylist", subtitle:"Designer's Closet — الانطلاقة مع فاطمة", icon:"✨",
    color:"#fffbeb", border:"#fde68a", tc:"#92400e", priority:"عاجل",
    note:"هذا أول مشروع — يُطلق المحتوى ويبني الحضور قبل كل شيء",
    phases:[
      { id:"ph1a", title:"التنسيق مع فاطمة الحميدي", steps:[
        {id:"a1",text:"التناقش مع فاطمة الحميدي بفكرة Designer's Closet"},
        {id:"a2",text:"تحديد دور كل طرف — وضحى (ستايل + تقديم) / فاطمة (تصوير + مكان)"},
        {id:"a3",text:"الاتفاق على مشاركة المحتوى بين الحسابين"},
      ]},
      { id:"ph1b", title:"التواصل مع المصممة الأولى", steps:[
        {id:"a4",text:"اختيار المصممة الأولى للسلسلة (تعرفينها وتثق فيكِ)"},
        {id:"a5",text:"تقديم الفكرة: مجانية، تفيدنا كلنا، محتوى جديد في سوق العباءات"},
        {id:"a6",text:"الاتفاق على موعد التصوير وأسلوب الستايل"},
      ]},
      { id:"ph1c", title:"التصوير والإنتاج", steps:[
        {id:"a7",text:"ترتيب المحتوى القديم وتصنيفه كأساس للحساب"},
        {id:"a8",text:"تحديد أيام التصوير مع فاطمة والمصممة"},
        {id:"a9",text:"تصوير ريل 1: لقاء مع المصممة واختيار القطع"},
        {id:"a10",text:"تصوير ريل 2: تنسيق الستايل النهائي على الموديل"},
        {id:"a11",text:"لقطات BTS للمحتوى الإضافي"},
      ]},
      { id:"ph1d", title:"النشر والانطلاق", steps:[
        {id:"a12",text:"جدولة المحتوى على @wadhathe_stylist"},
        {id:"a13",text:"نشر ريل 1 مع تاق المصممة"},
        {id:"a14",text:"نشر ريل 2 بعد 2-3 أيام"},
        {id:"a15",text:"التواصل مع مصممات أخريات لحلقات قادمة"},
      ]},
    ]
  },
  {
    id:"proj2", name:"Wadha Al Sanad", subtitle:"براند العباءات — Shopify + المتجر", icon:"👗",
    color:"#fdf4ff", border:"#e9d5ff", tc:"#7e22ce", priority:"عاجل",
    note:"المخزون موجود والـ Shopify شبه جاهز — فقط ترتيب وإطلاق",
    phases:[
      { id:"ph2a", title:"الترتيبات المالية", steps:[
        {id:"b1",text:"فتح / ربط الحساب البنكي للشركة"},
        {id:"b2",text:"اختيار بوابة دفع (KNET / فيزا / MyFatoorah)"},
      ]},
      { id:"ph2b", title:"تجهيز المنتجات", steps:[
        {id:"b3",text:"ترتيب وتصنيف المخزون الحالي"},
        {id:"b4",text:"تصوير المنتجات للموقع (تنسق أنتِ — فاطمة تصور)"},
        {id:"b5",text:"كتابة الأوصاف وإضافة المنتجات للـ Shopify"},
      ]},
      { id:"ph2c", title:"التوصيل والعمليات", steps:[
        {id:"b6",text:"التعاقد مع شركة توصيل"},
        {id:"b7",text:"اختبار عملية الطلب والتوصيل"},
      ]},
      { id:"ph2d", title:"الإطلاق الرسمي", steps:[
        {id:"b8",text:"مراجعة الـ Shopify كاملاً قبل الإطلاق"},
        {id:"b9",text:"إطلاق الموقع رسمياً 🚀"},
        {id:"b10",text:"حملة PR هدايا + إعلان الإطلاق على السوشيال"},
      ]},
    ]
  },
  {
    id:"proj3", name:"المحاضرة المجانية", subtitle:"مع فاطمة الحميدي — نقطة إعادة الدخول", icon:"🎙️",
    color:"#eff6ff", border:"#bfdbfe", tc:"#1d4ed8", priority:"مهم",
    note:"الهدف الحقيقي: بناء قاعدة بيانات المصممات وقاعدة العملاء",
    phases:[
      { id:"ph3a", title:"التنسيق والاتفاق", steps:[
        {id:"c1",text:"الاجتماع مع فاطمة وعرض فكرة المحاضرة كاملة"},
        {id:"c2",text:"تحديد دور كل طرف — وضحى (محتوى + تدريس) / فاطمة (مكان + تصوير)"},
        {id:"c3",text:"الاتفاق على قاعدة البيانات: مشتركة أم لكل طرف نسخته؟"},
        {id:"c4",text:"تحديد الجمهور المستهدف: مصممات؟ صاحبات براندات ناشئة؟"},
      ]},
      { id:"ph3b", title:"بناء المحتوى", steps:[
        {id:"c5",text:"تحديد موضوع المحاضرة وعنوانها"},
        {id:"c6",text:"المقترح: بناء العلامة التجارية — الإخراج الإبداعي + التصوير + البزنس"},
        {id:"c7",text:"بناء outline المحتوى التعليمي"},
        {id:"c8",text:"تجهيز المواد: slides أو ورقة عمل"},
      ]},
      { id:"ph3c", title:"اللوجستيك والتسجيل", steps:[
        {id:"c9",text:"اختيار المكان والتاريخ (بعد استقرار الأوضاع)"},
        {id:"c10",text:"تحديد عدد الأماكن المتاحة (محدودة — يزيد الإقبال)"},
        {id:"c11",text:"بناء فورم التسجيل: اسم، هاتف، إيميل، حسابات سوشيال"},
        {id:"c12",text:"إعداد نظام الباركود لكل متسجلة (النظام جاهز مسبقاً)"},
      ]},
      { id:"ph3d", title:"التسويق والدعوة", steps:[
        {id:"c13",text:"إرسال دعوات مباشرة (DM) لمصممات من قاعدة علاقاتك"},
        {id:"c14",text:"محتوى تشويقي على TikTok وSnapchat"},
        {id:"c15",text:"الإعلان الرسمي مع رابط التسجيل"},
      ]},
      { id:"ph3e", title:"يوم الفعالية", steps:[
        {id:"c16",text:"الوصول مبكراً وترتيب المكان مع فاطمة"},
        {id:"c17",text:"تفعيل نظام QR check-in للدخول"},
        {id:"c18",text:"تقديم المحتوى التعليمي"},
        {id:"c19",text:"التصوير والتوثيق الكامل (فاطمة)"},
      ]},
      { id:"ph3f", title:"ما بعد الفعالية", steps:[
        {id:"c20",text:"تنظيم قاعدة بيانات الحاضرات في CRM"},
        {id:"c21",text:"إرسال رسالة شكر خلال 24 ساعة"},
        {id:"c22",text:"نشر محتوى الفعالية — Reels وStories"},
        {id:"c23",text:"عرض الخدمات الاستشارية لمن أبدت اهتماماً"},
      ]},
    ]
  },
  {
    id:"proj4", name:"Abaya Talk", subtitle:"Let's Talk Abaya — إعادة إطلاق البودكاست", icon:"🎙",
    color:"#f0fdf4", border:"#bbf7d0", tc:"#065f46", priority:"متوسط",
    note:"أُطلق 2018 — يُعاد إطلاقه بشكل جديد لتعزيز مكانة وضحى كمرجع في الصناعة",
    phases:[
      { id:"ph4a", title:"تحديد الشكل الجديد", steps:[
        {id:"d1",text:"تحديد الزاوية الجديدة للبودكاست — ما الذي تغيّر عن 2018؟"},
        {id:"d2",text:"هل يكون منفردة أم مع ضيف دائم؟"},
        {id:"d3",text:"تحديد طول الحلقة ووتيرة النشر"},
      ]},
      { id:"ph4b", title:"الإنتاج والتحضير", steps:[
        {id:"d4",text:"تسجيل 3 حلقات أولى قبل الإطلاق (تحمي من الانقطاع)"},
        {id:"d5",text:"الترتيب التقني: المايك، الصوت، المنصات"},
        {id:"d6",text:"تجهيز حساب @letstalkabaya"},
      ]},
      { id:"ph4c", title:"الإطلاق والنمو", steps:[
        {id:"d7",text:"إطلاق الحلقة الأولى مع تشويق مسبق"},
        {id:"d8",text:"مقاطع قصيرة من الحلقات على TikTok وInstagram"},
        {id:"d9",text:"ربط البودكاست بالمحاضرة المجانية كمحتوى تعليمي"},
      ]},
    ]
  },
  {
    id:"proj5", name:"مبادرة PR الهدايا", subtitle:"توقيت الأعياد — بناء العلاقات", icon:"🎁",
    color:"#fdf2f8", border:"#f0abfc", tc:"#9d174d", priority:"موسمي",
    note:"تُطلق مع الأعياد — صفر تكلفة ثابتة، أثر كبير على العلاقات",
    phases:[
      { id:"ph5a", title:"التخطيط", steps:[
        {id:"e1",text:"تحديد قائمة المستهدفين: مصممات، مؤثرات، عملاء محتملين"},
        {id:"e2",text:"تحديد الميزانية لكل هدية والمجموع الكلي"},
        {id:"e3",text:"تحديد موعد الإرسال المناسب (قبل العيد بأسبوع)"},
      ]},
      { id:"ph5b", title:"التنفيذ", steps:[
        {id:"e4",text:"اختيار الهدايا وتجهيزها (عباءة / منتج مختار / بطاقة شخصية)"},
        {id:"e5",text:"كتابة رسالة شخصية لكل شخص"},
        {id:"e6",text:"الإرسال والتوثيق"},
      ]},
      { id:"ph5c", title:"المتابعة", steps:[
        {id:"e7",text:"رصد ردود الفعل والشكر"},
        {id:"e8",text:"محتوى عن المبادرة على السوشيال (بإذن المستلمين)"},
        {id:"e9",text:"بناء قاعدة بيانات PR للدورة القادمة"},
      ]},
    ]
  },
  {
    id:"proj6", name:"بودكاست + ماركت بليس", subtitle:"تعاون المصممات — Curated Labels", icon:"🛍️",
    color:"#fff7ed", border:"#fed7aa", tc:"#c2410c", priority:"تطوير",
    note:"يبدأ كبودكاست مع مصممات، يتطور إلى ماركت بليس — بناء صامت ومتدرج",
    phases:[
      { id:"ph6a", title:"مرحلة البودكاست مع المصممات", steps:[
        {id:"f1",text:"تحديد المصممات المستهدفات للمشاركة في البودكاست"},
        {id:"f2",text:"بناء نموذج الشراكة: ماذا تقدم كل مصممة وماذا تأخذ"},
        {id:"f3",text:"تسجيل أول 3 حلقات مع مصممات مختلفات"},
      ]},
      { id:"ph6b", title:"تطوير Curated Labels", steps:[
        {id:"f4",text:"تحويل @abayadistrictkw إلى Curated Labels"},
        {id:"f5",text:"إكمال وإطلاق الـ Shopify كأول خطوة"},
        {id:"f6",text:"تجنيد أول 5-10 مصممات للمنصة"},
        {id:"f7",text:"بناء قصة الانتقال من Abaya District إلى Curated Labels"},
      ]},
      { id:"ph6c", title:"الماركت بليس الكامل", steps:[
        {id:"f8",text:"تحديد نموذج الإيرادات: عمولة؟ اشتراك؟ كلاهما؟"},
        {id:"f9",text:"بناء صفحة كل مصممة على المنصة"},
        {id:"f10",text:"إطلاق الماركت بليس رسمياً"},
      ]},
    ]
  },
  {
    id:"proj7", name:"Consulting Room", subtitle:"الاستشارات — عميل حالي: LILI Abaya", icon:"💼",
    color:"#ecfdf5", border:"#a7f3d0", tc:"#065f46", priority:"نشط",
    note:"دخل فوري — 16+ سنة خبرة = تسعير متميز مبرر ومستحق",
    phases:[
      { id:"ph7a", title:"العمل الحالي مع ليلي عباية", steps:[
        {id:"g1",text:"إكمال الـ Discovery Phase وتوثيق نتائجها"},
        {id:"g2",text:"تسليم الخطة التسويقية الكاملة"},
        {id:"g3",text:"متابعة تنفيذ الـ KPIs الشهرية"},
        {id:"g4",text:"مراجعة الاتفاقية والتسعير للمرحلة القادمة"},
      ]},
      { id:"ph7b", title:"بناء قائمة العملاء", steps:[
        {id:"g5",text:"توثيق نتائج ليلي عباية كـ case study"},
        {id:"g6",text:"تحديد 3-5 براندات عباءات مستهدفة للتواصل"},
        {id:"g7",text:"تطوير عرض تقديمي احترافي للاستشارات"},
        {id:"g8",text:"بناء قائمة انتظار العملاء"},
      ]},
      { id:"ph7c", title:"تطوير الخدمات", steps:[
        {id:"g9",text:"تطوير Atelier OS كأداة للعملاء (اختبار MVP على نفسك أولاً)"},
        {id:"g10",text:"إنشاء حزم استشارية جاهزة بأسعار واضحة"},
        {id:"g11",text:"بناء نموذج عقد الاستشارة المعياري"},
      ]},
    ]
  },
];

function RoadmapView({ shared }) {
  const { isMobile, roadmapChecks, setRoadmapChecks } = shared;
  const checks = roadmapChecks || {};
  const [selProj, setSelProj] = useState("proj1");
  const [addingStep, setAddingStep] = useState(null);
  const [newStepText, setNewStepText] = useState("");
  const [editingStep, setEditingStep] = useState(null);
  const [customSteps, setCustomSteps] = useState({});

  // Load custom steps from storage
  useEffect(() => {
    (async () => {
      try { const r = await window.storage.get("wbos3_roadmap_custom"); if (r) setCustomSteps(JSON.parse(r.value)); } catch(e) {}
    })();
  }, []);

  const saveCustom = (next) => {
    setCustomSteps(next);
    window.storage.set("wbos3_roadmap_custom", JSON.stringify(next)).catch(() => {});
  };

  const toggle = (stepId) => {
    setRoadmapChecks(prev => ({ ...(prev || {}), [stepId]: !(prev || {})[stepId] }));
  };

  const addStep = (phaseId) => {
    if (!newStepText.trim()) return;
    const newId = "custom_" + uid();
    const next = { ...customSteps, [phaseId]: [...(customSteps[phaseId] || []), { id: newId, text: newStepText.trim() }] };
    saveCustom(next);
    setNewStepText("");
    setAddingStep(null);
  };

  const delCustomStep = (phaseId, stepId) => {
    const next = { ...customSteps, [phaseId]: (customSteps[phaseId] || []).filter(s => s.id !== stepId) };
    saveCustom(next);
  };

  const proj = ROADMAP_PROJECTS.find(p => p.id === selProj) || ROADMAP_PROJECTS[0];

  // Count all steps for this project including custom
  const allSteps = proj.phases.flatMap(ph => [...ph.steps, ...(customSteps[ph.id] || [])]);
  const totalSteps = allSteps.length;
  const doneSteps = allSteps.filter(s => checks[s.id]).length;
  const pct = totalSteps ? Math.round(doneSteps / totalSteps * 100) : 0;

  // Global progress
  const globalAll = ROADMAP_PROJECTS.flatMap(p => p.phases.flatMap(ph => [...ph.steps, ...(customSteps[ph.id] || [])]));
  const globalDone = globalAll.filter(s => checks[s.id]).length;
  const globalPct = globalAll.length ? Math.round(globalDone / globalAll.length * 100) : 0;

  const PRIORITY_COLORS = { "عاجل": { bg: "#fef2f2", c: "#991b1b" }, "مهم": { bg: "#fff7ed", c: "#c2410c" }, "نشط": { bg: "#ecfdf5", c: "#065f46" }, "متوسط": { bg: "#eff6ff", c: "#1d4ed8" }, "تطوير": { bg: "#fdf4ff", c: "#7e22ce" }, "موسمي": { bg: "#f0fdf4", c: "#166534" } };

  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100%", overflow:"hidden" }}>
      <ViewHeader title="🗺️ خارطة الطريق" sub="7 مشاريع — من الفكرة إلى التنفيذ" />

      {/* Global progress */}
      <div style={{ padding:"12px 16px", borderBottom:T.b, background:T.bg2 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:6 }}>
          <span style={{ fontSize:11, fontWeight:700 }}>التقدم الإجمالي — كل المشاريع</span>
          <span style={{ fontSize:14, fontWeight:700, fontFamily:T.serif }}>{globalPct}% ({globalDone}/{globalAll.length})</span>
        </div>
        <div style={{ height:6, background:"#e8e8e8", borderRadius:20, overflow:"hidden" }}>
          <div style={{ height:"100%", width: globalPct + "%", background:"#111", borderRadius:20, transition:"width .4s" }} />
        </div>
      </div>

      <div style={{ flex:1, overflow:"hidden", display:"flex", flexDirection: isMobile ? "column" : "row" }}>

        {/* Projects sidebar */}
        <div style={{ width: isMobile ? "auto" : 200, borderLeft:T.b, overflowX: isMobile ? "auto" : "hidden", overflowY: isMobile ? "hidden" : "auto", flexShrink:0 }}>
          <div style={{ display: isMobile ? "flex" : "block", gap: isMobile ? 6 : 0, padding: isMobile ? "8px 12px" : "8px 0", minWidth: isMobile ? "max-content" : "auto" }}>
            {ROADMAP_PROJECTS.map(p => {
              const pAll = p.phases.flatMap(ph => [...ph.steps, ...(customSteps[ph.id] || [])]);
              const pDone = pAll.filter(s => checks[s.id]).length;
              const pc = PRIORITY_COLORS[p.priority] || { bg:"#f5f5f5", c:"#6b7280" };
              return (
                <button key={p.id} onClick={() => setSelProj(p.id)} style={{ display:"flex", alignItems:"center", gap:8, width: isMobile ? "auto" : "100%", padding: isMobile ? "8px 12px" : "10px 14px", border: isMobile ? `1px solid ${selProj === p.id ? "#111" : "#e0e0e0"}` : "none", borderRight: isMobile ? undefined : `2px solid ${selProj === p.id ? "#111" : "transparent"}`, background: selProj === p.id ? (isMobile ? "#111" : T.bg3) : "transparent", color: selProj === p.id && isMobile ? "#fff" : T.tx, cursor:"pointer", borderRadius: isMobile ? 8 : 0, fontFamily:T.sans, textAlign:"right", whiteSpace:"nowrap" }}>
                  <span style={{ fontSize:16 }}>{p.icon}</span>
                  {!isMobile && <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:11, fontWeight:700, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{p.name}</div>
                    <div style={{ fontSize:10, color:T.tx3, marginTop:1 }}>{pDone}/{pAll.length}</div>
                  </div>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Project detail */}
        <div style={{ flex:1, overflowY:"auto", padding:16 }}>

          {/* Project header */}
          <div style={{ border: `1px solid ${proj.border}`, background: proj.color, borderRadius:12, padding:14, marginBottom:16 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:6 }}>
              <div>
                <div style={{ fontSize:20, fontWeight:700, fontFamily:T.serif, fontStyle:"italic" }}>{proj.icon} {proj.name}</div>
                <div style={{ fontSize:12, color:T.tx2, marginTop:2 }}>{proj.subtitle}</div>
              </div>
              <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:4 }}>
                <span style={{ fontSize:10, padding:"2px 10px", borderRadius:20, background: PRIORITY_COLORS[proj.priority]?.bg, color: PRIORITY_COLORS[proj.priority]?.c, fontWeight:700 }}>{proj.priority}</span>
                <span style={{ fontSize:16, fontWeight:700, fontFamily:T.serif }}>{pct}%</span>
              </div>
            </div>
            {proj.note && <div style={{ fontSize:12, color:T.tx2, marginTop:8, padding:"8px 10px", background:"rgba(255,255,255,.6)", borderRadius:6 }}>💡 {proj.note}</div>}
            {/* Progress bar */}
            <div style={{ height:5, background:"rgba(0,0,0,.1)", borderRadius:20, overflow:"hidden", marginTop:10 }}>
              <div style={{ height:"100%", width: pct + "%", background:"#111", borderRadius:20, transition:"width .4s" }} />
            </div>
          </div>

          {/* Phases */}
          {proj.phases.map(phase => {
            const phaseSteps = [...phase.steps, ...(customSteps[phase.id] || [])];
            const phDone = phaseSteps.filter(s => checks[s.id]).length;
            return (
              <div key={phase.id} style={{ border:T.b, borderRadius:10, overflow:"hidden", marginBottom:12 }}>
                {/* Phase header */}
                <div style={{ padding:"10px 14px", background:T.bg2, borderBottom:T.b, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <span style={{ fontSize:12, fontWeight:700 }}>{phase.title}</span>
                  <span style={{ fontSize:11, color:T.tx3 }}>{phDone}/{phaseSteps.length}</span>
                </div>
                {/* Steps */}
                {phaseSteps.map((step, si) => {
                  const done = !!checks[step.id];
                  const isCustom = step.id.startsWith("custom_");
                  return (
                    <div key={step.id} style={{ display:"flex", alignItems:"flex-start", gap:10, padding:"10px 14px", borderBottom:"1px solid #f8f8f8", background: done ? "#fafafa" : "#fff" }}>
                      <div onClick={() => toggle(step.id)} style={{ width:20, height:20, borderRadius:5, border: done ? "none" : "2px solid #d0d0d0", background: done ? "#111" : "transparent", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:1, cursor:"pointer", transition:"all .15s" }}>
                        {done && <span style={{ color:"#fff", fontSize:11, fontWeight:700 }}>✓</span>}
                      </div>
                      <span onClick={() => toggle(step.id)} style={{ flex:1, fontSize:13, color: done ? T.tx3 : T.tx, textDecoration: done ? "line-through" : "none", cursor:"pointer", lineHeight:1.5 }}>{step.text}</span>
                      {isCustom && <button onClick={() => delCustomStep(phase.id, step.id)} style={{ background:"none", border:"none", color:T.tx3, cursor:"pointer", fontSize:14, flexShrink:0 }}>×</button>}
                    </div>
                  );
                })}
                {/* Add step */}
                {addingStep === phase.id ? (
                  <div style={{ padding:"8px 14px", borderTop:"1px solid #f0f0f0", display:"flex", gap:8 }}>
                    <input autoFocus style={{ ...inp, height:32, fontSize:12, flex:1 }} value={newStepText} onChange={e => setNewStepText(e.target.value)} onKeyDown={e => { if (e.key === "Enter") addStep(phase.id); if (e.key === "Escape") { setAddingStep(null); setNewStepText(""); } }} placeholder="نص الخطوة الجديدة..." />
                    <button onClick={() => addStep(phase.id)} style={btnPrimSm}>إضافة</button>
                    <button onClick={() => { setAddingStep(null); setNewStepText(""); }} style={btnSm}>×</button>
                  </div>
                ) : (
                  <div style={{ padding:"6px 14px" }}>
                    <button onClick={() => setAddingStep(phase.id)} style={{ ...btnSm, border:"none", background:"transparent", color:T.tx3, fontSize:11 }}>+ إضافة خطوة</button>
                  </div>
                )}
              </div>
            );
          })}

          {/* Golden rule */}
          <div style={{ background:"#fef2f2", border:"1px solid #fecaca", borderRadius:10, padding:14, marginTop:4 }}>
            <div style={{ fontSize:11, fontWeight:700, color:"#991b1b", marginBottom:4 }}>⚠️ القاعدة الذهبية</div>
            <div style={{ fontSize:13, color:"#991b1b", lineHeight:1.6 }}>صفر التزامات مالية ثابتة — كل مشروع يبدأ بدون تكاليف ثابتة. الربح يأتي من العلاقات وقاعدة البيانات اللي تبنينها.</div>
          </div>

        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════
// TIMELINE — خط سير العمل
// ════════════════════════════════════════════════════
const TIMELINE_PROJECTS = [
  { id:"proj1", coId:"c2", name:"The Stylist", subtitle:"Designer's Closet", icon:"✨", color:"#fde68a", tc:"#92400e" },
  { id:"proj2", coId:"c1", name:"Wadha Al Sanad", subtitle:"المتجر — Shopify", icon:"👗", color:"#e9d5ff", tc:"#7e22ce" },
  { id:"proj3", coId:"c2b", name:"المحاضرة المجانية", subtitle:"مع فاطمة الحميدي", icon:"🎙️", color:"#bfdbfe", tc:"#1d4ed8" },
  { id:"proj4", coId:"c4", name:"Abaya Talk", subtitle:"Let's Talk Abaya", icon:"🎙", color:"#bbf7d0", tc:"#065f46" },
  { id:"proj5", coId:"c5", name:"Abaya Pop Up", subtitle:"معارض العباءات", icon:"🏪", color:"#fecaca", tc:"#991b1b" },
  { id:"proj6", coId:"c6", name:"Styling the Brands", subtitle:"استشارات الشركات", icon:"◎", color:"#e0e7ff", tc:"#3730a3" },
  { id:"proj7", coId:"c7", name:"Beyond Pattern", subtitle:"بودكاست", icon:"🎵", color:"#fce7f3", tc:"#9d174d" },
  { id:"proj8", coId:"c8", name:"Atelier OS", subtitle:"SaaS للمصممين", icon:"💻", color:"#d1fae5", tc:"#065f46" },
  { id:"proj9", coId:"c9", name:"Consulting Room", subtitle:"LILI Abaya", icon:"💼", color:"#a7f3d0", tc:"#047857" },
];

const MONTHS_AR = ["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"];

function TimelineView({ shared }) {
  const { isMobile } = shared;
  const [dates, setDates] = useDB("wbos3_timeline_dates", {});
  const [hidden, setHidden] = useDB("wbos3_timeline_hidden", {});
  const [editRow, setEditRow] = useState(null);
  const [draftDate, setDraftDate] = useState({ start:"", end:"" });
  const [showHideMgr, setShowHideMgr] = useState(false);
  const [viewStart, setViewStart] = useState(()=>{ const d=new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}`; });

  const saveDates=(projId,start,end)=>{ setDates(prev=>({...(prev||{}),[projId]:{start,end}})); setEditRow(null); };
  const toggleHide=(projId)=>setHidden(prev=>({...(prev||{}),[projId]:!(prev||{})[projId]}));
  const visibleProjects=TIMELINE_PROJECTS.filter(p=>!(hidden||{})[p.id] && shared.cos.find(c=>c.id===p.coId)?.active !== false);
  const hiddenCount=TIMELINE_PROJECTS.filter(p=>(hidden||{})[p.id] || shared.cos.find(c=>c.id===p.coId)?.active === false).length;

  const buildMonths=()=>{ const[y,m]=viewStart.split("-").map(Number); return Array.from({length:9},(_,i)=>{ const mm=((m-1+i)%12)+1,yy=y+Math.floor((m-1+i)/12); return{y:yy,m:mm,key:`${yy}-${String(mm).padStart(2,"0")}`,label:MONTHS_AR[mm-1]}; }); };
  const months=buildMonths(),totalCols=months.length;
  const dateToPos=(dateStr)=>{ if(!dateStr)return null; const[y,m]=dateStr.split("-").map(Number),[gy,gm]=[months[0].y,months[0].m]; return(y-gy)*12+(m-gm); };
  const today=todayStr().slice(0,7),todayPos=dateToPos(today);
  const prevM=()=>{const[y,m]=viewStart.split("-").map(Number);const pm=m===1?12:m-1,py=m===1?y-1:y;setViewStart(`${py}-${String(pm).padStart(2,"0")}`);};
  const nextM=()=>{const[y,m]=viewStart.split("-").map(Number);const nm=m===12?1:m+1,ny=m===12?y+1:y;setViewStart(`${ny}-${String(nm).padStart(2,"0")}`);};
  const COL_W=isMobile?68:96,LABEL_W=isMobile?120:165;

  return(<div style={{display:"flex",flexDirection:"column",height:"100%",overflow:"hidden"}}>
    <ViewHeader title="📅 خط سير العمل" sub="Timeline — حددي تواريخ كل مشروع"
      action={<button onClick={()=>setShowHideMgr(!showHideMgr)} style={{...btnSm,position:"relative"}}>
        👁 إخفاء/إظهار {hiddenCount>0&&<span style={{position:"absolute",top:-6,left:-6,background:"#991b1b",color:"#fff",fontSize:9,borderRadius:"50%",width:16,height:16,display:"flex",alignItems:"center",justifyContent:"center"}}>{hiddenCount}</span>}
      </button>}/>
    {showHideMgr&&<div style={{padding:"12px 16px",borderBottom:T.b,background:T.bg2}}>
      <div style={{fontSize:11,fontWeight:700,color:T.tx2,marginBottom:8}}>إخفاء / إظهار المشاريع</div>
      <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
        {TIMELINE_PROJECTS.map(proj=>{const isH=!!(hidden||{})[proj.id];return(
          <button key={proj.id} onClick={()=>toggleHide(proj.id)} style={{...btnSm,background:isH?"#f5f5f5":"#111",color:isH?T.tx3:"#fff",border:isH?"1px solid #e0e0e0":"none",opacity:isH?.6:1}}>
            {proj.icon} {proj.name}{isH?" (مخفي)":""}
          </button>);})}
      </div>
    </div>}
    <div style={{padding:"10px 16px",borderBottom:T.b,display:"flex",alignItems:"center",gap:10}}>
      <button onClick={prevM} style={btnSm}>←</button>
      <div style={{fontFamily:T.serif,fontStyle:"italic",fontSize:14,fontWeight:700}}>{MONTHS_AR[months[0].m-1]} {months[0].y} — {MONTHS_AR[months[months.length-1].m-1]} {months[months.length-1].y}</div>
      <button onClick={nextM} style={btnSm}>→</button>
      <span style={{fontSize:10,color:T.tx3,marginRight:"auto"}}>اضغطي على المشروع للتفاصيل</span>
    </div>
    <div style={{flex:1,overflow:"auto"}}>
      <div style={{minWidth:LABEL_W+COL_W*totalCols+20,position:"relative"}}>
        <div style={{display:"flex",position:"sticky",top:0,background:"#fff",zIndex:10,borderBottom:T.b}}>
          <div style={{width:LABEL_W,flexShrink:0,padding:"10px 16px",fontSize:11,fontWeight:700,color:T.tx3,background:T.bg2}}>المشروع ({visibleProjects.length})</div>
          {months.map(mo=><div key={mo.key} style={{width:COL_W,flexShrink:0,padding:"10px 8px",textAlign:"center",fontSize:10,fontWeight:700,color:mo.key===today?"#1d4ed8":T.tx3,background:mo.key===today?"#eff6ff":T.bg2,borderRight:"1px solid #f0f0f0"}}><div>{mo.label}</div><div style={{fontSize:9,opacity:.6}}>{mo.y}</div></div>)}
        </div>
        {visibleProjects.map(proj=>{
          const d=(dates||{})[proj.id]||{},startPos=dateToPos(d.start),endPos=dateToPos(d.end);
          const hasBar=startPos!==null&&endPos!==null&&endPos>=startPos;
          const cS=hasBar?Math.max(0,startPos):0,barLeft=hasBar?cS*COL_W:null,barWidth=hasBar?Math.min(endPos-cS+1,totalCols-cS)*COL_W:null;
          return(<div key={proj.id} style={{position:"relative",borderBottom:"1px solid #f5f5f5"}}>
            <div style={{display:"flex",alignItems:"stretch"}}>
              <div onClick={()=>{setEditRow(editRow===proj.id?null:proj.id);setDraftDate({start:d.start||"",end:d.end||""});}}
                style={{width:LABEL_W,flexShrink:0,padding:"10px 14px",cursor:"pointer",background:editRow===proj.id?"#f8f8f8":"#fff",borderLeft:`3px solid ${proj.color}`,display:"flex",alignItems:"center",gap:8,minHeight:52}}
                onMouseEnter={e=>e.currentTarget.style.background="#fafafa"} onMouseLeave={e=>e.currentTarget.style.background=editRow===proj.id?"#f8f8f8":"#fff"}>
                <span style={{fontSize:15,flexShrink:0}}>{proj.icon}</span>
                <div style={{minWidth:0}}><div style={{fontSize:11,fontWeight:700,overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis"}}>{proj.name}</div><div style={{fontSize:9,color:T.tx3,marginTop:1}}>{d.start?`${d.start} → ${d.end}`:"لم يُحدد"}</div></div>
              </div>
              <div style={{position:"relative",display:"flex",flex:1,height:52}}>
                {months.map(mo=><div key={mo.key} style={{width:COL_W,flexShrink:0,height:"100%",borderRight:"1px solid #f5f5f5",background:mo.key===today?"rgba(239,246,255,.35)":"transparent"}}/>)}
                {hasBar&&<div onClick={()=>{setEditRow(editRow===proj.id?null:proj.id);setDraftDate({start:d.start||"",end:d.end||""});}}
                  style={{position:"absolute",top:"50%",transform:"translateY(-50%)",right:barLeft,height:26,width:barWidth,background:proj.color,borderRadius:6,display:"flex",alignItems:"center",paddingRight:8,paddingLeft:8,gap:4,boxShadow:"0 1px 4px rgba(0,0,0,.1)",cursor:"pointer",overflow:"hidden"}}>
                  <span style={{fontSize:11}}>{proj.icon}</span>
                  {barWidth>55&&<span style={{fontSize:9,fontWeight:700,color:proj.tc,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{proj.name}</span>}
                </div>}
                {todayPos>=0&&todayPos<totalCols&&<div style={{position:"absolute",top:0,bottom:0,right:todayPos*COL_W+COL_W/2,width:2,background:"#1d4ed8",opacity:.35,pointerEvents:"none"}}/>}
              </div>
            </div>
            {editRow===proj.id&&<div style={{padding:"14px 16px",background:"#f8f8f8",borderTop:"1px solid #eee"}}>
              <div style={{display:"flex",alignItems:"center",gap:10,flexWrap:"wrap",marginBottom:14,paddingBottom:14,borderBottom:"1px solid #e8e8e8"}}>
                <span style={{fontSize:12,fontWeight:700}}>📅 التواريخ</span>
                <div style={{display:"flex",alignItems:"center",gap:6}}><span style={{fontSize:11,color:T.tx3}}>من</span><input type="month" style={{...inpSm,width:140}} value={draftDate.start} onChange={e=>setDraftDate(p=>({...p,start:e.target.value}))}/></div>
                <div style={{display:"flex",alignItems:"center",gap:6}}><span style={{fontSize:11,color:T.tx3}}>إلى</span><input type="month" style={{...inpSm,width:140}} value={draftDate.end} onChange={e=>setDraftDate(p=>({...p,end:e.target.value}))}/></div>
                <button onClick={()=>saveDates(proj.id,draftDate.start,draftDate.end)} style={btnPrimSm}>حفظ</button>
                <button onClick={()=>setEditRow(null)} style={btnSm}>إغلاق</button>
                {d.start&&<button onClick={()=>{setDates(prev=>{const n={...prev};delete n[proj.id];return n;});setEditRow(null);}} style={{...btnSm,color:"#991b1b",border:"1px solid #fecaca"}}>حذف</button>}
                <button onClick={()=>toggleHide(proj.id)} style={{...btnSm,color:T.tx3,marginRight:"auto"}}>إخفاء 👁</button>
              </div>
              {(()=>{
                const rp=ROADMAP_PROJECTS.find(r=>r.id===proj.id);
                if(!rp)return <div style={{fontSize:12,color:T.tx3,padding:"8px 0"}}>لا توجد مراحل مرتبطة في خارطة الطريق بعد</div>;
                const allS=rp.phases.flatMap(ph=>ph.steps),doneS=allS.filter(s=>(shared.roadmapChecks||{})[s.id]).length,pct=allS.length?Math.round(doneS/allS.length*100):0;
                return(<div>
                  <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
                    <span style={{fontSize:11,fontWeight:700}}>📊 التقدم الكلي</span>
                    <div style={{flex:1,height:5,background:"#e8e8e8",borderRadius:20,overflow:"hidden"}}><div style={{height:"100%",width:pct+"%",background:proj.tc,borderRadius:20,transition:"width .3s"}}/></div>
                    <span style={{fontSize:11,fontWeight:700,color:proj.tc}}>{pct}% ({doneS}/{allS.length})</span>
                  </div>
                  {rp.phases.map(phase=>{
                    const phS=phase.steps,phD=phS.filter(s=>(shared.roadmapChecks||{})[s.id]).length;
                    return(<div key={phase.id} style={{marginBottom:10}}>
                      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:5}}>
                        <div style={{width:7,height:7,borderRadius:"50%",background:proj.tc,flexShrink:0}}/>
                        <span style={{fontSize:11,fontWeight:700,flex:1}}>{phase.title}</span>
                        <span style={{fontSize:10,color:T.tx3}}>{phD}/{phS.length}</span>
                        <div style={{width:56,height:3,background:"#e8e8e8",borderRadius:20,overflow:"hidden"}}><div style={{height:"100%",width:(phS.length?phD/phS.length*100:0)+"%",background:proj.tc,borderRadius:20}}/></div>
                      </div>
                      <div style={{paddingRight:15}}>
                        {phS.map(step=>{const done=!!(shared.roadmapChecks||{})[step.id];return(
                          <div key={step.id} onClick={()=>shared.setRoadmapChecks(prev=>({...(prev||{}),[step.id]:!done}))}
                            style={{display:"flex",alignItems:"flex-start",gap:8,padding:"5px 8px",marginBottom:2,borderRadius:5,cursor:"pointer",background:done?"#f0f0f0":"#fff"}}
                            onMouseEnter={e=>e.currentTarget.style.background="#f5f5f5"} onMouseLeave={e=>e.currentTarget.style.background=done?"#f0f0f0":"#fff"}>
                            <div style={{width:15,height:15,borderRadius:4,border:done?"none":"1.5px solid #ccc",background:done?proj.tc:"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1}}>{done&&<span style={{color:"#fff",fontSize:9,fontWeight:700}}>✓</span>}</div>
                            <span style={{fontSize:11,color:done?T.tx3:T.tx,textDecoration:done?"line-through":"none",lineHeight:1.4}}>{step.text}</span>
                          </div>);})}</div>
                    </div>);})}
                </div>);
              })()}
            </div>}
          </div>);})}
        {hiddenCount>0&&<div style={{padding:"10px 16px",background:T.bg3,borderTop:T.b}}><span style={{fontSize:11,color:T.tx3}}>👁 {hiddenCount} مشروع مخفي — اضغطي "إخفاء/إظهار" لعرضها</span></div>}
        <div style={{padding:"12px 16px",display:"flex",gap:16,flexWrap:"wrap",borderTop:T.b}}>
          <div style={{display:"flex",alignItems:"center",gap:6,fontSize:11,color:T.tx3}}><div style={{width:2,height:14,background:"#1d4ed8",opacity:.4}}/>اليوم الحالي</div>
          <div style={{display:"flex",alignItems:"center",gap:6,fontSize:11,color:T.tx3}}><div style={{width:20,height:8,background:"#e0e7ff",borderRadius:3}}/>مدة المشروع</div>
          <span style={{fontSize:11,color:T.tx3}}>💡 اضغطي على المشروع للتواريخ والمهام</span>
        </div>
      </div>
    </div>
  </div>);
}

// MAIN APP
// ════════════════════════════════════════════════════
export default function App(){
  const isMobile=useIsMobile();
  const[view,setView]=useState("dash");
  const[coDetail,setCoDetail]=useState(null);
  const[quickInit,setQuickInit]=useState(null);
  const[cos,setCos]=useDB("wbos3_cos",SEED_COS);
  const[projects,setProjects]=useDB("wbos3_projects",[]);
  const[tasks,setTasks]=useDB("wbos3_tasks",[]);
  const[marketing,setMarketing]=useDB("wbos3_marketing",[]);
  const[content,setContent]=useDB("wbos3_content",[]);
  const[finance,setFinance]=useDB("wbos3_finance",[]);
  const[cal,setCal]=useDB("wbos3_cal",[]);
  const[crm,setCrm]=useDB("wbos3_crm",[]);
  const[ideas,setIdeas]=useDB("wbos3_ideas",[]);
  const[bom,setBom]=useDB("wbos3_bom",[]);
  const[roadmapChecks,setRoadmapChecks]=useDB("wbos3_roadmap_checks",{});
  const loading=!cos||!projects||!tasks||!marketing||!content||!finance||!cal||!crm||!ideas||!bom||!roadmapChecks;
  if(loading)return <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100vh",fontFamily:T.sans,color:T.tx3,fontSize:14}}>جاري التحميل...</div>;
  const SETS={cos:setCos,projects:setProjects,tasks:setTasks,marketing:setMarketing,content:setContent,finance:setFinance,cal:setCal,crm:setCrm,ideas:setIdeas,bom:setBom,roadmapChecks:setRoadmapChecks};
  const addItem=(key,item)=>SETS[key](p=>[...(p||[]),{id:uid(),...item}]);
  const delItem=(key,id)=>SETS[key](p=>(p||[]).filter(x=>x.id!==id));
  const updItem=(key,id,patch)=>SETS[key](p=>(p||[]).map(x=>x.id===id?{...x,...patch}:x));
  const coName=id=>cos.find(c=>c.id===id)?.name||"—";
  const db={cos,projects,tasks,marketing,content,finance,cal,crm,ideas,bom,roadmapChecks};
  const shared={db,cos,coName,addItem,delItem,updItem,setView,coDetail,setCoDetail,isMobile,roadmapChecks,setRoadmapChecks};
  const handleQuick=(type)=>{const m={task:"tasks",project:"tasks",crm:"crm",idea:"content",content:"content",cal:"cal",income:"fin",expense:"fin"};setView(m[type]||"tasks");setQuickInit(type);setTimeout(()=>setQuickInit(null),150);};
  const NAV=[
    {id:"dash",label:"الرئيسية",icon:"⌂"},
    {id:"cos",label:"شركاتي",icon:"◈"},
    {id:"tasks",label:"المهام",icon:"✓"},
    {id:"content",label:"المحتوى",icon:"◎"},
    {id:"fin",label:"المالية",icon:"◉"},
    {id:"cal",label:"الرزنامة",icon:"▦"},
    {id:"crm",label:"CRM",icon:"◐"},
    {id:"bom",label:"BOM",icon:"📦"},
    {id:"bizplan",label:"خطة الأعمال",icon:"📋"},
    {id:"roadmap",label:"خارطة الطريق",icon:"🗺️"},
    {id:"timeline",label:"Timeline",icon:"📅"},
  ];
  const pending=tasks.filter(t=>!t.done&&!t.parentId).length;
  const renderView=()=>{
    if(view==="dash")return <DashView shared={shared} onQuickAction={handleQuick}/>;
    if(view==="cos")return <CoView shared={shared}/>;
    if(view==="tasks")return <TasksView shared={shared} initForm={quickInit}/>;
    if(view==="content")return <ContentView shared={shared} initForm={quickInit}/>;
    if(view==="fin")return <FinView shared={shared} initForm={quickInit}/>;
    if(view==="cal")return <CalView shared={shared} initForm={quickInit}/>;
    if(view==="crm")return <CrmView shared={shared} initForm={quickInit}/>;
    if(view==="bom")return <BomView shared={shared}/>;
    if(view==="bizplan")return <BizPlanView shared={shared}/>;
    if(view==="roadmap")return <RoadmapView shared={shared}/>;
    if(view==="timeline")return <TimelineView shared={shared}/>;
    return null;
  };
  return(<div style={{display:"flex",flexDirection:isMobile?"column":"row",height:"100vh",overflow:"hidden",fontFamily:T.sans,background:T.bg,color:T.tx,direction:"rtl",fontSize:13}}>
    {!isMobile&&(<nav style={{width:195,borderLeft:T.b,display:"flex",flexDirection:"column",background:T.bg,flexShrink:0}}>
      <div style={{padding:"18px 18px 12px",borderBottom:T.b}}><div style={{fontFamily:T.serif,fontStyle:"italic",fontSize:20,fontWeight:700,letterSpacing:"-.5px"}}>My Business</div><div style={{fontSize:10,color:T.tx3,marginTop:3}}>{new Date().toLocaleDateString("ar-KW",{weekday:"long",month:"long",day:"numeric"})}</div></div>
      <div style={{flex:1,padding:"8px 0",overflowY:"auto"}}>{NAV.map(n=><button key={n.id} onClick={()=>{setView(n.id);if(n.id!=="cos")setCoDetail(null);}} style={{display:"flex",alignItems:"center",gap:10,width:"100%",padding:"9px 18px",border:"none",background:view===n.id?T.bg3:"transparent",color:view===n.id?T.tx:T.tx2,cursor:"pointer",fontSize:12,fontFamily:T.sans,textAlign:"right",fontWeight:view===n.id?700:400,borderRight:`2px solid ${view===n.id?"#111":"transparent"}`,transition:"all .1s"}}><span style={{fontSize:13,width:16,textAlign:"center"}}>{n.icon}</span><span>{n.label}</span>{n.id==="tasks"&&pending>0&&<span style={{fontSize:10,background:"#991b1b",color:"#fff",borderRadius:20,padding:"1px 6px",marginRight:"auto"}}>{pending}</span>}</button>)}</div>
      <div style={{padding:"12px 18px",borderTop:T.b}}><div style={{fontSize:10,color:T.tx3}}>{cos.filter(c=>c.active).length} شركات · {pending} مهمة</div><div style={{fontSize:10,color:T.tx3,marginTop:2}}>{bom.length} منتج BOM · {ideas.filter(i=>i.status==="new").length} أفكار</div></div>
    </nav>)}
    <main style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden",position:"relative"}}>{renderView()}</main>
    {isMobile&&(<nav style={{height:56,borderTop:T.b,display:"flex",background:T.bg,flexShrink:0,overflowX:"auto"}}>{NAV.map(n=><button key={n.id} onClick={()=>{setView(n.id);if(n.id!=="cos")setCoDetail(null);}} style={{minWidth:52,flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:2,border:"none",background:"transparent",cursor:"pointer",color:view===n.id?T.tx:T.tx3,borderTop:`2px solid ${view===n.id?"#111":"transparent"}`,padding:"5px 4px",position:"relative"}}><span style={{fontSize:15}}>{n.icon}</span><span style={{fontSize:8,fontFamily:T.sans,fontWeight:view===n.id?700:400,whiteSpace:"nowrap"}}>{n.label}</span>{n.id==="tasks"&&pending>0&&<span style={{position:"absolute",top:4,right:4,fontSize:8,background:"#991b1b",color:"#fff",borderRadius:"50%",width:13,height:13,display:"flex",alignItems:"center",justifyContent:"center"}}>{pending}</span>}</button>)}</nav>)}
  </div>);
}
