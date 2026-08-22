import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');

function recordById(source, id) {
  const normalized = source.replaceAll('\r\n', '\n');
  const marker = `    id: '${id}',`;
  const start = normalized.indexOf(marker);
  assert.notEqual(start, -1, `missing record ${id}`);
  const next = normalized.indexOf("\n  {\n    id: '", start + marker.length);
  const arrayEnd = normalized.indexOf('\n];', start);
  const end = [next, arrayEnd]
    .filter((position) => position > start)
    .sort((a, b) => a - b)[0] ?? normalized.length;
  return normalized.slice(start, end);
}

function arrayBody(source, exportName) {
  const normalized = source.replaceAll('\r\n', '\n');
  const declaration = normalized.indexOf(`export const ${exportName}`);
  assert.notEqual(declaration, -1, `missing array ${exportName}`);
  const start = normalized.indexOf('= [', declaration);
  const end = normalized.indexOf('\n];', start);
  assert.ok(start >= 0 && end > start, `could not isolate array ${exportName}`);
  return normalized.slice(start + 3, end);
}

function relationRecords(source) {
  return [...source.matchAll(/\n  \{[\s\S]*?\n  \},/g)].map((match) => match[0]);
}

function affiliationBatch(source, fromId) {
  const normalized = source.replaceAll('\r\n', '\n');
  const marker = `fromId: '${fromId}',`;
  const markerIndex = normalized.indexOf(marker);
  assert.notEqual(markerIndex, -1, `missing affiliation batch ${fromId}`);
  const start = normalized.lastIndexOf('\n  {', markerIndex);
  const next = normalized.indexOf("\n  {\n    fromType: '", markerIndex + marker.length);
  return normalized.slice(start, next === -1 ? normalized.length : next);
}

test('UniVTAC graph edges preserve supported endpoint types and evidence boundaries', async () => {
  const relations = await read('src/lib/research-entity-relations.ts');
  const affiliations = affiliationBatch(relations, 'univtac-platform-encoder-benchmark-2026');
  const affiliationIds = [...affiliations.matchAll(/organizationId: '([^']+)'/g)]
    .map((match) => match[1])
    .sort();

  assert.deepEqual(affiliationIds, [
    'd-robotics',
    'fudan-university',
    'nanjing-university',
    'scalelab',
    'shenzhen-university',
    'the-university-of-hong-kong',
    'tsinghua-university',
    'vitai-robotics',
    'wuhan-university',
  ]);
  assert.match(affiliations, /evidenceUrls: \['https:\/\/arxiv\.org\/abs\/2602\.10093'\]/);
  assert.match(affiliations, /source-listed affiliations only/);

  const partOf = relationRecords(arrayBody(relations, 'researchOrganizationPartOfRelations'))
    .filter((record) => record.includes("fromId: 'scalelab'"));
  assert.equal(partOf.length, 1);
  assert.match(partOf[0], /relation: 'partOf'[\s\S]*?toId: 'shanghai-jiao-tong-university'/);
  assert.match(partOf[0], /https:\/\/scalelab-sjtu\.github\.io\//);

  const manufacturing = relationRecords(arrayBody(relations, 'researchManufacturingRelations'))
    .filter((record) => record.includes("fromId: 'vitai-gf225'"));
  assert.equal(manufacturing.length, 1);
  assert.match(manufacturing[0], /relation: 'manufacturedBy'[\s\S]*?toId: 'vitai-robotics'/);
  assert.match(manufacturing[0], /https:\/\/vitai\.site\/about/);

  const paperSensors = relationRecords(arrayBody(relations, 'researchPaperSensorRelations'))
    .filter((record) => record.includes("fromId: 'univtac-platform-encoder-benchmark-2026'"));
  assert.equal(paperSensors.length, 2);
  assert.deepEqual(
    paperSensors.map((record) => record.match(/toId: '([^']+)'/)?.[1]).sort(),
    ['gelsight-mini', 'vitai-gf225'],
  );
  assert.match(paperSensors.find((record) => record.includes("toId: 'gelsight-mini'")), /simulated sensor configuration only/);
  assert.match(paperSensors.find((record) => record.includes("toId: 'vitai-gf225'")), /physical demonstrations are publicly released/);

  const datasetUsage = relationRecords(arrayBody(relations, 'researchDatasetUsageRelations'))
    .filter((record) => record.includes("fromId: 'univtac-benchmark-dataset'"));
  assert.equal(datasetUsage.length, 2);
  assert.ok(datasetUsage.some((record) => /relation: 'usesSensor'[\s\S]*?toId: 'gelsight-mini'/.test(record)));
  assert.ok(datasetUsage.some((record) => /relation: 'usesRobot'[\s\S]*?toId: 'franka-panda-univtac-gelsight-mini-simulation-configuration'/.test(record)));
  assert.ok(datasetUsage.every((record) => !record.includes('tianji-marvin-univtac-gf225-configuration')));

  const semantics = relationRecords(arrayBody(relations, 'researchSemanticRelations'));
  const paperSemantics = semantics.filter((record) => record.includes("fromId: 'univtac-platform-encoder-benchmark-2026'"));
  const encoderSemantics = semantics.filter((record) => record.includes("fromId: 'univtac-encoder'"));
  const vitarSemantics = semantics.filter((record) => record.includes("fromId: 'vitar'") && record.includes("toId: 'univtac-benchmark'"));

  assert.equal(paperSemantics.length, 4);
  assert.ok(paperSemantics.some((record) => /relation: 'introduces'[\s\S]*?toType: 'model'[\s\S]*?toId: 'univtac-encoder'/.test(record)));
  assert.ok(paperSemantics.some((record) => /relation: 'introduces'[\s\S]*?toType: 'benchmark'[\s\S]*?toId: 'univtac-benchmark'/.test(record)));
  assert.ok(paperSemantics.some((record) => /relation: 'describesDataset'[\s\S]*?toId: 'univtac-encoder-pretraining-corpus'/.test(record)));
  assert.ok(paperSemantics.some((record) => /relation: 'describesDataset'[\s\S]*?toId: 'univtac-benchmark-dataset'/.test(record)));
  assert.equal(encoderSemantics.length, 2);
  assert.ok(encoderSemantics.some((record) => /relation: 'trainedOn'[\s\S]*?toId: 'univtac-encoder-pretraining-corpus'/.test(record)));
  assert.ok(encoderSemantics.some((record) => /relation: 'evaluatedBy'[\s\S]*?toId: 'univtac-benchmark'/.test(record)));
  assert.equal(vitarSemantics.length, 1);
  assert.match(vitarSemantics[0], /seven-task subset[\s\S]*?excludes Insert Hole/);
  assert.ok([...paperSemantics, ...encoderSemantics, ...vitarSemantics]
    .every((record) => !record.includes("relation: 'usesDataset'")));
});

test('UniVTAC data records keep four incompatible counting units separate', async () => {
  const [datasets, articleSource] = await Promise.all([
    read('src/lib/tactile-datasets.ts'),
    read('src/lib/blog-data.ts'),
  ]);
  const pretraining = recordById(datasets, 'univtac-encoder-pretraining-corpus');
  const publicBenchmark = recordById(datasets, 'univtac-benchmark-dataset');
  const article = recordById(articleSource, 'univtac-platform-encoder-benchmark-2026');

  for (const signal of [
    '205,826',
    'I_marked',
    'I_pure',
  ]) {
    assert.match(pretraining, new RegExp(signal.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'));
  }
  assert.match(pretraining, /14 (?:geometric primitives|shapes)/i);
  assert.match(pretraining, /projected (?:2D |fiducial-)?marker coordinates/i);
  assert.match(pretraining, /(?:seven-dimensional|7D) (?:relative )?object pose/i);
  assert.match(pretraining, /No standalone (?:public |pretraining-corpus )?(?:download|corpus package)[^.]*was verified/i);

  for (const signal of [
    '800 HDF5 episodes',
    '763',
    '37',
    '125.43 GB',
    '172331dbbce95bc04c3e59b22f32dc72ba5561ae',
    'simulated GelSight Mini',
    'Franka Panda',
  ]) {
    assert.match(publicBenchmark, new RegExp(signal.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'));
  }

  assert.equal((datasets.match(/id: 'univtac-encoder-pretraining-corpus'/g) ?? []).length, 1);
  assert.equal((datasets.match(/id: 'univtac-benchmark-dataset'/g) ?? []).length, 1);
  assert.match(article, /205,826 synthetic contact samples[\s\S]*?400 paper-reported policy-training trajectories[\s\S]*?800 currently hosted HDF5 episodes[\s\S]*?450 physical demonstrations/);
  assert.match(article, /Evaluation rollouts measure outcomes; they should not be added to training trajectories/);
  assert.match(article, /did not verify it as part of the public benchmark download/);
});

test('UniVTAC benchmark and article preserve paper and artifact result boundaries', async () => {
  const [benchmarks, articleSource] = await Promise.all([
    read('src/lib/tactile-benchmarks.ts'),
    read('src/lib/blog-data.ts'),
  ]);
  const benchmark = recordById(benchmarks, 'univtac-benchmark');
  const article = recordById(articleSource, 'univtac-platform-encoder-benchmark-2026');

  for (const taskName of [
    'Lift Bottle',
    'Pull-out Key',
    'Lift Can',
    'Put Bottle in Shelf',
    'Insert Hole',
    'Insert HDMI',
    'Insert Tube',
    'Grasp Classify',
  ]) {
    assert.match(benchmark, new RegExp(taskName));
  }
  assert.match(benchmark, /50 (?:automatically collected )?full (?:training )?trajectories per task|50 full training trajectories for each of eight tasks/i);
  assert.match(benchmark, /400 (?:total|trajectories across eight tasks|policy-training trajectories)/i);
  assert.match(benchmark, /100 (?:simulation |test |evaluation )?(?:evaluation )?rollouts per (?:method-)?task/i);
  assert.match(benchmark, /30\.9%[\s\S]*?40\.5%[\s\S]*?48\.0%/);
  assert.match(benchmark, /17\.1 percentage[- ]point/);
  assert.match(benchmark, /author-(?:defined|run)|not an independent|not a universal/i);

  assert.match(article, /150 demonstrations (?:for each|per) (?:of three )?tasks[\s\S]*?450 total/i);
  assert.match(article, /20 rollouts per method-task pair/);
  assert.match(article, /Insert Tube \| 55% \| 85%/);
  assert.match(article, /Insert USB \| 15% \| 25%/);
  assert.match(article, /Bottle Upright \| 60% \| 95%/);
  assert.match(article, /Average \| 43\.3% \| 68\.3% \| \+25 percentage points/);
  assert.match(article, /checkpoint logs average 43\.5[\s\S]*?48\.0 in the paper/);
  assert.match(article, /vision baseline logs average 32\.375[\s\S]*?30\.9 in the paper/);
  assert.match(article, /will not describe the public checkpoints as a reproduction of Table I/);
});

test('UniVTAC Encoder remains a representation encoder and not the existing UniTacVLA entity', async () => {
  const models = await read('src/lib/robot-ai-models.ts');
  const encoder = recordById(models, 'univtac-encoder');
  const unitacvla = recordById(models, 'unitacvla');

  assert.match(encoder, /512-dimensional|512D/i);
  assert.match(encoder, /ResNet-18/);
  assert.match(encoder, /tactile representation encoder/i);
  assert.match(encoder, /not (?:a )?(?:vision-language-action|VLA)|does not accept language/i);
  assert.match(encoder, /https:\/\/arxiv\.org\/abs\/2602\.10093/);
  assert.match(encoder, /distinct UniTacVLA model/);
  assert.doesNotMatch(encoder, /id: 'unitacvla'|2606\.31723/);

  assert.match(unitacvla, /id: 'unitacvla'/);
  assert.doesNotMatch(unitacvla, /UniVTAC Encoder|2602\.10093|205,826/);
  assert.equal((models.match(/id: 'univtac-encoder'/g) ?? []).length, 1);
  assert.equal((models.match(/id: 'unitacvla'/g) ?? []).length, 1);
});

test('UniVTAC entities link back to one canonical RoboSkin evidence review', async () => {
  const reviewPath = '/research/univtac-platform-encoder-benchmark-2026';
  const [
    datasets,
    benchmarks,
    models,
    sensors,
    robots,
    articleSource,
    datasetExplorer,
    benchmarkExplorer,
    modelExplorer,
    sensorExplorer,
    robotDirectory,
  ] = await Promise.all([
    read('src/lib/tactile-datasets.ts'),
    read('src/lib/tactile-benchmarks.ts'),
    read('src/lib/robot-ai-models.ts'),
    read('src/lib/tactile-sensors.ts'),
    read('src/lib/research-robots.ts'),
    read('src/lib/blog-data.ts'),
    read('src/components/TactileDatasetExplorer.tsx'),
    read('src/components/TactileBenchmarkExplorer.tsx'),
    read('src/components/RobotAiModelExplorer.tsx'),
    read('src/components/TactileSensorExplorer.tsx'),
    read('src/app/robots/page.tsx'),
  ]);

  for (const [source, ids] of [
    [datasets, ['univtac-encoder-pretraining-corpus', 'univtac-benchmark-dataset']],
    [benchmarks, ['univtac-benchmark']],
    [models, ['univtac-encoder']],
    [sensors, ['vitai-gf225']],
    [robots, [
      'franka-panda-univtac-gelsight-mini-simulation-configuration',
      'tianji-marvin-univtac-gf225-configuration',
    ]],
  ]) {
    for (const id of ids) {
      assert.match(recordById(source, id), new RegExp(`researchUrl: '${reviewPath}'`));
    }
  }

  for (const explorer of [datasetExplorer, benchmarkExplorer, modelExplorer, sensorExplorer]) {
    assert.match(explorer, /entry\.researchUrl/);
    assert.match(explorer, /RoboSkin evidence review/);
  }
  assert.match(robotDirectory, /robot\.researchUrl/);
  assert.match(robotDirectory, /RoboSkin evidence review/);

  const article = recordById(articleSource, 'univtac-platform-encoder-benchmark-2026');
  for (const target of [
    '/datasets#dataset-univtac-encoder-pretraining-corpus',
    '/datasets#dataset-univtac-benchmark-dataset',
    '/benchmarks#benchmark-univtac-benchmark',
    '/robot-foundation-models#model-univtac-encoder',
    '/sensors#sensor-vitai-gf225',
    '/robots#robot-franka-panda-univtac-gelsight-mini-simulation-configuration',
    '/robots#robot-tianji-marvin-univtac-gf225-configuration',
  ]) {
    assert.ok(article.includes(target), `article must link to ${target}`);
  }
});
