import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/JsonLd';
import EvidenceDatabaseMethod from '@/components/EvidenceDatabaseMethod';
import SeoTopicArticle from '@/components/SeoTopicArticle';
import TactileSensorExplorer from '@/components/TactileSensorExplorer';
import { getSeoTopicPage } from '@/content/seo-topic-pages';
import { researchManufacturingRelations } from '@/lib/research-entity-relations';
import { buildTactileSensorsJsonLd } from '@/lib/seo';
import { buildSeoTopicMetadata } from '@/lib/seo-topic';
import { tactileSensorEntries } from '@/lib/tactile-sensors';

const page = getSeoTopicPage('/sensors');

export function generateMetadata(): Metadata {
  if (!page) return { title: 'Tactile sensors topic not found' };
  return buildSeoTopicMetadata(page);
}

export default function TactileSensorsPage() {
  if (!page) notFound();
  const reviewedThrough = tactileSensorEntries.reduce(
    (latest, entry) => entry.sourceReviewed > latest ? entry.sourceReviewed : latest,
    '',
  );
  const manufacturerOrganizationIds = Object.fromEntries(
    researchManufacturingRelations
      .filter((relation) => relation.fromType === 'sensor')
      .map((relation) => [relation.fromId, relation.toId]),
  );
  const manufacturerOrganizationLinks = Object.fromEntries(
    Object.entries(manufacturerOrganizationIds).map(([sensorId, organizationId]) => [
      sensorId,
      `/organizations#organization-${organizationId}`,
    ]),
  );

  return (
    <>
      <JsonLd data={buildTactileSensorsJsonLd(tactileSensorEntries, manufacturerOrganizationIds)} />
      <SeoTopicArticle page={page}>
        <EvidenceDatabaseMethod
          name="tactile sensor directory"
          recordCount={tactileSensorEntries.length}
          reviewedThrough={reviewedThrough}
          scope="This directory compares named tactile sensors and research platforms through sensing principle, form factor, signals, reported rate, integration path, access terms, and explicit evidence boundaries."
          inclusion={[
            'A primary paper, official project, repository, or manufacturer page must identify the sensor and its sensing mechanism.',
            'Specifications are attributed to the source type that states them, with manufacturer evidence kept distinct from research use.',
          ]}
          normalization={[
            'Form factor, signal type, sampling information, integration, and access are normalized into comparable editorial fields.',
            'A raw tactile image, pressure signal, or force estimate is not silently converted into a task-level capability claim.',
          ]}
          exclusions={[
            'No unverified price, stock status, customer, certification, durability, or compatibility claim is added.',
            'Manufacturer specifications are not presented as independently reproduced measurements.',
          ]}
          limitations={[
            'Not every sensor publishes directly comparable resolution, range, rate, calibration, or environmental tests.',
            'A source-reviewed record is not a buying recommendation or a substitute for application-specific validation.',
          ]}
          links={[
            { label: 'Trace sensor organizations', href: '/organizations' },
            { label: 'Compare tactile datasets', href: '/datasets' },
          ]}
        />
        <TactileSensorExplorer
          entries={tactileSensorEntries}
          organizationLinks={manufacturerOrganizationLinks}
        />
      </SeoTopicArticle>
    </>
  );
}
