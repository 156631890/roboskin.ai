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
              <p className="mt-7 max-w-2xl text-lg leading-relaxed text-[#c8d1de]">
                RoboSkin.ai maps robot skin, tactile AI, e-skin, tactile sensors, and humanoid robot skin for researchers, operators,
                builders, and readers tracking physical AI touch.
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
              </div>
            </div>

            <div className="reveal relative min-w-0 [animation-delay:0.1s]">
              <figure className="hero-visual-frame">
                <Image
                  src={homeBrandAssets.hero.image}
                  alt={homeBrandAssets.hero.imageAlt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 58vw, 100vw"
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

          <dl className="signal-panel mt-8 grid gap-px overflow-hidden p-0 sm:grid-cols-2 lg:grid-cols-4">
            {homeStats.map((item, idx) => (
              <div key={item.label} className="reveal bg-[#03060a]/72 p-5" style={{ animationDelay: `${idx * 0.05}s` }}>
                <dt className="font-mono text-sm font-semibold text-[#edf7ff]">{item.value}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-[#8e98a8]">{item.label}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-10">
            <TactileStackMap layers={tactileAiStack} heroVisual={authorityHeroVisual} />
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container-shell">
          <div className="mb-8 grid gap-5 lg:grid-cols-[0.78fr_0.62fr] lg:items-end">
            <div>
              <span className="eyebrow">Authority index</span>
              <h2 className="mt-4 text-3xl font-bold text-white md:text-5xl">Find the right robot skin route</h2>
            </div>
            <p className="max-w-xl text-sm leading-relaxed text-[#8e98a8]">
              Use this authority index to move from definitions to research, technology evaluation, references, resources, and inquiry paths.
            </p>
          </div>

          <div className="mb-8 flex flex-wrap gap-3">
            <Link href="/faq" className="btn-secondary">
              Robot skin FAQ
            </Link>
            <Link href="/resources" className="btn-secondary">
              View RoboSkin resources
            </Link>
            <Link href="/technology" className="btn-secondary">
              Explore tactile AI technology
            </Link>
            <Link href="/downloads" className="btn-secondary">
              View public references
            </Link>
          </div>

          <AuthorityIndex groups={authorityLinkGroups} />
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container-shell">
          <div className="mb-8 max-w-4xl">
            <span className="eyebrow">Robot skin direct answers</span>
            <h2 className="mt-4 text-3xl font-bold text-white md:text-5xl">
              Short answers to common robot skin and tactile AI questions
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#8e98a8]">
              Direct-answer coverage includes What is robot skin?, What is e-skin?, and How is tactile sensing different from vision or
              force-torque sensing?
            </p>
          </div>

          <DirectAnswerSection answers={directAnswerBlocks} />
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container-shell grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="lg:pt-4">
            <span className="eyebrow">Research and resource index</span>
            <h2 className="mt-4 text-3xl font-bold text-white md:text-5xl">Track the tactile AI stack with source-like entries</h2>
            <p className="mt-4 text-sm leading-relaxed text-[#8e98a8]">
              Research notes and resource entries organize the robot skin category around tactile sensors, e-skin architectures, stack
              maps, reader questions, and public reference paths.
            </p>

            <div className="signal-panel mt-6 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#00e5ff]">{manifesto.title}</p>
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

      <section className="py-14 md:py-20">
        <div className="container-shell">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-3xl">
              <span className="eyebrow">Public guide assets</span>
              <h2 className="mt-4 text-3xl font-bold text-white md:text-5xl">
                Guides, maps, and references for the robot skin category
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[#8e98a8]">
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

      <section className="py-14 md:py-20">
        <div className="container-shell">
          <div className="mb-8 max-w-3xl">
            <span className="eyebrow">Market signals</span>
            <h2 className="mt-4 text-3xl font-bold text-white md:text-5xl">Why humanoid robot skin is becoming a category</h2>
            <p className="mt-4 text-sm leading-relaxed text-[#8e98a8]">
              The public site stays conservative while tracking signals that make robot skin, tactile AI, and distributed touch relevant
              to humanoid robotics.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {marketSignals.map((signal, idx) => (
              <article key={signal.title} className="signal-panel reveal p-7" style={{ animationDelay: `${idx * 0.05}s` }}>
                <h3 className="text-xl font-semibold text-white">{signal.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#8e98a8]">{signal.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20 pt-8">
        <div className="container-shell">
          <div className="signal-panel p-8 text-center md:p-12">
            <span className="eyebrow border-white/10 bg-white/5 text-white">Research, glossary, or correction path</span>
            <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-bold text-white md:text-5xl">
              Build the category around robot skin, tactile AI, and physical AI touch
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[#c8d1de]">
              Start with the public research notes, suggest a source, or send a correction when a claim needs better support.
            </p>
            <Link href="/contact?requestType=research" className="mt-5 inline-flex text-sm font-semibold text-[#00e5ff] hover:text-white">
              Contribute research context {'->'}
            </Link>
            <div className="mt-8 text-left">
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
