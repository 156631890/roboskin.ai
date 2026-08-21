import { researchIndexEntries } from '@/lib/research-index';
import { researchOrganizationEntries } from '@/lib/research-organizations';
import { researchRobotEntries } from '@/lib/research-robots';
import { tactileBenchmarkEntries } from '@/lib/tactile-benchmarks';
import { tactileDatasetEntries } from '@/lib/tactile-datasets';
import { tactileSensorEntries } from '@/lib/tactile-sensors';

export const researchEntityRelationTypes = [
  'sourceAffiliation',
  'partOf',
  'usesSensor',
  'usesRobot',
] as const;

export type ResearchEntityRelationType = (typeof researchEntityRelationTypes)[number];
export type SourceAffiliationEntityType = 'paper' | 'dataset' | 'benchmark' | 'sensor';
export type DatasetUsageRelationType = 'usesSensor' | 'usesRobot';

type EvidenceFields = {
  evidenceUrls: string[];
  sourceLabels: string[];
  evidenceBoundary: string;
  sourceReviewed: string;
};

export type SourceAffiliationRelation = EvidenceFields & {
  relation: 'sourceAffiliation';
  fromType: SourceAffiliationEntityType;
  fromId: string;
  toType: 'organization';
  toId: string;
};

export type OrganizationPartOfRelation = EvidenceFields & {
  relation: 'partOf';
  fromType: 'organization';
  fromId: string;
  toType: 'organization';
  toId: string;
};

export type DatasetUsageRelation = EvidenceFields & {
  relation: DatasetUsageRelationType;
  fromType: 'dataset';
  fromId: string;
  toType: 'sensor' | 'robot';
  toId: string;
};

export type ResearchEntityRelation =
  | SourceAffiliationRelation
  | OrganizationPartOfRelation
  | DatasetUsageRelation;

type AffiliationTarget = {
  organizationId: string;
  sourceLabels: string[];
};

type SourceAffiliationBatch = Omit<
  SourceAffiliationRelation,
  'relation' | 'toType' | 'toId' | 'sourceLabels'
> & {
  organizations: AffiliationTarget[];
};

function expandSourceAffiliations(batch: SourceAffiliationBatch): SourceAffiliationRelation[] {
  return batch.organizations.map(({ organizationId, sourceLabels }) => ({
    relation: 'sourceAffiliation',
    fromType: batch.fromType,
    fromId: batch.fromId,
    toType: 'organization',
    toId: organizationId,
    evidenceUrls: [...batch.evidenceUrls],
    sourceLabels: [...sourceLabels],
    evidenceBoundary: batch.evidenceBoundary,
    sourceReviewed: batch.sourceReviewed,
  }));
}

const softVtBenchAffiliations: AffiliationTarget[] = [
  { organizationId: 'beihang-university', sourceLabels: ['Beihang University'] },
  { organizationId: 'tsinghua-university', sourceLabels: ['Tsinghua University'] },
  { organizationId: 'carnegie-mellon-university', sourceLabels: ['Carnegie Mellon University'] },
  { organizationId: 'zhejiang-university', sourceLabels: ['Zhejiang University'] },
];

const htBenchAffiliations: AffiliationTarget[] = [
  { organizationId: 'beihang-university', sourceLabels: ['Beihang University'] },
  { organizationId: 'shanghaitech-university', sourceLabels: ['ShanghaiTech University'] },
  { organizationId: 'tsinghua-university', sourceLabels: ['Tsinghua University'] },
];

const rctAffiliations: AffiliationTarget[] = [
  { organizationId: 'tu-dresden', sourceLabels: ['TU Dresden'] },
  { organizationId: 'scads-ai-dresden-leipzig', sourceLabels: ['ScaDS.AI Dresden/Leipzig'] },
  { organizationId: 'lasr-lab', sourceLabels: ['LASR Lab'] },
];

const sourceAffiliationBatches: SourceAffiliationBatch[] = [
  ...(['paper', 'dataset', 'benchmark'] as const).map((fromType) => ({
    fromType,
    fromId: fromType === 'paper'
      ? 'softvtbench-deformation-aware-visuo-tactile-dataset-2026'
      : 'softvtbench',
    organizations: softVtBenchAffiliations,
    evidenceUrls: ['https://arxiv.org/abs/2608.18701'],
    evidenceBoundary: 'These four links are the currently normalized subset of the SoftVTBench paper\'s larger author-affiliation list. They record only source-listed contributor affiliations and are not a complete organization roster; they do not establish institutional ownership, funding, endorsement, or responsibility for every dataset or benchmark component.',
    sourceReviewed: '2026-08-22',
  })),
  ...(['paper', 'dataset', 'benchmark'] as const).map((fromType) => ({
    fromType,
    fromId: fromType === 'paper'
      ? 'ht-bench-full-hand-tactile-representations-2026'
      : 'ht-bench',
    organizations: htBenchAffiliations,
    evidenceUrls: ['https://arxiv.org/abs/2606.19161'],
    evidenceBoundary: 'The HT-Bench source lists authors under these affiliations. This records only source-listed contributor affiliations; it does not establish institutional ownership, funding, endorsement, or participation by each organization as a whole.',
    sourceReviewed: '2026-08-22',
  })),
  ...(['paper', 'dataset', 'benchmark'] as const).map((fromType) => ({
    fromType,
    fromId: fromType === 'paper'
      ? 'tactidex-tactile-guided-dexterous-benchmark-2026'
      : 'tactidex',
    organizations: [
      { organizationId: 'shanghaitech-university', sourceLabels: ['ShanghaiTech University'] },
    ],
    evidenceUrls: ['https://arxiv.org/abs/2607.09190'],
    evidenceBoundary: 'The TactiDex source lists ShanghaiTech University as an author affiliation. This records contributor affiliation only, not institutional ownership, funding, endorsement, or exclusive development.',
    sourceReviewed: '2026-08-22',
  })),
  ...(['dataset', 'benchmark'] as const).map((fromType) => ({
    fromType,
    fromId: 'rct',
    organizations: rctAffiliations,
    evidenceUrls: ['https://arxiv.org/abs/2606.31694'],
    evidenceBoundary: 'The RCT source lists these organizations in its author affiliations. This records contributor affiliation only, not ownership of the dataset, funding, institutional endorsement, or exclusive project control.',
    sourceReviewed: '2026-08-22',
  })),
  ...(['dataset', 'benchmark'] as const).map((fromType) => ({
    fromType,
    fromId: 'vtdexmanip',
    organizations: [
      { organizationId: 'zhejiang-university', sourceLabels: ['Zhejiang University'] },
    ],
    evidenceUrls: ['https://openreview.net/forum?id=jf7C7EGw21'],
    evidenceBoundary: 'The VTDexManip source lists Zhejiang University as an author affiliation. This records contributor affiliation only, not institutional ownership, funding, endorsement, or exclusive project control.',
    sourceReviewed: '2026-08-22',
  })),
  {
    fromType: 'dataset',
    fromId: 'touch-and-go',
    organizations: [
      { organizationId: 'university-of-michigan', sourceLabels: ['University of Michigan'] },
    ],
    evidenceUrls: ['https://arxiv.org/abs/2211.12498'],
    evidenceBoundary: 'The Touch and Go source lists University of Michigan as an author affiliation. This records contributor affiliation only, not dataset ownership, funding, endorsement, or participation by the university as a whole.',
    sourceReviewed: '2026-08-22',
  },
  {
    fromType: 'sensor',
    fromId: 'gelslim-4',
    organizations: [
      { organizationId: 'university-of-michigan', sourceLabels: ['University of Michigan MMint Lab'] },
      { organizationId: 'mmint-lab', sourceLabels: ['University of Michigan MMint Lab'] },
    ],
    evidenceUrls: ['https://arxiv.org/abs/2409.19770'],
    evidenceBoundary: 'The GelSlim 4.0 source presents the compound University of Michigan MMint Lab affiliation. The two normalized links preserve that source label and do not imply that the lab and university are aliases, legal owners, or exclusive developers.',
    sourceReviewed: '2026-08-22',
  },
  {
    fromType: 'sensor',
    fromId: 'tactip',
    organizations: [
      { organizationId: 'university-of-bristol', sourceLabels: ['Bristol Robotics Laboratory / University of Bristol'] },
      { organizationId: 'bristol-robotics-laboratory', sourceLabels: ['Bristol Robotics Laboratory / University of Bristol'] },
    ],
    evidenceUrls: ['https://arxiv.org/abs/2105.14455'],
    evidenceBoundary: 'The TacTip source uses the combined Bristol Robotics Laboratory and University of Bristol affiliation. These links record that source context without making the lab a university alias or implying exclusive ownership, funding, or endorsement.',
    sourceReviewed: '2026-08-22',
  },
];

export const researchSourceAffiliationRelations: SourceAffiliationRelation[] =
  sourceAffiliationBatches.flatMap(expandSourceAffiliations);

export const researchOrganizationPartOfRelations: OrganizationPartOfRelation[] = [
  {
    relation: 'partOf',
    fromType: 'organization',
    fromId: 'lasr-lab',
    toType: 'organization',
    toId: 'tu-dresden',
    evidenceUrls: ['https://tu-dresden.de/ing/informatik/forschung?set_language=en'],
    sourceLabels: ['Learning, Adaptive Systems and Robotics (LASR) Lab', 'TU Dresden'],
    evidenceBoundary: 'TU Dresden identifies LASR as a lab led within its Faculty of Computer Science. This relation does not make the lab a university alias or imply ownership of every LASR-affiliated project.',
    sourceReviewed: '2026-08-22',
  },
  {
    relation: 'partOf',
    fromType: 'organization',
    fromId: 'mmint-lab',
    toType: 'organization',
    toId: 'university-of-michigan',
    evidenceUrls: ['https://www.mmintlab.com/people/nima-fazeli/'],
    sourceLabels: ['MMint Lab', 'University of Michigan'],
    evidenceBoundary: 'The MMint Lab director profile identifies Nima Fazeli as a University of Michigan faculty member who leads MMint Lab. This supports the lab-to-university research affiliation modeled here; it does not make the lab a university alias or separate legal entity.',
    sourceReviewed: '2026-08-22',
  },
];

export const researchDatasetUsageRelations: DatasetUsageRelation[] = [
  {
    relation: 'usesSensor',
    fromType: 'dataset',
    fromId: 'rct',
    toType: 'sensor',
    toId: 'digit',
    evidenceUrls: ['https://arxiv.org/abs/2606.31694'],
    sourceLabels: ['DIGIT vision-based tactile sensor'],
    evidenceBoundary: 'The RCT source reports data collected with three DIGIT sensors. This does not establish compatibility with every DIGIT revision, calibration, mounting geometry, or downstream task.',
    sourceReviewed: '2026-08-22',
  },
  {
    relation: 'usesSensor',
    fromType: 'dataset',
    fromId: 'sparsh-x',
    toType: 'sensor',
    toId: 'digit-360',
    evidenceUrls: ['https://arxiv.org/abs/2506.14754'],
    sourceLabels: ['Digit 360'],
    evidenceBoundary: 'The Sparsh-X source describes the associated multisensory resource using Digit 360. This does not establish equivalent results for other tactile sensors, hardware revisions, tasks, or data-collection protocols.',
    sourceReviewed: '2026-08-22',
  },
  {
    relation: 'usesSensor',
    fromType: 'dataset',
    fromId: 'tvl',
    toType: 'sensor',
    toId: 'digit',
    evidenceUrls: ['https://arxiv.org/abs/2402.13232'],
    sourceLabels: ['DIGIT'],
    evidenceBoundary: 'The TVL source reports DIGIT tactile images in the dataset. This relation does not imply that every subset, example, or downstream model uses the same sensor revision or collection configuration.',
    sourceReviewed: '2026-08-22',
  },
  {
    relation: 'usesSensor',
    fromType: 'dataset',
    fromId: 'softvtbench',
    toType: 'sensor',
    toId: 'gelsight-mini',
    evidenceUrls: ['https://arxiv.org/abs/2608.18701'],
    sourceLabels: ['simulated GelSight Mini sensors via TacEx'],
    evidenceBoundary: 'SoftVTBench renders simulated GelSight Mini observations through TacEx, Taxim, and FOTS in Isaac Sim. It does not use a physical GelSight Mini, perform benchmark-specific real-sensor calibration, or establish simulation-to-real transfer.',
    sourceReviewed: '2026-08-22',
  },
  {
    relation: 'usesRobot',
    fromType: 'dataset',
    fromId: 'softvtbench',
    toType: 'robot',
    toId: 'franka-emika-panda',
    evidenceUrls: ['https://arxiv.org/abs/2608.18701'],
    sourceLabels: ['Franka arm with Panda parallel-jaw gripper'],
    evidenceBoundary: 'SoftVTBench uses a Franka arm with a Panda parallel-jaw gripper inside Isaac Sim. This is a simulation-only embodiment relation, not a physical-robot evaluation, hardware compatibility claim, or sim-to-real validation.',
    sourceReviewed: '2026-08-22',
  },
];

export const researchEntityRelations: ResearchEntityRelation[] = [
  ...researchSourceAffiliationRelations,
  ...researchOrganizationPartOfRelations,
  ...researchDatasetUsageRelations,
];

const validDate = /^20\d{2}-\d{2}-\d{2}$/;
const organizationById = new Map(researchOrganizationEntries.map((entry) => [entry.id, entry]));
const paperById = new Map(researchIndexEntries
  .filter((entry) => entry.evidence !== 'documentation')
  .map((entry) => [entry.id, entry]));
const datasetById = new Map(tactileDatasetEntries.map((entry) => [entry.id, entry]));
const benchmarkById = new Map(tactileBenchmarkEntries.map((entry) => [entry.id, entry]));
const sensorById = new Map(tactileSensorEntries.map((entry) => [entry.id, entry]));
const robotById = new Map(researchRobotEntries.map((entry) => [entry.id, entry]));
const deferredConcurrentSources = new Set([
  'paper:softvtbench-deformation-aware-visuo-tactile-dataset-2026',
  'dataset:softvtbench',
  'benchmark:softvtbench',
]);

function primarySourceUrls(fromType: ResearchEntityRelation['fromType'], fromId: string) {
  switch (fromType) {
    case 'paper': {
      const entry = paperById.get(fromId);
      return entry ? new Set([entry.sourceUrl]) : undefined;
    }
    case 'dataset': {
      const entry = datasetById.get(fromId);
      return entry ? new Set([
        entry.paperUrl,
        entry.projectUrl,
        entry.githubUrl,
        entry.datasetUrl,
      ].filter((url): url is string => Boolean(url))) : undefined;
    }
    case 'benchmark': {
      const entry = benchmarkById.get(fromId);
      return entry ? new Set([
        entry.paperUrl,
        entry.projectUrl,
        entry.codeUrl,
      ].filter((url): url is string => Boolean(url))) : undefined;
    }
    case 'sensor': {
      const entry = sensorById.get(fromId);
      return entry ? new Set([
        entry.sourceUrl,
        entry.projectUrl,
        entry.codeUrl,
      ].filter((url): url is string => Boolean(url))) : undefined;
    }
    case 'organization': {
      const entry = organizationById.get(fromId);
      return entry ? new Set(entry.identitySources.map((source) => source.url)) : undefined;
    }
  }
}

const relationKeys = new Set<string>();
for (const relation of researchEntityRelations) {
  const key = `${relation.fromType}:${relation.fromId}|${relation.relation}|${relation.toType}:${relation.toId}`;
  if (relationKeys.has(key)) throw new Error(`Duplicate research-entity relation: ${key}`);
  relationKeys.add(key);

  if (!validDate.test(relation.sourceReviewed)) {
    throw new Error(`Research-entity relation ${key} has an invalid sourceReviewed date.`);
  }
  if (relation.evidenceUrls.length === 0 || relation.sourceLabels.length === 0) {
    throw new Error(`Research-entity relation ${key} lacks evidence URLs or source labels.`);
  }
  if (relation.evidenceBoundary.trim().length < 40) {
    throw new Error(`Research-entity relation ${key} lacks a meaningful evidence boundary.`);
  }
  for (const evidenceUrl of relation.evidenceUrls) {
    if (new URL(evidenceUrl).protocol !== 'https:') {
      throw new Error(`Research-entity relation ${key} uses a non-HTTPS evidence URL.`);
    }
  }

  if (relation.relation === 'sourceAffiliation') {
    if (!organizationById.has(relation.toId)) {
      throw new Error(`Source-affiliation relation ${key} references a missing organization.`);
    }
  } else if (relation.relation === 'partOf') {
    if (!organizationById.has(relation.fromId) || !organizationById.has(relation.toId)) {
      throw new Error(`Organization partOf relation ${key} references a missing organization.`);
    }
  } else if (relation.relation === 'usesSensor') {
    if (!sensorById.has(relation.toId)) {
      throw new Error(`Dataset usesSensor relation ${key} references a missing sensor.`);
    }
  } else if (!robotById.has(relation.toId)) {
    throw new Error(`Dataset usesRobot relation ${key} references a missing robot.`);
  }

  const sourceKey = `${relation.fromType}:${relation.fromId}`;
  const availablePrimarySources = primarySourceUrls(relation.fromType, relation.fromId);
  if (!availablePrimarySources) {
    if (deferredConcurrentSources.has(sourceKey)) continue;
    throw new Error(`Research-entity relation ${key} references a missing source entity.`);
  }
  for (const evidenceUrl of relation.evidenceUrls) {
    if (!availablePrimarySources.has(evidenceUrl)) {
      throw new Error(`Research-entity relation evidence ${evidenceUrl} is not a primary source for ${sourceKey}.`);
    }
  }
}
