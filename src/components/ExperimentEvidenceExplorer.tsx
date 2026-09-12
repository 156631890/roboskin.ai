'use client';

import Link from 'next/link';
import { useState } from 'react';
import { track } from '@vercel/analytics';
import { buildExperimentCsv, type ExperimentEvidence } from '@/lib/experiment-evidence.mjs';
import { evidenceBatch } from '@/lib/growth-batches.mjs';

export default function ExperimentEvidenceExplorer({ entries }: { entries: ExperimentEvidence[] }) {
  const [study, setStudy] = useState('All studies');
  const [feedback, setFeedback] = useState('');
  const studies = [...new Set(entries.map((entry) => entry.study))];
  const filtered = entries.filter((entry) => study === 'All studies' || entry.study === study);

  function exportResults() {
    const url = URL.createObjectURL(new Blob([buildExperimentCsv(filtered)], { type: 'text/csv;charset=utf-8;' }));
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'roboskin-experiment-evidence.csv';
    anchor.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    setFeedback(`CSV prepared with ${filtered.length} evidence records, including sources and limitations.`);
    track('Evidence CSV Prepared', { batch: evidenceBatch, path: '/benchmarks', study, record_count: filtered.length });
  }

  return (
    <section id="experiment-evidence" className="scroll-mt-24 pb-14 md:pb-20" aria-labelledby="experiment-evidence-title">
      <div className="container-shell">
        <div className="border-t border-[var(--panel-border)] pt-8">
          <p className="eyebrow">Reported results / Protocol first</p>
          <h2 id="experiment-evidence-title" className="mt-4 text-3xl font-semibold md:text-4xl">Experimental evidence, with the conditions attached</h2>
          <p className="mt-4 max-w-4xl text-sm leading-relaxed text-soft">
            Inspect author-reported results by study, test setup, metric, and sample. These are extracted research records;
            RoboSkin.ai has not independently reproduced the experiments. Compare scores only when the evaluation conditions match.
          </p>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end">
            <label className="grid gap-2 text-sm font-semibold">
              Study
              <select value={study} onChange={(event) => {
                setStudy(event.target.value);
                setFeedback('');
                track('Evidence Filter', { batch: evidenceBatch, path: '/benchmarks', study: event.target.value });
              }} className="min-h-12 border border-[var(--panel-border)] bg-[var(--bg-soft)] px-4 font-normal">
                <option>All studies</option>
                {studies.map((name) => <option key={name}>{name}</option>)}
              </select>
            </label>
            <button type="button" className="btn-primary" onClick={exportResults}>Export these records as CSV</button>
            <a href="/experiment-results.csv" download className="btn-tertiary">Download all records</a>
          </div>
          <p className="mt-4 text-sm text-soft" aria-live="polite">Showing {filtered.length} of {entries.length} records · Reviewed September 12, 2026</p>
          <p className="mt-2 text-sm text-accent" role="status">{feedback}</p>
          <p className="mt-3 text-xs text-soft sm:hidden">Swipe the table horizontally to read the complete evidence.</p>
          <div className="mt-4 overflow-x-auto border border-[var(--panel-border)]" role="region" aria-label="Experimental results table" tabIndex={0}>
            <table className="w-full min-w-[1280px] border-collapse text-left text-sm">
              <caption className="sr-only">Author-reported tactile research results, comparison conditions, samples, access, and primary sources.</caption>
              <thead className="bg-[var(--panel)]">
                <tr>{['Study and test setup', 'Result and reference', 'Sample and interpretation', 'Limits and access', 'Sources'].map((label) => (
                  <th key={label} scope="col" className="px-4 py-4 font-semibold">{label}</th>
                ))}</tr>
              </thead>
              <tbody>
                {filtered.map((entry) => (
                  <tr key={entry.id} id={`result-${entry.id}`} className="scroll-mt-24 border-t border-[var(--panel-border)] align-top">
                    <th scope="row" className="w-[245px] px-4 py-5 text-left font-normal">
                      <span className="block font-semibold text-accent">{entry.study} / {entry.task}</span>
                      <span className="mt-2 block text-xs leading-relaxed text-soft">{entry.version}</span>
                      <p className="mt-3 leading-relaxed">{entry.setup}</p>
                    </th>
                    <td className="w-[240px] px-4 py-5 leading-relaxed">
                      <p className="text-xs uppercase text-soft">{entry.metric}</p>
                      <p className="mt-2 font-semibold">{entry.result}</p>
                      <p className="mt-3 text-soft">{entry.comparator}</p>
                    </td>
                    <td className="w-[280px] px-4 py-5 leading-relaxed">
                      <p>{entry.sample}</p><p className="mt-3 text-soft">{entry.interpretation}</p>
                    </td>
                    <td className="w-[340px] px-4 py-5 leading-relaxed">
                      <p>{entry.limitation}</p><p className="mt-3 text-soft">{entry.access}</p>
                    </td>
                    <td className="w-[180px] px-4 py-5 leading-relaxed">
                      <a href={entry.sourceUrl} target="_blank" rel="noreferrer" className="font-semibold text-accent underline underline-offset-4">Primary source ↗</a>
                      <p className="mt-2 text-xs text-soft">{entry.sourceLocation}</p>
                      <Link href={entry.reviewUrl} className="mt-4 block underline underline-offset-4">Read evidence review</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
