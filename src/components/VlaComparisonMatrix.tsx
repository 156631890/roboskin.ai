'use client';

import { useState } from 'react';
import Link from 'next/link';
import { selectVlaModels, type VlaCatalogEntry, type VlaFact, type VlaFilters, type VlaSortKey } from '@/lib/vla-catalog';

const initialFilters: VlaFilters = { year: 'all', access: 'all', tactileOnly: false, query: '' };
const accessLabels = { open: 'Open code', closed: 'Closed / unreleased', partial: 'Partial release', 'not-found': 'not found' };
const inputClass = 'mt-2 w-full rounded-md border border-white/20 bg-[#080c12] px-3 py-2.5 text-base text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff6b3d]';
const cellClass = 'border-b border-white/10 p-4 align-top text-sm leading-relaxed text-[#c8d1de]';

function Fact({ value, label }: { value: VlaFact; label: string }) {
  return <>{value.text}<a href={value.source} aria-label={`Source for ${label}`}
    className="mt-2 block w-fit text-xs text-[#ffd5c5] underline underline-offset-4 hover:text-white">Source ↗</a></>;
}

function Modality({ enabled, label }: { enabled: boolean; label: string }) {
  return <span className={enabled ? 'text-[#ffd5c5]' : 'text-[#8e98a8]'}>
    <span aria-hidden="true">{enabled ? '✓' : '—'}</span><span className="sr-only">{enabled ? 'Yes' : 'Not documented'}: </span> {label}
  </span>;
}

export default function VlaComparisonMatrix({ entries }: { entries: VlaCatalogEntry[] }) {
  const [filters, setFilters] = useState(initialFilters);
  const [sort, setSort] = useState<VlaSortKey>('date');
  const [direction, setDirection] = useState<'asc' | 'desc'>('desc');
  const years = [...new Set(entries.map((entry) => entry.date.slice(0, 4)))].sort().reverse();
  const rows = selectVlaModels(entries, filters, sort, direction);
  const setFilter = <K extends keyof VlaFilters>(key: K, value: VlaFilters[K]) => setFilters((current) => ({ ...current, [key]: value }));
  function toggleSort(key: VlaSortKey) {
    if (key === sort) setDirection((current) => current === 'asc' ? 'desc' : 'asc');
    else { setSort(key); setDirection('asc'); }
  }
  function heading(label: string, key: VlaSortKey) {
    return <th scope="col" aria-sort={sort === key ? (direction === 'asc' ? 'ascending' : 'descending') : 'none'} className="p-4 text-left">
      <button type="button" onClick={() => toggleSort(key)} className="flex items-center gap-2 text-left underline decoration-white/30 underline-offset-4 hover:text-[#ff6b3d] focus-visible:outline-2 focus-visible:outline-[#ff6b3d]"
        aria-label={`Sort by ${label}${sort === key ? `, currently ${direction === 'asc' ? 'ascending' : 'descending'}` : ''}`}>
        {label}<span aria-hidden="true">{sort === key ? (direction === 'asc' ? '↑' : '↓') : '↕'}</span>
      </button>
    </th>;
  }

  return (
    <section id="comparison" aria-labelledby="comparison-title" className="pb-16">
      <div className="container-shell min-w-0">
        <h2 id="comparison-title" className="text-3xl font-bold text-white">Compare models and contact inputs</h2>
        <div className="signal-panel mt-6 p-5 md:p-6">
          <label className="flex cursor-pointer items-start gap-3 rounded-md border border-[#ff6b3d]/40 bg-[#ff6b3d]/10 p-4 text-white">
            <input type="checkbox" checked={filters.tactileOnly} onChange={(event) => setFilter('tactileOnly', event.target.checked)}
              className="mt-1 h-5 w-5 shrink-0 accent-[#ff6b3d]" />
            <span><span className="block font-semibold">Includes tactile input</span>
              <span className="mt-1 block text-sm text-[#c8d1de]">Include documented tactile or contact-force feedback. Each row identifies the sensor and variant boundary.</span>
            </span>
          </label>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_2fr]">
            <label className="text-sm font-medium text-[#c8d1de]">Year
              <select value={filters.year} onChange={(event) => setFilter('year', event.target.value)} className={inputClass}>
                <option value="all">All years</option>{years.map((year) => <option key={year}>{year}</option>)}
              </select>
            </label>
            <label className="text-sm font-medium text-[#c8d1de]">Open-source status
              <select value={filters.access} onChange={(event) => setFilter('access', event.target.value)} className={inputClass}>
                <option value="all">All access states</option>
                {Object.entries(accessLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
              </select>
            </label>
            <label className="text-sm font-medium text-[#c8d1de]">Search models or organizations
              <input type="search" value={filters.query} onChange={(event) => setFilter('query', event.target.value)} placeholder="e.g. OpenVLA, force, Stanford" className={inputClass} />
            </label>
          </div>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <p role="status" aria-live="polite" className="text-sm text-[#c8d1de]">{rows.length} of {entries.length} models</p>
            <button type="button" onClick={() => { setFilters(initialFilters); setSort('date'); setDirection('desc'); }} className="text-sm font-semibold text-[#ffd5c5] underline underline-offset-4 hover:text-white">Reset filters and sort</button>
          </div>
        </div>
        <p id="matrix-help" className="my-4 text-sm leading-relaxed text-[#8e98a8]">Scroll horizontally to read every column. Sort by model, organization, year or parameter count using the column headings.
          Parameter sorting uses the largest sortable size stated in each row and places unknown totals last; each row retains the source’s counting scope. This is not a compute comparison. Benchmark cells retain their own protocols.</p>
        <div role="region" aria-label="Scrollable VLA model comparison" aria-describedby="matrix-help" tabIndex={0}
          className="signal-panel max-w-full overflow-x-auto overscroll-x-contain p-0 focus-visible:outline-2 focus-visible:outline-[#ff6b3d]">
          <table className="w-full min-w-[2400px] border-collapse">
            <caption className="sr-only">VLA model comparison with primary sources, access states and tactile input. A checkmark means documented input in the stated configuration; a dash means not documented.</caption>
            <thead className="bg-[#111722] text-sm text-white">
              <tr>{heading('Model name', 'name')}{heading('Organization', 'organization')}{heading('Year', 'date')}
                <th scope="col" className="p-4 text-left">Paper link</th><th scope="col" className="p-4 text-left">Code link</th>
                {heading('Parameter count', 'parameters')}
                <th scope="col" className="p-4 text-left">Input modalities</th><th scope="col" className="p-4 text-left">Open-source status</th>
                <th scope="col" className="p-4 text-left">Benchmark scores</th><th scope="col" className="p-4 text-left">Training dataset</th>
                <th scope="col" className="p-4 text-left">One-line description</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((entry) => <tr key={entry.id} id={entry.id} className="scroll-mt-24 hover:bg-white/[0.03]">
                <th scope="row" className={`${cellClass} min-w-[170px] text-left`}>
                  <a href={`#${entry.id}`} className="font-semibold text-white underline decoration-white/25 underline-offset-4">{entry.name}</a>
                  <span className="mt-2 block text-xs text-[#8e98a8]">{entry.role}</span>
                  {entry.detail ? <Link href={entry.detail} className="mt-3 block text-xs text-[#ffd5c5] underline underline-offset-4">Detailed evidence</Link> : null}
                </th>
                <td className={`${cellClass} min-w-[180px]`}><Fact value={entry.organization} label={`${entry.name} organization`} /></td>
                <td className={cellClass}><a href={entry.paper} className="text-[#ffd5c5] underline underline-offset-4"><time dateTime={entry.date}>{entry.date.slice(0, 4)}</time></a></td>
                <td className={cellClass}><a href={entry.paper} className="text-[#ffd5c5] underline underline-offset-4">Paper ↗<span className="sr-only"> for {entry.name}</span></a></td>
                <td className={cellClass}>{entry.code ? <a href={entry.code} className="text-[#ffd5c5] underline underline-offset-4">Code ↗<span className="sr-only"> for {entry.name}</span></a> : 'not found'}</td>
                <td className={`${cellClass} min-w-[180px]`}><Fact value={entry.parameters} label={`${entry.name} parameter count`} /></td>
                <td className={`${cellClass} min-w-[270px]`}>
                  <div className="mb-2 flex flex-wrap gap-3 font-semibold"><Modality enabled={entry.vision} label="Vision" /><Modality enabled={entry.language} label="Language" /><Modality enabled={entry.tactile} label="Tactile / force" /></div>
                  <Fact value={entry.modalities} label={`${entry.name} modalities`} />
                </td>
                <td className={`${cellClass} min-w-[260px]`}><span className="mb-2 block font-semibold text-white">{accessLabels[entry.access]}</span><Fact value={entry.availability} label={`${entry.name} access`} /></td>
                <td className={`${cellClass} min-w-[280px]`}><Fact value={entry.benchmark} label={`${entry.name} benchmark`} /></td>
                <td className={`${cellClass} min-w-[220px]`}><Fact value={entry.dataset} label={`${entry.name} training data`} /></td>
                <td className={`${cellClass} min-w-[250px]`}><Fact value={entry.description} label={`${entry.name} description`} /></td>
              </tr>)}
              {rows.length === 0 ? <tr><td colSpan={11} className="p-8 text-base text-white">No models match these filters. Try a different year or access state, or reset the filters.</td></tr> : null}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
