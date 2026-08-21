import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import { robotAiModelEntries } from '@/lib/robot-ai-models';
import {
  buildResearchRobotDirectoryJsonLd,
  buildResearchRobotWebPageJsonLd,
} from '@/lib/research-robot-schema';
import {
  researchRobotEntries,
  researchRobotKinds,
  robotAiRobotRelations,
  type RobotModelRelationType,
} from '@/lib/research-robots';
import {
  buildBreadcrumbJsonLd,
  buildGraphJsonLd,
  buildPageMetadata,
} from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata('/robots');

const relationLabels: Record<RobotModelRelationType, string> = {
  evaluatedOn: 'Evaluated on',
  trainedAcross: 'Included in training',
  demonstratedOn: 'Demonstrated on',
};

const kindLabels = {
  'humanoid robot': 'Humanoid robots',
  'robot arm': 'Robot arms',
  'mobile manipulator': 'Mobile manipulators',
  'research configuration': 'Research configurations',
  'robot platform family': 'Platform families',
  'research setup': 'Research setups',
} as const;

export default function RobotsPage() {
  const modelById = new Map(robotAiModelEntries.map((entry) => [entry.id, entry]));
  const connectedModelCount = new Set(robotAiRobotRelations.map((relation) => relation.modelId)).size;
  const usedKinds = researchRobotKinds.filter((kind) => (
    researchRobotEntries.some((entry) => entry.kind === kind)
  ));
  const stats = [
    { value: researchRobotEntries.length, label: 'verified platform entities' },
    { value: usedKinds.length, label: 'platform and setup types' },
    { value: connectedModelCount, label: 'connected robot AI models' },
    { value: robotAiRobotRelations.length, label: 'evidence-backed relations' },
  ];

  return (
    <>
      <JsonLd data={buildGraphJsonLd([
        buildResearchRobotWebPageJsonLd(),
        buildBreadcrumbJsonLd('/robots'),
      ])} />
      <JsonLd data={buildResearchRobotDirectoryJsonLd()} />

      <section className="py-14 md:py-20">
        <div className="container-shell">
          <nav aria-label="Breadcrumb" className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--text-muted)]">
            <Link href="/" className="hover:text-white">Home</Link>
            <span aria-hidden="true" className="px-2">/</span>
            <span aria-current="page">Robots</span>
          </nav>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <span className="eyebrow">Verified robot and embodiment directory</span>
              <h1 className="mt-5 max-w-5xl text-4xl font-bold leading-tight text-white md:text-6xl">
                Robot platforms connected to Physical AI models
              </h1>
              <p className="mt-6 max-w-4xl text-lg leading-relaxed text-[var(--text-soft)]">
                RoboSkin.ai connects robot foundation models, tactile models, humanoids, robot arms, and research setups without turning a paper&apos;s hardware label into an unsupported product claim.
              </p>
              <p className="mt-4 max-w-4xl text-sm leading-relaxed text-[var(--text-muted)]">
                Each relation answers a specific question: was the model trained across this platform, quantitatively evaluated on it, or only demonstrated on it? Hardware identity evidence and model relationship evidence remain separate.
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

          <nav aria-label="Robot entity types" className="mt-8 flex flex-wrap gap-2">
            {usedKinds.map((kind) => (
              <a
                key={kind}
                href={`#${kind.replaceAll(' ', '-')}`}
                className="rounded-md border border-white/10 bg-white/[0.02] px-3 py-2 text-sm font-semibold text-[var(--text-soft)] transition-colors hover:border-white/20 hover:text-white"
              >
                {kindLabels[kind]}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <section className="pb-16 md:pb-20">
        <div className="container-shell">
          <div className="signal-panel p-7 md:p-9">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#ff6b3d]">Direct answer</p>
            <h2 className="mt-3 text-3xl font-bold text-white">A robot model name is not enough to prove a hardware relationship</h2>
            <p className="mt-4 max-w-5xl text-base leading-relaxed text-[var(--text-soft)]">
              Robot AI papers mix exact products, unnamed lab platforms, dual-arm configurations, simulations, training fleets, and downstream fine-tuning targets. This directory normalizes only the identities a primary or official source can support and preserves whether the evidence is training, evaluation, or demonstration.
            </p>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {[
              ['Evaluated on', 'The source reports experiments, rollouts, trials, task results, or a clearly defined evaluation on the platform.'],
              ['Included in training', 'The source explicitly places that platform or setup in the model training mixture. It does not guarantee later task success.'],
              ['Demonstrated on', 'An official source shows or states a real-system demonstration without enough disclosed protocol for a quantitative evaluation claim.'],
            ].map(([title, text]) => (
              <article key={title} className="signal-panel p-6">
                <h3 className="text-lg font-semibold text-white">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {usedKinds.map((kind) => {
        const robots = researchRobotEntries.filter((entry) => entry.kind === kind);

        return (
          <section key={kind} id={kind.replaceAll(' ', '-')} className="scroll-mt-24 pb-16 md:pb-20">
            <div className="container-shell">
              <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#ff6b3d]">Entity type</p>
                  <h2 className="mt-2 text-3xl font-bold text-white">{kindLabels[kind]}</h2>
                </div>
                <p className="font-mono text-sm text-[var(--text-muted)]">{robots.length} records</p>
              </div>

              <div className="grid gap-5 lg:grid-cols-2">
                {robots.map((robot) => {
                  const relations = robotAiRobotRelations.filter((relation) => relation.robotId === robot.id);

                  return (
                    <article
                      key={robot.id}
                      id={`robot-${robot.id}`}
                      className="signal-panel scroll-mt-24 p-6 md:p-7"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <p className="font-mono text-xs uppercase tracking-[0.12em] text-[#ff6b3d]">{robot.kind}</p>
                          <h3 className="mt-2 text-2xl font-semibold text-white">{robot.name}</h3>
                          {robot.manufacturer ? (
                            <p className="mt-2 text-sm text-[var(--text-soft)]">Manufacturer: {robot.manufacturer}</p>
                          ) : (
                            <p className="mt-2 text-sm text-[var(--text-muted)]">Manufacturer, configuration owner, or commercial model not established</p>
                          )}
                          {robot.aliases.length > 0 ? (
                            <p className="mt-2 text-xs leading-relaxed text-[var(--text-muted)]">
                              Source aliases: {robot.aliases.join(', ')}
                            </p>
                          ) : null}
                        </div>
                        {robot.officialUrl ? (
                          <a
                            href={robot.officialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-tertiary"
                          >
                            Official reference
                          </a>
                        ) : null}
                      </div>

                      <p className="mt-5 text-sm leading-relaxed text-[var(--text-soft)]">{robot.description}</p>

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
                                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                                  Source wording: {relation.sourceEmbodimentLabels.join('; ')}
                                </p>
                                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm">
                                  {relation.evidenceUrls.map((url) => {
                                    const sourceLabel = model.primarySources.find((source) => source.url === url)?.label
                                      ?? `${model.name} primary source`;

                                    return (
                                      <a
                                        key={url}
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="font-semibold text-[#ff6b3d] hover:text-white"
                                      >
                                        {model.name}: {sourceLabel}
                                      </a>
                                    );
                                  })}
                                </div>
                                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                                  {relation.evidenceBoundary}
                                </p>
                              </li>
                            );
                          })}
                        </ul>
                      </div>

                      <div className="mt-6 border-t border-white/10 pt-5 text-sm leading-relaxed text-[var(--text-muted)]">
                        <p>{robot.evidenceBoundary}</p>
                        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
                          {robot.identitySources.map((source) => (
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
                          <span>Reviewed {robot.sourceReviewed}</span>
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
            <h2 className="mt-3 text-2xl font-bold text-white">This is an evidence map, not a compatibility list</h2>
            <p className="mt-4 text-sm leading-relaxed text-[var(--text-soft)]">
              A platform appearing in training data does not prove the released checkpoint works on that hardware. A fine-tuned downstream policy is not a zero-shot base-model result. A simulated score is not a real-robot score. Family-level records remain family-level until a source identifies the exact product revision.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
              Coverage is intentionally incomplete. Generic phrases such as “nine robot configurations,” undisclosed simulation embodiments, sensors, and dataset mixtures are not converted into robot entities merely to increase the count.
            </p>
          </article>

          <aside className="signal-panel p-7 md:p-9">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#ff6b3d]">Related evidence routes</p>
            <div className="mt-5 grid gap-3">
              {[
                ['/robot-foundation-models', 'Compare robot AI models'],
                ['/organizations', 'Browse connected organizations'],
                ['/physical-ai', 'Place hardware in the Physical AI stack'],
                ['/tactile-ai', 'Connect robot platforms to tactile intelligence'],
                ['/robot-skin', 'Map contact surfaces and robot skin'],
                ['/humanoid-robots', 'Open the humanoid robotics map'],
                ['/robotics-datasets', 'Compare robotics data sources'],
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
