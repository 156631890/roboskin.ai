RoboSkin tactile context input audit and experiment planning kit
Version 2026.10.28
https://roboskin.ai/guides/tactile-in-context-learning-tactile-eta-vs-gpt-6-astra

WHAT WAS ACTUALLY RUN
An offline check of two pinned UniVTAC Lift Bottle HDF5 episodes against
Tactile-ETA's published demonstration manifest and 96 PNG strips. See
input-audit.json for the execution time, environment, source and script hashes.
RoboSkin ran its own inspector, not the author's controller or preparation code.

695 raw rows, 24 segments, 2,780 decoded source images and 228 strip panels
were checked. Every checked strip panel matched the decoded source pixels
after excluding the 30-pixel label band. Boundary end-effector and joint
states matched the published manifest exactly. Left/right tactile views use
the same recorded steps; selections are ordered, unique and retain endpoints.

Across all segments, context appearances PER FINGERTIP total:
  A: endpoints 48; B: author-released selected observations 66;
  C: complete raw segments 717.
These totals count repeated boundaries: 717 appearances cover 695 unique
raw rows because 22 segment boundaries include the preceding row.
They are not token counts, API image counts, cost savings or success rates.
Example: episode 0, segment 1 spans recorded steps 110-238. B contains
[110, 234, 236, 238]; A/B/C counts are 2/4/65 per fingertip.

WHAT WAS NOT RUN
- The optical feature calculation and peak-selection algorithm were NOT
  recomputed. B is the author's published selection, verified against raw data.
- A/C were counted, not submitted to a model. No policy inference, simulator,
  online controller, physical robot or task success predicate was executed.
- The upstream episodes are described as successful demonstrations; we did
  not independently validate success. No new success-rate claim is made.
- Simulation step IDs are not measured wall-clock synchronization. This
  does not measure sensor calibration, physical force or contact accuracy.
- Raw JPEGs are decoded with the author's numeric-channel convention. Pixel
  agreement is a reproducibility check, not independent color calibration.
- Only this task, these two files and these revisions were inspected. A pass
  does not establish the quality of the full dataset or hardware readiness.

RUN IT YOURSELF
Use a dedicated Python environment (published run: Python 3.13.3 on Windows).
From the extracted kit directory:

  python -m venv .venv
  # Windows PowerShell: .venv/Scripts/Activate.ps1
  # macOS/Linux: source .venv/bin/activate
  python -m pip install -r requirements.txt
  python -m unittest -v test_inspector.py
  python inspect_release.py --data-dir inputs --output my-audit.json --download

The explicit --download flag retrieves about 0.97 GB from the pinned public
GitHub/Hugging Face revisions. Allow several GB of working memory/disk.
It uses no credentials, paid API or upstream executable code. Network/data
charges from your own provider are outside this kit. Check source terms first.
Existing files are not silently replaced; a checksum failure stops the check.
Keep a failed file for inspection, then choose a fresh data directory to retry.

After downloading, disconnecting from the network is supported:
  python inspect_release.py --data-dir inputs --output offline-audit.json

Outputs differ in executed_at_utc and possibly environment; source hashes,
per-segment checks and observation counts should match this version. A future
dependency change should be recorded, not described as the same environment.
test_inspector.py uses synthetic data to check rejection behavior; its tests
are software checks and do not add any robot evidence.

FILES
- inspect_release.py: the actual standalone audit code.
- input-audit.json: observed output, source hashes, environment and limits.
- segment-audit.csv: one row per segment, selected steps and fixed vision hashes.
- experiment-config.json: proposed A/B/C protocol. Nulls are unresolved settings.
- trial-ledger.csv: three PLANNED example rows, one per condition. All observed
  outcomes are empty. Expand only after fixing scene IDs and trial design.
- claim-ledger.csv: separate author-reported paper results, locally observed
  input checks and proposed experiments, with exact sources and limits.
- citation.bib: citation for this version; no DOI is assigned.
- SHA256SUMS.txt: package integrity hashes, not scientific validation.

NEXT EXPERIMENT: FIX VISION, VARY DEMONSTRATION TOUCH
Freeze the task, two source episodes, action boundaries, vision image bytes,
image resolution/order, robot states, prompts, model snapshot, reasoning,
tool adapter and online sensing policy. Use segment-audit.csv's head/wrist
hashes as the vision contract. For A, retain each segment's endpoints. For B,
first match the released selection; separately verify the selector's feature
code and parameters before calling it an algorithm reproduction. For C, use
every recorded observation in order. Do not silently resize or truncate C.

Complete every null in experiment-config.json, predeclare a shared scene/seed
list and randomize or counterbalance run order. The planned reproduction of
the published ablation uses 100 initial conditions per representation for
Lift Bottle. This kit does not create those scenes or execute those trials.
Log actual images/tokens, latency, context overflow and every attempted run.
Keep invalid infrastructure runs separate, with a declared rerun policy.
Report per-task successes/attempts and uncertainty; retain paired scene outcomes.

In closed-loop tests the online camera frames will diverge after different
actions. The fixed-vision contract applies to demonstration inputs and online
observation construction, not magically identical future trajectories. Only
offline replay can send the exact same recorded online observations to A/B/C.

CITATION AND RIGHTS
Cite the original papers for their success rates, trials and selector claims.
Cite this version for the offline input audit, packaging counts and protocol.
No academic peer review, author endorsement or hardware certification is claimed.
RoboSkin-authored code and templates use LICENSE.txt. Source dataset/model/
simulator rights must be checked separately; this ZIP redistributes none of them.
