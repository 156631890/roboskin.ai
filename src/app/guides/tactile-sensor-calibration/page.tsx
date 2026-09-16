import ProgrammingArticle from '@/components/ProgrammingArticle';
import { calibrationTutorial } from '@/content/engineering-pages';
import { buildSeoTopicMetadata } from '@/lib/seo-topic';

export const metadata = buildSeoTopicMetadata(calibrationTutorial);

export default function TactileSensorCalibrationPage() {
  return <ProgrammingArticle page={calibrationTutorial} />;
}
