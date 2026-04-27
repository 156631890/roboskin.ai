import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import { FeaturedAssetCovers } from '@/components/IndustryVisuals';
import { featuredIndustryAssets, resourceSections } from '@/content/site';
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
            <h1 className="text-4xl font-bold text-white md:text-6xl">Request briefs and technical material</h1>
            <Link href="/contact?requestType=brief&requestedAsset=RoboSkin.ai%20Brief" className="text-accent text-sm font-semibold hover:text-white">
              Request RoboSkin.ai Brief {'->'}
            </Link>
          </div>
          <p className="mt-5 max-w-3xl text-soft">
            Request the current RoboSkin.ai Brief, State of Tactile AI notes, stack maps, datasheets, integration notes, SDK access, or benchmark methodology through the path that matches your intent.
          </p>
        </div>
      </section>

      <section className="pb-14">
        <div className="container-shell">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="eyebrow">Report covers</span>
              <h2 className="mt-4 text-3xl font-bold text-white md:text-5xl">Start with the asset that matches your intent</h2>
            </div>
            <Link href="/contact?requestType=brief" className="text-accent text-sm font-semibold hover:text-white">
              Request a brief {'->'}
            </Link>
          </div>
          <FeaturedAssetCovers assets={featuredIndustryAssets} compact />
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
                        A routed request for the current material, plus a follow-up path matched to your research goal, robot platform, partnership interest, or evaluation stage.
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
              Tell us whether you need a market brief, stack map, datasheet, integration note, sponsorship discussion, or strategic conversation.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link
                href="/contact?requestType=brief"
                className="rounded-xl bg-[var(--primary)] px-7 py-3 text-sm font-bold text-white shadow-[0_12px_26px_rgba(98,168,255,0.22)]"
              >
                Request brief
              </Link>
              <Link href="/contact?requestType=partnership" className="rounded-xl border border-white/12 bg-white/5 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/8">
                Discuss partnership
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
