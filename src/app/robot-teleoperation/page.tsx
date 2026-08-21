import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SeoTopicArticle from '@/components/SeoTopicArticle';
import { getSeoTopicPage } from '@/content/seo-topic-pages';
import { buildSeoTopicMetadata } from '@/lib/seo-topic';

const page = getSeoTopicPage('/robot-teleoperation');

export function generateMetadata(): Metadata {
  if (!page) return { title: 'Robot teleoperation topic not found' };
  return buildSeoTopicMetadata(page);
}

export default function RobotTeleoperationPage() {
  if (!page) notFound();
  return <SeoTopicArticle page={page} />;
}
