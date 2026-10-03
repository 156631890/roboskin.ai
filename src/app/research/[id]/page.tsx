import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ArticleBody from '@/components/ArticleBody';
import EditorialReview from '@/components/EditorialReview';
import JsonLd from '@/components/JsonLd';
import ResearchResourceActions from '@/components/ResearchResourceActions';
import { site } from '@/content/site';
import { blogPosts, getBlogPostById } from '@/lib/blog-data';
import {
  buildArticleJsonLd,
  buildGraphJsonLd,
  buildResearchArticleBreadcrumbJsonLd,
  buildResearchArticlePageJsonLd,
  canonicalUrl,
} from '@/lib/seo';
import { getResearchTopicLinks } from '@/lib/topic-graph';
import { tactileDatasetEntries } from '@/lib/tactile-datasets';

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
    authors: [{ name: post.author, url: canonicalUrl(site.editorial.path) }],
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
      authors: [canonicalUrl(site.editorial.path)],
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
  const topicLinks = getResearchTopicLinks(post);
  const relatedDatasets = tactileDatasetEntries.filter((entry) => entry.researchUrl === `/research/${post.id}` || entry.paperUrl === post.sourceUrl);

  return (
    <>
      <JsonLd
        data={buildGraphJsonLd([
          buildResearchArticlePageJsonLd(post),
          buildResearchArticleBreadcrumbJsonLd(post),
          buildArticleJsonLd(post),
        ])}
      />
      <article className="article-page research-article">
        <div className="container-shell">
          <Link href="/research" className="article-backlink">
            {'<-'} Back to research
          </Link>

          <header className="article-masthead">
            <p className="article-meta">
              {post.category}
            </p>
            <h1>{post.title}</h1>
            <p className="article-deck">{post.excerpt}</p>
            <div className="news-byline">
              <Link href={site.editorial.path} rel="author">By {post.author}</Link>
              <span>Published <time dateTime={post.date}>{post.date}</time></span>
              {post.updated !== post.date && <span>Updated <time dateTime={post.updated}>{post.updated}</time></span>}
              <span>{post.readTime}</span>
            </div>
            <div className="article-topics">
              {post.technicalFocus.map((topic) => <span key={topic}>{topic}</span>)}
            </div>
            <nav aria-label="Research topic path" className="mt-6 flex flex-wrap items-center gap-2 text-xs">
              <span className="font-mono uppercase tracking-[0.12em] text-[#8e98a8]">Research topic path</span>
              {topicLinks.map((link, index) => (
                <span key={link.href} className="flex items-center gap-2">
                  <span aria-hidden="true" className="text-[#8e98a8]">{index === 0 ? '/' : '→'}</span>
                  <Link href={link.href} className="font-semibold text-[#ffd5c5] hover:text-white">{link.label}</Link>
                </span>
              ))}
            </nav>
          </header>

          <figure className="article-cover">
            <div className="research-cover-image">
            <Image
              src={post.image}
              alt={`Illustration for ${post.title}`}
              fill
              priority
              sizes="(min-width: 1280px) 1120px, 100vw"
              className="object-cover"
            />
            </div>
            <figcaption>RoboSkin.ai explanatory illustration; not a photograph or measurement from the cited experiment.</figcaption>
          </figure>

          <div className="article-grid">
            <div className="article-reading-surface">
              <ArticleBody content={post.content} />
              {relatedDatasets.length > 0 && <section className="mt-8 border-t border-white/10 pt-6" aria-labelledby="article-dataset-evidence">
                <h2 id="article-dataset-evidence">Check the data behind this research</h2>
                <p>Compare the reported collection with the publicly listed files, dataset license, split documentation and dated access evidence.</p>
                <ul>{relatedDatasets.map((entry) => <li key={entry.id}><Link href={`/datasets#dataset-${entry.id}`}>{entry.name}</Link></li>)}</ul>
                <p><Link href="/datasets#availability-analysis">Read the directory’s public availability and reproduction analysis</Link>.</p>
              </section>}
            </div>

            <aside className="article-rail">
              <EditorialReview author={post.author} />
              <div className="article-rail-block">
                <p>Source</p>
                <a href={post.sourceUrl} target="_blank" rel="noreferrer">
                  {post.sourceTitle}
                </a>
              </div>
              <div className="article-rail-block">
                <p>Next step</p>
                <Link href="/contact?requestType=research">
                  Send a research inquiry {'->'}
                </Link>
                <Link href="/resources">
                  Explore research resources {'->'}
                </Link>
              </div>
            </aside>
          </div>

          <section className="article-related" aria-labelledby="related-research-heading">
            <p className="eyebrow">Continue the topic</p>
            <h2 id="related-research-heading" className="mt-4 text-3xl font-bold text-white">Related tactile research</h2>
            <div>
              {relatedPosts.map((related) => (
                <Link key={related.id} href={`/research/${related.id}`} className="article-related-card">
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
      <div className="container-shell pb-12"><ResearchResourceActions /></div>
    </>
  );
}
