/* v7: daily records; retain the original storage key and migrate v4–v6 backups. */
(function(root){
'use strict';
const localDay=d=>{d=d||new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;};
const dateOK=x=>typeof x==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(x)&&Number.isFinite(Date.parse(x+'T12:00:00'))&&localDay(new Date(x+'T12:00:00'))===x;
const regionOK=x=>Number.isInteger(x)&&x>=-1&&x<=4;
const text=(x,n)=>typeof x==='string'?x.slice(0,n):'';
const number=(x,max)=>Number.isFinite(x)&&x>=0&&x<=max?x:null;
const unique=a=>[...new Set(a)];
function defaults(){return {schemaVersion:7,settings:{startDate:localDay(),morningTime:'08:00',coreTime:'19:00',voice:true,dark:true},sessions:[],doneTasks:{},painRegion:null,favorites:[],sessionDraft:null,routine:[],dailyPlans:{},records:[],dailyNotes:{}};}
function normalize(raw,ids){
 if(!raw||typeof raw!=='object'||Array.isArray(raw))throw Error('Formato de backup inválido.');
 const d=defaults(),r={...d},s=raw.settings||{},validId=x=>typeof x==='string'&&ids.includes(x),list=x=>unique((Array.isArray(x)?x:[]).filter(validId));
 r.settings={startDate:dateOK(s.startDate)?s.startDate:d.settings.startDate,morningTime:/^([01]\d|2[0-3]):[0-5]\d$/.test(s.morningTime)?s.morningTime:d.settings.morningTime,coreTime:/^([01]\d|2[0-3]):[0-5]\d$/.test(s.coreTime)?s.coreTime:d.settings.coreTime,voice:typeof s.voice==='boolean'?s.voice:true,dark:typeof s.dark==='boolean'?s.dark:true};
 if(raw.sessions!==undefined&&!Array.isArray(raw.sessions))throw Error('Histórico inválido.');
 r.sessions=(raw.sessions||[]).map((x,i)=>{
  if(!x||!Number.isFinite(Date.parse(x.date))||number(x.pain,10)===null||!regionOK(x.region))throw Error('Há uma sessão inválida no backup.');
  const before=regionOK(x.regionBefore)?x.regionBefore:null;
  return {id:text(x.id,100)||`legacy-session-${i}-${Date.parse(x.date)}`,date:new Date(x.date).toISOString(),localDate:dateOK(x.localDate)?x.localDate:localDay(new Date(x.date)),pain:x.pain,region:x.region,regionBefore:before,centralized:before!==null&&x.region<before,task:['morning','day','core','walk','custom'].includes(x.task)?x.task:'custom',exercises:list(x.exercises),duration:Number.isFinite(x.duration)?Math.max(0,x.duration):0};
 });
 r.painRegion=regionOK(raw.painRegion)?raw.painRegion:null;
 r.favorites=list(raw.favorites);r.routine=list(raw.routine);
 if(raw.doneTasks&&typeof raw.doneTasks==='object')for(const [day,tasks] of Object.entries(raw.doneTasks)){if(dateOK(day)&&Array.isArray(tasks))r.doneTasks[day]=unique(tasks.filter(x=>['morning','day','core','walk'].includes(x)));}
 if(raw.dailyPlans&&typeof raw.dailyPlans==='object')for(const [day,items] of Object.entries(raw.dailyPlans)){if(dateOK(day)&&Array.isArray(items))r.dailyPlans[day]=list(items);}
 if(raw.records!==undefined&&!Array.isArray(raw.records))throw Error('Registros diários inválidos.');
 if(Array.isArray(raw.records)){
  const seen=new Set();r.records=raw.records.map(x=>{
   if(!x||!validId(x.exerciseId)||!dateOK(x.localDate)||!Number.isFinite(Date.parse(x.date))||!text(x.id,100)||seen.has(x.id))throw Error('Há um exercício inválido ou duplicado no backup.');
   seen.add(x.id);return {id:text(x.id,100),exerciseId:x.exerciseId,date:new Date(x.date).toISOString(),localDate:x.localDate,source:['quick','guided','legacy','manual'].includes(x.source)?x.source:'manual',sessionId:text(x.sessionId,100)||null,reps:number(x.reps,9999),seconds:number(x.seconds,86400),sets:number(x.sets,999),note:text(x.note,1000)};
  });
 }else{
  r.records=r.sessions.flatMap(s=>s.exercises.map((exerciseId,i)=>({id:`legacy-${s.id}-${i}`,exerciseId,date:s.date,localDate:s.localDate,source:'legacy',sessionId:s.id,reps:null,seconds:null,sets:null,note:''})));
 }
 if(raw.dailyNotes&&typeof raw.dailyNotes==='object')for(const [day,n] of Object.entries(raw.dailyNotes)){if(dateOK(day)&&n&&typeof n==='object')r.dailyNotes[day]={pain:number(n.pain,10),region:regionOK(n.region)?n.region:null,text:text(n.text,1000)};}
 const draft=raw.sessionDraft;
 if(draft&&Array.isArray(draft.ids)&&draft.ids.length&&draft.ids.every(validId)&&Number.isInteger(draft.index)&&draft.index>=0&&draft.index<draft.ids.length){r.sessionDraft={id:text(draft.id,100)||`session-${Number.isFinite(draft.started)?draft.started:Date.now()}`,ids:unique(draft.ids),index:draft.index,task:['morning','day','core','walk','custom'].includes(draft.task)?draft.task:'custom',target:Number.isFinite(draft.target)?Math.min(3600,Math.max(1,draft.target)):10,regionBefore:regionOK(draft.regionBefore)?draft.regionBefore:null,started:Number.isFinite(draft.started)?draft.started:Date.now(),elapsed:Number.isFinite(draft.elapsed)?Math.max(0,draft.elapsed):0};if(r.sessionDraft.index>=r.sessionDraft.ids.length)r.sessionDraft.index=r.sessionDraft.ids.length-1;}
 return r;
}
const api={localDay,defaults,normalize,regionOK,dateOK};
if(typeof module==='object'&&module.exports)module.exports=api;else root.MotionStore=api;
})(typeof window!=='undefined'?window:globalThis);
