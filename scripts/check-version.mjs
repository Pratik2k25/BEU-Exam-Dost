#!/usr/bin/env node
/**
 * scripts/check-version.mjs
 * ─────────────────────────────────────────────────────────────────────────────
 * Strict SemVer verification for BEU Exam Dost.
 *
 * Rules enforced:
 *  1. package.json "version" must be a valid SemVer string (MAJOR.MINOR.PATCH).
 *  2. No pre-release identifiers (e.g. "-alpha", "-rc.1") in production builds.
 *  3. No build metadata suffixes (e.g. "+build.123").
 *  4. dist/app-meta.js must export APP_VERSION that matches package.json exactly.
 *  5. dist/index.html <meta name="version"> content must match package.json exactly.
 *  6. Both package-lock.json package versions must match package.json exactly.
 *
 * Usage:
 *   node scripts/check-version.mjs             # Validate current version
 *   node scripts/check-version.mjs --bump patch # Bump PATCH and re-validate
 *   node scripts/check-version.mjs --bump minor # Bump MINOR, reset PATCH to 0
 *   node scripts/check-version.mjs --bump major # Bump MAJOR, reset MINOR+PATCH
 *   node scripts/check-version.mjs --set 0.3.0  # Set exact version
 *
 * Exit codes:
 *   0 — All checks pass
 *   1 — Validation failure (with descriptive error message)
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Read a file relative to the project root. */
function readRoot(relPath) {
  return readFileSync(resolve(ROOT, relPath), 'utf8');
}

/** Write a file relative to the project root. */
function writeRoot(relPath, content) {
  writeFileSync(resolve(ROOT, relPath), content, 'utf8');
}

/** Parse raw semver string. Returns { major, minor, patch } or null. */
function parseSemVer(raw) {
  const m = typeof raw === 'string' && /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/.exec(raw);
  if (!m) return null;
  return { major: Number(m[1]), minor: Number(m[2]), patch: Number(m[3]) };
}

/** Format a semver object back to string. */
function fmtSemVer({ major, minor, patch }) {
  return `${major}.${minor}.${patch}`;
}

/** Bump a parsed semver according to part. */
function bumpSemVer(parsed, part) {
  const v = { ...parsed };
  if (part === 'major') { v.major++; v.minor = 0; v.patch = 0; }
  else if (part === 'minor') { v.minor++; v.patch = 0; }
  else if (part === 'patch') { v.patch++; }
  else { fail(`Unknown bump part: "${part}". Use major | minor | patch.`); }
  return v;
}

/** Print error and exit 1. */
function fail(msg) {
  console.error(`\n[check-version] ✗ FAIL: ${msg}\n`);
  process.exit(1);
}

/** Print success and continue. */
function ok(msg) {
  console.log(`[check-version] ✓ ${msg}`);
}

// ─── Version Sources ──────────────────────────────────────────────────────────

function getPackageVersion() {
  const pkg = JSON.parse(readRoot('package.json'));
  return { raw: pkg.version, pkg };
}

function getLockfile() {
  let lock;
  try { lock = JSON.parse(readRoot('package-lock.json')); }
  catch { fail('package-lock.json is missing or invalid JSON. Restore the committed lockfile before checking or setting versions.'); }
  if (!lock || typeof lock !== 'object' || Array.isArray(lock)
      || !lock.packages || typeof lock.packages !== 'object' || Array.isArray(lock.packages)
      || !lock.packages[''] || typeof lock.packages[''] !== 'object' || Array.isArray(lock.packages[''])) {
    fail('package-lock.json must contain a packages[""] root package. Restore the committed lockfile.');
  }
  return lock;
}

function getAppMetaVersion() {
  try {
    const src = readRoot('dist/app-meta.js');
    // Match either: export const APP_VERSION = '...' or export const appVersion='...'
    const m = /(?:APP_VERSION|appVersion)\s*=\s*['"]([^'"]+)['"]/.exec(src);
    return m ? m[1] : null;
  } catch {
    return null; // file may not exist yet
  }
}

function getHtmlMetaVersion() {
  try {
    const html = readRoot('dist/index.html');
    const m = /<meta\s+name=["']version["']\s+content=["']([^"']+)["']/.exec(html);
    return m ? m[1] : null;
  } catch {
    return null;
  }
}

// ─── Validation ───────────────────────────────────────────────────────────────

function validate(targetVersion) {
  let allOk = true;

  // 1. Parse + strict SemVer check
  const parsed = parseSemVer(targetVersion);
  if (!parsed) {
    fail(`"${targetVersion}" is not a valid SemVer string (expected MAJOR.MINOR.PATCH with no suffixes).`);
  }
  // Ensure no pre-release or build metadata sneaked through
  if (/[-+]/.test(targetVersion)) {
    fail(`"${targetVersion}" contains pre-release or build-metadata suffixes. Production versions must be pure MAJOR.MINOR.PATCH.`);
  }
  ok(`package.json version "${targetVersion}" is valid strict SemVer.`);

  const lock = getLockfile();
  for (const [field, value] of [['version', lock.version], ['packages[""].version', lock.packages[''].version]]) {
    if (value !== targetVersion) {
      console.error(`[check-version] FAIL: package-lock.json ${field}=${JSON.stringify(value)} must match package.json "${targetVersion}". Run --set ${targetVersion} to synchronise.`);
      allOk = false;
    } else ok(`package-lock.json ${field} matches "${targetVersion}".`);
  }

  // 2. app-meta.js
  const appMetaVer = getAppMetaVersion();
  if (appMetaVer === null) {
    console.warn('[check-version] ⚠ dist/app-meta.js not found or APP_VERSION not exported — skipping this check.');
  } else if (appMetaVer !== targetVersion) {
    console.error(`[check-version] ✗ FAIL: dist/app-meta.js APP_VERSION="${appMetaVer}" does not match package.json "${targetVersion}".`);
    allOk = false;
  } else {
    ok(`dist/app-meta.js APP_VERSION="${appMetaVer}" matches.`);
  }

  // 3. index.html meta tag
  const htmlVer = getHtmlMetaVersion();
  if (htmlVer === null) {
    console.warn('[check-version] ⚠ dist/index.html <meta name="version"> not found — skipping this check.');
  } else if (htmlVer !== targetVersion) {
    console.error(`[check-version] ✗ FAIL: dist/index.html meta version="${htmlVer}" does not match package.json "${targetVersion}".`);
    allOk = false;
  } else {
    ok(`dist/index.html <meta name="version"> "${htmlVer}" matches.`);
  }

  if (!allOk) {
    fail('One or more version consistency checks failed. Run with --set <version> to synchronise.');
  }

  return parsed;
}

// ─── Synchronisation ──────────────────────────────────────────────────────────

function syncAllSources(newVer) {
  // Read and validate the lockfile structure before changing any version sources.
  const lock = getLockfile();
  // 1. package.json
  const pkgRaw = readRoot('package.json');
  const pkg = JSON.parse(pkgRaw);
  const oldVer = pkg.version;
  pkg.version = newVer;
  writeRoot('package.json', JSON.stringify(pkg, null, 2) + '\n');
  ok(`package.json: ${oldVer} → ${newVer}`);

  lock.version = newVer;
  lock.packages[''].version = newVer;
  writeRoot('package-lock.json', JSON.stringify(lock, null, 2) + '\n');
  ok(`package-lock.json package versions → ${newVer}`);

  // 2. dist/app-meta.js (if it exists)
  try {
    let appMeta = readRoot('dist/app-meta.js');
    const updated = appMeta.replace(
      /((?:APP_VERSION|appVersion)\s*=\s*['"])([^'"]+)(['"])/,
      `$1${newVer}$3`
    );
    if (updated !== appMeta) {
      writeRoot('dist/app-meta.js', updated);
      ok(`dist/app-meta.js APP_VERSION → ${newVer}`);
    } else {
      console.warn('[check-version] ⚠ dist/app-meta.js found but APP_VERSION pattern not matched — manual update may be required.');
    }
  } catch {
    console.warn('[check-version] ⚠ dist/app-meta.js not found — skipping.');
  }

  // 3. dist/index.html <meta name="version"> (if it exists)
  try {
    let html = readRoot('dist/index.html');
    const updated = html.replace(
      /(<meta\s+name=["']version["']\s+content=["'])[^"']+(['"])/,
      `$1${newVer}$2`
    );
    if (updated !== html) {
      writeRoot('dist/index.html', updated);
      ok(`dist/index.html <meta name="version"> → ${newVer}`);
    } else {
      console.warn('[check-version] ⚠ dist/index.html version meta tag not found — skipping.');
    }
  } catch {
    console.warn('[check-version] ⚠ dist/index.html not found — skipping.');
  }
}

// ─── CLI Entry Point ──────────────────────────────────────────────────────────

const args = process.argv.slice(2);

if (args.includes('--help') || args.includes('-h')) {
  console.log(`
BEU Exam Dost — Strict SemVer Version Checker

Usage:
  node scripts/check-version.mjs                 Validate all sources against package.json
  node scripts/check-version.mjs --set <ver>     Set exact version and synchronise all sources
  node scripts/check-version.mjs --bump patch    Bump PATCH version (x.y.Z+1)
  node scripts/check-version.mjs --bump minor    Bump MINOR version (x.Y+1.0)
  node scripts/check-version.mjs --bump major    Bump MAJOR version (X+1.0.0)

Exit codes: 0 = pass, 1 = fail
`);
  process.exit(0);
}

const setIdx = args.indexOf('--set');
const bumpIdx = args.indexOf('--bump');

if (setIdx !== -1) {
  // --set <version>
  const newVer = args[setIdx + 1];
  if (!newVer) fail('--set requires a version argument (e.g. --set 0.3.0)');
  const parsed = parseSemVer(newVer);
  if (!parsed) fail(`"${newVer}" is not a valid strict SemVer string.`);
  syncAllSources(newVer);
  validate(newVer);
  console.log(`\n[check-version] Version synchronised to ${newVer} — all checks passed.\n`);

} else if (bumpIdx !== -1) {
  // --bump <part>
  const part = args[bumpIdx + 1];
  const { raw } = getPackageVersion();
  const current = parseSemVer(raw);
  if (!current) fail(`Current package.json version "${raw}" is not valid SemVer — fix it first.`);
  const bumped = bumpSemVer(current, part);
  const newVer = fmtSemVer(bumped);
  syncAllSources(newVer);
  validate(newVer);
  console.log(`\n[check-version] Bumped ${part}: ${raw} → ${newVer} — all checks passed.\n`);

} else {
  // Validate only
  const { raw } = getPackageVersion();
  validate(raw);
  console.log(`\n[check-version] Version "${raw}" is consistent across all sources. All checks passed.\n`);
}
