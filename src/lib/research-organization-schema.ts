import {
  researchManufacturingRelations,
  researchOrganizationPartOfRelations,
} from '@/lib/research-entity-relations';
import { robotAiModelEntries } from '@/lib/robot-ai-models';
import {
  researchOrganizationEntries,
  robotAiOrganizationRelations,
  type ResearchOrganizationEntry,
} from '@/lib/research-organizations';
import { canonicalUrl } from '@/lib/seo';
import { researchRobotEntries } from '@/lib/research-robots';
import { tactileSensorEntries } from '@/lib/tactile-sensors';

export function organizationCanonicalId(organization: Pick<ResearchOrganizationEntry, 'id'>) {
  return `${canonicalUrl('/organizations')}#organization-${organization.id}`;
}

function organizationReference(organizationId: string) {
  const organization = researchOrganizationEntries.find((entry) => entry.id === organizationId);
  if (!organization) throw new Error(`Organization schema references missing organization ${organizationId}.`);

  return {
    '@id': organizationCanonicalId(organization),
  };
}

export function buildResearchOrganizationDirectoryJsonLd() {
  const directoryUrl = canonicalUrl('/organizations');
  const modelById = new Map(robotAiModelEntries.map((entry) => [entry.id, entry]));

  const organizationNodes = researchOrganizationEntries.map((organization) => {
    const parentOrganizationIds = researchOrganizationPartOfRelations
      .filter((relation) => relation.fromId === organization.id)
      .map((relation) => relation.toId);

    return {
      '@type': organization.kind === 'university' ? 'CollegeOrUniversity' : 'Organization',
      '@id': organizationCanonicalId(organization),
      identifier: organization.id,
      name: organization.name,
      ...(organization.aliases.length > 0 ? { alternateName: organization.aliases } : {}),
      url: organization.officialUrl,
      sameAs: [organization.officialUrl],
      ...(parentOrganizationIds.length > 0 ? {
        parentOrganization: parentOrganizationIds.map(organizationReference),
      } : {}),
      mainEntityOfPage: {
        '@id': `${directoryUrl}#webpage`,
      },
    };
  });

  const connectedModelIds = [...new Set(robotAiOrganizationRelations.map((relation) => relation.modelId))];
  const modelNodes = connectedModelIds.map((modelId) => {
    const model = modelById.get(modelId);
    if (!model) throw new Error(`Organization schema references missing model ${modelId}.`);

    const relations = robotAiOrganizationRelations.filter((relation) => relation.modelId === modelId);
    const creatorOrganizations = relations
      .filter((relation) => relation.relation !== 'contributedBy')
      .map((relation) => organizationReference(relation.organizationId));
    const contributorOrganizations = relations
      .filter((relation) => relation.relation === 'contributedBy')
      .map((relation) => organizationReference(relation.organizationId));

    return {
      '@type': 'CreativeWork',
      '@id': `${canonicalUrl('/robot-foundation-models')}#model-${model.id}`,
      identifier: model.id,
      name: model.name,
      url: model.projectUrl,
      ...(creatorOrganizations.length > 0 ? { creator: creatorOrganizations } : {}),
      ...(contributorOrganizations.length > 0 ? { contributor: contributorOrganizations } : {}),
      citation: [...new Set(relations.flatMap((relation) => relation.evidenceUrls))],
    };
  });

  const hardwareNodes = researchManufacturingRelations.map((relation) => {
    const source = relation.fromType === 'sensor'
      ? tactileSensorEntries.find((entry) => entry.id === relation.fromId)
      : researchRobotEntries.find((entry) => entry.id === relation.fromId);
    if (!source) {
      throw new Error(`Organization schema references missing ${relation.fromType} ${relation.fromId}.`);
    }

    return {
      '@type': 'Thing',
      '@id': relation.fromType === 'sensor'
        ? `${canonicalUrl('/sensors')}#sensor-${source.id}`
        : `${canonicalUrl('/robots')}#robot-${source.id}`,
      identifier: source.id,
      name: source.name,
      manufacturer: organizationReference(relation.toId),
      citation: [...relation.evidenceUrls],
    };
  });

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ItemList',
        '@id': `${directoryUrl}#organization-directory`,
        name: 'RoboSkin.ai Robotics Research Organization Directory',
        description:
          'A partial, source-reviewed provenance directory connecting official organization identities to papers, datasets, benchmarks, sensors, and robot AI models without inferring ownership or endorsement.',
        url: directoryUrl,
        numberOfItems: researchOrganizationEntries.length,
        itemListOrder: 'https://schema.org/ItemListUnordered',
        itemListElement: researchOrganizationEntries.map((organization, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@id': organizationCanonicalId(organization),
          },
        })),
      },
      ...organizationNodes,
      ...modelNodes,
      ...hardwareNodes,
    ],
  };
}
