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
          <h1 className="mt-5 text-4xl font-bold text-[#111318] md:text-6xl">A focused product line for tactile robotics</h1>
          <p className="mt-5 max-w-3xl text-[#4f5560]">
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
                  <p className="text-xs uppercase tracking-[0.14em] text-[#61656f]">Verified offering</p>
                  <h2 className="mt-2 text-2xl font-semibold text-[#111318] md:text-3xl">{product.name}</h2>
                  <p className="mt-3 text-[#4f5560]">{product.summary}</p>
                  <p className="mt-4 text-sm text-[#4f5560]"><span className="font-semibold text-[#111318]">Best for:</span> {product.bestFor}</p>
                  <p className="mt-2 text-sm text-[#4f5560]"><span className="font-semibold text-[#111318]">Inputs and outputs:</span> {product.inputsOutputs}</p>
                </div>
                <div>
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {product.specs.map((spec) => (
                      <li key={spec} className="rounded-xl border border-[#d9d3c8] bg-[#fbfaf7] px-4 py-3 text-sm text-[#2d3138]">
                        {spec}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link href="/contact?requestType=datasheet" className="rounded-xl bg-[#2e5bff] px-5 py-2.5 text-sm font-bold text-white">
                      Request datasheet
                    </Link>
                    <Link href="/contact?requestType=integration" className="rounded-xl border border-[#d9d3c8] px-5 py-2.5 text-sm font-semibold text-[#111318]">
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
