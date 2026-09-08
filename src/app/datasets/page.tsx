import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/JsonLd';
import SeoTopicArticle from '@/components/SeoTopicArticle';
import TactileDatasetExplorer from '@/components/TactileDatasetExplorer';
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
      } />
    </>
  );
}
