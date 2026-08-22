import { canonicalUrl } from '@/lib/seo';
import type { RobotWorldModelEvidenceEntry } from '@/lib/robot-world-models';

function worldModelCanonicalId(entry: Pick<RobotWorldModelEvidenceEntry, 'id'>) {
  return `${canonicalUrl('/robot-world-models')}#world-model-${entry.id}`;
}

function property(name: string, value: string) {
  return {
    '@type': 'PropertyValue',
    name,
    value,
  };
}

export function buildRobotWorldModelEvidenceJsonLd(entries: RobotWorldModelEvidenceEntry[]) {
  const directoryUrl = canonicalUrl('/robot-world-models');
  const directoryId = `${directoryUrl}#world-model-evidence`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ItemList',
        '@id': directoryId,
        name: 'RoboSkin.ai Robot World Model Evidence Center',
        description:
          'A source-reviewed comparison of tactile robot world models by prediction target, action-conditioning class, operational role, real-robot protocol, artifact availability, and evidence boundary.',
        url: directoryUrl,
        numberOfItems: entries.length,
        itemListOrder: 'https://schema.org/ItemListUnordered',
        itemListElement: entries.map((entry, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@id': worldModelCanonicalId(entry),
          },
        })),
      },
      ...entries.map((entry) => ({
        '@type': 'CreativeWork',
        '@id': worldModelCanonicalId(entry),
        identifier: entry.id,
        name: entry.name,
        url: worldModelCanonicalId(entry),
        datePublished: entry.releaseDate,
        genre: 'Robot world model evidence record',
        description: entry.predictionTarget,
        abstract: entry.limitations,
        keywords: [
          'robot world model',
          'tactile world model',
          entry.actionConditioning.kind,
        ],
        citation: entry.primarySources.map((source) => source.url),
        isPartOf: {
          '@id': directoryId,
        },
        mainEntityOfPage: {
          '@id': `${directoryUrl}#webpage`,
        },
        additionalProperty: [
          property('Prediction target', entry.predictionTarget),
          property(
            'Action conditioning',
            `${entry.actionConditioning.kind}: ${entry.actionConditioning.description}`,
          ),
          property('Operational role', entry.operationalRole),
          property('Robot, sensor, and task boundary', entry.robotSensorTaskBoundary),
          property('Real-robot evidence', entry.realRobotEvidence),
          property('Paper availability', entry.artifacts.paper),
          property('Code availability', entry.artifacts.code),
          property('Model-weight availability', entry.artifacts.weights),
          property('Data availability', entry.artifacts.data),
          property('Artifact license evidence', entry.artifacts.license),
          property('Evidence status', entry.evidenceStatus),
          property('Source reviewed', entry.sourceReviewed),
        ],
      })),
    ],
  };
}
