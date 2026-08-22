import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const read = async (path) => (await readFile(new URL(path, root), 'utf8')).replaceAll('\r\n', '\n');

const newOrganizationSources = new Map([
  ['gelsight', 'https://www.gelsight.com/'],
  ['xela-robotics', 'https://xelarobotics.com/about/'],
  ['syntouch', 'https://www.sec.gov/Archives/edgar/data/1728560/000172856019000002/FormC1.pdf'],
  ['1x', 'https://www.1x.tech/about'],
  ['apptronik', 'https://apptronik.com/company/leadership'],
  ['fourier-intelligence', 'https://www.fftai.com/'],
  ['franka-robotics', 'https://franka.de/company'],
  ['trossen-robotics', 'https://www.trossenrobotics.com/about'],
  ['unitree-robotics', 'https://www.unitree.com/about/'],
  ['universal-robots', 'https://www.universal-robots.com/about-us/'],
  ['new-york-university', 'https://www.nyu.edu/about.html'],
  ['columbia-university', 'https://www.columbia.edu/content/about-columbia-university'],
  ['max-planck-institute-for-intelligent-systems', 'https://is.mpg.de/en/pages/about'],
  ['ben-gurion-university-of-the-negev', 'https://www.bgu.ac.il/en/u/vps/pa-rd/about-bgu/'],
  ['shanghai-qi-zhi-institute', 'https://www.sqz.ac.cn/en/introduction'],
]);

const expectedManufacturingPairs = [
  ['sensor', 'gelsight-mini', 'gelsight'],
  ['sensor', 'biotac', 'syntouch'],
  ['sensor', 'uskin', 'xela-robotics'],
  ['robot', 'apptronik-apollo-2', 'apptronik'],
  ['robot', 'unitree-g1', 'unitree-robotics'],
  ['robot', 'fourier-gr-1', 'fourier-intelligence'],
  ['robot', '1x-humanoid-family', '1x'],
  ['robot', 'franka-emika-panda', 'franka-robotics'],
  ['robot', 'universal-robots-ur5e', 'universal-robots'],
  ['robot', 'universal-robots-ur5', 'universal-robots'],
  ['robot', 'trossen-viperx-family', 'trossen-robotics'],
  ['robot', 'trossen-widowx-250-6dof', 'trossen-robotics'],
];

const expectedNewAffiliations = [
  ['anyskin', 'new-york-university'],
  ['anyskin', 'columbia-university'],
  ['insight', 'max-planck-institute-for-intelligent-systems'],
  ['allsight', 'ben-gurion-university-of-the-negev'],
  ['9dtact', 'shanghai-qi-zhi-institute'],
];

function organizationBlock(source, id) {
  const marker = `    id: '${id}',`;
  const markerIndex = source.indexOf(marker);
  assert.notEqual(markerIndex, -1, `missing organization ${id}`);
  const start = source.lastIndexOf('  {\n', markerIndex);
  const next = source.indexOf('\n  {\n    id:', markerIndex + marker.length);
  return source.slice(start, next === -1 ? source.indexOf('\n];', markerIndex) : next);
}

function declaredArray(source, declaration, followingDeclaration) {
  const start = source.indexOf(declaration);
  assert.notEqual(start, -1, `missing declaration ${declaration}`);
  const end = source.indexOf(followingDeclaration, start + declaration.length);
  assert.notEqual(end, -1, `missing declaration boundary ${followingDeclaration}`);
  return source.slice(start, end);
}

function manufacturingRecords(source) {
  const inventory = declaredArray(
    source,
    'export const researchManufacturingRelations:',
    'export const researchOrganizationPartOfRelations:',
  );
  return [...inventory.matchAll(
    /relation: 'manufacturedBy',\n\s+fromType: '(sensor|robot)',\n\s+fromId: '([^']+)',\n\s+toType: 'organization',\n\s+toId: '([^']+)'/g,
  )].map((match) => [match[1], match[2], match[3]]);
}

test('the fifteen normalized organizations have primary identity evidence and a semantic connection', async () => {
  const [organizations, relations, contractSource] = await Promise.all([
    read('src/lib/research-organizations.ts'),
    read('src/lib/research-entity-relations.ts'),
    read('config/knowledge-graph-contract.json'),
  ]);
  const contract = JSON.parse(contractSource);
  const manufacturingTargets = new Set(manufacturingRecords(relations).map((record) => record[2]));
  const affiliationTargets = new Set(
    [...relations.matchAll(/organizationId: '([^']+)'/g)].map((match) => match[1]),
  );

  assert.equal(newOrganizationSources.size, 15);
  assert.equal(contract.counts.organizations, 57);
  assert.equal(contract.counts.knowledgeEntities, 170);

  for (const [id, requiredIdentityUrl] of newOrganizationSources) {
    const block = organizationBlock(organizations, id);
    assert.match(block, /identitySources: \[\n\s+\{ label: '[^']+', url: 'https:\/\//);
    assert.ok(
      block.includes(`url: '${requiredIdentityUrl}'`),
      `${id} must retain its reviewed primary identity source`,
    );
    assert.match(block, /evidenceBoundary: '[^']{40,}'/);
    assert.ok(
      manufacturingTargets.has(id) || affiliationTargets.has(id),
      `${id} must have at least one non-supportedBy research relation`,
    );
  }
});

test('manufacturedBy is an exact twelve-edge sensor-or-robot to organization inventory', async () => {
  const [relations, contractSource] = await Promise.all([
    read('src/lib/research-entity-relations.ts'),
    read('config/knowledge-graph-contract.json'),
  ]);
  const contract = JSON.parse(contractSource);
  const records = manufacturingRecords(relations);

  assert.deepEqual(records, expectedManufacturingPairs);
  assert.equal(records.length, 12);
  assert.equal(contract.counts.manufacturedByEdges, 12);
  assert.match(
    relations,
    /relation: 'manufacturedBy',\n\s+fromTypes: \['sensor', 'robot'\],\n\s+toTypes: \['organization'\]/,
  );
  assert.match(
    relations,
    /export type ManufacturedByRelation[\s\S]*?fromType: 'sensor' \| 'robot';[\s\S]*?toType: 'organization';/,
  );
});

test('the five new source affiliations remain exact, primary-source bounded links', async () => {
  const [relations, contractSource] = await Promise.all([
    read('src/lib/research-entity-relations.ts'),
    read('config/knowledge-graph-contract.json'),
  ]);
  const contract = JSON.parse(contractSource);
  const targetIds = new Set(expectedNewAffiliations.map(([, organizationId]) => organizationId));
  const actualTargets = [...relations.matchAll(/organizationId: '([^']+)'/g)]
    .map((match) => match[1])
    .filter((organizationId) => targetIds.has(organizationId));

  assert.equal(actualTargets.length, 5);
  assert.equal(contract.counts.sourceAffiliationEdges, 60);
  for (const [sensorId, organizationId] of expectedNewAffiliations) {
    assert.match(
      relations,
      new RegExp(`fromType: 'sensor',\\n\\s+fromId: '${sensorId}',[\\s\\S]*?organizationId: '${organizationId}'`),
    );
  }
  assert.match(relations, /fromId: 'anyskin',[\s\S]*?https:\/\/arxiv\.org\/abs\/2409\.08276/);
  assert.match(relations, /fromId: 'insight',[\s\S]*?https:\/\/www\.nature\.com\/articles\/s42256-021-00439-3/);
  assert.match(relations, /fromId: 'allsight',[\s\S]*?https:\/\/arxiv\.org\/abs\/2307\.02928/);
  assert.match(relations, /fromId: '9dtact',[\s\S]*?https:\/\/arxiv\.org\/abs\/2308\.14277/);
});

test('BioTac evidence no longer uses the retired syntouchllc.com domain', async () => {
  const [sensors, relations] = await Promise.all([
    read('src/lib/tactile-sensors.ts'),
    read('src/lib/research-entity-relations.ts'),
  ]);
  const biotacStart = sensors.indexOf("    id: 'biotac',");
  const biotacEnd = sensors.indexOf("\n  {\n    id: 'uskin',", biotacStart);
  const biotac = sensors.slice(biotacStart, biotacEnd);
  const manufacturing = declaredArray(
    relations,
    'export const researchManufacturingRelations:',
    'export const researchOrganizationPartOfRelations:',
  );
  const biotacRelationStart = manufacturing.indexOf("    fromId: 'biotac',");
  const biotacRelationEnd = manufacturing.indexOf("\n  },", biotacRelationStart);
  const biotacRelation = manufacturing.slice(biotacRelationStart, biotacRelationEnd);

  assert.notEqual(biotacStart, -1);
  assert.notEqual(biotacRelationStart, -1);
  assert.doesNotMatch(biotac, /https?:\/\/(?:www\.)?syntouchllc\.com/i);
  assert.doesNotMatch(biotacRelation, /https?:\/\/(?:www\.)?syntouchllc\.com/i);
  assert.match(biotac, /manufacturerEvidenceUrl: 'https:\/\/www\.sec\.gov\/Archives\/edgar\/data\/1728560\//);
  assert.match(biotacRelation, /evidenceUrls: \['https:\/\/www\.sec\.gov\/Archives\/edgar\/data\/1728560\//);
});

test('manufacturer JSON-LD resolves to the same canonical organization anchors used by the directory', async () => {
  const [organizationSchema, robotSchema, sensorSeo, sensorPage] = await Promise.all([
    read('src/lib/research-organization-schema.ts'),
    read('src/lib/research-robot-schema.ts'),
    read('src/lib/seo.ts'),
    read('src/app/sensors/page.tsx'),
  ]);

  assert.match(
    organizationSchema,
    /return `\$\{canonicalUrl\('\/organizations'\)\}#organization-\$\{organization\.id\}`;/,
  );
  assert.match(organizationSchema, /manufacturer: organizationReference\(relation\.toId\)/);
  assert.match(
    robotSchema,
    /manufacturer:[\s\S]*?'@id': `\$\{canonicalUrl\('\/organizations'\)\}#organization-\$\{manufacturerRelation\.toId\}`/,
  );
  assert.match(
    sensorSeo,
    /manufacturer:[\s\S]*?'@id': `\$\{canonicalUrl\('\/organizations'\)\}#organization-\$\{manufacturerOrganizationIds\[entry\.id\]\}`/,
  );
  assert.match(sensorPage, /researchManufacturingRelations[\s\S]*?\[relation\.fromId, relation\.toId\]/);
  assert.match(sensorPage, /`\/organizations#organization-\$\{organizationId\}`/);
  assert.match(sensorPage, /buildTactileSensorsJsonLd\(tactileSensorEntries, manufacturerOrganizationIds\)/);
});
