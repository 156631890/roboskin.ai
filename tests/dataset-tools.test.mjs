import assert from 'node:assert/strict';
import test from 'node:test';
import { buildDatasetCitation, buildDatasetCsv, matchesDatasetQuery, datasetSensorLabel } from '../src/lib/dataset-tools.mjs';

test('physical DIGIT labels share a filter without conflating simulated or newer hardware', () => {
  const labels = ['DIGIT', 'DIGIT vision-based tactile sensor', 'Digit 360', 'DIGIT Pinki', 'Simulated DIGIT'];
  assert.deepEqual(labels.filter(label => datasetSensorLabel(label) === 'DIGIT'), labels.slice(0, 2));
  assert.equal(new Set(labels.map(datasetSensorLabel)).size, 4);
  assert.equal(datasetSensorLabel('DIGIT vision-based tactile sensor'), 'DIGIT');
});

const entry = {
  id: 'example', name: 'Touch, "Vision"\nExample', institution: ['Research lab'], year: 2026,
  robot: ['Human collection'], sensor: ['DIGIT'], tasks: ['Material recognition'],
  modalities: ['RGB', 'Touch'], sampleCount: 'Not stated', objectCategories: 'Not stated',
  dataFormat: 'Not stated', license: 'Dataset terms not verified', availability: 'Announced',
  sourceReviewed: '2026-08-22', paperUrl: 'https://example.org/paper',
};

test('dataset search combines terms across fields and preserves an empty-query result', () => {
  assert.equal(matchesDatasetQuery(entry, '  digit MATERIAL 2026 '), true);
  assert.equal(matchesDatasetQuery(entry, 'digit robot-arm'), false);
  assert.equal(matchesDatasetQuery(entry, '  '), true);
});

test('CSV preserves quoted and multiline evidence while neutralizing spreadsheet formulas', () => {
  const csv = buildDatasetCsv([{ ...entry, institution: ['  =HYPERLINK("x")'] }], '/datasets');
  assert.ok(csv.startsWith('\uFEFF"id","name"'));
  assert.ok(csv.includes('"Touch, ""Vision""\nExample"'));
  assert.ok(csv.includes('"\'  =HYPERLINK(""x"")"'));
  assert.ok(csv.includes('"Dataset terms not verified","","Announced"'));
  assert.ok(csv.endsWith('"https://roboskin.ai/datasets#dataset-example"\r\n'));
});

test('export is limited to the provided selection and does not invent download URLs', () => {
  assert.ok(!buildDatasetCsv([], '/datasets').includes(entry.paperUrl));
  const csv = buildDatasetCsv([entry], '/robotics-datasets');
  assert.ok(csv.includes('https://roboskin.ai/robotics-datasets#dataset-example'));
  assert.ok(csv.includes('"https://example.org/paper","","","",'));
});

test('citation separates the directory editor from the original research', () => {
  const citation = buildDatasetCitation(entry, '/datasets');
  assert.ok(citation.includes('Source reviewed 2026-08-22'));
  assert.ok(citation.includes('#dataset-example'));
  assert.ok(citation.includes('Original research: https://example.org/paper'));
  assert.ok(citation.includes("dataset's own reuse terms"));
});
