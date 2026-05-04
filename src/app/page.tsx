import type { Metadata } from 'next';
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
  authorityLinkGroups,
  directAnswerBlocks,
  featuredIndustryAssets,
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

      <section className="relative overflow-hidden pb-16 pt-16 md:pb-20 md:pt-20">
        <div className="container-shell grid items-start gap-10 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="reveal">
            <span className="eyebrow">Authority portal | Humanoid robot skin | Tactile AI stack map</span>
            <h1 className="mt-6 max-w-4xl text-5xl font-bold leading-[0.96] text-white md:text-7xl">
              Robot skin and tactile AI authority portal
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#d8dce4]">
              RoboSkin.ai maps robot skin, tactile AI, e-skin, tactile sensors, and humanoid robot skin for researchers, operators,
              builders, and strategic readers tracking physical AI touch.
            </p>

            <div className="mt-7 rounded-lg border border-white/10 bg-[#080b10] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.035)]">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#7dd3fc]">What is robot skin?</p>
              <p className="mt-3 text-base leading-relaxed text-[#d8dce4]">
                In practical robotics, robot skin helps robots detect contact, pressure, shear, slip, and interaction events across
                hands, grippers, arms, or curved body surfaces.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/research"
                className="rounded-lg bg-[#62a8ff] px-5 py-3 text-sm font-bold text-white shadow-[0_12px_26px_rgba(98,168,255,0.22)] transition-transform hover:scale-[1.02]"
              >
                Browse robot skin research
              </Link>
              <Link
                href="/glossary"
                className="rounded-lg border border-white/12 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/8"
              >
                Open the robot skin glossary
              </Link>
              <Link
                href="/contact?requestType=brief&requestedAsset=RoboSkin.ai%20Brief"
                className="rounded-lg border border-[#62a8ff]/35 bg-[#62a8ff]/10 px-5 py-3 text-sm font-semibold text-[#d7e7ff] transition-colors hover:bg-[#62a8ff]/14"
              >
                Request the RoboSkin.ai Brief
              </Link>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {homeStats.map((item, idx) => (
                <article key={item.label} className="glass-card reveal p-5" style={{ animationDelay: `${idx * 0.05}s` }}>
                  <p className="text-2xl font-bold text-white">{item.value}</p>
                  <p className="mt-1 text-sm leading-relaxed text-soft">{item.label}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="reveal [animation-delay:0.1s]">
            <TactileStackMap layers={tactileAiStack} />
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container-shell">
          <div className="mb-8 max-w-3xl">
            <span className="eyebrow">Authority index</span>
            <h2 className="mt-4 text-3xl font-bold text-white md:text-5xl">Find the right robot skin route</h2>
            <p className="mt-4 text-sm leading-relaxed text-soft">
              Use this authority index to move from definitions to research, technology evaluation, downloads, resources, and inquiry paths.
            </p>
          </div>

          <div className="mb-8 flex flex-wrap gap-3">
            <Link href="/faq" className="rounded-lg border border-white/10 bg-[#080b10] px-4 py-2 text-sm font-semibold text-white hover:bg-white/[0.055]">
              Robot skin FAQ
            </Link>
            <Link href="/resources" className="rounded-lg border border-white/10 bg-[#080b10] px-4 py-2 text-sm font-semibold text-white hover:bg-white/[0.055]">
              View RoboSkin resources
            </Link>
            <Link href="/technology" className="rounded-lg border border-white/10 bg-[#080b10] px-4 py-2 text-sm font-semibold text-white hover:bg-white/[0.055]">
              Explore tactile AI technology
            </Link>
            <Link href="/downloads" className="rounded-lg border border-white/10 bg-[#080b10] px-4 py-2 text-sm font-semibold text-white hover:bg-white/[0.055]">
              Request technical downloads
            </Link>
          </div>

          <AuthorityIndex groups={authorityLinkGroups} />
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container-shell">
          <div className="mb-8 max-w-3xl">
            <span className="eyebrow">Robot skin direct answers</span>
            <h2 className="mt-4 text-3xl font-bold text-white md:text-5xl">
              Short answers to common robot skin and tactile AI questions
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-soft">
              Direct-answer coverage includes What is robot skin?, What is e-skin?, and How is tactile sensing different from vision or
              force-torque sensing?
            </p>
          </div>

          <DirectAnswerSection answers={directAnswerBlocks} />
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container-shell grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
          <div>
            <span className="eyebrow">Research and resource index</span>
            <h2 className="mt-4 text-3xl font-bold text-white md:text-5xl">Track the tactile AI stack with source-like entries</h2>
            <p className="mt-4 text-sm leading-relaxed text-soft">
              Research briefs and resource entries organize the robot skin category around tactile sensors, e-skin architectures, stack
              maps, buyer questions, and public request paths.
            </p>

            <div className="mt-6 rounded-lg border border-white/10 bg-[#080b10] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.035)]">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#7dd3fc]">{manifesto.title}</p>
              <p className="mt-3 text-lg leading-relaxed text-white">{manifesto.summary}</p>
              <Link
                href="/contact?requestType=brief&requestedAsset=Tactile%20AI%20Manifesto"
                className="mt-5 inline-flex text-sm font-semibold text-accent hover:text-white"
              >
                Request the Tactile AI Manifesto {'->'}
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
              <span className="eyebrow">Industry assets</span>
              <h2 className="mt-4 text-3xl font-bold text-white md:text-5xl">
                Reports, maps, and directories for the robot skin category
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-soft">
                Use these industry assets to package category research, stack maps, directories, and strategic request paths.
              </p>
            </div>
            <Link href="/resources" className="text-sm font-semibold text-[#62a8ff] hover:text-[#7dd3fc]">
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
            <p className="mt-4 text-sm leading-relaxed text-soft">
              The public site stays conservative while tracking signals that make robot skin, tactile AI, and distributed touch relevant
              to humanoid robotics.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {marketSignals.map((signal, idx) => (
              <article key={signal.title} className="glass-card reveal p-7" style={{ animationDelay: `${idx * 0.05}s` }}>
                <h3 className="text-xl font-semibold text-white">{signal.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-soft">{signal.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20 pt-8">
        <div className="container-shell">
          <div className="rounded-lg border border-white/10 bg-[#080b10] p-8 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.035)] md:p-12">
            <span className="eyebrow border-white/10 bg-white/5 text-white">Brief, partnership, or strategic inquiry</span>
            <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-bold text-white md:text-5xl">
              Build the category around robot skin, tactile AI, and physical AI touch
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[#d8dce4]">
              Request the RoboSkin.ai Brief, discuss sponsorship or partnership, or open a strategic acquisition conversation.
            </p>
            <Link href="/contact?requestType=acquisition" className="mt-5 inline-flex text-sm font-semibold text-accent hover:text-white">
              Strategic acquisition conversation {'->'}
            </Link>
            <div className="mt-8 text-left">
              <ConversionPathPanel />
            </div>
            <p className="mt-6 text-sm text-soft">
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
