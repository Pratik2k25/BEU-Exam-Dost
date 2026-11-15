import {mkdirSync,readFileSync,writeFileSync,copyFileSync,rmSync} from 'node:fs';
import {resolve,dirname,join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';

const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const output=join(root,'build');
const version=JSON.parse(readFileSync(join(root,'package.json'),'utf8')).version;
const manifest=JSON.parse(readFileSync(join(root,'dist/manifest.webmanifest'),'utf8'));
manifest.description='BEU Exam Dost has been discontinued. An announcement from BEU Developer.';
manifest.theme_color='#17191d';
manifest.background_color='#17191d';
delete manifest.shortcuts;
delete manifest.screenshots;

// Preserve the installed application's id, start_url, scope and original icons.
const assets=['outfit.ttf','OFL.txt','icon-192.png','icon-512.png','icon-maskable-192.png','icon-maskable-512.png'];
const files=new Map([
  ['index.html',readFileSync(join(root,'closure/index.html'))],
  ['manifest.webmanifest',Buffer.from(JSON.stringify(manifest,null,2)+'\n')],
  ['updates.js',readFileSync(join(root,'dist/updates.js'))],
  ...assets.map(name=>['assets/'+name,readFileSync(join(root,'dist/assets',name))]),
]);
const workerSource=readFileSync(join(root,'closure/sw.js'),'utf8');
const hash=createHash('sha256').update(version).update(workerSource);
for(const [path,content] of files)hash.update(path).update('\0').update(content);
const buildId='closure-'+hash.digest('hex').slice(0,16);
files.set('app-meta.js',Buffer.from(`export const buildId='${buildId}';\nexport const appVersion='${version}';\n`));
files.set('release.json',Buffer.from(JSON.stringify({version,buildId,commit:process.env.VERCEL_GIT_COMMIT_SHA||null})+'\n'));
const shell=['./',...files.keys()].map(p=>p==='./'?p:'./'+p);
files.set('sw.js',Buffer.from(workerSource.replace('__BUILD_ID__',buildId).replace('__SHELL__',JSON.stringify(shell))));

rmSync(output,{recursive:true,force:true});
for(const [path,content] of files){mkdirSync(dirname(join(output,path)),{recursive:true});writeFileSync(join(output,path),content);}
console.log(JSON.stringify({version,buildId,fileCount:files.size,mode:'service-closure'}));
