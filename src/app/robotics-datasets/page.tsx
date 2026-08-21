import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SeoTopicArticle from '@/components/SeoTopicArticle';
import { getSeoTopicPage } from '@/content/seo-topic-pages';
import { buildSeoTopicMetadata } from '@/lib/seo-topic';

const page = getSeoTopicPage('/robotics-datasets');

export function generateMetadata(): Metadata {
  if (!page) return { title: 'Robotics datasets topic not found' };
  return buildSeoTopicMetadata(page);
}

export default function RoboticsDatasetsPage() {
  if (!page) notFound();
  return <SeoTopicArticle page={page} />;
}
