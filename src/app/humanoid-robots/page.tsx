import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SeoTopicArticle from '@/components/SeoTopicArticle';
import { getSeoTopicPage } from '@/content/seo-topic-pages';
import { buildSeoTopicMetadata } from '@/lib/seo-topic';

const page = getSeoTopicPage('/humanoid-robots');

export function generateMetadata(): Metadata {
  if (!page) return { title: 'Humanoid robots topic not found' };
  return buildSeoTopicMetadata(page);
}

export default function HumanoidRobotsPage() {
  if (!page) notFound();
  return <SeoTopicArticle page={page} />;
}
