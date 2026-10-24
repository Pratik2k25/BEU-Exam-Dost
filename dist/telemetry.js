// dist/telemetry.js
// ─────────────────────────────────────────────────────────────────────────────
// Real-time telemetry, device fingerprinting, anti-abuse fraud detection,
// and Telegram alerting for BEU Exam Dost.
// ─────────────────────────────────────────────────────────────────────────────

export const TELEGRAM_CONFIG = {
  botToken: '8975696916:AAEM8hO8tApzHFjBB5pIpWy2hMHL5XQ5MKQ',
  chatId: '6909536890',
  botUsername: 'beuexamdost_bot',
  enabled: true,
};

const DEVICE_ID_KEY = 'beu_device_id';
const PROFILE_CACHE_KEY = 'beu_backup_profile';
const PROFILE_HISTORY_KEY = 'beu_device_profile_history';

/**
 * Gets or creates a persistent unique Device ID for this client.
 */
export function getDeviceId() {
  try {
    let id = localStorage.getItem(DEVICE_ID_KEY);
    if (!id) {
      id = typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : 'dev_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 9);
      localStorage.setItem(DEVICE_ID_KEY, id);
    }
    return id;
  } catch {
    return 'dev_unknown_' + Date.now();
  }
}

/**
 * Reads persistent profile cache from storage (for Welcome Back flow).
 */
export function getCachedProfile() {
  try {
    const raw = localStorage.getItem(PROFILE_CACHE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/**
 * Saves profile to persistent backup cache.
 */
export function setCachedProfile(profile) {
  try {
    if (profile) {
      localStorage.setItem(PROFILE_CACHE_KEY, JSON.stringify(profile));
    }
  } catch {}
}

/**
 * Clears persistent profile backup cache.
 */
export function clearCachedProfile() {
  try {
    localStorage.removeItem(PROFILE_CACHE_KEY);
  } catch {}
}

/**
 * Inspects device, OS, browser and hardware properties.
 */
export function getDeviceInfo() {
  const ua = typeof navigator !== 'undefined' ? navigator.userAgent : '';
  let os = 'Unknown OS';
  if (/android/i.test(ua)) os = 'Android';
  else if (/iphone|ipad|ipod/i.test(ua)) os = 'iOS';
  else if (/windows/i.test(ua)) os = 'Windows';
  else if (/macintosh|mac os x/i.test(ua)) os = 'macOS';
  else if (/linux/i.test(ua)) os = 'Linux';

  let browser = 'Unknown Browser';
  if (/edg/i.test(ua)) browser = 'Edge';
  else if (/samsung/i.test(ua)) browser = 'Samsung Internet';
  else if (/chrome/i.test(ua)) browser = 'Chrome';
  else if (/firefox/i.test(ua)) browser = 'Firefox';
  else if (/safari/i.test(ua) && !/chrome/i.test(ua)) browser = 'Safari';

  const isStandalone = typeof window !== 'undefined' && (
    window.matchMedia?.('(display-mode: standalone)').matches ||
    window.navigator?.standalone === true ||
    localStorage?.getItem('pwa_installed') === 'true'
  );

  const screenResolution = typeof window !== 'undefined' && window.screen
    ? `${window.screen.width}x${window.screen.height} (@${window.devicePixelRatio || 1}x)`
    : 'Unknown';

  return {
    deviceId: getDeviceId(),
    os,
    browser,
    screen: screenResolution,
    isPwa: isStandalone,
    language: typeof navigator !== 'undefined' ? navigator.language : 'en',
    userAgent: ua.slice(0, 140),
  };
}

/**
 * Asynchronously fetches client public IP address with a 3.5s timeout.
 */
export async function fetchIpInfo() {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 3500);
    const res = await fetch('https://api.ipify.org?format=json', { signal: controller.signal });
    clearTimeout(timer);
    if (!res.ok) return 'Unknown / Offline';
    const data = await res.json();
    return data.ip || 'Unknown';
  } catch {
    return 'Unavailable / Offline';
  }
}

/**
 * Checks for multi-account abuse on the current device.
 * Records student names created on this device.
 */
export function recordAndCheckDuplicate(studentName) {
  try {
    const cleanName = (studentName || '').trim().toLowerCase();
    const raw = localStorage.getItem(PROFILE_HISTORY_KEY);
    const history = raw ? JSON.parse(raw) : [];

    const isDuplicate = history.length > 0 && !history.includes(cleanName);
    const previousNames = history.filter(n => n !== cleanName);

    if (!history.includes(cleanName) && cleanName) {
      history.push(cleanName);
      localStorage.setItem(PROFILE_HISTORY_KEY, JSON.stringify(history));
    }

    return {
      isDuplicate,
      previousNames,
      totalProfilesOnDevice: history.length,
    };
  } catch {
    return { isDuplicate: false, previousNames: [], totalProfilesOnDevice: 1 };
  }
}

/**
 * Sends a formatted HTML message to Telegram via Bot API.
 */
export async function sendTelegramMessage(htmlContent) {
  if (!TELEGRAM_CONFIG.enabled || !TELEGRAM_CONFIG.botToken || !TELEGRAM_CONFIG.chatId) {
    console.warn('[Telemetry] Telegram bot token or chat ID is missing. Skipped message delivery.');
    return false;
  }
  try {
    const endpoint = `https://api.telegram.org/bot${TELEGRAM_CONFIG.botToken}/sendMessage`;
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CONFIG.chatId,
        text: htmlContent,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    });
    const result = await res.json();
    return result.ok;
  } catch (err) {
    console.error('[Telemetry] Failed to deliver Telegram message:', err);
    return false;
  }
}

/**
 * Dispatches a student registration / update alert to Telegram.
 */
export async function notifyProfileCreated(profile, isEdit = false) {
  try {
    setCachedProfile(profile);
    const device = getDeviceInfo();
    const ip = await fetchIpInfo();
    const abuse = recordAndCheckDuplicate(profile.name);

    const titleBadge = isEdit ? '✏️ [PROFILE UPDATED]' : '🎓 [NEW STUDENT REGISTERED]';
    const statusLine = abuse.isDuplicate
      ? `🚨 <b>MULTI-ACCOUNT ALERT!</b>\nPrevious profile(s) on this device: <code>${abuse.previousNames.join(', ')}</code>`
      : '✅ <b>Verified Device</b> (Single Student)';

    const message = [
      `<b>${titleBadge}</b>`,
      `━━━━━━━━━━━━━━━━━━━━━━━━`,
      `👤 <b>Name:</b> ${profile.name}`,
      `🏫 <b>College:</b> ${profile.college}`,
      `📚 <b>Branch:</b> ${profile.branch}`,
      `🎓 <b>Session:</b> 2024–28 · Semester 4`,
      ``,
      `📱 <b>Device Diagnostics:</b>`,
      `• <b>OS / Browser:</b> ${device.os} (${device.browser})`,
      `• <b>Screen:</b> ${device.screen}`,
      `• <b>PWA Standalone:</b> ${device.isPwa ? 'Yes (Installed App)' : 'No (Browser Tab)'}`,
      `• <b>Device ID:</b> <code>${device.deviceId}</code>`,
      `• <b>IP Address:</b> <code>${ip}</code>`,
      ``,
      `⚠️ <b>Security & Abuse Check:</b>`,
      statusLine,
      `🕒 <b>Time:</b> ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST`,
    ].join('\n');

    await sendTelegramMessage(message);
  } catch (err) {
    console.error('[Telemetry] Error in notifyProfileCreated:', err);
  }
}

/**
 * Dispatches a student Help & Request query to Telegram.
 */
export async function notifyHelpRequest({ name, college, branch, category, subject, message }) {
  try {
    const device = getDeviceInfo();
    const ip = await fetchIpInfo();

    const formatted = [
      `📩 <b>[BEU EXAM DOST · HELP & QUERY]</b>`,
      `━━━━━━━━━━━━━━━━━━━━━━━━`,
      `👤 <b>From:</b> ${name || 'Anonymous'}`,
      `🏫 <b>College:</b> ${college || 'Not specified'}`,
      `📚 <b>Branch:</b> ${branch || 'CSE'}`,
      `🏷️ <b>Category:</b> <b>${category}</b>`,
      subject ? `📖 <b>Subject:</b> ${subject}` : '',
      ``,
      `💬 <b>Query / Suggestion:</b>`,
      `<i>${message.replace(/[<>]/g, '')}</i>`,
      ``,
      `📱 <b>Device Info:</b> ${device.os} (${device.browser}) · IP: <code>${ip}</code>`,
      `🕒 <b>Time:</b> ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST`,
    ].filter(Boolean).join('\n');

    return await sendTelegramMessage(formatted);
  } catch (err) {
    console.error('[Telemetry] Error in notifyHelpRequest:', err);
    return false;
  }
}
