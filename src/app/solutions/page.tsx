import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import PageHeroVisual from '@/components/PageHeroVisual';
import { pageVisuals, solutionCards } from '@/content/site';
import { buildBreadcrumbJsonLd, buildGraphJsonLd, buildPageJsonLd, buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata('/solutions');

export default function SolutionsPage() {
  return (
    <>
      <JsonLd data={buildGraphJsonLd([buildPageJsonLd('/solutions'), buildBreadcrumbJsonLd('/solutions')])} />
      <section className="py-20 md:py-24">
        <div className="container-shell">
          <span className="eyebrow">Use cases</span>
          <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
            <h1 className="text-4xl font-bold text-white md:text-6xl">
              Solve the right tactile sensing problem
            </h1>
            <Link href="/guides/tactile-sensor-for-robots" className="text-accent text-sm font-semibold hover:text-[#ff9b73]">
              Compare sensor requirements {'->'}
            </Link>
          </div>
          <p className="mt-5 max-w-3xl text-soft">
            Start with a failure you can observe. A slipping object, missing contact location, drifting signal,
            and unusable training data need different measurements. These workflows help define what to test next.
          </p>
          <PageHeroVisual visual={pageVisuals.applications} className="mt-10" priority />
        </div>
      </section>

      <section className="pb-20">
        <div className="container-shell grid gap-6 lg:grid-cols-2">
          {solutionCards.map((solution) => (
            <article key={solution.title} className="glass-card p-7 md:p-8">
              <p className="text-soft text-xs uppercase tracking-[0.14em]">Use case</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">{solution.title}</h2>
              <div className="mt-4 space-y-3 text-sm text-soft">
                <p><span className="font-semibold text-white">Problem:</span> {solution.problem}</p>
                <p><span className="font-semibold text-white">Impact:</span> {solution.why}</p>
                <p><span className="font-semibold text-white">Suggested route:</span> {solution.path}</p>
                <p><span className="font-semibold text-white">Note:</span> {solution.note}</p>
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href={solution.href}
                  className="rounded-xl bg-[var(--primary)] px-5 py-2.5 text-sm font-bold text-white shadow-[0_12px_26px_rgba(98,168,255,0.22)]"
                >
                  {solution.cta}
                </Link>
                <Link
                  href="/guides/tactile-sensor-for-robots"
                  className="rounded-xl border border-white/12 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/8"
                >
                  Compare sensor requirements
                </Link>
                <Link
                  href="/technology"
                  className="rounded-xl border border-white/12 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/8"
                >
                  Review technology context
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="pb-20">
        <div className="container-shell">
          <div className="rounded-[24px] border border-white/8 bg-[#0b0d12] p-8 text-center md:p-11">
            <h2 className="text-3xl font-bold text-white md:text-4xl">Define success before choosing hardware</h2>
            <p className="mx-auto mt-4 max-w-2xl text-soft">
              Write down the object, contact surface, operating conditions, measured signal, and desired outcome.
              Then compare a baseline with the tactile system using the same task and failure criteria.
            </p>
            <div className="mt-7 flex justify-center">
              <Link
                href="/contact?requestType=research"
                className="rounded-xl bg-[var(--primary)] px-7 py-3 text-sm font-bold text-white shadow-[0_12px_26px_rgba(98,168,255,0.22)]"
              >
                Send a research note
              </Link>
            </div>
            <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm">
              <Link href="/products" className="text-accent font-semibold hover:text-white">
                View guides {'->'}
              </Link>
              <Link href="/guides/tactile-sensor-benchmark-robot-manipulation" className="text-accent font-semibold hover:text-white">
                Compare task-level evidence {'->'}
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section id="failure-to-measurement" className="pb-12 pt-8 scroll-mt-28">
        <div className="container-shell">
          <h2 className="text-2xl font-semibold text-white md:text-3xl">{"Turn the failure into a measurable question"}</h2>
          <p className="mt-4 max-w-4xl text-sm leading-relaxed text-soft">{"The examples below are proposed evaluation plans. Choose limits for your task before collecting results; none is a RoboSkin.ai test or a universal acceptance threshold."}</p>
          <div className="mt-6 overflow-x-auto rounded-md border border-white/10" tabIndex={0} role="region" aria-label="Turn the failure into a measurable question">
            <table className="w-full min-w-[720px] border-collapse text-left text-sm"><thead><tr><th scope="col" className="border-b border-white/10 px-4 py-3 text-white">{"Observed failure"}</th><th scope="col" className="border-b border-white/10 px-4 py-3 text-white">{"Measurement to define"}</th><th scope="col" className="border-b border-white/10 px-4 py-3 text-white">{"Comparison and failure record"}</th></tr></thead><tbody>
              <tr><th scope="row" className="border-b border-white/10 px-4 py-4 align-top font-semibold text-white">{"The object slips"}</th><td className="border-b border-white/10 px-4 py-4 align-top leading-relaxed text-soft">{"Time from a defined slip event to detection and to corrective action."}</td><td className="border-b border-white/10 px-4 py-4 align-top leading-relaxed text-soft">{"Compare matched objects and disturbances; keep false alarms, missed events, dropped objects and operator interventions."}</td></tr>
              <tr><th scope="row" className="border-b border-white/10 px-4 py-4 align-top font-semibold text-white">{"Contact occurs outside the fingertip"}</th><td className="border-b border-white/10 px-4 py-4 align-top leading-relaxed text-soft">{"Coverage and localization error in the robot coordinate frame."}</td><td className="border-b border-white/10 px-4 py-4 align-top leading-relaxed text-soft">{"Include seams, joints and uncovered regions; record unobserved contacts separately from correctly localized contacts."}</td></tr>
              <tr><th scope="row" className="border-b border-white/10 px-4 py-4 align-top font-semibold text-white">{"Readings change after remounting"}</th><td className="border-b border-white/10 px-4 py-4 align-top leading-relaxed text-soft">{"Error against the same reference over loading and unloading."}</td><td className="border-b border-white/10 px-4 py-4 align-top leading-relaxed text-soft">{"Keep mounting, zeroing, temperature and calibration versions; test contacts excluded from the calibration fit."}</td></tr>
              <tr><th scope="row" className="border-b border-white/10 px-4 py-4 align-top font-semibold text-white">{"A dataset cannot support the intended policy"}</th><td className="border-b border-white/10 px-4 py-4 align-top leading-relaxed text-soft">{"Usable episodes with the required observations, action meaning and synchronization."}</td><td className="border-b border-white/10 px-4 py-4 align-top leading-relaxed text-soft">{"Check actual files and reuse terms. Split by episode or object as appropriate, not neighboring frames from the same recording."}</td></tr>
            </tbody></table>
          </div>
          <p className="mt-5 max-w-4xl text-sm leading-relaxed text-soft">{"A better perception score is an intermediate result. Evaluate the action and object outcome separately before describing the system as a better manipulation solution."}</p>
          <div className="mt-5 flex flex-wrap gap-4 text-sm"><Link href="/guides/tactile-sensor-benchmark-robot-manipulation" className="text-accent underline underline-offset-4">{"Build a matched task protocol"}</Link><Link href="/methodology#evidence-types" className="text-accent underline underline-offset-4">{"Read the evidence boundaries"}</Link></div>
          <p className="mt-5 text-xs text-soft">Reading guidance updated <time dateTime="2026-11-04">November 4, 2026</time>.</p>
        </div>
      </section>

    </>
  );
}
