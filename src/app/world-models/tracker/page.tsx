import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import WorldModelTracker from '@/components/WorldModelTracker';
import { buildPageMetadata } from '@/lib/seo';
import { worldModelTrackerEntries } from '@/lib/world-model-tracker';
import { buildWorldModelTrackerDataset, latestTrackerReview } from '@/lib/world-model-tracker-tools.mjs';

export const dynamic = 'force-static';
export const metadata: Metadata = buildPageMetadata('/world-models/tracker');

export default function WorldModelTrackerPage() {
  return <>
    <JsonLd data={buildWorldModelTrackerDataset(worldModelTrackerEntries)} />
    <section className="py-14 md:py-20">
      <div className="container-shell">
        <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap gap-2 text-sm text-soft"><Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/robot-world-models">Robot world models</Link><span aria-hidden="true">/</span><span aria-current="page">Tracker</span></nav>
        <p className="eyebrow">The tactile layer of world models</p>
        <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-tight text-white md:text-6xl">Tactile World Model Tracker</h1>
        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-soft">Explore robot world models that predict or use tactile, contact and force information. Compare what each model predicts, the hardware it uses, and the evidence behind its real-robot evaluation. Records are updated as primary sources are checked.</p>
        <div className="signal-panel mt-6 max-w-4xl border-l-4 border-l-[#ff6b3d] p-5" role="note">
          <p className="font-semibold text-white">Review preview — editorial approval pending</p>
          <p className="mt-2 text-sm leading-relaxed text-soft">These source-backed records are available for review. Assessments and evidence grades are provisional, and authors have not confirmed them. This page is excluded from search indexing until editorial review is complete.</p>
        </div>
        <dl className="mt-7 flex flex-wrap gap-8"><div><dt className="text-sm text-soft">Models tracked</dt><dd className="mt-1 font-mono text-2xl text-white">{worldModelTrackerEntries.length}</dd></div><div><dt className="text-sm text-soft">Latest source check</dt><dd className="mt-1 font-mono text-xl text-white"><time dateTime={latestTrackerReview(worldModelTrackerEntries)}>{latestTrackerReview(worldModelTrackerEntries)}</time></dd></div></dl>
        <Link href="#tracker-records" className="btn-primary mt-7">Explore the records →</Link>
      </div>
    </section>
    <WorldModelTracker entries={worldModelTrackerEntries} />
    <section id="evidence-levels" className="container-shell scroll-mt-28 pb-16">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="signal-panel p-6"><h2 className="text-2xl font-semibold text-white">How to read the evidence</h2><dl className="mt-5 space-y-4 text-sm leading-relaxed text-soft">
          <div><dt className="font-semibold text-white">A — Real robot and released code</dt><dd>Author-run physical evaluation plus a verified public implementation. This does not imply independent replication.</dd></div>
          <div><dt className="font-semibold text-white">B — Real robot, code explicitly unreleased</dt><dd>Physical evaluation with an explicit coming-soon or no-release statement.</dd></div>
          <div><dt className="font-semibold text-white">C — Simulation only</dt><dd>The reviewed evaluation is confined to simulation.</dd></div>
          <div><dt className="font-semibold text-white">D — Insufficient evidence for a complete grade</dt><dd>This includes real-robot papers whose code release status is unknown. Read the separate evaluation column; D does not mean no robot experiment was reported.</dd></div>
        </dl><p className="mt-5 text-sm text-soft">Trials are counted per policy, task and evaluation condition. TouchWorld reports 100 rollouts per task without a condition split, so its per-setting count stays unknown. ViTacWorld uses the v2 50-trial protocol.</p></div>
        <div className="signal-panel p-6"><h2 className="text-2xl font-semibold text-white">Scope, sources and corrections</h2><p className="mt-5 text-sm leading-relaxed text-soft">Inclusion requires a versioned primary source connecting robotic world prediction to touch, contact or force. General video generation, games and cinematic world building are outside scope. Predicted modalities are outputs rather than conditioning inputs; HiTac-WAM is classified by its tactile forecast head.</p><p className="mt-4 text-sm leading-relaxed text-soft">Different robots, tasks and protocols are not a shared leaderboard. Source review does not establish reproducibility, deployment safety or transfer to another sensor. Missing artifact links stay unknown; article licenses do not license models or datasets.</p><p className="mt-4 text-sm text-soft">RoboSkin.ai’s original tracker compilation is offered under <a href="https://creativecommons.org/licenses/by/4.0/" className="text-accent underline">CC BY 4.0</a>. Cite “RoboSkin.ai Tactile World Model Tracker” with this page URL and your access date. Third-party papers, code, weights and data retain their own terms.</p><Link href="/contact?requestType=research" className="btn-secondary mt-6">Submit a model or correction →</Link></div>
      </div>
    </section>
  </>;
}
