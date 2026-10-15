import type { Metadata } from 'next';
import Link from 'next/link';
import VlaAssetLayout from '@/components/VlaAssetLayout';
import { buildPageMetadata } from '@/lib/seo';
import { vlaCatalog } from '@/lib/vla-catalog';

export const metadata: Metadata = buildPageMetadata('/vla/timeline');
const entries = [...vlaCatalog].sort((a, b) => a.date.localeCompare(b.date));

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
  </VlaAssetLayout>;
}
