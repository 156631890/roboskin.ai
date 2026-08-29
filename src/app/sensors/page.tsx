import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/JsonLd';
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
        <TactileSensorExplorer
          entries={tactileSensorEntries}
          organizationLinks={manufacturerOrganizationLinks}
        />
      </SeoTopicArticle>
    </>
  );
}
