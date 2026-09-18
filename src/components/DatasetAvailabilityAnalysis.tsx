import Link from 'next/link';
import type { RoboticsDatasetEntry } from '@/lib/robotics-datasets';
import { accessLabels, datasetAudit, getDatasetEvidence, summarizeDatasetEvidence } from '@/lib/dataset-evidence.mjs';

export default function DatasetAvailabilityAnalysis({ entries }: { entries: RoboticsDatasetEntry[] }) {
  const stats = summarizeDatasetEvidence(entries);
  return (
    <section id="availability-analysis" className="container-shell py-12 scroll-mt-24" aria-labelledby="availability-heading">
      <p className="eyebrow">Recomputable directory analysis · {datasetAudit.version}</p>
      <h2 id="availability-heading" className="mt-4 text-3xl font-bold">Public availability and reproduction conditions</h2>
      <p className="mt-4 max-w-4xl text-soft">Compiled {datasetAudit.compiledAt} from the {stats.total} records in this tactile directory. This is a selected research sample, not an industry census. Individual source-review and access-check dates appear in each record. A public manifest is evidence of hosted paths, not proof that all payloads download or a result can be reproduced.</p>
      <div className="mt-6 overflow-x-auto" role="region" aria-label="Availability coverage" tabIndex={0}>
        <table className="w-full text-left text-sm">
          <caption className="mb-3 text-left">Counts include unknowns in the denominator ({stats.total}); no missing value is treated as a negative result.</caption>
          <thead><tr><th className="p-3">Evidence category</th><th className="p-3">Records</th><th className="p-3">Interpretation</th></tr></thead>
          <tbody>
            {Object.entries(stats.access).map(([key, count]) => <tr key={key} className="border-t border-white/10"><th className="p-3 font-normal">{accessLabels[key]}</th><td className="p-3">{String(count)} / {stats.total}</td><td className="p-3">As recorded on each access-check date; access can change.</td></tr>)}
            <tr className="border-t border-white/10"><th className="p-3 font-normal">Dataset-specific license documented</th><td className="p-3">{stats.licenseDocumented} / {stats.total}</td><td className="p-3">{stats.licenseUnknown} unknown; a paper or code license does not fill this field.</td></tr>
            <tr className="border-t border-white/10"><th className="p-3 font-normal">Split files listed</th><td className="p-3">{stats.splitFilesListed} / {stats.total}</td><td className="p-3">Listing only; split membership and leakage not checked.</td></tr>
            <tr className="border-t border-white/10"><th className="p-3 font-normal">Split tools / protocol described</th><td className="p-3">{stats.splitProtocolDescribed} / {stats.total}</td><td className="p-3">Distinct from inspecting released splits; {stats.splitUnknown} records remain unknown.</td></tr>
          </tbody>
        </table>
      </div>
      <p className="mt-5 text-soft">The practical constraint is the evidence gap between a paper-scale claim and a usable training package. This audit inspected {stats.manifestInspected} provider manifests without downloading dataset payloads. Start by pinning a release, reading dataset-file terms, checking the schema and units, and validating the train/test boundary before running a baseline.</p>
      <div className="mt-5 flex flex-wrap gap-5 text-sm underline">
        <a href="/datasets.json">Download audit records and counts (JSON)</a>
        <a href={`/releases/datasets/${datasetAudit.version}.json`}>Preserved audit snapshot</a>
        <Link href="/research-index">Compare the research methods</Link>
        <Link href="/guides/ros2-tactile-sensing">Design a record-and-replay check in ROS 2</Link>
      </div>
      <details className="mt-6 border border-white/10 p-5"><summary className="cursor-pointer font-semibold">Specific evidence still to verify</summary>
        <ul className="mt-4 space-y-3 text-sm text-soft">{entries.filter(entry => {
          const e = getDatasetEvidence(entry); return e.licenseStatus === 'unknown' || e.splitStatus === 'unknown';
        }).map(entry => { const e = getDatasetEvidence(entry); return <li key={entry.id}><a className="underline" href={`#dataset-${entry.id}`}>{entry.name}</a>: {e.licenseStatus === 'unknown' ? 'dataset-file terms; ' : ''}{e.splitStatus === 'unknown' ? 'train/test split evidence; ' : ''}payload completeness and reproduction remain unchecked.</li>; })}</ul>
      </details>
      <div id="dataset-changelog" className="mt-8 scroll-mt-24">
        <h3 className="text-xl font-semibold">Directory change log</h3>
        <p className="mt-3 text-sm text-soft"><time>2026-09-18</time> — Added Bench2Dex simulation demonstrations with a pinned public manifest, separate license fields and original authors. STAR remains a paper-linked candidate outside the catalog count and Dataset schema. Published a new audit snapshot; older records retain their own verification dates.</p>
        <p className="mt-3 text-sm text-soft"><time>2026-09-13</time> — Added separate access evidence, provider revisions, public-manifest scale, dataset-file license status and split evidence to existing records, with computable counts and JSON export. <a className="underline" href="/releases/datasets/v2026.09.13.json">Original audit snapshot</a>.</p>
      </div>
    </section>
  );
}
