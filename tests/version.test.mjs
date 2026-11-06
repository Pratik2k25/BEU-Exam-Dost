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
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { tmpdir } from 'node:os';
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

function createVersionSandbox() {
  const sandbox = mkdtempSync(join(tmpdir(), 'exam-dost-version-test-'));
  mkdirSync(join(sandbox, 'scripts'), {recursive: true});
  mkdirSync(join(sandbox, 'dist'), {recursive: true});
  for (const relPath of ['package.json', 'package-lock.json', 'scripts/check-version.mjs', 'dist/app-meta.js', 'dist/index.html']) {
    copyFileSync(resolve(ROOT, relPath), join(sandbox, relPath));
  }
  return sandbox;
}

function runSandboxChecker(sandbox, ...args) {
  return spawnSync(process.execPath, [join(sandbox, 'scripts/check-version.mjs'), ...args], {
    cwd: sandbox,
    encoding: 'utf8',
  });
}

function sandboxVersion(sandbox) {
  return JSON.parse(readFileSync(join(sandbox, 'package.json'), 'utf8')).version;
}

function readLock(sandbox) {
  return JSON.parse(readFileSync(join(sandbox, 'package-lock.json'), 'utf8'));
}

function assertSynced(sandbox, expected, previousLock) {
  assert.equal(sandboxVersion(sandbox), expected);
  const lock = readLock(sandbox);
  assert.equal(lock.version, expected);
  assert.equal(lock.packages[''].version, expected);
  assert.match(readFileSync(join(sandbox, 'dist/app-meta.js'), 'utf8'), new RegExp(`appVersion='${expected.replaceAll('.', '\\.')}'`));
  assert.deepEqual({...lock, version: previousLock.version, packages: {...lock.packages, '': previousLock.packages['']}}, previousLock);
  assert.deepEqual({...lock.packages[''], version: previousLock.packages[''].version}, previousLock.packages['']);
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
  const sandbox = createVersionSandbox();
  try {
    const testVer = '99.88.77';
    const lock = readLock(sandbox);
    const result = runSandboxChecker(sandbox, '--set', testVer);
    assert.equal(result.status, 0, `--set ${testVer} should succeed\n${result.stderr}`);
    assertSynced(sandbox, testVer, lock);
    assert.match(readFileSync(join(sandbox, 'dist/app-meta.js'), 'utf8'), /appVersion='99\.88\.77'/);
  } finally {
    rmSync(sandbox, {recursive: true, force: true});
  }
});

test('check-version --bump patch increments patch component', () => {
  const sandbox = createVersionSandbox();
  try {
    const before = sandboxVersion(sandbox);
    const lock = readLock(sandbox);
    const parsed = before.split('.').map(Number);
    const expected = `${parsed[0]}.${parsed[1]}.${parsed[2] + 1}`;
    const result = runSandboxChecker(sandbox, '--bump', 'patch');
    assert.equal(result.status, 0, `--bump patch should succeed\n${result.stderr}`);
    assertSynced(sandbox, expected, lock);
  } finally {
    rmSync(sandbox, {recursive: true, force: true});
  }
});

test('check-version --bump minor increments minor and resets patch', () => {
  const sandbox = createVersionSandbox();
  try {
    const before = sandboxVersion(sandbox);
    const lock = readLock(sandbox);
    const parsed = before.split('.').map(Number);
    const expected = `${parsed[0]}.${parsed[1] + 1}.0`;
    const result = runSandboxChecker(sandbox, '--bump', 'minor');
    assert.equal(result.status, 0, `--bump minor should succeed\n${result.stderr}`);
    assertSynced(sandbox, expected, lock);
  } finally {
    rmSync(sandbox, {recursive: true, force: true});
  }
});

test('check-version --bump major increments major and resets minor+patch', () => {
  const sandbox = createVersionSandbox();
  try {
    const before = sandboxVersion(sandbox);
    const lock = readLock(sandbox);
    const parsed = before.split('.').map(Number);
    const expected = `${parsed[0] + 1}.0.0`;
    const result = runSandboxChecker(sandbox, '--bump', 'major');
    assert.equal(result.status, 0, `--bump major should succeed\n${result.stderr}`);
    assertSynced(sandbox, expected, lock);
  } finally {
    rmSync(sandbox, {recursive: true, force: true});
  }
});

for (const version of ['01.2.3', '1.02.3', '1.2.03', ' 1.2.3', '1.2.3 ']) {
  test(`strict versions reject ${JSON.stringify(version)} without modifying files`, () => {
    const sandbox = createVersionSandbox();
    try {
      const before = readFileSync(join(sandbox, 'package.json'), 'utf8');
      const result = runSandboxChecker(sandbox, '--set', version);
      assert.equal(result.status, 1);
      assert.match(result.stderr, /not a valid/i);
      assert.equal(readFileSync(join(sandbox, 'package.json'), 'utf8'), before);
    } finally { rmSync(sandbox, {recursive: true, force: true}); }
  });
}

for (const [label, change] of [
  ['top-level mismatch', lock => { lock.version = '9.9.9'; }],
  ['root-package mismatch', lock => { lock.packages[''].version = '9.9.9'; }],
  ['missing top-level version', lock => { delete lock.version; }],
  ['missing root-package version', lock => { delete lock.packages[''].version; }],
  ['missing packages', lock => { delete lock.packages; }],
  ['missing root package', lock => { delete lock.packages['']; }],
  ['malformed version', lock => { lock.version = 123; }],
]) {
  test(`version checker rejects lockfile ${label}`, () => {
    const sandbox = createVersionSandbox();
    try {
      runSandboxChecker(sandbox, '--set', sandboxVersion(sandbox));
      const lock = readLock(sandbox);
      change(lock);
      writeFileSync(join(sandbox, 'package-lock.json'), JSON.stringify(lock));
      const result = runSandboxChecker(sandbox);
      assert.equal(result.status, 1);
      assert.match(result.stderr, /package-lock\.json/);
    } finally { rmSync(sandbox, {recursive: true, force: true}); }
  });
}

for (const invalid of ['missing', 'invalid JSON']) {
  test(`version checker reports ${invalid} lockfile before modifying version sources`, () => {
    const sandbox = createVersionSandbox();
    try {
      if (invalid === 'missing') rmSync(join(sandbox, 'package-lock.json'));
      else writeFileSync(join(sandbox, 'package-lock.json'), '{');
      const before = readFileSync(join(sandbox, 'package.json'), 'utf8');
      const result = runSandboxChecker(sandbox, '--set', '1.2.3');
      assert.equal(result.status, 1);
      assert.match(result.stderr, /package-lock\.json/);
      assert.equal(readFileSync(join(sandbox, 'package.json'), 'utf8'), before);
    } finally { rmSync(sandbox, {recursive: true, force: true}); }
  });
}
