import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import { newsItems } from '@/content/site';
import { buildBreadcrumbJsonLd, buildGraphJsonLd, buildPageJsonLd, buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata('/news');

export default function NewsPage() {
  return (
    <>
      <JsonLd data={buildGraphJsonLd([buildPageJsonLd('/news'), buildBreadcrumbJsonLd('/news')])} />
      <section className="py-20 md:py-24">
        <div className="container-shell">
          <span className="eyebrow">News</span>
          <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
            <h1 className="text-4xl font-bold text-white md:text-6xl">Updates</h1>
            <Link href="/contact" className="text-accent text-sm font-semibold hover:text-white">
              Contact {'->'}
            </Link>
          </div>
          <p className="mt-5 max-w-3xl text-soft">
            We keep public announcements conservative and avoid implying active hardware availability, support, or procurement routes.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-shell space-y-4">
          {newsItems.map((item) => (
            <article key={`${item.date}-${item.title}`} className="glass-card p-7 md:p-8">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <p className="text-soft text-xs uppercase tracking-[0.14em]">{item.date}</p>
                {item.href ? (
                  <Link href={item.href} className="text-accent text-sm font-semibold hover:text-white">
                    {item.ctaLabel ?? 'Open'} {'->'}
                  </Link>
                ) : null}
              </div>
              <h2 className="mt-3 text-2xl font-semibold text-white md:text-3xl">{item.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-soft">{item.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="pb-20">
        <div className="container-shell">
          <div className="rounded-[24px] border border-white/8 bg-[#0b0d12] p-8 text-center md:p-11">
            <h2 className="text-3xl font-bold text-white md:text-4xl">Need current site context?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-soft">
              Send a correction, partnership, or research inquiry if you need context beyond the public pages.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link
                href="/contact?requestType=research"
                className="rounded-xl bg-[var(--primary)] px-7 py-3 text-sm font-bold text-white shadow-[0_12px_26px_rgba(98,168,255,0.22)]"
              >
                Send a research note
              </Link>
              <Link
                href="/research"
                className="rounded-xl border border-white/12 bg-white/5 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/8"
              >
                Explore research resources
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
