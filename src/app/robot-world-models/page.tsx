import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/JsonLd';
import RobotWorldModelEvidenceTable from '@/components/RobotWorldModelEvidenceTable';
import SeoTopicArticle from '@/components/SeoTopicArticle';
import { getSeoTopicPage } from '@/content/seo-topic-pages';
import { buildSeoTopicMetadata } from '@/lib/seo-topic';
import { buildRobotWorldModelEvidenceJsonLd } from '@/lib/robot-world-model-schema';
import { robotWorldModelEvidenceEntries } from '@/lib/robot-world-models';

const page = getSeoTopicPage('/robot-world-models');

export function generateMetadata(): Metadata {
  if (!page) return { title: 'Robot world models topic not found' };
  return buildSeoTopicMetadata(page);
}

export default function RobotWorldModelsPage() {
  if (!page) notFound();
  return (
    <>
      <JsonLd data={buildRobotWorldModelEvidenceJsonLd(robotWorldModelEvidenceEntries)} />
      <SeoTopicArticle page={page}>
        <RobotWorldModelEvidenceTable entries={robotWorldModelEvidenceEntries} />
      </SeoTopicArticle>
    </>
  );
}
