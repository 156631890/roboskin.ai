import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import RssFeedAddress from '@/components/RssFeedAddress';
import { getRssItems } from '@/lib/feed';
import { buildBreadcrumbJsonLd, buildGraphJsonLd, buildPageJsonLd, buildPageMetadata, canonicalUrl } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata('/rss');

export default function RssPage() {
  const latestItems = getRssItems().slice(0, 6);

  return (
    <>
      <JsonLd data={buildGraphJsonLd([buildPageJsonLd('/rss'), buildBreadcrumbJsonLd('/rss')])} />
      <section className="py-12 md:py-20">
        <div className="container-shell grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
          <div className="min-w-0">
            <span className="eyebrow">Research / RSS</span>
            <h1 className="mt-5 max-w-[16ch] text-4xl font-semibold leading-tight md:text-6xl">Follow research updates</h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-soft">
              Get source-backed robot skin, tactile AI, and electronic skin news in your RSS reader.
              Each update links to the full article on RoboSkin.ai.
            </p>
            <RssFeedAddress feedUrl={canonicalUrl('/feed.xml')} />
            <a href="/feed.xml" type="application/rss+xml" className="btn-tertiary mt-4">
              View raw RSS (XML) <span aria-hidden="true" className="ml-2">↗</span>
            </a>
          </div>
          <div className="border-t border-[var(--panel-border)] pt-6 lg:mt-10">
            <h2 className="text-2xl font-semibold">Read updates your way</h2>
            <p className="mt-4 text-sm leading-relaxed text-soft">
              RSS brings new articles into a reading app, so you can follow updates without checking the website each time.
            </p>
            <ol className="mt-6 list-decimal space-y-4 pl-5 text-sm leading-relaxed text-soft marker:text-[var(--secondary)]">
              <li>Open an RSS reader, such as Feedly or Inoreader.</li>
              <li>Choose the option to add a feed or follow a website, then paste the feed address.</li>
              <li>Confirm the subscription in your reader. New articles will appear as the reader checks for updates.</li>
            </ol>
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-24" aria-label="Latest feed updates">
        <div className="container-shell">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <p className="section-label">Latest feed updates</p>
            <Link href="/research" className="text-sm underline underline-offset-4">Browse research</Link>
          </div>
          <div className="news-index">
            {latestItems.map((item, index) => (
              <article key={item.path} className="news-index-item">
                <p className="news-index-number">{String(index + 1).padStart(2, '0')}</p>
                <div className="news-index-meta">
                  <strong>{item.path.startsWith('/news/') ? 'News' : 'Research'}</strong>
                  <span>Updated <time dateTime={item.updated}>{item.updated}</time></span>
                </div>
                <div className="news-index-body">
                  <h2><Link href={item.path}>{item.title}</Link></h2>
                  <p>{item.excerpt}</p>
                </div>
                <Link href={item.path} className="news-index-link" aria-label={`Read ${item.title}`}>
                  <span>Read article</span>
                  <span aria-hidden="true">↗</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
