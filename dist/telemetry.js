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

async function sendEvent(event) {
  try {
    const response = await fetch('/api/telemetry', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event, device: getDeviceInfo() }),
      keepalive: true,
    });
    return response.ok;
  } catch { return false; }
}

export function notifyProfileCreated() { return sendEvent('profile_saved'); }
export function notifyAppOpened() { return sendEvent('app_opened'); }

// A help request logs only that the form was submitted and the device class.
export function notifyHelpRequest() { return sendEvent('help_request'); }
