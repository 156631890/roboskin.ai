// Deliberate, reviewed update: download an official versioned JSON-LD release,
// then run: node scripts/update-schema-vocabulary.mjs /path/to/release.jsonld 30.1
// Commit the projection + SHA-256 and rerun semantic fixtures and the export audit.
import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
const [file, version] = process.argv.slice(2);
if (!file || !/^\d+\.\d+$/.test(version ?? '')) throw new Error('Expected official release JSON-LD path and version');
const raw = readFileSync(file);
const source = JSON.parse(raw);
const array = (v) => v == null ? [] : Array.isArray(v) ? v : [v];
const ids = (v) => array(v).map((x) => x['@id']).filter((x) => x?.startsWith('schema:')).map((x) => x.replace('schema:', ''));
const data = {
  version,
  source: `https://github.com/schemaorg/schemaorg/blob/main/data/releases/${version}/schemaorg-current-https.jsonld`,
  sourceSha256: createHash('sha256').update(raw).digest('hex'),
  license: 'https://creativecommons.org/licenses/by-sa/3.0/',
  classes: {}, properties: {}, enumerations: {},
};
for (const node of source['@graph']) {
  if (!node['@id']?.startsWith('schema:')) continue;
  const name = node['@id'].replace('schema:', '');
  const types = array(node['@type']);
  if (types.includes('rdfs:Class')) data.classes[name] = ids(node['rdfs:subClassOf']);
  else if (types.includes('rdf:Property')) data.properties[name] = { domains: ids(node['schema:domainIncludes']), ranges: ids(node['schema:rangeIncludes']), parents: ids(node['rdfs:subPropertyOf']) };
  else data.enumerations[name] = types.filter((type) => type.startsWith('schema:')).map((type) => type.replace('schema:', ''));
}
// One term per line keeps version diffs reviewable without shipping RDF descriptions.
const sections = ['classes', 'properties', 'enumerations'];
const lines = Object.entries(data).map(([key, value]) => sections.includes(key)
  ? `  "${key}": {\n${Object.entries(value).map(([term, rule]) => `    ${JSON.stringify(term)}: ${JSON.stringify(rule)}`).join(',\n')}\n  }`
  : `  "${key}": ${JSON.stringify(value)}`);
writeFileSync(new URL('../config/schemaorg-vocabulary.json', import.meta.url), `{\n${lines.join(',\n')}\n}\n`);
console.log(`Pinned Schema.org ${version}, source SHA-256 ${data.sourceSha256}`);
