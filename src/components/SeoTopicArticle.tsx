import Image from 'next/image';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import PageHeroVisual from '@/components/PageHeroVisual';
import type { SeoTopicPage } from '@/content/seo-topic-pages';
import { pageVisuals, site } from '@/content/site';
import { blogPosts } from '@/lib/blog-data';
import { buildSeoTopicGraph } from '@/lib/seo-topic';

type SeoTopicArticleProps = {
  page: SeoTopicPage;
};

export default function SeoTopicArticle({ page }: SeoTopicArticleProps) {
  const visual = pageVisuals[page.visualKey];
  const paperBriefs = page.paperBriefIds
    ? blogPosts.filter((post) => page.paperBriefIds?.includes(post.id))
    : [];

  return (
    <>
      <JsonLd data={buildSeoTopicGraph(page)} />
      <article>
        <section className="py-14 md:py-20">
          <div className="container-shell grid gap-10 lg:grid-cols-[0.74fr_1.06fr] lg:items-center">
            <div>
              <p className="section-label">{page.kicker}</p>
              <h1 className="mt-5 text-4xl font-bold leading-tight text-white md:text-6xl">{page.h1}</h1>
              <p className="mt-5 max-w-3xl text-base leading-relaxed text-[#c8d1de]">{page.description}</p>
              {page.schemaType === 'TechArticle' ? (
                <p className="mt-4 text-sm text-[#8e98a8]">
                  Published {page.updated} | Updated {page.updated} by {site.editorial.name}
                </p>
              ) : null}
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link href="#quick-answer" className="btn-primary w-full sm:w-auto">
                  Read the short answer
                </Link>
                <Link href="/research" className="btn-secondary w-full sm:w-auto">
                  Browse research
                </Link>
                <Link href="/contact?requestType=research" className="btn-tertiary w-full sm:w-auto">
                  Submit a source
                </Link>
              </div>
            </div>

            <div className="grid gap-4">
              <PageHeroVisual visual={visual} priority />
              <dl className="grid gap-3 sm:grid-cols-3">
                <div className="signal-panel p-4">
                  <dt className="font-mono text-lg font-semibold text-white">{page.sections.length}</dt>
                  <dd className="mt-1 text-xs uppercase tracking-[0.12em] text-[#8e98a8]">sections</dd>
                </div>
                <div className="signal-panel p-4">
                  <dt className="font-mono text-lg font-semibold text-white">{page.faqs.length}</dt>
                  <dd className="mt-1 text-xs uppercase tracking-[0.12em] text-[#8e98a8]">questions</dd>
                </div>
                <div className="signal-panel p-4">
                  <dt className="font-mono text-lg font-semibold text-white">{page.relatedLinks.length}</dt>
                  <dd className="mt-1 text-xs uppercase tracking-[0.12em] text-[#8e98a8]">next routes</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        <section id="quick-answer" className="deferred-section pb-14 md:pb-20">
          <div className="container-shell grid gap-6 lg:grid-cols-[0.34fr_1fr]">
            <div>
              <p className="eyebrow">Short answer</p>
              <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">What you need to know</h2>
            </div>
            <div className="signal-panel p-6 md:p-8">
              <ol className="space-y-4">
                {page.quickAnswer.map((answer, index) => (
                  <li key={answer} className="grid gap-4 border-b border-white/8 pb-4 last:border-b-0 last:pb-0 md:grid-cols-[44px_1fr]">
                    <span className="flex h-9 w-9 items-center justify-center rounded-md border border-[#00e5ff]/20 bg-[#00e5ff]/8 font-mono text-sm font-bold text-[#dff8ff]">
                      {index + 1}
                    </span>
                    <p className="text-base leading-relaxed text-[#c8d1de]">{answer}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="deferred-section pb-14 md:pb-20">
          <div className="container-shell grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="space-y-5">
              {page.sections.map((section, index) => (
                <section key={section.heading} className="glass-card p-6 md:p-8">
                  <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#00e5ff]">Topic {String(index + 1).padStart(2, '0')}</p>
                  <h2 className="mt-3 text-2xl font-semibold text-white md:text-3xl">{section.heading}</h2>
                  <div className="mt-4 space-y-4">
                    {section.body.map((paragraph) => (
                      <p key={paragraph} className="text-sm leading-relaxed text-[#c8d1de]">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  {section.bullets ? (
                    <ul className="mt-5 grid gap-2">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="rounded-md border border-white/8 bg-[#020408] px-4 py-3 text-sm leading-relaxed text-[#d8dce4]">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  {section.table ? (
                    <div className="mt-6 overflow-x-auto rounded-md border border-white/10 bg-[#020408]">
                      <table className="w-full min-w-[720px] border-collapse text-left text-sm">
                        <thead className="border-b border-white/10 bg-white/[0.03]">
                          <tr>
                            {section.table.headers.map((header) => (
                              <th key={header} scope="col" className="px-4 py-3 font-mono text-xs font-semibold uppercase tracking-[0.1em] text-[#b8eefe]">
                                {header}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {section.table.rows.map((row, rowIndex) => (
                            <tr key={`${section.heading}-${row[0]}`} className="border-b border-white/8 last:border-b-0">
                              {row.map((cell, cellIndex) =>
                                cellIndex === 0 ? (
                                  <th key={`${rowIndex}-${cellIndex}`} scope="row" className="px-4 py-4 align-top font-semibold leading-relaxed text-white">
                                    {cell}
                                  </th>
                                ) : (
                                  <td key={`${rowIndex}-${cellIndex}`} className="px-4 py-4 align-top leading-relaxed text-[#c8d1de]">
                                    {cell}
                                  </td>
                                ),
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : null}
                </section>
              ))}
            </div>

            <aside className="space-y-4">
              <div className="signal-panel p-5">
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#00e5ff]">Related routes</p>
                <div className="mt-4 space-y-3">
                  {page.relatedLinks.map((link) => (
                    <Link key={link.href} href={link.href} className="block rounded-md border border-white/8 bg-[#020408] p-4 transition-colors hover:bg-white/[0.04]">
                      <span className="block text-sm font-semibold text-white">{link.label}</span>
                      <span className="mt-1 block text-xs leading-relaxed text-[#8e98a8]">{link.description}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {page.sources?.length ? (
                <div className="signal-panel p-5">
                  <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#00e5ff]">Source paths</p>
                  <div className="mt-4 space-y-3">
                    {page.sources.map((source) => (
                      <a key={source.href} href={source.href} target="_blank" rel="noreferrer" className="block text-sm font-semibold leading-relaxed text-[#b8eefe] hover:text-white">
                        {source.label} {'->'}
                      </a>
                    ))}
                  </div>
                </div>
              ) : null}
            </aside>
          </div>
        </section>

        {paperBriefs.length ? (
          <section className="deferred-section pb-14 md:pb-20">
            <div className="container-shell">
              <div className="mb-5">
                <p className="eyebrow">Paper routes</p>
                <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">Start with source-backed RoboSkin briefs</h2>
              </div>
              <div className="signal-panel overflow-hidden p-0">
                {paperBriefs.map((post) => (
                  <Link key={post.id} href={`/research/${post.id}`} className="grid gap-5 border-b border-white/8 p-5 last:border-b-0 md:grid-cols-[176px_1fr] md:p-6">
                    <span className="relative block aspect-[16/10] overflow-hidden rounded-md border border-white/10 bg-[#020408]">
                      <Image src={post.image} alt="" fill sizes="176px" className="object-cover" />
                    </span>
                    <span>
                      <span className="block font-mono text-xs uppercase tracking-[0.12em] text-[#8e98a8]">{post.category} / {post.updated}</span>
                      <span className="mt-3 block text-xl font-semibold text-white">{post.title}</span>
                      <span className="mt-2 block text-sm leading-relaxed text-[#c8d1de]">{post.excerpt}</span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section className="deferred-section pb-14 md:pb-20">
          <div className="container-shell">
            <div className="mb-5">
              <p className="eyebrow">Common questions</p>
              <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">FAQ for this topic</h2>
            </div>
            <div className="signal-panel overflow-hidden p-0">
              {page.faqs.map((faq, index) => (
                <section key={faq.question} className="grid gap-5 border-b border-white/8 p-5 last:border-b-0 md:grid-cols-[80px_0.42fr_1fr] md:p-7">
                  <span className="font-mono text-sm font-semibold text-[#00c8ff]">{String(index + 1).padStart(2, '0')}</span>
                  <h3 className="text-xl font-semibold text-white">{faq.question}</h3>
                  <p className="text-sm leading-relaxed text-[#c8d1de]">{faq.answer}</p>
                </section>
              ))}
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
