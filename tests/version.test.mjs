/**
 * tests/version.test.mjs
 * ─────────────────────────────────────────────────────────────────────────────
 * Task 9: Strict SemVer enforcement tests.
 * Ensures the version checker script correctly validates, rejects,
 * and synchronises version strings across the project.
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const CHECKER = resolve(ROOT, 'scripts/check-version.mjs');

// ─── Helpers ──────────────────────────────────────────────────────────────────

function runChecker(...args) {
  return spawnSync(process.execPath, [CHECKER, ...args], {
    cwd: ROOT,
    encoding: 'utf8',
  });
}

function pkgVersion() {
  return JSON.parse(readFileSync(resolve(ROOT, 'package.json'), 'utf8')).version;
}

// ─── Tests ────────────────────────────────────────────────────────────────────

test('check-version script exists and is executable', () => {
  const { status, stderr } = runChecker('--help');
  assert.equal(status, 0, `--help should exit 0, stderr: ${stderr}`);
});

test('current package.json version is valid strict SemVer', () => {
  const ver = pkgVersion();
  assert.match(
    ver,
    /^\d+\.\d+\.\d+$/,
    `package.json version "${ver}" must be MAJOR.MINOR.PATCH with no suffixes`
  );
});

test('current package.json version has no pre-release suffix', () => {
  const ver = pkgVersion();
  assert.doesNotMatch(
    ver,
    /[-+]/,
    `package.json version "${ver}" must not contain pre-release (-) or build-metadata (+) suffixes`
  );
});

test('validation passes for the current version', () => {
  const { status, stdout, stderr } = runChecker();
  assert.equal(
    status,
    0,
    `check-version should pass for current version\nstdout: ${stdout}\nstderr: ${stderr}`
  );
  assert.match(stdout, /all checks passed/i);
});

test('validation rejects a pre-release version string', () => {
  // We test the --set path with a bad value; it should exit 1 immediately
  const { status, stderr } = runChecker('--set', '1.0.0-alpha');
  assert.equal(
    status,
    1,
    `Pre-release version "1.0.0-alpha" should be rejected`
  );
  assert.match(stderr, /pre-release|not a valid/i);
});

test('validation rejects a build-metadata version string', () => {
  const { status, stderr } = runChecker('--set', '1.0.0+build.1');
  assert.equal(
    status,
    1,
    `Build-metadata version "1.0.0+build.1" should be rejected`
  );
  assert.match(stderr, /pre-release|not a valid/i);
});

test('validation rejects a malformed version string', () => {
  const { status, stderr } = runChecker('--set', '0.3');
  assert.equal(status, 1, `Malformed version "0.3" should be rejected`);
  assert.match(stderr, /not a valid/i);
});

test('validation rejects a version with text suffix', () => {
  const { status, stderr } = runChecker('--set', '0.3.0-rc1');
  assert.equal(status, 1, `Version with text suffix should be rejected`);
  assert.match(stderr, /pre-release|not a valid/i);
});

test('check-version --set synchronises package.json to the new version', () => {
  const originalVer = pkgVersion();

  // Bump to a test version, then restore
  const testVer = '99.88.77';
  const setResult = runChecker('--set', testVer);
  assert.equal(
    setResult.status,
    0,
    `--set ${testVer} should succeed\n${setResult.stderr}`
  );
  assert.equal(pkgVersion(), testVer, `package.json version should be updated to ${testVer}`);

  // Restore original
  const restoreResult = runChecker('--set', originalVer);
  assert.equal(
    restoreResult.status,
    0,
    `Restoring to ${originalVer} should succeed\n${restoreResult.stderr}`
  );
  assert.equal(pkgVersion(), originalVer, `package.json version should be restored to ${originalVer}`);
});

test('check-version --bump patch increments patch component', () => {
  const before = pkgVersion();
  const parsed = before.split('.').map(Number);
  const expectedPatch = `${parsed[0]}.${parsed[1]}.${parsed[2] + 1}`;

  const result = runChecker('--bump', 'patch');
  assert.equal(result.status, 0, `--bump patch should succeed\n${result.stderr}`);
  assert.equal(pkgVersion(), expectedPatch);

  // Restore
  runChecker('--set', before);
});

test('check-version --bump minor increments minor and resets patch', () => {
  const before = pkgVersion();
  const parsed = before.split('.').map(Number);
  const expectedMinor = `${parsed[0]}.${parsed[1] + 1}.0`;

  const result = runChecker('--bump', 'minor');
  assert.equal(result.status, 0, `--bump minor should succeed\n${result.stderr}`);
  assert.equal(pkgVersion(), expectedMinor);

  // Restore
  runChecker('--set', before);
});

test('check-version --bump major increments major and resets minor+patch', () => {
  const before = pkgVersion();
  const parsed = before.split('.').map(Number);
  const expectedMajor = `${parsed[0] + 1}.0.0`;

  const result = runChecker('--bump', 'major');
  assert.equal(result.status, 0, `--bump major should succeed\n${result.stderr}`);
  assert.equal(pkgVersion(), expectedMajor);

  // Restore
  runChecker('--set', before);
});
