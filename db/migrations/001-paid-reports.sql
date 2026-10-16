CREATE TABLE IF NOT EXISTS report_members (
  id uuid PRIMARY KEY, email text UNIQUE NOT NULL, email_delivery boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS report_login_codes (
  id uuid PRIMARY KEY, email text NOT NULL, code_hash text NOT NULL, expires_at timestamptz NOT NULL,
  attempts integer NOT NULL DEFAULT 0, consumed_at timestamptz
);
CREATE TABLE IF NOT EXISTS report_sessions (
  token_hash text PRIMARY KEY, member_id uuid NOT NULL REFERENCES report_members(id), expires_at timestamptz NOT NULL
);
CREATE TABLE IF NOT EXISTS report_rate_limits (
  key text PRIMARY KEY, count integer NOT NULL, expires_at timestamptz NOT NULL
);
CREATE TABLE IF NOT EXISTS report_checkouts (
  id uuid PRIMARY KEY, member_id uuid NOT NULL REFERENCES report_members(id), mode text NOT NULL, store_id text NOT NULL,
  product_id text NOT NULL, billing_period text NOT NULL, consent_version text NOT NULL,
  checkout_url text, checkout_expires_at timestamptz, order_id text UNIQUE,
  status text NOT NULL DEFAULT 'pending', period_start timestamptz, period_end timestamptz,
  entitled boolean NOT NULL DEFAULT false, synced_at timestamptz, created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS report_checkouts_member ON report_checkouts(member_id);
CREATE TABLE IF NOT EXISTS report_webhook_events (
  event_key text PRIMARY KEY, checkout_id uuid NOT NULL REFERENCES report_checkouts(id),
  event_type text NOT NULL, received_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS report_refunds (
  event_key text PRIMARY KEY REFERENCES report_webhook_events(event_key), checkout_id uuid NOT NULL REFERENCES report_checkouts(id),
  payment_id text NOT NULL, refunded_cents bigint, charged_cents bigint
);
CREATE TABLE IF NOT EXISTS paid_reports (
  id uuid PRIMARY KEY, week_start date UNIQUE NOT NULL, title text NOT NULL, summary text NOT NULL,
  content jsonb NOT NULL, source_cutoff timestamptz NOT NULL, reviewed_by text NOT NULL,
  reviewed_at timestamptz NOT NULL, published_at timestamptz NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS report_deliveries (
  report_id uuid NOT NULL REFERENCES paid_reports(id), member_id uuid NOT NULL REFERENCES report_members(id),
  state text NOT NULL DEFAULT 'pending', attempts integer NOT NULL DEFAULT 0,
  first_attempt_at timestamptz, last_attempt_at timestamptz, sent_at timestamptz, provider_id text,
  PRIMARY KEY(report_id, member_id)
);
