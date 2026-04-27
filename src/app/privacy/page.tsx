import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import { site } from '@/content/site';
import { buildBreadcrumbJsonLd, buildGraphJsonLd, buildPageJsonLd, buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata('/privacy');

export default function PrivacyPolicyPage() {
  return (
    <>
      <JsonLd data={buildGraphJsonLd([buildPageJsonLd('/privacy'), buildBreadcrumbJsonLd('/privacy')])} />
      <section className="py-20 md:py-24">
        <div className="container-shell">
          <span className="eyebrow">Privacy</span>
          <h1 className="mt-5 text-4xl font-bold text-white md:text-6xl">Privacy Policy</h1>
          <p className="mt-5 max-w-3xl text-soft">Last updated: April 8, 2026</p>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-shell">
          <div className="glass-card space-y-8 p-8 md:p-10">
            <div>
              <h2 className="text-2xl font-semibold text-white">Information we collect</h2>
              <p className="mt-3 text-soft">
                We collect the data you submit through the contact form, including name, company, email, use case, timeline, phone number, requested asset, and message.
                We also collect basic site usage data if analytics or logging is enabled.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-white">How we use it</h2>
              <p className="mt-3 text-soft">
                We use submissions to respond to requests, route inquiries internally, and improve the site experience.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-white">Sharing</h2>
              <p className="mt-3 text-soft">
                We do not sell personal information. We may share request data with service providers or route it to a configured webhook when the form is submitted.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-white">Contact</h2>
              <p className="mt-3 text-soft">
                For privacy questions, email <a className="text-accent hover:text-[#7dd3fc]" href={`mailto:${site.contact.privacyEmail}`}>{site.contact.privacyEmail}</a>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
