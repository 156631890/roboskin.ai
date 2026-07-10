import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');

test('the first research index edition is normalized and source-backed', async () => {
  const index = await read('src/lib/research-index.ts');
  const ids = [
    'dream-tac-tactile-world-action-model-2026',
    'single-material-soft-robotic-skin-2025',
    'freetacman-robot-free-visuotactile-data-collection-2025',
    'sparsh-x-multisensory-touch-representations-2025',
    'genforce-transferable-force-sensing-2026',
    'mitas-multi-resolution-tactile-imitation-learning-2026',
    'ros2-kilted-tactile-pipeline-2026',
  ];

  for (const id of ids) assert.match(index, new RegExp(`'${id}'`));
  for (const field of [
    'sensorPrinciple',
    'modalities',
    'formFactor',
    'dataOutput',
    'applications',
    'evidence',
    'limitations',
    'reviewedAt',
  ]) assert.match(index, new RegExp(`${field}:`));
  assert.match(index, /getBlogPostById/);
  assert.doesNotMatch(index, /content:/);
});
