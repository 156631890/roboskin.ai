import { graphNodes, isSubtype } from './schema-semantics.mjs';

// A site editorial policy, separate from Schema.org domain/range validity and
// Google's rich-result eligibility. These routes describe research subjects.
export function validateResearchSchema(blocks, pathname) {
  const path = pathname.replace(/\/$/, '');
  if (!['/robots', '/sensors', '/organizations'].includes(path) && !path.startsWith('/sensors/')) return [];
  const errors = [];
  for (const { node, location } of graphNodes(blocks)) {
    const types = Array.isArray(node['@type']) ? node['@type'] : [node['@type']].filter(Boolean);
    if (types.some((type) => ['Product', 'Offer', 'AggregateOffer', 'Review', 'AggregateRating'].some((base) => isSubtype(type, base)))) {
      errors.push(`${pathname}: research subject must not carry commercial/review type ${types.join('/')} at ${location}`);
    }
    for (const field of ['offers', 'review', 'aggregateRating', 'price', 'priceCurrency', 'ratingValue', 'reviewRating', 'manufacturer', 'category']) {
      if (Object.hasOwn(node, field)) errors.push(`${pathname}: unsupported research schema field ${field} at ${location}`);
    }
  }
  return errors;
}
