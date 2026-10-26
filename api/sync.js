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
const validCiphertext = (value) => value?.version === 1 && value?.algorithm === 'AES-GCM'
  && /^[A-Za-z0-9_-]{16,32}$/.test(value.iv || '')
  && /^[A-Za-z0-9_-]{16,700000}$/.test(value.ciphertext || '');
const validKeyEnvelope = (value) => value?.version === 1 && value?.algorithm === 'ECDH-P256+A256GCM'
  && /^[A-Za-z0-9_-]{80,120}$/.test(value.publicKey || '')
  && /^[A-Za-z0-9_-]{16,32}$/.test(value.iv || '')
  && /^[A-Za-z0-9_-]{40,128}$/.test(value.ciphertext || '');

async function bodyOf(request) {
  const text = await request.text();
  if (Buffer.byteLength(text, 'utf8') > MAX_BODY_BYTES) throw new Error('body_too_large');
  try { return JSON.parse(text); } catch { throw new Error('invalid_json'); }
}

async function pairingRateLimit(pool, request, maximum=10) {
  const address=request.headers.get('x-vercel-forwarded-for')?.split(',')[0]?.trim()||request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()||'unknown';
  const result=await pool.query(`INSERT INTO exam_dost_sync_pairing_ip_limits(ip_hash,window_started_at,attempts) VALUES($1,now(),1)
    ON CONFLICT(ip_hash) DO UPDATE SET window_started_at=CASE WHEN exam_dost_sync_pairing_ip_limits.window_started_at<now()-interval '2 minutes' THEN now() ELSE exam_dost_sync_pairing_ip_limits.window_started_at END,
    attempts=CASE WHEN exam_dost_sync_pairing_ip_limits.window_started_at<now()-interval '2 minutes' THEN 1 ELSE exam_dost_sync_pairing_ip_limits.attempts+1 END RETURNING attempts`,[hash(address)]);
  return Number(result.rows[0]?.attempts||0)<=maximum;
}

async function authenticate(request, pool) {
  const token = request.headers.get('authorization')?.replace(/^Bearer\s+/i, '');
  if (!validToken(token)) return null;
  const result = await pool.query(
    `UPDATE exam_dost_sync_devices SET last_seen_at = now()
     WHERE credential_hash = $1 AND revoked_at IS NULL
     RETURNING device_id, account_id, label, is_primary`,
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
        if (!validToken(body.credential) || !validCiphertext(body.data)) return json({ error: 'Encrypted study data is required' }, 400);
        const accountId = randomUUID();
        const deviceId = randomUUID();
        const client = await pool.connect();
        try {
          await client.query('BEGIN');
          await client.query('INSERT INTO exam_dost_sync_accounts (account_id, data) VALUES ($1, $2)', [accountId, body.data]);
          await client.query(
            'INSERT INTO exam_dost_sync_devices (device_id, account_id, credential_hash, label, is_primary) VALUES ($1, $2, $3, $4, true)',
            [deviceId, accountId, hash(body.credential), normalizeLabel(body.label)],
          );
          await client.query('COMMIT');
        } catch (error) {
          await client.query('ROLLBACK');
          throw error;
        } finally { client.release(); }
        return json({ accountId, deviceId, revision: 1 });
      }

      if (request.method === 'POST' && body.action === 'startPhonePairing') {
        if(!await pairingRateLimit(pool,request,20))return json({error:'Too many pairing requests. Try again in two minutes.'},429);
        const device = await authenticate(request, pool);
        if (!device || !device.is_primary) return json({ error: 'Only the primary BEU Exam Dost app can start pairing' }, 403);
        if (!validToken(body.requestCredential) ) return json({ error: 'Invalid pairing PIN request' }, 400);
        await pool.query('DELETE FROM exam_dost_sync_pairings WHERE expires_at <= now()');
        const duplicate = await pool.query('SELECT 1 FROM exam_dost_sync_pairings WHERE pairing_code_hash = $1 AND expires_at > now() AND approved_at IS NULL', [hash(body.pairingCode)]);
        if (duplicate.rowCount) return json({ error: 'PIN collision. Generate a new PIN.' }, 409);
        const sessionId = randomUUID();
        try {
          const created = await pool.query(
            `INSERT INTO exam_dost_sync_pairings
             (session_id, request_credential_hash, new_device_credential_hash, label, expires_at, pairing_code_hash, account_id, pin_from_primary)
             VALUES ($1, $2, $3, $4, now() + interval '2 minutes', $5, $6, true)
             RETURNING expires_at`,
            [sessionId, hash(body.requestCredential), hash(randomUUID()), normalizeLabel(body.label || 'Desktop browser'), hash(body.pairingCode), device.account_id],
          );
          return json({ sessionId, expiresAt: new Date(created.rows[0].expires_at).getTime() });
        } catch (error) {
          if (error.code === '23505') return json({ error: 'PIN collision. Generate a new PIN.' }, 409);
          throw error;
        }
      }

      if (request.method === 'POST' && body.action === 'claimPairingCode') {
        if(!await pairingRateLimit(pool,request,20))return json({error:'Too many PIN attempts. Wait two minutes and try again.'},429);
        if (!validToken(body.requestCredential) || !validToken(body.deviceCredential)
          || !/^[A-Za-z0-9_-]{80,120}$/.test(body.publicKey || '') || !/^\d{4}$/.test(body.code || '')) {
          return json({ error: 'Enter a valid four-digit PIN from your phone' }, 400);
        }
        const claimed = await pool.query(
          `UPDATE exam_dost_sync_pairings SET request_credential_hash = $2, new_device_credential_hash = $3,
             label = $4, public_key = $5, claimed_at = now(), pairing_attempts = pairing_attempts + 1
           WHERE pairing_code_hash = $1 AND expires_at > now() AND approved_at IS NULL AND claimed_at IS NULL AND pin_from_primary AND pairing_attempts < 5
           RETURNING session_id, expires_at`,
          [hash(body.code), hash(body.requestCredential), hash(body.deviceCredential), normalizeLabel(body.label || 'Desktop browser'), body.publicKey],
        );
        if (!claimed.rows[0]) return json({ error: 'PIN is invalid, expired, or already used' }, 410);
        return json({ sessionId: claimed.rows[0].session_id, expiresAt: new Date(claimed.rows[0].expires_at).getTime() });
      }

      if (request.method === 'POST' && body.action === 'phonePairingStatus') {
        const device = await authenticate(request, pool);
        if (!device || !device.is_primary) return json({ error: 'Only the primary app can check this pairing' }, 403);
        const result = await pool.query(
          `SELECT claimed_at, expires_at, label, public_key FROM exam_dost_sync_pairings
           WHERE session_id = $1 AND account_id = $2 AND approved_at IS NULL`, [body.sessionId, device.account_id],
        );
        const pairing = result.rows[0];
        if (!pairing || new Date(pairing.expires_at).getTime() <= Date.now()) return json({ status: 'expired' }, 410);
        return json({ status: pairing.claimed_at ? 'claimed' : 'pending', deviceLabel: pairing.label, publicKey: pairing.public_key, expiresAt: new Date(pairing.expires_at).getTime() });
      }

      if (request.method === 'POST' && body.action === 'approvePhonePairing') {
        const device = await authenticate(request, pool);
        if (!device || !device.is_primary) return json({ error: 'Only the primary app can approve a new device' }, 403);
        if (typeof body.sessionId !== 'string' || !validKeyEnvelope(body.keyEnvelope)) return json({ error: 'Invalid pairing approval' }, 400);
        const client = await pool.connect();
        try {
          await client.query('BEGIN');
          const pairing = await client.query(
            `SELECT * FROM exam_dost_sync_pairings WHERE session_id = $1 AND account_id = $2
             AND claimed_at IS NOT NULL AND expires_at > now() AND approved_at IS NULL FOR UPDATE`,
            [body.sessionId, device.account_id],
          );
          if (!pairing.rows[0]) { await client.query('ROLLBACK'); return json({ error: 'Pairing request expired or already used' }, 410); }
          const newDeviceId = randomUUID();
          await client.query('INSERT INTO exam_dost_sync_devices (device_id, account_id, credential_hash, label) VALUES ($1, $2, $3, $4)',
            [newDeviceId, device.account_id, pairing.rows[0].new_device_credential_hash, pairing.rows[0].label]);
          await client.query('UPDATE exam_dost_sync_pairings SET device_id = $2, key_envelope = $3, approved_at = now() WHERE session_id = $1',
            [body.sessionId, newDeviceId, body.keyEnvelope]);
          await client.query('COMMIT');
          return json({ approved: true });
        } catch (error) { await client.query('ROLLBACK'); throw error; }
        finally { client.release(); }
      }

      if (request.method === 'POST' && body.action === 'startPairing') {
        if(!await pairingRateLimit(pool,request,20))return json({error:'Too many pairing requests. Try again in two minutes.'},429);
        if (!validToken(body.requestCredential) || !validToken(body.deviceCredential) || !/^[A-Za-z0-9_-]{80,120}$/.test(body.publicKey || '') ) return json({ error: 'Invalid pairing request' }, 400);
        await pool.query('DELETE FROM exam_dost_sync_pairings WHERE expires_at <= now()');
        const sessionId = randomUUID();
        const created = await pool.query(
          `INSERT INTO exam_dost_sync_pairings
           (session_id, request_credential_hash, new_device_credential_hash, label, expires_at, public_key, pairing_code_hash)
           VALUES ($1, $2, $3, $4, now() + interval '2 minutes', $5, NULL)
           RETURNING expires_at`,
          [sessionId, hash(body.requestCredential), hash(body.deviceCredential), normalizeLabel(body.label), body.publicKey],
        );
        const expiresAt = new Date(created.rows[0].expires_at).getTime();
        return json({ sessionId, expiresAt, expiresInSeconds: Math.max(0, Math.ceil((expiresAt - Date.now()) / 1000)) });
      }

      if (request.method === 'POST' && body.action === 'lookupPairingCode') {
        const device = await authenticate(request, pool);
        if (!device || !device.is_primary) return json({ error: 'Pairing codes can only be approved by the primary phone' }, 403);
        if (!/^\d{4}$/.test(body.code || '')) return json({ error: 'Enter a four-digit code' }, 400);
        const result = await pool.query(
          `UPDATE exam_dost_sync_pairings SET pairing_attempts = pairing_attempts + 1
           WHERE pairing_code_hash = $1 AND expires_at > now() AND approved_at IS NULL AND pairing_attempts < 5
           RETURNING session_id, public_key, label, expires_at`, [hash(body.code)],
        );
        if (!result.rows[0]) return json({ error: 'Code expired, already used, or too many attempts' }, 410);
        return json({ sessionId: result.rows[0].session_id, publicKey: result.rows[0].public_key, label: result.rows[0].label, expiresAt: result.rows[0].expires_at });
      }

      if (request.method === 'POST' && body.action === 'approvePairingCode') {
        const device = await authenticate(request, pool);
        if (!device || !device.is_primary) return json({ error: 'Pairing codes can only be approved by the primary phone' }, 403);
        if (!/^\d{4}$/.test(body.code || '') || !validKeyEnvelope(body.keyEnvelope)) return json({ error: 'Invalid pairing code or encrypted key' }, 400);
        const client = await pool.connect();
        try {
          await client.query('BEGIN');
          const pairing = await client.query(
            `SELECT * FROM exam_dost_sync_pairings WHERE pairing_code_hash = $1
             AND expires_at > now() AND approved_at IS NULL AND pairing_attempts <= 5 FOR UPDATE`, [hash(body.code)],
          );
          if (!pairing.rows[0]) { await client.query('ROLLBACK'); return json({ error: 'Code expired, already used, or too many attempts' }, 410); }
          const newDeviceId = randomUUID();
          await client.query('INSERT INTO exam_dost_sync_devices (device_id, account_id, credential_hash, label) VALUES ($1, $2, $3, $4)',
            [newDeviceId, device.account_id, pairing.rows[0].new_device_credential_hash, pairing.rows[0].label]);
          await client.query('UPDATE exam_dost_sync_pairings SET account_id = $2, device_id = $3, key_envelope = $4, approved_at = now() WHERE session_id = $1',
            [pairing.rows[0].session_id, device.account_id, newDeviceId, body.keyEnvelope]);
          await client.query('COMMIT');
          return json({ approved: true });
        } catch (error) { await client.query('ROLLBACK'); throw error; }
        finally { client.release(); }
      }

      if (request.method === 'POST' && body.action === 'approvePairing') {
        const device = await authenticate(request, pool);
        if (!device || !device.is_primary) return json({ error: 'Only the primary phone can approve new devices' }, 403);
        if (typeof body.sessionId !== 'string' || !validToken(body.requestCredential)) return json({ error: 'Invalid pairing approval' }, 400);
        if (!validKeyEnvelope(body.keyEnvelope)) return json({ error: 'Invalid encrypted account key' }, 400);
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
            'UPDATE exam_dost_sync_pairings SET account_id = $2, device_id = $3, key_envelope = $4, approved_at = now() WHERE session_id = $1',
            [body.sessionId, device.account_id, newDeviceId, body.keyEnvelope],
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
          `SELECT approved_at, expires_at, label, key_envelope, public_key FROM exam_dost_sync_pairings
           WHERE session_id = $1 AND request_credential_hash = $2`,
          [sessionId, hash(requestCredential)],
        );
        const pairing = result.rows[0];
        if (!pairing || new Date(pairing.expires_at).getTime() <= Date.now()) return json({ status: 'expired' }, 410);
        return json({ status: pairing.approved_at ? 'approved' : 'pending', deviceLabel: pairing.label, keyEnvelope: pairing.key_envelope, publicKey: pairing.public_key });
      }

      if (request.method === 'POST' && body.action === 'deviceStatus') {
        const device = await authenticate(request, pool);
        return device ? json({ status: 'active', deviceId: device.device_id }) : json({ status: 'revoked' }, 401);
      }

      const device = await authenticate(request, pool);
      if (!device) return json({ error: 'Device is not linked or has been revoked' }, 401);

      if (request.method === 'POST' && body.action === 'logout') {
        await pool.query(
          `UPDATE exam_dost_sync_devices SET revoked_at = now()
           WHERE device_id = $1 AND account_id = $2 AND revoked_at IS NULL`,
          [device.device_id, device.account_id],
        );
        return json({ loggedOut: true });
      }

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
        if (!validCiphertext(body.data) || !Number.isSafeInteger(body.revision) || body.revision < 1) {
          return json({ error: 'Encrypted study data and current revision are required' }, 400);
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
        if (!device.is_primary) return json({ error: 'Only the primary phone can manage linked devices' }, 403);
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
