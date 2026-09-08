'use client';

import { useMemo, useRef, useState } from 'react';
import { track } from '@vercel/analytics';
import type { ResearchIndexEntry } from '@/lib/research-index';

type ResearchIndexExplorerProps = {
  entries: ResearchIndexEntry[];
};

export default function ResearchIndexExplorer({ entries }: ResearchIndexExplorerProps) {
  const [query, setQuery] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);
  const [modality, setModality] = useState('all');
  const [evidence, setEvidence] = useState('all');
  const [year, setYear] = useState('all');

  const modalities = useMemo(
    () => [...new Set(entries.flatMap((entry) => entry.modalities))].sort(),
    [entries],
  );
  const evidenceLevels = useMemo(
    () => [...new Set(entries.map((entry) => entry.evidence))].sort(),
    [entries],
  );
  const years = useMemo(
    () => [...new Set(entries.map((entry) => String(entry.year)))].sort().reverse(),
    [entries],
  );

  const searchTerms = query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  const filtersActive = query.length > 0 || modality !== 'all' || evidence !== 'all' || year !== 'all';
  const filteredEntries = entries.filter((entry) => {
    const searchableText = [entry.title, entry.sourceTitle, entry.publisher, entry.sensorPrinciple,
      ...entry.modalities, entry.formFactor, entry.dataOutput, ...entry.applications, entry.evidence, String(entry.year)]
      .join(' ').toLocaleLowerCase();
    const matchesQuery = searchTerms.every((term) => searchableText.includes(term));
    const matchesModality = modality === 'all' || entry.modalities.includes(modality);
    const matchesEvidence = evidence === 'all' || entry.evidence === evidence;
    const matchesYear = year === 'all' || String(entry.year) === year;

    return matchesQuery && matchesModality && matchesEvidence && matchesYear;
  });

  const resetFilters = () => {
    setQuery('');
    setModality('all');
    setEvidence('all');
    setYear('all');
    searchRef.current?.focus();
    track('Research Index Filter', { filter: 'reset', value: 'all' });
  };

  const updateFilter = (filter: 'modality' | 'evidence' | 'year', value: string) => {
    track('Research Index Filter', { filter, value });
    if (filter === 'modality') setModality(value);
    if (filter === 'evidence') setEvidence(value);
    if (filter === 'year') setYear(value);
  };

  return (
    <div id="research-explorer" className="research-data-explorer">
      <div className="research-explorer-heading">
        <div>
          <p className="quiet-label">Find the evidence</p>
          <h2>Explore the research</h2>
        </div>
        <p>Search a topic, sensor, or paper. Narrow the results by source type and year.</p>
      </div>
      <div className="research-search">
        <label htmlFor="research-query">Search research records</label>
        <div className="research-search-field">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
            <circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 4.5 4.5" />
          </svg>
          <input ref={searchRef} id="research-query" type="search" value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search papers, sensors, topics…"
            aria-controls="research-results" autoComplete="off" />
          {query ? <button type="button" onClick={() => { setQuery(''); searchRef.current?.focus(); }}>Clear search</button> : null}
        </div>
      </div>
      <div className="research-filters grid gap-4 border-b border-white/10 py-5 md:grid-cols-[1fr_1fr_1fr_auto] md:items-end">
        <label className="grid gap-2 text-sm font-semibold text-white">
          Modality
          <select
            aria-label="Modality"
            value={modality}
            onChange={(event) => updateFilter('modality', event.target.value)}
            className="min-h-11 rounded-sm border border-white/15 bg-[var(--bg-soft)] px-3 text-sm text-white"
          >
            <option value="all">All modalities</option>
            {modalities.map((value) => <option key={value} value={value}>{value}</option>)}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-semibold text-white">
          Evidence
          <select
            aria-label="Evidence"
            value={evidence}
            onChange={(event) => updateFilter('evidence', event.target.value)}
            className="min-h-11 rounded-sm border border-white/15 bg-[var(--bg-soft)] px-3 text-sm text-white"
          >
            <option value="all">All evidence</option>
            {evidenceLevels.map((value) => <option key={value} value={value}>{value}</option>)}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-semibold text-white">
          Year
          <select
            aria-label="Year"
            value={year}
            onChange={(event) => updateFilter('year', event.target.value)}
            className="min-h-11 rounded-sm border border-white/15 bg-[var(--bg-soft)] px-3 text-sm text-white"
          >
            <option value="all">All years</option>
            {years.map((value) => <option key={value} value={value}>{value}</option>)}
          </select>
        </label>
        <button type="button" onClick={resetFilters} disabled={!filtersActive} className="btn-secondary min-h-11">
          Reset filters
        </button>
      </div>

      <div className="research-results-summary">
        <p role="status" aria-live="polite" aria-atomic="true">Showing <strong>{filteredEntries.length}</strong> of {entries.length} records</p>
        <span>Every record links to its original source</span>
      </div>

      <div id="research-results" className="research-results-region" role="region" aria-label="Research results" tabIndex={0}>
        <table className="research-results-table w-full border-collapse text-left" role="table">
          <caption className="sr-only">Tactile research records with source links, technical details, and evidence limitations</caption>
          <thead className="bg-white/[0.03] text-xs uppercase text-[#8e98a8]">
            <tr>
              {['Research item', 'Year', 'Sensor principle', 'Modalities', 'Form factor', 'Data output', 'Applications', 'Evidence'].map((label) => (
                <th key={label} scope="col" className="border-b border-white/10 px-4 py-3 font-semibold">{label}</th>
              ))}
            </tr>
          </thead>
          <tbody role="rowgroup">
            {filteredEntries.map((entry) => (
              <tr key={entry.id} role="row" className="align-top text-sm text-[#c8d1de]">
                <td role="cell" className="research-record-title border-b border-white/8 px-4 py-5">
                  <a href={entry.url} className="font-semibold leading-snug text-white hover:text-[#ff6b3d]">
                    {entry.title}
                  </a>
                  <a href={entry.sourceUrl} target="_blank" rel="noreferrer" className="mt-2 block text-xs text-[#ff6b3d] hover:text-white">
                    {entry.publisher}: {entry.sourceTitle}
                  </a>
                  <details className="research-record-notes">
                    <summary>Evidence notes &amp; limitations</summary>
                    <p>{entry.limitations}</p>
                  </details>
                  <p className="mt-2 font-mono text-[11px] uppercase text-[#8e98a8]">Reviewed {entry.reviewedAt}</p>
                </td>
                <td role="cell" data-label="Year" className="border-b border-white/8 px-4 py-5">{entry.year}</td>
                <td role="cell" data-label="Sensor principle" className="border-b border-white/8 px-4 py-5">{entry.sensorPrinciple}</td>
                <td role="cell" data-label="Modalities" className="border-b border-white/8 px-4 py-5">{entry.modalities.join(', ')}</td>
                <td role="cell" data-label="Form factor" className="border-b border-white/8 px-4 py-5">{entry.formFactor}</td>
                <td role="cell" data-label="Data output" className="border-b border-white/8 px-4 py-5">{entry.dataOutput}</td>
                <td role="cell" data-label="Applications" className="border-b border-white/8 px-4 py-5">{entry.applications.join(', ')}</td>
                <td role="cell" data-label="Evidence" className="border-b border-white/8 px-4 py-5 capitalize"><span className="research-evidence-label">{entry.evidence}</span></td>
              </tr>
            ))}
            {filteredEntries.length === 0 ? (
              <tr>
                <td colSpan={8} className="research-empty-state">
                  <h3>No records match your search</h3>
                  <p>Try a broader term, or reset the filters to see all {entries.length} records.</p>
                  <button type="button" className="btn-secondary" onClick={resetFilters}>Reset search and filters</button>
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
