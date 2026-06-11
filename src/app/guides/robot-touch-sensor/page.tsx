import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SeoTopicArticle from '@/components/SeoTopicArticle';
import { getSeoTopicPage } from '@/content/seo-topic-pages';
import { buildSeoTopicMetadata } from '@/lib/seo-topic';

const page = getSeoTopicPage('/guides/robot-touch-sensor');

export function generateMetadata(): Metadata {
  if (!page) {
    return {
      title: 'Robot touch sensor topic not found',
    };
  }

  return buildSeoTopicMetadata(page);
}

export default function RobotTouchSensorPage() {
  if (!page) {
    notFound();
  }

  return <SeoTopicArticle page={page} />;
}
