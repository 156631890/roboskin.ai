import assert from 'node:assert/strict';
import { getDatasetEvidence } from '../src/lib/dataset-evidence.mjs';
import test from 'node:test';
import { validateSchema, graphNodes, vocabulary, isSubtype } from '../scripts/lib/schema-semantics.mjs';
import { inspectPage, validatePages } from '../scripts/audit-on-page-seo.mjs';
import { createTypeScriptLoader } from '../scripts/lib/load-typescript.mjs';
const load = createTypeScriptLoader();
const seo = load('src/lib/seo.ts');
const topics = load('src/content/seo-topic-pages.ts').seoTopicPages;
const topicSchema = load('src/lib/seo-topic.ts');
const datasets = load('src/lib/tactile-datasets.ts').tactileDatasetEntries;
const generalDatasets = load('src/lib/robotics-datasets.ts').roboticsDatasetEntries;
const robots = load('src/lib/research-robots.ts').researchRobotEntries;
const sensors = load('src/lib/tactile-sensors.ts').tactileSensorEntries;
const manufacturers = load('src/lib/research-entity-relations.ts').researchManufacturingRelations;
const sensorManufacturers = Object.fromEntries(manufacturers.filter((r) => r.fromType === 'sensor').map((r) => [r.fromId, r.toId]));
const models = load('src/lib/robot-ai-models.ts').robotAiModelEntries;
const worlds = load('src/lib/robot-world-models.ts').robotWorldModelEvidenceEntries;
const graphs = [
  seo.buildOrganizationJsonLd(), seo.buildWebsiteJsonLd(), seo.buildEditorialLeadJsonLd(),
  ...seo.seoRoutes.flatMap((route) => [seo.buildPageJsonLd(route.path), seo.buildBreadcrumbJsonLd(route.path)]),
  ...topics.map(topicSchema.buildSeoTopicGraph),
  seo.buildPhysicalAiDefinedTermJsonLd(),
  seo.buildTactileDatasetsJsonLd(datasets), seo.buildRoboticsDatasetsJsonLd(generalDatasets),
  seo.buildTactileSensorsJsonLd(sensors, sensorManufacturers),
  load('src/lib/robot-ai-schema.ts').buildRobotAiModelDirectoryJsonLd(models),
  load('src/lib/robot-world-model-schema.ts').buildRobotWorldModelEvidenceJsonLd(worlds),
  load('src/lib/research-robot-schema.ts').buildResearchRobotDirectoryJsonLd(),
  load('src/lib/research-organization-schema.ts').buildResearchOrganizationDirectoryJsonLd(),
  ...load('src/lib/news-data.ts').newsPosts.flatMap((p) => [seo.buildNewsArticleJsonLd(p), seo.buildNewsArticlePageJsonLd(p), seo.buildNewsArticleBreadcrumbJsonLd(p)]),
  ...load('src/lib/blog-data.ts').blogPosts.flatMap((p) => [seo.buildArticleJsonLd(p), seo.buildResearchArticlePageJsonLd(p), seo.buildResearchArticleBreadcrumbJsonLd(p)]),
];
const generated = JSON.parse(JSON.stringify(graphs));
const nodes = graphNodes(generated).map(({ node }) => node);
const node = (id, type) => nodes.find((n) => n['@id'] === id && n['@type'] === type);

test('fixed official vocabulary supports inheritance and remains independently updatable', () => {
  assert.equal(vocabulary.version, '30.1');
  assert.match(vocabulary.sourceSha256, /^[a-f0-9]{64}$/);
  assert.equal(isSubtype('TechArticle', 'CreativeWork'), true);
  assert.equal(isSubtype('Dataset', 'CreativeWork'), true);
  assert.equal(isSubtype('Product', 'CreativeWork'), false);
  assert.equal(isSubtype('ItemList', 'CreativeWork'), false);
});
test('semantic gate rejects each original property/domain and referenced-value failure', () => {
  for (const [type, property, value] of [
    ['TechArticle', 'reviewedBy', { '@type': 'Organization', name: 'Editors' }],
    ['DefinedTerm', 'keywords', ['touch']], ['DefinedTerm', 'isPartOf', { '@type': 'WebSite' }],
    ['Dataset', 'additionalProperty', { '@type': 'PropertyValue', name: 'Institution', value: 'Lab' }],
    ['CreativeWork', 'additionalProperty', { '@type': 'PropertyValue', name: 'Trials', value: 20 }],
    ['Thing', 'manufacturer', { '@type': 'Organization' }], ['Thing', 'category', 'configuration'],
    ['Thing', 'citation', 'https://example.org/paper'], ['Thing', 'additionalProperty', { '@type': 'PropertyValue' }],
    ['Thing', 'isPartOf', { '@type': 'ItemList' }],
    ['CreativeWork', 'isPartOf', { '@type': 'ItemList' }],
    ['Product', 'manufacturer', { '@type': 'Dataset' }],
    ['Product', 'additionalProperty', { '@type': 'Organization' }],
    ['WebPage', 'reviewedBy', { '@type': 'Product' }],
  ]) assert.ok(validateSchema([{ '@type': type, [property]: value }]).errors.some((e) => e.property === property), `${type}.${property}`);
  assert.deepEqual(validateSchema([{ '@type': 'TechArticle', citation: 'https://example.org/paper' }]).errors, []);
});
test('all JSON-LD blocks in a document resolve @id ranges together, regardless of block order', () => {
  const article = { '@type': 'CreativeWork', '@id': 'https://example.org/#work', isPartOf: { '@id': 'https://example.org/#container' } };
  const bad = { '@type': 'ItemList', '@id': 'https://example.org/#container' };
  const good = { ...bad, '@type': 'WebPage' };
  assert.ok(validateSchema([article, bad]).errors.some((e) => e.rule === 'range'));
  assert.ok(validateSchema([bad, article]).errors.some((e) => e.rule === 'range'));
  assert.deepEqual(validateSchema([article, good]).errors, []);
  assert.equal(validateSchema([article]).unverified.length, 1);
  const document = `<html><head><title>Title</title><meta name="description" content="Description"><link rel="canonical" href="https://roboskin.ai/"></head><body><main><h1>Heading</h1><script type="application/ld+json">${JSON.stringify(article)}</script><script type="application/ld+json">${JSON.stringify(bad)}</script></main></body></html>`;
  const report = validatePages(new Map([['/', inspectPage(document, '/')]]), ['/']);
  assert.ok(report.schema.issues.some((e) => e.rule === 'range'));
});
test('real generated JSON-LD passes domain/range checks, including same-ID entities from multiple builders', () => {
  const result = validateSchema(generated);
  assert.deepEqual(result.errors, []);
  assert.deepEqual(result.unverified, []);
});
test('topic graphs retain review provenance, term definitions, keywords and page relationships', () => {
  for (const page of topics) {
    const id = `https://roboskin.ai${page.path}`;
    const web = node(`${id}#webpage`, 'WebPage');
    assert.ok(web.reviewedBy['@id']);
    assert.deepEqual(web.keywords, page.keywords);
    if (page.schemaType === 'TechArticle') {
      const article = node(`${id}#article`, 'TechArticle');
      assert.equal(article.reviewedBy, undefined);
      assert.equal(article.headline, page.h1);
      assert.deepEqual(article.citation, page.sources?.map((s) => s.href));
    }
    if (page.schemaType === 'DefinedTerm') {
      const term = node(`${id}#defined-term`, 'DefinedTerm');
      assert.ok(term.inDefinedTermSet);
      assert.equal(term.mainEntityOfPage['@id'], web['@id']);
      assert.equal(term.isPartOf, undefined); assert.equal(term.keywords, undefined);
    }
  }
});
test('dataset attribution preserves actual authors, source institutions, access, licenses and catalog membership', () => {
  for (const [entries, route] of [[datasets, '/datasets'], [generalDatasets, '/robotics-datasets']]) for (const entry of entries) {
    const data = node(`https://roboskin.ai${route}#dataset-${entry.id}`, 'Dataset');
    assert.equal(data.citation, entry.paperUrl);
    assert.deepEqual(data.creator?.map((c) => c.name), entry.authors?.length ? entry.authors : undefined);
    assert.deepEqual(data.subjectOf.mentions.map((o) => o.name), entry.institution);
    assert.equal(data.conditionsOfAccess, entry.availability);
    assert.deepEqual(data.measurementTechnique, entry.sensor);
    assert.deepEqual(data.variableMeasured, entry.modalities);
    assert.equal(data.license, getDatasetEvidence(entry).dataLicenseUrl);
    assert.equal(data.includedInDataCatalog['@id'], `https://roboskin.ai${route}#catalog`);
    assert.ok(nodes.some((n) => n['@type'] === 'ListItem' && n.item?.['@id'] === data['@id']));
  }
});
test('hardware and research configurations stay distinct with source-bounded manufacturer relationships', () => {
  for (const robot of robots) {
    const relation = manufacturers.find((r) => r.fromType === 'robot' && r.fromId === robot.id);
    const entity = node(`https://roboskin.ai/robots#robot-${robot.id}`, relation ? 'Product' : 'Thing');
    assert.ok(entity);
    assert.ok(entity.subjectOf.text.includes(robot.evidenceBoundary));
    assert.deepEqual(entity.subjectOf.citation, robot.identitySources.map((s) => s.url));
    assert.equal(entity.manufacturer?.['@id'], relation ? `https://roboskin.ai/organizations#organization-${relation.toId}` : undefined);
    assert.equal(entity.isPartOf, undefined);
  }
  for (const sensor of sensors) {
    const entity = node(`https://roboskin.ai/sensors#sensor-${sensor.id}`, sensorManufacturers[sensor.id] ? 'Product' : 'Thing');
    for (const value of [sensor.principle, sensor.formFactor, sensor.reportedRate, sensor.access, sensor.evidenceBoundary]) assert.ok(entity.subjectOf.text.includes(value));
    assert.ok(entity.subjectOf.citation.includes(sensor.sourceUrl));
  }
  for (const relation of manufacturers) {
    const entity = nodes.find((n) => n['@type'] === 'Product' && n.subjectOf?.name?.endsWith('manufacturer attribution') && n['@id'].endsWith(`#${relation.fromType}-${relation.fromId}`));
    assert.equal(entity.manufacturer['@id'], `https://roboskin.ai/organizations#organization-${relation.toId}`);
    assert.deepEqual(entity.subjectOf.citation, relation.evidenceUrls);
    assert.equal(entity.subjectOf.text, relation.evidenceBoundary);
  }
  for (const n of nodes) { assert.equal(n.offers, undefined); assert.equal(n.aggregateRating, undefined); }
});
test('model and world-model evidence keeps citations, limitations, resource access and list members', () => {
  for (const entry of [...models, ...worlds]) {
    const route = models.includes(entry) ? '/robot-foundation-models#model-' : '/robot-world-models#world-model-';
    const work = node(`https://roboskin.ai${route}${entry.id}`, 'CreativeWork');
    assert.deepEqual(work.citation, entry.primarySources.map((s) => s.url));
    assert.equal(work.abstract, entry.evidenceLimitations ?? entry.limitations);
    assert.equal(work.isPartOf, undefined);
    assert.ok(nodes.some((n) => n['@type'] === 'ListItem' && n.item?.['@id'] === work['@id']));
    if (worlds.includes(entry)) for (const value of Object.values(entry.artifacts)) assert.ok(work.hasPart.some((p) => p.text === value));
  }
});
