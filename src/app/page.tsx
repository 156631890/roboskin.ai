import Link from 'next/link';
import { homeStats, homeUseCases, productCards, site } from '@/content/site';

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden py-24 md:py-28">
        <div className="container-shell grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="reveal">
            <span className="eyebrow">Tactile sensing for robotics</span>
            <h1 className="mt-6 max-w-3xl text-5xl font-bold leading-[1.02] tracking-tight text-[#111318] md:text-7xl">
              Flexible tactile sensor skin for robotic grippers, humanoids, and prosthetics
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#4f5560]">
              High-density pressure sensing arrays, integration support, and custom form factors for research teams and OEM programs.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/contact?requestType=demo"
                className="rounded-xl bg-[#2e5bff] px-6 py-3 text-sm font-bold text-white shadow-[0_12px_26px_rgba(46,91,255,0.18)] transition-transform hover:scale-[1.02]"
              >
                Request a demo
              </Link>
              <Link
                href="/contact?requestType=datasheet"
                className="rounded-xl border border-[#d9d3c8] bg-white px-6 py-3 text-sm font-semibold text-[#111318] transition-colors hover:border-[#c8d5ff] hover:bg-[#fbfbf8]"
              >
                Request datasheet
              </Link>
            </div>
          </div>

          <div className="glass-card reveal p-6 [animation-delay:0.1s]">
            <div className="rounded-[18px] border border-[#d9d3c8] bg-white p-6">
              <p className="text-xs uppercase tracking-[0.16em] text-[#61656f]">What RoboSkin offers</p>
              <div className="mt-5 grid gap-4">
                {productCards.map((card) => (
                  <article key={card.name} className="rounded-2xl border border-[#d9d3c8] bg-[#fbfaf7] p-4">
                    <p className="text-xs uppercase tracking-[0.14em] text-[#2e5bff]">{card.cta}</p>
                    <h2 className="mt-2 text-xl font-semibold text-[#111318]">{card.name}</h2>
                    <p className="mt-2 text-sm text-[#4f5560]">{card.summary}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="container-shell grid gap-4 md:grid-cols-4">
          {homeStats.map((item, idx) => (
            <article key={item.label} className="glass-card reveal p-6" style={{ animationDelay: `${idx * 0.06}s` }}>
              <p className="text-3xl font-bold text-[#111318]">{item.value}</p>
              <p className="mt-1 text-sm text-[#4f5560]">{item.label}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container-shell">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="eyebrow">Deployment focus</span>
              <h2 className="mt-4 text-3xl font-bold text-[#111318] md:text-5xl">Where tactile sensing changes the robot stack</h2>
            </div>
            <Link href="/solutions" className="text-sm font-semibold text-[#2e5bff] hover:text-[#2446c8]">
              View solutions {'->'}
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {homeUseCases.map((item, idx) => (
              <article key={item.title} className="glass-card reveal p-7" style={{ animationDelay: `${idx * 0.08}s` }}>
                <h3 className="text-xl font-semibold text-[#111318]">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#4f5560]">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container-shell">
          <div className="grid gap-5 lg:grid-cols-3">
            {productCards.map((product, idx) => (
              <article key={product.name} className="glass-card reveal p-7" style={{ animationDelay: `${idx * 0.08}s` }}>
                <p className="text-xs uppercase tracking-[0.12em] text-[#61656f]">Product level</p>
                <h3 className="mt-2 text-2xl font-semibold text-[#111318]">{product.name}</h3>
                <p className="mt-3 text-sm text-[#4f5560]">{product.summary}</p>
                <p className="mt-4 text-sm text-[#4f5560]"><span className="font-semibold text-[#111318]">Best for:</span> {product.bestFor}</p>
                <p className="mt-2 text-sm text-[#4f5560]"><span className="font-semibold text-[#111318]">Inputs and outputs:</span> {product.inputsOutputs}</p>
                <ul className="mt-5 space-y-2">
                  {product.specs.map((spec) => (
                    <li key={spec} className="rounded-lg border border-[#d9d3c8] bg-[#fbfaf7] px-4 py-3 text-sm text-[#2d3138]">
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
                        : '/contact?requestType=demo'
                  }
                  className="mt-6 inline-flex rounded-xl bg-[#2e5bff] px-5 py-2.5 text-sm font-bold text-white shadow-[0_12px_26px_rgba(46,91,255,0.18)]"
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
          <div className="rounded-[24px] border border-[#d9d3c8] bg-[#111318] p-8 text-center md:p-12">
            <span className="eyebrow border-[#ffffff1f] bg-white/5 text-white">Need a custom sensor path?</span>
            <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-bold text-white md:text-5xl">
              Share your target application, form factor, and development stage
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[#d3d6dd]">
              We will reply with the most practical next step for integration, evaluation, or a custom program.
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                href="/contact"
                className="rounded-xl bg-white px-8 py-3 text-sm font-bold text-[#111318] transition-transform hover:scale-[1.02]"
              >
                Talk to engineering
              </Link>
            </div>
            <p className="mt-4 text-sm text-[#b9bec8]">
              Direct inquiries: <a className="text-white underline decoration-white/40 underline-offset-4" href={`mailto:${site.contact.primaryEmail}`}>{site.contact.primaryEmail}</a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
