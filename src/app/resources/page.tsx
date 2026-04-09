import type { Metadata } from 'next';
import Link from 'next/link';
import { resourceSections, site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Resources',
  description: 'Request RoboSkin datasheets, integration notes, SDK access, and technical briefs.',
  alternates: {
    canonical: `${site.url}/resources`,
  },
};

export default function ResourcesPage() {
  return (
    <>
      <section className="py-20 md:py-24">
        <div className="container-shell">
          <span className="eyebrow">Resources</span>
          <h1 className="mt-5 text-4xl font-bold text-white md:text-6xl">Request the right technical material</h1>
          <p className="mt-5 max-w-3xl text-slate-300">
            Only publicly supported resources are shown here. Missing assets are converted to request flows instead of dead downloads.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-shell space-y-8">
          {resourceSections.map((section) => (
            <div key={section.title}>
              <h2 className="mb-4 text-2xl font-semibold text-white">{section.title}</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {section.items.map((item) => (
                  <article key={item.title} className="glass-card p-6">
                    <p className="text-xs uppercase tracking-[0.14em] text-cyan-200/70">{item.availability}</p>
                    <h3 className="mt-2 text-xl font-semibold text-white">{item.title}</h3>
                    <p className="mt-2 text-sm text-slate-300">{item.description}</p>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="pb-20">
        <div className="container-shell">
          <div className="glass-card p-8 text-center md:p-11">
            <h2 className="text-3xl font-bold text-white md:text-4xl">Need help deciding what to request?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-300">
              Tell us your robot type and use case, and we will route you to the most relevant resource or engineer.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link href="/contact?requestType=datasheet" className="rounded-xl bg-gradient-to-r from-cyan-300 to-blue-400 px-6 py-3 text-sm font-bold text-slate-950">
                Request datasheet
              </Link>
              <Link href="/contact?requestType=integration" className="rounded-xl border border-cyan-200/35 px-6 py-3 text-sm font-semibold text-cyan-100">
                Request integration docs
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
