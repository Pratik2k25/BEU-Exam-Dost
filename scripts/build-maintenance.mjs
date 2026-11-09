import {execFileSync} from 'node:child_process';
import {cpSync,readFileSync,writeFileSync,readdirSync} from 'node:fs';
import {createHash} from 'node:crypto';
execFileSync(process.execPath,['scripts/build.mjs'],{stdio:'inherit'});
const files=(dir)=>readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?files(`${dir}/${e.name}`):[`${dir}/${e.name}`]).sort();
const hash=createHash('sha256');
for(const file of files('maintenance'))hash.update(file).update(readFileSync(file));
const buildId='maintenance-'+hash.digest('hex').slice(0,16);
for(const [from,to] of [['developer','maintenance-developer'],['exam','maintenance-exam']]){
 cpSync(`maintenance/${from}`,`build/${to}`,{recursive:true});
 let html=readFileSync(`build/${to}/index.html`,'utf8').replaceAll('./assets/',`/${to}/assets/`);
 html=html.replace(/<script>if\('serviceWorker'[\s\S]*?<\/script>/,'');
 html=html.replace('./manifest.webmanifest','/manifest.webmanifest');
 if(from==='exam')html=html.replace('</body>','<script type="module">import{installUpdates}from"/updates.js";installUpdates({canReload:()=>true,beforeReload:()=>true});</script></body>');
 writeFileSync(`build/${to}/index.html`,html);
 if(from==='exam')writeFileSync('build/index.html',html);
}
const baseline=readFileSync('maintenance/baseline-sw.js','utf8');
const handshake=baseline.slice(baseline.indexOf('let activation=null;'));
const shell=['/','/index.html','/manifest.webmanifest','/updates.js','/app-meta.js',...files('build/maintenance-exam/assets').map(f=>f.slice('build'.length))];
const worker=`const CACHE=${JSON.stringify('beu-'+buildId)};\nconst SHELL=${JSON.stringify(shell)};\nself.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL.map(url=>new Request(url,{cache:'reload'}))))));\n// Preserve every existing cache and all local profile data for rollback.\nself.addEventListener('activate',event=>event.waitUntil(self.clients.claim()));\nself.addEventListener('fetch',event=>{\n const r=event.request,u=new URL(r.url);\n if(r.method!=='GET'||u.origin!==self.location.origin||u.pathname.startsWith('/api/')||['/release.json','/sw.js'].includes(u.pathname))return;\n if(r.mode==='navigate'){event.respondWith(fetch(r,{cache:'no-store'}).catch(()=>caches.open(CACHE).then(c=>c.match('/index.html'))));return;}\n if(SHELL.includes(u.pathname))event.respondWith(caches.open(CACHE).then(async c=>(await c.match(r))||fetch(r)));\n});\n`+handshake;
writeFileSync('build/sw.js',worker);
writeFileSync('build/app-meta.js',readFileSync('build/app-meta.js','utf8').replace(/export const buildId='[^']*'/,`export const buildId='${buildId}'`));
const release=JSON.parse(readFileSync('build/release.json'));
writeFileSync('build/release.json',JSON.stringify({...release,buildId,maintenance:true})+'\n');
console.log(JSON.stringify({maintenanceBuildId:buildId,preservesCaches:true}));
