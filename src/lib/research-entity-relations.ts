import { researchIndexEntries } from '@/lib/research-index';
import { robotAiModelEntries } from '@/lib/robot-ai-models';
import { roboticsDatasetEntries } from '@/lib/robotics-datasets';
import { researchOrganizationEntries } from '@/lib/research-organizations';
import { researchRobotEntries } from '@/lib/research-robots';
import { tactileBenchmarkEntries } from '@/lib/tactile-benchmarks';
import { tactileDatasetEntries } from '@/lib/tactile-datasets';
import { tactileSensorEntries } from '@/lib/tactile-sensors';

export const researchProvenanceRelationTypes = [
  'sourceAffiliation',
  'partOf',
  'manufacturedBy',
  'usesSensor',
  'usesRobot',
] as const;

export const researchSemanticRelationTypes = [
  'introduces',
  'describesDataset',
  'usesDataset',
  'trainedOn',
  'evaluatedBy',
] as const;

export const researchEntityRelationTypes = [
  ...researchProvenanceRelationTypes,
  ...researchSemanticRelationTypes,
] as const;

export type ResearchEntityRelationType = (typeof researchEntityRelationTypes)[number];
export type ResearchProvenanceRelationType = (typeof researchProvenanceRelationTypes)[number];
export type ResearchSemanticRelationType = (typeof researchSemanticRelationTypes)[number];
export type SourceAffiliationEntityType = 'paper' | 'dataset' | 'benchmark' | 'sensor';
export type DatasetUsageRelationType = 'usesSensor' | 'usesRobot';
export type ResearchRelationEntityType = 'paper' | 'dataset' | 'benchmark' | 'sensor' | 'model' | 'organization' | 'robot';

export type ResearchEntityRelationDefinition = {
  relation: ResearchEntityRelationType;
  fromTypes: ResearchRelationEntityType[];
  toTypes: ResearchRelationEntityType[];
  definition: string;
};

export const researchEntityRelationVocabulary: ResearchEntityRelationDefinition[] = [
  {
    relation: 'sourceAffiliation',
    fromTypes: ['paper', 'dataset', 'benchmark', 'sensor'],
    toTypes: ['organization'],
    definition: 'The reviewed primary source explicitly lists the target organization as an author or contributor affiliation for the source entity.',
  },
  {
    relation: 'partOf',
    fromTypes: ['organization'],
    toTypes: ['organization'],
    definition: 'An official organization source explicitly places the source organization inside the target organization.',
  },
  {
    relation: 'manufacturedBy',
    fromTypes: ['sensor', 'robot'],
    toTypes: ['organization'],
    definition: 'An official product, documentation, or provider source explicitly attributes the named hardware product or normalized platform family to the target organization; it does not establish performance, availability, certification, or ownership of third-party components.',
  },
  {
    relation: 'usesSensor',
    fromTypes: ['paper', 'dataset'],
    toTypes: ['sensor'],
    definition: 'The reviewed source explicitly names the target sensor in the paper experiment or dataset collection setup; simulation remains labeled in the evidence boundary.',
  },
  {
    relation: 'usesRobot',
    fromTypes: ['dataset'],
    toTypes: ['robot'],
    definition: 'The reviewed dataset source explicitly names the target robot or normalized embodiment in its collection setup.',
  },
  {
    relation: 'introduces',
    fromTypes: ['paper'],
    toTypes: ['model', 'dataset', 'benchmark'],
    definition: 'The paper explicitly presents the target model, dataset, or benchmark as a contribution of that work.',
  },
  {
    relation: 'describesDataset',
    fromTypes: ['paper'],
    toTypes: ['dataset'],
    definition: 'The paper explicitly describes the target data resource, while the reviewed evidence is not strong enough to claim a separately released or independently licensed dataset contribution.',
  },
  {
    relation: 'usesDataset',
    fromTypes: ['model'],
    toTypes: ['dataset'],
    definition: 'The reviewed model source explicitly uses the target dataset for training, validation, or evaluation without narrowing that use to training alone.',
  },
  {
    relation: 'trainedOn',
    fromTypes: ['model'],
    toTypes: ['dataset'],
    definition: 'The model primary source explicitly identifies the target dataset as part of its training mixture; this does not imply exclusive training or dataset ownership.',
  },
  {
    relation: 'evaluatedBy',
    fromTypes: ['model'],
    toTypes: ['benchmark'],
    definition: 'The model primary source explicitly reports evaluation through the target benchmark or benchmark suite.',
  },
];

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

export type ManufacturedByRelation = EvidenceFields & {
  relation: 'manufacturedBy';
  fromType: 'sensor' | 'robot';
  fromId: string;
  toType: 'organization';
  toId: string;
};

export type UsesSensorRelation = EvidenceFields & {
  relation: 'usesSensor';
  fromType: 'paper' | 'dataset';
  fromId: string;
  toType: 'sensor';
  toId: string;
};

export type UsesRobotRelation = EvidenceFields & {
  relation: 'usesRobot';
  fromType: 'dataset';
  fromId: string;
  toType: 'robot';
  toId: string;
};

export type DatasetUsageRelation = UsesSensorRelation | UsesRobotRelation;

export type IntroducesRelation = EvidenceFields & {
  relation: 'introduces';
  fromType: 'paper';
  fromId: string;
  toType: 'model' | 'dataset' | 'benchmark';
  toId: string;
};

export type UsesDatasetRelation = EvidenceFields & {
  relation: 'usesDataset';
  fromType: 'model';
  fromId: string;
  toType: 'dataset';
  toId: string;
};

export type DescribesDatasetRelation = EvidenceFields & {
  relation: 'describesDataset';
  fromType: 'paper';
  fromId: string;
  toType: 'dataset';
  toId: string;
};

export type TrainedOnRelation = EvidenceFields & {
  relation: 'trainedOn';
  fromType: 'model';
  fromId: string;
  toType: 'dataset';
  toId: string;
};

export type EvaluatedByRelation = EvidenceFields & {
  relation: 'evaluatedBy';
  fromType: 'model';
  fromId: string;
  toType: 'benchmark';
  toId: string;
};

export type ResearchSemanticRelation =
  | IntroducesRelation
  | DescribesDatasetRelation
  | UsesDatasetRelation
  | TrainedOnRelation
  | EvaluatedByRelation;

export type ResearchEntityRelation =
  | SourceAffiliationRelation
  | OrganizationPartOfRelation
  | ManufacturedByRelation
  | DatasetUsageRelation
  | ResearchSemanticRelation;

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
  {
    fromType: 'paper',
    fromId: 'adept-visuo-tactile-dexterity-rl-2026',
    organizations: [
      { organizationId: 'nvidia', sourceLabels: ['NVIDIA'] },
      { organizationId: 'university-of-michigan', sourceLabels: ['Michigan Robotics, University of Michigan'] },
    ],
    evidenceUrls: ['https://arxiv.org/abs/2608.19182'],
    evidenceBoundary: 'The ADEPT paper and official project page map the listed authors to NVIDIA and Michigan Robotics at the University of Michigan. These relations preserve source-listed affiliations only; they do not establish institutional ownership, funding, endorsement, exclusive development, or an MMint Lab project relationship.',
    sourceReviewed: '2026-08-22',
  },
  ...(['paper', 'dataset'] as const).map((fromType) => ({
    fromType,
    fromId: fromType === 'paper'
      ? 'prism-contact-rich-industrial-skill-dataset-2026'
      : 'prism-industrial-skill',
    organizations: [
      { organizationId: 'peking-university', sourceLabels: ['State Key Laboratory of General Artificial Intelligence, School of Intelligence Science and Technology, Peking University'] },
    ],
    evidenceUrls: ['https://arxiv.org/abs/2608.17962'],
    evidenceBoundary: 'The PRISM paper lists the State Key Laboratory and School of Intelligence Science and Technology at Peking University as one author affiliation. These links record that source-listed affiliation only; they do not establish university ownership, funding, endorsement, exclusive project control, or a complete contributor-organization roster.',
    sourceReviewed: '2026-08-22',
  })),
  {
    fromType: 'paper',
    fromId: 'missing-touch-spatial-tactile-feedback-teleoperation-2026',
    organizations: [
      { organizationId: 'northwestern-center-for-robotics-and-biosystems', sourceLabels: ['Center for Robotics and Biosystems, Northwestern University, Evanston, IL'] },
      { organizationId: 'northwestern-university', sourceLabels: ['Center for Robotics and Biosystems, Northwestern University, Evanston, IL'] },
    ],
    evidenceUrls: ['https://arxiv.org/abs/2608.19372'],
    evidenceBoundary: 'The Missing Touch source uses a compound Center for Robotics and Biosystems and Northwestern University author affiliation. The two normalized links preserve that wording without making the center a university alias or implying institutional ownership, funding, endorsement, or participation beyond the listed authors.',
    sourceReviewed: '2026-08-22',
  },
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
    evidenceUrls: ['https://arxiv.org/abs/2606.19161v2'],
    evidenceBoundary: 'The HT-Bench v2 preprint lists authors under these affiliations. This records only source-listed contributor affiliations; it does not establish institutional ownership, funding, endorsement, or participation by each organization as a whole.',
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
    fromId: 'anyskin',
    organizations: [
      { organizationId: 'new-york-university', sourceLabels: ['New York University'] },
      { organizationId: 'columbia-university', sourceLabels: ['Columbia University'] },
    ],
    evidenceUrls: ['https://arxiv.org/abs/2409.08276'],
    evidenceBoundary: 'The AnySkin paper lists New York University and Columbia University among its author affiliations. These two links are a currently normalized subset of the wider affiliation list and record contributor affiliation only; they do not establish institutional ownership, funding, endorsement, manufacturing, or exclusive development of AnySkin.',
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
  {
    fromType: 'sensor',
    fromId: 'insight',
    organizations: [
      { organizationId: 'max-planck-institute-for-intelligent-systems', sourceLabels: ['Max Planck Institute for Intelligent Systems'] },
    ],
    evidenceUrls: ['https://www.nature.com/articles/s42256-021-00439-3'],
    evidenceBoundary: 'The Insight paper lists the Max Planck Institute for Intelligent Systems in its author affiliations. This relation preserves source-listed affiliation only and does not establish institutional ownership, endorsement, commercialization, or performance beyond the reviewed paper.',
    sourceReviewed: '2026-08-22',
  },
  {
    fromType: 'sensor',
    fromId: 'allsight',
    organizations: [
      { organizationId: 'ben-gurion-university-of-the-negev', sourceLabels: ['Ben-Gurion University of the Negev'] },
    ],
    evidenceUrls: ['https://arxiv.org/abs/2307.02928'],
    evidenceBoundary: 'The AllSight paper lists Ben-Gurion University of the Negev as an author affiliation. This records contributor affiliation only and does not establish university ownership, endorsement, commercial availability, or performance outside the paper protocol.',
    sourceReviewed: '2026-08-22',
  },
  {
    fromType: 'sensor',
    fromId: '9dtact',
    organizations: [
      { organizationId: 'shanghai-qi-zhi-institute', sourceLabels: ['Shanghai Qi Zhi Institute'] },
    ],
    evidenceUrls: ['https://arxiv.org/abs/2308.14277'],
    evidenceBoundary: 'The 9DTact paper lists Shanghai Qi Zhi Institute among its author affiliations. This is one normalized link from a wider affiliation list and records contributor affiliation only; it does not establish institutional ownership, endorsement, or exclusive development of the sensor.',
    sourceReviewed: '2026-08-22',
  },
];

export const researchSourceAffiliationRelations: SourceAffiliationRelation[] =
  sourceAffiliationBatches.flatMap(expandSourceAffiliations);

export const researchManufacturingRelations: ManufacturedByRelation[] = [
  {
    relation: 'manufacturedBy',
    fromType: 'sensor',
    fromId: 'gelsight-mini',
    toType: 'organization',
    toId: 'gelsight',
    evidenceUrls: ['https://www.gelsight.com/wp-content/uploads/productsheet/Mini/GelSight_Datasheet_GSMini.pdf'],
    sourceLabels: ['GelSight Mini', 'GelSight'],
    evidenceBoundary: 'The official GelSight Mini datasheet identifies the named product and GelSight as its provider. This relation does not independently verify task performance, current stock, pricing, force accuracy, safety certification, or compatibility with every robot integration.',
    sourceReviewed: '2026-08-22',
  },
  {
    relation: 'manufacturedBy',
    fromType: 'sensor',
    fromId: 'biotac',
    toType: 'organization',
    toId: 'syntouch',
    evidenceUrls: ['https://www.sec.gov/Archives/edgar/data/1728560/000172856021000002/SynTouchFormC-AR-2021-04-30.pdf'],
    sourceLabels: ['BioTac', 'SynTouch'],
    evidenceBoundary: 'The company-filed 2021 SEC annual report identifies SynTouch, Inc. and describes BioTac tactile sensors among its products. This historical attribution does not transfer specifications across revisions or establish current availability, pricing, support, calibrated force accuracy, or compatibility with every robot hand.',
    sourceReviewed: '2026-08-22',
  },
  {
    relation: 'manufacturedBy',
    fromType: 'sensor',
    fromId: 'uskin',
    toType: 'organization',
    toId: 'xela-robotics',
    evidenceUrls: ['https://xelarobotics.com/wp-content/uploads/2025/12/XELA-Robotics-Product-Catalog-2025-EN.pdf'],
    sourceLabels: ['uSkin sensor family', 'XELA Robotics'],
    evidenceBoundary: 'The official XELA Robotics catalog attributes the uSkin product family to XELA Robotics. This relation does not apply one module\'s taxel count, range, rate, dimensions, availability, or integration support to every uSkin configuration.',
    sourceReviewed: '2026-08-22',
  },
  {
    relation: 'manufacturedBy',
    fromType: 'robot',
    fromId: 'apptronik-apollo-2',
    toType: 'organization',
    toId: 'apptronik',
    evidenceUrls: ['https://apptronik.com/apollo/apollo-2'],
    sourceLabels: ['Apptronik Apollo 2', 'Apptronik'],
    evidenceBoundary: 'The official Apollo 2 page identifies Apptronik as the provider of the named platform. This relation does not verify every configuration, hand option, customer deployment, task result, safety claim, price, delivery date, or commercial availability.',
    sourceReviewed: '2026-08-22',
  },
  {
    relation: 'manufacturedBy',
    fromType: 'robot',
    fromId: 'unitree-g1',
    toType: 'organization',
    toId: 'unitree-robotics',
    evidenceUrls: ['https://www.unitree.com/g1/'],
    sourceLabels: ['Unitree G1', 'Unitree Robotics'],
    evidenceBoundary: 'The official G1 page attributes the G1 platform to Unitree. This relation does not make configuration-dependent specifications universal or imply that third-party tactile hardware, research results, certifications, pricing, or availability apply to every G1 variant.',
    sourceReviewed: '2026-08-22',
  },
  {
    relation: 'manufacturedBy',
    fromType: 'robot',
    fromId: 'fourier-gr-1',
    toType: 'organization',
    toId: 'fourier-intelligence',
    evidenceUrls: ['https://www.fftai.com/products-gr1'],
    sourceLabels: ['Fourier GR-1', 'Fourier Intelligence'],
    evidenceBoundary: 'The official GR-1 product page attributes the GR-1 platform to Fourier Intelligence. This relation does not verify third-party model results, exact research hand configurations, deployment scale, pricing, certifications, or availability in every market.',
    sourceReviewed: '2026-08-22',
  },
  {
    relation: 'manufacturedBy',
    fromType: 'robot',
    fromId: '1x-humanoid-family',
    toType: 'organization',
    toId: '1x',
    evidenceUrls: ['https://www.1x.tech/about'],
    sourceLabels: ['1X humanoid platform family', '1X'],
    evidenceBoundary: 'The official 1X history page establishes that 1X develops named humanoid platforms. This family-level relation deliberately does not resolve an unspecified research embodiment to NEO, EVE, a revision, customer deployment, commercial configuration, or performance result.',
    sourceReviewed: '2026-08-22',
  },
  {
    relation: 'manufacturedBy',
    fromType: 'robot',
    fromId: 'franka-emika-panda',
    toType: 'organization',
    toId: 'franka-robotics',
    evidenceUrls: ['https://download.franka.de/End-of-Life-Franka-Emika-Robot_EN.pdf'],
    sourceLabels: ['Franka Emika Panda', 'Franka Robotics'],
    evidenceBoundary: 'Official Franka documentation identifies the older research robot as the Franka Emika Robot or Panda. This relation does not conflate Panda with Franka Research 3 or verify third-party accessories, experiment results, pricing, support status, or present availability.',
    sourceReviewed: '2026-08-22',
  },
  {
    relation: 'manufacturedBy',
    fromType: 'robot',
    fromId: 'universal-robots-ur5e',
    toType: 'organization',
    toId: 'universal-robots',
    evidenceUrls: ['https://www.universal-robots.com/manuals/latest/en/datasheets/ur5e/'],
    sourceLabels: ['Universal Robots UR5e', 'Universal Robots'],
    evidenceBoundary: 'The official UR5e datasheet attributes the UR5e platform to Universal Robots. This relation does not transfer UR5e specifications to legacy UR5 systems or independently verify third-party model performance, end-effectors, certifications, price, or availability.',
    sourceReviewed: '2026-08-22',
  },
  {
    relation: 'manufacturedBy',
    fromType: 'robot',
    fromId: 'universal-robots-ur5',
    toType: 'organization',
    toId: 'universal-robots',
    evidenceUrls: ['https://www.universal-robots.com/media/1828033/ur5_tech_spec_web_en.pdf'],
    sourceLabels: ['Universal Robots UR5', 'Universal Robots'],
    evidenceBoundary: 'The official legacy UR5 technical specification attributes the UR5 platform to Universal Robots. This relation does not make UR5 and UR5e interchangeable or verify a controller revision, third-party accessories, research results, support status, price, or current availability.',
    sourceReviewed: '2026-08-22',
  },
  {
    relation: 'manufacturedBy',
    fromType: 'robot',
    fromId: 'trossen-viperx-family',
    toType: 'organization',
    toId: 'trossen-robotics',
    evidenceUrls: ['https://docs.trossenrobotics.com/interbotix_xsarms_docs/'],
    sourceLabels: ['Trossen ViperX arm family', 'Trossen Robotics'],
    evidenceBoundary: 'Official Interbotix X-Series documentation published by Trossen Robotics covers the ViperX arm family. This family-level relation does not resolve an unspecified experiment to one product code or verify third-party configurations, task results, pricing, support, or availability.',
    sourceReviewed: '2026-08-22',
  },
  {
    relation: 'manufacturedBy',
    fromType: 'robot',
    fromId: 'trossen-widowx-250-6dof',
    toType: 'organization',
    toId: 'trossen-robotics',
    evidenceUrls: ['https://docs.trossenrobotics.com/interbotix_xsarms_docs/specifications/wx250s.html'],
    sourceLabels: ['Trossen WidowX-250 6DOF', 'Trossen Robotics'],
    evidenceBoundary: 'Official Trossen Robotics documentation identifies the WidowX-250 6DOF platform. This relation does not imply equivalence with other WidowX variants or verify third-party cameras, grippers, dataset results, model transfer, price, support, or availability.',
    sourceReviewed: '2026-08-22',
  },
];

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
    relation: 'usesRobot',
    fromType: 'dataset',
    fromId: 'droid',
    toType: 'robot',
    toId: 'franka-emika-panda',
    evidenceUrls: ['https://arxiv.org/abs/2403.12945v2'],
    sourceLabels: ['Franka Emika Panda 7-DoF arm with Robotiq 2F-85 gripper'],
    evidenceBoundary: 'DROID was collected on standardized physical platforms built around a Franka Emika Panda arm. The robot entity represents the arm only; the complete collection platform also includes the named Robotiq gripper, three ZED stereo cameras, control stack, portable desk, and Quest 2 teleoperation interface.',
    sourceReviewed: '2026-08-22',
  },
  {
    relation: 'usesRobot',
    fromType: 'dataset',
    fromId: 'bridgedata-v2',
    toType: 'robot',
    toId: 'trossen-widowx-250-6dof',
    evidenceUrls: ['https://arxiv.org/abs/2308.12952v3'],
    sourceLabels: ['WidowX 250 6DOF robot arm'],
    evidenceBoundary: 'BridgeData V2 uses a physical WidowX 250 6DOF arm for the reported collection. This relation does not imply that every trajectory contains every optional camera or depth stream, that other WidowX variants are equivalent, or that policies trained on BridgeData V2 transfer without target-system evaluation.',
    sourceReviewed: '2026-08-22',
  },
  {
    relation: 'usesRobot',
    fromType: 'dataset',
    fromId: 'prism-industrial-skill',
    toType: 'robot',
    toId: 'franka-emika-panda',
    evidenceUrls: ['https://arxiv.org/abs/2608.17962'],
    sourceLabels: ['two Franka Emika Panda arms'],
    evidenceBoundary: 'The PRISM tracker-based collection platform uses two physical Franka Emika Panda arms. This relation covers that named platform only; it does not imply that every PRISM episode uses Franka, that tactile data covers every Franka trajectory, or that policies transfer across PRISM’s Realman and LEJU configurations.',
    sourceReviewed: '2026-08-22',
  },
  {
    relation: 'usesRobot',
    fromType: 'dataset',
    fromId: 'robotacdex',
    toType: 'robot',
    toId: 'unitree-g1',
    evidenceUrls: ['https://arxiv.org/abs/2606.31836'],
    sourceLabels: ['Unitree G1 humanoid with dual BrainCo Revo2 Tactile dexterous hands'],
    evidenceBoundary: 'RoboTacDex was collected on one physical Unitree G1 whose lower limbs and waist remained fixed while dual arms totaling 14 DoF and two BrainCo Revo2 Tactile hands totaling 12 hand DoF as counted by the paper performed upper-body tasks. This relation does not imply whole-body locomotion data, compatibility with other G1 configurations, or transfer to another humanoid or hand.',
    sourceReviewed: '2026-08-22',
  },
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

export const researchPaperSensorRelations: UsesSensorRelation[] = [
  {
    relation: 'usesSensor',
    fromType: 'paper',
    fromId: 'missing-touch-spatial-tactile-feedback-teleoperation-2026',
    toType: 'sensor',
    toId: 'gelsight-mini',
    evidenceUrls: ['https://arxiv.org/abs/2608.19372'],
    sourceLabels: ['GelSight Mini'],
    evidenceBoundary: 'The study used a physical GelSight Mini as the robot-side “finger” in a custom 2-DoF bilateral teleoperation system. The relation does not transfer the paper’s task results to other GelSight Mini integrations, establish generic force or slip accuracy, or imply that the study code, calibration, or trajectory data were released.',
    sourceReviewed: '2026-08-22',
  },
  {
    relation: 'usesSensor',
    fromType: 'paper',
    fromId: 'genforce-transferable-force-sensing-2026',
    toType: 'sensor',
    toId: 'tactip',
    evidenceUrls: ['https://www.nature.com/articles/s41467-026-68753-1'],
    sourceLabels: ['TacTip'],
    evidenceBoundary: 'The GenForce study evaluates its transfer framework with a study-specific TacTip configuration. TacTip is a sensor family whose geometry, camera, skin, markers, and calibration vary by version, so this edge does not establish equivalent performance, compatibility, or calibration transfer for every TacTip implementation.',
    sourceReviewed: '2026-08-22',
  },
  {
    relation: 'usesSensor',
    fromType: 'paper',
    fromId: 'genforce-transferable-force-sensing-2026',
    toType: 'sensor',
    toId: 'uskin',
    evidenceUrls: ['https://www.nature.com/articles/s41467-026-68753-1'],
    sourceLabels: ['uSkin'],
    evidenceBoundary: 'The GenForce study uses specific uSkin array configurations in its heterogeneous transfer and manipulation experiments. The relation does not extend the reported accuracy to every uSkin model, taxel layout, mounting geometry, magnetic environment, material, calibration, or commercial deployment.',
    sourceReviewed: '2026-08-22',
  },
];

export const researchSemanticRelations: ResearchSemanticRelation[] = [
  {
    relation: 'trainedOn',
    fromType: 'model',
    fromId: 'openvla-7b',
    toType: 'dataset',
    toId: 'open-x-embodiment',
    evidenceUrls: ['https://arxiv.org/abs/2406.09246'],
    sourceLabels: ['970k robot manipulation trajectories from the Open X-Embodiment dataset'],
    evidenceBoundary: 'The OpenVLA paper identifies its 970,000-trajectory training corpus as an Open X-Embodiment mixture. That model-specific snapshot differs from the aggregation’s own current headline count and does not imply that every Open X constituent dataset, modality, embodiment, or later revision has equal training weight.',
    sourceReviewed: '2026-08-22',
  },
  {
    relation: 'trainedOn',
    fromType: 'model',
    fromId: 'openvla-7b',
    toType: 'dataset',
    toId: 'bridgedata-v2',
    evidenceUrls: ['https://arxiv.org/abs/2406.09246'],
    sourceLabels: ['Bridge training bucket citing Bridge V1 and BridgeData V2'],
    evidenceBoundary: 'OpenVLA’s appendix assigns 13.3% to a combined Bridge bucket that cites both Bridge V1 and BridgeData V2. This edge records explicit inclusion of BridgeData V2 but does not assign the full 13.3% to V2 alone or equate the later 17-task physical evaluation suite with a fixed dataset benchmark.',
    sourceReviewed: '2026-08-22',
  },
  {
    relation: 'trainedOn',
    fromType: 'model',
    fromId: 'openvla-7b',
    toType: 'dataset',
    toId: 'droid',
    evidenceUrls: ['https://arxiv.org/abs/2406.09246'],
    sourceLabels: ['DROID at 10.0% before removal during the final third of training'],
    evidenceBoundary: 'DROID appears at 10% in the published OpenVLA mixture and is explicitly removed for the final third of training. This edge therefore records partial-stage training use, not a constant 10% contribution throughout training; the separate 70-demonstration Franka-DROID adaptation is not the full DROID corpus.',
    sourceReviewed: '2026-08-22',
  },
  {
    relation: 'trainedOn',
    fromType: 'model',
    fromId: 'octo',
    toType: 'dataset',
    toId: 'open-x-embodiment',
    evidenceUrls: ['https://arxiv.org/abs/2405.12213'],
    sourceLabels: ['800k trajectories from 25 Open X-Embodiment datasets'],
    evidenceBoundary: 'Octo’s pretraining uses 800,000 trajectories from a 25-dataset Open X-Embodiment subset. This is a model-specific snapshot, not the complete evolving aggregation, and it does not establish uniform weighting, sensor coverage, or performance across all source embodiments.',
    sourceReviewed: '2026-08-22',
  },
  {
    relation: 'trainedOn',
    fromType: 'model',
    fromId: 'octo',
    toType: 'dataset',
    toId: 'bridgedata-v2',
    evidenceUrls: ['https://arxiv.org/abs/2405.12213'],
    sourceLabels: ['Bridge training bucket citing Bridge Data and BridgeData V2'],
    evidenceBoundary: 'Octo’s appendix assigns 17% to a combined Bridge bucket that cites Bridge V1 and BridgeData V2. This proves BridgeData V2 is represented but does not disclose a V2-only weight or allow the full 17% to be attributed to V2.',
    sourceReviewed: '2026-08-22',
  },
  {
    relation: 'trainedOn',
    fromType: 'model',
    fromId: 'pi0',
    toType: 'dataset',
    toId: 'open-x-embodiment',
    evidenceUrls: ['https://www.pi.website/download/pi0.pdf'],
    sourceLabels: ['OXE Magic Soup subset within the 9.1% open-source pretraining mixture'],
    evidenceBoundary: 'The detailed π0 training-mixture section identifies an Open X-Embodiment subset, not necessarily the entire aggregation. Open X-Embodiment, BridgeData V2, and DROID together receive 9.1% of the mixture, but the report does not disclose their individual weights; another 903 million steps come from proprietary data.',
    sourceReviewed: '2026-08-22',
  },
  {
    relation: 'trainedOn',
    fromType: 'model',
    fromId: 'pi0',
    toType: 'dataset',
    toId: 'bridgedata-v2',
    evidenceUrls: ['https://www.pi.website/download/pi0.pdf'],
    sourceLabels: ['BridgeData V2 within the 9.1% open-source pretraining mixture'],
    evidenceBoundary: 'The π0 report explicitly names BridgeData V2 as one of three open-source pretraining sources whose combined mixture weight is 9.1%. It does not disclose a BridgeData V2-only weight, and later task-specific post-training data must not be merged into this base-pretraining relation.',
    sourceReviewed: '2026-08-22',
  },
  {
    relation: 'trainedOn',
    fromType: 'model',
    fromId: 'pi0',
    toType: 'dataset',
    toId: 'droid',
    evidenceUrls: ['https://www.pi.website/download/pi0.pdf'],
    sourceLabels: ['DROID within the 9.1% open-source pretraining mixture'],
    evidenceBoundary: 'The π0 report explicitly names DROID as one of three open-source pretraining sources whose combined mixture weight is 9.1%. It does not disclose a DROID-only weight, and later OpenPI DROID recipes or checkpoints do not retroactively redefine the original π0 training mixture.',
    sourceReviewed: '2026-08-22',
  },
  {
    relation: 'introduces',
    fromType: 'paper',
    fromId: 'tac4loco-plantar-tactile-humanoid-locomotion-2026',
    toType: 'model',
    toId: 'tac4loco',
    evidenceUrls: ['https://arxiv.org/abs/2608.15766'],
    sourceLabels: ['Tac4Loco tactile-perceptive humanoid locomotion framework'],
    evidenceBoundary: 'The preprint introduces Tac4Loco as a named learned locomotion framework. The relation does not turn source-reported simulation or physical results into an independent benchmark, and it preserves the distinction between simulation training and deployment on one physical Unitree G1 with research-team pressure insoles.',
    sourceReviewed: '2026-08-22',
  },
  {
    relation: 'introduces',
    fromType: 'paper',
    fromId: 'adept-visuo-tactile-dexterity-rl-2026',
    toType: 'model',
    toId: 'adept',
    evidenceUrls: ['https://arxiv.org/abs/2608.19182'],
    sourceLabels: ['ADEPT: Accelerating Dexterity via Pre-Training and Post-Training using Reinforcement Learning'],
    evidenceBoundary: 'The preprint introduces ADEPT as an embodiment-specific reinforcement-learning framework and policy recipe. It is not a foundation model or VLA, each downstream task and embodiment is trained independently, and the relation does not imply public code, model weights, a released dataset, cross-robot transfer, or independently validated performance.',
    sourceReviewed: '2026-08-22',
  },
  {
    relation: 'introduces',
    fromType: 'paper',
    fromId: 'prism-contact-rich-industrial-skill-dataset-2026',
    toType: 'dataset',
    toId: 'prism-industrial-skill',
    evidenceUrls: ['https://arxiv.org/abs/2608.17962'],
    sourceLabels: ['PRISM: Precision and contact-rich Real-world Industrial Skill dataset with Multimodal sensing'],
    evidenceBoundary: 'The paper introduces the named PRISM dataset, but tactile sensing covers only an unspecified subset of episodes and the reported approximately 27 million images combine visual and visuotactile streams. The abstract says open-sourced while the official project currently marks the dataset as “soon”; this relation identifies the research artifact and does not promise downloadable files, an open dataset license, or independent benchmark results.',
    sourceReviewed: '2026-08-22',
  },
  {
    relation: 'introduces',
    fromType: 'paper',
    fromId: 'softvtbench-deformation-aware-visuo-tactile-dataset-2026',
    toType: 'dataset',
    toId: 'softvtbench',
    evidenceUrls: ['https://arxiv.org/abs/2608.18701'],
    sourceLabels: ['SoftVTBench deformation-aware visuo-tactile dataset'],
    evidenceBoundary: 'The paper introduces the named SoftVTBench dataset, but all robot, tactile, object, and FEM signals in this resource are simulated. The latest paper and current Hugging Face card describe 4,000 demonstrations, while an older official GitHub README still lists 1,628; the relation is stable, but dataset scale must be tied to a reviewed release revision and does not establish physical-sensor or simulation-to-real performance.',
    sourceReviewed: '2026-08-22',
  },
  {
    relation: 'introduces',
    fromType: 'paper',
    fromId: 'softvtbench-deformation-aware-visuo-tactile-dataset-2026',
    toType: 'benchmark',
    toId: 'softvtbench',
    evidenceUrls: ['https://arxiv.org/abs/2608.18701'],
    sourceLabels: ['SoftVTBench deformation-aware visuo-tactile benchmark'],
    evidenceBoundary: 'The paper establishes the SoftVTBench closed-loop benchmark and its Deformation-aware Success Rate using object-specific FEM calibration. The benchmark is simulation-only, and DSR is an author-defined research metric rather than a universal damage measure, industry standard, safety certification, or physical-robot validation.',
    sourceReviewed: '2026-08-22',
  },
  {
    relation: 'describesDataset',
    fromType: 'paper',
    fromId: 'ht-bench-full-hand-tactile-representations-2026',
    toType: 'dataset',
    toId: 'ht-bench',
    evidenceUrls: ['https://arxiv.org/abs/2606.19161v2'],
    sourceLabels: ['HT-Bench full-hand tactile dataset'],
    evidenceBoundary: 'The v2 preprint explicitly describes the synchronized data underlying HT-Bench and defines its splits, but HT-Bench is primarily a constructed benchmark combining existing open-source data with newly collected sequences. The authors say they will release data, protocols, weights, and scripts; no separate downloadable package, file release, or artifact license was verified on 2026-08-22, so this edge must not imply an already released HT-Bench data product.',
    sourceReviewed: '2026-08-22',
  },
  {
    relation: 'introduces',
    fromType: 'paper',
    fromId: 'ht-bench-full-hand-tactile-representations-2026',
    toType: 'benchmark',
    toId: 'ht-bench',
    evidenceUrls: ['https://arxiv.org/abs/2606.19161v2'],
    sourceLabels: ['HT-Bench full-hand tactile representation benchmark'],
    evidenceBoundary: 'The v2 preprint introduces HT-Bench as a four-track representation-learning benchmark for one reported egocentric/full-hand tactile sensing pipeline, then adds four downstream real-robot tasks with 15 trials per method and task. It does not cover fingertip optical tactile sensors, force/torque sensors, skin-like taxel arrays, or non-hand embodiments. The 68.3% HandTouch mean versus the strongest baseline mean of 50.0% is source-reported without confidence intervals or significance testing and must not be generalized into a universal cross-sensor or cross-robot claim.',
    sourceReviewed: '2026-08-22',
  },
  {
    relation: 'introduces',
    fromType: 'paper',
    fromId: 'tactidex-tactile-guided-dexterous-benchmark-2026',
    toType: 'dataset',
    toId: 'tactidex',
    evidenceUrls: ['https://arxiv.org/abs/2607.09190'],
    sourceLabels: ['TactiDex synchronized human hand-object interaction data'],
    evidenceBoundary: 'The paper introduces the TactiDex tactile-rich hand-object interaction dataset and documents synchronized tactile, kinematic, and object-state signals. No separate public dataset download URL or dataset-file license was verified, so the relation records the described research artifact and does not promise public access or unrestricted reuse.',
    sourceReviewed: '2026-08-22',
  },
  {
    relation: 'introduces',
    fromType: 'paper',
    fromId: 'tactidex-tactile-guided-dexterous-benchmark-2026',
    toType: 'benchmark',
    toId: 'tactidex',
    evidenceUrls: ['https://arxiv.org/abs/2607.09190'],
    sourceLabels: ['TactiDex tactile-guided dexterous manipulation benchmark'],
    evidenceBoundary: 'The preprint introduces TactiDex and its contact-aware evaluation protocol for the authors’ human-capture and robot-deployment setup. Its human-likeness, contact fidelity, force alignment, and physical-realism conclusions are protocol-specific and do not establish a universal dexterity benchmark or cross-hardware standard.',
    sourceReviewed: '2026-08-22',
  },
  {
    relation: 'introduces',
    fromType: 'paper',
    fromId: 'freetacman-robot-free-visuotactile-data-collection-2025',
    toType: 'dataset',
    toId: 'freetacman',
    evidenceUrls: ['https://arxiv.org/abs/2506.01941'],
    sourceLabels: ['FreeTacMan robot-free visuo-tactile data collection'],
    evidenceBoundary: 'This relation relies on the current arXiv v4 and associated official release, which describe and open-source the large-scale FreeTacMan dataset. The original v1 stated that a large-scale dataset had not yet been released, so counts, files, and license claims must remain tied to the reviewed current version.',
    sourceReviewed: '2026-08-22',
  },
  {
    relation: 'describesDataset',
    fromType: 'paper',
    fromId: 'sparsh-x-multisensory-touch-representations-2025',
    toType: 'dataset',
    toId: 'sparsh-x',
    evidenceUrls: ['https://arxiv.org/html/2506.14754v1'],
    sourceLabels: ['Sparsh-X multisensory touch resource'],
    evidenceBoundary: 'The paper documents the approximately one-million-interaction Digit 360 training and benchmarking resource represented by RoboSkin’s normalized dataset:sparsh-x entity. In the primary source, Sparsh-X is principally the model or backbone name, not a clearly named standalone dataset product, and no dedicated public dataset URL, file format, or dataset license was verified.',
    sourceReviewed: '2026-08-22',
  },
  {
    relation: 'introduces',
    fromType: 'paper',
    fromId: 'humanoid-visual-tactile-action-dataset-2025',
    toType: 'dataset',
    toId: 'humanoid-vta',
    evidenceUrls: ['https://arxiv.org/html/2510.25725v2'],
    sourceLabels: ['humanoid visual-tactile-action dataset'],
    evidenceBoundary: 'The paper introduces a 101.9K-sample visual-tactile-action dataset collected with one unnamed humanoid setup, two soft-object categories, four pressure conditions, and three operators. No official data download, code repository, project page, or dataset-file license was verified; the arXiv article license must not be treated as a license for unpublished dataset files.',
    sourceReviewed: '2026-08-22',
  },
  {
    relation: 'introduces',
    fromType: 'paper',
    fromId: 'robotacdex-humanoid-visual-tactile-action-dataset-2026',
    toType: 'dataset',
    toId: 'robotacdex',
    evidenceUrls: ['https://arxiv.org/abs/2606.31836'],
    sourceLabels: ['RoboTacDex dexterous visual-tactile-action dataset for humanoid manipulation'],
    evidenceBoundary: 'The v1 preprint introduces RoboTacDex as more than 6,000 physical Unitree G1 upper-body trajectories totaling approximately 25 hours. The paper says the dataset will be open-sourced soon, so this relation identifies the described research artifact but does not promise current file access, a public package format, an open dataset license, whole-body locomotion data, or cross-humanoid transfer.',
    sourceReviewed: '2026-08-22',
  },
  {
    relation: 'introduces',
    fromType: 'paper',
    fromId: 'dream-tac-tactile-world-action-model-2026',
    toType: 'model',
    toId: 'dream-tac',
    evidenceUrls: ['https://arxiv.org/html/2606.08737v1'],
    sourceLabels: ['Dream-Tac unified tactile world action model'],
    evidenceBoundary: 'The preprint introduces the named Dream-Tac model architecture. This relation identifies the research model only; the reported task accuracy and efficiency remain author-reported results from the paper’s six-task setup and do not establish peer-reviewed performance, arbitrary tactile-sensor transfer, production readiness, or general robot compatibility.',
    sourceReviewed: '2026-08-22',
  },
  {
    relation: 'evaluatedBy',
    fromType: 'model',
    fromId: 'sparsh',
    toType: 'benchmark',
    toId: 'tacbench',
    evidenceUrls: ['https://arxiv.org/abs/2410.24090', 'https://sparsh-ssl.github.io/'],
    sourceLabels: ['Sparsh evaluated through six TacBench tasks'],
    evidenceBoundary: 'The source evaluates the Sparsh model family on the six-task TacBench suite. TacBench combines heterogeneous sensors, tasks, metrics, and labeled-data budgets, so the paper’s reported average improvement is an author-defined aggregation rather than one universal score; the relation does not prove equivalent performance for every Sparsh variant, downstream fork, tactile sensor, robot skin, or manipulation system.',
    sourceReviewed: '2026-08-22',
  },
];

export const researchProvenanceRelations: ResearchEntityRelation[] = [
  ...researchSourceAffiliationRelations,
  ...researchOrganizationPartOfRelations,
  ...researchManufacturingRelations,
  ...researchDatasetUsageRelations,
  ...researchPaperSensorRelations,
];

export const researchEntityRelations: ResearchEntityRelation[] = [
  ...researchProvenanceRelations,
  ...researchSemanticRelations,
];

const validDate = /^20\d{2}-\d{2}-\d{2}$/;
const organizationById = new Map(researchOrganizationEntries.map((entry) => [entry.id, entry]));
const paperById = new Map(researchIndexEntries
  .filter((entry) => entry.evidence !== 'documentation')
  .map((entry) => [entry.id, entry]));
const datasetById = new Map(
  [...tactileDatasetEntries, ...roboticsDatasetEntries].map((entry) => [entry.id, entry]),
);
const benchmarkById = new Map(tactileBenchmarkEntries.map((entry) => [entry.id, entry]));
const sensorById = new Map(tactileSensorEntries.map((entry) => [entry.id, entry]));
const modelById = new Map(robotAiModelEntries.map((entry) => [entry.id, entry]));
const robotById = new Map(researchRobotEntries.map((entry) => [entry.id, entry]));
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
        entry.manufacturerEvidenceUrl,
      ].filter((url): url is string => Boolean(url))) : undefined;
    }
    case 'model': {
      const entry = modelById.get(fromId);
      return entry ? new Set(entry.primarySources.map((source) => source.url)) : undefined;
    }
    case 'organization': {
      const entry = organizationById.get(fromId);
      return entry ? new Set(entry.identitySources.map((source) => source.url)) : undefined;
    }
    case 'robot': {
      const entry = robotById.get(fromId);
      return entry ? new Set(entry.identitySources.map((source) => source.url)) : undefined;
    }
  }
}

function researchEntityExists(type: ResearchRelationEntityType, id: string) {
  switch (type) {
    case 'paper': return paperById.has(id);
    case 'dataset': return datasetById.has(id);
    case 'benchmark': return benchmarkById.has(id);
    case 'sensor': return sensorById.has(id);
    case 'model': return modelById.has(id);
    case 'organization': return organizationById.has(id);
    case 'robot': return robotById.has(id);
  }
}

const relationVocabularyTypes = researchEntityRelationVocabulary.map((entry) => entry.relation);
if (
  new Set(relationVocabularyTypes).size !== researchEntityRelationTypes.length
  || researchEntityRelationTypes.some((relation) => !relationVocabularyTypes.includes(relation))
) {
  throw new Error('Research-entity relation vocabulary does not exactly cover the supported relation enum.');
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
  } else if (relation.relation === 'manufacturedBy') {
    if (!['sensor', 'robot'].includes(relation.fromType) || !organizationById.has(relation.toId)) {
      throw new Error(`manufacturedBy relation ${key} references a missing or unsupported endpoint.`);
    }
  } else if (relation.relation === 'usesSensor') {
    if (!['paper', 'dataset'].includes(relation.fromType) || !sensorById.has(relation.toId)) {
      throw new Error(`usesSensor relation ${key} references a missing or unsupported endpoint.`);
    }
  } else if (relation.relation === 'usesRobot') {
    if (!robotById.has(relation.toId)) {
      throw new Error(`Dataset usesRobot relation ${key} references a missing robot.`);
    }
  } else if (relation.relation === 'introduces') {
    if (!['model', 'dataset', 'benchmark'].includes(relation.toType) || !researchEntityExists(relation.toType, relation.toId)) {
      throw new Error(`Paper introduces relation ${key} references a missing or unsupported target entity.`);
    }
  } else if (relation.relation === 'describesDataset') {
    if (!datasetById.has(relation.toId)) {
      throw new Error(`Paper describesDataset relation ${key} references a missing dataset.`);
    }
  } else if (relation.relation === 'usesDataset') {
    if (!modelById.has(relation.fromId) || !datasetById.has(relation.toId)) {
      throw new Error(`Research usesDataset relation ${key} references a missing or unsupported endpoint.`);
    }
  } else if (relation.relation === 'trainedOn') {
    if (!modelById.has(relation.fromId) || !datasetById.has(relation.toId)) {
      throw new Error(`Model trainedOn relation ${key} references a missing model or dataset.`);
    }
  } else if (!modelById.has(relation.fromId) || !benchmarkById.has(relation.toId)) {
    throw new Error(`Model evaluatedBy relation ${key} references a missing model or benchmark.`);
  }

  const vocabulary = researchEntityRelationVocabulary.find((entry) => entry.relation === relation.relation);
  if (!vocabulary?.fromTypes.includes(relation.fromType) || !vocabulary.toTypes.includes(relation.toType)) {
    throw new Error(`Research-entity relation ${key} violates its declared endpoint vocabulary.`);
  }

  const sourceKey = `${relation.fromType}:${relation.fromId}`;
  const availablePrimarySources = primarySourceUrls(relation.fromType, relation.fromId);
  if (!availablePrimarySources) {
    throw new Error(`Research-entity relation ${key} references a missing source entity.`);
  }
  for (const evidenceUrl of relation.evidenceUrls) {
    if (!availablePrimarySources.has(evidenceUrl)) {
      throw new Error(`Research-entity relation evidence ${evidenceUrl} is not a primary source for ${sourceKey}.`);
    }
  }
}
