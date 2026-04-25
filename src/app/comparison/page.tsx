import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import { comparisonRows } from '@/content/site';
import { buildBreadcrumbJsonLd, buildGraphJsonLd, buildPageJsonLd, buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata('/comparison');

export default function ComparisonPage() {
  return (
    <>
      <JsonLd data={buildGraphJsonLd([buildPageJsonLd('/comparison'), buildBreadcrumbJsonLd('/comparison')])} />
      <section className="py-20 md:py-24">
        <div className="container-shell">
          <span className="eyebrow">Domain use cases</span>
          <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
            <h1 className="text-4xl font-bold text-white md:text-6xl">Compare domain use cases</h1>
            <Link href="/contact?requestType=domain" className="text-accent text-sm font-semibold hover:text-white">
              Inquire about RoboSkin.ai {'->'}
            </Link>
          </div>
          <p className="mt-5 max-w-3xl text-soft">
            Use this page to compare how RoboSkin.ai could support a startup brand, research initiative, or media property without implying active hardware availability.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-shell">
          <div className="glass-card overflow-x-auto p-6 md:p-8">
            <table className="w-full min-w-[820px] border-separate border-spacing-0">
              <caption className="sr-only">
                Comparison table for possible RoboSkin.ai domain use cases.
              </caption>
              <thead>
                <tr>
                  <th className="sticky left-0 z-10 w-[220px] bg-[rgba(6,8,12,0.9)] px-4 py-3 text-left text-xs font-bold uppercase tracking-[0.14em] text-soft backdrop-blur">
                    Category
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-[0.14em] text-soft">
                    Startup brand
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-[0.14em] text-soft">
                    Research / lab initiative
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-[0.14em] text-soft">
                    Media or content asset
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.label}>
                    <th className="sticky left-0 z-10 border-t border-white/8 bg-[rgba(6,8,12,0.9)] px-4 py-4 text-left text-sm font-semibold text-white backdrop-blur">
                      {row.label}
                    </th>
                    <td className="border-t border-white/8 px-4 py-4 text-sm leading-relaxed text-soft">{row.sensorArray}</td>
                    <td className="border-t border-white/8 px-4 py-4 text-sm leading-relaxed text-soft">{row.developerKit}</td>
                    <td className="border-t border-white/8 px-4 py-4 text-sm leading-relaxed text-soft">{row.customProgram}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            <article className="glass-card p-7">
              <p className="text-soft text-xs uppercase tracking-[0.14em]">Next step</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Domain inquiry</h2>
              <p className="mt-3 text-sm leading-relaxed text-soft">
                Start here if you are evaluating RoboSkin.ai for acquisition, partnership, or a robotics brand asset.
              </p>
              <Link
                href="/contact?requestType=domain"
                className="mt-6 inline-flex rounded-xl bg-[var(--primary)] px-6 py-3 text-sm font-bold text-white shadow-[0_12px_26px_rgba(98,168,255,0.22)]"
              >
                Domain inquiry
              </Link>
            </article>
            <article className="glass-card p-7">
              <p className="text-soft text-xs uppercase tracking-[0.14em]">Next step</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Research or partnership inquiry</h2>
              <p className="mt-3 text-sm leading-relaxed text-soft">
                Share the intended use, research context, or collaboration idea so the inquiry can be routed clearly.
              </p>
              <Link
                href="/contact?requestType=research"
                className="mt-6 inline-flex rounded-xl border border-white/12 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/8"
              >
                Send a domain or research inquiry
              </Link>
            </article>
            <article className="glass-card p-7">
              <p className="text-soft text-xs uppercase tracking-[0.14em]">Next step</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">See the category roadmap</h2>
              <p className="mt-3 text-sm leading-relaxed text-soft">
                If you are planning content or positioning work, map the category stages before choosing a route.
              </p>
              <Link href="/implementation" className="mt-6 inline-flex text-accent text-sm font-semibold hover:text-white">
                View category roadmap {'->'}
              </Link>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
