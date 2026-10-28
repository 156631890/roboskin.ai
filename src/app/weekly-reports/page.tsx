import type { Metadata } from 'next';
import Link from 'next/link';
import ReportMembership from '@/components/ReportMembership';
import { membershipConfig, BILLING_PERIODS, PORTAL_URL } from '@/lib/membership/config.mjs';

export const metadata: Metadata = {
  title: 'Paid Robotics Research Reports — US$9.90/month',
  description: 'One source-linked robotics research report each week for US$9.90/month, plus applicable tax. Explore paid report access, billing and the separate free newsletter.',
  alternates: { canonical: 'https://roboskin.ai/weekly-reports' },
  robots: { index: false, follow: true },
};

export default function WeeklyReportsPage() {
  const config = membershipConfig();
  const unit = BILLING_PERIODS[config.interval];
  return <article className="container-shell py-16 md:py-24">
    <header className="max-w-3xl">
      <span className="eyebrow">Paid research subscription</span>
      <h1 className="mt-5 text-4xl font-semibold tracking-tight md:text-6xl">RoboSkin Research Reports</h1>
      <p className="mt-6 text-lg leading-relaxed">Go beyond the reading list with source-linked analysis of robotics developments, implications for engineering and product decisions, and clearly stated limitations.</p>
      <p className="mt-4 text-lg font-semibold">US$9.90/month · One report each week</p>
      <p className="mt-3">Billed monthly and renews automatically until canceled. Applicable tax is shown at checkout.</p>
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
        <p className="mt-6">Includes access to the private report library while your paid subscription is active. The <Link className="underline" href="/#newsletter">free tactile robotics newsletter</Link> is a separate email list and does not include paid report access. Reports are prepared and reviewed before publication; a source claim is not a RoboSkin hardware test.</p>
        <p className="mt-4"><Link className="underline" href="/reports/tactile-ai-robot-skin-landscape-2026">Read our free landscape sample</Link> for an example of our research approach. It is not a current weekly issue.</p>
        <p className="mt-4"><Link className="underline" href="/editorial-policy">Editorial standards</Link> · <Link className="underline" href="/contact?requestType=research">Report questions and support</Link></p>
      </section>
      <section className="rounded-xl border p-6 md:p-8" aria-labelledby="membership">
        <h2 id="membership" className="text-2xl font-semibold">Paid report membership</h2>
        {config.ready && unit ? <>
          <p className="mt-4 text-4xl font-semibold">US$9.90 <span className="text-lg font-normal">/ {unit}</span></p>
          <p className="mt-3">Billed automatically every {unit}. One report per week, delivered as an email notice and a private online report. Applicable tax is shown at Waffo checkout before you pay.</p>
          <p className="mt-3">Cancel future renewals in the Waffo billing portal. Access continues until the end of the paid period. A full refund of the current period ends access for that period.</p>
          <p className="mt-3">Use the same verified email at checkout so you can manage billing. You can turn off report emails separately; this does not stop renewal charges.</p>
          {config.mode === 'test' && <p className="mt-4 font-semibold" role="note">Sandbox — test payments only. This is not a live subscription offer.</p>}
          <ReportMembership checkoutEnabled={config.checkoutEnabled} />
        </> : <>
          <p className="mt-4 text-3xl font-semibold">US$9.90 / month</p>
          <p className="mt-3">Monthly subscription with one new industry report every week. Applicable tax is shown before payment. Checkout is not open yet; the launch date and first issue will be available before subscriptions begin.</p>
          <p className="mt-4"><Link className="underline" href="/#newsletter">Explore the free newsletter</Link> or <Link className="underline" href="/rss">follow the research RSS feed</Link>.</p>
        </>}
        <p className="mt-6 text-sm"><a className="underline" href={PORTAL_URL}>Manage or cancel billing at Waffo</a> · <Link className="underline" href="/terms">Terms</Link> · <Link className="underline" href="/privacy">Privacy</Link></p>
      </section>
    </div>
  </article>;
}
