import type { Metadata } from 'next';
import Link from 'next/link';
import ReportMembership from '@/components/ReportMembership';
import { membershipConfig, BILLING_PERIODS, PORTAL_URL } from '@/lib/membership/config.mjs';

export const metadata: Metadata = {
  title: 'Weekly Robotics Industry Reports',
  description: 'Follow robot learning, teleoperation and tactile robotics with source-linked industry reports. See subscription availability, report access and billing controls.',
  alternates: { canonical: 'https://roboskin.ai/weekly-reports' },
  robots: { index: false, follow: true },
};

export default function WeeklyReportsPage() {
  const config = membershipConfig();
  const unit = BILLING_PERIODS[config.interval];
  return <article className="container-shell py-16 md:py-24">
    <header className="max-w-3xl">
      <span className="eyebrow">RoboSkin industry intelligence</span>
      <h1 className="mt-5 text-4xl font-semibold tracking-tight md:text-6xl">Weekly robotics industry reports</h1>
      <p className="mt-6 text-lg leading-relaxed">A weekly view of robot learning, teleoperation, tactile sensing and embodied AI: what changed, why it matters, and what the evidence can support.</p>
      {!config.ready && <p className="mt-5 rounded-lg border p-4" role="status">Paid subscriptions are being prepared. Checkout is closed and this page does not collect payment or email addresses.</p>}
    </header>
    <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1fr]">
      <section className="rounded-xl border p-6 md:p-8" aria-labelledby="included">
        <h2 id="included" className="text-2xl font-semibold">Inside each report</h2>
        <ul className="mt-5 list-disc space-y-3 pl-5">
          <li>Research and industry developments, with original sources and a clear evidence cutoff.</li>
          <li>Implications for engineering and product decisions, including unresolved questions and limitations.</li>
          <li>A dated source register and access to the report library while your subscription is active.</li>
        </ul>
        <p className="mt-6">The report format is separate from the free Newsletter. Reports are prepared and reviewed before publication; a source claim is not a RoboSkin hardware test.</p>
        <p className="mt-4"><Link className="underline" href="/reports/tactile-ai-robot-skin-landscape-2026">Read our free landscape sample</Link> for an example of our research approach. It is not a current weekly issue.</p>
        <p className="mt-4"><Link className="underline" href="/editorial-policy">Editorial standards</Link> · <Link className="underline" href="/contact?requestType=research">Report questions and support</Link></p>
      </section>
      <section className="rounded-xl border p-6 md:p-8" aria-labelledby="membership">
        <h2 id="membership" className="text-2xl font-semibold">Report membership</h2>
        {config.ready && unit ? <>
          <p className="mt-4 text-4xl font-semibold">US$9.90 <span className="text-lg font-normal">/ {unit}</span></p>
          <p className="mt-3">Billed automatically every {unit}. One report per week, delivered as an email notice and a private online report. Applicable tax is shown at Waffo checkout before you pay.</p>
          <p className="mt-3">Cancel future renewals in the Waffo billing portal. Access continues until the end of the paid period. A full refund of the current period ends access for that period.</p>
          <p className="mt-3">Use the same verified email at checkout so you can manage billing. You can turn off report emails separately; this does not stop renewal charges.</p>
          {config.mode === 'test' && <p className="mt-4 font-semibold" role="note">Sandbox — test payments only. This is not a live subscription offer.</p>}
          <ReportMembership checkoutEnabled={config.checkoutEnabled} />
        </> : <>
          <p className="mt-4 text-3xl font-semibold">Planned price: US$9.90</p>
          <p className="mt-3">The billing interval and launch date are not confirmed. Subscription terms and a current issue will be available before checkout opens.</p>
          <p className="mt-4"><Link className="underline" href="/#newsletter">Explore the free Newsletter</Link> or <Link className="underline" href="/rss">follow the research RSS feed</Link>.</p>
        </>}
        <p className="mt-6 text-sm"><a className="underline" href={PORTAL_URL}>Manage or cancel billing at Waffo</a> · <Link className="underline" href="/terms">Terms</Link> · <Link className="underline" href="/privacy">Privacy</Link></p>
      </section>
    </div>
  </article>;
}
