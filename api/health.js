import { databasePool } from './_db.js';

export default {
  async fetch(request) {
    if (request.method !== 'GET') {
      return Response.json({ error: 'Method not allowed' }, { status: 405, headers: { Allow: 'GET' } });
    }

    try {
      const result = await databasePool().query('select 1 as connected');
      return Response.json({ ok: result.rows[0]?.connected === 1, service: 'postgres' }, {
        headers: { 'Cache-Control': 'no-store' },
      });
    } catch {
      return Response.json({ ok: false, service: 'postgres' }, {
        status: 503,
        headers: { 'Cache-Control': 'no-store' },
      });
    }
  },
};
