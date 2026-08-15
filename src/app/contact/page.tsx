import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import ContactForm from '@/components/ContactForm';
import JsonLd from '@/components/JsonLd';
import PageHeroVisual from '@/components/PageHeroVisual';
import { contactPaths, pageVisuals, site } from '@/content/site';
import { buildBreadcrumbJsonLd, buildGraphJsonLd, buildPageJsonLd, buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata('/contact');

export default function ContactPage() {
  return (
    <>
      <JsonLd data={buildGraphJsonLd([buildPageJsonLd('/contact'), buildBreadcrumbJsonLd('/contact')])} />
      <section className="contact-masthead">
        <div className="container-shell contact-masthead-grid">
          <div>
            <span className="eyebrow">Contact</span>
            <h1>Send a research note</h1>
            <p>
              Use this page for source suggestions, corrections, editorial collaboration, or research notes related to robot skin and tactile AI.
            </p>
            <div className="contact-direct">
              <p>Primary: <a className="text-accent hover:text-white" href={`mailto:${site.contact.primaryEmail}`}>{site.contact.primaryEmail}</a></p>
              <p>WhatsApp: <a className="text-accent hover:text-white" href={`https://wa.me/${site.contact.whatsappDial}`} target="_blank" rel="noreferrer">{site.contact.whatsapp}</a></p>
              <p>WeChat: <span className="text-white">{site.contact.wechat}</span></p>
              <p>Legal: <a className="text-accent hover:text-white" href={`mailto:${site.contact.legalEmail}`}>{site.contact.legalEmail}</a></p>
            </div>
          </div>
          <PageHeroVisual visual={pageVisuals.contact} className="self-center" priority />
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="container-shell mb-10">
          <div className="contact-route-index">
            {contactPaths.map((path, index) => (
              <article key={path.title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h2>{path.title}</h2>
                <p>{path.summary}</p>
                <Link href={path.href}>
                  {path.ctaLabel} {'->'}
                </Link>
              </article>
            ))}
          </div>
        </div>
        <div className="container-shell contact-workspace">
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
          <div className="contact-guidance">
            <h2 className="text-2xl font-semibold text-white">What to include</h2>
            <ul className="mt-5 space-y-3 text-sm text-soft">
              <li>Research topic, source URL, or page that needs correction</li>
              <li>Company, lab, publication, or project context</li>
              <li>Why the source improves the public page</li>
              <li>Timeline for collaboration or content review if relevant</li>
              <li>Research correction or source suggestion if this is an information request</li>
            </ul>
            <div className="mt-8 rounded-2xl border border-white/8 bg-[#0d1016] p-5">
              <p className="text-soft text-xs uppercase tracking-[0.14em]">What happens next</p>
              <ul className="mt-4 space-y-2 text-sm text-[#d8dce4]">
                <li className="rounded-lg border border-white/8 bg-[#0b0d12] px-4 py-2.5">We identify whether the message is a correction, source suggestion, collaboration, or other note.</li>
                <li className="rounded-lg border border-white/8 bg-[#0b0d12] px-4 py-2.5">Research suggestions are checked against public sources before they affect site copy.</li>
                <li className="rounded-lg border border-white/8 bg-[#0b0d12] px-4 py-2.5">Research and content notes are considered for future site updates.</li>
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


