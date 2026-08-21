import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/JsonLd';
import RobotAiModelExplorer from '@/components/RobotAiModelExplorer';
import SeoTopicArticle from '@/components/SeoTopicArticle';
import { getSeoTopicPage } from '@/content/seo-topic-pages';
import { robotAiModelEntries } from '@/lib/robot-ai-models';
import { buildRobotAiModelDirectoryJsonLd } from '@/lib/robot-ai-schema';
import { buildSeoTopicMetadata } from '@/lib/seo-topic';

const page = getSeoTopicPage('/robot-foundation-models');

export function generateMetadata(): Metadata {
  if (!page) return { title: 'Robot foundation models topic not found' };
  return buildSeoTopicMetadata(page);
}

export default function RobotFoundationModelsPage() {
  if (!page) notFound();

  return (
    <>
      <JsonLd data={buildRobotAiModelDirectoryJsonLd(robotAiModelEntries)} />
      <SeoTopicArticle page={page}>
        <RobotAiModelExplorer entries={robotAiModelEntries} />
      </SeoTopicArticle>
    </>
  );
}
