import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';

const canonicalOrigin = 'https://roboskin.ai';
const base = new URL(process.argv[2] ?? canonicalOrigin);
const reportFile = new URL('../.artifacts/production-verification.json', import.meta.url);
const expectedCommitSha = process.env.EXPECTED_COMMIT_SHA
  ?? execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();

await rm(reportFile, { force: true });

const protectedUrls = JSON.parse(
  await readFile(new URL('../config/protected-urls.json', import.meta.url), 'utf8'),
);
const noindexUrls = JSON.parse(
  await readFile(new URL('../config/noindex-urls.json', import.meta.url), 'utf8'),
);
const protectedRedirects = JSON.parse(
  await readFile(new URL('../config/protected-redirects.json', import.meta.url), 'utf8'),
);
const knowledgeGraphContract = JSON.parse(
  await readFile(new URL('../config/knowledge-graph-contract.json', import.meta.url), 'utf8'),
);
const expectedIndexNowKey = (await readFile(new URL('../public/indexnow-key.txt', import.meta.url), 'utf8')).trim();

function canonicalFor(pathname) {
  return pathname === '/' ? canonicalOrigin : new URL(pathname, canonicalOrigin).href;
}

function canonicalFromHtml(html) {
  return html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i)?.[1]
    ?? html.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i)?.[1];
}

function parseJsonLd(html, pathname) {
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  if (blocks.length === 0) throw new Error(`${pathname} is missing JSON-LD`);
  return blocks.map((match, index) => {
    try {
      return JSON.parse(match[1]);
    } catch (error) {
      throw new Error(`${pathname} JSON-LD block ${index + 1} is invalid: ${error.message}`);
    }
  });
}

function parseCsv(csv) {
  const rows = csv.trim().split(/\r?\n/);
  const parseRow = (row) => {
    const cells = [];
    let cell = '';
    let quoted = false;

    for (let index = 0; index < row.length; index += 1) {
      const character = row[index];
      if (character === '"' && quoted && row[index + 1] === '"') {
        cell += '"';
        index += 1;
      } else if (character === '"') {
        quoted = !quoted;
      } else if (character === ',' && !quoted) {
        cells.push(cell);
        cell = '';
      } else {
        cell += character;
      }
    }
    cells.push(cell);
    return cells;
  };

  const columns = parseRow(rows[0]);
  return rows.slice(1).map((row) => {
    const cells = parseRow(row);
    return Object.fromEntries(columns.map((column, index) => [column, cells[index]]));
  });
}

function validateHtml(html, pathname, expectedPath = pathname, indexable = true) {
  const canonical = canonicalFromHtml(html);
  if (canonical !== canonicalFor(expectedPath)) throw new Error(`${pathname} canonical is ${canonical ?? 'missing'}`);
  if ((html.match(/<h1\b/gi) ?? []).length !== 1) throw new Error(`${pathname} does not contain exactly one H1`);
  if ((html.match(/<title>/gi) ?? []).length !== 1) throw new Error(`${pathname} does not contain exactly one title`);
  const robotsPattern = indexable
    ? /<meta name="robots" content="index, follow"/i
    : /<meta name="robots" content="noindex, follow"/i;
  if (!robotsPattern.test(html)) throw new Error(`${pathname} has invalid robots metadata`);
  const jsonLd = parseJsonLd(html, pathname);
  if (/www\.roboskin\.ai|https:\/\/[^"'<]*\.vercel\.app/i.test(`${canonical}${JSON.stringify(jsonLd)}`)) {
    throw new Error(`${pathname} leaks a non-apex host in canonical or JSON-LD`);
  }
  if (/^\/(research|news)\//.test(pathname)) {
    if (!html.includes('RoboSkin.ai Editorial Team')) throw new Error(`${pathname} is missing the visible editorial author`);
    if (!html.includes('Published ') && !html.includes('Updated ')) throw new Error(`${pathname} is missing a visible published or updated date`);
  }
  return jsonLd;
}

async function fetchOk(pathname) {
  const url = new URL(pathname, base);
  const response = await fetch(url, {
    headers: { 'user-agent': 'RoboSkin deployment verifier/1.0' },
    signal: AbortSignal.timeout(15_000),
  });

  if (new URL(response.url).origin !== base.origin) {
    throw new Error(`${url.href} redirected outside the verified deployment to ${response.url}`);
  }
  if (!response.ok) throw new Error(`${url.href} returned ${response.status}`);
  return response;
}

const sitemapResponse = await fetchOk('/sitemap.xml');
if (!(sitemapResponse.headers.get('content-type') ?? '').includes('xml')) throw new Error('/sitemap.xml has an invalid content type');
const sitemapXml = await sitemapResponse.text();
const sitemapLocs = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim());
const sitemapUrls = new Set(sitemapLocs);
const expectedSitemapUrls = new Set([
  ...protectedUrls.filter((url) => !protectedRedirects[new URL(url).pathname]),
  canonicalFor('/research-index'),
]);
const unexpectedSitemapUrls = sitemapLocs.filter((url) => !expectedSitemapUrls.has(url));
const missingSitemapUrls = [...expectedSitemapUrls].filter((url) => !sitemapUrls.has(url));
const invalidSitemapUrls = sitemapLocs.filter((url) => new URL(url).origin !== canonicalOrigin);
if (sitemapLocs.length !== sitemapUrls.size) throw new Error('Production sitemap contains duplicate loc entries');
if (unexpectedSitemapUrls.length) throw new Error(`Production sitemap contains unexpected URLs: ${unexpectedSitemapUrls.join(', ')}`);
if (missingSitemapUrls.length) throw new Error(`Production sitemap is missing URLs: ${missingSitemapUrls.join(', ')}`);
if (invalidSitemapUrls.length) throw new Error(`Production sitemap contains non-apex URLs: ${invalidSitemapUrls.join(', ')}`);

for (const absoluteUrl of protectedUrls) {
  const pathname = new URL(absoluteUrl).pathname;
  const redirectTarget = protectedRedirects[pathname];
  const response = await fetchOk(pathname);
  const contentType = response.headers.get('content-type') ?? '';
  if (!contentType.includes('text/html')) throw new Error(`${pathname} did not return HTML`);
  validateHtml(await response.text(), pathname, redirectTarget ?? pathname);
}

const [indexResponse, csvResponse, jsonResponse, graphResponse, llmsResponse, llmsFullResponse, organizationsResponse, robotsResponse, rssResponse, newsSitemapResponse, deploymentResponse, keyResponse] = await Promise.all([
  fetchOk('/research-index'),
  fetchOk('/research-index.csv'),
  fetchOk('/research-index.json'),
  fetchOk('/knowledge-graph.json'),
  fetchOk('/llms.txt'),
  fetchOk('/llms-full.txt'),
  fetchOk('/organizations'),
  fetchOk('/robots'),
  fetchOk('/feed.xml'),
  fetchOk('/news-sitemap.xml'),
  fetchOk('/deployment.json'),
  fetchOk('/indexnow-key.txt'),
]);
if (!(indexResponse.headers.get('content-type') ?? '').includes('text/html')) throw new Error('/research-index did not return HTML');
if (!(csvResponse.headers.get('content-type') ?? '').includes('text/csv')) throw new Error('/research-index.csv has an invalid content type');
if (!(jsonResponse.headers.get('content-type') ?? '').includes('application/json')) throw new Error('/research-index.json has an invalid content type');
if (!(graphResponse.headers.get('content-type') ?? '').includes('application/json')) throw new Error('/knowledge-graph.json has an invalid content type');
if (!(llmsResponse.headers.get('content-type') ?? '').includes('text/plain')) throw new Error('/llms.txt has an invalid content type');
if (!(llmsFullResponse.headers.get('content-type') ?? '').includes('text/plain')) throw new Error('/llms-full.txt has an invalid content type');
if (!(organizationsResponse.headers.get('content-type') ?? '').includes('text/html')) throw new Error('/organizations did not return HTML');
if (!(robotsResponse.headers.get('content-type') ?? '').includes('text/html')) throw new Error('/robots did not return HTML');
if (!(rssResponse.headers.get('content-type') ?? '').includes('application/rss+xml')) throw new Error('/feed.xml has an invalid content type');
if (!(newsSitemapResponse.headers.get('content-type') ?? '').includes('xml')) throw new Error('/news-sitemap.xml has an invalid content type');
if (!(deploymentResponse.headers.get('content-type') ?? '').includes('application/json')) throw new Error('/deployment.json has an invalid content type');

const [indexHtml, csv, indexData, graph, llms, llmsFull, organizationsHtml, robotsHtml, rss, newsSitemap, deployment, deployedIndexNowKey] = await Promise.all([
  indexResponse.text(),
  csvResponse.text(),
  jsonResponse.json(),
  graphResponse.json(),
  llmsResponse.text(),
  llmsFullResponse.text(),
  organizationsResponse.text(),
  robotsResponse.text(),
  rssResponse.text(),
  newsSitemapResponse.text(),
  deploymentResponse.json(),
  keyResponse.text(),
]);
if (deployedIndexNowKey.trim() !== expectedIndexNowKey) throw new Error('Deployed IndexNow key does not match the committed key');
const indexJsonLd = validateHtml(indexHtml, '/research-index');
if (!JSON.stringify(indexJsonLd).includes('"@type":"Dataset"') || !JSON.stringify(indexJsonLd).includes('"@type":"ItemList"')) {
  throw new Error('/research-index is missing Dataset or ItemList JSON-LD');
}
if (indexData.count !== indexData.entries?.length) throw new Error('Research index JSON count differs from its entries');

if (graph.version !== knowledgeGraphContract.version) throw new Error(`Knowledge graph version is ${graph.version ?? 'missing'}`);
for (const [name, expected] of Object.entries(knowledgeGraphContract.counts)) {
  if (graph.counts?.[name] !== expected) throw new Error(`Knowledge graph expected ${name}=${expected}`);
}
if (indexData.count !== graph.counts?.researchIndex || indexData.entries?.length !== graph.counts?.researchIndex) {
  throw new Error('Research index JSON count differs from the knowledge graph');
}
if (!Array.isArray(graph.entities) || !Array.isArray(graph.sources) || !Array.isArray(graph.edges)) {
  throw new Error('Knowledge graph entities, sources, and edges must be arrays');
}
const graphEntities = graph.entities;
const graphSources = graph.sources;
const graphEdges = graph.edges;
const graphEntityById = new Map(graphEntities.map((entry) => [entry.id, entry]));
const graphSourceIds = new Set(graphSources.map((entry) => entry.id));
const graphNodeIds = new Set([...graphEntityById.keys(), ...graphSourceIds]);
const graphEdgeKeys = new Set();
if (graphEntities.length !== graph.counts.knowledgeEntities || graphEntityById.size !== graphEntities.length) {
  throw new Error('Knowledge graph entity array length or ID uniqueness is inconsistent');
}
if (graphSources.length !== graph.counts.sourceDocuments || graphSourceIds.size !== graphSources.length) {
  throw new Error('Knowledge graph source array length or ID uniqueness is inconsistent');
}
if (graphEdges.length !== graph.counts.edges) throw new Error('Knowledge graph edge array length is inconsistent');
if (graphNodeIds.size !== graphEntities.length + graphSources.length) throw new Error('Knowledge graph entity and source IDs collide');

const graphSourceUrls = new Set();
for (const source of graphSources) {
  let sourceUrl;
  try {
    sourceUrl = new URL(source.url);
  } catch {
    throw new Error(`Knowledge graph source ${source.id ?? 'missing ID'} has an invalid URL`);
  }
  if (sourceUrl.protocol !== 'https:') throw new Error(`Knowledge graph source ${source.id} does not use HTTPS`);
  if (graphSourceUrls.has(sourceUrl.href)) throw new Error(`Knowledge graph repeats source URL ${source.url}`);
  graphSourceUrls.add(sourceUrl.href);
}

const organizationRelations = ['developedBy', 'coDevelopedBy', 'contributedBy'];
const robotRelations = ['evaluatedOn', 'trainedAcross', 'demonstratedOn'];
const researchRelations = ['sourceAffiliation', 'partOf', 'usesSensor', 'usesRobot'];
const evidenceBackedRelations = new Set([...organizationRelations, ...robotRelations, ...researchRelations]);
const sourceLabelRelations = new Set([...organizationRelations, ...researchRelations]);
const allowedGraphRelations = new Set(['supportedBy', 'benchmarkedBy', ...evidenceBackedRelations]);
const graphRelationCounts = new Map([...allowedGraphRelations].map((relation) => [relation, 0]));
for (const edge of graphEdges) {
  const edgeKey = `${edge.from}|${edge.relation}|${edge.to}`;
  if (graphEdgeKeys.has(edgeKey)) throw new Error(`Knowledge graph repeats edge ${edgeKey}`);
  graphEdgeKeys.add(edgeKey);
  if (!allowedGraphRelations.has(edge.relation)) throw new Error(`Knowledge graph edge has unsupported relation ${edge.relation}`);
  graphRelationCounts.set(edge.relation, graphRelationCounts.get(edge.relation) + 1);
  if (!graphNodeIds.has(edge.from) || !graphNodeIds.has(edge.to)) throw new Error(`Knowledge graph edge has a missing endpoint: ${edgeKey}`);
  const fromEntity = graphEntityById.get(edge.from);
  const toEntity = graphEntityById.get(edge.to);
  if (organizationRelations.includes(edge.relation)) {
    if (fromEntity?.type !== 'model' || toEntity?.type !== 'organization') throw new Error(`Invalid model-organization edge ${edgeKey}`);
  } else if (robotRelations.includes(edge.relation)) {
    if (fromEntity?.type !== 'model' || toEntity?.type !== 'robot') throw new Error(`Invalid model-robot edge ${edgeKey}`);
  } else if (edge.relation === 'sourceAffiliation') {
    if (!['paper', 'dataset', 'benchmark', 'sensor'].includes(fromEntity?.type) || toEntity?.type !== 'organization') throw new Error(`Invalid sourceAffiliation edge ${edgeKey}`);
  } else if (edge.relation === 'partOf') {
    if (fromEntity?.type !== 'organization' || toEntity?.type !== 'organization' || edge.from === edge.to) throw new Error(`Invalid partOf edge ${edgeKey}`);
  } else if (edge.relation === 'usesSensor') {
    if (fromEntity?.type !== 'dataset' || toEntity?.type !== 'sensor') throw new Error(`Invalid usesSensor edge ${edgeKey}`);
  } else if (edge.relation === 'usesRobot') {
    if (fromEntity?.type !== 'dataset' || toEntity?.type !== 'robot') throw new Error(`Invalid usesRobot edge ${edgeKey}`);
  }

  if (evidenceBackedRelations.has(edge.relation)) {
    if (!Array.isArray(edge.evidenceSourceIds) || edge.evidenceSourceIds.length === 0) throw new Error(`Evidence-backed edge lacks evidence: ${edgeKey}`);
    if (new Set(edge.evidenceSourceIds).size !== edge.evidenceSourceIds.length) throw new Error(`Evidence-backed edge repeats evidence: ${edgeKey}`);
    if (typeof edge.evidenceBoundary !== 'string' || edge.evidenceBoundary.trim().length === 0) throw new Error(`Evidence-backed edge lacks an evidence boundary: ${edgeKey}`);
    for (const sourceId of edge.evidenceSourceIds) {
      if (!graphSourceIds.has(sourceId)) throw new Error(`Knowledge graph edge references missing evidence ${sourceId}: ${edgeKey}`);
      if (!fromEntity?.primarySourceIds?.includes(sourceId)) throw new Error(`Relationship evidence is not attached to its source entity: ${edgeKey}`);
    }
  } else if (edge.evidenceSourceIds !== undefined || edge.evidenceBoundary !== undefined) {
    throw new Error(`Knowledge graph non-evidence-backed edge carries evidence qualifiers: ${edgeKey}`);
  }
  if (sourceLabelRelations.has(edge.relation)) {
    if (!Array.isArray(edge.sourceLabels) || edge.sourceLabels.length === 0
      || edge.sourceLabels.some((label) => typeof label !== 'string' || label.trim().length === 0)) throw new Error(`Evidence-backed edge lacks valid source labels: ${edgeKey}`);
  } else if (edge.sourceLabels !== undefined) {
    throw new Error(`Knowledge graph edge carries unsupported source labels: ${edgeKey}`);
  }
  if (robotRelations.includes(edge.relation)) {
    if (!Array.isArray(edge.sourceEmbodimentLabels) || edge.sourceEmbodimentLabels.length === 0
      || edge.sourceEmbodimentLabels.some((label) => typeof label !== 'string' || label.trim().length === 0)) throw new Error(`Model-robot edge lacks valid source embodiment labels: ${edgeKey}`);
  } else if (edge.sourceEmbodimentLabels !== undefined) {
    throw new Error(`Knowledge graph non-robot edge carries robot embodiment labels: ${edgeKey}`);
  }
}

const expectedRelationCounts = {
  supportedBy: graph.counts.supportedByEdges,
  benchmarkedBy: graph.counts.benchmarkedByEdges,
  developedBy: graph.counts.developedByEdges,
  coDevelopedBy: graph.counts.coDevelopedByEdges,
  contributedBy: graph.counts.contributedByEdges,
  evaluatedOn: graph.counts.evaluatedOnEdges,
  trainedAcross: graph.counts.trainedAcrossEdges,
  demonstratedOn: graph.counts.demonstratedOnEdges,
  sourceAffiliation: graph.counts.sourceAffiliationEdges,
  partOf: graph.counts.organizationHierarchyEdges,
  usesSensor: graph.counts.usesSensorEdges,
  usesRobot: graph.counts.usesRobotEdges,
};
for (const [relation, expected] of Object.entries(expectedRelationCounts)) {
  if (graphRelationCounts.get(relation) !== expected) throw new Error(`Knowledge graph edge count for ${relation} is inconsistent`);
}
const actualOrganizationRelationEdges = organizationRelations
  .reduce((total, relation) => total + graphRelationCounts.get(relation), 0);
if (actualOrganizationRelationEdges !== graph.counts.organizationRelationEdges) {
  throw new Error('Knowledge graph organization relation edge count is inconsistent');
}
const actualRobotRelationEdges = robotRelations
  .reduce((total, relation) => total + graphRelationCounts.get(relation), 0);
if (actualRobotRelationEdges !== graph.counts.robotRelationEdges) {
  throw new Error('Knowledge graph robot relation edge count is inconsistent');
}
const actualResearchProvenanceEdges = researchRelations
  .reduce((total, relation) => total + graphRelationCounts.get(relation), 0);
if (actualResearchProvenanceEdges !== graph.counts.researchProvenanceEdges) {
  throw new Error('Knowledge graph research provenance edge count is inconsistent');
}
const actualDatasetUsageEdges = graphRelationCounts.get('usesSensor') + graphRelationCounts.get('usesRobot');
if (actualDatasetUsageEdges !== graph.counts.datasetUsageEdges) {
  throw new Error('Knowledge graph dataset usage edge count is inconsistent');
}
const classifiedEdgeCount = graph.counts.supportedByEdges
  + graph.counts.benchmarkedByEdges
  + graph.counts.organizationRelationEdges
  + graph.counts.robotRelationEdges
  + graph.counts.researchProvenanceEdges;
if (classifiedEdgeCount !== graph.counts.edges) throw new Error('Knowledge graph edge class totals are inconsistent');

for (const entity of graphEntities) {
  if (!Array.isArray(entity.primarySourceIds) || entity.primarySourceIds.length === 0) {
    throw new Error(`Knowledge graph entity ${entity.id} has no primary sources`);
  }
  if (new Set(entity.primarySourceIds).size !== entity.primarySourceIds.length) {
    throw new Error(`Knowledge graph entity ${entity.id} repeats a primary source`);
  }
  for (const sourceId of entity.primarySourceIds) {
    if (!graphSourceIds.has(sourceId)) throw new Error(`Knowledge graph entity ${entity.id} references missing primary source ${sourceId}`);
    if (!graphEdgeKeys.has(`${entity.id}|supportedBy|${sourceId}`)) {
      throw new Error(`Knowledge graph entity ${entity.id} lacks a supportedBy edge for ${sourceId}`);
    }
  }
}

const organizationsJsonLd = validateHtml(organizationsHtml, '/organizations');
const organizationSchemaNodes = organizationsJsonLd.flatMap((block) => block['@graph'] ?? [block]);
const organizationDirectoryId = `${canonicalFor('/organizations')}#organization-directory`;
const organizationDirectories = organizationSchemaNodes.filter((node) => node['@id'] === organizationDirectoryId);
if (organizationDirectories.length !== 1) throw new Error('/organizations must contain exactly one organization ItemList JSON-LD node');
const [organizationDirectory] = organizationDirectories;
if (organizationDirectory?.['@type'] !== 'ItemList') throw new Error('/organizations is missing the exact organization ItemList JSON-LD node');
if (!Array.isArray(organizationDirectory.itemListElement) || organizationDirectory.numberOfItems !== graph.counts.organizations || organizationDirectory.itemListElement.length !== graph.counts.organizations) {
  throw new Error('/organizations ItemList count is inconsistent');
}
const graphOrganizations = graphEntities.filter((entry) => entry.type === 'organization');
if (graphOrganizations.length !== graph.counts.organizations) throw new Error('Knowledge graph organization entity count is inconsistent');
const expectedOrganizationSchemaIds = new Set(graphOrganizations.map((organization) => organization.canonicalUrl));
if (expectedOrganizationSchemaIds.size !== graph.counts.organizations) throw new Error('Knowledge graph organization canonical IDs are not unique');
const listedOrganizationSchemaIds = organizationDirectory.itemListElement.map((entry) => entry.item?.['@id']);
if (listedOrganizationSchemaIds.some((id) => !id) || new Set(listedOrganizationSchemaIds).size !== graph.counts.organizations) {
  throw new Error('/organizations ItemList contains missing or duplicate organization IDs');
}
const actualOrganizationSchemaIds = organizationSchemaNodes
  .filter((node) => {
    const types = Array.isArray(node['@type']) ? node['@type'] : [node['@type']];
    return typeof node['@id'] === 'string'
      && node['@id'].startsWith(`${canonicalFor('/organizations')}#organization-`)
      && types.some((type) => ['Organization', 'CollegeOrUniversity'].includes(type));
  })
  .map((node) => node['@id']);
if (actualOrganizationSchemaIds.length !== graph.counts.organizations || new Set(actualOrganizationSchemaIds).size !== graph.counts.organizations) {
  throw new Error('/organizations does not contain exactly one schema node per graph organization');
}
for (const organizationId of expectedOrganizationSchemaIds) {
  if (!listedOrganizationSchemaIds.includes(organizationId) || !actualOrganizationSchemaIds.includes(organizationId)) {
    throw new Error(`/organizations JSON-LD is missing ${organizationId}`);
  }
}
for (const organization of graphOrganizations) {
  const fragment = new URL(organization.canonicalUrl).hash.slice(1);
  if (!fragment || !organizationsHtml.includes(`id="${fragment}"`)) throw new Error(`/organizations is missing ${organization.id}`);
}
const robotsJsonLd = validateHtml(robotsHtml, '/robots');
const robotSchemaNodes = robotsJsonLd.flatMap((block) => block['@graph'] ?? [block]);
const robotDirectoryId = `${canonicalFor('/robots')}#robot-directory`;
const robotDirectories = robotSchemaNodes.filter((node) => node['@id'] === robotDirectoryId);
if (robotDirectories.length !== 1) throw new Error('/robots must contain exactly one robot ItemList JSON-LD node');
const [robotDirectory] = robotDirectories;
if (robotDirectory?.['@type'] !== 'ItemList') throw new Error('/robots is missing the exact robot ItemList JSON-LD node');
if (!Array.isArray(robotDirectory.itemListElement) || robotDirectory.numberOfItems !== graph.counts.robots || robotDirectory.itemListElement.length !== graph.counts.robots) {
  throw new Error('/robots ItemList count is inconsistent');
}
const graphRobots = graphEntities.filter((entry) => entry.type === 'robot');
if (graphRobots.length !== graph.counts.robots) throw new Error('Knowledge graph robot entity count is inconsistent');
const expectedRobotSchemaIds = new Set(graphRobots.map((robot) => robot.canonicalUrl));
const listedRobotSchemaIds = robotDirectory.itemListElement.map((entry) => entry.item?.['@id']);
if (listedRobotSchemaIds.some((id) => !id) || new Set(listedRobotSchemaIds).size !== graph.counts.robots) {
  throw new Error('/robots ItemList contains missing or duplicate robot IDs');
}
const actualRobotSchemaIds = robotSchemaNodes
  .filter((node) => node['@type'] === 'Thing'
    && typeof node['@id'] === 'string'
    && node['@id'].startsWith(`${canonicalFor('/robots')}#robot-`))
  .map((node) => node['@id']);
if (actualRobotSchemaIds.length !== graph.counts.robots || new Set(actualRobotSchemaIds).size !== graph.counts.robots) {
  throw new Error('/robots does not contain exactly one schema node per graph robot');
}
for (const robotId of expectedRobotSchemaIds) {
  if (!listedRobotSchemaIds.includes(robotId) || !actualRobotSchemaIds.includes(robotId)) {
    throw new Error(`/robots JSON-LD is missing ${robotId}`);
  }
}
for (const robot of graphRobots) {
  const fragment = new URL(robot.canonicalUrl).hash.slice(1);
  if (!fragment || !robotsHtml.includes(`id="${fragment}"`)) throw new Error(`/robots is missing ${robot.id}`);
}
if (!llms.includes(`${graph.counts.knowledgeEntities} source-reviewed knowledge entities`) || !llms.includes(`${graph.counts.sourceDocuments} deduplicated primary and official source records`) || !llms.includes(canonicalFor('/organizations')) || !llms.includes(canonicalFor('/robots'))) throw new Error('/llms.txt does not match the deployed knowledge graph');
const llmsFullCountChecks = [
  ['Dataset records', graph.counts.datasets],
  ['Benchmark records', graph.counts.benchmarks],
  ['Sensor records', graph.counts.sensors],
  ['Robot AI model records', graph.counts.models],
  ['Verified organization records', graph.counts.organizations],
  ['Verified model-organization relations', graph.counts.organizationRelationEdges],
  ['Source-listed research affiliations', graph.counts.sourceAffiliationEdges],
  ['Verified organization hierarchy relations', graph.counts.organizationHierarchyEdges],
  ['Verified dataset sensor or robot relations', graph.counts.datasetUsageEdges],
  ['Verified robot-platform records', graph.counts.robots],
  ['Verified model-robot relations', graph.counts.robotRelationEdges],
  ['Structured research records', graph.counts.researchIndex],
];
if (llmsFullCountChecks.some(([label, count]) => !llmsFull.includes(`- ${label}: ${count}`)) || !llmsFull.includes(canonicalFor('/organizations')) || !llmsFull.includes(canonicalFor('/robots'))) throw new Error('/llms-full.txt is missing deployed entity knowledge');

const csvRows = parseCsv(csv);
const csvIds = csvRows.map((row) => row.id);
const jsonIds = indexData.entries.map((entry) => entry.id);
if (JSON.stringify(csvIds) !== JSON.stringify(jsonIds)) throw new Error('Research index CSV and JSON IDs differ');
for (const [index, entry] of indexData.entries.entries()) {
  for (const [column, value] of Object.entries(entry)) {
    const expected = Array.isArray(value) ? value.join('; ') : String(value);
    if (csvRows[index]?.[column] !== expected) throw new Error(`Research index CSV differs at ${entry.id}.${column}`);
  }
  const visibleValues = [entry.url, entry.title, entry.sensorPrinciple, entry.formFactor, entry.dataOutput, entry.evidence, entry.limitations, entry.reviewedAt, ...entry.modalities, ...entry.applications];
  if (visibleValues.some((value) => !indexHtml.includes(String(value)))) throw new Error(`Research index HTML is incomplete for ${entry.id}`);
}

const rssItems = [...rss.matchAll(/<item>/g)];
const rssLinks = [...rss.matchAll(/<link>([^<]+)<\/link>/g)].map((match) => match[1]);
const rssGuids = [...rss.matchAll(/<guid isPermaLink="true">([^<]+)<\/guid>/g)].map((match) => match[1]);
const invalidRssUrls = [...rssLinks, ...rssGuids].filter((url) => new URL(url).origin !== canonicalOrigin);
if (!rss.startsWith('<?xml version="1.0" encoding="UTF-8"?><rss version="2.0">') || !rss.endsWith('</rss>')) throw new Error('RSS has an invalid envelope');
if (rssItems.length !== 47 || rssLinks.length !== 48 || rssGuids.length !== 47) throw new Error('RSS does not contain 47 complete items');
if (invalidRssUrls.length || /www\.roboskin\.ai|\.vercel\.app/.test(rss)) throw new Error('RSS contains a non-apex URL');
if (!newsSitemap.startsWith('<?xml version="1.0" encoding="UTF-8"?><urlset')) throw new Error('News sitemap has an invalid envelope');
if (!newsSitemap.includes('xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"')) throw new Error('News sitemap is missing the Google News namespace');
if (/www\.roboskin\.ai|\.vercel\.app/.test(newsSitemap)) throw new Error('News sitemap contains a non-apex URL');

if (deployment.commitSha !== expectedCommitSha) {
  throw new Error(`Deployment commit ${deployment.commitSha ?? 'missing'} does not match expected ${expectedCommitSha}`);
}

if (base.origin === canonicalOrigin) {
  for (const pathname of ['/', '/research']) {
    const response = await fetch(new URL(pathname, 'https://www.roboskin.ai'), {
      redirect: 'manual',
      headers: { 'user-agent': 'RoboSkin deployment verifier/1.0' },
      signal: AbortSignal.timeout(15_000),
    });
    if (![301, 308].includes(response.status)) throw new Error(`www${pathname} returned ${response.status} instead of a permanent redirect`);
    const actualLocation = response.headers.get('location');
    if (actualLocation !== new URL(pathname, canonicalOrigin).href) throw new Error(`www${pathname} redirects to ${actualLocation ?? 'missing location'}`);
  }
}

for (const absoluteUrl of noindexUrls) {
  const pathname = new URL(absoluteUrl).pathname;
  const response = await fetchOk(pathname);
  const contentType = response.headers.get('content-type') ?? '';
  if (!contentType.includes('text/html')) throw new Error(`${pathname} did not return HTML`);
  validateHtml(await response.text(), pathname, pathname, false);
}

const verifiedPaths = [
  ...new Set([
    ...protectedUrls.map((url) => new URL(url).pathname),
    ...noindexUrls.map((url) => new URL(url).pathname),
    '/research-index',
    '/research-index.csv',
    '/research-index.json',
    '/knowledge-graph.json',
    '/llms.txt',
    '/llms-full.txt',
    '/feed.xml',
    '/news-sitemap.xml',
  ]),
];
const sitemapSha256 = createHash('sha256').update(sitemapXml).digest('hex');
const report = {
  ok: true,
  baseUrl: base.origin,
  verifiedAt: new Date().toISOString(),
  commitSha: deployment.commitSha,
  sitemapSha256,
  verifiedPaths,
  sitemapUrlCount: sitemapUrls.size,
  protectedUrlCount: protectedUrls.length,
  noindexUrlCount: noindexUrls.length,
  researchIndexCount: indexData.entries.length,
  knowledgeEntityCount: graph.counts.knowledgeEntities,
  organizationCount: graph.counts.organizations,
  organizationRelationCount: graph.counts.organizationRelationEdges,
  robotCount: graph.counts.robots,
  robotRelationCount: graph.counts.robotRelationEdges,
};

await mkdir(new URL('../.artifacts/', import.meta.url), { recursive: true });
await writeFile(reportFile, `${JSON.stringify(report, null, 2)}\n`, 'utf8');
console.log(`Verified ${base.origin} at ${deployment.commitSha}: ${sitemapUrls.size} sitemap URLs, ${protectedUrls.length} protected URL contract entries including ${Object.keys(protectedRedirects).length} redirect sources, ${noindexUrls.length} noindex URLs, ${graph.counts.knowledgeEntities} graph entities, ${graph.counts.organizations} organizations, ${graph.counts.robots} robot platforms, ${indexData.entries.length} research records, and ${rssItems.length} RSS items`);
