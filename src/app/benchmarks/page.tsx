import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/JsonLd';
import EvidenceDatabaseMethod from '@/components/EvidenceDatabaseMethod';
import SeoTopicArticle from '@/components/SeoTopicArticle';
import TactileBenchmarkExplorer from '@/components/TactileBenchmarkExplorer';
import { getSeoTopicPage } from '@/content/seo-topic-pages';
import { buildTactileBenchmarksJsonLd } from '@/lib/seo';
import { buildSeoTopicMetadata } from '@/lib/seo-topic';
import { tactileBenchmarkEntries } from '@/lib/tactile-benchmarks';

const page = getSeoTopicPage('/benchmarks');

export function generateMetadata(): Metadata {
  if (!page) return { title: 'Tactile robotics benchmarks topic not found' };
  return buildSeoTopicMetadata(page);
}

export default function TactileBenchmarksPage() {
  if (!page) notFound();
  const reviewedThrough = tactileBenchmarkEntries.reduce(
    (latest, entry) => entry.sourceReviewed > latest ? entry.sourceReviewed : latest,
    '',
  );
  return (
    <>
      <JsonLd data={buildTactileBenchmarksJsonLd(tactileBenchmarkEntries)} />
      <SeoTopicArticle page={page}>
        <EvidenceDatabaseMethod
          name="tactile benchmark directory"
          recordCount={tactileBenchmarkEntries.length}
          reviewedThrough={reviewedThrough}
          scope="This directory separates named benchmarks and author-defined evaluation protocols from generic dataset scale or isolated headline scores. Every record identifies tasks, modalities, sensors, robots, metrics, protocol, access, and a limitation boundary."
          inclusion={[
            'The primary source must document a repeatable task and evaluation protocol, not only a demonstration.',
            'Reported metrics remain attached to the named robot, sensor, task set, baselines, and rollout conditions.',
          ]}
          normalization={[
            'Percentage points, averages, rollout counts, and task names preserve the source protocol.',
            'Simulation, physical-robot, author-run, and independently hosted evidence are labeled separately.',
          ]}
          exclusions={[
            'No score is promoted to a universal leaderboard when protocols, sensors, robots, or splits differ.',
            'A project demo or dataset size is not treated as benchmark performance.',
          ]}
          limitations={[
            'Most current tactile benchmarks remain author-defined and cannot be ranked across incompatible protocols.',
            'Directory inclusion does not establish independent reproduction, production safety, or statistical significance.',
          ]}
          links={[
            { label: 'Compare tactile datasets', href: '/datasets' },
            { label: 'Read evaluation guide', href: '/guides/tactile-sensor-benchmark-robot-manipulation' },
          ]}
        />
        <TactileBenchmarkExplorer entries={tactileBenchmarkEntries} />
      </SeoTopicArticle>
    </>
  );
}
