import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import PageHeroVisual from '@/components/PageHeroVisual';
import { pageVisuals } from '@/content/site';
import { blogPosts } from '@/lib/blog-data';
import { buildBreadcrumbJsonLd, buildGraphJsonLd, buildPageJsonLd, buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata('/research');

const researchRouteCards = [
  {
    label: 'Source boundary',
    title: 'Public sources stay visible',
    text: 'Each note keeps source attribution separate from RoboSkin.ai interpretation.',
  },
  {
    label: 'Evaluation lens',
    title: 'Claims are routed to checks',
    text: 'Performance, durability, and integration language is framed as evidence to verify.',
  },
  {
    label: 'Category memory',
    title: 'Terms connect across pages',
    text: 'Research briefs link back to glossary language, tactile AI routes, and application context.',
  },
  {
    label: 'Physics AI route',
    title: 'Tactile research supports physical-world AI',
    text: 'Use the Physics AI explainer to connect robot skin research, tactile sensing, and contact feedback without turning source notes into product claims.',
    href: '/physics-ai',
    ctaLabel: 'Open Physics AI route',
  },
];

export default function ResearchPage() {
  const posts = blogPosts.slice().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const categories = posts.reduce<Record<string, typeof posts>>((acc, item) => {
    (acc[item.category] ??= []).push(item);
    return acc;
  }, {});
  const categoryEntries = Object.entries(categories).sort(([a], [b]) => a.localeCompare(b));
  const focusCount = new Set(posts.flatMap((post) => post.technicalFocus)).size;
  const sourceCount = new Set(posts.map((post) => post.sourceUrl)).size;

  const researchStats = [
    { value: String(posts.length), label: 'technical briefs' },
    { value: String(categoryEntries.length), label: 'research lanes' },
    { value: String(sourceCount), label: 'source paths' },
    { value: String(focusCount), label: 'focus terms' },
  ];

  return (
    <>
      <JsonLd data={buildGraphJsonLd([buildPageJsonLd('/research'), buildBreadcrumbJsonLd('/research')])} />
      <section className="py-14 md:py-20">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.78fr_1.02fr] lg:items-center">
          <div>
            <span className="eyebrow">Research</span>
            <h1 className="mt-5 text-4xl font-bold leading-tight text-white md:text-6xl">Research notes</h1>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-[#c8d1de]">
              A source-backed signal board for robot skin, tactile AI, e-skin, multimodal sensing, ROS 2 tactile pipelines,
              and contact-aware robot hands.
            </p>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#8e98a8]">
              Public notes use conservative language. Application-specific performance, durability, and integration claims still need
              source-backed, application-specific evidence.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href="#research-notes" className="btn-primary w-full sm:w-auto">
                Open source-backed briefs
              </Link>
              <Link href="/glossary" className="btn-secondary w-full sm:w-auto">
                Map the terminology
              </Link>
              <Link href="/contact?requestType=research" className="btn-tertiary w-full sm:w-auto">
                Submit a Source
              </Link>
            </div>
          </div>

          <div className="grid gap-4">
            <PageHeroVisual visual={pageVisuals.resources} priority />
            <dl className="grid gap-3 sm:grid-cols-4">
              {researchStats.map((item) => (
                <div key={item.label} className="signal-panel p-4">
                  <dt className="font-mono text-lg font-semibold text-white">{item.value}</dt>
                  <dd className="mt-1 text-xs uppercase tracking-[0.12em] text-[#8e98a8]">{item.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="pb-14 md:pb-20">
        <div className="container-shell grid gap-4 md:grid-cols-3">
          {researchRouteCards.map((card) => (
            <article key={card.title} className="signal-panel p-6">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#00e5ff]">{card.label}</p>
              <h2 className="mt-3 text-xl font-semibold text-white">{card.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-[#8e98a8]">{card.text}</p>
              {'href' in card ? (
                <Link href={card.href} className="mt-5 inline-flex text-sm font-semibold text-[#00e5ff] hover:text-white">
                  {card.ctaLabel} {'->'}
                </Link>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section id="research-notes" className="pb-20">
        <div className="container-shell space-y-9">
          {categoryEntries.map(([category, items]) => (
            <section key={category} className="scroll-mt-24">
              <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#00e5ff]">Research lane</p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">{category}</h2>
                </div>
                <Link href="/contact?requestType=research" className="text-sm font-semibold text-[#00e5ff] hover:text-white">
                  Submit source context {'->'}
                </Link>
              </div>

              <div className="signal-panel overflow-hidden p-0">
                {items.map((post) => (
                  <article key={post.id} className="grid gap-5 border-b border-white/8 p-5 last:border-b-0 md:grid-cols-[184px_1fr] md:p-6">
                    <Link href={`/research/${post.id}`} className="relative block aspect-[16/10] overflow-hidden rounded-md border border-white/10 bg-[#020408]">
                      <Image src={post.image} alt="" fill sizes="184px" className="object-cover transition-transform duration-300 hover:scale-[1.03]" />
                    </Link>
                    <div>
                      <p className="font-mono text-xs uppercase tracking-[0.12em] text-[#8e98a8]">
                        {post.date} / {post.readTime}
                      </p>
                      <h3 className="mt-3 text-xl font-semibold leading-snug text-white">{post.title}</h3>
                      <p className="mt-2 max-w-4xl text-sm leading-relaxed text-[#c8d1de]">{post.excerpt}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {post.technicalFocus.slice(0, 4).map((topic) => (
                          <span key={topic} className="rounded-md border border-white/8 bg-[#020408] px-3 py-1 text-xs text-[#c8d1de]">
                            {topic}
                          </span>
                        ))}
                      </div>
                      <div className="mt-5 flex flex-wrap gap-4">
                        <Link href={`/research/${post.id}`} className="text-sm font-semibold text-[#00e5ff] hover:text-white">
                          Read brief {'->'}
                        </Link>
                        <a href={post.sourceUrl} target="_blank" rel="noreferrer" className="text-sm font-semibold text-white hover:text-[#b7f4ff]">
                          Source {'->'}
                        </a>
                        <Link href="/resources" className="text-sm font-semibold text-white hover:text-[#b7f4ff]">
                          Resource route {'->'}
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>

      <section className="pb-20">
        <div className="container-shell">
          <div className="signal-panel p-8 text-center md:p-11">
            <p className="eyebrow border-white/10 bg-white/5 text-white">Source correction path</p>
            <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-bold text-white md:text-4xl">Need more context?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-[#8e98a8]">
              Share a source, correction, or terminology route so the site can stay accurate and clearly framed.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
              <Link href="/contact?requestType=research" className="btn-primary w-full sm:w-auto">
                Submit a Source
              </Link>
              <Link href="/glossary" className="btn-secondary w-full sm:w-auto">
                Read the glossary
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
