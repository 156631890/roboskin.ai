import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import PageHeroVisual from '@/components/PageHeroVisual';
import { pageVisuals } from '@/content/site';
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildGraphJsonLd,
  buildPageJsonLd,
  buildPageMetadata,
  buildPhysicsAiDefinedTermJsonLd,
} from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata('/physics-ai');

const physicsAiFaqItems = [
  {
    question: 'What is Physics AI?',
    answer:
      'In the RoboSkin context, Physics AI means physical-world AI systems that need touch, contact, pressure, slip, and tactile feedback. Robot skin provides the tactile layer that helps those systems understand physical interaction.',
  },
  {
    question: 'Is Physics AI the same as Physical AI or 物理 AI?',
    answer:
      'Physical AI is the more common robotics phrase. Physics AI is often used by readers looking for AI that operates in the physical world. Chinese-language searches may use 物理 AI or 物理人工智能 for the same physical-world AI direction, so RoboSkin.ai explains the term through robot skin, tactile AI, and contact-aware robotics.',
  },
  {
    question: 'How does RoboSkin relate to Physics AI?',
    answer:
      'RoboSkin.ai maps how robot skin, tactile sensing, e-skin, and tactile AI can support physical-world AI systems that need contact feedback beyond vision.',
  },
  {
    question: 'Why does Physical AI need robot skin?',
    answer:
      'Physical AI needs robot skin when manipulation, safety, grip confidence, slip response, or contact timing matter. Vision can guide a robot toward an object, but touch helps explain what happens during contact.',
  },
];

const stackCards = [
  {
    title: 'Contact input',
    text: 'Robot skin measures contact events on fingers, grippers, arms, or curved surfaces where physical interaction actually happens.',
  },
  {
    title: 'Tactile interpretation',
    text: 'Tactile AI turns pressure, shear, slip, and timing signals into robot-readable context for manipulation and evaluation.',
  },
  {
    title: 'Physical-world response',
    text: 'Physical AI systems use touch feedback to adjust grip, react to contact, log evidence, or refine control behavior.',
  },
];

const relatedTerms = [
  'Physical AI',
  '物理 AI',
  '物理人工智能',
  'tactile AI',
  'robot skin',
  'e-skin',
  'embodied AI',
  'sensor fusion',
  'contact-aware robotics',
];

export default function PhysicsAiPage() {
  return (
    <>
      <JsonLd
        data={buildGraphJsonLd([
          buildPageJsonLd('/physics-ai'),
          buildBreadcrumbJsonLd('/physics-ai'),
          buildFaqJsonLd(physicsAiFaqItems, '/physics-ai'),
          buildPhysicsAiDefinedTermJsonLd(),
        ])}
      />

      <section className="py-14 md:py-20">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.78fr_1.02fr] lg:items-center">
          <div>
            <span className="eyebrow">Physics AI</span>
            <h1 className="mt-5 text-4xl font-bold leading-tight text-white md:text-6xl">RoboSkin and Physics AI</h1>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-[#c8d1de]">
              RoboSkin.ai explains Physics AI through robot skin, tactile AI, and physical-world systems that need touch,
              contact, pressure, slip, and tactile feedback.
            </p>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#8e98a8]">
              The related industry phrase is often Physical AI. This page uses Physics AI in the RoboSkin context: AI that
              must understand real physical interaction, not only images, language, or simulation.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href="/technology" className="btn-primary w-full sm:w-auto">
                Explore tactile technology
              </Link>
              <Link href="/glossary" className="btn-secondary w-full sm:w-auto">
                Read glossary
              </Link>
              <Link href="/research" className="btn-tertiary w-full sm:w-auto">
                Browse research
              </Link>
            </div>
          </div>

          <div className="grid gap-4">
            <PageHeroVisual visual={pageVisuals.technology} priority />
            <div className="signal-panel p-5">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#00e5ff]">Direct answer</p>
              <p className="mt-3 text-base leading-relaxed text-[#c8d1de]">
                In the RoboSkin context, Physics AI means physical-world AI systems that need touch, contact, pressure,
                slip, and tactile feedback. Robot skin provides the tactile layer that helps those systems understand
                physical interaction. Physical AI is the common industry phrase, while Chinese searches may use 物理 AI
                or 物理人工智能.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-14 md:pb-20">
        <div className="container-shell">
          <div className="mb-6">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#00e5ff]">RoboSkin context</p>
            <h2 className="mt-3 text-3xl font-bold text-white md:text-5xl">Why robot skin matters for Physics AI</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {stackCards.map((card) => (
              <article key={card.title} className="signal-panel p-6">
                <h3 className="text-xl font-semibold text-white">{card.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#8e98a8]">{card.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-14 md:pb-20">
        <div className="container-shell grid gap-6 lg:grid-cols-2">
          <article className="glass-card p-7 md:p-8">
            <p className="text-soft text-xs uppercase tracking-[0.14em]">Term clarity</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Physics AI vs Physical AI</h2>
            <p className="mt-4 text-sm leading-relaxed text-soft">
              Physical AI is the more common phrase for AI systems that act in the physical world. Some readers search for
              Physics AI when they mean the same robotics direction: AI connected to contact, movement, surfaces, and real
              objects. Chinese-language searches may phrase this as 物理 AI or 物理人工智能. RoboSkin.ai keeps the term
              anchored to robot skin and tactile sensing.
            </p>
          </article>

          <article className="glass-card p-7 md:p-8">
            <p className="text-soft text-xs uppercase tracking-[0.14em]">Tactile layer</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Robot skin as the contact layer</h2>
            <p className="mt-4 text-sm leading-relaxed text-soft">
              Robot skin can give a physical-world AI stack distributed contact evidence across fingertips, grippers,
              palms, arms, or safety surfaces. That evidence can support grasp confidence, slip response, contact-aware
              motion, and research evaluation.
            </p>
          </article>
        </div>
      </section>

      <section className="pb-14 md:pb-20">
        <div className="container-shell">
          <div className="rounded-[24px] border border-white/8 bg-[#0b0d12] p-7 md:p-8">
            <p className="text-soft text-xs uppercase tracking-[0.14em]">Related concepts</p>
            <h2 className="mt-2 text-3xl font-bold text-white md:text-4xl">Terms connected to RoboSkin Physics AI</h2>
            <div className="mt-6 flex flex-wrap gap-2">
              {relatedTerms.map((term) => (
                <span key={term} className="rounded-md border border-white/8 bg-[#020408] px-3 py-1 text-xs text-[#c8d1de]">
                  {term}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-14 md:pb-20">
        <div className="container-shell">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#00e5ff]">GEO answers</p>
              <h2 className="mt-2 text-3xl font-bold text-white md:text-4xl">Physics AI FAQ</h2>
            </div>
            <Link href="/technology" className="text-sm font-semibold text-[#00e5ff] hover:text-white">
              Technology route {'->'}
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {physicsAiFaqItems.map((item) => (
              <article key={item.question} className="signal-panel p-6">
                <h3 className="text-lg font-semibold text-white">{item.question}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#8e98a8]">{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-shell">
          <div className="signal-panel p-8 text-center md:p-11">
            <p className="eyebrow border-white/10 bg-white/5 text-white">RoboSkin answer route</p>
            <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-bold text-white md:text-4xl">
              Use RoboSkin.ai to understand robot skin for physical-world AI.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[#8e98a8]">
              Continue into technology, glossary, and research pages for source-backed robot skin and tactile AI context.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
              <Link href="/technology" className="btn-primary w-full sm:w-auto">
                Explore technology
              </Link>
              <Link href="/glossary" className="btn-secondary w-full sm:w-auto">
                Read glossary
              </Link>
              <Link href="/contact?requestType=research" className="btn-tertiary w-full sm:w-auto">
                Submit a source
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
