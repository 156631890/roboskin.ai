import type { Metadata } from 'next';
import Link from 'next/link';
import { aboutSections, site } from '@/content/site';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn what RoboSkin builds, how we work with robotics teams, and how to request technical material or an integration review.',
  alternates: {
    canonical: `${site.url}/about`,
  },
};

export default function AboutPage() {
  return (
    <>
      <section className="py-20 md:py-24">
        <div className="container-shell">
          <span className="eyebrow">About</span>
          <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
            <h1 className="text-4xl font-bold text-white md:text-6xl">What RoboSkin is, and what it is not</h1>
            <Link href="/contact?requestType=integration" className="text-accent text-sm font-semibold hover:text-white">
              Talk to engineering {'->'}
            </Link>
          </div>
          <p className="mt-5 max-w-3xl text-soft">
            RoboSkin focuses on tactile sensing systems for robotics: hardware, integration support, and a disciplined public content model. We avoid unsupported
            performance claims and route application-specific details into request-only technical material.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-shell grid gap-6 lg:grid-cols-2">
          {aboutSections.map((section) => (
            <article key={section.title} className="glass-card p-7 md:p-8">
              <h2 className="text-2xl font-semibold text-white md:text-3xl">{section.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-soft">{section.summary}</p>
              <ul className="mt-6 space-y-2 text-sm text-[#d8dce4]">
                {section.bullets.map((bullet) => (
                  <li key={bullet} className="rounded-lg border border-white/8 bg-[#0d1016] px-4 py-2.5">
                    {bullet}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="pb-20">
        <div className="container-shell">
          <div className="rounded-[24px] border border-white/8 bg-[#0b0d12] p-8 text-center md:p-11">
            <h2 className="text-3xl font-bold text-white md:text-4xl">Need a practical next step?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-soft">
              If you have a target surface and a timeline, we can recommend the right starting offer and the right material to request.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link
                href="/contact?requestType=integration"
                className="rounded-xl bg-[var(--primary)] px-7 py-3 text-sm font-bold text-white shadow-[0_12px_26px_rgba(98,168,255,0.22)]"
              >
                Request integration review
              </Link>
              <Link
                href="/downloads"
                className="rounded-xl border border-white/12 bg-white/5 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/8"
              >
                Request technical material
              </Link>
            </div>
            <p className="mt-4 text-sm text-soft">
              Direct inquiries: <a className="text-accent underline decoration-white/30 underline-offset-4 hover:text-white" href={`mailto:${site.contact.primaryEmail}`}>{site.contact.primaryEmail}</a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
