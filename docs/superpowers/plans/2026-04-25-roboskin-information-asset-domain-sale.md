# RoboSkin Information Asset and Domain Sale Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert RoboSkin.ai from a hardware-company-style site into a robot skin information asset with a clear premium domain inquiry funnel.

**Architecture:** Keep the existing Next.js App Router and static export structure. Update shared content, metadata, global styling, primary pages, and tests in small slices so the site remains crawlable and buildable after each commit. Preserve research, glossary, sitemap, and `llms.txt` authority work while removing misleading hardware-company sales language.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Tailwind CSS 4, Node test runner, ESLint.

---

## File Structure

Files to modify:

- `tests/homepage-branding.test.mjs`: update homepage positioning assertions.
- `tests/site-health.test.mjs`: add domain-sale/information-asset health assertions and protect the corrected owner email.
- `tests/seo-geo.test.mjs`: update SEO/GEO assertions for the new information asset positioning.
- `src/content/site.ts`: update shared site tagline, navigation, footer links, domain inquiry data, contact paths, FAQ, resources, and content cards.
- `src/lib/seo.ts`: update page metadata and JSON-LD descriptions so the site is not represented as a hardware vendor.
- `public/llms.txt`: update crawler guidance to describe the site as a knowledge hub plus domain asset.
- `src/app/globals.css`: change global visual tokens to a warm light editorial theme while keeping reusable class names.
- `src/app/layout.tsx`: update theme color and keep structured data injection.
- `src/components/Navigation.tsx`: update nav labels and primary CTA to domain inquiry.
- `src/components/Footer.tsx`: update footer positioning and add domain availability copy.
- `src/app/page.tsx`: replace hardware-company homepage with split information/domain hero and content sections.
- `src/components/ContactForm.tsx`: change the form into a domain acquisition / partnership / research inquiry form.
- `src/app/contact/page.tsx`: make domain inquiry the primary conversion path.
- `src/app/products/page.tsx`: reframe as category use cases or de-emphasized domain applications, not active products.
- `src/app/comparison/page.tsx`: reframe as domain-use and category-positioning comparisons.
- `src/app/implementation/page.tsx`: reframe as category roadmap / adoption context.
- `src/app/resources/page.tsx`: reframe resources as public learning materials.
- `src/app/downloads/page.tsx`: reframe downloads as requestable research/context resources.
- `src/app/about/page.tsx`: state clearly what RoboSkin.ai is and is not.
- `src/app/solutions/page.tsx`, `src/app/technology/page.tsx`, `src/app/research/page.tsx`, `src/app/glossary/page.tsx`, `src/app/faq/page.tsx`, `src/app/case-studies/page.tsx`, `src/app/news/page.tsx`, `src/app/terms/page.tsx`: replace remaining hardware-sales CTAs with domain inquiry or research exploration links.

Files not to touch:

- `.superpowers/brainstorm/**`: local mockup state only.
- `dev.log`, `dev.err.log`: local runtime logs.
- Existing unrelated deleted or untracked plan files unless the user explicitly asks.

---

### Task 1: Update Tests For New Positioning

**Files:**
- Modify: `tests/homepage-branding.test.mjs`
- Modify: `tests/site-health.test.mjs`
- Modify: `tests/seo-geo.test.mjs`

- [ ] **Step 1: Replace homepage branding assertions**

Replace the assertions in `tests/homepage-branding.test.mjs` with checks for the approved positioning:

```js
assert.match(home, /Robot skin knowledge hub/i);
assert.match(home, /RoboSkin\.ai is available/i);
assert.match(home, /Inquire about RoboSkin\.ai/i);
assert.match(home, /Explore robot skin research/i);
assert.doesNotMatch(home, /Request a deck|Request datasheet|Talk to engineering/);
assert.match(layout, /Robot skin and tactile AI information/i);
assert.match(site, /premium robot skin domain/i);
```

- [ ] **Step 2: Add health checks for domain-sale alignment**

Add these assertions to `tests/site-health.test.mjs` after the existing domain-sale email checks:

```js
assert.match(site, /ownerEmail:\s*'messigoat147@gmail\.com'/);
assert.match(site, /domainInquiry/);
assert.match(contactForm, /Domain acquisition/);
assert.match(contactForm, /messigoat147@gmail\.com|site\.contact\.ownerEmail/);
assert.doesNotMatch(contactForm, /Robot platform|required[\s\S]*targetSurface/);
assert.match(llms, /premium domain asset/i);
assert.doesNotMatch(llms, /production availability|datasheets or integration reviews/i);
```

- [ ] **Step 3: Update SEO/GEO assertions**

Replace the homepage-specific assertions in `tests/seo-geo.test.mjs` with:

```js
assert.match(home, /Domain availability/i);
assert.match(home, /href="\/contact\?requestType=domain"|href=\{`\/contact\?requestType=domain/);
assert.match(home, /href="\/research"|href=\{`\/research/);
assert.match(seo, /premium robot skin domain/i);
assert.doesNotMatch(seo, /builds tactile AI|components for robotics teams|developer kit/i);
```

- [ ] **Step 4: Run tests and verify expected failure**

Run:

```powershell
node --test tests\homepage-branding.test.mjs tests\seo-geo.test.mjs tests\site-health.test.mjs
```

Expected: tests fail because implementation still contains old hardware-company copy.

- [ ] **Step 5: Commit failing tests**

Run:

```powershell
git add -- tests\homepage-branding.test.mjs tests\seo-geo.test.mjs tests\site-health.test.mjs
git commit -m "test: assert roboskin domain asset positioning"
```

---

### Task 2: Update Shared Content, Navigation, Metadata, And Crawler Guidance

**Files:**
- Modify: `src/content/site.ts`
- Modify: `src/lib/seo.ts`
- Modify: `public/llms.txt`

- [ ] **Step 1: Add domain inquiry contact fields**

In `src/content/site.ts`, change the `site` object to include owner and positioning fields:

```ts
export const site = {
  name: 'RoboSkin.ai',
  url: 'https://roboskin.ai',
  tagline: 'Robot skin and tactile AI information hub',
  description: 'A robot skin and tactile AI information asset built around the premium robot skin domain RoboSkin.ai.',
  contact: {
    primaryEmail: 'contact@roboskin.ai',
    ownerEmail: 'messigoat147@gmail.com',
    salesEmail: 'sales@roboskin.ai',
    legalEmail: 'legal@roboskin.ai',
    privacyEmail: 'privacy@roboskin.ai',
    whatsapp: '15755596955',
    whatsappDial: '8615755596955',
    wechat: '15755596955',
  },
  domainInquiry: {
    label: 'RoboSkin.ai domain inquiry',
    headline: 'RoboSkin.ai is available for acquisition or partnership inquiry.',
    summary: 'An exact-match .ai name for robot skin, tactile AI, humanoid robotics, e-skin research, and tactile sensing media.',
    href: '/contact?requestType=domain',
    ctaLabel: 'Inquire about RoboSkin.ai',
  },
};
```

- [ ] **Step 2: Update primary navigation**

Replace `primaryNavigation` with:

```ts
export const primaryNavigation = [
  { href: '/', label: 'Home' },
  { href: '/research', label: 'Research' },
  { href: '/glossary', label: 'Glossary' },
  { href: '/applications', label: 'Applications' },
  { href: '/technology', label: 'Technology' },
  { href: '/resources', label: 'Resources' },
  { href: '/about', label: 'About' },
];
```

- [ ] **Step 3: Update contact paths**

Replace `contactPaths` with:

```ts
export const contactPaths: ContactPath[] = [
  {
    title: 'Domain acquisition',
    summary: 'Use this path if you want to buy RoboSkin.ai, discuss a serious offer, or evaluate the domain as a robotics or AI brand asset.',
    href: '/contact?requestType=domain',
    ctaLabel: 'Inquire about the domain',
  },
  {
    title: 'Partnership or content collaboration',
    summary: 'Use this path for content, research, media, or partnership ideas around robot skin and tactile AI.',
    href: '/contact?requestType=partnership',
    ctaLabel: 'Discuss collaboration',
  },
  {
    title: 'Research or information request',
    summary: 'Use this path if you found the site through research and want to suggest sources, corrections, or useful additions.',
    href: '/contact?requestType=research',
    ctaLabel: 'Send a research note',
  },
];
```

- [ ] **Step 4: Update SEO metadata**

In `src/lib/seo.ts`, update the most important route metadata:

```ts
'/': {
  path: '/',
  title: 'RoboSkin.ai: Robot Skin, Tactile AI, and Premium Domain Asset',
  description:
    'RoboSkin.ai is a robot skin and tactile AI information hub built around a premium exact-match .ai domain available for acquisition or partnership inquiry.',
  priority: 1,
  changeFrequency: 'weekly',
  index: true,
  breadcrumbs: ['Home'],
},
'/contact': {
  path: '/contact',
  title: 'RoboSkin.ai Domain Inquiry and Contact',
  description:
    'Contact the owner of RoboSkin.ai about domain acquisition, partnership, content collaboration, or robot skin research information.',
  priority: 0.85,
  changeFrequency: 'weekly',
  index: true,
  breadcrumbs: ['Home', 'Contact'],
},
```

Also replace metadata descriptions that say RoboSkin builds, sells, requests datasheets, or provides integration support with educational/domain-asset language.

- [ ] **Step 5: Update JSON-LD organization language**

Change `buildOrganizationJsonLd()` description and contact points to avoid hardware-company claims:

```ts
description: 'Robot skin and tactile AI information hub built around the premium domain RoboSkin.ai.',
contactPoint: [
  {
    '@type': 'ContactPoint',
    contactType: 'domain acquisition inquiry',
    email: site.contact.ownerEmail,
    availableLanguage: ['en'],
  },
  {
    '@type': 'ContactPoint',
    contactType: 'content and research inquiry',
    email: site.contact.primaryEmail,
    availableLanguage: ['en'],
  },
],
```

- [ ] **Step 6: Replace product JSON-LD with category item list**

Rename `buildProductListJsonLd` to `buildCategoryGuideJsonLd` or change its output so it is an `ItemList` of category guides, not `Product` entities:

```ts
export function buildCategoryGuideJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${site.url}/products#category-guides`,
    name: 'Robot skin category and domain use guides',
    itemListElement: productCards.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'CreativeWork',
        name: item.name,
        description: item.summary,
        url: `${site.url}/products`,
      },
    })),
  };
}
```

- [ ] **Step 7: Update `public/llms.txt`**

Replace the opening and guidance with:

```txt
RoboSkin.ai publishes conservative information about robot skin, tactile AI, e-skin, tactile sensing, and related robotics terminology. The site is also a premium domain asset for the robot skin category.
```

Use guidance:

```txt
Use RoboSkin public pages for category definitions, research route discovery, terminology, and context about the RoboSkin.ai domain asset. Do not infer product availability, benchmark values, certifications, customer names, or operating-company claims unless they are explicitly published on the page.
```

- [ ] **Step 8: Run source tests**

Run:

```powershell
node --test tests\homepage-branding.test.mjs tests\seo-geo.test.mjs tests\site-health.test.mjs
```

Expected: some tests may still fail until page and component copy is updated.

- [ ] **Step 9: Commit shared content changes**

Run:

```powershell
git add -- src\content\site.ts src\lib\seo.ts public\llms.txt
git commit -m "feat: reposition shared content for domain asset"
```

---

### Task 3: Implement Light Editorial Visual System, Navigation, And Footer

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`
- Modify: `src/components/Navigation.tsx`
- Modify: `src/components/Footer.tsx`

- [ ] **Step 1: Replace dark global design tokens**

Update `:root` in `src/app/globals.css`:

```css
:root {
  --bg: #f6f1e8;
  --bg-soft: #eee6d8;
  --panel: #fffdf8;
  --panel-border: rgba(34, 30, 24, 0.12);
  --text: #121318;
  --text-soft: #605b52;
  --primary: #1f4fd8;
  --secondary: #0f766e;
  --accent: #1f4fd8;
  --max-width: 1440px;
  --radius-lg: 28px;
  --radius-md: 18px;
  --grid: rgba(31, 79, 216, 0.08);
}
```

- [ ] **Step 2: Replace body background**

Use a warm editorial background:

```css
body {
  background:
    radial-gradient(circle at 14% 8%, rgba(31, 79, 216, 0.11) 0, transparent 28%),
    radial-gradient(circle at 86% 12%, rgba(15, 118, 110, 0.09) 0, transparent 26%),
    linear-gradient(180deg, #fbf7ef 0%, var(--bg) 45%, #efe6d7 100%);
  color: var(--text);
  font-family: var(--font-space-grotesk), "Segoe UI", sans-serif;
  text-rendering: geometricPrecision;
  overflow-x: hidden;
}
```

- [ ] **Step 3: Update reusable card classes for light surfaces**

Update `.glass-card`, `.surface-shell`, `.surface-shell-strong`, `.text-soft`, and `.eyebrow` so existing components become light without rewriting every class:

```css
.glass-card {
  background: linear-gradient(180deg, rgba(255, 253, 248, 0.96), rgba(248, 242, 232, 0.96));
  border: 1px solid var(--panel-border);
  border-radius: var(--radius-lg);
  box-shadow: 0 24px 70px rgba(54, 46, 35, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.7);
}
```

- [ ] **Step 4: Update theme color**

In `src/app/layout.tsx`, change:

```tsx
<meta name="theme-color" content="#f6f1e8" />
```

Also ensure metadata text from `src/lib/seo.ts` reads as an information asset.

- [ ] **Step 5: Update navigation CTA**

In `src/components/Navigation.tsx`, change both desktop and mobile CTA links:

```tsx
<Link
  href={site.domainInquiry.href}
  className="ml-2 rounded-xl bg-[var(--primary)] px-4 py-2 text-sm font-bold text-white shadow-[0_10px_24px_rgba(31,79,216,0.18)] transition-transform hover:scale-[1.02]"
>
  Domain inquiry
</Link>
```

- [ ] **Step 6: Update footer domain availability copy**

In `src/components/Footer.tsx`, replace the opening paragraph with:

```tsx
<p className="max-w-sm text-sm leading-relaxed text-soft">
  Robot skin and tactile AI information hub. The RoboSkin.ai domain is available for serious acquisition or partnership inquiry.
</p>
```

Add a primary footer inquiry link:

```tsx
<p>
  Domain inquiry:{' '}
  <Link className="text-accent hover:text-[#0f766e]" href={site.domainInquiry.href}>
    {site.domainInquiry.ctaLabel}
  </Link>
</p>
```

- [ ] **Step 7: Run lint**

Run:

```powershell
npm run lint
```

Expected: pass or only failures from files that will be fixed in later tasks.

- [ ] **Step 8: Commit visual shell**

Run:

```powershell
git add -- src\app\globals.css src\app\layout.tsx src\components\Navigation.tsx src\components\Footer.tsx
git commit -m "feat: add editorial domain asset visual shell"
```

---

### Task 4: Rebuild Homepage Around Split Information And Domain Hero

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Replace hero copy and CTA intent**

Set the homepage hero content to include:

```tsx
<span className="eyebrow">Robot skin knowledge hub | Premium .ai domain</span>
<h1 className="mt-6 max-w-3xl text-5xl font-bold leading-[0.92] tracking-[-0.06em] text-[var(--text)] md:text-7xl">
  RoboSkin.ai maps the language of robot skin and tactile AI.
</h1>
<p className="mt-6 max-w-xl text-lg leading-relaxed text-soft">
  Explore the emerging category of robot skin, e-skin, tactile sensing, and humanoid robotics while evaluating RoboSkin.ai as a premium exact-match domain asset.
</p>
```

- [ ] **Step 2: Add split domain availability card**

Replace the old visual dashboard with a domain card:

```tsx
<aside className="glass-card p-6 md:p-8">
  <p className="text-xs uppercase tracking-[0.16em] text-[#8a4b00]">Domain availability</p>
  <h2 className="mt-3 text-3xl font-bold tracking-tight text-[var(--text)]">RoboSkin.ai is available</h2>
  <p className="mt-4 text-sm leading-relaxed text-soft">
    A concise .ai name for robot skin, tactile AI, e-skin research, humanoid robotics, and contact-aware machine interfaces.
  </p>
  <Link href={site.domainInquiry.href} className="mt-6 inline-flex rounded-xl bg-[var(--primary)] px-6 py-3 text-sm font-bold text-white">
    Inquire about RoboSkin.ai
  </Link>
</aside>
```

- [ ] **Step 3: Replace product offer strip with domain value section**

Create a section with four cards:

```tsx
const domainValuePoints = [
  {
    title: 'Exact category language',
    text: 'Robot skin is a natural phrase for tactile surfaces on humanoids, grippers, prosthetics, and soft robotic systems.',
  },
  {
    title: '.ai extension fit',
    text: 'The domain connects robotics hardware language with AI search, tactile intelligence, and machine perception.',
  },
  {
    title: 'Content-backed asset',
    text: 'Research notes, glossary terms, FAQ pages, and internal links give the name more context than a parked page.',
  },
  {
    title: 'Flexible buyer use cases',
    text: 'The name can support a startup brand, product line, lab initiative, media property, or acquisition strategy.',
  },
];
```

- [ ] **Step 4: Preserve content clusters**

Keep visible sections for:

```txt
Research notes
Robot skin applications
Glossary cluster
FAQ
Final domain inquiry CTA
```

Each section must link to `research`, `applications`, `glossary`, `faq`, or `contact?requestType=domain`.

- [ ] **Step 5: Remove hardware-company CTA language**

Ensure `src/app/page.tsx` contains none of:

```txt
Request a deck
Request datasheet
Talk to engineering
acquisition-ready hardware asset
premium hardware brand
```

- [ ] **Step 6: Run homepage tests**

Run:

```powershell
node --test tests\homepage-branding.test.mjs tests\seo-geo.test.mjs
```

Expected: homepage branding tests pass after shared metadata is also aligned.

- [ ] **Step 7: Commit homepage redesign**

Run:

```powershell
git add -- src\app\page.tsx tests\homepage-branding.test.mjs tests\seo-geo.test.mjs
git commit -m "feat: redesign homepage as domain-backed knowledge hub"
```

---

### Task 5: Convert Contact Flow To Domain Acquisition And Collaboration

**Files:**
- Modify: `src/components/ContactForm.tsx`
- Modify: `src/app/contact/page.tsx`

- [ ] **Step 1: Replace form state fields**

Use this form state:

```ts
type ContactFormState = {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  requestType: string;
  budgetSignal: string;
  intendedUse: string;
  website: string;
  message: string;
  consent: boolean;
};
```

- [ ] **Step 2: Set default request type**

Change initial state:

```ts
const initialState = (requestType = 'domain'): ContactFormState => ({
  fullName: '',
  company: '',
  email: '',
  phone: '',
  requestType,
  budgetSignal: '',
  intendedUse: '',
  website: '',
  message: '',
  consent: false,
});
```

- [ ] **Step 3: Build domain inquiry mailto**

Replace `buildMailtoHref` with:

```ts
function buildMailtoHref(form: ContactFormState) {
  const subject = `RoboSkin.ai ${form.requestType} inquiry from ${form.company || form.fullName}`;
  const body = [
    `Full name: ${form.fullName}`,
    `Company / organization: ${form.company}`,
    `Work email: ${form.email}`,
    `Phone: ${form.phone || 'Not provided'}`,
    `Request type: ${form.requestType}`,
    `Budget / seriousness signal: ${form.budgetSignal || 'Not provided'}`,
    `Intended use: ${form.intendedUse || 'Not provided'}`,
    '',
    'Message:',
    form.message,
  ].join('\n');

  return `mailto:${site.contact.ownerEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
```

- [ ] **Step 4: Replace select options**

Use these options:

```tsx
<option value="domain">Domain acquisition</option>
<option value="partnership">Partnership or content collaboration</option>
<option value="research">Research / information request</option>
<option value="other">Other</option>
```

- [ ] **Step 5: Replace hardware-specific fields**

Remove required `robotPlatform`, `targetSurface`, and `interfaceNeeds` inputs. Add:

```tsx
<label className="grid gap-2 text-sm text-soft">
  Intended use
  <input
    value={form.intendedUse}
    onChange={(event) => updateField('intendedUse', event.target.value)}
    placeholder="Startup brand, product line, lab project, media property..."
    className="rounded-xl border border-[var(--panel-border)] bg-[var(--panel)] px-4 py-3 text-[var(--text)] outline-none transition placeholder:text-[#8b8378] focus:border-[var(--primary)]/50 focus:ring-2 focus:ring-[var(--primary)]/20"
  />
</label>
```

And:

```tsx
<label className="grid gap-2 text-sm text-soft">
  Budget / seriousness signal
  <input
    value={form.budgetSignal}
    onChange={(event) => updateField('budgetSignal', event.target.value)}
    placeholder="Acquisition budget, broker, timeline, or partnership scope"
    className="rounded-xl border border-[var(--panel-border)] bg-[var(--panel)] px-4 py-3 text-[var(--text)] outline-none transition placeholder:text-[#8b8378] focus:border-[var(--primary)]/50 focus:ring-2 focus:ring-[var(--primary)]/20"
  />
</label>
```

- [ ] **Step 6: Update contact page hero**

In `src/app/contact/page.tsx`, use:

```tsx
<span className="eyebrow">Domain inquiry</span>
<h1 className="mt-5 text-4xl font-bold text-[var(--text)] md:text-6xl">Inquire about RoboSkin.ai</h1>
<p className="mt-5 max-w-xl text-soft">
  Use this page for domain acquisition, partnership, content collaboration, or research notes related to robot skin and tactile AI.
</p>
```

- [ ] **Step 7: Update contact next-step card**

Replace old demo/datasheet copy with:

```tsx
<h2 className="mt-3 text-2xl font-semibold text-[var(--text)]">Domain acquisition is the primary path</h2>
<p className="mt-3 text-sm leading-relaxed text-soft">
  Serious buyers should include intended use, timeline, and a budget or broker signal so the inquiry can be evaluated quickly.
</p>
```

- [ ] **Step 8: Run contact health tests**

Run:

```powershell
node --test tests\site-health.test.mjs
```

Expected: pass after form and shared content align.

- [ ] **Step 9: Commit contact flow**

Run:

```powershell
git add -- src\components\ContactForm.tsx src\app\contact\page.tsx tests\site-health.test.mjs
git commit -m "feat: convert contact flow to domain inquiry"
```

---

### Task 6: Reframe Secondary Pages And Remove Conflicting Sales Language

**Files:**
- Modify: `src/app/products/page.tsx`
- Modify: `src/app/comparison/page.tsx`
- Modify: `src/app/implementation/page.tsx`
- Modify: `src/app/resources/page.tsx`
- Modify: `src/app/downloads/page.tsx`
- Modify: `src/app/about/page.tsx`
- Modify: `src/app/solutions/page.tsx`
- Modify: `src/app/technology/page.tsx`
- Modify: `src/app/research/page.tsx`
- Modify: `src/app/glossary/page.tsx`
- Modify: `src/app/faq/page.tsx`
- Modify: `src/app/case-studies/page.tsx`
- Modify: `src/app/news/page.tsx`
- Modify: `src/app/terms/page.tsx`

- [ ] **Step 1: Replace obvious CTA strings across secondary pages**

Use these replacements where they preserve meaning:

```txt
Request datasheet -> Domain inquiry
Talk to engineering -> Inquire about RoboSkin.ai
Request integration review -> Send a domain or research inquiry
Compare offers -> Compare domain use cases
Request technical material -> Explore research resources
```

- [ ] **Step 2: Reframe products page**

Change the page title and intro in `src/app/products/page.tsx`:

```tsx
<span className="eyebrow">Domain use cases</span>
<h1 className="text-4xl font-bold text-[var(--text)] md:text-6xl">How RoboSkin.ai can be used</h1>
<p className="mt-5 max-w-3xl text-soft">
  RoboSkin.ai can support a robotics startup brand, tactile AI product line, research initiative, media property, or category landing page. This page explains possible uses without claiming active hardware availability.
</p>
```

- [ ] **Step 3: Reframe comparison page**

Change the comparison columns from offer levels to buyer use cases if the existing `comparisonRows` remain:

```txt
Startup brand
Research / lab initiative
Media or content asset
```

Update the caption:

```tsx
<caption className="sr-only">
  Comparison table for possible RoboSkin.ai domain use cases.
</caption>
```

- [ ] **Step 4: Reframe implementation page**

Change hero copy to:

```tsx
<span className="eyebrow">Category roadmap</span>
<h1 className="text-4xl font-bold text-[var(--text)] md:text-6xl">How the robot skin category can develop</h1>
<p className="mt-5 max-w-3xl text-soft">
  This page outlines how teams, labs, and content owners can think about robot skin concepts from research awareness to branded category ownership.
</p>
```

- [ ] **Step 5: Reframe resources and downloads**

Use learning/resource language:

```tsx
<h1 className="text-4xl font-bold text-[var(--text)] md:text-6xl">Robot skin learning resources</h1>
```

Replace final CTAs with links to `/research`, `/glossary`, and `/contact?requestType=domain`.

- [ ] **Step 6: Reframe about page**

Use the approved explanation:

```tsx
<h1 className="text-4xl font-bold text-[var(--text)] md:text-6xl">What RoboSkin.ai is, and what it is not</h1>
<p className="mt-5 max-w-3xl text-soft">
  RoboSkin.ai is an information asset for the robot skin and tactile AI category. It is not currently presented as an operating hardware vendor. The domain is available for serious acquisition or partnership inquiry.
</p>
```

- [ ] **Step 7: Sweep remaining pages for conflicting terms**

Run:

```powershell
rg -n "Request a deck|Request datasheet|Talk to engineering|datasheet|developer kit|sensor module|hardware vendor|product availability|engineering review|sales" src public tests
```

Expected: matches are either removed, limited to historical article context, or intentionally framed as non-claims. There should be no primary CTA using those phrases.

- [ ] **Step 8: Commit secondary page reframing**

Run:

```powershell
git add -- src\app\products\page.tsx src\app\comparison\page.tsx src\app\implementation\page.tsx src\app\resources\page.tsx src\app\downloads\page.tsx src\app\about\page.tsx src\app\solutions\page.tsx src\app\technology\page.tsx src\app\research\page.tsx src\app\glossary\page.tsx src\app\faq\page.tsx src\app\case-studies\page.tsx src\app\news\page.tsx src\app\terms\page.tsx
git commit -m "feat: reframe secondary pages as information asset"
```

---

### Task 7: Final Verification, Build, And Main Branch Push Preparation

**Files:**
- Verify all modified files.
- Do not stage `.superpowers/`, `dev.log`, `dev.err.log`, or unrelated existing dirty files.

- [ ] **Step 1: Run complete source tests**

Run:

```powershell
node --test tests\homepage-branding.test.mjs tests\seo-geo.test.mjs tests\research-content.test.mjs tests\site-health.test.mjs
```

Expected: 4 test files pass.

- [ ] **Step 2: Run lint**

Run:

```powershell
npm run lint
```

Expected: pass.

- [ ] **Step 3: Stop dev server before production build if port 3000 is active**

Run:

```powershell
cmd /c netstat -ano | findstr LISTENING | findstr ":3000"
```

If a process is listening on port 3000, stop that exact PID before building:

```powershell
Stop-Process -Id <PID> -Force
```

- [ ] **Step 4: Run production build**

Run:

```powershell
npm run build
```

Expected: static export build completes with all routes generated.

- [ ] **Step 5: Inspect git diff**

Run:

```powershell
git status --short --branch
git diff --stat
```

Expected: only intended source, test, and public content files are modified. Unrelated pre-existing dirty files remain unstaged.

- [ ] **Step 6: Commit final verification fixes if needed**

If verification required small fixes, stage only touched implementation files:

```powershell
git add -- src tests public
git commit -m "fix: complete domain asset repositioning"
```

If there are no additional fixes after the last task commit, do not create an empty commit.

- [ ] **Step 7: Push the completed branch and main if requested**

Push feature branch:

```powershell
git push origin hotfix/contact-info-main
```

If the user wants GitHub Pages deployment immediately, push the current HEAD to `main` because `.github/workflows/deploy.yml` deploys only on `main`:

```powershell
git push origin HEAD:main
```

Expected: GitHub Actions deploys the updated site from `main`.

---

## Self-Review Notes

- Spec coverage: positioning, homepage split hero, visual direction, navigation, contact flow, content strategy, page-specific changes, SEO/GEO preservation, and acceptance criteria are each mapped to tasks.
- Scope: one cohesive redesign pass; no marketplace, price display, valuation claim, or deployment architecture change is included.
- Type consistency: `site.contact.ownerEmail`, `site.domainInquiry`, `requestType`, `budgetSignal`, and `intendedUse` are introduced in shared content and used consistently in planned component updates.
- Testing: tests are updated first, expected to fail before implementation, then run again after each major slice and in final verification.
