import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import { site } from '@/content/site';
import { buildBreadcrumbJsonLd, buildGraphJsonLd, buildPageJsonLd, buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata('/terms');

const readingGuide = {
  "id": "subscription-controls",
  "heading": "Choose the action that matches your request",
  "body": [
    "Email preferences, subscription renewal and a refund request are separate actions. This guide points to the existing controls and terms below; it does not change the price, refund window or other service terms."
  ],
  "table": {
    "headers": [
      "What you want to do",
      "Action",
      "Important distinction"
    ],
    "rows": [
      [
        "Read public research",
        "Open the public guides and research pages",
        "No report membership is required"
      ],
      [
        "Stop report notification emails",
        "Change the preference on your membership page",
        "Billing continues unless renewal is canceled"
      ],
      [
        "Stop future subscription renewals",
        "Use the Waffo billing portal with the purchase email",
        "Canceling renewal alone does not refund a paid period"
      ],
      [
        "Report a billing or delivery problem",
        "Contact support with the purchase email and order reference",
        "A support request is not confirmation that a refund was processed"
      ],
      [
        "Discuss bespoke research",
        "Agree a written scope, price and schedule before work starts",
        "Sending an inquiry does not create a charge"
      ]
    ]
  },
  "subsections": [
    {
      "heading": "Keep the service and purchase record identifiable",
      "body": [
        "Use the email associated with the relevant purchase and retain the order reference. Do not send card numbers or sign-in codes. Consult the full cancellation, refund and access provisions below for the effect of an approved action."
      ]
    }
  ],
  "links": [
    {
      "label": "Manage report email preferences",
      "href": "/weekly-reports"
    },
    {
      "label": "Waffo billing portal",
      "href": "https://pancake.waffo.ai/consumer/portal/login"
    },
    {
      "label": "Contact support",
      "href": "/contact?requestType=other"
    },
    {
      "label": "Privacy choices",
      "href": "/privacy#privacy-controls"
    }
  ]
};

export default function TermsPage() {
  return (
    <>
      <JsonLd data={buildGraphJsonLd([buildPageJsonLd('/terms'), buildBreadcrumbJsonLd('/terms')])} />
      <article className="legal-page">
        <header className="legal-header">
          <div className="container-shell">
            <span className="eyebrow">Terms</span>
            <h1 className="mt-5 text-4xl font-bold md:text-6xl">Terms of Service</h1>
            <p className="mt-5 max-w-3xl">Last updated: October 16, 2026. Navigation guide reviewed November 4, 2026.</p>
          </div>
        </header>

    <section id={readingGuide.id} className="pb-14">
      <div className="container-shell">
        <div className="signal-panel p-6 md:p-8">
          <p className="text-sm text-soft">Reading guide reviewed November 4, 2026. Existing research dates and service terms remain separately identified.</p>
          <h2 className="mt-4 text-3xl font-semibold text-inherit">{readingGuide.heading}</h2>
          {readingGuide.body.map((text) => <p key={text} className="mt-4 leading-relaxed text-soft">{text}</p>)}
          <div className="mt-6 overflow-x-auto" tabIndex={0} role="region" aria-label={readingGuide.heading}>
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead><tr>{readingGuide.table.headers.map((text) => <th key={text} scope="col" className="border-b border-black/20 p-4 text-inherit">{text}</th>)}</tr></thead>
              <tbody>{readingGuide.table.rows.map((row) => <tr key={row[0]}>{row.map((text, index) => index === 0 ? <th key={text} scope="row" className="border-b border-black/20 p-4 align-top text-inherit">{text}</th> : <td key={text} className="border-b border-black/20 p-4 align-top leading-relaxed text-soft">{text}</td>)}</tr>)}</tbody>
            </table>
          </div>
          {readingGuide.subsections.map((section) => <div key={section.heading} className="mt-6"><h3 className="text-xl font-semibold text-inherit">{section.heading}</h3>{section.body.map((text) => <p key={text} className="mt-3 leading-relaxed text-soft">{text}</p>)}</div>)}
          <ul className="mt-6 grid gap-3">{readingGuide.links.map((link) => <li key={link.href}><Link href={link.href} className="text-sm font-semibold text-inherit underline underline-offset-4">{link.label}</Link></li>)}</ul>
        </div>
      </div>
    </section>

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
                  Public research pages and the free Newsletter are available without a report membership. The weekly report subscription described below is a separate digital service. Bespoke research work is quoted individually and begins only after you accept a written scope, price, delivery schedule and payment terms; sending an inquiry does not create a charge.
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-semibold">Weekly report subscriptions</h2>
                <p className="mt-3">
                  Report membership costs US$9.90 per month, plus applicable tax shown at Waffo checkout before payment. Subscriptions renew automatically each month until canceled. Members receive one new industry report every week during their paid subscription. Email verification alone does not create a paid subscription, and billing does not begin while checkout is closed.
                </p>
                <p className="mt-3">
                  Active members receive an email notice linking to each published report and may read the private report library. The free Newsletter remains separate. Reports present source-linked research and analysis, not investment advice or a guarantee of technical performance. Source cutoffs and limitations are included in each report.
                </p>
                <p className="mt-3">
                  Cancel future renewals through the <a className="legal-link" href="https://pancake.waffo.ai/consumer/portal/login">Waffo billing portal</a>, using the email on your payment receipt. Canceling preserves access until the end of the paid period. Turning off report emails does not cancel billing. A full refund of the current period ends that period&apos;s access; partial refunds and refunds of earlier periods do not remove a later paid period.
                </p>
                <p className="mt-3">
                  Waffo.com Limited is the Merchant of Record for subscription payments and issues payment receipts. RoboSkin provides the report content and membership support. The price, applicable tax and recurring billing terms are shown before you pay.
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-semibold">Refunds and billing problems</h2>
                <p className="mt-3">
                  You may request a full refund within seven days of your first subscription payment. For a duplicate charge, incorrect amount, or a paid report that we fail to provide, contact us with your order reference so we can investigate and arrange the appropriate refund or delivery remedy. Canceling renewal alone does not refund an already-paid period; statutory cancellation and refund rights still apply.
                </p>
                <p className="mt-3">
                  Send refund requests to <a className="legal-link" href={`mailto:${site.contact.legalEmail}`}>{site.contact.legalEmail}</a> or <a className="legal-link" href="/contact?requestType=other">our support form</a>, using your purchase email and order reference. Do not send card numbers. Approved refunds are processed through Waffo to the original payment method; the time for the credit to appear depends on the payment provider and bank. A full refund ends access for the refunded billing period.
                </p>
                <p className="mt-3">
                  Bespoke research has its own written cancellation and refund terms, agreed before payment. If we cannot deliver agreed work, contact us to resolve delivery or a refund for the affected work. Nothing in these terms removes consumer rights that cannot legally be waived.
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-semibold">Misuse, suspension and termination</h2>
                <p className="mt-3">
                  Do not share account access, redistribute private paid reports without permission, submit fraudulent information, interfere with the site, or attempt to access another member&apos;s data. We may warn you, restrict access, or suspend or terminate an account for these violations. Where practicable, we will explain the reason and give you an opportunity to respond; immediate restrictions may be needed to prevent fraud or protect other users. Contact support if you believe a restriction is mistaken.
                </p>
                <p className="mt-3">
                  An account restriction does not itself cancel a Waffo subscription. If we terminate your paid membership, we will arrange cancellation of future renewals and address any unused paid service and applicable refund rights. You may also stop future charges directly in the Waffo billing portal.
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
