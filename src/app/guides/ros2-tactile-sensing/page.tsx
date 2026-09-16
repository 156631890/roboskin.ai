import ProgrammingArticle from '@/components/ProgrammingArticle';
import { ros2Tutorial } from '@/content/programming-pages';
import { buildSeoTopicMetadata } from '@/lib/seo-topic';

export const metadata = buildSeoTopicMetadata(ros2Tutorial);

export default function Ros2TactileSensingPage() {
  return <ProgrammingArticle page={ros2Tutorial} />;
}
