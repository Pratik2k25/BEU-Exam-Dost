import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';

const appSource=readFileSync(new URL('../dist/app.js',import.meta.url),'utf8');
const styleSource=readFileSync(new URL('../dist/style.css',import.meta.url),'utf8');

test('desktop navigation uses a directional left rail without a device gate',()=>{
 assert.match(appSource,/function checkDesktopNotice\(\)\{\}/);
 assert.match(appSource,/desktop-side-nav/);
 assert.match(appSource,/desktop-rail-profile/);
 assert.match(appSource,/data-nav-direction/);
 assert.match(styleSource,/\.desktop-side-nav\.bottom-nav/);
 assert.match(styleSource,/@media \(min-width: 861px\) \{\s*\.app-shell \{\s*width: auto;/);
 assert.match(styleSource,/nav-rail-enter-from-above/);
 assert.match(styleSource,/nav-rail-enter-from-below/);
});

for (const active of ['quiz-pyq', 'quiz-master', 'home', 'subjects', 'pyqs']) {
 test(`mobile Quiz selection follows ${active} without changing desktop selection`,()=>{
  const links=[];
  const navSource=appSource.match(/^function nav\([^\n]+/m)[0];
  const nav=runInNewContext(navSource+'; nav',{
   state:{profile:{name:'Preview Student'}}, unreadCount:()=>0,
   profileInitial:()=>'P', esc:value=>value, icon:()=>'',
   link:(_text,path,className)=>{links.push({path,className});return '';},
  });
  nav(active);
  const isActive=path=>links.find(link=>link.path===path).className.split(/\s+/).includes('active');
  assert.equal(isActive('/quiz'),active.startsWith('quiz-'));
  assert.equal(isActive('/quiz/pyq'),active==='quiz-pyq');
  assert.equal(isActive('/quiz/master'),active==='quiz-master');
 });
}
