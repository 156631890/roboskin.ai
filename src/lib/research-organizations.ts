import { robotAiModelEntries } from '@/lib/robot-ai-models';

export const researchOrganizationKinds = ['university', 'research lab', 'company'] as const;

export const organizationModelRelationTypes = [
  'developedBy',
  'coDevelopedBy',
  'contributedBy',
] as const;

export type ResearchOrganizationKind = (typeof researchOrganizationKinds)[number];
export type OrganizationModelRelationType = (typeof organizationModelRelationTypes)[number];

export type ResearchOrganizationEntry = {
  id: string;
  name: string;
  aliases: string[];
  kind: ResearchOrganizationKind;
  officialUrl: string;
  identitySources: {
    label: string;
    url: string;
  }[];
  evidenceBoundary: string;
  sourceReviewed: string;
};

export type RobotAiOrganizationRelation = {
  modelId: string;
  organizationId: string;
  sourceOrganizationLabel: string;
  relation: OrganizationModelRelationType;
  evidenceUrls: string[];
  evidenceBoundary: string;
  sourceReviewed: string;
};

export const researchOrganizationEntries: ResearchOrganizationEntry[] = [
  {
    id: 'google-deepmind',
    name: 'Google DeepMind',
    aliases: [],
    kind: 'research lab',
    officialUrl: 'https://deepmind.google/',
    identitySources: [
      { label: 'Google DeepMind about page', url: 'https://deepmind.google/about/' },
    ],
    evidenceBoundary: 'Modeled as a research organization from its official site. This record does not infer a separate legal entity, headquarters, endorsement, or ownership of every affiliated project.',
    sourceReviewed: '2026-08-22',
  },
  {
    id: 'google-research',
    name: 'Google Research',
    aliases: [],
    kind: 'research lab',
    officialUrl: 'https://research.google/',
    identitySources: [
      { label: 'Google Research official site', url: 'https://research.google/' },
    ],
    evidenceBoundary: 'Modeled as Google\'s named research organization from its official site, not as a separate company or legal entity.',
    sourceReviewed: '2026-08-22',
  },
  {
    id: 'technische-universitaet-berlin',
    name: 'Technische Universität Berlin',
    aliases: ['TU Berlin'],
    kind: 'university',
    officialUrl: 'https://www.tu.berlin/en/',
    identitySources: [
      { label: 'Technische Universität Berlin official site', url: 'https://www.tu.berlin/en/' },
    ],
    evidenceBoundary: 'The official German university name is preserved. A project relationship means that source-listed authors used this affiliation; it does not imply institution-wide endorsement.',
    sourceReviewed: '2026-08-22',
  },
  {
    id: 'stanford-university',
    name: 'Stanford University',
    aliases: ['Stanford'],
    kind: 'university',
    officialUrl: 'https://www.stanford.edu/',
    identitySources: [
      { label: 'Stanford University official site', url: 'https://www.stanford.edu/' },
    ],
    evidenceBoundary: 'A project relationship records a source-listed author affiliation. It does not imply ownership, funding, institutional endorsement, or participation by the university as a whole.',
    sourceReviewed: '2026-08-22',
  },
  {
    id: 'university-of-california-berkeley',
    name: 'University of California, Berkeley',
    aliases: ['UC Berkeley', 'Berkeley'],
    kind: 'university',
    officialUrl: 'https://www.berkeley.edu/',
    identitySources: [
      { label: 'UC Berkeley about page', url: 'https://www.berkeley.edu/about/' },
    ],
    evidenceBoundary: 'A project relationship records a source-listed author affiliation. It does not imply ownership, funding, institutional endorsement, or participation by the university as a whole.',
    sourceReviewed: '2026-08-22',
  },
  {
    id: 'toyota-research-institute',
    name: 'Toyota Research Institute',
    aliases: ['TRI'],
    kind: 'company',
    officialUrl: 'https://www.tri.global/',
    identitySources: [
      { label: 'Toyota Research Institute about page', url: 'https://www.tri.global/about-us' },
    ],
    evidenceBoundary: 'The organization identity comes from its official site. A project relationship records a source-listed author affiliation and does not establish ownership, funding, or endorsement.',
    sourceReviewed: '2026-08-22',
  },
  {
    id: 'physical-intelligence',
    name: 'Physical Intelligence',
    aliases: ['π'],
    kind: 'company',
    officialUrl: 'https://www.pi.website/',
    identitySources: [
      { label: 'Physical Intelligence official site', url: 'https://www.pi.website/' },
    ],
    evidenceBoundary: 'The public brand name is used without inventing a legal suffix, headquarters, funding record, or commercial availability claim.',
    sourceReviewed: '2026-08-22',
  },
  {
    id: 'massachusetts-institute-of-technology',
    name: 'Massachusetts Institute of Technology',
    aliases: ['MIT'],
    kind: 'university',
    officialUrl: 'https://www.mit.edu/',
    identitySources: [
      { label: 'Massachusetts Institute of Technology official site', url: 'https://www.mit.edu/' },
    ],
    evidenceBoundary: 'A project relationship records a source-listed author affiliation. It does not imply ownership, funding, institutional endorsement, or participation by the university as a whole.',
    sourceReviewed: '2026-08-22',
  },
  {
    id: 'carnegie-mellon-university',
    name: 'Carnegie Mellon University',
    aliases: ['Carnegie Mellon', 'CMU'],
    kind: 'university',
    officialUrl: 'https://www.cmu.edu/',
    identitySources: [
      { label: 'Carnegie Mellon University official site', url: 'https://www.cmu.edu/' },
    ],
    evidenceBoundary: 'A project relationship records a source-listed author affiliation. It does not imply ownership, funding, institutional endorsement, or participation by the university as a whole.',
    sourceReviewed: '2026-08-22',
  },
  {
    id: 'nvidia',
    name: 'NVIDIA',
    aliases: [],
    kind: 'company',
    officialUrl: 'https://www.nvidia.com/',
    identitySources: [
      { label: 'NVIDIA about page', url: 'https://www.nvidia.com/en-us/about-nvidia/' },
    ],
    evidenceBoundary: 'The official brand name is used without inferring headquarters, a specific legal entity, employment status, or ownership beyond the cited model source.',
    sourceReviewed: '2026-08-22',
  },
  {
    id: 'meta-fundamental-ai-research',
    name: 'Meta Fundamental AI Research (FAIR)',
    aliases: ['FAIR at Meta', 'Meta FAIR', 'FAIR'],
    kind: 'research lab',
    officialUrl: 'https://ai.meta.com/research/',
    identitySources: [
      { label: 'Meta AI research page', url: 'https://ai.meta.com/research/' },
    ],
    evidenceBoundary: 'Modeled as Meta\'s named Fundamental AI Research team. This does not infer a separate company, legal entity, or ownership of every source-listed project.',
    sourceReviewed: '2026-08-22',
  },
  {
    id: 'university-of-washington',
    name: 'University of Washington',
    aliases: ['UW', 'Washington'],
    kind: 'university',
    officialUrl: 'https://www.washington.edu/',
    identitySources: [
      { label: 'University of Washington about page', url: 'https://www.washington.edu/about/' },
    ],
    evidenceBoundary: 'A project relationship records a source-listed author affiliation. It does not imply ownership, funding, institutional endorsement, or participation by the university as a whole.',
    sourceReviewed: '2026-08-22',
  },
];

type ModelRelationPolicy = {
  modelId: string;
  relation: OrganizationModelRelationType;
  evidenceUrls: string[];
  evidenceBoundary: string;
  sourceReviewed: string;
};

const modelRelationPolicies: ModelRelationPolicy[] = [
  {
    modelId: 'gemini-robotics-2',
    relation: 'developedBy',
    evidenceUrls: ['https://deepmind.google/models/gemini-robotics/vla/'],
    evidenceBoundary: 'The official Google DeepMind provider page directly presents Gemini Robotics 2. This does not imply public weights, independent validation, or support for unlisted modalities.',
    sourceReviewed: '2026-08-22',
  },
  {
    modelId: 'gemini-robotics-er-2',
    relation: 'developedBy',
    evidenceUrls: ['https://deepmind.google/models/gemini-robotics/embodied-reasoning/'],
    evidenceBoundary: 'The official Google DeepMind provider page directly presents Gemini Robotics ER 2. This does not imply public weights, independent validation, or low-level motor control.',
    sourceReviewed: '2026-08-22',
  },
  {
    modelId: 'rt-2',
    relation: 'developedBy',
    evidenceUrls: [
      'https://arxiv.org/abs/2307.15818',
      'https://deepmind.google/blog/rt-2-new-model-translates-vision-and-language-into-action/',
    ],
    evidenceBoundary: 'The primary paper and Google DeepMind release support the development relationship. They do not establish open availability or deployment reliability beyond the reported evaluation.',
    sourceReviewed: '2026-08-22',
  },
  {
    modelId: 'palm-e',
    relation: 'coDevelopedBy',
    evidenceUrls: [
      'https://arxiv.org/abs/2303.03378',
      'https://research.google/blog/palm-e-an-embodied-multimodal-language-model/',
    ],
    evidenceBoundary: 'The paper lists authors with Google Research and TU Berlin affiliations. This supports a joint research relationship, not exclusive ownership or institution-wide endorsement.',
    sourceReviewed: '2026-08-22',
  },
  {
    modelId: 'openvla-7b',
    relation: 'contributedBy',
    evidenceUrls: [
      'https://arxiv.org/abs/2406.09246',
      'https://openvla.github.io/',
    ],
    evidenceBoundary: 'The paper and official project page list authors under the connected affiliations. This proves contributor affiliation, not institutional ownership, funding, exclusive development, or endorsement.',
    sourceReviewed: '2026-08-22',
  },
  {
    modelId: 'octo',
    relation: 'contributedBy',
    evidenceUrls: [
      'https://arxiv.org/abs/2405.12213',
      'https://octo-models.github.io/',
    ],
    evidenceBoundary: 'The paper and official project page list authors under the connected affiliations. This proves contributor affiliation, not institutional ownership, funding, exclusive development, or endorsement.',
    sourceReviewed: '2026-08-22',
  },
  {
    modelId: 'pi0',
    relation: 'developedBy',
    evidenceUrls: [
      'https://www.pi.website/download/pi0.pdf',
      'https://www.pi.website/blog/pi0',
    ],
    evidenceBoundary: 'The official release states that Physical Intelligence developed π0 and the technical report lists the organization affiliation. This does not extend the evidence to later model versions or unrelated checkpoints.',
    sourceReviewed: '2026-08-22',
  },
  {
    modelId: 'isaac-gr00t-n1',
    relation: 'developedBy',
    evidenceUrls: [
      'https://arxiv.org/abs/2503.14734',
      'https://research.nvidia.com/publication/2025-03_nvidia-isaac-gr00t-n1-open-foundation-model-humanoid-robots',
    ],
    evidenceBoundary: 'The NVIDIA Research publication and primary paper support the development relationship for GR00T N1. They do not transfer evidence automatically to later GR00T versions.',
    sourceReviewed: '2026-08-22',
  },
  {
    modelId: 'sparsh',
    relation: 'contributedBy',
    evidenceUrls: [
      'https://arxiv.org/abs/2410.24090',
      'https://sparsh-ssl.github.io/',
    ],
    evidenceBoundary: 'The primary paper and official project page list authors under the connected affiliations. This proves contributor affiliation, not institutional ownership, exclusive development, or endorsement.',
    sourceReviewed: '2026-08-22',
  },
];

const organizationByAlias = new Map<string, ResearchOrganizationEntry>();
for (const organization of researchOrganizationEntries) {
  for (const alias of [organization.name, ...organization.aliases]) {
    if (organizationByAlias.has(alias)) {
      throw new Error(`Duplicate research-organization alias: ${alias}`);
    }
    organizationByAlias.set(alias, organization);
  }
}

const policyByModel = new Map(modelRelationPolicies.map((policy) => [policy.modelId, policy]));
if (policyByModel.size !== modelRelationPolicies.length) {
  throw new Error('Robot AI organization relation policies must have unique model IDs.');
}

export function getResearchOrganizationByAlias(alias: string) {
  return organizationByAlias.get(alias);
}

export const robotAiOrganizationRelations: RobotAiOrganizationRelation[] = robotAiModelEntries.flatMap((model) => {
  if (model.creatorOrganizations.length === 0) return [];

  const policy = policyByModel.get(model.id);
  if (!policy) throw new Error(`Missing organization relation policy for model ${model.id}.`);

  const primarySourceUrls = new Set(model.primarySources.map((source) => source.url));
  for (const evidenceUrl of policy.evidenceUrls) {
    if (!primarySourceUrls.has(evidenceUrl)) {
      throw new Error(`Organization relation evidence ${evidenceUrl} is not a primary source for model ${model.id}.`);
    }
  }

  return model.creatorOrganizations.map((sourceOrganizationLabel) => {
    const organization = getResearchOrganizationByAlias(sourceOrganizationLabel);
    if (!organization) {
      throw new Error(`Unresolved robot AI organization label: ${sourceOrganizationLabel}`);
    }

    return {
      modelId: model.id,
      organizationId: organization.id,
      sourceOrganizationLabel,
      relation: policy.relation,
      evidenceUrls: policy.evidenceUrls,
      evidenceBoundary: policy.evidenceBoundary,
      sourceReviewed: policy.sourceReviewed,
    };
  });
});

const knownModelIds = new Set(robotAiModelEntries.map((entry) => entry.id));
for (const policy of modelRelationPolicies) {
  if (!knownModelIds.has(policy.modelId)) {
    throw new Error(`Organization relation policy references missing model ${policy.modelId}.`);
  }
}
