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
  buildPhysicalAiDefinedTermJsonLd,
} from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata('/physical-ai');

const physicalAiFaqItems = [
  {
    question: 'What is Physical AI?',
    answer:
      'Physical AI is a broad industry term for AI systems that perceive, reason, and act through physical machines. A complete system can include sensors, learned or engineered models, planning, robot policies, controllers, actuators, safety functions, and measured feedback.',
  },
  {
    question: 'How is Physical AI different from embodied AI?',
    answer:
      'The terms overlap, but they are not exact synonyms. Embodied AI can include physical robots as well as simulated or virtual agents. Physical AI usually emphasizes AI connected to real machines, physical dynamics, and real-world action.',
  },
  {
    question: 'Is a VLA model a complete Physical AI system?',
    answer:
      'No. A vision-language-action model can map observations and instructions to robot actions, but a deployed system still depends on the robot body, sensors, action interface, control, integration, safety, and evaluation protocol.',
  },
  {
    question: 'Why does touch matter for Physical AI?',
    answer:
      'Touch can measure local contact, pressure, shear, slip, vibration, or deformation that vision and language do not directly observe. It becomes useful when calibrated, synchronized signals change a model, policy, controller, or evaluation result.',
  },
  {
    question: 'Does an AI model replace robot control and safety engineering?',
    answer:
      'No. High-level perception, reasoning, or policy outputs do not remove the need for state estimation, motion and force control, actuator limits, system integration, protective functions, and task-specific safety validation.',
  },
];

const stackCards = [
  {
    title: 'Perceive',
    text: 'Vision, depth, audio, proprioception, force, and touch provide complementary observations with hardware-specific limits.',
  },
  {
    title: 'Reason and predict',
    text: 'Representations, embodied reasoning, planners, and world models estimate state, possible futures, or useful subgoals.',
  },
  {
    title: 'Select and execute',
    text: 'A policy selects an action; controllers, actuators, and the robot body execute it within physical and safety constraints.',
  },
  {
    title: 'Measure feedback',
    text: 'New observations establish contact, motion, error, intervention, recovery, and task outcome rather than assuming success.',
  },
];

const roleRows = [
  ['VLM', 'Connects vision with language and semantic knowledge.', 'Text, labels, representation, or scene interpretation.', 'Direct physical action is not established by the VLM label.'],
  ['Embodied reasoning', 'Reasons about space, state, affordances, task steps, or plans.', 'Subgoal, plan, pose, code, or tool call.', 'A proposed plan is not evidence of safe robot execution.'],
  ['VLA or robot policy', 'Maps observations and goals to actions in a documented action space.', 'Waypoint, pose, joint, gripper, or action chunk.', 'Generalization remains bounded by data, embodiment, and evaluation.'],
  ['World model', 'Predicts future observations, state, contact, reward, or outcome under an action.', 'Predicted rollout or transition.', 'Prediction does not necessarily select or execute an action.'],
  ['Robot control', 'Tracks motion or force commands and regulates the physical system.', 'Trajectory, torque, motor command, or protective response.', 'A high-level model does not replace the controller.'],
  ['Touch feedback', 'Measures physical interaction after an action reaches an object or surface.', 'Pressure, force, shear, slip, vibration, tactile image, or contact event.', 'A sensor signal alone does not prove intelligent or safer behavior.'],
];

const evidenceQuestions = [
  'Which robot, sensors, end effector, action representation, and controller were used?',
  'Which observations entered each model, and what did each component actually output?',
  'What training data, simulation, demonstrations, interventions, and held-out conditions were used?',
  'Was evaluation performed in simulation, on physical hardware, or both—and across how many trials?',
  'How were resets, human corrections, failures, recovery, force, damage, time, and success recorded?',
  'Is the result a provider demonstration, an author-reported study, a peer-reviewed study, or independent reproduction?',
];

const sourceLinks = [
  {
    label: 'Google DeepMind: Gemini Robotics architecture',
    href: 'https://deepmind.google/blog/gemini-robotics-brings-ai-into-the-physical-world/',
  },
  {
    label: 'Open X-Embodiment paper',
    href: 'https://arxiv.org/abs/2310.08864',
  },
  {
    label: 'NVIDIA GR00T N1 paper',
    href: 'https://arxiv.org/abs/2503.14734',
  },
  {
    label: 'ISO 10218-1:2025 official scope page',
    href: 'https://www.iso.org/standard/73933.html',
  },
];

export default function PhysicalAiPage() {
  return (
    <>
      <JsonLd
        data={buildGraphJsonLd([
          buildPageJsonLd('/physical-ai'),
          buildBreadcrumbJsonLd('/physical-ai'),
          buildFaqJsonLd(physicalAiFaqItems, '/physical-ai'),
          buildPhysicalAiDefinedTermJsonLd(),
        ])}
      />

      <article>
        <section className="py-14 md:py-20">
          <div className="container-shell grid gap-10 lg:grid-cols-[0.78fr_1.02fr] lg:items-center">
            <div>
              <nav aria-label="Breadcrumb" className="mb-5 flex items-center gap-2 text-xs text-[#8e98a8]">
                <Link href="/" className="hover:text-white">Home</Link>
                <span aria-hidden="true">/</span>
                <span aria-current="page" className="text-[#c8d1de]">Physical AI</span>
              </nav>
              <span className="eyebrow">Physical AI</span>
              <h1 className="mt-5 text-4xl font-bold leading-tight text-white md:text-6xl">
                Physical AI: perception, reasoning, action, and feedback
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-relaxed text-[#c8d1de]">
                Physical AI is a broad term for AI systems that perceive, reason, and act through physical machines. The
                AI model is one layer; the complete system also includes sensors, embodiment, policies, control,
                actuators, integration, safety, and measured feedback.
              </p>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#8e98a8]">
                RoboSkin.ai maps that full system, then follows touch into the contact-specific layer. It does not treat
                Physical AI as one standardized architecture or use a model label as proof of real-world capability.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link href="/ai-robotics" className="btn-primary w-full sm:w-auto">
                  Map AI and robotics
                </Link>
                <Link href="/physical-ai-touch" className="btn-secondary w-full sm:w-auto">
                  Explore Physical AI + touch
                </Link>
                <Link href="/research" className="btn-tertiary w-full sm:w-auto">
                  Browse research
                </Link>
              </div>
            </div>

            <div className="grid gap-4">
              <PageHeroVisual visual={pageVisuals.technology} priority />
              <div className="signal-panel p-5">
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#ff6b3d]">Direct answer</p>
                <p className="mt-3 text-base leading-relaxed text-[#c8d1de]">
                  AI supplies perception, learning, prediction, reasoning, or action selection. Robotics supplies the
                  physical body, sensing, control, actuation, integration, and safety. Physical AI is the closed system
                  that connects those layers to real-world action and feedback.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="deferred-section pb-14 md:pb-20">
          <div className="container-shell">
            <div className="mb-6">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#ff6b3d]">System loop</p>
              <h2 className="mt-3 text-3xl font-bold text-white md:text-5xl">From observation to physical outcome</h2>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#8e98a8]">
                A useful map is goal → observation → state and reasoning → policy → control → physical action → measured
                feedback. Implementations may combine stages, but evidence should still identify each interface.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {stackCards.map((card, index) => (
                <article key={card.title} className="signal-panel p-6">
                  <p className="font-mono text-xs font-semibold text-[#ff6b3d]">{String(index + 1).padStart(2, '0')}</p>
                  <h3 className="mt-3 text-xl font-semibold text-white">{card.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#8e98a8]">{card.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="deferred-section pb-14 md:pb-20">
          <div className="container-shell">
            <div className="mb-6">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#ff6b3d]">Architecture boundaries</p>
              <h2 className="mt-3 text-3xl font-bold text-white md:text-5xl">What each layer does—and does not prove</h2>
            </div>
            <div className="overflow-x-auto rounded-md border border-white/10 bg-[#020408]">
              <table className="w-full min-w-[880px] border-collapse text-left text-sm">
                <thead className="border-b border-white/10 bg-white/[0.03]">
                  <tr>
                    {['Layer', 'Primary role', 'Typical output', 'Evidence boundary'].map((header) => (
                      <th key={header} scope="col" className="px-4 py-3 font-mono text-xs font-semibold uppercase tracking-[0.1em] text-[#ffd5c5]">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {roleRows.map((row) => (
                    <tr key={row[0]} className="border-b border-white/8 last:border-b-0">
                      {row.map((cell, index) => index === 0 ? (
                        <th key={cell} scope="row" className="px-4 py-4 align-top font-semibold leading-relaxed text-white">{cell}</th>
                      ) : (
                        <td key={cell} className="px-4 py-4 align-top leading-relaxed text-[#c8d1de]">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="deferred-section pb-14 md:pb-20">
          <div className="container-shell grid gap-6 lg:grid-cols-2">
            <article className="glass-card p-7 md:p-8">
              <p className="text-soft text-xs uppercase tracking-[0.14em]">Term boundary</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Physical AI and embodied AI overlap</h2>
              <p className="mt-4 text-sm leading-relaxed text-soft">
                Embodied AI can include physical robots, simulated agents, and virtual bodies. Physical AI usually
                emphasizes AI connected to real machines and physical dynamics. Neither term identifies a single model,
                benchmark, control stack, or safety standard.
              </p>
              <Link href="/ai-robotics" className="mt-5 inline-flex text-sm font-semibold text-[#ffd5c5] hover:text-white">
                Compare AI and robotics roles {'->'}
              </Link>
            </article>

            <article className="glass-card p-7 md:p-8">
              <p className="text-soft text-xs uppercase tracking-[0.14em]">Contact-specific child</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Touch grounds action in physical contact</h2>
              <p className="mt-4 text-sm leading-relaxed text-soft">
                Vision and language provide scene and semantic context. Proprioception reports the robot body. Robot skin
                and tactile sensors can measure what happens at the contact surface. The dedicated touch page covers
                calibration, synchronization, tactile models, control, and evidence boundaries.
              </p>
              <Link href="/physical-ai-touch" className="mt-5 inline-flex text-sm font-semibold text-[#ffd5c5] hover:text-white">
                Open Physical AI and touch {'->'}
              </Link>
            </article>
          </div>
        </section>

        <section className="deferred-section pb-14 md:pb-20">
          <div className="container-shell grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
            <article className="signal-panel p-7 md:p-8">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#ff6b3d]">Evaluation checklist</p>
              <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">Audit a Physical AI claim from hardware to outcome</h2>
              <ul className="mt-6 grid gap-3">
                {evidenceQuestions.map((question) => (
                  <li key={question} className="rounded-md border border-white/8 bg-[#020408] px-4 py-3 text-sm leading-relaxed text-[#c8d1de]">
                    {question}
                  </li>
                ))}
              </ul>
            </article>

            <aside className="space-y-4">
              <div className="signal-panel p-5">
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#ff6b3d]">Continue the map</p>
                <div className="mt-4 space-y-3">
                  {[
                    ['/robots', 'Robot platforms and embodiments'],
                    ['/robot-learning', 'Robot learning'],
                    ['/robot-vla-models', 'Robot VLA models'],
                    ['/robot-world-models', 'Robot world models'],
                    ['/robotics-datasets', 'Robotics datasets'],
                    ['/robot-manipulation', 'Robot manipulation'],
                    ['/humanoid-robots', 'Humanoid robots'],
                    ['/robot-safety', 'Robot safety'],
                    ['/tactile-ai', 'Tactile AI'],
                    ['/robot-skin', 'Robot skin'],
                  ].map(([href, label]) => (
                    <Link key={href} href={href} className="block rounded-md border border-white/8 bg-[#020408] p-4 text-sm font-semibold text-white transition-colors hover:bg-white/[0.04]">
                      {label} {'->'}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="signal-panel p-5">
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#ff6b3d]">Primary sources</p>
                <div className="mt-4 space-y-3">
                  {sourceLinks.map((source) => (
                    <a key={source.href} href={source.href} target="_blank" rel="noreferrer" className="block text-sm font-semibold leading-relaxed text-[#ffd5c5] hover:text-white">
                      {source.label} {'->'}
                    </a>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="deferred-section pb-14 md:pb-20">
          <div className="container-shell">
            <div className="mb-5">
              <p className="eyebrow">Common questions</p>
              <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">Physical AI FAQ</h2>
            </div>
            <div className="signal-panel overflow-hidden p-0">
              {physicalAiFaqItems.map((item, index) => (
                <section key={item.question} className="grid gap-5 border-b border-white/8 p-5 last:border-b-0 md:grid-cols-[80px_0.42fr_1fr] md:p-7">
                  <span className="font-mono text-sm font-semibold text-[#ff6b3d]">{String(index + 1).padStart(2, '0')}</span>
                  <h3 className="text-xl font-semibold text-white">{item.question}</h3>
                  <p className="text-sm leading-relaxed text-[#c8d1de]">{item.answer}</p>
                </section>
              ))}
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
