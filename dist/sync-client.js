const DEVICE_KEY = 'exam-dost-sync-device-v1';
const PAIRING_KEY = 'exam-dost-sync-pending-v1';
const TOKEN_PATTERN = /^[A-Za-z0-9_-]{32,128}$/;

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
  return mergeValue(local || {}, remote || {}, baseline, '');
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
    if (parts.length !== 3 || parts[0] !== 'link-device' || !/^[A-Za-z0-9-]{8,80}$/.test(parts[1]) || !TOKEN_PATTERN.test(parts[2])) return null;
    return { sessionId: parts[1], requestCredential: parts[2] };
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
    const credential = createDeviceCredential();
    const result = await this.request('POST', { action: 'enroll', credential, label, data: snapshot });
    const metadata = { accountId: result.accountId, deviceId: result.deviceId, credential, revision: result.revision, baseline: snapshot, pendingReview: false };
    this.saveMetadata(metadata);
    return metadata;
  }

  async beginPairing(label) {
    const requestCredential = createDeviceCredential();
    const deviceCredential = createDeviceCredential();
    const session = await this.request('POST', { action: 'startPairing', requestCredential, deviceCredential, label });
    const pending = { sessionId: session.sessionId, requestCredential, deviceCredential, expiresAt: Date.now() + session.expiresInSeconds * 1000 };
    this.storage.setItem(PAIRING_KEY, JSON.stringify(pending));
    const link = `${this.origin}/#/link-device/${pending.sessionId}/${pending.requestCredential}`;
    return { ...pending, link };
  }

  async approvePairing(sessionId, requestCredential) {
    const metadata = this.metadata();
    if (!metadata?.credential) throw new Error('Enable sync on this device before approving a pairing request.');
    return this.request('POST', { action: 'approvePairing', sessionId, requestCredential }, metadata.credential);
  }

  async checkPairing(sessionId, requestCredential) {
    if (!sessionId || !TOKEN_PATTERN.test(requestCredential || '')) throw new Error('Invalid pairing link.');
    return this.request('POST', { action: 'pairStatus', sessionId, requestCredential });
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
    const snapshot = await this.request('GET', undefined, pending.deviceCredential);
    const metadata = {
      accountId: snapshot.accountId,
      deviceId: snapshot.currentDeviceId,
      credential: pending.deviceCredential,
      revision: snapshot.revision,
      baseline: snapshot.data,
      pendingReview: true,
      remoteSnapshot: snapshot.data,
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
    let latest;
    for (let attempt = 0; attempt < 4; attempt++) {
      latest = await this.request('GET', undefined, metadata.credential);
      const merged = mergeStudyState(local, latest.data, metadata.baseline);
      if (same(merged, latest.data)) {
        metadata.revision = latest.revision;
        metadata.baseline = latest.data;
        this.saveMetadata(metadata);
        return { data: merged, linked: true, changed: !same(merged, local) };
      }
      try {
        const saved = await this.request('PUT', { revision: latest.revision, data: merged }, metadata.credential);
        metadata.revision = saved.revision;
        metadata.baseline = saved.data;
        this.saveMetadata(metadata);
        return { data: saved.data, linked: true, changed: !same(saved.data, local) };
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
