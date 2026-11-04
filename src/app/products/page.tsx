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
          <span className="eyebrow">Learning paths</span>
          <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
            <h1 className="text-4xl font-bold text-[var(--text)] md:text-6xl">
              Learn tactile sensing: from robot skin to working data
            </h1>
            <Link href="/contact?requestType=research" className="text-accent text-sm font-semibold hover:text-[#ff9b73]">
              Submit source {'->'}
            </Link>
          </div>
          <p className="mt-5 max-w-3xl text-soft">
            Choose a starting point based on what you need to do: understand contact sensing, shortlist hardware,
            or process sensor data. Each path leads to practical guides and their primary sources.
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
                  <p className="text-soft text-xs uppercase tracking-[0.14em]">Learning path</p>
                  <h2 className="mt-2 text-2xl font-semibold text-white md:text-3xl"><Link href={product.href}>{product.name}</Link></h2>
                  <p className="mt-3 text-soft">{product.summary}</p>
                  <p className="mt-4 text-sm text-soft"><span className="font-semibold text-white">Start here if:</span> {product.bestFor}</p>
                  <p className="mt-2 text-sm text-soft"><span className="font-semibold text-white">Inputs and outputs:</span> {product.inputsOutputs}</p>
                  <div className="mt-6 rounded-2xl border border-white/8 bg-[#0d1016] p-5">
                    <p className="text-xs uppercase tracking-[0.14em] text-soft">Decision note</p>
                    <p className="mt-2 text-sm leading-relaxed text-soft">
                      {product.verificationNote}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-3">
                      <Link href={product.href} className="text-accent text-sm font-semibold hover:text-[#ff9b73]">
                        {product.cta} {'->'}
                      </Link>
                      <Link href="/research" className="text-sm font-semibold text-white hover:text-[#eadfd3]">
                        Explore research {'->'}
                      </Link>
                      <Link href="/glossary" className="text-sm font-semibold text-white hover:text-[#eadfd3]">
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
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link href="/contact?requestType=research" className="rounded-xl bg-[var(--primary)] px-5 py-2.5 text-sm font-bold text-white shadow-[0_12px_26px_rgba(98,168,255,0.22)]">
                      Submit source
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
      <section id="learning-checkpoints" className="pb-12 pt-8 scroll-mt-28">
        <div className="container-shell">
          <h2 className="text-2xl font-semibold text-white md:text-3xl">{"What should you have at the end of each path?"}</h2>
          <p className="mt-4 max-w-4xl text-sm leading-relaxed text-soft">{"Use these checkpoints to decide when to move on. They are learning outputs, not a certificate of hardware readiness."}</p>
          <ol className="mt-6 grid gap-4 lg:grid-cols-3">
            <li className="rounded-xl border border-white/10 p-5"><h3 className="text-lg font-semibold text-white">{"Contact requirements"}</h3>
              <p className="mt-3 text-sm leading-relaxed text-soft">{"A sketch of likely contact areas and a statement of the signal needed: contact event, location, normal load or shear."}</p>
              <p className="mt-3 text-sm leading-relaxed text-soft">{"Identify the action that will use the signal, including what happens when it is missing."}</p>
              <p className="mt-4 text-sm"><Link href="/applications" className="text-accent underline underline-offset-4">{"Connect the requirement to a task"}</Link></p>
            </li>
            <li className="rounded-xl border border-white/10 p-5"><h3 className="text-lg font-semibold text-white">{"Hardware shortlist"}</h3>
              <p className="mt-3 text-sm leading-relaxed text-soft">{"A source-linked record of the exact model, mounting surface, raw output, derived estimates and unverified specifications."}</p>
              <p className="mt-3 text-sm leading-relaxed text-soft">{"Compare the same measurement target and configuration; a model-family claim is not a specification for every module."}</p>
              <p className="mt-4 text-sm"><Link href="/guides/how-to-choose-a-tactile-sensor" className="text-accent underline underline-offset-4">{"Build a shortlist"}</Link></p>
            </li>
            <li className="rounded-xl border border-white/10 p-5"><h3 className="text-lg font-semibold text-white">{"Data workflow"}</h3>
              <p className="mt-3 text-sm leading-relaxed text-soft">{"A small trace with timestamps, units, coordinate frames, calibration version and invalid-sample handling."}</p>
              <p className="mt-3 text-sm leading-relaxed text-soft">{"Replay the trace and inspect gaps before proposing a controller experiment. Synthetic replay validates processing assumptions, not physical performance."}</p>
              <p className="mt-4 text-sm"><Link href="/guides/python-tactile-data-processing" className="text-accent underline underline-offset-4">{"Inspect and replay data"}</Link></p>
            </li>
          </ol>
          <p className="mt-5 max-w-4xl text-sm leading-relaxed text-soft">{"If one checkpoint exposes a gap, return to that requirement instead of treating all three paths as a mandatory course. For example, readable sensor samples do not by themselves establish force accuracy."}</p>
          <div className="mt-5 flex flex-wrap gap-4 text-sm"><Link href="/guides/tactile-sensor-calibration" className="text-accent underline underline-offset-4">{"Separate calibration targets"}</Link><Link href="/guides/tactile-sensor-benchmark-robot-manipulation" className="text-accent underline underline-offset-4">{"Define the task evaluation"}</Link></div>
          <p className="mt-5 text-xs text-soft">Reading guidance updated <time dateTime="2026-11-04">November 4, 2026</time>.</p>
        </div>
      </section>

    </>
  );
}
