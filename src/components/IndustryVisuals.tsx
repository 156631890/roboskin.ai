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

export function AuthorityIndex({ groups }: AuthorityIndexProps) {
  return (
    <div className="authority-index-grid">
      {groups.map((group) => (
        <section key={group.title} className="authority-index-group">
          <h3>{group.title}</h3>
          <p>{group.summary}</p>
          <ul>
            {group.links.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>
                  <strong>{link.label}</strong>
                  <small>{link.description}</small>
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
    <div className="border-y border-white/15">
      {answers.map((item, index) => (
        <article
          key={item.question}
          className="group grid gap-5 border-b border-white/15 py-7 last:border-b-0 md:grid-cols-[72px_0.48fr_1fr] md:py-9"
        >
          <span className="font-mono text-xs font-semibold text-[#ff6b3d]">{String(index + 1).padStart(2, '0')}</span>
          <h3 className="max-w-sm text-xl font-semibold text-white md:text-2xl">{item.question}</h3>
          <div>
            {item.image && item.imageAlt ? (
              <div className="relative mb-5 aspect-[16/7] overflow-hidden border border-white/10 bg-[#11110f]">
                <Image src={item.image} alt={item.imageAlt} fill sizes="(min-width: 768px) 58vw, 100vw" className="object-cover grayscale transition duration-500 group-hover:grayscale-0" />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(17,17,15,0.05),rgba(17,17,15,0.54))]" />
              </div>
            ) : null}
            <p className="max-w-2xl text-base leading-relaxed text-[#c8c1b5]">{item.answer}</p>
            <Link href={item.href} className="mt-5 inline-flex border-b border-white/30 pb-1 text-sm font-semibold text-[#f3efe5] transition-colors hover:border-[#ff6b3d] hover:text-[#ff6b3d]">
              {item.ctaLabel} →
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}

export function TactileStackMap({ layers, heroVisual }: TactileStackMapProps) {
  return (
    <figure className="signal-panel overflow-hidden p-0">
      <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="border-b border-white/12 bg-[#171714] p-5 lg:border-b-0 lg:border-r lg:p-7">
          <div className="relative mb-7 aspect-[16/10] overflow-hidden border border-white/10 bg-[#11110f]">
            <Image
              src={heroVisual.image}
              alt={heroVisual.imageAlt}
              fill
              sizes="(min-width: 1024px) 38vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover saturate-[0.82]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,17,15,0),rgba(17,17,15,0.44))]" />
            <span className="absolute bottom-3 left-3 bg-[#eee9dd] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-[#171714]">
              Contact study / 2026
            </span>
          </div>
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-[#ff6b3d]">Tactile AI stack map</p>
          <h3 className="mt-3 text-3xl font-semibold leading-tight text-white">Input → processing → action → feedback</h3>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#aaa398]">
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
                      ? 'border-[#ff6b3d]/70 bg-[#ff6b3d]/55'
                      : 'border-white/10 bg-white/[0.035]')
                  }
                />
              );
            })}
          </div>
        </div>
        <ol className="divide-y divide-white/12">
          {layers.map((layer, index) => (
            <li key={layer.title} className="group grid grid-cols-[44px_1fr] gap-4 p-4 transition-colors hover:bg-white/[0.03] md:p-5">
              <span className="flex h-9 w-9 items-center justify-center border border-white/15 font-mono text-xs font-semibold text-[#ff6b3d] transition-colors group-hover:border-[#ff6b3d]">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div>
                <h4 className="text-base font-semibold text-white">{layer.title}</h4>
                <p className="mt-1 text-sm leading-relaxed text-[#8f8a81]">{layer.summary}</p>
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
            <span className="rounded-md border border-[#ff8a5b]/30 bg-[#ff8a5b]/10 px-3 py-1 text-xs font-semibold text-[#ffd5c5]">live map</span>
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
                      ? 'border-[#ff8a5b]/50 bg-[#ff8a5b]/25 shadow-[0_0_22px_rgba(255,107,61,0.16)]'
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
                    className="block h-2 rounded-full bg-[#ff7a4d]"
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
            <span className="rounded-md border border-[#ff7a4d]/35 bg-[#ff7a4d]/12 px-3 py-1 text-xs font-semibold text-[#eadfd3]">7 layers</span>
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
    <div className="border-y border-white/15">
      {entries.map((entry, index) => (
        <Link
          key={entry.href}
          href={entry.href}
          className="group grid gap-4 border-b border-white/15 py-5 transition-colors last:border-b-0 hover:bg-white/[0.025] md:grid-cols-[48px_150px_1fr]"
        >
          <span className="font-mono text-[10px] text-[#ff6b3d]">{String(index + 1).padStart(2, '0')}</span>
          <span className="relative block aspect-[16/9] overflow-hidden border border-white/10 bg-[#11110f]">
            <Image src={entry.image} alt={entry.imageAlt} fill sizes="150px" className="object-cover grayscale transition duration-500 group-hover:scale-[1.03] group-hover:grayscale-0" />
          </span>
          <span>
            <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#7e7a72]">{entry.label}</span>
            <span className="mt-1 block text-lg font-semibold text-white transition-colors group-hover:text-[#ff6b3d]">{entry.title}</span>
            <span className="mt-2 block text-sm leading-relaxed text-[#8f8a81]">{entry.summary}</span>
          </span>
        </Link>
      ))}
    </div>
  );
}

export function FeaturedAssetCovers({ assets, compact = false }: FeaturedAssetCoversProps) {
  return (
    <div className={compact ? 'grid border-y border-[#171714]/25 md:grid-cols-2' : 'grid border-y border-[#171714]/25 md:grid-cols-2 xl:grid-cols-4'}>
      {assets.map((asset) => {
        return (
          <article key={asset.title} className="border-b border-[#171714]/25 p-5 first:pl-0 md:border-b-0 md:border-r md:last:border-r-0 md:odd:pl-0 md:even:pr-0">
            <div className="relative overflow-hidden border border-[#171714]/20 bg-[#d7d0c3] p-4">
              <Image src={asset.image} alt={asset.imageAlt} fill sizes="(min-width: 1280px) 24vw, (min-width: 768px) 45vw, 100vw" className="object-cover grayscale opacity-85 transition duration-500 hover:grayscale-0" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(23,23,20,0.02),rgba(23,23,20,0.82))]" />
              <div className="relative flex items-start justify-between gap-4">
                <span className="border border-white/30 bg-[#171714]/70 px-2.5 py-1 text-[10px] font-semibold uppercase text-[#f3efe5]">
                  {asset.kicker}
                </span>
                <span className="font-mono text-[10px] text-[#c8c1b5]">{asset.code}</span>
              </div>
              <div className="relative mt-24 space-y-2">
                <span className="block h-1 w-20 bg-[#ff6b3d]" />
                <span className="block h-1 w-28 bg-white/25" />
                <span className="block h-1 w-16 bg-white/15" />
              </div>
              <h3 className="relative mt-7 text-2xl font-semibold leading-tight text-white">{asset.title}</h3>
              <p className="relative mt-3 font-mono text-[10px] uppercase tracking-[0.1em] text-[#c8c1b5]">RoboSkin.ai research asset</p>
            </div>

            <p className="mt-5 text-sm leading-relaxed text-[#625e57]">{asset.summary}</p>
            <ul className="mt-4 grid gap-2">
              {asset.includes.slice(0, compact ? 3 : 4).map((item) => (
                <li key={item} className="border-t border-[#171714]/20 py-2 text-xs text-[#625e57]">
                  {item}
                </li>
              ))}
            </ul>
            <Link href={asset.href} className="mt-5 inline-flex border-b border-[#171714]/30 pb-1 text-sm font-semibold text-[#171714] transition-colors hover:border-[#bd4324] hover:text-[#bd4324]">
              {asset.ctaLabel} →
            </Link>
          </article>
        );
      })}
    </div>
  );
}

export function ConversionPathPanel() {
  return (
    <div className="grid border-y border-white/15 lg:grid-cols-[1fr_0.92fr_0.92fr]">
      <Link
        href="/research"
        className="border-b border-white/15 bg-[#ff6b3d] p-6 text-[#171714] transition-colors hover:bg-[#f3efe5] lg:border-b-0 lg:border-r"
      >
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em]">Primary path</p>
        <h3 className="mt-3 text-2xl font-semibold">Read the research notes</h3>
        <p className="mt-3 text-sm leading-relaxed text-[#3c2a24]">Best for readers who want source-backed context on robot skin, tactile AI, and e-skin.</p>
      </Link>
      <Link
        href="/contact?requestType=partnership"
        className="border-b border-white/15 p-6 text-white transition-colors hover:bg-white/[0.04] lg:border-b-0 lg:border-r"
      >
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-[#7e7a72]">Partner path</p>
        <h3 className="mt-3 text-xl font-semibold">Editorial collaboration</h3>
        <p className="mt-3 text-sm leading-relaxed text-[#8f8a81]">Use for research collaboration, source suggestions, or educational content ideas.</p>
      </Link>
      <Link
        href="/contact?requestType=correction"
        className="p-6 text-white transition-colors hover:bg-white/[0.04]"
      >
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-[#7e7a72]">Correction path</p>
        <h3 className="mt-3 text-xl font-semibold">Suggest a correction</h3>
        <p className="mt-3 text-sm leading-relaxed text-[#8f8a81]">Use for unsupported claims, outdated references, or better public sources.</p>
      </Link>
    </div>
  );
}
