import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import { tactileDatasetEntries as tactileDatasets } from '@/lib/tactile-datasets';
import { buildBreadcrumbJsonLd, buildGraphJsonLd, buildPageJsonLd, buildPageMetadata, canonicalUrl } from '@/lib/seo';

const reportPath = '/reports/tactile-ai-robot-skin-landscape-2026';
const pdfPath = '/reports/roboskin-tactile-ai-robot-skin-sample-report-2026.pdf';

export const metadata: Metadata = buildPageMetadata(reportPath);

const reportSections = [
  'Tactile intelligence stack and evaluation taxonomy',
  'Six public tactile robotics datasets with access evidence',
  'Six representative research signals and evidence limits',
  'Sensor, dataset, and model evaluation checklist',
  'Primary-source register with direct URLs',
];

export default function TactileAiRobotSkinSampleReportPage() {
  const documentJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'DigitalDocument',
    '@id': `${canonicalUrl(reportPath)}#report`,
    name: 'Tactile AI and Robot Skin Landscape: Sample Report 2026',
    description: 'A free source-backed sample report covering the tactile intelligence stack, public datasets, research signals, and evaluation questions.',
    datePublished: '2026-08-17',
    dateModified: '2026-08-17',
    inLanguage: 'en',
    isAccessibleForFree: true,
    encodingFormat: 'application/pdf',
    url: canonicalUrl(pdfPath),
    about: ['tactile AI', 'robot skin', 'tactile robotics datasets', 'Physical AI'],
  };

  return (
    <>
      <JsonLd data={buildGraphJsonLd([buildPageJsonLd(reportPath), buildBreadcrumbJsonLd(reportPath), documentJsonLd])} />

      <section className="report-hero">
        <div className="container-shell report-hero-grid">
          <div className="report-hero-copy">
            <span className="eyebrow">Free sample report</span>
            <h1>Tactile AI Landscape Report</h1>
            <p>A source-backed robot skin sample showing the structure used in RoboSkin commercial intelligence work.</p>
            <div className="report-hero-actions">
              <a href={pdfPath} download className="btn-primary">Download the PDF</a>
              <Link href="/research-services">Explore Research Sprint {'->'}</Link>
            </div>
          </div>
          <figure className="report-cover">
            <Image
              src="/generated/authority/roboskin-index-cover.webp"
              alt="RoboSkin.ai research index cover showing a robotic tactile sensing system and structured evidence map."
              fill
              priority
              sizes="(min-width: 960px) 42vw, 100vw"
              className="object-cover"
            />
          </figure>
        </div>
      </section>

      <section className="report-definition">
        <div className="container-shell report-definition-grid">
          <p className="section-label">What this is</p>
          <div>
            <h2>A public sample, not a generic market report.</h2>
            <p>
              This edition demonstrates how RoboSkin.ai organizes robot skin and tactile AI evidence. It does not include invented market sizing, paid rankings, hardware test results, or unsupported forecasts.
            </p>
          </div>
        </div>
      </section>

      <section className="report-contents" aria-labelledby="contents-heading">
        <div className="container-shell report-contents-grid">
          <div>
            <h2 id="contents-heading">Inside the sample</h2>
            <ol>
              {reportSections.map((section, index) => (
                <li key={section}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  {section}
                </li>
              ))}
            </ol>
          </div>
          <aside>
            <p className="section-label">Evidence snapshot</p>
            <dl>
              <div><dt>Datasets reviewed</dt><dd>{tactileDatasets.length}</dd></div>
              <div><dt>Research signals</dt><dd>6</dd></div>
              <div><dt>Primary URLs</dt><dd>17</dd></div>
              <div><dt>Price</dt><dd>Free</dd></div>
            </dl>
            <a href={pdfPath} download className="report-download-link">Download sample PDF {'->'}</a>
          </aside>
        </div>
      </section>

      <section className="report-dataset-preview" aria-labelledby="dataset-preview-heading">
        <div className="container-shell">
          <div className="report-preview-heading">
            <h2 id="dataset-preview-heading">Dataset coverage preview</h2>
            <Link href="/datasets">Open the live dataset explorer {'->'}</Link>
          </div>
          <div className="report-dataset-list">
            {tactileDatasets.slice(0, 4).map((dataset) => (
              <article key={dataset.id}>
                <div>
                  <span>{dataset.year}</span>
                  <h3>{dataset.name}</h3>
                </div>
                <p>{dataset.sensor.join(', ')}</p>
                <p>{dataset.tasks.slice(0, 2).join(', ')}</p>
                <a href={dataset.paperUrl} target="_blank" rel="noreferrer">Primary paper {'->'}</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="report-final-cta">
        <div className="container-shell report-final-cta-grid">
          <div>
            <h2>Need the same structure applied to your decision?</h2>
            <p>The Research Sprint turns one technical or commercial question into a five-day evidence package.</p>
          </div>
          <Link href="/research-services#inquiry" className="btn-primary">Request a Research Sprint</Link>
        </div>
      </section>
    </>
  );
}
