import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SeoTopicArticle from '@/components/SeoTopicArticle';
import { getSeoTopicPage } from '@/content/seo-topic-pages';
import { buildSeoTopicMetadata } from '@/lib/seo-topic';

const page = getSeoTopicPage('/e-skin');

export function generateMetadata(): Metadata {
  if (!page) {
    return {
      title: 'E-skin topic not found',
    };
  }

  return buildSeoTopicMetadata(page);
}

export default function ESkinPage() {
  if (!page) {
    notFound();
  }

  return <SeoTopicArticle page={page} />;
}
