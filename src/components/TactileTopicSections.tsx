import Link from 'next/link';
import type { SeoTopicPage } from '@/content/seo-topic-pages';

type Section = Pick<SeoTopicPage['sections'][number], 'heading' | 'body' | 'bullets' | 'table' | 'links'> & { id: string };

export default function TactileTopicSections({ sections }: { sections: Section[] }) {
  return sections.map((section) => (
    <section key={section.id} className="pb-20" aria-labelledby={section.id}>
      <div className="container-shell">
        <div className="glass-card p-6 md:p-8">
          <h2 id={section.id} className="scroll-mt-24 text-3xl font-bold text-white">{section.heading}</h2>
          {section.body.map((paragraph) => <p key={paragraph} className="mt-4 max-w-4xl leading-relaxed text-soft">{paragraph}</p>)}
          {section.table ? (
            <div className="mt-6 overflow-x-auto rounded-xl border border-white/10" role="region" aria-label={`${section.heading} comparison`} tabIndex={0}>
              <table className="w-full min-w-[620px] text-left text-sm">
                <caption className="sr-only">{section.heading}</caption>
                <thead className="bg-white/5 text-white"><tr>{section.table.headers.map((header) => <th key={header} scope="col" className="px-4 py-3">{header}</th>)}</tr></thead>
                <tbody>{section.table.rows.map((row) => <tr key={row[0]} className="border-t border-white/10">{row.map((cell, index) => index === 0 ? <th key={index} scope="row" className="px-4 py-4 align-top font-semibold text-white">{cell}</th> : <td key={index} className="px-4 py-4 align-top text-soft">{cell}</td>)}</tr>)}</tbody>
              </table>
            </div>
          ) : null}
          {section.bullets ? <ul className="mt-5 list-disc space-y-2 pl-5 text-soft">{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul> : null}
          {section.links ? <ul className="mt-6 space-y-3 text-sm">{section.links.map((link) => <li key={link.href}><Link href={link.href} className="text-accent underline underline-offset-4">{link.label}</Link></li>)}</ul> : null}
        </div>
      </div>
    </section>
  ));
}
