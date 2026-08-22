import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');

function recordById(source, id) {
  const start = source.indexOf(`id: '${id}'`);
  assert.notEqual(start, -1, `missing record ${id}`);
  const next = source.indexOf("\n  {\n    id: '", start + id.length + 10);
  const arrayEnd = source.indexOf('\n];', start);
  const end = [next, arrayEnd].filter((position) => position > start).sort((a, b) => a - b)[0] ?? source.length;
  return source.slice(start, end);
}

test('vision-based tactile intelligence brief preserves the review taxonomy and evidence boundary', async () => {
  const posts = await read('src/lib/blog-data.ts');
  const article = recordById(posts, 'vision-based-tactile-intelligence-robotics-survey-2026');

  for (const signal of [
    'four typical hardware components and four sequential processing stages',
    'Deformable elastomer',
    'Marker tracking',
    'Photometric stereo',
    'Stereo vision reconstruction',
    'Shading-based reconstruction',
    'Direct geometric information',
    'Indirect force-related information',
    'Sequential information',
    'Large-area robotic tactile skin',
    'Tactile foundation models and VTLA policies',
    'arXiv v1, submitted on August 16, 2026',
    'https://arxiv.org/abs/2608.15490',
    'https://arxiv.org/html/2608.15490v1',
    'https://doi.org/10.48550/arXiv.2608.15490',
  ]) {
    assert.match(article, new RegExp(signal.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'));
  }

  for (const href of [
    '/tactile-ai',
    '/tactile-sensors',
    '/sensors',
    '/datasets',
    '/benchmarks',
    '/robot-skin',
    '/robot-hands',
    '/tactile-foundation-models',
    '/physical-ai-touch',
  ]) {
    assert.match(article, new RegExp(`\\]\\(${href.replaceAll('/', '\\/')}\\)`));
  }

  assert.match(article, /survey, not an original sensor benchmark or a new foundation-model release/i);
  assert.match(article, /does not introduce a new public dataset, benchmark protocol, model checkpoint, or sensor product/i);
  assert.match(article, /displayed no dedicated official code, project, or dataset link/i);
  assert.doesNotMatch(article, /peer-reviewed (?:paper|survey)|released (?:a new )?(?:dataset|benchmark|model|checkpoint)|state-of-the-art/i);
});

test('research index records the source as a preprint review rather than an artifact release', async () => {
  const index = await read('src/lib/research-index.ts');
  const entry = recordById(index, 'vision-based-tactile-intelligence-robotics-survey-2026');

  assert.match(entry, /publisher: 'arXiv'/);
  assert.match(entry, /evidence: 'preprint'/);
  assert.match(entry, /review rather than an original controlled benchmark, sensor release, dataset, or model artifact/);
  assert.match(entry, /No dedicated official project, code, or dataset link was displayed/);
  assert.doesNotMatch(entry, /evidence: 'peer-reviewed'|public checkpoint|open-source dataset/i);
});

test('survey affiliations connect one paper to eight normalized institutions without ownership inference', async () => {
  const [organizations, relations] = await Promise.all([
    read('src/lib/research-organizations.ts'),
    read('src/lib/research-entity-relations.ts'),
  ]);

  const officialOrganizations = [
    ['the-university-of-hong-kong', 'https://www.hku.hk/'],
    ['nanyang-technological-university', 'https://www.ntu.edu.sg/'],
    ['the-hong-kong-polytechnic-university', 'https://www.polyu.edu.hk/'],
    ['south-china-university-of-technology', 'https://www.scut.edu.cn/en/main.htm'],
    ['kth-royal-institute-of-technology', 'https://www.kth.se/en'],
    ['kings-college-london', 'https://www.kcl.ac.uk/'],
  ];

  for (const [id, url] of officialOrganizations) {
    const record = recordById(organizations, id);
    assert.match(record, /kind: 'university'/);
    assert.match(record, new RegExp(url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
    assert.match(record, /source affiliation only, not university-wide ownership, funding, endorsement/);
  }

  const start = relations.indexOf("fromId: 'vision-based-tactile-intelligence-robotics-survey-2026'");
  assert.notEqual(start, -1);
  const end = relations.indexOf("\n  {\n    fromType: 'paper'", start + 20);
  const batch = relations.slice(start, end);

  for (const id of [
    'great-bay-university',
    'tsinghua-university',
    ...officialOrganizations.map(([id]) => id),
  ]) {
    assert.match(batch, new RegExp(`organizationId: '${id}'`));
  }

  assert.equal([...batch.matchAll(/organizationId: '/g)].length, 8);
  assert.match(batch, /https:\/\/arxiv\.org\/html\/2608\.15490v1/);
  assert.match(batch, /without exposing an author-by-author mapping/);
  assert.match(batch, /do not establish institutional ownership, funding, endorsement, equal contribution/);
  assert.doesNotMatch(batch, /relation: 'usesSensor'|relation: 'introduces'|relation: 'describesDataset'/);
});

test('tactile AI and sensor pillars link back to the survey as a visible research brief', async () => {
  const topics = await read('src/content/seo-topic-pages.ts');
  const tactileAiStart = topics.indexOf("path: '/tactile-ai'");
  const tactileAiEnd = topics.indexOf("path: '/e-skin'", tactileAiStart);
  const sensorStart = topics.indexOf("path: '/sensors'");
  const sensorEnd = topics.indexOf("path: '/tactile-manipulation'", sensorStart);
  const tactileAi = topics.slice(tactileAiStart, tactileAiEnd);
  const sensors = topics.slice(sensorStart, sensorEnd);

  for (const page of [tactileAi, sensors]) {
    assert.match(page, /href: '\/research\/vision-based-tactile-intelligence-robotics-survey-2026'/);
    assert.match(page, /paperBriefIds:[^\n]*'vision-based-tactile-intelligence-robotics-survey-2026'/);
    assert.match(page, /https:\/\/arxiv\.org\/html\/2608\.15490v1/);
  }
});
