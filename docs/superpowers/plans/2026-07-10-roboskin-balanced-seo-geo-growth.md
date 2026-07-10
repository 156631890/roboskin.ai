# RoboSkin Balanced SEO and GEO Growth Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a reproducible, source-backed SEO and GEO upgrade that preserves every production URL, consolidates the apex host, improves the seven audited GSC pages, publishes an original research index, and gates discovery submissions behind production verification.

**Architecture:** Keep the existing Next.js App Router static-export architecture and the current content modules. Add narrowly scoped content-derived outputs for the research index, CSV, JSON, and RSS; protect the production URL inventory at build time; and use standalone Node scripts for deployment verification and IndexNow submission. GitHub `main` remains the production source of truth, and every production submission runs only after the deployed commit passes the same URL, canonical, schema, and output checks used locally.

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript, Node.js built-in test runner, ESLint, Vercel, GitHub Actions, Google Search Console, IndexNow.

---

## Working State and Boundaries

The repository already contains relevant uncommitted SEO work. Preserve and integrate these files; do not reset, discard, or replace them with the versions from `main`:

```text
docs/seo/search-console-monitoring.md
public/llms.txt
src/app/news/page.tsx
src/app/page.tsx
src/app/research/[id]/page.tsx
src/app/sitemap.ts
src/content/site.ts
src/lib/blog-data.ts
src/lib/seo.ts
tests/homepage-branding.test.mjs
tests/research-content.test.mjs
src/app/news/[id]/page.tsx
src/components/ArticleBody.tsx
src/lib/news-data.ts
tests/research-news-structured-data.test.mjs
```

This plan does not add a CMS, database, hosted search, multilingual routes, bulk content generation, or a site-wide redesign. It does not promise rankings, rich results, backlinks, or AI citations.

## File Responsibility Map

**Existing files to modify**

- `package.json`: local verification, export verification, and IndexNow command entry points.
- `vercel.json`: explicit `www` root redirect plus path-preserving deep redirects.
- `.github/workflows/deploy.yml`: test, lint, build, and export-contract gates before deployment.
- `src/content/site.ts`: factual organization and editorial-team identity.
- `src/lib/blog-data.ts`: institutional research bylines and bounded first-batch page improvements.
- `src/lib/news-data.ts`: institutional news bylines and restoration of two production URLs.
- `src/lib/seo.ts`: apex canonicals, editorial author entity, publisher logo, page metadata, and dataset schema builders.
- `src/app/editorial-policy/page.tsx`: visible editorial method, corrections route, and institutional author identity.
- `src/app/research/page.tsx`: prominent route to the research index.
- `src/app/research/robot-skin-papers/page.tsx`: answer-first copy and research-index link.
- `src/app/sitemap.ts`: content-derived research, news, and research-index routes.
- `src/content/site.ts`, `src/app/page.tsx`, `public/llms.txt`: restrained internal discovery links.
- `docs/seo/search-console-monitoring.md`: Day 0, 7, 28, and 90 measurement procedure.

**Focused files to create**

- `config/protected-urls.json`: immutable inventory of the 65 audited production sitemap URLs.
- `config/protected-redirects.json`: explicit mapping for any future protected URL intentionally replaced by a permanent redirect; initially `{}`.
- `scripts/snapshot-production-urls.mjs`: one-time production sitemap inventory generator.
- `scripts/verify-export.mjs`: static-output URL-contract and machine-output verifier.
- `scripts/verify-production.mjs`: preview/production HTTP, canonical, redirect, and output verifier.
- `scripts/configure-indexnow.mjs`: stable public IndexNow key generator.
- `scripts/submit-indexnow.mjs`: verification-gated IndexNow submission client.
- `src/lib/research-index.ts`: normalized seven-record research dataset and serializers.
- `src/components/ResearchIndexExplorer.tsx`: optional client-side filtering over server-rendered records.
- `src/app/research-index/page.tsx`: indexable research-index page, method, limits, and downloads.
- `src/app/research-index.csv/route.ts`: static CSV response.
- `src/app/research-index.json/route.ts`: static JSON response.
- `src/lib/feed.ts`: canonical RSS serialization from research and news data.
- `src/app/feed.xml/route.ts`: static RSS response.
- `tests/url-contract.test.mjs`: protected URL and redirect configuration checks.
- `tests/editorial-identity.test.mjs`: visible and structured institutional identity checks.
- `tests/research-index.test.mjs`: dataset/page/export/schema consistency checks.
- `tests/discovery-output.test.mjs`: RSS, IndexNow, CI, and verifier contract checks.
- `docs/seo/research-index-outreach.md`: manual, legitimate citation outreach workflow.

## Task 1: Preserve the Worktree and Record a Green Baseline

**Files:**
- Inspect: all currently modified and untracked files listed above
- No source edits

- [ ] **Step 1: Confirm the repository and current branch**

Run:

```powershell
git rev-parse --show-toplevel
git branch --show-current
git status --short
```

Expected: the top level is `C:/Users/Administrator/roboskin.ai`, the starting branch is `main`, and the relevant uncommitted files remain visible.

- [ ] **Step 2: Create an implementation branch without cleaning the worktree**

Run:

```powershell
git switch -c feat/roboskin-balanced-seo-geo
```

Expected: `Switched to a new branch 'feat/roboskin-balanced-seo-geo'`. The same modified and untracked files remain present.

- [ ] **Step 3: Run the existing baseline checks**

Run:

```powershell
node --test tests/*.test.mjs
npm run lint
npm run build
```

Expected: 18 current tests pass, ESLint exits 0, and Next.js generates the static `out/` export. If the test count has increased because the preserved worktree changed, record the actual passing count instead of forcing 18.

- [ ] **Step 4: Record the starting diff without staging it**

Run:

```powershell
git diff --stat
git status --short
```

Expected: no file is staged and no existing change has disappeared.

## Task 2: Lock the Production URL Contract and Restore At-Risk News

**Files:**
- Create: `scripts/snapshot-production-urls.mjs`
- Create: `config/protected-urls.json`
- Create: `config/protected-redirects.json`
- Create: `tests/url-contract.test.mjs`
- Modify: `src/lib/news-data.ts`
- Modify: `src/app/sitemap.ts`

- [ ] **Step 1: Write the failing URL-contract test**

Create `tests/url-contract.test.mjs`:

```js
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');

test('the audited production URL inventory is protected', async () => {
  const protectedUrls = JSON.parse(await read('config/protected-urls.json'));
  const redirects = JSON.parse(await read('config/protected-redirects.json'));

  assert.equal(protectedUrls.length, 65);
  assert.equal(new Set(protectedUrls).size, protectedUrls.length);
  assert.ok(protectedUrls.every((url) => url.startsWith('https://roboskin.ai/')));
  assert.ok(protectedUrls.every((url) => !url.startsWith('https://www.roboskin.ai/')));
  assert.ok(protectedUrls.includes('https://roboskin.ai/news/service-robots-200000-units-logistics-tactile-ai'));
  assert.ok(protectedUrls.includes('https://roboskin.ai/news/electronic-skin-research-robot-skin-systems-problem'));
  assert.deepEqual(redirects, {});
});

test('the two production-only news routes remain in local content and sitemap generation', async () => {
  const [newsData, sitemap] = await Promise.all([
    read('src/lib/news-data.ts'),
    read('src/app/sitemap.ts'),
  ]);

  for (const id of [
    'service-robots-200000-units-logistics-tactile-ai',
    'electronic-skin-research-robot-skin-systems-problem',
  ]) {
    assert.match(newsData, new RegExp(`id: '${id}'`));
  }

  assert.match(sitemap, /newsPosts\.map/);
  assert.match(sitemap, /`\/news\/\$\{post\.id\}`/);
});
```

- [ ] **Step 2: Run the test and confirm the missing contract**

Run:

```powershell
node --test tests/url-contract.test.mjs
```

Expected: FAIL because `config/protected-urls.json` does not exist and the two news IDs are absent locally.

- [ ] **Step 3: Add the one-time production sitemap snapshot script**

Create `scripts/snapshot-production-urls.mjs`:

```js
import { mkdir, writeFile } from 'node:fs/promises';

const sitemapUrl = 'https://roboskin.ai/sitemap.xml';
const response = await fetch(sitemapUrl, {
  headers: { 'user-agent': 'RoboSkin URL contract snapshot/1.0' },
});

if (!response.ok) {
  throw new Error(`Could not fetch ${sitemapUrl}: ${response.status}`);
}

const xml = await response.text();
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map((match) => match[1].trim())
  .filter((url) => url.startsWith('https://roboskin.ai/'))
  .sort();

if (urls.length !== 65) {
  throw new Error(`Expected the audited 65 production URLs, received ${urls.length}`);
}

await mkdir(new URL('../config/', import.meta.url), { recursive: true });
await writeFile(
  new URL('../config/protected-urls.json', import.meta.url),
  `${JSON.stringify(urls, null, 2)}\n`,
  'utf8',
);
await writeFile(
  new URL('../config/protected-redirects.json', import.meta.url),
  '{}\n',
  { encoding: 'utf8', flag: 'wx' },
).catch((error) => {
  if (error.code !== 'EEXIST') throw error;
});

console.log(`Protected ${urls.length} production URLs from ${sitemapUrl}`);
```

- [ ] **Step 4: Generate and inspect the protected inventory**

Run:

```powershell
node scripts/snapshot-production-urls.mjs
Get-Content config/protected-urls.json
```

Expected: the script reports 65 URLs; every entry uses `https://roboskin.ai`; both production-only news URLs are present.

- [ ] **Step 5: Restore the service-robot news record**

Insert this complete `NewsPost` object in `newsPosts` in `src/lib/news-data.ts`:

```ts
{
  id: 'service-robots-200000-units-logistics-tactile-ai',
  title: 'Service robot sales passed 200,000 units: logistics makes tactile AI practical',
  excerpt:
    'IFR service-robot data and Amazon Vulcan show why higher deployment volume makes contact sensing, safe handling, and tactile control operational concerns.',
  content: `# Service robot sales passed 200,000 units: logistics makes tactile AI practical

**News brief - June 2026**

The International Federation of Robotics reported that professional service robot sales exceeded 200,000 units in 2024. Transportation and logistics remained the largest application group. This is relevant to tactile AI because logistics robots repeatedly handle packages, shelves, totes, and irregular contact conditions at operational scale.

## Source findings

IFR describes continuing growth in professional service robots, led by transport and logistics. Amazon separately introduced Vulcan, a warehouse robot designed to use touch while stowing and picking items. Amazon states that the system combines force feedback with other perception and planning methods so it can detect and respond to contact during manipulation.

## RoboSkin analysis

The two sources describe different evidence: IFR reports market activity, while Amazon describes one deployed manipulation system. Together they show why touch is becoming an engineering interface rather than a laboratory accessory. A logistics robot must distinguish expected contact from a jam, excessive force, a shifted package, or a failed grasp.

## Engineering implications

Useful tactile systems need more than sensor sensitivity. They need calibrated contact values, timestamps, robot-frame context, replayable logs, controller thresholds, and maintainable hardware. Fleet scale also makes replacement, drift detection, and diagnostics important.

## What the sources do not prove

The sales total does not show that every service robot uses tactile sensing. Vulcan does not establish a universal sensor architecture for logistics. The cautious conclusion is that contact-aware manipulation has clear operational value where robots physically interact with cluttered inventory.

## Sources

- [IFR: Service robots see global growth boom](https://ifr.org/ifr-press-releases/news/service-robots-see-global-growth-boom)
- [Amazon: Vulcan robot uses touch for picking and stowing](https://www.aboutamazon.com/news/operations/amazon-vulcan-robot-pick-stow-touch)
- [Amazon Science: How Vulcan robots use touch](https://www.amazon.science/blog/how-amazons-vulcan-robots-use-touch-to-plan-and-execute-motions)
`,
  author: 'RoboSkin.ai Editorial Team',
  date: '2026-06-22',
  updated: '2026-07-10',
  readTime: '4 min read',
  category: 'Industry data',
  image: '/generated/pages/application-contexts.webp',
  sourceTitle: 'IFR service robot market report',
  sourceUrl: 'https://ifr.org/ifr-press-releases/news/service-robots-see-global-growth-boom',
  sources: [
    {
      title: 'IFR: Service robots see global growth boom',
      url: 'https://ifr.org/ifr-press-releases/news/service-robots-see-global-growth-boom',
    },
    {
      title: 'Amazon: Vulcan robot uses touch for picking and stowing',
      url: 'https://www.aboutamazon.com/news/operations/amazon-vulcan-robot-pick-stow-touch',
    },
    {
      title: 'Amazon Science: How Vulcan robots use touch',
      url: 'https://www.amazon.science/blog/how-amazons-vulcan-robots-use-touch-to-plan-and-execute-motions',
    },
  ],
  technicalFocus: ['service robots', 'logistics robotics', 'Amazon Vulcan', 'tactile AI'],
},
```

- [ ] **Step 6: Restore the electronic-skin news record**

Insert this complete `NewsPost` object in `newsPosts` in `src/lib/news-data.ts`:

```ts
{
  id: 'electronic-skin-research-robot-skin-systems-problem',
  title: 'Electronic skin research is becoming a robot skin systems problem',
  excerpt:
    'Cambridge and UCL research shows that large-area e-skin progress depends on sensing, wiring, calibration, damage tolerance, and control integration working together.',
  content: `# Electronic skin research is becoming a robot skin systems problem

**News brief - June 2026**

Recent UK research highlights a shift from isolated tactile patches toward larger, conformable electronic skin systems. University of Cambridge researchers reported a single-material robotic skin that can sense multiple forms of contact across a flexible surface. UCL researchers separately reported an electronic skin designed to improve touch sensing and damage tolerance.

## Source findings

The Cambridge work emphasizes a single-material approach and distributed sensing over complex shapes. The UCL work emphasizes robust sensing and the practical difficulty of maintaining useful signals when a soft surface bends, stretches, or is damaged.

## RoboSkin analysis

The central engineering problem is no longer only whether a material changes electrically under pressure. A robot skin system also needs scalable electrodes, calibration, localization, multiplexing, noise control, packaging, repair strategy, data transport, and a controller that can act on the signal.

## Engineering implications

Researchers and engineers should compare e-skin work across the complete path from material response to robot behavior. Important questions include which modalities are separable, how spatial location is reconstructed, how drift is handled, what happens after damage, and whether the data can be synchronized with robot state.

## What the sources do not prove

These studies do not establish immediate commercial readiness or one best architecture for all robot bodies. They support a narrower conclusion: large-area robot skin must be evaluated as a sensing and integration system, not only as a material sample.

## Sources

- [University of Cambridge: Robotic skin gives robots a human-like sense of touch](https://www.cam.ac.uk/stories/robotic-skin)
- [UCL: Improved electronic skin gives robots a human touch](https://www.ucl.ac.uk/news/2025/jun/improved-electronic-skin-gives-robots-human-touch)
- [Cambridge Engineering: Research breakthrough gives robots human-like touch](https://elec.eng.cam.ac.uk/news/cambridge-research-breakthrough-gives-robots-a-human-like-sense-of-touch/)
`,
  author: 'RoboSkin.ai Editorial Team',
  date: '2026-06-22',
  updated: '2026-07-10',
  readTime: '4 min read',
  category: 'Electronic skin',
  image: '/generated/authority/research-soft-robotic-skin.webp',
  sourceTitle: 'University of Cambridge robotic skin research',
  sourceUrl: 'https://www.cam.ac.uk/stories/robotic-skin',
  sources: [
    {
      title: 'University of Cambridge: Robotic skin gives robots a human-like sense of touch',
      url: 'https://www.cam.ac.uk/stories/robotic-skin',
    },
    {
      title: 'UCL: Improved electronic skin gives robots a human touch',
      url: 'https://www.ucl.ac.uk/news/2025/jun/improved-electronic-skin-gives-robots-human-touch',
    },
    {
      title: 'Cambridge Engineering: Research breakthrough gives robots human-like touch',
      url: 'https://elec.eng.cam.ac.uk/news/cambridge-research-breakthrough-gives-robots-a-human-like-sense-of-touch/',
    },
  ],
  technicalFocus: ['electronic skin', 'large-area sensing', 'damage tolerance', 'robot skin systems'],
},
```

- [ ] **Step 7: Run the focused test and build**

Run:

```powershell
node --test tests/url-contract.test.mjs
npm run build
```

Expected: the URL-contract tests pass; the build exports both restored news routes and includes them in `out/sitemap.xml`.

- [ ] **Step 8: Commit the URL contract and restored content**

Run:

```powershell
git add config/protected-urls.json config/protected-redirects.json scripts/snapshot-production-urls.mjs tests/url-contract.test.mjs src/lib/news-data.ts src/app/sitemap.ts src/app/news src/components/ArticleBody.tsx
git commit -m "fix: preserve production news and URL contract"
```

Expected: one commit containing the URL inventory, both restored news records, and the already-preserved local news route implementation.

## Task 3: Enforce Apex Canonicals and Export-Level URL Protection

**Files:**
- Modify: `vercel.json`
- Create: `scripts/verify-export.mjs`
- Modify: `package.json`
- Modify: `tests/url-contract.test.mjs`

- [ ] **Step 1: Extend the failing test for the `www` root and export verifier**

Append to `tests/url-contract.test.mjs`:

```js
test('www root and deep paths have explicit permanent redirects', async () => {
  const vercel = JSON.parse(await read('vercel.json'));
  const redirects = vercel.redirects;

  assert.ok(redirects.some((rule) =>
    rule.source === '/' &&
    rule.destination === 'https://roboskin.ai' &&
    rule.permanent === true &&
    rule.has?.some((condition) => condition.type === 'host' && condition.value === 'www.roboskin.ai')
  ));
  assert.ok(redirects.some((rule) =>
    rule.source === '/:path*' &&
    rule.destination === 'https://roboskin.ai/:path*' &&
    rule.permanent === true
  ));
});

test('the export verifier checks protected URLs, canonicals, and generated outputs', async () => {
  const verifier = await read('scripts/verify-export.mjs');
  assert.match(verifier, /protected-urls\.json/);
  assert.match(verifier, /protected-redirects\.json/);
  assert.match(verifier, /rel=["']canonical["']/);
  assert.match(verifier, /research-index\.csv/);
  assert.match(verifier, /research-index\.json/);
  assert.match(verifier, /feed\.xml/);
});
```

- [ ] **Step 2: Run the focused test and verify the root rule is missing**

Run:

```powershell
node --test tests/url-contract.test.mjs
```

Expected: FAIL because the explicit `/` host redirect and export verifier do not exist.

- [ ] **Step 3: Add the explicit root redirect before the catch-all**

Replace `vercel.json` with:

```json
{
  "redirects": [
    {
      "source": "/",
      "has": [
        {
          "type": "host",
          "value": "www.roboskin.ai"
        }
      ],
      "destination": "https://roboskin.ai",
      "permanent": true
    },
    {
      "source": "/:path*",
      "has": [
        {
          "type": "host",
          "value": "www.roboskin.ai"
        }
      ],
      "destination": "https://roboskin.ai/:path*",
      "permanent": true
    }
  ]
}
```

- [ ] **Step 4: Create the static export verifier**

Create `scripts/verify-export.mjs`:

```js
import { access, readFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const out = path.join(root, 'out');
const protectedUrls = JSON.parse(await readFile(path.join(root, 'config/protected-urls.json'), 'utf8'));
const redirects = JSON.parse(await readFile(path.join(root, 'config/protected-redirects.json'), 'utf8'));

const exists = async (file) => access(file).then(() => true, () => false);
const candidatesFor = (pathname) => {
  if (pathname === '/') return [path.join(out, 'index.html')];
  const relative = pathname.replace(/^\//, '');
  return [path.join(out, `${relative}.html`), path.join(out, relative, 'index.html')];
};

const failures = [];
for (const absoluteUrl of protectedUrls) {
  const { pathname } = new URL(absoluteUrl);
  const candidates = candidatesFor(pathname);
  const outputFile = (await Promise.all(candidates.map(async (file) => [file, await exists(file)])))
    .find(([, present]) => present)?.[0];

  if (!outputFile) {
    if (!redirects[pathname]) failures.push(`${pathname}: missing export and redirect`);
    continue;
  }

  const html = await readFile(outputFile, 'utf8');
  const expectedCanonical = new URL(pathname, 'https://roboskin.ai').href;
  const canonicalMatch = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i)
    ?? html.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i);
  if (!canonicalMatch || canonicalMatch[1] !== expectedCanonical) {
    failures.push(`${pathname}: expected canonical ${expectedCanonical}`);
  }
}

for (const file of ['sitemap.xml', 'research-index.csv', 'research-index.json', 'feed.xml']) {
  if (!(await exists(path.join(out, file)))) failures.push(`/${file}: missing generated output`);
}

if (failures.length > 0) {
  throw new Error(`Export verification failed:\n${failures.join('\n')}`);
}

console.log(`Verified ${protectedUrls.length} protected URLs and four discovery outputs`);
```

- [ ] **Step 5: Add package scripts**

Merge these entries into `package.json` `scripts`:

```json
{
  "test": "node --test tests/*.test.mjs",
  "verify:export": "node scripts/verify-export.mjs",
  "indexnow:configure": "node scripts/configure-indexnow.mjs",
  "indexnow:submit": "node scripts/submit-indexnow.mjs"
}
```

The export verifier is expected to fail until Tasks 6-8 add the CSV, JSON, and RSS outputs.

- [ ] **Step 6: Run the focused source test**

Run:

```powershell
node --test tests/url-contract.test.mjs
```

Expected: PASS.

- [ ] **Step 7: Commit the canonical and verifier foundation**

Run:

```powershell
git add vercel.json scripts/verify-export.mjs package.json tests/url-contract.test.mjs
git commit -m "test: enforce canonical host and export contract"
```

Expected: one focused commit; do not run `npm run verify:export` yet because the machine-readable outputs are introduced later.

## Task 4: Unify the Institutional Editorial Identity and Schema

**Files:**
- Create: `tests/editorial-identity.test.mjs`
- Modify: `src/content/site.ts`
- Modify: `src/lib/blog-data.ts`
- Modify: `src/lib/news-data.ts`
- Modify: `src/lib/seo.ts`
- Modify: `src/app/editorial-policy/page.tsx`

- [ ] **Step 1: Write the failing institutional identity test**

Create `tests/editorial-identity.test.mjs`:

```js
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');

test('visible content uses one institutional editorial team', async () => {
  const [site, blog, news, policy] = await Promise.all([
    read('src/content/site.ts'),
    read('src/lib/blog-data.ts'),
    read('src/lib/news-data.ts'),
    read('src/app/editorial-policy/page.tsx'),
  ]);

  assert.match(site, /name: 'RoboSkin\.ai Editorial Team'/);
  assert.match(site, /path: '\/editorial-policy'/);
  assert.match(site, /logo: '\/favicon\.svg'/);
  assert.doesNotMatch(`${blog}\n${news}`, /RoboSkin technical editor/);
  assert.match(policy, /RoboSkin\.ai Editorial Team/);
  assert.match(policy, /Corrections and material revisions/);
  assert.match(policy, /Research review method/);
});

test('article authors and the publisher resolve to factual organization nodes', async () => {
  const seo = await read('src/lib/seo.ts');

  assert.match(seo, /#editorial-team/);
  assert.match(seo, /post\.author/);
  assert.match(seo, /#organization/);
  assert.match(seo, /'@type': 'ImageObject'/);
  assert.match(seo, /site\.editorial\.logo/);
  assert.doesNotMatch(seo, /sameAs:/);
});
```

- [ ] **Step 2: Run the test and confirm identity drift**

Run:

```powershell
node --test tests/editorial-identity.test.mjs
```

Expected: FAIL because old bylines remain and the editorial entity is not centralized.

- [ ] **Step 3: Add factual editorial identity to site content**

Add this property to `site` in `src/content/site.ts`:

```ts
editorial: {
  name: 'RoboSkin.ai Editorial Team',
  path: '/editorial-policy',
  logo: '/favicon.svg',
},
```

- [ ] **Step 4: Replace all research and news bylines**

In `src/lib/blog-data.ts` and `src/lib/news-data.ts`, replace every exact value:

```ts
author: 'RoboSkin technical editor',
```

with:

```ts
author: 'RoboSkin.ai Editorial Team',
```

Run:

```powershell
rg "author:|RoboSkin technical editor" src/lib/blog-data.ts src/lib/news-data.ts
```

Expected: every `author:` line uses `RoboSkin.ai Editorial Team`; the old string has zero matches.

- [ ] **Step 5: Make article author and publisher JSON-LD consistent**

Add this helper in `src/lib/seo.ts` and use it as the `author` in both `buildArticleJsonLd` and `buildNewsArticleJsonLd`:

```ts
function buildEditorialTeamJsonLd(authorName: string) {
  return {
    '@type': 'Organization',
    '@id': `${canonicalUrl(site.editorial.path)}#editorial-team`,
    name: authorName,
    url: canonicalUrl(site.editorial.path),
  };
}
```

Use this publisher shape in `buildOrganizationJsonLd` and reference its `@id` from both article builders:

```ts
{
  '@type': 'Organization',
  '@id': `${site.url}/#organization`,
  name: site.name,
  url: site.url,
  description: site.description,
  email: site.contact.primaryEmail,
  logo: {
    '@type': 'ImageObject',
    '@id': `${site.url}/#logo`,
    url: canonicalUrl(site.editorial.logo),
  },
}
```

Article fields must use:

```ts
author: buildEditorialTeamJsonLd(post.author),
publisher: { '@id': `${site.url}/#organization` },
```

- [ ] **Step 6: Expand the visible editorial policy**

Add two sections to `src/app/editorial-policy/page.tsx` with these exact headings and content responsibilities:

```tsx
<section className="deferred-section mt-10 grid gap-6 lg:grid-cols-2">
  <div className="signal-panel p-6 md:p-8">
    <p className="eyebrow">Research review method</p>
    <h2 className="mt-4 text-2xl font-semibold text-white">How the RoboSkin.ai Editorial Team reviews sources</h2>
    <p className="mt-4 text-sm leading-relaxed text-soft">
      The RoboSkin.ai Editorial Team starts with the cited paper, institutional release, standards documentation, or project documentation. Reviews separate source-reported findings from RoboSkin.ai analysis, retain the public source link, identify evidence limits, and update the modified date when a material interpretation changes.
    </p>
  </div>
  <div className="signal-panel p-6 md:p-8">
    <p className="eyebrow">Corrections and material revisions</p>
    <h2 className="mt-4 text-2xl font-semibold text-white">Corrections remain visible and traceable</h2>
    <p className="mt-4 text-sm leading-relaxed text-soft">
      Readers can submit a correction through the research contact route. Material factual changes receive a revised modified date and a short revision note in the affected article. Typographic changes do not receive a claim-level revision note.
    </p>
    <Link href="/contact?requestType=research" className="mt-5 inline-flex text-sm font-semibold text-accent hover:text-white">
      Submit a correction {'->'}
    </Link>
  </div>
</section>
```

- [ ] **Step 7: Run identity, structured-data, lint, and build checks**

Run:

```powershell
node --test tests/editorial-identity.test.mjs tests/research-news-structured-data.test.mjs
npm run lint
npm run build
```

Expected: all focused tests pass; ESLint and build exit 0. Inspect one generated research page and one news page to confirm the visible byline and JSON-LD both say `RoboSkin.ai Editorial Team`.

- [ ] **Step 8: Commit the editorial entity**

Run:

```powershell
git add src/content/site.ts src/lib/blog-data.ts src/lib/news-data.ts src/lib/seo.ts src/app/editorial-policy/page.tsx tests/editorial-identity.test.mjs tests/research-news-structured-data.test.mjs
git commit -m "feat: establish institutional editorial identity"
```

Expected: a focused commit with no invented credentials, affiliations, awards, offices, or social profiles.

## Task 5: Complete the Seven-Page GSC Priority Treatment

**Files:**
- Modify: `src/lib/blog-data.ts`
- Modify: `src/lib/seo.ts`
- Modify: `src/app/research/page.tsx`
- Modify: `src/app/research/robot-skin-papers/page.tsx`
- Modify: `src/app/research/[id]/page.tsx`
- Modify: `src/components/ArticleBody.tsx`
- Modify: `tests/research-content.test.mjs`
- Modify: `tests/research-news-structured-data.test.mjs`

- [ ] **Step 1: Add failing assertions for the exact first-cycle page set**

Add this test to `tests/research-content.test.mjs`:

```js
test('the audited GSC priority pages own one query-aligned treatment', async () => {
  const [seo, blog, research, papers] = await Promise.all([
    read('src/lib/seo.ts'),
    read('src/lib/blog-data.ts'),
    read('src/app/research/page.tsx'),
    read('src/app/research/robot-skin-papers/page.tsx'),
  ]);

  const prioritySignals = [
    'Dream-Tac: A Unified Tactile World-Action Model',
    'Single-material soft robotic skin',
    'FreeTacMan robot-free visuo-tactile data collection',
    'Sparsh-X multisensory touch representations',
    'GenForce transferable force sensing',
  ];

  for (const signal of prioritySignals) assert.match(blog, new RegExp(signal));
  assert.match(seo, /Robot Skin, Tactile AI, and Physical AI Research Map/);
  assert.match(seo, /Robot Skin Papers and Tactile Sensing Research Index/);
  assert.match(research, /Browse the tactile research index/);
  assert.match(papers, /Open the structured research index/);
});
```

Extend the existing priority article test in `tests/research-news-structured-data.test.mjs` so each of these five IDs is checked for all four visible boundaries:

```js
const priorityIds = [
  'dream-tac-tactile-world-action-model-2026',
  'single-material-soft-robotic-skin-2025',
  'freetacman-robot-free-visuotactile-data-collection-2025',
  'sparsh-x-multisensory-touch-representations-2025',
  'genforce-transferable-force-sensing-2026',
];
const requiredHeadings = [
  'Source findings',
  'RoboSkin analysis',
  'Engineering implications',
  'What this does not prove yet',
];
for (const id of priorityIds) {
  const start = blogData.indexOf(`id: '${id}'`);
  assert.notEqual(start, -1, `missing priority article ${id}`);
  const next = blogData.indexOf("\n  {\n    id: '", start + id.length);
  const record = blogData.slice(start, next === -1 ? blogData.length : next);
  for (const heading of requiredHeadings) {
    assert.match(record, new RegExp(heading), `${id} is missing ${heading}`);
  }
  const internalLinks = record.match(/\]\(\/[a-z0-9/?=-]+\)/g) ?? [];
  assert.ok(internalLinks.length >= 2 && internalLinks.length <= 4, `${id} must contain 2-4 internal links`);
}
```

- [ ] **Step 2: Run the focused tests and record only missing signals**

Run:

```powershell
node --test tests/research-content.test.mjs tests/research-news-structured-data.test.mjs
```

Expected: FAIL only on title, answer-first, section-boundary, or internal-link signals that the preserved worktree has not completed.

- [ ] **Step 3: Align titles and snippets without adding new synonym pages**

In `src/lib/blog-data.ts`, keep the existing IDs and source URLs. Use these title prefixes and retain a clear analysis suffix only when the full title stays readable:

```text
Dream-Tac: A Unified Tactile World-Action Model for Contact-Rich Robot Manipulation
Single-material soft robotic skin for multimodal e-skin sensing
FreeTacMan robot-free visuo-tactile data collection for tactile AI
Sparsh-X multisensory touch representations for tactile AI
GenForce transferable force sensing for robot skin and tactile sensors
```

For each record, make the excerpt 140-165 characters where practical and ensure the first 40-80 visible words answer: what it is, what problem it addresses, and why it matters. Do not change the article ID, canonical path, paper name, paper claims, dates, or source URL merely to increase keyword density.

- [ ] **Step 4: Normalize the four visible content boundaries**

For each of the five priority article `content` strings, use these headings exactly once:

```markdown
## Source findings
## RoboSkin analysis
## Engineering implications
## What this does not prove yet
```

Move existing sourced statements and analysis under the matching heading. Preserve useful existing detail and citations. Add only two to four contextual internal links per article, selected from the research index, ROS 2 pipeline, relevant application page, glossary, or a directly related brief.

- [ ] **Step 5: Improve the two GSC index pages**

In `src/lib/seo.ts`, retain these metadata titles:

```ts
'/research': {
  title: 'Robot Skin, Tactile AI, and Physical AI Research Map',
},
'/research/robot-skin-papers': {
  title: 'Robot Skin Papers and Tactile Sensing Research Index',
},
```

In `src/app/research/page.tsx`, add this primary route link near the existing paper link:

```tsx
<Link href="/research-index" className="btn-secondary w-full sm:w-auto">
  Browse the tactile research index
</Link>
```

In `src/app/research/robot-skin-papers/page.tsx`, add this contextual link after the direct answer:

```tsx
<Link href="/research-index" className="btn-secondary">
  Open the structured research index
</Link>
```

- [ ] **Step 6: Verify visible metadata consistency**

Run:

```powershell
npm test
npm run lint
npm run build
```

Expected: all tests pass; build output for the five priority articles has one H1 equal to the visible title, the same metadata title, apex canonical, institutional author, published date, and modified date.

- [ ] **Step 7: Commit the bounded GSC page treatment**

Run:

```powershell
git add src/lib/blog-data.ts src/lib/seo.ts src/app/research/page.tsx src/app/research/robot-skin-papers/page.tsx src/app/research/[id]/page.tsx src/components/ArticleBody.tsx tests/research-content.test.mjs tests/research-news-structured-data.test.mjs
git commit -m "feat: improve audited GSC priority pages"
```

Expected: one commit limited to the seven audited pages and their shared article renderer.

## Task 6: Build the Normalized Tactile Research Index

**Files:**
- Create: `src/lib/research-index.ts`
- Create: `tests/research-index.test.mjs`

- [ ] **Step 1: Write the failing dataset-source test**

Create `tests/research-index.test.mjs`:

```js
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');

test('the first research index edition is normalized and source-backed', async () => {
  const index = await read('src/lib/research-index.ts');
  const ids = [
    'dream-tac-tactile-world-action-model-2026',
    'single-material-soft-robotic-skin-2025',
    'freetacman-robot-free-visuotactile-data-collection-2025',
    'sparsh-x-multisensory-touch-representations-2025',
    'genforce-transferable-force-sensing-2026',
    'mitas-multi-resolution-tactile-imitation-learning-2026',
    'ros2-kilted-tactile-pipeline-2026',
  ];

  for (const id of ids) assert.match(index, new RegExp(`'${id}'`));
  for (const field of [
    'sensorPrinciple',
    'modalities',
    'formFactor',
    'dataOutput',
    'applications',
    'evidence',
    'limitations',
    'reviewedAt',
  ]) assert.match(index, new RegExp(`${field}:`));
  assert.match(index, /getBlogPostById/);
  assert.doesNotMatch(index, /content:/);
});
```

- [ ] **Step 2: Run the dataset test and confirm the module is missing**

Run:

```powershell
node --test tests/research-index.test.mjs
```

Expected: FAIL because `src/lib/research-index.ts` does not exist.

- [ ] **Step 3: Define the normalized record and source-derived constructor**

Create `src/lib/research-index.ts` with these types and helper:

```ts
import { getBlogPostById } from '@/lib/blog-data';
import { canonicalUrl } from '@/lib/seo';

export type EvidenceLevel = 'peer-reviewed' | 'preprint' | 'institutional' | 'documentation';

export interface ResearchIndexEntry {
  id: string;
  title: string;
  url: string;
  year: number;
  publisher: string;
  sourceTitle: string;
  sourceUrl: string;
  sensorPrinciple: string;
  modalities: string[];
  formFactor: string;
  dataOutput: string;
  applications: string[];
  evidence: EvidenceLevel;
  limitations: string;
  reviewedAt: string;
}

type ResearchIndexSupplement = Omit<
  ResearchIndexEntry,
  'id' | 'title' | 'url' | 'sourceTitle' | 'sourceUrl'
> & { id: string };

function toEntry(supplement: ResearchIndexSupplement): ResearchIndexEntry {
  const post = getBlogPostById(supplement.id);
  if (!post) throw new Error(`Research index references missing article: ${supplement.id}`);
  return {
    ...supplement,
    title: post.title,
    url: canonicalUrl(`/research/${post.id}`),
    sourceTitle: post.sourceTitle,
    sourceUrl: post.sourceUrl,
  };
}
```

- [ ] **Step 4: Add the seven conservative supplemental records**

Use this complete first edition in the same file:

```ts
const supplements: ResearchIndexSupplement[] = [
  {
    id: 'dream-tac-tactile-world-action-model-2026',
    year: 2026,
    publisher: 'arXiv',
    sensorPrinciple: 'Tactile world-action modeling',
    modalities: ['tactile observation', 'robot action'],
    formFactor: 'Contact-rich robot manipulation system',
    dataOutput: 'Predicted tactile observations conditioned on robot actions',
    applications: ['contact prediction', 'robot manipulation'],
    evidence: 'preprint',
    limitations: 'Preprint evidence; transfer across sensors, tasks, and deployment conditions still requires independent validation.',
    reviewedAt: '2026-07-10',
  },
  {
    id: 'single-material-soft-robotic-skin-2025',
    year: 2025,
    publisher: 'University of Cambridge',
    sensorPrinciple: 'Single-material conductive soft skin',
    modalities: ['pressure', 'temperature', 'damage location'],
    formFactor: 'Large-area conformable robotic skin',
    dataOutput: 'Electrical measurements interpreted across the skin surface',
    applications: ['robot body sensing', 'multimodal e-skin'],
    evidence: 'institutional',
    limitations: 'Institutional summary of research; application durability and production-scale integration are not established by the public story alone.',
    reviewedAt: '2026-07-10',
  },
  {
    id: 'freetacman-robot-free-visuotactile-data-collection-2025',
    year: 2025,
    publisher: 'arXiv',
    sensorPrinciple: 'Robot-free visuo-tactile data collection',
    modalities: ['vision-based touch', 'contact motion'],
    formFactor: 'Portable tactile data-collection workflow',
    dataOutput: 'Paired tactile observations and interaction trajectories',
    applications: ['tactile dataset collection', 'manipulation learning'],
    evidence: 'preprint',
    limitations: 'Preprint evidence; dataset diversity and transfer to other tactile hardware remain evaluation questions.',
    reviewedAt: '2026-07-10',
  },
  {
    id: 'sparsh-x-multisensory-touch-representations-2025',
    year: 2025,
    publisher: 'arXiv',
    sensorPrinciple: 'Multisensory tactile representation learning',
    modalities: ['tactile images', 'force signals'],
    formFactor: 'Cross-sensor tactile learning model',
    dataOutput: 'Reusable latent touch representations',
    applications: ['tactile perception', 'cross-sensor learning'],
    evidence: 'preprint',
    limitations: 'Preprint evidence; downstream performance depends on sensor coverage, task data, and evaluation protocol.',
    reviewedAt: '2026-07-10',
  },
  {
    id: 'genforce-transferable-force-sensing-2026',
    year: 2026,
    publisher: 'Nature Communications',
    sensorPrinciple: 'Transferable camera-based force estimation',
    modalities: ['three-axis force', 'tactile images'],
    formFactor: 'Vision-based tactile sensor',
    dataOutput: 'Estimated contact-force vectors',
    applications: ['force-aware manipulation', 'sensor transfer'],
    evidence: 'peer-reviewed',
    limitations: 'Published evaluation does not establish equivalent accuracy for every sensor geometry, material, or deployment environment.',
    reviewedAt: '2026-07-10',
  },
  {
    id: 'mitas-multi-resolution-tactile-imitation-learning-2026',
    year: 2026,
    publisher: 'arXiv',
    sensorPrinciple: 'Multi-resolution tactile imitation learning',
    modalities: ['vision-based touch', 'event-based touch'],
    formFactor: 'Tactile robot-hand learning pipeline',
    dataOutput: 'Time-aligned multisensor tactile features and robot actions',
    applications: ['imitation learning', 'dexterous manipulation'],
    evidence: 'preprint',
    limitations: 'Preprint evidence; benefits may depend on task dynamics, sensor timing, and the selected imitation-learning policy.',
    reviewedAt: '2026-07-10',
  },
  {
    id: 'ros2-kilted-tactile-pipeline-2026',
    year: 2026,
    publisher: 'Open Robotics documentation and RoboSkin.ai analysis',
    sensorPrinciple: 'ROS 2 tactile data transport and synchronization',
    modalities: ['pressure', 'shear', 'slip', 'temperature'],
    formFactor: 'Robot middleware pipeline',
    dataOutput: 'Timestamped tactile messages, transforms, and replayable logs',
    applications: ['robot integration', 'tactile dataset logging'],
    evidence: 'documentation',
    limitations: 'Architecture guidance rather than a benchmark; message design and timing requirements remain application-specific.',
    reviewedAt: '2026-07-10',
  },
];

export const researchIndexEntries = supplements.map(toEntry);
```

- [ ] **Step 5: Run the focused test and type-check through the build**

Run:

```powershell
node --test tests/research-index.test.mjs
npm run build
```

Expected: PASS; the build catches any missing `BlogPost` ID or mismatched field type.

- [ ] **Step 6: Commit the data model**

Run:

```powershell
git add src/lib/research-index.ts tests/research-index.test.mjs
git commit -m "feat: add source-backed tactile research index data"
```

Expected: one commit containing only the normalized dataset and its source-level test.

## Task 7: Publish the Indexable Research Index Page

**Files:**
- Create: `src/components/ResearchIndexExplorer.tsx`
- Create: `src/app/research-index/page.tsx`
- Modify: `src/lib/seo.ts`
- Modify: `src/content/site.ts`
- Modify: `src/app/research/page.tsx`
- Modify: `src/app/sitemap.ts`
- Modify: `public/llms.txt`
- Modify: `tests/research-index.test.mjs`

- [ ] **Step 1: Add failing page, schema, and discovery assertions**

Append to `tests/research-index.test.mjs`:

```js
test('the research index is indexable, filterable, and visible before interaction', async () => {
  const [page, explorer, seo, site, sitemap, llms] = await Promise.all([
    read('src/app/research-index/page.tsx'),
    read('src/components/ResearchIndexExplorer.tsx'),
    read('src/lib/seo.ts'),
    read('src/content/site.ts'),
    read('src/app/sitemap.ts'),
    read('public/llms.txt'),
  ]);

  assert.match(page, /RoboSkin Tactile Research Index/);
  assert.match(page, /Methodology/);
  assert.match(page, /Limitations/);
  assert.match(page, /researchIndexEntries/);
  assert.match(explorer, /useState/);
  assert.match(explorer, /entries\.map/);
  assert.match(seo, /buildResearchIndexJsonLd/);
  assert.match(site, /href: '\/research-index'/);
  assert.match(sitemap, /\/research-index/);
  assert.match(llms, /https:\/\/roboskin\.ai\/research-index/);
});
```

- [ ] **Step 2: Run the test and confirm the page is absent**

Run:

```powershell
node --test tests/research-index.test.mjs
```

Expected: FAIL on missing page, component, metadata, and schema.

- [ ] **Step 3: Build a server-renderable filter component**

Create `src/components/ResearchIndexExplorer.tsx`:

```tsx
'use client';

import { useMemo, useState } from 'react';
import type { ResearchIndexEntry } from '@/lib/research-index';

type ResearchIndexExplorerProps = {
  entries: ResearchIndexEntry[];
};

export default function ResearchIndexExplorer({ entries }: ResearchIndexExplorerProps) {
  const [modality, setModality] = useState('all');
  const [evidence, setEvidence] = useState('all');
  const [year, setYear] = useState('all');

  const modalities = useMemo(
    () => [...new Set(entries.flatMap((entry) => entry.modalities))].sort(),
    [entries],
  );
  const evidenceLevels = useMemo(
    () => [...new Set(entries.map((entry) => entry.evidence))].sort(),
    [entries],
  );
  const years = useMemo(
    () => [...new Set(entries.map((entry) => String(entry.year)))].sort().reverse(),
    [entries],
  );

  const filteredEntries = entries.filter((entry) => {
    const matchesModality = modality === 'all' || entry.modalities.includes(modality);
    const matchesEvidence = evidence === 'all' || entry.evidence === evidence;
    const matchesYear = year === 'all' || String(entry.year) === year;
    return matchesModality && matchesEvidence && matchesYear;
  });

  const resetFilters = () => {
    setModality('all');
    setEvidence('all');
    setYear('all');
  };

  return (
    <div>
      <div className="grid gap-4 border-y border-white/10 py-5 md:grid-cols-[1fr_1fr_1fr_auto] md:items-end">
        <label className="grid gap-2 text-sm font-semibold text-white">
          Modality
          <select
            value={modality}
            onChange={(event) => setModality(event.target.value)}
            className="min-h-11 rounded-md border border-white/15 bg-[#080b10] px-3 text-sm text-white"
          >
            <option value="all">All modalities</option>
            {modalities.map((value) => <option key={value} value={value}>{value}</option>)}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-semibold text-white">
          Evidence
          <select
            value={evidence}
            onChange={(event) => setEvidence(event.target.value)}
            className="min-h-11 rounded-md border border-white/15 bg-[#080b10] px-3 text-sm text-white"
          >
            <option value="all">All evidence levels</option>
            {evidenceLevels.map((value) => <option key={value} value={value}>{value}</option>)}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-semibold text-white">
          Year
          <select
            value={year}
            onChange={(event) => setYear(event.target.value)}
            className="min-h-11 rounded-md border border-white/15 bg-[#080b10] px-3 text-sm text-white"
          >
            <option value="all">All years</option>
            {years.map((value) => <option key={value} value={value}>{value}</option>)}
          </select>
        </label>
        <button type="button" onClick={resetFilters} className="btn-secondary min-h-11">
          Reset filters
        </button>
      </div>

      <p className="mt-5 font-mono text-xs uppercase text-[#8e98a8]" aria-live="polite">
        Showing {filteredEntries.length} of {entries.length} records
      </p>

      <div className="signal-panel mt-4 overflow-x-auto p-0">
        <table className="w-full min-w-[1180px] border-collapse text-left">
          <thead className="bg-white/[0.03] text-xs uppercase text-[#8e98a8]">
            <tr>
              {['Research item', 'Year', 'Sensor principle', 'Modalities', 'Form factor', 'Data output', 'Evidence'].map((label) => (
                <th key={label} className="border-b border-white/10 px-4 py-3 font-semibold">{label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredEntries.map((entry) => (
              <tr key={entry.id} className="align-top text-sm text-[#c8d1de]">
                <td className="w-[300px] border-b border-white/8 px-4 py-5">
                  <a href={entry.url} className="font-semibold leading-snug text-white hover:text-[#00e5ff]">
                    {entry.title}
                  </a>
                  <a href={entry.sourceUrl} target="_blank" rel="noreferrer" className="mt-2 block text-xs text-[#00e5ff] hover:text-white">
                    {entry.publisher}: {entry.sourceTitle}
                  </a>
                  <p className="mt-3 text-xs leading-relaxed text-[#8e98a8]">{entry.limitations}</p>
                  <p className="mt-2 font-mono text-[11px] uppercase text-[#8e98a8]">Reviewed {entry.reviewedAt}</p>
                </td>
                <td className="border-b border-white/8 px-4 py-5">{entry.year}</td>
                <td className="border-b border-white/8 px-4 py-5">{entry.sensorPrinciple}</td>
                <td className="border-b border-white/8 px-4 py-5">{entry.modalities.join(', ')}</td>
                <td className="border-b border-white/8 px-4 py-5">{entry.formFactor}</td>
                <td className="border-b border-white/8 px-4 py-5">{entry.dataOutput}</td>
                <td className="border-b border-white/8 px-4 py-5 capitalize">{entry.evidence}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
```

The initial state renders all seven records during server rendering. The single horizontally scrollable table is the only framed tool surface; rows are not individual cards.

- [ ] **Step 4: Add Dataset and ItemList JSON-LD**

Add `buildResearchIndexJsonLd` to `src/lib/seo.ts`:

```ts
export function buildResearchIndexJsonLd(entries: ResearchIndexEntry[]) {
  const pageUrl = canonicalUrl('/research-index');
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Dataset',
        '@id': `${pageUrl}#dataset`,
        name: 'RoboSkin Tactile Research Index',
        description: 'A source-backed index of robot skin, tactile sensing, tactile AI, and integration research reviewed by RoboSkin.ai.',
        url: pageUrl,
        creator: { '@id': `${site.url}/#organization` },
        dateModified: '2026-07-10',
        distribution: [
          { '@type': 'DataDownload', encodingFormat: 'text/csv', contentUrl: canonicalUrl('/research-index.csv') },
          { '@type': 'DataDownload', encodingFormat: 'application/json', contentUrl: canonicalUrl('/research-index.json') },
        ],
      },
      {
        '@type': 'ItemList',
        '@id': `${pageUrl}#items`,
        numberOfItems: entries.length,
        itemListElement: entries.map((entry, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          url: entry.url,
          name: entry.title,
        })),
      },
    ],
  };
}
```

Import `ResearchIndexEntry` with `import type` to avoid a runtime cycle.

- [ ] **Step 5: Create the research-index page**

Create `src/app/research-index/page.tsx`:

```tsx
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import ResearchIndexExplorer from '@/components/ResearchIndexExplorer';
import { researchIndexEntries } from '@/lib/research-index';
import {
  buildBreadcrumbJsonLd,
  buildGraphJsonLd,
  buildPageJsonLd,
  buildPageMetadata,
  buildResearchIndexJsonLd,
} from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata('/research-index');

export default function ResearchIndexPage() {
  return (
    <>
      <JsonLd data={buildGraphJsonLd([
        buildPageJsonLd('/research-index'),
        buildBreadcrumbJsonLd('/research-index'),
      ])} />
      <JsonLd data={buildResearchIndexJsonLd(researchIndexEntries)} />

      <section className="py-14 md:py-20">
        <div className="container-shell grid gap-10 lg:grid-cols-[1fr_420px] lg:items-center">
          <div>
            <p className="eyebrow">Original research asset</p>
            <h1 className="mt-5 max-w-5xl text-4xl font-bold leading-tight text-white md:text-6xl">
              RoboSkin Tactile Research Index
            </h1>
            <p className="mt-5 max-w-4xl text-base leading-relaxed text-[#c8d1de] md:text-lg">
              The RoboSkin Tactile Research Index compares public robot-skin and tactile-AI work by sensing principle, measured modalities, form factor, data output, application direction, evidence level, and explicit limitations. Every record links to its public source and a RoboSkin.ai research brief so readers can verify context before using the taxonomy.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href="/research-index.csv" className="btn-primary">Open CSV data</Link>
              <Link href="/research-index.json" className="btn-secondary">Open JSON data</Link>
              <Link href="/research" className="btn-tertiary">Browse research briefs</Link>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-white/10 bg-[#020408]">
            <Image
              src="/generated/authority/roboskin-index-cover.webp"
              alt="RoboSkin tactile research index cover showing a robot hand, sensor layers, and structured data signals."
              fill
              priority
              sizes="(min-width: 1024px) 420px, 100vw"
              className="object-cover"
            />
          </div>
        </div>
        <div className="container-shell">
          <dl className="mt-9 grid gap-3 sm:grid-cols-3">
            <div className="border-l-2 border-[#00e5ff] pl-4">
              <dt className="font-mono text-2xl font-semibold text-white">{researchIndexEntries.length}</dt>
              <dd className="mt-1 text-xs uppercase text-[#8e98a8]">reviewed records</dd>
            </div>
            <div className="border-l-2 border-[#ffcf5a] pl-4">
              <dt className="font-mono text-2xl font-semibold text-white">4</dt>
              <dd className="mt-1 text-xs uppercase text-[#8e98a8]">evidence classes</dd>
            </div>
            <div className="border-l-2 border-[#77e0a1] pl-4">
              <dt className="font-mono text-2xl font-semibold text-white">2026-07-10</dt>
              <dd className="mt-1 text-xs uppercase text-[#8e98a8]">edition reviewed</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="pb-16 md:pb-20">
        <div className="container-shell">
          <ResearchIndexExplorer entries={researchIndexEntries} />
        </div>
      </section>

      <section className="border-y border-white/8 py-14 md:py-20">
        <div className="container-shell grid gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Methodology</p>
            <h2 className="mt-4 text-3xl font-bold text-white">Source identity stays separate from editorial taxonomy</h2>
            <p className="mt-4 text-sm leading-relaxed text-[#c8d1de]">
              Titles, source labels, and source URLs come from the cited research records. Sensor principle, modality, form factor, output, application, evidence, and limitation fields are conservative editorial normalization by the RoboSkin.ai Editorial Team. The source remains authoritative for its own claims.
            </p>
          </div>
          <div>
            <p className="eyebrow">Limitations</p>
            <h2 className="mt-4 text-3xl font-bold text-white">This index is a map, not a product benchmark</h2>
            <p className="mt-4 text-sm leading-relaxed text-[#c8d1de]">
              Inclusion does not imply affiliation, endorsement, commercial availability, or equivalent performance across sensors and tasks. Evidence labels describe the cited public source type, not a universal quality score. Review the original source and application conditions before making an engineering decision.
            </p>
            <Link href="/contact?requestType=research" className="mt-5 inline-flex text-sm font-semibold text-[#00e5ff] hover:text-white">
              Submit a correction {'->'}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 6: Register metadata and restrained discovery links**

Add this entry to `pageSeo` in `src/lib/seo.ts`:

```ts
'/research-index': {
  path: '/research-index',
  title: 'RoboSkin Tactile Research Index: Sensors, Data, and Evidence',
  description: 'Compare source-backed robot skin and tactile AI research by sensing principle, modalities, form factor, data output, evidence level, and limitations.',
  index: true,
  changeFrequency: 'monthly',
  priority: 0.82,
  breadcrumbs: ['Home', 'Research Index'],
},
```

Add `{ href: '/research-index', label: 'Research Index' }` to the research-oriented navigation group in `src/content/site.ts`, add one contextual link from `src/app/research/page.tsx`, and add the canonical URL with a one-sentence description to `public/llms.txt`. Do not add site-wide repeated links from every article.

- [ ] **Step 7: Run page tests, lint, and build**

Run:

```powershell
node --test tests/research-index.test.mjs
npm run lint
npm run build
```

Expected: tests pass; `/research-index` is in the sitemap and static export; build output includes all seven titles in the initial HTML without requiring a filter interaction.

- [ ] **Step 8: Commit the visible research asset**

Run:

```powershell
git add src/components/ResearchIndexExplorer.tsx src/app/research-index/page.tsx src/lib/seo.ts src/content/site.ts src/app/research/page.tsx src/app/sitemap.ts public/llms.txt tests/research-index.test.mjs
git commit -m "feat: publish tactile research index"
```

Expected: one commit for the indexable page, schema, and restrained discovery links.

## Task 8: Generate CSV, JSON, and RSS from Shared Data

**Files:**
- Modify: `src/lib/research-index.ts`
- Create: `src/app/research-index.csv/route.ts`
- Create: `src/app/research-index.json/route.ts`
- Create: `src/lib/feed.ts`
- Create: `src/app/feed.xml/route.ts`
- Create: `tests/discovery-output.test.mjs`
- Modify: `tests/research-index.test.mjs`

- [ ] **Step 1: Write failing machine-output tests**

Create `tests/discovery-output.test.mjs`:

```js
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');

test('CSV and JSON routes serialize the shared research index', async () => {
  const [index, csvRoute, jsonRoute] = await Promise.all([
    read('src/lib/research-index.ts'),
    read('src/app/research-index.csv/route.ts'),
    read('src/app/research-index.json/route.ts'),
  ]);
  assert.match(index, /serializeResearchIndexCsv/);
  assert.match(csvRoute, /text\/csv/);
  assert.match(csvRoute, /researchIndexEntries/);
  assert.match(jsonRoute, /application\/json/);
  assert.match(jsonRoute, /researchIndexEntries/);
});

test('RSS is generated from research and news with apex URLs', async () => {
  const [feed, route] = await Promise.all([
    read('src/lib/feed.ts'),
    read('src/app/feed.xml/route.ts'),
  ]);
  assert.match(feed, /blogPosts/);
  assert.match(feed, /newsPosts/);
  assert.match(feed, /canonicalUrl/);
  assert.match(feed, /<rss version="2\.0">/);
  assert.match(route, /application\/rss\+xml/);
});
```

- [ ] **Step 2: Run the tests and confirm the outputs are missing**

Run:

```powershell
node --test tests/discovery-output.test.mjs tests/research-index.test.mjs
```

Expected: FAIL because serializers and routes do not exist.

- [ ] **Step 3: Add the CSV serializer to the research-index module**

Append to `src/lib/research-index.ts`:

```ts
const csvColumns: (keyof ResearchIndexEntry)[] = [
  'id', 'title', 'url', 'year', 'publisher', 'sourceTitle', 'sourceUrl',
  'sensorPrinciple', 'modalities', 'formFactor', 'dataOutput', 'applications',
  'evidence', 'limitations', 'reviewedAt',
];

function csvCell(value: string | number | string[]): string {
  const text = Array.isArray(value) ? value.join('; ') : String(value);
  return `"${text.replaceAll('"', '""')}"`;
}

export function serializeResearchIndexCsv(entries = researchIndexEntries): string {
  const rows = entries.map((entry) => csvColumns.map((column) => csvCell(entry[column])).join(','));
  return `${csvColumns.join(',')}\n${rows.join('\n')}\n`;
}
```

- [ ] **Step 4: Add static CSV and JSON route handlers**

Create `src/app/research-index.csv/route.ts`:

```ts
import { researchIndexEntries, serializeResearchIndexCsv } from '@/lib/research-index';

export const dynamic = 'force-static';

export function GET() {
  return new Response(serializeResearchIndexCsv(researchIndexEntries), {
    headers: {
      'content-type': 'text/csv; charset=utf-8',
      'content-disposition': 'inline; filename="roboskin-tactile-research-index.csv"',
    },
  });
}
```

Create `src/app/research-index.json/route.ts`:

```ts
import { researchIndexEntries } from '@/lib/research-index';

export const dynamic = 'force-static';

export function GET() {
  return Response.json({
    name: 'RoboSkin Tactile Research Index',
    updated: '2026-07-10',
    count: researchIndexEntries.length,
    entries: researchIndexEntries,
  });
}
```

- [ ] **Step 5: Build the shared RSS serializer**

Create `src/lib/feed.ts`:

```ts
import { blogPosts } from '@/lib/blog-data';
import { newsPosts } from '@/lib/news-data';
import { canonicalUrl } from '@/lib/seo';

const xmlEscape = (value: string) => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&apos;');

export function buildRssFeed(): string {
  const items = [
    ...blogPosts.map((post) => ({ ...post, path: `/research/${post.id}` })),
    ...newsPosts.map((post) => ({ ...post, path: `/news/${post.id}` })),
  ].sort((a, b) => new Date(b.updated).getTime() - new Date(a.updated).getTime());

  const itemXml = items.map((item) => {
    const url = canonicalUrl(item.path);
    return `<item><title>${xmlEscape(item.title)}</title><link>${url}</link><guid isPermaLink="true">${url}</guid><description>${xmlEscape(item.excerpt)}</description><pubDate>${new Date(item.updated).toUTCString()}</pubDate></item>`;
  }).join('');

  return `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>RoboSkin.ai Research and News</title><link>${canonicalUrl('/')}</link><description>Source-backed robot skin, tactile AI, and electronic skin research.</description><language>en</language>${itemXml}</channel></rss>`;
}
```

Create `src/app/feed.xml/route.ts`:

```ts
import { buildRssFeed } from '@/lib/feed';

export const dynamic = 'force-static';

export function GET() {
  return new Response(buildRssFeed(), {
    headers: { 'content-type': 'application/rss+xml; charset=utf-8' },
  });
}
```

- [ ] **Step 6: Verify built data parity**

Run:

```powershell
node --test tests/discovery-output.test.mjs tests/research-index.test.mjs
npm run lint
npm run build
@'
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('out/research-index.json', 'utf8'));
const csv = fs.readFileSync('out/research-index.csv', 'utf8').trim().split(/\r?\n/);
if (data.count !== 7 || data.entries.length !== 7 || csv.length !== 8) process.exit(1);
const rss = fs.readFileSync('out/feed.xml', 'utf8');
if (!rss.includes('<rss version="2.0">') || rss.includes('www.roboskin.ai')) process.exit(1);
console.log('Verified 7 JSON entries, 7 CSV rows, and canonical RSS URLs');
'@ | node
npm run verify:export
```

Expected: all tests, lint, and build pass; JSON count is 7; CSV has one header plus seven rows; RSS contains no `www`; the export verifier validates 65 protected URLs and all four generated outputs.

- [ ] **Step 7: Commit machine-readable outputs**

Run:

```powershell
git add src/lib/research-index.ts src/app/research-index.csv src/app/research-index.json src/lib/feed.ts src/app/feed.xml tests/research-index.test.mjs tests/discovery-output.test.mjs
git commit -m "feat: generate research data exports and RSS"
```

Expected: one commit with all outputs derived from existing shared data.

## Task 9: Gate IndexNow Behind Preview and Production Verification

**Files:**
- Create: `scripts/configure-indexnow.mjs`
- Create: `scripts/verify-production.mjs`
- Create: `scripts/submit-indexnow.mjs`
- Create: `public/indexnow-key.txt` via script
- Modify: `tests/discovery-output.test.mjs`

- [ ] **Step 1: Add failing verifier and submission-gate assertions**

Append to `tests/discovery-output.test.mjs`:

```js
test('IndexNow requires a recent successful production verification report', async () => {
  const [configure, verify, submit] = await Promise.all([
    read('scripts/configure-indexnow.mjs'),
    read('scripts/verify-production.mjs'),
    read('scripts/submit-indexnow.mjs'),
  ]);
  assert.match(configure, /randomBytes\(16\)/);
  assert.match(configure, /indexnow-key\.txt/);
  assert.match(verify, /protected-urls\.json/);
  assert.match(verify, /www\.roboskin\.ai/);
  assert.match(verify, /production-verification\.json/);
  assert.match(submit, /api\.indexnow\.org\/indexnow/);
  assert.match(submit, /report\.ok/);
  assert.match(submit, /https:\/\/roboskin\.ai/);
  assert.match(submit, /30 \* 60 \* 1000/);
});
```

- [ ] **Step 2: Run the focused test and confirm scripts are missing**

Run:

```powershell
node --test tests/discovery-output.test.mjs
```

Expected: FAIL because the three scripts do not exist.

- [ ] **Step 3: Generate one stable public IndexNow key**

Create `scripts/configure-indexnow.mjs`:

```js
import { randomBytes } from 'node:crypto';
import { access, writeFile } from 'node:fs/promises';

const keyFile = new URL('../public/indexnow-key.txt', import.meta.url);
const exists = await access(keyFile).then(() => true, () => false);

if (!exists) {
  await writeFile(keyFile, `${randomBytes(16).toString('hex')}\n`, { encoding: 'utf8', flag: 'wx' });
  console.log('Created public/indexnow-key.txt');
} else {
  console.log('Reused existing public/indexnow-key.txt');
}
```

Run:

```powershell
npm run indexnow:configure
```

Expected: the file is created once; rerunning the command reports reuse and does not rotate the key. Do not print the key in logs or chat.

- [ ] **Step 4: Add a preview/production verifier with a report artifact**

Create `scripts/verify-production.mjs`:

```js
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';

const canonicalOrigin = 'https://roboskin.ai';
const base = new URL(process.argv[2] ?? canonicalOrigin);
const reportFile = new URL('../.artifacts/production-verification.json', import.meta.url);
const protectedUrls = JSON.parse(
  await readFile(new URL('../config/protected-urls.json', import.meta.url), 'utf8'),
);
const protectedRedirects = JSON.parse(
  await readFile(new URL('../config/protected-redirects.json', import.meta.url), 'utf8'),
);

await rm(reportFile, { force: true });

function canonicalFor(pathname) {
  return new URL(pathname, canonicalOrigin).href;
}

function canonicalFromHtml(html) {
  return html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i)?.[1]
    ?? html.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i)?.[1];
}

async function fetchOk(pathname) {
  const url = new URL(pathname, base);
  const response = await fetch(url, {
    headers: { 'user-agent': 'RoboSkin deployment verifier/1.0' },
  });
  if (!response.ok) throw new Error(`${url.href} returned ${response.status}`);
  return response;
}

const sitemapResponse = await fetchOk('/sitemap.xml');
const sitemapXml = await sitemapResponse.text();
const sitemapUrls = new Set(
  [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim()),
);

for (const absoluteUrl of protectedUrls) {
  const pathname = new URL(absoluteUrl).pathname;
  const redirectTarget = protectedRedirects[pathname];
  if (!redirectTarget && !sitemapUrls.has(absoluteUrl)) {
    throw new Error(`${absoluteUrl} is missing from the production sitemap`);
  }

  const response = await fetchOk(pathname);
  const contentType = response.headers.get('content-type') ?? '';
  if (contentType.includes('text/html')) {
    const html = await response.text();
    const expectedPath = redirectTarget ?? pathname;
    const actualCanonical = canonicalFromHtml(html);
    if (actualCanonical !== canonicalFor(expectedPath)) {
      throw new Error(`${pathname} canonical is ${actualCanonical ?? 'missing'}`);
    }
  }
}

const [indexResponse, csvResponse, jsonResponse, rssResponse] = await Promise.all([
  fetchOk('/research-index'),
  fetchOk('/research-index.csv'),
  fetchOk('/research-index.json'),
  fetchOk('/feed.xml'),
]);
const [indexHtml, csv, indexData, rss] = await Promise.all([
  indexResponse.text(),
  csvResponse.text(),
  jsonResponse.json(),
  rssResponse.text(),
]);

if (canonicalFromHtml(indexHtml) !== canonicalFor('/research-index')) {
  throw new Error('/research-index has an incorrect canonical');
}
if (indexData.count !== 7 || indexData.entries?.length !== 7) {
  throw new Error('Research index JSON does not contain seven records');
}
for (const entry of indexData.entries) {
  if (!indexHtml.includes(`/research/${entry.id}`)) {
    throw new Error(`Research index HTML is missing ${entry.id}`);
  }
}
if (csv.trim().split(/\r?\n/).length !== indexData.entries.length + 1) {
  throw new Error('Research index CSV and JSON record counts differ');
}
if (!rss.includes('<rss version="2.0">') || rss.includes('www.roboskin.ai')) {
  throw new Error('RSS is invalid or contains a www URL');
}

if (base.origin === canonicalOrigin) {
  for (const pathname of ['/', '/research']) {
    const response = await fetch(new URL(pathname, 'https://www.roboskin.ai'), {
      redirect: 'manual',
      headers: { 'user-agent': 'RoboSkin deployment verifier/1.0' },
    });
    if (![301, 308].includes(response.status)) {
      throw new Error(`www${pathname} returned ${response.status} instead of a permanent redirect`);
    }
    const expectedLocation = new URL(pathname, canonicalOrigin).href;
    const actualLocation = response.headers.get('location');
    if (actualLocation !== expectedLocation) {
      throw new Error(`www${pathname} redirects to ${actualLocation ?? 'missing location'}`);
    }
  }
}

const report = {
  ok: true,
  baseUrl: base.origin,
  verifiedAt: new Date().toISOString(),
  protectedUrlCount: protectedUrls.length,
  researchIndexCount: indexData.entries.length,
};
await mkdir(new URL('../.artifacts/', import.meta.url), { recursive: true });
await writeFile(reportFile, `${JSON.stringify(report, null, 2)}\n`, 'utf8');
console.log(`Verified ${base.origin}: ${protectedUrls.length} protected URLs and ${indexData.entries.length} index records`);
```

The script removes any previous successful report before making requests. A failed check therefore cannot leave a stale report that unlocks IndexNow.

- [ ] **Step 5: Add the gated IndexNow client**

Create `scripts/submit-indexnow.mjs` with these exact gates:

```js
import { readFile } from 'node:fs/promises';

const report = JSON.parse(await readFile(new URL('../.artifacts/production-verification.json', import.meta.url), 'utf8'));
const verifiedAt = new Date(report.verifiedAt).getTime();
if (!report.ok || report.baseUrl !== 'https://roboskin.ai') {
  throw new Error('IndexNow requires a successful production verification report');
}
if (Date.now() - verifiedAt > 30 * 60 * 1000) {
  throw new Error('Production verification is older than 30 minutes');
}

const key = (await readFile(new URL('../public/indexnow-key.txt', import.meta.url), 'utf8')).trim();
const requestedPaths = process.argv.slice(2).filter((value) => value.startsWith('/'));
if (requestedPaths.length === 0) {
  throw new Error('Pass at least one changed public path beginning with /');
}

const urlList = [...new Set(requestedPaths.map((pathname) => new URL(pathname, 'https://roboskin.ai').href))];
const response = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'content-type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host: 'roboskin.ai',
    key,
    keyLocation: 'https://roboskin.ai/indexnow-key.txt',
    urlList,
  }),
});

if (!response.ok && response.status !== 202) {
  throw new Error(`IndexNow rejected ${urlList.length} URLs with status ${response.status}`);
}
console.log(`IndexNow accepted ${urlList.length} URLs with status ${response.status}`);
```

- [ ] **Step 6: Run source tests and local build checks**

Run:

```powershell
node --test tests/discovery-output.test.mjs
npm run build
npm run verify:export
```

Expected: PASS. Do not run `npm run indexnow:submit` against the local build or preview.

- [ ] **Step 7: Commit verifier and IndexNow support**

Run:

```powershell
git add scripts/configure-indexnow.mjs scripts/verify-production.mjs scripts/submit-indexnow.mjs public/indexnow-key.txt package.json tests/discovery-output.test.mjs
git commit -m "feat: gate IndexNow behind production verification"
```

Expected: the public protocol key is committed without being printed; `.artifacts/` remains untracked.

## Task 10: Add CI Gates and Measurement Documentation

**Files:**
- Modify: `.github/workflows/deploy.yml`
- Modify: `.gitignore`
- Modify: `docs/seo/search-console-monitoring.md`
- Create: `docs/seo/research-index-outreach.md`
- Modify: `tests/discovery-output.test.mjs`

- [ ] **Step 1: Add failing CI and documentation assertions**

Append to `tests/discovery-output.test.mjs`:

```js
test('deployment and measurement are gated and reproducible', async () => {
  const [workflow, monitoring, outreach, gitignore] = await Promise.all([
    read('.github/workflows/deploy.yml'),
    read('docs/seo/search-console-monitoring.md'),
    read('docs/seo/research-index-outreach.md'),
    read('.gitignore'),
  ]);
  assert.match(workflow, /run: npm test/);
  assert.match(workflow, /run: npm run lint/);
  assert.match(workflow, /run: npm run verify:export/);
  for (const day of ['Day 0', 'Day 7', 'Day 28', 'Day 90']) assert.match(monitoring, new RegExp(day));
  assert.match(monitoring, /5,240/);
  assert.match(monitoring, /48/);
  assert.match(monitoring, /0\.9%/);
  assert.match(outreach, /three legitimate referring domains/i);
  assert.match(outreach, /No paid links, automated posting, or fabricated endorsements/);
  assert.match(gitignore, /\.artifacts/);
});
```

- [ ] **Step 2: Run the test and confirm missing gates**

Run:

```powershell
node --test tests/discovery-output.test.mjs
```

Expected: FAIL on the missing workflow checks, outreach document, or artifact ignore rule.

- [ ] **Step 3: Gate GitHub Pages deployment**

In `.github/workflows/deploy.yml`, add these steps after `npm ci` and before artifact upload:

```yaml
      - name: Test
        run: npm test

      - name: Lint
        run: npm run lint

      - name: Build with Next.js
        run: npm run build

      - name: Verify static export
        run: npm run verify:export
```

Remove the previous duplicate build step so the build runs exactly once.

- [ ] **Step 4: Ignore local verification reports**

Add this exact line to `.gitignore`:

```gitignore
.artifacts/
```

- [ ] **Step 5: Complete the GSC measurement table**

In `docs/seo/search-console-monitoring.md`, include these fixed baselines and review gates:

```markdown
## Day 0 baseline - 2026-07-10

| Window | Impressions | Clicks | CTR | Average position |
| --- | ---: | ---: | ---: | ---: |
| Rolling 28 days through 2026-07-07 | 5,240 | 48 | 0.9% | 8.9 |
| Previous three months | 5,610 | 60 | 1.1% | 8.9 |

External links reported by GSC: 0.

## Day 7

Verify the deployed commit, protected URLs, sitemap discovery, apex canonical selection, priority-page recrawl state, and the recorded IndexNow response.

## Day 28

Compare CTR, clicks, impressions, and position only for priority pages recrawled after deployment. Do not rewrite a title a second time before a complete crawl cycle.

## Day 90

Evaluate the approved rolling-28-day target: 15,000 impressions, 150 clicks, 1.5% CTR, at least three legitimate referring domains, and no active configuration-driven `www`/apex split.
```

- [ ] **Step 6: Create the manual citation outreach workflow**

Create `docs/seo/research-index-outreach.md` with:

```markdown
# RoboSkin Tactile Research Index Outreach

## Objective

Earn at least three legitimate referring domains by making the research index useful to robotics researchers, lab resource maintainers, ROS/tactile tooling communities, and curated robotics-resource editors. No paid links, automated posting, or fabricated endorsements.

## Qualification

A target qualifies only when its existing audience overlaps robot skin, tactile sensing, tactile AI, dexterous manipulation, ROS 2, or electronic skin. The outreach message must name the exact page where the index would help and must disclose that RoboSkin.ai is requesting editorial consideration.

## Outreach Sequence

1. Ask maintainers of relevant robotics resource lists to review the index as a structured data resource.
2. Notify authors or institutional communication teams already cited in the index that their public work is included, invite factual corrections, and make no request for endorsement.
3. Share the index in relevant technical community threads only when the thread permits self-published resources and the index directly answers the discussion.

## Message

Subject: Source-backed tactile research index for review

RoboSkin.ai has published a seven-record tactile research index that links each entry to its public source and separates source findings from editorial taxonomy and limitations. Your resource page or community covers [named topic], so this may be useful to readers comparing sensing principles, modalities, data outputs, and evidence levels. The index is at https://roboskin.ai/research-index. Corrections are welcome through https://roboskin.ai/contact?requestType=research. Please include it only if it meets your editorial criteria.

## Log

Record domain, relevant page, contact date, relevance reason, response, resulting URL, and follow-up date. Count a referring domain only after a crawlable editorial link is live.
```

- [ ] **Step 7: Run the full local quality gate**

Run:

```powershell
npm test
npm run lint
npm run build
npm run verify:export
```

Expected: all tests pass; lint exits 0; static build succeeds; the protected URL and generated-output verifier succeeds.

- [ ] **Step 8: Commit CI and operating documentation**

Run:

```powershell
git add .github/workflows/deploy.yml .gitignore docs/seo/search-console-monitoring.md docs/seo/research-index-outreach.md tests/discovery-output.test.mjs
git commit -m "ci: gate deployment and document search measurement"
```

Expected: deployment cannot proceed past a failed test, lint, build, or export-contract check.

## Task 11: Browser QA, Preview Verification, and Code Review

**Files:**
- Inspect: generated application and all changed source files
- Modify only files required to fix verified defects

- [ ] **Step 1: Run the complete local gate from a clean index**

Run:

```powershell
git status --short
npm test
npm run lint
npm run build
npm run verify:export
```

Expected: no unstaged implementation changes remain; all commands pass. Generated `out/` and `.artifacts/` remain ignored.

- [ ] **Step 2: Start the local application**

Run in a persistent PowerShell session:

```powershell
npm run dev -- --hostname 127.0.0.1 --port 3000
```

Expected: Next.js reports `http://127.0.0.1:3000`. If port 3000 is occupied, use 3001 and record the actual URL.

- [ ] **Step 3: Perform desktop and mobile browser QA**

Use the browser-control skill to inspect these routes at 1440x900 and 390x844:

```text
/
/research
/research-index
/research/robot-skin-papers
/research/dream-tac-tactile-world-action-model-2026
/research/single-material-soft-robotic-skin-2025
/research/freetacman-robot-free-visuotactile-data-collection-2025
/research/sparsh-x-multisensory-touch-representations-2025
/research/genforce-transferable-force-sensing-2026
/news/service-robots-200000-units-logistics-tactile-ai
/news/electronic-skin-research-robot-skin-systems-problem
/editorial-policy
```

Verify no text overlap, horizontal page overflow, blank primary images, nested-card layout, unusable filter controls, or hidden initial index rows. Disable JavaScript for one `/research-index` load and confirm all seven records remain in the HTML.

- [ ] **Step 4: Validate rendered SEO surfaces**

For the homepage, `/research-index`, one research article, and one news article, inspect rendered HTML and confirm:

```text
One visible H1
One apex canonical
Indexable robots metadata
Matching visible and structured title
RoboSkin.ai Editorial Team visible and structured author
Valid JSON-LD parse
Published and modified dates on articles
No www or vercel.app URL in canonical or JSON-LD
```

- [ ] **Step 5: Deploy a Vercel preview and capture its URL without writing a shell file**

Run:

```powershell
$output = vercel --yes --no-color 2>&1
$preview = ($output | Where-Object { $_ -match '^https://.*\.vercel\.app$' } | Select-Object -Last 1).Trim()
if (-not $preview) { throw 'Vercel preview URL was not found in deploy output' }
$preview
node scripts/verify-production.mjs $preview
```

Expected: a preview URL is printed and the verifier passes all route, canonical, index, CSV, JSON, and RSS checks. The preview verifier does not test production `www` redirects.

- [ ] **Step 6: Request two-stage code review**

Use `superpowers:requesting-code-review` to review:

1. Spec compliance against `docs/superpowers/specs/2026-07-10-roboskin-balanced-seo-geo-growth-design.md`.
2. Code quality, source accuracy, static-export behavior, schema consistency, and deployment risk.

Fix only verified issues. Re-run the exact focused test for each fix, then rerun the full local gate.

- [ ] **Step 7: Commit verified QA fixes**

If QA required changes, run:

```powershell
git add package.json vercel.json .gitignore .github/workflows/deploy.yml config scripts public/llms.txt public/indexnow-key.txt src/app src/components src/content/site.ts src/lib tests docs/seo
git commit -m "fix: resolve SEO release verification findings"
```

Expected: inspect `git diff --cached` before committing and confirm only verified defects are included. If unrelated concurrent changes appear, unstage those exact paths without reverting them. If no defects were found, do not create an empty commit.

## Task 12: Merge, Deploy from `main`, Verify Production, and Submit Discovery

**Files:**
- No new source files expected
- External systems: GitHub, Vercel, Google Search Console, IndexNow

- [ ] **Step 1: Confirm the feature branch is reproducible and clean**

Run:

```powershell
git status --short
git log --oneline main..HEAD
npm test
npm run lint
npm run build
npm run verify:export
```

Expected: clean worktree; implementation commits are listed; all checks pass.

- [ ] **Step 2: Fast-forward `main` and push the committed source**

Run:

```powershell
git switch main
git merge --ff-only feat/roboskin-balanced-seo-geo
git push origin main
```

Expected: `main` fast-forwards and the exact tested commits are pushed. Do not deploy an uncommitted `out/` directory.

- [ ] **Step 3: Watch repository and hosting deployment state**

Run:

```powershell
gh run list --branch main --limit 5
vercel ls roboskin.ai
vercel inspect https://roboskin.ai
```

Expected: the GitHub workflow for the pushed commit succeeds, and Vercel reports a production deployment associated with the same commit. If either deployment fails, stop before discovery submission.

- [ ] **Step 4: Verify the live production host and write a fresh report**

Run:

```powershell
node scripts/verify-production.mjs https://roboskin.ai
```

Expected: all 65 protected URLs are useful or intentionally redirected, both at-risk news pages are live, seven index records match CSV/JSON/page output, RSS is canonical, and `www` root plus `/research` return 301/308 to matching apex URLs. The script writes a successful report less than 30 minutes old.

- [ ] **Step 5: Roll back immediately if production verification fails**

Run this only when Step 4 exits nonzero:

```powershell
$deploymentData = vercel ls roboskin-ai --status READY --format=json | ConvertFrom-Json
$previousProduction = $deploymentData.deployments |
  Where-Object { $_.target -eq 'production' } |
  Sort-Object createdAt -Descending |
  Select-Object -Skip 1 -First 1
if (-not $previousProduction.url) { throw 'No previous READY production deployment was found' }
vercel rollback "https://$($previousProduction.url)" --yes --timeout 3m
if ($LASTEXITCODE -ne 0) { throw 'Vercel rollback failed' }
foreach ($url in @(
  'https://roboskin.ai/',
  'https://roboskin.ai/sitemap.xml',
  'https://roboskin.ai/news/service-robots-200000-units-logistics-tactile-ai',
  'https://roboskin.ai/news/electronic-skin-research-robot-skin-systems-problem'
)) {
  $response = Invoke-WebRequest -Uri $url -MaximumRedirection 5
  if ($response.StatusCode -ne 200) { throw "Rollback health check failed for $url" }
}
throw 'New production failed verification and was rolled back; diagnose before another deployment'
```

Expected: the last READY production deployment before the failed release regains the aliases, the prior public surface responds, and IndexNow/GSC submission does not run. Keep the failed deployment available for diagnosis.

- [ ] **Step 6: Submit only the changed priority URLs to IndexNow**

Run:

```powershell
npm run indexnow:submit -- / /research /research/robot-skin-papers /research-index /research-index.csv /research-index.json /feed.xml /editorial-policy /research/dream-tac-tactile-world-action-model-2026 /research/single-material-soft-robotic-skin-2025 /research/freetacman-robot-free-visuotactile-data-collection-2025 /research/sparsh-x-multisensory-touch-representations-2025 /research/genforce-transferable-force-sensing-2026 /news/service-robots-200000-units-logistics-tactile-ai /news/electronic-skin-research-robot-skin-systems-problem
```

Expected: IndexNow returns 200 or 202. Record the status and timestamp in `docs/seo/search-console-monitoring.md`; do not treat acceptance as an indexing guarantee.

- [ ] **Step 7: Refresh Google Search Console discovery**

Using the authenticated `sc-domain:roboskin.ai` property:

1. Submit or refresh `https://roboskin.ai/sitemap.xml`.
2. Inspect the apex versions of `/research-index` and the seven GSC priority pages.
3. Request indexing only after the live inspection shows the new apex canonical.
4. Record submission dates and inspection states in `docs/seo/search-console-monitoring.md`.

Expected: GSC accepts the sitemap and reports the apex URLs as submitted. Recrawl and indexing remain asynchronous and are not claimed as immediate outcomes.

- [ ] **Step 8: Record the production deployment identity**

Append the pushed commit SHA, Vercel production deployment URL, production verification timestamp, IndexNow response, and GSC sitemap submission date to the monitoring document. Commit that operational record:

```powershell
git add docs/seo/search-console-monitoring.md
git commit -m "docs: record SEO production rollout"
git push origin main
```

Expected: the release is traceable from the monitoring document to a commit and verified deployment.

## Final Acceptance Gate

Do not mark this plan complete until every item below has direct evidence:

- [ ] The implementation is committed on and deployed from GitHub `main`.
- [ ] All 65 audited production URLs remain useful or have an explicit permanent redirect.
- [ ] Both restored news URLs return useful content after production deployment.
- [ ] `www` root and deep paths return permanent matching apex redirects.
- [ ] Canonicals, sitemap, schema IDs, RSS, CSV, and JSON contain no `www` or preview host.
- [ ] The five priority articles plus `/research` and `/research/robot-skin-papers` have the approved first-cycle treatment.
- [ ] Visible and structured authorship consistently uses `RoboSkin.ai Editorial Team`.
- [ ] The research index exposes the same seven identities on the static page, CSV, and JSON.
- [ ] Methodology, limitations, evidence level, source URL, and editorial review date are visible.
- [ ] Dataset and ItemList JSON-LD match visible content and parse successfully.
- [ ] RSS is valid and links only to apex canonical URLs.
- [ ] IndexNow ran only after a fresh successful production-verification report.
- [ ] Tests, lint, build, export verification, browser QA, preview verification, and production verification pass.
- [ ] GSC sitemap and apex priority-page submissions are recorded.
- [ ] Day 7, Day 28, and Day 90 checks are documented; rankings and backlinks are not presented as guaranteed outcomes.
