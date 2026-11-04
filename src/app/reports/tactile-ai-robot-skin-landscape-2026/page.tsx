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

const readingGuide = {
  "id": "report-reading-note",
  "heading": "Read the fixed edition alongside a current evidence note",
  "body": [
    "The downloadable PDF remains the August 17, 2026 edition. Its six dataset records and six research signals are a dated sample, not a claim to exhaust the field or describe current availability. The live directory preview below is a separate view. A new review date on this page does not update the PDF or turn its historical access notes into fresh checks.",
    "One practical example is FreeTacMan. The current provider dataset card labels the data MIT, while the code repository’s root LICENSE is Apache-2.0. Its README still calls the project MIT. Preserve that source distinction: the sample’s short license label is not a single license for every file, dependency, model or downstream use. We reviewed public documentation, not downloaded dataset contents or executed software."
  ],
  "table": {
    "headers": [
      "When using the sample",
      "Record separately",
      "Decision it supports"
    ],
    "rows": [
      [
        "Compare a historical entry with today’s directory",
        "PDF edition, live entry review date and the changed field",
        "Whether the original shortlist needs to be reconsidered"
      ],
      [
        "Follow a data or code link",
        "Exact artifact, revision, access result and applicable terms",
        "Whether further technical and rights review can proceed"
      ],
      [
        "Carry a research result into a proposal",
        "Reported task, metric, baseline and untested conditions",
        "Which local validation remains necessary"
      ],
      [
        "Request a focused research brief",
        "Decision, constraints, deliverable and unresolved evidence",
        "A scope to agree before scheduling work"
      ]
    ]
  },
  "subsections": [
    {
      "heading": "Keep conclusions narrower than the source register",
      "body": [
        "A list of source URLs helps trace a claim; it does not prove that every hosted artifact is available, that a policy transfers to a different robot, or that a supplier meets an acceptance criterion. Use the sample to structure those questions, then attach current evidence to the specific decision.",
        "For a correction, identify the PDF edition, page or entry, original statement and proposed primary source. The historical file can then remain distinguishable from a later correction or edition. The current directory and editorial policy provide the routes for checking evidence and submitting a correction."
      ]
    }
  ],
  "links": [
    {
      "label": "FreeTacMan provider dataset card",
      "href": "https://huggingface.co/datasets/OpenDriveLab/FreeTacMan"
    },
    {
      "label": "FreeTacMan repository root LICENSE",
      "href": "https://github.com/OpenDriveLab/FreeTacMan/blob/main/LICENSE"
    },
    {
      "label": "FreeTacMan README: separate license wording",
      "href": "https://github.com/OpenDriveLab/FreeTacMan"
    },
    {
      "label": "Current dataset evidence",
      "href": "/datasets"
    },
    {
      "label": "Correction and source policy",
      "href": "/editorial-policy"
    },
    {
      "label": "Discuss an evidence question",
      "href": "/contact?requestType=research"
    }
  ]
};

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

    <section id={readingGuide.id} className="pb-14">
      <div className="container-shell">
        <div className="signal-panel p-6 md:p-8">
          <p className="text-sm text-soft">Reading guide reviewed November 4, 2026. The PDF edition and original research dates remain separate; no independent reproduction.</p>
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
            <p>Discuss a focused evidence package for one technical or commercial question. Scope, deliverables and timing are agreed before work starts.</p>
          </div>
          <Link href="/research-services#inquiry" className="btn-primary">Request a Research Sprint</Link>
        </div>
      </section>
    </>
  );
}
