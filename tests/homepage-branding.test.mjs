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

  assert.match(home, /Robot skin knowledge hub/i);
  assert.match(home, /RoboSkin\.ai is available/i);
  assert.match(home, /Inquire about RoboSkin\.ai/i);
  assert.match(home, /Explore robot skin research/i);
  assert.doesNotMatch(home, /Request a deck|Request datasheet|Talk to engineering/);
  assert.match(layout, /Robot skin and tactile AI information/i);
  assert.match(site, /premium robot skin domain/i);
});
