import { readFile } from 'node:fs/promises';
import path from 'node:path';
import ProgrammingArticle from '@/components/ProgrammingArticle';
import CodeBlock from '@/components/CodeBlock';
import { pythonTactileTutorial } from '@/content/programming-pages';
import { buildSeoTopicMetadata } from '@/lib/seo-topic';

export const metadata = buildSeoTopicMetadata(pythonTactileTutorial);

export default async function PythonTactilePage() {
  // Display the same file distributed in the download.
  const source = await readFile(path.join(process.cwd(), 'public/tutorials/python-tactile/process_tactile.py'), 'utf8');
  return <ProgrammingArticle page={pythonTactileTutorial}>
    <section id="complete-code" className="tutorial-section">
      <h2>Complete Python script</h2>
      <p>This is the full downloadable process_tactile.py. Input validation and event analysis are ordinary Python; Matplotlib is imported only when generating plots.</p>
      <details className="tutorial-source"><summary>Read the complete script ({source.split('\n').length} lines)</summary><CodeBlock label="process_tactile.py — complete source" language="python" value={source} /></details>
    </section>
  </ProgrammingArticle>;
}
