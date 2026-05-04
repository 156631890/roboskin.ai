import Image from 'next/image';
import type { PageVisual } from '@/content/site';

type PageHeroVisualProps = {
  visual: PageVisual;
  className?: string;
  priority?: boolean;
};

export default function PageHeroVisual({ visual, className = '', priority = false }: PageHeroVisualProps) {
  return (
    <figure
      className={`relative overflow-hidden rounded-lg border border-white/10 bg-[#080b10] shadow-[inset_0_1px_0_rgba(255,255,255,0.035)] ${className}`}
    >
      <div className="relative aspect-[16/9]">
        <Image
          src={visual.image}
          alt={visual.imageAlt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 54vw, 100vw"
          className="object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(6,8,12,0.02),rgba(6,8,12,0.56))]" />
      </div>
      <figcaption className="sr-only">{visual.caption}</figcaption>
    </figure>
  );
}
