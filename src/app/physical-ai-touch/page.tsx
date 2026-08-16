import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SeoTopicArticle from '@/components/SeoTopicArticle';
import { getSeoTopicPage } from '@/content/seo-topic-pages';
import { buildSeoTopicMetadata } from '@/lib/seo-topic';

const page = getSeoTopicPage('/physical-ai-touch');

export function generateMetadata(): Metadata {
  if (!page) return { title: 'Physical AI and touch topic not found' };
  return buildSeoTopicMetadata(page);
}

export default function PhysicalAiTouchPage() {
  if (!page) notFound();
  return <SeoTopicArticle page={page} />;
}
