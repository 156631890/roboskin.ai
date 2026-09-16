import { readFile } from 'node:fs/promises';
import path from 'node:path';
import ProgrammingArticle from '@/components/ProgrammingArticle';
import CodeBlock from '@/components/CodeBlock';
import { lerobotTutorial } from '@/content/engineering-pages';
import { buildSeoTopicMetadata } from '@/lib/seo-topic';

export const metadata = buildSeoTopicMetadata(lerobotTutorial);

export default async function LeRobotDatasetFormatPage() {
  const source = await readFile(path.join(process.cwd(), 'public/tutorials/lerobot-validation/check_dataset.py'), 'utf8');
  return <ProgrammingArticle page={lerobotTutorial}>
    <section id="complete-code" className="tutorial-section">
      <h2>Complete Python script</h2>
      <p>This is the same check_dataset.py supplied in the download. It reads small local Parquet snapshots and writes a separate JSON report.</p>
      <details className="tutorial-source"><summary>Read the complete checker ({source.split('\n').length} lines)</summary><CodeBlock label="check_dataset.py — complete source" language="python" value={source} /></details>
    </section>
  </ProgrammingArticle>;
}
