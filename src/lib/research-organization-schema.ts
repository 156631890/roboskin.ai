import { canonicalUrl } from '@/lib/seo';
import { robotAiModelEntries } from '@/lib/robot-ai-models';
import {
  researchOrganizationEntries,
  robotAiOrganizationRelations,
  type ResearchOrganizationEntry,
} from '@/lib/research-organizations';

export function organizationCanonicalId(organization: Pick<ResearchOrganizationEntry, 'id'>) {
  return `${canonicalUrl('/organizations')}#organization-${organization.id}`;
}

export function buildResearchOrganizationDirectoryJsonLd() {
  const directoryUrl = canonicalUrl('/organizations');
  const modelById = new Map(robotAiModelEntries.map((entry) => [entry.id, entry]));

  const organizationNodes = researchOrganizationEntries.map((organization) => ({
    '@type': organization.kind === 'university' ? 'CollegeOrUniversity' : 'Organization',
    '@id': organizationCanonicalId(organization),
    identifier: organization.id,
    name: organization.name,
    ...(organization.aliases.length > 0 ? { alternateName: organization.aliases } : {}),
    url: organization.officialUrl,
    sameAs: [organization.officialUrl],
    mainEntityOfPage: {
      '@id': `${directoryUrl}#webpage`,
    },
  }));

  const connectedModelIds = [...new Set(robotAiOrganizationRelations.map((relation) => relation.modelId))];
  const modelNodes = connectedModelIds.map((modelId) => {
    const model = modelById.get(modelId);
    if (!model) throw new Error(`Organization schema references missing model ${modelId}.`);

    const relations = robotAiOrganizationRelations.filter((relation) => relation.modelId === modelId);
    const creatorOrganizations = relations
      .filter((relation) => relation.relation !== 'contributedBy')
      .map((relation) => researchOrganizationEntries.find((entry) => entry.id === relation.organizationId))
      .filter((entry): entry is ResearchOrganizationEntry => Boolean(entry));
    const contributorOrganizations = relations
      .filter((relation) => relation.relation === 'contributedBy')
      .map((relation) => researchOrganizationEntries.find((entry) => entry.id === relation.organizationId))
      .filter((entry): entry is ResearchOrganizationEntry => Boolean(entry));

    return {
      '@type': 'CreativeWork',
      '@id': `${canonicalUrl('/robot-foundation-models')}#model-${model.id}`,
      identifier: model.id,
      name: model.name,
      url: model.projectUrl,
      ...(creatorOrganizations.length > 0 ? {
        creator: creatorOrganizations.map((organization) => ({
          '@id': organizationCanonicalId(organization),
        })),
      } : {}),
      ...(contributorOrganizations.length > 0 ? {
        contributor: contributorOrganizations.map((organization) => ({
          '@id': organizationCanonicalId(organization),
        })),
      } : {}),
      citation: [...new Set(relations.flatMap((relation) => relation.evidenceUrls))],
    };
  });

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ItemList',
        '@id': `${directoryUrl}#organization-directory`,
        name: 'RoboSkin.ai Robot AI Research Organization Directory',
        description:
          'A source-reviewed directory of universities, research labs, and companies explicitly connected to robot AI models by primary papers, official project pages, or provider releases.',
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
    ],
  };
}
