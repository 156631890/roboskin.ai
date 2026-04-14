import type { Metadata } from 'next';
import Link from 'next/link';
import { comparisonRows, site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Comparison',
  description: 'Compare RoboSkin offer levels and pick the right starting point for evaluation and integration.',
  alternates: {
    canonical: `${site.url}/comparison`,
  },
};

export default function ComparisonPage() {
  return (
    <>
      <section className="py-20 md:py-24">
        <div className="container-shell">
          <span className="eyebrow">Comparison</span>
          <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
            <h1 className="text-4xl font-bold text-white md:text-6xl">Compare offer levels</h1>
            <Link href="/contact?requestType=integration" className="text-accent text-sm font-semibold hover:text-white">
              Request integration review {'->'}
            </Link>
          </div>
          <p className="mt-5 max-w-3xl text-soft">
            The public lineup is intentionally narrow. Use this page to choose a starting point, then request the most relevant technical material.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-shell">
          <div className="glass-card overflow-x-auto p-6 md:p-8">
            <table className="w-full min-w-[820px] border-separate border-spacing-0">
              <caption className="sr-only">
                Comparison table for RoboSkin Sensor Array, Developer Kit, and Custom Integration Program.
              </caption>
              <thead>
                <tr>
                  <th className="sticky left-0 z-10 w-[220px] bg-[rgba(6,8,12,0.9)] px-4 py-3 text-left text-xs font-bold uppercase tracking-[0.14em] text-soft backdrop-blur">
                    Category
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-[0.14em] text-soft">
                    Sensor Array
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-[0.14em] text-soft">
                    Developer Kit
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-[0.14em] text-soft">
                    Custom Program
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
              <h2 className="mt-2 text-2xl font-semibold text-white">Request a datasheet</h2>
              <p className="mt-3 text-sm leading-relaxed text-soft">
                Start here if you need a fit check, a baseline spec review, and a clear request path.
              </p>
              <Link
                href="/contact?requestType=datasheet"
                className="mt-6 inline-flex rounded-xl bg-[var(--primary)] px-6 py-3 text-sm font-bold text-white shadow-[0_12px_26px_rgba(98,168,255,0.22)]"
              >
                Request datasheet
              </Link>
            </article>
            <article className="glass-card p-7">
              <p className="text-soft text-xs uppercase tracking-[0.14em]">Next step</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Talk to engineering</h2>
              <p className="mt-3 text-sm leading-relaxed text-soft">
                Share your robot type, target surface, and timeline. We will recommend the right starting point.
              </p>
              <Link
                href="/contact?requestType=integration"
                className="mt-6 inline-flex rounded-xl border border-white/12 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/8"
              >
                Request integration review
              </Link>
            </article>
            <article className="glass-card p-7">
              <p className="text-soft text-xs uppercase tracking-[0.14em]">Next step</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">See the deployment path</h2>
              <p className="mt-3 text-sm leading-relaxed text-soft">
                If you are planning an evaluation or pilot, map the stages and expected inputs before you request a program.
              </p>
              <Link href="/implementation" className="mt-6 inline-flex text-accent text-sm font-semibold hover:text-white">
                View implementation path {'->'}
              </Link>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
