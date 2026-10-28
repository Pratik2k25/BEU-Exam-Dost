const DEVICE_KEY = 'exam-dost-sync-device-v1';
const PAIRING_KEY = 'exam-dost-sync-pending-v1';
const PHONE_PAIRING_KEY = 'exam-dost-sync-phone-pending-v1';
const TOKEN_PATTERN = /^[A-Za-z0-9_-]{32,128}$/;
const encoder = new TextEncoder(), decoder = new TextDecoder();
const b64u = bytes => { let binary = ''; for (const byte of bytes) binary += String.fromCharCode(byte); return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, ''); };
const unb64u = value => Uint8Array.from(atob(value.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat((4 - value.length % 4) % 4)), c => c.charCodeAt(0));
const randomBytes = length => { const value = new Uint8Array(length); crypto.getRandomValues(value); return value; };
const isEncryptedSnapshot = value => value?.version === 1 && value?.algorithm === 'AES-GCM';
async function encryptJson(value, rawKey) { const key = await crypto.subtle.importKey('raw', unb64u(rawKey), 'AES-GCM', false, ['encrypt']); const iv = randomBytes(12), ciphertext = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, encoder.encode(JSON.stringify(value))); return { version: 1, algorithm: 'AES-GCM', iv: b64u(iv), ciphertext: b64u(new Uint8Array(ciphertext)) }; }
async function decryptJson(envelope, rawKey) { if (!envelope || envelope.version !== 1 || envelope.algorithm !== 'AES-GCM') throw new Error('Sync data is not encrypted with a supported key.'); const key = await crypto.subtle.importKey('raw', unb64u(rawKey), 'AES-GCM', false, ['decrypt']); const clear = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: unb64u(envelope.iv) }, key, unb64u(envelope.ciphertext)); return JSON.parse(decoder.decode(clear)); }
async function createEcdhPair() { const pair = await crypto.subtle.generateKey({ name: 'ECDH', namedCurve: 'P-256' }, true, ['deriveKey']); return { publicKey: b64u(new Uint8Array(await crypto.subtle.exportKey('raw', pair.publicKey))), privateKey: await crypto.subtle.exportKey('jwk', pair.privateKey) }; }
function createPairingCode() { return String(new DataView(randomBytes(4).buffer).getUint32(0) % 10000).padStart(4, '0'); }
async function ecdhAes(privateJwk, peerPublicKey, usage) { const privateKey = await crypto.subtle.importKey('jwk', privateJwk, { name: 'ECDH', namedCurve: 'P-256' }, false, ['deriveKey']); const publicKey = await crypto.subtle.importKey('raw', unb64u(peerPublicKey), { name: 'ECDH', namedCurve: 'P-256' }, false, []); return crypto.subtle.deriveKey({ name: 'ECDH', public: publicKey }, privateKey, { name: 'AES-GCM', length: 256 }, false, [usage]); }
async function wrapDataKey(dataKey, peerPublicKey) { const pair = await createEcdhPair(), key = await ecdhAes(pair.privateKey, peerPublicKey, 'encrypt'); const iv = randomBytes(12), encrypted = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, unb64u(dataKey)); return { version: 1, algorithm: 'ECDH-P256+A256GCM', publicKey: pair.publicKey, iv: b64u(iv), ciphertext: b64u(new Uint8Array(encrypted)) }; }
async function unwrapDataKey(envelope, privateJwk) { if (!envelope || envelope.version !== 1 || envelope.algorithm !== 'ECDH-P256+A256GCM') throw new Error('The phone did not provide a valid encrypted sync key.'); const key = await ecdhAes(privateJwk, envelope.publicKey, 'decrypt'); return b64u(new Uint8Array(await crypto.subtle.decrypt({ name: 'AES-GCM', iv: unb64u(envelope.iv) }, key, unb64u(envelope.ciphertext)))); }

const isObject = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);

function mergeArray(local, remote, baseline, path) {
  const keyOf = item => isObject(item) && item.id != null ? `id:${item.id}` : `value:${JSON.stringify(item)}`;
  const localMap = new Map((local || []).map(item => [keyOf(item), item]));
  const remoteMap = new Map((remote || []).map(item => [keyOf(item), item]));
  const baseMap = new Map((baseline || []).map(item => [keyOf(item), item]));
  const result = [];
  for (const key of new Set([...localMap.keys(), ...remoteMap.keys(), ...baseMap.keys()])) {
    const hasLocal = localMap.has(key), hasRemote = remoteMap.has(key), hasBase = baseMap.has(key);
    let keep = hasLocal || hasRemote;
    if (Array.isArray(baseline) && hasBase) {
      if (hasLocal === hasBase && hasRemote !== hasBase) keep = hasRemote;
      else if (hasRemote === hasBase && hasLocal !== hasBase) keep = hasLocal;
    }
    if (!keep) continue;
    const l = localMap.get(key), r = remoteMap.get(key), b = baseMap.get(key);
    let value = l !== undefined && r !== undefined
      ? mergeValue(l, r, b, `${path}[]`)
      : l !== undefined ? l : r;
    if (path.startsWith('tasks') && (l?.status === 'done' || r?.status === 'done')) value = { ...value, status: 'done' };
    result.push(value);
  }
  return result;
}

function mergeValue(local, remote, baseline, path = '') {
  if (baseline !== undefined) {
    if (same(local, baseline)) return remote;
    if (same(remote, baseline)) return local;
  }
  if (Array.isArray(local) || Array.isArray(remote)) {
    return mergeArray(Array.isArray(local) ? local : [], Array.isArray(remote) ? remote : [], baseline, path);
  }
  if (isObject(local) || isObject(remote)) {
    const l = isObject(local) ? local : {};
    const r = isObject(remote) ? remote : {};
    const b = isObject(baseline) ? baseline : {};
    const merged = {};
    for (const key of new Set([...Object.keys(r), ...Object.keys(l)])) {
      if (!(key in l)) merged[key] = r[key];
      else if (!(key in r)) merged[key] = l[key];
      else merged[key] = mergeValue(l[key], r[key], key in b ? b[key] : undefined, path ? `${path}.${key}` : key);
    }
    return merged;
  }
  if (typeof local === 'boolean' && typeof remote === 'boolean' && /(^|\.)(topics|progress)(\.|$)/.test(path)) return local || remote;
  return local === undefined || local === null ? remote : local;
}

export function mergeStudyState(local, remote, baseline) {
  const merged = mergeValue(local || {}, remote || {}, baseline, '');
  if (!local?.profile && remote?.profile && remote.settings) {
    merged.settings = mergeValue({}, remote.settings, undefined, 'settings');
  }
  return merged;
}

export function createDeviceCredential(provider = globalThis.crypto) {
  if (!provider?.getRandomValues) throw new Error('Secure random generation is unavailable on this device.');
  const bytes = provider.getRandomValues(new Uint8Array(32));
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

export function parsePairingLink(value, expectedOrigin = globalThis.location?.origin) {
  try {
    const url = new URL(value, expectedOrigin);
    if (url.origin !== expectedOrigin || !['https:', 'http:'].includes(url.protocol)) return null;
    const parts = url.hash.replace(/^#\/?/, '').split('/');
    if (parts.length !== 4 || parts[0] !== 'link-device' || !/^[A-Za-z0-9-]{8,80}$/.test(parts[1]) || !TOKEN_PATTERN.test(parts[2]) || !/^[A-Za-z0-9_-]{80,120}$/.test(parts[3])) return null;
    return { sessionId: parts[1], requestCredential: parts[2], publicKey: parts[3] };
  } catch { return null; }
}

export class SyncClient {
  constructor({ storage = globalThis.localStorage, fetcher = globalThis.fetch?.bind(globalThis), endpoint = '/api/sync', origin = globalThis.location?.origin } = {}) {
    this.storage = storage;
    this.fetcher = fetcher;
    this.endpoint = endpoint;
    this.origin = origin;
  }

  metadata() {
    try { return JSON.parse(this.storage.getItem(DEVICE_KEY) || 'null'); } catch { return null; }
  }

  pendingPairing() {
    try { return JSON.parse(this.storage.getItem(PAIRING_KEY) || 'null'); } catch { return null; }
  }

  phonePairing() {
    try { return JSON.parse(this.storage.getItem(PHONE_PAIRING_KEY) || 'null'); } catch { return null; }
  }

  cancelPhonePairing() { this.storage.removeItem(PHONE_PAIRING_KEY); }

  cancelPairing() { this.storage.removeItem(PAIRING_KEY); }

  saveMetadata(value) { this.storage.setItem(DEVICE_KEY, JSON.stringify(value)); }

  async request(method, body, credential) {
    if (!this.fetcher) throw new Error('Network access is unavailable.');
    const response = await this.fetcher(this.endpoint, {
      method,
      headers: {
        ...(body === undefined ? {} : { 'Content-Type': 'application/json' }),
        ...(credential ? { Authorization: `Bearer ${credential}` } : {}),
      },
      ...(body === undefined ? {} : { body: JSON.stringify(body) }),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      const error = new Error(data.error || 'Sync request failed.');
      error.status = response.status;
      error.data = data;
      throw error;
    }
    return data;
  }

  async enroll(snapshot, label, consent) {
    if (consent !== true) throw new Error('Explicit consent is required before study data can be uploaded.');
    const credential = createDeviceCredential(), dataKey = b64u(randomBytes(32));
    const data = await encryptJson(snapshot, dataKey);
    const result = await this.request('POST', { action: 'enroll', credential, label, data });
    const metadata = { accountId: result.accountId, deviceId: result.deviceId, credential, dataKey, revision: result.revision, baseline: snapshot, pendingReview: false };
    this.saveMetadata(metadata);
    return metadata;
  }

  async beginPairing(label) {
    const requestCredential = createDeviceCredential();
    const deviceCredential = createDeviceCredential();
    const pairKey = await createEcdhPair();
    const session = await this.request('POST', { action: 'startPairing', requestCredential, deviceCredential, publicKey: pairKey.publicKey, label });
    const expiresAt = Number.isFinite(session.expiresAt) ? session.expiresAt : Date.now() + session.expiresInSeconds * 1000;
    const pending = { sessionId: session.sessionId, requestCredential, deviceCredential, privateKey: pairKey.privateKey, publicKey: pairKey.publicKey, expiresAt };
    this.storage.setItem(PAIRING_KEY, JSON.stringify(pending));
    const link = `${this.origin}/#/link-device/${pending.sessionId}/${pending.requestCredential}/${pending.publicKey}`;
    return { ...pending, link };
  }

  async beginPhonePairing(label) {
    const metadata = this.metadata();
    if (!metadata?.credential || !metadata.dataKey) throw new Error('Sync must finish setting up on this device first.');
    for (let attempt = 0; attempt < 5; attempt++) {
      const pairingCode = createPairingCode();
      const requestCredential = createDeviceCredential();
      try {
        const session = await this.request('POST', { action: 'startPhonePairing', pairingCode, requestCredential, label }, metadata.credential);
        const pending = { sessionId: session.sessionId, code: pairingCode, expiresAt: Number(session.expiresAt), claimed: false };
        this.storage.setItem(PHONE_PAIRING_KEY, JSON.stringify(pending));
        return pending;
      } catch (error) {
        if (error.status !== 409 || attempt === 4) throw error;
      }
    }
    throw new Error('Could not create a unique pairing PIN. Please try again.');
  }

  async claimPairingCode(code, label) {
    if (!/^\d{4}$/.test(code || '')) throw new Error('Enter the four-digit PIN shown in BEU Exam Dost on your phone.');
    const requestCredential = createDeviceCredential();
    const deviceCredential = createDeviceCredential();
    const pairKey = await createEcdhPair();
    const session = await this.request('POST', { action: 'claimPairingCode', code, requestCredential, deviceCredential, publicKey: pairKey.publicKey, label });
    const pending = { sessionId: session.sessionId, requestCredential, deviceCredential, privateKey: pairKey.privateKey, publicKey: pairKey.publicKey, pairingCode: code, expiresAt: Number(session.expiresAt), method: 'pin' };
    this.storage.setItem(PAIRING_KEY, JSON.stringify(pending));
    return pending;
  }

  async phonePairingStatus() {
    const metadata = this.metadata(), pending = this.phonePairing();
    if (!metadata?.credential || !pending) return { status: 'expired' };
    if (pending.expiresAt <= Date.now()) { this.cancelPhonePairing(); return { status: 'expired' }; }
    const status = await this.request('POST', { action: 'phonePairingStatus', sessionId: pending.sessionId }, metadata.credential);
    if (status.status === 'claimed') {
      pending.claimed = true;
      pending.publicKey = status.publicKey;
      pending.deviceLabel = status.deviceLabel;
      this.storage.setItem(PHONE_PAIRING_KEY, JSON.stringify(pending));
    }
    return status;
  }

  async approvePhonePairing() {
    const metadata = this.metadata(), pending = this.phonePairing();
    if (!metadata?.credential || !metadata.dataKey || !pending?.sessionId) throw new Error('There is no active desktop PIN request.');
    const status = await this.phonePairingStatus();
    if (status.status !== 'claimed' || !status.publicKey) throw new Error('The desktop has not entered this PIN yet.');
    const keyEnvelope = await wrapDataKey(metadata.dataKey, status.publicKey);
    const result = await this.request('POST', { action: 'approvePhonePairing', sessionId: pending.sessionId, keyEnvelope }, metadata.credential);
    this.cancelPhonePairing();
    return result;
  }

  async approvePairing(sessionId, requestCredential, publicKey) {
    const metadata = this.metadata();
    if (!metadata?.credential || !metadata.dataKey) throw new Error('Enable encrypted sync on this phone before approving a pairing request.');
    if (!publicKey) throw new Error('This pairing request is missing its public key. Start a new pairing from the desktop.');
    const keyEnvelope = await wrapDataKey(metadata.dataKey, publicKey);
    return this.request('POST', { action: 'approvePairing', sessionId, requestCredential, keyEnvelope }, metadata.credential);
  }

  phonePairing() {
    try { return JSON.parse(this.storage.getItem(PHONE_PAIRING_KEY) || 'null'); } catch { return null; }
  }

  cancelPhonePairing() { this.storage.removeItem(PHONE_PAIRING_KEY); }

  async lookupPairingCode(code) {
    const metadata = this.metadata();
    if (!metadata?.credential) throw new Error('Enable encrypted sync on your phone first.');
    if (!/^\d{4}$/.test(code)) throw new Error('Enter the four-digit code shown on your desktop.');
    return this.request('POST', { action: 'lookupPairingCode', code }, metadata.credential);
  }

  async approvePairingCode(code) {
    const metadata = this.metadata();
    if (!metadata?.credential || !metadata.dataKey) throw new Error('Enable encrypted sync on your phone first.');
    const pairing = await this.lookupPairingCode(code);
    const keyEnvelope = await wrapDataKey(metadata.dataKey, pairing.publicKey);
    return this.request('POST', { action: 'approvePairingCode', code, keyEnvelope }, metadata.credential);
  }

  async checkPairing(sessionId, requestCredential) {
    if (!sessionId || !TOKEN_PATTERN.test(requestCredential || '')) throw new Error('Invalid pairing link.');
    return this.request('POST', { action: 'pairStatus', sessionId, requestCredential });
  }

  async deviceStatus() {
    const metadata = this.metadata();
    if (!metadata?.credential) return { status: 'unlinked' };
    return this.request('POST', { action: 'deviceStatus' }, metadata.credential);
  }

  async pairingStatus() {
    const pending = this.pendingPairing();
    if (!pending || pending.expiresAt <= Date.now()) return { status: 'expired' };
    return this.checkPairing(pending.sessionId, pending.requestCredential);
  }

  async completePairing() {
    const pending = this.pendingPairing();
    if (!pending) throw new Error('There is no active pairing request.');
    const status = await this.pairingStatus();
    if (status.status !== 'approved') return { status: status.status };
    if (status.publicKey !== pending.publicKey) throw new Error('The pairing response did not match this device.');
    const dataKey = await unwrapDataKey(status.keyEnvelope, pending.privateKey);
    const snapshot = await this.request('GET', undefined, pending.deviceCredential);
    snapshot.data = await decryptJson(snapshot.data, dataKey);
    const metadata = {
      accountId: snapshot.accountId,
      deviceId: snapshot.currentDeviceId,
      credential: pending.deviceCredential,
      dataKey,
      revision: snapshot.revision,
      baseline: snapshot.data,
      pendingReview: false,
    };
    this.saveMetadata(metadata);
    this.storage.removeItem(PAIRING_KEY);
    return { status: 'approved', snapshot: snapshot.data, metadata };
  }

  async resolvePairing(local, remote, choice) {
    const metadata = this.metadata();
    if (!metadata?.pendingReview || !['merge', 'remote'].includes(choice)) throw new Error('Choose how to use the linked account data.');
    const selected = choice === 'merge' ? mergeStudyState(local, remote, remote) : remote;
    metadata.pendingReview = false;
    delete metadata.remoteSnapshot;
    this.saveMetadata(metadata);
    try {
      const result = await this.sync(selected);
      return { ...result, data: result.data };
    } catch (error) {
      metadata.pendingReview = true;
      metadata.remoteSnapshot = remote;
      this.saveMetadata(metadata);
      throw error;
    }
  }

  async sync(local) {
    const metadata = this.metadata();
    if (!metadata?.credential) return { data: local, linked: false };
    if (metadata.pendingReview) throw new Error('Review the linked account data before syncing.');
    const markSynced = () => { metadata.lastSyncedAt = new Date().toISOString(); this.saveMetadata(metadata); };
    let latest;
    for (let attempt = 0; attempt < 4; attempt++) {
      latest = await this.request('GET', undefined, metadata.credential);
      if (!metadata.dataKey) {
        if (isEncryptedSnapshot(latest.data)) throw new Error('This device needs to be paired again with your phone to receive its encryption key.');
        const migratedKey = b64u(randomBytes(32));
        const migrated = mergeStudyState(local, latest.data, metadata.baseline);
        const saved = await this.request('PUT', { revision: latest.revision, data: await encryptJson(migrated, migratedKey) }, metadata.credential);
        metadata.dataKey = migratedKey;
        metadata.revision = saved.revision;
        metadata.baseline = migrated;
        markSynced();
        return { data: migrated, linked: true, changed: !same(migrated, local), migrated: true };
      }
      latest.data = await decryptJson(latest.data, metadata.dataKey);
      const merged = mergeStudyState(local, latest.data, metadata.baseline);
      if (same(merged, latest.data)) {
        metadata.revision = latest.revision;
        metadata.baseline = latest.data;
        markSynced();
        return { data: merged, linked: true, changed: !same(merged, local) };
      }
      try {
        const saved = await this.request('PUT', { revision: latest.revision, data: await encryptJson(merged, metadata.dataKey) }, metadata.credential);
        metadata.revision = saved.revision;
        metadata.baseline = merged;
        markSynced();
        return { data: merged, linked: true, changed: !same(merged, local) };
      } catch (error) {
        if (error.status !== 409 || attempt === 3) throw error;
        metadata.baseline = latest.data;
      }
    }
    return { data: latest.data, linked: true, changed: false };
  }

  async devices() {
    const metadata = this.metadata();
    if (!metadata?.credential) return [];
    const result = await this.request('GET', undefined, metadata.credential);
    return result.devices || [];
  }

  async revoke(deviceId) {
    const metadata = this.metadata();
    if (!metadata?.credential) throw new Error('This device is not linked.');
    return this.request('DELETE', { deviceId }, metadata.credential);
  }

  async logoutDevice() {
    const metadata = this.metadata();
    let result;
    if (metadata?.credential) {
      try { result = await this.request('POST', { action: 'logout' }, metadata.credential); }
      catch (error) { if (error.status !== 401) throw error; }
    }
    this.unlinkThisDevice();
    this.cancelPairing();
    this.cancelPhonePairing();
    return result;
  }

  async deleteAccount() {
    const metadata = this.metadata();
    if (!metadata?.credential) throw new Error('This device is not linked.');
    const result = await this.request('DELETE', { action: 'deleteAccount' }, metadata.credential);
    this.unlinkThisDevice();
    this.cancelPairing();
    return result;
  }

  unlinkThisDevice() {
    this.storage.removeItem(DEVICE_KEY);
  }
}
