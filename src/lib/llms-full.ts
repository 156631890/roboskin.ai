import { glossaryTerms, site } from '@/content/site';
import { seoTopicPages } from '@/content/seo-topic-pages';
import { blogPosts } from '@/lib/blog-data';
import { newsPosts } from '@/lib/news-data';
import { researchIndexEntries, researchIndexUpdatedAt } from '@/lib/research-index';
import { tactileBenchmarkEntries } from '@/lib/tactile-benchmarks';
import { tactileDatasetEntries } from '@/lib/tactile-datasets';
import { tactileSensorEntries } from '@/lib/tactile-sensors';

const canonicalUrl = (pathname: string) => new URL(pathname, site.url).href;
const compact = (value: string) => value.replace(/\s+/g, ' ').trim();
const list = (values: string[]) => values.map(compact).join('; ');
const markdownLink = (label: string, href: string) => `[${compact(label)}](${href})`;

function appendOptionalLink(lines: string[], label: string, href?: string) {
  if (href) lines.push(`- ${label}: ${href}`);
}

function nestedMarkdown(content: string) {
  return content
    .trim()
    .replace(/^#\s+[^\n]+\n+/, '')
    .replace(/^(#{1,4})\s+/gm, (_, hashes: string) => `${'#'.repeat(Math.min(hashes.length + 2, 6))} `);
}

function latestReviewedDate() {
  return [
    researchIndexUpdatedAt,
    ...seoTopicPages.map((page) => page.updated),
    ...blogPosts.flatMap((post) => [post.date, post.updated]),
    ...newsPosts.flatMap((post) => [post.date, post.updated]),
    ...tactileDatasetEntries.map((entry) => entry.sourceReviewed),
    ...tactileBenchmarkEntries.map((entry) => entry.sourceReviewed),
    ...tactileSensorEntries.map((entry) => entry.sourceReviewed),
  ].sort().at(-1) ?? researchIndexUpdatedAt;
}

export function buildLlmsFullText() {
  const lines: string[] = [
    '# RoboSkin.ai Full Knowledge',
    '',
    `> ${site.description}`,
    '',
    'This file is the expanded, machine-readable knowledge snapshot for RoboSkin.ai. It is generated from the same structured content used by the public website. Canonical web pages remain the controlling versions and should be cited when making factual claims.',
    '',
    '## File Metadata',
    '',
    `- Canonical site: ${site.url}`,
    `- Site descriptor: ${site.tagline}`,
    `- Editorial publisher: ${site.editorial.name}`,
    `- Latest included content review: ${latestReviewedDate()}`,
    `- Topic pages: ${seoTopicPages.length}`,
    `- Glossary terms: ${glossaryTerms.length}`,
    `- Dataset records: ${tactileDatasetEntries.length}`,
    `- Benchmark records: ${tactileBenchmarkEntries.length}`,
    `- Sensor records: ${tactileSensorEntries.length}`,
    `- Structured research records: ${researchIndexEntries.length}`,
    `- Research briefs: ${blogPosts.length}`,
    `- News briefs: ${newsPosts.length}`,
    '',
    '## Interpretation and Citation Rules',
    '',
    '- RoboSkin.ai is an independent research and intelligence platform, not a robot-skin manufacturer and not the owner of the external papers, datasets, sensors, or projects it reviews.',
    '- Preserve evidence boundaries. A paper-reported result is not automatically a cross-sensor benchmark, a commercial product specification, or proof of deployment readiness.',
    '- Prefer the primary source URL attached to each technical record. Use the RoboSkin.ai canonical page for the site’s analysis, taxonomy, and comparison context.',
    '- Do not infer product availability, certifications, customers, benchmark values, or company claims unless the relevant public page states them explicitly.',
    '- No blanket content-reuse license is granted by this file. Verify the original source license and the RoboSkin.ai site terms before reuse.',
    `- Suggested attribution for site analysis: ${site.editorial.name}, “Page title,” RoboSkin.ai, canonical page URL, accessed on the reader’s actual access date.`,
    '',
    '## Core Semantic Map',
    '',
    'Robot Skin → Tactile Sensing → Tactile AI → Robot Manipulation → Physical AI',
    '',
    'RoboSkin.ai covers the complete tactile-intelligence stack: contact surfaces and sensor physics, signal handling and synchronization, tactile representations and multimodal models, closed-loop robot action, datasets, benchmarks, laboratories, and deployment evidence.',
    '',
    '## Machine-Readable and Discovery Endpoints',
    '',
    `- Curated LLM guide: ${canonicalUrl('/llms.txt')}`,
    `- Full LLM knowledge file: ${canonicalUrl('/llms-full.txt')}`,
    `- Research index JSON: ${canonicalUrl('/research-index.json')}`,
    `- Research index CSV: ${canonicalUrl('/research-index.csv')}`,
    `- Research and news RSS: ${canonicalUrl('/feed.xml')}`,
    `- XML sitemap: ${canonicalUrl('/sitemap.xml')}`,
    '',
    '## Canonical Topic Pages',
    '',
  ];

  for (const page of seoTopicPages) {
    lines.push(
      `### ${page.title}`,
      '',
      `- Canonical URL: ${canonicalUrl(page.path)}`,
      `- Updated: ${page.updated}`,
      `- Search intent: ${compact(page.intent)}`,
      `- Keywords: ${list(page.keywords)}`,
      '',
      compact(page.description),
      '',
      '#### Direct answer',
      '',
      ...page.quickAnswer.map((answer) => `- ${compact(answer)}`),
      '',
    );

    for (const section of page.sections) {
      lines.push(`#### ${section.heading}`, '', ...section.body.map(compact), '');
      if (section.bullets?.length) lines.push(...section.bullets.map((item) => `- ${compact(item)}`), '');
      if (section.table) {
        lines.push(
          `| ${section.table.headers.map(compact).join(' | ')} |`,
          `| ${section.table.headers.map(() => '---').join(' | ')} |`,
          ...section.table.rows.map((row) => `| ${row.map((cell) => compact(cell).replaceAll('|', '\\|')).join(' | ')} |`),
          '',
        );
      }
    }

    if (page.faqs.length) {
      lines.push('#### Questions and answers', '');
      for (const faq of page.faqs) lines.push(`- **${compact(faq.question)}** ${compact(faq.answer)}`);
      lines.push('');
    }

    if (page.sources?.length) {
      lines.push('#### Primary and official sources', '', ...page.sources.map((source) => `- ${markdownLink(source.label, source.href)}`), '');
    }

    if (page.relatedLinks.length) {
      lines.push(
        '#### Related RoboSkin.ai pages',
        '',
        ...page.relatedLinks.map((link) => `- ${markdownLink(link.label, canonicalUrl(link.href))}: ${compact(link.description)}`),
        '',
      );
    }
  }

  lines.push('## Glossary', '');
  for (const term of glossaryTerms) {
    lines.push(
      `### ${term.term}`,
      '',
      compact(term.definition),
      '',
      `- Canonical route: ${canonicalUrl(term.href)}`,
      `- Related concepts: ${list(term.related)}`,
      '',
    );
  }

  lines.push('## Tactile Robotics Datasets', '', `Directory: ${canonicalUrl('/datasets')}`, '');
  for (const entry of tactileDatasetEntries) {
    lines.push(
      `### ${entry.name}`,
      '',
      `- Record ID: ${entry.id}`,
      `- Institution: ${list(entry.institution)}`,
      `- Release year: ${entry.year}`,
      `- Robot or embodiment: ${list(entry.robot)}`,
      `- Sensor: ${list(entry.sensor)}`,
      `- Modalities: ${list(entry.modalities)}`,
      `- Reported scale: ${compact(entry.sampleCount)}`,
      `- Tasks: ${list(entry.tasks)}`,
      `- Object categories: ${compact(entry.objectCategories)}`,
      `- Data format: ${compact(entry.dataFormat)}`,
      `- License evidence: ${compact(entry.license)}`,
      `- Availability: ${compact(entry.availability)}`,
      `- Paper: ${entry.paperUrl}`,
    );
    appendOptionalLink(lines, 'License URL', entry.licenseUrl);
    appendOptionalLink(lines, 'Project URL', entry.projectUrl);
    appendOptionalLink(lines, 'GitHub URL', entry.githubUrl);
    appendOptionalLink(lines, 'Dataset URL', entry.datasetUrl);
    lines.push(`- Source reviewed: ${entry.sourceReviewed}`, '');
  }

  lines.push('## Tactile Robotics Benchmarks', '', `Directory: ${canonicalUrl('/benchmarks')}`, '');
  for (const entry of tactileBenchmarkEntries) {
    lines.push(
      `### ${entry.name}`,
      '',
      `- Record ID: ${entry.id}`,
      `- Release year: ${entry.year}`,
      `- Benchmark type: ${compact(entry.benchmarkType)}`,
      `- Institutions: ${list(entry.institutions)}`,
      `- Tasks: ${list(entry.tasks)}`,
      `- Modalities: ${list(entry.modalities)}`,
      `- Sensors: ${list(entry.sensors)}`,
      `- Robots or embodiments: ${list(entry.robots)}`,
      `- Metrics: ${list(entry.metrics)}`,
      `- Protocol: ${compact(entry.protocol)}`,
      `- Access: ${compact(entry.access)}`,
      `- Evidence limitation: ${compact(entry.limitation)}`,
      `- Paper: ${entry.paperUrl}`,
    );
    appendOptionalLink(lines, 'Project URL', entry.projectUrl);
    appendOptionalLink(lines, 'Code URL', entry.codeUrl);
    lines.push(`- Source reviewed: ${entry.sourceReviewed}`, '');
  }

  lines.push('## Tactile Sensors', '', `Directory: ${canonicalUrl('/sensors')}`, '');
  for (const entry of tactileSensorEntries) {
    lines.push(
      `### ${entry.name}`,
      '',
      `- Record ID: ${entry.id}`,
      `- Organization: ${compact(entry.organization)}`,
      `- Sensing principle: ${compact(entry.principle)}`,
      `- Form factor: ${compact(entry.formFactor)}`,
      `- Signals: ${list(entry.signals)}`,
      `- Reported rate: ${compact(entry.reportedRate)}`,
      `- Integration: ${compact(entry.integration)}`,
      `- Access: ${compact(entry.access)}`,
      `- Evidence boundary: ${compact(entry.evidenceBoundary)}`,
      `- Primary source: ${entry.sourceUrl}`,
    );
    appendOptionalLink(lines, 'Project URL', entry.projectUrl);
    appendOptionalLink(lines, 'Code URL', entry.codeUrl);
    lines.push(`- Source reviewed: ${entry.sourceReviewed}`, '');
  }

  lines.push('## Structured Research Index', '', `Directory: ${canonicalUrl('/research-index')}`, `Index reviewed: ${researchIndexUpdatedAt}`, '');
  for (const entry of researchIndexEntries) {
    lines.push(
      `### ${entry.title}`,
      '',
      `- Record ID: ${entry.id}`,
      `- RoboSkin.ai analysis: ${entry.url}`,
      `- Year: ${entry.year}`,
      `- Publisher or venue: ${compact(entry.publisher)}`,
      `- Primary source title: ${compact(entry.sourceTitle)}`,
      `- Primary source URL: ${entry.sourceUrl}`,
      `- Sensor principle: ${compact(entry.sensorPrinciple)}`,
      `- Modalities: ${list(entry.modalities)}`,
      `- Form factor: ${compact(entry.formFactor)}`,
      `- Data output: ${compact(entry.dataOutput)}`,
      `- Applications: ${list(entry.applications)}`,
      `- Evidence level: ${entry.evidence}`,
      `- Limitations: ${compact(entry.limitations)}`,
      `- Reviewed: ${entry.reviewedAt}`,
      '',
    );
  }

  lines.push('## Research Briefs', '', `Index: ${canonicalUrl('/research')}`, '');
  for (const post of blogPosts) {
    lines.push(
      `### ${post.title}`,
      '',
      `- Canonical URL: ${canonicalUrl(`/research/${post.id}`)}`,
      `- Published: ${post.date}`,
      `- Updated: ${post.updated}`,
      `- Author: ${compact(post.author)}`,
      `- Category: ${compact(post.category)}`,
      `- Technical focus: ${list(post.technicalFocus)}`,
      `- Primary source: ${markdownLink(post.sourceTitle, post.sourceUrl)}`,
      '',
      nestedMarkdown(post.content),
      '',
    );
  }

  lines.push('## Research News Briefs', '', `Index: ${canonicalUrl('/news')}`, '');
  for (const post of newsPosts) {
    lines.push(
      `### ${post.title}`,
      '',
      `- Canonical URL: ${canonicalUrl(`/news/${post.id}`)}`,
      `- Published: ${post.date}`,
      `- Updated: ${post.updated}`,
      `- Author: ${compact(post.author)}`,
      `- Category: ${compact(post.category)}`,
      `- Technical focus: ${list(post.technicalFocus)}`,
      `- Primary source: ${markdownLink(post.sourceTitle, post.sourceUrl)}`,
    );
    if (post.sources.length > 1) {
      lines.push('- Additional sources:', ...post.sources.slice(1).map((source) => `  - ${markdownLink(source.title, source.url)}`));
    }
    lines.push('', nestedMarkdown(post.content), '');
  }

  lines.push(
    '## End Note',
    '',
    `For corrections, source suggestions, and research collaboration, use ${canonicalUrl('/contact')}. Cite the canonical page and its attached primary sources rather than treating this aggregate file as a substitute for source verification.`,
    '',
  );

  return lines.join('\n');
}
