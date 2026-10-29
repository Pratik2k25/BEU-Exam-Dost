import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const html = readFileSync(new URL('../dist/index.html', import.meta.url), 'utf8');
const app = readFileSync(new URL('../dist/app.js', import.meta.url), 'utf8');

test('application shell shows startup UI instead of the crawlable fallback while modules boot', () => {
  assert.match(html, /id="app" class="app-booting"/);
  assert.match(html, /class="app-startup"[^>]*>.*?Opening BEU Exam Dost/s);
  assert.match(html, /#app\.app-booting>header\.main-header[^}]*display:none/s);
  assert.match(app, /classList\.remove\('app-booting'\)/);
});

test('stored appearance is applied before the stylesheet paints', () => {
  const headScript = html.match(/<script>[^<]*localStorage\.getItem\('exam-dost-v1'\)[^<]*<\/script>/);
  assert.ok(headScript, 'synchronous appearance bootstrap exists in document head');
  assert.match(headScript[0], /dataset\.theme/);
});
