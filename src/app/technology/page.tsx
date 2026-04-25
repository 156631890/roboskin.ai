import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import { technologyLayers } from '@/content/site';
import { buildBreadcrumbJsonLd, buildGraphJsonLd, buildPageJsonLd, buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata('/technology');

export default function TechnologyPage() {
  return (
    <>
      <JsonLd data={buildGraphJsonLd([buildPageJsonLd('/technology'), buildBreadcrumbJsonLd('/technology')])} />
      <section className="py-20 md:py-24">
        <div className="container-shell">
          <span className="eyebrow">Technology</span>
          <h1 className="mt-5 text-4xl font-bold text-white md:text-6xl">How RoboSkin works</h1>
          <p className="mt-5 max-w-3xl text-soft">
            RoboSkin combines flexible sensing layers, signal processing, form-factor design, and integration tooling for tactile robotics programs.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-shell grid gap-6 lg:grid-cols-2">
          {technologyLayers.map((layer) => (
            <article key={layer.title} className="glass-card p-7 md:p-8">
              <p className="text-soft text-xs uppercase tracking-[0.14em]">Layer</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">{layer.title}</h2>
              <p className="mt-3 text-soft">{layer.summary}</p>
              {layer.bullets?.length ? (
                <ul className="mt-5 space-y-2 text-sm text-[#d8dce4]">
                  {layer.bullets.map((bullet) => (
                    <li key={bullet} className="rounded-lg border border-white/8 bg-[#0d1016] px-4 py-2.5">
                      {bullet}
                    </li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section className="pb-20">
        <div className="container-shell">
          <div className="rounded-[24px] border border-white/8 bg-[#0b0d12] p-8 text-center md:p-11">
            <h2 className="text-3xl font-bold text-white md:text-5xl">Need an architecture review for your robot platform?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-soft">
              Request an engineering review for sensing layout, constraints, and an integration path that matches your robot surface and workflow.
            </p>
            <div className="mt-7 flex justify-center">
              <Link
                href="/contact?requestType=integration"
                className="rounded-xl bg-[var(--primary)] px-7 py-3 text-sm font-bold text-white shadow-[0_12px_26px_rgba(98,168,255,0.22)]"
              >
                Request technical consultation
              </Link>
            </div>
            <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm">
              <Link href="/products" className="text-accent font-semibold hover:text-white">
                View robot skin products {'->'}
              </Link>
              <Link href="/resources" className="text-accent font-semibold hover:text-white">
                Request technical briefs {'->'}
              </Link>
              <Link href="/faq" className="text-accent font-semibold hover:text-white">
                Read tactile AI FAQ {'->'}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
