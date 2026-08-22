import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/JsonLd';
import SeoTopicArticle from '@/components/SeoTopicArticle';
import TactileDatasetExplorer from '@/components/TactileDatasetExplorer';
import { getSeoTopicPage } from '@/content/seo-topic-pages';
import { buildRoboticsDatasetsJsonLd } from '@/lib/seo';
import { buildSeoTopicMetadata } from '@/lib/seo-topic';
import { roboticsDatasetEntries } from '@/lib/robotics-datasets';

const page = getSeoTopicPage('/robotics-datasets');

export function generateMetadata(): Metadata {
  if (!page) return { title: 'Robotics datasets topic not found' };
  return buildSeoTopicMetadata(page);
}

export default function RoboticsDatasetsPage() {
  if (!page) notFound();
  return (
    <>
      <JsonLd data={buildRoboticsDatasetsJsonLd(roboticsDatasetEntries)} />
      <SeoTopicArticle page={page}>
        <TactileDatasetExplorer
          entries={roboticsDatasetEntries}
          eyebrow="Source-reviewed robotics dataset directory"
          heading="Compare general robot-learning datasets"
          description="These records cover cross-embodiment and manipulation datasets rather than tactile datasets. Scale, hardware, modalities, formats, access, and licenses remain tied to the reviewed primary sources and version boundaries."
        />
      </SeoTopicArticle>
    </>
  );
}
