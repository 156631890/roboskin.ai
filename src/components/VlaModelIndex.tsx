import Link from 'next/link';
import type { RobotAiModelEntry } from '@/lib/robot-ai-models';

type VlaModelIndexProps = {
  entries: RobotAiModelEntry[];
};

function sentenceCase(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export default function VlaModelIndex({ entries }: VlaModelIndexProps) {
  const tactileModels = entries.filter((entry) => entry.tactileInput === 'yes').length;

  return (
    <section id="vla-model-index" className="deferred-section pb-14 md:pb-20">
      <div className="container-shell">
        <div className="grid gap-6 lg:grid-cols-[0.48fr_1fr] lg:items-end">
          <div>
            <p className="eyebrow">Source-reviewed evidence index</p>
            <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">
              VLA interfaces, embodiments, access and touch
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-[#c8d1de]">
            This server-rendered index includes only records whose central model role is VLA. It does not rank unlike systems.
            Each row preserves the reported input and action interface, real-robot boundary, artifact status, and direct primary
            sources, while the full canonical entity remains in the Robot AI Model Directory.
          </p>
        </div>

        <dl className="mt-7 grid gap-3 sm:grid-cols-3">
          <div className="signal-panel p-4">
            <dt className="font-mono text-xl font-semibold text-white">{entries.length}</dt>
            <dd className="mt-1 text-xs uppercase tracking-[0.12em] text-[#8e98a8]">verified VLA records</dd>
          </div>
          <div className="signal-panel p-4">
            <dt className="font-mono text-xl font-semibold text-white">{tactileModels}</dt>
            <dd className="mt-1 text-xs uppercase tracking-[0.12em] text-[#8e98a8]">with verified tactile input</dd>
          </div>
          <div className="signal-panel p-4">
            <dt className="font-mono text-xl font-semibold text-white">Primary</dt>
            <dd className="mt-1 text-xs uppercase tracking-[0.12em] text-[#8e98a8]">source requirement</dd>
          </div>
        </dl>

        <div className="mt-6 overflow-x-auto rounded-md border border-white/10 bg-[#020408]" tabIndex={0}>
          <table className="w-full min-w-[1540px] border-collapse text-left text-sm">
            <caption className="sr-only">
              Source-reviewed robot vision-language-action models compared by release, interface, embodiment, real-robot evidence,
              training evidence, artifact access, tactile input, and primary sources.
            </caption>
            <thead className="border-b border-white/10 bg-white/[0.03]">
              <tr>
                {['Model / release', 'Inputs / action output', 'Verified embodiments', 'Real-robot evidence', 'Training / access / touch', 'Evidence boundary / sources'].map((header) => (
                  <th key={header} scope="col" className="px-4 py-3 font-mono text-xs font-semibold uppercase tracking-[0.1em] text-[#ffd5c5]">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr
                  key={entry.id}
                  id={`vla-model-${entry.id}`}
                  data-vla-model-record={entry.id}
                  className="border-b border-white/8 align-top last:border-b-0"
                >
                  <th scope="row" className="w-[220px] px-4 py-5">
                    <span className="block text-base font-semibold text-white">{entry.name}</span>
                    <span className="mt-2 block text-xs leading-relaxed text-[#aeb8c7]">{entry.organization}</span>
                    <time dateTime={entry.releaseDate} className="mt-3 block font-mono text-xs text-[#aeb8c7]">
                      {entry.releaseDate}
                    </time>
                    <Link
                      href={`/robot-foundation-models#model-${entry.id}`}
                      className="mt-4 inline-block font-semibold text-[#ffd5c5] underline decoration-white/25 underline-offset-4 hover:text-white"
                    >
                      Full evidence record
                    </Link>
                  </th>
                  <td className="w-[275px] px-4 py-5 leading-relaxed text-[#c8d1de]">
                    <strong className="text-white">Inputs:</strong> {entry.inputModalities.join('; ')}
                    <br />
                    <strong className="mt-3 inline-block text-white">Output:</strong> {entry.outputType}
                  </td>
                  <td className="w-[260px] px-4 py-5 leading-relaxed text-[#c8d1de]">
                    <ul className="space-y-2">
                      {entry.embodiments.map((embodiment) => <li key={embodiment}>{embodiment}</li>)}
                    </ul>
                  </td>
                  <td className="w-[260px] px-4 py-5 leading-relaxed text-[#c8d1de]">{entry.realRobotEvaluation}</td>
                  <td className="w-[250px] px-4 py-5 leading-relaxed text-[#c8d1de]">
                    <strong className="text-white">Training / data:</strong> {entry.trainingDataSummary}
                    <br />
                    <strong className="mt-3 inline-block text-white">Access:</strong> {entry.availability}
                    <br />
                    <strong className="mt-3 inline-block text-white">License:</strong> {entry.license}
                    <br />
                    <strong className="mt-3 inline-block text-white">Tactile input:</strong>{' '}
                    <span className="rounded-full border border-white/15 px-2 py-1 font-mono text-xs uppercase text-white">
                      {sentenceCase(entry.tactileInput)}
                    </span>
                  </td>
                  <td className="w-[335px] px-4 py-5 leading-relaxed text-[#c8d1de]">
                    {entry.evidenceLimitations}
                    <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                      {entry.primarySources.map((source) => (
                        <a
                          key={source.url}
                          href={source.url}
                          target="_blank"
                          rel="noreferrer"
                          className="font-semibold text-[#ffd5c5] underline decoration-white/25 underline-offset-4 hover:text-white"
                        >
                          {source.label} ↗
                        </a>
                      ))}
                    </div>
                    <span className="mt-4 block font-mono text-[11px] uppercase text-[#8e98a8]">
                      Reviewed {entry.sourceReviewed}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
