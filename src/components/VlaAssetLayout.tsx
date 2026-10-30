import type { ReactNode } from 'react';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import { buildBreadcrumbJsonLd, buildGraphJsonLd, buildPageJsonLd } from '@/lib/seo';
import { vlaCatalogReviewed } from '@/lib/vla-catalog';

const routes = [
  ['/robot-vla-models', 'VLA guide'],
  ['/vla/models', 'Model comparison'],
  ['/vla/timeline', 'Timeline'],
  ['/vla/concepts', 'Concepts'],
] as const;

export default function VlaAssetLayout({ path, eyebrow, title, intro, children }: {
  path: string; eyebrow: string; title: string; intro: string; children: ReactNode;
}) {
  return (
    <>
      <JsonLd data={buildGraphJsonLd([buildPageJsonLd(path), buildBreadcrumbJsonLd(path)])} />
      <section className="py-14 md:py-20">
        <div className="container-shell">
          <span className="eyebrow">{eyebrow}</span>
          <p className="mt-4 text-sm text-soft">Part of <Link href="/robot-vla-models" data-structure-position="subpage_parent" className="underline underline-offset-4">VLA robotics</Link>.</p>
          <h1 className="mt-5 max-w-5xl text-4xl font-bold leading-tight text-white md:text-6xl">{title}</h1>
          <p className="mt-5 max-w-4xl text-base leading-relaxed text-[#c8d1de]">{intro}</p>
          <p className="mt-4 text-sm text-[#8e98a8]">
            By <Link href="/editorial-policy" className="underline underline-offset-4 hover:text-white">RoboSkin.ai Editorial Team</Link>
            {' · '}Source review: <time dateTime={path === '/vla/concepts' ? '2026-10-14' : vlaCatalogReviewed}>{path === '/vla/concepts' ? 'October 14, 2026' : 'October 16, 2026'}</time>
          </p>
          <nav aria-label="VLA resources" className="mt-7 flex flex-wrap gap-3">
            {routes.map(([href, label]) => (
              <Link key={href} href={href} aria-current={href === path ? 'page' : undefined}
                className={href === path ? 'btn-primary' : 'btn-secondary'}>{label}</Link>
            ))}
          </nav>
        </div>
      </section>
      {children}
      <section className="pb-20">
        <div className="container-shell">
          <div className="signal-panel p-6 text-sm leading-relaxed text-[#aeb8c7]">
            <h2 className="text-lg font-semibold text-white">Evidence and corrections</h2>
            <p className="mt-3">This is an editorial reading aid based on the linked primary sources. Results are author-reported;
              RoboSkin has not reproduced these model evaluations. Artifact availability and license terms can change.</p>
            <p className="mt-3">
              <Link href="/methodology" className="text-[#ffd5c5] underline underline-offset-4 hover:text-white">Research methodology</Link>
              {' · '}<Link href="/contact?requestType=research" className="text-[#ffd5c5] underline underline-offset-4 hover:text-white">Suggest a source or correction</Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
