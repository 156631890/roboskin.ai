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
          <h1 className="mt-5 text-4xl font-bold text-[#111318] md:text-6xl">Terms of Service</h1>
          <p className="mt-5 max-w-3xl text-[#4f5560]">Last updated: April 8, 2026</p>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-shell">
          <div className="glass-card space-y-8 p-8 md:p-10">
            <div>
              <h2 className="text-2xl font-semibold text-[#111318]">Website use</h2>
              <p className="mt-3 text-[#4f5560]">
                This site is provided for robot skin category information, contact requests, and domain or research inquiries. You agree not to misuse the site or submit false information.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-[#111318]">Services</h2>
              <p className="mt-3 text-[#4f5560]">
                Public pages describe robot skin category context, learning resources, and the RoboSkin.ai domain inquiry path. Any commercial engagement is subject to a separate written agreement.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-[#111318]">Liability</h2>
              <p className="mt-3 text-[#4f5560]">
                Site content is provided as-is and may change without notice. Public pages should not be read as hardware specifications, support commitments, or product availability claims.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-[#111318]">Legal contact</h2>
              <p className="mt-3 text-[#4f5560]">
                For legal questions, email <a className="text-[#2e5bff] hover:text-[#2446c8]" href={`mailto:${site.contact.legalEmail}`}>{site.contact.legalEmail}</a>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
