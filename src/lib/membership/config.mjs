export const BILLING_PERIODS = { weekly: 'week', monthly: 'month' };
export const PORTAL_URL = 'https://pancake.waffo.ai/consumer/portal/login';
export const PRICE = '9.90';

// No default billing interval: delivery frequency is not consent to a charge frequency.
export function membershipConfig(env = process.env) {
  const config = {
    enabled: env.REPORTS_ENABLED === 'true',
    checkoutEnabled: env.REPORTS_CHECKOUT_ENABLED === 'true',
    interval: env.REPORTS_BILLING_INTERVAL,
    mode: env.WAFFO_MODE,
    origin: env.REPORTS_SITE_ORIGIN || 'https://roboskin.ai',
    storeId: env.WAFFO_STORE_ID,
    productId: env.WAFFO_PRODUCT_ID,
    merchantId: env.WAFFO_MERCHANT_ID,
    privateKey: env.WAFFO_PRIVATE_KEY?.replaceAll('\\n', '\n'),
    databaseUrl: env.REPORTS_DATABASE_URL,
    authSecret: env.REPORTS_AUTH_SECRET,
    mailKey: env.RESEND_API_KEY,
    mailFrom: env.REPORTS_MAIL_FROM,
    cronSecret: env.REPORTS_CRON_SECRET,
  };
  const missing = ['storeId', 'productId', 'merchantId', 'privateKey', 'databaseUrl', 'authSecret', 'mailKey', 'mailFrom', 'cronSecret'].filter(key => !config[key]);
  let validOrigin = false;
  try { const url = new URL(config.origin); validOrigin = url.protocol === 'https:' && url.origin === config.origin; } catch {}
  config.ready = config.enabled && env.ROBOSKIN_RUNTIME === 'server' && missing.length === 0
    && Boolean(BILLING_PERIODS[config.interval]) && ['test', 'prod'].includes(config.mode)
    && config.authSecret.length >= 32 && config.cronSecret.length >= 32 && validOrigin;
  return config;
}
