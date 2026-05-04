import Image from 'next/image';
import Link from 'next/link';
import type {
  AuthorityHeroVisual,
  AuthorityLinkGroup,
  DirectAnswerBlock,
  FeaturedIndustryAsset,
  ResearchResourceEntry,
  TechnologyLayer,
} from '@/content/site';

type TactileStackVisualProps = {
  layers: TechnologyLayer[];
};

type FeaturedAssetCoversProps = {
  assets: FeaturedIndustryAsset[];
  compact?: boolean;
};

type AuthorityIndexProps = {
  groups: AuthorityLinkGroup[];
};

type DirectAnswerSectionProps = {
  answers: DirectAnswerBlock[];
};

type TactileStackMapProps = {
  layers: TechnologyLayer[];
  heroVisual: AuthorityHeroVisual;
};

type ResearchBriefIndexProps = {
  entries: ResearchResourceEntry[];
};

const accentStyles: Record<FeaturedIndustryAsset['accent'], { border: string; bg: string; text: string; bar: string }> = {
  blue: {
    border: 'border-[#62a8ff]/45',
    bg: 'bg-[#62a8ff]/12',
    text: 'text-[#d7e7ff]',
    bar: 'bg-[#62a8ff]',
  },
  teal: {
    border: 'border-[#5eead4]/40',
    bg: 'bg-[#5eead4]/10',
    text: 'text-[#ccfbf1]',
    bar: 'bg-[#5eead4]',
  },
  amber: {
    border: 'border-[#fbbf24]/40',
    bg: 'bg-[#fbbf24]/10',
    text: 'text-[#fde68a]',
    bar: 'bg-[#fbbf24]',
  },
  rose: {
    border: 'border-[#fb7185]/40',
    bg: 'bg-[#fb7185]/10',
    text: 'text-[#fecdd3]',
    bar: 'bg-[#fb7185]',
  },
};

export function AuthorityIndex({ groups }: AuthorityIndexProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-4">
      {groups.map((group) => (
        <section key={group.title} className="rounded-lg border border-white/10 bg-[#080b10] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.035)]">
          <h3 className="text-lg font-semibold text-white">{group.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-soft">{group.summary}</p>
          <ul className="mt-5 space-y-3">
            {group.links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="group block rounded-lg border border-white/8 bg-[#080b10] p-3 transition-colors hover:border-[#62a8ff]/35 hover:bg-[#0d1420]">
                  <span className="block text-sm font-semibold text-[#d7e7ff] group-hover:text-white">{link.label}</span>
                  <span className="mt-1 block text-xs leading-relaxed text-soft">{link.description}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

export function DirectAnswerSection({ answers }: DirectAnswerSectionProps) {
  return (
    <div className="divide-y divide-white/8 rounded-lg border border-white/10 bg-[#080b10]">
      {answers.map((item) => (
        <article key={item.question} className="grid gap-4 p-5 md:grid-cols-[0.42fr_1fr] md:p-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-soft">Direct answer</p>
            <h3 className="mt-2 text-xl font-semibold text-white">{item.question}</h3>
          </div>
          <div>
            {item.image && item.imageAlt ? (
              <div className="relative mb-4 aspect-[16/7] overflow-hidden rounded-lg border border-white/8 bg-[#06080c]">
                <Image src={item.image} alt={item.imageAlt} fill sizes="(min-width: 768px) 58vw, 100vw" className="object-cover" />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,11,16,0.12),rgba(8,11,16,0.46))]" />
              </div>
            ) : null}
            <p className="text-base leading-relaxed text-[#d8dce4]">{item.answer}</p>
            <Link href={item.href} className="mt-4 inline-flex text-sm font-semibold text-[#62a8ff] hover:text-[#7dd3fc]">
              {item.ctaLabel} {'->'}
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}

export function TactileStackMap({ layers, heroVisual }: TactileStackMapProps) {
  return (
    <figure className="rounded-lg border border-white/10 bg-[#080b10] shadow-[inset_0_1px_0_rgba(255,255,255,0.035)] overflow-hidden p-0">
      <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="border-b border-white/8 bg-[#080b10] p-6 lg:border-b-0 lg:border-r">
          <div className="relative mb-6 aspect-[16/10] overflow-hidden rounded-lg border border-white/8 bg-[#06080c]">
            <Image
              src={heroVisual.image}
              alt={heroVisual.imageAlt}
              fill
              priority
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(98,168,255,0.08),transparent_42%),linear-gradient(180deg,rgba(6,8,12,0),rgba(6,8,12,0.42))]" />
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-soft">Tactile AI stack map</p>
          <h3 className="mt-3 text-3xl font-semibold leading-tight text-white">Input -&gt; processing -&gt; action -&gt; feedback</h3>
          <p className="mt-4 text-sm leading-relaxed text-soft">
            Robot skin is useful when contact signals move through a complete stack: surface design, sensors,
            signal conditioning, robot middleware, controller behavior, safety response, and evaluation data.
          </p>
          <div aria-hidden="true" className="mt-6 grid grid-cols-5 gap-2">
            {Array.from({ length: 35 }).map((_, index) => {
              const active = [6, 7, 12, 13, 18, 24, 25].includes(index);
              return (
                <span
                  key={index}
                  className={
                    'aspect-square rounded border ' +
                    (active
                      ? 'border-[#5eead4]/50 bg-[#5eead4]/25 shadow-[0_0_18px_rgba(94,234,212,0.18)]'
                      : 'border-white/8 bg-white/[0.045]')
                  }
                />
              );
            })}
          </div>
        </div>
        <ol className="divide-y divide-white/8">
          {layers.map((layer, index) => (
            <li key={layer.title} className="grid grid-cols-[44px_1fr] gap-4 p-4 md:p-5">
              <span className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-white/[0.04] text-sm font-bold text-white">
                {index + 1}
              </span>
              <div>
                <h4 className="text-base font-semibold text-white">{layer.title}</h4>
                <p className="mt-1 text-sm leading-relaxed text-soft">{layer.summary}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </figure>
  );
}

export function TactileStackVisual({ layers }: TactileStackVisualProps) {
  return (
    <figure
      role="img"
      aria-label="Tactile AI stack visual showing a robot skin sensor field connected to sensing, edge AI, robot control, safety reflex, and tactile data feedback layers."
      className="relative min-h-[620px] overflow-hidden rounded-lg border border-white/10 bg-[#070a0f] p-5 shadow-[0_28px_80px_rgba(0,0,0,0.42)]"
    >
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:38px_38px]" />
      <div className="relative grid gap-5 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="rounded-lg border border-white/8 bg-[#0b0f16]/92 p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase text-[#9aa3b2]">Robot skin field</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Contact layer</h2>
            </div>
            <span className="rounded-md border border-[#5eead4]/30 bg-[#5eead4]/10 px-3 py-1 text-xs font-semibold text-[#ccfbf1]">live map</span>
          </div>

          <div className="mt-6 grid grid-cols-6 gap-2">
            {Array.from({ length: 42 }).map((_, index) => {
              const active = [8, 9, 14, 15, 21, 22, 28, 35].includes(index);
              return (
                <span
                  key={index}
                  className={
                    'aspect-square rounded-md border ' +
                    (active
                      ? 'border-[#5eead4]/50 bg-[#5eead4]/25 shadow-[0_0_22px_rgba(94,234,212,0.2)]'
                      : 'border-white/8 bg-white/[0.045]')
                  }
                />
              );
            })}
          </div>

          <div className="mt-6 grid gap-3">
            {['pressure', 'slip', 'contact', 'surface'].map((signal, index) => (
              <div key={signal} className="grid grid-cols-[84px_1fr] items-center gap-3">
                <span className="text-xs uppercase text-[#9aa3b2]">{signal}</span>
                <span className="h-2 rounded-full bg-white/8">
                  <span
                    className="block h-2 rounded-full bg-[#62a8ff]"
                    style={{ width: `${index === 0 ? 82 : index === 1 ? 64 : index === 2 ? 76 : 52}%` }}
                  />
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-white/8 bg-[#0b0f16]/92 p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase text-[#9aa3b2]">The Tactile AI Stack</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Signal to intelligence</h2>
            </div>
            <span className="rounded-md border border-[#62a8ff]/35 bg-[#62a8ff]/12 px-3 py-1 text-xs font-semibold text-[#d7e7ff]">7 layers</span>
          </div>

          <div className="mt-5 space-y-2">
            {layers.map((layer, index) => (
              <div key={layer.title} className="grid grid-cols-[38px_1fr] gap-3 rounded-lg border border-white/8 bg-[#080b10] p-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-md border border-white/10 bg-white/[0.04] text-xs font-bold text-white">
                  {index + 1}
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">{layer.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-soft">{layer.summary}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </figure>
  );
}

export function ResearchBriefIndex({ entries }: ResearchBriefIndexProps) {
  return (
    <div className="rounded-lg border border-white/10 bg-[#080b10]">
      {entries.map((entry) => (
        <Link
          key={entry.href}
          href={entry.href}
          className="group grid gap-3 border-b border-white/8 p-5 transition-colors last:border-b-0 hover:bg-white/[0.035] md:grid-cols-[140px_168px_1fr]"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#7dd3fc]">{entry.label}</span>
          <span className="relative block aspect-[16/9] overflow-hidden rounded-lg border border-white/8 bg-[#06080c]">
            <Image src={entry.image} alt={entry.imageAlt} fill sizes="168px" className="object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
          </span>
          <span>
            <span className="block text-lg font-semibold text-white">{entry.title}</span>
            <span className="mt-1 block text-sm leading-relaxed text-soft">{entry.summary}</span>
          </span>
        </Link>
      ))}
    </div>
  );
}

export function FeaturedAssetCovers({ assets, compact = false }: FeaturedAssetCoversProps) {
  return (
    <div className={compact ? 'grid gap-4 md:grid-cols-2' : 'grid gap-5 md:grid-cols-2 xl:grid-cols-4'}>
      {assets.map((asset) => {
        const accent = accentStyles[asset.accent];
        return (
          <article key={asset.title} className={`rounded-lg border ${accent.border} bg-[#0b0d12] p-5`}>
            <div className={`relative overflow-hidden rounded-lg border ${accent.border} ${accent.bg} p-4`}>
              <Image src={asset.image} alt={asset.imageAlt} fill sizes="(min-width: 768px) 42vw, 100vw" className="object-cover opacity-75" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,10,15,0.12),rgba(7,10,15,0.86))]" />
              <div className="relative flex items-start justify-between gap-4">
                <span className={`rounded-md border ${accent.border} bg-[#070a0f]/70 px-2.5 py-1 text-[11px] font-semibold uppercase ${accent.text}`}>
                  {asset.kicker}
                </span>
                <span className="font-mono text-[11px] text-soft">{asset.code}</span>
              </div>
              <div className="relative mt-24 space-y-2">
                <span className={`block h-1.5 w-20 rounded-full ${accent.bar}`} />
                <span className="block h-1.5 w-28 rounded-full bg-white/18" />
                <span className="block h-1.5 w-16 rounded-full bg-white/12" />
              </div>
              <h3 className="relative mt-7 text-2xl font-semibold leading-tight text-white">{asset.title}</h3>
              <p className="relative mt-3 text-xs uppercase text-soft">RoboSkin.ai industry asset</p>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-soft">{asset.summary}</p>
            <ul className="mt-4 grid gap-2">
              {asset.includes.slice(0, compact ? 3 : 4).map((item) => (
                <li key={item} className="rounded-md border border-white/8 bg-[#080b10] px-3 py-2 text-xs text-[#d8dce4]">
                  {item}
                </li>
              ))}
            </ul>
            <Link href={asset.href} className={`mt-5 inline-flex text-sm font-semibold ${accent.text} hover:text-white`}>
              {asset.ctaLabel} {'->'}
            </Link>
          </article>
        );
      })}
    </div>
  );
}

export function ConversionPathPanel() {
  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_0.92fr_0.92fr]">
      <Link
        href="/contact?requestType=brief&requestedAsset=RoboSkin.ai%20Brief"
        className="rounded-lg border border-[#62a8ff]/45 bg-[#62a8ff]/14 p-6 text-white transition-colors hover:bg-[#62a8ff]/18"
      >
        <p className="text-xs font-semibold uppercase text-[#d7e7ff]">Primary path</p>
        <h3 className="mt-3 text-2xl font-semibold">Request the RoboSkin.ai Brief</h3>
        <p className="mt-3 text-sm leading-relaxed text-[#d7e7ff]">Best for readers who want the industry report, stack map, manifesto, or research summary.</p>
      </Link>
      <Link
        href="/contact?requestType=partnership"
        className="rounded-lg border border-white/10 bg-[#0b0d12] p-6 text-white transition-colors hover:bg-white/[0.055]"
      >
        <p className="text-xs font-semibold uppercase text-soft">Partner path</p>
        <h3 className="mt-3 text-xl font-semibold">Partnership or sponsorship</h3>
        <p className="mt-3 text-sm leading-relaxed text-soft">Use for reports, directory listings, research collaboration, or ecosystem introductions.</p>
      </Link>
      <Link
        href="/contact?requestType=acquisition"
        className="rounded-lg border border-[#fbbf24]/35 bg-[#fbbf24]/10 p-6 text-white transition-colors hover:bg-[#fbbf24]/14"
      >
        <p className="text-xs font-semibold uppercase text-[#fde68a]">Strategic path</p>
        <h3 className="mt-3 text-xl font-semibold">Strategic acquisition inquiry</h3>
        <p className="mt-3 text-sm leading-relaxed text-[#fde68a]">Use for domain acquisition, brand licensing, or strategic buyer conversations.</p>
      </Link>
    </div>
  );
}
