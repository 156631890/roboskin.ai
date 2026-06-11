import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SeoTopicArticle from '@/components/SeoTopicArticle';
import { getSeoTopicPage } from '@/content/seo-topic-pages';
import { buildSeoTopicMetadata } from '@/lib/seo-topic';

const page = getSeoTopicPage('/guides/flexible-tactile-sensor-array');

export function generateMetadata(): Metadata {
  if (!page) {
    return {
      title: 'Flexible tactile sensor array topic not found',
    };
  }

  return buildSeoTopicMetadata(page);
}

export default function FlexibleTactileSensorArrayPage() {
  if (!page) {
    notFound();
  }

  return <SeoTopicArticle page={page} />;
}
