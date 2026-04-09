import type { Metadata } from 'next';
import LegacyRouteStub from '@/components/LegacyRouteStub';

export const metadata: Metadata = {
  title: 'Applications',
  robots: { index: false, follow: false },
};

export default function ApplicationsPage() {
  return (
    <LegacyRouteStub
      title="Applications are now covered under Solutions"
      description="This route is retained for compatibility. Please use the Solutions page for the current customer journey."
      primaryHref="/solutions"
      primaryLabel="Go to Solutions"
    />
  );
}
