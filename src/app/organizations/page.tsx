import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import { researchIndexEntries } from '@/lib/research-index';
import {
  researchManufacturingRelations,
  researchOrganizationPartOfRelations,
  researchSourceAffiliationRelations,
  type ManufacturedByRelation,
  type SourceAffiliationRelation,
} from '@/lib/research-entity-relations';
import { robotAiModelEntries } from '@/lib/robot-ai-models';
import { buildResearchOrganizationDirectoryJsonLd } from '@/lib/research-organization-schema';
import {
  researchOrganizationEntries,
  researchOrganizationKinds,
  robotAiOrganizationRelations,
  type OrganizationModelRelationType,
} from '@/lib/research-organizations';
import {
  buildBreadcrumbJsonLd,
  buildGraphJsonLd,
  buildPageJsonLd,
  buildPageMetadata,
} from '@/lib/seo';
import { tactileBenchmarkEntries } from '@/lib/tactile-benchmarks';
import { tactileDatasetEntries } from '@/lib/tactile-datasets';
import { tactileSensorEntries } from '@/lib/tactile-sensors';
import { researchRobotEntries } from '@/lib/research-robots';

export const metadata: Metadata = buildPageMetadata('/organizations');

const relationLabels: Record<OrganizationModelRelationType, string> = {
  developedBy: 'Developer named by official provider source',
  coDevelopedBy: 'Joint research organization',
  contributedBy: 'Source-listed contributor affiliation',
};

const kindLabels = {
  university: 'Universities',
  'research lab': 'Research labs',
  company: 'Companies',
} as const;

const assetTypeLabels: Record<SourceAffiliationRelation['fromType'], string> = {
  paper: 'Research brief',
  dataset: 'Dataset',
  benchmark: 'Benchmark',
  sensor: 'Sensor',
};

function connectedAsset(relation: SourceAffiliationRelation) {
  switch (relation.fromType) {
    case 'paper': {
      const entry = researchIndexEntries.find((item) => item.id === relation.fromId);
      if (!entry) throw new Error(`Organization page references missing paper ${relation.fromId}.`);
      return { name: entry.title, href: `/research/${entry.id}` };
    }
    case 'dataset': {
      const entry = tactileDatasetEntries.find((item) => item.id === relation.fromId);
      if (!entry) throw new Error(`Organization page references missing dataset ${relation.fromId}.`);
      return { name: entry.name, href: `/datasets#dataset-${entry.id}` };
    }
    case 'benchmark': {
      const entry = tactileBenchmarkEntries.find((item) => item.id === relation.fromId);
      if (!entry) throw new Error(`Organization page references missing benchmark ${relation.fromId}.`);
      return { name: entry.name, href: `/benchmarks#benchmark-${entry.id}` };
    }
    case 'sensor': {
      const entry = tactileSensorEntries.find((item) => item.id === relation.fromId);
      if (!entry) throw new Error(`Organization page references missing sensor ${relation.fromId}.`);
      return { name: entry.name, href: `/sensors#sensor-${entry.id}` };
    }
  }
}

function manufacturedAsset(relation: ManufacturedByRelation) {
  if (relation.fromType === 'sensor') {
    const entry = tactileSensorEntries.find((item) => item.id === relation.fromId);
    if (!entry) throw new Error(`Organization page references missing manufactured sensor ${relation.fromId}.`);
    return { name: entry.name, href: `/sensors#sensor-${entry.id}`, type: 'Sensor' };
  }

  const entry = researchRobotEntries.find((item) => item.id === relation.fromId);
  if (!entry) throw new Error(`Organization page references missing manufactured robot ${relation.fromId}.`);
  return { name: entry.name, href: `/robots#robot-${entry.id}`, type: 'Robot platform' };
}

export default function OrganizationsPage() {
  const modelById = new Map(robotAiModelEntries.map((entry) => [entry.id, entry]));
  const organizationById = new Map(researchOrganizationEntries.map((entry) => [entry.id, entry]));
  const connectedResearchAssetCount = new Set([
    ...robotAiOrganizationRelations.map((relation) => `model:${relation.modelId}`),
    ...researchSourceAffiliationRelations.map(
      (relation) => `${relation.fromType}:${relation.fromId}`,
    ),
    ...researchManufacturingRelations.map(
      (relation) => `${relation.fromType}:${relation.fromId}`,
    ),
  ]).size;
  const evidenceBackedRelationCount = robotAiOrganizationRelations.length
    + researchSourceAffiliationRelations.length
    + researchManufacturingRelations.length
    + researchOrganizationPartOfRelations.length;
  const stats = [
    { value: researchOrganizationEntries.length, label: 'verified organizations' },
    { value: researchOrganizationKinds.length, label: 'organization types' },
    { value: connectedResearchAssetCount, label: 'connected research assets' },
    { value: evidenceBackedRelationCount, label: 'evidence-backed relations' },
  ];

  return (
    <>
      <JsonLd data={buildGraphJsonLd([
        buildPageJsonLd('/organizations'),
        buildBreadcrumbJsonLd('/organizations'),
      ])} />
      <JsonLd data={buildResearchOrganizationDirectoryJsonLd()} />

      <section className="py-14 md:py-20">
        <div className="container-shell">
          <nav aria-label="Breadcrumb" className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--text-muted)]">
            <Link href="/" className="hover:text-white">Home</Link>
            <span aria-hidden="true" className="px-2">/</span>
            <span aria-current="page">Organizations</span>
          </nav>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <span className="eyebrow">Verified organization directory</span>
              <h1 className="mt-5 max-w-5xl text-4xl font-bold leading-tight text-white md:text-6xl">
                Tactile AI and robotics research organizations
              </h1>
              <p className="mt-6 max-w-4xl text-lg leading-relaxed text-[var(--text-soft)]">
                RoboSkin.ai connects official organization identities to source-reviewed papers, datasets, benchmarks, sensors, and robot AI models.
              </p>
              <p className="mt-4 max-w-4xl text-sm leading-relaxed text-[var(--text-muted)]">
                Coverage is intentionally partial. A source-listed affiliation or contribution does not establish ownership, funding, endorsement, current employment, or affiliation with RoboSkin.ai. Each relationship keeps its research evidence separate from the organization&apos;s official identity source.
              </p>
            </div>

            <dl className="grid gap-3 sm:grid-cols-2">
              {stats.map((item) => (
                <div key={item.label} className="signal-panel p-5">
                  <dt className="font-mono text-2xl font-semibold text-white">{item.value}</dt>
                  <dd className="mt-2 text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">{item.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-20">
        <div className="container-shell grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <article className="signal-panel p-7 md:p-9">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#ff6b3d]">How to read the records</p>
            <h2 className="mt-3 text-3xl font-bold leading-tight text-white">
              Identity and provenance stay separate
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-[var(--text-soft)]">
              The directory follows a strict evidence chain: official identity, source wording, connected research asset, and claim boundary. It does not turn an author affiliation into ownership of a paper, dataset, benchmark, sensor, or model.
            </p>
            <p className="mt-6 font-mono text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">
              Identity → source affiliation → research asset
            </p>
          </article>

          <dl className="border-y border-white/10">
            {[
              ['Official identity', 'Confirms the public organization name and exact official URL. It does not prove participation in a particular research asset.'],
              ['Source-reviewed provenance', 'A primary paper, project page, or provider release supports every visible connection and preserves the source wording.'],
              ['Partial normalization', 'Only the currently reviewed subset is shown. Missing organizations are not evidence of inactivity, and aliases remain separate from parent relationships.'],
            ].map(([title, text], index) => (
              <div key={title} className="grid gap-3 border-b border-white/10 py-6 last:border-b-0 sm:grid-cols-[2.5rem_0.7fr_1.3fr] sm:gap-5">
                <dt className="font-mono text-sm tabular-nums text-[#ff6b3d]">0{index + 1}</dt>
                <dt className="font-semibold text-white">{title}</dt>
                <dd className="text-sm leading-relaxed text-[var(--text-muted)]">{text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {researchOrganizationKinds.map((kind) => {
        const organizations = researchOrganizationEntries.filter((entry) => entry.kind === kind);

        return (
          <section key={kind} id={kind.replace(' ', '-')} className="scroll-mt-24 pb-16 md:pb-20">
            <div className="container-shell">
              <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#ff6b3d]">Organization type</p>
                  <h2 className="mt-2 text-3xl font-bold text-white">{kindLabels[kind]}</h2>
                </div>
                <p className="font-mono text-sm text-[var(--text-muted)]">{organizations.length} records</p>
              </div>

              <div className="grid gap-5 lg:grid-cols-2">
                {organizations.map((organization) => {
                  const modelRelations = robotAiOrganizationRelations.filter(
                    (relation) => relation.organizationId === organization.id,
                  );
                  const sourceAffiliations = researchSourceAffiliationRelations.filter(
                    (relation) => relation.toId === organization.id,
                  );
                  const manufacturingRelations = researchManufacturingRelations.filter(
                    (relation) => relation.toId === organization.id,
                  );
                  const parentRelations = researchOrganizationPartOfRelations.filter(
                    (relation) => relation.fromId === organization.id,
                  );
                  const childRelations = researchOrganizationPartOfRelations.filter(
                    (relation) => relation.toId === organization.id,
                  );
                  const connectionCount = modelRelations.length + sourceAffiliations.length + manufacturingRelations.length;

                  return (
                    <article
                      key={organization.id}
                      id={`organization-${organization.id}`}
                      className="signal-panel scroll-mt-24 p-6 md:p-7"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <p className="font-mono text-xs uppercase tracking-[0.12em] text-[#ff6b3d]">{organization.kind}</p>
                          <h3 className="mt-2 text-2xl font-semibold text-white">{organization.name}</h3>
                          {organization.aliases.length > 0 ? (
                            <p className="mt-2 text-sm text-[var(--text-muted)]">
                              Source aliases: {organization.aliases.join(', ')}
                            </p>
                          ) : null}
                          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--text-muted)]">
                            {connectionCount} connected research {connectionCount === 1 ? 'relation' : 'relations'}
                          </p>
                        </div>
                        <a
                          href={organization.officialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-tertiary"
                        >
                          Official site
                        </a>
                      </div>

                      {parentRelations.length > 0 || childRelations.length > 0 ? (
                        <div className="mt-6 border-y border-white/10 bg-white/[0.02] px-4 py-4">
                          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">
                            Verified organization structure
                          </p>
                          <ul className="mt-3 space-y-3 text-sm">
                            {parentRelations.map((relation) => {
                              const parent = organizationById.get(relation.toId);
                              if (!parent) throw new Error(`Organization page references missing parent ${relation.toId}.`);
                              return (
                                <li key={`${relation.fromId}-${relation.toId}`}>
                                  <div>
                                    <span className="text-[var(--text-muted)]">Part of </span>
                                    <Link
                                      href={`/organizations#organization-${parent.id}`}
                                      className="font-semibold text-white underline decoration-white/20 underline-offset-4 hover:text-[#ff6b3d]"
                                    >
                                      {parent.name}
                                    </Link>
                                    <a
                                      href={relation.evidenceUrls[0]}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="ml-3 font-mono text-[11px] uppercase text-[#ff6b3d] hover:text-white"
                                    >
                                      Structure source
                                    </a>
                                  </div>
                                  <p className="mt-1 text-xs leading-relaxed text-[var(--text-muted)]">
                                    {relation.evidenceBoundary}
                                  </p>
                                </li>
                              );
                            })}
                            {childRelations.map((relation) => {
                              const child = organizationById.get(relation.fromId);
                              if (!child) throw new Error(`Organization page references missing unit ${relation.fromId}.`);
                              return (
                                <li key={`${relation.fromId}-${relation.toId}`}>
                                  <div>
                                    <span className="text-[var(--text-muted)]">Linked research unit </span>
                                    <Link
                                      href={`/organizations#organization-${child.id}`}
                                      className="font-semibold text-white underline decoration-white/20 underline-offset-4 hover:text-[#ff6b3d]"
                                    >
                                      {child.name}
                                    </Link>
                                    <a
                                      href={relation.evidenceUrls[0]}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="ml-3 font-mono text-[11px] uppercase text-[#ff6b3d] hover:text-white"
                                    >
                                      Structure source
                                    </a>
                                  </div>
                                  <p className="mt-1 text-xs leading-relaxed text-[var(--text-muted)]">
                                    {relation.evidenceBoundary}
                                  </p>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      ) : null}

                      {manufacturingRelations.length > 0 ? (
                        <div className="mt-6 border-t border-white/10 pt-5">
                          <div className="flex items-baseline justify-between gap-4">
                            <h4 className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-white">
                              Official hardware attribution
                            </h4>
                            <span className="font-mono text-xs tabular-nums text-[var(--text-muted)]">
                              {manufacturingRelations.length}
                            </span>
                          </div>
                          <ul className="mt-2 divide-y divide-white/10">
                            {manufacturingRelations.map((relation) => {
                              const asset = manufacturedAsset(relation);
                              return (
                                <li key={`${relation.fromType}-${relation.fromId}`} className="py-5">
                                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                                    <span className="border-l-2 border-[#ff6b3d] pl-2 font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--text-muted)]">
                                      {asset.type}
                                    </span>
                                    <Link
                                      href={asset.href}
                                      className="font-semibold text-white underline decoration-white/20 underline-offset-4 hover:text-[#ff6b3d]"
                                    >
                                      {asset.name}
                                    </Link>
                                    <span className="rounded-md border border-white/10 bg-black/20 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--text-soft)]">
                                      Manufacturer / provider source
                                    </span>
                                  </div>
                                  <p className="mt-2 text-xs leading-relaxed text-[var(--text-soft)]">
                                    Source wording: {relation.sourceLabels.join('; ')}
                                  </p>
                                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-xs">
                                    {relation.evidenceUrls.map((url, index) => (
                                      <a
                                        key={url}
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="font-semibold text-[#ff6b3d] hover:text-white"
                                      >
                                        Product source {index + 1}
                                      </a>
                                    ))}
                                  </div>
                                  <p className="mt-2 text-xs leading-relaxed text-[var(--text-muted)]">
                                    {relation.evidenceBoundary}
                                  </p>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      ) : null}

                      {sourceAffiliations.length > 0 ? (
                        <div className="mt-6 border-t border-white/10 pt-5">
                          <div className="flex items-baseline justify-between gap-4">
                            <h4 className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-white">
                              Source-reviewed research assets
                            </h4>
                            <span className="font-mono text-xs tabular-nums text-[var(--text-muted)]">
                              {sourceAffiliations.length}
                            </span>
                          </div>
                          <ul className="mt-2 divide-y divide-white/10">
                            {sourceAffiliations.map((relation) => {
                              const asset = connectedAsset(relation);
                              return (
                                <li key={`${relation.fromType}-${relation.fromId}`} className="py-5">
                                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                                    <span className="border-l-2 border-[#ff6b3d] pl-2 font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--text-muted)]">
                                      {assetTypeLabels[relation.fromType]}
                                    </span>
                                    <Link
                                      href={asset.href}
                                      className="font-semibold text-white underline decoration-white/20 underline-offset-4 hover:text-[#ff6b3d]"
                                    >
                                      {asset.name}
                                    </Link>
                                  </div>
                                  <p className="mt-2 text-xs leading-relaxed text-[var(--text-soft)]">
                                    Source wording: {relation.sourceLabels.join('; ')}
                                  </p>
                                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-xs">
                                    {relation.evidenceUrls.map((url, index) => (
                                      <a
                                        key={url}
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="font-semibold text-[#ff6b3d] hover:text-white"
                                      >
                                        Affiliation source {index + 1}
                                      </a>
                                    ))}
                                  </div>
                                  <p className="mt-2 text-xs leading-relaxed text-[var(--text-muted)]">
                                    {relation.evidenceBoundary}
                                  </p>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      ) : null}

                      {modelRelations.length > 0 ? (
                        <div className="mt-6 border-t border-white/10 pt-5">
                          <div className="flex items-baseline justify-between gap-4">
                            <h4 className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-white">
                              Robot AI model provenance
                            </h4>
                            <span className="font-mono text-xs tabular-nums text-[var(--text-muted)]">
                              {modelRelations.length}
                            </span>
                          </div>
                          <ul className="mt-4 space-y-5">
                            {modelRelations.map((relation) => {
                              const model = modelById.get(relation.modelId);
                              if (!model) throw new Error(`Organization page references missing model ${relation.modelId}.`);

                              return (
                                <li key={`${relation.modelId}-${relation.relation}`}>
                                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                                    <Link
                                      href={`/robot-foundation-models#model-${model.id}`}
                                      className="font-semibold text-white hover:text-[#ff6b3d]"
                                    >
                                      {model.name}
                                    </Link>
                                    <span className="rounded-md border border-white/10 bg-black/20 px-2 py-1 font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--text-soft)]">
                                      {relationLabels[relation.relation]}
                                    </span>
                                  </div>
                                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-xs">
                                    {relation.evidenceUrls.map((url, index) => (
                                      <a
                                        key={url}
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="font-semibold text-[#ff6b3d] hover:text-white"
                                      >
                                        Relationship source {index + 1}
                                      </a>
                                    ))}
                                  </div>
                                  <p className="mt-2 text-xs leading-relaxed text-[var(--text-muted)]">
                                    {relation.evidenceBoundary}
                                  </p>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      ) : null}

                      {connectionCount === 0 ? (
                        <p className="mt-6 border-t border-white/10 pt-5 text-sm leading-relaxed text-[var(--text-muted)]">
                          Identity verified; no paper, dataset, benchmark, sensor, robot, or model relation is published in the current partial coverage.
                        </p>
                      ) : null}

                      <div className="mt-6 border-t border-white/10 pt-5 text-xs leading-relaxed text-[var(--text-muted)]">
                        <p>{organization.evidenceBoundary}</p>
                        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
                          {organization.identitySources.map((source) => (
                            <a
                              key={source.url}
                              href={source.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-semibold text-[var(--text-soft)] hover:text-white"
                            >
                              {source.label}
                            </a>
                          ))}
                          <span>Reviewed {organization.sourceReviewed}</span>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>
        );
      })}

      <section className="pb-20">
        <div className="container-shell grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <article className="signal-panel p-7 md:p-9">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#ff6b3d]">Methodology and limits</p>
            <h2 className="mt-3 text-2xl font-bold text-white">This is a source map, not a ranking</h2>
            <p className="mt-4 text-sm leading-relaxed text-[var(--text-soft)]">
              Coverage is limited to the organizations and research assets normalized from the current reviewed sources. It is not a complete field census. Absence does not mean an organization is inactive in robotics, and inclusion does not imply that RoboSkin.ai ranks, recommends, represents, or is affiliated with it.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
              Relationship wording follows the strongest supported claim. Source affiliation remains provenance, not ownership; laboratory structure uses only directly supported “part of” evidence; manufacturer/provider attribution requires an official hardware source; model relationships preserve their developed, co-developed, or contributor boundary.
            </p>
          </article>

          <aside className="signal-panel p-7 md:p-9">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#ff6b3d]">Related evidence routes</p>
            <div className="mt-5 grid gap-3">
              {[
                ['/robot-foundation-models', 'Compare robot AI models'],
                ['/robots', 'Browse verified robot platforms'],
                ['/research', 'Read research briefs'],
                ['/datasets', 'Browse tactile datasets'],
                ['/benchmarks', 'Browse tactile benchmarks'],
                ['/sensors', 'Compare tactile sensors'],
                ['/research-index', 'Open the research index'],
              ].map(([href, label]) => (
                <Link key={href} href={href} className="font-semibold text-white hover:text-[#ff6b3d]">
                  {label} {'->'}
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
