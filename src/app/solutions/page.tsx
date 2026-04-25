import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import { solutionCards } from '@/content/site';
import { buildBreadcrumbJsonLd, buildGraphJsonLd, buildPageJsonLd, buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata('/solutions');

export default function SolutionsPage() {
  return (
    <>
      <JsonLd data={buildGraphJsonLd([buildPageJsonLd('/solutions'), buildBreadcrumbJsonLd('/solutions')])} />
      <section className="py-20 md:py-24">
        <div className="container-shell">
          <span className="eyebrow">Solutions</span>
          <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
            <h1 className="text-4xl font-bold text-white md:text-6xl">Robot skin application contexts</h1>
            <Link href="/comparison" className="text-accent text-sm font-semibold hover:text-[#7dd3fc]">
              Compare domain use cases {'->'}
            </Link>
          </div>
          <p className="mt-5 max-w-3xl text-soft">
            Each path frames a robot skin topic for research, education, or category positioning without claiming product availability.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-shell grid gap-6 lg:grid-cols-2">
          {solutionCards.map((solution) => (
            <article key={solution.title} className="glass-card p-7 md:p-8">
              <p className="text-soft text-xs uppercase tracking-[0.14em]">Solution</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">{solution.title}</h2>
              <div className="mt-4 space-y-3 text-sm text-soft">
                <p><span className="font-semibold text-white">Problem:</span> {solution.problem}</p>
                <p><span className="font-semibold text-white">Impact:</span> {solution.why}</p>
                <p><span className="font-semibold text-white">Suggested route:</span> {solution.path}</p>
                <p><span className="font-semibold text-white">Note:</span> {solution.note}</p>
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/contact?requestType=domain"
                  className="rounded-xl bg-[var(--primary)] px-5 py-2.5 text-sm font-bold text-white shadow-[0_12px_26px_rgba(98,168,255,0.22)]"
                >
                  Inquire about RoboSkin.ai
                </Link>
                <Link
                  href="/comparison"
                  className="rounded-xl border border-white/12 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/8"
                >
                  Compare domain use cases
                </Link>
                <Link
                  href="/technology"
                  className="rounded-xl border border-white/12 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/8"
                >
                  Review technology context
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="pb-20">
        <div className="container-shell">
          <div className="rounded-[24px] border border-white/8 bg-[#0b0d12] p-8 text-center md:p-11">
            <h2 className="text-3xl font-bold text-white md:text-4xl">Need help choosing a category route?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-soft">
              Send your intended use for RoboSkin.ai, whether domain acquisition, partnership, research, or content.
            </p>
            <div className="mt-7 flex justify-center">
              <Link
                href="/contact?requestType=domain"
                className="rounded-xl bg-[var(--primary)] px-7 py-3 text-sm font-bold text-white shadow-[0_12px_26px_rgba(98,168,255,0.22)]"
              >
                Inquire about RoboSkin.ai
              </Link>
            </div>
            <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm">
              <Link href="/products" className="text-accent font-semibold hover:text-white">
                View domain use cases {'->'}
              </Link>
              <Link href="/implementation" className="text-accent font-semibold hover:text-white">
                See category roadmap {'->'}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
