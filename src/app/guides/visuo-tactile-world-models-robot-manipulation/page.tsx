import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import SeoTopicArticle from '@/components/SeoTopicArticle';
import { getSeoTopicPage } from '@/content/seo-topic-pages';
import { buildSeoTopicMetadata } from '@/lib/seo-topic';

const page = getSeoTopicPage('/guides/visuo-tactile-world-models-robot-manipulation');

export function generateMetadata(): Metadata {
  if (!page) return { title: 'Visuo-tactile world models topic not found' };
  return buildSeoTopicMetadata(page);
}

export default function VisuoTactileWorldModelsPage() {
  if (!page) notFound();
  const comparison = page.sections.find(section => section.id === 'world-model-comparison');
  return <SeoTopicArticle page={page} leadHref="#world-model-selector" leadLabel="Compare model roles" leadContent={
    <section id="world-model-selector" className="container-shell scroll-mt-24 pb-14" aria-labelledby="model-role-heading">
      <p className="eyebrow">Choose by research task</p>
      <h2 id="model-role-heading" className="mt-4 text-3xl font-bold text-white">What does each tactile world model do?</h2>
      <p className="mt-4 max-w-3xl text-soft">Start with the prediction or control problem you need to study. These are source-reported research roles, not a ranking under one shared benchmark.</p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {comparison?.table?.rows.map(([name, role]) => {
          const sourceName = name === 'VT-WM' ? 'Visuo-Tactile World Models' : name;
          const source = page.sources?.find(source => source.label.toLowerCase().includes(sourceName.toLowerCase()));
          return <div key={name} className="signal-panel p-5">
            <h3 className="text-xl font-semibold text-white">{name}</h3>
            <p className="mt-3 text-sm leading-relaxed text-soft">{role}</p>
            {source ? <a href={source.href} target="_blank" rel="noreferrer" className="mt-4 inline-block text-accent underline underline-offset-4">Read the {name} primary paper ↗</a> : null}
          </div>;
        })}
      </div>
      <Link href="#world-model-comparison" data-search-route="true" className="mt-6 inline-block text-accent underline underline-offset-4">Compare reported results and limitations →</Link>
    </section>
  } />;
}
