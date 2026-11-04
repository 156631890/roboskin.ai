import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import ResearchResourceActions from '@/components/ResearchResourceActions';
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
              <dd className="mt-1 text-xs uppercase text-[#8e98a8]">records in this edition</dd>
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
          <p className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[#c8d1de]"><a className="underline" href="#newsletter">Weekly brief / signup status</a><Link className="underline" href="/reports/tactile-ai-robot-skin-landscape-2026">Free sample report</Link><Link className="underline" href="/research-services?source=research-index#inquiry">Discuss a research question</Link></p>
        </div>
      </section>

      <section id="index-version-and-claim-check" className="pb-12 pt-8 scroll-mt-28">
        <div className="container-shell">
          <h2 className="text-2xl font-semibold text-white md:text-3xl">{"Use the taxonomy without inheriting an old availability claim"}</h2>
          <p className="mt-4 max-w-4xl text-sm leading-relaxed text-soft">{"This structured index remains the 30-record edition identified above. Its root exports and preserved release have matching record content at this review. The November 4, 2026 update improves reading guidance; it does not redate every record or publish a new dataset edition."}</p>
          <div className="mt-6 overflow-x-auto rounded-md border border-white/10" tabIndex={0} role="region" aria-label="Use the taxonomy without inheriting an old availability claim">
            <table className="w-full min-w-[720px] border-collapse text-left text-sm"><thead><tr><th scope="col" className="border-b border-white/10 px-4 py-3 text-white">{"When you use a record"}</th><th scope="col" className="border-b border-white/10 px-4 py-3 text-white">{"What to check"}</th><th scope="col" className="border-b border-white/10 px-4 py-3 text-white">{"Where to continue"}</th></tr></thead><tbody>
              <tr><th scope="row" className="border-b border-white/10 px-4 py-4 align-top font-semibold text-white">{"Compare sensing approaches"}</th><td className="border-b border-white/10 px-4 py-4 align-top leading-relaxed text-soft">{"Read modality, output and application together. A three-axis force estimate and an optical image are not interchangeable observations."}</td><td className="border-b border-white/10 px-4 py-4 align-top"><Link href="/technology" className="text-accent underline underline-offset-4">{"Measurement principles and limits"}</Link></td></tr>
              <tr><th scope="row" className="border-b border-white/10 px-4 py-4 align-top font-semibold text-white">{"Quote a numerical result"}</th><td className="border-b border-white/10 px-4 py-4 align-top leading-relaxed text-soft">{"Open the current review and original paper version. Historical shorthand may omit a subtask denominator or experimental condition."}</td><td className="border-b border-white/10 px-4 py-4 align-top"><Link href="/research/t-rex-tactile-reactive-dexterous-manipulation-2026" className="text-accent underline underline-offset-4">{"T-Rex score versus complete success"}</Link></td></tr>
              <tr><th scope="row" className="border-b border-white/10 px-4 py-4 align-top font-semibold text-white">{"Download or redistribute material"}</th><td className="border-b border-white/10 px-4 py-4 align-top leading-relaxed text-soft">{"Check current access and artifact-specific terms. An older record saying release pending is dated evidence, not a live availability check."}</td><td className="border-b border-white/10 px-4 py-4 align-top"><Link href="/datasets#availability-analysis" className="text-accent underline underline-offset-4">{"Current dataset access analysis"}</Link></td></tr>
            </tbody></table>
          </div>
          <p className="mt-5 max-w-4xl text-sm leading-relaxed text-soft">{"CC BY 4.0 applies to the RoboSkin index metadata, not automatically to the papers, source datasets, model weights, images or code it references. The fixed research index and the evolving dataset directory count different things. For a citation, retain the edition and source URL; for an engineering decision, also retain the date and result of your own artifact check."}</p>
          <div className="mt-5 flex flex-wrap gap-4 text-sm"><Link href="/research" className="text-accent underline underline-offset-4">{"Current research reviews"}</Link><Link href="/editorial-policy" className="text-accent underline underline-offset-4">{"Source conflicts and corrections"}</Link><Link href="/contact?requestType=correction" className="text-accent underline underline-offset-4">{"Report a specific record issue"}</Link></div>
          <p className="mt-5 text-xs text-soft">Reading guidance updated <time dateTime="2026-11-04">November 4, 2026</time>.</p>
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
            <h2 className="mt-4 text-3xl font-bold text-white">Live directory and preserved release</h2>
            <p className="mt-4 text-sm text-soft">The explorer and root CSV/JSON show the current structured index. The dated release is a fixed snapshot. Counts below describe that snapshot; a live page is not a new release merely because its layout changes.</p>
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
                <dd className="mt-1 font-mono text-sm font-semibold text-white">{researchIndexRelease.recordCount}</dd>
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
            <div className="mt-5 flex flex-wrap gap-4 text-sm underline"><a href={researchIndexRelease.jsonPath}>Preserved JSON</a><a href={researchIndexRelease.csvPath}>Preserved CSV</a><a href="/datasets#availability-analysis">Dataset availability analysis</a></div>
            <p className="mt-5 text-sm text-soft">Change log: 2026-09-13 — clarified live and fixed-release scope; the structured records still match the published release, so no new index version was created.</p>
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
      <div className="container-shell pb-12"><ResearchResourceActions /></div>
    </>
  );
}
