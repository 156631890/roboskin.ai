# Tactile sensor acceptance decision record

RoboSkin.ai, November 3, 2026. This header-only CSV contains no measurements,
vendor scores or recommended limits. It complements the original selection
worksheet; it does not replace a calibration protocol or a safety assessment.

Use one row per candidate revision and requirement. Define critical_gate,
criterion_set_before_test and protocol before collecting the acceptance results.
Keep unknown evidence explicitly unknown. An unsupported critical requirement
cannot be offset by a high score on a noncritical preference.

- candidate_id / revision / configuration: exact sensor, pad, mounting, driver,
  processing model and controller configuration relevant to the comparison.
- reference_and_units: named reference, quantity, unit and coordinate convention.
- evidence_type: vendor_documentation, author_experiment, hardware_measurement
  or illustrative_example. Do not combine these as independently tested results.
- evidence_file: retained raw recording, report or source URL and version.
- attempted_trials / valid_trials: retain both denominators and exclusion reasons.
- result / uncertainty_or_limit: observed result with units and relevant limits;
  do not enter a quoted specification as your own measurement.
- decision_pass_fail_unknown / reason / next_action: an attributed decision for
  this requirement and configuration, with a concrete remaining check if unknown.
- reviewer / review_date: the person who actually reviewed the evidence and date.
  Leave blank until review occurs; the template supplies no approval.

The original blank selection worksheet remains at selection-worksheet.csv.
Source-based comparison and worked scenarios:
https://roboskin.ai/guides/how-to-choose-a-tactile-sensor
