# RoboSkin Taste UI Targeted Evolution Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Improve the RoboSkin.ai homepage and global shell using Taste Skill guidance while preserving routes, SEO structure, content strategy, and dark technical brand identity.

**Architecture:** This is a targeted evolution of existing Next.js Server Components, one small Client Component (`Navigation`), and shared Tailwind CSS classes. The implementation should refine global tokens/classes first, then update the homepage composition and shared homepage visual components without introducing new dependencies.

**Tech Stack:** Next.js 15, React 19, Tailwind CSS 4, TypeScript, `next/font`, existing generated image assets.

---

## File Structure

Modify:

- `src/app/globals.css`: global background, panel, button, focus, texture, and helper classes.
- `src/components/Navigation.tsx`: desktop and mobile nav polish, focus-visible states, active styling.
- `src/app/page.tsx`: homepage hero composition, CTA count, section headings, final conversion section.
- `src/components/IndustryVisuals.tsx`: homepage supporting component visual rhythm, repeated labels, card/list density.

Read but do not modify unless a validation issue proves it necessary:

- `src/content/site.ts`: homepage content data and navigation data.
- `src/app/physics-ai/page.tsx`: smoke-check global style impact on a key SEO page.
- `src/app/research/page.tsx`: smoke-check global style impact on a key research page.

Do not modify:

- `src/lib/seo.ts`
- `src/app/sitemap.ts`
- `src/app/layout.tsx`
- `src/components/ContactForm.tsx`
- `src/lib/blog-data.ts`
- route slugs, nav labels, legal copy, contact field names, generated image assets, dependencies

---

### Task 1: Capture Baseline And Guardrails

**Files:**
- Read: `src/app/page.tsx`
- Read: `src/components/IndustryVisuals.tsx`
- Read: `src/app/globals.css`
- Read: `src/components/Navigation.tsx`
- Create outside repo if needed: `C:\tmp\roboskin-home-before-1440x900.png`
- Create outside repo if needed: `C:\tmp\roboskin-home-before-mobile.png`

- [ ] **Step 1: Confirm local server responds**

Run:

```powershell
try { $r = Invoke-WebRequest -UseBasicParsing http://127.0.0.1:3000/ -TimeoutSec 5; "STATUS $($r.StatusCode)" } catch { "ERROR $($_.Exception.Message)" }
```

Expected:

```text
STATUS 200
```

If the server is not running, start it in a hidden background process:

```powershell
Start-Process -FilePath "cmd.exe" -ArgumentList "/c npm.cmd run dev -- --host 127.0.0.1 --port 3000 > .next-dev-3000.out.log 2> .next-dev-3000.err.log" -WorkingDirectory "C:\Users\Administrator\roboskin.ai" -WindowStyle Hidden
```

Then rerun the status check.

- [ ] **Step 2: Capture desktop baseline screenshot**

Run:

```powershell
& "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" --headless --disable-gpu --screenshot="C:\tmp\roboskin-home-before-1440x900.png" --window-size=1440,900 http://127.0.0.1:3000/
```

Expected:

```text
bytes written to file C:\tmp\roboskin-home-before-1440x900.png
```

- [ ] **Step 3: Capture mobile baseline screenshot**

Run:

```powershell
& "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" --headless --disable-gpu --screenshot="C:\tmp\roboskin-home-before-mobile.png" --window-size=390,900 http://127.0.0.1:3000/
```

Expected:

```text
bytes written to file C:\tmp\roboskin-home-before-mobile.png
```

- [ ] **Step 4: Record current homepage label baseline**

Run:

```powershell
rg -n "eyebrow|uppercase tracking" src\app\page.tsx src\components\IndustryVisuals.tsx
```

Expected:

```text
Multiple matches in src\app\page.tsx and src\components\IndustryVisuals.tsx. This is the baseline to reduce.
```

- [ ] **Step 5: Record no-route-change guard**

Run:

```powershell
git status --short
```

Expected:

```text
Only existing untracked .next-dev-* logs before code edits.
```

Do not stage or delete `.next-dev-*` logs.

---

### Task 2: Refine Global Visual System

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Update global texture, panels, buttons, and focus states**

In `src/app/globals.css`, keep the same CSS class names so existing pages continue to work. Apply these exact directional changes:

```css
:root {
  --bg: #020408;
  --bg-soft: #060a10;
  --panel: #0a0f16;
  --panel-border: rgba(209, 231, 255, 0.095);
  --text: #f7fbff;
  --text-soft: #93a0b2;
  --primary: #00a8ff;
  --secondary: #00e5ff;
  --accent: #00c8ff;
  --max-width: 1440px;
  --radius-lg: 16px;
  --radius-md: 10px;
  --grid: color-mix(in srgb, var(--secondary) 7%, transparent);
}
```

Adjust `body::before` opacity from `0.2` to `0.13`, `body::after` opacity from `0.055` to `0.035`, and reduce the diagonal line strength from `rgba(0, 229, 255, 0.18)` to `rgba(0, 229, 255, 0.1)`.

Add or update focus-visible rules:

```css
a:focus-visible,
button:focus-visible {
  outline: 2px solid color-mix(in srgb, var(--secondary) 82%, white 18%);
  outline-offset: 3px;
}
```

Update button classes so all three use a no-wrap label and clear active feedback:

```css
.btn-primary,
.btn-secondary,
.btn-tertiary {
  white-space: nowrap;
  box-shadow: none;
}

.btn-primary {
  background: linear-gradient(135deg, #00a8ff, #00d5ff);
  color: #001018;
  box-shadow: 0 14px 32px rgba(0, 168, 255, 0.2);
}
```

Reduce `signal-panel` and `glass-card` glow by lowering large shadow opacity by roughly 25 percent and lowering grid opacity from `0.04` to `0.025`.

- [ ] **Step 2: Add restrained homepage helper classes**

Append these helper classes near the existing utility classes:

```css
.section-copy {
  max-width: 42rem;
  color: var(--text-soft);
  font-size: 0.95rem;
  line-height: 1.75;
  text-wrap: pretty;
}

.quiet-label {
  color: var(--secondary);
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.015em;
}

.hero-answer {
  border-left: 1px solid color-mix(in srgb, var(--secondary) 45%, transparent);
  padding-left: 1.1rem;
}
```

- [ ] **Step 3: Run CSS-related guard checks**

Run:

```powershell
rg -n "\x{2013}|\x{2014}" src\app\globals.css
```

Expected:

```text
No output.
```

Run:

```powershell
npm run lint
```

Expected:

```text
No ESLint errors.
```

- [ ] **Step 4: Commit global visual system changes**

Run:

```powershell
git add src\app\globals.css
git commit -m "style: refine roboskin global ui system"
```

Expected:

```text
[main <hash>] style: refine roboskin global ui system
```

---

### Task 3: Refine Navigation Shell

**Files:**
- Modify: `src/components/Navigation.tsx`

- [ ] **Step 1: Update nav class names without changing labels or hrefs**

In `src/components/Navigation.tsx`, preserve `primaryNavigation`, `site`, and all link labels. Update the outer nav and item styles to reduce active pill heaviness and improve focus states.

Use this structure for the desktop nav link class expression:

```tsx
className={
  'rounded-lg px-3.5 py-2 text-sm font-semibold outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-[#00e5ff]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#020408] ' +
  (pathname === link.href
    ? 'bg-[#00e5ff]/8 text-[#effbff] ring-1 ring-[#00e5ff]/20'
    : 'text-[#9aa6b8] hover:bg-white/[0.045] hover:text-white')
}
```

Update the CTA link class to:

```tsx
className="ml-2 rounded-lg border border-[#00e5ff]/45 bg-[#00d5ff] px-4 py-2 text-sm font-bold text-[#001018] shadow-[0_12px_28px_rgba(0,168,255,0.18)] outline-none transition-transform hover:-translate-y-0.5 active:translate-y-px focus-visible:ring-2 focus-visible:ring-[#00e5ff]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#020408]"
```

Update the mobile button class to include focus-visible:

```tsx
className="rounded-lg border border-white/10 bg-white/[0.04] p-2 text-white outline-none transition-colors hover:bg-white/[0.07] focus-visible:ring-2 focus-visible:ring-[#00e5ff]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#020408]"
```

- [ ] **Step 2: Preserve mobile menu behavior**

Verify these behavior lines remain present:

```tsx
const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
onClick={() => setMobileMenuOpen(false)}
aria-expanded={mobileMenuOpen}
aria-controls="mobile-navigation"
```

- [ ] **Step 3: Run navigation checks**

Run:

```powershell
rg -n "Home|Research|Glossary|Applications|Technology|Resources|About|Suggest Source" src\components\Navigation.tsx
```

Expected:

```text
Navigation still renders labels from primaryNavigation and keeps the Suggest Source CTA.
```

Run:

```powershell
npm run lint
```

Expected:

```text
No ESLint errors.
```

- [ ] **Step 4: Commit navigation shell changes**

Run:

```powershell
git add src\components\Navigation.tsx
git commit -m "style: polish roboskin navigation shell"
```

Expected:

```text
[main <hash>] style: polish roboskin navigation shell
```

---

### Task 4: Tighten Homepage Hero

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Update hero section spacing and grid**

In `src/app/page.tsx`, replace the opening hero section classes:

```tsx
<section className="relative overflow-hidden pb-16 pt-8 md:pb-20 md:pt-8">
```

with:

```tsx
<section className="relative overflow-hidden pb-10 pt-5 md:pb-12 md:pt-6">
```

Replace the hero grid class:

```tsx
<div className="grid min-h-[calc(100dvh-96px)] items-center gap-8 lg:grid-cols-[0.82fr_1.18fr]">
```

with:

```tsx
<div className="grid min-h-[calc(100dvh-82px)] items-center gap-7 lg:grid-cols-[0.74fr_1.26fr]">
```

- [ ] **Step 2: Reduce hero CTA count to two**

In the hero CTA block, remove only this link from the first viewport:

```tsx
<Link href="/contact?requestType=research" className="btn-tertiary w-full sm:w-auto">
  Submit a Source
</Link>
```

Keep these two links unchanged:

```tsx
<Link href="/research" className="btn-primary w-full sm:w-auto">
  Browse robot skin research
</Link>
<Link href="/glossary" className="btn-secondary w-full sm:w-auto">
  Open the robot skin glossary
</Link>
```

- [ ] **Step 3: Make the short intro and answer block quieter**

Replace the intro paragraph class:

```tsx
<p className="text-sm font-semibold text-[#00e5ff]">
```

with:

```tsx
<p className="quiet-label">
```

Replace:

```tsx
<div className="mt-8 max-w-xl border-l border-[#00e5ff]/55 pl-5">
```

with:

```tsx
<div className="hero-answer mt-7 max-w-xl">
```

- [ ] **Step 4: Lighten the hero image caption**

In the hero `figcaption`, keep the same text but reduce visual weight by changing:

```tsx
className="absolute bottom-5 left-5 right-5 grid gap-3 rounded-md border border-white/10 bg-[#03060a]/80 p-4 backdrop-blur md:grid-cols-[1fr_auto] md:items-end"
```

to:

```tsx
className="absolute bottom-4 left-4 right-4 grid gap-3 rounded-md border border-white/8 bg-[#03060a]/70 p-4 backdrop-blur-md md:grid-cols-[1fr_auto] md:items-end"
```

- [ ] **Step 5: Run homepage guard checks**

Run:

```powershell
rg -n "Submit a Source|Browse robot skin research|Open the robot skin glossary" src\app\page.tsx
```

Expected:

```text
Browse robot skin research and Open the robot skin glossary still appear in the hero. Submit a Source no longer appears in the hero CTA block, but the source-submission intent remains later in the page.
```

Run:

```powershell
rg -n "\x{2013}|\x{2014}" src\app\page.tsx
```

Expected:

```text
No output.
```

Run:

```powershell
npm run lint
```

Expected:

```text
No ESLint errors.
```

- [ ] **Step 6: Commit hero changes**

Run:

```powershell
git add src\app\page.tsx
git commit -m "style: tighten roboskin homepage hero"
```

Expected:

```text
[main <hash>] style: tighten roboskin homepage hero
```

---

### Task 5: Reduce Homepage Section Repetition

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/components/IndustryVisuals.tsx`

- [ ] **Step 1: Remove homepage section eyebrow repetition**

In `src/app/page.tsx`, replace homepage section `<span className="eyebrow">...</span>` occurrences after the hero with simpler headings or `quiet-label` text used sparingly.

Use this pattern for Authority Index:

```tsx
<div className="mb-8 max-w-4xl">
  <h2 className="text-3xl font-bold text-white md:text-5xl">Find the right robot skin route</h2>
  <p className="section-copy mt-4">
    Use this authority index to move from definitions to research, technology evaluation, references, resources, and inquiry paths.
  </p>
</div>
```

Use this pattern for Direct Answers:

```tsx
<div className="mb-8 max-w-4xl">
  <h2 className="text-3xl font-bold text-white md:text-5xl">
    Short answers to common robot skin and tactile AI questions
  </h2>
  <p className="section-copy mt-4">
    Direct-answer coverage supports readers and answer engines without turning source boundaries into product claims.
  </p>
</div>
```

Keep the existing H2 text where SEO wording is important. Do not rename routes or CTA destinations.

- [ ] **Step 2: Move source-submission intent into final CTA**

In the final CTA section of `src/app/page.tsx`, ensure there is a visible button or text link to:

```tsx
<Link href="/contact?requestType=research" className="btn-primary w-full sm:w-auto">
  Submit a source
</Link>
```

Keep the existing email line.

- [ ] **Step 3: Make DirectAnswerSection less label-heavy**

In `src/components/IndustryVisuals.tsx`, inside `DirectAnswerSection`, remove this repeated label:

```tsx
<p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#00e5ff]">Direct answer</p>
```

Replace the left column with:

```tsx
<div className="md:pt-1">
  <h3 className="text-xl font-semibold text-white">{item.question}</h3>
</div>
```

Keep `item.answer`, `item.href`, `item.ctaLabel`, and any existing image rendering unchanged.

- [ ] **Step 4: Make AuthorityIndex more directory-like**

In `src/components/IndustryVisuals.tsx`, change `AuthorityIndex` outer grid from:

```tsx
<div className="grid gap-4 lg:grid-cols-4">
```

to:

```tsx
<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
```

Within each group, keep the title and summary. Change link row styling from heavy rows to quieter rows:

```tsx
<Link href={link.href} className="group block py-3.5 transition-colors">
  <span className="block text-sm font-semibold text-[#e7f7ff] group-hover:text-white">{link.label}</span>
  <span className="mt-1 block text-xs leading-relaxed text-[#8e98a8] group-hover:text-[#b8c4d4]">{link.description}</span>
</Link>
```

- [ ] **Step 5: Make Market Signals less like a generic feature row**

In `src/app/page.tsx`, replace the market signals grid:

```tsx
<div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
```

with:

```tsx
<div className="signal-panel divide-y divide-white/8 overflow-hidden">
```

Render each signal as a row:

```tsx
{marketSignals.map((signal) => (
  <article key={signal.title} className="grid gap-3 p-5 md:grid-cols-[0.34fr_1fr] md:p-6">
    <h3 className="text-lg font-semibold text-white">{signal.title}</h3>
    <p className="text-sm leading-relaxed text-[#8e98a8]">{signal.description}</p>
  </article>
))}
```

- [ ] **Step 6: Run section repetition checks**

Run:

```powershell
rg -n "eyebrow|uppercase tracking" src\app\page.tsx src\components\IndustryVisuals.tsx
```

Expected:

```text
Fewer matches than Task 1 baseline. Remaining matches are allowed for hero image caption, data-like labels, or components used by other pages.
```

Run:

```powershell
rg -n "\x{2013}|\x{2014}" src\app\page.tsx src\components\IndustryVisuals.tsx
```

Expected:

```text
No output.
```

Run:

```powershell
npm run lint
```

Expected:

```text
No ESLint errors.
```

- [ ] **Step 7: Commit homepage section changes**

Run:

```powershell
git add src\app\page.tsx src\components\IndustryVisuals.tsx
git commit -m "style: reduce roboskin homepage repetition"
```

Expected:

```text
[main <hash>] style: reduce roboskin homepage repetition
```

---

### Task 6: Build, Screenshot, And Smoke-Test

**Files:**
- Read: all modified files
- Create outside repo: `C:\tmp\roboskin-home-after-1440x900.png`
- Create outside repo: `C:\tmp\roboskin-home-after-mobile.png`
- Create outside repo: `C:\tmp\roboskin-physics-ai-after-1440x900.png`

- [ ] **Step 1: Run final lint**

Run:

```powershell
npm run lint
```

Expected:

```text
No ESLint errors.
```

- [ ] **Step 2: Run production build**

Run:

```powershell
npm run build
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

- [ ] **Step 3: Restart dev server after build**

Because `next build` can leave the running dev server with stale `.next` chunks, restart the local dev server before browser checks.

Find and stop the current PID listening on port 3000:

```powershell
$line = cmd /c netstat -ano ^| findstr LISTENING ^| findstr ":3000" | Select-Object -First 1
if ($line) {
  $parts = ($line -split "\s+") | Where-Object { $_ }
  $processId = [int]$parts[-1]
  Stop-Process -Id $processId -Force
}
```

Start dev server:

```powershell
Start-Process -FilePath "cmd.exe" -ArgumentList "/c npm.cmd run dev -- --host 127.0.0.1 --port 3000 > .next-dev-3000.out.log 2> .next-dev-3000.err.log" -WorkingDirectory "C:\Users\Administrator\roboskin.ai" -WindowStyle Hidden
```

Wait five seconds, then run:

```powershell
try { $r = Invoke-WebRequest -UseBasicParsing http://127.0.0.1:3000/ -TimeoutSec 10; "STATUS $($r.StatusCode)" } catch { "ERROR $($_.Exception.Message)" }
```

Expected:

```text
STATUS 200
```

- [ ] **Step 4: Smoke-test key routes**

Run:

```powershell
$routes = @("/", "/physics-ai", "/research", "/contact")
foreach ($route in $routes) {
  $url = "http://127.0.0.1:3000$route"
  try {
    $r = Invoke-WebRequest -UseBasicParsing $url -TimeoutSec 10
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

- [ ] **Step 5: Capture after screenshots**

Run:

```powershell
& "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" --headless --disable-gpu --screenshot="C:\tmp\roboskin-home-after-1440x900.png" --window-size=1440,900 http://127.0.0.1:3000/
& "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" --headless --disable-gpu --screenshot="C:\tmp\roboskin-home-after-mobile.png" --window-size=390,900 http://127.0.0.1:3000/
& "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" --headless --disable-gpu --screenshot="C:\tmp\roboskin-physics-ai-after-1440x900.png" --window-size=1440,900 http://127.0.0.1:3000/physics-ai
```

Expected:

```text
bytes written to file C:\tmp\roboskin-home-after-1440x900.png
bytes written to file C:\tmp\roboskin-home-after-mobile.png
bytes written to file C:\tmp\roboskin-physics-ai-after-1440x900.png
```

- [ ] **Step 6: Visual inspection**

Use image inspection on:

```text
C:\tmp\roboskin-home-before-1440x900.png
C:\tmp\roboskin-home-after-1440x900.png
C:\tmp\roboskin-home-after-mobile.png
C:\tmp\roboskin-physics-ai-after-1440x900.png
```

Pass criteria:

- At `1440x900`, homepage H1, supporting paragraph, two hero CTAs, and hero image are visible without crowding.
- At `390x900`, homepage has no horizontal overflow, CTA labels remain readable, and the hero image appears after the text without clipping the text.
- `/physics-ai` remains visually coherent after global panel/button changes.
- No button text wraps on desktop.
- No section looks like a sudden theme switch.

- [ ] **Step 7: Final pattern checks**

Run:

```powershell
rg -n "\x{2013}|\x{2014}" src\app\page.tsx src\components\Navigation.tsx src\components\IndustryVisuals.tsx src\app\globals.css
rg -n "href=\"/physical-ai\"|src/app/physical-ai" src public
git status --short
```

Expected:

```text
No Unicode dash output from the first command.
No /physical-ai route output from the second command.
git status shows only existing untracked .next-dev-* logs.
```

- [ ] **Step 8: Commit any final visual QA fixes**

If Task 6 required small fixes after screenshots, commit them:

```powershell
git add src\app\page.tsx src\components\Navigation.tsx src\components\IndustryVisuals.tsx src\app\globals.css
git commit -m "style: finish roboskin taste ui polish"
```

Expected:

```text
[main <hash>] style: finish roboskin taste ui polish
```

If no final fixes were needed, do not create an empty commit.

---

## Final Handoff Checklist

- [ ] `npm run lint` passes.
- [ ] `npm run build` passes.
- [ ] Dev server restarted after build before visual checks.
- [ ] `/`, `/physics-ai`, `/research`, `/contact` return 200.
- [ ] Desktop and mobile homepage screenshots inspected.
- [ ] `/physics-ai` screenshot inspected for global-style regressions.
- [ ] No new dependencies added.
- [ ] No route, sitemap, SEO helper, or JSON-LD helper changed.
- [ ] No generated image assets changed.
- [ ] `.next-dev-*` logs remain untracked and uncommitted.
