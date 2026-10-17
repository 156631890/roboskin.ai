import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SeoTopicArticle from '@/components/SeoTopicArticle';
import { getSeoTopicPage } from '@/content/seo-topic-pages';
import { buildSeoTopicMetadata } from '@/lib/seo-topic';

const page = getSeoTopicPage('/guides/optical-vs-capacitive-tactile-sensors');

export function generateMetadata(): Metadata {
  if (!page) notFound();
  return buildSeoTopicMetadata(page);
}

export default function OpticalVsCapacitiveTactileSensorsPage() {
  if (!page) notFound();
  return <SeoTopicArticle page={page} />;
}
