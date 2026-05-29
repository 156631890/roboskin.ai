import assert from 'node:assert/strict';
import { access } from 'node:fs/promises';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const homePath = new URL('../src/app/page.tsx', import.meta.url);
const layoutPath = new URL('../src/app/layout.tsx', import.meta.url);
const sitePath = new URL('../src/content/site.ts', import.meta.url);
const visualsPath = new URL('../src/components/IndustryVisuals.tsx', import.meta.url);
const researchPath = new URL('../src/app/research/page.tsx', import.meta.url);
const glossaryPath = new URL('../src/app/glossary/page.tsx', import.meta.url);
const brandVisualAssets = [
  'public/generated/brand/roboskin-brand-board.webp',
  'public/generated/brand/roboskin-hero-tactile-lab.webp',
];
const authorityVisualAssets = [
  'public/generated/authority/authority-hero-tactile-stack.webp',
  'public/generated/authority/robot-skin-definition.webp',
  'public/generated/authority/tactile-ai-loop.webp',
  'public/generated/authority/state-of-tactile-ai-cover.webp',
  'public/generated/authority/humanoid-stack-map-cover.webp',
  'public/generated/authority/roboskin-index-cover.webp',
  'public/generated/authority/research-graphene-liquid-metal.webp',
  'public/generated/authority/research-soft-robotic-skin.webp',
  'public/generated/authority/research-ros2-tactile-pipeline.webp',
];

test('homepage copy reflects the authority portal positioning', async () => {
  const [home, layout, site, visuals] = await Promise.all([
    readFile(homePath, 'utf8'),
    readFile(layoutPath, 'utf8'),
    readFile(sitePath, 'utf8'),
    readFile(visualsPath, 'utf8'),
  ]);

  assert.match(home, /Robot skin and tactile AI authority portal/);
  assert.match(home, /What is robot skin\?/);
  assert.match(home, /Open the robot skin glossary/);
  assert.match(home, /Submit a Source/);
  assert.match(home, /Contribute research context/);
  assert.match(home, /Robot skin direct answers/);
  assert.match(home, /Research and resource index/);
  assert.match(home, /Tactile AI stack map/);
  assert.match(home, /Humanoid robot skin/);
  assert.match(home, /homeBrandAssets/);
  assert.match(home, /homeBrandAssets\.hero\.image/);
  assert.match(site, /authorityLinkGroups/);
  assert.match(site, /directAnswerBlocks/);
  assert.match(site, /researchResourceIndex/);
  assert.match(site, /homeBrandAssets/);
  assert.match(visuals, /AuthorityIndex/);
  assert.match(visuals, /DirectAnswerSection/);
  assert.match(visuals, /TactileStackMap/);
  assert.match(layout, /Tactile AI/i);
});

test('research and glossary pages extend the brand content system', async () => {
  const [research, glossary, visual] = await Promise.all([
    readFile(researchPath, 'utf8'),
    readFile(glossaryPath, 'utf8'),
    readFile(visualsPath, 'utf8'),
  ]);

  assert.match(research, /source-backed signal board/);
  assert.match(research, /Open source-backed briefs/);
  assert.match(research, /Research lane/);
  assert.match(research, /Submit source context/);
  assert.match(glossary, /terminology matrix/);
  assert.match(glossary, /Open term matrix/);
  assert.match(glossary, /Term route matrix/);
  assert.match(glossary, /Follow related route/);
  assert.match(visual, /signal-panel/);
});

test('homepage brand visual assets exist and are wired into the hero', async () => {
  const [home, site] = await Promise.all([
    readFile(homePath, 'utf8'),
    readFile(sitePath, 'utf8'),
  ]);

  await Promise.all(brandVisualAssets.map((assetPath) => access(new URL(assetPath, root))));

  for (const assetPath of brandVisualAssets) {
    assert.match(site + home, new RegExp(assetPath.replace('public', '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }

  assert.match(site, /hero:\s*\{/);
  assert.match(site, /brandBoard:\s*\{/);
  assert.match(home, /Robot touch needs a surface intelligence layer/);
});

test('homepage authority visual assets are generated and wired into components', async () => {
  const [home, site, visuals] = await Promise.all([
    readFile(homePath, 'utf8'),
    readFile(sitePath, 'utf8'),
    readFile(visualsPath, 'utf8'),
  ]);

  await Promise.all(authorityVisualAssets.map((assetPath) => access(new URL(assetPath, root))));

  for (const assetPath of authorityVisualAssets) {
    assert.match(site + home + visuals, new RegExp(assetPath.replace('public', '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }

  assert.match(site, /authorityHeroVisual/);
  assert.match(site, /imageAlt/);
  assert.match(visuals, /asset\.image/);
  assert.match(visuals, /entry\.image/);
  assert.match(visuals, /item\.image/);
  assert.match(visuals, /heroVisual/);
});
