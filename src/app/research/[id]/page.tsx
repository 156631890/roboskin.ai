import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import JsonLd from '@/components/JsonLd';
import { blogPosts, getBlogPostById } from '@/lib/blog-data';
import { buildArticleJsonLd, buildGraphJsonLd, canonicalUrl } from '@/lib/seo';

type ResearchArticlePageProps = {
  params: {
    id: string;
  };
};

export const dynamicParams = false;

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    id: post.id,
  }));
}

export function generateMetadata({ params }: ResearchArticlePageProps): Metadata {
  const post = getBlogPostById(params.id);

  if (!post) {
    return {
      title: 'Research brief not found',
    };
  }

  const url = canonicalUrl(`/research/${post.id}`);

  return {
    title: post.title,
    description: post.excerpt,
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
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const linkPattern = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = linkPattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    nodes.push(
      <a key={`${match[2]}-${match.index}`} href={match[2]} target="_blank" rel="noreferrer" className="text-accent underline decoration-white/30 underline-offset-4 hover:text-white">
        {match[1]}
      </a>,
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

function ArticleBody({ content }: { content: string }) {
  const lines = content.split('\n');
  const elements: ReactNode[] = [];
  let listItems: string[] = [];

  const flushList = () => {
    if (!listItems.length) {
      return;
    }

    elements.push(
      <ul key={`list-${elements.length}`} className="mt-4 space-y-2 text-sm leading-relaxed text-[#d8dce4]">
        {listItems.map((item) => (
          <li key={item} className="rounded-lg border border-white/8 bg-[#0d1016] px-4 py-2.5">
            {renderInline(item)}
          </li>
        ))}
      </ul>,
    );
    listItems = [];
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    if (!trimmed) {
      flushList();
      return;
    }

    if (trimmed.startsWith('- ')) {
      listItems.push(trimmed.slice(2));
      return;
    }

    flushList();

    if (trimmed.startsWith('# ')) {
      return;
    }

    if (trimmed.startsWith('## ')) {
      elements.push(
        <h2 key={`h2-${index}`} className="mt-10 text-2xl font-semibold tracking-tight text-white">
          {trimmed.slice(3)}
        </h2>,
      );
      return;
    }

    if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
      elements.push(
        <p key={`strong-${index}`} className="mt-4 text-sm font-semibold uppercase tracking-[0.14em] text-[#9aa3b2]">
          {trimmed.replaceAll('**', '')}
        </p>,
      );
      return;
    }

    elements.push(
      <p key={`p-${index}`} className="mt-4 text-sm leading-relaxed text-soft">
        {renderInline(trimmed)}
      </p>,
    );
  });

  flushList();

  return <div className="mt-8">{elements}</div>;
}

export default function ResearchArticlePage({ params }: ResearchArticlePageProps) {
  const post = getBlogPostById(params.id);

  if (!post) {
    notFound();
  }

  return (
    <>
      <JsonLd data={buildGraphJsonLd([buildArticleJsonLd(post)])} />
      <article className="py-20 md:py-24">
        <div className="container-shell">
          <Link href="/research" className="text-accent text-sm font-semibold hover:text-white">
            {'<-'} Back to research
          </Link>

          <div className="mt-8 max-w-4xl">
            <p className="text-soft text-xs uppercase tracking-[0.14em]">{post.category} | Updated {post.updated}</p>
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
                <p className="text-soft text-xs uppercase tracking-[0.14em]">Source</p>
                <a href={post.sourceUrl} target="_blank" rel="noreferrer" className="mt-3 block text-sm font-semibold leading-relaxed text-accent hover:text-white">
                  {post.sourceTitle}
                </a>
              </div>
              <div className="glass-card p-5">
                <p className="text-soft text-xs uppercase tracking-[0.14em]">Next step</p>
                <Link href="/contact?requestType=integration" className="mt-3 block text-sm font-semibold text-accent hover:text-white">
                  Request integration review {'->'}
                </Link>
                <Link href="/downloads" className="mt-3 block text-sm font-semibold text-white hover:text-[#d7e7ff]">
                  Request technical material {'->'}
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </article>
    </>
  );
}
