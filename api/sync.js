import { createHash, randomUUID } from 'node:crypto';
import { databasePool } from './_db.js';

const MAX_BODY_BYTES = 700 * 1024;
const TOKEN_PATTERN = /^[A-Za-z0-9_-]{32,128}$/;
const json = (body, status = 200) => Response.json(body, {
  status,
  headers: { 'Cache-Control': 'no-store' },
});
const hash = (value) => createHash('sha256').update(value).digest('hex');
const validToken = (value) => typeof value === 'string' && TOKEN_PATTERN.test(value);
const normalizeLabel = (value) => typeof value === 'string' ? value.trim().slice(0, 80) || 'Study device' : 'Study device';
const validSnapshot = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);

async function bodyOf(request) {
  const text = await request.text();
  if (Buffer.byteLength(text, 'utf8') > MAX_BODY_BYTES) throw new Error('body_too_large');
  try { return JSON.parse(text); } catch { throw new Error('invalid_json'); }
}

async function authenticate(request, pool) {
  const token = request.headers.get('authorization')?.replace(/^Bearer\s+/i, '');
  if (!validToken(token)) return null;
  const result = await pool.query(
    `UPDATE exam_dost_sync_devices SET last_seen_at = now()
     WHERE credential_hash = $1 AND revoked_at IS NULL
     RETURNING device_id, account_id, label`,
    [hash(token)],
  );
  return result.rows[0] || null;
}

export default {
  async fetch(request) {
    if (!['GET', 'POST', 'PUT', 'DELETE'].includes(request.method)) {
      return json({ error: 'Method not allowed' }, 405);
    }

    let body = {};
    if (request.method !== 'GET') {
      try { body = await bodyOf(request); }
      catch (error) {
        return json({ error: error.message === 'body_too_large' ? 'Request is too large' : 'Invalid JSON body' },
          error.message === 'body_too_large' ? 413 : 400);
      }
    }

    try {
      const pool = databasePool();

      if (request.method === 'POST' && body.action === 'enroll') {
        if (!validToken(body.credential) || !validSnapshot(body.data)) return json({ error: 'Invalid enrollment request' }, 400);
        const accountId = randomUUID();
        const deviceId = randomUUID();
        const client = await pool.connect();
        try {
          await client.query('BEGIN');
          await client.query('INSERT INTO exam_dost_sync_accounts (account_id, data) VALUES ($1, $2)', [accountId, body.data]);
          await client.query(
            'INSERT INTO exam_dost_sync_devices (device_id, account_id, credential_hash, label) VALUES ($1, $2, $3, $4)',
            [deviceId, accountId, hash(body.credential), normalizeLabel(body.label)],
          );
          await client.query('COMMIT');
        } catch (error) {
          await client.query('ROLLBACK');
          throw error;
        } finally { client.release(); }
        return json({ accountId, deviceId, revision: 1 });
      }

      if (request.method === 'POST' && body.action === 'startPairing') {
        if (!validToken(body.requestCredential) || !validToken(body.deviceCredential)) return json({ error: 'Invalid pairing request' }, 400);
        await pool.query('DELETE FROM exam_dost_sync_pairings WHERE expires_at <= now()');
        const sessionId = randomUUID();
        await pool.query(
          `INSERT INTO exam_dost_sync_pairings
           (session_id, request_credential_hash, new_device_credential_hash, label, expires_at)
           VALUES ($1, $2, $3, $4, now() + interval '3 minutes')`,
          [sessionId, hash(body.requestCredential), hash(body.deviceCredential), normalizeLabel(body.label)],
        );
        return json({ sessionId, expiresInSeconds: 180 });
      }

      if (request.method === 'POST' && body.action === 'approvePairing') {
        const device = await authenticate(request, pool);
        if (!device) return json({ error: 'Device is not linked or has been revoked' }, 401);
        if (typeof body.sessionId !== 'string' || !validToken(body.requestCredential)) return json({ error: 'Invalid pairing approval' }, 400);
        const client = await pool.connect();
        try {
          await client.query('BEGIN');
          const pairing = await client.query(
            `SELECT * FROM exam_dost_sync_pairings
             WHERE session_id = $1 AND request_credential_hash = $2
             AND expires_at > now() AND approved_at IS NULL FOR UPDATE`,
            [body.sessionId, hash(body.requestCredential)],
          );
          if (!pairing.rows[0]) {
            await client.query('ROLLBACK');
            return json({ error: 'Pairing request expired or already used' }, 410);
          }
          const newDeviceId = randomUUID();
          await client.query(
            'INSERT INTO exam_dost_sync_devices (device_id, account_id, credential_hash, label) VALUES ($1, $2, $3, $4)',
            [newDeviceId, device.account_id, pairing.rows[0].new_device_credential_hash, pairing.rows[0].label],
          );
          await client.query(
            'UPDATE exam_dost_sync_pairings SET account_id = $2, device_id = $3, approved_at = now() WHERE session_id = $1',
            [body.sessionId, device.account_id, newDeviceId],
          );
          await client.query('COMMIT');
          return json({ approved: true });
        } catch (error) {
          await client.query('ROLLBACK');
          throw error;
        } finally { client.release(); }
      }

      if (request.method === 'POST' && body.action === 'pairStatus') {
        const sessionId = body.sessionId;
        const requestCredential = body.requestCredential;
        if (!sessionId || !validToken(requestCredential)) return json({ error: 'Invalid pairing status request' }, 400);
        const result = await pool.query(
          `SELECT approved_at, expires_at, label FROM exam_dost_sync_pairings
           WHERE session_id = $1 AND request_credential_hash = $2`,
          [sessionId, hash(requestCredential)],
        );
        const pairing = result.rows[0];
        if (!pairing || new Date(pairing.expires_at).getTime() <= Date.now()) return json({ status: 'expired' }, 410);
        return json({ status: pairing.approved_at ? 'approved' : 'pending', deviceLabel: pairing.label });
      }

      const device = await authenticate(request, pool);
      if (!device) return json({ error: 'Device is not linked or has been revoked' }, 401);

      if (request.method === 'GET') {
        const [snapshot, devices] = await Promise.all([
          pool.query('SELECT data, revision, updated_at FROM exam_dost_sync_accounts WHERE account_id = $1', [device.account_id]),
          pool.query(
            `SELECT device_id, label, created_at, last_seen_at FROM exam_dost_sync_devices
             WHERE account_id = $1 AND revoked_at IS NULL ORDER BY created_at`, [device.account_id],
          ),
        ]);
        return json({ ...snapshot.rows[0], revision: Number(snapshot.rows[0].revision), accountId: device.account_id, currentDeviceId: device.device_id, devices: devices.rows });
      }

      if (request.method === 'PUT') {
        if (!validSnapshot(body.data) || !Number.isSafeInteger(body.revision) || body.revision < 1) {
          return json({ error: 'A data snapshot and current revision are required' }, 400);
        }
        const updated = await pool.query(
          `UPDATE exam_dost_sync_accounts SET data = $3, revision = revision + 1, updated_at = now()
           WHERE account_id = $1 AND revision = $2 RETURNING data, revision, updated_at`,
          [device.account_id, body.revision, body.data],
        );
        if (updated.rows[0]) return json({ ...updated.rows[0], revision: Number(updated.rows[0].revision) });
        const latest = await pool.query('SELECT data, revision, updated_at FROM exam_dost_sync_accounts WHERE account_id = $1', [device.account_id]);
        return json({ error: 'revision_conflict', latest: { ...latest.rows[0], revision: Number(latest.rows[0].revision) } }, 409);
      }

      if (request.method === 'DELETE') {
        if (body.action === 'deleteAccount') {
          await pool.query('DELETE FROM exam_dost_sync_accounts WHERE account_id = $1', [device.account_id]);
          return json({ deleted: true });
        }
        if (typeof body.deviceId !== 'string' || body.deviceId === device.device_id) return json({ error: 'Choose another linked device to revoke' }, 400);
        const result = await pool.query(
          `UPDATE exam_dost_sync_devices SET revoked_at = now()
           WHERE device_id = $1 AND account_id = $2 AND revoked_at IS NULL RETURNING device_id`,
          [body.deviceId, device.account_id],
        );
        return result.rowCount ? json({ revoked: true }) : json({ error: 'Linked device not found' }, 404);
      }

      return json({ error: 'Unsupported action' }, 400);
    } catch {
      return json({ error: 'Sync service is temporarily unavailable' }, 503);
    }
  },
};
