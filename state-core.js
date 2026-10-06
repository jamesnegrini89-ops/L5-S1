/* Shared, strictly validated storage/backup schema. The v4 storage key is retained. */
(function(root){
'use strict';
const localDay=d=>{d=d||new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;};
const dateOK=x=>typeof x==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(x)&&Number.isFinite(Date.parse(x+'T12:00:00'))&&localDay(new Date(x+'T12:00:00'))===x;
const regionOK=x=>Number.isInteger(x)&&x>=-1&&x<=4;
function defaults(){return {schemaVersion:6,settings:{startDate:localDay(),morningTime:'08:00',coreTime:'19:00',voice:true,dark:true},sessions:[],doneTasks:{},painRegion:null,favorites:[],sessionDraft:null};}
function normalize(raw,ids){
 if(!raw||typeof raw!=='object'||Array.isArray(raw))throw Error('Formato de backup inválido.');
 const d=defaults(),r={...d},s=raw.settings||{},validId=x=>typeof x==='string'&&ids.includes(x);
 r.settings={startDate:dateOK(s.startDate)?s.startDate:d.settings.startDate,morningTime:/^([01]\d|2[0-3]):[0-5]\d$/.test(s.morningTime)?s.morningTime:d.settings.morningTime,coreTime:/^([01]\d|2[0-3]):[0-5]\d$/.test(s.coreTime)?s.coreTime:d.settings.coreTime,voice:typeof s.voice==='boolean'?s.voice:true,dark:typeof s.dark==='boolean'?s.dark:true};
 if(raw.sessions!==undefined&&!Array.isArray(raw.sessions))throw Error('Histórico inválido.');
 r.sessions=(raw.sessions||[]).slice(-5000).map(x=>{
  if(!x||!Number.isFinite(Date.parse(x.date))||typeof x.pain!=='number'||x.pain<0||x.pain>10||!regionOK(x.region))throw Error('Há uma sessão inválida no backup.');
  const before=regionOK(x.regionBefore)?x.regionBefore:null;
  return {date:new Date(x.date).toISOString(),localDate:dateOK(x.localDate)?x.localDate:localDay(new Date(x.date)),pain:x.pain,region:x.region,regionBefore:before,centralized:before!==null&&x.region<before,task:['morning','day','core','walk','custom'].includes(x.task)?x.task:'custom',exercises:(Array.isArray(x.exercises)?x.exercises:[]).filter(validId),duration:Number.isFinite(x.duration)?Math.max(0,x.duration):0};
 });
 r.painRegion=regionOK(raw.painRegion)?raw.painRegion:null;
 r.favorites=(Array.isArray(raw.favorites)?raw.favorites:[]).filter(validId);
 if(raw.doneTasks&&typeof raw.doneTasks==='object')for(const [day,tasks] of Object.entries(raw.doneTasks)){if(dateOK(day)&&Array.isArray(tasks))r.doneTasks[day]=tasks.filter(x=>['morning','day','core','walk'].includes(x));}
 const draft=raw.sessionDraft;
 if(draft&&Array.isArray(draft.ids)&&draft.ids.length&&draft.ids.every(validId)&&Number.isInteger(draft.index)&&draft.index>=0&&draft.index<draft.ids.length){r.sessionDraft={ids:draft.ids,index:draft.index,task:['morning','day','core','walk','custom'].includes(draft.task)?draft.task:'custom',target:Number.isFinite(draft.target)?Math.min(3600,Math.max(1,draft.target)):10,regionBefore:regionOK(draft.regionBefore)?draft.regionBefore:null,started:Number.isFinite(draft.started)?draft.started:Date.now(),elapsed:Number.isFinite(draft.elapsed)?Math.max(0,draft.elapsed):0};}
 return r;
}
const api={localDay,defaults,normalize,regionOK,dateOK};
if(typeof module==='object'&&module.exports)module.exports=api;else root.MotionStore=api;
})(typeof window!=='undefined'?window:globalThis);
