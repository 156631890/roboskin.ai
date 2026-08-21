import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { parseNewsletterEndpoint } from '../src/lib/newsletter-config.mjs';

const read = (path) => readFile(path, 'utf8');

test('conversion analytics cover the agreed growth actions without user-entered properties', async () => {
  const [layout, tracker, contact, newsletter, index, privacy] = await Promise.all([
    read('src/app/layout.tsx'),
    read('src/components/AnalyticsTracker.tsx'),
    read('src/components/ContactForm.tsx'),
    read('src/components/NewsletterSignup.tsx'),
    read('src/components/ResearchIndexExplorer.tsx'),
    read('src/app/privacy/page.tsx'),
  ]);

  assert.match(layout, /<AnalyticsTracker \/>/);
  assert.match(tracker, /Referral Landing/);
  assert.match(tracker, /Reading Depth/);
  assert.match(tracker, /Source Open/);
  assert.match(tracker, /Research Brief Open/);
  assert.match(tracker, /WhatsApp Intent/);
  assert.match(tracker, /Research Data Open/);
  assert.doesNotMatch(tracker, /email|fullName|company/i);
  assert.match(contact, /Contact Form Success/);
  assert.match(newsletter, /NEXT_PUBLIC_NEWSLETTER_ENDPOINT/);
  assert.match(newsletter, /Newsletter Subscribe Attempt/);
  assert.match(newsletter, /Newsletter Provider Handoff/);
  assert.match(newsletter, /name="email"/);
  assert.match(newsletter, /name="embed"/);
  assert.match(newsletter, /action=\{config\.endpoint\}/);
  assert.match(newsletter, /method="post"/);
  assert.match(newsletter, /Newsletter is not open yet/);
  assert.match(newsletter, /href="\/feed\.xml"/);
  assert.match(newsletter, /if \(!newsletterConfig\) return <NewsletterUnavailable \/>/);
  assert.doesNotMatch(newsletter, /Newsletter Submit|Newsletter WhatsApp Open|wa\.me|window\.location\.href|encodeURIComponent/);
  assert.match(privacy, /When the Newsletter panel shows its unavailable state/);
  assert.match(privacy, /If a signup form is displayed, it identifies the external email-list provider/);
  assert.doesNotMatch(newsletter, /confirmation step/i);
  assert.doesNotMatch(privacy, /Newsletter signup is not currently open|will process confirmation|will be able to leave a request unconfirmed/i);
  assert.doesNotMatch(privacy, /information is transferred only if the visitor continues|Newsletter readers can decline the confirmation email/);
  assert.match(index, /Research Index Filter/);
});

test('newsletter endpoints accept only credential-free HTTPS provider URLs', () => {
  assert.equal(parseNewsletterEndpoint(undefined), null);
  assert.equal(parseNewsletterEndpoint(''), null);
  assert.equal(parseNewsletterEndpoint('not a URL'), null);
  assert.equal(parseNewsletterEndpoint('http://provider.example/subscribe'), null);
  assert.equal(parseNewsletterEndpoint('javascript:alert(1)'), null);
  assert.equal(parseNewsletterEndpoint('https://user:secret@provider.example/subscribe'), null);
  assert.equal(parseNewsletterEndpoint('https://provider.example/subscribe?api_key=SECRET'), null);
  assert.equal(parseNewsletterEndpoint('https://www./subscribe'), null);
  assert.equal(parseNewsletterEndpoint('https://localhost/subscribe'), null);
  assert.equal(parseNewsletterEndpoint('https://127.0.0.1/subscribe'), null);
  assert.equal(parseNewsletterEndpoint('https://[::1]/subscribe'), null);
  assert.deepEqual(parseNewsletterEndpoint(' https://www.provider.example/subscribe#fragment '), {
    endpoint: 'https://www.provider.example/subscribe',
    providerHost: 'provider.example',
  });
});

test('the August research-news release and five-target outreach batch are complete assets', async () => {
  const [news, llms, outreach] = await Promise.all([
    read('src/lib/news-data.ts'),
    read('public/llms.txt'),
    read('docs/outreach-batch-01.md'),
  ]);

  assert.match(news, /id: 'eit-pneumatic-hybrid-robot-skin-force-map-2026'/);
  assert.match(news, /date: '2026-08-16'/);
  assert.match(news, /0\.31 for the EIT-only baseline to 0\.14/);
  assert.match(news, /https:\/\/arxiv\.org\/abs\/2605\.28468/);
  assert.match(llms, /eit-pneumatic-hybrid-robot-skin-force-map-2026/);
  assert.equal((outreach.match(/^## 0[1-5] —/gm) ?? []).length, 5);
  assert.match(outreach, /Five outreach messages sent individually on 2026-08-16/);
  assert.equal((outreach.match(/^- Status: /gm) ?? []).length, 5);
  assert.equal((outreach.match(/Status: Sent 2026-08-16/g) ?? []).length, 4);
  assert.match(outreach, /Status: Published 2026-08-19/);
});
