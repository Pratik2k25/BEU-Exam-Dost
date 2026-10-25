import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {loadSubjectContent} from '../scripts/content/registry.mjs';
import {validateSubjectContent} from '../scripts/content/schema.mjs';

test('COA keeps all source occurrences and Important questions with resolved answers',async()=>{
 const content=await loadSubjectContent('coa');
 validateSubjectContent('coa',content.questions,content.solutions);
 const original=content.questions.filter(q=>q.kind==='original');
 assert.equal(original.length,90);
 assert.equal(content.questions.filter(q=>q.kind==='important').length,15);
 assert.equal(original.filter(q=>q.source.session==='supplementary').length,34);
 assert.equal(new Set(original.map(q=>q.id)).size,90);
 const byId=new Map(original.map(q=>[q.id,q]));
 // Equivalent DMA questions share the reviewed Important answer.
 assert.equal(byId.get('coa-original-2023-105401-q6a').solutionRef,'coa-q11');
 assert.equal(byId.get('coa-original-2025s-105401-q5b').solutionRef,'coa-q11');
 // Same topic alone does not make a numerical problem equivalent.
 assert.notEqual(byId.get('coa-original-2023-105401-q8b').solutionRef,byId.get('coa-original-2025s-105401-q3a').solutionRef);
 assert.notEqual(byId.get('coa-original-2023-105401-q7b').solutionRef,byId.get('coa-original-2025s-105401-q2b').solutionRef);
 // Previously mismapped subjects must remain distinct.
 assert.notEqual(byId.get('coa-original-2023-105401-q9a').solutionRef,byId.get('coa-original-2023-105401-q9b').solutionRef);
 assert.notEqual(byId.get('coa-original-2025-105401-q2a').solutionRef,byId.get('coa-original-2025-105401-q6a').solutionRef);
 assert.equal(byId.get('coa-original-2024s-105401-q7b').unit,6);
 assert.equal(byId.get('coa-original-2025s-105401-q2b').unit,3);
});

test('COA reviewed unit placement records every corrected catalogue tag',()=>{
 const audit=JSON.parse(readFileSync(new URL('../docs/content-audits/coa-unit-placement-audit.json',import.meta.url),'utf8'));
 assert.equal(audit.reclassifications.length,7);
 assert.ok(audit.reclassifications.every(({questionId,fromUnit,toUnit,reason})=>questionId&&fromUnit!==toUnit&&reason));
});

test('COA audit reconciles every original with verified CSV wording and page evidence',()=>{
 const audit=JSON.parse(readFileSync(new URL('../docs/content-audits/coa-pyq-important-audit.json',import.meta.url),'utf8'));
 assert.equal(audit.summary.originalOccurrences,90);
 assert.equal(audit.summary.importantQuestionsPreserved,15);
 assert.deepEqual(audit.errors,[]);
 assert.equal(audit.summary.occurrencesReusingImportantAnswer+audit.summary.occurrencesUsingDedicatedAnswer,90);
 assert.ok(audit.rows.every(row=>row.wordingMatchesVerifiedCsv&&row.wordingMatchesMaster&&row.sourcePageMatches));
 for(const row of audit.rows.filter(row=>row.decision==='reuse')){
  assert.ok(row.importantMatches.some(match=>match.id===row.solutionRef&&['covered','equivalent'].includes(match.relation)));
 }
});
