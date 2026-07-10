import type { Metadata } from 'next';
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
    title: post.title,
    description: post.excerpt,
    authors: [{ name: post.author }],
    category: post.category,
    keywords: post.technicalFocus,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
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
      title: post.title,
      description: post.excerpt,
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

  return (
    <>
      <JsonLd
        data={buildGraphJsonLd([
          buildNewsArticlePageJsonLd(post),
          buildNewsArticleBreadcrumbJsonLd(post),
          buildNewsArticleJsonLd(post),
        ])}
      />
      <article className="py-20 md:py-24">
        <div className="container-shell">
          <Link href="/news" className="text-accent text-sm font-semibold hover:text-white">
            {'<-'} Back to news
          </Link>

          <div className="mt-8 max-w-4xl">
            <p className="text-soft text-xs uppercase tracking-[0.14em]">
              {post.category} | Published {post.date} | Updated {post.updated}
            </p>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-white md:text-6xl">{post.title}</h1>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-soft">{post.excerpt}</p>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {post.technicalFocus.map((topic) => (
              <span key={topic} className="rounded-full border border-white/8 bg-[#0d1016] px-3 py-1 text-xs text-[#d8dce4]">
                {topic}
              </span>
            ))}
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
            <div className="glass-card p-7 md:p-9">
              <ArticleBody content={post.content} />
            </div>

            <aside className="space-y-4">
              <div className="glass-card p-5">
                <p className="text-soft text-xs uppercase tracking-[0.14em]">Editorial review</p>
                <p className="mt-3 text-sm leading-relaxed text-soft">
                  Written by {post.author}. This brief summarizes public sources and adds RoboSkin.ai analysis for research orientation; it does not imply product availability, certification, affiliation, or measured performance by RoboSkin.ai.
                </p>
              </div>
              <div className="glass-card p-5">
                <p className="text-soft text-xs uppercase tracking-[0.14em]">Sources</p>
                <div className="mt-3 space-y-3">
                  {post.sources.map((source) => (
                    <a key={source.url} href={source.url} target="_blank" rel="noreferrer" className="block text-sm font-semibold leading-relaxed text-accent hover:text-white">
                      {source.title}
                    </a>
                  ))}
                </div>
              </div>
              <div className="glass-card p-5">
                <p className="text-soft text-xs uppercase tracking-[0.14em]">Next step</p>
                <Link href="/contact?requestType=research" className="mt-3 block text-sm font-semibold text-accent hover:text-white">
                  Send a research note {'->'}
                </Link>
                <Link href="/research" className="mt-3 block text-sm font-semibold text-white hover:text-[#d7e7ff]">
                  Explore research briefs {'->'}
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </article>
    </>
  );
}
