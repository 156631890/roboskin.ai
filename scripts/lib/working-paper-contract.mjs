import domino from '@mixmark-io/domino';

const paperPath = '/papers/interaction-as-the-interface';
const releasePrefix = '/publications/interaction-as-the-interface/v0.2/';

// Inspect rendered content, excluding Next.js hydration data from evidence labels.
export function inspectWorkingPaper(html, jsonLd, pathname) {
  const errors = [];
  const downloads = [];
  if (pathname !== '/papers' && pathname !== paperPath) return { errors, downloads };

  const document = domino.createDocument(html);
  const main = document.querySelector('main') ?? document.body;
  for (const node of Array.from(main.querySelectorAll('script, style'))) node.parentNode.removeChild(node);
  const text = main.textContent.replace(/\s+/g, ' ').trim();
  for (const label of ['Research proposal', 'Version 0.2', 'Not peer reviewed']) {
    if (!text.toLowerCase().includes(label.toLowerCase())) errors.push(`missing visible evidence label: ${label}`);
  }

  const nodes = jsonLd.flatMap((node) => node['@graph'] ?? [node]);
  const page = nodes.find((node) => node['@id'] === `https://roboskin.ai${pathname}#webpage`);
  if (page?.['@type'] !== 'WebPage') errors.push('working paper must use its canonical WebPage node');
  if (nodes.some((node) => [node['@type']].flat().some((type) => ['Article', 'TechArticle', 'NewsArticle', 'ScholarlyArticle'].includes(type)))) {
    errors.push('working paper must not inherit an Article publication schema');
  }
  for (const property of ['author', 'datePublished', 'reviewedBy', 'identifier']) {
    if (page && Object.hasOwn(page, property)) errors.push(`working paper WebPage must not claim ${property}`);
  }
  if (document.querySelector('meta[name="citation_doi"], meta[name="citation_author"], meta[name="citation_journal_title"]')) {
    errors.push('working paper must not invent scholarly publication metadata');
  }

  const links = Array.from(main.querySelectorAll('a[href]')).map((node) => node.getAttribute('href'));
  if (pathname === '/papers') {
    if (!links.includes(paperPath)) errors.push('working paper listing is missing the manuscript link');
  } else {
    downloads.push(...new Set(links.filter((href) => href.startsWith(releasePrefix))));
    for (const suffix of ['.pdf', '.tex', '.zip', '/README.md', '/manifest.json']) {
      if (!downloads.some((href) => href.endsWith(suffix))) errors.push(`missing versioned download: ${suffix}`);
    }
    if (!/synthetic/i.test(text)) errors.push('working paper is missing its synthetic-evidence boundary');
  }
  return { errors, downloads };
}
