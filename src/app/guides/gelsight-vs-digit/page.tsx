import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SeoTopicArticle from '@/components/SeoTopicArticle';
import { getSeoTopicPage } from '@/content/seo-topic-pages';
import { buildSeoTopicMetadata } from '@/lib/seo-topic';

const page = getSeoTopicPage('/guides/gelsight-vs-digit');

export function generateMetadata(): Metadata {
  return page ? buildSeoTopicMetadata(page) : { title: 'Sensor comparison not found' };
}

export default function GelsightVsDigitPage() {
  if (!page) notFound();
  return <SeoTopicArticle page={page} />;
}
