# Practical guide source and execution review

Date: November 3, 2026. Same full-site content workflow, no separate engineering task. Proposed scope: optical gel maintenance, optical-versus-capacitive comparison, GelSight Mini versus original DIGIT comparison, and Python tactile processing tutorial. Existing detailed text, anchors, download templates, original experiments and historical dates remain.

## Independently checked public sources

- GelSight Mini sheet, October 7, 2024: https://www.gelsight.com/wp-content/uploads/productsheet/Mini/GS_Mini_Product_Sheet_10.07.24.pdf . Two-page PDF read. Tool-free cartridge, 18.6 × 14.3 mm field, 25 FPS and 1,000 coin presses are source-specific values, not universal performance. No additional durability number is added.
- Pinned gsrobotics README 321d6a2: https://github.com/gelsightinc/gsrobotics/blob/321d6a22da64529138ff10237335038fd8c5189f/README.md . Questions 26–27 retain rough/sharp-contact wear and foam-swab/small-amount IPA guidance. This is Mini-only; concentration and soak time are unspecified.
- Current Mini cartridge page: https://www.gelsight.com/product/standard-silicone-replacement-gel/ . January 3, 2025 reformulation notice remains. Current price and lead time were visible but are not added to this evergreen maintenance guide.
- Original DIGIT paper: https://arxiv.org/pdf/2005.14679v1 . Full eight-page paper accessible; section III-A documents a one-screw elastomer replacement and modular body; section III-B differentiates camera hardware from configured acquisition. No service torque, universal replacement interval or independent performance claim is invented.
- Maiolino et al.: https://arxiv.org/html/1411.6837v1 . Full paper read, including fabric dielectric, thermal compensation and hysteresis. The arXiv posting is 2014; the paper identifies its 2013 IEEE Sensors Journal publication. No generic optical/capacitive winner follows.
- PPS: https://pressureprofile.com/sensors/robotact . Current manufacturer page describes capacitive RoboTact and RoboTouch paths. Manufacturer benefit language is not adopted as tested efficacy.
- Original DIGIT interface: https://github.com/facebookresearch/digit-interface . GitHub archive date November 1, 2024, default VGA 640×480 at 30fps and acquisition methods verified. No installation or connected-sensor test performed.
- Pinned DIGIT design URL returned a research-tool restricted-URL error in this pass. Its previously dated source route remains; no new design-license or current support claim is made. Do not label that read successful.

## Original analysis and real execution

Maintenance diagnosis separates visible damage, acquisition changes, reference estimates and policy behavior. Cross-principle comparison adds a labeled arithmetic example: 1 N / 0.0001 m² = 10,000 Pa, and 1 N / 0.0002 m² = 5,000 Pa. It is not device data. A broader software-maintenance discussion links back to the device profile instead of duplicating specifications.

The existing Python code and tests were inspected before execution. Twelve behavior tests passed on CPython 3.13.3. The processor ran with already installed Matplotlib 3.10.8 / NumPy 2.2.6, writing only to the local batch50 directory. No dependencies were installed. CSV and JSON outputs equal the reference after newline normalization. Archive source, tests and input match checkout contents after newline normalization. New plots were viewed and retain unknown values correctly. The public new verification record must preserve this exact scope, source hash, timestamp and environment; it must not replace the September historical record or claim a fresh venv/hardware/ROS run.

## Other triage, not completed pages

X-Hinges arXiv 2609.11077v1 and the GenTact toolbox were read and support the current printed-sensor guide's scope. PMC TacTip returned a browser/reCAPTCHA checkpoint; no challenge was followed. The entire printed-sensor guide is not marked reverified. The ROS overview and publisher-access gaps from batch49 also remain separate pending work.

## Editorial and release checks

Four passes: primary facts/conditions; reader decision and added reasoning; clear author-versus-editorial-versus-executed evidence; intent, natural links and truthful conversion. No blanket date refresh, new ranking, volume, superiority claim or thin page. Human factual sign-off is pending and not invented. Tests/build/SEO, original modules/dates/downloads, canonical/index/sitemap, HTML/Markdown, links and desktop/mobile must pass before normal PR merge. Production must match the merge SHA and reviewed body. No outreach or GSC action.
