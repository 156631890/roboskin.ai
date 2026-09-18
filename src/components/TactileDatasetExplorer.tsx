'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo, useRef, useState } from 'react';
import { track } from '@vercel/analytics';
import { buildDatasetCitation, buildDatasetCsv, buildOriginalDatasetReference, matchesDatasetQuery } from '@/lib/dataset-tools.mjs';
import { accessLabels, getDatasetEvidence } from '@/lib/dataset-evidence.mjs';
import type { RoboticsDatasetEntry } from '@/lib/robotics-datasets';

type TactileDatasetExplorerProps = {
  entries: RoboticsDatasetEntry[];
  eyebrow?: string;
  heading?: string;
  description?: string;
  useCases?: { label: string; ids: string[] }[];
};

function unique(values: string[]) {
  return [...new Set(values)].sort((left, right) => left.localeCompare(right));
}

export default function TactileDatasetExplorer({
  entries,
  eyebrow = 'Structured dataset explorer',
  heading = 'Filter tactile robotics datasets',
  description = 'Every row separates reported facts from unavailable fields. “Not stated” means the reviewed primary source did not provide enough evidence to fill that field.',
  useCases,
}: TactileDatasetExplorerProps) {
  const pathname = usePathname();
  const searchRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const [useCase, setUseCase] = useState('All uses');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [feedback, setFeedback] = useState('');
  const [copyFallback, setCopyFallback] = useState('');
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

  const activeUseCase = useCases?.find((item) => item.label === useCase);
  const selectedEntries = selectedIds.map((id) => entries.find((entry) => entry.id === id)).filter(Boolean);
  const filteredEntries = entries.filter((entry) =>
    matchesDatasetQuery(entry, query)
    && (!activeUseCase || activeUseCase.ids.includes(entry.id))
    && (sensor === 'All sensors' || entry.sensor.includes(sensor))
    && (robot === 'All robots' || entry.robot.includes(robot))
    && (task === 'All tasks' || entry.tasks.includes(task))
    && (modality === 'All modalities' || entry.modalities.includes(modality))
    && (year === 'All years' || String(entry.year) === year),
  );

  function resetFilters() {
    setQuery('');
    setUseCase('All uses');
    setSensor('All sensors');
    setRobot('All robots');
    setTask('All tasks');
    setModality('All modalities');
    setYear('All years');
    searchRef.current?.focus();
    track('Dataset Filter', { path: pathname, filter: 'reset', value: 'all' });
  }

  function toggleCompare(id: string) {
    const removing = selectedIds.includes(id);
    if (!removing && selectedIds.length >= 3) return;
    setSelectedIds((current) => removing ? current.filter((item) => item !== id) : [...current, id]);
    track('Dataset Compare', { path: pathname, dataset: id, action: removing ? 'remove' : 'add' });
  }

  function exportCsv(rows: RoboticsDatasetEntry[], scope: 'results' | 'comparison') {
    const url = URL.createObjectURL(new Blob([buildDatasetCsv(rows, pathname)], { type: 'text/csv;charset=utf-8;' }));
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `roboskin-${pathname.slice(1)}-${scope}.csv`;
    anchor.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    setFeedback(`CSV prepared for ${rows.length} datasets. It contains directory records, not the underlying research data.`);
    track('Dataset CSV Requested', { path: pathname, scope, record_count: rows.length });
  }

  async function copyCitation(entry: RoboticsDatasetEntry, original = false) {
    const text = original ? buildOriginalDatasetReference(entry) : buildDatasetCitation(entry, pathname);
    try {
      await navigator.clipboard.writeText(text);
      setCopyFallback('');
      setFeedback(`${original ? 'Original-source reference' : 'Directory citation'} copied for ${entry.name}.`);
      track('Dataset Citation Copy', { path: pathname, dataset: entry.id, citation_type: original ? 'original-source' : 'directory' });
    } catch {
      setCopyFallback(text);
      setFeedback('Clipboard access is unavailable. Select and copy the citation below.');
    }
  }

  const filters = [
    { label: 'Sensor', value: sensor, setter: setSensor, all: 'All sensors', options: sensors },
    { label: 'Robot / collection platform', value: robot, setter: setRobot, all: 'All robots', options: robots },
    { label: 'Task', value: task, setter: setTask, all: 'All tasks', options: tasks },
    { label: 'Modality', value: modality, setter: setModality, all: 'All modalities', options: modalities },
    { label: 'Year', value: year, setter: setYear, all: 'All years', options: years },
  ];

  return (
    <section id="dataset-explorer" className="research-data-explorer scroll-mt-24 pb-14 md:pb-20" aria-labelledby="dataset-explorer-heading">
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
            Latest record review: {latestReview} / {entries.length} records
          </p>
        </div>

        {pathname === '/datasets' ? <div className="mt-5 flex flex-wrap gap-5 text-sm underline"><a href="#availability-analysis">Read the availability analysis</a><a href="#dataset-changelog">What changed in this directory</a><a href="/datasets.json">Open full audit JSON</a></div> : null}
        {pathname === '/datasets' ? <p className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[#c8d1de]" aria-label="Follow or discuss dataset research"><a className="underline" href="#newsletter">Weekly brief / signup status</a><a className="underline" href="/reports/tactile-ai-robot-skin-landscape-2026">Free sample report</a><a className="underline" href="/research-services?source=datasets#inquiry">Discuss a dataset research question</a></p> : null}
        <div className="signal-panel mt-7 grid gap-5 p-5 md:grid-cols-[1fr_auto] md:items-end">
          <label className="grid gap-2 text-sm font-semibold text-white">
            Search datasets
            <input ref={searchRef} type="search" value={query} placeholder="Try DIGIT, material, or EgoTouch"
              onChange={(event) => setQuery(event.target.value)}
              onBlur={() => { if (query.trim()) track('Dataset Search', { path: pathname, result_count: filteredEntries.length }); }}
              className="min-h-11 w-full rounded-md border border-white/10 bg-[#020408] px-3 text-base text-white" />
          </label>
          <a href="/resources/tactile-dataset-selection-checklist.csv" download className="btn-secondary text-center">Download selection checklist</a>
          {useCases?.length ? (
            <label className="grid gap-2 text-sm font-semibold text-white md:col-span-2">
              Start with a research use
              <select value={useCase} onChange={(event) => {
                setUseCase(event.target.value);
                track('Dataset Filter', { path: pathname, filter: 'use', value: event.target.value });
              }} className="min-h-11 rounded-md border border-white/10 bg-[#020408] px-3 text-sm text-white">
                <option>All uses</option>
                {useCases.map((item) => <option key={item.label}>{item.label}</option>)}
              </select>
              <span className="text-xs font-normal leading-relaxed text-[#8e98a8]">These starting points reflect the recorded collection setup and tasks, not a ranking or a guarantee of hardware compatibility.</span>
            </label>
          ) : null}
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-6">
          {filters.map((filter) => (
            <label key={filter.label} className="grid min-w-0 gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-[#8e98a8]">
              {filter.label}
              <select
                value={filter.value}
                onChange={(event) => {
                  filter.setter(event.target.value);
                  track('Dataset Filter', { path: pathname, filter: filter.label, value: event.target.value.slice(0, 200) });
                }}
                className="min-h-11 w-full min-w-0 rounded-md border border-white/10 bg-[#020408] px-3 text-sm normal-case tracking-normal text-white"
              >
                <option>{filter.all}</option>
                {filter.options.map((option) => <option key={option}>{option}</option>)}
              </select>
            </label>
          ))}
          <button type="button" onClick={resetFilters} className="btn-secondary min-h-11 self-end">Reset filters</button>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <p className="font-mono text-xs uppercase text-[#8e98a8]" aria-live="polite">
            Showing {filteredEntries.length} of {entries.length} datasets
          </p>
          <button type="button" disabled={!filteredEntries.length} onClick={() => exportCsv(filteredEntries, 'results')}
            className="btn-secondary disabled:cursor-not-allowed disabled:opacity-40">Export results as CSV</button>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-[#8e98a8]">Select up to three records to compare. Your selection stays when filters change. Exports preserve access, license and source-review notes; they do not redistribute dataset files.</p>
        <p role="status" className="mt-3 text-sm text-[#ffd5c5]">{feedback}</p>
        {copyFallback ? <label className="mt-3 grid gap-2 text-sm text-white">Citation to copy
          <textarea readOnly value={copyFallback} rows={5} onFocus={(event) => event.target.select()}
            className="w-full rounded-md border border-white/10 bg-[#020408] p-3 text-sm" />
        </label> : null}

        {selectedEntries.length ? (
          <section className="signal-panel mt-5 p-5" aria-labelledby="dataset-comparison-heading">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 id="dataset-comparison-heading" className="text-xl font-semibold text-white">Your comparison ({selectedEntries.length}/3)</h3>
              <div className="flex flex-wrap gap-3">
                <button type="button" onClick={() => exportCsv(selectedEntries, 'comparison')} className="btn-secondary">Export comparison</button>
                <button type="button" onClick={() => { setSelectedIds([]); track('Dataset Compare', { path: pathname, action: 'clear' }); }} className="text-sm text-[#c8d1de] underline">Clear selection</button>
              </div>
            </div>
            <div className="mt-5 grid gap-5 lg:grid-cols-3">
              {selectedEntries.map((entry) => (
                <article key={entry.id} className="min-w-0 border-t border-white/10 pt-4 text-sm leading-relaxed text-[#c8d1de]">
                  <h4 className="text-lg font-semibold text-white">{entry.name}</h4>
                  <dl className="mt-4 space-y-3">
                    <div><dt className="font-semibold text-white">Collection setup</dt><dd>{entry.robot.join('; ')} / {entry.sensor.join('; ')}</dd></div>
                    <div><dt className="font-semibold text-white">Signals and tasks</dt><dd>{entry.modalities.join('; ')}. {entry.tasks.join('; ')}</dd></div>
                    <div><dt className="font-semibold text-white">Access</dt><dd>{entry.availability}</dd></div>
                    <div><dt className="font-semibold text-white">Dataset-file license</dt><dd>{getDatasetEvidence(entry).dataLicense}</dd></div>
                    <div><dt className="font-semibold text-white">Train / test split</dt><dd>{getDatasetEvidence(entry).splitDetails}</dd></div>
                  </dl>
                  <p className="mt-4 text-xs text-[#8e98a8]">Source reviewed {entry.sourceReviewed}</p>
                  <div className="mt-4 flex flex-wrap gap-4">
                    <a href={entry.paperUrl} target="_blank" rel="noreferrer" className="text-[#ffd5c5] underline">Primary paper ↗</a>
                    <button type="button" onClick={() => toggleCompare(entry.id)} className="underline" aria-label={`Remove ${entry.name} from comparison`}>Remove</button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        <p className="mt-4 text-xs text-[#8e98a8] lg:hidden">Scroll the table horizontally for all fields, or select records to read the comparison above.</p>
        <div className="signal-panel mt-4 overflow-x-auto p-0" role="region" aria-label="Dataset results table" tabIndex={0}>
          <table className="w-full min-w-[1560px] border-collapse text-left text-sm">
            <thead className="bg-white/[0.03] text-xs uppercase text-[#8e98a8]">
              <tr>
                {['Dataset', 'Institution / year', 'Robot / sensor', 'Modalities / scale', 'Tasks / objects', 'Format / license', 'Primary links'].map((label) => (
                  <th key={label} scope="col" className="border-b border-white/10 px-4 py-3 font-semibold">{label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredEntries.map((entry) => { const evidence = getDatasetEvidence(entry); return (
                <tr id={`dataset-${entry.id}`} key={entry.id} className="scroll-mt-24 align-top text-[#c8d1de]">
                  <th scope="row" className="w-[240px] border-b border-white/8 px-4 py-5">
                    <a href={`${pathname}#dataset-${entry.id}`} className="block text-base font-semibold text-white hover:text-[#ffd5c5]">{entry.name}</a>
                    <label className="mt-3 flex items-center gap-2 text-sm font-normal text-[#c8d1de]">
                      <input type="checkbox" checked={selectedIds.includes(entry.id)}
                        disabled={selectedIds.length >= 3 && !selectedIds.includes(entry.id)}
                        onChange={() => toggleCompare(entry.id)} aria-label={`Compare ${entry.name}`}
                        className="h-4 w-4 accent-[#ff6b3d]" /> Compare
                    </label>
                    <button type="button" onClick={() => copyCitation(entry)} className="mt-3 text-xs font-normal text-[#ffd5c5] underline" aria-label={`Copy citation for ${entry.name}`}>Copy directory citation</button>
                    <button type="button" onClick={() => copyCitation(entry, true)} className="mt-3 block text-xs font-normal text-[#ffd5c5] underline" aria-label={`Copy original source for ${entry.name}`}>Copy original-source reference</button>
                    <span className="mt-3 block text-xs font-normal">Use the authors’ citation instructions on the primary paper or project page.</span>
                    <span className="mt-3 block text-xs font-semibold">{accessLabels[evidence.access]}</span>
                    <span className="mt-2 block text-xs font-normal">Access checked {evidence.accessCheckedAt}</span>
                    <span className="mt-3 block text-xs leading-relaxed text-[#8e98a8]">{entry.availability}</span>
                    <span className="mt-2 block font-mono text-[11px] uppercase text-[#8e98a8]">Reviewed {entry.sourceReviewed}</span>
                  </th>
                  <td className="w-[230px] border-b border-white/8 px-4 py-5">{entry.institution.join('; ')}<br /><span className="mt-2 block font-mono text-xs text-white">{entry.year}</span>
                    {entry.authors?.length ? <p className="mt-3"><strong className="text-white">Original authors:</strong> {entry.authors.join('; ')}</p> : null}
                    {entry.firstPublished ? <p className="mt-3">First submitted {entry.firstPublished}</p> : null}
                    {entry.paperVersion ? <p className="mt-2">{entry.paperVersion}</p> : null}
                    {entry.dataOrigin ? <p className="mt-2"><strong className="text-white">Data origin:</strong> {entry.dataOrigin}</p> : null}
                  </td>
                  <td className="w-[230px] border-b border-white/8 px-4 py-5"><strong className="text-white">Robot:</strong> {entry.robot.join('; ')}<br /><strong className="mt-3 inline-block text-white">Sensor:</strong> {entry.sensor.join('; ')}</td>
                  <td className="w-[230px] border-b border-white/8 px-4 py-5">{entry.modalities.join('; ')}<br /><strong className="mt-3 inline-block text-white">Reported / previously documented scale:</strong> {entry.sampleCount}
                    <p className="mt-3"><strong className="text-white">Public-file audit:</strong> {evidence.publicFileScale}</p>
                    <p className="mt-3"><strong className="text-white">Independent check:</strong> {evidence.verificationScope}</p></td>
                  <td className="w-[250px] border-b border-white/8 px-4 py-5">{entry.tasks.join('; ')}<br /><strong className="mt-3 inline-block text-white">Objects:</strong> {entry.objectCategories}
                    {entry.generalization ? <p className="mt-3"><strong className="text-white">Generalization:</strong> {entry.generalization}</p> : null}
                  </td>
                  <td className="w-[250px] border-b border-white/8 px-4 py-5">{entry.dataFormat}<br /><strong className="mt-3 inline-block text-white">Dataset-file license:</strong> {evidence.dataLicense}
                    <p className="mt-3"><strong className="text-white">Code / source terms:</strong> {entry.license}</p>
                    {entry.codeLicense ? <p className="mt-3"><strong className="text-white">Code license:</strong> {entry.codeLicense}</p> : null}
                    {entry.assetLicense ? <p className="mt-3"><strong className="text-white">Asset license:</strong> {entry.assetLicense}</p> : null}
                    {entry.modelLicense ? <p className="mt-3"><strong className="text-white">Model license:</strong> {entry.modelLicense}</p> : null}
                    <p className="mt-3"><strong className="text-white">Train / test split:</strong> {evidence.splitDetails}</p></td>
                  <td className="w-[180px] border-b border-white/8 px-4 py-5">
                    <div className="grid gap-2">
                      {evidence.sources.map((url: string) => <a key={url} href={url} target="_blank" rel="noreferrer" className="font-semibold text-[#ffd5c5] hover:text-white">Access evidence ↗</a>)}
                      {entry.researchUrl ? <Link href={entry.researchUrl} className="font-semibold text-white hover:text-[#ffd5c5]">RoboSkin evidence review</Link> : null}
                      <a href={entry.paperUrl} target="_blank" rel="noreferrer" className="font-semibold text-[#ffd5c5] hover:text-white">Paper ↗</a>
                      {entry.projectUrl ? <a href={entry.projectUrl} target="_blank" rel="noreferrer" className="font-semibold text-[#ffd5c5] hover:text-white">Project ↗</a> : null}
                      {entry.datasetUrl ? <a href={entry.datasetUrl} target="_blank" rel="noreferrer" className="font-semibold text-[#ffd5c5] hover:text-white">Dataset ↗</a> : null}
                      {entry.githubUrl ? <a href={entry.githubUrl} target="_blank" rel="noreferrer" className="font-semibold text-[#ffd5c5] hover:text-white">GitHub ↗</a> : null}
                    </div>
                  </td>
                </tr>
              ); })}
              {filteredEntries.length === 0 ? (
                <tr><td colSpan={7} className="px-4 py-8 text-center text-sm text-[#8e98a8]">No datasets match these filters. <button type="button" onClick={resetFilters} className="ml-2 text-white underline">Clear filters and search again</button></td></tr>
              ) : null}
            </tbody>
          </table>
        </div>
        <div className="mt-6 flex flex-wrap gap-5 text-sm text-[#ffd5c5]">
          <a href="/rss" className="underline">Follow research updates via RSS</a>
          <Link href="/contact?requestType=research" className="underline">Suggest a source or correction</Link>
        </div>
      </div>
    </section>
  );
}
