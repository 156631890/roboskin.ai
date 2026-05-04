import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const homePath = new URL('../src/app/page.tsx', import.meta.url);
const layoutPath = new URL('../src/app/layout.tsx', import.meta.url);
const sitePath = new URL('../src/content/site.ts', import.meta.url);
const visualsPath = new URL('../src/components/IndustryVisuals.tsx', import.meta.url);

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
  assert.match(home, /Request the RoboSkin\.ai Brief/);
  assert.match(home, /Strategic acquisition conversation/);
  assert.match(home, /Robot skin direct answers/);
  assert.match(home, /Research and resource index/);
  assert.match(home, /Tactile AI stack map/);
  assert.match(home, /Humanoid robot skin/);
  assert.match(site, /authorityLinkGroups/);
  assert.match(site, /directAnswerBlocks/);
  assert.match(site, /researchResourceIndex/);
  assert.match(visuals, /AuthorityIndex/);
  assert.match(visuals, /DirectAnswerSection/);
  assert.match(visuals, /TactileStackMap/);
  assert.match(layout, /Tactile AI/i);
});
