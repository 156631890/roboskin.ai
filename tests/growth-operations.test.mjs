import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const read = (path) => readFile(path, 'utf8');

test('conversion analytics cover the agreed growth actions without user-entered properties', async () => {
  const [layout, tracker, contact, newsletter, index] = await Promise.all([
    read('src/app/layout.tsx'),
    read('src/components/AnalyticsTracker.tsx'),
    read('src/components/ContactForm.tsx'),
    read('src/components/NewsletterSignup.tsx'),
    read('src/components/ResearchIndexExplorer.tsx'),
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
  assert.match(newsletter, /Newsletter Success/);
  assert.match(newsletter, /Newsletter WhatsApp Open/);
  assert.match(index, /Research Index Filter/);
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
  assert.equal((outreach.match(/Status: Sent 2026-08-16/g) ?? []).length, 5);
});
