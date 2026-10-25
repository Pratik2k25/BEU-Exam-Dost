import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

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
