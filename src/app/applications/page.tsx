import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import { site } from '@/content/site';
import { buildBreadcrumbJsonLd, buildGraphJsonLd, buildPageJsonLd, buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata('/applications');

const applicationAreas = [
  {
    title: 'Humanoid robot skin',
    summary: 'Robot skin language is most visible around hands, arms, grippers, and curved humanoid surfaces where contact awareness matters.',
  },
  {
    title: 'Tactile AI and e-skin',
    summary: 'Tactile AI connects sensing vocabulary with perception, control, slip detection, multimodal sensing, and flexible electronic skin research.',
  },
  {
    title: 'Prosthetics and assistive devices',
    summary: 'Assistive robotics and prosthetics use touch-related terminology for safer interaction, force awareness, feedback, and human-centered design.',
  },
  {
    title: 'Research, media, and category ownership',
    summary: 'RoboSkin.ai can anchor a category guide, research initiative, media property, or brand narrative around the robot skin field.',
  },
];

export default function ApplicationsPage() {
  return (
    <>
      <JsonLd data={buildGraphJsonLd([buildPageJsonLd('/applications'), buildBreadcrumbJsonLd('/applications')])} />
      <section className="py-20 md:py-24">
        <div className="container-shell">
          <span className="eyebrow">Applications</span>
          <div className="mt-6 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-white md:text-6xl">Robot skin applications and category use cases</h1>
              <p className="mt-5 max-w-3xl text-soft">
                RoboSkin.ai frames where robot skin, tactile AI, and e-skin terminology appears across robotics research, assistive devices, media, and category
                ownership. The page is educational and does not imply product availability.
              </p>
            </div>
            <div className="glass-card p-6">
              <p className="text-sm font-semibold text-white">{site.domainInquiry.headline}</p>
              <p className="mt-3 text-sm leading-relaxed text-soft">{site.domainInquiry.summary}</p>
              <Link href={site.domainInquiry.href} className="mt-5 inline-flex rounded-xl bg-[var(--primary)] px-5 py-2.5 text-sm font-bold text-white">
                {site.domainInquiry.ctaLabel}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-shell grid gap-5 md:grid-cols-2">
          {applicationAreas.map((area) => (
            <article key={area.title} className="glass-card p-7">
              <h2 className="text-2xl font-semibold text-white">{area.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-soft">{area.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="pb-20">
        <div className="container-shell">
          <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-7 md:p-8">
            <span className="eyebrow">Explore the category</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white">Follow the research and terminology routes</h2>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-soft">
              Use the research and glossary sections for source discovery, definitions, and context before making claims about robot skin technology.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/research" className="rounded-xl border border-white/12 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/8">
                Explore robot skin research
              </Link>
              <Link href="/glossary" className="rounded-xl border border-white/12 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/8">
                Read the glossary
              </Link>
              <Link href="/contact?requestType=domain" className="rounded-xl bg-[var(--primary)] px-5 py-2.5 text-sm font-bold text-white">
                Inquire about RoboSkin.ai
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
