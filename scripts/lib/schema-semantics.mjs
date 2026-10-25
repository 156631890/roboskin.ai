import { readFileSync } from 'node:fs';
export const vocabulary = JSON.parse(readFileSync(new URL('../../config/schemaorg-vocabulary.json', import.meta.url), 'utf8'));
const array = (value) => value == null ? [] : Array.isArray(value) ? value : [value];
const term = (value) => value.replace(/^https?:\/\/schema.org\//, '').replace(/^schema:/, '');
export function isSubtype(type, expected, seen = new Set()) {
  type = term(type); expected = term(expected);
  if (type === expected) return true;
  if (seen.has(type)) return false;
  seen.add(type);
  return (vocabulary.classes[type] ?? []).some((parent) => isSubtype(parent, expected, seen));
}
export function graphNodes(blocks) {
  const nodes = [];
  function visit(value, location) {
    if (Array.isArray(value)) { value.forEach((v, i) => visit(v, `${location}[${i}]`)); return; }
    if (!value || typeof value !== 'object') return;
    nodes.push({ node: value, location });
    for (const [key, child] of Object.entries(value)) if (!key.startsWith('@') || key === '@graph') visit(child, `${location}.${key}`);
  }
  visit(blocks, '$');
  return nodes;
}
export function entityTypes(blocks) {
  const types = new Map();
  for (const { node } of graphNodes(blocks)) {
    if (!node['@id']) continue;
    const merged = types.get(node['@id']) ?? new Set();
    for (const type of array(node['@type'])) merged.add(term(type));
    types.set(node['@id'], merged);
  }
  return types;
}
function propertyRule(name, seen = new Set()) {
  if (seen.has(name)) return { domains: [], ranges: [] };
  seen.add(name);
  const rule = vocabulary.properties[name];
  if (!rule) return undefined;
  const parents = rule.parents.map((parent) => propertyRule(parent, seen)).filter(Boolean);
  return {
    domains: [...new Set([...rule.domains, ...parents.flatMap((p) => p.domains)])],
    ranges: [...new Set([...rule.ranges, ...parents.flatMap((p) => p.ranges)])],
  };
}
// This checks the site's Schema.org profile, not Google rich-result eligibility.
// Schema.org permits plain text/URLs as fallback values. Typed entities are checked
// against the declared range; an unresolved @id is reported as unverified, never passed.
export function validateSchema(blocks, pathname = '/', externalTypes = new Map()) {
  const local = entityTypes(blocks);
  const errors = [], unverified = [];
  const typesFor = (node) => [...new Set([...array(node['@type']).map(term), ...((local.get(node['@id'])?.size ? local.get(node['@id']) : externalTypes.get(node['@id'])) ?? [])])];
  const matches = (types, expected) => types.some((type) => expected.some((range) => isSubtype(type, range)));
  function rangeOK(value, ranges, property) {
    if (value && typeof value === 'object') {
      if ('@value' in value) return rangeOK(value['@value'], ranges, property);
      const types = typesFor(value);
      if (!types.length && value['@id']) { unverified.push({ path: pathname, property, id: value['@id'], reason: 'referenced entity type unavailable' }); return true; }
      return matches(types, ranges);
    }
    if (typeof value === 'boolean') return ranges.includes('Boolean');
    if (typeof value === 'number') return ranges.some((r) => ['Number', 'Float', 'Integer'].includes(r))
      // Schema.org MediaObject dimensions accept numeric pixels in JSON-LD.
      || (['width', 'height'].includes(property) && ranges.includes('QuantitativeValue'));
    if (typeof value !== 'string') return false;
    const enumeration = vocabulary.enumerations[term(value)];
    if (/^https?:\/\/schema.org\//.test(value) && enumeration?.length) return matches(enumeration, ranges);
    return true; // Schema.org's documented Text/URL fallback, not an invented type.
  }
  for (const { node, location } of graphNodes(blocks)) {
    const types = typesFor(node);
    for (const type of array(node['@type']).map(term)) if (!Object.hasOwn(vocabulary.classes, type)) errors.push({ path: pathname, location, rule: 'unknown-type', types, property: '@type', reason: `Unknown Schema.org ${vocabulary.version} type ${type}` });
    for (const [property, values] of Object.entries(node)) {
      if (property.startsWith('@')) continue;
      const rule = propertyRule(term(property));
      const problem = (kind, reason) => errors.push({ path: pathname, location, id: node['@id'], types, property, rule: kind, reason });
      if (!rule) { problem('unknown-property', `Unknown Schema.org ${vocabulary.version} property`); continue; }
      if (!types.length) { problem('untyped-node', 'Property on an entity with no resolvable type'); continue; }
      if (!matches(types, rule.domains)) { problem('domain', `${property} is not applicable to ${types.join('/')}; expected ${rule.domains.join('/')}`); continue; }
      if (array(values).some((value) => !rangeOK(value, rule.ranges, property))) problem('range', `${property} expects ${rule.ranges.join('/')}`);
    }
  }
  return { errors, unverified };
}
