import { canonicalUrl } from '@/lib/seo';
import type { RobotAiModelEntry } from '@/lib/robot-ai-models';

export function buildVlaModelIndexJsonLd(entries: RobotAiModelEntry[]) {
  if (entries.some((entry) => entry.category !== 'VLA')) {
    throw new Error('The VLA model index can only reference VLA records.');
  }

  const directoryUrl = canonicalUrl('/robot-vla-models');
  const modelDirectoryUrl = canonicalUrl('/robot-foundation-models');

  const itemList = {
    '@type': 'ItemList',
    '@id': `${directoryUrl}#vla-model-index`,
    name: 'RoboSkin.ai Robot VLA Evidence Index',
    description: 'A source-reviewed index of robot vision-language-action models by inputs, action output, embodiment, physical evaluation, artifact access, tactile input, and evidence limitations.',
    url: `${directoryUrl}#vla-model-index`,
    numberOfItems: entries.length,
    itemListOrder: 'https://schema.org/ItemListUnordered',
    itemListElement: entries.map((entry, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `${directoryUrl}#vla-model-${entry.id}`,
      item: {
        '@id': `${modelDirectoryUrl}#model-${entry.id}`,
      },
    })),
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [
      itemList,
      {
        '@type': 'DefinedTerm',
        '@id': `${directoryUrl}#defined-term`,
        name: 'Vision-language-action model',
        alternateName: ['VLA', 'Robot VLA model', 'Vision-language-action policy'],
        description: 'A robot model that uses visual observations and language instructions to produce or condition physical actions, with implementations differing in state inputs, action representation, embodiment, control interface, and tactile feedback.',
        url: directoryUrl,
        inDefinedTermSet: {
          '@type': 'DefinedTermSet',
          name: 'RoboSkin.ai robotics glossary',
          url: canonicalUrl('/glossary'),
        },
      },
    ],
  };
}
