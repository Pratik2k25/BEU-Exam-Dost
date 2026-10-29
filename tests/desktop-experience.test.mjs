import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import telemetryHandler from '../api/telemetry.js';

const app = readFileSync(new URL('../dist/app.js', import.meta.url), 'utf8');
const syncClient = readFileSync(new URL('../dist/sync-client.js', import.meta.url), 'utf8');
const manifest = JSON.parse(readFileSync(new URL('../dist/manifest.webmanifest', import.meta.url), 'utf8'));
const telemetry = readFileSync(new URL('../dist/telemetry.js', import.meta.url), 'utf8');
const telemetryApi = readFileSync(new URL('../api/telemetry.js', import.meta.url), 'utf8');

test('desktop profile offers native app install instead of mobile PWA status', () => {
  assert.match(app, /Add BEU Exam Dost to your desktop/);
  assert.match(app, /show-desktop-install/);
  assert.match(app, /beforeinstallprompt/);
  assert.match(app, /getInstalledRelatedApps/);
  assert.doesNotMatch(app.match(/function isPwaActive\(\)\{([^\n]*)/)[1], /pwa_installed/);
});

test('installed app detection is declared in the manifest and prompt explains manual launch', () => {
  assert.ok(manifest.related_applications.some(app => app.platform === 'webapp'));
  assert.match(app, /Open BEU Exam Dost from your desktop shortcut, Start menu, or home screen/);
  assert.match(app, /Continue in browser/);
});

test('successful sync stores a timestamp and linked device card renders it', () => {
  assert.match(syncClient, /lastSyncedAt\s*=\s*new Date\(\)\.toISOString\(\)/);
  assert.match(app, /Last synced/);
  assert.match(app, /sync-last-sync/);
});

test('profile creation and help submissions send bounded details through server-side Telegram', () => {
  assert.match(telemetry, /notifyProfileCreated\(profile\)/);
  assert.match(telemetry, /notifyHelpRequest\(payload\)/);
  assert.match(telemetryApi, /body\.profile/);
  assert.match(telemetryApi, /body\.help/);
  assert.match(telemetryApi, /cleanText\(profile\.name\)/);
  assert.match(telemetryApi, /cleanText\(help\.message, 1500\)/);
  assert.match(app, /notifyProfileCreated\(state\.profile\)/);
  assert.match(app, /notifyHelpRequest\(\{name:/);
  assert.match(app, /Your name, college, branch and request details are sent to the BEU Exam Dost support team via Telegram/);
  assert.doesNotMatch(app, /mailto:beudeveloper@gmail\.com\?subject=/);
  assert.doesNotMatch(app, /Your request details are not sent to Telegram/);
});

test('telemetry API includes sanitized profile and help fields in Telegram message', async () => {
  const previousToken = process.env.TELEGRAM_BOT_TOKEN;
  const previousChat = process.env.TELEGRAM_CHAT_ID;
  const previousFetch = globalThis.fetch;
  let telegramPayload;
  process.env.TELEGRAM_BOT_TOKEN = 'unit-test-token';
  process.env.TELEGRAM_CHAT_ID = 'unit-test-chat';
  globalThis.fetch = async (_url, options) => {
    telegramPayload = JSON.parse(options.body);
    return Response.json({ ok: true });
  };
  try {
    const response = await telemetryHandler.fetch(new Request('https://local.test/api/telemetry', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event: 'help_request', device: { os: 'Windows', appMode: 'installed' }, help: { name: 'QA Student', college: 'BEU Test College', branch: 'CSE', category: 'General Query', subject: 'CN', message: 'Telegram delivery QA' } }),
    }));
    assert.equal(response.status, 200);
    assert.match(telegramPayload.text, /\[BEU Exam Dost\] help_request \| Windows installed/);
    assert.match(telegramPayload.text, /QA Student/);
    assert.match(telegramPayload.text, /BEU Test College/);
    assert.match(telegramPayload.text, /Telegram delivery QA/);
    assert.doesNotMatch(JSON.stringify(telegramPayload), /unit-test-token/);
  } finally {
    if (previousToken === undefined) delete process.env.TELEGRAM_BOT_TOKEN; else process.env.TELEGRAM_BOT_TOKEN = previousToken;
    if (previousChat === undefined) delete process.env.TELEGRAM_CHAT_ID; else process.env.TELEGRAM_CHAT_ID = previousChat;
    globalThis.fetch = previousFetch;
  }
});

test('profile and quiz history redraw after remote sync and on tab resume', () => {
  assert.match(app, /persistSyncedState\(result\.data\);syncStatus='synced';if\(\['profile','history','home'\]\.includes\(route\(\)\[0\]\)\)render\(\)/);
  assert.match(app, /announceNewNotifications\(\);runSyncCycle\(false\)/);
  assert.match(app, /function profile\(\)[\s\S]*?Recent quiz attempts/);
  assert.match(app, /\(a\.finished\?'\/result\/'\:'\/attempt\/'\)\+a\.id/);
});
