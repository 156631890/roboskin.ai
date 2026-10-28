RoboSkin robot-data decision kit / version 2026.10.28
https://roboskin.ai/robot-learning#robot-data-starting-points
https://roboskin.ai/robot-teleoperation#trace-action-targets

Purpose: choose a dataset inspection route and record an action contract.
This is a five-entry starting-point shortlist, not an exhaustive catalog,
benchmark, endorsement or interoperability certification.

1. Read selection-matrix.csv or the JSON with labeled source URLs. Each entry
   states whether the evidence is source inspection or a dated executed check.
2. Choose one candidate from your task, embodiment and policy requirements.
3. Inspect one episode, following its original access route and dataset terms.
   One clean episode is a screen for further inspection, not a dataset audit.
4. Fill decision-record.csv. Evidence types: source_inspection, file_check,
   loader_run, simulator_run, hardware_run. Separate what a source reports
   from your own execution. Unchecked/unknown fields stay blank and are noted
   in decision_reason; blank does not mean absent or zero.
5. Fill action-contract.csv by tracing raw field -> transform -> target ->
   controller. Record units, reference frames, timing and gripper behavior.
   Do not send dataset arrays to a robot merely because their dimensions match.
6. Choose inspect_further, adapt, hold or reject and attach the reason and
   next check. No overall score is calculated. The templates contain no
   fabricated observations and no pre-approved decisions.

DROID worked source example (not a loader run): its documented seven-element
action field is distinct from a pinned training transform's ten-element
target (3 position + 6D rotation representation + 1 gripper). Read the exact
source links in the matrix; do not infer a controller from array length.

The separate LeRobot exercise was executed on 2026-10-25. The tactile input
audit was executed on 2026-10-28. Other entries were source-inspected only.
No upstream dataset, software or image is redistributed in this ZIP.
Review the original dataset terms separately from code/model/simulator terms.

RoboSkin-authored matrix and templates: MIT, see LICENSE.txt. SHA256SUMS.txt
checks package integrity; it does not establish suitability or scientific merit.
