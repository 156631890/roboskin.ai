import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/JsonLd';
import RobotWorldModelEvidenceTable from '@/components/RobotWorldModelEvidenceTable';
import SeoTopicArticle from '@/components/SeoTopicArticle';
import ResearchReadingGuide from '@/components/ResearchReadingGuide';
import worldModelResearchUpdate from '@/content/world-model-research-update.json';
import { getSeoTopicPage } from '@/content/seo-topic-pages';
import { buildSeoTopicMetadata } from '@/lib/seo-topic';
import { buildRobotWorldModelEvidenceJsonLd } from '@/lib/robot-world-model-schema';
import { robotWorldModelEvidenceEntries } from '@/lib/robot-world-models';
import { worldModelTrackerEntries } from '@/lib/world-model-tracker';
import { selectTrackerEntries, trackerPath } from '@/lib/world-model-tracker-tools.mjs';

const page = getSeoTopicPage('/robot-world-models');

export function generateMetadata(): Metadata {
  if (!page) return { title: 'Robot world models topic not found' };
  return buildSeoTopicMetadata(page);
}

export default function RobotWorldModelsPage() {
  if (!page) notFound();
  const recentModels = selectTrackerEntries(worldModelTrackerEntries).slice(0, 3);
  return (
    <>
      <JsonLd data={buildRobotWorldModelEvidenceJsonLd(robotWorldModelEvidenceEntries)} />
      <SeoTopicArticle page={page} leadHref="#world-models-research-update" leadLabel="Explore papers and visual guides" leadContent={<>
        <ResearchReadingGuide update={worldModelResearchUpdate} />
        <section id="recent-world-models" className="container-shell scroll-mt-28 pb-14" aria-labelledby="recent-world-models-heading">
          <p className="eyebrow">Tactile world model tracker</p>
          <h2 id="recent-world-models-heading" className="mt-4 text-3xl font-semibold text-white">Recently added</h2>
          <p className="mt-3 max-w-3xl text-sm text-soft">Recent papers from the tracker, sorted by first publication date. These records and assessments are a review preview pending editorial approval.</p>
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {recentModels.map((entry) => <article key={entry.id} className="signal-panel p-6">
              <p className="font-mono text-xs text-soft">Paper date: <time dateTime={entry.releaseDate ?? undefined}>{entry.releaseDate ?? 'Not verified'}</time></p>
              <h3 className="mt-3 text-xl font-semibold text-white"><Link href={`${trackerPath}#${entry.id}`} className="underline decoration-white/25 underline-offset-4 hover:text-accent">{entry.name}</Link></h3>
              <p className="mt-3 text-sm leading-relaxed text-soft">{entry.verdict}</p>
            </article>)}
          </div>
          <Link href={trackerPath} className="btn-primary mt-6">See all tactile world models in the tracker →</Link>
        </section>
      </>}>
        <aside className="container-shell pb-6" aria-label="Full world model tracker">
          <p className="text-sm text-soft">For the complete, updated list, visit the <Link href={trackerPath} className="text-accent underline underline-offset-4">tactile world model tracker (review preview)</Link>. The five-model evidence table below retains its original source-review dates and paper versions.</p>
        </aside>
        <RobotWorldModelEvidenceTable entries={robotWorldModelEvidenceEntries} />
      </SeoTopicArticle>
    </>
  );
}
