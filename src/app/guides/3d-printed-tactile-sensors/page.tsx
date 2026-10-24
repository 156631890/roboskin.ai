import type { Metadata } from 'next';
import SeoTopicArticle from '@/components/SeoTopicArticle';
import { printedTactileGuide } from '@/content/printed-tactile-guide';
import { buildSeoTopicMetadata } from '@/lib/seo-topic';
export const metadata: Metadata = buildSeoTopicMetadata(printedTactileGuide);
export default function PrintedTactileGuidePage() { return <SeoTopicArticle page={printedTactileGuide} />; }
