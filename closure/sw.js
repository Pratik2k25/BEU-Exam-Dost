// Closure shell: retain existing study caches and storage for non-destructive rollback.
const CACHE='exam-dost-__BUILD_ID__';
const SHELL=__SHELL__;
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(SHELL.map(url=>new Request(url,{cache:'reload'}))))));
self.addEventListener('activate',event=>event.waitUntil(self.clients.claim()));
self.addEventListener('fetch',event=>{
 const url=new URL(event.request.url);
 if(event.request.method!=='GET'||url.origin!==self.location.origin)return;
 if(url.pathname.startsWith('/api/')||url.pathname.endsWith('/release.json')||url.pathname.endsWith('/sw.js'))return;
 event.respondWith((async()=>{
  const cache=await caches.open(CACHE);
  if(event.request.mode==='navigate')return await cache.match('./index.html')||fetch(event.request);
  return await cache.match(event.request)||fetch(event.request);
 })());
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
