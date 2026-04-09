import type { Metadata } from 'next';
import Link from 'next/link';
import { site, technologyLayers } from '@/content/site';

export const metadata: Metadata = {
  title: 'Technology',
  description: 'Understand how RoboSkin structures tactile sensing, signal processing, form factors, and integration support.',
  alternates: {
    canonical: `${site.url}/technology`,
  },
};

export default function TechnologyPage() {
  return (
    <>
      <section className="py-20 md:py-24">
        <div className="container-shell">
          <span className="eyebrow">Technology</span>
          <h1 className="mt-5 text-4xl font-bold text-white md:text-6xl">How RoboSkin works</h1>
          <p className="mt-5 max-w-3xl text-slate-300">
            RoboSkin combines flexible sensing layers, signal processing, form-factor design, and integration tooling for tactile robotics programs.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-shell grid gap-6 lg:grid-cols-2">
          {technologyLayers.map((layer) => (
            <article key={layer.title} className="glass-card p-7 md:p-8">
              <p className="text-xs uppercase tracking-[0.14em] text-cyan-200/70">Layer</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">{layer.title}</h2>
              <p className="mt-3 text-slate-300">{layer.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="pb-20">
        <div className="container-shell">
          <div className="glass-card p-8 text-center md:p-11">
            <h2 className="text-3xl font-bold text-white md:text-5xl">Need an architecture review for your robot platform?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-300">
              We provide integration assessments, sensing layout design, and full-stack tactile software support.
            </p>
            <div className="mt-7 flex justify-center">
              <Link
                href="/contact?requestType=integration"
                className="rounded-xl bg-gradient-to-r from-cyan-300 to-blue-400 px-7 py-3 text-sm font-bold text-slate-950 shadow-[0_12px_30px_rgba(36,169,255,0.35)]"
              >
                Request technical consultation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
