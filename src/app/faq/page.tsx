import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import PageHeroVisual from '@/components/PageHeroVisual';
import { faqItems, pageVisuals } from '@/content/site';
import { buildBreadcrumbJsonLd, buildFaqJsonLd, buildGraphJsonLd, buildPageJsonLd, buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata('/faq');

const readingGuide = {
  "id": "use-these-answers",
  "heading": "Use an answer to choose the next check",
  "body": [
    "These answers identify a decision boundary and point to the fuller method. For a named device or study, keep its model, source date and test conditions with the claim. A broad category answer cannot establish compatibility with a particular robot."
  ],
  "table": {
    "headers": [
      "If your question concerns",
      "Keep these details",
      "Follow-up route"
    ],
    "rows": [
      [
        "A performance number",
        "Quantity, units, protocol, denominator and aggregation",
        "Benchmark or calibration guide"
      ],
      [
        "A reusable artifact",
        "Exact files, revision, format, license and access result",
        "Dataset or model evidence record"
      ],
      [
        "A robot outcome",
        "Observed input, executed response, timing and failure rule",
        "Application or control-loop guide"
      ]
    ]
  },
  "subsections": [
    {
      "heading": "When a source is missing",
      "body": [
        "Treat the missing detail as unresolved. Send the exact page and statement with a primary source if you can supply a correction. A project link, public demo or directory entry alone is not evidence of an independent RoboSkin.ai test."
      ]
    }
  ],
  "links": [
    {
      "label": "Measurement terminology",
      "href": "/glossary#measurement-language"
    },
    {
      "label": "How to read a robot-skin paper",
      "href": "/research/robot-skin-papers#paper-claim-trace"
    },
    {
      "label": "Submit a source or correction",
      "href": "/contact?requestType=research"
    }
  ]
};

export default function FAQPage() {
  return (
    <>
      <JsonLd data={buildGraphJsonLd([buildPageJsonLd('/faq'), buildBreadcrumbJsonLd('/faq'), buildFaqJsonLd(faqItems)])} />
      <section className="py-20 md:py-24">
        <div className="container-shell">
          <span className="eyebrow">FAQ</span>
          <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
            <h1 className="text-4xl font-bold text-white md:text-6xl">Robot skin and tactile sensing questions</h1>
            <Link href="/contact" className="text-accent text-sm font-semibold hover:text-white">
              Contact {'->'}
            </Link>
          </div>
          <p className="mt-5 max-w-3xl text-soft">
            Start with the question that matches your task. Answers distinguish sensor measurements, derived estimates, reusable data and robot outcomes, then link to the relevant method and evidence.
          </p>
          <PageHeroVisual visual={pageVisuals.answers} className="mt-10" priority />
        </div>
      </section>

    <section id={readingGuide.id} className="pb-14">
      <div className="container-shell">
        <div className="signal-panel p-6 md:p-8">
          <p className="text-sm text-soft">Reading guide reviewed November 4, 2026. Existing research dates and service terms remain separately identified.</p>
          <h2 className="mt-4 text-3xl font-semibold text-white">{readingGuide.heading}</h2>
          {readingGuide.body.map((text) => <p key={text} className="mt-4 leading-relaxed text-soft">{text}</p>)}
          <div className="mt-6 overflow-x-auto" tabIndex={0} role="region" aria-label={readingGuide.heading}>
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead><tr>{readingGuide.table.headers.map((text) => <th key={text} scope="col" className="border-b border-white/10 p-4 text-white">{text}</th>)}</tr></thead>
              <tbody>{readingGuide.table.rows.map((row) => <tr key={row[0]}>{row.map((text, index) => index === 0 ? <th key={text} scope="row" className="border-b border-white/10 p-4 align-top text-white">{text}</th> : <td key={text} className="border-b border-white/10 p-4 align-top leading-relaxed text-soft">{text}</td>)}</tr>)}</tbody>
            </table>
          </div>
          {readingGuide.subsections.map((section) => <div key={section.heading} className="mt-6"><h3 className="text-xl font-semibold text-white">{section.heading}</h3>{section.body.map((text) => <p key={text} className="mt-3 leading-relaxed text-soft">{text}</p>)}</div>)}
          <ul className="mt-6 grid gap-3">{readingGuide.links.map((link) => <li key={link.href}><Link href={link.href} className="text-sm font-semibold text-[#ffd5c5] underline underline-offset-4">{link.label}</Link></li>)}</ul>
        </div>
      </div>
    </section>

      <section className="pb-20">
        <div className="container-shell space-y-4">
          {faqItems.map((faq) => (
            <details key={faq.question} className="glass-card group p-6">
              <summary className="cursor-pointer list-none text-lg font-semibold text-white">{faq.question}</summary>
              <div className="mt-3 space-y-4">
                <p className="text-sm leading-relaxed text-soft">{faq.answer}</p>
                {faq.href ? (
                  <Link href={faq.href} className="inline-flex text-accent text-sm font-semibold hover:text-white">
                    {faq.ctaLabel ?? 'Next step'} {'->'}
                  </Link>
                ) : null}
              </div>
            </details>
          ))}
        </div>
      </section>

      <section className="pb-20">
        <div className="container-shell">
          <div className="rounded-[24px] border border-white/8 bg-[#0b0d12] p-8 text-center md:p-11">
            <h2 className="text-3xl font-bold text-white md:text-4xl">Need a clearer route?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-soft">
              Choose research, glossary, or contact depending on whether you need learning context, a correction, or a source suggestion.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link
                href="/contact?requestType=research"
                className="rounded-xl bg-[var(--primary)] px-7 py-3 text-sm font-bold text-white shadow-[0_12px_26px_rgba(98,168,255,0.22)]"
              >
                Research inquiry
              </Link>
              <Link
                href="/research"
                className="rounded-xl border border-white/12 bg-white/5 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/8"
              >
                Explore research resources
              </Link>
              <Link
                href="/products"
                className="rounded-xl border border-white/12 bg-white/5 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/8"
              >
                View guide routes
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
