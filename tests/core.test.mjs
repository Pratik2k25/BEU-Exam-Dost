import test from 'node:test';
import assert from 'node:assert/strict';
import {scoreQuiz, recordTime, validateBackup, yearCounts, buildPlan} from '../dist/core.js';
test('scoring distinguishes unanswered, zero index and wrong answers',()=>{
 const r=scoreQuiz([{answer:0},{answer:1},{answer:2}], [0,0,null], [10,20,30]);
 assert.equal(r.correct,1);assert.equal(r.wrong,1);assert.equal(r.skipped,1);assert.equal(r.totalSeconds,60);assert.equal(r.accuracy,50);
});
test('revisiting adds elapsed time only to the active question',()=>{
 assert.deepEqual(recordTime([5,10],1,1000,4500),[5,13.5]);
 assert.deepEqual(recordTime([5],0,5000,1000),[5]);
});
test('backup rejects foreign or malformed data and allows a valid saved profile',()=>{
 assert.throws(()=>validateBackup({profile:{name:'x'}}));
 assert.throws(()=>validateBackup({app:'exam-dost',version:1,state:{profile:{name:9}}}));
 assert.throws(()=>validateBackup({app:'exam-dost',version:1,state:{profile:null,attempts:'bad'}}));
 const b={app:'exam-dost',version:1,state:{profile:{name:'Anant',college:'Banka',branch:'CSE'},topics:{},saved:[],marked:[],attempts:[],tasks:[],exams:{},settings:{}}};
 assert.equal(validateBackup(b).profile.name,'Anant');
});
test('year analysis counts source occurrences once using primary unit',()=>{
 const r=yearCounts([{unit:1,units:[1,2],years:[2022,2023]},{unit:2,years:[2023]}],[2022,2023],2);
 assert.deepEqual(r,[[1,1],[0,1]]);
});
test('planner respects daily minutes and skips completed topics',()=>{
 const p=buildPlan([{id:'a',title:'A',subject:'cn'},{id:'b',title:'B',subject:'coa'},{id:'c',title:'C',subject:'cn'}],{a:true},'2026-10-23',[30,30,30,30,30,30,30],{});
 assert.equal(p.length,2);assert.equal(p[0].topic,'b');assert.equal(p[0].date,'2026-10-23');assert.equal(p[1].date,'2026-10-24');
});
test('IDs can be created on HTTP preview without randomUUID',async()=>{const {uid}=await import('../dist/core.js');const provider={getRandomValues:a=>crypto.getRandomValues(a)};const a=uid(provider),b=uid(provider);assert.notEqual(a,b);assert.match(a,/^[a-z0-9-]+$/i);});
test('backup rejects empty quizzes and invalid current question indexes',()=>{
 const base={app:'exam-dost',version:1,state:{profile:null,attempts:[{questions:[],answers:[],times:[],index:0}]}};
 assert.throws(()=>validateBackup(base));
 const q={text:'A?',options:['A','B'],answer:0,explanation:'A'};
 base.state.attempts=[{questions:[q],answers:[null],times:[0],index:3}];assert.throws(()=>validateBackup(base));
});
test('offline shell lists only files that exist in the deploy directory',async()=>{
 const fs=await import('node:fs');const sw=fs.readFileSync(new URL('../dist/sw.js',import.meta.url),'utf8');const paths=sw.match(/const SHELL=\[(.*?)\];/s)[1].match(/'([^']+)'/g).map(v=>v.slice(1,-1));
 for(const p of paths){const file=p==='./'?'index.html':p.slice(2).split('?')[0];assert.ok(fs.existsSync(new URL('../dist/'+file,import.meta.url)),file+' missing from offline shell');}
});

test('shared exam routine matches all six papers and the official afternoon session',async()=>{
 const {examSchedule,examDates,examSession}=await import('../dist/schedule.js');
 assert.deepEqual(examSchedule.map(e=>[e.subject,e.date]),[['cn','2026-10-29'],['coa','2026-10-31'],['flat','2026-11-02'],['dbms','2026-11-03'],['daa','2026-11-05'],['etc','2026-11-07']]);
 assert.equal(examSession.start,'14:00');assert.equal(examSession.end,'17:00');assert.equal(examSession.timeZone,'Asia/Kolkata');
 assert.equal(Object.keys(examDates).length,6);
});
test('planner prioritises the shared exam order without personal date entry',async()=>{
 const {examDates}=await import('../dist/schedule.js');
 const topics=['etc','daa','dbms','flat','coa','cn'].map(subject=>({id:subject,title:subject,subject}));
 const plan=buildPlan(topics,{},'2026-10-23',[180,180,180,180,180,180,180],examDates);
 assert.deepEqual(plan.map(t=>t.subject),['cn','coa','flat','dbms','daa','etc']);
});
