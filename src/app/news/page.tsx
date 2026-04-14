import type { Metadata } from 'next';
import Link from 'next/link';
import { newsItems, site } from '@/content/site';

export const metadata: Metadata = {
  title: 'News',
  description: 'Site and content updates for the RoboSkin public evaluation journey.',
  alternates: {
    canonical: `${site.url}/news`,
  },
  robots: { index: false, follow: false },
};

export default function NewsPage() {
  return (
    <>
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
            We keep public announcements conservative. If you need a technical update for a specific platform, request an engineering review.
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
            <h2 className="text-3xl font-bold text-white md:text-4xl">Need a current technical update?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-soft">
              Tell us your robot type, target surface, and timeline. We will route you to the right material or engineer.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link
                href="/contact?requestType=integration"
                className="rounded-xl bg-[var(--primary)] px-7 py-3 text-sm font-bold text-white shadow-[0_12px_26px_rgba(98,168,255,0.22)]"
              >
                Talk to engineering
              </Link>
              <Link
                href="/downloads"
                className="rounded-xl border border-white/12 bg-white/5 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/8"
              >
                Request technical material
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
