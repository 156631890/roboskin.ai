import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Answers to common questions about contacting RoboSkin and requesting materials.',
  robots: { index: false, follow: false },
};

const faqs = [
  {
    q: 'How do I request a datasheet?',
    a: 'Use the Contact page and choose the datasheet request type.',
  },
  {
    q: 'Can I ask for a custom integration review?',
    a: 'Yes. Share the robot platform, target geometry, and timeline in the contact form.',
  },
  {
    q: 'What email should I use for direct inquiries?',
    a: site.contact.primaryEmail,
  },
];

export default function FAQPage() {
  return (
    <>
      <section className="py-20 md:py-24">
        <div className="container-shell">
          <span className="eyebrow">FAQ</span>
          <h1 className="mt-5 text-4xl font-bold text-white md:text-6xl">Questions we actually answer publicly</h1>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-shell space-y-4">
          {faqs.map((faq) => (
            <details key={faq.q} className="glass-card group p-6">
              <summary className="cursor-pointer list-none text-lg font-semibold text-white">{faq.q}</summary>
              <p className="mt-3 text-slate-300">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="pb-20">
        <div className="container-shell">
          <div className="glass-card p-8 text-center">
            <p className="text-slate-300">Need a faster answer?</p>
            <Link href="/contact" className="mt-4 inline-flex rounded-xl bg-gradient-to-r from-cyan-300 to-blue-400 px-6 py-3 text-sm font-bold text-slate-950">
              Contact the team
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
