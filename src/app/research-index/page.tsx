import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import ResearchIndexExplorer from '@/components/ResearchIndexExplorer';
import { researchIndexEntries, researchIndexUpdatedAt } from '@/lib/research-index';
import { researchIndexRelease } from '@/lib/research-index-release';
import {
  buildBreadcrumbJsonLd,
  buildGraphJsonLd,
  buildPageJsonLd,
  buildPageMetadata,
  buildResearchIndexJsonLd,
} from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata('/research-index');

export default function ResearchIndexPage() {
  return (
    <>
      <JsonLd data={buildGraphJsonLd([
        buildPageJsonLd('/research-index'),
        buildBreadcrumbJsonLd('/research-index'),
      ])} />
      <JsonLd data={buildResearchIndexJsonLd(researchIndexEntries)} />

      <section className="py-14 md:py-20">
        <div className="container-shell grid gap-10 lg:grid-cols-[1fr_420px] lg:items-center">
          <div>
            <p className="eyebrow">Original research asset</p>
            <h1 className="mt-5 max-w-5xl text-4xl font-bold leading-tight text-white md:text-6xl">
              RoboSkin Tactile Research Index
            </h1>
            <p className="mt-5 max-w-4xl text-base leading-relaxed text-[#c8d1de] md:text-lg">
              The RoboSkin Tactile Research Index compares public robot-skin and tactile-AI work by sensing principle, measured modalities, form factor, data output, application direction, evidence level, and explicit limitations. Every record links to its public source and a RoboSkin.ai research brief so readers can verify context before using the taxonomy.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a href="#research-explorer" className="btn-primary">Explore records <span aria-hidden="true"> ↓</span></a>
              <Link href="/research-index.csv" className="btn-secondary">Open CSV data</Link>
              <Link href="/research-index.json" className="btn-secondary">Open JSON data</Link>
              <a href={researchIndexRelease.repositoryUrl} target="_blank" rel="noreferrer" className="btn-tertiary">
                Open GitHub repository ↗
              </a>
              <Link href="/research" className="btn-tertiary">Browse research briefs</Link>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-white/10 bg-[#020408]">
            <Image
              src="/generated/authority/roboskin-index-cover.webp"
              alt="RoboSkin tactile research index cover showing a robot hand, sensor layers, and structured data signals."
              fill
              priority
              sizes="(min-width: 1024px) 420px, 100vw"
              className="object-cover"
            />
          </div>
        </div>
        <div className="container-shell">
          <dl className="mt-9 grid gap-3 sm:grid-cols-3">
            <div className="border-l-2 border-[#ff6b3d] pl-4">
              <dt className="font-mono text-2xl font-semibold text-white">{researchIndexEntries.length}</dt>
              <dd className="mt-1 text-xs uppercase text-[#8e98a8]">reviewed records</dd>
            </div>
            <div className="border-l-2 border-[#ff6b3d] pl-4">
              <dt className="font-mono text-2xl font-semibold text-white">{new Set(researchIndexEntries.map((entry) => entry.evidence)).size}</dt>
              <dd className="mt-1 text-xs uppercase text-[#8e98a8]">evidence classes</dd>
            </div>
            <div className="border-l-2 border-[#ff6b3d] pl-4">
              <dt className="font-mono text-2xl font-semibold text-white">{researchIndexUpdatedAt}</dt>
              <dd className="mt-1 text-xs uppercase text-[#8e98a8]">edition reviewed</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="pb-16 md:pb-20" aria-label="Search the research index">
        <div className="container-shell">
          <ResearchIndexExplorer entries={researchIndexEntries} />
        </div>
      </section>

      <section className="border-y border-white/8 bg-white/[0.018] py-10 md:py-14" aria-labelledby="research-index-citation-heading">
        <div className="container-shell grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-14">
          <article>
            <p className="eyebrow">Versioned public release</p>
            <h2 className="mt-4 text-3xl font-bold text-white">A stable research asset, not a changing article list</h2>
            <dl className="mt-7 grid gap-4 border-y border-white/10 py-5 sm:grid-cols-3 lg:grid-cols-1">
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#8e98a8]">Version</dt>
                <dd className="mt-1 font-mono text-sm font-semibold text-white">{researchIndexRelease.version}</dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#8e98a8]">Data license</dt>
                <dd className="mt-1 text-sm font-semibold text-white">{researchIndexRelease.licenseShortName}</dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#8e98a8]">Records</dt>
                <dd className="mt-1 font-mono text-sm font-semibold text-white">{researchIndexEntries.length}</dd>
              </div>
            </dl>
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
              <a href={researchIndexRelease.releaseUrl} target="_blank" rel="noreferrer" className="text-[#ff6b3d] hover:text-white">
                Open versioned release ↗
              </a>
              <a href={researchIndexRelease.licenseUrl} target="_blank" rel="noreferrer" className="text-[#ff6b3d] hover:text-white">
                Read the data license ↗
              </a>
            </div>
          </article>

          <article>
            <p className="eyebrow">Citation</p>
            <h2 id="research-index-citation-heading" className="mt-4 text-3xl font-bold text-white">Cite the index with its reviewed version</h2>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#c8d1de]">
              Cite the version you actually reviewed. The GitHub release preserves matching CSV and JSON files while this page remains the canonical human-readable route.
            </p>
            <blockquote className="mt-6 border-l-2 border-[#ff6b3d] bg-[#11110f] px-5 py-4 text-sm leading-relaxed text-[#f3efe5]">
              {researchIndexRelease.citation}
            </blockquote>
            <details className="mt-4 border border-white/10 bg-[#080a0e] p-4">
              <summary className="cursor-pointer text-sm font-semibold text-white">BibTeX-compatible entry</summary>
              <code className="mt-4 block overflow-x-auto whitespace-pre-wrap font-mono text-xs leading-relaxed text-[#aeb8c7]">
                {researchIndexRelease.bibtex}
              </code>
            </details>
          </article>
        </div>
      </section>



      <section className="border-y border-white/8 py-14 md:py-20">
        <div className="container-shell grid gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Methodology</p>
            <h2 className="mt-4 text-3xl font-bold text-white">Source identity stays separate from editorial taxonomy</h2>
            <p className="mt-4 text-sm leading-relaxed text-[#c8d1de]">
              Titles, source labels, and source URLs come from the cited research records. Sensor principle, modality, form factor, output, application, evidence, and limitation fields are conservative editorial normalization by the RoboSkin.ai Editorial Team. The source remains authoritative for its own claims.
            </p>
            <Link href="/organizations" className="mt-5 inline-flex text-sm font-semibold text-[#ff6b3d] hover:text-white">
              Trace normalized research organizations {'->'}
            </Link>
          </div>
          <div>
            <p className="eyebrow">Limitations</p>
            <h2 className="mt-4 text-3xl font-bold text-white">This index is a map, not a product benchmark</h2>
            <p className="mt-4 text-sm leading-relaxed text-[#c8d1de]">
              Inclusion does not imply affiliation, endorsement, commercial availability, or equivalent performance across sensors and tasks. Evidence labels describe the cited public source type, not a universal quality score. Review the original source and application conditions before making an engineering decision.
            </p>
            <Link href="/contact?requestType=research" className="mt-5 inline-flex text-sm font-semibold text-[#ff6b3d] hover:text-white">
              Submit a correction {'->'}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
