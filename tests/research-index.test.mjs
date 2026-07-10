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
  assert.match(index, /Digit 360 multisensory tactile representation model/);
  assert.match(index, /Framework spanning GelSight, TacTip, and uSkin sensors/);
  assert.doesNotMatch(index, /Cross-sensor tactile learning model|Transferable camera-based force estimation|Vision-based tactile sensor/);
});

test('the research index is indexable, filterable, and visible before interaction', async () => {
  const [page, explorer, seo, site, sitemap, llms] = await Promise.all([
    read('src/app/research-index/page.tsx'),
    read('src/components/ResearchIndexExplorer.tsx'),
    read('src/lib/seo.ts'),
    read('src/content/site.ts'),
    read('src/app/sitemap.ts'),
    read('public/llms.txt'),
  ]);

  assert.match(page, /RoboSkin Tactile Research Index/);
  assert.match(page, /Methodology/);
  assert.match(page, /Limitations/);
  assert.match(page, /researchIndexEntries/);
  assert.match(explorer, /useState/);
  assert.match(explorer, /filteredEntries\.map/);
  assert.match(explorer, /'Applications'/);
  assert.match(explorer, /entry\.applications\.join\(', '\)/);
  assert.match(explorer, /colSpan=\{8\}/);
  assert.match(seo, /buildResearchIndexJsonLd/);
  assert.match(seo, /const updatedAt = '2026-07-10'/);
  assert.match(seo, /'\/research-index':/);
  assert.match(site, /href: '\/research-index'/);
  assert.match(sitemap, /seoRoutes/);
  assert.match(llms, /https:\/\/roboskin\.ai\/research-index/);
});
