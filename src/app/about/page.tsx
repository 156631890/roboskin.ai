import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import { researchPositioning } from '@/components/ResearchResourceActions';
import PageHeroVisual from '@/components/PageHeroVisual';
import { aboutSections, pageVisuals, site } from '@/content/site';
import { buildBreadcrumbJsonLd, buildGraphJsonLd, buildPageJsonLd, buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata('/about');

export default function AboutPage() {
  return (
    <>
      <JsonLd data={buildGraphJsonLd([buildPageJsonLd('/about'), buildBreadcrumbJsonLd('/about')])} />
      <section className="py-20 md:py-24">
        <div className="container-shell">
          <span className="eyebrow">About</span>
          <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
            <h1 className="text-4xl font-bold text-[var(--text)] md:text-6xl">What RoboSkin.ai is, and what it is not</h1>
            <Link href="/contact?requestType=research" className="text-accent text-sm font-semibold hover:text-white">
              Send a research note {'->'}
            </Link>
          </div>
          <p className="mt-5 max-w-3xl text-soft">
            {researchPositioning} RoboSkin.ai is not an operating hardware vendor, product catalog, or procurement channel.
          </p>
          <p className="mt-4 max-w-3xl text-soft">
            RoboSkin.ai is independent. The name should not be read as an affiliation claim with similarly named robot skin products,
            companies, labs, or research projects unless a page explicitly supports that relationship.
          </p>
          <PageHeroVisual visual={pageVisuals.about} className="mt-10" priority />
          <p className="mt-6 max-w-3xl text-soft">Paid work organizes public sources for a specific decision. It does not buy editorial inclusion or imply laboratory affiliation, physical testing, vendor qualification or device compatibility. <Link href="/research-services" className="text-accent underline">See scope and deliverables</Link>.</p>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-shell grid gap-6 lg:grid-cols-2">
          {aboutSections.map((section) => (
            <article key={section.title} className="glass-card p-7 md:p-8">
              <h2 className="text-2xl font-semibold text-white md:text-3xl">{section.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-soft">{section.summary}</p>
              <ul className="mt-6 space-y-2 text-sm text-[#d8dce4]">
                {section.bullets.map((bullet) => (
                  <li key={bullet} className="rounded-lg border border-white/8 bg-[#0d1016] px-4 py-2.5">
                    {bullet}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section id="editorial-lead" className="pb-20 scroll-mt-28">
        <div className="container-shell">
          <div className="grid gap-8 rounded-[24px] border border-white/8 bg-[#0b0d12] p-8 md:p-10 lg:grid-cols-[0.34fr_1fr]">
            <div>
              <p className="eyebrow">Editorial leadership</p>
              <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">{site.editorial.lead.name}</h2>
              <p className="mt-3 font-mono text-sm uppercase tracking-[0.12em] text-accent">{site.editorial.lead.role}</p>
            </div>
            <div>
              <p className="text-sm leading-relaxed text-soft">
                Steven Yang leads RoboSkin.ai&apos;s topic selection, source-boundary review, corrections process, and publication standards. The role is editorial: public research claims are traced to cited papers, institutional pages, standards documentation, or official project sources rather than presented as personal laboratory findings.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-soft">
                Research and news briefs retain the institutional RoboSkin.ai Editorial Team byline when they represent the site&apos;s shared research workflow. That byline does not imply authorship of the cited scientific work or affiliation with the referenced laboratory, company, or project.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/editorial-policy" className="btn-secondary">
                  Read the editorial policy
                </Link>
                <Link href="/contact?requestType=research" className="btn-tertiary">
                  Submit a correction
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-shell">
          <div className="signal-panel p-8 md:p-10">
            <p className="eyebrow">Work you can inspect</p>
            <h2 className="mt-4 text-3xl font-bold text-white">Check the evidence behind the editorial work</h2>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-soft">The useful evidence is in the records, source links and disclosed limits. A paper summary is editorial work; it does not establish that RoboSkin.ai ran the authors&apos; code or tested their hardware.</p>
            <ul className="mt-6 grid gap-5 md:grid-cols-3">
              <li><Link href="/research-index" className="font-semibold text-accent underline underline-offset-4">Source-linked research index</Link><p className="mt-2 text-sm leading-relaxed text-soft">Inspect the cited research, editorial normalization, CSV and JSON records, and versioned release.</p></li>
              <li><Link href="/datasets#availability-analysis" className="font-semibold text-accent underline underline-offset-4">Dataset availability audit</Link><p className="mt-2 text-sm leading-relaxed text-soft">Separate provider claims from inspected public manifests, file licenses, access dates and remaining reproduction gaps.</p></li>
              <li><Link href="/benchmarks#experiment-evidence" className="font-semibold text-accent underline underline-offset-4">Experiment evidence records</Link><p className="mt-2 text-sm leading-relaxed text-soft">Trace source-reported trials, success definitions, hardware and conditions without treating different protocols as one leaderboard.</p></li>
            </ul>
            <p className="mt-6 text-sm text-soft"><Link href="/editorial-policy#evidence-method" className="text-accent underline underline-offset-4">Read the evidence method and its limits</Link>.</p>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-shell">
          <div className="rounded-[24px] border border-white/8 bg-[#0b0d12] p-8 text-center md:p-11">
            <h2 className="text-3xl font-bold text-white md:text-4xl">Need a practical next step?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-soft">
              If you found an outdated claim, have a better source, or want to discuss editorial collaboration, send the relevant context.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link
                href="/contact?requestType=research"
                className="rounded-xl bg-[var(--primary)] px-7 py-3 text-sm font-bold text-white shadow-[0_12px_26px_rgba(98,168,255,0.22)]"
              >
                Send research note
              </Link>
              <Link
                href="/research"
                className="rounded-xl border border-white/12 bg-white/5 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/8"
              >
                Explore research resources
              </Link>
            </div>
            <p className="mt-4 text-sm text-soft">
              Direct inquiries: <a className="text-accent underline decoration-white/30 underline-offset-4 hover:text-white" href={`mailto:${site.contact.primaryEmail}`}>{site.contact.primaryEmail}</a>
            </p>
          </div>
        </div>
      </section>
      <section id="read-the-page-type" className="pb-12 pt-8 scroll-mt-28">
        <div className="container-shell">
          <h2 className="text-2xl font-semibold text-white md:text-3xl">{"Which parts are our work, and which belong to the cited researchers?"}</h2>
          <p className="mt-4 max-w-4xl text-sm leading-relaxed text-soft">{"The page type tells you what is being attributed. Check the linked source and the evidence label before reusing a result."}</p>
          <div className="mt-6 overflow-x-auto rounded-md border border-white/10" tabIndex={0} role="region" aria-label="Which parts are our work, and which belong to the cited researchers?">
            <table className="w-full min-w-[720px] border-collapse text-left text-sm"><thead><tr><th scope="col" className="border-b border-white/10 px-4 py-3 text-white">{"Page type"}</th><th scope="col" className="border-b border-white/10 px-4 py-3 text-white">{"RoboSkin.ai contribution"}</th><th scope="col" className="border-b border-white/10 px-4 py-3 text-white">{"What to verify"}</th><th scope="col" className="border-b border-white/10 px-4 py-3 text-white">{"Where to inspect it"}</th></tr></thead><tbody>
              <tr><th scope="row" className="border-b border-white/10 px-4 py-4 align-top font-semibold text-white">{"Research interpretations"}</th><td className="border-b border-white/10 px-4 py-4 align-top leading-relaxed text-soft">{"Our explanation of another team’s paper, including method, reported results and limits."}</td><td className="border-b border-white/10 px-4 py-4 align-top leading-relaxed text-soft">{"The scientific claim belongs to the cited authors; our commentary is not a reproduction."}</td><td className="border-b border-white/10 px-4 py-4 align-top"><Link href="/research" className="text-accent underline underline-offset-4">{"Read external-paper interpretations"}</Link></td></tr>
              <tr><th scope="row" className="border-b border-white/10 px-4 py-4 align-top font-semibold text-white">{"Directories and comparisons"}</th><td className="border-b border-white/10 px-4 py-4 align-top leading-relaxed text-soft">{"Our organization of source-linked records and explicit unknowns."}</td><td className="border-b border-white/10 px-4 py-4 align-top leading-relaxed text-soft">{"Record counts describe that index or edition, not all work in the field."}</td><td className="border-b border-white/10 px-4 py-4 align-top"><Link href="/research-index" className="text-accent underline underline-offset-4">{"Inspect the research index"}</Link></td></tr>
              <tr><th scope="row" className="border-b border-white/10 px-4 py-4 align-top font-semibold text-white">{"Tutorials and working papers"}</th><td className="border-b border-white/10 px-4 py-4 align-top leading-relaxed text-soft">{"A documented exercise, proposal or execution record with its own status."}</td><td className="border-b border-white/10 px-4 py-4 align-top leading-relaxed text-soft">{"A proposal is not a validated result, and a synthetic replay is not a physical robot test."}</td><td className="border-b border-white/10 px-4 py-4 align-top"><Link href="/papers" className="text-accent underline underline-offset-4">{"Check working-paper status"}</Link></td></tr>
            </tbody></table>
          </div>
          <p className="mt-5 max-w-4xl text-sm leading-relaxed text-soft">{"Use the original paper for scientific attribution and the RoboSkin.ai page for the specific explanation or comparison you are citing. Keep both dates when the source and our review were published at different times."}</p>
          <div className="mt-5 flex flex-wrap gap-4 text-sm"><Link href="/methodology" className="text-accent underline underline-offset-4">{"See how claims are traced"}</Link><Link href="/editorial-policy#automation" className="text-accent underline underline-offset-4">{"Read the automation disclosure"}</Link></div>
          <p className="mt-5 text-xs text-soft">Reading guidance updated <time dateTime="2026-11-04">November 4, 2026</time>.</p>
        </div>
      </section>

    </>
  );
}
