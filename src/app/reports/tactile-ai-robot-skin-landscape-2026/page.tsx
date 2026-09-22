import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import sampleReport from '@/content/sample-report-2026.json';
import { tactileDatasetEntries as tactileDatasets } from '@/lib/tactile-datasets';
import { buildBreadcrumbJsonLd, buildGraphJsonLd, buildPageJsonLd, buildPageMetadata, canonicalUrl } from '@/lib/seo';

const reportPath = '/reports/tactile-ai-robot-skin-landscape-2026';
const pdfPath = '/reports/roboskin-tactile-ai-robot-skin-sample-report-2026.pdf';
const previewDatasets = tactileDatasets.slice(0, 4);

export const metadata: Metadata = buildPageMetadata(reportPath);

const reportSections = [
  'Tactile intelligence stack and evaluation taxonomy',
  `${sampleReport.datasets.length} dataset records as described in the fixed sample edition`,
  `${sampleReport.signals.length} representative research signals and evidence limits`,
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
    datePublished: sampleReport.edition,
    dateModified: sampleReport.edition,
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
            <h1>Tactile AI and Robot Skin Landscape: Free Sample Report</h1>
            <p>Preview the research questions and evaluation structure below, then download the fixed {sampleReport.edition} PDF edition with its source register.</p>
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
            <h2>Use the sample to structure a research decision</h2>
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
            <p className="section-label">Fixed PDF edition: {sampleReport.edition}</p>
            <dl>
              <div><dt>Dataset records in this PDF</dt><dd>{sampleReport.datasets.length}</dd></div>
              <div><dt>Research signals in this PDF</dt><dd>{sampleReport.signals.length}</dd></div>
              <div><dt>Source URLs in this PDF</dt><dd>{new Set(sampleReport.references.map(([, url]) => url)).size}</dd></div>
              <div><dt>Price</dt><dd>Free</dd></div>
            </dl>
            <a href={pdfPath} download className="report-download-link">Download sample PDF {'->'}</a>
          </aside>
        </div>
      </section>

      <section className="pb-16" aria-labelledby="report-evaluation-heading">
        <div className="container-shell">
          <h2 id="report-evaluation-heading" className="text-2xl font-semibold text-white">Six questions to take from the report into an evaluation</h2>
          <p className="mt-4 max-w-3xl text-soft">Work through the sensing-to-policy chain before shortlisting a technology. These questions organize a review; answers must come from the selected system and its primary evidence.</p>
          <ol className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              ['What makes contact?', 'Name the robot surface, object, motion, and operating conditions. A fingertip experiment does not establish whole-body performance.', '/applications', 'Map the robot application'],
              ['What is the measured signal?', 'Separate raw images, magnetic readings, or array values from derived geometry and force estimates.', '/sensors', 'Compare sensor records'],
              ['How is the signal calibrated?', 'Record the calibration target, reference measurement, mounting, and held-out checks.', '/guides/tactile-sensor-calibration', 'Review calibration'],
              ['Can the data be reused?', 'Check actual file access, license, modality, timestamps, and the separation of training and test trajectories.', '/datasets', 'Inspect dataset availability'],
              ['What job does the model perform?', 'Distinguish representation learning, contact prediction, action selection, and low-level control.', '/tactile-foundation-models', 'Compare tactile model roles'],
              ['What changed in the robot task?', 'Compare the same protocol with and without the tactile input. Include failures, interventions, and timing.', '/benchmarks', 'Review evaluation benchmarks'],
            ].map(([question, answer, href, label]) => (
              <li key={question} className="glass-card p-6">
                <h3 className="font-semibold text-white">{question}</h3>
                <p className="mt-3 text-sm text-soft">{answer}</p>
                <Link href={href} className="mt-4 inline-block text-sm text-accent underline underline-offset-4">{label}</Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="report-dataset-preview" aria-labelledby="dataset-preview-heading">
        <div className="container-shell">
          <div className="report-preview-heading">
            <h2 id="dataset-preview-heading">Live directory preview — {previewDatasets.length} shown of {tactileDatasets.length} records</h2>
            <Link href="/datasets">Open the live dataset explorer {'->'}</Link>
          </div>
          <p className="mb-5 text-soft">The records below come from the live directory and may differ from the {sampleReport.datasets.length}-record PDF sample. The historical PDF is preserved unchanged; consult current directory entries for updated access and license evidence.</p>
          <div className="report-dataset-list">
            {previewDatasets.map((dataset) => (
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
