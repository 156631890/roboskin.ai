import Link from 'next/link';

type LegacyRouteStubProps = {
  title: string;
  description: string;
  primaryHref?: string;
  primaryLabel?: string;
};

export default function LegacyRouteStub({
  title,
  description,
  primaryHref = '/contact',
  primaryLabel = 'Contact us',
}: LegacyRouteStubProps) {
  return (
    <section className="py-20 md:py-24">
      <div className="container-shell">
        <div className="glass-card max-w-3xl p-8 md:p-10">
          <span className="eyebrow">Compatibility page</span>
          <h1 className="mt-5 text-3xl font-bold tracking-tight text-[#111318] md:text-5xl">{title}</h1>
          <p className="mt-4 max-w-2xl text-[#4f5560]">{description}</p>
          <div className="mt-8">
            <Link href={primaryHref} className="inline-flex rounded-xl bg-[#2e5bff] px-6 py-3 text-sm font-bold text-white">
              {primaryLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
