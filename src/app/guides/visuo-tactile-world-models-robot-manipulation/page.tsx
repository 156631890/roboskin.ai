import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SeoTopicArticle from '@/components/SeoTopicArticle';
import { getSeoTopicPage } from '@/content/seo-topic-pages';
import { buildSeoTopicMetadata } from '@/lib/seo-topic';

const page = getSeoTopicPage('/guides/visuo-tactile-world-models-robot-manipulation');

export function generateMetadata(): Metadata {
  if (!page) return { title: 'Visuo-tactile world models topic not found' };
  return buildSeoTopicMetadata(page);
}

export default function VisuoTactileWorldModelsPage() {
  if (!page) notFound();
  return <SeoTopicArticle page={page} />;
}
