import { createHash } from 'node:crypto';
import { site } from '@/content/site';
import { researchIndexEntries } from '@/lib/research-index';
import { robotAiModelEntries } from '@/lib/robot-ai-models';
import { tactileBenchmarkEntries } from '@/lib/tactile-benchmarks';
import { tactileDatasetEntries } from '@/lib/tactile-datasets';
import { tactileSensorEntries } from '@/lib/tactile-sensors';

export const knowledgeGraphVersion = '1.0.0';

export type KnowledgeEntityType =
  | 'paper'
  | 'documentation'
  | 'dataset'
  | 'benchmark'
  | 'sensor'
  | 'model';

export type KnowledgeSourceKind =
  | 'primary'
  | 'paper'
  | 'documentation'
  | 'project'
  | 'dataset'
  | 'code'
  | 'license'
  | 'model card'
  | 'official release';

export type KnowledgeEntity = {
  id: `${KnowledgeEntityType}:${string}`;
  type: KnowledgeEntityType;
  name: string;
  canonicalUrl: string;
  reviewedAt: string;
  primarySourceIds: `source:${string}`[];
  attributes: Record<string, string | number | boolean | null | string[]>;
};

export type KnowledgeSource = {
  id: `source:${string}`;
  type: 'source';
  url: string;
  labels: string[];
  kinds: KnowledgeSourceKind[];
  reviewedAt: string;
};

export type KnowledgeEdge = {
  from: KnowledgeEntity['id'];
  relation: 'supportedBy' | 'benchmarkedBy';
  to: KnowledgeEntity['id'] | KnowledgeSource['id'];
  reviewedAt: string;
};

export type KnowledgeGraph = {
  version: string;
  updated: string;
  counts: {
    researchEntities: number;
    researchIndex: number;
    papers: number;
    documentation: number;
    datasets: number;
    benchmarks: number;
    sensors: number;
    models: number;
    sourceDocuments: number;
    edges: number;
    supportedByEdges: number;
    benchmarkedByEdges: number;
  };
  entities: KnowledgeEntity[];
  sources: KnowledgeSource[];
  edges: KnowledgeEdge[];
};

type SourceInput = {
  url: string;
  label: string;
  kind: KnowledgeSourceKind;
  reviewedAt: string;
};

type MutableSource = {
  id: KnowledgeSource['id'];
  url: string;
  labels: Set<string>;
  kinds: Set<KnowledgeSourceKind>;
  reviewedAt: string;
};

const validDate = /^20\d{2}-\d{2}-\d{2}$/;
const placeholderEntityName = /\b(?:research team listed|authors? listed|unknown|tbd|todo|lorem ipsum)\b/i;

function canonicalUrl(pathname: string) {
  return new URL(pathname, site.url).href;
}

function normalizeSourceUrl(value: string) {
  const url = new URL(value);
  url.hash = '';
  return url.href;
}

function sourceId(url: string): KnowledgeSource['id'] {
  const digest = createHash('sha256').update(url).digest('hex').slice(0, 20);
  return `source:${digest}`;
}

function latestDate(values: string[]) {
  return [...values].sort().at(-1) ?? '1970-01-01';
}

function compareText(left: string, right: string) {
  return left < right ? -1 : left > right ? 1 : 0;
}

export function buildKnowledgeGraph(): KnowledgeGraph {
  const sourceByUrl = new Map<string, MutableSource>();

  function registerSources(inputs: SourceInput[]): KnowledgeSource['id'][] {
    const ids = new Set<KnowledgeSource['id']>();

    for (const input of inputs) {
      const url = normalizeSourceUrl(input.url);
      const existing = sourceByUrl.get(url);

      if (existing) {
        existing.labels.add(input.label);
        existing.kinds.add(input.kind);
        existing.reviewedAt = latestDate([existing.reviewedAt, input.reviewedAt]);
        ids.add(existing.id);
        continue;
      }

      const id = sourceId(url);
      sourceByUrl.set(url, {
        id,
        url,
        labels: new Set([input.label]),
        kinds: new Set([input.kind]),
        reviewedAt: input.reviewedAt,
      });
      ids.add(id);
    }

    return [...ids].sort();
  }

  const researchEntities: KnowledgeEntity[] = researchIndexEntries.map((entry) => {
    const type = entry.evidence === 'documentation' ? 'documentation' : 'paper';
    const kind: KnowledgeSourceKind = type === 'documentation' ? 'documentation' : 'paper';

    return {
      id: `${type}:${entry.id}`,
      type,
      name: entry.sourceTitle,
      canonicalUrl: entry.url,
      reviewedAt: entry.reviewedAt,
      primarySourceIds: registerSources([{
        url: entry.sourceUrl,
        label: entry.sourceTitle,
        kind,
        reviewedAt: entry.reviewedAt,
      }]),
      attributes: {
        year: entry.year,
        publisher: entry.publisher,
        evidence: entry.evidence,
        analysisTitle: entry.title,
        sensorPrinciple: entry.sensorPrinciple,
        modalities: entry.modalities,
        formFactor: entry.formFactor,
        dataOutput: entry.dataOutput,
        applications: entry.applications,
        limitations: entry.limitations,
      },
    };
  });

  const datasetEntities: KnowledgeEntity[] = tactileDatasetEntries.map((entry) => ({
    id: `dataset:${entry.id}`,
    type: 'dataset',
    name: entry.name,
    canonicalUrl: canonicalUrl(`/datasets#dataset-${entry.id}`),
    reviewedAt: entry.sourceReviewed,
    primarySourceIds: registerSources([
      { url: entry.paperUrl, label: `${entry.name} paper`, kind: 'paper', reviewedAt: entry.sourceReviewed },
      ...(entry.projectUrl ? [{ url: entry.projectUrl, label: `${entry.name} project`, kind: 'project' as const, reviewedAt: entry.sourceReviewed }] : []),
      ...(entry.githubUrl ? [{ url: entry.githubUrl, label: `${entry.name} code`, kind: 'code' as const, reviewedAt: entry.sourceReviewed }] : []),
      ...(entry.datasetUrl ? [{ url: entry.datasetUrl, label: `${entry.name} dataset`, kind: 'dataset' as const, reviewedAt: entry.sourceReviewed }] : []),
      ...(entry.licenseUrl ? [{ url: entry.licenseUrl, label: `${entry.name} license`, kind: 'license' as const, reviewedAt: entry.sourceReviewed }] : []),
    ]),
    attributes: {
      year: entry.year,
      institutions: entry.institution,
      robots: entry.robot,
      sensors: entry.sensor,
      modalities: entry.modalities,
      reportedScale: entry.sampleCount,
      tasks: entry.tasks,
      objectCategories: entry.objectCategories,
      dataFormat: entry.dataFormat,
      licenseEvidence: entry.license,
      availability: entry.availability,
    },
  }));

  const benchmarkEntities: KnowledgeEntity[] = tactileBenchmarkEntries.map((entry) => ({
    id: `benchmark:${entry.id}`,
    type: 'benchmark',
    name: entry.name,
    canonicalUrl: canonicalUrl(`/benchmarks#benchmark-${entry.id}`),
    reviewedAt: entry.sourceReviewed,
    primarySourceIds: registerSources([
      { url: entry.paperUrl, label: `${entry.name} paper`, kind: 'paper', reviewedAt: entry.sourceReviewed },
      ...(entry.projectUrl ? [{ url: entry.projectUrl, label: `${entry.name} project`, kind: 'project' as const, reviewedAt: entry.sourceReviewed }] : []),
      ...(entry.codeUrl ? [{ url: entry.codeUrl, label: `${entry.name} code`, kind: 'code' as const, reviewedAt: entry.sourceReviewed }] : []),
    ]),
    attributes: {
      year: entry.year,
      benchmarkType: entry.benchmarkType,
      institutions: entry.institutions,
      tasks: entry.tasks,
      modalities: entry.modalities,
      sensors: entry.sensors,
      robots: entry.robots,
      metrics: entry.metrics,
      protocol: entry.protocol,
      access: entry.access,
      limitation: entry.limitation,
    },
  }));

  const sensorEntities: KnowledgeEntity[] = tactileSensorEntries.map((entry) => ({
    id: `sensor:${entry.id}`,
    type: 'sensor',
    name: entry.name,
    canonicalUrl: canonicalUrl(`/sensors#sensor-${entry.id}`),
    reviewedAt: entry.sourceReviewed,
    primarySourceIds: registerSources([
      { url: entry.sourceUrl, label: `${entry.name} primary source`, kind: 'primary', reviewedAt: entry.sourceReviewed },
      ...(entry.projectUrl ? [{ url: entry.projectUrl, label: `${entry.name} project`, kind: 'project' as const, reviewedAt: entry.sourceReviewed }] : []),
      ...(entry.codeUrl ? [{ url: entry.codeUrl, label: `${entry.name} code`, kind: 'code' as const, reviewedAt: entry.sourceReviewed }] : []),
    ]),
    attributes: {
      organizationLabel: entry.organization,
      principle: entry.principle,
      formFactor: entry.formFactor,
      signals: entry.signals,
      reportedRate: entry.reportedRate,
      integration: entry.integration,
      access: entry.access,
      evidenceBoundary: entry.evidenceBoundary,
    },
  }));

  const modelEntities: KnowledgeEntity[] = robotAiModelEntries.map((entry) => ({
    id: `model:${entry.id}`,
    type: 'model',
    name: entry.name,
    canonicalUrl: canonicalUrl(`/robot-foundation-models#model-${entry.id}`),
    reviewedAt: entry.sourceReviewed,
    primarySourceIds: registerSources(entry.primarySources.map((source) => ({
      url: source.url,
      label: source.label,
      kind: source.type,
      reviewedAt: entry.sourceReviewed,
    }))),
    attributes: {
      organizationLabel: entry.organization,
      creatorOrganizations: entry.creatorOrganizations,
      releaseDate: entry.releaseDate,
      category: entry.category,
      inputModalities: entry.inputModalities,
      outputType: entry.outputType,
      embodiments: entry.embodiments,
      trainingDataSummary: entry.trainingDataSummary,
      realRobotEvaluation: entry.realRobotEvaluation,
      availability: entry.availability,
      license: entry.license,
      tactileInput: entry.tactileInput,
      evidenceLimitations: entry.evidenceLimitations,
    },
  }));

  const entities = [
    ...researchEntities,
    ...datasetEntities,
    ...benchmarkEntities,
    ...sensorEntities,
    ...modelEntities,
  ].sort((left, right) => compareText(left.id, right.id));

  const sources: KnowledgeSource[] = [...sourceByUrl.values()]
    .map((source): KnowledgeSource => ({
      id: source.id,
      type: 'source',
      url: source.url,
      labels: [...source.labels].sort(),
      kinds: [...source.kinds].sort(),
      reviewedAt: source.reviewedAt,
    }))
    .sort((left, right) => compareText(left.id, right.id));

  const edges: KnowledgeEdge[] = entities.flatMap((entity) => entity.primarySourceIds.map((id) => ({
    from: entity.id,
    relation: 'supportedBy' as const,
    to: id,
    reviewedAt: entity.reviewedAt,
  })));

  const benchmarkIds = new Set(tactileBenchmarkEntries.map((entry) => entry.id));
  for (const dataset of tactileDatasetEntries) {
    if (!benchmarkIds.has(dataset.id)) continue;
    const benchmark = tactileBenchmarkEntries.find((entry) => entry.id === dataset.id);
    if (!benchmark) continue;
    edges.push({
      from: `dataset:${dataset.id}`,
      relation: 'benchmarkedBy',
      to: `benchmark:${benchmark.id}`,
      reviewedAt: latestDate([dataset.sourceReviewed, benchmark.sourceReviewed]),
    });
  }

  edges.sort((left, right) => (
    compareText(left.from, right.from)
    || compareText(left.relation, right.relation)
    || compareText(left.to, right.to)
  ));

  const papers = researchEntities.filter((entry) => entry.type === 'paper').length;
  const documentation = researchEntities.filter((entry) => entry.type === 'documentation').length;
  const supportedByEdges = edges.filter((edge) => edge.relation === 'supportedBy').length;
  const benchmarkedByEdges = edges.filter((edge) => edge.relation === 'benchmarkedBy').length;
  const graph: KnowledgeGraph = {
    version: knowledgeGraphVersion,
    updated: latestDate(entities.map((entry) => entry.reviewedAt)),
    counts: {
      researchEntities: entities.length,
      researchIndex: researchEntities.length,
      papers,
      documentation,
      datasets: datasetEntities.length,
      benchmarks: benchmarkEntities.length,
      sensors: sensorEntities.length,
      models: modelEntities.length,
      sourceDocuments: sources.length,
      edges: edges.length,
      supportedByEdges,
      benchmarkedByEdges,
    },
    entities,
    sources,
    edges,
  };

  const errors = validateKnowledgeGraph(graph);
  if (errors.length > 0) {
    throw new Error(`Invalid RoboSkin knowledge graph:\n${errors.join('\n')}`);
  }

  return graph;
}

export function validateKnowledgeGraph(graph: KnowledgeGraph) {
  const errors: string[] = [];
  const allowedEntityTypes = new Set<KnowledgeEntityType>([
    'paper',
    'documentation',
    'dataset',
    'benchmark',
    'sensor',
    'model',
  ]);
  const entityIds = new Set(graph.entities.map((entry) => entry.id));
  const sourceIds = new Set(graph.sources.map((entry) => entry.id));
  const allIds = new Set([...entityIds, ...sourceIds]);
  const sourceUrls = new Set(graph.sources.map((entry) => entry.url));
  const edgeKeys = new Set<string>();

  if (entityIds.size !== graph.entities.length) errors.push('Entity IDs must be globally unique.');
  if (sourceIds.size !== graph.sources.length) errors.push('Source IDs must be globally unique.');
  if (allIds.size !== graph.entities.length + graph.sources.length) errors.push('Entity and source IDs must not collide.');
  if (sourceUrls.size !== graph.sources.length) errors.push('Source URLs must be deduplicated.');

  for (const entity of graph.entities) {
    if (!allowedEntityTypes.has(entity.type)) errors.push(`${entity.id} uses an unsupported entity type.`);
    if (!entity.id.startsWith(`${entity.type}:`)) errors.push(`${entity.id} does not match its type prefix.`);
    if (!validDate.test(entity.reviewedAt)) errors.push(`${entity.id} has an invalid reviewedAt date.`);
    if (placeholderEntityName.test(entity.name)) errors.push(`${entity.id} uses a placeholder entity name.`);
    if (entity.primarySourceIds.length === 0) errors.push(`${entity.id} has no primary source.`);
    if (new Set(entity.primarySourceIds).size !== entity.primarySourceIds.length) errors.push(`${entity.id} repeats a source ID.`);
    for (const id of entity.primarySourceIds) {
      if (!sourceIds.has(id)) errors.push(`${entity.id} references missing source ${id}.`);
    }
  }

  for (const source of graph.sources) {
    if (!source.id.startsWith('source:')) errors.push(`${source.id} does not use the source prefix.`);
    if (!validDate.test(source.reviewedAt)) errors.push(`${source.id} has an invalid reviewedAt date.`);
    if (source.labels.length === 0 || source.kinds.length === 0) errors.push(`${source.id} lacks source metadata.`);
    try {
      if (new URL(source.url).protocol !== 'https:') errors.push(`${source.id} must use HTTPS.`);
    } catch {
      errors.push(`${source.id} has an invalid URL.`);
    }
  }

  for (const edge of graph.edges) {
    const key = `${edge.from}|${edge.relation}|${edge.to}`;
    if (edgeKeys.has(key)) errors.push(`Duplicate edge ${key}.`);
    edgeKeys.add(key);
    if (!entityIds.has(edge.from)) errors.push(`Edge starts at missing entity ${edge.from}.`);
    if (!allIds.has(edge.to)) errors.push(`Edge ends at missing node ${edge.to}.`);
    if (!validDate.test(edge.reviewedAt)) errors.push(`Edge ${key} has an invalid reviewedAt date.`);
    if (edge.relation === 'supportedBy' && !sourceIds.has(edge.to as KnowledgeSource['id'])) {
      errors.push(`supportedBy edge ${key} must end at a source.`);
    }
    if (edge.relation === 'benchmarkedBy' && !edge.to.startsWith('benchmark:')) {
      errors.push(`benchmarkedBy edge ${key} must end at a benchmark.`);
    }
  }

  for (const entity of graph.entities) {
    for (const source of entity.primarySourceIds) {
      if (!edgeKeys.has(`${entity.id}|supportedBy|${source}`)) {
        errors.push(`${entity.id} is missing supportedBy edge to ${source}.`);
      }
    }
  }

  if (graph.counts.researchEntities !== graph.entities.length) errors.push('researchEntities count is inconsistent.');
  if (graph.counts.researchIndex !== graph.counts.papers + graph.counts.documentation) errors.push('researchIndex count is inconsistent.');
  for (const [type, count] of [
    ['paper', graph.counts.papers],
    ['documentation', graph.counts.documentation],
    ['dataset', graph.counts.datasets],
    ['benchmark', graph.counts.benchmarks],
    ['sensor', graph.counts.sensors],
    ['model', graph.counts.models],
  ] as const) {
    if (graph.entities.filter((entity) => entity.type === type).length !== count) {
      errors.push(`${type} count is inconsistent.`);
    }
  }
  if (graph.counts.sourceDocuments !== graph.sources.length) errors.push('sourceDocuments count is inconsistent.');
  if (graph.counts.edges !== graph.edges.length) errors.push('Edge count is inconsistent.');
  if (graph.counts.supportedByEdges !== graph.edges.filter((edge) => edge.relation === 'supportedBy').length) errors.push('supportedBy edge count is inconsistent.');
  if (graph.counts.benchmarkedByEdges !== graph.edges.filter((edge) => edge.relation === 'benchmarkedBy').length) errors.push('benchmarkedBy edge count is inconsistent.');

  return errors;
}

export const knowledgeGraph = buildKnowledgeGraph();
