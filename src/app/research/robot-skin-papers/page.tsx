import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SeoTopicArticle from '@/components/SeoTopicArticle';
import { getSeoTopicPage } from '@/content/seo-topic-pages';
import { buildSeoTopicMetadata } from '@/lib/seo-topic';

const page = getSeoTopicPage('/research/robot-skin-papers');

export function generateMetadata(): Metadata {
  if (!page) {
    return {
      title: 'Robot skin papers not found',
    };
  }

  return buildSeoTopicMetadata(page);
}

export default function RobotSkinPapersPage() {
  if (!page) {
    notFound();
  }

  return <SeoTopicArticle page={page} />;
}
