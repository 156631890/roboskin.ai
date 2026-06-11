import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import {
  AuthorityIndex,
  ConversionPathPanel,
  DirectAnswerSection,
  FeaturedAssetCovers,
  ResearchBriefIndex,
  TactileStackMap,
} from '@/components/IndustryVisuals';
import {
  authorityHeroVisual,
  authorityLinkGroups,
  directAnswerBlocks,
  featuredIndustryAssets,
  homeBrandAssets,
  homeStats,
  manifesto,
  marketSignals,
  researchResourceIndex,
  site,
  tactileAiStack,
} from '@/content/site';
import { buildBreadcrumbJsonLd, buildFaqJsonLd, buildGraphJsonLd, buildPageJsonLd, buildPageMetadata } from '@/lib/seo';

const homeRobotSkinFaq = directAnswerBlocks.slice(0, 3).map((item) => ({
  question: item.question,
  answer: item.answer,
  href: item.href,
  ctaLabel: item.ctaLabel,
}));

export const metadata: Metadata = buildPageMetadata('/');

export default function Home() {
  return (
    <>
      <JsonLd data={buildGraphJsonLd([buildPageJsonLd('/'), buildBreadcrumbJsonLd('/'), buildFaqJsonLd(homeRobotSkinFaq, '/')])} />

      <section className="relative overflow-hidden pb-10 pt-5 md:pb-12 md:pt-6">
        <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(0,229,255,0.65),transparent)]" />
        <div className="container-shell">
          <div className="grid min-h-[calc(100dvh-82px)] items-center gap-7 lg:grid-cols-[0.74fr_1.26fr]">
            <div className="hero-copy reveal relative z-10 min-w-0">
              <p className="quiet-label">Robot touch needs a surface intelligence layer</p>
              <h1 aria-label="Robot skin and tactile AI authority portal" className="mt-5 text-4xl font-bold leading-[0.98] text-white text-balance md:text-6xl md:leading-[0.94] xl:text-[4rem]">
                <span className="block">Robot skin</span>
                <span className="block">and tactile AI</span>
                <span className="block">authority portal</span>
              </h1>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-[#c8d1de]">
                RoboSkin.ai maps robot skin, tactile AI, e-skin, tactile sensors, and humanoid robot skin for people tracking
                contact-aware robotics.
              </p>

              <div className="hero-answer mt-7 max-w-xl">
                <p className="text-sm font-semibold text-white">What is robot skin?</p>
                <p className="mt-2 text-base leading-relaxed text-[#9da8b8]">
                  In practical robotics, robot skin helps robots detect contact, pressure, shear, slip, and interaction events across
                  hands, grippers, arms, or curved body surfaces.
                </p>
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link href="/research" className="btn-primary w-full sm:w-auto">
                  Browse robot skin research
                </Link>
                <Link href="/glossary" className="btn-secondary w-full sm:w-auto">
                  Open the robot skin glossary
                </Link>
                <Link href="/contact?requestType=research" className="btn-tertiary w-full sm:w-auto">
                  Submit a source
                </Link>
              </div>
            </div>

            <dl className="reveal order-2 grid grid-cols-2 gap-px overflow-hidden lg:order-3 lg:col-span-2 lg:grid-cols-4">
              {homeStats.map((item) => (
                <div key={item.label} className="bg-[#050910]/88 p-4 md:p-5">
                  <dt className="font-mono text-sm font-semibold text-[#edf7ff]">{item.value}</dt>
                  <dd className="mt-1 text-xs leading-relaxed text-[#97a4b5] md:text-sm">{item.label}</dd>
                </div>
              ))}
            </dl>

            <div className="reveal order-3 relative min-w-0 [animation-delay:0.1s] lg:order-2">
              <figure className="hero-visual-frame">
                <Image
                  src={homeBrandAssets.hero.image}
                  alt={homeBrandAssets.hero.imageAlt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 64vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,4,8,0.08),rgba(2,4,8,0.04)_46%,rgba(2,4,8,0.46))]" />
                <figcaption className="absolute bottom-4 left-4 right-4 grid gap-3 rounded-md border border-white/8 bg-[#03060a]/70 p-4 backdrop-blur-md md:grid-cols-[1fr_auto] md:items-end">
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-[#00e5ff]">Tactile AI stack map</span>
                    <span className="mt-2 block max-w-md text-sm leading-relaxed text-[#dbeafe]">
                      Humanoid robot skin contact surface, signal stream, edge AI, robot control, safety response, and feedback data.
                    </span>
                  </span>
                  <span className="font-mono text-xs text-[#8e98a8]">surface / signal / action</span>
                </figcaption>
              </figure>
            </div>
          </div>

          <div className="mt-10">
            <TactileStackMap layers={tactileAiStack} heroVisual={authorityHeroVisual} />
          </div>
        </div>
      </section>

      <section className="deferred-section py-14 md:py-20">
        <div className="container-shell">
          <div className="mb-8 max-w-4xl">
            <h2 className="text-3xl font-bold text-white md:text-5xl">Find the right robot skin route</h2>
            <p className="section-copy mt-4">
              Use this authority index to move from definitions to research, technology evaluation, references, resources, and inquiry paths.
            </p>
          </div>

          <div className="mb-8 flex flex-wrap gap-x-5 gap-y-2 border-y border-white/10 py-3 text-sm">
            <Link href="/faq" className="font-semibold text-[#c8d1de] hover:text-white">
              Robot skin FAQ
            </Link>
            <Link href="/resources" className="font-semibold text-[#c8d1de] hover:text-white">
              View RoboSkin resources
            </Link>
            <Link href="/technology" className="font-semibold text-[#c8d1de] hover:text-white">
              Explore tactile AI technology
            </Link>
            <Link href="/applications" className="btn-secondary">
              Explore humanoid robot skin applications
            </Link>
            <Link href="/downloads" className="btn-secondary">
              View public references
            </Link>
          </div>

          <AuthorityIndex groups={authorityLinkGroups} />
        </div>
      </section>

      <section className="deferred-section py-14 md:py-20">
        <div className="container-shell">
          <div className="mb-8 max-w-4xl">
            <h2 className="text-3xl font-bold text-white md:text-5xl">
              Short answers to common robot skin and tactile AI questions
            </h2>
            <p className="section-copy mt-4">
              Direct-answer coverage supports readers and answer engines without turning source boundaries into product claims.
            </p>
          </div>

          <DirectAnswerSection answers={directAnswerBlocks} />
        </div>
      </section>

      <section className="deferred-section py-14 md:py-20">
        <div className="container-shell grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="lg:pt-4">
            <h2 className="text-3xl font-bold text-white md:text-5xl">Track the tactile AI stack with source-like entries</h2>
            <p className="section-copy mt-4">
              Research notes and resource entries organize the robot skin category around tactile sensors, e-skin architectures, stack
              maps, reader questions, and public reference paths.
            </p>

            <div className="signal-panel mt-6 p-5">
              <p className="quiet-label">{manifesto.title}</p>
              <p className="mt-3 text-lg leading-relaxed text-white">{manifesto.summary}</p>
              <Link
                href="/applications"
                className="mt-5 inline-flex text-sm font-semibold text-[#00e5ff] hover:text-white"
              >
                Read the application context {'->'}
              </Link>
            </div>
          </div>

          <ResearchBriefIndex entries={researchResourceIndex} />
        </div>
      </section>

      <section className="deferred-section py-14 md:py-20">
        <div className="container-shell">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold text-white md:text-5xl">
                Guides, maps, and references for the robot skin category
              </h2>
              <p className="section-copy mt-4">
                Use these public resources to navigate category research, stack maps, references, and source-backed learning paths.
              </p>
            </div>
            <Link href="/resources" className="text-sm font-semibold text-[#00e5ff] hover:text-white">
              View resources {'->'}
            </Link>
          </div>

          <FeaturedAssetCovers assets={featuredIndustryAssets} compact />
        </div>
      </section>

      <section className="deferred-section py-14 md:py-20">
        <div className="container-shell">
          <div className="mb-8 max-w-3xl">
            <h2 className="text-3xl font-bold text-white md:text-5xl">Why humanoid robot skin is becoming a category</h2>
            <p className="section-copy mt-4">
              The public site stays conservative while tracking signals that make robot skin, tactile AI, and distributed touch relevant
              to humanoid robotics.
            </p>
          </div>

          <div className="signal-panel divide-y divide-white/8 overflow-hidden">
            {marketSignals.map((signal) => (
              <article key={signal.title} className="grid gap-3 p-5 md:grid-cols-[0.34fr_1fr] md:p-6">
                <h3 className="text-lg font-semibold text-white">{signal.title}</h3>
                <p className="text-sm leading-relaxed text-[#8e98a8]">{signal.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="deferred-section pb-20 pt-8">
        <div className="container-shell">
          <div className="signal-panel p-8 md:p-12">
            <div className="grid gap-8 xl:grid-cols-[0.72fr_1.28fr] xl:items-start">
              <div>
                <span className="eyebrow">Research, glossary, or correction path</span>
                <h2 className="mt-5 max-w-3xl text-3xl font-bold text-white md:text-5xl">
                  Build the category around robot skin, tactile AI, and physical AI touch
                </h2>
                <p className="mt-4 max-w-2xl text-[#c8d1de]">
                  Start with the public research notes, suggest a source, or send a correction when a claim needs better support.
                </p>
                <Link href="/contact?requestType=research" className="mt-5 inline-flex text-sm font-semibold text-[#00e5ff] hover:text-white">
                  Contribute research context {'->'}
                </Link>
              </div>
              <ConversionPathPanel />
            </div>
            <p className="mt-6 text-sm text-[#8e98a8]">
              Direct inquiries:{' '}
              <a className="text-[#00e5ff] underline decoration-white/30 underline-offset-4" href={`mailto:${site.contact.primaryEmail}`}>
                {site.contact.primaryEmail}
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
