import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { buildArxivUrls, buildReport, indexPublishedPapers, preparePaperCandidates, routePaper, parseArxivFeed, parseGoogleTrendsFeed } from '../scripts/daily-research-watch.mjs';

const arxivFixture = `<?xml version="1.0"?><feed xmlns="http://www.w3.org/2005/Atom"><entry><id>http://arxiv.org/abs/2608.12345v1</id><updated>2026-08-15T10:00:00Z</updated><published>2026-08-15T10:00:00Z</published><title>Robot Skin for Humanoid Tactile Sensing</title><summary>A tactile sensor array for physical AI contact.</summary><author><name>Alex Example</name></author><category term="cs.RO" /></entry></feed>`;
const trendsFixture = `<?xml version="1.0"?><rss xmlns:ht="https://trends.google.com/trending/rss"><channel><item><title>humanoid robot</title><ht:approx_traffic>20K+</ht:approx_traffic><pubDate>Sat, 15 Aug 2026 00:00:00 GMT</pubDate><link>https://trends.google.com/trending?geo=US</link><ht:news_item><ht:news_item_title>New humanoid robot demonstration</ht:news_item_title><ht:news_item_url>https://example.com/source</ht:news_item_url><ht:news_item_source>Example</ht:news_item_source></ht:news_item></item><item><title>football score</title><ht:approx_traffic>1M+</ht:approx_traffic><pubDate>Sat, 15 Aug 2026 00:00:00 GMT</pubDate><link>https://trends.google.com/trending?geo=US</link></item></channel></rss>`;

test('revisions keep canonical ownership and newest version without claiming new publication', () => {
  const index = indexPublishedPapers([{ prefix: '/research', text: `
    id: 'existing-paper',
    content: 'Cites https://arxiv.org/abs/2611.99999v1 as background',
    sourceUrl: 'https://arxiv.org/abs/2603.23481',
    id: 'second-paper',
    sourceUrl: 'https://arxiv.org/abs/2610.10288v3',
  ` }]);
  assert.equal(index.get('2603.23481'), '/research/existing-paper');
  assert.equal(index.has('2611.99999'), false, 'background citations do not own the query');
  const base = { id: '2603.23481', title: 'VTAM world-action model', published: '2026-03-24', topics: [], relevanceScore: 1 };
  const candidates = preparePaperCandidates([
    { ...base, updated: '2026-11-05', sourceUrl: 'https://arxiv.org/abs/2603.23481v2' },
    { ...base, updated: '2026-03-24', sourceUrl: 'https://arxiv.org/abs/2603.23481v1' },
    { ...base, id: '2611.00001', published: '2026-11-01', updated: '2026-11-01' },
  ], index);
  assert.equal(candidates.length, 2);
  assert.equal(candidates[0].sourceUrl, 'https://arxiv.org/abs/2603.23481v2');
  assert.equal(candidates[0].published, '2026-03-24');
  assert.equal(candidates[0].editorialAction, 'review-existing-page');
  assert.equal(routePaper(candidates[0]), '/research/existing-paper');
  assert.equal(routePaper({ title: 'Human tactile dataset', topics: ['robot learning'] }), '/datasets');
  assert.equal(routePaper({ title: 'Visuo-Tactile World-Action Model', topics: ['robot learning'] }), '/robot-world-models');
});

test('failed Trends requests are not described as an absence of relevant demand', () => {
  const report = buildReport({ generatedAt: '2026-11-08T00:00:00Z', papers: [], trends: [],
    sourceHealth: { arxiv: { ok: true }, trends: [{ geo: 'US', ok: false, error: 'timeout' }] } });
  assert.match(report, /Trend coverage incomplete or unavailable/);
  assert.doesNotMatch(report, /No robotics-related daily trend crossed the filter/);
});

test('daily research watch parses source-backed arXiv and relevant Google Trends entries', () => {
  const papers = parseArxivFeed(arxivFixture);
  const trends = parseGoogleTrendsFeed(trendsFixture, 'US');

  assert.equal(papers.length, 1);
  assert.equal(papers[0].id, '2608.12345');
  assert.equal(papers[0].sourceUrl, 'https://arxiv.org/abs/2608.12345v1');
  assert.deepEqual(papers[0].authors, ['Alex Example']);
  assert.ok(papers[0].topics.includes('robot skin'));
  assert.equal(trends.length, 1);
  assert.equal(trends[0].title, 'humanoid robot');
  assert.equal(trends[0].newsItems[0].url, 'https://example.com/source');
});

test('daily research watch splits the arXiv query into bounded batches', () => {
  const urls = buildArxivUrls();

  assert.equal(urls.length, 8);
  assert.equal(urls.filter((url) => url.searchParams.get('sortBy') === 'lastUpdatedDate').length, 4);
  assert.equal(urls.filter((url) => url.searchParams.get('sortBy') === 'submittedDate').length, 4);
  for (const url of urls) {
    assert.equal(url.origin, 'https://export.arxiv.org');
    assert.equal(url.searchParams.get('max_results'), '12');
    assert.ok(url.searchParams.get('search_query').length <= 200);
  }
});

test('daily research report never presents an arXiv source failure as zero papers', () => {
  const report = buildReport({
    generatedAt: '2026-08-22T01:17:00.000Z',
    papers: [],
    trends: [],
    sourceHealth: {
      arxiv: {
        ok: false,
        partial: false,
        status: 0,
        error: 'batch 1: request timed out; curl fallback failed (exit 28)',
        transport: 'none',
        completedBatches: 0,
        totalBatches: 4,
      },
      trends: [],
    },
  });

  assert.match(report, /arXiv API: FAILED — candidate count unavailable/);
  assert.match(report, /candidate count is unknown, not zero/);
  assert.doesNotMatch(report, /No paper candidates returned/);
});

test('daily research report labels partial arXiv results as incomplete', () => {
  const report = buildReport({
    generatedAt: '2026-08-22T01:17:00.000Z',
    papers: [],
    trends: [],
    sourceHealth: {
      arxiv: {
        ok: false,
        partial: true,
        status: 0,
        error: 'batch 4: connection aborted',
        transport: 'fetch',
        completedBatches: 3,
        totalBatches: 4,
      },
      trends: [],
    },
  });

  assert.match(report, /arXiv API: PARTIAL — 3\/4 query batches succeeded/);
  assert.match(report, /result set is incomplete, not zero/);
  assert.doesNotMatch(report, /No paper candidates returned/);
});

test('daily research report keeps candidates out of the publishing path', async () => {
  const workflow = await readFile('.github/workflows/daily-research-watch.yml', 'utf8');
  const report = buildReport({
    generatedAt: '2026-08-16T01:17:00.000Z',
    papers: parseArxivFeed(arxivFixture),
    trends: parseGoogleTrendsFeed(trendsFixture, 'US'),
    sourceHealth: {
      arxiv: { ok: true, status: 200, error: '' },
      trends: [{ geo: 'US', ok: true, status: 200, error: '' }],
    },
  });

  assert.match(workflow, /cron: "17 1 \* \* \*"/);
  assert.match(workflow, /workflow_dispatch:/);
  assert.match(workflow, /permissions:\s*\n\s*contents: read/);
  assert.match(workflow, /daily-research-watch\.mjs/);
  assert.match(workflow, /actions\/checkout@v7/);
  assert.match(workflow, /actions\/setup-node@v7/);
  assert.match(workflow, /upload-artifact@v7/);
  assert.doesNotMatch(workflow, /git push|contents: write|issues: write/);
  assert.match(report, /candidate queue — nothing in this report is automatically published/);
  assert.match(report, /never publish this queue verbatim/);
  assert.match(report, /Robot Skin for Humanoid Tactile Sensing/);
  assert.match(report, /\| humanoid robot \| \/humanoid-robots \|/);
  assert.match(report, /\| robot manipulation \| \/robot-manipulation \|/);
  assert.match(report, /\| robot VLA \| \/robot-vla-models \|/);
});
