import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SeoTopicArticle from '@/components/SeoTopicArticle';
import { getSeoTopicPage } from '@/content/seo-topic-pages';
import { buildSeoTopicMetadata } from '@/lib/seo-topic';

const page = getSeoTopicPage('/guides/slip-detection-robot-hand');

export function generateMetadata(): Metadata {
  if (!page) {
    return {
      title: 'Slip detection robot hand topic not found',
    };
  }

  return buildSeoTopicMetadata(page);
}

export default function SlipDetectionRobotHandPage() {
  if (!page) {
    notFound();
  }

  return <SeoTopicArticle page={page} />;
}
