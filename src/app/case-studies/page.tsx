import type { Metadata } from 'next';
import Link from 'next/link';
import { caseStudySummaries, site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Case Studies',
  description: 'Application-focused summaries that explain scoping, evaluation paths, and integration planning for tactile sensing.',
  alternates: {
    canonical: `${site.url}/case-studies`,
  },
  robots: { index: false, follow: false },
};

export default function CaseStudiesPage() {
  return (
    <>
      <section className="py-20 md:py-24">
        <div className="container-shell">
          <span className="eyebrow">Case studies</span>
          <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
            <h1 className="text-4xl font-bold text-white md:text-6xl">Application-focused summaries</h1>
            <Link href="/solutions" className="text-accent text-sm font-semibold hover:text-white">
              View solutions {'->'}
            </Link>
          </div>
          <p className="mt-5 max-w-3xl text-soft">
            These are conservative summaries of common evaluation and integration paths. We do not publish customer names or performance numbers on the public site.
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
                  Compare offers
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="pb-20">
        <div className="container-shell">
          <div className="rounded-[24px] border border-white/8 bg-[#0b0d12] p-8 text-center md:p-11">
            <h2 className="text-3xl font-bold text-white md:text-4xl">Want to scope your own evaluation?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-soft">
              Share robot type, target surface, and timeline. We will route you to the most practical next step.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link
                href="/contact?requestType=integration"
                className="rounded-xl bg-[var(--primary)] px-7 py-3 text-sm font-bold text-white shadow-[0_12px_26px_rgba(98,168,255,0.22)]"
              >
                Talk to engineering
              </Link>
              <Link href="/downloads" className="rounded-xl border border-white/12 bg-white/5 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/8">
                Request technical material
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
