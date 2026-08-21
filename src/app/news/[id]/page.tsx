import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ArticleBody from '@/components/ArticleBody';
import JsonLd from '@/components/JsonLd';
import { getNewsPostById, newsPosts } from '@/lib/news-data';
import {
  buildGraphJsonLd,
  buildNewsArticleBreadcrumbJsonLd,
  buildNewsArticleJsonLd,
  buildNewsArticlePageJsonLd,
  canonicalUrl,
} from '@/lib/seo';
import { getResearchTopicLinks } from '@/lib/topic-graph';

type NewsArticlePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return newsPosts.map((post) => ({
    id: post.id,
  }));
}

export async function generateMetadata({ params }: NewsArticlePageProps): Promise<Metadata> {
  const { id } = await params;
  const post = getNewsPostById(id);

  if (!post) {
    return {
      title: 'News brief not found',
    };
  }

  const url = canonicalUrl(`/news/${post.id}`);

  return {
    title: post.seoTitle ?? post.title,
    description: post.seoDescription ?? post.excerpt,
    authors: [{ name: post.author }],
    category: post.category,
    keywords: post.technicalFocus,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.seoTitle ?? post.title,
      description: post.seoDescription ?? post.excerpt,
      url,
      type: 'article',
      siteName: 'RoboSkin.ai',
      images: [post.image],
      publishedTime: post.date,
      modifiedTime: post.updated,
      authors: [post.author],
      section: post.category,
      tags: post.technicalFocus,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seoTitle ?? post.title,
      description: post.seoDescription ?? post.excerpt,
      images: [post.image],
    },
  };
}

export default async function NewsArticlePage({ params }: NewsArticlePageProps) {
  const { id } = await params;
  const post = getNewsPostById(id);

  if (!post) {
    notFound();
  }

  const topicLinks = getResearchTopicLinks(post);
  const topicHrefs = new Set(topicLinks.map((link) => link.href));
  const postFocus = new Set(post.technicalFocus.map((topic) => topic.toLowerCase()));
  const relatedPosts = newsPosts
    .filter((candidate) => candidate.id !== post.id)
    .map((candidate) => ({
      post: candidate,
      score: getResearchTopicLinks(candidate).filter((link) => topicHrefs.has(link.href)).length * 3
        + candidate.technicalFocus.filter((topic) => postFocus.has(topic.toLowerCase())).length
        + (candidate.category === post.category ? 2 : 0),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((item) => item.post);
  const hasTactileTopic = topicLinks.some((link) => [
    '/tactile-ai',
    '/datasets',
    '/benchmarks',
    '/sensors',
    '/robot-skin',
    '/tactile-foundation-models',
    '/humanoid-robot-skin',
    '/tactile-manipulation',
    '/visuo-tactile',
    '/physical-ai-touch',
  ].includes(link.href));
  const relatedNewsHeading = hasTactileTopic ? 'Related tactile robotics news' : 'Related robotics news';

  return (
    <>
      <JsonLd
        data={buildGraphJsonLd([
          buildNewsArticlePageJsonLd(post),
          buildNewsArticleBreadcrumbJsonLd(post),
          buildNewsArticleJsonLd(post),
        ])}
      />
      <article className="article-page">
        <div className="container-shell">
          <Link href="/news" className="article-backlink">
            {'<-'} Back to news
          </Link>

          <header className="article-masthead">
            <p className="article-meta">
              {post.category} | Published {post.date} | Updated {post.updated}
            </p>
            <h1>{post.title}</h1>
            <p className="article-deck">{post.excerpt}</p>
            <div className="article-topics">
              {post.technicalFocus.map((topic) => <span key={topic}>{topic}</span>)}
            </div>
            {topicLinks.length > 0 && (
              <nav aria-label="Related topic links" className="mt-6 flex flex-wrap items-center gap-2 text-xs">
                <span className="font-mono uppercase tracking-[0.12em] text-[#8e98a8]">Related topic links</span>
                {topicLinks.map((link, index) => (
                  <span key={link.href} className="flex items-center gap-2">
                    <span aria-hidden="true" className="text-[#8e98a8]">{index === 0 ? '/' : '→'}</span>
                    <Link href={link.href} className="font-semibold text-[#ffd5c5] hover:text-white">{link.label}</Link>
                  </span>
                ))}
              </nav>
            )}
          </header>

          <figure className="article-cover">
            <Image
              src={post.image}
              alt={`Illustration for ${post.title}`}
              fill
              priority
              sizes="(min-width: 1280px) 1120px, 100vw"
              className="object-cover"
            />
          </figure>

          <div className="article-grid">
            <div className="article-reading-surface">
              <ArticleBody content={post.content} />
            </div>

            <aside className="article-rail">
              <div className="article-rail-block">
                <p>Editorial review</p>
                <div>
                  Written by {post.author}. This brief summarizes public sources and adds RoboSkin.ai analysis for research orientation; it does not imply product availability, certification, affiliation, or measured performance by RoboSkin.ai.
                </div>
              </div>
              <div className="article-rail-block">
                <p>Sources</p>
                <div>
                  {post.sources.map((source) => (
                    <a key={source.url} href={source.url} target="_blank" rel="noreferrer" className="block text-sm font-semibold leading-relaxed text-accent hover:text-white">
                      {source.title}
                    </a>
                  ))}
                </div>
              </div>
              <div className="article-rail-block">
                <p>Next step</p>
                <Link href="/contact?requestType=research">
                  Send a research note {'->'}
                </Link>
                <Link href="/research">
                  Explore research briefs {'->'}
                </Link>
              </div>
            </aside>
          </div>

          <section className="article-related" aria-labelledby="related-news-heading">
            <p className="eyebrow">Continue the topic</p>
            <h2 id="related-news-heading" className="mt-4 text-3xl font-bold text-white">{relatedNewsHeading}</h2>
            <div>
              {relatedPosts.map((related) => (
                <Link key={related.id} href={`/news/${related.id}`} className="article-related-card">
                  <span className="relative block aspect-video border-b border-white/8 bg-[#020408]">
                    <Image src={related.image} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
                  </span>
                  <span className="block p-5">
                    <span className="font-mono text-xs uppercase tracking-[0.12em] text-[#8e98a8]">{related.category}</span>
                    <span className="mt-2 block font-semibold leading-snug text-white">{related.title}</span>
                  </span>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </article>
    </>
  );
}
