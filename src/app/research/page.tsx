import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import { getBlogSummaries } from '@/lib/blog-data';
import { buildBreadcrumbJsonLd, buildGraphJsonLd, buildPageJsonLd, buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata('/research');

export default function ResearchPage() {
  const summaries = getBlogSummaries();
  const categories = summaries.reduce<Record<string, typeof summaries>>((acc, item) => {
    (acc[item.category] ??= []).push(item);
    return acc;
  }, {});
  const categoryEntries = Object.entries(categories).sort(([a], [b]) => a.localeCompare(b));

  return (
    <>
      <JsonLd data={buildGraphJsonLd([buildPageJsonLd('/research'), buildBreadcrumbJsonLd('/research')])} />
      <section className="py-20 md:py-24">
        <div className="container-shell">
          <span className="eyebrow">Research</span>
          <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
            <h1 className="text-4xl font-bold text-white md:text-6xl">Research notes</h1>
            <Link href="/resources" className="text-accent text-sm font-semibold hover:text-white">
              Explore research resources {'->'}
            </Link>
          </div>
          <p className="mt-5 max-w-3xl text-soft">
            These public notes summarize current robot skin and tactile sensing directions using conservative, source-backed language. Application-specific
            performance, durability, and integration claims should be verified through source-backed, application-specific evidence.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-shell space-y-10">
          {categoryEntries.map(([category, items]) => (
            <div key={category}>
              <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
                <h2 className="text-2xl font-semibold text-white">{category}</h2>
                <Link href="/contact?requestType=research" className="text-accent text-sm font-semibold hover:text-white">
                  Send a research inquiry {'->'}
                </Link>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {items.map((post) => (
                  <article key={post.id} className="glass-card p-6">
                    <p className="text-soft text-xs uppercase tracking-[0.14em]">{post.date}</p>
                    <h3 className="mt-3 text-xl font-semibold text-white">{post.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-soft">{post.excerpt}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {post.technicalFocus.slice(0, 4).map((topic) => (
                        <span key={topic} className="rounded-full border border-white/8 bg-[#0d1016] px-3 py-1 text-xs text-[#d8dce4]">
                          {topic}
                        </span>
                      ))}
                    </div>
                    <div className="mt-5 flex flex-wrap gap-3">
                      <Link href={`/research/${post.id}`} className="text-accent text-sm font-semibold hover:text-white">
                        Read brief {'->'}
                      </Link>
                      <a href={post.sourceUrl} target="_blank" rel="noreferrer" className="text-sm font-semibold text-white hover:text-[#d7e7ff]">
                        Source {'->'}
                      </a>
                      <Link href="/resources" className="text-sm font-semibold text-white hover:text-[#d7e7ff]">
                        View resources {'->'}
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="pb-20">
        <div className="container-shell">
          <div className="rounded-[24px] border border-white/8 bg-[#0b0d12] p-8 text-center md:p-11">
            <h2 className="text-3xl font-bold text-white md:text-4xl">Need more context?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-soft">
              Share a source or correction so the site can stay accurate and clearly framed.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link
                href="/contact?requestType=research"
                className="rounded-xl bg-[var(--primary)] px-7 py-3 text-sm font-bold text-white shadow-[0_12px_26px_rgba(98,168,255,0.22)]"
              >
                Send a research inquiry
              </Link>
              <Link
                href="/glossary"
                className="rounded-xl border border-white/12 bg-white/5 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/8"
              >
                Read the glossary
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
