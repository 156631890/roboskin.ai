import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import { site } from '@/content/site';
import { buildBreadcrumbJsonLd, buildGraphJsonLd, buildPageJsonLd, buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata('/methodology');

const sourceSteps = [
  {
    title: 'Identify the source and version',
    detail: 'Start with the paper, official project, model card, standards document, or repository. Keep the source URL and distinguish the original publication date, the version inspected, and the date of source review. A later project announcement may describe a different release from the paper.',
  },
  {
    title: 'Trace the specific claim',
    detail: 'Connect a result to its methods, table, figure, model specification, or released artifact. Separate the authors’ reported findings from RoboSkin.ai interpretation. When the reviewed material does not establish a detail, keep that gap visible.',
  },
  {
    title: 'Keep the experimental boundary',
    detail: 'Read a result together with its robot, sensor, task, data split, trial count, metric, baseline, and intervention conditions. A simulation result, physical-robot result, and mixed-task average describe different evidence. A reported success rate does not establish transfer to another setup.',
  },
  {
    title: 'Check artifacts separately',
    detail: 'Distinguish a public paper from downloadable code, weights, and data. Record what was inspected and what remains unverified. A project page or “coming soon” link is not a released implementation; a paper or repository license does not automatically cover model weights or datasets.',
  },
];

const evidenceTypes = [
  ['Source review', 'An explanation of a cited paper or official document, including its reported results and limits.', 'It does not establish independent reproduction or peer review by RoboSkin.ai.'],
  ['Artifact inspection', 'A record of the public files, code, manifest, or license that were actually inspected.', 'It does not establish successful execution or a complete dataset download.'],
  ['Execution or replay', 'A dated run with identified code, dependencies, inputs, commands, and observed output; synthetic inputs and replay are labeled.', 'It does not establish a live sensor measurement or a physical robot experiment.'],
  ['Physical experiment', 'Evidence identifying the actual hardware, calibration, task, trials, baseline, failures, and measured output.', 'It does not establish performance on other hardware or certified deployment safety.'],
];

const modelFields = [
  ['Identity and provenance', 'Model name and stable record, family or category, release and source version, organizations, primary links, and review date.'],
  ['Inputs and outputs', 'Observed modalities and robot state, generated actions or predictions, and the distinction between training supervision and inference inputs.'],
  ['Role in the robot', 'Prediction target, action conditioning, planning or policy role, feedback path, embodiment, and controller boundary.'],
  ['Data and access', 'Training-data scope, code, weights and dataset availability, with a separate license boundary for each artifact.'],
  ['Evaluation and limits', 'Task and hardware conditions, metric definition, trials and baselines, source-reported results, missing details, and evidence status.'],
];

export default function MethodologyPage() {
  return (
    <>
      <JsonLd data={buildGraphJsonLd([buildPageJsonLd('/methodology'), buildBreadcrumbJsonLd('/methodology')])} />
      <article className="py-20 md:py-24">
        <div className="container-shell">
          <div className="max-w-4xl">
            <p className="section-label">Research methodology</p>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-white md:text-6xl">How RoboSkin.ai traces claims to evidence</h1>
            <p className="mt-5 text-base leading-relaxed text-soft md:text-lg">
              RoboSkin.ai organizes public robotics research into definitions, model records, and practical reading routes.
              Our method keeps the cited source, the claim it supports, the evaluation conditions, and the remaining uncertainty together.
              Most research briefs explain findings reported by the original researchers.
            </p>
            <p className="mt-4 text-sm text-soft">
              Methodology published <time dateTime="2026-10-12">2026-10-12</time>. This page date does not change the source-review dates of existing records.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 text-sm">
              <Link href="/editorial-policy" className="text-accent underline underline-offset-4">Read the editorial policy</Link>
              <Link href="/contact?requestType=research" className="text-accent underline underline-offset-4">Submit a source or correction</Link>
            </div>
          </div>

          <section id="source-tracing" className="deferred-section mt-12 scroll-mt-28">
            <p className="eyebrow">Source tracing</p>
            <h2 className="mt-4 text-3xl font-bold text-white">Follow the claim back to its source</h2>
            <ol className="mt-6 grid gap-5 md:grid-cols-2">
              {sourceSteps.map((step, index) => (
                <li key={step.title} className="signal-panel p-6 md:p-8">
                  <p className="font-mono text-xs text-accent">0{index + 1}</p>
                  <h3 className="mt-3 text-xl font-semibold text-white">{step.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-soft">{step.detail}</p>
                </li>
              ))}
            </ol>
          </section>

          <section id="evidence-types" className="deferred-section mt-12 scroll-mt-28">
            <p className="eyebrow">What was checked</p>
            <h2 className="mt-4 text-3xl font-bold text-white">Read the evidence label before the result</h2>
            <p className="mt-4 max-w-4xl text-sm leading-relaxed text-soft">
              Use the evidence stated on the individual page. Source review, artifact inspection, execution, and physical testing
              are separate activities. These labels describe the available record; they are not a ranking of papers, products, or model quality.
            </p>
            <div className="mt-6 overflow-x-auto rounded-md border border-white/10" tabIndex={0} role="region" aria-label="Evidence activities and their limits">
              <table className="w-full min-w-[760px] border-collapse text-left text-sm">
                <thead className="border-b border-white/10 bg-white/[0.03]">
                  <tr>{['Activity', 'Evidence to look for', 'Boundary'].map((label) => <th key={label} scope="col" className="px-4 py-3 font-semibold text-white">{label}</th>)}</tr>
                </thead>
                <tbody>
                  {evidenceTypes.map(([label, evidence, boundary]) => (
                    <tr key={label} className="border-b border-white/8 last:border-b-0">
                      <th scope="row" className="px-4 py-4 align-top font-semibold text-white">{label}</th>
                      <td className="px-4 py-4 align-top leading-relaxed text-soft">{evidence}</td>
                      <td className="px-4 py-4 align-top leading-relaxed text-soft">{boundary}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-soft">
              Unknown release status, missing trial counts, unverified licenses, and unperformed tests remain explicit gaps.
              Metrics from different robots, objects, calibration, sampling rates, controllers, or task definitions are not a shared leaderboard.
            </p>
          </section>

          <section id="model-records" className="deferred-section mt-12 grid scroll-mt-28 gap-6 lg:grid-cols-[0.36fr_1fr]">
            <div>
              <p className="eyebrow">Model records</p>
              <h2 className="mt-4 text-3xl font-bold text-white">Compare the same questions</h2>
              <p className="mt-4 text-sm leading-relaxed text-soft">
                World-model and VLA records organize different architectures around a common set of questions.
                A future-state predictor, a high-level planner, and an action policy have different roles even when they share a model family.
              </p>
            </div>
            <div className="signal-panel p-6 md:p-8">
              <dl className="space-y-5">
                {modelFields.map(([label, detail]) => (
                  <div key={label}>
                    <dt className="font-semibold text-white">{label}</dt>
                    <dd className="mt-2 text-sm leading-relaxed text-soft">{detail}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-6 text-sm leading-relaxed text-soft">
                A record should say whether touch is observed during deployment, used only for training, or predicted by the model.
                A tactile training target alone does not establish live tactile feedback. A plausible predicted trajectory alone does not establish closed-loop robot success.
              </p>
              <div className="mt-6 flex flex-wrap gap-4 text-sm">
                <Link href="/robot-world-models" className="text-accent underline underline-offset-4">World-model evidence</Link>
                <Link href="/robot-vla-models" className="text-accent underline underline-offset-4">VLA evidence</Link>
                <Link href="/world-models/tracker" className="text-accent underline underline-offset-4">Dated tracker records</Link>
              </div>
            </div>
          </section>

          <section id="updates-and-corrections" className="deferred-section mt-12 grid scroll-mt-28 gap-6 lg:grid-cols-2">
            <div className="signal-panel p-6 md:p-8">
              <p className="eyebrow">Updates</p>
              <h2 className="mt-4 text-2xl font-semibold text-white">Change the record when the evidence changes</h2>
              <p className="mt-4 text-sm leading-relaxed text-soft">
                A revised paper, released artifact, changed license, or corrected interpretation can justify an update.
                Material factual changes receive a revised modified date and a short revision note in the affected article.
                Keep the scientific publication date and the source-review date distinct from the page modification date.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-soft">
                Typographic, layout, or navigation edits do not turn an unchanged source into newly reviewed research.
                A review date records the check described on that page; it does not promise that an external download or service is still available today.
              </p>
            </div>
            <div className="signal-panel p-6 md:p-8">
              <p className="eyebrow">Corrections</p>
              <h2 className="mt-4 text-2xl font-semibold text-white">Make a disputed claim easy to locate</h2>
              <p className="mt-4 text-sm leading-relaxed text-soft">
                Send the affected page URL, the exact statement or attribution, and a primary source with the relevant version,
                section, or result when available. Explain the proposed correction and the evidence supporting it.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-soft">
                {site.editorial.lead.name}, {site.editorial.lead.role}, is responsible for the publication standards and corrections process
                described in the editorial policy. A correction request does not by itself establish a new research finding or independent verification.
              </p>
              <Link href="/contact?requestType=research" className="btn-secondary mt-6">Submit a correction</Link>
            </div>
          </section>

          <section id="editorial-responsibility" className="deferred-section mt-12 max-w-4xl scroll-mt-28">
            <p className="eyebrow">Editorial responsibility</p>
            <h2 className="mt-4 text-3xl font-bold text-white">Keep attribution and independence visible</h2>
            <p className="mt-4 text-sm leading-relaxed text-soft">
              AI and automation may assist source organization, drafting, or explanatory illustrations. Technical claims still require
              the cited primary evidence. The editorial byline does not imply authorship of the scientific work, laboratory affiliation,
              expert peer review, or an independently reproduced experiment. Explanatory artwork is not a measurement.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-soft">
              RoboSkin.ai offers source-based research services. Paid work does not buy public editorial inclusion or change a source-supported
              conclusion. Material sponsorship, affiliate relationships, or other conflicts must be identified on affected content when present.
              The <Link href="/editorial-policy#independence" className="text-accent underline underline-offset-4">editorial policy</Link> retains the full independence and disclosure rules.
            </p>
          </section>
        </div>
      </article>
    </>
  );
}
