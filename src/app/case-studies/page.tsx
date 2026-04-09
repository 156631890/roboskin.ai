import type { Metadata } from 'next';
import LegacyRouteStub from '@/components/LegacyRouteStub';

export const metadata: Metadata = {
  title: 'Case Studies',
  robots: { index: false, follow: false },
};

export default function CaseStudiesPage() {
  return (
    <LegacyRouteStub
      title="Case studies are not part of the current public journey"
      description="This compatibility page remains available for older links, but the main site now routes visitors to Solutions and Contact."
      primaryHref="/solutions"
      primaryLabel="Go to Solutions"
    />
  );
}
