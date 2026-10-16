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
            <p className="mt-5 max-w-3xl">Last updated: October 16, 2026</p>
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
                <h2 className="text-2xl font-semibold">Weekly report subscriptions</h2>
                <p className="mt-3">
                  When report checkout is open, the membership page and Waffo checkout display the US-dollar price, billing interval and applicable tax before payment. Subscriptions renew automatically at the stated interval until canceled. Report delivery is weekly, independently of the billing interval. Email verification alone does not create a paid subscription.
                </p>
                <p className="mt-3">
                  Active members receive an email notice linking to each published report and may read the private report library. The free Newsletter remains separate. Reports present source-linked research and analysis, not investment advice or a guarantee of technical performance. Source cutoffs and limitations are included in each report.
                </p>
                <p className="mt-3">
                  Cancel future renewals through the <a className="legal-link" href="https://pancake.waffo.ai/consumer/portal/login">Waffo billing portal</a>, using the email on your payment receipt. Canceling preserves access until the end of the paid period. Turning off report emails does not cancel billing. A full refund of the current period ends that period&apos;s access; partial refunds and refunds of earlier periods do not remove a later paid period.
                </p>
                <p className="mt-3">
                  For billing errors, missing reports, or refund requests, <a className="legal-link" href="/contact?requestType=other">contact RoboSkin support</a> with your order reference. Requests are reviewed against the payment record and applicable consumer rights; this page does not limit rights that cannot legally be waived.
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
