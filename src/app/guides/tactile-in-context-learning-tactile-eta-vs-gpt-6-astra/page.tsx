import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SeoTopicArticle from '@/components/SeoTopicArticle';
import { getSeoTopicPage } from '@/content/seo-topic-pages';
import { buildSeoTopicMetadata } from '@/lib/seo-topic';

const page = getSeoTopicPage('/guides/tactile-in-context-learning-tactile-eta-vs-gpt-6-astra');

export function generateMetadata(): Metadata {
  return page ? buildSeoTopicMetadata(page) : { title: 'Tactile in-context learning comparison not found' };
}

export default function TactileInContextLearningComparisonPage() {
  if (!page) notFound();
  return <SeoTopicArticle page={page} leadHref="#published-input-audit" leadLabel="Inspect the executed input audit" />;
}
