import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import ContactForm from '@/components/ContactForm';
import JsonLd from '@/components/JsonLd';
import { contactPaths, site } from '@/content/site';
import { buildBreadcrumbJsonLd, buildGraphJsonLd, buildPageJsonLd, buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata('/contact');

export default function ContactPage() {
  return (
    <>
      <JsonLd data={buildGraphJsonLd([buildPageJsonLd('/contact'), buildBreadcrumbJsonLd('/contact')])} />
      <section className="py-20 md:py-24">
        <div className="container-shell grid items-center gap-9 md:grid-cols-[1fr_0.95fr]">
          <div>
            <span className="eyebrow">Domain inquiry</span>
            <h1 className="mt-5 text-4xl font-bold text-[var(--text)] md:text-6xl">Inquire about RoboSkin.ai</h1>
            <p className="mt-5 max-w-xl text-soft">
              Use this page for domain acquisition, partnership, content collaboration, or research notes related to robot skin and tactile AI.
            </p>
            <div className="mt-8 space-y-2 text-sm text-soft">
              <p>Primary: <a className="text-accent hover:text-white" href={`mailto:${site.contact.primaryEmail}`}>{site.contact.primaryEmail}</a></p>
              <p>Sales: <a className="text-accent hover:text-white" href={`mailto:${site.contact.salesEmail}`}>{site.contact.salesEmail}</a></p>
              <p>WhatsApp: <a className="text-accent hover:text-white" href={`https://wa.me/${site.contact.whatsappDial}`} target="_blank" rel="noreferrer">{site.contact.whatsapp}</a></p>
              <p>WeChat: <span className="text-white">{site.contact.wechat}</span></p>
              <p>Legal: <a className="text-accent hover:text-white" href={`mailto:${site.contact.legalEmail}`}>{site.contact.legalEmail}</a></p>
            </div>
          </div>
          <div className="glass-card min-h-72 rounded-[20px] border border-white/8 p-6">
            <div className="flex h-full items-center justify-center rounded-[16px] border border-white/8 bg-[#0d1016] p-6">
              <div className="max-w-sm text-center">
                <p className="text-soft text-sm uppercase tracking-[0.16em]">Next step</p>
                <h2 className="mt-3 text-2xl font-semibold text-[var(--text)]">Domain acquisition is the primary path</h2>
                <p className="mt-3 text-sm leading-relaxed text-soft">
                  Serious buyers should include intended use, timeline, and a budget or broker signal so the inquiry can be evaluated quickly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-shell mb-10">
          <div className="grid gap-5 md:grid-cols-3">
            {contactPaths.map((path) => (
              <article key={path.title} className="glass-card p-6">
                <h2 className="text-xl font-semibold text-white">{path.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-soft">{path.summary}</p>
                <Link href={path.href} className="mt-5 inline-flex text-sm font-semibold text-accent hover:text-white">
                  {path.ctaLabel} {'->'}
                </Link>
              </article>
            ))}
          </div>
        </div>
        <div className="container-shell grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Suspense
            fallback={
              <div className="glass-card min-h-[620px] p-8">
                <div className="h-6 w-36 rounded-full bg-[#1a202b]" />
                <div className="mt-6 space-y-4">
                  <div className="h-14 rounded-xl bg-[#141922]" />
                  <div className="h-14 rounded-xl bg-[#141922]" />
                  <div className="h-14 rounded-xl bg-[#141922]" />
                  <div className="h-32 rounded-xl bg-[#141922]" />
                </div>
              </div>
            }
          >
            <ContactForm />
          </Suspense>
          <div className="glass-card p-6 md:p-8">
            <h2 className="text-2xl font-semibold text-white">What to include</h2>
            <ul className="mt-5 space-y-3 text-sm text-soft">
              <li>Application or robot platform</li>
              <li>Target geometry and form factor</li>
              <li>Surface area, curvature, and attachment constraints</li>
              <li>Expected software interface, SDK, or ROS 2 needs</li>
              <li>Integration timeline</li>
            </ul>
            <div className="mt-8 rounded-2xl border border-white/8 bg-[#0d1016] p-5">
              <p className="text-soft text-xs uppercase tracking-[0.14em]">What happens next</p>
              <ul className="mt-4 space-y-2 text-sm text-[#d8dce4]">
                <li className="rounded-lg border border-white/8 bg-[#0b0d12] px-4 py-2.5">We confirm the request type (datasheet, demo, or integration review).</li>
                <li className="rounded-lg border border-white/8 bg-[#0b0d12] px-4 py-2.5">If details depend on geometry or environment, we route you to a request-only brief.</li>
                <li className="rounded-lg border border-white/8 bg-[#0b0d12] px-4 py-2.5">We reply with a concrete next step and the minimum information we still need.</li>
              </ul>
            </div>
            <div className="mt-8 rounded-2xl border border-white/8 bg-[#0d1016] p-5">
              <p className="text-sm text-soft">
                For direct inquiries: <a className="text-accent hover:text-white" href={`mailto:${site.contact.primaryEmail}`}>{site.contact.primaryEmail}</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}


