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
          className="object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(2,4,8,0.02),rgba(2,4,8,0.62))]" />
      </div>
      <figcaption className="sr-only">{visual.caption}</figcaption>
    </figure>
  );
}
