import test from 'node:test';
import assert from 'node:assert/strict';
import { mergeStudyState, createDeviceCredential, parsePairingLink, SyncClient } from '../dist/sync-client.js';

test('merges independent progress and keeps completed topic progress', () => {
  const local = { topics: { cn1: true, cn2: false }, tasks: [], saved: ['q1'] };
  const remote = { topics: { cn1: false, cn2: true }, tasks: [], saved: ['q2'] };
  assert.deepEqual(mergeStudyState(local, remote), {
    topics: { cn1: true, cn2: true }, tasks: [], saved: ['q1', 'q2'],
  });
});

test('merges records by id without duplicating quiz attempts or tasks', () => {
  const local = { attempts: [{ id: 'a1', score: 3 }], tasks: [{ id: 't1', status: 'pending' }] };
  const remote = { attempts: [{ id: 'a1', score: 4 }, { id: 'a2', score: 2 }], tasks: [{ id: 't1', status: 'done' }] };
  const merged = mergeStudyState(local, remote);
  assert.deepEqual(merged.attempts, [{ id: 'a1', score: 3 }, { id: 'a2', score: 2 }]);
  assert.deepEqual(merged.tasks, [{ id: 't1', status: 'done' }]);
});

test('does not mutate source snapshots and keeps local profile/settings when both changed', () => {
  const local = { profile: { name: 'Desktop' }, settings: { theme: 'dark' } };
  const remote = { profile: { name: 'Mobile' }, settings: { theme: 'light' } };
  assert.deepEqual(mergeStudyState(local, remote), { profile: { name: 'Desktop' }, settings: { theme: 'dark' } });
  assert.equal(remote.profile.name, 'Mobile');
});

test('three-way merge incorporates remote-only changes and preserves local-only changes', () => {
  const baseline = { profile: { name: 'A' }, topics: { cn1: false, cn2: false }, settings: { theme: 'light' } };
  const local = { profile: { name: 'A' }, topics: { cn1: false, cn2: true }, settings: { theme: 'dark' } };
  const remote = { profile: { name: 'B' }, topics: { cn1: true, cn2: false }, settings: { theme: 'light' } };
  assert.deepEqual(mergeStudyState(local, remote, baseline), {
    profile: { name: 'B' }, topics: { cn1: true, cn2: true }, settings: { theme: 'dark' },
  });
});

test('three-way merge respects a local unbookmark without dropping another device addition', () => {
  const baseline = { saved: ['q1', 'q2'] };
  const local = { saved: ['q2'] };
  const remote = { saved: ['q1', 'q2', 'q3'] };
  assert.deepEqual(mergeStudyState(local, remote, baseline), { saved: ['q2', 'q3'] });
});

test('creates a URL-safe high-entropy device credential', () => {
  const values = new Uint8Array(32).map((_, index) => index);
  const credential = createDeviceCredential({ getRandomValues: target => { target.set(values); return target; } });
  assert.match(credential, /^[A-Za-z0-9_-]{43}$/);
});

test('accepts only same-origin app pairing links and validates the request token and public key', () => {
  const publicKey = 'A'.repeat(96);
  assert.deepEqual(parsePairingLink(`https://app.beudeveloper.in/#/link-device/session-1/Abcdefghijklmnopqrstuvwxyz0123456789_-/${publicKey}`, 'https://app.beudeveloper.in'), {
    sessionId: 'session-1',
    requestCredential: 'Abcdefghijklmnopqrstuvwxyz0123456789_-',
    publicKey,
  });
  assert.equal(parsePairingLink(`https://evil.example/#/link-device/session-1/Abcdefghijklmnopqrstuvwxyz0123456789_-/${publicKey}`, 'https://app.beudeveloper.in'), null);
});

test('requires explicit opt-in before enrollment makes a network request', async () => {
  let calls = 0;
  const client = new SyncClient({
    storage: { getItem: () => null, setItem() {} },
    fetcher: async () => { calls++; return Response.json({ accountId: 'a1', deviceId: 'd1', revision: 1 }); },
  });
  await assert.rejects(client.enroll({ profile: {} }, 'Mobile', false), /Explicit consent/);
  assert.equal(calls, 0);
});

test('enrollment stores only the backend-issued identity after successful opt-in', async () => {
  let saved;
  const storage = { getItem: () => null, setItem: (_key, value) => { saved = JSON.parse(value); } };
  const client = new SyncClient({
    storage,
    fetcher: async (_url, options) => {
      const request = JSON.parse(options.body);
      assert.match(request.credential, /^[A-Za-z0-9_-]{43}$/);
      return Response.json({ accountId: 'account-1', deviceId: 'device-1', revision: 1 });
    },
  });
  const result = await client.enroll({ profile: { name: 'Student' } }, 'Phone', true);
  assert.equal(result.accountId, 'account-1');
  assert.equal(result.pendingReview, false);
  assert.equal(saved.credential, result.credential);
  assert.deepEqual(saved.baseline, { profile: { name: 'Student' } });
});

test('desktop logout revokes the server credential before clearing local sync keys', async () => {
  const removed = [];
  const metadata = { credential: 'device-secret', accountId: 'account-1', deviceId: 'desktop-1' };
  const storage = {
    getItem: key => key === 'exam-dost-sync-device-v1' ? JSON.stringify(metadata) : null,
    setItem() {},
    removeItem: key => removed.push(key),
  };
  let request;
  const client = new SyncClient({
    storage,
    fetcher: async (_url, options) => {
      request = options;
      return Response.json({ loggedOut: true });
    },
  });
  const result = await client.logoutDevice();
  assert.equal(request.method, 'POST');
  assert.equal(request.headers.Authorization, 'Bearer device-secret');
  assert.deepEqual(JSON.parse(request.body), { action: 'logout' });
  assert.equal(result.loggedOut, true);
  assert.deepEqual(removed, ['exam-dost-sync-device-v1', 'exam-dost-sync-pending-v1', 'exam-dost-sync-phone-pending-v1']);
});

test('pairing request creates a same-origin deep link and stores only temporary credentials locally', async () => {
  let pending;
  let requestBody;
  const client = new SyncClient({
    origin: 'https://app.beudeveloper.in',
    storage: { getItem: key => key === 'exam-dost-sync-pending-v1' ? JSON.stringify(pending) : null, setItem: (_key, value) => { pending = JSON.parse(value); } },
    fetcher: async (_url, options) => {
      requestBody = JSON.parse(options.body);
      return Response.json({ sessionId: 'session-1234', expiresAt: Date.now() + 115_000, expiresInSeconds: 115 });
    },
  });
  const result = await client.beginPairing('Desktop browser');
  assert.equal(result.link, `https://app.beudeveloper.in/#/link-device/session-1234/${result.requestCredential}/${result.publicKey}`);
  assert.equal(pending.sessionId, 'session-1234');
  assert.equal(requestBody.action, 'startPairing');
  assert.match(pending.deviceCredential, /^[A-Za-z0-9_-]{43}$/);
  assert.equal(result.expiresAt, pending.expiresAt);
  assert.ok(pending.expiresAt > Date.now());
  assert.ok(pending.expiresAt <= Date.now() + 121_000);
});

test('phone starts an expiring PIN session and stores only its session details locally', async () => {
  const values = new Map([['exam-dost-sync-device-v1', JSON.stringify({ credential: 'A'.repeat(43), dataKey: 'B'.repeat(43) })]]);
  let request;
  const client = new SyncClient({
    storage: { getItem: key => values.get(key) || null, setItem: (key, value) => values.set(key, value), removeItem: key => values.delete(key) },
    fetcher: async (_url, options) => { request = JSON.parse(options.body); return Response.json({ sessionId: 'session-9876', expiresAt: Date.now() + 120_000 }); },
  });
  const result = await client.beginPhonePairing('Desktop browser');
  assert.equal(request.action, 'startPhonePairing');
  assert.match(request.pairingCode, /^\d{4}$/);
  assert.equal(request.label, 'Desktop browser');
  assert.match(request.requestCredential, /^[A-Za-z0-9_-]{43}$/);
  assert.equal(result.sessionId, 'session-9876');
  assert.equal(client.phonePairing().code, request.pairingCode);
});

test('desktop claims a phone-generated PIN with a fresh ephemeral key and polls the claimed pairing', async () => {
  const values = new Map();
  const requests = [];
  const client = new SyncClient({
    storage: { getItem: key => values.get(key) || null, setItem: (key, value) => values.set(key, value), removeItem: key => values.delete(key) },
    origin: 'https://app.beudeveloper.in',
    fetcher: async (_url, options) => { const body = JSON.parse(options.body); requests.push(body); return Response.json({ sessionId: 'session-9876', expiresAt: Date.now() + 120_000 }); },
  });
  const result = await client.claimPairingCode('0427', 'Desktop browser');
  assert.equal(requests[0].action, 'claimPairingCode');
  assert.equal(requests[0].code, '0427');
  assert.match(requests[0].deviceCredential, /^[A-Za-z0-9_-]{43}$/);
  assert.match(requests[0].publicKey, /^[A-Za-z0-9_-]{80,120}$/);
  assert.equal(client.pendingPairing().method, 'pin');
  assert.equal(result.sessionId, 'session-9876');
});

test('a new device inherits the linked profile appearance while merging study progress', () => {
  const local = { profile: null, settings: { theme: 'light', goal: 'Complete important topics' }, topics: { localTopic: true } };
  const remote = { profile: { name: 'Primary student' }, settings: { theme: 'dark', goal: 'Revise weak topics' }, topics: { remoteTopic: true } };
  const merged = mergeStudyState(local, remote);
  assert.equal(merged.settings.theme, 'dark');
  assert.equal(merged.settings.goal, 'Revise weak topics');
  assert.equal(merged.topics.localTopic, true);
  assert.equal(merged.topics.remoteTopic, true);
});
