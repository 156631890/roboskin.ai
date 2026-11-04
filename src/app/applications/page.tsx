import TactileTopicSections from '@/components/TactileTopicSections';
import { surgicalRoboticsSection } from '@/content/tactile-topic-additions';
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
    summary: 'Assistive robotics and prosthetics investigate contact sensing and feedback in specific experimental settings. Intended use does not establish clinical effectiveness or safe operation.',
  },
  {
    title: 'Contact-rich manipulation',
    summary: 'Insertion, reorientation, and handling require a link between contact observations and robot action. Evaluate the complete task, including failures and interventions.',
  },
];

const physicalAiUseCases = [
  {
    title: 'Humanoid hands',
    summary: 'Hand tasks may benefit from contact observations when they help distinguish task-relevant states; evaluate the sensing pathway and resulting action.',
  },
  {
    title: 'Robotic grippers',
    summary: 'Robot skin can help grippers reason about pressure, slip, and fragile handling during physical-world tasks.',
  },
  {
    title: 'Assistive and medical robotics',
    summary: 'Tactile sensing can provide contact observations for assistive research. Clinical and safety claims require evidence for the particular system and use.',
  },
  {
    title: 'Contact-aware safety surfaces',
    summary: 'Distributed skin can detect contact at instrumented surfaces. Coverage, missed events and response timing must be evaluated; detection alone is not a safety guarantee.',
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

const readingGuide = {
  "id": "application-acceptance-plan",
  "heading": "Define the contact decision before choosing the surface",
  "body": [
    "An application label is too broad to be an acceptance criterion. Describe who or what contacts the robot, where contact occurs, which state must be distinguished, and how the robot should respond. Then choose an observation and evaluation suited to that decision. The examples below are proposed planning cases, not tests performed by RoboSkin.ai.",
    "Keep perception and action separate in the result. Detecting contact does not prove that the controller reacted in time. Correctly estimating a force does not establish that an object was handled without damage. A task comparison must record the complete outcome, including failures and assistance."
  ],
  "table": {
    "headers": [
      "Illustrative application",
      "Observation and response to specify",
      "Evidence to collect"
    ],
    "rows": [
      [
        "Gripper handling an object",
        "Relevant contact or motion estimate and a bounded grip adjustment",
        "Contact state, command timing, retention, damage and retries"
      ],
      [
        "Hand reorienting an object",
        "Contact movement across the regions actually used",
        "Blind spots, pose outcome, assistance and full attempt count"
      ],
      [
        "Body surface contacting the environment",
        "Contact location and the intended response",
        "Coverage, missed/false events, timing and configuration-specific task result"
      ],
      [
        "Assistive or medical research",
        "The experimental setup and permitted human involvement",
        "Protocol, participants or models used, and the limits of the study"
      ]
    ]
  },
  "subsections": [
    {
      "heading": "Use a matched comparison and retain unsuccessful attempts",
      "body": [
        "For a proposed evaluation, keep the objects, task instructions, initial conditions, allowed assistance and success rule explicit. Compare the relevant configurations under that protocol. A result on a manikin, bench fixture or controlled research task cannot by itself establish clinical effectiveness or general safety.",
        "Choose the focused guide for mounting and calibration details, then use the benchmark route to document the metric. Where evidence is missing, record a question for evaluation rather than converting the intended application into a product capability."
      ]
    }
  ],
  "links": [
    {
      "label": "Plan hand sensing around task observations",
      "href": "/applications/robot-hand-tactile-sensor#hand-task-observation"
    },
    {
      "label": "Evaluate a gripper sensing configuration",
      "href": "/applications/robot-gripper-tactile-sensor"
    },
    {
      "label": "Separate contact and control-loop evidence",
      "href": "/tactile-manipulation"
    },
    {
      "label": "Compare benchmark protocols",
      "href": "/benchmarks"
    }
  ]
};

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
          <p className="mt-5 text-sm text-soft">Updated <time dateTime="2026-10-12">October 12, 2026</time>: added surgical tactile sensing studies and their experimental limits.</p>
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

    <section id={readingGuide.id} className="pb-14">
      <div className="container-shell">
        <div className="signal-panel p-6 md:p-8">
          <p className="text-sm text-soft">Reading guide reviewed November 4, 2026. Existing research dates and service terms remain separately identified.</p>
          <h2 className="mt-4 text-3xl font-semibold text-white">{readingGuide.heading}</h2>
          {readingGuide.body.map((text) => <p key={text} className="mt-4 leading-relaxed text-soft">{text}</p>)}
          <div className="mt-6 overflow-x-auto" tabIndex={0} role="region" aria-label={readingGuide.heading}>
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead><tr>{readingGuide.table.headers.map((text) => <th key={text} scope="col" className="border-b border-white/10 p-4 text-white">{text}</th>)}</tr></thead>
              <tbody>{readingGuide.table.rows.map((row) => <tr key={row[0]}>{row.map((text, index) => index === 0 ? <th key={text} scope="row" className="border-b border-white/10 p-4 align-top text-white">{text}</th> : <td key={text} className="border-b border-white/10 p-4 align-top leading-relaxed text-soft">{text}</td>)}</tr>)}</tbody>
            </table>
          </div>
          {readingGuide.subsections.map((section) => <div key={section.heading} className="mt-6"><h3 className="text-xl font-semibold text-white">{section.heading}</h3>{section.body.map((text) => <p key={text} className="mt-3 leading-relaxed text-soft">{text}</p>)}</div>)}
          <ul className="mt-6 grid gap-3">{readingGuide.links.map((link) => <li key={link.href}><Link href={link.href} className="text-sm font-semibold text-[#ffd5c5] underline underline-offset-4">{link.label}</Link></li>)}</ul>
        </div>
      </div>
    </section>

      <TactileTopicSections sections={[surgicalRoboticsSection]} />

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
