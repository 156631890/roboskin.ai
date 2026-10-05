import Link from 'next/link';
import { site } from '@/content/site';

type EditorialReviewProps = {
  author?: string;
  className?: string;
};

export default function EditorialReview({ author = site.editorial.name, className = 'article-rail-block' }: EditorialReviewProps) {
  return (
    <div className={className} data-editorial-review="true">
      <p className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-accent">Editorial review</p>
      <div className="mt-3 text-sm leading-relaxed text-soft">
        <p>Written by <Link href={site.editorial.path} rel="author">{author}</Link>. Source-reported findings and RoboSkin.ai analysis are kept separate.</p>
        <p className="mt-3">Reading a paper is not an independent reproduction. Code execution, replay and hardware testing are separate evidence types; look for a dated record and its stated conditions before treating a result as tested by RoboSkin.ai.</p>
        <p className="mt-3">This review does not imply product availability, certification, laboratory affiliation or measured performance by RoboSkin.ai.</p>
        <p className="mt-3">Editorial lead: <Link href={site.editorial.lead.path}>{site.editorial.lead.name}</Link>.</p>
      </div>
      <Link href="/editorial-policy#evidence-method" className="mt-4 block text-sm font-semibold text-accent underline underline-offset-4">How evidence is checked</Link>
      <Link href="/contact?requestType=research" className="mt-3 block text-sm font-semibold text-accent underline underline-offset-4">Report a source or attribution issue</Link>
    </div>
  );
}
