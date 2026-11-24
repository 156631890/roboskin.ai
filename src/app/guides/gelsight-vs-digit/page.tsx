import Link from 'next/link';
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
  return <SeoTopicArticle page={page}>
    <p className="container-shell pb-10"><Link href="/reports/tactile-ai-robot-skin-landscape-2026#weekly-preview" className="underline">Preview the weekly tactile sensing report</Link></p>
  </SeoTopicArticle>;
}
