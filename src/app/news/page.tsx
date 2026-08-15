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

      <section className="pb-16 md:pb-24">
        <div className="container-shell news-index">
          {newsItems.map((item, index) => (
            <article key={item.id} className="news-index-item">
              <p className="news-index-number">{String(index + 1).padStart(2, '0')}</p>
              <div className="news-index-meta">
                <strong>{item.category}</strong>
                <span>Updated {item.updated}</span>
                <span>{item.readTime}</span>
              </div>
              <div className="news-index-body">
                <h2>{item.title}</h2>
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
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
