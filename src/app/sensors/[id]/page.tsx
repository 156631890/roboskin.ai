import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SeoTopicArticle from '@/components/SeoTopicArticle';
import { sensorDetailPages } from '@/content/sensor-detail-pages';
import { buildSeoTopicMetadata } from '@/lib/seo-topic';

type SensorPageProps = { params: Promise<{ id: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return sensorDetailPages.map((page) => ({ id: page.path.split('/').at(-1)! }));
}

export async function generateMetadata({ params }: SensorPageProps): Promise<Metadata> {
  const { id } = await params;
  const page = sensorDetailPages.find((item) => item.path === `/sensors/${id}`);
  if (!page) notFound();
  return buildSeoTopicMetadata(page);
}

export default async function SensorPage({ params }: SensorPageProps) {
  const { id } = await params;
  const page = sensorDetailPages.find((item) => item.path === `/sensors/${id}`);
  if (!page) notFound();
  return <SeoTopicArticle page={page}>
    {id === 'gelsight-mini' && <p className="container-shell pb-10"><Link href="/guides/gelsight-vs-digit" className="underline">Compare GelSight Mini and DIGIT for your experiment</Link></p>}
  </SeoTopicArticle>;
}
