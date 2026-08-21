import { canonicalUrl } from '@/lib/seo';
import type { RobotAiModelEntry } from '@/lib/robot-ai-models';

export function buildRobotAiModelDirectoryJsonLd(entries: RobotAiModelEntry[]) {
  const directoryUrl = canonicalUrl('/robot-foundation-models');
  const modelNodes = entries.map((entry) => ({
    '@type': 'CreativeWork',
    '@id': `${directoryUrl}#model-${entry.id}`,
    identifier: entry.id,
    name: entry.name,
    url: entry.projectUrl,
    datePublished: entry.releaseDate,
    genre: entry.category,
    ...(entry.creatorOrganizations.length > 0 ? {
      creator: entry.creatorOrganizations.map((name) => ({
        '@type': 'Organization',
        name,
      })),
    } : {}),
    description: entry.trainingDataSummary,
    abstract: entry.evidenceLimitations,
    keywords: [entry.category, ...entry.inputModalities, ...entry.embodiments],
    citation: entry.primarySources.map((source) => source.url),
    isPartOf: {
      '@id': `${directoryUrl}#model-directory`,
    },
    mainEntityOfPage: {
      '@id': `${directoryUrl}#webpage`,
    },
  }));

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ItemList',
        '@id': `${directoryUrl}#model-directory`,
        name: 'RoboSkin.ai Robot AI Model Directory',
        description:
          'A source-reviewed comparison of robot AI models by model role, inputs, outputs, embodiments, availability, tactile input, and evidence limitations.',
        url: directoryUrl,
        numberOfItems: entries.length,
        itemListOrder: 'https://schema.org/ItemListUnordered',
        itemListElement: entries.map((entry, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@id': `${directoryUrl}#model-${entry.id}`,
          },
        })),
      },
      ...modelNodes,
    ],
  };
}
