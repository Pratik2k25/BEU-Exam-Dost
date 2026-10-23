import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,rmSync,cpSync,readFileSync,appendFileSync,existsSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {buildSite} from '../scripts/build.mjs';

test('build automatically fingerprints changed assets and creates a complete versioned offline shell',()=>{
 const root=mkdtempSync(join(tmpdir(),'exam-dost-build-'));
 try{
  const source=join(root,'source'),output=join(root,'output');cpSync(new URL('../dist',import.meta.url),source,{recursive:true});
  const first=buildSite({sourceDir:source,outputDir:output});const same=buildSite({sourceDir:source,outputDir:output});assert.equal(first.buildId,same.buildId);
  appendFileSync(join(source,'data.js'),'\n// new exam content\n');const next=buildSite({sourceDir:source,outputDir:output});assert.notEqual(next.buildId,first.buildId);
  const worker=readFileSync(join(output,'sw.js'),'utf8');assert.ok(worker.includes('exam-dost-shell-'+next.buildId));
  const shell=JSON.parse(worker.match(/const SHELL=(\[.*?\]);/s)[1]);
  for(const p of shell)assert.ok(existsSync(join(output,p==='./'?'index.html':p.split('?')[0])),p);
  assert.ok(readFileSync(join(output,'index.html'),'utf8').includes('app.js?v='+next.buildId));
  assert.ok(readFileSync(join(output,'app-meta.js'),'utf8').includes(next.buildId));
 }finally{rmSync(root,{recursive:true,force:true});}
});
