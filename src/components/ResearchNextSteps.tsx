import Link from 'next/link';
import { getResearchNextSteps } from '@/lib/research-next-steps.mjs';

export default function ResearchNextSteps({ articleId }: { articleId: string }) {
  const links = getResearchNextSteps(articleId);
  if (!links.length) return null;

  return <nav aria-labelledby="research-next-steps" className="mb-10 border-y border-white/10 py-6">
    <h2 id="research-next-steps" className="text-xl font-semibold text-white">Use this research in your own work</h2>
    <div className="mt-4 grid gap-3 md:grid-cols-3">
      {links.map(link => <Link key={link.id} href={link.href} data-resource-route={link.id}
        className="block rounded-md border border-white/10 bg-white/[0.025] p-4 transition-colors hover:bg-white/[0.06] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ffd5c5]">
        <span className="block text-sm font-semibold leading-relaxed text-[#ffd5c5]">{link.label} <span aria-hidden="true">→</span></span>
        <span className="mt-2 block text-sm leading-relaxed text-[#c8d1de]">{link.description}</span>
      </Link>)}
    </div>
  </nav>;
}
