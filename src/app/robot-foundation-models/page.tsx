import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/JsonLd';
import EvidenceDatabaseMethod from '@/components/EvidenceDatabaseMethod';
import RobotAiModelExplorer from '@/components/RobotAiModelExplorer';
import SeoTopicArticle from '@/components/SeoTopicArticle';
import { getSeoTopicPage } from '@/content/seo-topic-pages';
import { robotAiModelEntries } from '@/lib/robot-ai-models';
import { buildRobotAiModelDirectoryJsonLd } from '@/lib/robot-ai-schema';
import { researchOrganizationEntries } from '@/lib/research-organizations';
import { researchRobotEntries, robotAiRobotRelations } from '@/lib/research-robots';
import { buildSeoTopicMetadata } from '@/lib/seo-topic';

const page = getSeoTopicPage('/robot-foundation-models');

export function generateMetadata(): Metadata {
  if (!page) return { title: 'Robot foundation models topic not found' };
  return buildSeoTopicMetadata(page);
}

export default function RobotFoundationModelsPage() {
  if (!page) notFound();
  const reviewedThrough = robotAiModelEntries.reduce(
    (latest, entry) => entry.sourceReviewed > latest ? entry.sourceReviewed : latest,
    '',
  );

  return (
    <>
      <JsonLd data={buildRobotAiModelDirectoryJsonLd(robotAiModelEntries)} />
      <SeoTopicArticle page={page}>
        <EvidenceDatabaseMethod
          name="robot AI model directory"
          recordCount={robotAiModelEntries.length}
          reviewedThrough={reviewedThrough}
          scope="This directory maps tactile models, VLMs, embodied-reasoning systems, VLA policies, world models, and hybrid robot systems without treating those model roles as synonyms."
          inclusion={[
            'An official paper, project, model card, release, or code source must identify the model and its role.',
            'Inputs, outputs, embodiments, training-data summary, access, real-robot evidence, and tactile-input status are recorded separately.',
          ]}
          normalization={[
            'Model category describes the documented function, not a universal capability tier.',
            'Tactile input is marked yes, no, or unclear only from explicit source evidence.',
          ]}
          exclusions={[
            'A generated plan, video prediction, simulation result, or provider demo is not upgraded to real-robot control evidence.',
            'Training across a robot family does not prove zero-shot compatibility with every model in that family.',
          ]}
          limitations={[
            'Model releases use incompatible tasks, embodiments, baselines, action spaces, and access terms.',
            'The directory is an evidence map, not a cross-model leaderboard or safety certification.',
          ]}
          links={[
            { label: 'Compare robot embodiments', href: '/robots' },
            { label: 'Open benchmark directory', href: '/benchmarks' },
          ]}
        />
        <RobotAiModelExplorer
          entries={robotAiModelEntries}
          organizations={researchOrganizationEntries}
          robots={researchRobotEntries}
          robotRelations={robotAiRobotRelations}
        />
      </SeoTopicArticle>
    </>
  );
}
