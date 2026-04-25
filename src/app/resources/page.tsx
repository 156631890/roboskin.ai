import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import { resourceSections } from '@/content/site';
import { buildBreadcrumbJsonLd, buildGraphJsonLd, buildPageJsonLd, buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata('/resources');

export default function ResourcesPage() {
  return (
    <>
      <JsonLd data={buildGraphJsonLd([buildPageJsonLd('/resources'), buildBreadcrumbJsonLd('/resources')])} />
      <section className="py-20 md:py-24">
        <div className="container-shell">
          <span className="eyebrow">Resources</span>
          <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
            <h1 className="text-4xl font-bold text-white md:text-6xl">Request the right technical material</h1>
            <Link href="/contact?requestType=integration" className="text-accent text-sm font-semibold hover:text-[#7dd3fc]">
              Request integration docs {'->'}
            </Link>
          </div>
          <p className="mt-5 max-w-3xl text-soft">
            Only publicly supported resources are shown here. Missing assets are converted to request flows instead of dead downloads.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-shell space-y-8">
          {resourceSections.map((section) => (
            <div key={section.title}>
              <h2 className="mb-4 text-2xl font-semibold text-white">{section.title}</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {section.items.map((item) => (
                  <article key={item.title} className="glass-card p-6">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <p className="text-soft text-xs uppercase tracking-[0.14em]">{item.availability}</p>
                      {item.href ? (
                        <Link href={item.href} className="text-accent text-sm font-semibold hover:text-[#7dd3fc]">
                          {item.ctaLabel ?? 'Request'} {'->'}
                        </Link>
                      ) : null}
                    </div>
                    <h3 className="mt-2 text-xl font-semibold text-white">{item.title}</h3>
                    <p className="mt-2 text-sm text-soft">{item.description}</p>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="pb-20">
        <div className="container-shell">
          <div className="rounded-[24px] border border-white/8 bg-[#0b0d12] p-7 md:p-8">
            <p className="text-soft text-xs uppercase tracking-[0.14em]">Trusted external references</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Reference points for robotics teams</h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-soft">
              RoboSkin keeps external links narrow and useful. These resources help teams align terminology and integration expectations before requesting private material.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href="https://schema.org/Product"
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-white/12 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/8"
              >
                schema.org Product markup
              </a>
              <a
                href="https://docs.ros.org/"
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-white/12 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/8"
              >
                ROS documentation
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-shell">
          <div className="rounded-[24px] border border-white/8 bg-[#0b0d12] p-8 text-center md:p-11">
            <h2 className="text-3xl font-bold text-white md:text-4xl">Need help deciding what to request?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-soft">
              Tell us your robot type and use case, and we will route you to the most relevant resource or engineer.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link href="/contact?requestType=datasheet" className="rounded-xl bg-[var(--primary)] px-6 py-3 text-sm font-bold text-white shadow-[0_12px_26px_rgba(98,168,255,0.22)]">
                Request datasheet
              </Link>
              <Link href="/contact?requestType=integration" className="rounded-xl border border-white/12 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/8">
                Request integration docs
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
