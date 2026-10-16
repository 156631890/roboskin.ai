import assert from 'node:assert/strict';
import test from 'node:test';
import { vlaCatalog, vlaCatalogReviewed, selectVlaModels } from '../src/lib/vla-catalog.ts';

const all = { year: 'all', access: 'all', tactileOnly: false, query: '' };

test('the comparison and timeline share unique dated entries and traceable facts', () => {
  assert.ok(vlaCatalog.length >= 15);
  assert.equal(new Set(vlaCatalog.map((entry) => entry.id)).size, vlaCatalog.length);
  for (const id of ['rt-1', 'rt-2', 'palm-e', 'openvla', 'openvla-oft', 'octo', 'pi0', 'diffusion-policy', 'rdt', 'vla-touch', 'omnivtla', 'vtla', 'forcevla2']) {
    assert.ok(vlaCatalog.some((entry) => entry.id === id), `Missing requested model: ${id}`);
  }
  for (const entry of vlaCatalog) {
    assert.match(entry.date, /^\d{4}-\d{2}-\d{2}$/);
    assert.ok(Number.isFinite(Date.parse(entry.date)) && entry.date <= vlaCatalogReviewed);
    assert.match(entry.paper, /^https:\/\/arxiv\.org\/abs\/\d{4}\.\d{4,5}$/);
    for (const key of ['organization', 'parameters', 'modalities', 'availability', 'benchmark', 'dataset', 'description']) {
      assert.ok(entry[key].text.trim(), `${entry.id}: missing ${key}`);
      assert.equal(new URL(entry[key].source).protocol, 'https:', `${entry.id}: missing source for ${key}`);
    }
    for (const key of ['vision', 'language', 'tactile']) assert.equal(typeof entry[key], 'boolean');
    if (entry.access === 'open' || entry.access === 'partial') assert.ok(entry.code, `${entry.id}: claimed open code without a link`);
    if (entry.code) assert.equal(new URL(entry.code).hostname, 'github.com');
    if (entry.parameterBillions !== null) assert.ok(entry.parameterBillions > 0);
  }
});

test('tactile, year and access filters intersect and reset without changing source data', () => {
  const before = JSON.stringify(vlaCatalog);
  const touch = selectVlaModels(vlaCatalog, { ...all, tactileOnly: true }, 'date', 'asc');
  assert.ok(touch.some((entry) => entry.id === 'forcevla2'));
  assert.ok(touch.some((entry) => entry.id === 'vla-touch'));
  assert.ok(touch.every((entry) => entry.tactile));
  assert.ok(!touch.some((entry) => entry.id === 'rt-2'));
  const combined = selectVlaModels(vlaCatalog, { ...all, year: '2025', access: 'partial', tactileOnly: true }, 'name', 'asc');
  assert.deepEqual(combined.map((entry) => entry.id), ['vla-touch']);
  assert.equal(selectVlaModels(vlaCatalog, { ...all, year: '2022', tactileOnly: true }, 'date', 'asc').length, 0);
  assert.equal(selectVlaModels(vlaCatalog, { ...all, query: '  sTaNfOrD  ' }, 'name', 'asc').length, 3);
  assert.equal(selectVlaModels(vlaCatalog, all, 'date', 'desc').length, vlaCatalog.length);
  assert.equal(JSON.stringify(vlaCatalog), before);
});

test('sorts are stable, chronological and keep unknown parameter totals last in both directions', () => {
  for (const sort of ['name', 'organization', 'date', 'parameters']) {
    for (const direction of ['asc', 'desc']) {
      const rows = selectVlaModels(vlaCatalog, all, sort, direction);
      const known = sort === 'parameters' ? rows.filter((entry) => entry.parameterBillions !== null) : rows;
      for (let i = 1; i < known.length; i++) {
        const value = (entry) => sort === 'parameters' ? entry.parameterBillions : sort === 'organization' ? entry.organization.text : entry[sort];
        const a = value(known[i - 1]), b = value(known[i]);
        const order = typeof a === 'number' ? a - b : a.localeCompare(b, 'en');
        assert.ok(direction === 'asc' ? order <= 0 : order >= 0);
      }
      if (sort === 'parameters') assert.ok(rows.slice(known.length).every((entry) => entry.parameterBillions === null));
    }
  }
  const timeline = selectVlaModels(vlaCatalog, all, 'date', 'asc');
  assert.equal(timeline[0].id, 'rt-1');
  assert.equal(timeline.at(-1).id, 'spark-0');
});
