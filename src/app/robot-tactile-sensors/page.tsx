import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SeoTopicArticle from '@/components/SeoTopicArticle';
import { getSeoTopicPage } from '@/content/seo-topic-pages';
import { buildSeoTopicMetadata } from '@/lib/seo-topic';
import { RobotTactileSensorDirectory } from '@/components/StructureDirectoryTables';

const page = getSeoTopicPage('/robot-tactile-sensors');
export function generateMetadata(): Metadata {
  if (!page) return {};
  return buildSeoTopicMetadata(page);
}
export default function Page() {
  if (!page) notFound();
  return <SeoTopicArticle page={page} leadHref="#robot-tactile-models" leadLabel="Compare source-backed records" leadContent={<RobotTactileSensorDirectory />} />;
}
