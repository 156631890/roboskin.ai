# RoboSkin Content Expansion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Expand the RoboSkin website into a deeper B2B content site with richer product, solution, resource, and company pages, plus a few focused content hub pages for comparison and implementation guidance.

**Architecture:** Keep the current Next.js App Router structure and the existing dark technical visual system. Centralize the new copy and page metadata in a structured content layer so the pages stay consistent and easy to extend. Implement the content model first, then update high-traffic pages, then add the new hub pages and finally rework the legacy content routes and navigation.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Tailwind CSS 4

---

### Task 1: Centralize the new content model

**Files:**
- Modify: `src/content/site.ts`
- Modify: `src/lib/blog-data.ts`

- [ ] **Step 1: Add typed content sections for the new page copy**

```ts
export type ContentTile = {
  title: string;
  description: string;
  ctaLabel?: string;
  href?: string;
};

export type ComparisonRow = {
  label: string;
  sensorArray: string;
  developerKit: string;
  customProgram: string;
};

export type ImplementationStage = {
  title: string;
  summary: string;
  inputs: string[];
  outputs: string[];
};
```

- [ ] **Step 2: Add shared content arrays for the homepage, products, solutions, resources, FAQ, and the new hub pages**

```ts
export const homeProofPoints = [
  {
    title: 'Evaluation-first positioning',
    description: 'Explain the product in a way that helps robotics teams decide where to start.',
  },
  {
    title: 'Engineering support path',
    description: 'Show how a customer moves from datasheet review to integration review.',
  },
];

export const comparisonRows: ComparisonRow[] = [
  {
    label: 'Best starting point',
    sensorArray: 'Research and early pilots',
    developerKit: 'Fast prototype work',
    customProgram: 'Specific robot or geometry constraints',
  },
];
```

- [ ] **Step 3: Extend the blog/news data source so it can back a richer news and research index**

```ts
export type BlogSummary = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
};
```

- [ ] **Step 4: Verify the content module still compiles**

Run: `npm run lint`
Expected: no type or import errors from the new content exports.

---

### Task 2: Expand the homepage into a deeper evaluation landing page

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/content/site.ts`

- [ ] **Step 1: Replace the hero subcopy with clearer buyer guidance**

```tsx
<p className="mt-6 max-w-xl text-lg leading-relaxed text-soft">
  Tactile sensing for robotics teams evaluating a sensor array, developer kit, or custom integration path.
</p>
```

- [ ] **Step 2: Add a "Why RoboSkin" section backed by structured proof points**

```tsx
<section className="py-14 md:py-20">
  <div className="container-shell">
    <div className="grid gap-5 md:grid-cols-2">
      {homeProofPoints.map((item) => (
        <article key={item.title} className="glass-card p-7">
          <h3 className="text-xl font-semibold text-white">{item.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-soft">{item.description}</p>
        </article>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 3: Add an evaluation-to-deployment path section**

```tsx
<section className="py-14 md:py-20">
  <div className="container-shell grid gap-5 lg:grid-cols-3">
    <article className="glass-card p-7">
      <p className="text-xs uppercase tracking-[0.14em] text-soft">Step 1</p>
      <h3 className="mt-2 text-2xl font-semibold text-white">Evaluation</h3>
      <p className="mt-3 text-sm text-soft">Review the datasheet, use cases, and fit.</p>
    </article>
  </div>
</section>
```

- [ ] **Step 4: Keep the existing product strip and use-case blocks, but add fit-oriented copy**

```tsx
<p className="mt-4 text-sm text-soft">
  Best for teams that need an early integration path and want to understand what comes next.
</p>
```

- [ ] **Step 5: Add a stronger final CTA band**

```tsx
<section className="pb-20 pt-8">
  <div className="container-shell">
    <div className="rounded-[28px] border border-white/8 bg-[#0b0d12] p-8 text-center md:p-12">
      <h2 className="mx-auto max-w-3xl text-3xl font-bold tracking-tight text-white md:text-5xl">
        Share your target application, form factor, and development stage
      </h2>
    </div>
  </div>
</section>
```

- [ ] **Step 6: Verify the homepage still routes to the contact form correctly**

Run: `npm run build`
Expected: the homepage builds and the CTA links still include the correct `requestType` query parameters.

---

### Task 3: Deepen Products, Solutions, Technology, and Resources

**Files:**
- Modify: `src/app/products/page.tsx`
- Modify: `src/app/solutions/page.tsx`
- Modify: `src/app/technology/page.tsx`
- Modify: `src/app/resources/page.tsx`
- Modify: `src/content/site.ts`

- [ ] **Step 1: Turn product cards into richer catalog entries**

```tsx
<article className="glass-card p-7 md:p-8">
  <h2 className="mt-2 text-2xl font-semibold text-white">{product.name}</h2>
  <p className="mt-3 text-sm text-soft">{product.summary}</p>
  <p className="mt-4 text-sm text-soft"><span className="font-semibold text-white">Best for:</span> {product.bestFor}</p>
</article>
```

- [ ] **Step 2: Add a comparison cue that points to the new comparison page**

```tsx
<Link href="/comparison" className="mt-4 inline-flex text-sm font-semibold text-[#62a8ff]">
  Compare offer levels
</Link>
```

- [ ] **Step 3: Reframe solutions around problem, impact, and recommended path**

```tsx
<div className="mt-4 space-y-3 text-sm text-soft">
  <p><span className="font-semibold text-white">Problem:</span> {solution.problem}</p>
  <p><span className="font-semibold text-white">Impact:</span> {solution.why}</p>
  <p><span className="font-semibold text-white">Recommended path:</span> {solution.path}</p>
</div>
```

- [ ] **Step 4: Expand technology into a four-layer stack with a clearer scan pattern**

```tsx
<div className="grid gap-5 lg:grid-cols-2">
  {technologyLayers.map((layer) => (
    <article key={layer.title} className="glass-card p-7 md:p-8">
      <h3 className="mt-2 text-2xl font-semibold text-white">{layer.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-soft">{layer.summary}</p>
    </article>
  ))}
</div>
```

- [ ] **Step 5: Convert resources into requestable technical material tiles**

```tsx
<article className="glass-card p-6">
  <p className="text-xs uppercase tracking-[0.14em] text-soft">{item.availability}</p>
  <h3 className="mt-2 text-xl font-semibold text-white">{item.title}</h3>
  <p className="mt-2 text-sm text-soft">{item.description}</p>
</article>
```

- [ ] **Step 6: Verify the product and solution pages still read cleanly on mobile**

Run: `npm run dev`
Expected: cards stack correctly and CTAs remain visible without horizontal overflow.

---

### Task 4: Add the new comparison, implementation, and downloads pages

**Files:**
- Create: `src/app/comparison/page.tsx`
- Create: `src/app/implementation/page.tsx`
- Create: `src/app/downloads/page.tsx`
- Modify: `src/content/site.ts`

- [ ] **Step 1: Create the comparison page around a single comparison table**

```tsx
export default function ComparisonPage() {
  return (
    <section className="py-20 md:py-24">
      <div className="container-shell">
        <h1 className="mt-5 text-4xl font-bold text-white md:text-6xl">Compare offer levels</h1>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Render comparison rows from the shared content model**

```tsx
<div className="grid gap-4">
  {comparisonRows.map((row) => (
    <article key={row.label} className="glass-card p-6">
      <p className="text-sm font-semibold text-white">{row.label}</p>
    </article>
  ))}
</div>
```

- [ ] **Step 3: Create the implementation page as a stage-by-stage deployment guide**

```tsx
<div className="grid gap-5 lg:grid-cols-2">
  {implementationStages.map((stage) => (
    <article key={stage.title} className="glass-card p-7">
      <h2 className="text-2xl font-semibold text-white">{stage.title}</h2>
      <p className="mt-3 text-sm text-soft">{stage.summary}</p>
    </article>
  ))}
</div>
```

- [ ] **Step 4: Create the downloads page as a request hub rather than a literal file dump**

```tsx
<article className="glass-card p-6">
  <h3 className="mt-2 text-xl font-semibold text-white">Datasheets</h3>
  <p className="mt-2 text-sm text-soft">Request the current datasheet for the sensor array or developer kit.</p>
</article>
```

- [ ] **Step 5: Add navigation or footer links to surface the new pages**

```tsx
const footerNavigation = [
  {
    title: 'Platform',
    links: [
      { href: '/products', label: 'Products' },
      { href: '/comparison', label: 'Comparison' },
      { href: '/implementation', label: 'Implementation' },
      { href: '/downloads', label: 'Downloads' },
    ],
  },
];
```

- [ ] **Step 6: Verify the new pages are reachable and render on first load**

Run: `npm run build`
Expected: all three new routes compile and appear in the app router output.

---

### Task 5: Rework About, FAQ, Contact, Research, Case Studies, and News

**Files:**
- Modify: `src/app/about/page.tsx`
- Modify: `src/app/faq/page.tsx`
- Modify: `src/app/contact/page.tsx`
- Modify: `src/app/research/page.tsx`
- Modify: `src/app/case-studies/page.tsx`
- Modify: `src/app/news/page.tsx`
- Modify: `src/content/site.ts`
- Modify: `src/lib/blog-data.ts`

- [ ] **Step 1: Expand About into a clear positioning page**

```tsx
<article className="glass-card p-7 md:p-8">
  <h2 className="text-2xl font-semibold text-white">What we focus on</h2>
  <p className="mt-3 text-sm text-soft">
    Tactile hardware, robotics integration, and practical support for teams building real systems.
  </p>
</article>
```

- [ ] **Step 2: Replace the FAQ stub with more practical buyer questions**

```tsx
const faqs = [
  {
    q: 'How do I request a datasheet?',
    a: 'Use the Contact page and choose the datasheet request type.',
  },
];
```

- [ ] **Step 3: Add supporting copy to the Contact page without changing form behavior**

```tsx
<div className="glass-card p-6 md:p-8">
  <h2 className="text-2xl font-semibold text-white">What to include</h2>
  <ul className="mt-5 space-y-3 text-sm text-soft">
    <li>Application or robot platform</li>
    <li>Target geometry and form factor</li>
    <li>Integration timeline</li>
    <li>Any interface or SDK requirements</li>
  </ul>
</div>
```

- [ ] **Step 4: Convert Research, Case Studies, and News into real content indexes or summaries**

```tsx
export default function ResearchPage() {
  return (
    <section className="py-20 md:py-24">
      <div className="container-shell">
        <h1 className="mt-5 text-4xl font-bold text-white md:text-6xl">Research and publications</h1>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Add summary components that pull from `blog-data.ts`**

```tsx
{blogPosts.slice(0, 3).map((post) => (
  <article key={post.id} className="glass-card p-6">
    <h3 className="text-xl font-semibold text-white">{post.title}</h3>
    <p className="mt-2 text-sm text-soft">{post.excerpt}</p>
  </article>
))}
```

- [ ] **Step 6: Verify the legacy stubs still point to the correct modern routes**

Run: `npm run lint`
Expected: no route or import errors and all legacy pages resolve to the intended modern entry points.

---

### Task 6: Update sitemap, metadata, and final verification

**Files:**
- Modify: `src/app/sitemap.ts`
- Modify: `src/app/layout.tsx`
- Modify: `src/components/Navigation.tsx`
- Modify: `src/components/Footer.tsx`
- Modify: `src/components/LegacyRouteStub.tsx` if needed for the new routing text

- [ ] **Step 1: Add the new public routes to the sitemap**

```ts
const routes = [
  '',
  '/products',
  '/solutions',
  '/technology',
  '/resources',
  '/comparison',
  '/implementation',
  '/downloads',
  '/about',
  '/contact',
  '/privacy',
  '/terms',
];
```

- [ ] **Step 2: Keep navigation concise while exposing the new hubs**

```tsx
{[
  { href: '/comparison', label: 'Comparison' },
  { href: '/implementation', label: 'Implementation' },
].map((link) => (
  <Link key={link.href} href={link.href} className="text-soft hover:text-white">
    {link.label}
  </Link>
))}
```

- [ ] **Step 3: Update metadata and content text for the new information architecture**

```ts
export const metadata: Metadata = {
  description: 'RoboSkin.ai builds tactile sensor skin and integration support for robotics teams, OEM programs, and research deployments.',
};
```

- [ ] **Step 4: Run the full verification pass**

Run:
```bash
npm run lint
npm run build
```
Expected: both commands pass with the new content routes and shared content model.

- [ ] **Step 5: Perform a manual route check in the browser**

Verify:
- homepage depth and CTA flow
- products page readability
- solutions decision support
- resources request flow
- comparison, implementation, and downloads routes
- about, FAQ, contact, research, case studies, and news pages

---

### Task 7: Commit the expansion in logical chunks

**Files:**
- All files touched above

- [ ] **Step 1: Review the git diff by task boundary**

Run: `git diff --stat`
Expected: content model, pages, and routing changes are grouped cleanly.

- [ ] **Step 2: Commit the content model and page updates**

```bash
git add src/content/site.ts src/lib/blog-data.ts
git add src/app/page.tsx src/app/products/page.tsx src/app/solutions/page.tsx src/app/technology/page.tsx src/app/resources/page.tsx
git commit -m "Expand RoboSkin content model"
```

- [ ] **Step 3: Commit the new hub pages and legacy route updates**

```bash
git add src/app/comparison/page.tsx src/app/implementation/page.tsx src/app/downloads/page.tsx
git add src/app/about/page.tsx src/app/faq/page.tsx src/app/contact/page.tsx src/app/research/page.tsx src/app/case-studies/page.tsx src/app/news/page.tsx
git commit -m "Add RoboSkin content hubs"
```

- [ ] **Step 4: Commit the routing and sitemap changes**

```bash
git add src/app/sitemap.ts src/app/layout.tsx src/components/Navigation.tsx src/components/Footer.tsx src/components/LegacyRouteStub.tsx
git commit -m "Update RoboSkin routing and sitemap"
```

