import type { Metadata } from 'next';
import Link from 'next/link';
import VlaAssetLayout from '@/components/VlaAssetLayout';
import VlaComparisonMatrix from '@/components/VlaComparisonMatrix';
import { buildPageMetadata } from '@/lib/seo';
import { vlaCatalog } from '@/lib/vla-catalog';

export const metadata: Metadata = buildPageMetadata('/vla/models');

export default function VlaModelsPage() {
  return <VlaAssetLayout path="/vla/models" eyebrow="Source-linked model matrix" title="VLA model comparison"
    intro="Compare vision-language-action models by inputs, code access, training data and source-specific results. Start with contact feedback when your task depends on touch.">
    <section className="pb-10">
      <div className="container-shell">
        <div className="signal-panel p-6 text-sm leading-relaxed text-[#c8d1de]">
          <h2 className="text-xl font-semibold text-white">Methodology and scope</h2>
          <p className="mt-3">Inclusion: published robot policies that connect visual observations and instructions to action, plus explicitly labeled related planners and policy methods needed to understand the field.
            PaLM-E is a related planner; original Diffusion Policy is a related visuomotor policy. Inclusion does not imply that every row is an end-to-end VLA.</p>
          <p className="mt-3">Sources: arXiv papers, official project pages and author-linked repositories. Each factual cell links its evidence. Year means first arXiv submission; access describes the source-review date.
            Updates are manual and event-driven: records are revised when a release or correction is checked against primary sources. There is no automatic refresh.</p>
          <p className="mt-3">“Open code” describes a released implementation, not unrestricted weights, data or a fully reproducible deployment. Partial releases and unknown availability have separate filters.
            “not found” records an unresolved field, not a zero value. A tactile checkmark includes documented contact-force sensing and identifies variant-only or modular integration in the row.</p>
          <p className="mt-3">Benchmark scores are examples from different tasks, robots, datasets and metrics, not a shared leaderboard. Parameter counts also differ in whether backbones or whole systems are counted.
            Follow the source before comparing numbers, and use the <Link href="/robot-vla-models#tactile-vla-integration-index" className="text-[#ffd5c5] underline underline-offset-4">existing tactile integration evidence map</Link> for deeper mechanism-level context.</p>
        </div>
      </div>
    </section>
    <VlaComparisonMatrix entries={vlaCatalog} />
  </VlaAssetLayout>;
}
