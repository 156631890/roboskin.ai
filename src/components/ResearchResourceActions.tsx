import Link from 'next/link';

export const researchPositioning = 'RoboSkin.ai publishes independent research resources and offers paid, source-based research services. Public directories, evidence reviews and downloads remain free to read without an account.';

export default function ResearchResourceActions({ context = 'research' }: { context?: string }) {
  return <aside className="research-resource-actions" aria-label="Follow research or discuss a decision">
    <div><p className="eyebrow">Put this evidence to work</p>
      <h2>From an open resource to your research decision</h2>
      <p>Follow new research, inspect a free sample, or discuss a focused source review. Public resources stay open; paid work adds a defined question, comparison and readout.</p></div>
    <div className="research-resource-links">
      <a href="#newsletter">Weekly research brief / signup status ↓</a>
      <Link href="/rss">Follow current updates via RSS →</Link>
      <Link href="/reports/tactile-ai-robot-skin-landscape-2026">Read the free sample report →</Link>
      <Link href={`/research-services?source=${encodeURIComponent(context)}#inquiry`}>Discuss a research question →</Link>
    </div>
  </aside>;
}
