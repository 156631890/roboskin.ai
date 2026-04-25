import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import { caseStudySummaries } from '@/content/site';
import { buildBreadcrumbJsonLd, buildGraphJsonLd, buildPageJsonLd, buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata('/case-studies');

export default function CaseStudiesPage() {
  return (
    <>
      <JsonLd data={buildGraphJsonLd([buildPageJsonLd('/case-studies'), buildBreadcrumbJsonLd('/case-studies')])} />
      <section className="py-20 md:py-24">
        <div className="container-shell">
          <span className="eyebrow">Case studies</span>
          <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
            <h1 className="text-4xl font-bold text-white md:text-6xl">Application-context summaries</h1>
            <Link href="/solutions" className="text-accent text-sm font-semibold hover:text-white">
              View solutions {'->'}
            </Link>
          </div>
          <p className="mt-5 max-w-3xl text-soft">
            These are conservative summaries of common robot skin contexts. They do not imply active customer work, hardware availability, or performance numbers.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-shell grid gap-6 lg:grid-cols-2">
          {caseStudySummaries.map((item) => (
            <article key={item.title} className="glass-card p-7 md:p-8">
              <h2 className="text-2xl font-semibold text-white md:text-3xl">{item.title}</h2>
              <div className="mt-6 space-y-4 text-sm leading-relaxed text-soft">
                <p><span className="font-semibold text-white">Context:</span> {item.context}</p>
                <p><span className="font-semibold text-white">Approach:</span> {item.approach}</p>
                <p><span className="font-semibold text-white">Outcome:</span> {item.outcome}</p>
                <p><span className="font-semibold text-white">Note:</span> {item.note}</p>
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href={item.href}
                  className="inline-flex rounded-xl bg-[var(--primary)] px-6 py-3 text-sm font-bold text-white shadow-[0_12px_26px_rgba(98,168,255,0.22)]"
                >
                  {item.ctaLabel}
                </Link>
                <Link
                  href="/comparison"
                  className="inline-flex rounded-xl border border-white/12 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/8"
                >
                  Compare domain use cases
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="pb-20">
        <div className="container-shell">
          <div className="rounded-[24px] border border-white/8 bg-[#0b0d12] p-8 text-center md:p-11">
            <h2 className="text-3xl font-bold text-white md:text-4xl">Want to discuss a related use case?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-soft">
              Share your intended domain, research, or content use so the inquiry can be routed clearly.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link
                href="/contact?requestType=domain"
                className="rounded-xl bg-[var(--primary)] px-7 py-3 text-sm font-bold text-white shadow-[0_12px_26px_rgba(98,168,255,0.22)]"
              >
                Inquire about RoboSkin.ai
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
