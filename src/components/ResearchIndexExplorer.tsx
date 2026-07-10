'use client';

import { useMemo, useState } from 'react';
import type { ResearchIndexEntry } from '@/lib/research-index';

type ResearchIndexExplorerProps = {
  entries: ResearchIndexEntry[];
};

export default function ResearchIndexExplorer({ entries }: ResearchIndexExplorerProps) {
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

  const filteredEntries = entries.filter((entry) => {
    const matchesModality = modality === 'all' || entry.modalities.includes(modality);
    const matchesEvidence = evidence === 'all' || entry.evidence === evidence;
    const matchesYear = year === 'all' || String(entry.year) === year;

    return matchesModality && matchesEvidence && matchesYear;
  });

  const resetFilters = () => {
    setModality('all');
    setEvidence('all');
    setYear('all');
  };

  return (
    <div>
      <div className="grid gap-4 border-y border-white/10 py-5 md:grid-cols-[1fr_1fr_1fr_auto] md:items-end">
        <label className="grid gap-2 text-sm font-semibold text-white">
          Modality
          <select
            value={modality}
            onChange={(event) => setModality(event.target.value)}
            className="min-h-11 rounded-md border border-white/15 bg-[#080b10] px-3 text-sm text-white"
          >
            <option value="all">All modalities</option>
            {modalities.map((value) => <option key={value} value={value}>{value}</option>)}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-semibold text-white">
          Evidence
          <select
            value={evidence}
            onChange={(event) => setEvidence(event.target.value)}
            className="min-h-11 rounded-md border border-white/15 bg-[#080b10] px-3 text-sm text-white"
          >
            <option value="all">All evidence levels</option>
            {evidenceLevels.map((value) => <option key={value} value={value}>{value}</option>)}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-semibold text-white">
          Year
          <select
            value={year}
            onChange={(event) => setYear(event.target.value)}
            className="min-h-11 rounded-md border border-white/15 bg-[#080b10] px-3 text-sm text-white"
          >
            <option value="all">All years</option>
            {years.map((value) => <option key={value} value={value}>{value}</option>)}
          </select>
        </label>
        <button type="button" onClick={resetFilters} className="btn-secondary min-h-11">
          Reset filters
        </button>
      </div>

      <p className="mt-5 font-mono text-xs uppercase text-[#8e98a8]" aria-live="polite">
        Showing {filteredEntries.length} of {entries.length} records
      </p>

      <div className="signal-panel mt-4 overflow-x-auto p-0">
        <table className="w-full min-w-[1180px] border-collapse text-left">
          <thead className="bg-white/[0.03] text-xs uppercase text-[#8e98a8]">
            <tr>
              {['Research item', 'Year', 'Sensor principle', 'Modalities', 'Form factor', 'Data output', 'Evidence'].map((label) => (
                <th key={label} className="border-b border-white/10 px-4 py-3 font-semibold">{label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredEntries.map((entry) => (
              <tr key={entry.id} className="align-top text-sm text-[#c8d1de]">
                <td className="w-[300px] border-b border-white/8 px-4 py-5">
                  <a href={entry.url} className="font-semibold leading-snug text-white hover:text-[#00e5ff]">
                    {entry.title}
                  </a>
                  <a href={entry.sourceUrl} target="_blank" rel="noreferrer" className="mt-2 block text-xs text-[#00e5ff] hover:text-white">
                    {entry.publisher}: {entry.sourceTitle}
                  </a>
                  <p className="mt-3 text-xs leading-relaxed text-[#8e98a8]">{entry.limitations}</p>
                  <p className="mt-2 font-mono text-[11px] uppercase text-[#8e98a8]">Reviewed {entry.reviewedAt}</p>
                </td>
                <td className="border-b border-white/8 px-4 py-5">{entry.year}</td>
                <td className="border-b border-white/8 px-4 py-5">{entry.sensorPrinciple}</td>
                <td className="border-b border-white/8 px-4 py-5">{entry.modalities.join(', ')}</td>
                <td className="border-b border-white/8 px-4 py-5">{entry.formFactor}</td>
                <td className="border-b border-white/8 px-4 py-5">{entry.dataOutput}</td>
                <td className="border-b border-white/8 px-4 py-5 capitalize">{entry.evidence}</td>
              </tr>
            ))}
            {filteredEntries.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-sm text-[#8e98a8]">
                  No records match these filters.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
