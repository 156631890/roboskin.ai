import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import CommercialInquiryForm from '@/components/CommercialInquiryForm';
import JsonLd from '@/components/JsonLd';
import { researchPositioning } from '@/components/ResearchResourceActions';
import { site } from '@/content/site';
import { buildBreadcrumbJsonLd, buildGraphJsonLd, buildPageJsonLd, buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata('/research-services');

const included = [
  ['Decision brief', 'An 8-12 page PDF that answers one defined commercial or technical question.'],
  ['Evidence register', '15-25 traceable primary or official sources with access notes and claim boundaries.'],
  ['Comparison matrix', 'A structured view of relevant sensors, datasets, models, labs, companies, or robot platforms.'],
  ['Readout', 'A 45-minute remote session and one factual clarification round within five business days.'],
];

const sprintQuestions = [
  'Which tactile sensors fit our dexterous robot-hand requirements?',
  'Which public datasets can support our visuo-tactile policy work?',
  'Who is building credible whole-body tactile sensing systems?',
  'What evidence exists for tactile foundation models in our task class?',
];

export default function ResearchServicesPage() {
  return (
    <>
      <JsonLd data={buildGraphJsonLd([buildPageJsonLd('/research-services'), buildBreadcrumbJsonLd('/research-services')])} />

      <section className="services-hero">
        <div className="container-shell services-hero-grid">
          <div className="services-hero-copy">
            <span className="eyebrow">Research services</span>
            <h1>Tactile intelligence, decision ready.</h1>
            <p>A source-backed robot skin and tactile AI brief, delivered in five business days for one defined decision.</p>
            <p className="services-positioning">{researchPositioning}</p>
            <div className="services-hero-actions">
              <a href="#inquiry" className="btn-primary">Start a Research Sprint</a>
              <Link href="/reports/tactile-ai-robot-skin-landscape-2026" className="services-text-link">Download the free sample {'->'}</Link>
            </div>
          </div>
          <figure className="services-hero-visual">
            <Image
              src="/generated/authority/roboskin-index-cover.webp"
              alt="Robotic hand evaluating tactile sensor modules on a structured research workbench."
              fill
              priority
              sizes="(min-width: 960px) 46vw, 100vw"
              className="object-cover"
            />
          </figure>
        </div>
      </section>

      <section className="services-sprint" aria-labelledby="sprint-heading">
        <div className="container-shell services-sprint-grid">
          <div className="services-sprint-summary">
            <p className="section-label">RoboSkin Research Sprint</p>
            <h2 id="sprint-heading">One decision question. A defensible answer.</h2>
            <p>
              The Sprint converts a narrow tactile robotics question into a source-backed decision package. Scope is confirmed before work starts.
            </p>
            <dl>
              <div><dt>Pilot fee</dt><dd>US$1,500</dd></div>
              <div><dt>Delivery</dt><dd>5 business days after kickoff</dd></div>
              <div><dt>Scope</dt><dd>1 decision question</dd></div>
            </dl>
            <a href="#inquiry" className="services-inline-cta">Request scope and availability {'->'}</a>
          </div>
          <div className="services-deliverables" aria-label="Research Sprint deliverables">
            {included.map(([title, description]) => (
              <article key={title}>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="services-questions" aria-labelledby="questions-heading">
        <div className="container-shell">
          <div className="services-section-heading">
            <h2 id="questions-heading">Questions the Sprint can resolve</h2>
            <p>Each engagement begins with a decision, not a broad topic.</p>
          </div>
          <div className="services-question-list">
            {sprintQuestions.map((question, index) => (
              <article key={question}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <p>{question}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="services-method" aria-labelledby="method-heading">
        <div className="container-shell services-method-grid">
          <div>
            <p className="section-label">Evidence policy</p>
            <h2 id="method-heading">Primary sources first. Commercial context stays labeled.</h2>
          </div>
          <div className="services-method-copy">
            <p>
              Research starts with papers, proceedings, official lab pages, project repositories, technical documentation, and company primary material. Secondary sources are discovery aids, not the default evidence layer.
            </p>
            <p>
              Sponsored inclusion cannot purchase a conclusion. Unknowns, incompatible benchmarks, missing licenses, and unverified claims remain visible in the final brief.
            </p>
            <Link href="/editorial-policy">Read the public source standard {'->'}</Link>
          </div>
        </div>
      </section>

      <section className="services-fit" aria-labelledby="fit-heading">
        <div className="container-shell services-fit-grid">
          <div>
            <h2 id="fit-heading">Where the service fits</h2>
            <ul>
              <li>Technical and product teams comparing tactile sensing options</li>
              <li>Robot-hand or humanoid teams mapping datasets and models</li>
              <li>Strategy and investment teams screening a technical landscape</li>
              <li>Labs preparing a partner, grant, or procurement evidence pack</li>
            </ul>
          </div>
          <div>
            <h3>Outside the Sprint</h3>
            <ul>
              <li>Physical sensor testing or vendor qualification</li>
              <li>Certification, patent clearance, or legal opinions</li>
              <li>Unlabeled sponsored rankings or pay-to-win recommendations</li>
              <li>Guaranteed commercial, investment, or research outcomes</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="services-sample" aria-labelledby="sample-heading">
        <div className="container-shell services-sample-grid">
          <div>
            <p className="section-label">Free sample report</p>
            <h2 id="sample-heading">Inspect the structure before buying research.</h2>
            <p>The sample shows the taxonomy, comparison tables, evidence labels, and source register used in a RoboSkin brief.</p>
          </div>
          <div className="services-sample-actions">
            <Link href="/reports/tactile-ai-robot-skin-landscape-2026" className="btn-primary">Open sample report</Link>
            <a href="/reports/roboskin-tactile-ai-robot-skin-sample-report-2026.pdf" download>Download PDF {'->'}</a>
          </div>
        </div>
      </section>

      <section id="scope-a-decision" className="pb-12 pt-8 scroll-mt-28">
        <div className="container-shell">
          <h2 className="text-2xl font-semibold text-white md:text-3xl">{"What makes a question ready for a source-based Sprint?"}</h2>
          <p className="mt-4 max-w-4xl text-sm leading-relaxed text-soft">{"A useful brief names the choice, the constraints and the evidence needed to decide. The examples below illustrate scope; they are not client cases or tested recommendations."}</p>
          <ul className="mt-6 grid gap-4 lg:grid-cols-3">
            <li className="rounded-xl border border-white/10 p-5"><h3 className="text-lg font-semibold text-white">{"Too broad"}</h3>
              <p className="mt-3 text-sm leading-relaxed text-soft">{"Which tactile sensor is best?"}</p>
              <p className="mt-3 text-sm leading-relaxed text-soft">{"No task, mounting geometry, output or acceptance condition is specified."}</p>
            </li>
            <li className="rounded-xl border border-white/10 p-5"><h3 className="text-lg font-semibold text-white">{"Ready to scope"}</h3>
              <p className="mt-3 text-sm leading-relaxed text-soft">{"Which documented sensor configurations could fit our gripper geometry and required output?"}</p>
              <p className="mt-3 text-sm leading-relaxed text-soft">{"Provide the robot, contact surfaces, interface constraints and the primary specifications already available."}</p>
            </li>
            <li className="rounded-xl border border-white/10 p-5"><h3 className="text-lg font-semibold text-white">{"Outside a source review"}</h3>
              <p className="mt-3 text-sm leading-relaxed text-soft">{"Prove that the selected sensor meets our accuracy or safety requirement."}</p>
              <p className="mt-3 text-sm leading-relaxed text-soft">{"That requires an agreed physical test or certification process, which this Sprint does not provide."}</p>
            </li>
          </ul>
          <p className="mt-5 max-w-4xl text-sm leading-relaxed text-soft">{"The decision package can identify a supported option, a conditional shortlist or a gap that prevents a defensible choice. An unknown remains in the evidence register; it is not replaced with an assumed specification. Scope and availability are confirmed before work starts."}</p>
          <div className="mt-5 flex flex-wrap gap-4 text-sm"><Link href="/reports/tactile-ai-robot-skin-landscape-2026" className="text-accent underline underline-offset-4">{"Inspect the free sample structure"}</Link><Link href="/methodology#evidence-types" className="text-accent underline underline-offset-4">{"Check what a source review establishes"}</Link><Link href="/contact?requestType=correction" className="text-accent underline underline-offset-4">{"Send a public-page correction instead"}</Link></div>
          <p className="mt-5 text-xs text-soft">Reading guidance updated <time dateTime="2026-11-04">November 4, 2026</time>.</p>
        </div>
      </section>

      <section id="inquiry" className="services-inquiry" aria-labelledby="inquiry-heading">
        <div className="container-shell services-inquiry-grid">
          <div className="services-inquiry-intro">
            <p className="section-label">Commercial inquiry</p>
            <h2 id="inquiry-heading">Tell us the decision, not the whole industry.</h2>
            <p>We will reply within two business days with fit, proposed scope, timing, and payment steps.</p>
            <div>
              <span>Direct email</span>
              <a href={`mailto:${site.contact.inquiryEmail}`}>{site.contact.inquiryEmail}</a>
            </div>
          </div>
          <CommercialInquiryForm />
        </div>
      </section>
    </>
  );
}
