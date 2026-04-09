import type { Metadata } from 'next';
import LegacyRouteStub from '@/components/LegacyRouteStub';

export const metadata: Metadata = {
  title: 'Careers',
  robots: { index: false, follow: false },
};

export default function CareersPage() {
  return (
    <LegacyRouteStub
      title="Careers are not publicly listed"
      description="The current site does not publish a careers page. Please use Contact for business inquiries."
      primaryHref="/contact"
      primaryLabel="Contact the team"
    />
  );
}
