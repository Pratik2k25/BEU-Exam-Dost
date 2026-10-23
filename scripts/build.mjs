import {cpSync,mkdirSync,readFileSync,writeFileSync,readdirSync,rmSync} from 'node:fs';
import {resolve,join,relative,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
function files(dir){return readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?files(join(dir,e.name)):[join(dir,e.name)]).sort();}
export function buildSite({sourceDir=join(root,'dist'),outputDir=join(root,'build'),version=JSON.parse(readFileSync(join(root,'package.json'))).version,commit=process.env.VERCEL_GIT_COMMIT_SHA||null}={}){
 sourceDir=resolve(sourceDir);outputDir=resolve(outputDir);
 if(outputDir===sourceDir||sourceDir.startsWith(outputDir+'/')||outputDir.startsWith(sourceDir+'/'))throw Error('Build output must be separate from source.');
 const digest=createHash('sha256');
 for(const file of files(sourceDir)){digest.update(relative(sourceDir,file));digest.update('\0');digest.update(readFileSync(file));}
 digest.update(version);const buildId=digest.digest('hex').slice(0,16);
 rmSync(outputDir,{recursive:true,force:true});mkdirSync(outputDir,{recursive:true});cpSync(sourceDir,outputDir,{recursive:true});
 const index=join(outputDir,'index.html');writeFileSync(index,readFileSync(index,'utf8').replace(/(app\.js|style\.css)\?v=[^"']+/g,`$1?v=${buildId}`));
 const metadata=join(outputDir,'app-meta.js');let meta=readFileSync(metadata,'utf8').replace(/export const appVersion='[^']*'/,`export const appVersion='${version}'`).replace(/export const buildId='[^']*'/,`export const buildId='${buildId}'`);writeFileSync(metadata,meta);
 writeFileSync(join(outputDir,'release.json'),JSON.stringify({version,buildId,commit})+'\n');
 const shell=['./',...files(outputDir).map(file=>'./'+relative(outputDir,file).replaceAll('\\','/')).filter(p=>p!=='./sw.js').map(p=>['./app.js','./style.css'].includes(p)?p+'?v='+buildId:p)];
 const worker=join(outputDir,'sw.js');writeFileSync(worker,readFileSync(worker,'utf8').replace(/const CACHE='[^']*';/,`const CACHE='exam-dost-shell-${buildId}';`).replace(/const SHELL=\[.*?\];/s,`const SHELL=${JSON.stringify(shell)};`));
 return {buildId,version,fileCount:files(outputDir).length};
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url))console.log(JSON.stringify(buildSite()));
