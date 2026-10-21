import TactileTopicSections from '@/components/TactileTopicSections';
import { technologyAdditions, tactileSources, senseAlignSection } from '@/content/tactile-topic-additions';
import { practicalSensingSources } from '@/content/tactile-practical-guides';
import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import PageHeroVisual from '@/components/PageHeroVisual';
import { fitCriteria, pageVisuals, sensorDataFlow, technologyLayers } from '@/content/site';
import { buildBreadcrumbJsonLd, buildFaqJsonLd, buildGraphJsonLd, buildPageJsonLd, buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata('/technology');

const technologyFaqs = [
  { question: 'Do tactile sensors replace force-torque sensors?', answer: 'Not in general. Distributed contact sensing and a resultant force-torque measurement answer different questions. A particular calibrated tactile system may estimate a net load, but that does not make all tactile sensors interchangeable with a wrist transducer.', source: practicalSensingSources.forceAxes },
  { question: 'Which is better for grasping delicate objects?', answer: 'Local contact sensing can inform finger pressure distribution and incipient slip; arm force sensing can inform approach and interaction loads. Choose using the failure you need to detect, then validate the complete gripper and controller on the intended objects.', source: practicalSensingSources.forceComparison },
  { question: 'Why do some robots use both tactile and force-torque sensors?', answer: 'They can combine information about the local contact patch with loads transmitted through the tool or joints. Align timestamps and reference frames before using both signals in a controller. Adding sensors alone does not establish better task performance.', source: practicalSensingSources.enlight },
  { question: 'What is tactile super-resolution?', answer: 'It estimates contact details finer than the spacing of physical sensing elements by using the joint response of neighboring sensors and a calibrated model. A larger output map alone does not prove finer physical resolution.', source: tactileSources.lattice },
  {
    question: 'What does a tactile sensor actually measure?',
    answer:
      'It measures a physical response at a contact surface. For example, DIGIT records images of a deforming elastomer. A contact image, reconstructed shape, force estimate, and slip estimate are different outputs; check which ones the sensor and processing pipeline actually provide.',
    source: { label: 'DIGIT: sensing principle and sensor design', href: 'https://arxiv.org/html/2005.14679v1' },
  },
  {
    question: 'Does a tactile image directly give calibrated force?',
    answer:
      'No. A tactile image records deformation or appearance. Producing force in physical units needs a documented calibration or inference method. DenseTact 2.0, for example, uses a learned mapping for shape reconstruction and six-axis wrench estimation, with calibration for new fingertips.',
    source: { label: 'DenseTact 2.0: calibrated shape and wrench estimation', href: 'https://arxiv.org/abs/2209.10122v2' },
  },
  {
    question: 'Can tactile sensing replace robot vision?',
    answer:
      'Touch and vision provide different observations. Touch can help when a contact is visually occluded, but it only samples the surface being touched. Exploring the rest of an object requires additional motion, and a probing action can move the object being measured.',
    source: { label: 'Active Tactile Exploration: sparsity and disturbance', href: 'https://arxiv.org/html/2510.13595v1' },
  },
  {
    question: 'Why might a replacement tactile sensor need recalibration?',
    answer:
      'Manufacturing variation and wear can change the response of an optical tactile sensor. The DIGIT paper identifies sensor-to-sensor variability and the possible need to recalibrate or retrain after replacement. Repeat the relevant calibration and task checks instead of assuming an old mapping still applies.',
    source: { label: 'DIGIT: replacement, wear, and manufacturing variability', href: 'https://arxiv.org/html/2005.14679v1' },
  },
  {
    question: 'Why can a ROS 2 tactile topic fail to deliver readings?',
    answer:
      'Publisher and subscriber Quality of Service settings must be compatible. ROS 2 also distinguishes best-effort delivery, which can lose samples, from reliable delivery, which may retry. Check compatibility, queue depth, deadlines, and message age before using the stream for a contact response.',
    source: { label: 'ROS 2 Jazzy: official Quality of Service documentation', href: 'https://github.com/ros2/ros2_documentation/blob/jazzy/source/Concepts/Intermediate/About-Quality-of-Service-Settings.rst' },
  },
];

const technologyTopicLinks = [
  {
    label: 'Tactile AI',
    href: '/tactile-ai',
    description: 'How touch signals become robot behavior, evaluation, and Physical AI feedback.',
  },
  {
    label: 'Flexible tactile sensor array',
    href: '/guides/flexible-tactile-sensor-array',
    description: 'Array-level tradeoffs for contact maps, resolution, data rate, and calibration.',
  },
  {
    label: 'ROS 2 tactile sensing',
    href: '/guides/ros2-tactile-sensing',
    description: 'Middleware, timestamping, rosbag replay, and robot-ready tactile data contracts.',
  },
];

export default function TechnologyPage() {
  return (
    <>
      <JsonLd data={buildGraphJsonLd([buildPageJsonLd('/technology'), buildBreadcrumbJsonLd('/technology'), buildFaqJsonLd(technologyFaqs, '/technology')])} />
      <section className="py-20 md:py-24">
        <div className="container-shell">
          <span className="eyebrow">Technology</span>
          <h1 className="mt-5 text-4xl font-bold text-white md:text-6xl">
            What is tactile sensing in robotics?
          </h1>
          <p className="mt-5 max-w-3xl text-soft">
            Tactile sensing lets a robot measure physical contact through signals such as pressure, deformation,
            vibration or changes in an optical image. The available measurements depend on the sensor and its calibration.
          </p>
          <PageHeroVisual visual={pageVisuals.technology} className="mt-10" priority />
          <p className="mt-5 max-w-3xl text-sm text-soft">Updated <time dateTime="2026-10-21">October 21, 2026</time>: added SenseAlign recognition-fusion evidence and evaluation boundaries. Earlier optical/capacitive comparisons, Tactaxis reading routes, mechanism explanations and tactile super-resolution are retained.</p>
        </div>
      </section>

      <section className="pb-20" aria-labelledby="tactile-sensing-basics">
        <div className="container-shell">
          <div className="glass-card p-7 md:p-8">
            <h2 id="tactile-sensing-basics" className="text-3xl font-bold text-white">How tactile sensing works</h2>
            <p className="mt-4 max-w-3xl text-soft">Contact changes a sensing surface or element. Electronics or a camera capture that change; processing converts it into a usable observation. A controller can then use the observation to adjust a grasp or investigate an unexpected contact.</p>
            <p className="mt-4 max-w-3xl text-soft">A tactile sensor supplies observations. Robot skin distributes sensing over a surface. Tactile AI uses learned models to interpret touch or support decisions. None of these labels alone establishes calibrated force, reliable slip detection or better task performance.</p>
            <p className="mt-4 max-w-3xl text-soft">For example, an optical fingertip can record how a gel deforms during a grasp. Estimating force from those images needs calibration or a model; evaluating slip recovery also needs a controller and task-level tests.</p>
            <p className="mt-4 max-w-3xl text-soft">
              Start with the observation your task needs, then use the <Link href="/sensors#optical-comparison" className="text-accent underline underline-offset-4">GelSight, DIGIT, and TacTip comparison</Link> to examine sensing method, packaging, and the scope of each published evaluation.
            </p>
            <nav aria-label="Tactile sensing next steps" className="mt-6 flex flex-wrap gap-5 text-accent underline underline-offset-4">
              <Link href="/sensors#optical-comparison">Compare GelSight, DIGIT and TacTip</Link>
              <Link href="/sensors#task-selection">Choose sensors by manipulation task</Link>
              <Link href="/guides/how-to-choose-a-tactile-sensor">Follow the sensor selection checklist</Link>
              <Link href="/datasets">Find visuo-tactile datasets</Link>
              <Link href="/guides/robot-skin-vs-e-skin">Robot skin vs e-skin</Link>
              <Link href="#sensealign-vision-touch-fusion">When vision and touch disagree in recognition</Link>
            </nav>
            <p className="mt-5 text-sm text-soft">Source example: <a className="text-accent underline" href="https://arxiv.org/abs/2005.14679">the original DIGIT paper</a>. This introduction summarizes sensing concepts; RoboSkin.ai has not performed a hardware comparison for this page.</p>
          </div>
        </div>
      </section>

      <TactileTopicSections sections={technologyAdditions} />
      <TactileTopicSections sections={[senseAlignSection]} />

      <section className="pb-20">
        <div className="container-shell grid gap-6 lg:grid-cols-2">
          {technologyLayers.map((layer) => (
            <article key={layer.title} className="glass-card p-7 md:p-8">
              <p className="text-soft text-xs uppercase tracking-[0.14em]">Layer</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">{layer.title}</h2>
              <p className="mt-3 text-soft">{layer.summary}</p>
              {layer.bullets?.length ? (
                <ul className="mt-5 space-y-2 text-sm text-[#d8dce4]">
                  {layer.bullets.map((bullet) => (
                    <li key={bullet} className="rounded-lg border border-white/8 bg-[#0d1016] px-4 py-2.5">
                      {bullet}
                    </li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section className="pb-20">
        <div className="container-shell">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="eyebrow">Data flow</span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-5xl">From contact surface to robot-ready signal concepts</h2>
            </div>
            <Link href="/research/ros2-kilted-tactile-pipeline-2026" className="text-accent text-sm font-semibold hover:text-white">
              Read robot hand tactile sensor research {'->'}
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {sensorDataFlow.map((step, index) => (
              <article key={step.title} className="glass-card p-6">
                <p className="text-soft text-xs uppercase tracking-[0.14em]">Step {index + 1}</p>
                <h3 className="mt-2 text-xl font-semibold text-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-soft">{step.summary}</p>
                <p className="mt-4 rounded-xl border border-white/8 bg-[#0d1016] px-4 py-3 text-sm text-[#d8dce4]">{step.output}</p>
              </article>
            ))}
          </div>
          <p className="mt-6 max-w-3xl text-soft">
            To bring those observations into robot software, follow the <Link href="/guides/ros2-tactile-sensing" className="text-accent underline underline-offset-4">ROS 2 tactile sensing tutorial</Link> for message structure, timestamps, and recording and replay checks.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-shell">
          <div className="mb-5">
            <span className="eyebrow">Topic routes</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">Technology pages that support this stack</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {technologyTopicLinks.map((item) => (
              <Link key={item.href} href={item.href} className="glass-card block p-6 transition-colors hover:bg-white/[0.04]">
                <h3 className="text-xl font-semibold text-white">{item.label}</h3>
                <p className="mt-3 text-sm leading-relaxed text-soft">{item.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-shell">
          <div className="rounded-[24px] border border-white/8 bg-[#0b0d12] p-7 md:p-8">
            <div className="grid gap-6 lg:grid-cols-[0.72fr_1fr] lg:items-center">
              <div>
                <p className="text-soft text-xs uppercase tracking-[0.14em]">Physical AI contact layer</p>
                <h2 className="mt-2 text-3xl font-bold text-white md:text-4xl">Robot skin as the tactile input for Physical AI</h2>
              </div>
              <div>
                <p className="text-sm leading-relaxed text-soft">
                  For Physical AI systems, robot skin is the contact layer. It helps expose touch, pressure,
                  shear, slip, and timing signals that vision alone cannot measure during interaction.
                </p>
                <Link href="/physical-ai" className="mt-5 inline-flex text-sm font-semibold text-accent hover:text-white">
                  Open the Physical AI tactile contact layer {'->'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-shell">
          <div className="rounded-[24px] border border-white/8 bg-[#0b0d12] p-7 md:p-8">
            <p className="text-soft text-xs uppercase tracking-[0.14em]">Fit criteria</p>
            <h2 className="mt-2 text-3xl font-bold text-white md:text-4xl">What must be validated before making claims</h2>
            <p className="mt-4 max-w-3xl text-soft">
              If you plan to train a model, check the <Link href="/datasets" className="text-accent underline underline-offset-4">tactile dataset directory</Link> for sensor type, recorded modalities, access terms, and evaluation splits before choosing data for your hardware.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {fitCriteria.map((item) => (
                <article key={item.title} className="rounded-2xl border border-white/8 bg-[#0d1016] p-5">
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-soft">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-shell">
          <div className="rounded-[24px] border border-white/8 bg-[#0b0d12] p-8 text-center md:p-11">
            <h2 className="text-3xl font-bold text-white md:text-5xl">Need source-backed robot skin context?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-soft">
              Use the research and glossary routes for terminology, or send a research inquiry if RoboSkin.ai fits your project.
            </p>
            <div className="mt-7 flex justify-center">
              <Link
                href="/research"
                className="rounded-xl bg-[var(--primary)] px-7 py-3 text-sm font-bold text-white shadow-[0_12px_26px_rgba(98,168,255,0.22)]"
              >
                Explore research resources
              </Link>
            </div>
            <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm">
              <Link href="/products" className="text-accent font-semibold hover:text-white">
                View guide routes {'->'}
              </Link>
              <Link href="/resources" className="text-accent font-semibold hover:text-white">
                View learning resources {'->'}
              </Link>
              <Link href="/faq" className="text-accent font-semibold hover:text-white">
                Read tactile AI FAQ {'->'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20" aria-labelledby="tactile-sensing-limitations">
        <div className="container-shell">
          <span className="eyebrow">Evidence boundaries</span>
          <h2 id="tactile-sensing-limitations" className="mt-4 text-3xl font-bold text-white md:text-4xl">Challenges &amp; Limitations</h2>
          <p className="mt-4 max-w-3xl text-soft">These limitations come from specific sensor studies and robot software documentation. Their severity depends on the hardware, contact conditions, and task; they are not a universal ranking of tactile technologies.</p>
          <div className="mt-7 grid gap-5 md:grid-cols-2">
            <article className="glass-card p-6">
              <h3 className="text-xl font-semibold text-white">Contact is local and can disturb the object</h3>
              <p className="mt-3 text-sm leading-relaxed text-soft">A tactile observation covers the surface currently touching the sensor. Gathering more geometry requires movement, and probing can shift an unrestrained object. Active tactile exploration therefore has to reason about both what remains unknown and how the next action changes the scene.</p>
              <p className="mt-4 text-sm"><a href="https://arxiv.org/html/2510.13595v1" className="text-accent underline underline-offset-4">Source: Active Tactile Exploration, introduction</a></p>
            </article>
            <article className="glass-card p-6">
              <h3 className="text-xl font-semibold text-white">Soft sensing surfaces wear and vary between units</h3>
              <p className="mt-3 text-sm leading-relaxed text-soft">The DIGIT paper identifies wear of optical sensor elastomers and manufacturing variation as practical limits. Its design improves durability and replacement, but does not establish a lifetime for every application. A replacement surface may require recalibration or retraining before its readings are comparable.</p>
              <p className="mt-4 text-sm"><a href="https://arxiv.org/html/2005.14679v1" className="text-accent underline underline-offset-4">Source: DIGIT, sensor design and elastomer evaluation</a></p>
            </article>
            <article className="glass-card p-6">
              <h3 className="text-xl font-semibold text-white">Force estimates depend on a calibrated mapping</h3>
              <p className="mt-3 text-sm leading-relaxed text-soft">DenseTact 2.0 estimates shape and six-axis wrench from images using a learned model and calibrates new fingertips through transfer learning. That result supports a particular calibrated system; it does not make every optical tactile image a force measurement. Check the calibration data and held-out conditions for the output you need.</p>
              <p className="mt-4 text-sm"><a href="https://arxiv.org/abs/2209.10122v2" className="text-accent underline underline-offset-4">Source: DenseTact 2.0</a></p>
            </article>
            <article className="glass-card p-6">
              <h3 className="text-xl font-semibold text-white">Transport settings affect usable feedback</h3>
              <p className="mt-3 text-sm leading-relaxed text-soft">ROS 2 documents that incompatible Quality of Service profiles can prevent messages from arriving. Best-effort delivery may lose samples, while reliable delivery may retry them. A sensor stream therefore needs delivery and freshness checks before it becomes a controller input.</p>
              <p className="mt-4 text-sm"><a href="https://github.com/ros2/ros2_documentation/blob/jazzy/source/Concepts/Intermediate/About-Quality-of-Service-Settings.rst" className="text-accent underline underline-offset-4">Source: ROS 2 Jazzy Quality of Service documentation</a></p>
            </article>
          </div>
        </div>
      </section>

      <section id="tactile-vs-force-torque" className="scroll-mt-24 pb-20" aria-labelledby="tactile-vs-force-torque-title">
        <div className="container-shell">
          <span className="eyebrow">Sensor selection</span>
          <h2 id="tactile-vs-force-torque-title" className="mt-4 max-w-4xl text-3xl font-bold text-white md:text-4xl">Tactile Sensors vs Force-Torque Sensors: When to Use Which</h2>
          <p className="mt-4 max-w-4xl text-sm leading-relaxed text-soft">Start with the observation your task needs: the local contact pattern, the resultant load, or both. Source review: October 16, 2026.</p>
          <div className="mt-7 space-y-5">
            <article className="glass-card p-6 md:p-8">
              <h3 className="text-xl font-semibold text-white">What each measures</h3>
              <div className="mt-4 overflow-x-auto" role="region" aria-label="Tactile and force-torque comparison" tabIndex={0}>
                <table className="w-full min-w-[620px] border-collapse text-left text-sm">
                  <thead><tr className="border-b border-white/10">
                    <th scope="col" className="p-3 text-white">Measurement</th><th scope="col" className="p-3 text-white">Tactile sensing</th><th scope="col" className="p-3 text-white">Force-torque sensing</th>
                  </tr></thead>
                  <tbody className="text-soft">
                    <tr className="border-b border-white/10"><th scope="row" className="p-3 align-top text-white">Typical output</th><td className="p-3 align-top">A local array, image or other contact signal; available modalities depend on the sensor.</td><td className="p-3 align-top">Resultant forces and moments. A six-axis transducer measures three force and three torque components.</td></tr>
                    <tr><th scope="row" className="p-3 align-top text-white">Interpretation limit</th><td className="p-3 align-top">Raw contact data may require calibration or inference before it becomes force or slip.</td><td className="p-3 align-top">A net wrench does not by itself uniquely reveal a distributed contact-pressure map.</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm"><a href={practicalSensingSources.forceAxes.href} className="text-accent underline underline-offset-4">Robotiq: force-torque measurement axes</a>. <a href={practicalSensingSources.tsfSdk.href} className="text-accent underline underline-offset-4">TSF-85: example local sensor outputs</a>.</p>
            </article>
            <article className="glass-card p-6 md:p-8">
              <h3 className="text-xl font-semibold text-white">Where each sits on the robot</h3>
              <p className="mt-3 text-sm leading-relaxed text-soft">Tactile sensing is commonly placed on fingertips, gripper pads or skin surfaces. A wrist force-torque transducer sits between the robot flange and tool and senses loads transmitted through that interface. Joint sensing is another architecture; it should not be described as an array of fingertip taxels.</p>
              <p className="mt-4 text-sm"><a href={practicalSensingSources.forceComparison.href} className="text-accent underline underline-offset-4">Robotiq comparison, published September 16, 2014 and updated December 19, 2024</a></p>
            </article>
            <article className="glass-card p-6 md:p-8">
              <h3 className="text-xl font-semibold text-white">Can they replace each other?</h3>
              <p className="mt-3 text-sm leading-relaxed text-soft">Usually they are complementary. Flexiv&apos;s September 2026 IROS announcement describes Enlight with multi-dimensional force sensors in each of its seven joints. This illustrates force perception distributed through the arm; the announcement does not establish a dense fingertip pressure map or prove that tactile skin is unnecessary.</p>
              <p className="mt-3 text-sm leading-relaxed text-soft">Our selection inference is to compare the outputs required by the task, not the sensor labels. For example, an object can change its contact distribution while producing a similar net load. Conversely, a fingertip contact image alone does not describe every external load on the arm.</p>
              <p className="mt-4 text-sm"><a href={practicalSensingSources.enlight.href} className="text-accent underline underline-offset-4">Flexiv: Enlight joint sensing at IROS 2026</a></p>
            </article>
            <article className="glass-card p-6 md:p-8">
              <h3 className="text-xl font-semibold text-white">Practical selection guidance for robot builders</h3>
              <p className="mt-3 text-sm leading-relaxed text-soft">For contact location, distribution or slip cues, evaluate a suitable fingertip sensor. For tool interaction loads during insertion or surface following, evaluate force-torque feedback. If both matter, test the combined system with common timestamps, coordinate frames and success criteria.</p>
              <p className="mt-3 text-sm leading-relaxed text-soft">For delicate objects, validate contact coverage, calibrated limits, reaction time and failure recovery. Neither a tactile array nor a force sensor automatically guarantees a safe grasp. This is a selection framework, not a comparative hardware benchmark.</p>
              <div className="mt-5 flex flex-wrap gap-4 text-sm">
                <Link href="/sensors" className="text-accent underline underline-offset-4">Compare tactile sensors</Link>
                <Link href="/sensors/robotiq-tsf-85" className="text-accent underline underline-offset-4">Read the TSF-85 profile</Link>
                <Link href="/e-skin#temperature-and-thermal-sensing" className="text-accent underline underline-offset-4">Explore thermal touch</Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="pb-20" aria-labelledby="tactile-sensing-faq">
        <div className="container-shell">
          <span className="eyebrow">Common questions</span>
          <h2 id="tactile-sensing-faq" className="mt-4 text-3xl font-bold text-white md:text-4xl">Tactile sensing FAQ</h2>
          <div className="mt-7 space-y-4">
            {technologyFaqs.map((item) => (
              <article key={item.question} className="glass-card p-6 md:p-7">
                <h3 className="text-xl font-semibold text-white">{item.question}</h3>
                <p className="mt-3 max-w-4xl text-sm leading-relaxed text-soft">{item.answer}</p>
                <p className="mt-4 text-sm"><a href={item.source.href} className="text-accent underline underline-offset-4">{item.source.label}</a></p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
