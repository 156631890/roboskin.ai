# P1 tactile AI roadmap

Planning start: **2026-10-12**. Scope: the user-requested P1 expansion after the P0 definitions and methodology work. The dates below are **target windows for planning**, not scheduled automations, promises of publication, completed work, or evidence that a reviewer has been appointed. No P1 publication is authorized by this document alone.

## Requested outcomes

1. A structured model database with **at least 10 individual model pages**, one model per page, plus a **CC0 metadata export distributed with the repository release**.
2. A **State of Tactile AI 2026** annual report with a **real Zenodo DOI** and **CC BY 4.0** licensing for the original report.
3. A substantially detailed `/technology` definition page, assessed against the **actual October 2026 version of smashingrobotics.com** after locating and verifying the relevant page and version.
4. A new curated `/vla` landing page and a timeline containing **at least 8 distinct, sourced events**.
5. **At least 2 Paper Deep Dive articles at initial launch**, with explicit evidence ratings and source/evaluation boundaries.

“Initial launch” means first publication of these RoboSkin.ai analyses. It does not imply that RoboSkin.ai discovered the underlying research, conducted the authors’ experiments, or has priority over other publications.

## Sequence and target windows

| Week | Target window | Work and dependencies | Reviewable output / gate |
| --- | --- | --- | --- |
| 1 | Oct 12–18, 2026 | Establish the P1 source inventory and apply `docs/model-card-standard.md`. Choose at least 10 eligible models from verifiable primary sources; identify candidate Deep Dives and a report evidence cutoff. Confirm the actual competitor page and evidence for an October 2026 version before using it as a benchmark. | Inventory with stable IDs, source/version/date, unknowns, ownership/licensing notes, proposed model-page URLs, evidence classification, and named review responsibility still marked pending until accepted. No unsupported model is added to meet a count. |
| 2 | Oct 19–25, 2026 | Implement the common model-page and export contracts; prepare the first 5 model pages. Depends on the source inventory and common field definitions. Draft the `/technology` coverage comparison from the verified reference, without copying its prose or figures. | Five reviewable model pages, first export fixture, source-trace checks, and a section-level technology outline showing reader questions answered and evidence gaps. Drafts remain unpublished if the gates are incomplete. |
| 3 | Oct 26–Nov 1, 2026 | Complete at least 10 model pages and the CC0 metadata export. Reconcile identity, family/version, dates, artifacts, licenses, and evaluation boundaries across all views. | At least 10 distinct canonical model pages; valid export and schema/readme; deterministic IDs and links; artifact-specific rights records; release package ready for review. Publication waits for technical and actual editorial checks. |
| 4 | Nov 2–8, 2026 | Build `/vla` curation and at least 8 timeline events using the reviewed model inventory. Expand `/technology` using the definition coverage assessment. Preserve `/robot-vla-models` and other existing URLs. | Curated reading routes, timeline date semantics and primary citations, relationship to existing VLA routes, and a technology page that demonstrably fills documented definition/evidence gaps. No unverified claim of outperforming a competitor. |
| 5 | Nov 9–15, 2026 | Complete at least 2 Deep Dives with explicit evidence ratings, claim-to-source notes, evaluation-condition tables, artifacts, limitations, and corrections route. Depends on primary-source access and a real reviewer’s availability. | Two original analyses ready for first publication, each with a completed human review record and a bounded rating explanation. Execution and hardware testing appear only when corresponding run or experiment evidence exists. |
| 6 | Nov 16–22, 2026 | Draft **State of Tactile AI 2026** from the reviewed inventory and Deep Dives. Separate observations from interpretation and declare the evidence cutoff. Prepare original or appropriately licensed charts and tables. | Full report draft, bibliography/source ledger, claims and figures checklist, licensing inventory, and a candidate Zenodo metadata sheet. Title “2026” does not imply coverage through December 31 if the cutoff is earlier. |
| 7 | Nov 23–29, 2026 | Conduct actual human editorial/source review of the report and cross-check affected model pages and Deep Dives. Resolve unsupported claims and rights issues. Obtain explicit confirmation of Zenodo authorship, contributor roles, affiliations, ORCID identifiers if provided, title, abstract, keywords, version, release date, license, and related identifiers. | Dated review record with real reviewer identity/role and resolved findings; approved final files and confirmed deposit metadata. Missing human review, uncertain attribution, or unverified rights holds the release. Do not manufacture a reviewer, approval, affiliation, or ORCID. |
| 8 | Nov 30–Dec 6, 2026 | Release only after the P1 work and external publication are actually authorized and all gates pass. Publish the repository metadata package under CC0 and the report through the correct Zenodo account. Confirm the live record and DOI, then add accurate links to the site. | Versioned repository release and downloadable export; published Zenodo record with real DOI resolving to the intended report, correct version and license, verified files, and site links. Record actual completion dates; move this target window if any prerequisite remains open. |

The steps may overlap where they do not depend on missing evidence. A late source review or licensing decision moves the dependent release window; it does not justify filling a gap with a guess. There is no automatic recurring job or reminder created by this roadmap.

## Acceptance by deliverable

### Model database and CC0 metadata export

- At least 10 distinct, useful model records have individual pages, stable IDs, canonical URLs, titles, and direct primary-source links. Different aliases are not counted as separate models; a materially separate version needs a documented identity rule.
- Apply the common fields in `docs/model-card-standard.md`: identity/family/version/dates, provenance, modalities and state/action/prediction interfaces, planning role, embodiment, data/code/weights and licenses, evaluation conditions, limitations, and status. Missing facts remain explicitly unknown.
- Define and document the export format and schema, and validate its records and internal references. Provide a machine-readable export with the repository release, along with version, evidence cutoff, field definitions, source URLs, and a CC0 dedication limited to material RoboSkin.ai can release.
- Export rights are checked field by field. Factual metadata and RoboSkin.ai’s original descriptions may be included within the authorized dedication; copied abstracts, paper text, third-party figures, photos, model weights, datasets, and software must not be silently relicensed as CC0. Link to third-party artifacts and their actual terms.
- Retain existing working URLs and page identities. Verify sitemap inclusion, crawlable links, metadata and structured-data consistency, and usable mobile tables/cards. Code checks validate the website and export; they do not validate a model’s scientific performance.

### State of Tactile AI 2026 and Zenodo

- The report states its evidence cutoff, source selection method, field definitions, review method, limitations, version, and correction route. It offers original synthesis; it does not pool incompatible benchmark scores into a misleading ranking.
- Original report text and eligible original figures use **CC BY 4.0** with an accurate rights-holder statement. Third-party material requires compatible permission or an explicit, lawful separate attribution/licensing boundary; if rights are uncertain, replace or omit it before release.
- Human editorial review actually occurs. Record reviewer name, role, date, scope, material findings, and resolution. Describe their true role; do not call the review expert peer review or scientific replication without evidence that those activities occurred.
- The responsible human confirms final authors, affiliations, contributors and roles, ORCIDs when supplied, title, description, publication date, version, access/license settings, related identifiers, and the account authorized to publish. Site editorial leadership does not automatically establish report authorship or deposit ownership.
- Use a real Zenodo deposit and inspect its final files and metadata before publication. A reserved DOI or draft record is not a published report. A local placeholder DOI is never shown as real.
- After authorized publication, verify the DOI resolves to the intended live record, file downloads match the reviewed report, the license is correct, and the site cites the correct version. Distinguish a version-specific DOI from a concept DOI when both exist, and preserve the relationship for later revisions.

### `/technology` definition page

- First identify the relevant smashingrobotics.com page, its live URL, title, publication/update date, and the evidence for an October 2026 edition. Save the actual access date and comparison notes. If that edition cannot be verified, state the limitation and use only the accessible version; do not claim to have compared an unavailable edition.
- Compare coverage against reader questions: robot skin versus an individual tactile sensor; sensing mechanisms; measured versus inferred quantities; taxels and arrays; spatial/temporal resolution; normal/shear forces; slip and contact; calibration and drift; hardware/data interfaces; sensing-to-state-to-action flow; training versus inference use; evaluation conditions; and failure modes.
- Define “more detailed” through documented, useful coverage and traceable technical explanations, not word count or unsupported superiority language. Reuse primary sources for facts and create original explanations/visuals. Do not copy competitor prose or illustrations.
- Keep the existing `/technology` URL and relevant internal links. Check readable page structure, source anchors, definitions, comparison tables, glossary links, and consistent visible/schema descriptions.

### `/vla` curation and timeline

- `/vla` has a clear editorial purpose distinct from the existing `/robot-vla-models` evidence index. Preserve the old route, avoid publishing two interchangeable pages, and agree canonical/redirect treatment before implementation if the scopes cannot be made distinct.
- Include at least 8 distinct events with a primary citation and an explicit date type: paper submission, revision, model announcement, checkpoint release, code release, or a documented evaluation. Do not use article ingestion dates as model-history dates.
- Curation explains model roles, major differences, live versus training-only modalities, artifacts and evaluation boundaries, and links to the appropriate model page. A timeline position is not a quality ranking or a claim of independent testing.

### Paper Deep Dives

- At least 2 articles at initial launch explain the actual paper version, problem, method, interfaces, experimental protocol, results, ablations where reported, artifacts, and limitations, with claim-level source locators.
- Each evidence rating states its criteria and source. When using the existing tracker’s A/B/C/D system, apply its exact availability rules and describe it as evidence availability; **A does not mean independently reproduced or highest scientific quality**. If a different rubric is needed outside the tracker’s scope, publish that rubric and its rationale before assigning ratings.
- Include a real human review record before first publication. Author contact, independent code execution, hardware experiments, and reproduction are distinct activities and are never inferred from reading a paper or building the site.
- Separate author-reported numbers from RoboSkin.ai interpretation. Keep conditions, trial counts, metric definitions, and uncertainty visible; report missing information as missing. Link corrections to the established methodology and editorial policy.

## Release record and unresolved dependencies

For each deliverable, record: owner/reviewer when actually assigned, current draft status, primary evidence links, technical checks, actual human review, rights decisions, final files, version, intended public URLs, authorization for the external write, actual publication time, and post-publication verification.

At roadmap creation, P1 model selection, competitor October-version verification, human reviewer assignment, report authorship and Zenodo metadata confirmation, deposit access, actual DOI, and release checks are **pending**. Existing P0 code checks or editorial names do not satisfy these future gates. No P1 page, repository release, report deposit, DOI publication, automation, or outreach is claimed to have been completed by this plan.
