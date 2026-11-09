import test from 'node:test';
import assert from 'node:assert/strict';
import {handle,validate} from '../api/early-access.js';
const input={name:'Deployment Test',email:'deployment-test@example.com',website:'BEU Developer',consent:true,website_url:''};
let ip=0;
const request=(body=input,origin='https://beudeveloper.in')=>new Request('https://beudeveloper.in/api/early-access',{method:'POST',headers:{'Content-Type':'application/json',origin,'x-real-ip':String(++ip)},body:JSON.stringify(body)});
test('delivers source, email, consent and timestamp through existing relay',async()=>{
 let calls=0;
 const r=await handle(request(),async(url,options)=>{calls++;assert.equal(url,'https://app.beudeveloper.in/api/telemetry');const body=JSON.parse(options.body);assert.equal(body.event,'help_request');assert.match(body.help.message,/deployment-test@example.com/);assert.match(body.help.message,/Source: BEU Developer/);assert.match(body.help.message,/Opted in: Yes/);assert.match(body.help.message,/Submitted: \d{4}-\d{2}-\d{2}T/);return Response.json({ok:true});});
 assert.equal(r.status,200);assert.deepEqual(await r.json(),{ok:true});assert.equal(calls,1);
});
test('Telegram rejection never becomes success',async()=>{const r=await handle(request(),async()=>Response.json({ok:false},{status:502}));assert.equal(r.status,502);assert.notEqual((await r.json()).ok,true);});
test('non-JSON upstream and network failures never become success',async()=>{for(const send of [async()=>new Response('Unavailable'),async()=>{throw Error('private upstream detail')}]){const r=await handle(request(),send);assert.equal(r.status,502);assert.doesNotMatch(await r.text(),/private upstream detail/);}});
test('consent, source, name, email and honeypot validated before delivery',async()=>{for(const changes of [{consent:false},{website:'Unknown'},{name:'X'},{email:'bad'},{website_url:'spam'}]){let called=false;const r=await handle(request({...input,...changes}),async()=>{called=true;return Response.json({ok:true});});assert.equal(r.status,400);assert.equal(called,false);}});
test('untrusted browser origin rejected',async()=>{assert.equal((await handle(request(input,'https://attacker.example'))).status,403);});
test('both approved website sources supported',()=>{assert.equal(validate({...input,website:'BEU Exam Dost Web/PWA'}).website,'BEU Exam Dost Web/PWA');});
