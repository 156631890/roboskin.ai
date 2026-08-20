'use client';

import { useMemo, useState } from 'react';
import type { TactileSensorEntry } from '@/lib/tactile-sensors';

type TactileSensorExplorerProps = {
  entries: TactileSensorEntry[];
};

function unique(values: string[]) {
  return [...new Set(values)].sort((left, right) => left.localeCompare(right));
}

export default function TactileSensorExplorer({ entries }: TactileSensorExplorerProps) {
  const [principle, setPrinciple] = useState('All sensing principles');
  const [signal, setSignal] = useState('All signals');
  const [formFactor, setFormFactor] = useState('All form factors');

  const principles = useMemo(() => unique(entries.map((entry) => entry.principle)), [entries]);
  const signals = useMemo(() => unique(entries.flatMap((entry) => entry.signals)), [entries]);
  const formFactors = useMemo(() => unique(entries.map((entry) => entry.formFactor)), [entries]);

  const filteredEntries = entries.filter((entry) =>
    (principle === 'All sensing principles' || entry.principle === principle)
    && (signal === 'All signals' || entry.signals.includes(signal))
    && (formFactor === 'All form factors' || entry.formFactor === formFactor),
  );

  function resetFilters() {
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
    <section className="research-data-explorer deferred-section pb-14 md:pb-20" aria-labelledby="sensor-explorer-heading">
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
            Source review: 2026-08-19 / {entries.length} records
          </p>
        </div>

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

        <div className="signal-panel mt-4 overflow-x-auto p-0">
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
                <tr key={entry.id} className="align-top text-[#c8d1de]">
                  <th scope="row" className="w-[220px] border-b border-white/8 px-4 py-5">
                    <span className="block text-base font-semibold text-white">{entry.name}</span>
                    <span className="mt-3 block text-xs leading-relaxed text-[#8e98a8]">{entry.organization}</span>
                    <span className="mt-2 block font-mono text-[11px] uppercase text-[#8e98a8]">Reviewed {entry.sourceReviewed}</span>
                  </th>
                  <td className="w-[230px] border-b border-white/8 px-4 py-5">{entry.principle}<br /><strong className="mt-3 inline-block text-white">Form:</strong> {entry.formFactor}</td>
                  <td className="w-[230px] border-b border-white/8 px-4 py-5">{entry.signals.join('; ')}</td>
                  <td className="w-[250px] border-b border-white/8 px-4 py-5"><strong className="text-white">Rate:</strong> {entry.reportedRate}<br /><strong className="mt-3 inline-block text-white">Integration:</strong> {entry.integration}</td>
                  <td className="w-[220px] border-b border-white/8 px-4 py-5">{entry.access}</td>
                  <td className="w-[260px] border-b border-white/8 px-4 py-5">{entry.evidenceBoundary}</td>
                  <td className="w-[170px] border-b border-white/8 px-4 py-5">
                    <div className="grid gap-2">
                      <a href={entry.sourceUrl} target="_blank" rel="noreferrer" className="font-semibold text-[#ffd5c5] hover:text-white">Primary source ↗</a>
                      {entry.projectUrl ? <a href={entry.projectUrl} target="_blank" rel="noreferrer" className="font-semibold text-[#ffd5c5] hover:text-white">Project ↗</a> : null}
                      {entry.codeUrl ? <a href={entry.codeUrl} target="_blank" rel="noreferrer" className="font-semibold text-[#ffd5c5] hover:text-white">Code ↗</a> : null}
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
