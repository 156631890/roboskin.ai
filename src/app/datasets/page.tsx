import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/JsonLd';
import SeoTopicArticle from '@/components/SeoTopicArticle';
import TactileDatasetExplorer from '@/components/TactileDatasetExplorer';
import { getSeoTopicPage } from '@/content/seo-topic-pages';
import { buildSeoTopicMetadata } from '@/lib/seo-topic';
import { buildTactileDatasetsJsonLd } from '@/lib/seo';
import { tactileDatasetEntries } from '@/lib/tactile-datasets';

const page = getSeoTopicPage('/datasets');

export function generateMetadata(): Metadata {
  if (!page) return { title: 'Tactile robotics datasets topic not found' };
  return buildSeoTopicMetadata(page);
}

export default function TactileDatasetsPage() {
  if (!page) notFound();
  return (
    <>
      <JsonLd data={buildTactileDatasetsJsonLd(tactileDatasetEntries)} />
      <SeoTopicArticle page={page}>
        <TactileDatasetExplorer entries={tactileDatasetEntries} />
      </SeoTopicArticle>
    </>
  );
}
