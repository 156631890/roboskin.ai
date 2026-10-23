import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';

test('tutorial archives contain only public files and preserve downloads on failure', () => {
  const python = process.platform === 'win32' ? 'python' : 'python3';
  const result = spawnSync(python, ['-B', '-m', 'unittest', 'discover', '-s', 'tests', '-p', 'test_tutorial_bundle.py', '-v'], {
    cwd: new URL('..', import.meta.url),
    encoding: 'utf8',
    timeout: 30_000,
  });
  assert.ifError(result.error);
  assert.equal(result.status, 0, result.stdout + result.stderr);
});
