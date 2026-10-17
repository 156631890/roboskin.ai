'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import type { TactileSensorEntry } from '@/lib/tactile-sensors';
import { sensorTasks } from '@/lib/sensor-selection';

type TactileSensorExplorerProps = {
  entries: TactileSensorEntry[];
  organizationLinks?: Record<string, string>;
  detailLinks?: Record<string, string>;
};

function unique(values: string[]) {
  return [...new Set(values)].sort((left, right) => left.localeCompare(right));
}

export default function TactileSensorExplorer({ entries, organizationLinks = {}, detailLinks = {} }: TactileSensorExplorerProps) {
  const [principle, setPrinciple] = useState('All sensing principles');
  const [signal, setSignal] = useState('All signals');
  const [formFactor, setFormFactor] = useState('All form factors');
  const [taskId, setTaskId] = useState('all');
  const activeTask = sensorTasks.find((task) => task.id === taskId);

  const principles = useMemo(() => unique(entries.map((entry) => entry.principle)), [entries]);
  const signals = useMemo(() => unique(entries.flatMap((entry) => entry.signals)), [entries]);
  const formFactors = useMemo(() => unique(entries.map((entry) => entry.formFactor)), [entries]);
  const latestReview = entries.reduce((latest, entry) => entry.sourceReviewed > latest ? entry.sourceReviewed : latest, '');

  const filteredEntries = entries.filter((entry) =>
    (!activeTask || activeTask.candidates.some((candidate) => candidate.id === entry.id))
    && (principle === 'All sensing principles' || entry.principle === principle)
    && (signal === 'All signals' || entry.signals.includes(signal))
    && (formFactor === 'All form factors' || entry.formFactor === formFactor),
  );

  function resetFilters() {
    setTaskId('all');
    setPrinciple('All sensing principles');
    setSignal('All signals');
    setFormFactor('All form factors');
  }

  const filters = [
    { label: 'Sensing principle', value: principle, setter: setPrinciple, all: 'All sensing principles', options: principles },
    { label: 'Reported signal', value: signal, setter: setSignal, all: 'All signals', options: signals },
    { label: 'Form factor', value: formFactor, setter: setFormFactor, all: 'All form factors', options: formFactors },
  ];

  return (
    <section className="research-data-explorer pb-14 md:pb-20" aria-labelledby="sensor-explorer-heading">
      <div className="container-shell">
        <p className="eyebrow">Structured sensor explorer</p>
        <div className="mt-4 grid gap-5 lg:grid-cols-[0.7fr_1fr] lg:items-end">
          <div>
            <h2 id="sensor-explorer-heading" className="text-3xl font-bold text-white md:text-4xl">Compare tactile sensors for robots</h2>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#c8d1de]">
              This directory separates the physical transduction principle, raw signal, form factor, integration path, and evidence boundary. Family-level specifications are not copied onto every model.
            </p>
          </div>
          <p className="font-mono text-xs uppercase tracking-[0.12em] text-[#8e98a8] lg:text-right">
            Latest source review: {latestReview} / {entries.length} records
          </p>
        </div>

        <section id="task-selector" className="signal-panel mt-7 scroll-mt-24 p-5 md:p-7" aria-labelledby="task-selection-heading">
          <h3 id="task-selection-heading" className="text-2xl font-semibold text-white">Start with the task, then compare the evidence</h3>
          <p className="mt-3 text-sm leading-relaxed text-soft">Editorial selection guidance, updated 2026-10-17. Candidate lists route you to documented sensing approaches; they are not exhaustive or ordered by performance. Individual source-review dates remain in the records below.</p>
          <label className="mt-5 grid gap-2 text-sm font-semibold text-white">Your task
            <select value={taskId} onChange={(event) => { resetFilters(); setTaskId(event.target.value); }} className="min-h-11 w-full rounded-md border border-white/10 bg-[#020408] px-3 text-sm text-white">
              <option value="all">All tasks — show evaluation plans</option>
              {sensorTasks.map((task) => <option value={task.id} key={task.id}>{task.label}</option>)}
            </select>
          </label>
          <div className={`mt-6 grid gap-6 ${activeTask ? '' : 'lg:grid-cols-3'}`}>
            {(activeTask ? [activeTask] : sensorTasks).map((task) => <article key={task.id} className="min-w-0 border-t border-white/10 pt-5 text-sm leading-relaxed text-soft">
              <h4 className="text-lg font-semibold text-white">{task.label}</h4>
              <p className="mt-3">{task.question}</p>
              <ul className="mt-4 space-y-3">{task.candidates.map((candidate) => {
                const entry = entries.find((item) => item.id === candidate.id);
                return entry ? <li key={entry.id}><a href={`#sensor-${entry.id}`} onClick={() => { resetFilters(); setTaskId(taskId); }} className="font-semibold text-accent underline">{entry.name}</a>: {candidate.reason} <a href={entry.sourceUrl} target="_blank" rel="noreferrer" className="underline">Source ↗</a></li> : null;
              })}</ul>
              <dl className="mt-5 space-y-4">
                <div><dt className="font-semibold text-white">Measure for this task</dt><dd>{task.measure}</dd></div>
                <div><dt className="font-semibold text-white">Conditions to match</dt><dd>{task.match}</dd></div>
                <div><dt className="font-semibold text-white">Comparison limit</dt><dd>{task.boundary}</dd></div>
              </dl>
            </article>)}
          </div>
          <a href="/resources/tactile-sensor-evaluation-template.csv" download className="btn-secondary mt-6 inline-flex">Download task evaluation template</a>
        </section>

        <div className="mt-7 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {filters.map((filter) => (
            <label key={filter.label} className="grid gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-[#8e98a8]">
              {filter.label}
              <select
                value={filter.value}
                onChange={(event) => filter.setter(event.target.value)}
                className="min-h-11 rounded-md border border-white/10 bg-[#020408] px-3 text-sm normal-case tracking-normal text-white"
              >
                <option>{filter.all}</option>
                {filter.options.map((option) => <option key={option}>{option}</option>)}
              </select>
            </label>
          ))}
          <button type="button" onClick={resetFilters} className="btn-secondary min-h-11 self-end">Reset filters</button>
        </div>

        <p className="mt-5 font-mono text-xs uppercase text-[#8e98a8]" aria-live="polite">
          Showing {filteredEntries.length} of {entries.length} sensors
        </p>

        <p className="mt-4 text-sm leading-relaxed text-soft">Keep source-reported specifications beside their conditions. Values from different test setups are not a leaderboard.</p>
        <div className="signal-panel mt-4 overflow-x-auto p-0" role="region" aria-label="Sensor results table" tabIndex={0}>
          <table className="w-full min-w-[1540px] border-collapse text-left text-sm">
            <thead className="bg-white/[0.03] text-xs uppercase text-[#8e98a8]">
              <tr>
                {['Sensor', 'Principle / form factor', 'Reported signals', 'Rate / integration', 'Access', 'Evidence boundary', 'Primary links'].map((label) => (
                  <th key={label} scope="col" className="border-b border-white/10 px-4 py-3 font-semibold">{label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredEntries.map((entry) => (
                <tr id={`sensor-${entry.id}`} key={entry.id} className="scroll-mt-24 align-top text-[#c8d1de]">
                  <th scope="row" className="w-[220px] border-b border-white/8 px-4 py-5">
                    <span className="block text-base font-semibold text-white">{entry.name}</span>
                    {detailLinks[entry.id] ? (
                      <Link href={detailLinks[entry.id]} className="mt-2 block text-sm font-semibold text-[#ffd5c5] underline underline-offset-4">
                        Read sensor guide
                      </Link>
                    ) : null}
                    {organizationLinks[entry.id] ? (
                      <a
                        href={organizationLinks[entry.id]}
                        className="mt-3 block text-xs font-semibold leading-relaxed text-[#ffd5c5] hover:text-white"
                      >
                        {entry.organization}
                      </a>
                    ) : (
                      <span className="mt-3 block text-xs leading-relaxed text-[#8e98a8]">{entry.organization}</span>
                    )}
                    <span className="mt-2 block font-mono text-[11px] uppercase text-[#8e98a8]">Reviewed {entry.sourceReviewed}</span>
                  </th>
                  <td className="w-[230px] border-b border-white/8 px-4 py-5">{entry.principle}<br /><strong className="mt-3 inline-block text-white">Form:</strong> {entry.formFactor}</td>
                  <td className="w-[230px] border-b border-white/8 px-4 py-5">{entry.signals.join('; ')}</td>
                  <td className="w-[250px] border-b border-white/8 px-4 py-5"><strong className="text-white">Rate:</strong> {entry.reportedRate}<br /><strong className="mt-3 inline-block text-white">Integration:</strong> {entry.integration}</td>
                  <td className="w-[220px] border-b border-white/8 px-4 py-5">{entry.access}</td>
                  <td className="w-[260px] border-b border-white/8 px-4 py-5">{entry.evidenceBoundary}</td>
                  <td className="w-[170px] border-b border-white/8 px-4 py-5">
                    <div className="grid gap-2">
                      {entry.researchUrl ? <Link href={entry.researchUrl} className="font-semibold text-white hover:text-[#ffd5c5]">RoboSkin evidence review</Link> : null}
                      <a href={entry.sourceUrl} target="_blank" rel="noreferrer" className="font-semibold text-[#ffd5c5] hover:text-white">Primary source ↗</a>
                      {entry.projectUrl ? <a href={entry.projectUrl} target="_blank" rel="noreferrer" className="font-semibold text-[#ffd5c5] hover:text-white">Project ↗</a> : null}
                      {entry.codeUrl ? <a href={entry.codeUrl} target="_blank" rel="noreferrer" className="font-semibold text-[#ffd5c5] hover:text-white">Code ↗</a> : null}
                      {entry.manufacturerEvidenceUrl ? <a href={entry.manufacturerEvidenceUrl} target="_blank" rel="noreferrer" className="font-semibold text-[#ffd5c5] hover:text-white">Manufacturer evidence ↗</a> : null}
                    </div>
                  </td>
                </tr>
              ))}
              {filteredEntries.length === 0 ? (
                <tr><td colSpan={7} className="px-4 py-8 text-center text-sm text-[#8e98a8]">No sensors match these filters.</td></tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
