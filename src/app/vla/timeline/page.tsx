import type { Metadata } from 'next';
import Link from 'next/link';
import VlaAssetLayout from '@/components/VlaAssetLayout';
import { buildPageMetadata } from '@/lib/seo';
import { vlaCatalog } from '@/lib/vla-catalog';

export const metadata: Metadata = buildPageMetadata('/vla/timeline');
const entries = [...vlaCatalog].sort((a, b) => a.date.localeCompare(b.date));

const readingGuide = {
  "id": "timeline-event-types",
  "heading": "A paper date is one event in a longer evidence history",
  "body": [
    "This timeline orders first arXiv submissions. It does not order the first public announcement, accepted conference version, code release or checkpoint release. On November 4, 2026, all 19 displayed first-submission dates matched the official arXiv metadata. That check validates the chronology field; it is not a fresh reproduction or complete artifact audit.",
    "Diffusion Policy illustrates the distinction: its first arXiv submission was March 7, 2023, while the current arXiv record identifies a March 14, 2024 extended journal version. The original pi0 entry starts on October 31, 2024; its arXiv history also contains a January 8, 2026 revision. A later revision can update evidence without making the original method a newly released model."
  ],
  "table": {
    "headers": [
      "Event",
      "Evidence to preserve",
      "What it cannot date"
    ],
    "rows": [
      [
        "First preprint submission",
        "Original identifier and v1 timestamp",
        "Every earlier talk, demo or private result"
      ],
      [
        "Paper revision",
        "Version, revised date and changed claims",
        "The first release of an unchanged method"
      ],
      [
        "Code or weight release",
        "Repository/tag or checkpoint revision and actual files",
        "A complete working robot deployment"
      ],
      [
        "Conference or journal publication",
        "Publisher/venue record and version relationship",
        "When code became available"
      ],
      [
        "Directory review",
        "Which fields were checked and unresolved access",
        "A new source event or new experiment"
      ]
    ]
  },
  "subsections": [
    {
      "heading": "Read the sequence by changing questions",
      "body": [
        "The entries trace several overlapping questions: conditioning actions on instructions, generating actions with different algorithms, adapting across robots, and incorporating contact feedback. Related planners and visuomotor methods are labelled because they illuminate those interfaces; their inclusion does not turn every entry into an end-to-end VLA.",
        "Use chronology to locate the source version, then use the comparison matrix for configuration and evidence. A newer paper is not automatically more deployable, more accurate or more relevant to a contact task. The selected set is intentionally bounded and should not be described as every model released worldwide."
      ]
    }
  ],
  "links": [
    {
      "label": "Diffusion Policy submission history",
      "href": "https://arxiv.org/abs/2303.04137"
    },
    {
      "label": "pi0 submission history",
      "href": "https://arxiv.org/abs/2410.24164"
    },
    {
      "label": "Inspect model configuration and access fields",
      "href": "/vla/models"
    },
    {
      "label": "Compare interfaces and learning mechanisms",
      "href": "/vla/concepts"
    }
  ]
};

export default function VlaTimelinePage() {
  return <VlaAssetLayout path="/vla/timeline" eyebrow="Research chronology" title="VLA model timeline"
    intro="Trace the development of vision-language-action models, related policy methods and tactile extensions, from RT-1 to the most recent paper in this reviewed selection.">
    <section className="pb-16">
      <div className="container-shell">
        <p className="mb-8 max-w-4xl text-sm leading-relaxed text-[#aeb8c7]">Dates below are the first arXiv submission dates linked in each entry, rather than code-release or conference dates.
          This curated chronology shares its records with the <Link href="/vla/models" className="text-[#ffd5c5] underline underline-offset-4">model comparison matrix</Link>.
          It includes related planners and policies where labeled and is not an exhaustive claim about the newest model worldwide.</p>
        <ol aria-label="VLA research timeline" className="relative ml-2 border-l border-[#ff6b3d]/35 pl-6 md:ml-4 md:pl-10">
          {entries.map((entry) => <li key={entry.id} id={entry.id} className="relative scroll-mt-24 pb-6">
            <span aria-hidden="true" className="absolute -left-[29px] top-7 h-2 w-2 rounded-full bg-[#ff6b3d] md:-left-[45px]" />
            <article className="signal-panel p-5 md:p-7">
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                <a href={entry.paper} className="font-mono text-sm text-[#ffd5c5] underline underline-offset-4"><time dateTime={entry.date}>{entry.date}</time></a>
                <span className="text-xs uppercase tracking-wider text-[#8e98a8]">{entry.role}</span>
              </div>
              <h2 className="mt-3 text-2xl font-semibold text-white"><a href={`#${entry.id}`}>{entry.name}</a></h2>
              <p className="mt-2 text-sm text-[#aeb8c7]"><a href={entry.organization.source} className="underline decoration-white/20 underline-offset-4 hover:text-white">{entry.organization.text}</a></p>
              <p className="mt-4 text-base leading-relaxed text-[#c8d1de]">{entry.description.text} <a href={entry.description.source} className="text-sm text-[#ffd5c5] underline underline-offset-4" aria-label={`Source for ${entry.name} significance`}>Source ↗</a></p>
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-[#ffd5c5]">
                <a href={entry.paper} className="underline underline-offset-4">Read paper ↗<span className="sr-only"> for {entry.name}</span></a>
                <Link href={`/vla/models#${entry.id}`} className="underline underline-offset-4">Compare model</Link>
              </div>
            </article>
          </li>)}
        </ol>
      </div>
    </section>
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
