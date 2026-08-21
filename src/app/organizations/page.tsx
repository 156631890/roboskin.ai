import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
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

export default function OrganizationsPage() {
  const modelById = new Map(robotAiModelEntries.map((entry) => [entry.id, entry]));
  const connectedModelCount = new Set(robotAiOrganizationRelations.map((relation) => relation.modelId)).size;
  const stats = [
    { value: researchOrganizationEntries.length, label: 'verified organizations' },
    { value: researchOrganizationKinds.length, label: 'organization types' },
    { value: connectedModelCount, label: 'connected robot AI models' },
    { value: robotAiOrganizationRelations.length, label: 'evidence-backed relations' },
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
                Robot AI research organizations, labs, and companies
              </h1>
              <p className="mt-6 max-w-4xl text-lg leading-relaxed text-[var(--text-soft)]">
                RoboSkin.ai maps universities, research labs, and companies explicitly named in primary sources for models in its Robot AI directory.
              </p>
              <p className="mt-4 max-w-4xl text-sm leading-relaxed text-[var(--text-muted)]">
                A source-listed affiliation or contribution does not establish ownership, funding, endorsement, current employment, or affiliation with RoboSkin.ai. Every relationship below keeps its model evidence separate from the organization&apos;s official identity source.
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
        <div className="container-shell">
          <div className="mb-7 max-w-3xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#ff6b3d]">How to read the records</p>
            <h2 className="mt-3 text-3xl font-bold text-white">Identity, relationship, and editorial normalization stay separate</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ['Official identity source', 'Confirms the public organization name and official website. It does not prove participation in a particular model.'],
              ['Model relationship evidence', 'A primary paper, project page, or provider release supports each developed, co-developed, or contributor relationship.'],
              ['Editorial normalization', 'Aliases such as UC Berkeley, MIT, and FAIR at Meta resolve to one stable organization ID without changing the source wording.'],
            ].map(([title, text]) => (
              <article key={title} className="signal-panel p-6">
                <h3 className="text-lg font-semibold text-white">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">{text}</p>
              </article>
            ))}
          </div>
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
                  const relations = robotAiOrganizationRelations.filter(
                    (relation) => relation.organizationId === organization.id,
                  );

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

                      <div className="mt-6 border-t border-white/10 pt-5">
                        <h4 className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-white">
                          Connected model evidence
                        </h4>
                        <ul className="mt-4 space-y-5">
                          {relations.map((relation) => {
                            const model = modelById.get(relation.modelId);
                            if (!model) return null;

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
              Coverage is limited to organizations explicitly connected to the current source-reviewed Robot AI model directory. Absence does not mean an organization is inactive in robotics, and inclusion does not imply that RoboSkin.ai ranks, recommends, represents, or is affiliated with it.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
              Relationship wording follows the strongest claim supported by the reviewed source: an official provider statement may support “developed by,” a joint paper may support “co-developed by,” and an author affiliation supports only “contributed by.”
            </p>
          </article>

          <aside className="signal-panel p-7 md:p-9">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#ff6b3d]">Related evidence routes</p>
            <div className="mt-5 grid gap-3">
              {[
                ['/robot-foundation-models', 'Compare robot AI models'],
                ['/research-index', 'Open the research index'],
                ['/datasets', 'Browse tactile datasets'],
                ['/research', 'Read research briefs'],
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
