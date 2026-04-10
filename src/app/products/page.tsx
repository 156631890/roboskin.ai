import type { Metadata } from 'next';
import Link from 'next/link';
import { productCards, site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Products',
  description: 'Explore the RoboSkin product lineup for tactile robotics integration.',
  alternates: {
    canonical: `${site.url}/products`,
  },
};

export default function ProductsPage() {
  return (
    <>
      <section className="py-20 md:py-24">
        <div className="container-shell">
          <span className="eyebrow">Products</span>
          <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
            <h1 className="text-4xl font-bold text-white md:text-6xl">A focused product line for tactile robotics</h1>
            <Link href="/comparison" className="text-accent text-sm font-semibold hover:text-[#7dd3fc]">
              Compare offer levels {'->'}
            </Link>
          </div>
          <p className="mt-5 max-w-3xl text-soft">
            The public lineup stays intentionally narrow: a sensor array, a developer kit, and a custom integration program. Choose the starting point based on
            your geometry constraints and development stage.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-shell space-y-6">
          {productCards.map((product) => (
            <article key={product.name} className="glass-card p-7 md:p-8">
              <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
                <div>
                  <p className="text-soft text-xs uppercase tracking-[0.14em]">Verified offering</p>
                  <h2 className="mt-2 text-2xl font-semibold text-white md:text-3xl">{product.name}</h2>
                  <p className="mt-3 text-soft">{product.summary}</p>
                  <p className="mt-4 text-sm text-soft"><span className="font-semibold text-white">Start here if:</span> {product.bestFor}</p>
                  <p className="mt-2 text-sm text-soft"><span className="font-semibold text-white">Inputs and outputs:</span> {product.inputsOutputs}</p>
                  <div className="mt-6 rounded-2xl border border-white/8 bg-[#0d1016] p-5">
                    <p className="text-xs uppercase tracking-[0.14em] text-soft">Decision note</p>
                    <p className="mt-2 text-sm leading-relaxed text-soft">
                      If you are unsure, compare offer levels first, then request the most relevant technical material or an integration review.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-3">
                      <Link href="/comparison" className="text-accent text-sm font-semibold hover:text-[#7dd3fc]">
                        Compare offers {'->'}
                      </Link>
                      <Link href="/contact?requestType=integration" className="text-sm font-semibold text-white hover:text-[#d7e7ff]">
                        Request integration review {'->'}
                      </Link>
                    </div>
                  </div>
                </div>
                <div>
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {product.specs.map((spec) => (
                      <li key={spec} className="rounded-xl border border-white/8 bg-[#0d1016] px-4 py-3 text-sm text-[#d8dce4]">
                        {spec}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link href="/contact?requestType=datasheet" className="rounded-xl bg-[var(--primary)] px-5 py-2.5 text-sm font-bold text-white shadow-[0_12px_26px_rgba(98,168,255,0.22)]">
                      Request datasheet
                    </Link>
                    <Link href="/contact?requestType=integration" className="rounded-xl border border-white/12 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/8">
                      Talk to engineering
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
