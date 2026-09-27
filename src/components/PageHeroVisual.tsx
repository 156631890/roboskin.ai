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
      className={`page-hero-visual signal-panel relative overflow-hidden rounded-lg ${className}`}
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
        <div className="page-hero-shade" />
      </div>
      <figcaption className="sr-only">{visual.caption}</figcaption>
    </figure>
  );
}
