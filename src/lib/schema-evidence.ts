// Editorial evidence is a CreativeWork about an entity, not a commercial claim.
export function buildEvidenceNote(id: string, name: string, text: string, citations: string[], suffix = 'evidence') {
  return {
    '@type': 'CreativeWork',
    '@id': `${id}-${suffix}`,
    name,
    text,
    about: { '@id': id },
    citation: [...new Set(citations)],
  };
}
