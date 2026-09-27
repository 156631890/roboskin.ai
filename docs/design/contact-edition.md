# RoboSkin — Contact Edition

Design implementation: 2026-09-27. Target: https://roboskin.ai. Base: `351d7cc73e29e0fa2ac2ce623356d9dfbbdf0629`. Branch: `codex/cyberpunk-editorial-ui-20260927`.

## Direction and scope

A dark, precise editorial identity for an independent tactile robotics publication. Blue-black surfaces, pale cyan accents, Manrope headlines, IBM Plex Mono annotations, fine rules and material-focused imagery provide a restrained cyberpunk character. No invented telemetry, customer badges or research results were added.

- Rebuilt the homepage hierarchy around the contact study, real database counts, latest source-backed dispatches, core topics, working papers and research tools.
- Moved deeper reading routes into native, keyboard-operable disclosures. Their links, explanatory text and FAQ remain in server-rendered HTML.
- Preserved the research positioning, canonical URLs, structured-data builders, real source records, contact routes and analytics components.
- Added a compact topic picker and clickable article titles to the research library; placed explanatory route panels behind a disclosure so they no longer precede every article as a large card grid.
- Unified shared navigation, footer, reader tables, inputs, buttons and long-form typography. Retained the existing mobile research table/card behavior and filter logic.
- Kept form integrations and delivery behavior unchanged. No contact or newsletter submission was sent in verification.

The user's existing dirty main checkout was not used as an implementation baseline or overwritten. This work is isolated in `.worktrees/cyberpunk-ui-20260927`.

## Artwork and typography

Generated with the built-in image generation tool; full prompts and provenance are in [contact-edition-image-prompts.json](contact-edition-image-prompts.json).

| Asset | Purpose | Size |
| --- | --- | --- |
| `public/generated/brand/roboskin-contact-cyber-v3.webp` | Robotic fingertip / contact hero | 1536 × 1024, 84,640 bytes |
| `public/generated/brand/roboskin-material-cyber-v3.webp` | Flexible sensing layers / homepage and research library | 1536 × 1024, 128,834 bytes |

Both artworks are visibly labelled as AI-generated concepts. They are not presented as real samples or experiments. Research/news illustrations retain their original content and source context. New images use new versioned filenames; older assets remain available.

The original generated PNGs are retained locally under `output/design/`. WebP conversion used `sharp`, quality 84, without compositing or retouching.

Manrope variable (200–800) and IBM Plex Mono (400/500/600) are self-hosted under `src/app/fonts/` through `next/font/local`. They are the existing typefaces, obtained from Google Fonts (`fonts.googleapis.com` / `fonts.gstatic.com`). Their SIL Open Font License files accompany them; license sources are `https://github.com/google/fonts/tree/main/ofl/manrope` and `https://github.com/google/fonts/tree/main/ofl/ibmplexmono`. This removes the build's dependency on downloading Google fonts, which failed with `ECONNRESET` during the first build. Latin coverage matches the site's primary language; unsupported glyphs use system fallback fonts.

## Verification

- `npm run lint`: passed.
- `npm test`: 203 tests passed. Two older tests were updated for deliberately replaced homepage copy/assets and native disclosures; canonical, schema, source and route checks remain intact.
- `npm run build`: passed with real local font files; 162 agent Markdown representations generated.
- `npm run verify:export`: passed. Verified 153 sitemap pages, 157 protected URL contract entries, 193 graph entities, 30 research-index records and 50 RSS entries; page titles, descriptions, H1s, canonical URLs and internal destinations/anchors passed.
- Real browser checks: desktop at 1440px; mobile at 390px and narrow 320px. Home, research library, research index, robot-skin topic and a news article were inspected.
- Mobile menu open/close, Escape focus return, navigation, keyboard disclosures, topic anchors and article contents links were exercised.
- Research index: `slip` gives 7/30; adding peer-reviewed evidence gives 3/30; an unmatched query shows the empty state; reset returns 30/30 and focuses the search field.
- Reduced-motion emulation confirms `scroll-behavior: auto` and zero button transition duration. Tested temporary browser overrides are reset afterwards.

Local browser evidence and screenshots: `output/design/`. These are UI checks on the production export, not proof of live email delivery or production deployment. The static preview shows the honest newsletter-unavailable state because it does not use production environment variables. Backend settings were not changed.

Review captures: [desktop homepage](screenshots/home-desktop.webp), [mobile homepage](screenshots/home-mobile.webp), [research topic section](screenshots/home-field-desktop.webp).

## Review, release and recovery

1. Review the branch preview at desktop/mobile sizes, including the reading pages and brand imagery.
2. Before merge, refresh `origin/main`, inspect exact-head CI and check for competing content updates. Use the maintenance lock for remote writes.
3. Production publication is a separate release step. If authorized, use the repository's normal protected-branch workflow and existing Vercel Git integration; verify Ready status, deployment SHA and `/deployment.json` agree.
4. Recheck homepage, research, research-index, news article and an inquiry page with production settings. Do not send a real inquiry just to check styling.
5. This branch does not change data schemas or backend contracts. Before production, abandoning the draft PR leaves production unchanged. After a merged release, revert the design commit through the normal PR/check workflow; for a confirmed release incident, restore the last verified Vercel deployment under the project's release rules.

No search submission or ranking/AI-recommendation promise is part of this visual redesign.
