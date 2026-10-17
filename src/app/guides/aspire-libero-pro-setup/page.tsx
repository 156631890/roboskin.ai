import ProgrammingArticle from '@/components/ProgrammingArticle';
import { aspireSetup } from '@/content/aspire-setup';
import { buildSeoTopicMetadata } from '@/lib/seo-topic';

export const metadata = buildSeoTopicMetadata(aspireSetup);

export default function AspireSetupPage() {
  return <ProgrammingArticle page={aspireSetup} />;
}
