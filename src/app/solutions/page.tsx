import type { Metadata } from 'next';
import Link from 'next/link';
import { site, solutionCards } from '@/content/site';

export const metadata: Metadata = {
  title: 'Solutions',
  description: 'Explore RoboSkin solutions for robotic grippers, humanoids, prosthetics, and research teams.',
  alternates: {
    canonical: `${site.url}/solutions`,
  },
};

export default function SolutionsPage() {
  return (
    <>
      <section className="py-20 md:py-24">
        <div className="container-shell">
          <span className="eyebrow">Solutions</span>
          <h1 className="mt-5 text-4xl font-bold text-white md:text-6xl">Built around customer problems, not hype</h1>
          <p className="mt-5 max-w-3xl text-slate-300">
            Each solution path explains the problem, why tactile sensing helps, and which product path is the best fit.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-shell grid gap-6 lg:grid-cols-2">
          {solutionCards.map((solution) => (
            <article key={solution.title} className="glass-card p-7 md:p-8">
              <p className="text-xs uppercase tracking-[0.14em] text-cyan-200/70">Solution</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">{solution.title}</h2>
              <div className="mt-4 space-y-3 text-sm text-slate-300">
                <p><span className="font-semibold text-white">Problem:</span> {solution.problem}</p>
                <p><span className="font-semibold text-white">Why tactile sensing matters:</span> {solution.why}</p>
                <p><span className="font-semibold text-white">Recommended path:</span> {solution.path}</p>
                <p><span className="font-semibold text-white">Note:</span> {solution.note}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="pb-20">
        <div className="container-shell">
          <div className="glass-card p-8 text-center md:p-11">
            <h2 className="text-3xl font-bold text-white md:text-4xl">Need help selecting a solution path?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-300">
              Send the robot type, target surface, and timeline, and we will recommend the right starting point.
            </p>
            <div className="mt-7 flex justify-center">
              <Link
                href="/contact?requestType=integration"
                className="rounded-xl bg-gradient-to-r from-cyan-300 to-blue-400 px-7 py-3 text-sm font-bold text-slate-950 shadow-[0_12px_30px_rgba(36,169,255,0.35)]"
              >
                Talk to engineering
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
