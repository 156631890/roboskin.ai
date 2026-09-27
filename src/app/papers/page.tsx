import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import { interactionPaper as paper } from '@/content/working-papers';
import { buildBreadcrumbJsonLd, buildGraphJsonLd, buildPageJsonLd, buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata('/papers');

export default function WorkingPapersPage() {
  return (
    <>
      <JsonLd data={buildGraphJsonLd([buildPageJsonLd('/papers'), buildBreadcrumbJsonLd('/papers')])} />
      <section className="py-14 md:py-20">
        <div className="container-shell">
          <nav aria-label="Breadcrumb" className="mb-9 flex flex-wrap gap-2 text-sm text-[#aebaca]">
            <Link href="/research" className="hover:text-white">Research</Link>
            <span aria-hidden="true">/</span><span>Working Papers</span>
          </nav>
          <p className="eyebrow">Research in progress</p>
          <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-tight text-white md:text-6xl">RoboSkin Working Papers</h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[#c8d1de]">
            Research proposals, technical notes, and reproducible studies developed for RoboSkin.ai.
            Follow the question, inspect the evidence, and explore the supporting materials.
          </p>
          <div className="mt-7 flex flex-wrap gap-3 text-sm">
            <span className="rounded-full border border-[#ff6b3d]/40 bg-[#ff6b3d]/10 px-4 py-2 text-[#ffac8f]">1 working paper</span>
            <Link href="/research#research-notes" className="rounded-full border border-white/15 px-4 py-2 text-[#c8d1de] hover:text-white">Explore external paper reviews →</Link>
          </div>
        </div>
      </section>

      <section className="pb-20" aria-label="Working papers">
        <div className="container-shell grid gap-8 lg:grid-cols-[1.7fr_1fr] lg:items-start">
          <article className="signal-panel min-w-0 overflow-hidden p-0">
            <div className="border-b border-white/10 bg-[#ff6b3d]/5 px-6 py-5 md:px-9">
              <div className="flex flex-wrap gap-x-4 gap-y-2 font-mono text-xs uppercase tracking-wider text-[#ffac8f]">
                <span>{paper.status}</span><span>Version {paper.version}</span><span>Not peer reviewed</span>
              </div>
            </div>
            <div className="p-6 md:p-9">
              <time dateTime={paper.date} className="text-sm text-[#aebaca]">{paper.displayDate}</time>
              <h2 className="mt-5 text-3xl font-semibold leading-tight text-white md:text-4xl">
                <Link href={paper.path} className="hover:text-[#ffac8f]">{paper.title}</Link>
              </h2>
              <p className="mt-3 text-lg leading-relaxed text-[#c8d1de]">{paper.subtitle}</p>
              <p className="mt-6 text-base leading-relaxed text-[#aebaca]">{paper.summary}</p>
              <p className="mt-6 border-l-2 border-[#ff6b3d] pl-4 text-sm leading-relaxed text-[#c8d1de]">
                Current evidence: analytical example and synthetic decision benchmark. The learning architecture remains a proposal.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link href={paper.path} className="btn-primary">Explore this working paper →</Link>
                <a href={paper.downloads.pdf} className="btn-secondary" target="_blank" rel="noopener noreferrer">Read PDF <span className="sr-only">(opens in a new tab)</span></a>
              </div>
            </div>
          </article>

          <aside className="space-y-7 px-1 lg:pl-5">
            <div>
              <h2 className="text-xl font-semibold text-white">Read with the evidence</h2>
              <p className="mt-3 text-sm leading-relaxed text-[#aebaca]">Every entry states its research stage, what was actually measured, and what remains to be tested. Working papers can change as the research develops.</p>
            </div>
            <div className="border-t border-white/10 pt-6">
              <h2 className="text-xl font-semibold text-white">Open supporting materials</h2>
              <p className="mt-3 text-sm leading-relaxed text-[#aebaca]">Use versioned manuscripts, source files, and experiment packages to inspect the work. Each paper keeps a record of substantive revisions.</p>
            </div>
            <div className="border-t border-white/10 pt-6">
              <h2 className="text-xl font-semibold text-white">Help shape the next study</h2>
              <p className="mt-3 text-sm leading-relaxed text-[#aebaca]">Method critiques, relevant prior work, and collaboration proposals are welcome.</p>
              <Link href="/contact?requestType=research" className="mt-4 inline-block text-sm font-semibold text-[#ffac8f] hover:text-white">Send research feedback →</Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
