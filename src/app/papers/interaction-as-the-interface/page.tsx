import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import { interactionPaper as paper, workingPaperEvidence } from '@/content/working-papers';
import { buildBreadcrumbJsonLd, buildGraphJsonLd, buildPageJsonLd, buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata('/papers/interaction-as-the-interface');

const steps = ['Observe', 'Update belief', 'Predict outcomes', 'Probe when useful', 'Act and replan'];
const results = [
  ['0.50', '0.500350', '0.799110', '0.298760'],
  ['0.75', '0.749655', '0.799110', '0.049455'],
  ['0.95', '0.950395', '0.950395', '0.000000'],
];

export default function InteractionPaperPage() {
  return (
    <>
      <JsonLd data={buildGraphJsonLd([buildPageJsonLd(paper.path), buildBreadcrumbJsonLd(paper.path)])} />
      <section className="border-b border-white/10 py-12 md:py-16">
        <div className="container-shell">
          <nav aria-label="Breadcrumb" className="mb-9 flex flex-wrap gap-2 text-sm text-[#aebaca]">
            <Link href="/research" className="hover:text-white">Research</Link><span aria-hidden="true">/</span>
            <Link href="/papers" className="hover:text-white">Working Papers</Link><span aria-hidden="true">/</span>
            <span>Interaction as the Interface</span>
          </nav>
          <div className="flex flex-wrap gap-2 text-xs font-medium">
            {[paper.status, `Version ${paper.version}`, 'Not peer reviewed'].map((label) => (
              <span key={label} className="rounded-full border border-[#ff6b3d]/30 bg-[#ff6b3d]/10 px-3 py-1.5 text-[#ffac8f]">{label}</span>
            ))}
          </div>
          <h1 className="mt-6 max-w-5xl text-4xl font-bold leading-tight text-white md:text-6xl">{paper.title}</h1>
          <p className="mt-4 max-w-4xl text-xl leading-relaxed text-[#c8d1de] md:text-2xl">{paper.subtitle}</p>
          <p className="mt-6 text-sm text-[#aebaca]">Prepared for RoboSkin.ai · AI-assisted research draft · <time dateTime={paper.date}>{paper.displayDate}</time></p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href={paper.downloads.pdf} className="btn-primary" target="_blank" rel="noopener noreferrer">Read manuscript · PDF <span className="sr-only">(opens in a new tab)</span></a>
            <a href={paper.downloads.benchmark} className="btn-secondary" download>Download code &amp; results</a>
            <a href="#evidence" className="btn-tertiary">What has been tested ↓</a>
          </div>
        </div>
      </section>

      <div className="container-shell grid gap-12 py-12 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-16 md:py-16">
        <div className="min-w-0 space-y-14">
          <section id="overview" className="scroll-mt-24">
            <p className="eyebrow">The research question</p>
            <h2 className="mt-4 text-3xl font-semibold text-white">When is another interaction worth it?</h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-[#c8d1de]">
              <p>A robot may need to touch, move, or test an object before it can choose a useful action. This proposal asks whether explicitly representing uncertain physical states and predicted action outcomes can improve those decisions.</p>
              <p>The manuscript describes an interface connecting observation history, feasible commands, predicted consequences, and feedback. An analytical example and a reproducible synthetic benchmark examine when additional sensing helps, becomes redundant, or causes harm through an incorrect sensor model.</p>
            </div>
            <ol className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-5" aria-label="Proposed interaction loop">
              {steps.map((step, index) => (
                <li key={step} className="rounded-lg border border-white/10 bg-white/[0.025] p-4">
                  <span className="font-mono text-xs text-[#ffac8f]">0{index + 1}</span>
                  <p className="mt-3 text-sm font-semibold leading-relaxed text-white">{step}</p>
                </li>
              ))}
            </ol>
            <p className="mt-4 text-sm leading-relaxed text-[#aebaca]">This loop describes the proposed architecture. The released executable evaluates only the binary decision example.</p>
          </section>

          <section id="evidence" className="scroll-mt-24">
            <h2 className="text-3xl font-semibold text-white">Current evidence</h2>
            <p className="mt-4 text-base leading-relaxed text-[#c8d1de]">Analytical example and synthetic benchmark completed. Learning architecture proposed.</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {workingPaperEvidence.map((item) => (
                <article key={item.title} className="signal-panel p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#ffac8f]">{item.status}</p>
                  <h3 className="mt-3 text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#aebaca]">{item.text}</p>
                </article>
              ))}
            </div>
            <p className="mt-5 text-sm leading-relaxed text-[#aebaca]">The benchmark checks a standard decision rule under a known observation model. Establishing a distinct algorithmic or theoretical contribution is part of the continuing research.</p>
          </section>

          <section id="benchmark" className="scroll-mt-24">
            <h2 className="text-3xl font-semibold text-white">A small, inspectable decision example</h2>
            <p className="mt-5 text-base leading-relaxed text-[#c8d1de]">In the specified binary problem, a useful probe must improve the final decision enough to repay its cost. If the best immediate success probability is M, the probe accuracy is p, and its cost is c, the optimal net utility is:</p>
            <div className="mt-6 rounded-lg border border-white/15 bg-white/[0.025] px-5 py-6 text-center font-mono text-2xl text-white" aria-label="Optimal net utility equals the maximum of M and p minus c">V* = max(M, p − c)</div>
            <p className="mt-4 text-sm leading-relaxed text-[#aebaca]">This formula assumes two final actions with reward 1 for a correct choice and 0 otherwise, a known symmetric binary probe with accuracy p ≥ 0.5, one state-preserving probe, and nonnegative cost c measured in the same reward units. It is an illustrative Bayesian calculation.</p>
            <div className="mt-7 overflow-x-auto rounded-lg border border-white/10">
              <table className="w-full text-left text-sm">
                <caption className="border-b border-white/10 px-5 py-4 text-left font-semibold text-white">Measured net utility in the synthetic benchmark</caption>
                <thead className="bg-white/5 text-[#c8d1de]">
                  <tr>{['Visual accuracy', 'Direct action', 'Selective probe', 'Difference'].map((label) => <th key={label} scope="col" className="px-4 py-3 font-medium">{label}</th>)}</tr>
                </thead>
                <tbody className="font-mono text-[#c8d1de]">
                  {results.map((row) => <tr key={row[0]} className="border-t border-white/10">{row.map((cell, index) => index === 0 ? <th key={index} scope="row" className="px-4 py-3 font-normal">{cell}</th> : <td key={index} className="px-4 py-3">{cell}</td>)}</tr>)}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-[#aebaca]">Probe accuracy 0.90; cost 0.10. Twenty seeds reuse 200,000 base random scenarios across three conditions, giving 600,000 episode-condition evaluations. These are synthetic calculations, not physical-robot trials. Within each condition the selective policy either always probes or always skips.</p>
            <p className="mt-3 text-sm leading-relaxed text-[#aebaca]">The manuscript and download package include exact expectations, per-seed results, and paired intervals that measure Monte Carlo sampling error only.</p>
          </section>

      <section id="numerical-recheck" className="pb-12 pt-8 scroll-mt-28">
        <div>
          <h2 className="text-2xl font-semibold text-white md:text-3xl">{"What the November 4 numerical recheck establishes"}</h2>
          <p className="mt-4 max-w-4xl text-sm leading-relaxed text-soft">{"On November 4, 2026, we reran the unmodified v0.2 benchmark script with Python 3.13.3 and 10,000 episodes per seed. All five generated CSV files were byte-identical to the released files. The package and manuscript remain version 0.2; this is a dated execution check of the numerical example, not a new experiment on a robot."}</p>
          <div className="mt-6 overflow-x-auto rounded-md border border-white/10" tabIndex={0} role="region" aria-label="What the November 4 numerical recheck establishes">
            <table className="w-full min-w-[720px] border-collapse text-left text-sm"><thead><tr><th scope="col" className="border-b border-white/10 px-4 py-3 text-white">{"Output or comparison"}</th><th scope="col" className="border-b border-white/10 px-4 py-3 text-white">{"How to read it"}</th><th scope="col" className="border-b border-white/10 px-4 py-3 text-white">{"Boundary"}</th></tr></thead><tbody>
              <tr><th scope="row" className="border-b border-white/10 px-4 py-4 align-top font-semibold text-white">{"Twenty seeds and three visual conditions"}</th><td className="border-b border-white/10 px-4 py-4 align-top leading-relaxed text-soft">{"Each seed contributes 10,000 base scenarios; those scenarios are reused across the three conditions. Eight policies are evaluated on the same sampled cases."}</td><td className="border-b border-white/10 px-4 py-4 align-top leading-relaxed text-soft">{"The resulting policy decisions are paired, not millions of independent trials."}</td></tr>
              <tr><th scope="row" className="border-b border-white/10 px-4 py-4 align-top font-semibold text-white">{"0.298760 and 0.049455 utility differences"}</th><td className="border-b border-white/10 px-4 py-4 align-top leading-relaxed text-soft">{"At visual accuracies 0.50 and 0.75, the selective rule uses the probe. At 0.95 it skips, producing zero difference from direct action."}</td><td className="border-b border-white/10 px-4 py-4 align-top leading-relaxed text-soft">{"These are net-utility differences in the specified reward units, not robot-success percentage-point gains."}</td></tr>
              <tr><th scope="row" className="border-b border-white/10 px-4 py-4 align-top font-semibold text-white">{"Paired intervals across seeds"}</th><td className="border-b border-white/10 px-4 py-4 align-top leading-relaxed text-soft">{"They summarize Monte Carlo variability under the same known observation model."}</td><td className="border-b border-white/10 px-4 py-4 align-top leading-relaxed text-soft">{"They do not include uncertainty in real sensor calibration, model misspecification or deployment conditions."}</td></tr>
              <tr><th scope="row" className="border-b border-white/10 px-4 py-4 align-top font-semibold text-white">{"Exact parameter scan"}</th><td className="border-b border-white/10 px-4 py-4 align-top leading-relaxed text-soft">{"This enumerates the analytical decision example over a parameter grid."}</td><td className="border-b border-white/10 px-4 py-4 align-top leading-relaxed text-soft">{"Rows in that file are calculations, not additional physical or independently sampled experiments."}</td></tr>
            </tbody></table>
          </div>
          <p className="mt-5 max-w-4xl text-sm leading-relaxed text-soft">{"The result is intentionally narrow. With fixed accuracy inside each visual condition, the selective policy always probes or always skips; it does not learn an adaptive contact strategy from tactile data. A stronger next study would estimate observation reliability from limited calibration data, keep evaluation cases separate, and compare actual outcomes and interaction costs under model error. Those checks are proposed work."}</p>
          <div className="mt-5 flex flex-wrap gap-4 text-sm"><Link href="/publications/interaction-as-the-interface/checks/2026-11-04.json" className="text-accent underline underline-offset-4">{"Read the execution and checksum record"}</Link><Link href="/publications/interaction-as-the-interface/v0.2/README.md" className="text-accent underline underline-offset-4">{"Released run instructions"}</Link><Link href="/methodology" className="text-accent underline underline-offset-4">{"Interpret measured and proposed evidence"}</Link></div>
          <p className="mt-5 text-xs text-soft">Reading guidance updated <time dateTime="2026-11-04">November 4, 2026</time>.</p>
        </div>
      </section>

          <section id="next-study" className="scroll-mt-24">
            <h2 className="text-3xl font-semibold text-white">The next research question</h2>
            <p className="mt-5 text-base leading-relaxed text-[#c8d1de]">With limited calibration data, how reliably can a system determine whether a probe will improve the task outcome? The next study will need a precise method and fair comparisons with existing decision-focused experimental design and robust control.</p>
            <p className="mt-4 text-sm leading-relaxed text-[#aebaca]">Relevant precedents include <a href="https://arxiv.org/abs/1805.11085" className="text-[#ffac8f] underline underline-offset-4">vision-and-touch grasp adjustment</a>, <a href="https://arxiv.org/abs/2605.26093" className="text-[#ffac8f] underline underline-offset-4">GoBOED</a>, and <a href="https://arxiv.org/abs/1906.05988" className="text-[#ffac8f] underline underline-offset-4">distributionally robust POMDPs</a>. The proposal does not establish a new general control principle.</p>
          </section>

          <section id="versions" className="scroll-mt-24">
            <h2 className="text-3xl font-semibold text-white">Version history</h2>
            <ol className="mt-6 space-y-6 border-l border-white/15 pl-6">
              <li>
                <h3 className="font-semibold text-white">Version 0.2 <span className="ml-2 text-sm font-normal text-[#aebaca]">27 September 2026 · Current download</span></h3>
                <p className="mt-3 text-sm leading-relaxed text-[#c8d1de]">Clarifies proposal status, corrects belief-update and value-approximation details, adds direct precedents, explains shared random scenarios, and records a local reproducibility check of the numerical outputs.</p>
              </li>
              <li>
                <h3 className="font-semibold text-white">Version 0.1 <span className="ml-2 text-sm font-normal text-[#aebaca]">27 September 2026 · Initial internal draft</span></h3>
                <p className="mt-3 text-sm leading-relaxed text-[#c8d1de]">Initial proposal, analytical decision example, and synthetic benchmark. Superseded by version 0.2.</p>
              </li>
            </ol>
          </section>
        </div>

        <aside className="min-w-0 space-y-7">
          <section id="downloads" className="signal-panel scroll-mt-24 p-6">
            <h2 className="text-xl font-semibold text-white">Read &amp; reproduce</h2>
            <p className="mt-3 text-sm leading-relaxed text-[#aebaca]">Version {paper.version} · English manuscript · 16 pages</p>
            <ul className="mt-6 space-y-6">
              <li><a href={paper.downloads.pdf} className="font-semibold text-[#ffac8f] hover:text-white" target="_blank" rel="noopener noreferrer">Manuscript PDF ↗<span className="sr-only"> (opens in a new tab)</span></a><p className="mt-2 text-xs leading-relaxed text-[#aebaca]">Proposal, derivation, results, and evaluation plan.</p></li>
              <li><a href={paper.downloads.source} className="font-semibold text-[#ffac8f] hover:text-white" download>LaTeX source ↓</a><p className="mt-2 text-xs leading-relaxed text-[#aebaca]">Editable manuscript for this version.</p></li>
              <li><a href={paper.downloads.benchmark} className="font-semibold text-[#ffac8f] hover:text-white" download>Benchmark package ↓</a><p className="mt-2 text-xs leading-relaxed text-[#aebaca]">Python code, numerical results, and reproduction instructions.</p></li>
              <li><a href={paper.downloads.readme} className="text-sm text-[#c8d1de] underline underline-offset-4">Read the run instructions</a></li>
              <li><a href={paper.downloads.manifest} className="text-sm text-[#c8d1de] underline underline-offset-4">File checksums and provenance</a></li>
            </ul>
          </section>
          <nav aria-label="On this page" className="px-2">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-white">In this paper</h2>
            <ul className="mt-4 space-y-3 text-sm text-[#aebaca]">
              {[['overview', 'Research question'], ['evidence', 'Current evidence'], ['benchmark', 'Decision example'], ['numerical-recheck', 'Dated numerical recheck'], ['next-study', 'Next study'], ['versions', 'Version history']].map(([id, label]) => <li key={id}><a href={`#${id}`} className="hover:text-white">{label}</a></li>)}
            </ul>
          </nav>
          <section className="border-t border-white/10 px-2 pt-6">
            <h2 className="text-lg font-semibold text-white">Preparation &amp; feedback</h2>
            <p className="mt-3 text-sm leading-relaxed text-[#aebaca]">Prepared for RoboSkin.ai with AI assistance in literature review, analysis, code, and writing. Research authorship has not been assigned in this version.</p>
            <Link href="/contact?requestType=research" className="mt-5 inline-block text-sm font-semibold text-[#ffac8f] hover:text-white">Send a correction or collaboration proposal →</Link>
          </section>
        </aside>
      </div>
    </>
  );
}
