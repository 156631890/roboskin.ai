# RoboSkin Cold Lab Editorial UI Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade the existing RoboSkin.ai homepage and shared visual components into the approved cold lab editorial direction without changing routes, SEO behavior, form behavior, or content strategy.

**Architecture:** Keep the current Next.js App Router structure and Tailwind v4 utility workflow. Make scoped visual changes in global CSS tokens, homepage composition, and the existing shared visual components rather than introducing a new component library or animation package.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS 4, `next/image`, existing generated WebP assets, CSS-only motion.

---

## File Structure

- Modify `src/app/globals.css`: visual tokens, background, button styles, panel styles, focus states, reduced-motion behavior, and new cold-lab utility classes.
- Modify `src/app/page.tsx`: homepage hero composition, stats strip, section headers, CTA emphasis, and section rhythm.
- Modify `src/components/Navigation.tsx`: less pill-heavy desktop nav, consistent dark logo mark, mobile button focus and active states.
- Modify `src/components/Footer.tsx`: remove inconsistent light icon surface, align footer hover and brand treatment with cold-lab tokens.
- Modify `src/components/IndustryVisuals.tsx`: reduce repeated cyan labels, update authority/direct-answer/research/resource/CTA visual components.
- Verify with `npm run lint`, `npm run build`, and browser inspection at desktop and mobile widths.

## Task 1: Global Cold Lab Visual Tokens

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Replace visual tokens and background treatment**

Update `:root` to use graphite, cold silver, and signal cyan values:

```css
:root {
  --bg: #02050a;
  --bg-soft: #070b12;
  --panel: #0b1018;
  --panel-strong: #101722;
  --panel-border: rgba(199, 220, 244, 0.12);
  --text: #f4f8fb;
  --text-soft: #97a4b5;
  --text-muted: #667386;
  --primary: #dff8ff;
  --secondary: #00c8ff;
  --accent: #00c8ff;
  --max-width: 1440px;
  --radius-lg: 16px;
  --radius-md: 10px;
  --grid: color-mix(in srgb, var(--secondary) 8%, transparent);
}
```

Replace the current body background with a less glowy lab background:

```css
body {
  background:
    radial-gradient(circle at 74% 8%, rgba(0, 200, 255, 0.12), transparent 30rem),
    radial-gradient(circle at 0% 22%, rgba(125, 146, 170, 0.08), transparent 34rem),
    linear-gradient(180deg, #02050a 0%, #050910 44%, #070b12 100%);
  color: var(--text);
  font-family: var(--font-space-grotesk), "Segoe UI", sans-serif;
  text-rendering: geometricPrecision;
  overflow-x: hidden;
}
```

- [ ] **Step 2: Add interaction and focus standards**

Add global focus and reduced-motion rules:

```css
:focus-visible {
  outline: 2px solid var(--secondary);
  outline-offset: 3px;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 3: Rework shared classes**

Update `.eyebrow`, `.glass-card`, `.hero-visual-frame`, `.btn-*`, and `.signal-panel` to reduce glow and use sharper editorial contrast:

```css
.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #b8eefe;
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.eyebrow::before {
  content: "";
  width: 2rem;
  height: 1px;
  background: var(--secondary);
}

.signal-panel {
  border: 1px solid var(--panel-border);
  border-radius: var(--radius-lg);
  background:
    linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px),
    linear-gradient(180deg, rgba(255, 255, 255, 0.028) 1px, transparent 1px),
    linear-gradient(180deg, rgba(11, 16, 24, 0.96), rgba(3, 7, 12, 0.98));
  background-size: 42px 42px, 42px 42px, auto;
  box-shadow:
    0 24px 80px rgba(0, 10, 24, 0.34),
    inset 0 1px 0 rgba(255, 255, 255, 0.045);
}
```

- [ ] **Step 4: Run lint**

Run: `npm run lint`

Expected: exits 0.

## Task 2: Homepage Hero and Section Rhythm

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Recompose the hero first viewport**

Change the opening grid to make the image dominant and copy more editorial. Keep the existing figure block that renders `homeBrandAssets.hero.image`, but move it into the wider `1.28fr` column and update its caption styling in Task 1 shared classes:

```tsx
<section className="relative overflow-hidden pb-16 pt-8 md:pb-20 md:pt-10">
  <div className="container-shell">
    <div className="grid min-h-[calc(100dvh-96px)] items-center gap-8 lg:grid-cols-[0.72fr_1.28fr]">
      <div className="hero-copy reveal relative z-10 min-w-0">
        <p className="section-label">Robot touch needs a surface intelligence layer</p>
        <h1 className="mt-5 text-5xl font-bold leading-[0.92] text-white text-balance md:text-7xl md:leading-[0.9] xl:text-[5.4rem]">
          Robot skin for physical AI touch
        </h1>
        <p className="mt-7 max-w-xl text-lg leading-relaxed text-[#c8d1de]">
          RoboSkin.ai maps robot skin, tactile AI, e-skin, tactile sensors, and humanoid robot skin for people tracking contact-aware robotics.
        </p>
      </div>
    </div>
  </div>
</section>
```

Keep the existing `homeBrandAssets.hero.image` and alt text.

- [ ] **Step 2: Rebalance CTA hierarchy**

Keep the same destinations, but make `/research` and `/glossary` the primary pair and make source submission tertiary:

```tsx
<div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
  <Link href="/research" className="btn-primary w-full sm:w-auto">
    Browse robot skin research
  </Link>
  <Link href="/glossary" className="btn-secondary w-full sm:w-auto">
    Open the robot skin glossary
  </Link>
  <Link href="/contact?requestType=research" className="btn-tertiary w-full sm:w-auto">
    Submit a source
  </Link>
</div>
```

- [ ] **Step 3: Convert stats to an instrumentation strip**

Replace the current four glowing stats cards with a quieter strip using the same `homeStats` content:

```tsx
<dl className="instrument-strip reveal mt-8 grid gap-px overflow-hidden sm:grid-cols-2 lg:grid-cols-4">
  {homeStats.map((item) => (
    <div key={item.label} className="bg-[#050910]/88 p-5">
      <dt className="font-mono text-sm font-semibold text-[#edf7ff]">{item.value}</dt>
      <dd className="mt-1 text-sm leading-relaxed text-[#97a4b5]">{item.label}</dd>
    </div>
  ))}
</dl>
```

- [ ] **Step 4: Reduce repeated header patterns**

For downstream sections, keep the same content but vary header layout:

- Authority index: keep split header but reduce button cluster to a line of text links or a compact route bar.
- Direct answers: use a single vertical header, no extra badge styling beyond one `eyebrow`.
- Research/resources: avoid two consecutive identical `mb-8 max-w-3xl` blocks by using one split and one simple stacked header.
- Final CTA: left-align instead of full centered card when possible.

- [ ] **Step 5: Run lint**

Run: `npm run lint`

Expected: exits 0.

## Task 3: Navigation and Footer Alignment

**Files:**
- Modify: `src/components/Navigation.tsx`
- Modify: `src/components/Footer.tsx`

- [ ] **Step 1: Update desktop navigation treatment**

Keep link labels and hrefs unchanged. Replace rounded pill nav links with precise rectangular active states:

```tsx
className={
  'border-b px-3 py-2 text-sm font-semibold transition-colors duration-200 ' +
  (pathname === link.href
    ? 'border-[#00c8ff] text-[#f4f8fb]'
    : 'border-transparent text-[#97a4b5] hover:border-white/18 hover:text-white')
}
```

- [ ] **Step 2: Replace mobile menu icon SVG with CSS bars**

Avoid hand-rolled SVG paths by using semantic spans:

```tsx
<span aria-hidden="true" className="grid gap-1.5">
  <span className={mobileMenuOpen ? 'h-px w-6 rotate-45 bg-current transition-transform' : 'h-px w-6 bg-current transition-transform'} />
  <span className={mobileMenuOpen ? 'h-px w-6 -translate-y-[7px] -rotate-45 bg-current transition-transform' : 'h-px w-6 bg-current transition-transform'} />
</span>
```

- [ ] **Step 3: Align footer brand mark with header**

Use the same 4x4 tactile grid mark style in footer and remove the current light surface icon. Keep footer links and contact text.

- [ ] **Step 4: Run lint**

Run: `npm run lint`

Expected: exits 0.

## Task 4: Industry Visual Components

**Files:**
- Modify: `src/components/IndustryVisuals.tsx`

- [ ] **Step 1: Simplify `AuthorityIndex`**

Keep all links and group content. Change the group cards into editorial route panels with less heavy glow, `border-t` item dividers, and a single hover state.

- [ ] **Step 2: Simplify `DirectAnswerSection` labels**

Use the index number as the label instead of repeating "Direct answer" for every row:

```tsx
{answers.map((item, index) => (
  <article key={item.question} className="grid gap-5 border-b border-white/8 p-5 last:border-b-0 md:grid-cols-[96px_0.48fr_1fr] md:p-7">
    <span className="font-mono text-sm font-semibold text-[#00c8ff]">{String(index + 1).padStart(2, '0')}</span>
    <h3 className="text-xl font-semibold text-white">{item.question}</h3>
    <div>
      {item.image && item.imageAlt ? (
        <div className="relative mb-5 aspect-[16/7] overflow-hidden rounded-[var(--radius-md)] border border-white/10 bg-[#02050a]">
          <Image src={item.image} alt={item.imageAlt} fill sizes="(min-width: 768px) 58vw, 100vw" className="object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,5,10,0.03),rgba(2,5,10,0.56))]" />
        </div>
      ) : null}
      <p className="text-base leading-relaxed text-[#c8d1de]">{item.answer}</p>
      <Link href={item.href} className="mt-4 inline-flex text-sm font-semibold text-[#b8eefe] transition-colors hover:text-white">
        {item.ctaLabel} {'->'}
      </Link>
    </div>
  </article>
))}
```

- [ ] **Step 3: Lock asset cards to one accent system**

Keep `accentStyles` for data compatibility, but reduce visible multi-color output. Use cyan/cold-silver for borders, labels, and CTA hover states across `FeaturedAssetCovers`.

- [ ] **Step 4: Update `ConversionPathPanel`**

Keep three contact paths and hrefs. Use one primary cyan panel and two quiet graphite panels without amber/teal drift.

- [ ] **Step 5: Run lint**

Run: `npm run lint`

Expected: exits 0.

## Task 5: Final Verification and Browser QA

**Files:**
- No source edits unless verification finds a concrete UI defect.

- [ ] **Step 1: Run lint**

Run: `npm run lint`

Expected: exits 0.

- [ ] **Step 2: Run production build**

Run: `npm run build`

Expected: exits 0 and static export completes.

- [ ] **Step 3: Start local dev server on an open port**

Use port `3002` unless occupied:

```powershell
Get-NetTCPConnection -LocalPort 3002 -State Listen -ErrorAction SilentlyContinue
cmd /c npm run dev -- --hostname 127.0.0.1 --port 3002
```

Expected: Next.js reports ready at `http://127.0.0.1:3002`.

- [ ] **Step 4: Desktop browser QA**

Open `http://127.0.0.1:3002` around 1440px width and verify:

- Hero title is readable and not clipped.
- Hero CTAs are visible in first viewport.
- Hero image is dominant and nonblank.
- Next section is hinted below first viewport.
- No text overlaps in section headers.

- [ ] **Step 5: Mobile browser QA**

Inspect around 390px width and verify:

- Hero title wraps cleanly.
- CTAs remain readable and do not overflow.
- Mobile menu opens and closes.
- Images keep stable aspect ratios.
- No horizontal scroll.

- [ ] **Step 6: Check final git diff**

Run: `git diff --stat` and `git diff --check`

Expected: no whitespace errors and changes are limited to planned source files plus this plan file.
