import { randomBytes } from 'node:crypto';
import pg from 'pg';
import syncApi from '../api/sync.js';
import { secureConnectionString } from '../api/_db.js';

const { Client } = pg;
const credential = () => randomBytes(32).toString('base64url');
const requestCredential = credential();
const ownerCredential = credential();
const linkedCredential = credential();
let accountId;
let sessionId;

async function call(method, body, token) {
  const response = await syncApi.fetch(new Request('http://localhost/api/sync', {
    method,
    headers: {
      ...(body === undefined ? {} : { 'Content-Type': 'application/json' }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
  }));
  return { status: response.status, data: await response.json() };
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

try {
  const enrolled = await call('POST', {
    action: 'enroll', credential: ownerCredential, label: 'Integration test',
    data: { profile: { name: 'Temporary test profile' }, progress: { cn: 2 } },
  });
  assert(enrolled.status === 200 && enrolled.data.accountId, 'enrollment failed');
  accountId = enrolled.data.accountId;

  const initial = await call('GET', undefined, ownerCredential);
  assert(initial.status === 200 && initial.data.revision === 1 && initial.data.data.progress.cn === 2, 'snapshot read failed');

  const saved = await call('PUT', { revision: 1, data: { profile: { name: 'Temporary test profile' }, progress: { cn: 3 } } }, ownerCredential);
  assert(saved.status === 200 && saved.data.revision === 2, 'snapshot save failed');

  const conflict = await call('PUT', { revision: 1, data: { progress: { cn: 9 } } }, ownerCredential);
  assert(conflict.status === 409 && conflict.data.latest.revision === 2, 'revision conflict guard failed');

  const paired = await call('POST', {
    action: 'startPairing', requestCredential, deviceCredential: linkedCredential, label: 'New desktop',
  });
  assert(paired.status === 200, 'pairing session creation failed');
  sessionId = paired.data.sessionId;

  const approved = await call('POST', { action: 'approvePairing', sessionId, requestCredential }, ownerCredential);
  assert(approved.status === 200, 'pair approval failed');
  const status = await call('POST', { action: 'pairStatus', sessionId, requestCredential });
  assert(status.status === 200 && status.data.status === 'approved' && status.data.deviceLabel === 'New desktop', 'pair status failed');

  const linkedSnapshot = await call('GET', undefined, linkedCredential);
  assert(linkedSnapshot.status === 200 && linkedSnapshot.data.data.progress.cn === 3, 'new device did not receive the account snapshot');

  const revoked = await call('DELETE', { deviceId: linkedSnapshot.data.currentDeviceId }, ownerCredential);
  assert(revoked.status === 200 && revoked.data.revoked, 'device revocation failed');
  const denied = await call('GET', undefined, linkedCredential);
  assert(denied.status === 401, 'revoked device was not denied');

  const deleted = await call('DELETE', { action: 'deleteAccount' }, ownerCredential);
  assert(deleted.status === 200 && deleted.data.deleted, 'cloud account deletion failed');
  const afterDelete = await call('GET', undefined, ownerCredential);
  assert(afterDelete.status === 401, 'deleted account credentials were not rejected');

  console.log('Neon sync verification passed: enroll, read, write, conflict protection, pair, snapshot transfer, revoke, and cloud account deletion.');
} finally {
  const connectionString = process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL;
  if (connectionString && (accountId || sessionId)) {
    const client = new Client({ connectionString: secureConnectionString(connectionString), connectionTimeoutMillis: 10000 });
    try {
      await client.connect();
      if (sessionId) await client.query('DELETE FROM exam_dost_sync_pairings WHERE session_id = $1', [sessionId]);
      if (accountId) await client.query('DELETE FROM exam_dost_sync_accounts WHERE account_id = $1', [accountId]);
    } finally { await client.end().catch(() => {}); }
  }
}
