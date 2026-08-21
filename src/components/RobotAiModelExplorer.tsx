'use client';

import { useMemo, useState } from 'react';
import {
  filterRobotAiModels,
  type RobotAiModelCategory,
  type RobotAiModelEntry,
  type TactileInputStatus,
} from '@/lib/robot-ai-models';

type RobotAiModelExplorerProps = {
  entries: RobotAiModelEntry[];
};

function unique<T extends string>(values: T[]) {
  return [...new Set(values)].sort((left, right) => left.localeCompare(right));
}

function sentenceCase(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export default function RobotAiModelExplorer({ entries }: RobotAiModelExplorerProps) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<RobotAiModelCategory | 'all'>('all');
  const [tactileInput, setTactileInput] = useState<TactileInputStatus | 'all'>('all');
  const [year, setYear] = useState<string | 'all'>('all');

  const categories = useMemo(
    () => unique(entries.map((entry) => entry.category)),
    [entries],
  );
  const years = useMemo(
    () => unique(entries.map((entry) => entry.releaseDate.slice(0, 4))).reverse(),
    [entries],
  );
  const latestReview = entries.reduce(
    (latest, entry) => entry.sourceReviewed > latest ? entry.sourceReviewed : latest,
    '',
  );
  const filteredEntries = filterRobotAiModels(entries, {
    query,
    category,
    tactileInput,
    year,
  });

  function resetFilters() {
    setQuery('');
    setCategory('all');
    setTactileInput('all');
    setYear('all');
  }

  return (
    <section className="research-data-explorer deferred-section pb-14 md:pb-20" aria-labelledby="robot-ai-model-explorer-heading">
      <div className="container-shell">
        <p className="eyebrow">Evidence-bounded model directory</p>
        <div className="mt-4 grid gap-5 lg:grid-cols-[0.78fr_1fr] lg:items-end">
          <div>
            <h2 id="robot-ai-model-explorer-heading" className="text-3xl font-bold text-white md:text-4xl">
              Compare AI models used in robotics
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#c8d1de]">
              Model labels describe different roles: a VLM interprets multimodal context, a VLA or policy produces actions,
              an embodied-reasoning model plans, and a world model predicts consequences. Every row keeps real-robot evidence,
              access terms, tactile input, and source limitations attached to the model instead of treating unlike results as a leaderboard.
            </p>
          </div>
          <p className="font-mono text-xs uppercase tracking-[0.12em] text-[#aeb8c7] lg:text-right">
            Source review: {latestReview} / {entries.length} models
          </p>
        </div>

        <div className="mt-7 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          <label className="grid gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-[#aeb8c7]">
            Search models and evidence
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="e.g. humanoid, tactile, actions"
              className="min-h-11 rounded-md border border-white/15 bg-[#020408] px-3 text-sm normal-case tracking-normal text-white placeholder:text-[#7f8998]"
            />
          </label>

          <label className="grid gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-[#aeb8c7]">
            Model role
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value as RobotAiModelCategory | 'all')}
              className="min-h-11 rounded-md border border-white/15 bg-[#020408] px-3 text-sm normal-case tracking-normal text-white"
            >
              <option value="all">All model roles</option>
              {categories.map((option) => <option key={option} value={option}>{sentenceCase(option)}</option>)}
            </select>
          </label>

          <label className="grid gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-[#aeb8c7]">
            Tactile input
            <select
              value={tactileInput}
              onChange={(event) => setTactileInput(event.target.value as TactileInputStatus | 'all')}
              className="min-h-11 rounded-md border border-white/15 bg-[#020408] px-3 text-sm normal-case tracking-normal text-white"
            >
              <option value="all">All tactile statuses</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
              <option value="unclear">Unclear</option>
            </select>
          </label>

          <label className="grid gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-[#aeb8c7]">
            Release year
            <select
              value={year}
              onChange={(event) => setYear(event.target.value)}
              className="min-h-11 rounded-md border border-white/15 bg-[#020408] px-3 text-sm normal-case tracking-normal text-white"
            >
              <option value="all">All years</option>
              {years.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
          </label>

          <button type="button" onClick={resetFilters} className="btn-secondary min-h-11 self-end">
            Reset filters
          </button>
        </div>

        <p className="mt-5 font-mono text-xs uppercase text-[#aeb8c7]" aria-live="polite">
          Showing {filteredEntries.length} of {entries.length} models
        </p>

        <div className="signal-panel mt-4 overflow-x-auto p-0" tabIndex={0} aria-label="Robot AI model comparison">
          <table className="w-full border-collapse text-left text-sm md:min-w-[1840px]">
            <caption className="sr-only">
              Robot AI models compared by model role, inputs, outputs, training data, embodiment, evaluation, availability, license, tactile input, evidence limitations, and primary sources.
            </caption>
            <thead className="hidden bg-white/[0.03] text-xs uppercase text-[#aeb8c7] md:table-header-group">
              <tr>
                {[
                  'Model',
                  'Role / release',
                  'Inputs / output',
                  'Training / embodiments',
                  'Real-robot evidence',
                  'Access / touch',
                  'Evidence boundary / sources',
                ].map((label) => (
                  <th key={label} scope="col" className="border-b border-white/10 px-4 py-3 font-semibold">{label}</th>
                ))}
              </tr>
            </thead>
            <tbody className="grid gap-4 p-3 md:table-row-group md:p-0">
              {filteredEntries.map((entry) => (
                <tr key={entry.id} className="block overflow-hidden rounded-md border border-white/10 align-top text-[#c8d1de] md:table-row md:rounded-none md:border-0">
                  <th scope="row" className="block w-full border-b border-white/10 bg-white/[0.03] px-4 py-5 text-left md:table-cell md:w-[230px] md:bg-transparent">
                    <span className="block text-base font-semibold text-white">{entry.name}</span>
                    <span className="mt-3 block text-xs leading-relaxed text-[#aeb8c7]">{entry.organization}</span>
                    <span className="mt-2 block font-mono text-[11px] uppercase text-[#aeb8c7]">Reviewed {entry.sourceReviewed}</span>
                  </th>
                  <td className="block w-full border-b border-white/10 px-4 py-5 md:table-cell md:w-[185px]">
                    <span className="mb-3 block font-mono text-[11px] uppercase tracking-[0.1em] text-[#aeb8c7] md:hidden">Role / release</span>
                    <span className="font-semibold text-white">{sentenceCase(entry.category)}</span>
                    <time dateTime={entry.releaseDate} className="mt-3 block font-mono text-xs">{entry.releaseDate}</time>
                  </td>
                  <td className="block w-full border-b border-white/10 px-4 py-5 md:table-cell md:w-[250px]">
                    <span className="mb-3 block font-mono text-[11px] uppercase tracking-[0.1em] text-[#aeb8c7] md:hidden">Inputs / output</span>
                    <strong className="text-white">Inputs:</strong> {entry.inputModalities.join('; ')}
                    <br />
                    <strong className="mt-3 inline-block text-white">Output:</strong> {entry.outputType}
                  </td>
                  <td className="block w-full border-b border-white/10 px-4 py-5 md:table-cell md:w-[300px]">
                    <span className="mb-3 block font-mono text-[11px] uppercase tracking-[0.1em] text-[#aeb8c7] md:hidden">Training / embodiments</span>
                    {entry.trainingDataSummary}
                    <br />
                    <strong className="mt-3 inline-block text-white">Embodiments:</strong> {entry.embodiments.join('; ')}
                  </td>
                  <td className="block w-full border-b border-white/10 px-4 py-5 md:table-cell md:w-[270px]">
                    <span className="mb-3 block font-mono text-[11px] uppercase tracking-[0.1em] text-[#aeb8c7] md:hidden">Real-robot evidence</span>
                    {entry.realRobotEvaluation}
                  </td>
                  <td className="block w-full border-b border-white/10 px-4 py-5 md:table-cell md:w-[255px]">
                    <span className="mb-3 block font-mono text-[11px] uppercase tracking-[0.1em] text-[#aeb8c7] md:hidden">Access / touch</span>
                    {entry.availability}
                    <br />
                    <strong className="mt-3 inline-block text-white">License:</strong> {entry.license}
                    <br />
                    <strong className="mt-3 inline-block text-white">Tactile input:</strong>{' '}
                    <span className="rounded-full border border-white/15 px-2 py-1 font-mono text-xs uppercase text-white">
                      {entry.tactileInput}
                    </span>
                  </td>
                  <td className="block w-full px-4 py-5 md:table-cell md:w-[350px] md:border-b md:border-white/10">
                    <span className="mb-3 block font-mono text-[11px] uppercase tracking-[0.1em] text-[#aeb8c7] md:hidden">Evidence boundary / sources</span>
                    {entry.evidenceLimitations}
                    <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                      {entry.primarySources.map((source) => (
                        <a
                          key={source.url}
                          href={source.url}
                          target="_blank"
                          rel="noreferrer"
                          className="font-semibold text-[#ffd5c5] underline decoration-white/25 underline-offset-4 hover:text-white"
                        >
                          {source.label} ↗
                        </a>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
              {filteredEntries.length === 0 ? (
                <tr className="block md:table-row">
                  <td colSpan={7} className="block px-4 py-8 text-center text-sm text-[#aeb8c7] md:table-cell">
                    No models match these filters. Reset the filters or try a broader search term.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
