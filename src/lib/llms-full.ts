import { glossaryTerms, site } from '@/content/site';
import { seoTopicPages } from '@/content/seo-topic-pages';
import { blogPosts } from '@/lib/blog-data';
import { newsPosts } from '@/lib/news-data';
import { researchIndexEntries, researchIndexUpdatedAt } from '@/lib/research-index';
import {
  researchDatasetUsageRelations,
  researchEntityRelations,
  researchEntityRelationVocabulary,
  researchOrganizationPartOfRelations,
  researchPaperSensorRelations,
  researchProvenanceRelations,
  researchSemanticRelations,
  researchSourceAffiliationRelations,
  type ResearchEntityRelation,
} from '@/lib/research-entity-relations';
import { robotAiModelEntries } from '@/lib/robot-ai-models';
import { researchOrganizationEntries, robotAiOrganizationRelations } from '@/lib/research-organizations';
import { researchRobotEntries, robotAiRobotRelations } from '@/lib/research-robots';
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
    ...robotAiModelEntries.map((entry) => entry.sourceReviewed),
    ...researchOrganizationEntries.map((entry) => entry.sourceReviewed),
    ...robotAiOrganizationRelations.map((entry) => entry.sourceReviewed),
    ...researchEntityRelations.map((entry) => entry.sourceReviewed),
    ...researchRobotEntries.map((entry) => entry.sourceReviewed),
    ...robotAiRobotRelations.map((entry) => entry.sourceReviewed),
  ].sort().at(-1) ?? researchIndexUpdatedAt;
}

function researchRelationEntity(
  type: ResearchEntityRelation['fromType'] | ResearchEntityRelation['toType'],
  id: string,
) {
  switch (type) {
    case 'paper': {
      const entry = researchIndexEntries.find((candidate) => candidate.id === id);
      return entry ? { name: entry.sourceTitle, url: entry.url } : undefined;
    }
    case 'dataset': {
      const entry = tactileDatasetEntries.find((candidate) => candidate.id === id);
      return entry ? { name: entry.name, url: canonicalUrl(`/datasets#dataset-${entry.id}`) } : undefined;
    }
    case 'benchmark': {
      const entry = tactileBenchmarkEntries.find((candidate) => candidate.id === id);
      return entry ? { name: entry.name, url: canonicalUrl(`/benchmarks#benchmark-${entry.id}`) } : undefined;
    }
    case 'sensor': {
      const entry = tactileSensorEntries.find((candidate) => candidate.id === id);
      return entry ? { name: entry.name, url: canonicalUrl(`/sensors#sensor-${entry.id}`) } : undefined;
    }
    case 'model': {
      const entry = robotAiModelEntries.find((candidate) => candidate.id === id);
      return entry ? { name: entry.name, url: canonicalUrl(`/robot-foundation-models#model-${entry.id}`) } : undefined;
    }
    case 'organization': {
      const entry = researchOrganizationEntries.find((candidate) => candidate.id === id);
      return entry ? { name: entry.name, url: canonicalUrl(`/organizations#organization-${entry.id}`) } : undefined;
    }
    case 'robot': {
      const entry = researchRobotEntries.find((candidate) => candidate.id === id);
      return entry ? { name: entry.name, url: canonicalUrl(`/robots#robot-${entry.id}`) } : undefined;
    }
  }
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
    `- Robot AI model records: ${robotAiModelEntries.length}`,
    `- Verified organization records: ${researchOrganizationEntries.length}`,
    `- Verified model-organization relations: ${robotAiOrganizationRelations.length}`,
    `- Source-listed research affiliations: ${researchSourceAffiliationRelations.length}`,
    `- Verified organization hierarchy relations: ${researchOrganizationPartOfRelations.length}`,
    `- Verified dataset sensor or robot relations: ${researchDatasetUsageRelations.length}`,
    `- Verified paper-sensor relations: ${researchPaperSensorRelations.length}`,
    `- Evidence-backed research entity relations: ${researchEntityRelations.length}`,
    `- Research provenance relations: ${researchProvenanceRelations.length}`,
    `- Research semantic relations: ${researchSemanticRelations.length}`,
    `- introduces relations: ${researchSemanticRelations.filter((entry) => entry.relation === 'introduces').length}`,
    `- describesDataset relations: ${researchSemanticRelations.filter((entry) => entry.relation === 'describesDataset').length}`,
    `- usesDataset relations: ${researchSemanticRelations.filter((entry) => entry.relation === 'usesDataset').length}`,
    `- trainedOn relations: ${researchSemanticRelations.filter((entry) => entry.relation === 'trainedOn').length}`,
    `- evaluatedBy relations: ${researchSemanticRelations.filter((entry) => entry.relation === 'evaluatedBy').length}`,
    `- Verified robot-platform records: ${researchRobotEntries.length}`,
    `- Verified model-robot relations: ${robotAiRobotRelations.length}`,
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
    '- A source-listed organization affiliation does not establish model ownership, funding, endorsement, current employment, or affiliation with RoboSkin.ai. Preserve the developed, co-developed, and contributor relationship labels.',
    '- Research provenance relations are intentionally narrow. sourceAffiliation preserves paper wording, partOf requires direct organization evidence, usesSensor records a named paper experiment or dataset collection setup, and usesRobot may represent simulation only when its boundary says so.',
    '- Knowledge-graph v2 relation labels are not interchangeable. introduces requires a paper-presented contribution; describesDataset is deliberately weaker; usesDataset requires explicit model use; trainedOn requires explicit training-mixture evidence; evaluatedBy requires an explicit model-to-benchmark evaluation. A zero edge count means no current relation passed the evidence gate, not that the relationship is impossible.',
    '- A robot-platform relation has a narrow meaning: evaluatedOn requires explicit experiments, trainedAcross requires explicit training-mixture evidence, and demonstratedOn records a source-backed demonstration without upgrading it to a quantitative evaluation.',
    '- Do not infer an exact robot product from a family label. Training coverage does not prove deployment compatibility, a fine-tuned policy is not a zero-shot base-model result, and a simulation score is not a real-robot score.',
    '- No blanket content-reuse license is granted by this file. Verify the original source license and the RoboSkin.ai site terms before reuse.',
    `- Suggested attribution for site analysis: ${site.editorial.name}, “Page title,” RoboSkin.ai, canonical page URL, accessed on the reader’s actual access date.`,
    '',
    '## Core Semantic Map',
    '',
    'Artificial Intelligence → AI in Robotics → Physical AI → Robot Learning / VLA / World Models → Robot Control → Measured Feedback',
    '',
    'Robot Skin → Tactile Sensing → Tactile AI → Robot Manipulation → Physical AI',
    '',
    'AI supplies perception, prediction, learning, reasoning, or action selection. Robotics supplies sensors, embodiment, actuators, control, integration, and physical safety. Touch closes the contact-specific part of the loop through robot skin, tactile sensing, tactile AI, and measured response.',
    '',
    'RoboSkin.ai covers the complete tactile-intelligence stack: contact surfaces and sensor physics, signal handling and synchronization, tactile representations and multimodal models, closed-loop robot action, datasets, benchmarks, laboratories, and deployment evidence.',
    '',
    '## Machine-Readable and Discovery Endpoints',
    '',
    `- Curated LLM guide: ${canonicalUrl('/llms.txt')}`,
    `- Full LLM knowledge file: ${canonicalUrl('/llms-full.txt')}`,
    `- Knowledge graph JSON: ${canonicalUrl('/knowledge-graph.json')}`,
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

  lines.push(
    '## Verified Robot Platforms and Embodiments',
    '',
    `Directory: ${canonicalUrl('/robots')}`,
    '',
    'These records separate robot identity from model relationship evidence. Exact products, family-level labels, unnamed research platforms, and mixed real/simulation setups remain distinct. The relation labels evaluatedOn, trainedAcross, and demonstratedOn are not interchangeable.',
    '',
  );
  for (const robot of researchRobotEntries) {
    const relations = robotAiRobotRelations.filter((relation) => relation.robotId === robot.id);
    lines.push(
      `### ${robot.name}`,
      '',
      `- Record ID: ${robot.id}`,
      `- Entity type: ${robot.kind}`,
      `- Manufacturer: ${robot.manufacturer ?? 'Not established for this normalized record by the reviewed sources'}`,
      `- Source aliases: ${list(robot.aliases) || 'No additional aliases in the current directory'}`,
      `- Canonical RoboSkin.ai entity: ${canonicalUrl(`/robots#robot-${robot.id}`)}`,
      `- Description: ${compact(robot.description)}`,
    );
    appendOptionalLink(lines, 'Official URL', robot.officialUrl ?? undefined);
    lines.push(
      `- Identity sources: ${robot.identitySources.map((source) => markdownLink(source.label, source.url)).join('; ')}`,
      `- Evidence boundary: ${compact(robot.evidenceBoundary)}`,
      '- Connected robot AI models:',
    );
    for (const relation of relations) {
      const model = robotAiModelEntries.find((entry) => entry.id === relation.modelId);
      if (!model) throw new Error(`LLM robot record references missing model ${relation.modelId}.`);
      lines.push(
        `  - ${markdownLink(model.name, canonicalUrl(`/robot-foundation-models#model-${model.id}`))}: ${relation.relation}`,
        `    - Source embodiment wording: ${list(relation.sourceEmbodimentLabels)}`,
        `    - Relationship evidence: ${relation.evidenceUrls.join('; ')}`,
        `    - Relationship boundary: ${compact(relation.evidenceBoundary)}`,
      );
    }
    lines.push(`- Source reviewed: ${robot.sourceReviewed}`, '');
  }

  lines.push(
    '## Knowledge Graph v2 Relationship Vocabulary',
    '',
    'The vocabulary is serialized in knowledge-graph.json even when a relation currently has zero verified edges. Allowed endpoint types are strict; the site does not infer missing edges from similar names, dates, organizations, or prose fields.',
    '',
    '| Relation | Allowed source types | Allowed target types | Verified edges | Definition |',
    '| --- | --- | --- | ---: | --- |',
    ...researchEntityRelationVocabulary.map((definition) => (
      `| ${definition.relation} | ${definition.fromTypes.join(', ')} | ${definition.toTypes.join(', ')} | ${researchEntityRelations.filter((relation) => relation.relation === definition.relation).length} | ${compact(definition.definition)} |`
    )),
    '',
    '## Evidence-Backed Research Entity Relations',
    '',
    'These provenance and semantic relations connect existing records without upgrading affiliation into ownership, description into release, dataset use into training, or simulation into hardware evidence. Each edge retains source wording, relationship evidence, a review date, and an editorial boundary.',
    '',
  );
  for (const relation of researchEntityRelations) {
    const from = researchRelationEntity(relation.fromType, relation.fromId);
    const to = researchRelationEntity(relation.toType, relation.toId);
    if (!from || !to) {
      throw new Error(`LLM provenance relation references a missing entity: ${relation.fromType}:${relation.fromId} -> ${relation.toType}:${relation.toId}.`);
    }
    lines.push(
      `### ${from.name} -> ${to.name}`,
      '',
      `- Relation: ${relation.relation}`,
      `- Source entity: ${markdownLink(from.name, from.url)}`,
      `- Target entity: ${markdownLink(to.name, to.url)}`,
      `- Source wording: ${list(relation.sourceLabels)}`,
      `- Relationship evidence: ${relation.evidenceUrls.join('; ')}`,
      `- Evidence boundary: ${compact(relation.evidenceBoundary)}`,
      `- Source reviewed: ${relation.sourceReviewed}`,
      '',
    );
  }

  lines.push(
    '## Verified Robot AI Research Organizations',
    '',
    `Directory: ${canonicalUrl('/organizations')}`,
    '',
    'These records normalize organization identities while preserving the relationship strength supported by each model source. An official organization page proves identity; a separate paper, project page, or provider release supports the model relationship.',
    '',
  );
  for (const organization of researchOrganizationEntries) {
    const relations = robotAiOrganizationRelations.filter(
      (relation) => relation.organizationId === organization.id,
    );
    lines.push(
      `### ${organization.name}`,
      '',
      `- Record ID: ${organization.id}`,
      `- Organization type: ${organization.kind}`,
      `- Source aliases: ${list(organization.aliases) || 'No additional aliases in the current directory'}`,
      `- Official URL: ${organization.officialUrl}`,
      `- Canonical RoboSkin.ai entity: ${canonicalUrl(`/organizations#organization-${organization.id}`)}`,
      `- Identity sources: ${organization.identitySources.map((source) => markdownLink(source.label, source.url)).join('; ')}`,
      `- Evidence boundary: ${compact(organization.evidenceBoundary)}`,
      '- Connected robot AI models:',
    );
    for (const relation of relations) {
      const model = robotAiModelEntries.find((entry) => entry.id === relation.modelId);
      if (!model) throw new Error(`LLM organization record references missing model ${relation.modelId}.`);
      lines.push(
        `  - ${markdownLink(model.name, canonicalUrl(`/robot-foundation-models#model-${model.id}`))}: ${relation.relation}`,
        `    - Relationship evidence: ${relation.evidenceUrls.join('; ')}`,
        `    - Relationship boundary: ${compact(relation.evidenceBoundary)}`,
      );
    }
    lines.push(`- Source reviewed: ${organization.sourceReviewed}`, '');
  }

  lines.push('## Robot AI Models', '', `Directory: ${canonicalUrl('/robot-foundation-models')}`, '');
  for (const entry of robotAiModelEntries) {
    const verifiedRobotRelations = robotAiRobotRelations.filter((relation) => relation.modelId === entry.id);
    lines.push(
      `### ${entry.name}`,
      '',
      `- Record ID: ${entry.id}`,
      `- Organization label: ${compact(entry.organization)}`,
      `- Source-listed organizations: ${list(entry.creatorOrganizations) || 'No verified organization entity is published for this record'}`,
      `- Release date: ${entry.releaseDate}`,
      `- Model role: ${entry.category}`,
      `- Input modalities: ${list(entry.inputModalities)}`,
      `- Output: ${compact(entry.outputType)}`,
      `- Embodiments: ${list(entry.embodiments)}`,
      `- Training-data evidence: ${compact(entry.trainingDataSummary)}`,
      `- Real-robot evaluation: ${compact(entry.realRobotEvaluation)}`,
      `- Availability: ${compact(entry.availability)}`,
      `- License evidence: ${compact(entry.license)}`,
      `- Tactile input: ${entry.tactileInput}`,
      `- Evidence limitation: ${compact(entry.evidenceLimitations)}`,
      `- Project URL: ${entry.projectUrl}`,
    );
    appendOptionalLink(lines, 'Paper URL', entry.paperUrl ?? undefined);
    lines.push(
      '- Primary and official sources:',
      ...entry.primarySources.map((source) => `  - ${markdownLink(source.label, source.url)} (${source.type})`),
    );
    if (verifiedRobotRelations.length > 0) {
      lines.push('- Verified robot-platform relationships:');
      for (const relation of verifiedRobotRelations) {
        const robot = researchRobotEntries.find((candidate) => candidate.id === relation.robotId);
        if (!robot) throw new Error(`LLM model record references missing robot ${relation.robotId}.`);
        lines.push(
          `  - ${relation.relation}: ${markdownLink(robot.name, canonicalUrl(`/robots#robot-${robot.id}`))}`,
          `    - Evidence: ${relation.evidenceUrls.join('; ')}`,
          `    - Boundary: ${compact(relation.evidenceBoundary)}`,
        );
      }
    }
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
