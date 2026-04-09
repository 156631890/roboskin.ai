import Link from 'next/link';
import { homeStats, homeUseCases, productCards, site } from '@/content/site';

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden py-24 md:py-28">
        <div className="container-shell grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="reveal">
            <span className="eyebrow">Tactile sensing for robotics</span>
            <h1 className="mt-6 max-w-3xl text-5xl font-bold leading-[1.02] tracking-tight text-white md:text-7xl">
              Flexible tactile sensor skin for robotic grippers, humanoids, and prosthetics
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-200/90">
              High-density pressure sensing arrays, integration support, and custom form factors for research teams and OEM programs.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/contact?requestType=demo"
                className="rounded-xl bg-gradient-to-r from-cyan-300 to-blue-400 px-6 py-3 text-sm font-bold text-slate-950 shadow-[0_12px_30px_rgba(36,169,255,0.35)] transition-transform hover:scale-[1.02]"
              >
                Request a demo
              </Link>
              <Link
                href="/contact?requestType=datasheet"
                className="rounded-xl border border-cyan-200/35 bg-white/5 px-6 py-3 text-sm font-semibold text-cyan-50 transition-colors hover:bg-white/10"
              >
                Request datasheet
              </Link>
            </div>
          </div>

          <div className="glass-card reveal p-6 [animation-delay:0.1s]">
            <div className="space-y-4 rounded-[18px] border border-cyan-100/15 bg-[linear-gradient(145deg,rgba(10,30,52,0.72),rgba(4,16,33,0.92))] p-6">
              <p className="text-sm uppercase tracking-[0.18em] text-cyan-100/70">What RoboSkin offers</p>
              <div className="grid gap-4">
                {productCards.map((card) => (
                  <article key={card.name} className="rounded-2xl border border-white/8 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.14em] text-cyan-200/70">{card.cta}</p>
                    <h2 className="mt-2 text-xl font-semibold text-white">{card.name}</h2>
                    <p className="mt-2 text-sm text-slate-300">{card.summary}</p>
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
              <p className="text-3xl font-bold text-white">{item.value}</p>
              <p className="mt-1 text-sm text-slate-300">{item.label}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container-shell">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="eyebrow">Deployment Focus</span>
              <h2 className="mt-4 text-3xl font-bold text-white md:text-5xl">Where tactile sensing changes the robot stack</h2>
            </div>
            <Link href="/solutions" className="text-sm font-semibold text-cyan-200 hover:text-white">
              View solutions {'->'}
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {homeUseCases.map((item, idx) => (
              <article key={item.title} className="glass-card reveal p-7" style={{ animationDelay: `${idx * 0.08}s` }}>
                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">{item.text}</p>
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
                <p className="text-xs uppercase tracking-[0.12em] text-cyan-200/70">Product level</p>
                <h3 className="mt-2 text-2xl font-semibold text-white">{product.name}</h3>
                <p className="mt-3 text-sm text-slate-300">{product.summary}</p>
                <p className="mt-4 text-sm text-slate-200"><span className="font-semibold text-white">Best for:</span> {product.bestFor}</p>
                <p className="mt-2 text-sm text-slate-300"><span className="font-semibold text-white">Inputs and outputs:</span> {product.inputsOutputs}</p>
                <ul className="mt-5 space-y-2">
                  {product.specs.map((spec) => (
                    <li key={spec} className="rounded-lg border border-cyan-200/15 bg-white/5 px-4 py-3 text-sm text-slate-200">
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
                  className="mt-6 inline-flex rounded-xl bg-gradient-to-r from-cyan-300 to-blue-400 px-5 py-2.5 text-sm font-bold text-slate-950"
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
          <div className="glass-card p-8 text-center md:p-12">
            <span className="eyebrow">Need a custom sensor path?</span>
            <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-bold text-white md:text-5xl">
              Share your target application, form factor, and development stage
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-300">
              We will reply with the most practical next step for integration, evaluation, or a custom program.
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                href="/contact"
                className="rounded-xl bg-gradient-to-r from-cyan-300 to-blue-400 px-8 py-3 text-sm font-bold text-slate-950 shadow-[0_12px_30px_rgba(36,169,255,0.35)] transition-transform hover:scale-[1.02]"
              >
                Talk to engineering
              </Link>
            </div>
            <p className="mt-4 text-sm text-slate-400">
              Direct inquiries: <a className="text-cyan-200" href={`mailto:${site.contact.primaryEmail}`}>{site.contact.primaryEmail}</a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
