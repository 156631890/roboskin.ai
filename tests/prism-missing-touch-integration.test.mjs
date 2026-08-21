import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');

function objectRecord(source, id) {
  const normalized = source.replaceAll('\r\n', '\n');
  const marker = `    id: '${id}',`;
  const start = normalized.indexOf(marker);
  assert.notEqual(start, -1, `Missing record ${id}`);
  const next = normalized.indexOf("\n  {\n    id: '", start + marker.length);
  return normalized.slice(start, next === -1 ? normalized.length : next);
}

function arrayBody(source, exportName) {
  const normalized = source.replaceAll('\r\n', '\n');
  const declaration = normalized.indexOf(`export const ${exportName}`);
  assert.notEqual(declaration, -1, `Missing array ${exportName}`);
  const start = normalized.indexOf('= [', declaration);
  const end = normalized.indexOf('\n];', start);
  assert.ok(start >= 0 && end > start, `Could not isolate array ${exportName}`);
  return normalized.slice(start + 3, end);
}

function relationRecords(source) {
  return [...source.matchAll(/\n  \{[\s\S]*?\n  \},/g)].map((match) => match[0]);
}

function pageRecord(source, path) {
  const normalized = source.replaceAll('\r\n', '\n');
  const marker = `    path: '${path}',`;
  const markerIndex = normalized.indexOf(marker);
  assert.notEqual(markerIndex, -1, `Missing page ${path}`);
  const start = normalized.lastIndexOf('\n  {', markerIndex);
  const next = normalized.indexOf("\n  {\n    path: '", markerIndex + marker.length);
  return normalized.slice(start, next === -1 ? normalized.length : next);
}

test('PRISM brief and dataset preserve tactile coverage, image-count, access, license, and identity boundaries', async () => {
  const [blog, datasets, index, seo] = await Promise.all([
    read('src/lib/blog-data.ts'),
    read('src/lib/tactile-datasets.ts'),
    read('src/lib/research-index.ts'),
    read('src/lib/seo.ts'),
  ]);
  const brief = objectRecord(blog, 'prism-contact-rich-industrial-skill-dataset-2026');
  const dataset = objectRecord(datasets, 'prism-industrial-skill');
  const indexRecord = objectRecord(index, 'prism-contact-rich-industrial-skill-dataset-2026');

  assert.match(brief, /5,000\+ robot trajectories/);
  assert.match(brief, /tactile sensing is included for only a subset of episodes/);
  assert.match(brief, /combine visual and visuotactile streams/);
  assert.match(brief, /announced, download pending/);
  assert.match(brief, /https:\/\/arxiv\.org\/abs\/2608\.17962/);
  assert.match(brief, /https:\/\/tengbo-yu\.github\.io\/PRISM\//);
  assert.match(brief, /https:\/\/github\.com\/Tengbo-Yu\/PRISM/);
  assert.match(brief, /sourceTitle: 'PRISM: Precision and contact-rich Real-world Industrial Skill dataset with Multimodal sensing'/);
  assert.match(brief, /citationUrls:[\s\S]*?tengbo-yu\.github\.io\/PRISM\/[\s\S]*?github\.com\/Tengbo-Yu\/PRISM/);

  assert.match(dataset, /name: 'PRISM: Precision and contact-rich Real-world Industrial Skill dataset with Multimodal sensing'/);
  assert.match(dataset, /The paper does not disclose the number or share of tactile-equipped episodes/);
  assert.match(dataset, /Dataset-file license not published/);
  assert.match(dataset, /official Dataset button is disabled and labeled “soon”/);
  assert.doesNotMatch(dataset, /\n\s+datasetUrl:/);
  assert.doesNotMatch(dataset, /\n\s+licenseUrl:/);
  assert.doesNotMatch(dataset, /DIGIT|GelSight|TacTip|uSkin/);

  assert.match(indexRecord, /evidence: 'preprint'/);
  assert.match(indexRecord, /tactile stream covers only an unspecified subset/);
  assert.match(indexRecord, /no dataset files, release, or dataset-file license/);

  assert.match(seo, /citation: post\.citationUrls \?\? post\.sourceUrl/);
  assert.doesNotMatch(seo, /creator: entry\.institution\.map/);
  assert.match(seo, /name: 'Source-listed institutions'/);
});

test('The Missing Touch brief preserves participant, task, haptic-channel, and autonomy limits', async () => {
  const [blog, index] = await Promise.all([
    read('src/lib/blog-data.ts'),
    read('src/lib/research-index.ts'),
  ]);
  const brief = objectRecord(blog, 'missing-touch-spatial-tactile-feedback-teleoperation-2026');
  const indexRecord = objectRecord(index, 'missing-touch-spatial-tactile-feedback-teleoperation-2026');

  assert.match(brief, /12 \| 48 per participant, 12 per feedback condition/);
  assert.match(brief, /10, in a separate participant group \| 48 per participant/);
  assert.match(brief, /29-79% reduction in deviation/);
  assert.match(brief, /Kinesthetic feedback remained active in every cutaneous-feedback condition/);
  assert.match(brief, /did (?:\*\*)?not(?:\*\*)? train or evaluate an autonomous policy/i);
  assert.match(brief, /Full was not significantly more natural than 2D/);
  assert.match(brief, /https:\/\/arxiv\.org\/abs\/2608\.19372/);
  assert.match(brief, /sourceTitle: 'The Missing Touch: Spatially Distributed Tactile Feedback Brings Teleoperation Closer to Human Dexterity'/);

  assert.match(indexRecord, /evidence: 'preprint'/);
  assert.match(indexRecord, /no autonomous policy was trained or evaluated/);
  assert.match(indexRecord, /12 button-task participants and a separate 10-person peg-rolling group/);
});

test('knowledge relations add only source-supported PRISM hardware and Missing Touch sensor edges', async () => {
  const relations = await read('src/lib/research-entity-relations.ts');
  const datasetUsage = relationRecords(arrayBody(relations, 'researchDatasetUsageRelations'));
  const paperSensors = relationRecords(arrayBody(relations, 'researchPaperSensorRelations'));
  const semantics = relationRecords(arrayBody(relations, 'researchSemanticRelations'));

  const prismUsage = datasetUsage.filter((record) => record.includes("fromId: 'prism-industrial-skill'"));
  const missingSensors = paperSensors.filter((record) => record.includes("fromId: 'missing-touch-spatial-tactile-feedback-teleoperation-2026'"));
  const prismSemantics = semantics.filter((record) => record.includes("fromId: 'prism-contact-rich-industrial-skill-dataset-2026'"));

  assert.equal(prismUsage.length, 1);
  assert.match(prismUsage[0], /relation: 'usesRobot'[\s\S]*?toId: 'franka-emika-panda'[\s\S]*?two physical Franka Emika Panda arms/);
  assert.doesNotMatch(prismUsage[0], /usesSensor/);

  assert.equal(missingSensors.length, 1);
  assert.match(missingSensors[0], /relation: 'usesSensor'[\s\S]*?toId: 'gelsight-mini'/);

  assert.equal(prismSemantics.length, 1);
  assert.match(prismSemantics[0], /relation: 'introduces'[\s\S]*?toType: 'dataset'[\s\S]*?toId: 'prism-industrial-skill'/);
  assert.ok(datasetUsage.every((record) => !record.includes("fromId: 'missing-touch-spatial-tactile-feedback-teleoperation-2026'")));
  assert.ok(semantics.every((record) => !record.includes("fromId: 'missing-touch-spatial-tactile-feedback-teleoperation-2026'")));
  assert.ok(paperSensors.every((record) => !record.includes("fromId: 'prism-contact-rich-industrial-skill-dataset-2026'")));
});

test('pillar pages and homepage expose reverse links without adding a new thin route', async () => {
  const [topics, home, organizations] = await Promise.all([
    read('src/content/seo-topic-pages.ts'),
    read('src/app/page.tsx'),
    read('src/lib/research-organizations.ts'),
  ]);

  const pages = Object.fromEntries(
    ['/datasets', '/tactile-manipulation', '/robot-manipulation', '/robotics-datasets', '/robot-teleoperation']
      .map((path) => [path, pageRecord(topics, path)]),
  );
  for (const path of ['/datasets', '/robot-manipulation', '/robotics-datasets']) {
    assert.match(pages[path], /prism-contact-rich-industrial-skill-dataset-2026/);
  }
  assert.match(pages['/datasets'], /official project still marks the dataset “soon”/);
  assert.match(pages['/robotics-datasets'], /official dataset control remained marked “soon”/);
  assert.match(pages['/tactile-manipulation'], /missing-touch-spatial-tactile-feedback-teleoperation-2026/);
  assert.match(pages['/robot-teleoperation'], /missing-touch-spatial-tactile-feedback-teleoperation-2026/);
  assert.match(pages['/robot-teleoperation'], /prism-contact-rich-industrial-skill-dataset-2026/);
  assert.match(pages['/robot-teleoperation'], /It did not train an autonomous policy/);

  assert.match(home, /tactileDatasetEntries\.length/);
  assert.match(home, /tactileBenchmarkEntries\.length/);
  assert.match(home, /researchIndexEntries\.length/);
  assert.match(home, /tactileSensorEntries\.length/);

  for (const id of [
    'peking-university',
    'northwestern-university',
    'northwestern-center-for-robotics-and-biosystems',
  ]) {
    assert.match(organizations, new RegExp(`id: '${id}'`));
  }
});
