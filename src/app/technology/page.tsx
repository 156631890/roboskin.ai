import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import PageHeroVisual from '@/components/PageHeroVisual';
import { fitCriteria, pageVisuals, sensorDataFlow, technologyLayers } from '@/content/site';
import { buildBreadcrumbJsonLd, buildGraphJsonLd, buildPageJsonLd, buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata('/technology');

export default function TechnologyPage() {
  return (
    <>
      <JsonLd data={buildGraphJsonLd([buildPageJsonLd('/technology'), buildBreadcrumbJsonLd('/technology')])} />
      <section className="py-20 md:py-24">
        <div className="container-shell">
          <span className="eyebrow">Technology</span>
          <h1 className="mt-5 text-4xl font-bold text-white md:text-6xl">Robot skin technology context</h1>
          <p className="mt-5 max-w-3xl text-soft">
            This page explains robot skin concepts, tactile sensing layers, signal flow, and validation questions without presenting RoboSkin.ai as an active product vendor.
          </p>
          <PageHeroVisual visual={pageVisuals.technology} className="mt-10" priority />
        </div>
      </section>

      <section className="pb-20">
        <div className="container-shell grid gap-6 lg:grid-cols-2">
          {technologyLayers.map((layer) => (
            <article key={layer.title} className="glass-card p-7 md:p-8">
              <p className="text-soft text-xs uppercase tracking-[0.14em]">Layer</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">{layer.title}</h2>
              <p className="mt-3 text-soft">{layer.summary}</p>
              {layer.bullets?.length ? (
                <ul className="mt-5 space-y-2 text-sm text-[#d8dce4]">
                  {layer.bullets.map((bullet) => (
                    <li key={bullet} className="rounded-lg border border-white/8 bg-[#0d1016] px-4 py-2.5">
                      {bullet}
                    </li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section className="pb-20">
        <div className="container-shell">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="eyebrow">Data flow</span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-5xl">From contact surface to robot-ready signal concepts</h2>
            </div>
            <Link href="/research/ros2-kilted-tactile-pipeline-2026" className="text-accent text-sm font-semibold hover:text-white">
              Read ROS 2 pipeline brief {'->'}
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {sensorDataFlow.map((step, index) => (
              <article key={step.title} className="glass-card p-6">
                <p className="text-soft text-xs uppercase tracking-[0.14em]">Step {index + 1}</p>
                <h3 className="mt-2 text-xl font-semibold text-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-soft">{step.summary}</p>
                <p className="mt-4 rounded-xl border border-white/8 bg-[#0d1016] px-4 py-3 text-sm text-[#d8dce4]">{step.output}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-shell">
          <div className="rounded-[24px] border border-white/8 bg-[#0b0d12] p-7 md:p-8">
            <p className="text-soft text-xs uppercase tracking-[0.14em]">Fit criteria</p>
            <h2 className="mt-2 text-3xl font-bold text-white md:text-4xl">What must be validated before making claims</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {fitCriteria.map((item) => (
                <article key={item.title} className="rounded-2xl border border-white/8 bg-[#0d1016] p-5">
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-soft">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-shell">
          <div className="rounded-[24px] border border-white/8 bg-[#0b0d12] p-8 text-center md:p-11">
            <h2 className="text-3xl font-bold text-white md:text-5xl">Need source-backed robot skin context?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-soft">
              Use the research and glossary routes for terminology, or send a domain inquiry if RoboSkin.ai fits your project.
            </p>
            <div className="mt-7 flex justify-center">
              <Link
                href="/research"
                className="rounded-xl bg-[var(--primary)] px-7 py-3 text-sm font-bold text-white shadow-[0_12px_26px_rgba(98,168,255,0.22)]"
              >
                Explore research resources
              </Link>
            </div>
            <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm">
              <Link href="/products" className="text-accent font-semibold hover:text-white">
                View domain use cases {'->'}
              </Link>
              <Link href="/resources" className="text-accent font-semibold hover:text-white">
                View learning resources {'->'}
              </Link>
              <Link href="/faq" className="text-accent font-semibold hover:text-white">
                Read tactile AI FAQ {'->'}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
