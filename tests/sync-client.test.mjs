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

test('accepts only same-origin app pairing links and validates their short token', () => {
  assert.deepEqual(parsePairingLink('https://app.beudeveloper.in/#/link-device/session-1/Abcdefghijklmnopqrstuvwxyz0123456789_-', 'https://app.beudeveloper.in'), {
    sessionId: 'session-1',
    requestCredential: 'Abcdefghijklmnopqrstuvwxyz0123456789_-',
  });
  assert.equal(parsePairingLink('https://evil.example/#/link-device/session-1/Abcdefghijklmnopqrstuvwxyz0123456789_-', 'https://app.beudeveloper.in'), null);
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

test('pairing request creates a same-origin deep link and stores only temporary credentials locally', async () => {
  let pending;
  let requestBody;
  const client = new SyncClient({
    origin: 'https://app.beudeveloper.in',
    storage: { getItem: key => key === 'exam-dost-sync-pending-v1' ? JSON.stringify(pending) : null, setItem: (_key, value) => { pending = JSON.parse(value); } },
    fetcher: async (_url, options) => {
      requestBody = JSON.parse(options.body);
      return Response.json({ sessionId: 'session-1234', expiresInSeconds: 180 });
    },
  });
  const result = await client.beginPairing('Desktop browser');
  assert.equal(result.link, `https://app.beudeveloper.in/#/link-device/session-1234/${result.requestCredential}`);
  assert.equal(pending.sessionId, 'session-1234');
  assert.equal(requestBody.action, 'startPairing');
  assert.match(pending.deviceCredential, /^[A-Za-z0-9_-]{43}$/);
  assert.ok(pending.expiresAt > Date.now());
});
