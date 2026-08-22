import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');

const priorityRoutes = [
  '/tactile-ai',
  '/humanoid-robot-skin',
  '/tactile-foundation-models',
  '/datasets',
  '/physical-ai-touch',
];

const strategicKeywords = [
  'robot skin',
  'tactile AI',
  'humanoid robot skin',
  'robotic skin',
  'robot tactile sensing',
  'tactile sensing robotics',
  'tactile sensors for robots',
  'tactile sensor robot hand',
  'humanoid tactile sensing',
  'electronic skin robotics',
  'robot e-skin',
  'artificial skin for robots',
  'tactile manipulation',
  'visuo-tactile manipulation',
  'tactile dataset robotics',
  'tactile benchmark robotics',
  'whole body tactile sensing',
  'soft tactile sensor',
  'tactile foundation model',
  'Physical AI tactile sensing',
];

test('the five priority pillars have canonical static routes and legacy redirects', async () => {
  const [topics, redirects, protectedRedirects, llms, ...routeFiles] = await Promise.all([
    read('src/content/seo-topic-pages.ts'),
    read('vercel.json'),
    read('config/protected-redirects.json'),
    read('public/llms.txt'),
    ...priorityRoutes.map((route) => read(`src/app${route}/page.tsx`)),
  ]);

  for (const route of priorityRoutes) {
    assert.match(topics, new RegExp(`path: '${route.replaceAll('/', '\\/')}'`));
    assert.match(llms, new RegExp(`https://roboskin\\.ai${route.replaceAll('/', '\\/')}`));
  }

  assert.equal(routeFiles.length, priorityRoutes.length);
  const redirectMap = Object.fromEntries(JSON.parse(redirects).routes
    .filter((entry) => entry.status && entry.headers?.Location)
    .map((entry) => [entry.src, entry.headers.Location]));
  assert.equal(redirectMap['/guides/tactile-foundation-models'], 'https://roboskin.ai/tactile-foundation-models');
  assert.equal(redirectMap['/guides/tactile-datasets-robot-learning'], 'https://roboskin.ai/datasets');
  assert.match(protectedRedirects, /"\/applications\/humanoid-robot-skin": "\/humanoid-robot-skin"/);
  assert.match(protectedRedirects, /"\/guides\/physical-ai-touch-data": "\/physical-ai-touch"/);
});

test('the tactile dataset hub is structured, filterable, source-bounded, and machine-readable', async () => {
  const [data, explorer, page, seo] = await Promise.all([
    read('src/lib/tactile-datasets.ts'),
    read('src/components/TactileDatasetExplorer.tsx'),
    read('src/app/datasets/page.tsx'),
    read('src/lib/seo.ts'),
  ]);

  for (const id of ['robotacdex', 'ht-bench', 'rct', 'tactidex', 'freetacman', 'humanoid-vta', 'sparsh-x']) {
    assert.match(data, new RegExp(`id: '${id}'`));
  }
  for (const field of ['institution', 'robot', 'sensor', 'modalities', 'sampleCount', 'tasks', 'objectCategories', 'dataFormat', 'license', 'paperUrl', 'sourceReviewed']) {
    assert.match(data, new RegExp(`${field}:`));
  }
  for (const filter of ['Sensor', 'Robot / collection platform', 'Task', 'Modality', 'Year']) {
    assert.match(explorer, new RegExp(filter.replace('/', '\\/')));
  }
  assert.match(explorer, /“Not stated” means the reviewed primary source did not provide enough evidence/);
  assert.match(page, /buildTactileDatasetsJsonLd/);
  assert.match(seo, /'@type': 'DataCatalog'/);
  assert.match(seo, /'@type': 'Dataset'/);
});

test('the internal research graph and homepage expose the semantic authority chain', async () => {
  const [graph, researchPage, home, site] = await Promise.all([
    read('src/lib/topic-graph.ts'),
    read('src/app/research/[id]/page.tsx'),
    read('src/app/page.tsx'),
    read('src/content/site.ts'),
  ]);

  for (const route of ['/robot-skin', '/tactile-ai', '/physical-ai-touch', '/datasets', '/tactile-foundation-models', '/humanoid-robot-skin']) {
    assert.match(graph, new RegExp(`href: '${route.replaceAll('/', '\\/')}'`));
  }
  assert.match(researchPage, /Research topic path/);
  assert.match(researchPage, /getResearchTopicLinks/);
  assert.match(home, /Robot Skin → Tactile AI → Physical AI/);
  assert.match(home, /homeKnowledgeMap/);
  assert.match(site, /homeKnowledgeMap/);
});

test('the keyword matrix assigns all 20 strategic clusters to canonical owners', async () => {
  const matrix = await read('docs/seo/keyword-query-matrix.md');

  for (const keyword of strategicKeywords) {
    assert.match(matrix, new RegExp(`\\| ${keyword.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&')} \\|`, 'i'));
  }
});
