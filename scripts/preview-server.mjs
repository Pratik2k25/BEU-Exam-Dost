import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, resolve, sep } from 'node:path';
import health from '../api/health.js';
import sync from '../api/sync.js';

const buildRoot = resolve(process.cwd(), 'build');
const handlers = new Map([['/api/health', health], ['/api/sync', sync]]);
const types = new Map([
  ['.html', 'text/html; charset=utf-8'], ['.js', 'text/javascript; charset=utf-8'],
  ['.mjs', 'text/javascript; charset=utf-8'], ['.css', 'text/css; charset=utf-8'],
  ['.svg', 'image/svg+xml'], ['.png', 'image/png'], ['.webmanifest', 'application/manifest+json'],
  ['.woff2', 'font/woff2'], ['.ttf', 'font/ttf'], ['.json', 'application/json'],
]);

const server = createServer(async (incoming, outgoing) => {
  try {
    const url = new URL(incoming.url || '/', 'http://localhost');
    if (url.pathname === '/_vercel/speed-insights/script.js') {
      outgoing.writeHead(204, { 'Cache-Control': 'no-store' }).end();
      return;
    }
    const handler = handlers.get(url.pathname);
    if (handler) {
      const chunks = [];
      for await (const chunk of incoming) chunks.push(chunk);
      const bytes = Buffer.concat(chunks);
      const request = new Request(url, {
        method: incoming.method,
        headers: incoming.headers,
        ...(bytes.length ? { body: bytes } : {}),
      });
      const response = await handler.fetch(request);
      const responseBody = Buffer.from(await response.arrayBuffer());
      outgoing.writeHead(response.status, Object.fromEntries(response.headers));
      outgoing.end(responseBody);
      return;
    }

    const decoded = decodeURIComponent(url.pathname);
    const target = resolve(buildRoot, `.${decoded}`);
    if (target !== buildRoot && !target.startsWith(buildRoot + sep)) {
      outgoing.writeHead(403).end('Forbidden');
      return;
    }
    const file = decoded.endsWith('/') ? resolve(target, 'index.html') : target;
    const data = await readFile(file);
    outgoing.writeHead(200, {
      'Content-Type': types.get(extname(file)) || 'application/octet-stream',
      'Cache-Control': file.endsWith(`${sep}sw.js`) ? 'no-store' : 'no-cache',
      ...(file.endsWith(`${sep}sw.js`) ? { 'Service-Worker-Allowed': '/' } : {}),
    });
    outgoing.end(data);
  } catch (error) {
    console.error('Preview request failed:', error.message);
    if (outgoing.headersSent) { outgoing.destroy(); return; }
    outgoing.writeHead(error.code === 'ENOENT' ? 404 : 500, { 'Content-Type': 'text/plain; charset=utf-8' });
    outgoing.end(error.code === 'ENOENT' ? 'Not found' : 'Preview server error');
  }
});

const port = Number(process.env.PORT || 4176);
server.listen(port, '127.0.0.1', () => console.log(`BEU Exam Dost preview: http://127.0.0.1:${port}/`));
