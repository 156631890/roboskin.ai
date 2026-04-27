import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const homePath = new URL('../src/app/page.tsx', import.meta.url);
const layoutPath = new URL('../src/app/layout.tsx', import.meta.url);
const sitePath = new URL('../src/content/site.ts', import.meta.url);

test('homepage copy reflects the high-end robot skin positioning', async () => {
  const [home, layout, site] = await Promise.all([
    readFile(homePath, 'utf8'),
    readFile(layoutPath, 'utf8'),
    readFile(sitePath, 'utf8'),
  ]);

  assert.match(home, /When AI gets a body, it needs skin/);
  assert.match(home, /Explore Tactile AI/);
  assert.match(home, /Request the RoboSkin\.ai Brief/);
  assert.match(home, /Strategic Acquisition Inquiry/);
  assert.match(home, /The Tactile AI Stack/);
  assert.match(home, /Research Map/);
  assert.match(home, /Market Signals/);
  assert.match(home, /Humanoid Robot Skin/);
  assert.match(layout, /Tactile AI/i);
  assert.match(site, /Tactile AI/i);
  assert.match(site, /State of Tactile AI/i);
});
