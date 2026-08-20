import { appendFile, mkdir, writeFile } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { dirname } from 'node:path';
import { promisify } from 'node:util';
import { pathToFileURL } from 'node:url';
import { setTimeout as delay } from 'node:timers/promises';

const ARXIV_ENDPOINT = 'https://export.arxiv.org/api/query';
const GOOGLE_TRENDS_ENDPOINT = 'https://trends.google.com/trending/rss';
const USER_AGENT = 'RoboSkin.ai Research Watch/1.0 (+https://roboskin.ai/editorial-policy)';
const TREND_GEOGRAPHIES = ['US', 'GB', 'DE', 'CA'];
const execFileAsync = promisify(execFile);

const topicMatchers = [
  ['robot learning', /\b(?:robot learning|robotic learning|imitation learning|reinforcement learning for robots?|sim-to-real)\b/i],
  ['robot manipulation', /\b(?:robot(?:ic)? manipulation|dexterous manipulation|contact-rich manipulation)\b/i],
  ['robot VLA', /\b(?:vision-language-action|vision language action|vla)\b/i],
  ['robot foundation model', /\brobot(?:ics)? foundation model\b/i],
  ['robotics', /\brobot(?:s|ics|ic)?\b/i],
  ['humanoid robot', /\bhumanoid(?: robot| robotics)?\b/i],
  ['robot skin', /\brobot(?:ic)? skin\b/i],
  ['electronic skin', /\belectronic skin\b|\be-skin\b/i],
  ['tactile sensing', /\btactile\b/i],
  ['physical AI', /\bphysical ai\b/i],
  ['artificial intelligence', /\bartificial intelligence\b|\bai\b/i],
  ['automation', /\bautomation\b/i],
  ['sensors', /\bsensors?\b/i],
  ['NVIDIA', /\bnvidia\b/i],
  ['Tesla', /\btesla\b/i],
  ['Unitree', /\bunitree\b/i],
  ['Boston Dynamics', /\bboston dynamics\b/i],
  ['Figure AI', /\bfigure ai\b/i],
  ['OpenAI', /\bopenai\b/i],
];

const arxivQuery = [
  'all:"robot skin"',
  'all:"electronic skin" AND (all:robot OR all:robotic)',
  'all:"tactile sensor" AND (all:robot OR all:manipulation)',
  'all:"tactile sensing" AND all:robot',
  'all:"physical AI"',
  'all:"humanoid robot"',
  'all:"robot learning"',
  'all:"robot manipulation"',
  '(all:"vision-language-action" OR all:"vision language action") AND (all:robot OR all:robotics)',
  'all:"visuo-tactile"',
  'all:"tactile world model"',
].map((term) => `(${term})`).join(' OR ');

function decodeXml(value = '') {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractTag(block, tag) {
  const escapedTag = tag.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = block.match(new RegExp(`<${escapedTag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${escapedTag}>`, 'i'));
  return decodeXml(match?.[1]);
}

function extractBlocks(xml, tag) {
  const escapedTag = tag.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return [...xml.matchAll(new RegExp(`<${escapedTag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${escapedTag}>`, 'gi'))]
    .map((match) => match[1]);
}

function matchTopics(text) {
  return topicMatchers.filter(([, matcher]) => matcher.test(text)).map(([label]) => label);
}

export function parseArxivFeed(xml) {
  return extractBlocks(xml, 'entry').map((entry) => {
    const authors = extractBlocks(entry, 'author').map((author) => extractTag(author, 'name')).filter(Boolean);
    const categories = [...entry.matchAll(/<category[^>]*term=["']([^"']+)["'][^>]*\/?\s*>/gi)]
      .map((match) => decodeXml(match[1]));
    const sourceUrl = extractTag(entry, 'id').replace(/^http:/, 'https:');
    const title = extractTag(entry, 'title');
    const summary = extractTag(entry, 'summary');
    const topics = matchTopics(`${title} ${summary}`);

    return {
      id: sourceUrl.split('/').pop()?.replace(/v\d+$/, '') ?? sourceUrl,
      title,
      sourceUrl,
      published: extractTag(entry, 'published'),
      updated: extractTag(entry, 'updated'),
      authors,
      categories,
      summary,
      topics,
      relevanceScore: topics.length,
    };
  }).filter((entry) => entry.title && entry.sourceUrl);
}

export function parseGoogleTrendsFeed(xml, geo) {
  return extractBlocks(xml, 'item').map((item) => {
    const newsItems = extractBlocks(item, 'ht:news_item').map((newsItem) => ({
      title: extractTag(newsItem, 'ht:news_item_title'),
      source: extractTag(newsItem, 'ht:news_item_source'),
      url: extractTag(newsItem, 'ht:news_item_url'),
    })).filter((newsItem) => newsItem.title || newsItem.url);
    const title = extractTag(item, 'title');
    const topics = matchTopics(`${title} ${extractTag(item, 'description')} ${newsItems.map((entry) => entry.title).join(' ')}`);

    return {
      geo,
      title,
      traffic: extractTag(item, 'ht:approx_traffic'),
      published: extractTag(item, 'pubDate'),
      exploreUrl: extractTag(item, 'link'),
      newsItems,
      topics,
    };
  }).filter((entry) => entry.title && entry.topics.length > 0);
}

async function fetchText(url) {
  let fetchError = '';

  try {
    const response = await fetch(url, {
      headers: { 'user-agent': USER_AGENT },
      signal: AbortSignal.timeout(30_000),
    });

    if (response.ok) {
      return { ok: true, status: response.status, error: '', text: await response.text(), transport: 'fetch' };
    }
    fetchError = `HTTP ${response.status}`;
  } catch (error) {
    const causeCode = error instanceof Error && error.cause && typeof error.cause === 'object' && 'code' in error.cause
      ? String(error.cause.code)
      : '';
    fetchError = `${error instanceof Error ? error.message : String(error)}${causeCode ? ` (${causeCode})` : ''}`;
  }

  try {
    const executable = process.platform === 'win32' ? 'curl.exe' : 'curl';
    const { stdout } = await execFileAsync(executable, [
      '--fail',
      '--location',
      '--silent',
      '--show-error',
      '--max-time',
      '30',
      '--header',
      `User-Agent: ${USER_AGENT}`,
      '--header',
      'Accept: application/atom+xml, application/rss+xml, application/xml;q=0.9, text/xml;q=0.8',
      url.toString(),
    ], { encoding: 'utf8', maxBuffer: 5 * 1024 * 1024 });

    return { ok: true, status: 200, error: '', text: stdout, transport: 'curl' };
  } catch (error) {
    const exitCode = error && typeof error === 'object' && 'code' in error ? String(error.code) : 'unknown';
    return { ok: false, status: 0, error: `${fetchError}; curl fallback failed (exit ${exitCode})`, text: '', transport: 'none' };
  }
}

function escapeTable(value) {
  return String(value ?? '').replace(/\|/g, '\\|').replace(/\s+/g, ' ').trim();
}

function truncate(value, length = 520) {
  return value.length <= length ? value : `${value.slice(0, length - 1).trimEnd()}…`;
}

function routePaper(paper) {
  if (paper.topics.includes('robot skin') || paper.topics.includes('electronic skin')) return '/robot-skin';
  if (paper.topics.includes('humanoid robot')) return '/humanoid-robots';
  if (paper.topics.includes('robot VLA') || paper.topics.includes('robot foundation model')) return '/robot-vla-models';
  if (paper.topics.includes('robot learning')) return '/robot-learning';
  if (paper.topics.includes('robot manipulation')) return '/robot-manipulation';
  if (paper.topics.includes('tactile sensing') || paper.topics.includes('sensors')) return '/tactile-ai';
  if (paper.topics.includes('physical AI')) return '/physics-ai';
  return '/research';
}

function shanghaiDateKey(date) {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
}

export function buildReport({ generatedAt, papers, trends, sourceHealth }) {
  const dateKey = shanghaiDateKey(new Date(generatedAt));
  const paperRows = papers.length > 0
    ? papers.slice(0, 10).map((paper) => `| ${paper.published.slice(0, 10)} | [${escapeTable(paper.title)}](${paper.sourceUrl}) | ${escapeTable(paper.topics.join(', ') || 'query match')} | Review for ${routePaper(paper)} | ${paper.relevanceScore} |`).join('\n')
    : '| — | No paper candidates returned | — | — | — |';
  const trendRows = trends.length > 0
    ? trends.map((trend) => `| ${trend.geo} | [${escapeTable(trend.title)}](${trend.exploreUrl}) | ${escapeTable(trend.traffic || 'not reported')} | ${escapeTable(trend.topics.join(', '))} |`).join('\n')
    : '| — | No robotics-related daily trend crossed the filter | — | No relevance inflation |';
  const paperDetails = papers.slice(0, 10).map((paper, index) => [
    `### ${index + 1}. ${paper.title}`,
    '',
    `- Source: ${paper.sourceUrl}`,
    `- Published: ${paper.published || 'not reported'}`,
    `- Authors: ${paper.authors.join(', ') || 'not reported'}`,
    `- Categories: ${paper.categories.join(', ') || 'not reported'}`,
    `- Matched topics: ${paper.topics.join(', ') || 'query match only'}`,
    `- Evidence stage: arXiv preprint; automated discovery only`,
    `- Proposed action: review the full paper for a possible update to ${routePaper(paper)}; do not create a URL at queue stage`,
    `- Evidence limitation: abstract-level metadata only; reported values and claims have not yet been checked against the full paper`,
    `- Abstract excerpt: ${truncate(paper.summary)}`,
  ].join('\n')).join('\n\n');

  return `# RoboSkin.ai Daily Research Watch — ${dateKey}

Generated: ${generatedAt}
Editorial status: **candidate queue — nothing in this report is automatically published**

## Source health

- arXiv API: ${sourceHealth.arxiv.ok ? `OK via ${sourceHealth.arxiv.transport || 'fetch'} (${papers.length} parsed candidates)` : `FAILED — ${sourceHealth.arxiv.error}`}
${sourceHealth.trends.map((source) => `- Google Trends ${source.geo}: ${source.ok ? `OK via ${source.transport || 'fetch'}` : `FAILED — ${source.error}`}`).join('\n')}

## Priority paper candidates

| Published | Paper | Matched topic | Proposed action | Score |
| --- | --- | --- | --- | ---: |
${paperRows}

${paperDetails || 'No paper detail is available for this run.'}

## Google Trends daily signals

The RSS filter checks current daily searches in the United States, United Kingdom, Germany, and Canada. A blank result means no robotics-related term crossed the relevance filter; it is not converted into a fabricated trend.

| Market | Query | Approximate traffic | Matched topic |
| --- | --- | --- | --- |
${trendRows}

## Stable keyword-cluster checks

| Large term | Canonical route | Daily role |
| --- | --- | --- |
| robotics | /research | Broad discovery term; route visitors into source-backed research rather than a thin generic page. |
| Physical AI | /physics-ai | Own the definition and connect physical intelligence to touch, control, and evidence. |
| humanoid robot | /humanoid-robots | Connect the broad embodiment term to Physical AI, whole-body touch, hands, and safety evidence. |
| robot learning | /robot-learning | Track demonstrations, reinforcement, robot datasets, sim-to-real transfer, tactile feedback, and real-world evaluation. |
| robot manipulation | /robot-manipulation | Track learning, grasping, dexterity, contact-rich control, and tactile feedback. |
| robot VLA | /robot-vla-models | Track vision-language-action models, robot foundation models, data, and evaluation. |
| robot skin | /robot-skin | Preserve the site's core topical authority and commercial-intent entry point. |
| tactile sensor | /guides/tactile-sensor-for-robots | Capture component-level intent and route readers into benchmarks and the research index. |

- [Robotics / humanoid robot / robot manipulation / Physical AI / vision-language-action](https://trends.google.com/trends/explore?q=robotics,humanoid%20robot,robot%20manipulation,Physical%20AI,vision-language-action&hl=en)
- [Robot learning / imitation learning / reinforcement learning robotics / sim-to-real / robot datasets](https://trends.google.com/trends/explore?q=robot%20learning,imitation%20learning,reinforcement%20learning%20robotics,sim-to-real,robot%20datasets&hl=en)
- [Robot skin / electronic skin / tactile sensor / Physical AI / humanoid robot](https://trends.google.com/trends/explore?date=today%205-y&q=robot%20skin,electronic%20skin,tactile%20sensor,physical%20AI,humanoid%20robot)

## Editorial next action

1. Select at most one candidate with a primary source and a real evidence gap.
2. Read the full paper before drafting; verify values, dates, limitations, affiliations, and evidence status.
3. Prefer updating an existing canonical page when the search intent is already covered.
4. Publish a new URL only when it adds distinct source-backed value; never publish this queue verbatim.
5. Record the accepted or rejected decision in the next editorial update.
`;
}

export async function runResearchWatch({ outputPath = '.artifacts/daily-research-watch.md', now = new Date() } = {}) {
  const arxivUrl = new URL(ARXIV_ENDPOINT);
  arxivUrl.search = new URLSearchParams({
    search_query: arxivQuery,
    start: '0',
    max_results: '30',
    sortBy: 'submittedDate',
    sortOrder: 'descending',
  }).toString();

  const arxivResponse = await fetchText(arxivUrl);
  const trendResponses = [];

  for (const geo of TREND_GEOGRAPHIES) {
    trendResponses.push(await fetchText(`${GOOGLE_TRENDS_ENDPOINT}?geo=${geo}`));
    await delay(350);
  }

  const papers = arxivResponse.ok
    ? parseArxivFeed(arxivResponse.text).sort((a, b) => b.relevanceScore - a.relevanceScore || b.published.localeCompare(a.published))
    : [];
  const trends = trendResponses.flatMap((response, index) => response.ok
    ? parseGoogleTrendsFeed(response.text, TREND_GEOGRAPHIES[index])
    : []);
  const sourceHealth = {
    arxiv: { ok: arxivResponse.ok, status: arxivResponse.status, error: arxivResponse.error, transport: arxivResponse.transport },
    trends: trendResponses.map((response, index) => ({
      geo: TREND_GEOGRAPHIES[index],
      ok: response.ok,
      status: response.status,
      error: response.error,
      transport: response.transport,
    })),
  };
  const generatedAt = now.toISOString();
  const report = buildReport({ generatedAt, papers, trends, sourceHealth });
  const jsonPath = outputPath.replace(/\.md$/i, '.json');

  await mkdir(dirname(outputPath), { recursive: true });
  await Promise.all([
    writeFile(outputPath, report, 'utf8'),
    writeFile(jsonPath, `${JSON.stringify({ generatedAt, papers, trends, sourceHealth }, null, 2)}\n`, 'utf8'),
  ]);

  if (process.env.GITHUB_STEP_SUMMARY) {
    await appendFile(process.env.GITHUB_STEP_SUMMARY, report, 'utf8');
  }

  console.log(`Research watch wrote ${papers.length} paper candidates and ${trends.length} trend matches to ${outputPath}`);

  if (!arxivResponse.ok && trendResponses.every((response) => !response.ok)) {
    process.exitCode = 1;
  }

  return { outputPath, jsonPath, papers, trends, sourceHealth };
}

const isDirectRun = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;

if (isDirectRun) {
  await runResearchWatch({ outputPath: process.argv[2] || '.artifacts/daily-research-watch.md' });
}
