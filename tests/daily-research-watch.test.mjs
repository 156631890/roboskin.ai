import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { buildReport, parseArxivFeed, parseGoogleTrendsFeed } from '../scripts/daily-research-watch.mjs';

const arxivFixture = `<?xml version="1.0"?><feed xmlns="http://www.w3.org/2005/Atom"><entry><id>http://arxiv.org/abs/2608.12345v1</id><updated>2026-08-15T10:00:00Z</updated><published>2026-08-15T10:00:00Z</published><title>Robot Skin for Humanoid Tactile Sensing</title><summary>A tactile sensor array for physical AI contact.</summary><author><name>Alex Example</name></author><category term="cs.RO" /></entry></feed>`;
const trendsFixture = `<?xml version="1.0"?><rss xmlns:ht="https://trends.google.com/trending/rss"><channel><item><title>humanoid robot</title><ht:approx_traffic>20K+</ht:approx_traffic><pubDate>Sat, 15 Aug 2026 00:00:00 GMT</pubDate><link>https://trends.google.com/trending?geo=US</link><ht:news_item><ht:news_item_title>New humanoid robot demonstration</ht:news_item_title><ht:news_item_url>https://example.com/source</ht:news_item_url><ht:news_item_source>Example</ht:news_item_source></ht:news_item></item><item><title>football score</title><ht:approx_traffic>1M+</ht:approx_traffic><pubDate>Sat, 15 Aug 2026 00:00:00 GMT</pubDate><link>https://trends.google.com/trending?geo=US</link></item></channel></rss>`;

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
  assert.match(workflow, /upload-artifact@v4/);
  assert.doesNotMatch(workflow, /git push|contents: write|issues: write/);
  assert.match(report, /candidate queue — nothing in this report is automatically published/);
  assert.match(report, /never publish this queue verbatim/);
  assert.match(report, /Robot Skin for Humanoid Tactile Sensing/);
});
