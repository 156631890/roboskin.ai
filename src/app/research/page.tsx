import type { Metadata } from 'next';
import LegacyRouteStub from '@/components/LegacyRouteStub';

export const metadata: Metadata = {
  title: 'Research',
  robots: { index: false, follow: false },
};

export default function ResearchPage() {
  return (
    <LegacyRouteStub
      title="Research is now treated as a compatibility page"
      description="The previous publication-style content has been retired. Use Resources or Contact for current technical material."
      primaryHref="/resources"
      primaryLabel="Go to Resources"
    />
  );
}
