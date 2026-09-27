# Graphite and paper palette correction

The live privacy and terms pages retained dark utility text from an older light theme while the shared page and card backgrounds were dark. On privacy, the heading was `#111318` over `#070c12` (1.06:1); body text was `#4f5560` over `#0e1822` (2.39:1). Both were difficult to read. The user also requested a less synthetic-looking color direction after the Contact Edition release.

## Changes

- Privacy and terms now use a shared, explicitly scoped paper surface with semantic headings, body text, underlined links, and readable line lengths. Legal content and dates are unchanged.
- Graphite backgrounds, off-white text and restrained metal accents replace the blue-black/cyan palette across shared navigation, footer, panels, tables, search, buttons and article styles. Bright cyan headlines and glow effects are removed.
- The homepage research dispatch section uses a paper background to give editorial content a distinct reading surface.
- The two decorative concept images are displayed in monochrome through CSS. No bitmap assets, research illustrations, provenance labels or source content were replaced.
- Older primary buttons previously combining white labels and pale accent backgrounds now use dark labels with no blue glow. This applies to shared legacy routes as well as about/resources. Form placeholders follow the readable muted text token.
- Text selection and keyboard focus have explicit colors on paper surfaces.

Privacy/terms contrast is now 13.00:1 for headings, 7.54:1 for body copy, and 6.26:1 for links. These figures describe the actual foreground/background pairs, not a full accessibility certification.

## Verification

- Local lint and all 203 existing tests passed.
- Desktop computed-color screening covered home, privacy, terms, contact, research index, research library, robot-skin, a news article, about, resources, datasets, research services, working papers and editorial policy. It found the old primary-button mismatch; the correction passed a subsequent check on both affected templates.
- Mobile checks covered home, privacy, terms, about and resources at 390px; terms was additionally inspected at 320px. No horizontal overflow was found in those checks.
- Gradients/artwork are excluded from automatic contrast calculations and reviewed visually. This is a targeted readability regression check, not an exhaustive audit of every third-party embed or interactive state.
- Build/export and production release evidence are recorded under `.codex/maintenance/runs/palette-readability-20260927` in the primary checkout. No live email or inquiry was submitted for styling verification.

No route, metadata, structured data, research fact, form delivery or analytics contract was changed. Production follows the normal PR/check/Vercel Git workflow. A code rollback can revert this PR; an urgent platform rollback must identify and verify the preceding production deployment under the repository maintenance lock.
