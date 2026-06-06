import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SeoTopicArticle from '@/components/SeoTopicArticle';
import { getSeoTopicPage } from '@/content/seo-topic-pages';
import { buildSeoTopicMetadata } from '@/lib/seo-topic';

const page = getSeoTopicPage('/applications/robot-gripper-tactile-sensor');

export function generateMetadata(): Metadata {
  if (!page) {
    return {
      title: 'Robot gripper tactile sensor topic not found',
    };
  }

  return buildSeoTopicMetadata(page);
}

export default function RobotGripperTactileSensorPage() {
  if (!page) {
    notFound();
  }

  return <SeoTopicArticle page={page} />;
}
