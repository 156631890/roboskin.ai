import Link from 'next/link';
import { unstable_cache } from 'next/cache';
import { membershipConfig } from '@/lib/membership/config.mjs';
import { database } from '@/lib/membership/database.mjs';
import { reportMembershipFailure } from '@/lib/membership/diagnostics.mjs';

const readPreview = unstable_cache(async () => {
  const db = database(membershipConfig().databaseUrl);
  const { rows } = await db.query(
    `SELECT title, summary, published_at FROM paid_reports
     WHERE published_at <= now() AND source_cutoff > now() - interval '7 days'
     ORDER BY week_start DESC LIMIT 1`
  );
  const row = rows[0];
  if (!row) return null;
  return { title: String(row.title), summary: String(row.summary), date: new Date(row.published_at).toISOString().slice(0, 10) };
}, ['public-weekly-issue-summary-v1'], { revalidate: 300 });

export default async function WeeklyIssuePreview() {
  const config = membershipConfig();
  let issue = null;
  if (config.ready && config.mode === 'prod') {
    try {
      issue = await readPreview();
    } catch (error) {
      reportMembershipFailure('preview', error);
    }
  }
  return <section id="weekly-preview" className="container-shell scroll-mt-24 py-10" aria-labelledby="weekly-preview-heading">
    <div className="signal-panel p-6 md:p-8">
      <p className="eyebrow">Weekly research reports</p>
      <h2 id="weekly-preview-heading" className="mt-3 text-2xl font-semibold">{issue?.title ?? 'Weekly report membership'}</h2>
      {issue && <>
        <p className="mt-3 text-sm">Published <time dateTime={issue.date}>{issue.date}</time></p>
        <p className="mt-4 max-w-3xl leading-relaxed">{issue.summary}</p>
      </>}
      <Link className="mt-5 inline-flex underline" href="/weekly-reports#membership">
        {issue && config.checkoutEnabled ? 'Get one report each week · US$9.90/month' : 'View the monthly plan and availability'}
      </Link>
    </div>
  </section>;
}
