import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
import * as evidence from '../src/lib/dataset-evidence.mjs';

function load(file, dependencies = {}) {
  const exports = {};
  const require = name => {
    assert.ok(name in dependencies, `Unexpected runtime import: ${name}`);
    return dependencies[name];
  };
  new Function('exports', 'require', ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText)(exports, require);
  return exports;
}

const records = load('src/lib/tactile-datasets.ts');
const site = load('src/content/site.ts');
const release = load('src/lib/research-index-release.ts', {
  '../../public/releases/research-index/v2026.08.22/research-index.json': {
    default: JSON.parse(fs.readFileSync('public/releases/research-index/v2026.08.22/research-index.json', 'utf8')),
  },
});
const seo = load('src/lib/seo.ts', {
  '@/lib/dataset-evidence.mjs': evidence,
  '@/content/site': site,
  '@/lib/research-index-release': release,
});

test('paper-associated candidates stay outside catalog counts and Dataset structured data', async () => {
  const route = load('src/app/datasets.json/route.ts', {
    '@/lib/tactile-datasets': records,
    '@/lib/dataset-evidence.mjs': evidence,
  });
  const data = await route.GET().json();
  assert.equal(data.count, data.entries.length);
  assert.equal(data.statistics.total, data.entries.length);
  const graph = seo.buildTactileDatasetsJsonLd(records.tactileDatasetEntries)['@graph'];
  const datasets = graph.filter(node => node['@type'] === 'Dataset');
  assert.equal(datasets.length, data.count);
  for (const candidate of data.candidates) {
    assert.ok(!data.entries.some(entry => entry.id === candidate.id));
    assert.ok(!datasets.some(node => node.name === candidate.name));
    assert.equal(candidate.datasetUrl, undefined);
    assert.ok(candidate.directoryRecordUrl.endsWith(`#candidate-${candidate.id}`));
  }
  const snapshot = JSON.parse(fs.readFileSync(`public${data.snapshot}`, 'utf8'));
  assert.deepEqual(data, snapshot);
});

test('public manifest access does not grant the code license to dataset files', () => {
  const bench = records.tactileDatasetEntries.find(entry => entry.id === 'bench2dex');
  const graph = seo.buildTactileDatasetsJsonLd([bench]);
  const node = graph['@graph'].find(item => item['@type'] === 'Dataset');
  assert.equal(evidence.getDatasetEvidence(bench).access, 'public-files');
  assert.equal(evidence.getDatasetEvidence(bench).licenseStatus, 'unknown');
  assert.equal(node.license, undefined);
  assert.deepEqual(node.creator.map(person => person.name), bench.authors);
  assert.ok(node.creator.every(person => person['@type'] === 'Person' && !person.name.includes('RoboSkin')));
  assert.equal(node.citation, bench.paperUrl);
  assert.equal(node.distribution.url, bench.datasetUrl);
  assert.equal(node.distribution.contentUrl, undefined, 'A directory listing is not a direct payload download');
});
