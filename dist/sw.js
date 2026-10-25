const CACHE='exam-dost-shell-v15';
const SHELL=['./','./index.html','./style.css?v=15','./app.js?v=15','./core.js','./data.js','./question-view.js','./solutions/index.js','./solutions/cn-solutions.js','./solutions/coa-solutions.js','./solutions/flat-solutions.js','./solutions/dbms-solutions.js','./solutions/daa-solutions.js','./solutions/etc-solutions.js','./schedule.js','./app-meta.js','./updates.js','./assets/exam-routine-2026.pdf','./manifest.webmanifest','./assets/logo.svg','./assets/logo-emblem.png','./assets/logo-horizontal.png','./assets/logo-horizontal-white.png','./assets/logo-horizontal-dark.png','./assets/logo-stacked.png','./assets/logo-stacked-white.png','./assets/icon-192.png','./assets/icon-512.png','./assets/icon-maskable-192.png','./assets/icon-maskable-512.png','./assets/study.png','./assets/outfit.ttf','./assets/paper.png','./assets/quiz.png','./assets/nav-home.webp','./assets/nav-subjects.webp','./assets/nav-pyqs.webp','./assets/nav-quiz.webp'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(SHELL.map(url=>new Request(url,{cache:'reload'}))))));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('exam-dost-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
// Serve one complete cached release until the next worker safely takes over.
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin)return;
 // Version checks must see the deployment currently served by the network,
 // even while this worker continues serving the previous offline shell.
 if(new URL(event.request.url).pathname===new URL('release.json',self.registration.scope).pathname){
  event.respondWith(fetch(event.request,{cache:'no-store'}));return;
 }
 event.respondWith((async()=>{
  try{
   const cache=await caches.open(CACHE);
   if(event.request.mode==='navigate'){
    const cached=await cache.match('./index.html')||await cache.match('./')||await cache.match(event.request);
    if(cached){
     if(cached.redirected&&typeof Response!=='undefined'){
      return new Response(cached.body,{status:200,statusText:'OK',headers:cached.headers});
     }
     return cached;
    }
    return await fetch(event.request);
   }
   return await cache.match(event.request)||await fetch(event.request);
  }catch(_e){
   return fetch(event.request);
  }
 })());
});

// PWABuilder App Capabilities: Background Sync, Periodic Sync, Push Notifications
self.addEventListener('sync',event=>{
 if(event.tag==='sync-study-progress')event.waitUntil(Promise.resolve());
});
self.addEventListener('periodicsync',event=>{
 if(event.tag==='check-exam-updates')event.waitUntil(Promise.resolve());
});
self.addEventListener('push',event=>{
 const data=event.data?event.data.json():{};
 const title=data.title||'BEU Exam Dost Update';
 const options={
  body:data.body||'New study notes or syllabus updates are available.',
  icon:'./assets/icon-192.png',
  badge:'./assets/icon-192.png',
  data:data.url||'./'
 };
 event.waitUntil(self.registration.showNotification(title,options));
});
self.addEventListener('notificationclick',event=>{
 event.notification.close();
 event.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(clientList=>{
  for(const client of clientList){if(client.url&&'focus' in client)return client.focus();}
  if(self.clients.openWindow)return self.clients.openWindow(event.notification.data||'./');
 }));
});

let activation=null;
const visibleWindows=async()=>(await self.clients.matchAll({type:'window',includeUncontrolled:true})).filter(c=>c.url.startsWith(self.registration.scope)&&c.visibilityState!=='hidden');
function finishActivation(round){
 if(activation!==round)return;
 clearTimeout(round.timer);activation=null;round.resolve();
}
async function activateWhenApproved(round,{timeout=false}={}){
 if(activation!==round||round.activating)return;
 const windows=await visibleWindows();
 if(activation!==round||round.activating)return;
 if(!windows.every(c=>round.approved.has(c.id))){if(timeout)finishActivation(round);return;}
 // Hidden or frozen windows keep their current document and defer their own
 // reload if they contain a quiz or unsaved form. They cannot stall other tabs.
 round.activating=true;await self.skipWaiting();finishActivation(round);
}
async function requestActivation(){
 if(activation)return activation.done;
 const requestId=String(Date.now())+'-'+Math.random().toString(36).slice(2);
 const round={requestId,expected:new Set(),approved:new Set()};
 round.done=new Promise(resolve=>{round.resolve=resolve;});activation=round;
 const windows=await visibleWindows();
 if(!windows.length){await self.skipWaiting();finishActivation(round);return;}
 round.expected=new Set(windows.map(c=>c.id));
 round.timer=setTimeout(()=>{activateWhenApproved(round,{timeout:true}).catch(()=>finishActivation(round));},1500);
 for(const client of windows)client.postMessage({type:'UPDATE_CHECK',requestId});
 // Keep the worker alive while awaiting votes instead of abandoning the timer
 // when the original message event finishes.
 return round.done;
}
self.addEventListener('message',event=>{
 if(event.data?.type==='REQUEST_ACTIVATION'){event.waitUntil(requestActivation());return;}
 const vote=event.data;
 if(vote?.type!=='CLIENT_UPDATE_STATUS'||!activation||vote.requestId!==activation.requestId||!activation.expected.has(event.source?.id))return;
 const round=activation;
 if(!vote.safe){finishActivation(round);return;}
 round.approved.add(event.source.id);
 event.waitUntil(activateWhenApproved(round));
});
