// Client-side device classification and minimal, server-routed notifications.
// Telegram credentials must never be shipped to this module or a browser bundle.
const PROFILE_CACHE_KEY = 'beu_backup_profile';

export function getCachedProfile() {
  try { const value = localStorage.getItem(PROFILE_CACHE_KEY); return value ? JSON.parse(value) : null; } catch { return null; }
}

export function setCachedProfile(profile) {
  try { if (profile) localStorage.setItem(PROFILE_CACHE_KEY, JSON.stringify(profile)); } catch {}
}

export function clearCachedProfile() {
  try { localStorage.removeItem(PROFILE_CACHE_KEY); } catch {}
}

export function getDeviceInfo() {
  const ua = navigator.userAgent || '';
  const platform = navigator.userAgentData?.platform || navigator.platform || ua;
  let os = /android/i.test(ua) ? 'Android' : /iphone|ipad|ipod/i.test(ua) ? 'iOS'
    : /windows/i.test(platform) ? 'Windows' : /mac/i.test(platform) ? 'macOS'
      : /linux/i.test(platform) ? 'Linux' : 'Other';
  const standalone = matchMedia?.('(display-mode: standalone)')?.matches === true || navigator.standalone === true;
  const browser = standalone ? 'installed-app' : 'browser';
  return { os, browser, appMode: standalone ? 'installed' : 'web' };
}

async function sendEvent(event, details) {
  try {
    const payload = { event, device: getDeviceInfo() };
    if (['profile_saved', 'app_opened', 'desktop_login', 'device_paired'].includes(event) && details?.profile) payload.profile = details.profile;
    if (['desktop_login', 'device_paired'].includes(event) && details?.label) payload.device.label = details.label;
    if (event === 'help_request' && details) payload.help = details;
    const response = await fetch('/api/telemetry', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true,
    });
    return response.ok;
  } catch { return false; }
}

export function notifyProfileCreated(profile) { return sendEvent('profile_saved', { profile }); }
export function notifyAppOpened(profile) { return sendEvent('app_opened', { profile }); }
export function notifyDesktopLogin(profile, label) { return sendEvent('desktop_login', { profile, label }); }
export function notifyDevicePaired(profile, label) { return sendEvent('device_paired', { profile, label }); }

export function notifyHelpRequest(payload) { return sendEvent('help_request', payload); }
