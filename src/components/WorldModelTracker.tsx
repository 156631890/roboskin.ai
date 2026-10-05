'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { TrackerEntry } from '@/lib/world-model-tracker.types';
import { selectTrackerEntries } from '@/lib/world-model-tracker-tools.mjs';

const modalityLabels = { vision: 'Vision', touch: 'Touch / contact', proprioception: 'Proprioception', action: 'Action', reward: 'Reward', latent: 'Latent representation' };
const releaseLabels = { released: 'Released', announced: 'Announced', none: 'Explicitly unavailable', unknown: 'Not verified' };
const authorLabels = { 'not-contacted': 'Not contacted', contacted: 'Contacted', confirmed: 'Confirmed', corrected: 'Corrected' };
const cellClass = 'block border-b border-white/10 px-4 py-4 align-top lg:table-cell';

export default function WorldModelTracker({ entries }: { entries: TrackerEntry[] }) {
  const [modality, setModality] = useState('');
  const [evidence, setEvidence] = useState('');
  const [code, setCode] = useState('');
  const [anchorId, setAnchorId] = useState('');
  const filtered = selectTrackerEntries(entries, { modality, evidence, code });

  useEffect(() => {
    function revealAnchor() {
      const id = window.location.hash.slice(1);
      if (!entries.some((entry) => entry.id === id)) return;
      setModality(''); setEvidence(''); setCode(''); setAnchorId(id);
    }
    revealAnchor();
    window.addEventListener('hashchange', revealAnchor);
    return () => window.removeEventListener('hashchange', revealAnchor);
  }, [entries]);

  useEffect(() => {
    if (!anchorId) return;
    document.getElementById(anchorId)?.scrollIntoView({ block: 'start' });
    setAnchorId('');
  }, [anchorId]);

  return (
    <section id="tracker-records" className="research-data-explorer scroll-mt-24 pb-14" aria-labelledby="tracker-records-heading">
      <div className="container-shell">
        <h2 id="tracker-records-heading" className="text-2xl font-semibold text-white">Compare model evidence</h2>
        <p className="mt-3 max-w-4xl text-sm text-soft">Newest first by initial paper date. Grades describe available evidence, not performance. “Not verified” means unknown, not that an artifact does not exist.</p>
        <div className="signal-panel mt-6 grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-4">
          <label className="text-sm text-soft">Predicted modality
            <select value={modality} onChange={(event) => setModality(event.target.value)} className="mt-2 block w-full rounded-md border border-white/20 bg-[#11151c] p-3 text-white">
              <option value="">All modalities</option>
              {Object.entries(modalityLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
            </select>
          </label>
          <label className="text-sm text-soft">Evidence grade
            <select value={evidence} onChange={(event) => setEvidence(event.target.value)} className="mt-2 block w-full rounded-md border border-white/20 bg-[#11151c] p-3 text-white">
              <option value="">All grades</option>
              {['A', 'B', 'C', 'D'].map((value) => <option key={value} value={value}>{value}</option>)}
            </select>
          </label>
          <label className="text-sm text-soft">Code availability
            <select value={code} onChange={(event) => setCode(event.target.value)} className="mt-2 block w-full rounded-md border border-white/20 bg-[#11151c] p-3 text-white">
              <option value="">All code statuses</option>
              {Object.entries(releaseLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
            </select>
          </label>
          <button type="button" onClick={() => { setModality(''); setEvidence(''); setCode(''); }} className="btn-secondary self-end">Reset filters</button>
        </div>
        <p role="status" aria-live="polite" className="my-4 text-sm text-soft">Showing {filtered.length} of {entries.length} models</p>
        {filtered.length === 0 ? <div className="signal-panel p-6"><p>No models match these filters. Try another combination or reset the filters.</p></div> : (
          <div className="signal-panel overflow-x-auto p-0" tabIndex={0} role="region" aria-label="Tactile world model comparison table">
            <table className="w-full border-collapse text-left text-sm lg:min-w-[1500px]">
              <caption className="sr-only">Source-backed tactile world model records. Expand a model to review its sources and limitations.</caption>
              <thead className="hidden bg-white/[0.03] text-xs uppercase text-soft lg:table-header-group"><tr>
                {['Model / sources', 'First published', 'Predicts', 'Tactile sensor', 'Robot platform', 'Real-robot evaluation', 'Open artifacts', 'Evidence'].map((label) => <th key={label} scope="col" className="border-b border-white/10 px-4 py-3">{label}</th>)}
              </tr></thead>
              <tbody className="grid gap-4 p-3 lg:table-row-group lg:p-0">
                {filtered.map((entry: TrackerEntry) => <tr id={entry.id} key={entry.id} className="scroll-mt-28 block min-w-0 rounded-md border border-white/10 text-[#d8dce4] target:bg-white/[0.04] lg:table-row lg:border-0">
                  <th scope="row" className={`${cellClass} font-normal lg:min-w-[290px] lg:max-w-[340px]`}>
                    <a href={`#${entry.id}`} className="text-lg font-semibold text-white underline decoration-white/25 underline-offset-4">{entry.name}</a>
                    <details className="mt-3">
                      <summary className="cursor-pointer text-accent">Sources and assessment</summary>
                      <div className="mt-4 space-y-3 break-words text-sm leading-relaxed">
                        <p><strong>Provisional assessment:</strong> {entry.verdict}</p>
                        <p>{entry.paperTitle ?? 'Paper title not verified'}</p>
                        <p><strong>Institutions:</strong> {entry.institutions.join('; ') || 'Not verified'}</p>
                        <p><strong>Author check:</strong> {authorLabels[entry.authorCheck]}. <strong>Sources checked:</strong> {entry.lastVerified}.</p>
                        <ul className="space-y-2">{entry.sources.map((source, index) => <li key={source}><a href={source} className="break-all text-accent underline underline-offset-4">Source {index + 1}: {source.replace('https://', '')}</a></li>)}</ul>
                        {entry.briefUrl ? <Link href={entry.briefUrl} className="inline-block text-accent underline underline-offset-4">Read the RoboSkin brief / guide →</Link> : null}
                      </div>
                    </details>
                  </th>
                  <td className={cellClass}><span className="mb-2 block text-xs uppercase text-soft lg:hidden">First published</span>{entry.releaseDate ? <time dateTime={entry.releaseDate}>{entry.releaseDate}</time> : 'Not verified'}</td>
                  <td className={cellClass}><span className="mb-2 block text-xs uppercase text-soft lg:hidden">Predicts</span>{entry.predicts.map((item) => modalityLabels[item]).join(', ') || 'Not verified'}</td>
                  <td className={cellClass}><span className="mb-2 block text-xs uppercase text-soft lg:hidden">Tactile sensor</span>{entry.tactileSensor ?? 'Not verified'}</td>
                  <td className={cellClass}><span className="mb-2 block text-xs uppercase text-soft lg:hidden">Robot platform</span>{entry.robotPlatform ?? 'Not verified'}</td>
                  <td className={cellClass}><span className="mb-2 block text-xs uppercase text-soft lg:hidden">Real-robot evaluation</span>
                    <p>{entry.realRobotEval.has === true ? 'Author-reported real-robot evaluation' : entry.realRobotEval.has === false ? 'Simulation only' : 'Not verified'}</p>
                    <p className="mt-2">Tasks: {entry.realRobotEval.taskCount ?? 'Not verified'}</p>
                    <p className="mt-2">Trials per setting: {entry.realRobotEval.rolloutsPerSetting ?? 'Not disclosed'}</p>
                  </td>
                  <td className={cellClass}><span className="mb-2 block text-xs uppercase text-soft lg:hidden">Open artifacts</span>
                    <p>Code: {releaseLabels[entry.openSource.code]}</p><p className="mt-2">Data: {releaseLabels[entry.openSource.data]}</p><p className="mt-2">Weights: {releaseLabels[entry.openSource.weights]}</p><p className="mt-2">License: {entry.openSource.license ?? 'Not verified'}</p>
                  </td>
                  <td className={cellClass}><a href="#evidence-levels" className="font-mono text-lg text-accent underline underline-offset-4" aria-label={`Evidence grade ${entry.evidenceLevel} for ${entry.name}; read definitions`}>{entry.evidenceLevel}</a><p className="mt-2 text-xs">Provisional</p></td>
                </tr>)}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
