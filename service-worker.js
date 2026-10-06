'use strict';
const CACHE='l5s1-studio-v6';
const ids=['prone','elbows','pressup','chair-posture','neural','brace','bridge','deadbug-full','deadbug-simple','birddog-full','birddog-simple','side-full','side-knees','front-plank','pallof','walk','chair-extension','chair-march','chair-pelvic','bridge-march','sitstand'];
const ASSETS=['./','./index.html','./styles.css','./state-core.js','./catalog.js','./app.js','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png','./posters/pain_map_realistic.jpg','./posters/map-front.svg','./posters/map-left.svg',...ids.flatMap(id=>['./media/'+id+'.mp4','./posters/'+id+'.jpg'])];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('l5s1-studio-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
 if(e.request.method!=='GET'||new URL(e.request.url).origin!==self.location.origin)return;
 e.respondWith((async()=>{const cached=await caches.match(e.request.url);if(!cached)return fetch(e.request);const range=e.request.headers.get('Range');if(!range)return cached;const match=/^bytes=(\d+)-(\d*)$/.exec(range);if(!match)return fetch(e.request);const bytes=await cached.arrayBuffer(),start=Number(match[1]),end=Math.min(match[2]?Number(match[2]):bytes.byteLength-1,bytes.byteLength-1);if(start>end||start>=bytes.byteLength)return new Response(null,{status:416,headers:{'Content-Range':'bytes */'+bytes.byteLength}});return new Response(bytes.slice(start,end+1),{status:206,headers:{'Content-Type':cached.headers.get('Content-Type')||'video/mp4','Content-Length':String(end-start+1),'Content-Range':`bytes ${start}-${end}/${bytes.byteLength}`,'Accept-Ranges':'bytes'}});})());
});
