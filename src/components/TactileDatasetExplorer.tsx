'use client';

import { useMemo, useState } from 'react';
import type { RoboticsDatasetEntry } from '@/lib/robotics-datasets';

type TactileDatasetExplorerProps = {
  entries: RoboticsDatasetEntry[];
  eyebrow?: string;
  heading?: string;
  description?: string;
};

function unique(values: string[]) {
  return [...new Set(values)].sort((left, right) => left.localeCompare(right));
}

export default function TactileDatasetExplorer({
  entries,
  eyebrow = 'Structured dataset explorer',
  heading = 'Filter tactile robotics datasets',
  description = 'Every row separates reported facts from unavailable fields. “Not stated” means the reviewed primary source did not provide enough evidence to fill that field.',
}: TactileDatasetExplorerProps) {
  const [sensor, setSensor] = useState('All sensors');
  const [robot, setRobot] = useState('All robots');
  const [task, setTask] = useState('All tasks');
  const [modality, setModality] = useState('All modalities');
  const [year, setYear] = useState('All years');

  const sensors = useMemo(() => unique(entries.flatMap((entry) => entry.sensor)), [entries]);
  const robots = useMemo(() => unique(entries.flatMap((entry) => entry.robot)), [entries]);
  const tasks = useMemo(() => unique(entries.flatMap((entry) => entry.tasks)), [entries]);
  const modalities = useMemo(() => unique(entries.flatMap((entry) => entry.modalities)), [entries]);
  const years = useMemo(() => unique(entries.map((entry) => String(entry.year))).reverse(), [entries]);
  const latestReview = entries.reduce(
    (latest, entry) => entry.sourceReviewed > latest ? entry.sourceReviewed : latest,
    '',
  );

  const filteredEntries = entries.filter((entry) =>
    (sensor === 'All sensors' || entry.sensor.includes(sensor))
    && (robot === 'All robots' || entry.robot.includes(robot))
    && (task === 'All tasks' || entry.tasks.includes(task))
    && (modality === 'All modalities' || entry.modalities.includes(modality))
    && (year === 'All years' || String(entry.year) === year),
  );

  function resetFilters() {
    setSensor('All sensors');
    setRobot('All robots');
    setTask('All tasks');
    setModality('All modalities');
    setYear('All years');
  }

  const filters = [
    { label: 'Sensor', value: sensor, setter: setSensor, all: 'All sensors', options: sensors },
    { label: 'Robot / collection platform', value: robot, setter: setRobot, all: 'All robots', options: robots },
    { label: 'Task', value: task, setter: setTask, all: 'All tasks', options: tasks },
    { label: 'Modality', value: modality, setter: setModality, all: 'All modalities', options: modalities },
    { label: 'Year', value: year, setter: setYear, all: 'All years', options: years },
  ];

  return (
    <section className="research-data-explorer deferred-section pb-14 md:pb-20" aria-labelledby="dataset-explorer-heading">
      <div className="container-shell">
        <p className="eyebrow">{eyebrow}</p>
        <div className="mt-4 grid gap-5 lg:grid-cols-[0.7fr_1fr] lg:items-end">
          <div>
            <h2 id="dataset-explorer-heading" className="text-3xl font-bold text-white md:text-4xl">{heading}</h2>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#c8d1de]">
              {description}
            </p>
          </div>
          <p className="font-mono text-xs uppercase tracking-[0.12em] text-[#8e98a8] lg:text-right">
            Source review: {latestReview} / {entries.length} records
          </p>
        </div>

        <div className="mt-7 grid gap-3 md:grid-cols-2 xl:grid-cols-6">
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
          Showing {filteredEntries.length} of {entries.length} datasets
        </p>

        <div className="signal-panel mt-4 overflow-x-auto p-0">
          <table className="w-full min-w-[1560px] border-collapse text-left text-sm">
            <thead className="bg-white/[0.03] text-xs uppercase text-[#8e98a8]">
              <tr>
                {['Dataset', 'Institution / year', 'Robot / sensor', 'Modalities / scale', 'Tasks / objects', 'Format / license', 'Primary links'].map((label) => (
                  <th key={label} scope="col" className="border-b border-white/10 px-4 py-3 font-semibold">{label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredEntries.map((entry) => (
                <tr id={`dataset-${entry.id}`} key={entry.id} className="scroll-mt-24 align-top text-[#c8d1de]">
                  <th scope="row" className="w-[240px] border-b border-white/8 px-4 py-5">
                    <span className="block text-base font-semibold text-white">{entry.name}</span>
                    <span className="mt-3 block text-xs leading-relaxed text-[#8e98a8]">{entry.availability}</span>
                    <span className="mt-2 block font-mono text-[11px] uppercase text-[#8e98a8]">Reviewed {entry.sourceReviewed}</span>
                  </th>
                  <td className="w-[230px] border-b border-white/8 px-4 py-5">{entry.institution.join('; ')}<br /><span className="mt-2 block font-mono text-xs text-white">{entry.year}</span></td>
                  <td className="w-[230px] border-b border-white/8 px-4 py-5"><strong className="text-white">Robot:</strong> {entry.robot.join('; ')}<br /><strong className="mt-3 inline-block text-white">Sensor:</strong> {entry.sensor.join('; ')}</td>
                  <td className="w-[230px] border-b border-white/8 px-4 py-5">{entry.modalities.join('; ')}<br /><strong className="mt-3 inline-block text-white">Scale:</strong> {entry.sampleCount}</td>
                  <td className="w-[250px] border-b border-white/8 px-4 py-5">{entry.tasks.join('; ')}<br /><strong className="mt-3 inline-block text-white">Objects:</strong> {entry.objectCategories}</td>
                  <td className="w-[250px] border-b border-white/8 px-4 py-5">{entry.dataFormat}<br /><strong className="mt-3 inline-block text-white">License:</strong> {entry.license}</td>
                  <td className="w-[180px] border-b border-white/8 px-4 py-5">
                    <div className="grid gap-2">
                      <a href={entry.paperUrl} target="_blank" rel="noreferrer" className="font-semibold text-[#ffd5c5] hover:text-white">Paper ↗</a>
                      {entry.projectUrl ? <a href={entry.projectUrl} target="_blank" rel="noreferrer" className="font-semibold text-[#ffd5c5] hover:text-white">Project ↗</a> : null}
                      {entry.datasetUrl ? <a href={entry.datasetUrl} target="_blank" rel="noreferrer" className="font-semibold text-[#ffd5c5] hover:text-white">Dataset ↗</a> : null}
                      {entry.githubUrl ? <a href={entry.githubUrl} target="_blank" rel="noreferrer" className="font-semibold text-[#ffd5c5] hover:text-white">GitHub ↗</a> : null}
                    </div>
                  </td>
                </tr>
              ))}
              {filteredEntries.length === 0 ? (
                <tr><td colSpan={7} className="px-4 py-8 text-center text-sm text-[#8e98a8]">No datasets match these filters.</td></tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
