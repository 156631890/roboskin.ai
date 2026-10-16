import { WaffoPancake, verifyWebhook } from '@waffo/pancake-ts';
import { PRICE } from './config.mjs';

export function moneyCents(value) {
  if (typeof value !== 'string' || !/^\d{1,9}(\.\d{1,2})?$/.test(value)) return null;
  const [whole, fraction = ''] = value.split('.');
  return Number(whole) * 100 + Number(fraction.padEnd(2, '0'));
}

export function createWaffo(config, fetcher = fetch) {
  const client = new WaffoPancake({ merchantId: config.merchantId, privateKey: config.privateKey,
    environment: config.mode, fetch: (url, options) => fetcher(url, { ...options, signal: AbortSignal.timeout(6000) }) });
  async function query(query, variables) {
    const result = await client.graphql.query({ query, variables });
    if (result.errors?.length || !result.data) throw new Error('Waffo query failed');
    return result.data;
  }
  return {
    verify: (body, signature) => verifyWebhook(body, signature, { environment: config.mode }),
    async validateProduct() {
      // GraphQL prices are an array; REST prices are a currency-keyed object.
      const data = await query(`query($storeId: String!) {
        store(id: $storeId) { id prodEnabled subscriptionProducts {
          id billingPeriod status prices { currency priceInfo { amount } }
        } }
      }`, { storeId: config.storeId });
      const product = data.store?.subscriptionProducts?.find(item => item.id === config.productId);
      const usd = product?.prices?.find(item => item.currency === 'USD');
      if (!product || product.status !== 'active' || product.billingPeriod !== config.interval
        || moneyCents(usd?.priceInfo?.amount) !== 990 || (config.mode === 'prod' && !data.store.prodEnabled)) {
        throw new Error('Configured Waffo product does not match the advertised subscription');
      }
    },
    async checkout(reference, email) {
      const result = await client.checkout.createSession({ productId: config.productId, currency: 'USD',
        buyerEmail: email, withTrial: false, orderMerchantExternalId: reference, expiresInSeconds: 900,
        priceSnapshot: { amount: PRICE, taxCategory: 'digital_goods', taxIncluded: false },
        successUrl: `${config.origin}/weekly-reports?checkout=returned`, language: 'en',
        metadata: { application: 'roboskin-weekly-reports' },
      }, { idempotencyKey: `roboskin-checkout-${reference}` });
      const url = new URL(result.checkoutUrl);
      if (url.protocol !== 'https:' || url.hostname !== 'pancake.waffo.ai' || !url.pathname.startsWith('/store/')) throw new Error('Unexpected checkout URL');
      if (config.mode === 'test') url.searchParams.set('test', 'true');
      return { url: url.href, expiresAt: result.expiresAt };
    },
    async order(reference) {
      const data = await query(`query($storeId: String!, $ref: String!) {
        subscriptionOrders(storeId: $storeId, filter: { orderMerchantExternalId: { eq: $ref } }, limit: 2) {
          id status billingPeriod orderMerchantExternalId currentPeriodStart currentPeriodEnd currentPeriodNumber
          subscriptionProduct { id }
          priceSnapshot { currency regularPhase { subtotal } }
          payments { id status periodNumber }
        }
      }`, { storeId: config.storeId, ref: reference });
      if (!Array.isArray(data.subscriptionOrders) || data.subscriptionOrders.length > 1) throw new Error('Ambiguous Waffo subscription');
      return data.subscriptionOrders[0] || null;
    },
  };
}

export function entitlement(order, checkout, refunds, now = new Date()) {
  if (!order || order.orderMerchantExternalId !== checkout.id || order.subscriptionProduct?.id !== checkout.product_id
    || order.billingPeriod !== checkout.billing_period || order.priceSnapshot?.currency !== 'USD'
    || moneyCents(order.priceSnapshot?.regularPhase?.subtotal) !== 990) return false;
  const start = new Date(order.currentPeriodStart), end = new Date(order.currentPeriodEnd);
  if (!['active', 'canceling'].includes(order.status) || !(start <= now && end > now)
    || !Number.isInteger(order.currentPeriodNumber) || order.currentPeriodNumber < 1) return false;
  return order.payments?.some(payment => {
    if (payment.status !== 'succeeded' || payment.periodNumber !== order.currentPeriodNumber) return false;
    const returned = refunds.filter(refund => refund.payment_id === payment.id);
    if (returned.some(refund => refund.charged_cents == null || refund.refunded_cents == null)) return false;
    const total = returned.reduce((sum, refund) => sum + Number(refund.refunded_cents), 0);
    // Only a full refund of this period removes access. Earlier-period refunds cannot revoke a renewed period.
    return !returned.length || total < Math.max(...returned.map(refund => Number(refund.charged_cents)));
  }) === true;
}
