import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');

test('the tactile data transparency audit is derived from the structured directory', async () => {
  const [audit, datasets, page, csvRoute, jsonRoute, seo, sitemap, llms] = await Promise.all([
    read('src/lib/tactile-data-transparency-audit.ts'),
    read('src/lib/tactile-datasets.ts'),
    read('src/app/reports/tactile-robotics-data-transparency-audit-2026/page.tsx'),
    read('src/app/reports/tactile-robotics-data-transparency-audit-2026.csv/route.ts'),
    read('src/app/reports/tactile-robotics-data-transparency-audit-2026.json/route.ts'),
    read('src/lib/seo.ts'),
    read('src/app/sitemap.ts'),
    read('src/lib/llms-full.ts'),
  ]);

  const datasetCount = (datasets.match(/\n  \{\n    id: '/g) ?? []).length;
  assert.ok(datasetCount >= 19);
  assert.match(audit, /tactileDatasetEntries\.map/);
  assert.match(audit, /samplingRatePattern/);
  assert.match(audit, /synchronizationPattern/);
  assert.match(audit, /dataSplitPattern/);
  assert.match(audit, /recordsWithDatasetUrl: count\('hasDatasetUrl'\)/);
  assert.match(audit, /recordsWithLicenseUrl: count\('hasLicenseUrl'\)/);
  assert.match(audit, /serializeTactileDataAuditCsv/);
  assert.doesNotMatch(audit, /totalRecords:\s*19/);

  assert.match(page, /'@type': 'TechArticle'/);
  assert.match(page, /'@type': 'Dataset'/);
  assert.match(page, /DataDownload/);
  assert.match(page, /Every yes and no is inspectable/);
  assert.match(page, /What this audit cannot establish/);
  assert.match(page, /tactileDataAuditRows\.map/);
  assert.match(csvRoute, /serializeTactileDataAuditCsv/);
  assert.match(csvRoute, /text\/csv/);
  assert.match(jsonRoute, /tactileDataAuditRows/);
  assert.match(jsonRoute, /application\/json/);

  assert.match(seo, /'\/reports\/tactile-robotics-data-transparency-audit-2026': \{/);
  assert.match(seo, /title: 'Tactile Robotics Dataset Transparency Audit 2026'/);
  assert.match(sitemap, /seoRoutes[\s\S]*?filter\(\(route\) => route\.index\)/);
  assert.match(llms, /## Original Data Transparency Audit/);
  assert.match(llms, /tactileDataAuditSummary\.recordsWithDatasetUrl/);
});

test('four evidence databases publish their inclusion and limitation methods', async () => {
  const [component, datasets, benchmarks, sensors, models] = await Promise.all([
    read('src/components/EvidenceDatabaseMethod.tsx'),
    read('src/app/datasets/page.tsx'),
    read('src/app/benchmarks/page.tsx'),
    read('src/app/sensors/page.tsx'),
    read('src/app/robot-foundation-models/page.tsx'),
  ]);

  assert.match(component, /Inclusion rule/);
  assert.match(component, /Editorial normalization/);
  assert.match(component, /Excluded claims/);
  assert.match(component, /Known limitations/);
  for (const route of [datasets, benchmarks, sensors, models]) {
    assert.match(route, /EvidenceDatabaseMethod/);
    assert.match(route, /sourceReviewed > latest/);
    assert.match(route, /inclusion=\{/);
    assert.match(route, /limitations=\{/);
  }
  assert.match(datasets, /Open transparency audit/);
  assert.match(datasets, /tactile-robotics-data-transparency-audit-2026\.csv/);
});
