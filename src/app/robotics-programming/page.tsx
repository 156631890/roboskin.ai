import ProgrammingArticle from '@/components/ProgrammingArticle';
import { roboticsProgramming } from '@/content/programming-pages';
import { buildSeoTopicMetadata } from '@/lib/seo-topic';

export const metadata = buildSeoTopicMetadata(roboticsProgramming);

export default function RoboticsProgrammingPage() {
  return <ProgrammingArticle page={roboticsProgramming} />;
}
