import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import {
  contentRoadmapTopics,
  homeProofPoints,
  homeStats,
  homeUseCases,
  manifesto,
  marketSignals,
  researchMapAreas,
  site,
  tactileAiStack,
  tactileIndustryDirections,
} from '@/content/site';
import { buildBreadcrumbJsonLd, buildFaqJsonLd, buildGraphJsonLd, buildPageJsonLd, buildPageMetadata } from '@/lib/seo';

const homeRobotSkinFaq = [
  {
    question: 'What is robot skin?',
    answer:
      'Robot skin is a tactile sensing surface that helps robots detect contact, pressure, shear, slip, and interaction events across robot hands, grippers, arms, or curved body surfaces.',
    href: '/faq',
    ctaLabel: 'Read the robot skin FAQ',
  },
  {
    question: 'What is tactile AI?',
    answer:
      'Tactile AI is the sensing, data, and control stack that turns touch signals into useful physical AI behavior for grasping, safety, and contact-rich work.',
    href: '/research',
    ctaLabel: 'Explore tactile AI research',
  },
  {
    question: 'What can partners request from RoboSkin.ai?',
    answer:
      'Partners can request the RoboSkin.ai Brief, State of Tactile AI notes, the Humanoid Tactile Stack Map, sponsorship discussions, collaboration, or strategic acquisition conversations.',
    href: '/contact',
    ctaLabel: 'Route an inquiry',
  },
];

export const metadata: Metadata = buildPageMetadata('/');

export default function Home() {
  return (
    <>
      <JsonLd data={buildGraphJsonLd([buildPageJsonLd('/'), buildBreadcrumbJsonLd('/'), buildFaqJsonLd(homeRobotSkinFaq)])} />

      <section className="relative overflow-hidden pb-16 pt-16 md:pb-20 md:pt-20">
        <div className="container-shell grid items-center gap-12 lg:grid-cols-[1.04fr_0.96fr]">
          <div className="reveal">
            <span className="eyebrow">Global robot skin / tactile AI portal | Humanoid Robot Skin | e-skin</span>
            <h1 className="mt-6 max-w-4xl text-5xl font-bold leading-[0.96] text-white md:text-7xl">
              When AI gets a body, it needs skin.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#9aa3b2]">
              RoboSkin.ai maps robot skin, tactile AI, e-skin, and contact-aware robotics for the next generation of humanoid and physical AI systems.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/research"
                className="rounded-xl bg-[#62a8ff] px-6 py-3 text-sm font-bold text-white shadow-[0_12px_26px_rgba(98,168,255,0.22)] transition-transform hover:scale-[1.02]"
              >
                Explore Tactile AI
              </Link>
              <Link
                href="/contact?requestType=brief&requestedAsset=RoboSkin.ai%20Brief"
                className="rounded-xl border border-white/12 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/8"
              >
                Request the RoboSkin.ai Brief
              </Link>
              <Link
                href="/contact?requestType=acquisition"
                className="rounded-xl border border-transparent px-2 py-3 text-sm font-semibold text-[#d7e7ff] hover:text-white"
              >
                Strategic Acquisition Inquiry
              </Link>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {homeStats.map((item, idx) => (
                <article key={item.label} className="glass-card reveal p-5" style={{ animationDelay: `${idx * 0.05}s` }}>
                  <p className="text-2xl font-bold text-white">{item.value}</p>
                  <p className="mt-1 text-sm leading-relaxed text-[#9aa3b2]">{item.label}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="reveal [animation-delay:0.1s]">
            <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(17,21,29,0.98),rgba(8,10,14,0.98))] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.42)]">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/8 pb-5">
                <div>
                  <p className="text-xs uppercase text-[#9aa3b2]">Global category map</p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">The Tactile AI Stack</h2>
                </div>
                <span className="rounded-full border border-white/10 bg-[#0d1016] px-3 py-1 text-[11px] uppercase text-[#d7e7ff]">
                  Physical AI layer
                </span>
              </div>
              <div className="mt-5 space-y-3">
                {tactileAiStack.map((layer, idx) => (
                  <div key={layer.title} className="grid gap-3 rounded-2xl border border-white/8 bg-[#0d1016] p-4 sm:grid-cols-[120px_1fr]">
                    <p className="text-sm font-semibold text-white">{idx + 1}. {layer.title}</p>
                    <p className="text-sm leading-relaxed text-soft">{layer.summary}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container-shell">
          <div className="mb-8 max-w-3xl">
            <span className="eyebrow">Why Touch Matters</span>
            <h2 className="mt-4 text-3xl font-bold text-white md:text-5xl">Physical AI needs more than vision, language, and motion</h2>
            <p className="mt-4 text-sm leading-relaxed text-soft">
              Robot skin becomes the contact layer between intelligence and the physical world: pressure, slip, surface interaction, safety response, and tactile data feedback.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {homeProofPoints.map((item, idx) => (
              <article key={item.title} className="glass-card reveal p-7" style={{ animationDelay: `${idx * 0.06}s` }}>
                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-soft">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="stack" className="py-14 md:py-20">
        <div className="container-shell">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="eyebrow">The Tactile AI Stack</span>
              <h2 className="mt-4 text-3xl font-bold text-white md:text-5xl">From skin materials to physical AI intelligence</h2>
            </div>
            <Link href="/technology" className="text-sm font-semibold text-[#62a8ff] hover:text-[#7dd3fc]">
              Explore technology {'->'}
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {tactileAiStack.map((layer, idx) => (
              <article key={layer.title} className="rounded-2xl border border-white/8 bg-[#0b0d12] p-5">
                <p className="text-xs font-semibold uppercase text-soft">Layer {idx + 1}</p>
                <h3 className="mt-3 text-xl font-semibold text-white">{layer.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-soft">{layer.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container-shell">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="eyebrow">Applications</span>
              <h2 className="mt-4 text-3xl font-bold text-white md:text-5xl">Where robot skin becomes useful first</h2>
            </div>
            <Link href="/solutions" className="text-sm font-semibold text-[#62a8ff] hover:text-[#7dd3fc]">
              View applications {'->'}
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {homeUseCases.map((item, idx) => (
              <article key={item.title} className="glass-card reveal p-7" style={{ animationDelay: `${idx * 0.08}s` }}>
                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#9aa3b2]">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container-shell">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="eyebrow">Research Map</span>
              <h2 className="mt-4 text-3xl font-bold text-white md:text-5xl">Papers, labs, companies, products, datasets, and patents</h2>
            </div>
            <Link href="/research" className="text-sm font-semibold text-[#62a8ff] hover:text-[#7dd3fc]">
              Open research notes {'->'}
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {researchMapAreas.map((item) => (
              <article key={item.title} className="rounded-2xl border border-white/8 bg-[#0b0d12] p-5">
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-soft">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container-shell">
          <div className="mb-8 max-w-3xl">
            <span className="eyebrow">Market Signals</span>
            <h2 className="mt-4 text-3xl font-bold text-white md:text-5xl">Signals to track as tactile AI becomes a category</h2>
            <p className="mt-4 text-sm leading-relaxed text-soft">
              The public site avoids unsupported market-size claims. The brief can organize the most relevant signals, categories, and buyer questions for serious readers.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {marketSignals.map((signal) => (
              <article key={signal.title} className="glass-card p-7">
                <h3 className="text-xl font-semibold text-white">{signal.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-soft">{signal.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container-shell">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="eyebrow">For Buyers and Partners</span>
              <h2 className="mt-4 text-3xl font-bold text-white md:text-5xl">Seven directions for building RoboSkin.ai into an industry asset</h2>
            </div>
            <Link href="/contact?requestType=partnership" className="text-sm font-semibold text-[#62a8ff] hover:text-[#7dd3fc]">
              Discuss partnership {'->'}
            </Link>
          </div>
          <div className="grid gap-5 lg:grid-cols-2">
            {tactileIndustryDirections.map((item, idx) => (
              <article key={item.title} className="glass-card reveal p-7" style={{ animationDelay: `${idx * 0.04}s` }}>
                    <p className="text-xs font-semibold uppercase text-soft">Direction {idx + 1}</p>
                <h3 className="mt-3 text-2xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-soft">{item.description}</p>
                {item.href ? (
                  <Link href={item.href} className="mt-5 inline-flex text-sm font-semibold text-accent hover:text-white">
                    {item.ctaLabel ?? 'Learn more'} {'->'}
                  </Link>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container-shell grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <span className="eyebrow">Editorial Roadmap</span>
            <h2 className="mt-4 text-3xl font-bold text-white md:text-5xl">Build search value with high-quality English explainers</h2>
            <p className="mt-4 text-sm leading-relaxed text-soft">
              RoboSkin.ai should publish focused answers, not low-quality filler. Each topic should answer one buyer, researcher, or strategic reader question.
            </p>
            <div className="mt-6 rounded-2xl border border-white/8 bg-[#0d1016] p-5">
              <p className="text-xs font-semibold uppercase text-soft">{manifesto.title}</p>
              <p className="mt-3 text-lg leading-relaxed text-white">{manifesto.summary}</p>
              <Link href="/contact?requestType=brief&requestedAsset=Tactile%20AI%20Manifesto" className="mt-5 inline-flex text-sm font-semibold text-accent hover:text-white">
                Request manifesto draft {'->'}
              </Link>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {contentRoadmapTopics.map((topic) => (
              <Link key={topic} href="/research" className="rounded-2xl border border-white/8 bg-[#0b0d12] p-4 text-sm font-semibold text-white transition-colors hover:bg-white/5">
                {topic}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container-shell">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="eyebrow">Robot skin FAQ</span>
              <h2 className="mt-4 text-3xl font-bold text-white md:text-5xl">Short answers for readers and partners</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/faq" className="text-sm font-semibold text-[#62a8ff] hover:text-[#7dd3fc]">
                Read full FAQ {'->'}
              </Link>
              <Link href="/downloads" className="text-sm font-semibold text-white hover:text-[#d7e7ff]">
                Request materials {'->'}
              </Link>
            </div>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {homeRobotSkinFaq.map((item) => (
              <article key={item.question} className="glass-card p-7">
                <h3 className="text-xl font-semibold text-white">{item.question}</h3>
                <p className="mt-3 text-sm leading-relaxed text-soft">{item.answer}</p>
                <Link href={item.href} className="mt-5 inline-flex text-sm font-semibold text-[#62a8ff] hover:text-[#7dd3fc]">
                  {item.ctaLabel} {'->'}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20 pt-8">
        <div className="container-shell">
          <div className="rounded-[28px] border border-white/8 bg-[#0b0d12] p-8 text-center md:p-12">
            <span className="eyebrow border-white/10 bg-white/5 text-white">Brief, partnership, or strategic inquiry</span>
            <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-bold text-white md:text-5xl">
              Build the category around robot skin, tactile AI, and physical AI touch
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[#9aa3b2]">
              Request the RoboSkin.ai Brief, discuss sponsorship or partnership, or open a strategic domain acquisition conversation.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/contact?requestType=brief&requestedAsset=RoboSkin.ai%20Brief"
                className="rounded-xl bg-[#62a8ff] px-8 py-3 text-sm font-bold text-white shadow-[0_12px_26px_rgba(98,168,255,0.22)] transition-transform hover:scale-[1.02]"
              >
                Request the RoboSkin.ai Brief
              </Link>
              <Link
                href="/contact?requestType=acquisition"
                className="rounded-xl border border-white/12 bg-white/5 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/8"
              >
                Strategic Acquisition Inquiry
              </Link>
            </div>
            <p className="mt-4 text-sm text-[#9aa3b2]">
              Direct inquiries:{' '}
              <a className="text-[#62a8ff] underline decoration-white/30 underline-offset-4" href={`mailto:${site.contact.primaryEmail}`}>
                {site.contact.primaryEmail}
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
