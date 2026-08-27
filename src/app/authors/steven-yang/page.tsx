import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import { site } from '@/content/site';
import {
  buildBreadcrumbJsonLd,
  buildEditorialLeadJsonLd,
  buildGraphJsonLd,
  buildPageJsonLd,
  buildPageMetadata,
} from '@/lib/seo';

const authorPath = '/authors/steven-yang';

export const metadata: Metadata = buildPageMetadata(authorPath);

const responsibilities = [
  'Selecting research questions that fit robot skin, tactile AI, robot learning, and Physical AI.',
  'Keeping source-reported claims separate from RoboSkin.ai editorial normalization and interpretation.',
  'Checking that metrics retain their robot, sensor, task, sample-size, and evaluation context.',
  'Maintaining correction, revision, and public-source attribution standards.',
];

const selectedWork = [
  {
    href: '/research-index',
    title: 'RoboSkin Tactile Research Index',
    description: 'A versioned CSV and JSON research index with normalized evidence and limitation fields.',
  },
  {
    href: '/datasets',
    title: 'Tactile Robotics Dataset Directory',
    description: 'Source-reviewed records for sensors, robots, tasks, access, licenses, and unresolved gaps.',
  },
  {
    href: '/benchmarks',
    title: 'Tactile Robotics Benchmark Directory',
    description: 'Benchmark protocols organized without treating incompatible tasks as one leaderboard.',
  },
  {
    href: '/sensors',
    title: 'Tactile Sensor Directory',
    description: 'Sensor records that preserve reported signals, form factors, rates, and evidence boundaries.',
  },
];

export default function StevenYangAuthorPage() {
  return (
    <>
      <JsonLd data={buildGraphJsonLd([
        buildPageJsonLd(authorPath),
        buildBreadcrumbJsonLd(authorPath),
        buildEditorialLeadJsonLd(),
      ])} />

      <article className="py-14 md:py-20">
        <div className="container-shell">
          <nav aria-label="Breadcrumb" className="mb-7 flex items-center gap-2 text-xs text-[#8e98a8]">
            <Link href="/" className="hover:text-white">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/about" className="hover:text-white">About</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="text-[#c8d1de]">Steven Yang</span>
          </nav>

          <header className="grid gap-8 border-b border-white/10 pb-12 lg:grid-cols-[220px_1fr] lg:items-center">
            <div className="flex aspect-square items-center justify-center rounded-md border border-white/10 bg-[#080a0e] font-mono text-6xl font-semibold text-[#ff6b3d]">
              SY
            </div>
            <div>
              <p className="eyebrow">Accountable editor</p>
              <h1 className="mt-4 text-4xl font-bold text-white md:text-6xl">{site.editorial.lead.name}</h1>
              <p className="mt-3 font-mono text-sm uppercase tracking-[0.12em] text-[#ffd5c5]">{site.editorial.lead.role}, RoboSkin.ai</p>
              <p className="mt-5 max-w-3xl text-base leading-relaxed text-[#c8d1de]">
                Steven Yang founded RoboSkin.ai and is the named editor responsible for its publication standards, source-boundary review, corrections, and research taxonomy. This is an editorial role; it does not imply authorship of cited scientific papers, laboratory affiliation, or independent reproduction of reported experiments.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/editorial-policy" className="btn-primary">Read the editorial method</Link>
                <Link href="/contact?requestType=research" className="btn-secondary">Submit a correction</Link>
              </div>
            </div>
          </header>

          <section className="grid gap-8 border-b border-white/10 py-12 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="eyebrow">Editorial responsibility</p>
              <h2 className="mt-4 text-3xl font-bold text-white">What the byline means</h2>
            </div>
            <div>
              <ul className="grid gap-3">
                {responsibilities.map((responsibility) => (
                  <li key={responsibility} className="border-l-2 border-[#ff6b3d] bg-[#090b0f] px-5 py-4 text-sm leading-relaxed text-[#c8d1de]">
                    {responsibility}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm leading-relaxed text-[#8e98a8]">
                AI-assisted workflows may support source organization and drafting. AI output is not treated as a source. Published factual claims must remain traceable to the public sources shown on the page, and responsibility for corrections remains with the named editor.
              </p>
            </div>
          </section>

          <section className="py-12">
            <p className="eyebrow">Selected editorial assets</p>
            <h2 className="mt-4 text-3xl font-bold text-white">Structured work readers can inspect</h2>
            <div className="mt-7 grid gap-4 md:grid-cols-2">
              {selectedWork.map((item) => (
                <Link key={item.href} href={item.href} className="glass-card block p-6 transition-colors hover:bg-white/[0.04]">
                  <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#c8d1de]">{item.description}</p>
                  <span className="mt-5 inline-flex text-sm font-semibold text-[#ffd5c5]">Open resource {'->'}</span>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </article>
    </>
  );
}
