import Link from 'next/link';
import type { RobotWorldModelEvidenceEntry } from '@/lib/robot-world-models';

type RobotWorldModelEvidenceTableProps = {
  entries: RobotWorldModelEvidenceEntry[];
};

function sentenceCase(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export default function RobotWorldModelEvidenceTable({ entries }: RobotWorldModelEvidenceTableProps) {
  const latestReview = entries.reduce(
    (latest, entry) => entry.sourceReviewed > latest ? entry.sourceReviewed : latest,
    '',
  );
  const conditioningKinds = new Set(entries.map((entry) => entry.actionConditioning.kind)).size;

  return (
    <section
      id="world-model-evidence"
      className="research-data-explorer deferred-section scroll-mt-24 pb-14 md:pb-20"
      aria-labelledby="world-model-evidence-heading"
    >
      <div className="container-shell">
        <p className="eyebrow">Source-bounded evidence center</p>
        <div className="mt-4 grid gap-6 lg:grid-cols-[0.78fr_1fr] lg:items-end">
          <div>
            <h2 id="world-model-evidence-heading" className="text-3xl font-bold text-white md:text-4xl">
              Compare tactile robot world models by what they actually do
            </h2>
            <p className="mt-4 max-w-4xl text-sm leading-relaxed text-[#d8dce4]">
              This is not a leaderboard. The records separate candidate-conditioned prediction, joint action-and-future
              generation, and subtask-conditioned tactile goals, then preserve each paper&apos;s robot, sensor, task,
              trial, artifact, and transfer boundary. Percentages from unlike protocols are not directly comparable.
            </p>
          </div>
          <dl className="grid gap-3 sm:grid-cols-3">
            <div className="signal-panel p-4">
              <dt className="font-mono text-lg font-semibold text-white">{entries.length}</dt>
              <dd className="mt-1 text-xs uppercase tracking-[0.12em] text-[#aeb8c7]">evidence records</dd>
            </div>
            <div className="signal-panel p-4">
              <dt className="font-mono text-lg font-semibold text-white">{conditioningKinds}</dt>
              <dd className="mt-1 text-xs uppercase tracking-[0.12em] text-[#aeb8c7]">conditioning roles</dd>
            </div>
            <div className="signal-panel p-4">
              <dt className="font-mono text-sm font-semibold text-white">{latestReview}</dt>
              <dd className="mt-1 text-xs uppercase tracking-[0.12em] text-[#aeb8c7]">latest review</dd>
            </div>
          </dl>
        </div>

        <div
          className="signal-panel mt-7 overflow-x-auto p-0"
          tabIndex={0}
          aria-label="Robot world model evidence comparison"
        >
          <table className="w-full border-collapse text-left text-sm lg:min-w-[1980px]">
            <caption className="sr-only">
              Robot world models compared by prediction target, action conditioning, operational role, robot and sensor
              boundary, real-robot evidence, artifact availability, evidence status, limitations, and primary sources.
            </caption>
            <thead className="hidden bg-white/[0.03] text-xs uppercase text-[#aeb8c7] lg:table-header-group">
              <tr>
                {[
                  'Model',
                  'Prediction / conditioning',
                  'Operational role',
                  'Robot / sensor / tasks',
                  'Real-robot evidence',
                  'Artifacts / license',
                  'Evidence boundary / sources',
                ].map((label) => (
                  <th key={label} scope="col" className="border-b border-white/10 px-4 py-3 font-semibold">
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="grid gap-4 p-3 lg:table-row-group lg:p-0">
              {entries.map((entry) => (
                <tr
                  id={`world-model-${entry.id}`}
                  key={entry.id}
                  className="scroll-mt-24 block overflow-hidden rounded-md border border-white/10 align-top text-[#d8dce4] lg:table-row lg:rounded-none lg:border-0"
                >
                  <th
                    scope="row"
                    className="block w-full border-b border-white/10 bg-white/[0.03] px-4 py-5 text-left lg:table-cell lg:w-[210px] lg:bg-transparent"
                  >
                    <Link href={entry.internalEvidencePath} className="text-base font-semibold text-white underline decoration-white/25 underline-offset-4 hover:text-[#ffd5c5]">
                      {entry.name}
                    </Link>
                    <span className="mt-3 block rounded-full border border-[#ff6b3d]/25 bg-[#ff6b3d]/8 px-2 py-1 font-mono text-[11px] uppercase leading-relaxed text-[#ffd5c5]">
                      {entry.evidenceStatus}
                    </span>
                    <time dateTime={entry.releaseDate} className="mt-3 block font-mono text-[11px] uppercase text-[#aeb8c7]">
                      Preprint {entry.releaseDate}
                    </time>
                    <span className="mt-1 block font-mono text-[11px] uppercase text-[#aeb8c7]">
                      Reviewed {entry.sourceReviewed}
                    </span>
                  </th>

                  <td className="block w-full border-b border-white/10 px-4 py-5 leading-relaxed lg:table-cell lg:w-[300px]">
                    <span className="mb-3 block font-mono text-[11px] uppercase tracking-[0.1em] text-[#aeb8c7] lg:hidden">
                      Prediction / conditioning
                    </span>
                    <strong className="text-white">Target:</strong> {entry.predictionTarget}
                    <br />
                    <strong className="mt-3 inline-block text-white">Conditioning class:</strong>{' '}
                    <span className="font-mono text-xs text-[#ffd5c5]">{sentenceCase(entry.actionConditioning.kind)}</span>
                    <br />
                    <span className="mt-2 inline-block">{entry.actionConditioning.description}</span>
                  </td>

                  <td className="block w-full border-b border-white/10 px-4 py-5 leading-relaxed lg:table-cell lg:w-[250px]">
                    <span className="mb-3 block font-mono text-[11px] uppercase tracking-[0.1em] text-[#aeb8c7] lg:hidden">
                      Operational role
                    </span>
                    {entry.operationalRole}
                  </td>

                  <td className="block w-full border-b border-white/10 px-4 py-5 leading-relaxed lg:table-cell lg:w-[310px]">
                    <span className="mb-3 block font-mono text-[11px] uppercase tracking-[0.1em] text-[#aeb8c7] lg:hidden">
                      Robot / sensor / tasks
                    </span>
                    {entry.robotSensorTaskBoundary}
                  </td>

                  <td className="block w-full border-b border-white/10 px-4 py-5 leading-relaxed lg:table-cell lg:w-[270px]">
                    <span className="mb-3 block font-mono text-[11px] uppercase tracking-[0.1em] text-[#aeb8c7] lg:hidden">
                      Real-robot evidence
                    </span>
                    {entry.realRobotEvidence}
                  </td>

                  <td className="block w-full border-b border-white/10 px-4 py-5 leading-relaxed lg:table-cell lg:w-[300px]">
                    <span className="mb-3 block font-mono text-[11px] uppercase tracking-[0.1em] text-[#aeb8c7] lg:hidden">
                      Artifacts / license
                    </span>
                    <dl className="space-y-3">
                      {Object.entries(entry.artifacts).map(([label, value]) => (
                        <div key={label}>
                          <dt className="font-semibold capitalize text-white">{label}</dt>
                          <dd className="mt-1 text-[#c8d1de]">{value}</dd>
                        </div>
                      ))}
                    </dl>
                  </td>

                  <td className="block w-full px-4 py-5 leading-relaxed lg:table-cell lg:w-[340px] lg:border-b lg:border-white/10">
                    <span className="mb-3 block font-mono text-[11px] uppercase tracking-[0.1em] text-[#aeb8c7] lg:hidden">
                      Evidence boundary / sources
                    </span>
                    {entry.limitations}
                    <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                      <Link href={entry.internalEvidencePath} className="font-semibold text-[#ffd5c5] underline decoration-white/25 underline-offset-4 hover:text-white">
                        RoboSkin analysis →
                      </Link>
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-xs leading-relaxed text-[#aeb8c7]">
          “Not verified” means the reviewed paper, official project page, and official repository did not expose a
          reusable artifact on the review date. It does not prove that an artifact cannot exist elsewhere or be released later.
        </p>
      </div>
    </section>
  );
}
