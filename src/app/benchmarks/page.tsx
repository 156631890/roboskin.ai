import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/JsonLd';
import SeoTopicArticle from '@/components/SeoTopicArticle';
import TactileBenchmarkExplorer from '@/components/TactileBenchmarkExplorer';
import { getSeoTopicPage } from '@/content/seo-topic-pages';
import { buildTactileBenchmarksJsonLd } from '@/lib/seo';
import { buildSeoTopicMetadata } from '@/lib/seo-topic';
import { tactileBenchmarkEntries } from '@/lib/tactile-benchmarks';

const page = getSeoTopicPage('/benchmarks');

export function generateMetadata(): Metadata {
  if (!page) return { title: 'Tactile robotics benchmarks topic not found' };
  return buildSeoTopicMetadata(page);
}

export default function TactileBenchmarksPage() {
  if (!page) notFound();
  return (
    <>
      <JsonLd data={buildTactileBenchmarksJsonLd(tactileBenchmarkEntries)} />
      <SeoTopicArticle page={page}>
        <TactileBenchmarkExplorer entries={tactileBenchmarkEntries} />
      </SeoTopicArticle>
    </>
  );
}
