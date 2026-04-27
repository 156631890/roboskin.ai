import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import { resourceSections } from '@/content/site';
import { buildBreadcrumbJsonLd, buildGraphJsonLd, buildPageJsonLd, buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata('/downloads');

export default function DownloadsPage() {
  return (
    <>
      <JsonLd data={buildGraphJsonLd([buildPageJsonLd('/downloads'), buildBreadcrumbJsonLd('/downloads')])} />
      <section className="py-20 md:py-24">
        <div className="container-shell">
          <span className="eyebrow">Downloads</span>
          <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
            <h1 className="text-4xl font-bold text-white md:text-6xl">Request technical material</h1>
            <Link href="/contact?requestType=datasheet" className="text-accent text-sm font-semibold hover:text-white">
              Request datasheet {'->'}
            </Link>
          </div>
          <p className="mt-5 max-w-3xl text-soft">
            Request the current datasheets, integration notes, SDK access, or benchmark methodology through the path that matches your evaluation stage.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-shell space-y-10">
          {resourceSections.map((section) => (
            <div key={section.title}>
              <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
                <h2 className="text-2xl font-semibold text-white">{section.title}</h2>
                <Link href="/resources" className="text-accent text-sm font-semibold hover:text-white">
                  View resources index {'->'}
                </Link>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {section.items.map((item) => (
                  <article key={item.title} className="glass-card p-6">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <p className="text-soft text-xs uppercase tracking-[0.14em]">{item.availability}</p>
                      {item.href ? (
                        <Link href={item.href} className="text-accent text-sm font-semibold hover:text-white">
                          {item.ctaLabel ?? 'Request'} {'->'}
                        </Link>
                      ) : null}
                    </div>
                    <h3 className="mt-2 text-xl font-semibold text-white">{item.title}</h3>
                    <p className="mt-2 text-sm text-soft">{item.description}</p>
                    <div className="mt-4 rounded-2xl border border-white/8 bg-[#0d1016] p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-soft">What you receive</p>
                      <p className="mt-2 text-sm leading-relaxed text-[#d8dce4]">
                        A routed request for the current material, plus a follow-up path matched to your robot platform, surface, and evaluation stage.
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="pb-20">
        <div className="container-shell">
          <div className="rounded-[24px] border border-white/8 bg-[#0b0d12] p-8 text-center md:p-11">
            <h2 className="text-3xl font-bold text-white md:text-4xl">Not sure what to request?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-soft">
              Tell us your robot type, target surface, and timeline. We will route you to the most relevant material or engineer.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link
                href="/contact?requestType=integration"
                className="rounded-xl bg-[var(--primary)] px-7 py-3 text-sm font-bold text-white shadow-[0_12px_26px_rgba(98,168,255,0.22)]"
              >
                Talk to engineering
              </Link>
              <Link href="/comparison" className="rounded-xl border border-white/12 bg-white/5 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/8">
                Compare offers
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
