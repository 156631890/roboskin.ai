"""Validate a small numeric LeRobot v3-style snapshot, not full compatibility.

No videos, task-text mapping, statistics, dtype/codec conformance, or policy
compatibility checks. Read-only; all input is loaded into memory.
Copyright 2026 RoboSkin.ai. SPDX-License-Identifier: Apache-2.0
"""
from __future__ import annotations
import argparse
import json
import math
from pathlib import Path
import sys
import pyarrow.parquet as pq

SCOPE = "numeric-v3-subset; not an official LeRobot compatibility validator"
SCALARS = ("index", "episode_index", "frame_index", "task_index", "timestamp")
REQUIRED = (*SCALARS, "observation.state", "action")
TACTILE = "observation.tactile"
VALID = "observation.tactile_valid"


def finite(value):
    return type(value) in (int, float) and math.isfinite(value)


def integer(value):
    return type(value) is int and value >= 0


def validate(root: Path, tolerance: float = 1e-4) -> dict:
    """Return all detected errors. A pass applies only to the documented subset."""
    errors = []
    report = {"scope": SCOPE, "ok": False, "frames": 0, "episodes": 0,
              "unknown_tactile_values": 0, "errors": errors}
    if not finite(tolerance) or tolerance < 0:
        errors.append("config: tolerance must be finite and non-negative")
        return report
    try:
        info = json.loads((root / "meta/info.json").read_text(encoding="utf-8"))
        if not isinstance(info, dict): raise ValueError("info.json must be an object")
        features = info.get("features")
        if not isinstance(features, dict): raise ValueError("features must be an object")
        if info.get("codebase_version") != "v3.0":
            errors.append("version: this exercise supports codebase_version v3.0 only")
        fps = info.get("fps")
        if not finite(fps) or fps <= 0: raise ValueError("fps must be finite and positive")
        for field in REQUIRED:
            if field not in features: errors.append(f"schema: missing feature {field}")
        for name, spec in features.items():
            if not isinstance(spec, dict): raise ValueError(f"invalid feature specification: {name}")
            if spec.get("dtype") not in ("float32", "float64", "int64", "bool"):
                errors.append(f"unsupported: {name} dtype {spec.get('dtype')}; numeric subset only")
            shape = spec.get("shape")
            if not isinstance(shape, list) or len(shape) != 1 or not integer(shape[0]) or shape[0] == 0:
                errors.append(f"unsupported: {name} needs a positive one-dimensional shape")
            if name in SCALARS and shape != [1]: errors.append(f"schema: {name} must have shape [1]")
        if (TACTILE in features) != (VALID in features):
            errors.append("schema: example tactile values and validity must be declared together")
        if TACTILE in features and VALID in features and features[TACTILE].get("shape") != features[VALID].get("shape"):
            errors.append("schema: tactile values and validity shapes differ")
        if info.get("video_path") is not None:
            errors.append("unsupported: video layout is outside this exercise")
        files = sorted((root / "data").glob("chunk-*/file-*.parquet"))
        ep_files = sorted((root / "meta/episodes").glob("chunk-*/file-*.parquet"))
        if not files or not ep_files: raise ValueError("data and episode Parquet shards are required")
        rows, locations = [], []
        for file in files:
            table = pq.read_table(file)
            for name in set(REQUIRED) | set(features):
                if name not in table.column_names: errors.append(f"fields: {file.relative_to(root).as_posix()} missing {name}")
            chunk_rows = table.to_pylist()
            rows.extend(chunk_rows)
            locations.extend([file.resolve()] * len(chunk_rows))
        episodes = [row for file in ep_files for row in pq.read_table(file).to_pylist()]
        report.update(frames=len(rows), episodes=len(episodes))
        if not rows or not episodes: errors.append("empty: frames and episodes must be non-empty")
        for key, count in (("total_frames", len(rows)), ("total_episodes", len(episodes))):
            if not integer(info.get(key)) or info[key] != count: errors.append(f"counts: {key} does not match files")
        for i, row in enumerate(rows):
            for key in SCALARS[:-1]:
                if not integer(row.get(key)): errors.append(f"values: row {i} {key} must be a non-negative integer")
            if row.get("index") != i: errors.append(f"index: row {i} must have global index {i}")
            if not finite(row.get("timestamp")): errors.append(f"time: row {i} timestamp must be finite")
            for name, spec in features.items():
                if name in SCALARS: continue
                values = row.get(name)
                shape = spec.get("shape", [])
                if not isinstance(values, list) or len(shape) != 1 or len(values) != shape[0]:
                    errors.append(f"dimension: row {i} {name} does not match {shape}")
                    continue
                flags = row.get(VALID)
                for j, value in enumerate(values):
                    if name == TACTILE and isinstance(flags, list) and j < len(flags) and flags[j] is False:
                        report["unknown_tactile_values"] += 1
                        continue  # Unknown stays unknown; never replace it with zero.
                    dtype = spec.get("dtype")
                    good = type(value) is bool if dtype == "bool" else (type(value) is int if dtype == "int64" else finite(value))
                    if not good: errors.append(f"values: row {i} {name}[{j}] invalid or missing")
        cursor = 0
        for number, ep in enumerate(episodes):
            keys = ("episode_index", "length", "dataset_from_index", "dataset_to_index", "data/chunk_index", "data/file_index")
            if not all(integer(ep.get(key)) for key in keys):
                errors.append(f"boundary: episode {number} missing or invalid metadata")
                continue
            start, stop = ep["dataset_from_index"], ep["dataset_to_index"]
            if ep["episode_index"] != number or start != cursor or stop <= start or stop > len(rows) or stop-start != ep["length"]:
                errors.append(f"boundary: episode {number} has a gap, overlap, count or index error")
            cursor = stop
            template = info.get("data_path")
            if not isinstance(template, str): raise ValueError("data_path must be a string")
            linked = (root / template.format(chunk_index=ep["data/chunk_index"], file_index=ep["data/file_index"])).resolve()
            if not linked.is_relative_to(root.resolve()): raise ValueError("data_path escapes dataset root")
            previous = None
            for frame, i in enumerate(range(start, min(stop, len(rows)))):
                row = rows[i]
                if row.get("episode_index") != number or row.get("frame_index") != frame:
                    errors.append(f"boundary: row {i} episode/frame index disagrees with metadata")
                if locations[i] != linked: errors.append(f"path: row {i} does not match episode data shard")
                stamp = row.get("timestamp")
                if finite(stamp):
                    if previous is not None and stamp <= previous: errors.append(f"time: episode {number} timestamp is not strictly increasing at frame {frame}")
                    if abs(stamp - frame/fps) > tolerance: errors.append(f"cadence: episode {number} frame {frame} differs from frame_index/fps")
                    previous = stamp
        if cursor != len(rows): errors.append("boundary: episode metadata does not cover all rows")
    except (OSError, ValueError, TypeError, KeyError, IndexError) as exc:
        errors.append(f"input: {exc}")
    report["ok"] = not errors
    return report


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("dataset", type=Path)
    parser.add_argument("--report", type=Path, required=True)
    parser.add_argument("--tolerance", type=float, default=1e-4, help="seconds, default 0.0001")
    args = parser.parse_args()
    report = validate(args.dataset, args.tolerance)
    # Reports are an explicit output; never overwrite a file inside the input.
    if args.report.resolve().is_relative_to(args.dataset.resolve()):
        parser.error("--report must be outside the dataset directory")
    args.report.parent.mkdir(parents=True, exist_ok=True)
    args.report.write_text(json.dumps(report, indent=2, allow_nan=False) + "\n", encoding="utf-8")
    print(f"{'PASS' if report['ok'] else 'FAIL'} (numeric subset): {report['frames']} frames, {report['episodes']} episodes, {len(report['errors'])} errors, {report['unknown_tactile_values']} unknown tactile values")
    for error in report["errors"]: print(f"- {error}")
    return 0 if report["ok"] else 1


if __name__ == "__main__": sys.exit(main())
