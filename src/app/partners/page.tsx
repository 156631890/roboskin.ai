import type { Metadata } from 'next';
import LegacyRouteStub from '@/components/LegacyRouteStub';

export const metadata: Metadata = {
  title: 'Partners',
  robots: { index: false, follow: false },
};

export default function PartnersPage() {
  return (
    <LegacyRouteStub
      title="Partner information is not publicly listed"
      description="Public partner claims were removed. Use Contact if you need a verified status update or research collaboration discussion."
      primaryHref="/contact"
      primaryLabel="Contact the team"
    />
  );
}
