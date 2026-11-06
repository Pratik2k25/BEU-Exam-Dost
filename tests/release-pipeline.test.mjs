import test from 'node:test';
import assert from 'node:assert/strict';
import {cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {spawnSync} from 'node:child_process';

const root = new URL('../', import.meta.url);
const sourcePackage = JSON.parse(readFileSync(new URL('package.json', root), 'utf8'));

for (const failure of ['version', 'content', 'test', null]) {
  test(`verified build ${failure ? `blocks ${failure} failure` : 'builds only after validation passes'}`, () => {
    const dir = mkdtempSync(join(tmpdir(), 'exam-dost-release-'));
    try {
      cpSync(new URL('scripts', root), join(dir, 'scripts'), {recursive:true});
      mkdirSync(join(dir, 'dist'));
      cpSync(new URL('dist/solutions', root), join(dir, 'dist/solutions'), {recursive:true});
      for (const name of ['app-meta.js', 'index.html']) cpSync(new URL(`dist/${name}`, root), join(dir, 'dist', name));
      cpSync(new URL('package-lock.json', root), join(dir, 'package-lock.json'));
      const pkg = {...sourcePackage, scripts: {...sourcePackage.scripts,
        check: 'node --check scripts/check-version.mjs',
        test: 'node --test probe.test.mjs',
        build: 'node build-probe.mjs',
      }};
      writeFileSync(join(dir, 'package.json'), JSON.stringify(pkg));
      writeFileSync(join(dir, 'probe.test.mjs'), failure === 'test' ? "throw new Error('intentional regression');" : '');
      writeFileSync(join(dir, 'build-probe.mjs'), "import {writeFileSync} from 'node:fs'; writeFileSync('built', 'yes');");
      if (failure === 'version') {
        const lock = JSON.parse(readFileSync(join(dir, 'package-lock.json'), 'utf8'));
        lock.version = '9.9.9';
        writeFileSync(join(dir, 'package-lock.json'), JSON.stringify(lock));
      }
      if (failure === 'content') writeFileSync(join(dir, 'dist/solutions/index.js'), '// stale generated content');
      // The fixture runs a separate test suite, not a nested node:test child.
      const env = {...process.env};
      delete env.NODE_TEST_CONTEXT;
      const result = spawnSync(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['run', 'build:verified'], {
        cwd:dir, encoding:'utf8', shell:process.platform === 'win32', timeout:60000, env,
      });
      assert.equal(result.error, undefined);
      assert.equal(result.status, failure ? 1 : 0, result.stdout + result.stderr);
      assert.equal(existsSync(join(dir, 'built')), !failure);
      if (failure === 'version') assert.match(result.stderr, /package-lock\.json/);
      if (failure === 'content') assert.match(result.stderr, /Generated content is stale/);
      if (failure === 'test') assert.match(result.stdout, /intentional regression/);
    } finally { rmSync(dir, {recursive:true, force:true}); }
  });
}
