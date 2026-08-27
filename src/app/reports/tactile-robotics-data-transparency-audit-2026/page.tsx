import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import { site } from '@/content/site';
import {
  buildBreadcrumbJsonLd,
  buildEditorialLeadJsonLd,
  buildGraphJsonLd,
  buildPageJsonLd,
  buildPageMetadata,
  canonicalUrl,
} from '@/lib/seo';
import {
  tactileDataAuditMethod,
  tactileDataAuditPath,
  tactileDataAuditPercent,
  tactileDataAuditPublished,
  tactileDataAuditRows,
  tactileDataAuditSummary,
} from '@/lib/tactile-data-transparency-audit';

export const metadata: Metadata = buildPageMetadata(tactileDataAuditPath);

const auditMetrics = [
  {
    label: 'Dedicated dataset URL',
    value: tactileDataAuditSummary.recordsWithDatasetUrl,
    definition: 'A dataset or file-hosting URL is present in the reviewed record.',
  },
  {
    label: 'Direct license URL',
    value: tactileDataAuditSummary.recordsWithLicenseUrl,
    definition: 'A machine-verifiable license URL is present, not only a prose license name.',
  },
  {
    label: 'Code repository',
    value: tactileDataAuditSummary.recordsWithCodeRepository,
    definition: 'A public GitHub repository URL is attached to the record.',
  },
  {
    label: 'Sampling rate mentioned',
    value: tactileDataAuditSummary.recordsMentioningSamplingRate,
    definition: 'The audited record text contains an explicit numeric Hz or FPS expression.',
  },
  {
    label: 'Synchronization mentioned',
    value: tactileDataAuditSummary.recordsMentioningSynchronization,
    definition: 'The audited record text mentions synchronization or timestamps.',
  },
  {
    label: 'Train/test/split mentioned',
    value: tactileDataAuditSummary.recordsMentioningDataSplit,
    definition: 'The audited record text mentions a training, validation, test, or split signal.',
  },
];

const yesNo = (value: boolean) => value ? 'Yes' : 'No';

export default function TactileRoboticsDataTransparencyAuditPage() {
  const reportUrl = canonicalUrl(tactileDataAuditPath);
  const articleId = `${reportUrl}#article`;
  const dataId = `${reportUrl}#dataset`;
  const authorId = `${canonicalUrl(site.editorial.lead.path)}#person`;
  const reportJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    '@id': articleId,
    headline: 'Tactile Robotics Dataset Transparency Audit 2026',
    description: metadata.description,
    url: reportUrl,
    datePublished: tactileDataAuditPublished,
    dateModified: tactileDataAuditPublished,
    inLanguage: 'en',
    author: { '@id': authorId },
    reviewedBy: { '@id': authorId },
    publisher: { '@id': `${site.url}/#organization` },
    mainEntityOfPage: { '@id': `${reportUrl}#webpage` },
    mainEntity: { '@id': dataId },
    about: [
      'tactile robotics datasets',
      'dataset transparency',
      'tactile AI',
      'robot learning data',
    ],
    citation: tactileDataAuditRows.map((row) => row.paperUrl),
  };
  const datasetJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    '@id': dataId,
    name: 'RoboSkin Tactile Robotics Dataset Transparency Audit 2026',
    description:
      'Record-level disclosure audit derived from the RoboSkin.ai tactile robotics dataset directory.',
    url: reportUrl,
    datePublished: tactileDataAuditPublished,
    dateModified: tactileDataAuditPublished,
    creator: { '@id': authorId },
    publisher: { '@id': `${site.url}/#organization` },
    isBasedOn: tactileDataAuditRows.map((row) => row.paperUrl),
    variableMeasured: auditMetrics.map((metric) => metric.label),
    distribution: [
      {
        '@type': 'DataDownload',
        encodingFormat: 'text/csv',
        contentUrl: canonicalUrl(`${tactileDataAuditPath}.csv`),
      },
      {
        '@type': 'DataDownload',
        encodingFormat: 'application/json',
        contentUrl: canonicalUrl(`${tactileDataAuditPath}.json`),
      },
    ],
  };

  return (
    <>
      <JsonLd data={buildGraphJsonLd([
        buildPageJsonLd(tactileDataAuditPath),
        buildBreadcrumbJsonLd(tactileDataAuditPath),
        reportJsonLd,
        datasetJsonLd,
        buildEditorialLeadJsonLd(),
      ])} />

      <main>
        <section className="py-14 md:py-20">
          <div className="container-shell grid gap-10 lg:grid-cols-[0.72fr_1fr] lg:items-end">
            <div>
              <p className="eyebrow">Original data audit / 2026 edition</p>
              <h1 className="mt-5 text-4xl font-bold leading-tight text-white md:text-6xl">
                Tactile robotics dataset transparency audit
              </h1>
              <p className="mt-5 max-w-4xl text-base leading-relaxed text-[#c8d1de] md:text-lg">
                A reproducible audit of what {tactileDataAuditSummary.totalRecords} source-reviewed tactile robotics dataset records disclose about public data URLs, direct license links, code, sampling rates, synchronization, and data splits.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[#8e98a8]">
                Published and reviewed {tactileDataAuditPublished} by{' '}
                <Link href={site.editorial.lead.path} rel="author" className="font-semibold text-[#ffd5c5] hover:text-white">
                  {site.editorial.lead.name}
                </Link>. Source records were last reviewed through {tactileDataAuditSummary.latestSourceReview}.
              </p>
            </div>
            <div className="signal-panel p-6 md:p-8">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#ff6b3d]">Reusable data</p>
              <p className="mt-3 text-sm leading-relaxed text-[#c8d1de]">
                The human-readable table, CSV, and JSON are generated from the same records and the same deterministic checks.
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link href={`${tactileDataAuditPath}.csv`} className="btn-primary">Open CSV</Link>
                <Link href={`${tactileDataAuditPath}.json`} className="btn-secondary">Open JSON</Link>
                <Link href="/datasets" className="btn-tertiary">Inspect full records</Link>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-white/8 bg-white/[0.018] py-12 md:py-16" aria-labelledby="findings-heading">
          <div className="container-shell">
            <p className="eyebrow">Computed findings</p>
            <h2 id="findings-heading" className="mt-4 text-3xl font-bold text-white md:text-4xl">
              Disclosure is measurable only when the rule stays narrow
            </h2>
            <p className="mt-4 max-w-4xl text-sm leading-relaxed text-[#c8d1de]">
              These counts are generated from the current directory. They do not turn a URL, keyword, or repository into a quality score. Each card states exactly what passed the audit rule.
            </p>
            <dl className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {auditMetrics.map((metric) => (
                <div key={metric.label} className="signal-panel p-5">
                  <dt className="text-sm font-semibold text-white">{metric.label}</dt>
                  <dd className="mt-3 flex items-baseline gap-3">
                    <span className="font-mono text-3xl font-bold text-[#ff6b3d]">{metric.value}/{tactileDataAuditSummary.totalRecords}</span>
                    <span className="font-mono text-xs text-[#8e98a8]">{tactileDataAuditPercent(metric.value)}%</span>
                  </dd>
                  <p className="mt-3 text-xs leading-relaxed text-[#aeb8c7]">{metric.definition}</p>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="py-14 md:py-20" aria-labelledby="record-audit-heading">
          <div className="container-shell">
            <div className="grid gap-6 lg:grid-cols-[0.55fr_1fr] lg:items-end">
              <div>
                <p className="eyebrow">Record-level evidence</p>
                <h2 id="record-audit-heading" className="mt-4 text-3xl font-bold text-white md:text-4xl">
                  Every yes and no is inspectable
                </h2>
              </div>
              <p className="text-sm leading-relaxed text-[#c8d1de]">
                “No” means the field or disclosure signal did not pass this audit rule in the current RoboSkin.ai record. It does not prove that the information is absent from every version of the underlying project.
              </p>
            </div>
            <div className="mt-8 overflow-x-auto rounded-md border border-white/10 bg-[#020408]">
              <table className="w-full min-w-[1180px] border-collapse text-left text-sm">
                <caption className="sr-only">Record-level disclosure checks for every tactile robotics dataset entry in this audit.</caption>
                <thead className="border-b border-white/10 bg-white/[0.03]">
                  <tr>
                    {['Dataset record', 'Year', 'Data URL', 'License URL', 'Code', 'Rate', 'Sync', 'Split', 'Reviewed', 'Primary source'].map((heading) => (
                      <th key={heading} scope="col" className="px-4 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-[#ffd5c5]">
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tactileDataAuditRows.map((row) => (
                    <tr key={row.id} className="border-b border-white/8 last:border-b-0">
                      <th scope="row" className="px-4 py-4 align-top font-semibold text-white">
                        <Link href={`/datasets#dataset-${row.id}`} className="hover:text-[#ff6b3d]">{row.name}</Link>
                      </th>
                      <td className="px-4 py-4 align-top text-[#c8d1de]">{row.year}</td>
                      <td className="px-4 py-4 align-top text-[#c8d1de]">{yesNo(row.hasDatasetUrl)}</td>
                      <td className="px-4 py-4 align-top text-[#c8d1de]">{yesNo(row.hasLicenseUrl)}</td>
                      <td className="px-4 py-4 align-top text-[#c8d1de]">{yesNo(row.hasCodeRepository)}</td>
                      <td className="px-4 py-4 align-top text-[#c8d1de]">{yesNo(row.mentionsSamplingRate)}</td>
                      <td className="px-4 py-4 align-top text-[#c8d1de]">{yesNo(row.mentionsSynchronization)}</td>
                      <td className="px-4 py-4 align-top text-[#c8d1de]">{yesNo(row.mentionsDataSplit)}</td>
                      <td className="px-4 py-4 align-top font-mono text-xs text-[#8e98a8]">{row.sourceReviewed}</td>
                      <td className="px-4 py-4 align-top">
                        <a href={row.paperUrl} target="_blank" rel="noreferrer" className="font-semibold text-[#ff6b3d] hover:text-white">Paper ↗</a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="border-y border-white/8 py-14 md:py-20" aria-labelledby="method-heading">
          <div className="container-shell grid gap-8 lg:grid-cols-2">
            <article className="signal-panel p-6 md:p-8">
              <p className="eyebrow">Method</p>
              <h2 id="method-heading" className="mt-4 text-3xl font-bold text-white">A bounded, reproducible text audit</h2>
              <p className="mt-4 text-sm leading-relaxed text-[#c8d1de]">{tactileDataAuditMethod.scope}</p>
              <ol className="mt-6 space-y-4">
                {tactileDataAuditMethod.rules.map((rule, index) => (
                  <li key={rule} className="grid grid-cols-[32px_1fr] gap-3 text-sm leading-relaxed text-[#c8d1de]">
                    <span className="font-mono font-semibold text-[#ff6b3d]">{String(index + 1).padStart(2, '0')}</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ol>
            </article>
            <article className="signal-panel p-6 md:p-8">
              <p className="eyebrow">Limitations</p>
              <h2 className="mt-4 text-3xl font-bold text-white">What this audit cannot establish</h2>
              <ul className="mt-6 space-y-4">
                {tactileDataAuditMethod.limitations.map((limitation) => (
                  <li key={limitation} className="border-l-2 border-white/10 pl-4 text-sm leading-relaxed text-[#c8d1de]">
                    {limitation}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm leading-relaxed text-[#8e98a8]">
                Corrections should identify the record, the exact field, and a primary source. The audit will change only when the underlying structured record changes.
              </p>
              <Link href="/contact?requestType=research" className="mt-5 inline-flex text-sm font-semibold text-[#ff6b3d] hover:text-white">
                Submit a source or correction {'->'}
              </Link>
            </article>
          </div>
        </section>
      </main>
    </>
  );
}
