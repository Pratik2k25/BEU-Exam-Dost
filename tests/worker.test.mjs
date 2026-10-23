import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';

test('waiting worker requires safe votes from every open app window',async()=>{
 const handlers={},messages=[];let activated=0;
 const clients=['one','two'].map(id=>({id,url:'https://example.test/',postMessage:data=>messages.push({id,data})}));
 const self={registration:{scope:'https://example.test/'},clients:{matchAll:async()=>clients},skipWaiting:async()=>{activated++;},addEventListener:(type,fn)=>handlers[type]=fn};
 vm.runInNewContext(readFileSync(new URL('../dist/sw.js',import.meta.url),'utf8'),{self,setTimeout:()=>1,clearTimeout(){},URL,Set,Date,Math});
 async function send(data,id){const waits=[];handlers.message({data,source:{id},waitUntil:p=>waits.push(p)});await Promise.all(waits);}
 await send({type:'REQUEST_ACTIVATION'});let requestId=messages.at(-1).data.requestId;
 await send({type:'CLIENT_UPDATE_STATUS',requestId,safe:true},'one');assert.equal(activated,0);
 await send({type:'CLIENT_UPDATE_STATUS',requestId,safe:false},'two');assert.equal(activated,0);
 await send({type:'REQUEST_ACTIVATION'});requestId=messages.at(-1).data.requestId;
 await send({type:'CLIENT_UPDATE_STATUS',requestId,safe:true},'one');await send({type:'CLIENT_UPDATE_STATUS',requestId,safe:true},'two');assert.equal(activated,1);
});
