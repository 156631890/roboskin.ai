import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/JsonLd';
import EvidenceDatabaseMethod from '@/components/EvidenceDatabaseMethod';
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
  const reviewedThrough = tactileDatasetEntries.reduce(
    (latest, entry) => entry.sourceReviewed > latest ? entry.sourceReviewed : latest,
    '',
  );
  return (
    <>
      <JsonLd data={buildTactileDatasetsJsonLd(tactileDatasetEntries)} />
      <SeoTopicArticle page={page}>
        <EvidenceDatabaseMethod
          name="tactile dataset directory"
          recordCount={tactileDatasetEntries.length}
          reviewedThrough={reviewedThrough}
          scope="This directory records tactile or visuo-tactile corpora with enough public evidence to identify the data source, sensing setup, tasks, access boundary, and a primary paper or official project."
          inclusion={[
            'A named corpus or release must be traceable to a primary paper or official project source.',
            'Robot, sensor, modalities, task, format, access, and license fields are recorded only where the reviewed source supports them.',
          ]}
          normalization={[
            'Counts preserve the source unit: samples, frames, episodes, trajectories, or hours are not converted into a false common scale.',
            'Full corpora, public subsets, training mixtures, and benchmark packages stay separate when the source distinguishes them.',
          ]}
          exclusions={[
            'A repository software license is not automatically assigned to dataset files or model weights.',
            'No availability, sample count, calibration, or synchronization claim is inferred from a project name or secondary article.',
          ]}
          limitations={[
            'This is a curated directory rather than a complete census of tactile robotics data.',
            'Source review does not mean every hosted file was downloaded, checksummed, or independently reproduced.',
          ]}
          links={[
            { label: 'Open transparency audit', href: '/reports/tactile-robotics-data-transparency-audit-2026' },
            { label: 'Download audit CSV', href: '/reports/tactile-robotics-data-transparency-audit-2026.csv' },
            { label: 'Open audit JSON', href: '/reports/tactile-robotics-data-transparency-audit-2026.json' },
          ]}
        />
        <TactileDatasetExplorer entries={tactileDatasetEntries} />
      </SeoTopicArticle>
    </>
  );
}
