"""Build small versioned resource kits from checked-in audit output, not new runs.

Run from any directory: python scripts/build-evidence-resources.py
No network access, third-party payloads or model calls. ZIP membership is explicit.
"""
import csv
import hashlib
import json
from pathlib import Path
from zipfile import ZIP_DEFLATED, ZipFile, ZipInfo

ROOT = Path(__file__).resolve().parents[1]
VERSION = "v2026.10.28"
DATA = ROOT / "public/resources/robot-data" / VERSION
TOUCH = ROOT / "public/resources/tactile-icl" / VERSION


def write_json(path, value):
    path.write_text(json.dumps(value, indent=2, ensure_ascii=False) + "\n", encoding="utf-8", newline="\n")


def write_csv(path, headers, rows):
    with path.open("w", encoding="utf-8", newline="") as stream:
        writer = csv.writer(stream, lineterminator="\n")
        writer.writerow(headers)
        writer.writerows(rows)


def package(directory, filename, names):
    hashes = []
    for name in sorted(names):
        payload = (directory / name).read_bytes()
        hashes.append(f"{hashlib.sha256(payload).hexdigest()}  {name}")
    (directory / "SHA256SUMS.txt").write_text("\n".join(hashes) + "\n", encoding="utf-8", newline="\n")
    with ZipFile(directory / filename, "w", compression=ZIP_DEFLATED, compresslevel=9) as archive:
        for name in sorted([*names, "SHA256SUMS.txt"]):
            info = ZipInfo(name, (2026, 10, 28, 0, 0, 0))
            info.compress_type = ZIP_DEFLATED
            info.external_attr = 0o644 << 16
            archive.writestr(info, (directory / name).read_bytes())


def build_data():
    matrix = json.loads((DATA / "selection-matrix.json").read_text(encoding="utf-8"))
    headers = ["id", "name", "use_when", "signals_and_actions", "format", "first_check", "access_url", "rights", "evidence", "stop_if", "source_urls"]
    write_csv(DATA / "selection-matrix.csv", headers,
              [[row.get(key, "") if key != "source_urls" else " | ".join(source["url"] for source in row["sources"]) for key in headers] for row in matrix["records"]])
    write_csv(DATA / "decision-record.csv", ["candidate", "release_revision", "task", "target_robot", "intended_policy", "inspected_episode", "evidence_type", "evidence_path_or_url", "access_result", "data_license", "code_license", "action_contract_status", "sensor_timing_status", "coverage_limits", "holdout_group", "decision", "decision_reason", "next_check", "checked_by", "checked_at_utc"], [])
    write_csv(DATA / "action-contract.csv", ["dataset_release", "episode", "raw_field", "raw_shape", "source_of_command_or_measurement", "transform_revision", "transform_function", "training_target_shape", "translation_units", "translation_frame", "rotation_representation", "rotation_units", "absolute_or_incremental", "gripper_range", "gripper_direction", "normalization", "observation_action_offset", "timestamp_source", "camera_selection", "success_filter", "controller_interface", "evidence_type", "evidence_url", "unresolved", "checked_by", "checked_at_utc"], [])
    (DATA / "README.txt").write_text('''RoboSkin robot-data decision kit / version 2026.10.28
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
''', encoding="utf-8", newline="\n")
    (DATA / "LICENSE.txt").write_bytes((TOUCH / "LICENSE.txt").read_bytes())
    package(DATA, "robot-data-decision-kit.zip", ["selection-matrix.json", "selection-matrix.csv", "decision-record.csv", "action-contract.csv", "README.txt", "LICENSE.txt"])


def build_touch():
    report = json.loads((TOUCH / "input-audit.json").read_text(encoding="utf-8"))
    assert report["status"] == "pass"
    assert report["inspector_sha256"] == hashlib.sha256((TOUCH / "inspect_release.py").read_bytes()).hexdigest(), "Re-run the inspector after changing its code"
    columns = ["episode", "segment", "start_step", "end_step", "selected_steps", "A_observations_per_fingertip", "B_released_observations_per_fingertip", "C_observations_per_fingertip", "fixed_head_strip_sha256", "fixed_wrist_strip_sha256"]
    write_csv(TOUCH / "segment-audit.csv", columns, [[row[key] if key not in ("selected_steps", "fixed_head_strip_sha256", "fixed_wrist_strip_sha256") else json.dumps(row[key]) if key == "selected_steps" else row["shared_vision_strips"]["head" if "head" in key else "wrist"]["sha256"] for key in columns] for row in report["segments"]])
    write_json(TOUCH / "experiment-config.json", {
        "version": "2026.10.28", "status": "proposed_not_executed", "task": "Lift Bottle",
        "eta_revision": report["eta_revision"], "univtac_revision": report["univtac_revision"],
        "demonstrations": [0, 1], "fixed_vision_contract": "segment-audit.csv head/wrist strip SHA256; same bytes, resolution and order for A/B/C",
        "conditions": {"A": "Segment endpoints; deduplicate if identical", "B": "Published selected recorded steps; algorithm recomputation remains a separate check", "C": "Every recorded row in each segment in order; retain boundary overlap; no silent truncation"},
        "planned_initial_conditions_per_representation": 100,
        "scene_seed_list": None, "run_order_and_randomization_seed": None,
        "simulator_version": None, "task_asset_revision": None, "success_predicate_revision": None,
        "controller_revision": None, "model_snapshot": None, "reasoning_effort": None,
        "prompt_sha256": None, "api_parameters": None, "image_resolution_and_packaging": None,
        "online_observation_policy": None, "max_actions": None, "timeout_seconds": None,
        "infrastructure_exclusion_and_rerun_policy": None, "planned_uncertainty_method": None,
        "execution_gate": "Complete unresolved settings and budget before any run; this file executes nothing.",
        "outcomes": None})
    trial_headers = ["trial_id", "status", "task", "scene_id", "seed", "repeat", "condition", "execution_mode", "run_order", "demonstration_ids", "config_sha256", "vision_manifest_sha256", "selected_steps_manifest_sha256", "model_snapshot", "started_at_utc", "attempted", "valid_run", "success", "failure_category", "exclusion_reason", "rerun_of", "actual_image_count", "actual_input_tokens", "api_latency_ms", "executed_action_count", "context_truncated", "outcome_evidence", "assessor"]
    write_csv(TOUCH / "trial-ledger.csv", trial_headers, [[{"trial_id": f"planned-{condition}", "status": "planned_not_run", "task": "Lift Bottle", "condition": condition, "demonstration_ids": "0;1"}.get(key, "") for key in trial_headers] for condition in "ABC"])
    eta = "https://arxiv.org/html/2610.27613v1"
    tac = "https://arxiv.org/html/2610.26846v1"
    published = "https://roboskin.ai/resources/tactile-icl/v2026.10.28/"
    write_csv(TOUCH / "claim-ledger.csv", ["claim_id", "evidence_type", "claim", "source", "locator", "limits"], [
        ["eta-simulation", "author_reported", "15.75% to 24.00% mean across four tasks; 100 rollouts/task/condition", eta + "#S4.T1", "Table 1", "Within-study comparison; current touch in both; not a cross-paper ranking"],
        ["tactalent-simulation", "author_reported", "V+T task means: UniVTAC 93.8%; OpenViTac 81.8%", tac + "#S5.T1" + " | " + tac + "#S5.T2", "Tables 1 and 2", "80 and 130 episodes per input setting respectively; task-equal means; no physical trials"],
        ["eta-hardware", "author_reported", "6/10 versus 0/10; five Wipe Board and five Pick Up Chips trials per condition", eta + "#A5", "Appendix E", "One complete multimodal demonstration vs none; not historical-touch-only; small pooled sample"],
        ["eta-frame-ablation", "author_reported", "Lift Bottle: no demo touch 27/100; endpoints 27/100; all frames 2/100; selected 36/100", eta + "#S4.T3", "Table 3", "One task and fixed setup; does not establish a universal frame-count rule"],
        ["input-integrity", "locally_observed_offline", "695 raw rows; 24 segments; 2780 decoded images; 96 strips and 228 panels matched", published + "input-audit.json", "episodes, segments, totals", "Two pinned Lift Bottle files only; no controller or success predicate run"],
        ["context-counts", "locally_observed_offline", "Per-fingertip context appearances A/B/C: 48/66/717", published + "segment-audit.csv", "All 24 segment rows", "22 repeated boundaries in C; not unique frames, API images, tokens or costs; B selector not recomputed"],
        ["next-experiment", "proposed_not_executed", "Fix task, demonstration vision and controller; vary A/B/C historical touch", published + "experiment-config.json", "Full proposed configuration", "Null settings unresolved; trial-ledger outcomes empty; no results yet"]])
    (TOUCH / "citation.bib").write_text('''@misc{roboskin2026tactileinputaudit,
  author = {{RoboSkin.ai Editorial Team}},
  title = {Tactile-ETA and TacTalent: Interface Comparison, Published-Input Audit and Matched Evaluation Protocol},
  year = {2026},
  month = oct,
  howpublished = {RoboSkin.ai, version 2026.10.28},
  url = {https://roboskin.ai/guides/tactile-in-context-learning-tactile-eta-vs-gpt-6-astra},
  note = {Offline audit of two pinned Lift Bottle episodes; no policy or hardware evaluation. Versioned resources: https://roboskin.ai/resources/tactile-icl/v2026.10.28/README.txt}
}
''', encoding="utf-8", newline="\n")
    package(TOUCH, "tactile-context-reproduction-kit.zip", ["inspect_release.py", "test_inspector.py", "requirements.txt", "LICENSE.txt", "README.txt", "input-audit.json", "segment-audit.csv", "experiment-config.json", "trial-ledger.csv", "claim-ledger.csv", "citation.bib"])


if __name__ == "__main__":
    build_data()
    build_touch()
    print("Built two deterministic resource kits from the recorded audit.")
