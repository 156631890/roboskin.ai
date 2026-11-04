# Gripper contact evidence review — November 4, 2026

Scope: six existing News reports and the full /robot-grippers guide, including its injected model table. Original publication dates, anchors, assets and useful links must survive. This is documentary source review, not hardware or dataset reproduction. Human editorial sign-off is not claimed.

## Sources actually examined

- Tackiness: https://arxiv.org/abs/2609.36558 and full 23-page https://arxiv.org/pdf/2609.36558 (HTML unavailable). September 29 v1. Methods, figures, results and robot protocol read.
- TacGooseBumps: https://arxiv.org/html/2609.34006v1 and abstract; September 27. Methods, task criteria, iPhUMI acquisition and limitations read.
- Making Waves: https://arxiv.org/html/2609.39652v1 and abstract; September 30. Routing, RL, real-world trials and limitations read.
- Granular support: https://arxiv.org/html/2609.29093v2 and abstract; September 24 v1, September 25 v2. Current revision rather than silently treating v1 as current.
- FibTac: https://www.nature.com/articles/s44182-026-00112-0 (August 31), full methods/results/discussion; https://github.com/xvvzhang/FibTac root/README metadata read, no downloaded experiment payloads or code execution. Local source responses recorded in primary-source-reads.json.
- JFM: https://arxiv.org/html/2610.01668v1 (October 1), main text and appendices. Under review, not an accepted-publication claim.
- Model table: current official OnRobot RG2-FT, VG10 and Soft Gripper pages, and Robotiq 2F product-sheet PDF (May 2025). Reviewed November 4; vendor claims, not independent tests. Existing model-table figures match these sources and need no speculative replacement.

## Corrections and decision value, page by page

### Single-element tackiness sensor

- One Hall element and a magnet in a PDMS structure detect compression and tension. Framework diameter 7 mm and contact cylinder 3 mm are different dimensions. 0–150 kPa compression and 0–33 kPa tensile measurements are stresses, not newtons.
- Timing values were measured at 6 V; other characterization used 5 V and the robot demonstration 2 V. Do not imply one operating condition. Durability/load-cycle findings are limited to their stated protocols.
- Existing robot description must be corrected: authors cleaned the taped bottle before handling; when cleaning is unavailable they describe opening/closing to weaken adhesion. The demonstration uses predefined/remote commanded motions, not an autonomous clean-area regrasp policy.
- Retraction speed changes interpretation: peak pull-off force and force–distance work are distinct; neither is a raw voltage–time integral. Contact area, preload, dwell, displacement and surface condition belong in a measurement record.
- Range comparison selected the best of three sensors. Not manufacturing yield or a universal calibrated range after replacement.
- Add a release/adhesion acceptance section, including baseline reset and independent separation outcome. No unverified downloadable assets or safety claim.

### TacGooseBumps

- Off-the-shelf dome geometry (6 mm diameter, 9 mm pitch), molded pad (3 mm, 5 mm) and FlexiTac example (10 mm, 12.5 mm) differ. Lack of exact taxel registration is not geometry independence.
- USB: 100 demonstrations per variant, 20 initial conditions; 15/20 bare, 19/20 off-the-shelf, 18/20 molded. Vision-only surface control 60/65/55 does not establish a consistent surface-only gain. Successful-trial times are conditional on success.
- Bulb: 55 demonstrations per sensing condition, 20 nominal + 5 OOD trials; 15/25 versus 24/25 total. Success includes illumination and twist-locking.
- Eggs: five eggs with five trials each per condition; two of five eggs cracked in the unmodified condition, not two independent failures among 25 fresh objects. Pressure proxy is not newtons. Both conditions can have equal binary task success but different damage and transfer time.
- Drawing is tared for the first three seconds with the marker already grasped, not absolute grasp-force measurement.
- Phone/touch clocks are aligned post hoc by one offset estimated from width–pressure correlation. Not shared-clock acquisition or a guarantee against time-varying drift.
- Add surface, clock, replacement and damage evaluation criteria. No verified released CAD/code claim.

### Membrane-coupled delta array

- The membrane adds continuous contact, not distributed tactile sensing.
- Correct existing open-loop label: local 15 mm-object routing uses predefined primitives held until tracking confirms transfer; A* feedback, retries and edge penalties can reroute. Thirty trials cover six fixed routes, not arbitrary microscale placement.
- Local versus global DCT policies both have 27 action parameters; local allocation changes spatial resolution, not merely actuator count.
- Physical RL: five objects, ten trials each; 38/50 hardware versus 50/50 simulation at final error <20 mm after 100 steps/20 s. Policy runs at 5 Hz. 2 kHz is simulation physics. Closest approach and final held position differ; orientation is not part of the reported goal metric.
- Membrane strain and coupled neighboring motion constrain concurrent use. Concavity and fabric/object geometry contribute to real/sim differences.
- Add separate criteria for routing versus RL final-position success; independent orientation/hold, edge, timing and simultaneous-load checks are proposed buyer evaluation, not reported experiments.

### Support-enhanced granular jamming

- Use current September 25 v2 and its affiliations; original v1/date retained. NR/TPR spherical mixture is 50% of loose-particle volume relative to uncompressed membrane volume, not mass fraction.
- Common objects ten trials each; rod 10/10 versus 6/10; coupled mechanical changes do not isolate a single causal mechanism. Shape and fill-rate tests are distinct conditions.
- Offset maps are object/orientation-specific sampled conditions with interpolation. They do not form an isotropic tolerance radius.
- Learned controller addresses reaching; 16 physical trajectories over two targets give 4.23 cm terminal RMSE versus 2.51 cm simulation. Scalar reaching RMSE cannot be compared directly to an asymmetric capture basin to infer full-task success.
- Grasp/contact/compression/vacuum/lift/transfer/release have no common end-to-end denominator reported here. No touch feedback; future proprioceptive/tactile sensing is discussed.
- Add combined reaching/capture acceptance and conditional failure records, without multiplying incompatible success statistics.

### FibTac

- Rigid fibers translate/reorient through a deforming silicone membrane; do not describe carbon fibers themselves as the compliant bending element.
- Pneumatic control uses open-loop timed sequences and manually recorded robot waypoints at specified object locations/orientations. Internal-camera classification is independent; chess class selects a predefined placement, not general autonomous scene planning or force-feedback regulation.
- Camera 60 fps is not a control frequency. 3,000 cycles and maximum laboratory payload are bounded prototype observations, not all-object lifetime/payload ratings.
- Read exact per-task splits; underwater demonstration uses three artificial replicas plus seaweed, not broad natural marine-object validation.
- Flow methods select the model by lowest MAE on the test set. Reported test performance therefore is not an untouched final holdout. Volumetric flow L/min is not speed m/s.
- Discussion says weight estimation remained unreliable. Classification is not calibrated force/weight measurement.
- Public repository root has no LICENSE and GitHub license metadata is null. README links evaluation notebooks and external data/checkpoints; paper and README data links differ. No payload/download/reproduction or blanket reuse permission claimed.
- Add control-loop and split-audit section, with proposed recalibration and unknown-object checks.

### JFM rigid–soft finger

- Approximately 10,000 samples is total collected data, not training count; 80/10/10 split, seed 42. Split granularity not stated clearly enough to claim held-out people/days or allege leakage.
- Glove orientation data sampled 45 Hz, servo data 55 Hz, nearest-timestamp pairing. No tactile measurements. Normalized within-step learned flow is not a physical instantaneous Jacobian or newly measured high-rate data.
- 160 held-out trajectories evaluated with strides 1/4/8. Improved interpolation is not new-hardware or delay robustness. Backbone/objective comparisons must remain paired.
- Inverse-command experiment reconstructs recorded commands; it is not an executed closed-loop manipulation trial. Mechanical-stop discontinuities remain difficult.
- 3.5 ms is a pointwise workstation query; do not infer complete ODE solver, sensor, communications or robot-loop latency.
- Add independent sequence/split, clock, hard-stop and physical tracking validation checklist. No released SDK/license/reproduction claim without evidence.

## Evergreen companion

Review /robot-grippers fully and preserve existing model table and anchors. Add a substantive contact-evidence comparison distinguishing passive mechanics, sensor measurement, estimated state, executed feedback and task outcome. Link the six reports as different building blocks (including membrane surfaces and finger models, not commercial gripper products). Add a repeatable receiving-test record covering pickup, retention, release, damage and independent outcome checks. Manufacturer model data are sourced and bounded, not rankings.

## Publication checks

Pending implementation: substantive source-driven differences; original dates/anchors/assets/links preserved; metadata, canonical, indexability, sitemap/export, citations and accessible tables; relevant tests, lint and build; desktop/mobile screenshots; ordinary PR checks and merge; exact production merge SHA and body match. No outreach or new GSC request. Whole-site goal remains incomplete until every inventory URL is individually reviewed and verified live.
