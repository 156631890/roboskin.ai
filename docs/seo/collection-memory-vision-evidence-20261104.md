# Four existing news reviews: collection, simulation, memory and active perception

Content workflow v1; review date November 4, 2026. Prepared independently while the prior production release is verified. No source code from these research projects was executed. No data payload, paid API or hardware experiment was used. Human factual sign-off pending; no human review is claimed. Preserve the four current URLs, original dates, images, anchors and useful analysis.

## Tactus: retain a strong collection guide, add the calibration comparison boundary

Source https://arxiv.org/html/2610.39076v1 , October 29, 2026. Read system design, calibration IV-A, pose IV-B, tactile V-B and pose V-C tables, applications and limitations. Existing 0.59 N MDF at 95% comes from three-participant fingertip normal-force benchmark; 11.0 mm is offline wrist-translation-aligned fingertip error, not causal absolute tracking. Table I full-glove pressure calibration and Table III learned fingertip MLP are different protocols. Proposed precise addition: distinguish the two rather than imply lower force-detection threshold means lower full-glove calibration error. Manufacturer comparator JQ has slightly lower point error (0.18 vs 0.20 N) in Table III; no claim that Tactus wins every metric. No need to add all these numbers to the public page. NIST measurement characterization reread: https://www.itl.nist.gov/div898/handbook/mpc/section1/mpc1.htm . LeRobot v3 documentation reread; storage organization does not supply physical calibration or action semantics.

## DexSuite: retain pinned metadata review, improve the evaluation split decision

Source https://arxiv.org/html/2610.37799v1 , October 27, 2026. Read III and IV: 30 tasks, 10 arms, 12 effectors; benchmark 11 tasks and 16 task/embodiment pairs; 4700 successful simulated episodes (700 teleoperation,1200 scripted,2800 learned rollouts). Scripted gripper pads use configurable penetration-derived force grids; Sharpa uses per-finger forces. Different signals must not be silently concatenated.

The existing October31 inspection of revision f4be6e95af40843da39cd5a88d8bd736393dd59c remains a dated historical inspection. November4 public blob fetch failed in the web tool, so do not claim a new payload or metadata fetch. Before changing the evidence, inspect the saved original JSON records. Current training set is already described as successful-only with missing terminal observation and an all-200-episode train split. Avoid repeating those sections. Possible added value: distinguish holding out episodes from holding out collection policy or embodiment; training on learned rollouts can retain collector-specific correlations, which requires a separate evaluation design (editorial proposal, not an observed leak).

## NEURA Neuron AI: date the demonstration claim, preserve unknown performance

Official release https://neura-robotics.com/neura-robotics-introduces-neuron-ai/ and product https://neura-robotics.com/neuron-ai/ reread November4. Announcement October14. Five embodiments, multimodal input, local inference, optional sharing and future model updates are company statements. Product does not disclose controlled latency or matched benchmark. Existing background OpenVLA/MimicTouch/DexTouch-WM must stay independent and cannot substantiate Neuron AI performance.

The October20-22 planned laundry demo is now a past scheduled event, not a current future event. Preserve original heading anchor but rewrite its paragraph as a dated announcement; this review has not established its actual completed-run outcome. Add a practical memory-reset/skill-version acceptance record, distinguishing in-episode memory from training updates. Do not convert local inference into a blanket claim that all service or data flows remain offline.

## ActiveWAM: expose denominators and timing stages

Source https://arxiv.org/html/2610.01698v1 , October1. Method, Tables2/3/6/8 and sections4.4/4.5 reread. 50 tasks x100 evaluations/task/seed/condition x3seeds; failures/timeouts retained. 53.3 vs33.3 compound score is 20 percentage points. Physical 20attempts/task,3tasks,60permethod,300 across5methods; 30/60 full ActiveWAM and14/60 Fast-WAM. Stage transitions prescribed; human inter-segment actions excluded. Failed-trial categories12/10/5/3 total30, not60. These labels do not prove root causes. 165ms RTX4090 inference,15Hz effective chunk updates and25Hz interpolated commands refer to different stages.

Current project page https://icr-lab.github.io/ActiveWAM/ inaccessible via web tool. Preserve its link and date the earlier Coming Soon observation; current code/weights/license availability unknown, not proof of no release. Add a small timing/denominator reading aid and a proposed camera-control evaluation record, not a new benchmark.

## Follow-up resolved two stale availability/event statements

The official DexSuite project now links a readable repository https://github.com/anashoussaini/Dexsuite . November4 main revision 7a943de57b9525d9aeb6ff2ae4d8793dc35a7ad3 was read through the existing GitHub API. README advertises31tasks/10arms+6integratedrobots/11end-effectors. LICENSE is MIT for software; THIRD_PARTY_LICENSES.md expressly separates model/asset notices, including PartNet-Mobility non-commercial research/education. This supersedes the October31 repository404 observation, but no installation or simulation is verified. Existing pinned dataset metadata is corroborated by the repository's original `docs/seo/news-2026-10-31.md` review record, not falsely described as a November4 payload inspection.

Official October31 recap https://neura-robotics.com/nvidia-gtc-berlin-2026-recap/ was found and read in full. It reports repeated 4NE1 Wheels handling demonstrations and explicitly says appliance wash/dry cycles were shortened to about ten seconds. Therefore the existing future-event paragraph is replaced with an attributed dated follow-up. Do not describe the eleven-minute demonstration as ordinary full-duration laundry or independently verified success. Attempt denominator and intervention logs were not inspected. Recap also distinguishes cloud training from local inference; the new acceptance guidance preserves that distinction.

## Intent and expression review

November4 English searches covered Tactus calibration, DexSuite action layout, ActiveWAM history/control and official Neuron AI evidence. Tactus results are mainly original paper, abstract mirrors and vendor glove specifications; those specifications use different measurement definitions. DexSuite results include the paper, existing dataset directory and third-party dataset roundups. ActiveWAM results largely repeat one paper; an unrelated proxy result was not used. Search did not provide three independent comparable experiments, regional rankings or volume estimates. These four pages already contain substantial original analysis; preserve it, make focused evidence corrections and add only nonredundant decision guidance. No new URLs, news event claims, or traffic promises.

## Responsive correction found during validation

The 390px DexSuite check failed because its complete dataset-identifier link extended to402.8px. The table itself was inside a scrollable container. Add overflow-wrap:anywhere to the ArticleBody wrapper, preserving the complete identifier and href, and repeat build/render checks. This shared fix does not add individually reviewed URLs.

The link-specific fix exposed a second 1.9px overflow in the adjacent plain-text revision hash. Wrapping is therefore inherited from the article-body wrapper for both text and links; exact labels/hashes are retained.
