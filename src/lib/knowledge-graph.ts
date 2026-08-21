import { createHash } from 'node:crypto';
import { site } from '@/content/site';
import { researchIndexEntries, type EvidenceLevel } from '@/lib/research-index';
import { robotAiModelEntries } from '@/lib/robot-ai-models';
import {
  researchDatasetUsageRelations,
  researchEntityRelations,
  researchEntityRelationTypes,
  researchOrganizationPartOfRelations,
  researchSourceAffiliationRelations,
  type ResearchEntityRelationType,
} from '@/lib/research-entity-relations';
import {
  organizationModelRelationTypes,
  researchOrganizationEntries,
  robotAiOrganizationRelations,
  type OrganizationModelRelationType,
} from '@/lib/research-organizations';
import {
  researchRobotEntries,
  robotAiRobotRelations,
  robotModelRelationTypes,
  type RobotModelRelationType,
} from '@/lib/research-robots';
import { tactileBenchmarkEntries } from '@/lib/tactile-benchmarks';
import { tactileDatasetEntries } from '@/lib/tactile-datasets';
import { tactileSensorEntries } from '@/lib/tactile-sensors';

export const knowledgeGraphVersion = '1.3.0';

export type KnowledgeEntityType =
  | 'paper'
  | 'documentation'
  | 'dataset'
  | 'benchmark'
  | 'sensor'
  | 'model'
  | 'organization'
  | 'robot';

export type KnowledgeSourceKind =
  | 'primary'
  | 'paper'
  | 'documentation'
  | 'project'
  | 'dataset'
  | 'code'
  | 'license'
  | 'model card'
  | 'official release'
  | 'organization'
  | 'robot';

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
  relation:
    | 'supportedBy'
    | 'benchmarkedBy'
    | OrganizationModelRelationType
    | RobotModelRelationType
    | ResearchEntityRelationType;
  to: KnowledgeEntity['id'] | KnowledgeSource['id'];
  reviewedAt: string;
  evidenceSourceIds?: KnowledgeSource['id'][];
  sourceLabels?: string[];
  sourceEmbodimentLabels?: string[];
  evidenceBoundary?: string;
};

export type KnowledgeGraph = {
  version: string;
  updated: string;
  counts: {
    knowledgeEntities: number;
    researchEntities: number;
    researchIndex: number;
    papers: number;
    documentation: number;
    datasets: number;
    benchmarks: number;
    sensors: number;
    models: number;
    organizations: number;
    robots: number;
    sourceDocuments: number;
    edges: number;
    supportedByEdges: number;
    benchmarkedByEdges: number;
    organizationRelationEdges: number;
    developedByEdges: number;
    coDevelopedByEdges: number;
    contributedByEdges: number;
    robotRelationEdges: number;
    evaluatedOnEdges: number;
    trainedAcrossEdges: number;
    demonstratedOnEdges: number;
    researchProvenanceEdges: number;
    sourceAffiliationEdges: number;
    organizationHierarchyEdges: number;
    datasetUsageEdges: number;
    usesSensorEdges: number;
    usesRobotEdges: number;
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

function researchEntityType(evidence: EvidenceLevel): 'paper' | 'documentation' {
  switch (evidence) {
    case 'peer-reviewed':
    case 'preprint':
      return 'paper';
    case 'documentation':
      return 'documentation';
    case 'institutional':
      throw new Error('Institutional research-index evidence needs an explicit knowledge-graph entity type.');
  }
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
    const type = researchEntityType(entry.evidence);
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

  const organizationEntities: KnowledgeEntity[] = researchOrganizationEntries.map((entry) => ({
    id: `organization:${entry.id}`,
    type: 'organization',
    name: entry.name,
    canonicalUrl: canonicalUrl(`/organizations#organization-${entry.id}`),
    reviewedAt: entry.sourceReviewed,
    primarySourceIds: registerSources(entry.identitySources.map((source) => ({
      url: source.url,
      label: source.label,
      kind: 'organization',
      reviewedAt: entry.sourceReviewed,
    }))),
    attributes: {
      aliases: entry.aliases,
      organizationKind: entry.kind,
      officialUrl: entry.officialUrl,
      evidenceBoundary: entry.evidenceBoundary,
    },
  }));

  const robotEntities: KnowledgeEntity[] = researchRobotEntries.map((entry) => ({
    id: `robot:${entry.id}`,
    type: 'robot',
    name: entry.name,
    canonicalUrl: canonicalUrl(`/robots#robot-${entry.id}`),
    reviewedAt: entry.sourceReviewed,
    primarySourceIds: registerSources(entry.identitySources.map((source) => ({
      url: source.url,
      label: source.label,
      kind: 'robot',
      reviewedAt: entry.sourceReviewed,
    }))),
    attributes: {
      aliases: entry.aliases,
      robotKind: entry.kind,
      manufacturer: entry.manufacturer,
      officialUrl: entry.officialUrl,
      description: entry.description,
      evidenceBoundary: entry.evidenceBoundary,
    },
  }));

  const entities = [
    ...researchEntities,
    ...datasetEntities,
    ...benchmarkEntities,
    ...sensorEntities,
    ...modelEntities,
    ...organizationEntities,
    ...robotEntities,
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

  for (const relation of robotAiOrganizationRelations) {
    edges.push({
      from: `model:${relation.modelId}`,
      relation: relation.relation,
      to: `organization:${relation.organizationId}`,
      reviewedAt: relation.sourceReviewed,
      evidenceSourceIds: relation.evidenceUrls
        .map((url) => sourceId(normalizeSourceUrl(url)))
        .sort(),
      sourceLabels: [relation.sourceOrganizationLabel],
      evidenceBoundary: relation.evidenceBoundary,
    });
  }

  for (const relation of robotAiRobotRelations) {
    edges.push({
      from: `model:${relation.modelId}`,
      relation: relation.relation,
      to: `robot:${relation.robotId}`,
      reviewedAt: relation.sourceReviewed,
      evidenceSourceIds: relation.evidenceUrls
        .map((url) => sourceId(normalizeSourceUrl(url)))
        .sort(),
      sourceEmbodimentLabels: [...relation.sourceEmbodimentLabels],
      evidenceBoundary: relation.evidenceBoundary,
    });
  }

  for (const relation of researchEntityRelations) {
    edges.push({
      from: `${relation.fromType}:${relation.fromId}` as KnowledgeEntity['id'],
      relation: relation.relation,
      to: `${relation.toType}:${relation.toId}` as KnowledgeEntity['id'],
      reviewedAt: relation.sourceReviewed,
      evidenceSourceIds: relation.evidenceUrls
        .map((url) => sourceId(normalizeSourceUrl(url)))
        .sort(),
      sourceLabels: [...relation.sourceLabels],
      evidenceBoundary: relation.evidenceBoundary,
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
  const organizationRelationEdges = edges.filter((edge) => (
    organizationModelRelationTypes.includes(edge.relation as OrganizationModelRelationType)
  )).length;
  const developedByEdges = edges.filter((edge) => edge.relation === 'developedBy').length;
  const coDevelopedByEdges = edges.filter((edge) => edge.relation === 'coDevelopedBy').length;
  const contributedByEdges = edges.filter((edge) => edge.relation === 'contributedBy').length;
  const robotRelationEdges = edges.filter((edge) => (
    robotModelRelationTypes.includes(edge.relation as RobotModelRelationType)
  )).length;
  const evaluatedOnEdges = edges.filter((edge) => edge.relation === 'evaluatedOn').length;
  const trainedAcrossEdges = edges.filter((edge) => edge.relation === 'trainedAcross').length;
  const demonstratedOnEdges = edges.filter((edge) => edge.relation === 'demonstratedOn').length;
  const researchProvenanceEdges = edges.filter((edge) => (
    researchEntityRelationTypes.includes(edge.relation as ResearchEntityRelationType)
  )).length;
  const sourceAffiliationEdges = edges.filter((edge) => edge.relation === 'sourceAffiliation').length;
  const organizationHierarchyEdges = edges.filter((edge) => edge.relation === 'partOf').length;
  const usesSensorEdges = edges.filter((edge) => edge.relation === 'usesSensor').length;
  const usesRobotEdges = edges.filter((edge) => edge.relation === 'usesRobot').length;
  const datasetUsageEdges = usesSensorEdges + usesRobotEdges;
  const graph: KnowledgeGraph = {
    version: knowledgeGraphVersion,
    updated: latestDate(entities.map((entry) => entry.reviewedAt)),
    counts: {
      knowledgeEntities: entities.length,
      researchEntities: entities.length - organizationEntities.length,
      researchIndex: researchEntities.length,
      papers,
      documentation,
      datasets: datasetEntities.length,
      benchmarks: benchmarkEntities.length,
      sensors: sensorEntities.length,
      models: modelEntities.length,
      organizations: organizationEntities.length,
      robots: robotEntities.length,
      sourceDocuments: sources.length,
      edges: edges.length,
      supportedByEdges,
      benchmarkedByEdges,
      organizationRelationEdges,
      developedByEdges,
      coDevelopedByEdges,
      contributedByEdges,
      robotRelationEdges,
      evaluatedOnEdges,
      trainedAcrossEdges,
      demonstratedOnEdges,
      researchProvenanceEdges,
      sourceAffiliationEdges,
      organizationHierarchyEdges,
      datasetUsageEdges,
      usesSensorEdges,
      usesRobotEdges,
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
    'organization',
    'robot',
  ]);
  const allowedRelations = new Set<KnowledgeEdge['relation']>([
    'supportedBy',
    'benchmarkedBy',
    ...organizationModelRelationTypes,
    ...robotModelRelationTypes,
    ...researchEntityRelationTypes,
  ]);
  const entityIds = new Set(graph.entities.map((entry) => entry.id));
  const entityById = new Map(graph.entities.map((entry) => [entry.id, entry]));
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
    if (!allowedRelations.has(edge.relation)) errors.push(`Edge ${key} uses an unsupported relation.`);
    if (edge.relation === 'supportedBy' && !sourceIds.has(edge.to as KnowledgeSource['id'])) {
      errors.push(`supportedBy edge ${key} must end at a source.`);
    }
    if (edge.relation === 'benchmarkedBy' && !edge.to.startsWith('benchmark:')) {
      errors.push(`benchmarkedBy edge ${key} must end at a benchmark.`);
    }

    const organizationRelation = organizationModelRelationTypes.includes(
      edge.relation as OrganizationModelRelationType,
    );
    const robotRelation = robotModelRelationTypes.includes(
      edge.relation as RobotModelRelationType,
    );
    const researchRelation = researchEntityRelationTypes.includes(
      edge.relation as ResearchEntityRelationType,
    );
    const fromEntity = entityById.get(edge.from);
    const toEntity = entityById.get(edge.to as KnowledgeEntity['id']);
    if (organizationRelation) {
      if (fromEntity?.type !== 'model' || toEntity?.type !== 'organization') {
        errors.push(`Organization edge ${key} must connect a model to an organization.`);
      }
    }
    if (robotRelation && (fromEntity?.type !== 'model' || toEntity?.type !== 'robot')) {
      errors.push(`Robot edge ${key} must connect a model to a robot.`);
    }
    if (edge.relation === 'sourceAffiliation') {
      const allowedSourceTypes = new Set<KnowledgeEntityType>(['paper', 'dataset', 'benchmark', 'sensor']);
      if (!fromEntity || !allowedSourceTypes.has(fromEntity.type) || toEntity?.type !== 'organization') {
        errors.push(`Source-affiliation edge ${key} must connect a paper, dataset, benchmark, or sensor to an organization.`);
      }
    }
    if (edge.relation === 'partOf' && (
      fromEntity?.type !== 'organization'
      || toEntity?.type !== 'organization'
      || fromEntity.id === toEntity.id
    )) {
      errors.push(`Organization hierarchy edge ${key} must connect two different organizations.`);
    }
    if (edge.relation === 'usesSensor' && (fromEntity?.type !== 'dataset' || toEntity?.type !== 'sensor')) {
      errors.push(`Dataset sensor edge ${key} must connect a dataset to a sensor.`);
    }
    if (edge.relation === 'usesRobot' && (fromEntity?.type !== 'dataset' || toEntity?.type !== 'robot')) {
      errors.push(`Dataset robot edge ${key} must connect a dataset to a robot.`);
    }

    const evidenceBackedRelation = organizationRelation || robotRelation || researchRelation;
    if (evidenceBackedRelation) {
      const relationKind = organizationRelation
        ? 'Model-organization'
        : robotRelation
          ? 'Model-robot'
          : 'Research provenance';
      if (!Array.isArray(edge.evidenceSourceIds) || edge.evidenceSourceIds.length === 0) {
        errors.push(`${relationKind} edge ${key} has no relationship evidence.`);
      } else {
        if (new Set(edge.evidenceSourceIds).size !== edge.evidenceSourceIds.length) {
          errors.push(`${relationKind} edge ${key} repeats relationship evidence.`);
        }
        for (const evidenceSourceId of edge.evidenceSourceIds) {
          if (!sourceIds.has(evidenceSourceId)) {
            errors.push(`${relationKind} edge ${key} references missing evidence ${evidenceSourceId}.`);
          }
          if (!fromEntity?.primarySourceIds.includes(evidenceSourceId)) {
            errors.push(`${relationKind} edge ${key} uses evidence not attached to its source entity: ${evidenceSourceId}.`);
          }
        }
      }
      if (typeof edge.evidenceBoundary !== 'string' || edge.evidenceBoundary.trim().length === 0) {
        errors.push(`${relationKind} edge ${key} has no evidence boundary.`);
      }
    } else if (
      edge.evidenceSourceIds !== undefined
      || edge.sourceLabels !== undefined
      || edge.sourceEmbodimentLabels !== undefined
      || edge.evidenceBoundary !== undefined
    ) {
      errors.push(`Non-evidence-backed edge ${key} must not carry relationship qualifiers.`);
    }

    if (organizationRelation || researchRelation) {
      if (!Array.isArray(edge.sourceLabels) || edge.sourceLabels.length === 0) {
        errors.push(`Evidence-backed edge ${key} has no source labels.`);
      } else if (edge.sourceLabels.some((label) => typeof label !== 'string' || label.trim().length === 0)) {
        errors.push(`Evidence-backed edge ${key} has an invalid source label.`);
      }
    } else if (edge.sourceLabels !== undefined) {
      errors.push(`Non-organization/provenance edge ${key} must not carry source labels.`);
    }

    if (robotRelation) {
      if (!Array.isArray(edge.sourceEmbodimentLabels) || edge.sourceEmbodimentLabels.length === 0) {
        errors.push(`Robot edge ${key} has no source embodiment labels.`);
      } else if (edge.sourceEmbodimentLabels.some((label) => typeof label !== 'string' || label.trim().length === 0)) {
        errors.push(`Robot edge ${key} has an invalid source embodiment label.`);
      }
    } else if (edge.sourceEmbodimentLabels !== undefined) {
      errors.push(`Non-robot edge ${key} must not carry robot embodiment labels.`);
    }
  }

  for (const entity of graph.entities) {
    for (const source of entity.primarySourceIds) {
      if (!edgeKeys.has(`${entity.id}|supportedBy|${source}`)) {
        errors.push(`${entity.id} is missing supportedBy edge to ${source}.`);
      }
    }
  }

  for (const relation of robotAiOrganizationRelations) {
    const key = `model:${relation.modelId}|${relation.relation}|organization:${relation.organizationId}`;
    const edge = graph.edges.find((candidate) => (
      candidate.from === `model:${relation.modelId}`
      && candidate.relation === relation.relation
      && candidate.to === `organization:${relation.organizationId}`
    ));
    if (!edgeKeys.has(key) || !edge) {
      errors.push(`Missing verified organization relation ${key}.`);
      continue;
    }
    if (JSON.stringify(edge.sourceLabels) !== JSON.stringify([relation.sourceOrganizationLabel])) {
      errors.push(`Organization relation ${key} lost its source label.`);
    }
    if (edge.evidenceBoundary !== relation.evidenceBoundary) {
      errors.push(`Organization relation ${key} lost its evidence boundary.`);
    }
  }
  for (const relation of robotAiRobotRelations) {
    const key = `model:${relation.modelId}|${relation.relation}|robot:${relation.robotId}`;
    const edge = graph.edges.find((candidate) => (
      candidate.from === `model:${relation.modelId}`
      && candidate.relation === relation.relation
      && candidate.to === `robot:${relation.robotId}`
    ));
    if (!edgeKeys.has(key) || !edge) {
      errors.push(`Missing verified robot relation ${key}.`);
      continue;
    }
    if (JSON.stringify(edge.sourceEmbodimentLabels) !== JSON.stringify(relation.sourceEmbodimentLabels)) {
      errors.push(`Robot relation ${key} lost its source embodiment labels.`);
    }
    if (edge.evidenceBoundary !== relation.evidenceBoundary) {
      errors.push(`Robot relation ${key} lost its evidence boundary.`);
    }
  }
  for (const relation of researchEntityRelations) {
    const from = `${relation.fromType}:${relation.fromId}`;
    const to = `${relation.toType}:${relation.toId}`;
    const key = `${from}|${relation.relation}|${to}`;
    const edge = graph.edges.find((candidate) => (
      candidate.from === from
      && candidate.relation === relation.relation
      && candidate.to === to
    ));
    if (!edgeKeys.has(key) || !edge) {
      errors.push(`Missing research provenance relation ${key}.`);
      continue;
    }
    if (JSON.stringify(edge.sourceLabels) !== JSON.stringify(relation.sourceLabels)) {
      errors.push(`Research provenance relation ${key} lost its source labels.`);
    }
    if (edge.evidenceBoundary !== relation.evidenceBoundary) {
      errors.push(`Research provenance relation ${key} lost its evidence boundary.`);
    }
  }

  if (graph.counts.knowledgeEntities !== graph.entities.length) errors.push('knowledgeEntities count is inconsistent.');
  if (graph.counts.researchEntities !== graph.entities.filter((entity) => entity.type !== 'organization').length) errors.push('researchEntities count is inconsistent.');
  if (graph.counts.researchIndex !== graph.counts.papers + graph.counts.documentation) errors.push('researchIndex count is inconsistent.');
  for (const [type, count] of [
    ['paper', graph.counts.papers],
    ['documentation', graph.counts.documentation],
    ['dataset', graph.counts.datasets],
    ['benchmark', graph.counts.benchmarks],
    ['sensor', graph.counts.sensors],
    ['model', graph.counts.models],
    ['organization', graph.counts.organizations],
    ['robot', graph.counts.robots],
  ] as const) {
    if (graph.entities.filter((entity) => entity.type === type).length !== count) {
      errors.push(`${type} count is inconsistent.`);
    }
  }
  if (graph.counts.sourceDocuments !== graph.sources.length) errors.push('sourceDocuments count is inconsistent.');
  if (graph.counts.edges !== graph.edges.length) errors.push('Edge count is inconsistent.');
  if (graph.counts.supportedByEdges !== graph.edges.filter((edge) => edge.relation === 'supportedBy').length) errors.push('supportedBy edge count is inconsistent.');
  if (graph.counts.benchmarkedByEdges !== graph.edges.filter((edge) => edge.relation === 'benchmarkedBy').length) errors.push('benchmarkedBy edge count is inconsistent.');
  if (graph.counts.organizationRelationEdges !== graph.edges.filter((edge) => organizationModelRelationTypes.includes(edge.relation as OrganizationModelRelationType)).length) errors.push('organization relation edge count is inconsistent.');
  if (graph.counts.developedByEdges !== graph.edges.filter((edge) => edge.relation === 'developedBy').length) errors.push('developedBy edge count is inconsistent.');
  if (graph.counts.coDevelopedByEdges !== graph.edges.filter((edge) => edge.relation === 'coDevelopedBy').length) errors.push('coDevelopedBy edge count is inconsistent.');
  if (graph.counts.contributedByEdges !== graph.edges.filter((edge) => edge.relation === 'contributedBy').length) errors.push('contributedBy edge count is inconsistent.');
  if (graph.counts.organizationRelationEdges !== graph.counts.developedByEdges + graph.counts.coDevelopedByEdges + graph.counts.contributedByEdges) errors.push('organization relation subtotal is inconsistent.');
  if (graph.counts.robotRelationEdges !== graph.edges.filter((edge) => robotModelRelationTypes.includes(edge.relation as RobotModelRelationType)).length) errors.push('robot relation edge count is inconsistent.');
  if (graph.counts.evaluatedOnEdges !== graph.edges.filter((edge) => edge.relation === 'evaluatedOn').length) errors.push('evaluatedOn edge count is inconsistent.');
  if (graph.counts.trainedAcrossEdges !== graph.edges.filter((edge) => edge.relation === 'trainedAcross').length) errors.push('trainedAcross edge count is inconsistent.');
  if (graph.counts.demonstratedOnEdges !== graph.edges.filter((edge) => edge.relation === 'demonstratedOn').length) errors.push('demonstratedOn edge count is inconsistent.');
  if (graph.counts.robotRelationEdges !== graph.counts.evaluatedOnEdges + graph.counts.trainedAcrossEdges + graph.counts.demonstratedOnEdges) errors.push('robot relation subtotal is inconsistent.');
  if (graph.counts.researchProvenanceEdges !== graph.edges.filter((edge) => researchEntityRelationTypes.includes(edge.relation as ResearchEntityRelationType)).length) errors.push('research provenance edge count is inconsistent.');
  if (graph.counts.sourceAffiliationEdges !== graph.edges.filter((edge) => edge.relation === 'sourceAffiliation').length) errors.push('sourceAffiliation edge count is inconsistent.');
  if (graph.counts.organizationHierarchyEdges !== graph.edges.filter((edge) => edge.relation === 'partOf').length) errors.push('organization hierarchy edge count is inconsistent.');
  if (graph.counts.usesSensorEdges !== graph.edges.filter((edge) => edge.relation === 'usesSensor').length) errors.push('usesSensor edge count is inconsistent.');
  if (graph.counts.usesRobotEdges !== graph.edges.filter((edge) => edge.relation === 'usesRobot').length) errors.push('usesRobot edge count is inconsistent.');
  if (graph.counts.datasetUsageEdges !== graph.counts.usesSensorEdges + graph.counts.usesRobotEdges) errors.push('dataset usage relation subtotal is inconsistent.');
  if (graph.counts.sourceAffiliationEdges !== researchSourceAffiliationRelations.length) errors.push('source affiliation relation inventory is incomplete.');
  if (graph.counts.organizationHierarchyEdges !== researchOrganizationPartOfRelations.length) errors.push('organization hierarchy relation inventory is incomplete.');
  if (graph.counts.datasetUsageEdges !== researchDatasetUsageRelations.length) errors.push('dataset usage relation inventory is incomplete.');
  if (graph.counts.researchProvenanceEdges !== graph.counts.sourceAffiliationEdges + graph.counts.organizationHierarchyEdges + graph.counts.datasetUsageEdges) errors.push('research provenance relation subtotal is inconsistent.');

  return errors;
}

export const knowledgeGraph = buildKnowledgeGraph();
