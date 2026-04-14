import Link from 'next/link';
import { homeProofPoints, homeStats, homeUseCases, productCards, site } from '@/content/site';

const heroSignals = [
  {
    title: 'Spatial Resolution',
    text: 'Dense tactile coverage designed to read contact on hands, arms, and grippers.',
  },
  {
    title: 'Latency',
    text: 'A private evaluation brief can explain the signal path without overpromising public numbers.',
  },
  {
    title: 'Stretchability',
    text: 'A flexible surface language helps the brand feel credible on curved robot geometries.',
  },
  {
    title: 'Deployment Fit',
    text: 'The public story stays narrow while the technical path remains clear for pilots and decks.',
  },
];

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden pb-16 pt-16 md:pb-20 md:pt-20">
        <div className="container-shell grid items-center gap-12 lg:grid-cols-[1.06fr_0.94fr]">
          <div className="reveal">
            <span className="eyebrow">Tactile AI · Humanoid Robot Skin · e-skin</span>
            <h1 className="mt-6 max-w-3xl text-5xl font-bold leading-[0.92] tracking-[-0.06em] text-white md:text-7xl">
              Robot skin for the next generation of machines.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#9aa3b2]">
              RoboSkin is positioned as a high-end Tactile AI brand for humanoid robot skin and e-skin components, with a public page built to feel like an
              acquisition-ready hardware asset.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/contact?requestType=datasheet"
                className="rounded-xl bg-[#62a8ff] px-6 py-3 text-sm font-bold text-white shadow-[0_12px_26px_rgba(98,168,255,0.22)] transition-transform hover:scale-[1.02]"
              >
                Request a deck
              </Link>
              <Link
                href="/contact"
                className="rounded-xl border border-white/12 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/8"
              >
                Contact
              </Link>
              <Link href="#signals" className="rounded-xl border border-transparent px-2 py-3 text-sm font-semibold text-[#d7e7ff] hover:text-white">
                View technical signals
              </Link>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {homeStats.map((item, idx) => (
                <article key={item.label} className="glass-card reveal p-5" style={{ animationDelay: `${idx * 0.05}s` }}>
                  <p className="text-3xl font-bold tracking-tight text-white">{item.value}</p>
                  <p className="mt-1 text-sm text-[#9aa3b2]">{item.label}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="reveal [animation-delay:0.1s]">
            <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(98,168,255,0.24),transparent_36%),linear-gradient(180deg,rgba(14,18,26,0.98),rgba(7,9,13,0.98))] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#62a8ff]/12 blur-3xl" />
              <div className="absolute -bottom-24 left-8 h-56 w-56 rounded-full bg-[#7dd3fc]/10 blur-3xl" />

              <div className="relative rounded-[24px] border border-white/8 bg-white/5 p-5">
                <div className="flex items-center justify-between gap-4 border-b border-white/8 pb-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-[#9aa3b2]">Flagship surface</p>
                    <p className="mt-2 text-lg font-semibold tracking-tight text-white">Private brief for humanoid robot skin</p>
                  </div>
                  <span className="rounded-full border border-white/10 bg-[#0d1016] px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-[#d7e7ff]">
                    Request only
                  </span>
                </div>

                <div className="mt-5 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
                  <div className="overflow-hidden rounded-[24px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] p-5">
                    <div className="flex items-center justify-between">
                      <p className="text-xs uppercase tracking-[0.16em] text-[#9aa3b2]">Surface map</p>
                      <span className="h-2 w-2 rounded-full bg-[#62a8ff]" />
                    </div>
                    <div className="mt-5 grid gap-3">
                      <div className="grid grid-cols-6 gap-2">
                        {Array.from({ length: 24 }).map((_, index) => (
                          <span
                            key={index}
                            className="h-10 rounded-xl border border-white/8 bg-[radial-gradient(circle_at_30%_30%,rgba(125,211,252,0.35),rgba(98,168,255,0.12)_35%,rgba(255,255,255,0.04)_70%)]"
                          />
                        ))}
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="rounded-2xl border border-white/8 bg-[#11151d] p-3">
                          <p className="text-[11px] uppercase tracking-[0.14em] text-[#9aa3b2]">Pressure zones</p>
                          <p className="mt-2 text-sm text-white">Readable contact map for robot hands and curved surfaces.</p>
                        </div>
                        <div className="rounded-2xl border border-white/8 bg-[#11151d] p-3">
                          <p className="text-[11px] uppercase tracking-[0.14em] text-[#9aa3b2]">Signal output</p>
                          <p className="mt-2 text-sm text-white">Cleaner robot-ready data for private evaluation decks.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-3">
                    {heroSignals.map((signal, idx) => (
                      <article key={signal.title} className="rounded-[24px] border border-white/8 bg-[#11151d] p-4" style={{ animationDelay: `${idx * 0.05}s` }}>
                        <p className="text-xs uppercase tracking-[0.14em] text-[#9aa3b2]">Signal {idx + 1}</p>
                        <h2 className="mt-2 text-lg font-semibold tracking-tight text-white">{signal.title}</h2>
                        <p className="mt-2 text-sm leading-relaxed text-[#9aa3b2]">{signal.text}</p>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="signals" className="py-14 md:py-20">
        <div className="container-shell">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="eyebrow">Technical signals</span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-5xl">Why the category is still open</h2>
            </div>
            <p className="max-w-2xl text-sm leading-relaxed text-[#9aa3b2]">
              The page should read like a premium hardware brand, not a generic product brochure. The copy stays narrow and the vocabulary stays technical.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {homeProofPoints.map((item, idx) => (
              <article key={item.title} className="glass-card reveal p-7" style={{ animationDelay: `${idx * 0.06}s` }}>
                <h3 className="text-xl font-semibold tracking-tight text-white">{item.title}</h3>
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
              <span className="eyebrow">Where it fits</span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-5xl">The robot surfaces that benefit first</h2>
            </div>
            <Link href="/products" className="text-sm font-semibold text-[#62a8ff] hover:text-[#7dd3fc]">
              View product paths {'->'}
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {homeUseCases.map((item, idx) => (
              <article key={item.title} className="glass-card reveal p-7" style={{ animationDelay: `${idx * 0.08}s` }}>
                <h3 className="text-xl font-semibold tracking-tight text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#9aa3b2]">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container-shell">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="eyebrow">Offer strip</span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-5xl">Three offers, one contact path</h2>
            </div>
            <Link href="/comparison" className="text-sm font-semibold text-[#62a8ff] hover:text-[#7dd3fc]">
              Compare offer levels {'->'}
            </Link>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {productCards.map((product, idx) => (
              <article key={product.name} className="glass-card reveal p-7" style={{ animationDelay: `${idx * 0.08}s` }}>
                <p className="text-xs uppercase tracking-[0.12em] text-[#9aa3b2]">Product level</p>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">{product.name}</h3>
                <p className="mt-3 text-sm text-[#9aa3b2]">{product.summary}</p>
                <p className="mt-4 text-sm text-[#9aa3b2]">
                  <span className="font-semibold text-white">Start here if:</span> {product.bestFor}
                </p>
                <p className="mt-2 text-sm text-[#9aa3b2]">
                  <span className="font-semibold text-white">Inputs and outputs:</span> {product.inputsOutputs}
                </p>
                <ul className="mt-5 space-y-2">
                  {product.specs.map((spec) => (
                    <li key={spec} className="rounded-lg border border-white/8 bg-[#0d1016] px-4 py-3 text-sm text-[#d8dce4]">
                      {spec}
                    </li>
                  ))}
                </ul>
                <Link
                  href={
                    product.cta === 'Request datasheet'
                      ? '/contact?requestType=datasheet'
                      : product.cta === 'Talk to engineering'
                        ? '/contact?requestType=integration'
                        : '/contact?requestType=datasheet'
                  }
                  className="mt-6 inline-flex rounded-xl bg-[#62a8ff] px-5 py-2.5 text-sm font-bold text-white shadow-[0_12px_26px_rgba(98,168,255,0.22)]"
                >
                  {product.cta}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20 pt-8">
        <div className="container-shell">
          <div className="rounded-[28px] border border-white/8 bg-[#0b0d12] p-8 text-center md:p-12">
            <span className="eyebrow border-white/10 bg-white/5 text-white">Ready for a deck?</span>
            <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-bold tracking-tight text-white md:text-5xl">
              Share your target application, form factor, and development stage
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[#9aa3b2]">
              We will reply with the most practical next step for evaluation, a private deck, or a custom program review.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/contact?requestType=datasheet"
                className="rounded-xl bg-[#62a8ff] px-8 py-3 text-sm font-bold text-white shadow-[0_12px_26px_rgba(98,168,255,0.22)] transition-transform hover:scale-[1.02]"
              >
                Request a deck
              </Link>
              <Link
                href="/contact"
                className="rounded-xl border border-white/12 bg-white/5 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/8"
              >
                Contact
              </Link>
            </div>
            <p className="mt-4 text-sm text-[#9aa3b2]">
              Direct inquiries:{' '}
              <a className="text-[#62a8ff] underline decoration-white/30 underline-offset-4" href={`mailto:${site.contact.primaryEmail}`}>
                {site.contact.primaryEmail}
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
