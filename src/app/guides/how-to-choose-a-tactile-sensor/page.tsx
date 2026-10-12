import type { Metadata } from 'next';
import SeoTopicArticle from '@/components/SeoTopicArticle';
import { tactileSelectionGuide } from '@/content/tactile-selection-guide';
import { buildSeoTopicMetadata } from '@/lib/seo-topic';

export const metadata: Metadata = buildSeoTopicMetadata(tactileSelectionGuide);

export default function TactileSensorSelectionPage() {
  return <SeoTopicArticle page={tactileSelectionGuide} />;
}
