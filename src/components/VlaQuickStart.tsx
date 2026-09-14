import Link from 'next/link';
import type { RobotAiModelEntry } from '@/lib/robot-ai-models';

const startingPoints = [
  {
    id: 'openvla-7b',
    purpose: 'Explore an open VLA baseline',
    summary: 'OpenVLA maps images and instructions to robot actions. Its official project links model checkpoints and a training codebase; adapting it still requires a compatible robot interface and task data.',
    access: 'Project with code and model links',
    source: 'https://openvla.github.io/',
  },
  {
    id: 'unitacvla',
    purpose: 'Study tactile understanding and prediction',
    summary: 'UniTacVLA connects tactile reasoning and prediction with action correction. The linked repository currently contains a project-page placeholder, so it is a research reference with no runnable release there.',
    access: 'Repository placeholder',
    source: 'https://github.com/ZhangXD-666/UniTacVLA',
  },
  {
    id: 'vla-touch',
    purpose: 'Explore tactile planning and action refinement',
    summary: 'VLA-Touch adds tactile feedback to planning and a controller that refines VLA actions. Its README links code, data and controller checkpoints, but still lists the modified RDT inference script as coming soon.',
    access: 'Partial implementation and resource links',
    source: 'https://github.com/jxbi1010/VLA-Touch',
  },
];

export default function VlaQuickStart({ entries }: { entries: RobotAiModelEntry[] }) {
  return (
    <section id="vla-start" aria-labelledby="vla-start-title" className="scroll-mt-28 pb-14 md:pb-20">
      <div className="container-shell">
        <div className="grid gap-6 lg:grid-cols-[0.48fr_1fr]">
          <div>
            <p className="eyebrow">Start here</p>
            <h2 id="vla-start-title" className="mt-4 text-3xl font-bold text-white md:text-4xl">What is VLA in robotics?</h2>
          </div>
          <div>
            <p className="text-base leading-relaxed text-[#c8d1de]">
              VLA stands for vision-language-action. A VLA model takes a robot&apos;s visual observations and a language instruction
              and produces or conditions actions. The robot executes those actions and observes the result, closing the feedback loop.
            </p>
            <nav aria-label="VLA guide sections" className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-[#ffd5c5]">
              <a href="#vla-starting-points" className="underline underline-offset-4 hover:text-white">Model and code starting points</a>
              <a href="#vla-model-index" className="underline underline-offset-4 hover:text-white">Compare all {entries.length} models</a>
              <a href="#tactile-vla-integration-index" className="underline underline-offset-4 hover:text-white">Compare tactile mechanisms</a>
            </nav>
          </div>
        </div>

        <ol aria-label="How a VLA works" className="mt-7 grid gap-3 md:grid-cols-3">
          {[
            ['01 / Observe', 'Camera images and an instruction describe the scene and task. Some systems also use robot state or touch.'],
            ['02 / Predict an action', 'The policy produces action tokens, continuous commands or action chunks, depending on the model.'],
            ['03 / Execute and observe again', 'A robot controller executes the action. New observations let the system select or refine the next action.'],
          ].map(([label, description]) => (
            <li key={label} className="signal-panel p-5">
              <h3 className="font-mono text-sm font-semibold text-[#ffd5c5]">{label}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#c8d1de]">{description}</p>
            </li>
          ))}
        </ol>

        <div id="vla-starting-points" className="mt-10 scroll-mt-28">
          <h3 className="text-2xl font-semibold text-white">Model and code starting points</h3>
          <p className="mt-3 max-w-4xl text-sm leading-relaxed text-[#aeb8c7]">
            Choose by the work you want to do. These three examples cover a general VLA baseline and two tactile approaches;
            they are not a performance ranking. Linked project pages and repository release statements checked September 15, 2026.
            Checkpoints were not downloaded or run. Detailed evidence retains its own review dates below.
          </p>
          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            {startingPoints.map((point) => {
              const model = entries.find((entry) => entry.id === point.id);
              if (!model) throw new Error(`Missing VLA starting point: ${point.id}`);
              return (
                <article key={point.id} className="signal-panel flex min-w-0 flex-col p-6">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#aeb8c7]">{point.purpose}</p>
                  <h4 className="mt-3 text-xl font-semibold text-white">{model.name}</h4>
                  <p className="mt-4 text-sm leading-relaxed text-[#c8d1de]">{point.summary}</p>
                  <p className="mt-4 border-t border-white/10 pt-4 text-xs leading-relaxed text-[#ffd5c5]">{point.access}</p>
                  <div className="mt-auto flex flex-wrap gap-x-5 gap-y-3 pt-5 text-sm font-semibold text-[#ffd5c5]">
                    <a href={point.source} target="_blank" rel="noreferrer" aria-label={`${model.name} official source`} className="underline underline-offset-4 hover:text-white">Official source ↗</a>
                    <a href={`#vla-model-${point.id}`} className="underline underline-offset-4 hover:text-white">Compare evidence</a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <nav aria-label="Jump to a VLA model" className="mt-7 rounded-md border border-white/10 p-5">
          <p className="text-sm font-semibold text-white">Find a named model</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {entries.map((entry) => (
              <a key={entry.id} href={`#vla-model-${entry.id}`} className="rounded-md border border-white/15 px-3 py-2 text-sm text-[#c8d1de] hover:border-[#ff6b35]/50 hover:text-white">{entry.name}</a>
            ))}
          </div>
        </nav>
        <p className="mt-5 text-sm leading-relaxed text-[#aeb8c7]">
          Comparing broader model families? See the <Link href="/robot-foundation-models" className="font-semibold text-[#ffd5c5] underline underline-offset-4 hover:text-white">Robot AI Model Directory</Link>.
          {' '}For training data, use the <Link href="/robotics-datasets" className="font-semibold text-[#ffd5c5] underline underline-offset-4 hover:text-white">robotics dataset comparison</Link>.
        </p>
      </div>
    </section>
  );
}
