# World-model interfaces and evidence review — November 4, 2026

Scope: six existing News pages and the complete /robot-world-models overview. Source review, not model execution, downloaded weights, robotics tests or human factual sign-off. Preserve original publication dates, sections, assets and links. No new dataset records or GSC/outreach. All numerical results below belong to the authors unless explicitly marked as arithmetic or proposed evaluation guidance.

## Source method

The full six arXiv v1 methods, experiments and appendices were read, with current official project pages. Local primary-source-reads.json, project-source-reads.json and additional-source-reads.json retain HTTP status, retrieval time and hashes; raw HTML and extracted text are retained. The InternW0 repository documentation was pinned at eceefc35b26d131c67048cb2cf26fecbee5ea5a5. Only textual documentation and licenses were read; no installation or model/dataset payload download occurred. The MAIA methods and evaluation and the survey's definition/interface sections support the evergreen overview. Existing specialized research records retain their individual reviews.

## SkeleWAM

- v1 October 1, 2026, https://arxiv.org/html/2610.02120v1 ; current https://skelewam-project.github.io/ read in full.
- RGB-D object landmarks and robot forward kinematics share a robot-centric frame. Stable landmark identity/order, coordinate convention and training normalization are dependencies. Sparse state does not establish force or contact sensing.
- Future skeleton and action branches do not attend to one another; future prediction is a training target removed at inference. MAC selects a medoid among three action samples using the first ten normalized continuous-motion steps; executed prefix is sixteen of thirty-two. Agreement is neither consequence scoring nor physical confirmation.
- More sampling/replanning is not monotonically better: K=1/3/5/10 gives 84.2/85.9/85.2/84.1, while execution horizons 5/16/32 give 80.7/85.9/81.8 in the stated ablations. Avoid generic claims that more sampling is safer or faster.
- 85.9 vs 82.2 covers 10,030 LIBERO-Plus variants, but layout 66.6 vs pi0.5 84.1 is an important weakness; privileged layout 69.0 does not remove it. Hardware 89 vs 87 averages five tasks, twenty trials each, without confidence intervals. Parameter counts are not measured end-to-end timing.
- Current project supplies manuscript/media; implementation, weights and license remain unverified. Do not infer an open implementation from a live project page.

## TacDyn-WAM

- v1 September 30, https://arxiv.org/html/2610.00638v1 ; https://enyi-bean.github.io/TacDyn-WAM-Page/ still identifies code as coming soon.
- Single-pass tactile prediction is not single-pass whole-policy inference: action generation uses ten denoising steps. Future/delta readouts are training supervision; action generation consumes latent tokens plus current-state memory.
- The 484 ms median is thirty warmed runs from input tensors to a GPU action chunk on an A100. Fifty actions are produced, thirty-two executed on hardware before the next query. 9.7 ms per action is amortized division by fifty, not an observed feedback interval. No control frequency is inferred from it.
- Four-frame current tactile history is different from future horizons 5/15/25. Simulated background subtraction and Xense difference-image zero-offset normalization differ; do not subtract a raw background twice when translating the described pipeline.
- Provided-demonstrations-only excludes extra visuo-tactile trajectory pretraining, not pretrained backbones. InternVLA-A1, AnyTouch2, V-JEPA2.1, DINOv2 and Cosmos dependencies matter. Most benchmark baseline rows are inherited; RDP/TacForcing means omit two tasks. No universal ranking.
- Hardware uses five tasks, sixty demonstrations and twenty trials per task per policy, Xense finger sensors. 6,000 OmniViTac trajectories plus the 300 target demonstrations in early stages precede per-task fine-tuning; this is not target-unseen transfer. Gel degradation examples do not quantify lifetime.

## TouchTherm

- v1 October 1, https://arxiv.org/html/2610.01943v1 ; https://anonymous-research1.github.io/ still promises assets/code upon acceptance.
- Fine surface geometry drives tactile image appearance while the coarse mesh handles collisions. It does not add resolved friction/contact mechanics. Natural-cooling model does not implement bidirectional object-sensor heat transfer.
- Object-specific GelSight calibration and global color calibration are real measurements separate from the twenty real recognition test images per class. Synthetic-only classifier training is not a zero-real-data reconstruction pipeline.
- Twenty classes, ResNet-18, six seeds, ninety synthetic training and ten validation samples per class. Recognition is not manipulation-policy success. Thermal evaluation uses overlapping windows from the same objects, not independent physical trials.
- Tactile similarity permits bounded image registration; it is not raw pose/registration accuracy. Keep real–sim values 0.0712/0.0775 distinct from ablation 0.0701/0.0911 and real-repeat references. Thermal effective parameters are not certified bulk conductivity. VR participant scores are not physical robot or medical validation.

## InternW0

- v1 September 23, https://arxiv.org/html/2609.27656v1 ; current https://internrobotics.github.io/internw0/ and official linked source/model documentation reviewed.
- Video expert does not consume robot-specific candidate actions; its predictive context informs action inference. This is not automatically an action-conditioned counterfactual planner. Cached video K/V is adapted to each observed chunk, without rerunning full video prediction each time.
- 60.73 ms is critical-path latency on RTX 5090D, including observation encoding/routing/action denoising but excluding asynchronous video generation; 16.47 Hz is model-side maximum, not measured physical controller rate or complete startup latency.
- 7,233.5 hours, 811,969 episodes, twenty-five training domains are not twenty-five robots. EgoLab 275.4 hours supplies video-only supervision, not robot actions. Thirty-seven dimensions use validity masks; valid zero and missing padded channels differ. Pretraining excludes dexterous-hand data; posttraining handles contact extensions.
- Fifteen physical trials per task. Sandwich episode success, parts/tubes object success and MoF/pipetting ordered-subtask progress have different denominators. Pipetting 65.3 progress vs final-stage 46.7; MoF 68.4 progress vs final-stage 26.7. No measured liquid-volume/chemistry accuracy established.
- Important availability correction: pinned code release eceefc35 (October 23) includes RoboTwin/LIBERO adapters, explicitly excludes force/tactile, real-robot and laboratory assets. MIT repository license excludes separately licensed third-party assets. Base model card labels weights MIT, describes a target-interface initialization rather than a posttrained deployment controller, and separately requires Wan/DINO assets. Collection links three checkpoints; no payload integrity or execution verified.
- README says paper benchmark numbers were not rerun during code-release validation. LIBERO executes sixteen actions per chunk by default; changing execute count changes evaluation protocol. Preserve this distinction from paper hardware timing.

## Agile-WAM

- v1 September 17, https://arxiv.org/html/2609.20761v1 ; https://hanchuzhou.github.io/TARO_project_page/ retains code-coming-soon text and abstract's 29.4% / 11.9 ms. Full table gives 63 vs 48 percent and 10.35 ms; original discrepancy discussion retained, not silently reconciled.
- Nine-task simulation selects maximum success across training checkpoints then averages three seeds; this is not the final checkpoint or across-training mean.
- VITA-VT is the authors' tactile extension; Tactile-WAM baseline reproduces core attention design in their environment, not a verbatim upstream release. Equal-capacity predictive-loss ablation is a more specific causal comparison than a broad leaderboard.
- Six Euler steps transform current fused features; no new measured tactile observation is inserted at each denoising step. Sixteen-action prediction, eight executed before replanning. Next-frame tactile prediction is not measurement during execution.
- Simulated 10×14×3 force arrays and real 32×32 piezoresistive arrays are different interfaces; real array does not automatically measure three-axis shear. Demonstrations include corrective behavior; qualitative recovery videos do not give conditional recovery rates. Source timing excludes the complete sensing-to-motion budget.

## Body-grounded replanning

- v1 September 24, https://arxiv.org/html/2609.30024v1 ; no implementation execution or separately verified release.
- Correct existing scope: 96.7 vs 88.5 is all ten simulated tasks, not seven asymmetric-load tasks. The seven-task means are 96.1 vs 87.3. Hardware BodyGrounded and EnvOnly both 77/80 = 96.25%, reported 96.3; Rules 53/80 = 66.25%, reported 66.3.
- Twenty-Hz traces, fifteen-step window, ten-step persistence/cooldown. Ridge predictor uses twenty history and ten future steps, and informs one effort-near-limit trigger. It is not a candidate-action-conditioned physical world model.
- LLM selects from nine predefined strategies; only STRATEGY is sent to the robot, not freeform reasoning. Figure 3 supplies prompt text, but that is not a runnable package or logs. No paid API tests.
- Simulated torque norm and raw Dynamixel hardware effort are distinct; the latter is not calibrated contact force or energy. Hardware/simulation EnvOnly trigger protocols differ; Rule comparison also lacks continuous body context.
- Reported motion time excludes LLM reasoning pauses; failures receive the horizon maximum. Record end-to-end elapsed time separately. Three additional hardware examples are qualitative, not the eighty-trial denominator.

## Complete evergreen overview

- Read existing overview and preserved sections, table/FAQ definitions, MAIA subsection and references. Survey II-C distinguishes predictive components, systems and training objectives; standalone reward/value functions are not world models. Existing introductory generalization should acknowledge broader WAM usage without weakening candidate-action conditioning required for consequence comparison.
- MAIA full method/protocol corroborates 2,852 trajectories, eighteen tasks, thirteen seen/five adapted, eight candidates, twenty executed actions, thirty trials/task/method and 52.6→61.5. Category sizes differ (four insertion, three wiping, four pressing, three path-constrained, four articulated tasks). Weighting the rounded category rates by task counts is consistent with the reported overall rates; do not treat the five category means as equally weighted or reconstruct exact integer successes from rounded percentages. Project URL returned HTTP404 on November 4; no new release conclusion inferred. Previous artifact review date remains historical.
- LeRobot v0.6 announcement confirms VLA-JEPA/LingBot-VA/FastWAM integrations and evaluation tools. This is ecosystem documentation, not our runtime verification or evidence of uniform capabilities.
- New comparison should distinguish removed training predictors, online latent guidance, slow context/fast action routing, object asset rendering and body-triggered strategy selection. These are not six interchangeable counterfactual planners. Proposed evaluation record: observation time, predictive-context age, query/return, action prefix, next feedback, confirmed outcome; labels identify proposed evaluation rather than performed experiment.

## Release gates

No source or factual review alone counts as production delivery. Preserve original modules, assets/links/anchors and dates; validate exact HTML/Markdown, metadata, canonical/indexing, sitemap membership, internal anchors and desktop/mobile presentation. Standard tests, lint, build, export/SEO/structure checks; own content PR normal checks/merge; exact production commit and body verification before inventory update. Whole-site goal remains active until all inventory URLs have individual decisions and verification. Human factual review remains pending and is not claimed.

## Embedded overview records

Rechecked InsertionWM v1 methods and evaluation (90 train / 10 held-out in-distribution assemblies, 100 trials per assembly, simulation only; TD-MPC2 latent dynamics, reward/value and MPPI), and the robot-learning survey introduction/taxonomy against the existing reading cards. These match the bounded existing descriptions. The five-model table deliberately retains original review dates and paper versions; its DreamTac/FeelWorld/HiTac/TouchWorld/ViTac source reviews are also covered by preceding individual article revisions in this programme. No historical review date was silently refreshed or artifact reproduction implied.
