import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createHash } from 'node:crypto';
import ts from 'typescript';
import { getNewsletterConfig, validateNewsletterSignup } from '../src/lib/newsletter-config.mjs';
import { submitInquiry } from '../src/lib/form-delivery.mjs';
import { datasetAudit, getDatasetEvidence, summarizeDatasetEvidence } from '../src/lib/dataset-evidence.mjs';

function load(file, require = () => { throw new Error('Unexpected import'); }) {
  const exports = {};
  new Function('exports', 'require', ts.transpileModule(fs.readFileSync(file,'utf8'), {compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText)(exports, require);
  return exports;
}
const entries = load('src/lib/tactile-datasets.ts').tactileDatasetEntries;

test('newsletter remains closed without verified provider and removal settings', () => {
  const endpoint = 'https://buttondown.com/api/emails/embed-subscribe/example';
  assert.equal(getNewsletterConfig(endpoint, undefined, undefined), null);
  assert.equal(getNewsletterConfig(endpoint, '2026-09-13', undefined), null);
  assert.equal(getNewsletterConfig('https://untrusted.example/form', '2026-09-13', 'https://buttondown.com/example'), null);
  assert.ok(getNewsletterConfig(endpoint,'2026-09-13','https://buttondown.com/example'));
  assert.equal(validateNewsletterSignup('bad',true,''), 'Enter a valid email address.');
  assert.ok(validateNewsletterSignup('test@example.com',false,''));
  assert.ok(validateNewsletterSignup('test@example.com',true,'bot'));
  assert.equal(validateNewsletterSignup('test+lab@example.com',true,''),null);
});

test('browser transport requires actual acknowledgement and makes no request without configuration', async () => {
  const payload = { fullName:'Synthetic test',company:'Test',email:'test@example.com',message:'Synthetic only',consent:true };
  let count=0;
  const mock = async () => {count++; return Response.json({success:'true'});};
  assert.equal((await submitInquiry(undefined,payload,mock)).ok,false);
  assert.equal(count,0);
  assert.equal((await submitInquiry('https://formsubmit.co/ajax/test-only',payload,mock)).ok,true);
  assert.equal((await submitInquiry('https://formsubmit.co/ajax/test-only',payload,async()=>Response.json({success:'false'}))).ok,false);
  assert.equal((await submitInquiry('https://formsubmit.co/ajax/test-only',payload,async()=>new Response('<html>not a receipt</html>'))).ok,false);
  assert.equal((await submitInquiry('/api/contact',{...payload,website:'bot'},mock)).ok,false);
  assert.equal(count,1);
});

test('dataset coverage is recomputable, keeps unknowns, and matches its immutable snapshot', () => {
  const snapshot=JSON.parse(fs.readFileSync(`public/releases/datasets/${datasetAudit.version}.json`,'utf8'));
  const stats=summarizeDatasetEvidence(entries);
  assert.equal(stats.total,entries.length);
  assert.equal(Object.values(stats.access).reduce((a,b)=>a+b,0),entries.length);
  assert.equal(stats.licenseDocumented+stats.licenseUnknown,entries.length);
  assert.equal(stats.splitFilesListed+stats.splitProtocolDescribed+stats.splitUnknown,entries.length);
  assert.deepEqual(stats,snapshot.statistics);
  assert.deepEqual(entries.map(entry=>({...entry,evidence:getDatasetEvidence(entry),directoryRecordUrl:`https://roboskin.ai/datasets#dataset-${entry.id}`})),snapshot.entries);
  assert.equal(getDatasetEvidence(entries.find(e=>e.id==='egotouch')).licenseStatus,'unknown');
  assert.equal(getDatasetEvidence(entries.find(e=>e.id==='tacverse')).access,'gated');
  assert.ok(getDatasetEvidence(entries.find(e=>e.id==='t-rex')).publicFileScale.includes('not independently recounted'));
});

test('the old research release still matches the current records; no cosmetic version bump', () => {
  const blog=load('src/lib/blog-data.ts');
  const index=load('src/lib/research-index.ts',name=>name==='@/lib/blog-data'?blog:{canonicalUrl:path=>`https://roboskin.ai${path}`});
  const historical=JSON.parse(fs.readFileSync('public/releases/research-index/v2026.08.22/research-index.json','utf8'));
  assert.deepEqual(index.researchIndexEntries,historical.entries);
  assert.equal(index.serializeResearchIndexCsv(),fs.readFileSync('public/releases/research-index/v2026.08.22/research-index.csv','utf8'));
});

test('sample PDF count is independent of live directory and published bytes remain unchanged', () => {
  const sample=JSON.parse(fs.readFileSync('src/content/sample-report-2026.json','utf8'));
  const pdf=fs.readFileSync(`public${sample.pdfPath}`);
  assert.equal(createHash('sha256').update(pdf).digest('hex'),sample.sha256);
  assert.equal(sample.datasets.length,6);
  assert.equal(sample.signals.length,6);
  assert.equal(new Set(sample.references.map(([,url])=>url)).size,17);
  assert.notEqual(sample.datasets.length,entries.length);
  const page=fs.readFileSync('src/app/reports/tactile-ai-robot-skin-landscape-2026/page.tsx','utf8');
  assert.ok(page.includes('Dataset records in this PDF'));
  assert.ok(page.includes('sampleReport.datasets.length'));
});
