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
      className={`signal-panel relative overflow-hidden rounded-lg ${className}`}
    >
      <div className="relative aspect-[16/9]">
        <Image
          src={visual.image}
          alt={visual.imageAlt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 54vw, 100vw"
          className="object-cover grayscale saturate-[0.35] contrast-[1.04]"
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(17,17,15,0.02),rgba(17,17,15,0.62)),linear-gradient(90deg,rgba(255,107,61,0.08),transparent_48%)]" />
      </div>
      <figcaption className="sr-only">{visual.caption}</figcaption>
    </figure>
  );
}
