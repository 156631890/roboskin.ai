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
  homeKnowledgeMap,
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

      <section className="brand-hero">
        <div className="container-shell">
          <div className="hero-topline">
            <span>Source-backed robotics research map</span>
            <span>Humanoid robot skin / tactile AI / Physical AI</span>
          </div>

          <div className="hero-stage">
            <Image
              src={homeBrandAssets.hero.image}
              alt={homeBrandAssets.hero.imageAlt}
              fill
              priority
              sizes="(min-width: 1480px) 1480px, 100vw"
              className="hero-stage-image"
            />
            <div className="hero-stage-copy">
              <p className="hero-stage-label">Independent robotics intelligence</p>
              <h1 aria-label="Robot skin and tactile AI for Physical AI and humanoid robots">
                <span className="block">Robot skin <span className="hero-emphasis">and tactile AI</span></span>
                <span className="block">for Physical AI <span className="block sm:inline">and humanoid robots</span></span>
              </h1>
              <p className="hero-stage-summary">
                RoboSkin.ai tracks source-backed robotics research across robot skin, tactile sensors, robot hands,
                humanoid robots, dexterous manipulation, embodied AI, Physical AI, and visuo-tactile world models.
              </p>
              <div className="hero-stage-actions">
                <Link href="/research-index" className="btn-primary">Compare research evidence</Link>
                <Link href="/research" className="hero-text-link">Browse research briefs</Link>
                <Link href="/glossary" className="hero-text-link">Open the glossary</Link>
                <Link href="/contact?requestType=research" className="hero-text-link">Submit source</Link>
              </div>
            </div>
            <p className="hero-stage-caption">
              <strong>Tactile AI stack map</strong>
              <span>Surface / signal / inference / action — original RoboSkin.ai visual study</span>
            </p>
          </div>

          <div className="hero-data-band">
            <article className="hero-answer">
              <h2>What is robot skin?</h2>
              <p>
                In practical robotics, robot skin helps robots detect contact, pressure, shear, slip, and interaction
                events across hands, grippers, arms, or curved body surfaces. For Physical AI, it is the contact layer
                that vision alone cannot provide.
              </p>
            </article>
            {homeStats.map((item) => (
              <dl key={item.label} className="hero-stat">
                <dt>{item.value}</dt>
                <dd>{item.label}</dd>
              </dl>
            ))}
          </div>
        </div>
      </section>

      <section className="deferred-section border-y border-white/10 py-14 md:py-20" aria-labelledby="core-knowledge-map-heading">
        <div className="container-shell">
          <div className="mb-9 grid gap-6 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <p className="brand-section-number">Field map / Core authority</p>
              <h2 id="core-knowledge-map-heading" className="brand-section-title mt-5">Robot Skin → Tactile AI → Physical AI</h2>
            </div>
            <p className="section-copy lg:pt-10">
              RoboSkin.ai maps the technologies, research, datasets, sensors, robot platforms, and AI models that power touch intelligence in robots. Start with a pillar, then follow its papers, datasets, benchmarks, and related entities.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {homeKnowledgeMap.map((item, index) => (
              <article key={item.title} className="glass-card p-6">
                <span className="font-mono text-xs font-semibold text-[#ff6b3d]">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="mt-4 text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#c8d1de]">{item.description}</p>
                {item.href && item.ctaLabel ? <Link href={item.href} className="mt-5 inline-flex text-sm font-semibold text-[#ffd5c5] hover:text-white">{item.ctaLabel} →</Link> : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="editorial-light" aria-labelledby="robotics-research-pulse-heading">
        <div className="deferred-section py-14 md:py-20">
          <div className="container-shell">
            <div className="brand-section-rule">
              <div>
                <p className="brand-section-number">01 / Robotics research pulse</p>
                <h2 id="robotics-research-pulse-heading" className="brand-section-title mt-5">
                  Track humanoid robots, Physical AI, embodied AI, and robot manipulation
                </h2>
                <p className="section-copy mt-6">
                  Broad robotics terms only earn useful authority when they connect to a clear evidence lane. RoboSkin.ai
                  maps each large topic back to tactile sensing, robot hands, contact-rich tasks, data, models, and measurable
                  limitations.
                </p>
                <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.1em] text-[#777168]">
                  Research watch reviewed {homeResearchWatch.reviewedAt}
                </p>
              </div>

              <article className="research-watch">
                <div className="research-watch-meta">
                  <span>{homeResearchWatch.eyebrow}</span>
                  <span>Source date {homeResearchWatch.sourceDate}</span>
                </div>
                <h3>{homeResearchWatch.title}</h3>
                <p>{homeResearchWatch.summary}</p>
                <p>{homeResearchWatch.relevance}</p>
                <div className="research-watch-links">
                  <a href={homeResearchWatch.sourceUrl} target="_blank" rel="noreferrer">
                    {homeResearchWatch.sourceLabel} ↗
                  </a>
                  <Link href="/physics-ai">Open the Physical AI definition →</Link>
                </div>
              </article>
            </div>

            <div className="research-lanes">
              {homeBroadResearchLanes.map((lane, index) => (
                <article key={lane.title} className="research-lane">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <h3>{lane.title}</h3>
                    <p>{lane.description}</p>
                    {lane.href && lane.ctaLabel ? <Link href={lane.href}>{lane.ctaLabel} →</Link> : null}
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-14 md:mt-20">
              <div className="mb-7 flex flex-wrap items-end justify-between gap-5">
                <div>
                  <p className="quiet-label">Latest source-backed updates</p>
                  <h3 className="mt-3 text-3xl font-semibold md:text-5xl">Newest robotics research briefs</h3>
                </div>
                <Link href="/research" className="editorial-link">Browse all research →</Link>
              </div>
              <div className="latest-research-grid">
                {latestResearchSignals.map((signal) => (
                  <article key={signal.href} className="research-brief-card">
                    <div className="research-brief-meta">
                      <span>{signal.label}</span>
                      <time dateTime={signal.date}>{signal.date}</time>
                    </div>
                    <h4>{signal.title}</h4>
                    <p>{signal.excerpt}</p>
                    <div className="topic-chips">
                      {signal.technicalFocus.slice(0, 3).map((topic) => <span key={topic}>{topic}</span>)}
                    </div>
                    <Link href={signal.href}>Read update →</Link>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="deferred-section py-14 md:py-20">
        <div className="container-shell">
          <div className="brand-section-rule border-white/20">
            <div>
              <p className="brand-section-number">02 / Signal to action</p>
              <h2 className="brand-section-title mt-5">Track the tactile AI stack with source-like entries</h2>
              <p className="section-copy mt-6">
                Research notes and resource entries organize the robot skin category around tactile sensors, e-skin
                architectures, stack maps, reader questions, and public reference paths.
              </p>
              <div className="mt-7 border-l border-[#ff6b3d] pl-5">
                <p className="quiet-label">{manifesto.title}</p>
                <p className="mt-3 max-w-lg text-lg leading-relaxed text-[#f3efe5]">{manifesto.summary}</p>
                <Link href="/applications" className="mt-5 inline-flex text-sm font-semibold text-[#ff6b3d] hover:text-white">
                  Read the application context →
                </Link>
              </div>
            </div>

            <div>
              <div className="deferred-section mt-10">
                <TactileStackMap layers={tactileAiStack} heroVisual={authorityHeroVisual} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="editorial-light">
        <div className="deferred-section py-14 md:py-20">
          <div className="container-shell">
            <div className="mb-10 grid gap-6 lg:grid-cols-[0.72fr_1.28fr]">
              <div>
                <p className="brand-section-number">03 / Research atlas</p>
                <h2 className="brand-section-title mt-5">Find the right robot skin research route</h2>
              </div>
              <div className="lg:pt-10">
                <p className="section-copy">
                  Use this research map to move from definitions to papers, technology evaluation, references, library
                  pages, and source-submission paths.
                </p>
                <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
                  <Link href="/faq" className="editorial-link">Robot skin FAQ</Link>
                  <Link href="/resources" className="editorial-link">View RoboSkin library</Link>
                  <Link href="/research-index" className="editorial-link">Compare the research index</Link>
                  <Link href="/technology" className="editorial-link">Explore tactile AI technology</Link>
                  <Link href="/applications" className="editorial-link">Explore humanoid robot skin use cases</Link>
                  <Link href="/guides/tactile-sensor-benchmark-robot-manipulation" className="editorial-link">
                    Compare tactile sensors
                  </Link>
                </div>
              </div>
            </div>

            <AuthorityIndex groups={authorityLinkGroups} />

            <div className="mt-16 grid gap-8 border-t border-[#171714]/25 pt-8 lg:grid-cols-[0.78fr_1.22fr]">
              <div>
                <span className="eyebrow">Physical AI answer route</span>
                <h2 className="mt-5 text-3xl font-semibold md:text-5xl">
                  Physical AI needs robot skin, tactile AI, and contact feedback
                </h2>
                <p className="section-copy mt-5">
                  In the RoboSkin context, Physical AI means physical-world AI systems that need robot skin, tactile AI,
                  contact feedback, pressure, slip, and tactile sensing. The homepage is the broad research map; the
                  Physical AI page is the canonical definition route.
                </p>
                <div className="mt-6 flex flex-wrap gap-4">
                  <Link href="/physics-ai" className="editorial-link">Read Physical AI →</Link>
                  <Link href="/guides/tactile-feedback-for-physical-ai" className="editorial-link">Map tactile feedback →</Link>
                  <Link href="/physical-ai-touch" className="editorial-link">Trace touch data →</Link>
                </div>
              </div>
              <div className="border-t border-[#171714]/25">
                {homePhysicalAiSignals.map((signal, index) => (
                  <article key={signal.title} className="grid gap-3 border-b border-[#171714]/25 py-5 md:grid-cols-[44px_0.48fr_1fr]">
                    <span className="font-mono text-xs text-[#777168]">{String(index + 1).padStart(2, '0')}</span>
                    <div>
                      <h3 className="text-lg font-semibold">{signal.title}</h3>
                      {signal.href && signal.ctaLabel ? (
                        <Link href={signal.href} className="mt-3 inline-flex text-sm font-semibold text-[#bd4324]">
                          {signal.ctaLabel} →
                        </Link>
                      ) : null}
                    </div>
                    <p className="text-sm leading-relaxed text-[#625e57]">{signal.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="deferred-section py-14 md:py-20">
        <div className="container-shell">
          <div className="mb-10 grid gap-6 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <p className="brand-section-number">04 / Direct answers</p>
              <h2 className="brand-section-title mt-5">Short answers to common robot skin and tactile AI questions</h2>
            </div>
            <p className="section-copy lg:pt-10">
              Direct-answer coverage supports readers and answer engines without turning source boundaries into product claims.
            </p>
          </div>
          <DirectAnswerSection answers={directAnswerBlocks} />
        </div>
      </section>

      <section className="deferred-section py-14 md:py-20 border-y border-white/10">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="brand-section-number">05 / Source library</p>
            <h2 className="mt-5 text-3xl font-semibold md:text-5xl">Research signals, organized for comparison</h2>
            <p className="section-copy mt-5">
              Every brief keeps its technical focus, date, source path, and limitation visible so readers can compare evidence
              without treating a single paper as market proof.
            </p>
          </div>
          <ResearchBriefIndex entries={researchResourceIndex} />
        </div>
      </section>

      <section className="editorial-light">
        <div className="deferred-section py-14 md:py-20">
          <div className="container-shell">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="brand-section-number">06 / Field guides</p>
                <h2 className="mt-5 max-w-4xl text-3xl font-semibold md:text-5xl">
                  Guides, maps, and references for the robot skin category
                </h2>
                <p className="section-copy mt-5">
                  Use these public resources to navigate category research, stack maps, references, and source-backed learning paths.
                </p>
              </div>
              <Link href="/resources" className="editorial-link">View library →</Link>
            </div>
            <FeaturedAssetCovers assets={featuredIndustryAssets} compact />
          </div>
        </div>
      </section>

      <section className="deferred-section py-14 md:py-20">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="brand-section-number">07 / Category signals</p>
            <h2 className="mt-5 text-3xl font-semibold md:text-5xl">Why humanoid robot skin is becoming a category</h2>
            <p className="section-copy mt-5">
              The public site stays conservative while tracking signals that make robot skin, tactile AI, and distributed touch
              relevant to humanoid robotics.
            </p>
          </div>
          <div className="border-t border-white/15">
            {marketSignals.map((signal, index) => (
              <article key={signal.title} className="grid gap-4 border-b border-white/15 py-6 md:grid-cols-[44px_0.45fr_1fr]">
                <span className="font-mono text-xs text-[#7e7a72]">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="text-lg font-semibold">{signal.title}</h3>
                <p className="text-sm leading-relaxed text-[#b9b3a7]">{signal.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="deferred-section pb-20 pt-8">
        <div className="container-shell">
          <div className="border-y border-white/15 py-10 md:py-16">
            <div className="grid gap-10 xl:grid-cols-[0.72fr_1.28fr] xl:items-start">
              <div>
                <span className="eyebrow">Research, glossary, or correction path</span>
                <h2 className="mt-5 max-w-3xl text-3xl font-semibold md:text-5xl">
                  Build the category around robot skin, tactile AI, and Physical AI touch
                </h2>
                <p className="mt-5 max-w-2xl text-[#b9b3a7]">
                  Start with the public research notes, suggest a source, or send a correction when a claim needs better support.
                </p>
                <Link href="/contact?requestType=research" className="mt-6 inline-flex text-sm font-semibold text-[#ff6b3d] hover:text-white">
                  Submit research context →
                </Link>
              </div>
              <ConversionPathPanel />
            </div>
            <p className="mt-8 text-sm text-[#7e7a72]">
              Direct inquiries:{' '}
              <a className="text-[#ff6b3d] underline decoration-white/30 underline-offset-4" href={`mailto:${site.contact.primaryEmail}`}>
                {site.contact.primaryEmail}
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
