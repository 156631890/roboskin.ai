import Image from 'next/image';
import Link from 'next/link';

type ResearchUpdate = {
  topic: string;
  updated: string;
  papers: {
    id: string;
    name: string;
    title: string;
    published: string;
    status: string;
    summary: string;
    whyRead: string;
    method: string;
    evaluation: string;
    limitation: string;
    availability: string;
    sources: { label: string; url: string }[];
  }[];
};

const visuals = {
  vla: [
    {
      file: 'vla-observe-act-loop.svg',
      title: 'From an instruction to a robot action',
      alt: 'VLA architecture: camera observations and an instruction enter a policy that predicts actions; execution produces the next observation.',
      caption: 'A conceptual VLA loop: observations and an instruction condition actions, then fresh observations close the loop. Robot state and touch are optional, model-specific inputs.',
    },
    {
      file: 'vla-action-chunks.svg',
      title: 'Why action chunks need fresh feedback',
      alt: 'A planned action sequence with an executed prefix and a remaining suffix, updated after a new contact observation.',
      caption: 'An action chunk is a sequence of commands. Executing a shorter prefix and updating the remainder can incorporate new observations; the usable timing depends on the policy and controller.',
    },
  ],
  'world-models': [
    {
      file: 'world-model-planning-loop.svg',
      title: 'Predict, compare, execute, observe',
      alt: 'An action-conditioned world model predicts outcomes for two candidate actions; a planner chooses an action and receives fresh observations after execution.',
      caption: 'A planning example: candidate actions condition predicted futures, a planner compares them, and the robot executes a selected action. This is one use of a world model, not a required architecture for every model.',
    },
    {
      file: 'world-model-prediction-spaces.svg',
      title: 'Three ways to represent a predicted future',
      alt: 'Three prediction targets shown side by side: image observations, explicit robot or object state, and a compact learned latent representation.',
      caption: 'Video, explicit state and latent predictions answer different evaluation questions. A plausible image is not proof of accurate contact dynamics or successful robot control.',
    },
  ],
};

export default function ResearchReadingGuide({ update }: { update: ResearchUpdate }) {
  const isVla = update.topic === 'vla';
  const topic = isVla ? 'vla' : 'world-models';
  const heading = isVla ? 'VLA papers: architecture, efficiency and scaling' : 'World-model papers: surveys and robot manipulation';

  return (
    <section id={`${topic}-research-update`} aria-labelledby={`${topic}-research-title`} className="container-shell scroll-mt-28 pb-14 md:pb-20">
      <div className="flex flex-wrap items-end justify-between gap-5 border-t border-white/15 pt-10">
        <div className="max-w-3xl">
          <p className="eyebrow">Research reading room / October 2026</p>
          <h2 id={`${topic}-research-title`} className="mt-4 text-3xl font-semibold text-white md:text-4xl">{heading}</h2>
          <p className="mt-4 text-base leading-relaxed text-[#c8d1de]">
            {isVla
              ? 'Read these selected papers alongside the model index to understand action representations, deployment trade-offs and the limits of reported evaluations.'
              : 'Start with the surveys to map the field, then examine a concrete insertion study. Survey coverage, simulated control and physical robot evidence are different kinds of evidence.'}
          </p>
        </div>
        <Link href={isVla ? '/robot-world-models' : '/robot-vla-models'} className="text-sm font-semibold text-[#ffd5c5] underline underline-offset-4">
          {isVla ? 'Compare with world models →' : 'Compare with VLA policies →'}
        </Link>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {visuals[topic].map((visual) => (
          <figure key={visual.file} className="overflow-hidden rounded-lg border border-white/15 bg-[#080d15]">
            <a href={`/generated/research-guides/${visual.file}`} aria-label={`Open full-size diagram: ${visual.title}`} className="block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ff9e7b]">
              <Image src={`/generated/research-guides/${visual.file}`} alt={visual.alt} width={1200} height={720} sizes="(min-width: 1024px) 50vw, 100vw" className="h-auto w-full" />
            </a>
            <figcaption className="border-t border-white/10 p-5">
              <h3 className="text-lg font-semibold text-white">{visual.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#c8d1de]">{visual.caption}</p>
              <p className="mt-3 font-mono text-xs text-[#9caabc]">Original RoboSkin schematic · explanatory, not experimental data</p>
              <a href={`/generated/research-guides/${visual.file}`} className="mt-3 inline-block py-2 text-sm font-semibold text-[#ffd5c5] underline underline-offset-4">View full-size diagram ↗</a>
            </figcaption>
          </figure>
        ))}
      </div>

      <p className="mt-8 max-w-4xl text-sm leading-relaxed text-[#aeb9c9]">
        Sources checked <time dateTime={update.updated}>{update.updated}</time>. Selected reading, not an exhaustive ranking.
        Descriptions summarize the authors&apos; sources; RoboSkin has not reproduced these experiments.
        Dates below are first publication dates, not dates inferred from a paper identifier.
      </p>
      <div className="mt-5 grid items-start gap-5 xl:grid-cols-3">
        {update.papers.map((paper) => (
          <article key={paper.id} id={`reading-${paper.id}`} data-research-reading={paper.id} className="signal-panel min-w-0 scroll-mt-28 p-6">
            <p className="font-mono text-xs leading-relaxed text-[#ffb99f]">{paper.status}</p>
            <p className="mt-2 text-xs text-[#aeb9c9]">First published <time dateTime={paper.published}>{paper.published}</time></p>
            <h3 className="mt-4 text-2xl font-semibold text-white">{paper.name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#aeb9c9]">{paper.title}</p>
            <p className="mt-4 text-sm leading-relaxed text-[#e0e5ed]">{paper.summary}</p>
            <div className="mt-5 border-l-2 border-[#ff8d64] pl-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#ffb99f]">Read it for</p>
              <p className="mt-2 text-sm leading-relaxed text-[#c8d1de]">{paper.whyRead}</p>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-[#c8d1de]"><strong className="font-semibold text-white">Evidence boundary: </strong>{paper.limitation}</p>
            <details className="mt-5 border-y border-white/15 py-3">
              <summary className="cursor-pointer py-2 text-sm font-semibold text-[#ffd5c5] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ff9e7b]">Method, evaluation and access</summary>
              <dl className="mt-3 space-y-4 pb-3 text-sm leading-relaxed">
                {[
                  ['Method', paper.method],
                  ['Evaluation context', paper.evaluation],
                  ['Artifacts and access', paper.availability],
                ].map(([label, value]) => (
                  <div key={label}><dt className="font-semibold text-white">{label}</dt><dd className="mt-1 text-[#c8d1de]">{value}</dd></div>
                ))}
              </dl>
            </details>
            <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-[#ffd5c5]" aria-label={`${paper.name} primary sources`}>
              {paper.sources.map((source) => <li key={source.url}><a href={source.url} className="inline-block py-2 underline underline-offset-4 hover:text-white">{source.label} ↗</a></li>)}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
