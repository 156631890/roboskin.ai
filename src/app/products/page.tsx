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
          <h1 className="mt-5 text-4xl font-bold text-white md:text-6xl">A focused product line for tactile robotics</h1>
          <p className="mt-5 max-w-3xl text-slate-300">
            The public lineup stays intentionally narrow: a sensor array, a developer kit, and a custom integration program.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-shell space-y-6">
          {productCards.map((product) => (
            <article key={product.name} className="glass-card p-7 md:p-8">
              <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-cyan-200/70">Verified offering</p>
                  <h2 className="mt-2 text-2xl font-semibold text-white md:text-3xl">{product.name}</h2>
                  <p className="mt-3 text-slate-300">{product.summary}</p>
                  <p className="mt-4 text-sm text-slate-300"><span className="font-semibold text-white">Best for:</span> {product.bestFor}</p>
                  <p className="mt-2 text-sm text-slate-300"><span className="font-semibold text-white">Inputs and outputs:</span> {product.inputsOutputs}</p>
                </div>
                <div>
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {product.specs.map((spec) => (
                      <li key={spec} className="rounded-xl border border-cyan-200/15 bg-white/5 px-4 py-3 text-sm text-slate-200">
                        {spec}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link href="/contact?requestType=datasheet" className="rounded-xl bg-gradient-to-r from-cyan-300 to-blue-400 px-5 py-2.5 text-sm font-bold text-slate-950">
                      Request datasheet
                    </Link>
                    <Link href="/contact?requestType=integration" className="rounded-xl border border-cyan-200/35 px-5 py-2.5 text-sm font-semibold text-cyan-100">
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
