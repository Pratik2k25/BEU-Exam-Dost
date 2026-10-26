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

test('Telegram telemetry sends only event and device mode, including help-request events', () => {
  assert.match(telemetry, /notifyHelpRequest\(\)\s*\{\s*return sendEvent\('help_request'\)/);
  assert.doesNotMatch(telemetry, /help:\s*payload/);
  assert.doesNotMatch(telemetryApi, /Name:|College:|Message:|body\.help/);
  assert.match(telemetryApi, /\[BEU Exam Dost\] \$\{body\.event\} \| \$\{device\.os\} \$\{device\.appMode\}/);
  assert.match(app, /e\.stopImmediatePropagation\(\)[\s\S]*?notifyHelpRequest\(\)[\s\S]*?Your request stays on this device until you choose to open your email app and send it/);
  assert.match(app, /mailto:beudeveloper@gmail\.com\?subject=/);
});

test('telemetry API drops extra student details before building Telegram message', async () => {
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
      body: JSON.stringify({ event: 'help_request', device: { os: 'Windows', appMode: 'installed' }, name: 'private student', message: 'private request' }),
    }));
    assert.equal(response.status, 200);
    assert.equal(telegramPayload.text, '[BEU Exam Dost] help_request | Windows installed');
    assert.doesNotMatch(JSON.stringify(telegramPayload), /private student|private request/);
  } finally {
    if (previousToken === undefined) delete process.env.TELEGRAM_BOT_TOKEN; else process.env.TELEGRAM_BOT_TOKEN = previousToken;
    if (previousChat === undefined) delete process.env.TELEGRAM_CHAT_ID; else process.env.TELEGRAM_CHAT_ID = previousChat;
    globalThis.fetch = previousFetch;
  }
});
