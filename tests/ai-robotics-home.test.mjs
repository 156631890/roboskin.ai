import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');

test('homepage gives AI and robotics one compact closed-loop authority route', async () => {
  const [home, site, component, css] = await Promise.all([
    read('src/app/page.tsx'),
    read('src/content/site.ts'),
    read('src/components/AiRobotClosedLoop.tsx'),
    read('src/app/globals.css'),
  ]);

  assert.match(site, /href: '\/ai-robotics', label: 'AI & Robotics'/);
  assert.match(site, /homeAiRobotLoop/);
  assert.match(site, /Touch closes the loop/);
  assert.match(home, /How AI becomes robot action/);
  assert.match(home, /Artificial intelligence supplies perception, prediction, reasoning, and action policies/);
  assert.match(home, /<AiRobotClosedLoop stages=\{homeAiRobotLoop\}/);
  assert.match(component, /aria-label="AI to robot action and feedback loop"/);
  assert.match(component, /Physical contact returns evidence to perception, control, and learning/);
  assert.match(css, /\.ai-robot-loop-grid/);
  assert.match(css, /\.ai-robot-feedback-rail/);
});
