# RoboSkin Visual Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rework the RoboSkin website into a restrained product-led design with a neutral base, a single accent color, cleaner spacing, and a more credible B2B hardware feel.

**Architecture:** Keep the current App Router structure and the PRD-driven page map, but shift the visual system into a small set of reusable tokens and layout primitives. The work should start at the theme layer, then move to reusable containers/cards/buttons, and finally update the page surfaces one by one so the whole site stays visually consistent while reducing neon, glow, and glass-heavy styling.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Tailwind CSS 4

---

### Task 1: Replace the neon theme with a neutral-led palette

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Define the new base tokens**

```css
:root {
  --bg: #f6f4ef;
  --bg-soft: #eeeae2;
  --panel: #ffffff;
  --panel-border: #d9d3c8;
  --text: #111318;
  --text-soft: #61656f;
  --primary: #2e5bff;
  --secondary: #0f766e;
  --accent: #2e5bff;
}
```

- [ ] **Step 2: Swap the global page background and grid treatment**

```css
body {
  background:
    radial-gradient(circle at 12% 0%, rgba(46, 91, 255, 0.08) 0, transparent 34%),
    linear-gradient(180deg, #f7f5f0 0%, #f3efe7 100%);
  color: var(--text);
}
```

- [ ] **Step 3: Reduce the visual intensity of `glass-card` and `eyebrow`**

```css
.glass-card {
  background: rgba(255, 255, 255, 0.88);
  border: 1px solid var(--panel-border);
  box-shadow: 0 12px 30px rgba(17, 19, 24, 0.05);
}
```

- [ ] **Step 4: Update the root layout theme color and body class defaults**

```tsx
<meta name="theme-color" content="#f6f4ef" />
```

- [ ] **Step 5: Run a quick style sanity check**

Run: `npm run lint`
Expected: no lint errors from the theme changes.

---

### Task 2: Introduce reusable neutral layout primitives

**Files:**
- Modify: `src/components/Navigation.tsx`
- Modify: `src/components/Footer.tsx`
- Modify: `src/components/LegacyRouteStub.tsx`
- Modify: `src/components/ContactForm.tsx`
- Modify: `src/app/contact/page.tsx`

- [ ] **Step 1: Restyle the site chrome around a light surface**

```tsx
<nav className="sticky top-0 z-50 border-b border-[#d9d3c8] bg-[rgba(246,244,239,0.88)] backdrop-blur-md">
```

- [ ] **Step 2: Replace the current glowing logo block with a restrained badge**

```tsx
<div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#d9d3c8] bg-white text-[#2e5bff]">
```

- [ ] **Step 3: Make footer columns and contact text visually quieter**

```tsx
<footer className="mt-auto border-t border-[#d9d3c8] bg-[#f3efe7]">
```

- [ ] **Step 4: Restyle the contact form into a clean inquiry panel**

```tsx
<form className="glass-card space-y-5 p-6 md:p-8">
```

- [ ] **Step 5: Confirm the form remains readable on mobile**

Run: `npm run dev`
Expected: contact form keeps full-width labels, clear borders, and a quieter submit button.

---

### Task 3: Refresh the homepage into a product-led landing page

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/content/site.ts`

- [ ] **Step 1: Switch the hero to a light surface and a single blue CTA**

```tsx
<section className="relative overflow-hidden bg-[#f6f4ef] py-24 md:py-28">
```

- [ ] **Step 2: Replace the product summary panel with a narrow product strip**

```tsx
const productCards = [
  { name: 'RS-1000 Sensor Array', cta: 'Request datasheet' },
  { name: 'Developer Kit', cta: 'Talk to engineering' },
  { name: 'Custom Integration Program', cta: 'Request a demo' },
];
```

- [ ] **Step 3: Restyle use cases into calm, readable cards**

```tsx
<article className="rounded-2xl border border-[#d9d3c8] bg-white p-7">
```

- [ ] **Step 4: Replace the technology section with a clean four-layer stack**

```tsx
<div className="grid gap-4 lg:grid-cols-2">
```

- [ ] **Step 5: Keep only one dark CTA band at the bottom**

```tsx
<section className="bg-[#111318] py-20 text-white">
```

- [ ] **Step 6: Verify the homepage still routes CTA buttons correctly**

Run: `npm run build`
Expected: homepage builds and CTA query parameters still resolve to the contact page.

---

### Task 4: Re-style products, solutions, technology, resources, and about

**Files:**
- Modify: `src/app/products/page.tsx`
- Modify: `src/app/solutions/page.tsx`
- Modify: `src/app/technology/page.tsx`
- Modify: `src/app/resources/page.tsx`
- Modify: `src/app/about/page.tsx`
- Modify: `src/app/faq/page.tsx`

- [ ] **Step 1: Convert product pages into flat catalog cards**

```tsx
<article className="rounded-2xl border border-[#d9d3c8] bg-white p-7 md:p-8">
```

- [ ] **Step 2: Give solutions pages a quieter problem-first grid**

```tsx
<article className="rounded-2xl border border-[#d9d3c8] bg-[#fbfaf7] p-7 md:p-8">
```

- [ ] **Step 3: Simplify technology into a neutral layered stack**

```tsx
<article className="rounded-2xl border border-[#d9d3c8] bg-white p-7 md:p-8">
```

- [ ] **Step 4: Make resources feel like requestable technical material**

```tsx
<div className="grid gap-4 md:grid-cols-2">
```

- [ ] **Step 5: Keep about and FAQ visually consistent with the rest of the site**

```tsx
<section className="py-20 md:py-24">
```

- [ ] **Step 6: Verify these pages still reuse the same CTA and card language**

Run: `rg -n "glass-card|bg-\\[#031123\\]|bg-gradient-to-r from-cyan|to-purple" src/app src/components`
Expected: old neon-specific styling is removed from the pages above.

---

### Task 5: Remove leftover visual noise and verify consistency

**Files:**
- Modify: `src/app/privacy/page.tsx`
- Modify: `src/app/terms/page.tsx`
- Modify: `src/app/applications/page.tsx`
- Modify: `src/app/research/page.tsx`
- Modify: `src/app/case-studies/page.tsx`
- Modify: `src/app/partners/page.tsx`
- Modify: `src/app/team/page.tsx`
- Modify: `src/app/news/page.tsx`
- Modify: `src/app/careers/page.tsx`
- Modify: `src/app/research/[id]/page.tsx` if present again in future

- [ ] **Step 1: Make legal and legacy pages visually quiet**

```tsx
<LegacyRouteStub title="..." description="..." />
```

- [ ] **Step 2: Remove any residual glow-heavy treatments from legal pages**

```tsx
<section className="py-20 md:py-24">
```

- [ ] **Step 3: Re-run lint and build**

Run: `npm run lint`
Run: `npm run build`
Expected: both pass.

- [ ] **Step 4: Capture the final visual review checklist**

Confirm:
- one dominant accent color
- neutral background base
- reduced shadow/glow usage
- clear product-led homepage
- consistent card and CTA styling
