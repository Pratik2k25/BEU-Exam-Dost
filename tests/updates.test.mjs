import test from 'node:test';
import assert from 'node:assert/strict';
import {installUpdates} from '../dist/updates.js';

function harness({busy=false,persist=true}={}){
 const handlers=new Map(),sent=[],replies=[];let reloads=0,saves=0;
 const add=(type,fn)=>{const list=handlers.get(type)||[];list.push(fn);handlers.set(type,list);};
 const target={addEventListener:add,removeEventListener(){}};
 const registration={...target,waiting:{postMessage:m=>sent.push(m)},installing:null,update:async()=>{}};
 const worker={...target,controller:{},ready:Promise.resolve(),register:async(url,opts)=>{assert.equal(opts.updateViaCache,'none');return registration;}};
 const env={...target,location:{reload:()=>reloads++},setInterval:()=>1,clearInterval(){},setTimeout:fn=>fn()};
 const doc={...target,hidden:false};
 installUpdates({env,nav:{serviceWorker:worker},doc,canReload:()=>!busy,beforeReload:()=>{saves++;return persist;}});
 const emit=async(type,event={})=>{for(const fn of handlers.get(type)||[])await fn(event);await new Promise(r=>setImmediate(r));};
 return {sent,replies,emit,get reloads(){return reloads;},get saves(){return saves;},setBusy:v=>busy=v};
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
