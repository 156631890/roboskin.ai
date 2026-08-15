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
  homeBroadResearchLanes,
  homePhysicalAiSignals,
  homeResearchWatch,
  homeStats,
  manifesto,
  marketSignals,
  researchResourceIndex,
  site,
  tactileAiStack,
} from '@/content/site';
import { getBlogSummaries } from '@/lib/blog-data';
import { getNewsSummaries } from '@/lib/news-data';
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildGraphJsonLd,
  buildHomePhysicalAiRoutesJsonLd,
  buildPageJsonLd,
  buildPageMetadata,
  buildPhysicalAiDefinedTermJsonLd,
} from '@/lib/seo';

const homeRobotSkinFaq = directAnswerBlocks.slice(0, 3).map((item) => ({
  question: item.question,
  answer: item.answer,
  href: item.href,
  ctaLabel: item.ctaLabel,
}));

const latestResearchSignals = [
  ...getBlogSummaries().map((post) => ({
    ...post,
    href: `/research/${post.id}`,
    label: 'Research brief',
  })),
  ...getNewsSummaries().map((post) => ({
    ...post,
    href: `/news/${post.id}`,
    label: 'Robotics news',
  })),
]
  .sort((left, right) => right.date.localeCompare(left.date))
  .slice(0, 3);

export const metadata: Metadata = buildPageMetadata('/');

export default function Home() {
  return (
    <>
      <JsonLd
        data={buildGraphJsonLd([
          buildPageJsonLd('/'),
          buildBreadcrumbJsonLd('/'),
          buildFaqJsonLd(homeRobotSkinFaq, '/'),
          buildPhysicalAiDefinedTermJsonLd(),
          buildHomePhysicalAiRoutesJsonLd(),
        ])}
      />

      <section className="relative overflow-hidden pb-10 pt-5 md:pb-12 md:pt-6">
        <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(0,229,255,0.65),transparent)]" />
        <div className="container-shell">
          <div className="grid gap-7 md:min-h-[calc(100svh-82px)] md:items-center lg:grid-cols-[0.74fr_1.26fr]">
            <div className="hero-copy relative z-10 min-w-0">
              <p className="quiet-label">Source-backed robotics research map</p>
              <h1 aria-label="Robot skin and tactile AI for Physical AI and humanoid robots" className="mt-5 text-4xl font-bold leading-[0.98] text-white text-balance md:text-6xl md:leading-[0.94] xl:text-[4rem]">
                <span className="block">Robot skin</span>{' '}
                <span className="block">and tactile AI</span>{' '}
                <span className="block">
                  for Physical AI{' '}
                  <span className="block sm:inline">and humanoid robots</span>
                </span>
              </h1>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-[#c8d1de]">
                RoboSkin.ai tracks source-backed robotics research across robot skin, tactile sensors, robot hands,
                humanoid robots, dexterous manipulation, embodied AI, Physical AI, and visuo-tactile world models.
              </p>

              <div className="hero-answer mt-7 max-w-xl">
                <p className="text-sm font-semibold text-white">What is robot skin?</p>
                <p className="mt-2 text-base leading-relaxed text-[#9da8b8]">
                  In practical robotics, robot skin helps robots detect contact, pressure, shear, slip, and interaction events across
                  hands, grippers, arms, or curved body surfaces. For Physical AI, it is the contact layer that vision alone cannot
                  provide.
                </p>
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link href="/research-index" className="btn-primary w-full sm:w-auto">
                  Compare research evidence
                </Link>
                <Link href="/research" className="btn-secondary w-full sm:w-auto">
                  Browse research briefs
                </Link>
                <Link href="/glossary" className="btn-secondary w-full sm:w-auto">
                  Open the glossary
                </Link>
                <Link href="/contact?requestType=research" className="btn-tertiary w-full sm:w-auto">
                  Submit source
                </Link>
              </div>
            </div>

            <dl className="order-2 grid grid-cols-2 gap-px overflow-hidden lg:order-3 lg:col-span-2 lg:grid-cols-4">
              {homeStats.map((item) => (
                <div key={item.label} className="bg-[#050910]/88 p-4 md:p-5">
                  <dt className="font-mono text-sm font-semibold text-[#edf7ff]">{item.value}</dt>
                  <dd className="mt-1 text-xs leading-relaxed text-[#97a4b5] md:text-sm">{item.label}</dd>
                </div>
              ))}
            </dl>

            <div className="order-3 relative min-w-0 lg:order-2">
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

          <div className="deferred-section mt-10">
            <TactileStackMap layers={tactileAiStack} heroVisual={authorityHeroVisual} />
          </div>
        </div>
      </section>

      <section className="deferred-section py-14 md:py-20" aria-labelledby="robotics-research-pulse-heading">
        <div className="container-shell">
          <div className="grid gap-8 xl:grid-cols-[0.8fr_1.2fr] xl:items-start">
            <div className="max-w-3xl">
              <span className="eyebrow">Robotics research pulse</span>
              <h2 id="robotics-research-pulse-heading" className="mt-5 text-3xl font-bold text-white md:text-5xl">
                Track humanoid robots, Physical AI, embodied AI, and robot manipulation
              </h2>
              <p className="section-copy mt-4">
                Broad robotics terms only earn useful authority when they connect to a clear evidence lane. RoboSkin.ai
                maps each large topic back to tactile sensing, robot hands, contact-rich tasks, data, models, and measurable
                limitations.
              </p>
              <p className="mt-4 font-mono text-xs uppercase tracking-[0.14em] text-[#8e98a8]">
                Research watch reviewed {homeResearchWatch.reviewedAt}
              </p>
            </div>

            <article className="signal-panel p-6 md:p-8">
              <div className="flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-[0.14em] text-[#00e5ff]">
                <span>{homeResearchWatch.eyebrow}</span>
                <span className="text-[#697586]">Source date {homeResearchWatch.sourceDate}</span>
              </div>
              <h3 className="mt-4 text-2xl font-semibold text-white">{homeResearchWatch.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-[#c8d1de]">{homeResearchWatch.summary}</p>
              <p className="mt-3 text-sm leading-relaxed text-[#8e98a8]">{homeResearchWatch.relevance}</p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={homeResearchWatch.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-semibold text-[#00e5ff] hover:text-white"
                >
                  {homeResearchWatch.sourceLabel} {'->'}
                </a>
                <Link href="/physics-ai" className="text-sm font-semibold text-[#c8d1de] hover:text-white">
                  Open the Physical AI definition {'->'}
                </Link>
              </div>
            </article>
          </div>

          <div className="mt-8 grid gap-px overflow-hidden md:grid-cols-2 xl:grid-cols-4">
            {homeBroadResearchLanes.map((lane) => (
              <article key={lane.title} className="bg-[#050910]/88 p-5 md:p-6">
                <h3 className="text-lg font-semibold text-white">{lane.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#8e98a8]">{lane.description}</p>
                {lane.href && lane.ctaLabel ? (
                  <Link href={lane.href} className="mt-4 inline-flex text-sm font-semibold text-[#00e5ff] hover:text-white">
                    {lane.ctaLabel} {'->'}
                  </Link>
                ) : null}
              </article>
            ))}
          </div>

          <div className="mt-10">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="quiet-label">Latest source-backed updates</p>
                <h3 className="mt-3 text-2xl font-semibold text-white md:text-3xl">Newest robotics research briefs</h3>
              </div>
              <Link href="/research" className="text-sm font-semibold text-[#00e5ff] hover:text-white">
                Browse all research {'->'}
              </Link>
            </div>
            <div className="grid gap-4 lg:grid-cols-3">
              {latestResearchSignals.map((signal) => (
                <article key={signal.href} className="signal-panel flex h-full flex-col p-5 md:p-6">
                  <div className="flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-[0.12em] text-[#8e98a8]">
                    <span className="text-[#00e5ff]">{signal.label}</span>
                    <time dateTime={signal.date}>{signal.date}</time>
                  </div>
                  <h4 className="mt-4 text-xl font-semibold leading-snug text-white">{signal.title}</h4>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-[#8e98a8]">{signal.excerpt}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {signal.technicalFocus.slice(0, 3).map((topic) => (
                      <span key={topic} className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-[#9da8b8]">
                        {topic}
                      </span>
                    ))}
                  </div>
                  <Link href={signal.href} className="mt-5 inline-flex text-sm font-semibold text-[#00e5ff] hover:text-white">
                    Read update {'->'}
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="deferred-section py-14 md:py-20">
        <div className="container-shell">
          <div className="mb-8 max-w-4xl">
            <h2 className="text-3xl font-bold text-white md:text-5xl">Find the right robot skin research route</h2>
            <p className="section-copy mt-4">
              Use this research map to move from definitions to papers, technology evaluation, references, library pages, and source-submission paths.
            </p>
          </div>

          <div className="mb-8 flex flex-wrap gap-x-5 gap-y-2 border-y border-white/10 py-3 text-sm">
            <Link href="/faq" className="font-semibold text-[#c8d1de] hover:text-white">
              Robot skin FAQ
            </Link>
            <Link href="/resources" className="font-semibold text-[#c8d1de] hover:text-white">
              View RoboSkin library
            </Link>
            <Link href="/research-index" className="font-semibold text-[#c8d1de] hover:text-white">
              Compare the research index
            </Link>
            <Link href="/technology" className="font-semibold text-[#c8d1de] hover:text-white">
              Explore tactile AI technology
            </Link>
            <Link href="/applications" className="btn-secondary">
              Explore humanoid robot skin use cases
            </Link>
            <Link href="/guides/tactile-sensor-benchmark-robot-manipulation" className="btn-secondary">
              Compare tactile sensors
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

      <section className="deferred-section py-14 md:py-20" aria-labelledby="home-physical-ai-heading">
        <div className="container-shell grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div>
            <span className="eyebrow">Physical AI answer route</span>
            <h2 id="home-physical-ai-heading" className="mt-5 text-3xl font-bold text-white md:text-5xl">
              Physical AI needs robot skin, tactile AI, and contact feedback
            </h2>
            <p className="section-copy mt-4">
              In the RoboSkin context, Physical AI means physical-world AI systems that need robot skin, tactile AI,
              contact feedback, pressure, slip, and tactile sensing. The homepage is the broad research map; the
              Physical AI page is the canonical definition route.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href="/physics-ai" className="btn-primary w-full sm:w-auto">
                Read Physical AI
              </Link>
              <Link href="/guides/tactile-feedback-for-physical-ai" className="btn-secondary w-full sm:w-auto">
                Map tactile feedback
              </Link>
              <Link href="/guides/physical-ai-touch-data" className="btn-secondary w-full sm:w-auto">
                Trace touch data
              </Link>
            </div>
          </div>

          <div className="signal-panel divide-y divide-white/8 overflow-hidden">
            {homePhysicalAiSignals.map((signal) => (
              <article key={signal.title} className="grid gap-3 p-5 md:grid-cols-[0.34fr_1fr] md:p-6">
                <div>
                  <h3 className="text-lg font-semibold text-white">{signal.title}</h3>
                  {signal.href && signal.ctaLabel ? (
                    <Link href={signal.href} className="mt-3 inline-flex text-sm font-semibold text-[#00e5ff] hover:text-white">
                      {signal.ctaLabel} {'->'}
                    </Link>
                  ) : null}
                </div>
                <p className="text-sm leading-relaxed text-[#8e98a8]">{signal.description}</p>
              </article>
            ))}
          </div>
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
              View library {'->'}
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
                  Build the category around robot skin, tactile AI, and Physical AI touch
                </h2>
                <p className="mt-4 max-w-2xl text-[#c8d1de]">
                  Start with the public research notes, suggest a source, or send a correction when a claim needs better support.
                </p>
                <Link href="/contact?requestType=research" className="mt-5 inline-flex text-sm font-semibold text-[#00e5ff] hover:text-white">
                  Submit research context {'->'}
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
