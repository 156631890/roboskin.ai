'use client';

import { useMemo, useState } from 'react';
import type { TactileBenchmarkEntry } from '@/lib/tactile-benchmarks';

type TactileBenchmarkExplorerProps = {
  entries: TactileBenchmarkEntry[];
};

function unique(values: string[]) {
  return [...new Set(values)].sort((left, right) => left.localeCompare(right));
}

export default function TactileBenchmarkExplorer({ entries }: TactileBenchmarkExplorerProps) {
  const [type, setType] = useState('All benchmark types');
  const [task, setTask] = useState('All tasks');
  const [sensor, setSensor] = useState('All sensors');
  const [year, setYear] = useState('All years');

  const types = useMemo(() => unique(entries.map((entry) => entry.benchmarkType)), [entries]);
  const tasks = useMemo(() => unique(entries.flatMap((entry) => entry.tasks)), [entries]);
  const sensors = useMemo(() => unique(entries.flatMap((entry) => entry.sensors)), [entries]);
  const years = useMemo(() => unique(entries.map((entry) => String(entry.year))).reverse(), [entries]);

  const filteredEntries = entries.filter((entry) =>
    (type === 'All benchmark types' || entry.benchmarkType === type)
    && (task === 'All tasks' || entry.tasks.includes(task))
    && (sensor === 'All sensors' || entry.sensors.includes(sensor))
    && (year === 'All years' || String(entry.year) === year),
  );

  function resetFilters() {
    setType('All benchmark types');
    setTask('All tasks');
    setSensor('All sensors');
    setYear('All years');
  }

  const filters = [
    { label: 'Benchmark type', value: type, setter: setType, all: 'All benchmark types', options: types },
    { label: 'Task', value: task, setter: setTask, all: 'All tasks', options: tasks },
    { label: 'Sensor', value: sensor, setter: setSensor, all: 'All sensors', options: sensors },
    { label: 'Year', value: year, setter: setYear, all: 'All years', options: years },
  ];

  return (
    <section className="deferred-section pb-14 md:pb-20" aria-labelledby="benchmark-explorer-heading">
      <div className="container-shell">
        <p className="eyebrow">Structured benchmark explorer</p>
        <div className="mt-4 grid gap-5 lg:grid-cols-[0.7fr_1fr] lg:items-end">
          <div>
            <h2 id="benchmark-explorer-heading" className="text-3xl font-bold text-white md:text-4xl">Compare tactile robotics benchmarks</h2>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#c8d1de]">
              These suites evaluate different sensors, modalities, robots, and outcomes. A score is comparable only when the task, split, hardware, metric, and benchmark version match.
            </p>
          </div>
          <p className="font-mono text-xs uppercase tracking-[0.12em] text-[#8e98a8] lg:text-right">
            Source review: 2026-08-19 / {entries.length} records
          </p>
        </div>

        <div className="mt-7 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
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
          Showing {filteredEntries.length} of {entries.length} benchmarks
        </p>

        <div className="signal-panel mt-4 overflow-x-auto p-0">
          <table className="w-full min-w-[1640px] border-collapse text-left text-sm">
            <thead className="bg-white/[0.03] text-xs uppercase text-[#8e98a8]">
              <tr>
                {['Benchmark', 'Type / year', 'Tasks', 'Modalities / hardware', 'Metrics / protocol', 'Access / evidence boundary', 'Primary links'].map((label) => (
                  <th key={label} scope="col" className="border-b border-white/10 px-4 py-3 font-semibold">{label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredEntries.map((entry) => (
                <tr key={entry.id} className="align-top text-[#c8d1de]">
                  <th scope="row" className="w-[220px] border-b border-white/8 px-4 py-5">
                    <span className="block text-base font-semibold text-white">{entry.name}</span>
                    <span className="mt-3 block text-xs leading-relaxed text-[#8e98a8]">{entry.institutions.join('; ')}</span>
                    <span className="mt-2 block font-mono text-[11px] uppercase text-[#8e98a8]">Reviewed {entry.sourceReviewed}</span>
                  </th>
                  <td className="w-[210px] border-b border-white/8 px-4 py-5">{entry.benchmarkType}<br /><span className="mt-3 block font-mono text-xs text-white">{entry.year}</span></td>
                  <td className="w-[250px] border-b border-white/8 px-4 py-5">{entry.tasks.join('; ')}</td>
                  <td className="w-[250px] border-b border-white/8 px-4 py-5"><strong className="text-white">Signals:</strong> {entry.modalities.join('; ')}<br /><strong className="mt-3 inline-block text-white">Sensors:</strong> {entry.sensors.join('; ')}<br /><strong className="mt-3 inline-block text-white">Robot:</strong> {entry.robots.join('; ')}</td>
                  <td className="w-[260px] border-b border-white/8 px-4 py-5">{entry.metrics.join('; ')}<br /><strong className="mt-3 inline-block text-white">Protocol:</strong> {entry.protocol}</td>
                  <td className="w-[270px] border-b border-white/8 px-4 py-5">{entry.access}<br /><strong className="mt-3 inline-block text-white">Boundary:</strong> {entry.limitation}</td>
                  <td className="w-[170px] border-b border-white/8 px-4 py-5">
                    <div className="grid gap-2">
                      <a href={entry.paperUrl} target="_blank" rel="noreferrer" className="font-semibold text-[#ffd5c5] hover:text-white">Paper ↗</a>
                      {entry.projectUrl ? <a href={entry.projectUrl} target="_blank" rel="noreferrer" className="font-semibold text-[#ffd5c5] hover:text-white">Project ↗</a> : null}
                      {entry.codeUrl ? <a href={entry.codeUrl} target="_blank" rel="noreferrer" className="font-semibold text-[#ffd5c5] hover:text-white">Code ↗</a> : null}
                    </div>
                  </td>
                </tr>
              ))}
              {filteredEntries.length === 0 ? (
                <tr><td colSpan={7} className="px-4 py-8 text-center text-sm text-[#8e98a8]">No benchmarks match these filters.</td></tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
