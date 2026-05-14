import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import PageHeroVisual from '@/components/PageHeroVisual';
import { pageVisuals, productCards } from '@/content/site';
import { buildBreadcrumbJsonLd, buildCategoryGuideJsonLd, buildGraphJsonLd, buildPageJsonLd, buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata('/products');

export default function ProductsPage() {
  return (
    <>
      <JsonLd data={buildGraphJsonLd([buildPageJsonLd('/products'), buildBreadcrumbJsonLd('/products'), buildCategoryGuideJsonLd()])} />
      <section className="py-20 md:py-24">
        <div className="container-shell">
          <span className="eyebrow">Guide routes</span>
          <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
            <h1 className="text-4xl font-bold text-[var(--text)] md:text-6xl">How RoboSkin.ai is organized</h1>
            <Link href="/contact?requestType=research" className="text-accent text-sm font-semibold hover:text-[#7dd3fc]">
              Suggest a source {'->'}
            </Link>
          </div>
          <p className="mt-5 max-w-3xl text-soft">
            RoboSkin.ai organizes robot skin fundamentals, source-backed research notes, glossary terms, and application explainers without claiming active hardware availability.
          </p>
          <PageHeroVisual visual={pageVisuals.products} className="mt-10" priority />
        </div>
      </section>

      <section className="pb-20">
        <div className="container-shell space-y-6">
          {productCards.map((product) => (
            <article key={product.name} className="glass-card p-7 md:p-8">
              <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
                <div>
                  <p className="text-soft text-xs uppercase tracking-[0.14em]">Guide route</p>
                  <h2 className="mt-2 text-2xl font-semibold text-white md:text-3xl">{product.name}</h2>
                  <p className="mt-3 text-soft">{product.summary}</p>
                  <p className="mt-4 text-sm text-soft"><span className="font-semibold text-white">Start here if:</span> {product.bestFor}</p>
                  <p className="mt-2 text-sm text-soft"><span className="font-semibold text-white">Inputs and outputs:</span> {product.inputsOutputs}</p>
                  <div className="mt-6 rounded-2xl border border-white/8 bg-[#0d1016] p-5">
                    <p className="text-xs uppercase tracking-[0.14em] text-soft">Decision note</p>
                    <p className="mt-2 text-sm leading-relaxed text-soft">
                      If you are unsure, review the research and glossary routes first, then send a source suggestion or correction if a page needs improvement.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-3">
                      <Link href="/contact?requestType=research" className="text-accent text-sm font-semibold hover:text-[#7dd3fc]">
                        Suggest a source {'->'}
                      </Link>
                      <Link href="/research" className="text-sm font-semibold text-white hover:text-[#d7e7ff]">
                        Explore research {'->'}
                      </Link>
                      <Link href="/glossary" className="text-sm font-semibold text-white hover:text-[#d7e7ff]">
                        Read the glossary {'->'}
                      </Link>
                    </div>
                  </div>
                </div>
                <div>
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {product.specs.map((spec) => (
                      <li key={spec} className="rounded-xl border border-white/8 bg-[#0d1016] px-4 py-3 text-sm text-[#d8dce4]">
                        {spec}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 rounded-2xl border border-white/8 bg-[#0d1016] p-5">
                    <p className="text-xs uppercase tracking-[0.14em] text-soft">Evaluation criteria</p>
                    <ul className="mt-4 space-y-2">
                      {product.evaluation.map((item) => (
                        <li key={item} className="rounded-lg border border-white/8 bg-[#0b0d12] px-4 py-2.5 text-sm text-[#d8dce4]">
                          {item}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4 text-sm leading-relaxed text-soft">{product.verificationNote}</p>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link href="/contact?requestType=research" className="rounded-xl bg-[var(--primary)] px-5 py-2.5 text-sm font-bold text-white shadow-[0_12px_26px_rgba(98,168,255,0.22)]">
                      Suggest a source
                    </Link>
                    <Link href="/research" className="rounded-xl border border-white/12 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/8">
                      Explore research
                    </Link>
                    <Link href="/applications" className="rounded-xl border border-white/12 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/8">
                      View applications
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
