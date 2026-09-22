import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import PageHeroVisual from '@/components/PageHeroVisual';
import { pageVisuals } from '@/content/site';
import { buildBreadcrumbJsonLd, buildGraphJsonLd, buildPageJsonLd, buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata('/applications');

const applicationAreas = [
  {
    title: 'Humanoid robot skin',
    summary: 'Fingertips, palms, arms, and torso surfaces cover different contacts. Record sensing coverage and blind spots, then map each measurement to a robot frame.',
  },
  {
    title: 'Tactile AI and e-skin',
    summary: 'Soft sensing layers can conform to changing surfaces. Mounting strain, bending, drift, and crosstalk need evaluation alongside sensitivity.',
  },
  {
    title: 'Prosthetics and assistive devices',
    summary: 'Assistive robotics and prosthetics use touch-related terminology for safer interaction, force awareness, feedback, and human-centered design.',
  },
  {
    title: 'Contact-rich manipulation',
    summary: 'Insertion, reorientation, and handling require a link between contact observations and robot action. Evaluate the complete task, including failures and interventions.',
  },
];

const physicalAiUseCases = [
  {
    title: 'Humanoid hands',
    summary: 'Physical AI needs touch when robot hands must understand contact timing, grip confidence, and object stability.',
  },
  {
    title: 'Robotic grippers',
    summary: 'Robot skin can help grippers reason about pressure, slip, and fragile handling during physical-world tasks.',
  },
  {
    title: 'Assistive and medical robotics',
    summary: 'Tactile sensing gives physical-world AI systems more context for safer force awareness and human-centered interaction.',
  },
  {
    title: 'Contact-aware safety surfaces',
    summary: 'Distributed robot skin can help safety surfaces detect contact events that vision or remote sensing may miss.',
  },
];

const applicationTopicLinks = [
  {
    title: 'Humanoid robot skin',
    href: '/humanoid-robot-skin',
    summary: 'Hands, arms, and body surfaces where contact awareness matters.',
  },
  {
    title: 'Robot hand tactile sensor',
    href: '/applications/robot-hand-tactile-sensor',
    summary: 'Fingertip, palm, full-hand, slip, and grasp-stability sensing.',
  },
  {
    title: 'Soft robotic skin',
    href: '/applications/soft-robotic-skin',
    summary: 'Flexible tactile surfaces for curved and deformable robots.',
  },
  {
    title: 'Robot gripper tactile sensor',
    href: '/applications/robot-gripper-tactile-sensor',
    summary: 'Contact-aware jaw pads, slip signals, replacement, and gripper evaluation.',
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
              <h1 className="text-4xl font-bold tracking-tight text-white md:text-6xl">
                Robot skin applications: hands, grippers, and body surfaces
              </h1>
              <p className="mt-5 max-w-3xl text-soft">
                Choose the surface that makes contact. Fingertips, gripper pads, compliant bodies, and distributed
                body skin need different coverage, mounting, and signals. Use these application guides to connect
                the robot geometry to a measurement and a task-level evaluation.
              </p>
            </div>
            <div className="glass-card p-6">
              <p className="text-sm font-semibold text-white">Start with the contact problem</p>
              <p className="mt-3 text-sm leading-relaxed text-soft">Already have a failure to investigate? Find a workflow for slipping objects, missing body contact, calibration drift, or unusable touch data.</p>
              <Link href="/solutions" className="mt-5 inline-flex rounded-xl bg-[var(--primary)] px-5 py-2.5 text-sm font-bold text-white">
                Find a problem-solving workflow
              </Link>
            </div>
          </div>
          <PageHeroVisual visual={pageVisuals.applications} className="mt-10" priority />
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
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="eyebrow">Physical AI use cases</span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-white">Which contact signals does the task need?</h2>
            </div>
            <Link href="/physical-ai" className="text-sm font-semibold text-accent hover:text-white">
              Understand Physical AI feedback {'->'}
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {physicalAiUseCases.map((item) => (
              <article key={item.title} className="glass-card p-6">
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-soft">{item.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-shell">
          <div className="mb-5">
            <span className="eyebrow">Application routes</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">Focused application pages</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {applicationTopicLinks.map((item) => (
              <Link key={item.href} href={item.href} className="glass-card block p-6 transition-colors hover:bg-white/[0.04]">
                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-soft">{item.summary}</p>
              </Link>
            ))}
          </div>
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
                Explore contact-aware robotics research
              </Link>
              <Link href="/research/robot-skin-papers" className="rounded-xl border border-white/12 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/8">
                Browse robot skin papers
              </Link>
              <Link href="/glossary" className="rounded-xl border border-white/12 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/8">
                Read the glossary
              </Link>
              <Link href="/contact?requestType=research" className="rounded-xl bg-[var(--primary)] px-5 py-2.5 text-sm font-bold text-white">
                Send a research note
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
