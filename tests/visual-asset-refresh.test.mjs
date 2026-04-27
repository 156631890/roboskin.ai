import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');

test('industry asset pages use reusable visual components for stack, reports, and CTA hierarchy', async () => {
  const [home, resources, downloads, visuals, site] = await Promise.all([
    read('src/app/page.tsx'),
    read('src/app/resources/page.tsx'),
    read('src/app/downloads/page.tsx'),
    read('src/components/IndustryVisuals.tsx'),
    read('src/content/site.ts'),
  ]);

  assert.match(visuals, /export function TactileStackVisual/);
  assert.match(visuals, /export function FeaturedAssetCovers/);
  assert.match(visuals, /export function ConversionPathPanel/);
  assert.match(visuals, /role="img"/);

  assert.match(site, /featuredIndustryAssets/);
  assert.match(site, /State of Tactile AI 2026/);
  assert.match(site, /Humanoid Tactile Stack Map/);
  assert.match(site, /RoboSkin Index/);

  assert.match(home, /TactileStackVisual/);
  assert.match(home, /FeaturedAssetCovers/);
  assert.match(home, /ConversionPathPanel/);
  assert.match(resources, /FeaturedAssetCovers/);
  assert.match(downloads, /FeaturedAssetCovers/);
});
