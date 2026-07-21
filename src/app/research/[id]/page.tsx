import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ArticleBody from '@/components/ArticleBody';
import JsonLd from '@/components/JsonLd';
import { blogPosts, getBlogPostById } from '@/lib/blog-data';
import {
  buildArticleJsonLd,
  buildGraphJsonLd,
  buildResearchArticleBreadcrumbJsonLd,
  buildResearchArticlePageJsonLd,
  canonicalUrl,
} from '@/lib/seo';

type ResearchArticlePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    id: post.id,
  }));
}

export async function generateMetadata({ params }: ResearchArticlePageProps): Promise<Metadata> {
  const { id } = await params;
  const post = getBlogPostById(id);

  if (!post) {
    return {
      title: 'Research brief not found',
    };
  }

  const url = canonicalUrl(`/research/${post.id}`);

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

export default async function ResearchArticlePage({ params }: ResearchArticlePageProps) {
  const { id } = await params;
  const post = getBlogPostById(id);

  if (!post) {
    notFound();
  }

  const relatedPosts = blogPosts
    .filter((candidate) => candidate.id !== post.id)
    .map((candidate) => ({
      post: candidate,
      score: candidate.technicalFocus.filter((topic) => post.technicalFocus.includes(topic)).length
        + (candidate.category === post.category ? 2 : 0),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((item) => item.post);

  return (
    <>
      <JsonLd
        data={buildGraphJsonLd([
          buildResearchArticlePageJsonLd(post),
          buildResearchArticleBreadcrumbJsonLd(post),
          buildArticleJsonLd(post),
        ])}
      />
      <article className="py-20 md:py-24">
        <div className="container-shell">
          <Link href="/research" className="text-accent text-sm font-semibold hover:text-white">
            {'<-'} Back to research
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

          <figure className="relative mt-8 aspect-video overflow-hidden rounded-md border border-white/10 bg-[#020408]">
            <Image
              src={post.image}
              alt={`Illustration for ${post.title}`}
              fill
              priority
              sizes="(min-width: 1280px) 1120px, 100vw"
              className="object-cover"
            />
          </figure>

          <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
            <div className="glass-card p-7 md:p-9">
              <ArticleBody content={post.content} />
            </div>

            <aside className="space-y-4">
              <div className="glass-card p-5">
                <p className="text-soft text-xs uppercase tracking-[0.14em]">Editorial review</p>
                <p className="mt-3 text-sm leading-relaxed text-soft">
                  Written by {post.author}. This note summarizes public sources and adds RoboSkin.ai analysis for research orientation; it does not imply product availability, certification, or measured performance by RoboSkin.ai.
                </p>
              </div>
              <div className="glass-card p-5">
                <p className="text-soft text-xs uppercase tracking-[0.14em]">Source</p>
                <a href={post.sourceUrl} target="_blank" rel="noreferrer" className="mt-3 block text-sm font-semibold leading-relaxed text-accent hover:text-white">
                  {post.sourceTitle}
                </a>
              </div>
              <div className="glass-card p-5">
                <p className="text-soft text-xs uppercase tracking-[0.14em]">Next step</p>
                <Link href="/contact?requestType=research" className="mt-3 block text-sm font-semibold text-accent hover:text-white">
                  Send a research inquiry {'->'}
                </Link>
                <Link href="/resources" className="mt-3 block text-sm font-semibold text-white hover:text-[#d7e7ff]">
                  Explore research resources {'->'}
                </Link>
              </div>
            </aside>
          </div>

          <section className="mt-14" aria-labelledby="related-research-heading">
            <p className="eyebrow">Continue the topic</p>
            <h2 id="related-research-heading" className="mt-4 text-3xl font-bold text-white">Related tactile research</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {relatedPosts.map((related) => (
                <Link key={related.id} href={`/research/${related.id}`} className="glass-card overflow-hidden transition-colors hover:bg-white/[0.04]">
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
