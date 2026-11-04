import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import { site } from '@/content/site';
import { buildBreadcrumbJsonLd, buildGraphJsonLd, buildPageJsonLd, buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata('/privacy');

const readingGuide = {
  "id": "privacy-controls",
  "heading": "Find the control for the information you want to manage",
  "body": [
    "The controls below apply to different activities. Changing one preference does not automatically change the others. The sections that follow explain the information involved and the providers used."
  ],
  "table": {
    "headers": [
      "Your request",
      "Where to act",
      "What it does not do"
    ],
    "rows": [
      [
        "Change Google Analytics consent",
        "Analytics settings in the footer, when enabled",
        "Does not control the separate cookie-free statistics described below"
      ],
      [
        "Stop free Newsletter emails",
        "The named provider’s unsubscribe controls, when signup is available",
        "Does not cancel paid report membership"
      ],
      [
        "Stop report notification emails",
        "Your report membership page",
        "Does not cancel subscription renewal"
      ],
      [
        "Ask about a submitted inquiry or stored information",
        "The privacy email below",
        "Does not itself confirm that deletion has been completed"
      ]
    ]
  },
  "subsections": [
    {
      "heading": "Send only the context needed for the request",
      "body": [
        "Identify the relevant service and the email address or page involved so we can locate your request. Do not send passwords, sign-in codes or payment-card numbers. The retention and deletion qualifications below still apply."
      ]
    }
  ],
  "links": [
    {
      "label": "Privacy contact",
      "href": "#privacy-contact"
    },
    {
      "label": "Report membership",
      "href": "/weekly-reports"
    },
    {
      "label": "Billing and cancellation information",
      "href": "/terms#subscription-controls"
    }
  ]
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <JsonLd data={buildGraphJsonLd([buildPageJsonLd('/privacy'), buildBreadcrumbJsonLd('/privacy')])} />
      <article className="legal-page">
        <header className="legal-header">
          <div className="container-shell">
            <span className="eyebrow">Privacy</span>
            <h1 className="mt-5 text-4xl font-bold md:text-6xl">Privacy Policy</h1>
            <p className="mt-5 max-w-3xl">Last updated: October 27, 2026. Navigation guide reviewed November 4, 2026.</p>
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
                <h2 className="text-2xl font-semibold">Information we collect</h2>
                <p className="mt-3">
                  We collect the data you submit through the contact or commercial inquiry forms, including name, company, role, email, use case, platform, timeline, budget range, NDA preference, phone number, requested asset, and message where those fields apply.
                  When online submission is configured, requests are forwarded to our delivery service and management inbox. A prepared email or WhatsApp draft is sent only when you send it in your own app. Delivery errors are not recorded as successful inquiries.
                  When the Newsletter panel shows its unavailable state, it does not render an email field or collect an email address. If a signup form is displayed, it identifies the external email-list provider before submission. The Buttondown integration sends your address through our server for double opt-in confirmation; an approved hosted provider form may send it directly. An accepted request is not a confirmed subscription. Each sent brief includes an unsubscribe link.
                  When Vercel Web Analytics is enabled, we also collect aggregated page-view, referrer, country, device, browser, and operating-system data. Vercel Web Analytics does not use cookies or store personal identifiers for this site.
                </p>
                <p className="mt-3">
                  We also use GEOInflow, hosted on our server in Singapore, for cookie-free statistics about public page visits, referring websites (including AI assistants), reading depth, and selected resource and contact clicks. Requests pass through Cloudflare. The collector uses network and browser information to derive anonymous visit identifiers and approximate location. We remove query strings and fragments from reported page addresses and remove paths from referrers. We do not send form contents, link labels, email addresses, phone numbers, or membership identifiers in these events. Contact and download clicks measure intent, not completed submissions or downloads. This tracker respects your browser&apos;s Do Not Track setting and does not run on our membership or authentication routes.
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-semibold">Paid report membership</h2>
                <p className="mt-3">
                  When enabled, report membership stores your verified email address, email delivery preference, subscription references and status, access period, and email delivery receipts in a private database. Resend processes sign-in codes and report notification emails. Waffo hosts checkout, handles payment details, and provides the billing portal under its own terms and privacy policy. We do not collect or store your card number.
                </p>
                <p className="mt-3">
                  Sign-in codes expire after 10 minutes. A secure, HTTP-only cookie keeps your report session signed in for up to 30 days; signing out removes that session. Hashed request identifiers limit abuse. Expired authentication and rate-limit records are removed by the report delivery task. Billing and delivery records are retained for account support and applicable accounting obligations. Contact us to request access or deletion; records required by law may need to be retained.
                </p>
                <p className="mt-3">
                  You can stop report notifications from your membership page. This preference does not cancel subscription billing; cancel renewal in the Waffo billing portal. Paid report membership does not subscribe you to the separate free Newsletter.
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-semibold">Optional Google Analytics</h2>
                <p className="mt-3">
                  If you choose Allow analytics, Google Analytics 4 measures page visits and engagement on roboskin.ai. Google receives page paths, page titles, referring website information, and browser and device information, and derives approximate location from the connection. Analytics cookies distinguish browsers and sessions; we set a 90-day cookie lifetime that may refresh with visits. Google processes this data under its <a className="legal-link" href="https://policies.google.com/privacy">Privacy Policy</a>.
                </p>
                <p className="mt-3">
                  We load the Google tag only after you allow it. We remove query strings and fragments from reported page addresses and exclude external referrer paths. For our published resource-sharing links, we separately report only pre-approved source, medium and campaign labels; other query values are discarded. We also measure clicks to selected public research resources and downloads using resource identifiers and page paths. A download click does not confirm a completed download. We do not send form contents, email addresses, or user IDs to GA4, and we do not enable Google signals or advertising personalization. Automatic form, search, and outbound-link measurement is disabled.
                </p>
                <p className="mt-3">
                  Use Analytics settings in the footer to allow or decline Google Analytics at any time. Declining stops further GA4 collection and removes its cookies on this site; it does not remove data already received by Google. We store your choice in this browser&apos;s local storage. This choice applies to Google Analytics; the cookie-free Vercel and GEOInflow statistics described above remain separate.
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-semibold">How we use it</h2>
                <p className="mt-3">
                  We use submissions to respond to requests and route inquiries internally. When enabled, Cloudflare Turnstile verifies form requests to limit abuse. Briefly retained hashed network identifiers limit submission bursts; we do not include email addresses or message text in analytics events. Aggregated analytics help us understand which public pages and research resources are useful and improve site navigation.
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-semibold">Sharing</h2>
                <p className="mt-3">
                  We do not sell personal information. Configured contact delivery may use FormSubmit and Zoho Mail; the online form is unavailable until a delivery route is configured. When Newsletter signup is available, the interface names the external email-list provider before an address is submitted. That provider processes the signup and any later email-list controls under its own privacy terms. RoboSkin.ai does not treat a form handoff as proof of subscription.
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-semibold">Choices and deletion</h2>
                <p className="mt-3">
                  You may ask us to delete a contact submission by using the address below. If Newsletter signup is available, use the controls supplied by the named email-list provider or contact us for help. When the panel shows its unavailable state, no newsletter email address is collected on the site.
                </p>
              </div>
              <div>
                <h2 id="privacy-contact" className="text-2xl font-semibold">Contact</h2>
                <p className="mt-3">
                  For privacy questions, email <a className="legal-link" href={`mailto:${site.contact.privacyEmail}`}>{site.contact.privacyEmail}</a>.
                </p>
              </div>
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
