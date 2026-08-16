import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import test from 'node:test';

const read = (path) => readFile(path, 'utf8');

test('the Research Sprint has an indexable sales page with explicit scope and evidence boundaries', async () => {
  const [page, seo, site, llms] = await Promise.all([
    read('src/app/research-services/page.tsx'),
    read('src/lib/seo.ts'),
    read('src/content/site.ts'),
    read('public/llms.txt'),
  ]);

  assert.match(page, /RoboSkin Research Sprint/);
  assert.match(page, /US\$1,500/);
  assert.match(page, /5 business days after kickoff/);
  assert.match(page, /8-12 page PDF/);
  assert.match(page, /Sponsored inclusion cannot purchase a conclusion/);
  assert.match(page, /Physical sensor testing or vendor qualification/);
  assert.match(page, /CommercialInquiryForm/);
  assert.match(seo, /'\/research-services'/);
  assert.match(seo, /index: true/);
  assert.match(site, /href: '\/research-services'/);
  assert.match(llms, /RoboSkin research services/);
});

test('commercial inquiries use the configured delivery endpoint with complete form states and safe analytics', async () => {
  const [form, tracker, privacy] = await Promise.all([
    read('src/components/CommercialInquiryForm.tsx'),
    read('src/components/AnalyticsTracker.tsx'),
    read('src/app/privacy/page.tsx'),
  ]);

  assert.match(form, /NEXT_PUBLIC_CONTACT_FORM_ENDPOINT/);
  assert.match(form, /Research Services Form Submit/);
  assert.match(form, /Research Services Form Success/);
  assert.match(form, /idle.*submitting.*success.*error/);
  assert.match(form, /projectType/);
  assert.match(form, /researchQuestion/);
  assert.match(form, /timeline/);
  assert.match(form, /budget/);
  assert.match(form, /ndaRequired/);
  assert.match(form, /consent/);
  const analyticsCalls = [...form.matchAll(/track\([\s\S]*?\);/g)].map((match) => match[0]).join('\n');
  assert.doesNotMatch(analyticsCalls, /\b(email|fullName|company|researchQuestion)\s*:/i);
  assert.match(tracker, /Sample Report Download/);
  assert.match(tracker, /Research Services Open/);
  assert.match(privacy, /commercial inquiry/);
  assert.match(privacy, /NDA preference/);
});

test('the free sample report is crawlable, downloadable, source-bounded, and large enough to be substantive', async () => {
  const [page, seo, llms, pdf, pdfStats] = await Promise.all([
    read('src/app/reports/tactile-ai-robot-skin-landscape-2026/page.tsx'),
    read('src/lib/seo.ts'),
    read('public/llms.txt'),
    readFile('public/reports/roboskin-tactile-ai-robot-skin-sample-report-2026.pdf'),
    stat('public/reports/roboskin-tactile-ai-robot-skin-sample-report-2026.pdf'),
  ]);

  assert.match(page, /DigitalDocument/);
  assert.match(page, /isAccessibleForFree: true/);
  assert.match(page, /tactileDatasets\.length/);
  assert.match(page, /invented market sizing/);
  assert.match(page, /roboskin-tactile-ai-robot-skin-sample-report-2026\.pdf/);
  assert.match(seo, /'\/reports\/tactile-ai-robot-skin-landscape-2026'/);
  assert.match(llms, /Free tactile AI and robot skin sample report/);
  assert.equal(pdf.subarray(0, 4).toString('ascii'), '%PDF');
  assert.ok(pdfStats.size > 500_000);
});
