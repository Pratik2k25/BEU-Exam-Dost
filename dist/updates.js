import {buildId as installedBuildId} from './app-meta.js';

// An open, online app detects new releases within one short polling interval.
// Each window still saves its own work before reloading.
export const UPDATE_INTERVAL_MS=5000;
export function installUpdates({canReload,beforeReload,onReady=()=>{},onDeferred=()=>{},env=window,nav=navigator,doc=document,currentBuild=installedBuildId}){
 if(!nav.serviceWorker)return;
 const serviceWorker=nav.serviceWorker;
 let registration,hadController=!!serviceWorker.controller,pendingReload=false,reloading=false,dirtyForm=null,notified=false,checking=null;
 const safe=()=>canReload()&&!dirtyForm?.isConnected;
 function reloadIfSafe(){
  if(!pendingReload||reloading||!safe())return;
  if(beforeReload()===false)return;
  reloading=true;env.location.reload();
 }
 function activateIfSafe(){
  reloadIfSafe();
  if(!registration?.waiting||reloading)return;
  if(safe())registration.waiting.postMessage({type:'REQUEST_ACTIVATION'});
  else if(!notified){notified=true;onDeferred();}
 }
 function check({initial=false}={}){
  if(!registration||doc.hidden||nav.onLine===false||reloading)return Promise.resolve();
  if(checking)return checking;
  checking=(async()=>{
   let changed=initial;
   try{
    if(typeof env.fetch==='function'){
     const response=await env.fetch(new URL('release.json',registration.scope||env.location.href),{cache:'no-store',headers:{'Cache-Control':'no-cache'},signal:AbortSignal.timeout(UPDATE_INTERVAL_MS)});
     if(response.ok){const release=await response.json();changed=changed||(typeof release.buildId==='string'&&release.buildId!==currentBuild);}
    }else changed=true;
    if(changed&&!registration.installing)await registration.update();
   }catch{/* The installed release stays available; retry after connectivity returns. */}
   activateIfSafe();
  })().finally(()=>{checking=null;});
  return checking;
 }
 function watchInstalling(){
  const worker=registration.installing;if(!worker)return;
  worker.addEventListener('statechange',()=>{if(worker.state==='installed'){if(serviceWorker.controller)activateIfSafe();else onReady();}});
 }
 serviceWorker.addEventListener('controllerchange',()=>{
  // Initial installation claims the page too; it does not need a refresh.
  if(!hadController){hadController=true;return;}
  pendingReload=true;reloadIfSafe();
 });
 serviceWorker.addEventListener('message',event=>{
  if(event.data?.type==='UPDATE_CHECK')event.source?.postMessage({type:'CLIENT_UPDATE_STATUS',requestId:event.data.requestId,safe:safe()});
 });
 doc.addEventListener('input',event=>{const form=event.target?.closest?.('form');if(form)dirtyForm=form;});
 doc.addEventListener('change',event=>{const form=event.target?.closest?.('form');if(form)dirtyForm=form;});
 for(const name of ['hashchange','focus','online','pageshow'])env.addEventListener(name,()=>env.setTimeout(()=>check(),0));
 doc.addEventListener('visibilitychange',()=>{if(!doc.hidden)check();});
 serviceWorker.register('./sw.js',{updateViaCache:'none'}).then(reg=>{
  registration=reg;reg.addEventListener('updatefound',watchInstalling);watchInstalling();activateIfSafe();check({initial:true});
 }).catch(()=>{/* A failed update leaves the installed app usable. */});
 // Retry votes after a quiz, modal, unsaved form, or another open tab becomes safe.
 env.setInterval(()=>{if(!doc.hidden){activateIfSafe();check();}},UPDATE_INTERVAL_MS);
}
