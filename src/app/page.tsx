import Link from 'next/link';
import { deploymentStages, homeProofPoints, homeStats, homeUseCases, productCards, site, technologyLayers } from '@/content/site';

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden py-24 md:py-28">
        <div className="container-shell grid items-center gap-12 lg:grid-cols-[1.06fr_0.94fr]">
          <div className="reveal">
            <span className="eyebrow">Tactile sensing for robotics</span>
            <h1 className="mt-6 max-w-3xl text-5xl font-bold leading-[0.94] tracking-[-0.05em] text-white md:text-7xl">
              Precision tactile hardware for robots that need real touch.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#9aa3b2]">
              For robotics teams evaluating tactile sensing: compare the sensor array, developer kit, and custom integration program, then request the right next step.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/contact?requestType=demo"
                className="rounded-xl bg-[#62a8ff] px-6 py-3 text-sm font-bold text-white shadow-[0_12px_26px_rgba(98,168,255,0.22)] transition-transform hover:scale-[1.02]"
              >
                Request a demo
              </Link>
              <Link
                href="/products"
                className="rounded-xl border border-white/12 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/8"
              >
                Explore products
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

          <div className="glass-card reveal p-6 [animation-delay:0.1s]">
            <div className="rounded-[22px] border border-white/8 bg-[#0a0d12] p-5">
              <div className="flex items-center justify-between gap-4 border-b border-white/8 pb-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-[#9aa3b2]">Carbon fiber sensor slab</p>
                  <p className="mt-2 text-lg font-semibold tracking-tight text-white">Signal map for a flagship robotics surface</p>
                </div>
                <span className="rounded-full border border-white/8 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-[#9aa3b2]">
                  Live preview
                </span>
              </div>

              <div className="mt-5 grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
                <div className="overflow-hidden rounded-[22px] border border-white/8 bg-[linear-gradient(145deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] p-5">
                  <div className="flex items-center justify-between">
                    <p className="text-xs uppercase tracking-[0.16em] text-[#9aa3b2]">Surface layer</p>
                    <span className="h-2 w-2 rounded-full bg-[#62a8ff]" />
                  </div>
                  <div className="mt-5 grid gap-3">
                    <div className="h-24 rounded-2xl border border-white/8 bg-[radial-gradient(circle_at_20%_20%,rgba(98,168,255,0.24),transparent_26%),linear-gradient(145deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))]" />
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-2xl border border-white/8 bg-[#11151d] p-3">
                        <p className="text-[11px] uppercase tracking-[0.14em] text-[#9aa3b2]">Pressure zones</p>
                        <p className="mt-2 text-sm text-white">Dense tactile matrix for robot contact surfaces.</p>
                      </div>
                      <div className="rounded-2xl border border-white/8 bg-[#11151d] p-3">
                        <p className="text-[11px] uppercase tracking-[0.14em] text-[#9aa3b2]">Signal output</p>
                        <p className="mt-2 text-sm text-white">Local processing and cleaner robot-ready data.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid gap-3">
                  <article className="rounded-[22px] border border-white/8 bg-[#11151d] p-4">
                    <p className="text-xs uppercase tracking-[0.14em] text-[#9aa3b2]">Fabrication</p>
                    <h3 className="mt-2 text-lg font-semibold tracking-tight text-white">Carbon discipline</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#9aa3b2]">
                      Use the same restrained surface language everywhere: dark surfaces, sharp hierarchy, and one accent only.
                    </p>
                  </article>
                  <article className="rounded-[22px] border border-white/8 bg-[#11151d] p-4">
                    <p className="text-xs uppercase tracking-[0.14em] text-[#9aa3b2]">Integration</p>
                    <h3 className="mt-2 text-lg font-semibold tracking-tight text-white">Engineering-first presentation</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#9aa3b2]">
                      Make the hardware feel credible before it feels promotional.
                    </p>
                  </article>
                  <article className="rounded-[22px] border border-white/8 bg-[#11151d] p-4">
                    <p className="text-xs uppercase tracking-[0.14em] text-[#9aa3b2]">Form factor</p>
                    <h3 className="mt-2 text-lg font-semibold tracking-tight text-white">Built for curved surfaces</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#9aa3b2]">
                      Keep the visual system compact and technical, like the product itself.
                    </p>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container-shell">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="eyebrow">Why RoboSkin</span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-5xl">Engineering-first, claims-disciplined</h2>
            </div>
            <Link href="/resources" className="text-sm font-semibold text-[#62a8ff] hover:text-[#7dd3fc]">
              View resources {'->'}
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {homeProofPoints.map((item, idx) => (
              <article key={item.title} className="glass-card reveal p-7" style={{ animationDelay: `${idx * 0.06}s` }}>
                <h3 className="text-xl font-semibold tracking-tight text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#9aa3b2]">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container-shell">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="eyebrow">Deployment path</span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-5xl">From evaluation to deployment</h2>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#9aa3b2]">
                A typical engagement starts with a fit check and datasheet review, then moves to an integration review and pilot plan.
              </p>
            </div>
            <Link href="/contact?requestType=integration" className="text-sm font-semibold text-[#62a8ff] hover:text-[#7dd3fc]">
              Request integration review {'->'}
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {deploymentStages.map((stage, idx) => (
              <article key={stage.title} className="glass-card reveal p-7" style={{ animationDelay: `${idx * 0.06}s` }}>
                <p className="text-xs uppercase tracking-[0.14em] text-[#9aa3b2]">Step {idx + 1}</p>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">{stage.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#9aa3b2]">{stage.summary}</p>
                <ul className="mt-5 space-y-2 text-sm text-[#d8dce4]">
                  {stage.inputs.map((bullet) => (
                    <li key={bullet} className="rounded-lg border border-white/8 bg-[#0d1016] px-4 py-2.5">
                      {bullet}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container-shell">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="eyebrow">Product strip</span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-5xl">Three offers, one contact path</h2>
            </div>
            <Link href="/products" className="text-sm font-semibold text-[#62a8ff] hover:text-[#7dd3fc]">
              View products {'->'}
            </Link>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {productCards.map((product, idx) => (
              <article key={product.name} className="glass-card reveal p-7" style={{ animationDelay: `${idx * 0.08}s` }}>
                <p className="text-xs uppercase tracking-[0.12em] text-[#9aa3b2]">Product level</p>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">{product.name}</h3>
                <p className="mt-3 text-sm text-[#9aa3b2]">{product.summary}</p>
                <p className="mt-4 text-sm text-[#9aa3b2]"><span className="font-semibold text-white">Start here if:</span> {product.bestFor}</p>
                <p className="mt-2 text-sm text-[#9aa3b2]"><span className="font-semibold text-white">Inputs and outputs:</span> {product.inputsOutputs}</p>
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
                        : '/contact?requestType=demo'
                  }
                  className="mt-6 inline-flex rounded-xl bg-[#62a8ff] px-5 py-2.5 text-sm font-bold text-white shadow-[0_12px_26px_rgba(98,168,255,0.22)]"
                >
                  {product.cta}
                </Link>
                <p className="mt-3 text-xs uppercase tracking-[0.14em] text-[#9aa3b2]">
                  Next: request technical material or an integration review
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container-shell">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="eyebrow">Deployment focus</span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-5xl">Where tactile sensing changes the robot stack</h2>
            </div>
            <Link href="/solutions" className="text-sm font-semibold text-[#62a8ff] hover:text-[#7dd3fc]">
              View solutions {'->'}
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
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
          <div className="mb-8">
            <span className="eyebrow">Technology stack</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-5xl">Four layers, one tactile system</h2>
          </div>
          <div className="grid gap-5 lg:grid-cols-2">
            {technologyLayers.map((layer, idx) => (
              <article key={layer.title} className="glass-card reveal p-7" style={{ animationDelay: `${idx * 0.08}s` }}>
                <p className="text-xs uppercase tracking-[0.14em] text-[#9aa3b2]">Layer 0{idx + 1}</p>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">{layer.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#9aa3b2]">{layer.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20 pt-8">
        <div className="container-shell">
          <div className="rounded-[28px] border border-white/8 bg-[#0b0d12] p-8 text-center md:p-12">
            <span className="eyebrow border-white/10 bg-white/5 text-white">Ready for an engineering review?</span>
            <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-bold tracking-tight text-white md:text-5xl">
              Share your target application, form factor, and development stage
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[#9aa3b2]">
              We will reply with the most practical next step for evaluation, integration, or a custom program.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/contact"
                className="rounded-xl bg-[#62a8ff] px-8 py-3 text-sm font-bold text-white shadow-[0_12px_26px_rgba(98,168,255,0.22)] transition-transform hover:scale-[1.02]"
              >
                Talk to engineering
              </Link>
              <Link
                href="/contact?requestType=datasheet"
                className="rounded-xl border border-white/12 bg-white/5 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/8"
              >
                Request datasheet
              </Link>
            </div>
            <p className="mt-4 text-sm text-[#9aa3b2]">
              Direct inquiries: <a className="text-[#62a8ff] underline decoration-white/30 underline-offset-4" href={`mailto:${site.contact.primaryEmail}`}>{site.contact.primaryEmail}</a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
