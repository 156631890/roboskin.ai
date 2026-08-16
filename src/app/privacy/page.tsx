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
          <h1 className="mt-5 text-4xl font-bold text-[#111318] md:text-6xl">Privacy Policy</h1>
          <p className="mt-5 max-w-3xl text-[#4f5560]">Last updated: August 17, 2026</p>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-shell">
          <div className="glass-card space-y-8 p-8 md:p-10">
            <div>
              <h2 className="text-2xl font-semibold text-[#111318]">Information we collect</h2>
              <p className="mt-3 text-[#4f5560]">
                We collect the data you submit through the contact, commercial inquiry, or newsletter forms, including name, company, role, email, use case, platform, timeline, budget range, NDA preference, phone number, requested asset, and message where those fields apply.
                Contact-form submissions are processed by FormSubmit and delivered to the site management inbox. FormSubmit may retain submitted form data for up to 30 days for delivery and recovery.
                When no direct form endpoint is configured, the site opens WhatsApp with a prepared message; information is transferred only if the visitor continues and sends it there.
                When Vercel Web Analytics is enabled, we also collect aggregated page-view, referrer, country, device, browser, and operating-system data. Vercel Web Analytics does not use cookies or store personal identifiers for this site.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-[#111318]">How we use it</h2>
              <p className="mt-3 text-[#4f5560]">
                We use submissions to respond to requests and route inquiries internally. Aggregated analytics help us understand which public pages and research resources are useful and improve site navigation.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-[#111318]">Sharing</h2>
              <p className="mt-3 text-[#4f5560]">
                We do not sell personal information. Contact requests are processed by FormSubmit and delivered through Gmail. Newsletter subscriptions, once enabled, are processed by the named email-list provider shown during confirmation so that it can store subscription status, deliver the brief, and honor unsubscribe requests.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-[#111318]">Choices and deletion</h2>
              <p className="mt-3 text-[#4f5560]">
                You may ask us to delete a contact submission by using the address below. Newsletter readers can decline the confirmation email or use the unsubscribe link in any delivered brief.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-[#111318]">Contact</h2>
              <p className="mt-3 text-[#4f5560]">
                For privacy questions, email <a className="text-[#2e5bff] hover:text-[#2446c8]" href={`mailto:${site.contact.privacyEmail}`}>{site.contact.privacyEmail}</a>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
