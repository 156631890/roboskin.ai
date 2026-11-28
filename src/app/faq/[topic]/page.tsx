import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ArticleContents from '@/components/ArticleContents';
import JsonLd from '@/components/JsonLd';
import { site } from '@/content/site';
import { topicFaqGuides, topicFaqPath, topicFaqSources, topicFaqUpdated, topicFaqs } from '@/content/topic-qa/index';
import { buildBreadcrumbJsonLd, buildGraphJsonLd, buildPageJsonLd, buildPageMetadata } from '@/lib/seo';

type Props = { params: Promise<{ topic: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return topicFaqs.map(({ slug }) => ({ topic: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { topic } = await params;
  if (!topicFaqs.some(({ slug }) => slug === topic)) notFound();
  return buildPageMetadata(topicFaqPath(topic));
}

export default async function TopicFaqPage({ params }: Props) {
  const { topic } = await params;
  const page = topicFaqs.find(({ slug }) => slug === topic);
  if (!page) notFound();
  const path = topicFaqPath(page.slug);

  return (
    <article className="container-shell max-w-5xl pb-16 pt-12 md:pb-24 md:pt-16">
      <JsonLd data={buildGraphJsonLd([buildPageJsonLd(path), buildBreadcrumbJsonLd(path)])} />
      <header>
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-soft">
          <Link href="/" className="hover:text-white">Home</Link>
          <span aria-hidden="true">/</span>
          <Link href="/faq" className="text-accent underline underline-offset-4">Robot skin and tactile sensing FAQ</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{page.label}</span>
        </nav>
        <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-tight text-white md:text-5xl">{page.title}</h1>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-soft">{page.description}</p>
        <p className="mt-4 text-sm text-soft">
          <Link href={site.editorial.path} className="text-accent underline underline-offset-4">{site.editorial.name}</Link>
          {' · Updated '}<time dateTime={topicFaqUpdated}>{topicFaqUpdated}</time>
        </p>
      </header>

      <ArticleContents sections={page.questions.map(({ id, question }) => ({ id, heading: question }))} />
      <section aria-labelledby="answers-heading" className="mt-10">
        <h2 id="answers-heading" className="text-2xl font-semibold text-white">{page.questions.length} questions and answers</h2>
        <div className="mt-4 divide-y divide-white/10 border-y border-white/10">
          {page.questions.map((item) => {
            const guide = topicFaqGuides[item.guide];
            return (
              <section key={item.id} id={item.id} aria-labelledby={`${item.id}-question`} className="scroll-mt-28 py-7">
                <h3 id={`${item.id}-question`} className="text-xl font-semibold leading-snug text-white md:text-2xl">
                  <a href={`#${item.id}`} className="underline-offset-4 hover:underline">{item.question}</a>
                </h3>
                <p className="mt-2 text-sm text-soft">{item.role}</p>
                <div className="mt-3 max-w-[76ch] space-y-3 text-base leading-relaxed text-soft" data-answer>
                  {item.answer.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
                <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm" aria-label="Guide and primary sources">
                  <li><Link href={guide.href} className="font-semibold text-accent underline underline-offset-4">{guide.label}</Link></li>
                  {item.sources.map((key) => {
                    const source = topicFaqSources[key];
                    return <li key={key}><a href={source.href} className="text-soft underline underline-offset-4 hover:text-white">{source.label}</a></li>;
                  })}
                </ul>
              </section>
            );
          })}
        </div>
      </section>

      <nav aria-label="Related question guides" className="mt-10 flex flex-wrap gap-x-5 gap-y-3 text-sm">
        <Link href="/faq#topic-question-guides" className="font-semibold text-accent underline underline-offset-4">All question guides</Link>
        <Link href="/contact?requestType=research" className="text-soft underline underline-offset-4">Submit a research source or correction</Link>
      </nav>
    </article>
  );
}
