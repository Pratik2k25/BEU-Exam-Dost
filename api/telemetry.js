const JSON_HEADERS = { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' };
const allowedEvents = new Set(['app_opened', 'profile_saved', 'help_request']);
function cleanDevice(value) {
  const os = ['Android', 'iOS', 'Windows', 'macOS', 'Linux', 'Other'].includes(value?.os) ? value.os : 'Other';
  const appMode = ['installed', 'web'].includes(value?.appMode) ? value.appMode : 'web';
  return { os, appMode };
}
function cleanText(value, limit = 160) {
  return typeof value === 'string' ? value.replace(/[\u0000-\u001f\u007f]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, limit) : '';
}

export default {
  async fetch(request) {
    if (request.method !== 'POST') return Response.json({ error: 'Method not allowed' }, { status: 405, headers: { ...JSON_HEADERS, Allow: 'POST' } });
    let body;
    try {
      const text = await request.text();
      if (new TextEncoder().encode(text).length > 12000) return Response.json({ error: 'Request is too large' }, { status: 413, headers: JSON_HEADERS });
      body = JSON.parse(text);
    } catch { return Response.json({ error: 'Invalid request' }, { status: 400, headers: JSON_HEADERS }); }
    if (!allowedEvents.has(body?.event)) return Response.json({ error: 'Unsupported event' }, { status: 400, headers: JSON_HEADERS });
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    if (!token || !chatId) return Response.json({ error: 'Telemetry delivery is not configured' }, { status: 503, headers: JSON_HEADERS });

    const device = cleanDevice(body.device);
    const lines = [`[BEU Exam Dost] ${body.event} | ${device.os} ${device.appMode}`];
    if (body.event === 'profile_saved') {
      const profile = body.profile || {};
      lines.push(`Name: ${cleanText(profile.name)}`, `College: ${cleanText(profile.college, 200)}`, `Branch: ${cleanText(profile.branch, 120)}`);
    } else if (body.event === 'help_request') {
      const help = body.help || {};
      lines.push(`Name: ${cleanText(help.name)}`, `College: ${cleanText(help.college, 200)}`, `Branch: ${cleanText(help.branch, 120)}`, `Category: ${cleanText(help.category, 120)}`, `Subject: ${cleanText(help.subject, 160)}`, `Message: ${cleanText(help.message, 1500)}`);
    }
    const message = lines.join('\n');
    try {
      const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text: message, disable_web_page_preview: true }),
      });
      if (!response.ok) return Response.json({ error: 'Notification delivery failed' }, { status: 502, headers: JSON_HEADERS });
      const result = await response.json().catch(() => null);
      if (!result?.ok) return Response.json({ error: 'Notification delivery failed' }, { status: 502, headers: JSON_HEADERS });
      return Response.json({ ok: true }, { headers: JSON_HEADERS });
    } catch { return Response.json({ error: 'Notification delivery failed' }, { status: 502, headers: JSON_HEADERS }); }
  },
};
