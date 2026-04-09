import type { Metadata } from 'next';
import LegacyRouteStub from '@/components/LegacyRouteStub';

export const metadata: Metadata = {
  title: 'Team',
  robots: { index: false, follow: false },
};

export default function TeamPage() {
  return (
    <LegacyRouteStub
      title="Team details are not exposed publicly"
      description="This route remains for compatibility. Please use About or Contact for the current company overview."
      primaryHref="/about"
      primaryLabel="Go to About"
    />
  );
}
