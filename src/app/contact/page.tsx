import type { Metadata } from 'next';
import { Suspense } from 'react';
import ContactForm from '@/components/ContactForm';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Talk to the RoboSkin team about demos, datasheets, and integration support.',
  alternates: {
    canonical: `${site.url}/contact`,
  },
};

export default function ContactPage() {
  return (
    <>
      <section className="py-20 md:py-24">
        <div className="container-shell grid items-center gap-9 md:grid-cols-[1fr_0.95fr]">
          <div>
            <span className="eyebrow">Contact</span>
            <h1 className="mt-5 text-4xl font-bold text-[#111318] md:text-6xl">Talk to the RoboSkin team</h1>
            <p className="mt-5 max-w-xl text-[#4f5560]">
              Tell us your use case, target form factor, and timeline. We&apos;ll help you find the right sensor or integration path.
            </p>
            <div className="mt-8 space-y-2 text-sm text-[#4f5560]">
              <p>Primary: <a className="text-[#2e5bff] hover:text-[#2446c8]" href={`mailto:${site.contact.primaryEmail}`}>{site.contact.primaryEmail}</a></p>
              <p>Sales: <a className="text-[#2e5bff] hover:text-[#2446c8]" href={`mailto:${site.contact.salesEmail}`}>{site.contact.salesEmail}</a></p>
              <p>Legal: <a className="text-[#2e5bff] hover:text-[#2446c8]" href={`mailto:${site.contact.legalEmail}`}>{site.contact.legalEmail}</a></p>
            </div>
          </div>
          <div className="glass-card min-h-72 rounded-[20px] border border-[#d9d3c8] p-6">
            <div className="flex h-full items-center justify-center rounded-[16px] border border-[#d9d3c8] bg-white p-6">
              <div className="max-w-sm text-center">
                <p className="text-sm uppercase tracking-[0.16em] text-[#61656f]">Next step</p>
                <h2 className="mt-3 text-2xl font-semibold text-[#111318]">Request a demo, datasheet, or integration review</h2>
                <p className="mt-3 text-sm leading-relaxed text-[#4f5560]">
                  Use the form to route your request to engineering or sales. We will respond within 2 business days.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-shell grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Suspense
            fallback={
              <div className="glass-card min-h-[620px] p-8">
                <div className="h-6 w-36 rounded-full bg-[#e7e1d7]" />
                <div className="mt-6 space-y-4">
                  <div className="h-14 rounded-xl bg-[#f1ede5]" />
                  <div className="h-14 rounded-xl bg-[#f1ede5]" />
                  <div className="h-14 rounded-xl bg-[#f1ede5]" />
                  <div className="h-32 rounded-xl bg-[#f1ede5]" />
                </div>
              </div>
            }
          >
            <ContactForm />
          </Suspense>
          <div className="glass-card p-6 md:p-8">
            <h2 className="text-2xl font-semibold text-[#111318]">What to include</h2>
            <ul className="mt-5 space-y-3 text-sm text-[#4f5560]">
              <li>Application or robot platform</li>
              <li>Target geometry and form factor</li>
              <li>Integration timeline</li>
              <li>Any interface or SDK requirements</li>
            </ul>
            <div className="mt-8 rounded-2xl border border-[#d9d3c8] bg-[#fbfaf7] p-5">
              <p className="text-sm text-[#4f5560]">
                For direct inquiries: <a className="text-[#2e5bff] hover:text-[#2446c8]" href={`mailto:${site.contact.primaryEmail}`}>{site.contact.primaryEmail}</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
