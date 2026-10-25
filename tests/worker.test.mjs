import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';

function harness(){
 const handlers={},messages=[],timers=new Map();let activated=0,timerId=0;
 const clients=['one','two'].map(id=>({id,url:'https://example.test/',visibilityState:'visible',postMessage:data=>messages.push({id,data})}));
 const requests=[];let cacheReads=0;
 const self={location:{origin:'https://example.test'},registration:{scope:'https://example.test/'},clients:{matchAll:async()=>clients},skipWaiting:async()=>{activated++;},addEventListener:(type,fn)=>handlers[type]=fn};
 vm.runInNewContext(readFileSync(new URL('../dist/sw.js',import.meta.url),'utf8'),{
  self,setTimeout:fn=>{timers.set(++timerId,fn);return timerId;},clearTimeout:id=>timers.delete(id),URL,Set,Date,Math,
  fetch:async(request,options)=>{requests.push({request,options});return {network:true};},caches:{open:async()=>{cacheReads++;throw Error('Manifest must not read the offline cache');}},
 });
 function dispatch(data,id){const waits=[];handlers.message({data,source:{id},waitUntil:p=>waits.push(p)});return Promise.all(waits);}
 async function begin(){const done=dispatch({type:'REQUEST_ACTIVATION'});await new Promise(r=>setImmediate(r));return {done,requestId:messages.at(-1)?.data.requestId};}
 return {handlers,messages,clients,requests,timers,dispatch,begin,get activated(){return activated;},get cacheReads(){return cacheReads;}};
}

test('waiting worker keeps activation alive and requires safe votes from every visible window',async()=>{
 const h=harness();let r=await h.begin(),finished=false;r.done.then(()=>{finished=true;});
 await h.dispatch({type:'CLIENT_UPDATE_STATUS',requestId:r.requestId,safe:true},'one');assert.equal(h.activated,0);assert.equal(finished,false);
 await h.dispatch({type:'CLIENT_UPDATE_STATUS',requestId:r.requestId,safe:false},'two');await r.done;assert.equal(h.activated,0);
 r=await h.begin();await h.dispatch({type:'CLIENT_UPDATE_STATUS',requestId:r.requestId,safe:true},'one');
 await h.dispatch({type:'CLIENT_UPDATE_STATUS',requestId:r.requestId,safe:true},'two');await r.done;assert.equal(h.activated,1);
});

test('frozen hidden windows cannot block foreground activation',async()=>{
 const h=harness();h.clients[1].visibilityState='hidden';const r=await h.begin();
 assert.equal(h.messages.length,1);await h.dispatch({type:'CLIENT_UPDATE_STATUS',requestId:r.requestId,safe:true},'one');
 await r.done;assert.equal(h.activated,1);
});

test('a window closed during voting no longer blocks activation',async()=>{
 const h=harness();const r=await h.begin();h.clients.pop();
 await h.dispatch({type:'CLIENT_UPDATE_STATUS',requestId:r.requestId,safe:true},'one');await r.done;assert.equal(h.activated,1);
});

test('an unresponsive visible window blocks activation until a later safe retry',async()=>{
 const h=harness();const r=await h.begin();await h.dispatch({type:'CLIENT_UPDATE_STATUS',requestId:r.requestId,safe:true},'one');
 await h.timers.values().next().value();await r.done;assert.equal(h.activated,0);
 const retry=await h.begin();assert.notEqual(retry.requestId,r.requestId);
 await h.dispatch({type:'CLIENT_UPDATE_STATUS',requestId:retry.requestId,safe:true},'one');
 await h.dispatch({type:'CLIENT_UPDATE_STATUS',requestId:retry.requestId,safe:true},'two');await retry.done;assert.equal(h.activated,1);
});

test('new visible windows must participate in a fresh activation vote',async()=>{
 const h=harness();h.clients.pop();const r=await h.begin();
 h.clients.push({id:'new',url:'https://example.test/',visibilityState:'visible',postMessage:data=>h.messages.push({id:'new',data})});
 await h.dispatch({type:'CLIENT_UPDATE_STATUS',requestId:r.requestId,safe:true},'one');assert.equal(h.activated,0);
 await h.timers.values().next().value();await r.done;assert.equal(h.activated,0);
});

test('release metadata always comes from the network without the offline cache',async()=>{
 const h=harness();let response;
 h.handlers.fetch({request:{method:'GET',url:'https://example.test/release.json'},respondWith:p=>{response=p;}});
 assert.deepEqual(await response,{network:true});assert.equal(h.cacheReads,0);assert.equal(h.requests.length,1);
 assert.equal(h.requests[0].options.cache,'no-store');
});
