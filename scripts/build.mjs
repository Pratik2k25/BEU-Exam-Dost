import {cpSync,mkdirSync,readFileSync,writeFileSync,readdirSync,rmSync,existsSync,copyFileSync} from 'node:fs';
import {resolve,join,relative,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
let root = process.cwd();
if (!existsSync(join(root, 'dist'))) root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
function files(dir){return readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?files(join(dir,e.name)):[join(dir,e.name)]).sort();}
export function buildSite({sourceDir=join(root,'dist'),outputDir=join(root,'build'),version=JSON.parse(readFileSync(join(root,'package.json'))).version,commit=process.env.VERCEL_GIT_COMMIT_SHA||null}={}){
 sourceDir=resolve(sourceDir);outputDir=resolve(outputDir);
 if(outputDir===sourceDir)throw Error('Build output must be separate from source.');
 if(sourceDir===resolve(join(root,'dist'))){
  const assets=join(sourceDir,'assets');mkdirSync(assets,{recursive:true});
  for(const [from,to] of [
   ['node_modules/qrcode-generator/dist/qrcode.mjs','qrcode-generator.mjs'],
   ['node_modules/qr-scanner/qr-scanner.min.js','qr-scanner.min.js'],
   ['node_modules/qr-scanner/qr-scanner-worker.min.js','qr-scanner-worker.min.js'],
   ['node_modules/qr-scanner/LICENSE','LICENSE.qr-scanner.txt'],
  ]) copyFileSync(join(root,from),join(assets,to));
 }
 const digest=createHash('sha256');
 for(const file of files(sourceDir)){digest.update(relative(sourceDir,file));digest.update('\0');digest.update(readFileSync(file));}
 digest.update(version);const buildId=digest.digest('hex').slice(0,16);
 rmSync(outputDir,{recursive:true,force:true});mkdirSync(outputDir,{recursive:true});cpSync(sourceDir,outputDir,{recursive:true});
 const index=join(outputDir,'index.html');writeFileSync(index,readFileSync(index,'utf8').replace(/(app\.js|style\.css)\?v=[^"']+/g,`$1?v=${buildId}`));
 const metadata=join(outputDir,'app-meta.js');let meta=readFileSync(metadata,'utf8').replace(/export const appVersion='[^']*'/,`export const appVersion='${version}'`).replace(/export const buildId='[^']*'/,`export const buildId='${buildId}'`);writeFileSync(metadata,meta);
 writeFileSync(join(outputDir,'release.json'),JSON.stringify({version,buildId,commit})+'\n');
 const shell=['./',...files(outputDir).map(file=>'./'+relative(outputDir,file).replaceAll('\\','/')).filter(p=>p!=='./sw.js').map(p=>['./app.js','./style.css'].includes(p)?p+'?v='+buildId:p)];
 const worker=join(outputDir,'sw.js');writeFileSync(worker,readFileSync(worker,'utf8').replace(/const CACHE='[^']*';/,`const CACHE='exam-dost-shell-${buildId}';`).replace(/const SHELL=\[.*?\];/s,`const SHELL=${JSON.stringify(shell)};`));
 const landingDir=join(root,'landing');
 if(existsSync(landingDir)&&outputDir.endsWith('build')){cpSync(landingDir,join(outputDir,'landing'),{recursive:true});}
 const newApk=join(root,'new-exam-dost.apk');
 const oldApk=join(root,'beuexamdost.apk');
 const srcApk=existsSync(newApk)?newApk:(existsSync(oldApk)?oldApk:null);
 if(srcApk&&outputDir.endsWith('build')){
  cpSync(srcApk,join(outputDir,'new-exam-dost.apk'));
  cpSync(srcApk,join(outputDir,'beuexamdost.apk'));
  const landingOut=join(outputDir,'landing');
  if(existsSync(landingOut)){
   cpSync(srcApk,join(landingOut,'new-exam-dost.apk'));
   cpSync(srcApk,join(landingOut,'beuexamdost.apk'));
  }
 }
 return {buildId,version,fileCount:files(outputDir).length};
}
try {
 console.log(JSON.stringify(buildSite()));
} catch(err) {
 console.error('buildSite execution failed:', err);
 process.exit(1);
}
