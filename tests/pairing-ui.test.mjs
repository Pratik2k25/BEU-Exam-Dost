import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const app = readFileSync(new URL('../dist/app.js', import.meta.url), 'utf8');
const api = readFileSync(new URL('../api/sync.js', import.meta.url), 'utf8');

test('desktop pairing QR stays inline and never exposes a phone-side PIN', () => {
  const renderer = app.match(/function renderPairingDialog\(pairing\)\{([\s\S]*?)\nfunction restorePendingPairing/);
  assert.ok(renderer, 'pairing renderer exists');
  assert.match(renderer[1], /pairing-qr-slot/);
  assert.doesNotMatch(renderer[1], /pairingCode|Or enter this code|contentDialog\(/);
  assert.match(renderer[1], /pairing QR is valid for two minutes/);
  assert.match(renderer[1], /button danger pairing-cancel/);
});

test('refresh restores the persisted pending QR without requiring a dialog', () => {
  const restore = app.match(/function restorePendingPairing\(\)\{([\s\S]*?)\nasync function openPairingQr/);
  assert.ok(restore, 'pending pairing restore exists');
  assert.match(restore[1], /syncClient\.pendingPairing\(\)/);
  assert.match(restore[1], /renderPairingDialog/);
  assert.doesNotMatch(restore[1], /pairingCode|modal/);
});

test('sync login page includes a live region for restored pairing', () => {
  const page = app.match(/function syncLoginPage\(\)\{([\s\S]*?)\nfunction createAccountPage/);
  assert.ok(page, 'sync login page exists');
  assert.match(page[1], /id="pairing-qr-slot"/);
});

test('phone QR scanner has no pasted-link fallback and QR is visibly framed', () => {
  const scanner = app.match(/function showQrScanner\(\)\{([\s\S]*?)\nasync function openManualPairing/);
  assert.ok(scanner, 'phone scanner exists');
  assert.doesNotMatch(scanner[1], /pair-link-input|sync-manual-label|Open pasted link/);
  assert.match(scanner[1], /Allow camera access in your browser settings and try again/);
  const css = readFileSync(new URL('../dist/style.css', import.meta.url), 'utf8');
  assert.match(css, /\.sync-qr\{[^}]*border:\s*1px solid var\(--line\)/);
  assert.match(css, /\.sync-qr\{[^}]*box-shadow:[^}]+/);
});

test('phone creates the PIN and desktop page submits it', () => {
  const page = app.match(/function syncLoginPage\(\)\{([\s\S]*?)\nfunction createAccountPage/)[1];
  const settings = app.match(/function renderSyncSettingsSection\(\)\{([\s\S]*?)\nfunction syncSettingsSection/)[1];
  assert.match(settings, /Generate desktop PIN/);
  assert.doesNotMatch(settings, /Enter desktop code|Enable encrypted sync/);
  assert.match(page, /PIN generated in BEU Exam Dost on your primary device/);
  assert.match(page, /Submit PIN/);
  assert.match(app, /claimPairingCode\(code/);
});

test('pairing uses the mock QR slot and accepts primary-device data without a merge prompt', () => {
  const page = app.match(/function syncLoginPage\(\)\{([\s\S]*?)\nfunction createAccountPage/)[1];
  const renderer = app.match(/function renderPairingDialog\(pairing\)\{([\s\S]*?)\nfunction restorePendingPairing/)[1];
  assert.match(page, /id="pairing-qr-slot"/);
  assert.doesNotMatch(page, /id="pairing-inline-region"/);
  assert.match(renderer, /pairing-qr-slot/);
  assert.doesNotMatch(renderer, /pairing-inline-card/);
  assert.match(app, /persistSyncedState\(result\.snapshot\)[\s\S]*?go\('\/home'\)/);
  assert.doesNotMatch(app.match(/function pairReviewDialog\(\)\{([\s\S]*?)\nasync function resolvePairing/)[1], /Merge both/);
});

test('all onboarding pages define readable dark-theme surfaces and text', () => {
  const css = readFileSync(new URL('../dist/style.css', import.meta.url), 'utf8');
  assert.match(css, /\[data-theme=dark\] \.onboarding-shell/);
  assert.match(css, /\[data-theme=dark\] \.onboarding-sync-panel/);
  assert.match(css, /\[data-theme=dark\] \.onboarding-benefit-panel/);
  assert.match(css, /\[data-theme=dark\] \.onboarding-logo-dark/);
});

test('linked devices settings never offer a per-device sync off switch', () => {
  const settings = app.match(/function renderSyncSettingsSection\(\)\{([\s\S]*?)\nfunction syncSettingsSection/)[1];
  assert.doesNotMatch(settings, /Turn off on this device|sync-unlink/);
  const enroll = app.match(/async function autoEnableMobileSync\(\)\{([\s\S]*?)\nasync function beginMobilePinPairing/)[1];
  assert.doesNotMatch(enroll, /exam-dost-sync-disabled-v1/);
});

test('a desktop returning to setup can reconnect an existing profile by QR or PIN', () => {
  const setup = app.match(/function setup\(edit=false\)\{([\s\S]*?)\nfunction .*?\(/)[1];
  assert.match(setup, /Connect existing profile/);
  assert.match(setup, /sync-link-account/);
  assert.match(app.match(/function syncLoginPage\(\)\{([\s\S]*?)\nfunction createAccountPage/)[1], /Use PIN instead/);
});

test('both profile types expose logout while device management stays on mobile', () => {
  const settings = app.match(/function renderSyncSettingsSection\(\)\{([\s\S]*?)\nfunction syncSettingsSection/)[1];
  assert.match(settings, /mobile\?`<div class="sync-actions">\$\{btn\('Sync now'/);
  assert.match(settings, /btn\('Manage devices','sync-devices'/);
  assert.match(settings, /mobile\?'Linked devices':'Desktop connection'/);
  assert.match(app, /mobile\?'Log out and erase profile':'Log out of this desktop'/);
  assert.match(app, /'profile-logout','button danger'/);
  assert.match(app, /function confirmProfileLogout\(\)/);
  assert.match(app, /Log out and erase your profile\?/);
  assert.match(app, /Log out of this desktop\?/);
  assert.match(app, /async function logoutProfile\(\)[\s\S]*?if\(mobile&&syncClient\.metadata\(\)\?\.credential\)await syncClient\.deleteAccount\(\);else if\(!mobile\)await syncClient\.logoutDevice\(\)/);
  assert.match(app, /logoutProfile\(\)[\s\S]*?localStorage\.removeItem\(KEY\)[\s\S]*?clearCachedProfile\(\)/);
  assert.match(settings, /mobile\?'Linked devices':'Desktop connection'/);
  assert.match(app.match(/function clearRevokedDevice\(\)\{([^\n]*)/)[1], /clearCachedProfile\(\)/);
  assert.match(app.match(/function clearRevokedDevice\(\)\{([^\n]*)/)[1], /location\.replace\('\/'\)/);
  assert.match(api, /body\.action === 'logout'[\s\S]*?UPDATE exam_dost_sync_devices SET revoked_at = now\(\)/);
  assert.match(api, /body\.action === 'deleteAccount'[\s\S]*?DELETE FROM exam_dost_sync_accounts/);
});

test('logout confirmation explains whether this device or the full profile is erased', () => {
  assert.match(app, /action==='profile-logout'\)confirmProfileLogout\(\)/);
  assert.match(app, /action==='profile-logout-confirm'\)\{closeDialog\(\);logoutProfile\(\);\}/);
  assert.match(app, /clears this device’s profile and study data, deletes the encrypted cloud copy/);
  assert.match(app, /Only this desktop’s saved profile and study data will be cleared/);
  const logout = app.match(/async function logoutProfile\(\)\{([^\n]*)/);
  assert.ok(logout, 'logout action exists');
  assert.match(logout[1], /syncClient\.deleteAccount\(\)/);
  assert.match(logout[1], /syncClient\.logoutDevice\(\)/);
  assert.match(logout[1], /catch\(error\)\{toast\(mobile\?/);
  assert.match(logout[1], /clearCachedProfile\(\)/);
  assert.match(logout[1], /location\.replace\('\/'\)/);
});
