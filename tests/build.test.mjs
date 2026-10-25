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

test('release excludes development source scans even when questions reference them',()=>{
 const root=mkdtempSync(join(tmpdir(),'exam-dost-source-build-'));
 const sourcePath='docs/content-sources/CN-2025-Q3a-scan.png';
 try{
  const source=join(root,'source'),output=join(root,'output');cpSync(new URL('../dist',import.meta.url),source,{recursive:true});
  appendFileSync(join(source,'data.js'),`\n// ${sourcePath}\n`);
  const result=buildSite({sourceDir:source,outputDir:output});
  const assetPath=join(output,...sourcePath.split('/'));
  const worker=readFileSync(join(output,'sw.js'),'utf8');
  const shell=JSON.parse(worker.match(/const SHELL=(\[.*?\]);/s)[1]);
  assert.equal(shell.some(path=>path.includes('docs/content-sources/')),false);
  assert.equal(existsSync(assetPath),false);
  assert.ok(result.buildId);
 }finally{rmSync(root,{recursive:true,force:true});}
});
