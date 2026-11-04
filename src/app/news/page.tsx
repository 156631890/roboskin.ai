import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import { getNewsSummaries } from '@/lib/news-data';
import { buildBreadcrumbJsonLd, buildGraphJsonLd, buildPageJsonLd, buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata('/news');

export default function NewsPage() {
  const newsItems = getNewsSummaries();

  return (
    <>
      <JsonLd data={buildGraphJsonLd([buildPageJsonLd('/news'), buildBreadcrumbJsonLd('/news')])} />
      <section className="inner-masthead">
        <div className="container-shell inner-masthead-grid">
          <div>
            <span className="eyebrow">News / Research signal</span>
            <h1>Robot Skin and Tactile AI News</h1>
          </div>
          <div className="inner-masthead-note">
            <strong>{String(newsItems.length).padStart(2, '0')}</strong>
            <span>source-backed briefs</span>
          </div>
          <p className="inner-masthead-copy">
            Follow source-backed developments in robot skin, tactile AI, electronic skin, tactile sensors, and Physical AI. Each brief separates reported findings from RoboSkin.ai analysis.
          </p>
          <Link href="/contact?requestType=research" className="inner-masthead-link">
            Submit a research source <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>

      <section id="reading-dates-and-evidence" className="pb-12 pt-8 scroll-mt-28">
        <div className="container-shell">
          <h2 className="text-2xl font-semibold text-white md:text-3xl">{"Follow a development without losing its evidence date"}</h2>
          <p className="mt-4 max-w-4xl text-sm leading-relaxed text-soft">{"A publication date tells you when a brief appeared here. An updated date tells you that its content changed. Neither establishes that a paper, product or dataset first became available on that day. Open the brief for the source date and the substance of the revision."}</p>
          <div className="mt-6 overflow-x-auto rounded-md border border-white/10" tabIndex={0} role="region" aria-label="Follow a development without losing its evidence date">
            <table className="w-full min-w-[720px] border-collapse text-left text-sm"><thead><tr><th scope="col" className="border-b border-white/10 px-4 py-3 text-white">{"Signal in a report"}</th><th scope="col" className="border-b border-white/10 px-4 py-3 text-white">{"Next question"}</th><th scope="col" className="border-b border-white/10 px-4 py-3 text-white">{"Useful route"}</th></tr></thead><tbody>
              <tr><th scope="row" className="border-b border-white/10 px-4 py-4 align-top font-semibold text-white">{"A new reported result"}</th><td className="border-b border-white/10 px-4 py-4 align-top leading-relaxed text-soft">{"What was measured, under which task and denominator, and was it simulated or physical?"}</td><td className="border-b border-white/10 px-4 py-4 align-top"><Link href="/research" className="text-accent underline underline-offset-4">{"Deeper paper reviews"}</Link></td></tr>
              <tr><th scope="row" className="border-b border-white/10 px-4 py-4 align-top font-semibold text-white">{"A code or dataset announcement"}</th><td className="border-b border-white/10 px-4 py-4 align-top leading-relaxed text-soft">{"Is there an accessible artifact, a usable manifest and a license for that artifact? A promised release is not verified access."}</td><td className="border-b border-white/10 px-4 py-4 align-top"><Link href="/datasets" className="text-accent underline underline-offset-4">{"Dataset evidence and access"}</Link></td></tr>
              <tr><th scope="row" className="border-b border-white/10 px-4 py-4 align-top font-semibold text-white">{"A sensor or integration announcement"}</th><td className="border-b border-white/10 px-4 py-4 align-top leading-relaxed text-soft">{"Which exact model and configuration are described, and what calibration or runtime evidence remains missing?"}</td><td className="border-b border-white/10 px-4 py-4 align-top"><Link href="/sensors" className="text-accent underline underline-offset-4">{"Source-based sensor records"}</Link></td></tr>
            </tbody></table>
          </div>
          <p className="mt-5 max-w-4xl text-sm leading-relaxed text-soft">{"Source-backed reporting is not independent hardware testing. We label author and vendor claims, keep unresolved access questions visible and link to longer-lived guides where the engineering question needs more context. Use the correction route for a changed source or an incorrect interpretation, not the date label alone."}</p>
          <div className="mt-5 flex flex-wrap gap-4 text-sm"><Link href="/editorial-policy" className="text-accent underline underline-offset-4">{"Publication and correction policy"}</Link><Link href="/contact?requestType=correction" className="text-accent underline underline-offset-4">{"Submit a correction"}</Link><Link href="/resources" className="text-accent underline underline-offset-4">{"Choose a practical learning route"}</Link></div>
          <p className="mt-5 text-xs text-soft">Reading guidance updated <time dateTime="2026-11-04">November 4, 2026</time>.</p>
        </div>
      </section>

      <section className="pb-16 md:pb-24">
        <div className="container-shell news-index">
          {newsItems.map((item, index) => (
            <article key={item.id} className="news-index-item">
              <p className="news-index-number">{String(index + 1).padStart(2, '0')}</p>
              <div className="news-index-meta">
                <strong>{item.category}</strong>
                <span>Published <time dateTime={item.date}>{item.date}</time></span>
                {item.updated !== item.date && <span>Updated <time dateTime={item.updated}>{item.updated}</time></span>}
                <span>{item.readTime}</span>
              </div>
              <div className="news-index-body">
                <h2><Link href={`/news/${item.id}`}>{item.title}</Link></h2>
                <p>{item.excerpt}</p>
                <div>
                  {item.technicalFocus.slice(0, 4).map((topic) => <span key={topic}>{topic}</span>)}
                </div>
              </div>
              <Link href={`/news/${item.id}`} className="news-index-link" aria-label={`Read ${item.title}`}>
                <span>Read news brief</span>
                <span aria-hidden="true">↗</span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="pb-20">
        <div className="container-shell">
          <div className="editorial-cta">
            <p className="section-label">Correction and contribution desk</p>
            <h2>Need current site context?</h2>
            <p>
              Send a correction, partnership, or research inquiry if you need context beyond the public pages.
            </p>
            <div>
              <Link href="/contact?requestType=research" className="btn-primary">
                Send a research note
              </Link>
              <Link href="/research" className="btn-secondary">
                Explore research resources
              </Link>
              <Link href="/rss" className="btn-secondary">Follow via RSS</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
