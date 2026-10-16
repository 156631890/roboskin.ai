import { createHmac, randomBytes, randomInt, randomUUID, timingSafeEqual } from 'node:crypto';
import { transaction } from './database.mjs';
import { entitlement, moneyCents } from './waffo.mjs';

export class MembershipError extends Error {
  constructor(status, message) { super(message); this.status = status; }
}
const deny = (status, message) => { throw new MembershipError(status, message); };
export const cookieName = '__Host-roboskin-reports';
export const hash = (value, secret) => createHmac('sha256', secret).update(value).digest('hex');
export function sameSecret(left, right) {
  if (typeof left !== 'string' || typeof right !== 'string') return false;
  const a = Buffer.from(left), b = Buffer.from(right);
  return a.length === b.length && timingSafeEqual(a, b);
}
const publicReport = row => ({ id: row.id, title: row.title, summary: row.summary, weekStart: row.week_start,
  sourceCutoff: row.source_cutoff, publishedAt: row.published_at });

export function createMembershipService({ db, waffo, mail, config, now = () => new Date() }) {
  const stamp = () => now().toISOString();
  async function limit(key, count, seconds) {
    const result = await db.query(`INSERT INTO report_rate_limits(key,count,expires_at) VALUES($1,1,$2)
      ON CONFLICT(key) DO UPDATE SET count=CASE WHEN report_rate_limits.expires_at <= $3 THEN 1 ELSE report_rate_limits.count+1 END,
      expires_at=CASE WHEN report_rate_limits.expires_at <= $3 THEN $2 ELSE report_rate_limits.expires_at END RETURNING count`,
    [hash(key, config.authSecret), new Date(+now() + seconds * 1000).toISOString(), stamp()]);
    if (result.rows[0].count > count) deny(429, 'Too many requests. Please try again later.');
  }
  async function login(email, ip) {
    if (typeof email !== 'string' || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) deny(400, 'Enter a valid email address.');
    email = email.trim().toLowerCase();
    await limit(`login-email:${email}`, 3, 900);
    await limit(`login-ip:${ip}`, 10, 900);
    await limit('login-global', 100, 3600);
    const id = randomUUID(), code = String(randomInt(10000000, 100000000));
    await db.query('INSERT INTO report_login_codes(id,email,code_hash,expires_at) VALUES($1,$2,$3,$4)',
      [id, email, hash(`${id}:${code}`, config.authSecret), new Date(+now() + 600000).toISOString()]);
    await mail({ to: email, subject: 'Your RoboSkin reports sign-in code', key: `login-${id}`,
      text: `Your RoboSkin reports sign-in code is ${code}. It expires in 10 minutes and can be used once.\n\nIf you did not request it, ignore this email. Signing in does not start a paid subscription.` });
    return { challenge: id };
  }
  async function confirm(id, code, ip) {
    if (typeof id !== 'string' || !/^[a-f0-9-]{36}$/.test(id) || !/^\d{8}$/.test(code)) deny(400, 'Enter the eight-digit code from your email.');
    await limit(`confirm:${ip}`, 30, 900);
    // Invalid attempts must commit, not roll back with the authentication error.
    const session = await transaction(db, async tx => {
      const { rows } = await tx.query('SELECT * FROM report_login_codes WHERE id=$1 FOR UPDATE', [id]);
      const challenge = rows[0];
      if (!challenge || challenge.consumed_at || new Date(challenge.expires_at) <= now() || challenge.attempts >= 5) return null;
      await tx.query('UPDATE report_login_codes SET attempts=attempts+1 WHERE id=$1', [id]);
      if (!sameSecret(challenge.code_hash, hash(`${id}:${code}`, config.authSecret))) return null;
      await tx.query('UPDATE report_login_codes SET consumed_at=$2 WHERE id=$1', [id, stamp()]);
      const member = await tx.query(`INSERT INTO report_members(id,email) VALUES($1,$2)
        ON CONFLICT(email) DO UPDATE SET email=EXCLUDED.email RETURNING id`, [randomUUID(), challenge.email]);
      const token = randomBytes(32).toString('base64url');
      await tx.query('INSERT INTO report_sessions(token_hash,member_id,expires_at) VALUES($1,$2,$3)',
        [hash(token, config.authSecret), member.rows[0].id, new Date(+now() + 30 * 86400000).toISOString()]);
      return token;
    });
    if (!session) deny(401, 'This code is invalid or expired. Request a new code.');
    return session;
  }
  async function member(token) {
    if (!token || !/^[A-Za-z0-9_-]{43}$/.test(token)) deny(401, 'Sign in to access your reports.');
    const { rows } = await db.query(`SELECT m.* FROM report_members m JOIN report_sessions s ON s.member_id=m.id
      WHERE s.token_hash=$1 AND s.expires_at>$2`, [hash(token, config.authSecret), stamp()]);
    if (!rows[0]) deny(401, 'Your session has expired. Sign in again.');
    return rows[0];
  }
  async function sync(tx, checkout, expectedOrderId) {
    const order = await waffo.order(checkout.id);
    if (order && (order.orderMerchantExternalId !== checkout.id || order.subscriptionProduct?.id !== checkout.product_id
      || (expectedOrderId && order.id !== expectedOrderId) || (checkout.order_id && checkout.order_id !== order.id))) {
      throw new Error('Waffo order identity mismatch');
    }
    const refunds = await tx.query('SELECT * FROM report_refunds WHERE checkout_id=$1', [checkout.id]);
    const active = entitlement(order, checkout, refunds.rows, now());
    await tx.query(`UPDATE report_checkouts SET order_id=COALESCE($2,order_id), status=$3, period_start=$4, period_end=$5,
      entitled=$6,synced_at=$7 WHERE id=$1`, [checkout.id, order?.id || null, order?.status || 'pending',
      order?.currentPeriodStart || null, order?.currentPeriodEnd || null, active, stamp()]);
    return active;
  }
  async function refresh(memberId) {
    // The same row lock encloses the provider read and write. A delayed earlier request cannot overwrite a later read.
    const { rows } = await db.query(`SELECT id FROM report_checkouts WHERE member_id=$1 AND mode=$2 AND store_id=$3
      AND (status NOT IN ('canceled','closed','expired') OR synced_at IS NULL) ORDER BY created_at DESC LIMIT 10`,
    [memberId, config.mode, config.storeId]);
    for (const row of rows) await transaction(db, async tx => {
      const result = await tx.query('SELECT * FROM report_checkouts WHERE id=$1 FOR UPDATE', [row.id]);
      await sync(tx, result.rows[0]);
    });
  }
  async function access(memberId) {
    const result = await db.query(`SELECT * FROM report_checkouts WHERE member_id=$1 AND mode=$2 AND store_id=$3
      AND entitled=true AND period_start<=$4 AND period_end>$4 ORDER BY period_end DESC LIMIT 1`,
    [memberId, config.mode, config.storeId, stamp()]);
    return result.rows[0] || null;
  }
  async function account(memberId) {
    await refresh(memberId);
    const subscription = await access(memberId);
    const reports = subscription ? await db.query(`SELECT id,title,summary,week_start,source_cutoff,published_at FROM paid_reports
      WHERE published_at<=$1 ORDER BY week_start DESC`, [stamp()]) : { rows: [] };
    return { subscription: subscription ? { status: subscription.status, periodEnd: subscription.period_end } : null,
      reports: reports.rows.map(publicReport) };
  }
  async function checkout(user, consent) {
    if (!config.checkoutEnabled) deny(503, 'New subscriptions are not open yet.');
    if (consent !== `${config.interval}:9.90:USD:v1`) deny(400, 'Confirm the price, renewal interval and subscription terms.');
    await limit(`checkout:${user.id}`, 5, 900);
    await refresh(user.id);
    const latest = await db.query(`SELECT id FROM paid_reports WHERE published_at<=$1 AND source_cutoff>$2 LIMIT 1`,
      [stamp(), new Date(+now() - 7 * 86400000).toISOString()]);
    if (!latest.rows.length) deny(503, 'Subscriptions will open when the current report is ready.');
    // Reserve a durable id before external calls. Timeout retries reuse the same provider idempotency key.
    const reference = await transaction(db, async tx => {
      await tx.query('SELECT id FROM report_members WHERE id=$1 FOR UPDATE', [user.id]);
      const existing = await tx.query(`SELECT * FROM report_checkouts WHERE member_id=$1 AND mode=$2 AND store_id=$3
        AND (status IN ('active','canceling','past_due') OR (status='pending' AND created_at>$4)) ORDER BY created_at DESC`,
      [user.id, config.mode, config.storeId, new Date(+now() - 30 * 60000).toISOString()]);
      if (existing.rows.some(row => row.status !== 'pending')) deny(409, 'An existing subscription needs attention. Manage it in the Waffo billing portal.');
      const pending = existing.rows[0];
      if (pending) return pending.id;
      const id = randomUUID();
      await tx.query(`INSERT INTO report_checkouts(id,member_id,mode,store_id,product_id,billing_period,consent_version)
        VALUES($1,$2,$3,$4,$5,$6,$7)`, [id, user.id, config.mode, config.storeId, config.productId, config.interval, consent]);
      return id;
    });
    return transaction(db, async tx => {
      const { rows } = await tx.query('SELECT * FROM report_checkouts WHERE id=$1 FOR UPDATE', [reference]);
      if (rows[0].checkout_url) {
        if (new Date(rows[0].checkout_expires_at) <= now()) deny(409, 'This checkout has expired. Please wait 15 minutes before trying again.');
        return { url: rows[0].checkout_url };
      }
      await waffo.validateProduct();
      const session = await waffo.checkout(reference, user.email);
      await tx.query('UPDATE report_checkouts SET checkout_url=$2,checkout_expires_at=$3 WHERE id=$1', [reference, session.url, session.expiresAt]);
      return { url: session.url };
    });
  }
  async function webhook(event) {
    if (event.mode !== config.mode || event.storeId !== config.storeId) deny(400, 'Webhook scope mismatch.');
    if (typeof event.eventType !== 'string' || typeof event.eventId !== 'string' || event.eventId.length > 300) deny(400, 'Invalid event.');
    if (!event.eventType.startsWith('subscription.') && !event.eventType.startsWith('refund.')) return { ignored: true };
    const reference = event.data?.orderMerchantExternalId;
    if (typeof reference !== 'string' || !/^[a-f0-9-]{36}$/.test(reference)) return { ignored: true };
    return transaction(db, async tx => {
      const { rows } = await tx.query('SELECT * FROM report_checkouts WHERE id=$1 FOR UPDATE', [reference]);
      const row = rows[0];
      if (!row || row.mode !== config.mode || row.store_id !== config.storeId) return { ignored: true };
      const key = [event.mode, event.storeId, event.eventType, event.eventId].join(':');
      const receipt = await tx.query(`INSERT INTO report_webhook_events(event_key,checkout_id,event_type) VALUES($1,$2,$3)
        ON CONFLICT DO NOTHING RETURNING event_key`, [key, reference, event.eventType]);
      if (!receipt.rows.length) return { duplicate: true };
      if (event.eventType === 'refund.succeeded') {
        if (!event.data.paymentId) throw new Error('Refund payment identifier missing');
        await tx.query(`INSERT INTO report_refunds(event_key,checkout_id,payment_id,refunded_cents,charged_cents) VALUES($1,$2,$3,$4,$5)`,
          [key, reference, event.data.paymentId, moneyCents(event.data.refundedAmount), moneyCents(event.data.originalChargedAmount)]);
      }
      await sync(tx, row, event.data.orderId);
      return { processed: true };
    });
  }
  async function report(memberId, id) {
    if (typeof id !== 'string' || !/^[a-f0-9-]{36}$/.test(id)) deny(404, 'Report not found.');
    await refresh(memberId);
    if (!await access(memberId)) deny(403, 'An active paid subscription is required.');
    const { rows } = await db.query('SELECT * FROM paid_reports WHERE id=$1 AND published_at<=$2', [id, stamp()]);
    if (!rows[0]) deny(404, 'Report not found.');
    return { ...publicReport(rows[0]), content: rows[0].content };
  }
  async function preferences(memberId, emailDelivery) {
    if (typeof emailDelivery !== 'boolean') deny(400, 'Choose an email delivery preference.');
    await db.query('UPDATE report_members SET email_delivery=$2 WHERE id=$1', [memberId, emailDelivery]);
  }
  async function logout(token) {
    await db.query('DELETE FROM report_sessions WHERE token_hash=$1', [hash(token || '', config.authSecret)]);
  }
  return { login, confirm, member, account, checkout, webhook, report, preferences, logout, refresh, access, limit };
}
