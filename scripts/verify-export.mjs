import { access, readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { parseNewsletterEndpoint } from '../src/lib/newsletter-config.mjs';

const canonicalOrigin = 'https://roboskin.ai';
const root = process.cwd();
const out = path.join(root, 'out');
const protectedUrls = JSON.parse(await readFile(path.join(root, 'config/protected-urls.json'), 'utf8'));
const noindexUrls = JSON.parse(await readFile(path.join(root, 'config/noindex-urls.json'), 'utf8'));
const redirects = JSON.parse(await readFile(path.join(root, 'config/protected-redirects.json'), 'utf8'));
const knowledgeGraphContract = JSON.parse(await readFile(path.join(root, 'config/knowledge-graph-contract.json'), 'utf8'));
let verifiedGraphEntityCount;
let verifiedResearchIndexCount;
let verifiedRssItemCount;

const exists = async (file) => access(file).then(() => true, () => false);
const candidatesFor = (pathname) => {
  if (pathname === '/') return [path.join(out, 'index.html')];
  const relative = pathname.replace(/^\//, '');
  return [path.join(out, `${relative}.html`), path.join(out, relative, 'index.html')];
};
const canonicalFor = (pathname) => pathname === '/'
  ? canonicalOrigin
  : new URL(pathname, canonicalOrigin).href;
const canonicalFromHtml = (html) => html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i)?.[1]
  ?? html.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i)?.[1];

async function listHtmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map((entry) => {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) return listHtmlFiles(absolute);
    return entry.isFile() && entry.name.endsWith('.html') ? [absolute] : [];
  }));
  return nested.flat();
}

function parseJsonLd(html, label, failures) {
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  if (blocks.length === 0) failures.push(`${label}: missing JSON-LD`);

  return blocks.flatMap((match, index) => {
    try {
      return [JSON.parse(match[1])];
    } catch (error) {
      failures.push(`${label}: JSON-LD block ${index + 1} is invalid (${error.message})`);
      return [];
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
  return rows.slice(1).map((row) => Object.fromEntries(columns.map((column, index) => [column, parseRow(row)[index]])));
}

const failures = [];
for (const absoluteUrl of protectedUrls) {
  const { pathname } = new URL(absoluteUrl);
  const candidates = candidatesFor(pathname);
  const outputFile = (await Promise.all(candidates.map(async (file) => [file, await exists(file)])))
    .find(([, present]) => present)?.[0];

  if (!outputFile) {
    if (!redirects[pathname]) failures.push(`${pathname}: missing export and redirect`);
    continue;
  }

  const html = await readFile(outputFile, 'utf8');
  const expectedPath = redirects[pathname] ?? pathname;
  const expectedCanonical = canonicalFor(expectedPath);
  const canonical = canonicalFromHtml(html);
  if (canonical !== expectedCanonical) failures.push(`${pathname}: expected canonical ${expectedCanonical}`);
  if ((html.match(/<h1\b/gi) ?? []).length !== 1) failures.push(`${pathname}: expected one H1`);
  if ((html.match(/<title>/gi) ?? []).length !== 1) failures.push(`${pathname}: expected one title`);
  if (!/<meta name="robots" content="index, follow"/i.test(html)) failures.push(`${pathname}: missing indexable robots metadata`);
  const jsonLd = parseJsonLd(html, pathname, failures);
  if (/www\.roboskin\.ai|https:\/\/[^"'<]*\.vercel\.app/i.test(`${canonical ?? ''}${JSON.stringify(jsonLd)}`)) {
    failures.push(`${pathname}: canonical or JSON-LD leaks a non-apex host`);
  }
}

for (const absoluteUrl of noindexUrls) {
  const { pathname } = new URL(absoluteUrl);
  const candidates = candidatesFor(pathname);
  const outputFile = (await Promise.all(candidates.map(async (file) => [file, await exists(file)])))
    .find(([, present]) => present)?.[0];

  if (!outputFile) {
    failures.push(`${pathname}: missing noindex export`);
    continue;
  }

  const html = await readFile(outputFile, 'utf8');
  if (canonicalFromHtml(html) !== canonicalFor(pathname)) failures.push(`${pathname}: invalid noindex canonical`);
  if ((html.match(/<h1\b/gi) ?? []).length !== 1) failures.push(`${pathname}: expected one H1`);
  if ((html.match(/<title>/gi) ?? []).length !== 1) failures.push(`${pathname}: expected one title`);
  if (!/<meta name="robots" content="noindex, follow"/i.test(html)) failures.push(`${pathname}: missing noindex, follow metadata`);
}

for (const file of ['sitemap.xml', 'news-sitemap.xml', 'research-index.csv', 'research-index.json', 'knowledge-graph.json', 'feed.xml', 'deployment.json', 'llms.txt', 'llms-full.txt']) {
  if (!(await exists(path.join(out, file)))) failures.push(`/${file}: missing generated output`);
}

if (failures.length === 0) {
  const newsletterEndpoint = parseNewsletterEndpoint(process.env.NEXT_PUBLIC_NEWSLETTER_ENDPOINT)?.endpoint ?? null;
  const htmlFiles = await listHtmlFiles(out);
  for (const file of htmlFiles) {
    const html = await readFile(file, 'utf8');
    const label = `/${path.relative(out, file).replaceAll('\\', '/')}`;
    const unavailable = html.match(/<section[^>]+class="[^"]*newsletter-form-unavailable[^"]*"[^>]*>[\s\S]*?<\/section>/i)?.[0];
    const providerForm = html.match(/<form[^>]+class="[^"]*newsletter-form[^"]*"[^>]*>[\s\S]*?<\/form>/i)?.[0];

    if (!newsletterEndpoint) {
      if (!unavailable) {
        failures.push(`${label}: missing closed Newsletter state`);
        continue;
      }
      if (providerForm) failures.push(`${label}: renders a Newsletter form without a valid HTTPS endpoint`);
      if (!unavailable.includes('Newsletter is not open yet') || !unavailable.includes('/feed.xml')) {
        failures.push(`${label}: closed Newsletter state is missing its status or RSS route`);
      }
      if (/<form\b|<input\b|\baction=|\bmethod=|Confirm by email|Unsubscribe at any time/i.test(unavailable)) {
        failures.push(`${label}: closed Newsletter state contains an email field, submit target, or confirmation promise`);
      }
    } else {
      if (!providerForm) {
        failures.push(`${label}: missing configured Newsletter provider form`);
        continue;
      }
      if (!/method="post"/i.test(providerForm) || !/type="email"/i.test(providerForm) || !/name="email"/i.test(providerForm) || !/name="embed" value="1"/i.test(providerForm)) {
        failures.push(`${label}: configured Newsletter form is missing its POST, email, or embed fields`);
      }
      if (!providerForm.includes(`action="${newsletterEndpoint}"`)) {
        failures.push(`${label}: configured Newsletter form does not use the validated HTTPS endpoint`);
      }
    }
  }

  const deployment = JSON.parse(await readFile(path.join(out, 'deployment.json'), 'utf8'));
  if (typeof deployment.commitSha !== 'string' || deployment.commitSha.length === 0) failures.push('/deployment.json: missing commit identity');
  const sitemapXml = await readFile(path.join(out, 'sitemap.xml'), 'utf8');
  const sitemapLocs = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim());
  const sitemapUrls = new Set(sitemapLocs);
  const expectedSitemapUrls = new Set([
    ...protectedUrls.filter((url) => !redirects[new URL(url).pathname]),
    canonicalFor('/research-index'),
  ]);
  const unexpectedSitemapUrls = sitemapLocs.filter((url) => !expectedSitemapUrls.has(url));
  const missingSitemapUrls = [...expectedSitemapUrls].filter((url) => !sitemapUrls.has(url));
  const invalidSitemapUrls = sitemapLocs.filter((url) => new URL(url).origin !== canonicalOrigin);
  if (sitemapLocs.length !== sitemapUrls.size) failures.push('/sitemap.xml: duplicate loc entries');
  if (unexpectedSitemapUrls.length) failures.push(`/sitemap.xml: unexpected URLs ${unexpectedSitemapUrls.join(', ')}`);
  if (missingSitemapUrls.length) failures.push(`/sitemap.xml: missing URLs ${missingSitemapUrls.join(', ')}`);
  if (invalidSitemapUrls.length) failures.push(`/sitemap.xml: non-apex URLs ${invalidSitemapUrls.join(', ')}`);
  if (sitemapUrls.has(canonicalFor('/knowledge-graph.json'))) failures.push('/sitemap.xml: knowledge graph JSON must not be listed as an HTML page');

  const indexData = JSON.parse(await readFile(path.join(out, 'research-index.json'), 'utf8'));
  const csv = await readFile(path.join(out, 'research-index.csv'), 'utf8');
  const csvRows = parseCsv(csv);
  const csvIds = csvRows.map((row) => row.id);
  const jsonIds = indexData.entries?.map((entry) => entry.id) ?? [];
  verifiedResearchIndexCount = jsonIds.length;
  if (indexData.count !== 23 || jsonIds.length !== 23) failures.push('/research-index.json: expected 23 records');
  if (JSON.stringify(csvIds) !== JSON.stringify(jsonIds)) failures.push('/research-index.csv: IDs differ from JSON');
  for (const [index, entry] of (indexData.entries ?? []).entries()) {
    for (const [column, value] of Object.entries(entry)) {
      const expected = Array.isArray(value) ? value.join('; ') : String(value);
      if (csvRows[index]?.[column] !== expected) failures.push(`/research-index.csv: ${entry.id}.${column} differs from JSON`);
    }
  }

  const graph = JSON.parse(await readFile(path.join(out, 'knowledge-graph.json'), 'utf8'));
  const graphEntityIds = graph.entities?.map((entry) => entry.id) ?? [];
  verifiedGraphEntityCount = graphEntityIds.length;
  const graphSourceIds = graph.sources?.map((entry) => entry.id) ?? [];
  const graphSourceUrls = graph.sources?.map((entry) => entry.url) ?? [];
  const graphNodeIds = new Set([...graphEntityIds, ...graphSourceIds]);
  const graphEntityById = new Map((graph.entities ?? []).map((entry) => [entry.id, entry]));
  const graphEdges = graph.edges ?? [];
  const graphEdgeKeys = new Set();
  const allowedGraphRelations = new Set(['supportedBy', 'benchmarkedBy', 'developedBy', 'coDevelopedBy', 'contributedBy']);
  if (graph.version !== knowledgeGraphContract.version) failures.push(`/knowledge-graph.json: expected graph version ${knowledgeGraphContract.version}`);
  for (const [name, expected] of Object.entries(knowledgeGraphContract.counts)) {
    if (graph.counts?.[name] !== expected) failures.push(`/knowledge-graph.json: expected ${name}=${expected}`);
  }
  if (graph.counts?.researchIndex !== graph.counts?.papers + graph.counts?.documentation) {
    failures.push('/knowledge-graph.json: research-index count must separate papers and documentation');
  }
  if (graphEntityIds.length !== graph.counts?.knowledgeEntities || graphEntityById.size !== graphEntityIds.length) {
    failures.push('/knowledge-graph.json: entity IDs or count are inconsistent');
  }
  if (graphSourceIds.length !== graph.counts?.sourceDocuments || new Set(graphSourceIds).size !== graphSourceIds.length) {
    failures.push('/knowledge-graph.json: source IDs or count are inconsistent');
  }
  if (new Set(graphSourceUrls).size !== graphSourceUrls.length) failures.push('/knowledge-graph.json: duplicate source URL');
  if (graphNodeIds.size !== graphEntityIds.length + graphSourceIds.length) failures.push('/knowledge-graph.json: global node IDs collide');
  for (const entity of graph.entities ?? []) {
    if (!entity.id.startsWith(`${entity.type}:`)) failures.push(`/knowledge-graph.json: invalid entity prefix ${entity.id}`);
    if (!/^20\d{2}-\d{2}-\d{2}$/.test(entity.reviewedAt)) failures.push(`/knowledge-graph.json: invalid review date for ${entity.id}`);
    if (!Array.isArray(entity.primarySourceIds) || entity.primarySourceIds.length === 0) failures.push(`/knowledge-graph.json: source-free entity ${entity.id}`);
    if (/research team listed|authors? listed|unknown|tbd|todo|lorem ipsum/i.test(entity.name)) failures.push(`/knowledge-graph.json: placeholder entity ${entity.id}`);
  }
  for (const source of graph.sources ?? []) {
    if (!source.id.startsWith('source:')) failures.push(`/knowledge-graph.json: invalid source prefix ${source.id}`);
    if (new URL(source.url).protocol !== 'https:') failures.push(`/knowledge-graph.json: non-HTTPS source ${source.id}`);
  }
  for (const edge of graphEdges) {
    const edgeKey = `${edge.from}|${edge.relation}|${edge.to}`;
    if (graphEdgeKeys.has(edgeKey)) failures.push(`/knowledge-graph.json: duplicate edge ${edgeKey}`);
    graphEdgeKeys.add(edgeKey);
    if (!allowedGraphRelations.has(edge.relation)) failures.push(`/knowledge-graph.json: unsupported relation ${edgeKey}`);
    if (!graphNodeIds.has(edge.from) || !graphNodeIds.has(edge.to)) failures.push(`/knowledge-graph.json: missing edge endpoint ${edgeKey}`);
    if (edge.relation === 'supportedBy' && !graphSourceIds.includes(edge.to)) failures.push(`/knowledge-graph.json: supportedBy must end at a source (${edgeKey})`);
    if (edge.relation === 'benchmarkedBy' && !edge.to.startsWith('benchmark:')) failures.push(`/knowledge-graph.json: benchmarkedBy must end at a benchmark (${edgeKey})`);
    if (['developedBy', 'coDevelopedBy', 'contributedBy'].includes(edge.relation)) {
      const fromEntity = graphEntityById.get(edge.from);
      const toEntity = graphEntityById.get(edge.to);
      if (fromEntity?.type !== 'model' || toEntity?.type !== 'organization') failures.push(`/knowledge-graph.json: invalid organization relation endpoints (${edgeKey})`);
      if (!Array.isArray(edge.evidenceSourceIds) || edge.evidenceSourceIds.length === 0) failures.push(`/knowledge-graph.json: organization relation lacks evidence (${edgeKey})`);
      if (new Set(edge.evidenceSourceIds ?? []).size !== (edge.evidenceSourceIds ?? []).length) failures.push(`/knowledge-graph.json: organization relation repeats evidence (${edgeKey})`);
      for (const sourceId of edge.evidenceSourceIds ?? []) {
        if (!graphSourceIds.includes(sourceId)) failures.push(`/knowledge-graph.json: organization relation references missing evidence (${edgeKey})`);
        if (!fromEntity?.primarySourceIds?.includes(sourceId)) failures.push(`/knowledge-graph.json: relationship evidence is not attached to its model (${edgeKey})`);
      }
    }
  }
  if (graphEdges.length !== graph.counts?.edges || graphEdgeKeys.size !== graphEdges.length) failures.push('/knowledge-graph.json: edge count is inconsistent');
  for (const [relation, countField] of [
    ['supportedBy', 'supportedByEdges'],
    ['benchmarkedBy', 'benchmarkedByEdges'],
    ['developedBy', 'developedByEdges'],
    ['coDevelopedBy', 'coDevelopedByEdges'],
    ['contributedBy', 'contributedByEdges'],
  ]) {
    if (graphEdges.filter((edge) => edge.relation === relation).length !== graph.counts?.[countField]) failures.push(`/knowledge-graph.json: ${countField} is inconsistent`);
  }
  if (graphEdges.filter((edge) => ['developedBy', 'coDevelopedBy', 'contributedBy'].includes(edge.relation)).length !== graph.counts?.organizationRelationEdges) failures.push('/knowledge-graph.json: organizationRelationEdges is inconsistent');
  for (const entity of graph.entities ?? []) {
    for (const sourceId of entity.primarySourceIds ?? []) {
      if (!graphEdgeKeys.has(`${entity.id}|supportedBy|${sourceId}`)) failures.push(`/knowledge-graph.json: missing supportedBy edge for ${entity.id}`);
    }
  }
  const organizationHtml = await readFile(path.join(out, 'organizations.html'), 'utf8');
  const organizationJsonLd = parseJsonLd(organizationHtml, '/organizations', failures);
  const organizationJsonLdNodes = organizationJsonLd.flatMap((block) => Array.isArray(block?.['@graph']) ? block['@graph'] : [block]);
  const organizationList = organizationJsonLdNodes.find((node) => node?.['@id'] === canonicalFor('/organizations#organization-directory'));
  const graphOrganizations = (graph.entities ?? []).filter((entity) => entity.type === 'organization');
  const expectedOrganizationIds = new Set(graphOrganizations.map((organization) => organization.canonicalUrl));
  const organizationSchemaNodes = organizationJsonLdNodes.filter((node) => {
    const types = Array.isArray(node?.['@type']) ? node['@type'] : [node?.['@type']];
    return expectedOrganizationIds.has(node?.['@id'])
      && types.some((type) => ['Organization', 'CollegeOrUniversity'].includes(type));
  });
  const listedOrganizationIds = Array.isArray(organizationList?.itemListElement)
    ? organizationList.itemListElement.map((entry) => entry.item?.['@id'])
    : [];
  if (organizationList?.['@type'] !== 'ItemList'
    || organizationList?.numberOfItems !== graph.counts?.organizations
    || listedOrganizationIds.length !== graph.counts?.organizations) {
    failures.push('/organizations: ItemList count or identity is invalid');
  }
  if (new Set(listedOrganizationIds).size !== expectedOrganizationIds.size
    || [...expectedOrganizationIds].some((id) => !listedOrganizationIds.includes(id))) {
    failures.push('/organizations: ItemList organization IDs differ from the graph');
  }
  if (organizationSchemaNodes.length !== graph.counts?.organizations
    || new Set(organizationSchemaNodes.map((node) => node['@id'])).size !== graph.counts?.organizations) {
    failures.push(`/organizations: expected ${graph.counts?.organizations} unique organization schema nodes`);
  }
  for (const organization of graphOrganizations) {
    const fragment = new URL(organization.canonicalUrl).hash.slice(1);
    if (!fragment || !organizationHtml.includes(`id="${fragment}"`)) failures.push(`/organizations: missing canonical anchor for ${organization.id}`);
    if (!organizationHtml.includes(organization.name) || !organizationHtml.includes(String(organization.attributes?.officialUrl))) failures.push(`/organizations: incomplete visible record for ${organization.id}`);
  }
  const llmsCurated = await readFile(path.join(out, 'llms.txt'), 'utf8');
  if (!llmsCurated.includes(canonicalFor('/knowledge-graph.json'))) failures.push('/llms.txt: missing knowledge graph discovery URL');
  if (!llmsCurated.includes(`${graph.counts?.knowledgeEntities} source-reviewed knowledge entities`)) failures.push('/llms.txt: knowledge-entity count differs from the graph');
  if (!llmsCurated.includes(`${graph.counts?.sourceDocuments} deduplicated primary and official source records`)) failures.push('/llms.txt: source-record count differs from the graph');

  const indexHtml = await readFile(path.join(out, 'research-index.html'), 'utf8');
  for (const entry of indexData.entries ?? []) {
    const visibleValues = [entry.url, entry.title, entry.sensorPrinciple, entry.formFactor, entry.dataOutput, entry.evidence, entry.limitations, entry.reviewedAt, ...entry.modalities, ...entry.applications];
    if (visibleValues.some((value) => !indexHtml.includes(String(value)))) {
      failures.push(`/research-index: visible fields are incomplete for ${entry.id}`);
    }
  }

  const rss = await readFile(path.join(out, 'feed.xml'), 'utf8');
  const rssItems = [...rss.matchAll(/<item>/g)];
  verifiedRssItemCount = rssItems.length;
  const rssLinks = [...rss.matchAll(/<link>([^<]+)<\/link>/g)].map((match) => match[1]);
  const rssGuids = [...rss.matchAll(/<guid isPermaLink="true">([^<]+)<\/guid>/g)].map((match) => match[1]);
  const invalidRssUrls = [...rssLinks, ...rssGuids].filter((url) => new URL(url).origin !== canonicalOrigin);
  if (!rss.startsWith('<?xml version="1.0" encoding="UTF-8"?><rss version="2.0">') || !rss.endsWith('</rss>')) failures.push('/feed.xml: invalid RSS envelope');
  if (rssItems.length !== 46 || rssLinks.length !== 47 || rssGuids.length !== 46) failures.push('/feed.xml: expected 46 complete items');
  if (invalidRssUrls.length || /www\.roboskin\.ai|\.vercel\.app/.test(rss)) failures.push('/feed.xml: non-apex URL found');

  const newsSitemap = await readFile(path.join(out, 'news-sitemap.xml'), 'utf8');
  if (!newsSitemap.startsWith('<?xml version="1.0" encoding="UTF-8"?><urlset')) failures.push('/news-sitemap.xml: invalid XML envelope');
  if (!newsSitemap.includes('xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"')) failures.push('/news-sitemap.xml: missing news namespace');
  if (/www\.roboskin\.ai|\.vercel\.app/.test(newsSitemap)) failures.push('/news-sitemap.xml: non-apex URL found');

  const llmsFull = await readFile(path.join(out, 'llms-full.txt'), 'utf8');
  const requiredLlmsRoutes = ['/ai-robotics', '/physical-ai', '/robot-skin', '/tactile-ai', '/physical-ai-touch', '/humanoid-robots', '/robot-learning', '/robot-vla-models', '/robot-foundation-models', '/organizations', '/robot-manipulation', '/robot-hands', '/robot-safety', '/robotics-datasets', '/robot-world-models', '/robot-teleoperation', '/datasets', '/benchmarks', '/sensors', '/research-index'];
  if (!llmsFull.startsWith('# RoboSkin.ai Full Knowledge')) failures.push('/llms-full.txt: invalid title');
  if (llmsFull.length < 20000) failures.push('/llms-full.txt: generated knowledge snapshot is unexpectedly small');
  if (requiredLlmsRoutes.some((route) => !llmsFull.includes(canonicalFor(route)))) failures.push('/llms-full.txt: missing canonical knowledge routes');
  if (!llmsFull.includes('- Dataset records: 12') || !llmsFull.includes('- Benchmark records: 9') || !llmsFull.includes('- Sensor records: 13') || !llmsFull.includes('- Robot AI model records: 10') || !llmsFull.includes('- Verified organization records: 12') || !llmsFull.includes('- Verified model-organization relations: 20')) {
    failures.push('/llms-full.txt: structured directory counts are incomplete');
  }
  if (!llmsFull.includes(canonicalFor('/knowledge-graph.json'))) failures.push('/llms-full.txt: missing knowledge graph discovery URL');
  if (/www\.roboskin\.ai|\.vercel\.app/.test(llmsFull)) failures.push('/llms-full.txt: non-apex URL found');
}

if (failures.length > 0) {
  throw new Error(`Export verification failed:\n${failures.join('\n')}`);
}

console.log(`Verified ${protectedUrls.length} indexable URLs, ${noindexUrls.length} noindex URLs, exact sitemap, ${verifiedGraphEntityCount} graph entities, full LLM knowledge, ${verifiedResearchIndexCount} research-index records, and ${verifiedRssItemCount} RSS items`);
