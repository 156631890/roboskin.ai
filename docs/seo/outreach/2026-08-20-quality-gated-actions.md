# Quality-Gated Backlink Actions — 2026-08-20

## Purpose

This record adapts the evidence-first workflow from the installed `submit-product-directories-v2-quality` skill to RoboSkin.ai. It is an operating record, not a claim that a backlink has been earned.

The source repository contains broad product-directory and publishing routes. RoboSkin.ai is a technical research platform, so only the quality-control, authorization, status, and evidence-recording practices are reused. Bulk submission, forced account creation, reciprocal-link schemes, and unrelated directories are excluded.

## RoboSkin quality gate

A target is eligible only when all of the following are true:

1. **Topical fit:** the target has a real audience for robot skin, tactile sensing, tactile AI, robot manipulation, world models, humanoids, or Physical AI.
2. **Discovery value:** a researcher or engineer could reasonably discover a useful RoboSkin resource through the proposed placement.
3. **Editorial governance:** a maintainer, editor, or community rule controls what is accepted.
4. **Distinct resource value:** the proposed page adds a source-linked taxonomy, comparison, dataset, evidence boundary, or other value beyond a homepage link.
5. **Transparent ownership:** every approach discloses that Steven Yang maintains RoboSkin.ai.
6. **No manufactured endorsement:** no payment for ranking links, forced reciprocal link, fake profile, or claim of independent endorsement.
7. **Evidence-based status:** an issue, email, draft, or open pull request is `contacted`, not `linked`. A backlink is counted only after a crawlable editorial link is live.

## Routes screened but not executed

| Route from the source repository | Decision | RoboSkin reason |
| --- | --- | --- |
| Generic product directories | Reject | RoboSkin.ai is an independent research and intelligence platform, not a conventional SaaS listing. Low topical fit would dilute the outreach program. |
| Product Hunt | Defer | Potentially useful only after RoboSkin launches a concrete product such as Dataset Explorer, Research Pro, an API, or a research agent. The current site is not being framed as a product launch. |
| DEV Community / Hashnode / HackerNoon | Separate editorial workflow | These can support original technical articles, but an article must have standalone value and must not be a copied SEO post or a directory submission. |
| GeekWire startup directory | Ineligible until verified | Use only if RoboSkin has a formal startup identity and meets the directory's current eligibility requirements. |
| Substack | Owned distribution only | A newsletter may build an audience, but it is not an earned third-party backlink and must be tracked separately. |

## Actions executed

### C24 — Awesome Humanoid & Dexterous Manipulation

- Action: scope check before any pull request.
- Proposed resource: `https://roboskin.ai/humanoid-robot-skin`
- Evidence: `https://github.com/Tsunami-kun/awesome-humanoid-manipulation/issues/6`
- Status: `awaiting scope reply`
- Qualification: strong fit with humanoid manipulation and dexterous-hand learning; the repository explicitly welcomes issues and contributions.
- Disclosure: ownership stated; no endorsement, payment, or reciprocal link requested.
- Backlink status: **not earned and not counted**.

### C25 — Awesome-WAM

- Action: scope check before any pull request.
- Proposed resource: `https://roboskin.ai/guides/visuo-tactile-world-models-robot-manipulation`
- Evidence: `https://github.com/OpenMOSS/Awesome-WAM/issues/120`
- Status: `awaiting scope reply`
- Qualification: the collection covers world action models and includes tactile/contact-rich work; the proposed page is an independent source-linked comparison rather than a claimed paper.
- Disclosure: ownership stated; no endorsement, payment, or reciprocal link requested.
- Backlink status: **not earned and not counted**.

## Follow-up rule

- Do not add a reminder comment before **2026-09-03** unless a maintainer replies first.
- If a maintainer confirms scope, prepare the smallest possible pull request in the exact section they approve.
- If a maintainer declines or closes the issue as out of scope, record the target as `closed` and do not retry through another route.
- If accepted and merged, verify that the final page is public, crawlable, and contains the intended URL before changing the status to `linked`.

## Metric impact

These two actions do not change the verified referring-domain count. The current editorial-link milestone remains **2 of 3 verified** until an additional crawlable third-party placement is live.

## Identifier note

`targets.md` contains legacy planning IDs. The chronological execution IDs in `outreach-log.csv` are authoritative; the two actions above are recorded there as C24 and C25.
