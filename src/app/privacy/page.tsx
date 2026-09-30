import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import { site } from '@/content/site';
import { buildBreadcrumbJsonLd, buildGraphJsonLd, buildPageJsonLd, buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata('/privacy');

export default function PrivacyPolicyPage() {
  return (
    <>
      <JsonLd data={buildGraphJsonLd([buildPageJsonLd('/privacy'), buildBreadcrumbJsonLd('/privacy')])} />
      <article className="legal-page">
        <header className="legal-header">
          <div className="container-shell">
            <span className="eyebrow">Privacy</span>
            <h1 className="mt-5 text-4xl font-bold md:text-6xl">Privacy Policy</h1>
            <p className="mt-5 max-w-3xl">Last updated: September 30, 2026</p>
          </div>
        </header>

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
                <h2 className="text-2xl font-semibold">Contact</h2>
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
