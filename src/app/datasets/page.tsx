import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/JsonLd';
import SeoTopicArticle from '@/components/SeoTopicArticle';
import TactileDatasetExplorer from '@/components/TactileDatasetExplorer';
import DatasetAvailabilityAnalysis from '@/components/DatasetAvailabilityAnalysis';
import TactileDataCandidates from '@/components/TactileDataCandidates';
import ResearchResourceActions from '@/components/ResearchResourceActions';
import { getSeoTopicPage } from '@/content/seo-topic-pages';
import { buildSeoTopicMetadata } from '@/lib/seo-topic';
import { buildTactileDatasetsJsonLd } from '@/lib/seo';
import { tactileDatasetEntries } from '@/lib/tactile-datasets';

const page = getSeoTopicPage('/datasets');

export function generateMetadata(): Metadata {
  if (!page) return { title: 'Tactile robotics datasets topic not found' };
  return buildSeoTopicMetadata(page);
}

export default function TactileDatasetsPage() {
  if (!page) notFound();
  return (
    <>
      <JsonLd data={buildTactileDatasetsJsonLd(tactileDatasetEntries)} />
      <SeoTopicArticle page={page} leadContent={
        <>
        <nav className="container-shell mb-6 flex flex-wrap gap-x-6 gap-y-3 text-sm text-accent underline underline-offset-4" aria-label="Dataset validation resources">
          <Link href="/guides/lerobot-dataset-format#download">LeRobot numeric validation ↗</Link>
          <Link href="/guides/lerobot-dataset-format#official-loader">Run the official LeRobot loader ↗</Link>
          <a href="/resources/tactile-dataset-selection-checklist.csv" download>Download selection checklist</a>
        </nav>
        <TactileDatasetExplorer entries={tactileDatasetEntries} useCases={[
          { label: 'Active perception', ids: ['romi-2k'] },
          { label: 'Materials & representations', ids: ['rct', 'tvl', 'touch-and-go', 'objectfolder-real', 'objectfolder-2', 'tacverse', 'univtac-encoder-pretraining-corpus'] },
          { label: 'Robot manipulation', ids: ['bench2dex', 't-rex', 'robotacdex', 'prism-industrial-skill', 'softvtbench', 'univtac-benchmark-dataset'] },
          { label: 'Full-hand touch', ids: ['ht-bench', 'humanoid-vta', 'tactidex'] },
          { label: 'Human demonstrations', ids: ['tacclaw-infinity', 'egotouch', 'freetacman', 'vtdexmanip', 'touch-and-go', 'tactidex'] },
        ]} />
        </>
      }>
        <DatasetAvailabilityAnalysis entries={tactileDatasetEntries} />
        <TactileDataCandidates />
        <section id="related-collections" className="container-shell pb-12" aria-labelledby="related-collections-heading">
          <div className="signal-panel p-6">
            <h2 id="related-collections-heading" className="text-2xl font-semibold">Related collections: check each release separately</h2>
            <p className="mt-3 text-soft">These collection hubs are excluded from the dataset record count and comparison exports. Documentation reviewed October 27, 2026; individual payloads and reuse rights have not been verified.</p>
            <h3 className="mt-6 text-xl font-semibold"><a href="https://www.oahd.gatech.edu/" className="text-accent underline">OAHD: Open Access Haptic Database</a></h3>
            <p className="mt-3 text-soft">The official indexed pages identify a collection of haptic datasets. The home page timed out and the <a href="https://www.oahd.gatech.edu/multi-data/" className="underline">multiple-modalities page</a> returned an error during this review. We cannot verify current files, individual dataset scope or a shared license; treat this as a discovery link, not a validated download.</p>
            <h3 className="mt-6 text-xl font-semibold"><a href="https://robotfeeding.io/datasets/" className="text-accent underline">Robot Assisted Feeding datasets</a></h3>
            <p className="mt-3 text-soft">The collection describes force, torque, pose and RGB-D for two Food Manipulation Strategies releases: <a href="https://doi.org/10.7910/DVN/C8SI1D" className="underline">diverse foods</a> and <a href="https://doi.org/10.7910/DVN/8TTXZ7" className="underline">food manipulation strategies</a>. These are source descriptions, not inspected files. The <a href="https://doi.org/10.7910/DVN/GHV7XZ" className="underline">image-mask subset</a> contains visual annotations, not measured touch. The <a href="https://doi.org/10.7910/DVN/8A1XO3" className="underline">bite-acquisition trials</a> describe a force-equipped robot, but that alone does not prove released force streams. Verify each subset's schema and license before reuse.</p>
            <p className="mt-4 text-soft">Use the <Link href="/guides/lerobot-dataset-format" className="text-accent underline">dataset format and validation guide</Link> to plan field, timestamp and embodiment checks; a linked collection is not a ready-to-train robot policy dataset.</p>
          </div>
        </section>

        <aside className="container-shell pb-12" aria-label="Data processing practice">
          <div className="signal-panel p-6">
            <h2 className="text-2xl font-semibold">Practice reading tactile data before choosing a dataset</h2>
            <p className="mt-3 max-w-3xl text-soft">Use a small synthetic CSV to check timestamps, missing taxels, units and validity, then generate a heatmap and teaching contact events. Real datasets retain their own schemas and licenses.</p>
            <Link href="/guides/python-tactile-data-processing" className="mt-4 inline-block text-accent underline underline-offset-4">Run the Python data-reading and quality-check tutorial →</Link>
          </div>
        </aside>
      </SeoTopicArticle>
      <div className="container-shell pb-12"><ResearchResourceActions context="dataset selection and reproduction planning" /></div>
    </>
  );
}
