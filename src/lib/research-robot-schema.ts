import { buildPageJsonLd, canonicalUrl } from '@/lib/seo';
import { researchManufacturingRelations } from '@/lib/research-entity-relations';
import {
  researchRobotEntries,
  type ResearchRobotEntry,
} from '@/lib/research-robots';

export function robotCanonicalId(robot: Pick<ResearchRobotEntry, 'id'>) {
  return `${canonicalUrl('/robots')}#robot-${robot.id}`;
}

export function buildResearchRobotDirectoryJsonLd() {
  const directoryUrl = canonicalUrl('/robots');

  const robotNodes = researchRobotEntries.map((robot) => {
    const manufacturerRelation = researchManufacturingRelations.find(
      (relation) => relation.fromType === 'robot' && relation.fromId === robot.id,
    );

    return {
      '@type': 'Thing',
      '@id': robotCanonicalId(robot),
      identifier: robot.id,
      name: robot.name,
      ...(robot.aliases.length > 0 ? { alternateName: robot.aliases } : {}),
      category: robot.kind,
      description: robot.description,
      url: robotCanonicalId(robot),
      ...(robot.schemaSameAsUrl ? { sameAs: [robot.schemaSameAsUrl] } : {}),
      ...(manufacturerRelation ? {
        manufacturer: {
          '@id': `${canonicalUrl('/organizations')}#organization-${manufacturerRelation.toId}`,
        },
      } : {}),
      isPartOf: {
        '@id': `${directoryUrl}#robot-directory`,
      },
      mainEntityOfPage: {
        '@id': `${directoryUrl}#webpage`,
      },
    };
  });

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ItemList',
        '@id': `${directoryUrl}#robot-directory`,
        name: 'RoboSkin.ai Robot Platform and Embodiment Directory',
        description:
          'A source-reviewed directory of robot platforms and research embodiments connected to robot AI models through explicit training, evaluation, or demonstration evidence.',
        url: directoryUrl,
        numberOfItems: researchRobotEntries.length,
        itemListOrder: 'https://schema.org/ItemListUnordered',
        itemListElement: researchRobotEntries.map((robot, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@id': robotCanonicalId(robot),
          },
        })),
      },
      ...robotNodes,
    ],
  };
}

export function buildResearchRobotWebPageJsonLd() {
  const directoryUrl = canonicalUrl('/robots');

  return {
    ...buildPageJsonLd('/robots'),
    about: {
      '@type': 'Thing',
      name: 'Robot platforms and research embodiments for Physical AI',
    },
    mainEntity: {
      '@id': `${directoryUrl}#robot-directory`,
    },
  };
}
