import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import { site } from '@/content/site';
import { buildBreadcrumbJsonLd, buildGraphJsonLd, buildPageJsonLd, buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata('/terms');

export default function TermsPage() {
  return (
    <>
      <JsonLd data={buildGraphJsonLd([buildPageJsonLd('/terms'), buildBreadcrumbJsonLd('/terms')])} />
      <section className="py-20 md:py-24">
        <div className="container-shell">
          <span className="eyebrow">Terms</span>
          <h1 className="mt-5 text-4xl font-bold text-white md:text-6xl">Terms of Service</h1>
          <p className="mt-5 max-w-3xl text-soft">Last updated: April 8, 2026</p>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-shell">
          <div className="glass-card space-y-8 p-8 md:p-10">
            <div>
              <h2 className="text-2xl font-semibold text-white">Website use</h2>
              <p className="mt-3 text-soft">
                This site is provided for product information, contact requests, and technical inquiries. You agree not to misuse the site or submit false information.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-white">Services</h2>
              <p className="mt-3 text-soft">
                Public pages describe the current product lineup, solution paths, resources, and contact flow. Any commercial engagement is subject to a separate written agreement.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-white">Liability</h2>
              <p className="mt-3 text-soft">
                Site content is provided as-is and may change without notice. We do not guarantee that public specifications apply to every integration scenario.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-white">Legal contact</h2>
              <p className="mt-3 text-soft">
                For legal questions, email <a className="text-accent hover:text-[#7dd3fc]" href={`mailto:${site.contact.legalEmail}`}>{site.contact.legalEmail}</a>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
