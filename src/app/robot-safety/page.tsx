import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SeoTopicArticle from '@/components/SeoTopicArticle';
import { getSeoTopicPage } from '@/content/seo-topic-pages';
import { buildSeoTopicMetadata } from '@/lib/seo-topic';

const page = getSeoTopicPage('/robot-safety');

export function generateMetadata(): Metadata {
  if (!page) return { title: 'Robot safety topic not found' };
  return buildSeoTopicMetadata(page);
}

export default function RobotSafetyPage() {
  if (!page) notFound();
  return <SeoTopicArticle page={page} />;
}
