import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/JsonLd';
import SeoTopicArticle from '@/components/SeoTopicArticle';
import TactileDatasetExplorer from '@/components/TactileDatasetExplorer';
import DatasetAvailabilityAnalysis from '@/components/DatasetAvailabilityAnalysis';
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
        <TactileDatasetExplorer entries={tactileDatasetEntries} useCases={[
          { label: 'Materials & representations', ids: ['rct', 'tvl', 'touch-and-go', 'objectfolder-real', 'objectfolder-2', 'tacverse', 'univtac-encoder-pretraining-corpus'] },
          { label: 'Robot manipulation', ids: ['t-rex', 'robotacdex', 'prism-industrial-skill', 'softvtbench', 'univtac-benchmark-dataset'] },
          { label: 'Full-hand touch', ids: ['ht-bench', 'humanoid-vta', 'tactidex'] },
          { label: 'Human demonstrations', ids: ['egotouch', 'freetacman', 'vtdexmanip', 'touch-and-go', 'tactidex'] },
        ]} />
      }>
        <DatasetAvailabilityAnalysis entries={tactileDatasetEntries} />
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
