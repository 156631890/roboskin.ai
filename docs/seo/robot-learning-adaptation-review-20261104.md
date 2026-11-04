# Robot learning, adaptation and supervision evidence review

Reviewed November 4, 2026. Six complete primary arXiv v1 papers read through methods, results and available appendices. Public project metadata checked; no research code executed, payload downloaded, paid inference, robot experiment or human fact sign-off. Original dates and source versions preserved.

## Continual 6-DoF grasping

Paper 2610.01301v1: fixed encoder with weighted Beta pseudo-counts and demonstration recall. Automatically width-labeled outcomes are not force/slip measurement; demonstration labels can be asserted without executing them. Category-specific adaptation, sequential simulation and merged-memory hardware are distinct tests. Sequential adaptation has one category order; merged hardware memory is not an uninterrupted hardware continual-learning trial. Appendix J reports fixed 1,000 ms recall budget divided across demonstrations: bounded runtime can reduce per-item search at larger memory size. Latest official project now links benchmark and model repositories; pinned README/LICENSE checks replace old coming-soon claim. MIT code does not verify separately linked model/data payloads or all third-party assets.

## OccluDex

2609.39017v1 complete. Human representation pretraining then frozen encoder plus trained PPO. Nineteen thresholded contact channels remove force magnitude; matching channel identities, thresholds, viewpoint and geometry remains necessary. Masking explicitly is not a physical occlusion simulation. Simulation 60 Hz, physical control 10 Hz, DAQ 1 kHz. Unseen faucet scale differs from held-out object geometry. Main-table and ablation numbers have distinct protocols; simplified scratch reference changes hierarchy and is not an isolated pretraining comparison. Abstract says 180-degree object reorientation but simulation setup calls both tasks full revolution; retain explicit hardware definition, do not invent reconciliation.

## FunCo-Grasp

2609.39006v1 complete. Correct old swapped per-hand training counts: 3,754 Allegro; 6,242 Barrett; 4,015 Shadow. Functional annotation plus URDF/geometry still required for unseen hands. Final IK fits part centroids, not explicit orientation matching. 0.16 s includes encoding/generation/IK after warmup, excludes I/O/compilation/simulation and physical motion. Finger scaling keeps palm/topology/joint axes fixed. Dataset split 48 train/10 held-out; 3x100 generated grasps per hand-object. 84/100 Apex and 68/100 Revo2 hardware. Public repository still only 13-byte placeholder; no software/weights/license inferred.

## LiMA

2609.28431v1 complete including appendices. Default Dreamer refresh every four Refiner updates is distinct from 3:7 denoising compute ratio. Reported 325 ms=(Dreamer+4 Refiner)/4 is amortized, not worst-case deadline or per-command delay. Future multigpu execution remains future work; do not infer parallel compute from asynchronous scheduling label. Paper/table aggregate PSR 78.9; fresh project abstract 78.5 while same table supports 78.9: retain explicit paper metric and note discrepancy. Make Coffee is simulated pouring, not real liquid transfer. Baseline adapters/training differ: GR00T 50k steps; InternVLA-A1 expanded56DoF. All600 demos task-specific. No touch, no code/weights checked through official page.

## VisForce

2609.25785v1 complete. Correct object-only goal to hand-and-object foreground. User specifies current subtask, offline selected demonstration goal with predefined force is retrieved; not autonomous phase identification or live goal generation. Scalar actuator force projected along kinematic finger normal is not contact-force vector. Actions12D joint deltas, not commanded force. 30Hz camera,200Hz recording matched nearest timestamps not inference frequency. Main20-trial final rates70/55/40 with paper Wilson ranges48.1–85.5/34.2–74.2/21.9–61.3; no population guarantee. Goal conditioning and learned adjustments not certified force servo.

## Res-HIL

2609.30023v1 complete. Online buffer includes autonomous AND human transitions; demonstration buffer duplicates intervention plus initial demos. Fix7Hz as control frequency not training-update frequency. Zero output initialization and L2 residual penalty do not bound future commands or certify safe exploration. Intervention fraction measures time under human control, not monitoring/reset labor. Three repetitions,50 fixed starts each; table rates averages. Source gives intervention criterion but does not establish number of operators or cross-operator study; remove unsupported one-operator/same-operator assertions. Successful-cycle time excludes failed attempts. HIL-SERL vent edge-first criterion applies equally acrossmethods. Current public project describes two loops with videos; no implementation release verified.

## Existing robot-learning overview

Read full current overview and imported five-entry decision matrix/preflight. Preserve source-pinned historical records, real dated loader/input exercises, source versions and all old anchors. CEL v1 rechecked introduction, FERT methods/protocol and held-out robot details: supervised successful-action retrieval after SFT+HG-DAgger; humans label and reset;120 trials on2 held-out same-model G2; collection time per robot fixed. CARD v1 checked source representation, runtime tracker, hardware ablation and metric appendices: measured glove vs inferred video vs synthetic forces;anchor-frame metrics vs3x10 hardware trials;no equivalent tactile-free feedback claim. DexOAK v1 hardware paragraphs72–75 confirm selected successful simulation trajectories,46/56 across5main tasks and10/12 each on2 held-out tasks aftertaskRL. The tactile-ETA/ADEPT/UniVTAC/SoftMimicGen explanations reuse preceding individually reviewed research and guide evidence, not a new executed experiment.
