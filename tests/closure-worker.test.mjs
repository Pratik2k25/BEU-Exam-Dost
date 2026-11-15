import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';

function harness(){
 const handlers={},messages=[];let activated=0,claimed=0,deletions=0;
 const clients=[{id:'student',url:'https://example.test/',visibilityState:'visible',postMessage:data=>messages.push(data)}];
 const closure={body:'Closure notice'};
 const self={location:{origin:'https://example.test'},registration:{scope:'https://example.test/'},clients:{matchAll:async()=>clients,claim:async()=>{claimed++;}},skipWaiting:async()=>{activated++;},addEventListener:(type,fn)=>handlers[type]=fn};
 const source=readFileSync(new URL('../closure/sw.js',import.meta.url),'utf8').replace('__BUILD_ID__','test').replace('__SHELL__','[]');
 vm.runInNewContext(source,{self,URL,Set,Date,Math,setTimeout,clearTimeout,fetch:async()=>{throw Error('offline');},caches:{open:async()=>({match:async()=>closure}),delete:async()=>{deletions++;}}});
 async function message(data){const waits=[];handlers.message({data,source:{id:'student'},waitUntil:p=>waits.push(p)});await Promise.all(waits);}
 return {handlers,messages,message,closure,get activated(){return activated;},get claimed(){return claimed;},get deletions(){return deletions;}};
}

test('closure waits for an unsaved student form before replacing the active shell',async()=>{
 const h=harness();let pending=h.message({type:'REQUEST_ACTIVATION'});
 await new Promise(r=>setImmediate(r));
 await h.message({type:'CLIENT_UPDATE_STATUS',requestId:h.messages.at(-1).requestId,safe:false});
 await pending;assert.equal(h.activated,0);
 pending=h.message({type:'REQUEST_ACTIVATION'});await new Promise(r=>setImmediate(r));
 await h.message({type:'CLIENT_UPDATE_STATUS',requestId:h.messages.at(-1).requestId,safe:true});
 await pending;assert.equal(h.activated,1);
});

test('closure activation retains study caches and serves the notice offline for deep links',async()=>{
 const h=harness();let promise;
 h.handlers.activate({waitUntil:p=>promise=p});await promise;
 assert.equal(h.deletions,0);assert.equal(h.claimed,1);
 h.handlers.fetch({request:{method:'GET',url:'https://example.test/subjects',mode:'navigate'},respondWith:p=>promise=p});
 assert.equal(await promise,h.closure);
});

test('closure worker leaves APIs and release checks on the network',()=>{
 const h=harness();
 for(const path of ['/api/telemetry','/release.json','/sw.js']){
  let handled=false;
  h.handlers.fetch({request:{method:'GET',url:'https://example.test'+path},respondWith:()=>{handled=true;}});
  assert.equal(handled,false,path);
 }
});
