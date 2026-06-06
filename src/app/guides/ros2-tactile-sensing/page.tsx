import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SeoTopicArticle from '@/components/SeoTopicArticle';
import { getSeoTopicPage } from '@/content/seo-topic-pages';
import { buildSeoTopicMetadata } from '@/lib/seo-topic';

const page = getSeoTopicPage('/guides/ros2-tactile-sensing');

export function generateMetadata(): Metadata {
  if (!page) {
    return {
      title: 'ROS 2 tactile sensing topic not found',
    };
  }

  return buildSeoTopicMetadata(page);
}

export default function Ros2TactileSensingPage() {
  if (!page) {
    notFound();
  }

  return <SeoTopicArticle page={page} />;
}
