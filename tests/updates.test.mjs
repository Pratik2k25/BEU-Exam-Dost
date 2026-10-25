import test from 'node:test';
import assert from 'node:assert/strict';
import {installUpdates,UPDATE_INTERVAL_MS} from '../dist/updates.js';

function harness({busy=false,persist=true,fetchRelease,waiting=true}={}){
 const handlers=new Map(),sent=[],replies=[],intervals=[];let reloads=0,saves=0,updates=0;
 const add=(type,fn)=>{const list=handlers.get(type)||[];list.push(fn);handlers.set(type,list);};
 const target={addEventListener:add,removeEventListener(){}};
 const registration={...target,scope:'https://example.test/',waiting:waiting?{postMessage:m=>sent.push(m)}:null,installing:null,update:async()=>{updates++;}};
 const worker={...target,controller:{},ready:Promise.resolve(),register:async(url,opts)=>{assert.equal(opts.updateViaCache,'none');return registration;}};
 const env={...target,location:{reload:()=>reloads++},setInterval:(fn,ms)=>{intervals.push({fn,ms});return 1;},clearInterval(){},setTimeout:fn=>{fn();return 1;}};
 if(fetchRelease)env.fetch=fetchRelease;
 const doc={...target,hidden:false};
 const nav={serviceWorker:worker,onLine:true};
 installUpdates({env,nav,doc,currentBuild:'installed-build',canReload:()=>!busy,beforeReload:()=>{saves++;return persist;}});
 const emit=async(type,event={})=>{for(const fn of handlers.get(type)||[])await fn(event);await new Promise(r=>setImmediate(r));};
 return {sent,replies,emit,intervals,doc,nav,get reloads(){return reloads;},get saves(){return saves;},get updates(){return updates;},setBusy:v=>busy=v};
}

test('installed update waits for a quiz, then activates and persists before one reload',async()=>{
 const h=harness({busy:true});await new Promise(r=>setImmediate(r));assert.equal(h.sent.length,0);
 await h.emit('message',{data:{type:'UPDATE_CHECK',requestId:'one'},source:{postMessage:m=>h.replies.push(m)}});
 assert.equal(h.replies[0].safe,false);
 h.setBusy(false);await h.emit('hashchange');assert.equal(h.sent.at(-1).type,'REQUEST_ACTIVATION');
 await h.emit('controllerchange');await h.emit('controllerchange');assert.equal(h.saves,1);assert.equal(h.reloads,1);
});
test('controller changes never reload an active quiz or failed local save',async()=>{
 const h=harness({busy:true,persist:false});await h.emit('controllerchange');assert.equal(h.reloads,0);
 h.setBusy(false);await h.emit('hashchange');assert.equal(h.saves,1);assert.equal(h.reloads,0);
});
test('typing in a connected form defers automatic activation',async()=>{
 const h=harness();await new Promise(r=>setImmediate(r));h.sent.length=0;
 const form={isConnected:true};await h.emit('input',{target:{closest:()=>form}});await h.emit('focus');assert.equal(h.sent.length,0);
 form.isConnected=false;await h.emit('hashchange');assert.equal(h.sent.at(-1).type,'REQUEST_ACTIVATION');
});

test('open online app checks an uncached release every five seconds and installs changed builds',async()=>{
 let latest='installed-build';const requests=[];
 const h=harness({waiting:false,fetchRelease:async(url,options)=>{requests.push({url:String(url),options});return {ok:true,json:async()=>({buildId:latest})};}});
 await new Promise(r=>setImmediate(r));
 assert.equal(h.updates,1);assert.equal(h.intervals[0].ms,5000);assert.equal(UPDATE_INTERVAL_MS,5000);
 assert.equal(requests[0].url,'https://example.test/release.json');assert.equal(requests[0].options.cache,'no-store');
 h.intervals[0].fn();await new Promise(r=>setImmediate(r));assert.equal(h.updates,1);
 latest='deployed-build';h.intervals[0].fn();await new Promise(r=>setImmediate(r));assert.equal(h.updates,2);
 const count=requests.length;h.doc.hidden=true;h.intervals[0].fn();await new Promise(r=>setImmediate(r));assert.equal(requests.length,count);
 h.doc.hidden=false;h.nav.onLine=false;h.intervals[0].fn();await new Promise(r=>setImmediate(r));assert.equal(requests.length,count);
 h.nav.onLine=true;await h.emit('online');assert.equal(requests.length,count+1);
});

test('focus and timer checks share one in-flight release request',async()=>{
 let finish,calls=0;
 const h=harness({waiting:false,fetchRelease:()=>{calls++;return new Promise(resolve=>{finish=resolve;});}});
 await new Promise(r=>setImmediate(r));await h.emit('focus');h.intervals[0].fn();await h.emit('pageshow');
 assert.equal(calls,1);
 finish({ok:true,json:async()=>({buildId:'installed-build'})});await new Promise(r=>setImmediate(r));
 await h.emit('focus');assert.equal(calls,2);
 finish({ok:true,json:async()=>({buildId:'installed-build'})});await new Promise(r=>setImmediate(r));
});

test('a hidden window with unsaved work defers its own reload after another window activates',async()=>{
 const h=harness();await new Promise(r=>setImmediate(r));const form={isConnected:true};
 await h.emit('input',{target:{closest:()=>form}});h.doc.hidden=true;await h.emit('controllerchange');
 assert.equal(h.reloads,0);form.isConnected=false;h.doc.hidden=false;await h.emit('hashchange');assert.equal(h.reloads,1);
});
