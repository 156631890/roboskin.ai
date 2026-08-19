import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/JsonLd';
import SeoTopicArticle from '@/components/SeoTopicArticle';
import TactileSensorExplorer from '@/components/TactileSensorExplorer';
import { getSeoTopicPage } from '@/content/seo-topic-pages';
import { buildTactileSensorsJsonLd } from '@/lib/seo';
import { buildSeoTopicMetadata } from '@/lib/seo-topic';
import { tactileSensorEntries } from '@/lib/tactile-sensors';

const page = getSeoTopicPage('/sensors');

export function generateMetadata(): Metadata {
  if (!page) return { title: 'Tactile sensors topic not found' };
  return buildSeoTopicMetadata(page);
}

export default function TactileSensorsPage() {
  if (!page) notFound();
  return (
    <>
      <JsonLd data={buildTactileSensorsJsonLd(tactileSensorEntries)} />
      <SeoTopicArticle page={page}>
        <TactileSensorExplorer entries={tactileSensorEntries} />
      </SeoTopicArticle>
    </>
  );
}
