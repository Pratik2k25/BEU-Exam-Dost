// New releases install in the background and reload only when the current UI is safe.
export function installUpdates({canReload,beforeReload,onReady=()=>{},onDeferred=()=>{},env=window,nav=navigator,doc=document}){
 if(!nav.serviceWorker)return;
 const serviceWorker=nav.serviceWorker;
 let registration,hadController=!!serviceWorker.controller,pendingReload=false,reloading=false,dirtyForm=null,notified=false,lastCheck=0;
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
 async function check(){
  if(!registration||doc.hidden)return;
  if(Date.now()-lastCheck>=60000){lastCheck=Date.now();try{await registration.update();}catch{/* Retry when back online. */}}
  activateIfSafe();
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
  registration=reg;reg.addEventListener('updatefound',watchInstalling);watchInstalling();activateIfSafe();check();
 }).catch(()=>{/* A failed update leaves the installed app usable. */});
 // Retry votes after a quiz, modal, unsaved form, or another open tab becomes safe.
 env.setInterval(()=>{if(!doc.hidden){activateIfSafe();check();}},10000);
}
