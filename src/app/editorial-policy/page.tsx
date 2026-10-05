import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import { site } from '@/content/site';
import { buildBreadcrumbJsonLd, buildGraphJsonLd, buildPageJsonLd, buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata('/editorial-policy');

const evidenceTypes = [
  ['Primary-source review', 'The paper or official documentation, its version or date, the relevant result and its limitations.', 'Independent reproduction, peer review by RoboSkin.ai or laboratory affiliation.'],
  ['Artifact inspection', 'The specific public files, manifest, license or source code inspected, with a dated record.', 'A complete dataset download, successful execution or reproduction of a published result.'],
  ['Code execution or replay', 'Pinned code and dependencies, inputs, commands, observed output and a dated run record; synthetic data and replay are identified.', 'A live sensor measurement or a successful physical robot experiment.'],
  ['Physical experiment', 'The actual robot or sensor, calibration, task, trials, baseline, measured output, failures and test conditions.', 'Performance on different hardware, conditions or tasks, or a certified safety system.'],
];

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
            <p className="mt-4 text-sm text-soft">Policy updated <time dateTime="2026-10-04">2026-10-04</time>. This is the policy revision date, not a new review date for every article.</p>
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
            <div id="editorial-team" className="signal-panel scroll-mt-28 p-6 md:p-8">
              <p className="eyebrow">Research review method</p>
              <h2 className="mt-4 text-2xl font-semibold text-white">How {site.editorial.lead.name} and the editorial team review sources</h2>
              <p className="mt-4 text-sm leading-relaxed text-soft">
                {site.editorial.lead.name}, {site.editorial.lead.role}, is responsible for topic selection, source-boundary review, corrections, and publication standards. The RoboSkin.ai Editorial Team starts with the cited paper, institutional release, standards documentation, or project documentation. Reviews separate source-reported findings from RoboSkin.ai analysis, retain the public source link, identify evidence limits, and update the modified date when a material interpretation changes.
              </p>
            </div>
            <div id="corrections" className="signal-panel scroll-mt-28 p-6 md:p-8">
              <p className="eyebrow">Corrections and material revisions</p>
              <h2 className="mt-4 text-2xl font-semibold text-white">Corrections remain visible and traceable</h2>
              <p className="mt-4 text-sm leading-relaxed text-soft">
                Readers can submit a correction through the research contact route. Material factual changes receive a revised modified date and a short revision note in the affected article. Typographic changes do not receive a claim-level revision note.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-soft">Include the affected page URL, the claim or attribution at issue and a primary source when available. A template, layout or byline change does not reset the scientific source date or make an unchanged article newly researched.</p>
              <Link href="/contact?requestType=research" className="mt-5 inline-flex text-sm font-semibold text-accent hover:text-white">
                Submit a correction {'->'}
              </Link>
            </div>
          </section>

          <section id="evidence-method" className="deferred-section mt-10 scroll-mt-28">
            <p className="eyebrow">Evidence and experience</p>
            <h2 className="mt-4 text-3xl font-bold text-white">A source review and a tested result answer different questions</h2>
            <p className="mt-4 max-w-4xl text-sm leading-relaxed text-soft">Most research briefs explain findings reported by the cited researchers. Editorial analysis helps readers interpret the task, measurements and limitations; it is not an independent reproduction. Use the evidence stated on the individual page. A repository link, a successful site build or a plausible illustration does not establish a robot result.</p>
            <div className="mt-6 overflow-x-auto rounded-md border border-white/10" tabIndex={0} role="region" aria-label="Evidence types and their limits">
              <table className="w-full min-w-[760px] border-collapse text-left text-sm">
                <thead className="border-b border-white/10 bg-white/[0.03]"><tr>{['Evidence type', 'What readers need to inspect', 'What it does not establish'].map(label => <th key={label} scope="col" className="px-4 py-3 font-semibold text-white">{label}</th>)}</tr></thead>
                <tbody>{evidenceTypes.map(([label, record, boundary]) => <tr key={label} className="border-b border-white/8 last:border-b-0"><th scope="row" className="px-4 py-4 align-top font-semibold text-white">{label}</th><td className="px-4 py-4 align-top leading-relaxed text-soft">{record}</td><td className="px-4 py-4 align-top leading-relaxed text-soft">{boundary}</td></tr>)}</tbody>
              </table>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-soft">These are evidence types, not a universal ranking of papers or products. Metrics from different objects, loading, hardware, calibration, sampling rates or controllers are not directly comparable. Unavailable files, unknown licenses and unperformed tests remain explicit gaps.</p>
            <div className="mt-5 flex flex-wrap gap-4 text-sm"><Link href="/datasets#availability-analysis" className="text-accent underline underline-offset-4">Inspect the dataset availability audit</Link><Link href="/benchmarks#experiment-evidence" className="text-accent underline underline-offset-4">Inspect source-reported experiment protocols</Link></div>
          </section>

          <section className="deferred-section mt-10 grid gap-6 lg:grid-cols-2">
            <div id="automation" className="signal-panel scroll-mt-28 p-6 md:p-8">
              <p className="eyebrow">How content is made</p>
              <h2 className="mt-4 text-2xl font-semibold text-white">Automation and explanatory artwork</h2>
              <p className="mt-4 text-sm leading-relaxed text-soft">AI and automation may assist source organization, drafting or explanatory illustrations. They are not sources for measurements, author credentials, quotations or research conclusions. Technical claims require the cited primary evidence, and editorial responsibility remains with {site.editorial.lead.name} and the editorial team.</p>
              <p className="mt-4 text-sm leading-relaxed text-soft">Illustrations explain a concept; they do not document an experiment. Figure captions identify explanatory artwork or the credited source. When automation is part of a reported method or result, the page must disclose the relevant contribution, inputs and verification limits. An AI-generated output is not a measurement.</p>
            </div>
            <div id="independence" className="signal-panel scroll-mt-28 p-6 md:p-8">
              <p className="eyebrow">Purpose and independence</p>
              <h2 className="mt-4 text-2xl font-semibold text-white">Help readers make a research decision</h2>
              <p className="mt-4 text-sm leading-relaxed text-soft">The public site helps engineers and researchers find sources, understand evidence and choose what to investigate next. RoboSkin.ai also offers <Link href="/research-services" className="text-accent underline">paid, source-based research services</Link>. Paid work does not buy public editorial inclusion, change a source-supported conclusion or imply vendor qualification.</p>
              <p className="mt-4 text-sm leading-relaxed text-soft">Sponsorship, affiliate relationships or other material conflicts must be identified on the affected content when present. A cited company, lab, paper or project is not an endorsement or an affiliation claim. Public resources and downloads remain free to read without an account.</p>
            </div>
          </section>
        </div>
      </article>
    </>
  );
}
