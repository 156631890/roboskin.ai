import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import PageHeroVisual from '@/components/PageHeroVisual';
import { glossaryTerms, pageVisuals, site } from '@/content/site';
import { buildBreadcrumbJsonLd, buildGraphJsonLd, buildPageJsonLd, buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata('/glossary');

const glossaryJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTermSet',
  '@id': `${site.url}/glossary#defined-term-set`,
  name: 'RoboSkin robot skin glossary',
  url: `${site.url}/glossary`,
  hasDefinedTerm: glossaryTerms.map((item) => ({
    '@type': 'DefinedTerm',
    name: item.term,
    description: item.definition,
    url: `${site.url}/glossary#${item.term.toLowerCase().replaceAll(' ', '-')}`,
  })),
};

const glossaryFamilies = [
  {
    label: 'Surface layer',
    title: 'Robot skin, e-skin, and tactile surfaces',
    text: 'Terms that explain what covers the robot and what contact signals the surface can capture.',
  },
  {
    label: 'Signal layer',
    title: 'Touch data and tactile AI workflows',
    text: 'Terms that connect pressure, shear, slip, multimodal sensing, and signal interpretation.',
  },
  {
    label: 'System layer',
    title: 'Research routes and category context',
    text: 'Terms that keep public claims conservative while guiding readers toward source-backed pages.',
  },
];

const coreTopicRoutes = [
  {
    label: 'Robot skin',
    href: '/robot-skin',
    description: 'The core category definition for tactile robot surfaces.',
  },
  {
    label: 'E-skin',
    href: '/e-skin',
    description: 'Electronic skin and flexible sensor context for robotics.',
  },
  {
    label: 'Tactile AI',
    href: '/tactile-ai',
    description: 'How touch data becomes robot behavior and evaluation.',
  },
];

export default function GlossaryPage() {
  return (
    <>
      <JsonLd data={buildGraphJsonLd([buildPageJsonLd('/glossary'), buildBreadcrumbJsonLd('/glossary'), glossaryJsonLd])} />
      <section className="py-14 md:py-20">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.78fr_1.02fr] lg:items-center">
          <div>
            <span className="eyebrow">Glossary</span>
            <h1 className="mt-5 text-4xl font-bold leading-tight text-white md:text-6xl">
              E-skin and robot skin glossary
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-[#c8d1de]">
              A terminology matrix for robot skin, tactile AI, e-skin, electronic skin, multimodal sensors, ROS 2 tactile
              pipelines, and source-backed category language.
            </p>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#8e98a8]">
              Definitions are written for practical reading: what the term means, which signals it touches, and where to go next for
              research context.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href="#term-matrix" className="btn-primary w-full sm:w-auto">
                Open term matrix
              </Link>
              <Link href="/research" className="btn-secondary w-full sm:w-auto">
                Read e-skin and tactile sensing briefs
              </Link>
              <Link href="/contact?requestType=research" className="btn-tertiary w-full sm:w-auto">
                Submit a Source
              </Link>
            </div>
          </div>

          <div className="grid gap-4">
            <PageHeroVisual visual={pageVisuals.answers} priority />
            <dl className="grid gap-3 sm:grid-cols-3">
              <div className="signal-panel p-4">
                <dt className="font-mono text-lg font-semibold text-white">{glossaryTerms.length}</dt>
                <dd className="mt-1 text-xs uppercase tracking-[0.12em] text-[#8e98a8]">defined terms</dd>
              </div>
              <div className="signal-panel p-4">
                <dt className="font-mono text-lg font-semibold text-white">3</dt>
                <dd className="mt-1 text-xs uppercase tracking-[0.12em] text-[#8e98a8]">signal layers</dd>
              </div>
              <div className="signal-panel p-4">
                <dt className="font-mono text-lg font-semibold text-white">Source</dt>
                <dd className="mt-1 text-xs uppercase tracking-[0.12em] text-[#8e98a8]">next-step routes</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="pb-14 md:pb-20">
        <div className="container-shell grid gap-4 md:grid-cols-3">
          {glossaryFamilies.map((family) => (
            <article key={family.title} className="signal-panel p-6">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#00e5ff]">{family.label}</p>
              <h2 className="mt-3 text-xl font-semibold text-white">{family.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-[#8e98a8]">{family.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="pb-14 md:pb-20">
        <div className="container-shell">
          <div className="mb-5">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#00e5ff]">Core topic routes</p>
            <h2 className="mt-2 text-3xl font-bold text-white md:text-4xl">Start with the main definitions</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {coreTopicRoutes.map((route) => (
              <Link key={route.href} href={route.href} className="signal-panel block p-6 transition-colors hover:bg-white/[0.04]">
                <h3 className="text-xl font-semibold text-white">{route.label}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#8e98a8]">{route.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="term-matrix" className="pb-20">
        <div className="container-shell">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#00e5ff]">Term route matrix</p>
              <h2 className="mt-2 text-3xl font-bold text-white md:text-4xl">Definitions with next-step context</h2>
            </div>
            <Link href="/research" className="text-sm font-semibold text-[#00e5ff] hover:text-white">
              Research index {'->'}
            </Link>
          </div>

          <div className="signal-panel overflow-hidden p-0">
            {glossaryTerms.map((item, index) => (
              <article
                key={item.term}
                id={item.term.toLowerCase().replaceAll(' ', '-')}
                className="grid scroll-mt-24 gap-5 border-b border-white/8 p-5 last:border-b-0 md:grid-cols-[0.36fr_1fr] md:p-7"
              >
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.12em] text-[#8e98a8]">Term {String(index + 1).padStart(2, '0')}</p>
                  <h3 className="mt-3 text-2xl font-semibold text-white">{item.term}</h3>
                </div>
                <div>
                  <p className="text-base leading-relaxed text-[#c8d1de]">{item.definition}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.related.map((related) => (
                      <span key={related} className="rounded-md border border-white/8 bg-[#020408] px-3 py-1 text-xs text-[#c8d1de]">
                        {related}
                      </span>
                    ))}
                  </div>
                  <Link href={item.href} className="mt-5 inline-flex text-sm font-semibold text-[#00e5ff] hover:text-white">
                    Follow related route {'->'}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-shell">
          <div className="signal-panel p-8 text-center md:p-11">
            <p className="eyebrow border-white/10 bg-white/5 text-white">Terminology correction path</p>
            <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-bold text-white md:text-4xl">Need terms mapped to a use case?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-[#8e98a8]">
              Share a research question, source suggestion, or guide route case so the inquiry can be routed clearly.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
              <Link href="/contact?requestType=research" className="btn-primary w-full sm:w-auto">
                Submit a Source
              </Link>
              <Link href="/research" className="btn-secondary w-full sm:w-auto">
                Explore research resources
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
