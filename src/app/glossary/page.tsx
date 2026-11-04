import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import PageHeroVisual from '@/components/PageHeroVisual';
import { glossaryTerms, pageVisuals, site } from '@/content/site';
import { buildBreadcrumbJsonLd, buildGraphJsonLd, buildPageJsonLd, buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata('/glossary');

const glossaryJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTermSet',
  '@id': `${site.url}/glossary#defined-term-set`,
  name: 'RoboSkin robot skin glossary',
  url: `${site.url}/glossary`,
  hasDefinedTerm: glossaryTerms.map((item) => ({
    '@type': 'DefinedTerm',
    name: item.term,
    description: item.definition,
    url: `${site.url}/glossary#${item.term.toLowerCase().replaceAll(' ', '-')}`,
  })),
};

const glossaryFamilies = [
  {
    label: 'Surface layer',
    title: 'Robot skin, e-skin, and tactile surfaces',
    text: 'Terms that explain what covers the robot and what contact signals the surface can capture.',
  },
  {
    label: 'Signal layer',
    title: 'Touch data and tactile AI workflows',
    text: 'Terms that connect pressure, shear, slip, multimodal sensing, and signal interpretation.',
  },
  {
    label: 'System layer',
    title: 'Research routes and category context',
    text: 'Terms that keep public claims conservative while guiding readers toward source-backed pages.',
  },
];

const coreTopicRoutes = [
  {
    label: 'Robot skin',
    href: '/robot-skin',
    description: 'The core category definition for tactile robot surfaces.',
  },
  {
    label: 'Physical AI',
    href: '/physical-ai',
    description: 'The canonical RoboSkin route for physical-world AI that needs touch and contact feedback.',
  },
  {
    label: 'E-skin',
    href: '/e-skin',
    description: 'Electronic skin and flexible sensor context for robotics.',
  },
  {
    label: 'Tactile AI',
    href: '/tactile-ai',
    description: 'How touch data becomes robot behavior and evaluation.',
  },
];

const readingGuide = {
  "id": "measurement-language",
  "heading": "Four measurement words that should not be interchangeable",
  "body": [
    "A sensor specification can use a familiar word in a narrower way than a buyer expects. Before comparing numbers, identify the quantity, unit, reference, conditions and statistic. The JCGM international metrology vocabulary separates accuracy, precision, resolution and sensitivity. The reading questions below apply those distinctions to tactile documentation; they are not a new sensor benchmark.",
    "For tactile systems, also separate physical sensing locations from channels and reconstructed pixels. One position can report several quantities, and a learned map can contain more output cells than there are physical sensing elements. Neither multiplication establishes more independently resolved contacts."
  ],
  "table": {
    "headers": [
      "Term",
      "Practical interpretation",
      "Question for a tactile specification"
    ],
    "rows": [
      [
        "Accuracy",
        "Agreement with the quantity being measured; not synonymous with repeatability",
        "Which reference and error statistic support the claim, under what conditions?"
      ],
      [
        "Precision",
        "Agreement among repeated indications under specified conditions",
        "Were the same sensor, mounting, load history and environment retained?"
      ],
      [
        "Resolution",
        "The smallest change in the measured quantity that produces a distinguishable change in indication",
        "Does the number describe force, position, digitization or merely image dimensions?"
      ],
      [
        "Sensitivity",
        "Change in output relative to change in the input quantity",
        "What are the units, loading range and response slope?"
      ]
    ]
  },
  "subsections": [
    {
      "heading": "An illustrative reading error",
      "body": [
        "Suppose a hypothetical sensor repeatedly reports a similar force while consistently differing from a reference. Closely grouped readings alone do not establish accuracy. Likewise, a finely digitized output can still have noise, bias or cross-axis effects that prevent useful small changes from being distinguished. These examples illustrate terminology, not measured performance of a named device.",
        "Keep measured, estimated and predicted labels on the signal. A tactile image is an observation; a calibrated force reconstruction is an estimate; a future-contact model predicts an outcome. The downstream controller may use any of these, but their evidential roles remain different. Follow the linked definition to the relevant method and evaluation rather than treating a shared word as a compatibility guarantee."
      ]
    }
  ],
  "links": [
    {
      "label": "JCGM VIM: measurement accuracy",
      "href": "https://jcgm.bipm.org/vim/en/2.13.html"
    },
    {
      "label": "JCGM VIM: measurement precision",
      "href": "https://jcgm.bipm.org/vim/en/2.15.html"
    },
    {
      "label": "JCGM VIM: resolution",
      "href": "https://jcgm.bipm.org/vim/en/4.14.html"
    },
    {
      "label": "JCGM VIM: sensitivity",
      "href": "https://jcgm.bipm.org/vim/en/4.12.html"
    },
    {
      "label": "Taxels, axes and coverage in a hand layout",
      "href": "/applications/robot-hand-tactile-sensor#taxel-count-and-coverage"
    },
    {
      "label": "Trace sensing and inference",
      "href": "/technology#tactile-diagnostic-trace"
    }
  ]
};

export default function GlossaryPage() {
  return (
    <>
      <JsonLd data={buildGraphJsonLd([buildPageJsonLd('/glossary'), buildBreadcrumbJsonLd('/glossary'), glossaryJsonLd])} />
      <section className="py-14 md:py-20">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.78fr_1.02fr] lg:items-center">
          <div>
            <span className="eyebrow">Glossary</span>
            <h1 className="mt-5 text-4xl font-bold leading-tight text-white md:text-6xl">
              E-skin and robot skin glossary
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-[#c8d1de]">
              A terminology matrix for robot skin, tactile AI, e-skin, electronic skin, multimodal sensors, ROS 2 tactile
              pipelines, and source-backed category language.
            </p>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#8e98a8]">
              Definitions are written for practical reading: what the term means, which signals it touches, and where to go next for
              research context.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-[#8e98a8]">Comparing model roles? Use the <Link href="/vla/concepts" className="text-[#ffd5c5] underline underline-offset-4 hover:text-white">VLA, VDA, world model and HFM comparison</Link> alongside the definitions below.</p>
            <p className="mt-3 text-sm leading-relaxed text-[#8e98a8]">Updated <time dateTime="2026-10-12">October 12, 2026</time>: added HFM with its paper version and proposed-capability boundary.</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href="#term-matrix" className="btn-primary w-full sm:w-auto">
                Open term matrix
              </Link>
              <Link href="/research" className="btn-secondary w-full sm:w-auto">
                Read e-skin and tactile sensing briefs
              </Link>
              <Link href="/contact?requestType=research" className="btn-tertiary w-full sm:w-auto">
                Submit a Source
              </Link>
            </div>
          </div>

          <div className="grid gap-4">
            <PageHeroVisual visual={pageVisuals.answers} priority />
            <dl className="grid gap-3 sm:grid-cols-3">
              <div className="signal-panel p-4">
                <dt className="font-mono text-lg font-semibold text-white">{glossaryTerms.length}</dt>
                <dd className="mt-1 text-xs uppercase tracking-[0.12em] text-[#8e98a8]">defined terms</dd>
              </div>
              <div className="signal-panel p-4">
                <dt className="font-mono text-lg font-semibold text-white">3</dt>
                <dd className="mt-1 text-xs uppercase tracking-[0.12em] text-[#8e98a8]">signal layers</dd>
              </div>
              <div className="signal-panel p-4">
                <dt className="font-mono text-lg font-semibold text-white">Source</dt>
                <dd className="mt-1 text-xs uppercase tracking-[0.12em] text-[#8e98a8]">next-step routes</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="pb-14 md:pb-20">
        <div className="container-shell grid gap-4 md:grid-cols-3">
          {glossaryFamilies.map((family) => (
            <article key={family.title} className="signal-panel p-6">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#ff6b3d]">{family.label}</p>
              <h2 className="mt-3 text-xl font-semibold text-white">{family.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-[#8e98a8]">{family.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="pb-14 md:pb-20">
        <div className="container-shell">
          <div className="mb-5">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#ff6b3d]">Core topic routes</p>
            <h2 className="mt-2 text-3xl font-bold text-white md:text-4xl">Start with the main definitions</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {coreTopicRoutes.map((route) => (
              <Link key={route.href} href={route.href} className="signal-panel block p-6 transition-colors hover:bg-white/[0.04]">
                <h3 className="text-xl font-semibold text-white">{route.label}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#8e98a8]">{route.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

    <section id={readingGuide.id} className="pb-14">
      <div className="container-shell">
        <div className="signal-panel p-6 md:p-8">
          <p className="text-sm text-soft">Reading guide reviewed November 4, 2026. Existing source and research dates remain separate; no hardware measurements.</p>
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

      <section id="term-matrix" className="pb-20">
        <div className="container-shell">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#ff6b3d]">Term route matrix</p>
              <h2 className="mt-2 text-3xl font-bold text-white md:text-4xl">Definitions with next-step context</h2>
            </div>
            <Link href="/research" className="text-sm font-semibold text-[#ff6b3d] hover:text-white">
              Research index {'->'}
            </Link>
          </div>

          <div className="signal-panel overflow-hidden p-0">
            {glossaryTerms.map((item, index) => (
              <article
                key={item.term}
                id={item.term.toLowerCase().replaceAll(' ', '-')}
                className="grid scroll-mt-24 gap-5 border-b border-white/8 p-5 last:border-b-0 md:grid-cols-[0.36fr_1fr] md:p-7"
              >
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.12em] text-[#8e98a8]">Term {String(index + 1).padStart(2, '0')}</p>
                  <h3 className="mt-3 text-2xl font-semibold text-white">{item.term}</h3>
                </div>
                <div>
                  <p className="text-base leading-relaxed text-[#c8d1de]">{item.definition}</p>
                  {item.source ? <p className="mt-3 text-sm"><a href={item.source.href} className="text-[#ffd5c5] underline underline-offset-4 hover:text-white">Source: {item.source.label}</a></p> : null}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.related.map((related) => (
                      <span key={related} className="rounded-md border border-white/8 bg-[#020408] px-3 py-1 text-xs text-[#c8d1de]">
                        {related}
                      </span>
                    ))}
                  </div>
                  <Link href={item.href} className="mt-5 inline-flex text-sm font-semibold text-[#ff6b3d] hover:text-white">
                    Follow related route {'->'}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-shell">
          <div className="signal-panel p-8 text-center md:p-11">
            <p className="eyebrow border-white/10 bg-white/5 text-white">Terminology correction path</p>
            <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-bold text-white md:text-4xl">Need terms mapped to a use case?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-[#8e98a8]">
              Share a research question, source suggestion, or guide route case so the inquiry can be routed clearly.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
              <Link href="/contact?requestType=research" className="btn-primary w-full sm:w-auto">
                Submit a Source
              </Link>
              <Link href="/research" className="btn-secondary w-full sm:w-auto">
                Explore research resources
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
