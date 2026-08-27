import Link from 'next/link';

type EvidenceDatabaseMethodProps = {
  name: string;
  recordCount: number;
  reviewedThrough: string;
  scope: string;
  inclusion: string[];
  normalization: string[];
  exclusions: string[];
  limitations: string[];
  links?: Array<{
    label: string;
    href: string;
  }>;
};

export default function EvidenceDatabaseMethod({
  name,
  recordCount,
  reviewedThrough,
  scope,
  inclusion,
  normalization,
  exclusions,
  limitations,
  links = [],
}: EvidenceDatabaseMethodProps) {
  const groups = [
    { label: 'Inclusion rule', items: inclusion },
    { label: 'Editorial normalization', items: normalization },
    { label: 'Excluded claims', items: exclusions },
    { label: 'Known limitations', items: limitations },
  ];

  return (
    <section className="deferred-section pb-14 md:pb-20" aria-labelledby={`${name.toLowerCase().replaceAll(' ', '-')}-method-heading`}>
      <div className="container-shell">
        <div className="grid gap-8 border-y border-white/10 py-8 lg:grid-cols-[0.56fr_1fr] lg:gap-14">
          <div>
            <p className="eyebrow">Database method</p>
            <h2 id={`${name.toLowerCase().replaceAll(' ', '-')}-method-heading`} className="mt-4 text-3xl font-bold text-white md:text-4xl">
              How the {name} is built
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[#c8d1de]">{scope}</p>
            <dl className="mt-6 grid grid-cols-2 gap-4 border-y border-white/10 py-5">
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#8e98a8]">Records</dt>
                <dd className="mt-1 font-mono text-2xl font-bold text-white">{recordCount}</dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#8e98a8]">Reviewed through</dt>
                <dd className="mt-2 font-mono text-sm font-semibold text-white">{reviewedThrough}</dd>
              </div>
            </dl>
            {links.length ? (
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
                {links.map((link) => (
                  <Link key={link.href} href={link.href} className="text-sm font-semibold text-[#ff6b3d] hover:text-white">
                    {link.label} {'->'}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {groups.map((group) => (
              <article key={group.label} className="signal-panel p-5">
                <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-[#ffd5c5]">{group.label}</h3>
                <ul className="mt-4 space-y-3">
                  {group.items.map((item) => (
                    <li key={item} className="border-l border-white/10 pl-3 text-xs leading-relaxed text-[#c8d1de]">
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
