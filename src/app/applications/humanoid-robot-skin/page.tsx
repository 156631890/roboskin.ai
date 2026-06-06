import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SeoTopicArticle from '@/components/SeoTopicArticle';
import { getSeoTopicPage } from '@/content/seo-topic-pages';
import { buildSeoTopicMetadata } from '@/lib/seo-topic';

const page = getSeoTopicPage('/applications/humanoid-robot-skin');

export function generateMetadata(): Metadata {
  if (!page) {
    return {
      title: 'Humanoid robot skin topic not found',
    };
  }

  return buildSeoTopicMetadata(page);
}

export default function HumanoidRobotSkinPage() {
  if (!page) {
    notFound();
  }

  return <SeoTopicArticle page={page} />;
}
