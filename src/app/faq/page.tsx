import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import { faqItems } from '@/content/site';
import { buildBreadcrumbJsonLd, buildFaqJsonLd, buildGraphJsonLd, buildPageJsonLd, buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata('/faq');

export default function FAQPage() {
  return (
    <>
      <JsonLd data={buildGraphJsonLd([buildPageJsonLd('/faq'), buildBreadcrumbJsonLd('/faq'), buildFaqJsonLd(faqItems)])} />
      <section className="py-20 md:py-24">
        <div className="container-shell">
          <span className="eyebrow">FAQ</span>
          <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
            <h1 className="text-4xl font-bold text-white md:text-6xl">Questions we answer publicly</h1>
            <Link href="/contact" className="text-accent text-sm font-semibold hover:text-white">
              Contact {'->'}
            </Link>
          </div>
          <p className="mt-5 max-w-3xl text-soft">
            Public copy stays conservative. If a detail depends on robot platform, geometry, or environment, treat it as source-specific rather than a RoboSkin.ai product claim.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-shell space-y-4">
          {faqItems.map((faq) => (
            <details key={faq.question} className="glass-card group p-6">
              <summary className="cursor-pointer list-none text-lg font-semibold text-white">{faq.question}</summary>
              <div className="mt-3 space-y-4">
                <p className="text-sm leading-relaxed text-soft">{faq.answer}</p>
                {faq.href ? (
                  <Link href={faq.href} className="inline-flex text-accent text-sm font-semibold hover:text-white">
                    {faq.ctaLabel ?? 'Next step'} {'->'}
                  </Link>
                ) : null}
              </div>
            </details>
          ))}
        </div>
      </section>

      <section className="pb-20">
        <div className="container-shell">
          <div className="rounded-[24px] border border-white/8 bg-[#0b0d12] p-8 text-center md:p-11">
            <h2 className="text-3xl font-bold text-white md:text-4xl">Need a clearer route?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-soft">
              Choose research, glossary, or domain inquiry depending on whether you need learning context or acquisition discussion.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link
                href="/contact?requestType=domain"
                className="rounded-xl bg-[var(--primary)] px-7 py-3 text-sm font-bold text-white shadow-[0_12px_26px_rgba(98,168,255,0.22)]"
              >
                Domain inquiry
              </Link>
              <Link
                href="/research"
                className="rounded-xl border border-white/12 bg-white/5 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/8"
              >
                Explore research resources
              </Link>
              <Link
                href="/products"
                className="rounded-xl border border-white/12 bg-white/5 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/8"
              >
                View domain use cases
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
