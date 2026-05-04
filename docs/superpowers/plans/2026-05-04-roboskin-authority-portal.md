# RoboSkin Authority Portal Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rework the RoboSkin homepage into a professional robot skin and tactile AI authority portal with stronger visible SEO/GEO content, clearer internal routing, and verified local quality gates.

**Architecture:** Keep the existing Next.js App Router site, server-rendered homepage, shared `src/content/site.ts` data model, shared `src/lib/seo.ts` metadata/JSON-LD helpers, and static-export-safe contact flow. Add small focused homepage content primitives and presentation components only where they reduce repeated markup, then update source-inspection tests to lock in authority portal, SEO, and GEO requirements.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Tailwind CSS 4, Node test runner, ESLint, static Next build.

---

## File Structure

- Modify: `tests/homepage-branding.test.mjs` - lock in the authority portal first viewport, GEO answer blocks, internal route index, and conversion paths.
- Modify: `tests/seo-geo.test.mjs` - verify visible crawlable direct-answer content and descriptive internal links.
- Modify: `src/content/site.ts` - add reusable homepage authority data: direct answers, authority link groups, and selected research/resource entries.
- Modify: `src/components/IndustryVisuals.tsx` - add focused visual components for authority index, answer blocks, simplified tactile stack map, research/resource index, and refined inquiry paths.
- Modify: `src/app/page.tsx` - rebuild homepage section order around authority portal structure while preserving existing metadata and JSON-LD.
- Modify: `src/app/globals.css` - tune global visual system only where needed for the authority portal: flatter sections, less glow, readable technical tables, and stable mobile layout.

## Task 1: Authority Portal Regression Tests

**Files:**
- Modify: `tests/homepage-branding.test.mjs`
- Modify: `tests/seo-geo.test.mjs`

- [ ] **Step 1: Update homepage branding test**

Replace `tests/homepage-branding.test.mjs` with:

```js
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const homePath = new URL('../src/app/page.tsx', import.meta.url);
const layoutPath = new URL('../src/app/layout.tsx', import.meta.url);
const sitePath = new URL('../src/content/site.ts', import.meta.url);
const visualsPath = new URL('../src/components/IndustryVisuals.tsx', import.meta.url);

test('homepage copy reflects the authority portal positioning', async () => {
  const [home, layout, site, visuals] = await Promise.all([
    readFile(homePath, 'utf8'),
    readFile(layoutPath, 'utf8'),
    readFile(sitePath, 'utf8'),
    readFile(visualsPath, 'utf8'),
  ]);

  assert.match(home, /Robot skin and tactile AI authority portal/);
  assert.match(home, /What is robot skin\?/);
  assert.match(home, /Open the robot skin glossary/);
  assert.match(home, /Request the RoboSkin\.ai Brief/);
  assert.match(home, /Strategic acquisition conversation/);
  assert.match(home, /Robot skin direct answers/);
  assert.match(home, /Research and resource index/);
  assert.match(home, /Tactile AI stack map/);
  assert.match(home, /Humanoid robot skin/);
  assert.match(site, /authorityLinkGroups/);
  assert.match(site, /directAnswerBlocks/);
  assert.match(site, /researchResourceIndex/);
  assert.match(visuals, /AuthorityIndex/);
  assert.match(visuals, /DirectAnswerSection/);
  assert.match(visuals, /TactileStackMap/);
  assert.match(layout, /Tactile AI/i);
});
```

- [ ] **Step 2: Update SEO/GEO source test**

Append these assertions inside the existing `test('SEO and GEO source files expose metadata...')` body in `tests/seo-geo.test.mjs`, after the existing homepage link assertions:

```js
  assert.match(home, /Robot skin direct answers/);
  assert.match(home, /href="\/glossary"|href=\{`\/glossary/);
  assert.match(home, /href="\/resources"|href=\{`\/resources/);
  assert.match(home, /href="\/technology"|href=\{`\/technology/);
  assert.match(home, /href="\/research"|href=\{`\/research/);
  assert.match(home, /href="\/contact\?requestType=brief/);
  assert.match(home, /What is e-skin\?/);
  assert.match(home, /How is tactile sensing different from vision/);
```

- [ ] **Step 3: Run focused tests and verify they fail**

Run:

```bash
node --test tests/homepage-branding.test.mjs tests/seo-geo.test.mjs
```

Expected: FAIL because `authorityLinkGroups`, `directAnswerBlocks`, `researchResourceIndex`, and the new homepage copy/components are not implemented yet.

## Task 2: Shared Authority Content

**Files:**
- Modify: `src/content/site.ts`

- [ ] **Step 1: Add content types**

Add these types after `FeaturedIndustryAsset`:

```ts
export type AuthorityLinkGroup = {
  title: string;
  summary: string;
  links: {
    label: string;
    href: string;
    description: string;
  }[];
};

export type DirectAnswerBlock = {
  question: string;
  answer: string;
  href: string;
  ctaLabel: string;
};

export type ResearchResourceEntry = {
  title: string;
  summary: string;
  href: string;
  label: string;
};
```

- [ ] **Step 2: Add authority link groups**

Add this export after `homeUseCases`:

```ts
export const authorityLinkGroups: AuthorityLinkGroup[] = [
  {
    title: 'Learn the category',
    summary: 'Definitions and technical explainers for robot skin, tactile AI, e-skin, and tactile sensing terms.',
    links: [
      { label: 'Open the robot skin glossary', href: '/glossary', description: 'Concise definitions for robot skin, tactile AI, e-skin, slip detection, and ROS 2 tactile pipelines.' },
      { label: 'Read the robot skin FAQ', href: '/faq', description: 'Short answers about evaluation, integration, public downloads, and request-only material.' },
      { label: 'Explore tactile AI technology', href: '/technology', description: 'A system view of sensing layers, signal processing, middleware, and validation fit.' },
    ],
  },
  {
    title: 'Track the field',
    summary: 'Research notes and industry assets for teams following the tactile AI stack.',
    links: [
      { label: 'Browse robot skin research', href: '/research', description: 'Technical briefs about tactile sensors, soft robotic skin, multimodal sensing, and robot hands.' },
      { label: 'View RoboSkin resources', href: '/resources', description: 'Briefs, stack maps, and category assets for serious robotics readers.' },
      { label: 'Review conservative case studies', href: '/case-studies', description: 'Anonymous evaluation paths without unsupported customer or performance claims.' },
    ],
  },
  {
    title: 'Evaluate paths',
    summary: 'Routes for teams comparing tactile sensor modules, developer kits, or custom skin programs.',
    links: [
      { label: 'Compare RoboSkin paths', href: '/comparison', description: 'Choose between sensor arrays, developer kits, and custom form-factor programs.' },
      { label: 'Plan implementation', href: '/implementation', description: 'Understand the evaluation, prototype, pilot, and deployment route.' },
      { label: 'Request technical downloads', href: '/downloads', description: 'Request datasheets, integration notes, benchmark methods, and SDK material.' },
    ],
  },
  {
    title: 'Discuss value',
    summary: 'Contact paths for brief requests, partnerships, sponsorship, and strategic conversations.',
    links: [
      { label: 'Request the RoboSkin.ai Brief', href: '/contact?requestType=brief&requestedAsset=RoboSkin.ai%20Brief', description: 'Ask for the industry brief, stack map, or manifesto.' },
      { label: 'Discuss partnership or sponsorship', href: '/contact?requestType=partnership', description: 'Open a conversation about research, reports, directories, or category partnerships.' },
      { label: 'Strategic acquisition conversation', href: '/contact?requestType=acquisition', description: 'Use this path for domain acquisition, licensing, or strategic buyer inquiries.' },
    ],
  },
];
```

- [ ] **Step 3: Add direct answer blocks**

Add this export after `authorityLinkGroups`:

```ts
export const directAnswerBlocks: DirectAnswerBlock[] = [
  {
    question: 'What is robot skin?',
    answer: 'Robot skin is a tactile sensing surface that helps robots detect contact, pressure, shear, slip, and interaction events across hands, grippers, arms, or curved body surfaces. It gives physical AI systems a contact layer that vision alone cannot provide.',
    href: '/glossary',
    ctaLabel: 'Open the robot skin glossary',
  },
  {
    question: 'What is tactile AI?',
    answer: 'Tactile AI is the sensing, data, and control workflow that turns touch signals into useful robot behavior. It can support grasp confidence, slip response, contact-aware motion, safety reflexes, and evaluation analytics for physical AI systems.',
    href: '/research',
    ctaLabel: 'Browse tactile AI research',
  },
  {
    question: 'What is e-skin?',
    answer: 'E-skin, or electronic skin, is a flexible or soft sensor layer designed to measure contact-related signals on non-flat surfaces. In robotics, e-skin can cover fingertips, palms, gripper pads, prosthetics, arms, or safety surfaces.',
    href: '/research/single-material-soft-robotic-skin-2025',
    ctaLabel: 'Read the e-skin brief',
  },
  {
    question: 'Why do humanoid robot hands need touch?',
    answer: 'Humanoid robot hands need touch because dexterous manipulation depends on contact timing, pressure, shear, slip, and object stability. Vision can guide a hand toward an object, but tactile sensing helps the robot understand what happens during contact.',
    href: '/solutions',
    ctaLabel: 'View robot hand applications',
  },
  {
    question: 'How is tactile sensing different from vision or force-torque sensing?',
    answer: 'Vision observes a scene from outside contact, while tactile sensing measures what happens at the contact surface. Force-torque sensors can measure aggregate loads, but robot skin can expose distributed contact patterns across fingertips, grippers, or curved surfaces.',
    href: '/technology',
    ctaLabel: 'Explore tactile AI technology',
  },
];
```

- [ ] **Step 4: Add research and resource index data**

Add this export after `featuredIndustryAssets`:

```ts
export const researchResourceIndex: ResearchResourceEntry[] = [
  {
    title: 'Graphene and liquid metal 3D force sensing',
    summary: 'A technical brief on normal force, shear force, slip, and texture sensing for robot fingertips.',
    href: '/research/graphene-liquid-metal-3d-force-2026',
    label: 'Research brief',
  },
  {
    title: 'Single-material soft robotic skin',
    summary: 'A current note on soft e-skin architectures using impedance and machine learning for multimodal touch.',
    href: '/research/single-material-soft-robotic-skin-2025',
    label: 'E-skin brief',
  },
  {
    title: 'Humanoid tactile stack map',
    summary: 'A request path for mapping sensors, materials, middleware, edge AI, datasets, and evaluation triggers.',
    href: '/resources',
    label: 'Resource path',
  },
  {
    title: 'RoboSkin technical downloads',
    summary: 'Request datasheets, integration notes, benchmark methods, and SDK material for evaluation.',
    href: '/downloads',
    label: 'Request path',
  },
];
```

- [ ] **Step 5: Run focused tests**

Run:

```bash
node --test tests/homepage-branding.test.mjs tests/seo-geo.test.mjs
```

Expected: still FAIL because the homepage and components do not render the new data yet.

## Task 3: Authority Portal Components

**Files:**
- Modify: `src/components/IndustryVisuals.tsx`

- [ ] **Step 1: Update imports**

Change the import line to include the new types:

```ts
import type {
  AuthorityLinkGroup,
  DirectAnswerBlock,
  FeaturedIndustryAsset,
  ResearchResourceEntry,
  TechnologyLayer,
} from '@/content/site';
```

- [ ] **Step 2: Add component prop types**

Add these types after `FeaturedAssetCoversProps`:

```ts
type AuthorityIndexProps = {
  groups: AuthorityLinkGroup[];
};

type DirectAnswerSectionProps = {
  answers: DirectAnswerBlock[];
};

type TactileStackMapProps = {
  layers: TechnologyLayer[];
};

type ResearchBriefIndexProps = {
  entries: ResearchResourceEntry[];
};
```

- [ ] **Step 3: Add AuthorityIndex**

Add this component before `TactileStackVisual`:

```tsx
export function AuthorityIndex({ groups }: AuthorityIndexProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-4">
      {groups.map((group) => (
        <section key={group.title} className="authority-panel p-5">
          <h3 className="text-lg font-semibold text-white">{group.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-soft">{group.summary}</p>
          <ul className="mt-5 space-y-3">
            {group.links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="group block rounded-lg border border-white/8 bg-[#080b10] p-3 transition-colors hover:border-[#62a8ff]/35 hover:bg-[#0d1420]">
                  <span className="block text-sm font-semibold text-[#d7e7ff] group-hover:text-white">{link.label}</span>
                  <span className="mt-1 block text-xs leading-relaxed text-soft">{link.description}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
```

- [ ] **Step 4: Add DirectAnswerSection**

Add this component after `AuthorityIndex`:

```tsx
export function DirectAnswerSection({ answers }: DirectAnswerSectionProps) {
  return (
    <div className="divide-y divide-white/8 rounded-lg border border-white/10 bg-[#080b10]">
      {answers.map((item) => (
        <article key={item.question} className="grid gap-4 p-5 md:grid-cols-[0.42fr_1fr] md:p-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-soft">Direct answer</p>
            <h3 className="mt-2 text-xl font-semibold text-white">{item.question}</h3>
          </div>
          <div>
            <p className="text-base leading-relaxed text-[#d8dce4]">{item.answer}</p>
            <Link href={item.href} className="mt-4 inline-flex text-sm font-semibold text-[#62a8ff] hover:text-[#7dd3fc]">
              {item.ctaLabel} {'->'}
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
```

- [ ] **Step 5: Add TactileStackMap**

Add this component after `DirectAnswerSection`:

```tsx
export function TactileStackMap({ layers }: TactileStackMapProps) {
  return (
    <figure
      role="img"
      aria-label="Tactile AI stack map showing contact input, signal processing, robot control, safety response, and tactile data feedback."
      className="authority-panel overflow-hidden p-0"
    >
      <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="border-b border-white/8 bg-[#080b10] p-6 lg:border-b-0 lg:border-r">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-soft">Tactile AI stack map</p>
          <h3 className="mt-3 text-3xl font-semibold leading-tight text-white">Input -> processing -> action -> feedback</h3>
          <p className="mt-4 text-sm leading-relaxed text-soft">
            Robot skin is useful when contact signals move through a complete stack: surface design, sensors,
            signal conditioning, robot middleware, controller behavior, safety response, and evaluation data.
          </p>
          <div className="mt-6 grid grid-cols-5 gap-2">
            {Array.from({ length: 35 }).map((_, index) => {
              const active = [6, 7, 12, 13, 18, 24, 25].includes(index);
              return (
                <span
                  key={index}
                  className={
                    'aspect-square rounded border ' +
                    (active
                      ? 'border-[#5eead4]/50 bg-[#5eead4]/25 shadow-[0_0_18px_rgba(94,234,212,0.18)]'
                      : 'border-white/8 bg-white/[0.045]')
                  }
                />
              );
            })}
          </div>
        </div>
        <ol className="divide-y divide-white/8">
          {layers.map((layer, index) => (
            <li key={layer.title} className="grid grid-cols-[44px_1fr] gap-4 p-4 md:p-5">
              <span className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-white/[0.04] text-sm font-bold text-white">
                {index + 1}
              </span>
              <div>
                <h4 className="text-base font-semibold text-white">{layer.title}</h4>
                <p className="mt-1 text-sm leading-relaxed text-soft">{layer.summary}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </figure>
  );
}
```

- [ ] **Step 6: Add ResearchBriefIndex**

Add this component before `FeaturedAssetCovers`:

```tsx
export function ResearchBriefIndex({ entries }: ResearchBriefIndexProps) {
  return (
    <div className="rounded-lg border border-white/10 bg-[#080b10]">
      {entries.map((entry) => (
        <Link
          key={entry.href}
          href={entry.href}
          className="grid gap-3 border-b border-white/8 p-5 transition-colors last:border-b-0 hover:bg-white/[0.035] md:grid-cols-[160px_1fr]"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#7dd3fc]">{entry.label}</span>
          <span>
            <span className="block text-lg font-semibold text-white">{entry.title}</span>
            <span className="mt-1 block text-sm leading-relaxed text-soft">{entry.summary}</span>
          </span>
        </Link>
      ))}
    </div>
  );
}
```

- [ ] **Step 7: Run lint for TypeScript feedback**

Run:

```bash
npm run lint
```

Expected: may still PASS or fail only because new components are unused. If it fails for imports or type names, fix those exact names before continuing.

## Task 4: Homepage Authority Portal Rebuild

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Update imports**

Replace the homepage imports from `IndustryVisuals` and `site.ts` with:

```ts
import {
  AuthorityIndex,
  ConversionPathPanel,
  DirectAnswerSection,
  FeaturedAssetCovers,
  ResearchBriefIndex,
  TactileStackMap,
} from '@/components/IndustryVisuals';
import {
  authorityLinkGroups,
  directAnswerBlocks,
  featuredIndustryAssets,
  homeStats,
  manifesto,
  marketSignals,
  researchResourceIndex,
  site,
  tactileAiStack,
} from '@/content/site';
```

Keep the existing `JsonLd`, `Link`, `Metadata`, and SEO imports.

- [ ] **Step 2: Replace homepage markup**

Replace the `Home()` return body after the `<JsonLd ... />` line with this section order:

```tsx
      <section className="relative overflow-hidden pb-14 pt-14 md:pb-18 md:pt-18">
        <div className="container-shell grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="reveal">
            <h1 className="max-w-4xl text-5xl font-bold leading-[0.96] text-white md:text-7xl">
              Robot skin and tactile AI authority portal
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#b8c1ce]">
              RoboSkin.ai maps robot skin, tactile AI, e-skin, tactile sensors, and humanoid robot skin for robotics teams, researchers, investors, and strategic partners.
            </p>
            <div className="mt-7 rounded-lg border border-[#62a8ff]/35 bg-[#62a8ff]/10 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#d7e7ff]">What is robot skin?</p>
              <p className="mt-3 text-base leading-relaxed text-white">
                Robot skin is a tactile sensing surface that helps robots detect contact, pressure, shear, slip,
                and interaction events across hands, grippers, arms, or curved body surfaces.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/research" className="rounded-lg bg-[#62a8ff] px-5 py-3 text-sm font-bold text-white shadow-[0_12px_26px_rgba(98,168,255,0.18)] transition-transform hover:scale-[1.02]">
                Browse robot skin research
              </Link>
              <Link href="/glossary" className="rounded-lg border border-white/12 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/8">
                Open the robot skin glossary
              </Link>
              <Link href="/contact?requestType=brief&requestedAsset=RoboSkin.ai%20Brief" className="rounded-lg border border-transparent px-2 py-3 text-sm font-semibold text-[#d7e7ff] hover:text-white">
                Request the RoboSkin.ai Brief
              </Link>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {homeStats.map((item) => (
                <div key={item.label} className="rounded-lg border border-white/8 bg-[#080b10] p-4">
                  <p className="text-xl font-bold text-white">{item.value}</p>
                  <p className="mt-1 text-sm leading-relaxed text-soft">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="reveal [animation-delay:0.1s]">
            <TactileStackMap layers={tactileAiStack} />
          </div>
        </div>
      </section>

      <section className="authority-band py-14 md:py-18">
        <div className="container-shell">
          <div className="mb-8 max-w-3xl">
            <p className="section-label">Authority index</p>
            <h2 className="mt-3 text-3xl font-bold text-white md:text-5xl">Find the right robot skin route</h2>
            <p className="mt-4 text-sm leading-relaxed text-soft">
              Start with definitions, research, evaluation paths, or strategic contact depending on what you need to understand.
            </p>
          </div>
          <AuthorityIndex groups={authorityLinkGroups} />
        </div>
      </section>

      <section className="py-14 md:py-18">
        <div className="container-shell">
          <div className="mb-8 max-w-3xl">
            <p className="section-label">Robot skin direct answers</p>
            <h2 className="mt-3 text-3xl font-bold text-white md:text-5xl">Short answers for search engines, AI systems, and serious readers</h2>
            <p className="mt-4 text-sm leading-relaxed text-soft">
              These definitions are intentionally visible and conservative so readers can cite them without relying on hidden metadata.
            </p>
          </div>
          <DirectAnswerSection answers={directAnswerBlocks} />
        </div>
      </section>

      <section className="authority-band py-14 md:py-18">
        <div className="container-shell grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <p className="section-label">Research and resource index</p>
            <h2 className="mt-3 text-3xl font-bold text-white md:text-5xl">Track the tactile AI stack with source-like entries</h2>
            <p className="mt-4 text-sm leading-relaxed text-soft">
              RoboSkin.ai should grow around durable explainers, research briefs, and request paths rather than unsupported marketing claims.
            </p>
            <div className="mt-6 rounded-lg border border-white/8 bg-[#080b10] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-soft">{manifesto.title}</p>
              <p className="mt-3 text-lg leading-relaxed text-white">{manifesto.summary}</p>
              <Link href="/contact?requestType=brief&requestedAsset=Tactile%20AI%20Manifesto" className="mt-5 inline-flex text-sm font-semibold text-accent hover:text-white">
                Request manifesto draft {'->'}
              </Link>
            </div>
          </div>
          <ResearchBriefIndex entries={researchResourceIndex} />
        </div>
      </section>

      <section className="py-14 md:py-18">
        <div className="container-shell">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="section-label">Industry assets</p>
              <h2 className="mt-3 text-3xl font-bold text-white md:text-5xl">Reports, maps, and directories for the robot skin category</h2>
            </div>
            <Link href="/resources" className="text-sm font-semibold text-[#62a8ff] hover:text-[#7dd3fc]">
              View resources {'->'}
            </Link>
          </div>
          <FeaturedAssetCovers assets={featuredIndustryAssets} compact />
        </div>
      </section>

      <section className="authority-band py-14 md:py-18">
        <div className="container-shell">
          <div className="mb-8 max-w-3xl">
            <p className="section-label">Market signals</p>
            <h2 className="mt-3 text-3xl font-bold text-white md:text-5xl">Why humanoid robot skin is becoming a category</h2>
            <p className="mt-4 text-sm leading-relaxed text-soft">
              The public site avoids unsupported market-size claims. It organizes practical signals for readers evaluating tactile AI.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {marketSignals.map((signal) => (
              <article key={signal.title} className="authority-panel p-5">
                <h3 className="text-lg font-semibold text-white">{signal.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-soft">{signal.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20 pt-14">
        <div className="container-shell">
          <div className="rounded-lg border border-white/10 bg-[#080b10] p-7 md:p-10">
            <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
              <div>
                <p className="section-label">Brief, partnership, or strategic inquiry</p>
                <h2 className="mt-3 text-3xl font-bold text-white md:text-5xl">
                  Build the category around robot skin, tactile AI, and physical AI touch
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-soft">
                  Request the RoboSkin.ai Brief, discuss sponsorship or partnership, or open a strategic acquisition conversation.
                </p>
                <p className="mt-5 text-sm text-soft">
                  Direct inquiries:{' '}
                  <a className="text-[#62a8ff] underline decoration-white/30 underline-offset-4" href={`mailto:${site.contact.primaryEmail}`}>
                    {site.contact.primaryEmail}
                  </a>
                </p>
              </div>
              <ConversionPathPanel />
            </div>
          </div>
        </div>
      </section>
```

- [ ] **Step 3: Remove unused local data**

Delete the local `homeRobotSkinFaq` array only if it is no longer used by visible markup. Keep JSON-LD conservative by either:

```ts
const homeRobotSkinFaq = directAnswerBlocks.slice(0, 3).map((item) => ({
  question: item.question,
  answer: item.answer,
  href: item.href,
  ctaLabel: item.ctaLabel,
}));
```

or keep the existing array if the schema still matches visible content.

- [ ] **Step 4: Run focused tests**

Run:

```bash
node --test tests/homepage-branding.test.mjs tests/seo-geo.test.mjs
```

Expected: PASS after homepage imports, data, components, and visible copy are wired.

## Task 5: Visual System Refinement

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Add authority portal utility classes**

Add these styles after `.container-shell`:

```css
.authority-band {
  background: linear-gradient(180deg, rgba(8, 11, 16, 0.64), rgba(6, 8, 12, 0.18));
  border-block: 1px solid rgba(255, 255, 255, 0.055);
}

.authority-panel {
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 0.5rem;
  background: linear-gradient(180deg, rgba(13, 16, 22, 0.92), rgba(8, 11, 16, 0.96));
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.035);
}

.section-label {
  color: #7dd3fc;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
```

- [ ] **Step 2: Reduce background visual noise**

Change `body::before` opacity from:

```css
opacity: 0.22;
```

to:

```css
opacity: 0.14;
```

- [ ] **Step 3: Run lint and focused tests**

Run:

```bash
npm run lint
node --test tests/homepage-branding.test.mjs tests/seo-geo.test.mjs
```

Expected: PASS.

## Task 6: Local Verification and Completion Audit

**Files:**
- Existing project files and generated build output.

- [ ] **Step 1: Run source-level regression tests**

Run:

```bash
node --test tests/homepage-branding.test.mjs tests/seo-geo.test.mjs tests/site-health.test.mjs
```

Expected: PASS.

- [ ] **Step 2: Run lint**

Run:

```bash
npm run lint
```

Expected: PASS.

- [ ] **Step 3: Run production build**

Run:

```bash
npm run build
```

Expected: PASS and static export succeeds.

- [ ] **Step 4: Verify local page render**

If the existing dev server is running on port 3000, load:

```text
http://127.0.0.1:3000
```

If it is not running, start:

```bash
npm run dev -- --host 127.0.0.1 --port 3000
```

Then verify:

- First viewport contains the authority portal H1, robot skin definition, and three primary actions.
- The authority index exposes links to `/glossary`, `/faq`, `/technology`, `/research`, `/resources`, `/case-studies`, `/comparison`, `/implementation`, `/downloads`, and `/contact`.
- The direct answer section visibly answers robot skin, tactile AI, e-skin, humanoid robot hands, and tactile sensing versus vision/force-torque sensing.
- The tactile AI stack map is readable and not clipped.
- The final inquiry panel routes to brief, partnership, and strategic acquisition paths.
- Mobile width has no horizontal overflow or clipped primary buttons.

- [ ] **Step 5: Final completion audit**

Before marking the goal complete, verify the objective against evidence:

- Page design: inspect `src/app/page.tsx`, `src/components/IndustryVisuals.tsx`, and browser render.
- SEO: inspect `src/lib/seo.ts`, `src/app/sitemap.ts`, `src/app/robots.ts`, metadata imports, and relevant tests.
- GEO: inspect visible direct answers in `src/content/site.ts` and homepage render, plus JSON-LD alignment.
- Professional quality: lint/build pass and no unsupported claims added.
- Local verification: source tests, lint, build, and browser render completed.

- [ ] **Step 6: Commit implementation**

Commit only the files touched for this implementation:

```bash
git add tests/homepage-branding.test.mjs tests/seo-geo.test.mjs src/content/site.ts src/components/IndustryVisuals.tsx src/app/page.tsx src/app/globals.css docs/superpowers/plans/2026-05-04-roboskin-authority-portal.md
git commit -m "feat: rebuild roboskin authority portal homepage"
```
