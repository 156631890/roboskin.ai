import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import { glossaryTerms, homeProofPoints, homeUseCases, site } from '@/content/site';
import { buildBreadcrumbJsonLd, buildFaqJsonLd, buildGraphJsonLd, buildPageJsonLd, buildPageMetadata } from '@/lib/seo';

const domainValuePoints = [
  {
    title: 'Exact category language',
    text: 'Robot skin is a natural phrase for tactile surfaces on humanoids, grippers, prosthetics, and soft robotic systems.',
  },
  {
    title: '.ai extension fit',
    text: 'The domain connects robotics language with AI search, tactile intelligence, and machine perception.',
  },
  {
    title: 'Content-backed asset',
    text: 'Research notes, glossary terms, FAQ pages, and internal links give the name more context than a parked page.',
  },
  {
    title: 'Flexible buyer use cases',
    text: 'The name can support a startup brand, product line, lab initiative, media property, or acquisition strategy.',
  },
];

const homeRobotSkinFaq = [
  {
    question: 'What is robot skin?',
    answer:
      'Robot skin is a tactile sensing surface that helps robots detect contact, pressure, shear, slip, or interaction events across robot hands, grippers, arms, and curved body surfaces.',
    href: '/faq',
    ctaLabel: 'Read the robot skin FAQ',
  },
  {
    question: 'How does tactile AI relate to robot skin?',
    answer:
      'Tactile AI describes the perception layer that interprets contact data from robot skin, e-skin, force sensors, and multimodal sensing systems.',
    href: '/faq',
    ctaLabel: 'Explore tactile AI answers',
  },
  {
    question: 'Why is RoboSkin.ai a category domain?',
    answer:
      'RoboSkin.ai pairs a concise robot skin phrase with a .ai extension suited to tactile intelligence, humanoid robotics, research media, and domain acquisition interest.',
    href: '/contact?requestType=domain',
    ctaLabel: 'Inquire about the domain',
  },
];

export const metadata: Metadata = buildPageMetadata('/');

export default function Home() {
  return (
    <>
      <JsonLd data={buildGraphJsonLd([buildPageJsonLd('/'), buildBreadcrumbJsonLd('/'), buildFaqJsonLd(homeRobotSkinFaq)])} />

      <section className="relative overflow-hidden pb-16 pt-16 md:pb-20 md:pt-20">
        <div className="pointer-events-none absolute left-[-12rem] top-0 h-80 w-80 rounded-full bg-[#f6d48d]/35 blur-3xl" />
        <div className="pointer-events-none absolute bottom-[-10rem] right-[-8rem] h-96 w-96 rounded-full bg-[#b7d7c7]/35 blur-3xl" />
        <div className="container-shell relative grid items-center gap-10 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="reveal">
            <span className="eyebrow">Robot skin knowledge hub | Premium .ai domain</span>
            <h1 className="mt-6 max-w-3xl text-5xl font-bold leading-[0.92] tracking-[-0.06em] text-[var(--text)] md:text-7xl">
              RoboSkin.ai maps the language of robot skin and tactile AI.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-soft">
              Explore the emerging category of robot skin, e-skin, tactile sensing, and humanoid robotics while evaluating RoboSkin.ai as a premium exact-match
              domain asset.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link href="/research" className="rounded-xl bg-[var(--primary)] px-6 py-3 text-sm font-bold text-white shadow-[0_14px_28px_rgba(31,79,216,0.18)]">
                Explore robot skin research
              </Link>
              <Link href="/glossary" className="rounded-xl border border-[var(--panel-border)] bg-white/60 px-6 py-3 text-sm font-semibold text-[var(--text)]">
                Browse glossary
              </Link>
              <Link href="/contact?requestType=domain" className="rounded-xl px-2 py-3 text-sm font-semibold text-[var(--primary)]">
                Domain inquiry
              </Link>
            </div>
          </div>

          <aside className="glass-card p-6 md:p-8">
            <p className="text-xs uppercase tracking-[0.16em] text-[#8a4b00]">Domain availability</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[var(--text)]">RoboSkin.ai is available</h2>
            <p className="mt-4 text-sm leading-relaxed text-soft">
              A concise .ai name for robot skin, tactile AI, e-skin research, humanoid robotics, and contact-aware machine interfaces.
            </p>
            <Link href={site.domainInquiry.href} className="mt-6 inline-flex rounded-xl bg-[var(--primary)] px-6 py-3 text-sm font-bold text-white">
              Inquire about RoboSkin.ai
            </Link>
          </aside>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container-shell">
          <div className="mb-8 max-w-3xl">
            <span className="eyebrow">Domain value</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-[var(--text)] md:text-5xl">Why RoboSkin.ai works as a category asset</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {domainValuePoints.map((item, idx) => (
              <article key={item.title} className="glass-card reveal p-7" style={{ animationDelay: `${idx * 0.06}s` }}>
                <h3 className="text-xl font-semibold tracking-tight text-[var(--text)]">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-soft">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container-shell">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="eyebrow">Research notes</span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-[var(--text)] md:text-5xl">Signals that define the robot skin category</h2>
            </div>
            <Link href="/research" className="text-sm font-semibold text-[var(--primary)]">
              Read research notes {'->'}
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {homeProofPoints.map((item, idx) => (
              <article key={item.title} className="glass-card reveal p-7" style={{ animationDelay: `${idx * 0.06}s` }}>
                <h3 className="text-xl font-semibold tracking-tight text-[var(--text)]">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-soft">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container-shell">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="eyebrow">Robot skin applications</span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-[var(--text)] md:text-5xl">Where tactile surfaces become useful first</h2>
            </div>
            <Link href="/applications" className="text-sm font-semibold text-[var(--primary)]">
              Explore applications {'->'}
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {homeUseCases.map((item, idx) => (
              <article key={item.title} className="glass-card reveal p-7" style={{ animationDelay: `${idx * 0.08}s` }}>
                <h3 className="text-xl font-semibold tracking-tight text-[var(--text)]">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-soft">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container-shell">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="eyebrow">Glossary cluster</span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-[var(--text)] md:text-5xl">Terms that organize tactile AI search intent</h2>
            </div>
            <Link href="/glossary" className="text-sm font-semibold text-[var(--primary)]">
              Open glossary {'->'}
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {glossaryTerms.slice(0, 4).map((item) => (
              <article key={item.term} className="glass-card p-6">
                <h3 className="text-lg font-semibold text-[var(--text)]">{item.term}</h3>
                <p className="mt-2 text-sm leading-relaxed text-soft">{item.definition}</p>
                <Link href="/glossary" className="mt-4 inline-flex text-sm font-semibold text-[var(--primary)]">
                  Related glossary term {'->'}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container-shell">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="eyebrow">FAQ</span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-[var(--text)] md:text-5xl">Short answers for readers and domain evaluators</h2>
            </div>
            <Link href="/faq" className="text-sm font-semibold text-[var(--primary)]">
              Read full FAQ {'->'}
            </Link>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {homeRobotSkinFaq.map((item, idx) => (
              <article key={item.question} className="glass-card reveal p-7" style={{ animationDelay: `${idx * 0.08}s` }}>
                <h3 className="text-xl font-semibold tracking-tight text-[var(--text)]">{item.question}</h3>
                <p className="mt-3 text-sm leading-relaxed text-soft">{item.answer}</p>
                <Link href={item.href} className="mt-5 inline-flex text-sm font-semibold text-[var(--primary)]">
                  {item.ctaLabel} {'->'}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20 pt-8">
        <div className="container-shell">
          <div className="glass-card overflow-hidden p-8 text-center md:p-12">
            <span className="eyebrow">Final domain inquiry CTA</span>
            <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-bold tracking-tight text-[var(--text)] md:text-5xl">
              Evaluate RoboSkin.ai as a premium domain for robot skin and tactile AI.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-soft">
              The domain can anchor a research hub, startup brand, product line, lab initiative, or acquisition strategy in a category that is still forming.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/contact?requestType=domain" className="rounded-xl bg-[var(--primary)] px-8 py-3 text-sm font-bold text-white">
                Inquire about RoboSkin.ai
              </Link>
              <Link href="/research" className="rounded-xl border border-[var(--panel-border)] bg-white/60 px-8 py-3 text-sm font-semibold text-[var(--text)]">
                Explore research notes
              </Link>
            </div>
            <p className="mt-5 text-sm text-soft">
              Direct inquiries:{' '}
              <a className="text-[var(--primary)] underline decoration-[var(--panel-border)] underline-offset-4" href={`mailto:${site.contact.primaryEmail}`}>
                {site.contact.primaryEmail}
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
