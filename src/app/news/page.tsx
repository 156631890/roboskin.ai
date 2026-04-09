import type { Metadata } from 'next';
import LegacyRouteStub from '@/components/LegacyRouteStub';

export const metadata: Metadata = {
  title: 'News',
  robots: { index: false, follow: false },
};

export default function NewsPage() {
  return (
    <LegacyRouteStub
      title="News has been retired from the main site"
      description="Public news and announcements were not part of the verified content model. Use Contact for current updates."
      primaryHref="/contact"
      primaryLabel="Contact us"
    />
  );
}
