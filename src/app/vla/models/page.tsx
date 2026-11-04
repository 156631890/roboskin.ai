import type { Metadata } from 'next';
import Link from 'next/link';
import VlaAssetLayout from '@/components/VlaAssetLayout';
import VlaComparisonMatrix from '@/components/VlaComparisonMatrix';
import { buildPageMetadata } from '@/lib/seo';
import { vlaCatalog } from '@/lib/vla-catalog';

export const metadata: Metadata = buildPageMetadata('/vla/models');

const readingGuide = {
  "id": "vla-shortlist-record",
  "heading": "Shortlist an executable configuration, not a headline score",
  "body": [
    "Use the filters to find candidates, then read the configuration behind each row. A tactile match may refer to a force/torque adaptation or a modular feedback path rather than the base checkpoint. A parameter count may cover a backbone, action head or complete policy. Neither field establishes that the system fits your sensor, compute or action interface.",
    "The dated catalog records remain distinct from this November 4, 2026 reading-guide update. First-submission metadata for all 19 papers was checked against arXiv. Artifact checks were narrower: the official ForceVLA2 and Vela pages still advertised forthcoming code, and VLA-Touch’s README still described its modified RDT inference script as forthcoming. Spark-0 and ViTaR project-page reads were unavailable in this pass; their earlier dated observations are not newly verified availability claims."
  ],
  "table": {
    "headers": [
      "Shortlist field",
      "What to record",
      "Reason to defer a comparison"
    ],
    "rows": [
      [
        "Executable artifact",
        "Exact checkpoint, code revision and release completeness",
        "Only a paper, demo or partial component is available"
      ],
      [
        "Observation/action contract",
        "Cameras, touch variant, robot state, normalization and controller interface",
        "The source’s robot adapter is missing or differs from yours"
      ],
      [
        "Adaptation cost",
        "Required data, training procedure and documented execution assumptions",
        "A fine-tuned result is being treated as zero-shot behavior"
      ],
      [
        "Comparable outcome",
        "Task, split, trial unit, assistance and success definition",
        "The same percentage refers to different tasks or evaluation units"
      ],
      [
        "Reuse conditions",
        "Code, weights, data and dependency terms separately",
        "A repository license is being applied to every artifact"
      ]
    ]
  },
  "subsections": [
    {
      "heading": "Read one score before comparing two",
      "body": [
        "The Diffusion Policy abstract reports an average improvement over comparison methods, while other rows show task success or a mean over benchmark suites. An improvement is not itself a success rate. Likewise, the OpenVLA reference result in the OFT paper is a later LIBERO evaluation, not the original real-robot aggregate. Keep the cited experiment attached to the number.",
        "For a proposed shortlist, record one supported configuration and one unresolved dependency per candidate before ranking suitability. Unknown does not mean unavailable forever, and a public link does not establish reproduction. No installation, weight download, API call or model run was performed for this review."
      ]
    }
  ],
  "links": [
    {
      "label": "Diffusion Policy: original metric wording",
      "href": "https://arxiv.org/abs/2303.04137"
    },
    {
      "label": "OpenVLA-OFT: evaluation source",
      "href": "https://arxiv.org/abs/2502.19645"
    },
    {
      "label": "VLA-Touch release scope",
      "href": "https://github.com/jxbi1010/VLA-Touch"
    },
    {
      "label": "Compare tactile integration roles",
      "href": "/robot-vla-models#tactile-vla-integration-index"
    },
    {
      "label": "Plan an evidence review",
      "href": "/research-services"
    }
  ]
};

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
    <section id={readingGuide.id} className="pb-14">
      <div className="container-shell">
        <div className="signal-panel p-6 md:p-8">
          <p className="text-sm text-soft">Reading guide reviewed November 4, 2026. Original catalog review dates remain above; no model execution.</p>
          <h2 className="mt-4 text-3xl font-semibold text-white">{readingGuide.heading}</h2>
          {readingGuide.body.map((text) => <p key={text} className="mt-4 leading-relaxed text-soft">{text}</p>)}
          <div className="mt-6 overflow-x-auto" tabIndex={0} role="region" aria-label={readingGuide.heading}>
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead><tr>{readingGuide.table.headers.map((text) => <th key={text} scope="col" className="border-b border-white/10 p-4 text-white">{text}</th>)}</tr></thead>
              <tbody>{readingGuide.table.rows.map((row) => <tr key={row[0]}>{row.map((text, index) => index === 0 ? <th key={text} scope="row" className="border-b border-white/10 p-4 align-top text-white">{text}</th> : <td key={text} className="border-b border-white/10 p-4 align-top leading-relaxed text-soft">{text}</td>)}</tr>)}</tbody>
            </table>
          </div>
          {readingGuide.subsections.map((section) => <div key={section.heading} className="mt-6"><h3 className="text-xl font-semibold text-white">{section.heading}</h3>{section.body.map((text) => <p key={text} className="mt-3 leading-relaxed text-soft">{text}</p>)}</div>)}
          <ul className="mt-6 grid gap-3">{readingGuide.links.map((link) => <li key={link.href}><Link href={link.href} className="text-sm font-semibold text-[#ffd5c5] underline underline-offset-4">{link.label}</Link></li>)}</ul>
        </div>
      </div>
    </section>
  </VlaAssetLayout>;
}
