import pg from 'pg';
import { attachDatabasePool } from '@vercel/functions';

const { Pool } = pg;

let pool;

export function secureConnectionString(value) {
  const url = new URL(value);
  if (!url.searchParams.has('sslmode') || ['prefer', 'require', 'verify-ca'].includes(url.searchParams.get('sslmode'))) {
    url.searchParams.set('sslmode', 'verify-full');
  }
  return url.toString();
}

export function databasePool() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not configured');
  }

  if (!pool) {
    pool = new Pool({
      connectionString: secureConnectionString(process.env.DATABASE_URL),
      max: 5,
      idleTimeoutMillis: 5000,
      connectionTimeoutMillis: 5000,
    });
    attachDatabasePool(pool);
  }

  return pool;
}
