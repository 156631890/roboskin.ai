import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import { site } from '@/content/site';
import { buildBreadcrumbJsonLd, buildGraphJsonLd, buildPageJsonLd, buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata('/terms');

export default function TermsPage() {
  return (
    <>
      <JsonLd data={buildGraphJsonLd([buildPageJsonLd('/terms'), buildBreadcrumbJsonLd('/terms')])} />
      <article className="legal-page">
        <header className="legal-header">
          <div className="container-shell">
            <span className="eyebrow">Terms</span>
            <h1 className="mt-5 text-4xl font-bold md:text-6xl">Terms of Service</h1>
            <p className="mt-5 max-w-3xl">Last updated: April 8, 2026</p>
          </div>
        </header>

        <section className="legal-content">
          <div className="container-shell">
            <div className="legal-copy">
              <div>
                <h2 className="text-2xl font-semibold">Website use</h2>
                <p className="mt-3">
                  This site is provided for robot skin category information, contact requests, and research inquiries. You agree not to misuse the site or submit false information.
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-semibold">Services</h2>
                <p className="mt-3">
                  Public pages describe robot skin category context, learning resources, and the RoboSkin.ai research inquiry path. Any commercial engagement is subject to a separate written agreement.
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-semibold">Liability</h2>
                <p className="mt-3">
                  Site content is provided as-is and may change without notice. Public pages should not be read as hardware specifications, support commitments, or product availability claims.
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-semibold">Legal contact</h2>
                <p className="mt-3">
                  For legal questions, email <a className="legal-link" href={`mailto:${site.contact.legalEmail}`}>{site.contact.legalEmail}</a>.
                </p>
              </div>
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
