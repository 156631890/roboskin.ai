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

export default function GlossaryPage() {
  return (
    <>
      <JsonLd data={buildGraphJsonLd([buildPageJsonLd('/glossary'), buildBreadcrumbJsonLd('/glossary'), glossaryJsonLd])} />
      <section className="py-20 md:py-24">
        <div className="container-shell">
          <span className="eyebrow">Glossary</span>
          <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
            <h1 className="text-4xl font-bold text-white md:text-6xl">Robot skin glossary</h1>
            <Link href="/research" className="text-accent text-sm font-semibold hover:text-white">
              Read research briefs {'->'}
            </Link>
          </div>
          <p className="mt-5 max-w-3xl text-soft">
            Practical definitions for readers evaluating tactile AI, e-skin, multimodal sensors, ROS 2 tactile pipelines, and robot skin category language.
          </p>
          <PageHeroVisual visual={pageVisuals.answers} className="mt-10" priority />
        </div>
      </section>

      <section className="pb-20">
        <div className="container-shell grid gap-5 md:grid-cols-2">
          {glossaryTerms.map((item) => (
            <article key={item.term} id={item.term.toLowerCase().replaceAll(' ', '-')} className="glass-card scroll-mt-24 p-7">
              <h2 className="text-2xl font-semibold text-white">{item.term}</h2>
              <p className="mt-3 text-sm leading-relaxed text-soft">{item.definition}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {item.related.map((related) => (
                  <span key={related} className="rounded-full border border-white/8 bg-[#0d1016] px-3 py-1 text-xs text-[#d8dce4]">
                    {related}
                  </span>
                ))}
              </div>
              <Link href={item.href} className="mt-5 inline-flex text-sm font-semibold text-accent hover:text-white">
                Related page {'->'}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="pb-20">
        <div className="container-shell">
          <div className="rounded-[24px] border border-white/8 bg-[#0b0d12] p-8 text-center md:p-11">
            <h2 className="text-3xl font-bold text-white md:text-4xl">Need terms mapped to a use case?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-soft">
              Share a research question, source suggestion, or domain use case so the inquiry can be routed clearly.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link href="/contact?requestType=research" className="rounded-xl bg-[var(--primary)] px-7 py-3 text-sm font-bold text-white shadow-[0_12px_26px_rgba(98,168,255,0.22)]">
                Send a domain or research inquiry
              </Link>
              <Link href="/research" className="rounded-xl border border-white/12 bg-white/5 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/8">
                Explore research resources
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
