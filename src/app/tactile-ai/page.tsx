import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SeoTopicArticle from '@/components/SeoTopicArticle';
import { getSeoTopicPage } from '@/content/seo-topic-pages';
import { buildSeoTopicMetadata } from '@/lib/seo-topic';

const page = getSeoTopicPage('/tactile-ai');

export function generateMetadata(): Metadata {
  if (!page) {
    return {
      title: 'Tactile AI topic not found',
    };
  }

  return buildSeoTopicMetadata(page);
}

export default function TactileAiPage() {
  if (!page) {
    notFound();
  }

  return <SeoTopicArticle page={page} />;
}
