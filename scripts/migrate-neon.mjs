import pg from 'pg';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { secureConnectionString } from '../api/_db.js';

const { Client } = pg;
const connectionString = process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL;
if (!connectionString) throw new Error('Set DATABASE_URL_UNPOOLED or DATABASE_URL before running the Neon migration.');

const client = new Client({ connectionString: secureConnectionString(connectionString), connectionTimeoutMillis: 10000 });
try {
  await client.connect();
  const schemaPath = resolve(fileURLToPath(new URL('../api/sync-schema.sql', import.meta.url)));
  await client.query(await readFile(schemaPath, 'utf8'));
  console.log('Neon sync schema is ready.');
} finally {
  await client.end().catch(() => {});
}
