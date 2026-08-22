import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/JsonLd';
import SeoTopicArticle from '@/components/SeoTopicArticle';
import VlaModelIndex from '@/components/VlaModelIndex';
import { getSeoTopicPage } from '@/content/seo-topic-pages';
import { robotAiModelEntries } from '@/lib/robot-ai-models';
import { buildSeoTopicMetadata } from '@/lib/seo-topic';
import { tactileVlaEvidenceEntries } from '@/lib/tactile-vla-evidence';
import { buildVlaModelIndexJsonLd } from '@/lib/vla-model-schema';

const page = getSeoTopicPage('/robot-vla-models');
const vlaModelEntries = robotAiModelEntries.filter((entry) => entry.category === 'VLA');

export function generateMetadata(): Metadata {
  if (!page) return { title: 'Robot VLA models topic not found' };
  return buildSeoTopicMetadata(page);
}

export default function RobotVlaModelsPage() {
  if (!page) notFound();
  return (
    <>
      <JsonLd data={buildVlaModelIndexJsonLd(vlaModelEntries, tactileVlaEvidenceEntries)} />
      <SeoTopicArticle page={page}>
        <VlaModelIndex entries={vlaModelEntries} tactileEvidence={tactileVlaEvidenceEntries} />
      </SeoTopicArticle>
    </>
  );
}
