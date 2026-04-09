import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn what RoboSkin focuses on, who it serves, and how to contact the team.',
  alternates: {
    canonical: `${site.url}/about`,
  },
};

export default function AboutPage() {
  return (
    <>
      <section className="py-20 md:py-24">
        <div className="container-shell">
          <span className="eyebrow">About</span>
          <h1 className="mt-5 text-4xl font-bold text-white md:text-6xl">About RoboSkin</h1>
          <p className="mt-5 max-w-3xl text-slate-300">
            RoboSkin focuses on tactile sensing systems for robotics applications, including flexible pressure-sensing arrays, integration tooling, and application-driven engineering support.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-shell grid gap-6 lg:grid-cols-2">
          <article className="glass-card p-7 md:p-8">
            <h2 className="text-2xl font-semibold text-white">What we focus on</h2>
            <p className="mt-3 text-slate-300">
              We keep the public story narrow: tactile hardware, robotics integration, and practical support for teams building real systems.
            </p>
          </article>
          <article className="glass-card p-7 md:p-8">
            <h2 className="text-2xl font-semibold text-white">Who the site is for</h2>
            <p className="mt-3 text-slate-300">
              Robotics engineers, OEM teams, research labs, and product owners who need a credible starting point for tactile sensing work.
            </p>
          </article>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-shell">
          <div className="glass-card p-8 text-center md:p-11">
            <h2 className="text-3xl font-bold text-white md:text-4xl">Need a quick answer from engineering?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-300">
              Share your application and timeline, and we will point you to the best next step.
            </p>
            <div className="mt-7 flex justify-center">
              <Link href="/contact" className="rounded-xl bg-gradient-to-r from-cyan-300 to-blue-400 px-7 py-3 text-sm font-bold text-slate-950">
                Contact the team
              </Link>
            </div>
            <p className="mt-4 text-sm text-slate-400">
              Direct inquiries: <a className="text-cyan-200" href={`mailto:${site.contact.primaryEmail}`}>{site.contact.primaryEmail}</a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
