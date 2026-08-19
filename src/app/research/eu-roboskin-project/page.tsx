import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SeoTopicArticle from '@/components/SeoTopicArticle';
import { getSeoTopicPage } from '@/content/seo-topic-pages';
import { buildSeoTopicMetadata } from '@/lib/seo-topic';

const page = getSeoTopicPage('/research/eu-roboskin-project');

export function generateMetadata(): Metadata {
  if (!page) {
    return {
      title: 'EU ROBOSKIN project record not found',
    };
  }

  return buildSeoTopicMetadata(page);
}

export default function EuRoboskinProjectPage() {
  if (!page) {
    notFound();
  }

  return <SeoTopicArticle page={page} />;
}

