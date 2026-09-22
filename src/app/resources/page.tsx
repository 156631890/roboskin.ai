import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import PageHeroVisual from '@/components/PageHeroVisual';
import { seoTopicPages } from '@/content/seo-topic-pages';
import { groupResourcePages, resourceGoals } from '@/content/resource-navigation';
import { pageVisuals, resourceSections } from '@/content/site';
import { buildBreadcrumbJsonLd, buildGraphJsonLd, buildPageJsonLd, buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata('/resources');

export default function ResourcesPage() {
  const topicGroups = groupResourcePages(seoTopicPages);
  return (
    <>
      <JsonLd data={buildGraphJsonLd([buildPageJsonLd('/resources'), buildBreadcrumbJsonLd('/resources')])} />
      <section className="py-20 md:py-24">
        <div className="container-shell">
          <span className="eyebrow">Resources</span>
          <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
            <h1 className="text-4xl font-bold text-[var(--text)] md:text-6xl">Tactile robotics resources by task</h1>
            <Link href="/research" className="text-accent text-sm font-semibold hover:text-[#ff9b73]">
              Explore research resources {'->'}
            </Link>
          </div>
          <p className="mt-5 max-w-3xl text-soft">
            Choose what you need to do, then follow a guide, sensor record, dataset, or paper review.
            The complete directory below is grouped by subject so you can move from a question to the relevant evidence.
          </p>
          <PageHeroVisual visual={pageVisuals.resources} className="mt-10" priority />
        </div>
      </section>

      <section className="pb-12" aria-labelledby="resource-goals-heading">
        <div className="container-shell">
          <h2 id="resource-goals-heading" className="mb-5 text-2xl font-semibold text-white">What are you working on?</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {resourceGoals.map((goal) => (
              <Link key={goal.href} href={goal.href} className="glass-card block p-6">
                <h3 className="text-lg font-semibold text-white">{goal.label}</h3>
                <p className="mt-2 text-sm text-soft">{goal.description}</p>
              </Link>
            ))}
          </div>
          <nav aria-label="Browse resource subjects" className="mt-6 flex flex-wrap gap-x-5 gap-y-3">
            {topicGroups.map((group) => <a key={group.id} href={`#${group.id}`} className="text-sm text-accent underline underline-offset-4">{group.title}</a>)}
          </nav>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-shell space-y-8">
          {resourceSections.map((section) => (
            <div key={section.title} id={section.title === 'Programming & Tutorials' ? 'programming-tutorials' : undefined}>
              <h2 className="mb-4 text-2xl font-semibold text-white">{section.title}</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {section.items.map((item) => (
                  <article key={item.title} className="glass-card p-6">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <p className="text-soft text-xs uppercase tracking-[0.14em]">{item.availability}</p>
                      {item.href ? (
                        <Link href={item.href} className="text-accent text-sm font-semibold hover:text-[#ff9b73]">
                          {item.ctaLabel ?? 'Request'} {'->'}
                        </Link>
                      ) : null}
                    </div>
                    <h3 className="mt-2 text-xl font-semibold text-white">{item.title}</h3>
                    <p className="mt-2 text-sm text-soft">{item.description}</p>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="pb-20">
        <div className="container-shell">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Complete guide directory</p>
              <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">Browse by subject</h2>
            </div>
            <Link href="/robot-skin" className="text-accent text-sm font-semibold hover:text-[#ff9b73]">
              Start at robot skin {'->'}
            </Link>
          </div>
          {topicGroups.map((group) => (
            <section key={group.id} id={group.id} className="mb-10 scroll-mt-24" aria-labelledby={`${group.id}-heading`}>
              <h3 id={`${group.id}-heading`} className="text-2xl font-semibold text-white">{group.title}</h3>
              <p className="mb-4 mt-2 text-sm text-soft">{group.description}</p>
              <div className="grid gap-4 md:grid-cols-2">
                {group.pages.map((page) => (
                  <Link key={page.path} href={page.path} className="glass-card block p-6 transition-colors hover:bg-white/[0.04]">
                    <span className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#ff6b3d]">{page.kicker}</span>
                    <h4 className="mt-3 text-xl font-semibold text-white">{page.h1}</h4>
                    <p className="mt-3 text-sm leading-relaxed text-soft">{page.description}</p>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>

      <section className="pb-20">
        <div className="container-shell">
          <div className="rounded-[24px] border border-white/8 bg-[#0b0d12] p-7 md:p-8">
            <p className="text-soft text-xs uppercase tracking-[0.14em]">Trusted external references</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Reference points for robot skin learning</h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-soft">
              RoboSkin.ai keeps external links narrow and useful. These resources help readers align terminology and avoid unsupported product claims.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href="https://publications.ri.cmu.edu/a-review-of-tactile-information-perception-and-action-through-touch"
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-white/12 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/8"
              >
                Tactile perception and action review
              </a>
              <a
                href="https://docs.ros.org/"
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-white/12 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/8"
              >
                ROS documentation
              </a>
            </div>
            <p className="mt-5 max-w-3xl text-sm leading-relaxed text-soft">
              For robotics and embedded-system hardware development,{' '}
              <a
                href="https://www.vigorcomp.com/"
                target="_blank"
                rel="noopener"
                className="text-accent font-semibold hover:text-[#ff9b73]"
              >
                Vigor Components
              </a>
              {' '}provides access to electronic components, connectors, power devices, and sourcing resources that can support BOM planning and prototype-to-production workflows.
            </p>
            <p className="mt-5 max-w-3xl text-sm leading-relaxed text-soft">
              For motor-drive and industrial power electronics component information, see{' '}
              <a
                href="https://www.shysemi.com/"
                target="_blank"
                rel="noopener"
                className="text-accent font-semibold hover:text-[#ff9b73]"
              >
                SHYSEMI power semiconductors
              </a>
              {' '}(IPM, IGBT and SiC).
            </p>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-shell">
          <div className="rounded-[24px] border border-white/8 bg-[#0b0d12] p-8 text-center md:p-11">
            <h2 className="text-3xl font-bold text-white md:text-4xl">Choose a learning route</h2>
            <p className="mx-auto mt-4 max-w-2xl text-soft">
              Start with source-backed research, terminology, or a research inquiry depending on what you need to understand.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link href="/research" className="rounded-xl bg-[var(--primary)] px-6 py-3 text-sm font-bold text-white shadow-[0_12px_26px_rgba(98,168,255,0.22)]">
                Explore research resources
              </Link>
              <Link href="/glossary" className="rounded-xl border border-white/12 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/8">
                Read the glossary
              </Link>
              <Link href="/contact?requestType=research" className="rounded-xl border border-white/12 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/8">
                Research inquiry
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
