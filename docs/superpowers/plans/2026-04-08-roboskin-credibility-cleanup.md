# RoboSkin Credibility Cleanup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Align the RoboSkin website with the approved PRD by removing unsupported claims, normalizing contact and navigation, and rewriting the primary customer-facing pages around credible B2B robotics content.

**Architecture:** Keep the existing Next.js App Router stack and Tailwind styling, but introduce a single source of truth for site copy and contact details so the same data drives navigation, footer, metadata, and page CTAs. Update the homepage and core route pages in place, de-emphasize legacy routes in navigation, and make legal/SEO metadata consistent with the new content model.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Tailwind CSS 4

---

### Task 1: Normalize shared site data

**Files:**
- Create: `src/content/site.ts`
- Modify: `src/app/layout.tsx`
- Modify: `src/components/Navigation.tsx`
- Modify: `src/components/Footer.tsx`

- [ ] **Step 1: Write the shared site config**

```ts
export const site = {
  name: 'RoboSkin.ai',
  url: 'https://roboskin.ai',
  contact: {
    primaryEmail: 'contact@roboskin.ai',
    salesEmail: 'sales@roboskin.ai',
    legalEmail: 'legal@roboskin.ai',
    privacyEmail: 'privacy@roboskin.ai',
  },
  nav: [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/solutions', label: 'Solutions' },
    { href: '/technology', label: 'Technology' },
    { href: '/resources', label: 'Resources' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ],
};
```

- [ ] **Step 2: Update layout metadata to use the new site identity**

```ts
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'RoboSkin.ai | Tactile Sensor Skin for Robotics',
    template: '%s | RoboSkin.ai',
  },
  description: 'RoboSkin.ai builds tactile sensor skin and integration support for robotics teams, OEM programs, and research deployments.',
};
```

- [ ] **Step 3: Replace hard-coded nav/footer contact references**

```tsx
<Link href={`mailto:${site.contact.primaryEmail}`}>{site.contact.primaryEmail}</Link>
```

- [ ] **Step 4: Verify no personal email or personal social handle remains in shared chrome**

Run: `rg -n "gmail|L89155W|messigoat147|WeChat|x.com" src`
Expected: no matches in shared chrome files.

---

### Task 2: Rewrite homepage and core customer journey

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/contact/page.tsx`
- Modify: `src/app/products/page.tsx`
- Modify: `src/app/technology/page.tsx`

- [ ] **Step 1: Replace the homepage hero with PRD-approved messaging**

```tsx
<h1>Flexible tactile sensor skin for robotic grippers, humanoids, and prosthetics</h1>
```

- [ ] **Step 2: Add the three product levels and approved CTA structure**

```tsx
const productLevels = [
  { name: 'Sensor Array', cta: 'Request datasheet' },
  { name: 'Developer Kit', cta: 'Talk to engineering' },
  { name: 'Custom Integration', cta: 'Request a demo' },
];
```

- [ ] **Step 3: Replace the current contact page with a real request form shell**

```tsx
<form method="post">
  <input name="fullName" />
  <input name="company" />
  <input name="email" />
  <textarea name="message" />
</form>
```

- [ ] **Step 4: Rewrite product and technology copy to remove unsupported claims**

```tsx
<p>Use only verified specs and neutral copy for performance statements.</p>
```

- [ ] **Step 5: Run the homepage and contact page through the browser locally**

Run: `npm run dev`
Expected: homepage loads, contact page renders, CTAs navigate to existing routes.

---

### Task 3: Retire unsupported routes from the main journey

**Files:**
- Modify: `src/components/Navigation.tsx`
- Modify: `src/components/Footer.tsx`
- Modify: `src/app/applications/page.tsx`
- Modify: `src/app/research/page.tsx`
- Modify: `src/app/case-studies/page.tsx`
- Modify: `src/app/partners/page.tsx`
- Modify: `src/app/team/page.tsx`
- Modify: `src/app/news/page.tsx`
- Modify: `src/app/careers/page.tsx`

- [ ] **Step 1: Remove unsupported routes from the primary nav and footer**

```tsx
// Keep legacy routes live, but do not expose them in the primary navigation.
```

- [ ] **Step 2: Replace claim-heavy legacy pages with neutral stubs**

```tsx
<h1>About RoboSkin</h1>
<p>This page is retained for compatibility. Please use Contact or About for the current company overview.</p>
```

- [ ] **Step 3: Add `noindex` metadata to deprecated routes**

```ts
export const metadata = {
  robots: { index: false, follow: false },
};
```

- [ ] **Step 4: Verify legacy pages no longer appear in the main journey**

Run: `rg -n "Case Studies|Partners|Team|News|Careers" src/components src/app`
Expected: only neutral stubs or compatibility notes remain.

---

### Task 4: Align SEO and legal surfaces

**Files:**
- Modify: `src/app/privacy/page.tsx`
- Modify: `src/app/terms/page.tsx`
- Modify: `src/app/robots.ts`
- Modify: `src/app/sitemap.ts`

- [ ] **Step 1: Rewrite privacy and terms to match the actual form and site behavior**

```tsx
<p>We collect contact form details, site usage data, and request metadata only as described on this site.</p>
```

- [ ] **Step 2: Update robots and sitemap to reflect the final public route set**

```ts
const routes = ['/', '/products', '/solutions', '/technology', '/resources', '/about', '/contact', '/privacy', '/terms'];
```

- [ ] **Step 3: Confirm metadata and canonical URLs are consistent**

```ts
alternates: {
  canonical: 'https://roboskin.ai/contact',
}
```

- [ ] **Step 4: Validate the final public surface**

Run: `npm run build`
Expected: build succeeds with the updated routes and metadata.

---

### Task 5: Final verification

**Files:**
- No code changes expected

- [ ] **Step 1: Run lint**

Run: `npm run lint`
Expected: no lint errors.

- [ ] **Step 2: Run production build**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 3: Scan for remaining unsupported claims and personal contact data**

Run: `rg -n "gmail|L89155W|messigoat147|revolutionary|world-class|breakthrough" src`
Expected: no matches in public-facing copy.
