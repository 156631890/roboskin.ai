# RoboSkin Performance SEO GEO Optimization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Improve RoboSkin.ai loading behavior and AI/search discoverability while preserving the existing route strategy and conservative content posture.

**Architecture:** Use the existing Next.js App Router, static export, `next/image`, shared SEO helper, JSON-LD renderer, and local Node tests. The implementation updates tests first, then makes narrow performance changes, then strengthens the `/physics-ai` entity graph and `llms.txt` guidance.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS 4, Node test runner, static export.

---

## File Structure

Modify:

- `tests/seo-geo.test.mjs`: update stale homepage assertions and add regression checks for deferred sections, image priority, `/physics-ai` entity schema, `llms.txt`, and no `/physical-ai`.
- `src/app/globals.css`: add a reusable below-the-fold rendering helper.
- `src/app/page.tsx`: apply the deferred rendering helper to homepage sections after the first hero section.
- `src/components/IndustryVisuals.tsx`: remove high-priority loading from the below-the-fold `TactileStackMap` image and tighten `sizes` hints for non-hero images.
- `src/lib/seo.ts`: add a focused DefinedTerm JSON-LD helper for the RoboSkin Physics AI concept.
- `src/app/physics-ai/page.tsx`: include the new Physics AI entity JSON-LD in the page graph.
- `public/llms.txt`: add concise canonical answer guidance for RoboSkin.ai and Physics AI.

Do not modify:

- `src/app/sitemap.ts`
- `src/app/robots.ts`
- `src/app/layout.tsx`
- `next.config.ts`
- route directory names
- primary navigation labels
- generated image assets
- dependencies

Ignore and do not stage:

- `.next-dev-*.log`

---

### Task 1: Update SEO/GEO Regression Tests First

**Files:**
- Modify: `tests/seo-geo.test.mjs`

- [ ] **Step 1: Replace the current SEO/GEO test with current-copy assertions and new failing assertions**

Replace the full contents of `tests/seo-geo.test.mjs` with:

```js
import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');

test('SEO and GEO source files expose metadata, schema, sitemap, and internal links', async () => {
  const [seo, jsonLd, layout, sitemap, robots, home, faq, physicsAi, industryVisuals, globals, llms] = await Promise.all([
    read('src/lib/seo.ts'),
    read('src/components/JsonLd.tsx'),
    read('src/app/layout.tsx'),
    read('src/app/sitemap.ts'),
    read('src/app/robots.ts'),
    read('src/app/page.tsx'),
    read('src/app/faq/page.tsx'),
    read('src/app/physics-ai/page.tsx'),
    read('src/components/IndustryVisuals.tsx'),
    read('src/app/globals.css'),
    read('public/llms.txt'),
  ]);

  assert.match(seo, /pageSeo/);
  assert.match(seo, /buildPageMetadata/);
  assert.match(seo, /buildOrganizationJsonLd/);
  assert.match(seo, /buildFaqJsonLd/);
  assert.match(seo, /buildFaqJsonLd\(items = faqItems, path = '\/faq'\)/);
  assert.match(seo, /'@id': `\$\{canonicalUrl\(path\)\}#faq`/);
  assert.match(jsonLd, /application\/ld\+json/);
  assert.doesNotMatch(layout, /your-google-verification-code|your-yandex-verification-code/);
  assert.match(layout, /buildOrganizationJsonLd/);
  assert.match(seo, /'\/faq'/);
  assert.match(sitemap, /lastModified: new Date\('2026-04-25'\)/);
  assert.match(sitemap, /seoRoutes/);
  assert.doesNotMatch(robots, /\/_next\//);

  assert.match(home, /Find the right robot skin route/);
  assert.match(home, /Short answers to common robot skin and tactile AI questions/);
  assert.match(home, /Direct-answer coverage supports readers and answer engines/);
  assert.match(home, /href="\/faq"|href=\{`\/faq/);
  assert.match(home, /href="\/downloads"|href=\{`\/downloads/);
  assert.match(home, /href="\/glossary"|href=\{`\/glossary/);
  assert.match(home, /href="\/resources"|href=\{`\/resources/);
  assert.match(home, /href="\/technology"|href=\{`\/technology/);
  assert.match(home, /href="\/research"|href=\{`\/research/);
  assert.match(home, /href="\/contact\?requestType=research/);
  assert.match(home, /buildFaqJsonLd\(homeRobotSkinFaq, '\/'\)/);
  assert.match(home, /Open the robot skin glossary/);
  assert.match(home, /View RoboSkin resources/);
  assert.match(home, /Explore tactile AI technology/);
  assert.match(home, /Browse robot skin research/);
  assert.match(home, /Submit a source/);
  assert.doesNotMatch(home, /Robot skin direct answers/);
  assert.doesNotMatch(home, /Short answers for search engines, AI systems, and serious readers/);

  assert.match(faq, /buildFaqJsonLd/);
  assert.doesNotMatch(faq, /robots:\s*\{\s*index:\s*false/);

  assert.match(globals, /\.deferred-section/);
  assert.match(home, /className="deferred-section py-14 md:py-20"/);
  assert.match(home, /className="deferred-section pb-20 pt-8"/);
  assert.doesNotMatch(industryVisuals, /src=\{heroVisual\.image\}[\s\S]{0,180}priority/);

  assert.match(seo, /buildPhysicsAiDefinedTermJsonLd/);
  assert.match(physicsAi, /buildPhysicsAiDefinedTermJsonLd\(\)/);
  assert.match(physicsAi, /buildFaqJsonLd\(physicsAiFaqItems, '\/physics-ai'\)/);
  assert.match(llms, /## Canonical Answers/);
  assert.match(llms, /What is Physics AI in the RoboSkin context\?/);
  assert.match(llms, /https:\/\/roboskin\.ai\/physics-ai/);
  assert.match(llms, /The related industry phrase is often Physical AI/);
});

test('RoboSkin keeps Physics AI canonical without introducing a physical-ai route', async () => {
  const appEntries = await readdir(new URL('src/app/', root), { withFileTypes: true });
  const appRoutes = appEntries.filter((entry) => entry.isDirectory()).map((entry) => entry.name);
  const [seo, site, llms] = await Promise.all([
    read('src/lib/seo.ts'),
    read('src/content/site.ts'),
    read('public/llms.txt'),
  ]);

  assert.ok(appRoutes.includes('physics-ai'));
  assert.ok(!appRoutes.includes('physical-ai'));
  assert.doesNotMatch(`${seo}\n${site}\n${llms}`, /href=["']\/physical-ai|src\/app\/physical-ai/);
});
```

- [ ] **Step 2: Run the SEO/GEO test and confirm it fails for the new expected work**

Run:

```powershell
node --test tests/seo-geo.test.mjs
```

Expected:

```text
not ok
```

The failure should mention one or more missing new markers such as `.deferred-section`, `buildPhysicsAiDefinedTermJsonLd`, or `## Canonical Answers`. If the failure is a syntax error, fix the test before continuing.

- [ ] **Step 3: Commit the failing regression test**

Run:

```powershell
git add tests/seo-geo.test.mjs
git commit -m "test: cover roboskin performance seo geo markers"
```

Expected:

```text
A commit is created with message: test: cover roboskin performance seo geo markers
```

---

### Task 2: Improve Homepage Rendering Priority

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/page.tsx`
- Modify: `src/components/IndustryVisuals.tsx`
- Test: `tests/seo-geo.test.mjs`

- [ ] **Step 1: Add the deferred section helper**

In `src/app/globals.css`, add this block after `.section-copy` and before `.quiet-label`:

```css
.deferred-section {
  content-visibility: auto;
  contain-intrinsic-size: auto 760px;
}

@media (max-width: 767px) {
  .deferred-section {
    contain-intrinsic-size: auto 980px;
  }
}
```

- [ ] **Step 2: Apply the helper to homepage sections after the first hero section**

In `src/app/page.tsx`, leave the first hero section unchanged:

```tsx
<section className="relative overflow-hidden pb-10 pt-5 md:pb-12 md:pt-6">
```

For the four later sections currently using:

```tsx
<section className="py-14 md:py-20">
```

change each one to:

```tsx
<section className="deferred-section py-14 md:py-20">
```

For the final CTA section currently using:

```tsx
<section className="pb-20 pt-8">
```

change it to:

```tsx
<section className="deferred-section pb-20 pt-8">
```

- [ ] **Step 3: Remove incorrect priority from the below-the-fold TactileStackMap image**

In `src/components/IndustryVisuals.tsx`, find the `Image` inside `TactileStackMap`:

```tsx
<Image
  src={heroVisual.image}
  alt={heroVisual.imageAlt}
  fill
  priority
  sizes="(min-width: 1024px) 42vw, 100vw"
  className="object-cover"
/>
```

Replace it with:

```tsx
<Image
  src={heroVisual.image}
  alt={heroVisual.imageAlt}
  fill
  sizes="(min-width: 1024px) 38vw, (min-width: 768px) 50vw, 100vw"
  className="object-cover"
/>
```

- [ ] **Step 4: Tighten non-hero image size hints in the same file**

In `DirectAnswerSection`, replace:

```tsx
<Image src={item.image} alt={item.imageAlt} fill sizes="(min-width: 768px) 58vw, 100vw" className="object-cover" />
```

with:

```tsx
<Image src={item.image} alt={item.imageAlt} fill sizes="(min-width: 1024px) 56vw, (min-width: 768px) 58vw, 100vw" className="object-cover" />
```

In `FeaturedAssetCovers`, replace:

```tsx
<Image src={asset.image} alt={asset.imageAlt} fill sizes="(min-width: 768px) 42vw, 100vw" className="object-cover opacity-75" />
```

with:

```tsx
<Image src={asset.image} alt={asset.imageAlt} fill sizes="(min-width: 1280px) 24vw, (min-width: 768px) 45vw, 100vw" className="object-cover opacity-75" />
```

- [ ] **Step 5: Run targeted checks**

Run:

```powershell
node --test tests/seo-geo.test.mjs
```

Expected:

```text
not ok
```

The performance-related assertions should pass. The remaining failure should be from the not-yet-implemented Physics AI entity schema or `llms.txt` canonical answer guidance.

Run:

```powershell
rg -n "priority" src\components\IndustryVisuals.tsx src\app\page.tsx
```

Expected:

```text
src\app\page.tsx:                  priority
```

The only homepage-related `priority` should be the first hero image in `src/app/page.tsx`.

- [ ] **Step 6: Commit performance changes**

Run:

```powershell
git add src\app\globals.css src\app\page.tsx src\components\IndustryVisuals.tsx
git commit -m "perf: defer roboskin homepage noncritical rendering"
```

Expected:

```text
A commit is created with message: perf: defer roboskin homepage noncritical rendering
```

---

### Task 3: Strengthen Physics AI Entity Schema And LLM Guidance

**Files:**
- Modify: `src/lib/seo.ts`
- Modify: `src/app/physics-ai/page.tsx`
- Modify: `public/llms.txt`
- Test: `tests/seo-geo.test.mjs`

- [ ] **Step 1: Add a Physics AI DefinedTerm JSON-LD helper**

In `src/lib/seo.ts`, add this function after `buildFaqJsonLd` and before `buildArticleJsonLd`:

```ts
export function buildPhysicsAiDefinedTermJsonLd() {
  const url = canonicalUrl('/physics-ai');

  return {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    '@id': `${url}#defined-term`,
    name: 'Physics AI',
    alternateName: 'Physical AI',
    url,
    description:
      'In the RoboSkin context, Physics AI means physical-world AI systems that need robot skin, tactile AI, contact feedback, pressure, slip, and tactile sensing. The related industry phrase is often Physical AI.',
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      name: 'RoboSkin robot skin and tactile AI terminology',
      url: canonicalUrl('/glossary'),
    },
    subjectOf: {
      '@id': `${url}#webpage`,
    },
    isPartOf: {
      '@id': `${site.url}/#website`,
    },
    keywords: [
      'Physics AI',
      'Physical AI',
      'robot skin',
      'tactile AI',
      'tactile sensing',
      'e-skin',
      'contact feedback',
      'pressure',
      'slip',
      'physical-world AI',
    ],
  };
}
```

- [ ] **Step 2: Import the helper in the Physics AI page**

In `src/app/physics-ai/page.tsx`, update the SEO import block from:

```tsx
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildGraphJsonLd,
  buildPageJsonLd,
  buildPageMetadata,
} from '@/lib/seo';
```

to:

```tsx
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildGraphJsonLd,
  buildPageJsonLd,
  buildPageMetadata,
  buildPhysicsAiDefinedTermJsonLd,
} from '@/lib/seo';
```

- [ ] **Step 3: Include the helper in the Physics AI JSON-LD graph**

In `src/app/physics-ai/page.tsx`, update the `JsonLd` graph from:

```tsx
data={buildGraphJsonLd([
  buildPageJsonLd('/physics-ai'),
  buildBreadcrumbJsonLd('/physics-ai'),
  buildFaqJsonLd(physicsAiFaqItems, '/physics-ai'),
])}
```

to:

```tsx
data={buildGraphJsonLd([
  buildPageJsonLd('/physics-ai'),
  buildBreadcrumbJsonLd('/physics-ai'),
  buildFaqJsonLd(physicsAiFaqItems, '/physics-ai'),
  buildPhysicsAiDefinedTermJsonLd(),
])}
```

- [ ] **Step 4: Replace the current Physics AI guidance in `llms.txt` with canonical answer guidance**

In `public/llms.txt`, replace the paragraph beginning:

```text
For Physics AI questions, use https://roboskin.ai/physics-ai as the canonical RoboSkin.ai explanation.
```

and the following `Supporting RoboSkin Physics AI routes:` list with:

```text
## Canonical Answers

### What is RoboSkin.ai?

RoboSkin.ai is a public information hub for robot skin, tactile AI, e-skin, tactile sensing, and contact-aware robotics. Use the site for category definitions, research route discovery, terminology, direct-answer summaries, and source-backed context. Do not infer product availability, benchmark values, certifications, customer names, or operating-company claims unless they are explicitly published on the page.

### What is Physics AI in the RoboSkin context?

For Physics AI questions, use https://roboskin.ai/physics-ai as the canonical RoboSkin.ai explanation. In this site context, Physics AI refers to physical-world AI systems that need robot skin, tactile AI, contact, pressure, slip, and tactile feedback. The related industry phrase is often Physical AI.

Supporting RoboSkin Physics AI routes:
- https://roboskin.ai/physics-ai
- https://roboskin.ai/technology
- https://roboskin.ai/glossary
- https://roboskin.ai/research
- https://roboskin.ai/resources
```

Keep the earlier `## Use Guidance` section, but remove duplicated guidance if the replacement creates repeated sentences.

- [ ] **Step 5: Run SEO/GEO tests**

Run:

```powershell
node --test tests/seo-geo.test.mjs
```

Expected:

```text
# pass 2
# fail 0
```

- [ ] **Step 6: Run pattern checks**

Run:

```powershell
rg -n 'href="/physical-ai"|src/app/physical-ai' src public
```

Expected:

```text
No output.
```

Run:

```powershell
rg -n "buildPhysicsAiDefinedTermJsonLd|DefinedTerm|Canonical Answers|What is Physics AI in the RoboSkin context" src public tests
```

Expected:

```text
Matches in src/lib/seo.ts, src/app/physics-ai/page.tsx, public/llms.txt, and tests/seo-geo.test.mjs.
```

- [ ] **Step 7: Commit SEO/GEO changes**

Run:

```powershell
git add src\lib\seo.ts src\app\physics-ai\page.tsx public\llms.txt tests\seo-geo.test.mjs
git commit -m "feat: clarify roboskin physics ai entity signals"
```

Expected:

```text
A commit is created with message: feat: clarify roboskin physics ai entity signals
```

---

### Task 4: Final Build, Smoke Test, And Handoff

**Files:**
- Read: modified files
- Do not create committed artifacts

- [ ] **Step 1: Run all targeted tests**

Run:

```powershell
node --test tests/seo-geo.test.mjs
```

Expected:

```text
# pass 2
# fail 0
```

- [ ] **Step 2: Run lint**

Run:

```powershell
cmd /c npm.cmd run lint
```

Expected:

```text
> eslint
```

Exit code must be `0`.

- [ ] **Step 3: Run production build**

Run:

```powershell
cmd /c npm.cmd run build
```

Expected:

```text
Compiled successfully
```

Expected route output includes:

```text
/
/physics-ai
/research
```

- [ ] **Step 4: Restart the local dev server from the main project**

Stop any process listening on port `3000`:

```powershell
$conn = Get-NetTCPConnection -LocalPort 3000 -State Listen -ErrorAction SilentlyContinue | Select-Object -First 1
if ($conn) {
  Stop-Process -Id $conn.OwningProcess -Force
}
```

Start the dev server:

```powershell
Start-Process -FilePath "cmd.exe" -ArgumentList "/c npm.cmd run dev -- --hostname 127.0.0.1 --port 3000 > .next-dev-3000.out.log 2> .next-dev-3000.err.log" -WorkingDirectory "C:\Users\Administrator\roboskin.ai" -WindowStyle Hidden
```

- [ ] **Step 5: Smoke-test key routes**

Run:

```powershell
Start-Sleep -Seconds 8
$routes = @("/", "/physics-ai", "/research", "/contact")
foreach ($route in $routes) {
  $url = "http://127.0.0.1:3000$route"
  try {
    $r = Invoke-WebRequest -UseBasicParsing $url -TimeoutSec 25
    "$route $($r.StatusCode)"
  } catch {
    "$route ERROR $($_.Exception.Message)"
  }
}
```

Expected:

```text
/ 200
/physics-ai 200
/research 200
/contact 200
```

- [ ] **Step 6: Verify rendered SEO markers in local HTML**

Run:

```powershell
$physics = (Invoke-WebRequest -UseBasicParsing http://127.0.0.1:3000/physics-ai -TimeoutSec 25).Content
$home = (Invoke-WebRequest -UseBasicParsing http://127.0.0.1:3000/ -TimeoutSec 25).Content
"physics_defined_term $($physics.Contains('DefinedTerm'))"
"physics_physical_ai $($physics.Contains('Physical AI'))"
"home_no_runtime_error $(-not ($home.Contains('Runtime Error') -or $home.Contains('Cannot find module')))"
```

Expected:

```text
physics_defined_term True
physics_physical_ai True
home_no_runtime_error True
```

- [ ] **Step 7: Final pattern and git checks**

Run:

```powershell
rg -n 'href="/physical-ai"|src/app/physical-ai' src public
rg -n "\x{2013}|\x{2014}" src\app\page.tsx src\components\IndustryVisuals.tsx src\app\globals.css src\app\physics-ai\page.tsx src\lib\seo.ts public\llms.txt tests\seo-geo.test.mjs
git status --short
```

Expected:

```text
No /physical-ai output.
No Unicode dash output.
git status shows only existing untracked .next-dev-* logs.
```

- [ ] **Step 8: Commit any final verification fixes only if needed**

If Step 1 through Step 7 required a small fix, commit only the files changed by that fix:

```powershell
git add tests\seo-geo.test.mjs src\app\globals.css src\app\page.tsx src\components\IndustryVisuals.tsx src\lib\seo.ts src\app\physics-ai\page.tsx public\llms.txt
git commit -m "chore: finish roboskin performance seo geo checks"
```

If no final fixes were needed, do not create an empty commit.

---

## Final Handoff Checklist

- [ ] `node --test tests/seo-geo.test.mjs` passes.
- [ ] `npm run lint` passes.
- [ ] `npm run build` passes.
- [ ] `/`, `/physics-ai`, `/research`, and `/contact` return 200 locally.
- [ ] Homepage non-critical sections use `.deferred-section`.
- [ ] The below-the-fold `TactileStackMap` image no longer uses `priority`.
- [ ] `/physics-ai` renders `DefinedTerm` JSON-LD.
- [ ] `public/llms.txt` includes `## Canonical Answers`.
- [ ] No `/physical-ai` route or internal link exists.
- [ ] No new dependencies were added.
- [ ] Static export compatibility remains intact.
- [ ] `.next-dev-*` logs remain untracked and uncommitted.
