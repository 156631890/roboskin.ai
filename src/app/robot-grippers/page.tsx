import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SeoTopicArticle from '@/components/SeoTopicArticle';
import { getSeoTopicPage } from '@/content/seo-topic-pages';
import { buildSeoTopicMetadata } from '@/lib/seo-topic';
import { GripperDirectory } from '@/components/StructureDirectoryTables';

const page = getSeoTopicPage('/robot-grippers');
export function generateMetadata(): Metadata {
  if (!page) return {};
  return buildSeoTopicMetadata(page);
}
export default function Page() {
  if (!page) notFound();
  return <SeoTopicArticle page={page} leadHref="#gripper-models" leadLabel="Compare source-backed records" leadContent={<GripperDirectory />} />;
}
