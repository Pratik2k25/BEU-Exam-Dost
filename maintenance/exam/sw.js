/* Temporary maintenance offline shell. Don't cache form submissions. */
const CACHE='beu-exam-dost-maintenance-2026-11-v1';
const ASSETS=['./','./index.html','./assets/style.css','./assets/app.js','./assets/beu-logo.jpg','./assets/icon-192.png','./assets/icon-512.png','./manifest.webmanifest'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',event=>{event.waitUntil((async()=>{for(const key of await caches.keys())if(key!==CACHE)await caches.delete(key);await self.clients.claim();})());});
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin)return;
  const request=event.request;
  if(request.mode==='navigate'){
    event.respondWith(fetch(request).catch(async()=>await caches.match('./index.html')));
  }else{
    event.respondWith(caches.match(request).then(cached=>cached||fetch(request)));
  }
});
