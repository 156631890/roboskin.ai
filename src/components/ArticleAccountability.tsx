import Link from 'next/link';
import { site } from '@/content/site';

type ArticleAccountabilityProps = {
  contentType: 'research' | 'news';
  sourceCount: number;
  topics: string[];
};

export default function ArticleAccountability({ contentType, sourceCount, topics }: ArticleAccountabilityProps) {
  const sourceLabel = `${sourceCount} public ${sourceCount === 1 ? 'source' : 'sources'}`;
  const contribution = contentType === 'research'
    ? 'RoboSkin.ai extracts the reported setup, measurements, evidence boundary, and unresolved limitations, then connects them to normalized sensor, robot, dataset, and model records where those relationships are supported.'
    : 'RoboSkin.ai separates announcement claims from verified technical context, checks the linked public sources, and records what the release does not establish.';

  return (
    <section className="mb-8 border-y border-white/10 bg-[#090b0f] px-5 py-6 md:px-7" aria-labelledby="article-accountability-heading">
      <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#ff6b3d]">Authorship and method</p>
      <h2 id="article-accountability-heading" className="mt-3 text-2xl font-semibold text-white">
        Source review with a named accountable editor
      </h2>
      <dl className="mt-6 grid gap-5 text-sm leading-relaxed text-[#c8d1de] md:grid-cols-2">
        <div>
          <dt className="font-semibold text-white">Who is responsible</dt>
          <dd className="mt-2">
            <Link href={site.editorial.lead.path} rel="author" className="font-semibold text-[#ffd5c5] hover:text-white">
              {site.editorial.lead.name}
            </Link>{' '}
            is the named editor responsible for publication standards, corrections, and source-boundary review.
          </dd>
        </div>
        <div>
          <dt className="font-semibold text-white">What RoboSkin.ai adds</dt>
          <dd className="mt-2">{contribution}</dd>
        </div>
        <div>
          <dt className="font-semibold text-white">How it was prepared</dt>
          <dd className="mt-2">
            This page uses {sourceLabel}. AI-assisted research and drafting workflows may be used for organization, but AI output is not treated as evidence; factual claims must remain traceable to the listed sources.
          </dd>
        </div>
        <div>
          <dt className="font-semibold text-white">Evidence limits</dt>
          <dd className="mt-2">
            RoboSkin.ai did not independently reproduce the cited experiments or vendor results unless the page explicitly says otherwise. Current topic scope: {topics.slice(0, 3).join(', ')}.
          </dd>
        </div>
      </dl>
      <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
        <Link href={site.editorial.lead.path} className="text-[#ffd5c5] hover:text-white">Author profile {'->'}</Link>
        <Link href="/editorial-policy" className="text-[#ffd5c5] hover:text-white">Editorial method {'->'}</Link>
        <Link href="/contact?requestType=research" className="text-[#ffd5c5] hover:text-white">Submit a correction {'->'}</Link>
      </div>
    </section>
  );
}
