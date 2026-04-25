import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import { deploymentStages } from '@/content/site';
import { buildBreadcrumbJsonLd, buildGraphJsonLd, buildPageJsonLd, buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata('/implementation');

export default function ImplementationPage() {
  return (
    <>
      <JsonLd data={buildGraphJsonLd([buildPageJsonLd('/implementation'), buildBreadcrumbJsonLd('/implementation')])} />
      <section className="py-20 md:py-24">
        <div className="container-shell">
          <span className="eyebrow">Category roadmap</span>
          <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
            <h1 className="text-4xl font-bold text-[var(--text)] md:text-6xl">How the robot skin category can develop</h1>
            <Link href="/contact?requestType=domain" className="text-accent text-sm font-semibold hover:text-white">
              Inquire about RoboSkin.ai {'->'}
            </Link>
          </div>
          <p className="mt-5 max-w-3xl text-soft">
            This page outlines how teams, labs, and content owners can think about robot skin concepts from research awareness to branded category ownership.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-shell grid gap-6 lg:grid-cols-2">
          {deploymentStages.map((stage, idx) => (
            <article key={stage.title} className="glass-card p-7 md:p-8">
              <p className="text-soft text-xs uppercase tracking-[0.14em]">Stage {idx + 1}</p>
              <h2 className="mt-2 text-2xl font-semibold text-white md:text-3xl">{stage.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-soft">{stage.summary}</p>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-soft text-xs uppercase tracking-[0.14em]">Inputs</p>
                  <ul className="mt-3 space-y-2 text-sm text-[#d8dce4]">
                    {stage.inputs.map((item) => (
                      <li key={item} className="rounded-lg border border-white/8 bg-[#0d1016] px-4 py-2.5">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-soft text-xs uppercase tracking-[0.14em]">Outputs</p>
                  <ul className="mt-3 space-y-2 text-sm text-[#d8dce4]">
                    {stage.outputs.map((item) => (
                      <li key={item} className="rounded-lg border border-white/8 bg-[#0d1016] px-4 py-2.5">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="pb-20">
        <div className="container-shell">
          <div className="rounded-[24px] border border-white/8 bg-[#0b0d12] p-8 text-center md:p-11">
            <h2 className="text-3xl font-bold text-white md:text-4xl">Ready to discuss category ownership?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-soft">
              Send the intended use, organization context, and domain or research goal so the inquiry can be routed clearly.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link
                href="/contact?requestType=domain"
                className="rounded-xl bg-[var(--primary)] px-7 py-3 text-sm font-bold text-white shadow-[0_12px_26px_rgba(98,168,255,0.22)]"
              >
                Inquire about RoboSkin.ai
              </Link>
                <Link href="/comparison" className="rounded-xl border border-white/12 bg-white/5 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/8">
                  Compare domain use cases
                </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
