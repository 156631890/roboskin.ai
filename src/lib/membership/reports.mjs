import { randomUUID } from 'node:crypto';
import { transaction } from './database.mjs';

export function validateReport(input, now = new Date()) {
  const text = (value, max) => typeof value === 'string' && value.trim().length > 0 && value.length <= max;
  const date = value => typeof value === 'string' && Number.isFinite(Date.parse(value));
  if (!input || !/^\d{4}-\d{2}-\d{2}$/.test(input.weekStart) || new Date(input.weekStart).getUTCDay() !== 1
    || !text(input.title, 180) || !text(input.summary, 1000) || !date(input.sourceCutoff)
    || !date(input.reviewedAt) || !date(input.publishedAt) || !text(input.reviewedBy, 120)
    || input.approved !== true) throw new Error('Report requires a Monday issue date and an explicit editorial approval record.');
  if (new Date(input.sourceCutoff) > new Date(input.reviewedAt) || new Date(input.reviewedAt) > now
    || new Date(input.publishedAt) < new Date(input.reviewedAt)
    || new Date(input.publishedAt) - new Date(input.sourceCutoff) > 7 * 86400000
    || new Date(input.publishedAt) < new Date(input.weekStart)
    || new Date(input.publishedAt) >= new Date(+new Date(input.weekStart) + 7 * 86400000)) throw new Error('Report dates are inconsistent or the evidence cutoff is stale.');
  const content = input.content;
  if (!content || !text(content.introduction, 5000) || !Array.isArray(content.sections) || !content.sections.length || content.sections.length > 20
    || !Array.isArray(content.sources) || content.sources.length < 2 || content.sources.length > 100) throw new Error('Report must contain analysis and a source register.');
  const ids = new Set();
  for (const source of content.sources) {
    let url;
    try { url = new URL(source.url); } catch { throw new Error('Invalid source URL'); }
    if (!text(source.id, 30) || ids.has(source.id) || !text(source.title, 300) || url.protocol !== 'https:'
      || url.username || url.password || !date(source.checkedAt) || new Date(source.checkedAt) > new Date(input.reviewedAt)) throw new Error('Invalid source register');
    ids.add(source.id);
  }
  for (const section of content.sections) {
    if (!text(section.heading, 200) || !text(section.analysis, 15000) || !text(section.implications, 5000)
      || !text(section.limitations, 5000) || !Array.isArray(section.sourceIds) || !section.sourceIds.length
      || section.sourceIds.some(id => !ids.has(id))) throw new Error('Each section needs sourced analysis, practical implications and limitations.');
  }
  return input;
}

export async function publishReport(db, input, now = new Date()) {
  const report = validateReport(input, now);
  // An issue is immutable after publication. A duplicate week is an error, never an implicit overwrite.
  const result = await db.query(`INSERT INTO paid_reports(id,week_start,title,summary,content,source_cutoff,reviewed_by,reviewed_at,published_at)
    VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING id`, [randomUUID(), report.weekStart, report.title, report.summary,
    JSON.stringify(report.content), report.sourceCutoff, report.reviewedBy, report.reviewedAt, report.publishedAt]);
  return result.rows[0].id;
}

export async function dispatchReports({ db, service, mail, config, now = () => new Date() }) {
  const deadline = Date.now() + 180000;
  const stamp = now().toISOString();
  const { rows: reports } = await db.query(`SELECT id,title,summary FROM paid_reports
    WHERE published_at<=$1 AND source_cutoff>$2 ORDER BY week_start DESC LIMIT 1`,
  [stamp, new Date(+now() - 7 * 86400000).toISOString()]);
  if (!reports.length) return { sent: 0, failed: 0, held: 0, staleReport: true };
  const report = reports[0];
  const candidates = await db.query(`SELECT DISTINCT m.id FROM report_members m JOIN report_checkouts c ON c.member_id=m.id
    LEFT JOIN report_deliveries d ON d.member_id=m.id AND d.report_id=$3
    WHERE m.email_delivery=true AND c.mode=$1 AND c.store_id=$2 AND c.entitled=true AND c.period_end>$4
    AND (d.state IS NULL OR d.state='pending') ORDER BY m.id LIMIT 20`, [config.mode, config.storeId, report.id, stamp]);
  const held = await db.query(`SELECT count(*)::integer AS count FROM report_deliveries WHERE report_id=$1 AND state='held'`, [report.id]);
  const result = { sent: 0, failed: 0, held: held.rows[0].count, staleReport: false };
  for (const candidate of candidates.rows) {
    if (Date.now() > deadline) break;
    try {
      await service.refresh(candidate.id);
      if (!await service.access(candidate.id)) continue;
      await db.query(`INSERT INTO report_deliveries(report_id,member_id) VALUES($1,$2) ON CONFLICT DO NOTHING`, [report.id, candidate.id]);
      // Persist a lease before the network call. Recover only within Resend's 24-hour idempotency window.
      const delivery = await transaction(db, async tx => {
        const { rows } = await tx.query(`SELECT d.*,m.email,m.email_delivery FROM report_deliveries d JOIN report_members m ON m.id=d.member_id
          WHERE d.report_id=$1 AND d.member_id=$2 FOR UPDATE OF d`, [report.id, candidate.id]);
        const row = rows[0];
        if (!row.email_delivery || ['sent','held'].includes(row.state)) return null;
        if (row.last_attempt_at && +now() - +new Date(row.last_attempt_at) < 15 * 60000) return null;
        if (row.first_attempt_at && +now() - +new Date(row.first_attempt_at) >= 23 * 3600000) {
          await tx.query(`UPDATE report_deliveries SET state='held' WHERE report_id=$1 AND member_id=$2`, [report.id, candidate.id]);
          result.held++;
          return null;
        }
        await tx.query(`UPDATE report_deliveries SET first_attempt_at=COALESCE(first_attempt_at,$3),last_attempt_at=$3,attempts=attempts+1
          WHERE report_id=$1 AND member_id=$2`, [report.id, candidate.id, stamp]);
        return row;
      });
      if (!delivery) continue;
      const providerId = await mail({ to: delivery.email, subject: `RoboSkin weekly report: ${report.title}`,
        key: `report-${report.id}-${candidate.id}`,
        text: `${report.title}\n\n${report.summary}\n\nRead the full report: ${config.origin}/weekly-reports\nSign in with this email address. An active paid subscription is required.\n\nEmail preferences: ${config.origin}/weekly-reports\nCancel renewal or manage billing: https://pancake.waffo.ai/consumer/portal/login\nStopping report emails does not cancel billing.` });
      await db.query(`UPDATE report_deliveries SET state='sent',sent_at=$3,provider_id=$4 WHERE report_id=$1 AND member_id=$2`,
        [report.id, candidate.id, now().toISOString(), providerId]);
      result.sent++;
    } catch { result.failed++; }
  }
  await db.query('DELETE FROM report_login_codes WHERE expires_at<$1', [stamp]);
  await db.query('DELETE FROM report_sessions WHERE expires_at<$1', [stamp]);
  await db.query('DELETE FROM report_rate_limits WHERE expires_at<$1', [stamp]);
  return result;
}
