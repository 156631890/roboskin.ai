import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SeoTopicArticle from '@/components/SeoTopicArticle';
import { getSeoTopicPage } from '@/content/seo-topic-pages';
import { buildSeoTopicMetadata } from '@/lib/seo-topic';

const page = getSeoTopicPage('/guides/physical-ai-touch-data');

export function generateMetadata(): Metadata {
  if (!page) {
    return {
      title: 'Physical AI touch data topic not found',
    };
  }

  return buildSeoTopicMetadata(page);
}

export default function PhysicalAiTouchDataPage() {
  if (!page) {
    notFound();
  }

  return <SeoTopicArticle page={page} />;
}
