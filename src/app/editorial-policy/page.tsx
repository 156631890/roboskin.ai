import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import { buildBreadcrumbJsonLd, buildGraphJsonLd, buildPageJsonLd, buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata('/editorial-policy');

const standards = [
  {
    title: 'Source-backed publication',
    points: [
      'Research briefs cite public sources and separate source claims from RoboSkin.ai analysis.',
      'Topic guides link to related definitions, applications, research briefs, and glossary routes when those links help readers verify context.',
      'External citations are used for research orientation; they are not endorsements or product claims by RoboSkin.ai.',
    ],
  },
  {
    title: 'Conservative source boundaries',
    points: [
      'RoboSkin.ai does not infer product availability, benchmark values, certifications, customers, deployment readiness, or operating-company claims unless they are explicitly published on a public page.',
      'Pages avoid turning prototype research into commercial promises.',
      'If a source only supports a narrow technical point, the page states that boundary instead of broadening the claim.',
    ],
  },
  {
    title: 'Answer-engine clarity',
    points: [
      'Pages lead with direct answers before longer context so humans, crawlers, and answer engines can identify the main claim.',
      'Structured data is used to describe pages, breadcrumbs, FAQs, terms, and research articles when the markup reflects visible page content.',
      'RoboSkin.ai keeps robot skin, tactile AI, e-skin, Physical AI, and source-backed research routes connected through internal links.',
    ],
  },
];

export default function EditorialPolicyPage() {
  return (
    <>
      <JsonLd data={buildGraphJsonLd([buildPageJsonLd('/editorial-policy'), buildBreadcrumbJsonLd('/editorial-policy')])} />
      <article className="py-20 md:py-24">
        <div className="container-shell">
          <div className="max-w-4xl">
            <p className="section-label">Editorial standards</p>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-white md:text-6xl">
              RoboSkin editorial policy and source standards
            </h1>
            <p className="mt-5 text-base leading-relaxed text-soft md:text-lg">
              RoboSkin.ai publishes conservative, source-backed information about robot skin, tactile AI, e-skin, Physical AI,
              and contact-aware robotics. The site is built for readers who need clear definitions, research routes, and
              practical evaluation questions without unsupported product or deployment claims.
            </p>
          </div>

          <section className="deferred-section mt-10 grid gap-5 md:grid-cols-3">
            {standards.map((standard) => (
              <section key={standard.title} className="glass-card p-6">
                <h2 className="text-xl font-semibold text-white">{standard.title}</h2>
                <ul className="mt-4 space-y-3">
                  {standard.points.map((point) => (
                    <li key={point} className="text-sm leading-relaxed text-soft">
                      {point}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </section>

          <section className="deferred-section mt-10 grid gap-6 lg:grid-cols-[0.36fr_1fr]">
            <div>
              <p className="eyebrow">How to read RoboSkin.ai</p>
              <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">Source boundaries come first</h2>
            </div>
            <div className="signal-panel p-6 md:p-8">
              <p className="text-sm leading-relaxed text-soft">
                A RoboSkin.ai page may summarize a public research source, add editorial analysis, or route readers to related
                terms and topic clusters. It does not infer product availability, operating-company status, measured performance,
                certifications, customer names, or commercial readiness unless a page explicitly states and supports that claim.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-soft">
                Corrections, source suggestions, and requests for clearer attribution can be sent through the research contact
                route. The goal is to make each page easier to verify, cite, and understand.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link href="/research" className="btn-primary">
                  Browse source-backed research
                </Link>
                <Link href="/contact?requestType=research" className="btn-secondary">
                  Submit a source
                </Link>
              </div>
            </div>
          </section>

          <section className="deferred-section mt-10 grid gap-6 lg:grid-cols-2">
            <div className="signal-panel p-6 md:p-8">
              <p className="eyebrow">Research review method</p>
              <h2 className="mt-4 text-2xl font-semibold text-white">How the RoboSkin.ai Editorial Team reviews sources</h2>
              <p className="mt-4 text-sm leading-relaxed text-soft">
                The RoboSkin.ai Editorial Team starts with the cited paper, institutional release, standards documentation, or project documentation. Reviews separate source-reported findings from RoboSkin.ai analysis, retain the public source link, identify evidence limits, and update the modified date when a material interpretation changes.
              </p>
            </div>
            <div className="signal-panel p-6 md:p-8">
              <p className="eyebrow">Corrections and material revisions</p>
              <h2 className="mt-4 text-2xl font-semibold text-white">Corrections remain visible and traceable</h2>
              <p className="mt-4 text-sm leading-relaxed text-soft">
                Readers can submit a correction through the research contact route. Material factual changes receive a revised modified date and a short revision note in the affected article. Typographic changes do not receive a claim-level revision note.
              </p>
              <Link href="/contact?requestType=research" className="mt-5 inline-flex text-sm font-semibold text-accent hover:text-white">
                Submit a correction {'->'}
              </Link>
            </div>
          </section>
        </div>
      </article>
    </>
  );
}
