#!/usr/bin/env python3
"""Synthetic tactile CSV exercise. Copyright 2026 RoboSkin.ai. Apache-2.0.

Values are normalized teaching signals, not force/pressure measurements.
Unknown data stays unknown. Event boundaries are observations, not ground truth.
"""
import argparse
import csv
import json
import math
from pathlib import Path

FIELDS = ["timestamp_ns", "sensor_id", "row", "column", "value", "unit", "valid"]


def load_frames(path, rows=2, columns=2):
    """Reject ambiguous layout/time; preserve missing and invalid observations."""
    if rows <= 0 or columns <= 0:
        raise ValueError("rows and columns must be positive")
    frames = []
    sensor_id = None
    last_timestamp = -1
    with Path(path).open(encoding="utf-8-sig", newline="") as handle:
        reader = csv.DictReader(handle)
        if reader.fieldnames != FIELDS:
            raise ValueError("CSV header must be: " + ",".join(FIELDS))
        for line, item in enumerate(reader, 2):
            if None in item or any(value is None for value in item.values()):
                raise ValueError(f"line {line}: wrong number of columns")
            try:
                timestamp = int(item["timestamp_ns"])
                row, column = int(item["row"]), int(item["column"])
            except ValueError as exc:
                raise ValueError(f"line {line}: timestamp and coordinates must be integers") from exc
            if timestamp < 0 or timestamp < last_timestamp:
                raise ValueError(f"line {line}: timestamps must be nonnegative and ordered")
            if not (0 <= row < rows and 0 <= column < columns):
                raise ValueError(f"line {line}: taxel outside declared grid")
            if not item["sensor_id"].strip():
                raise ValueError(f"line {line}: sensor_id is required")
            if sensor_id is None:
                sensor_id = item["sensor_id"]
            if item["sensor_id"] != sensor_id:
                raise ValueError(f"line {line}: this exercise accepts one sensor per file")
            if item["unit"] != "normalized":
                raise ValueError(f"line {line}: this teaching threshold requires unit=normalized")
            if item["valid"] not in ("0", "1"):
                raise ValueError(f"line {line}: valid must be 0 or 1")
            if timestamp != last_timestamp:
                frames.append({"timestamp_ns": timestamp, "sensor_id": sensor_id, "cells": {}})
            cells = frames[-1]["cells"]
            key = (row, column)
            if key in cells:
                raise ValueError(f"line {line}: duplicate timestamp/taxel")
            raw = item["value"].strip()
            try:
                value = float(raw) if raw else None
            except ValueError as exc:
                raise ValueError(f"line {line}: value must be numeric or blank") from exc
            if item["valid"] == "0":
                status = "invalid_flag"
            elif value is None:
                status = "missing_value"
            elif not math.isfinite(value):
                status = "nonfinite_value"
            elif not 0 <= value <= 1:
                status = "out_of_range"
            else:
                status = "usable"
            cells[key] = {"raw_value": raw, "source_valid": item["valid"],
                          "value": value if status == "usable" else None, "status": status}
            last_timestamp = timestamp
    if not frames:
        raise ValueError("CSV must contain at least one observation")
    for frame in frames:
        for row in range(rows):
            for column in range(columns):
                frame["cells"].setdefault((row, column), {
                    "raw_value": "", "source_valid": "", "value": None, "status": "missing_taxel"})
    return frames


def analyze(frames, threshold=0.6, max_gap_ms=150.0):
    """A known high taxel proves threshold contact; incomplete low frames are unknown."""
    if not math.isfinite(threshold) or not 0 < threshold <= 1:
        raise ValueError("threshold must be finite and in (0, 1]")
    if not math.isfinite(max_gap_ms) or max_gap_ms <= 0:
        raise ValueError("max-gap-ms must be finite and positive")
    max_gap_ns = round(max_gap_ms * 1_000_000)
    frame_rows, events, quality = [], [], {}
    active = None
    previous_timestamp = None
    previous_state = "unknown"

    def finish(reason, boundary_timestamp):
        nonlocal active
        if active is not None:
            active["end_reason"] = reason
            active["right_censored"] = reason != "release_observed"
            active["boundary_timestamp_ns"] = boundary_timestamp
            active["observed_span_ms"] = (active["last_contact_ns"] - active["first_contact_ns"]) / 1e6
            events.append(active)
            active = None

    for frame in frames:
        timestamp = frame["timestamp_ns"]
        gap = previous_timestamp is not None and timestamp - previous_timestamp > max_gap_ns
        if gap:
            finish("time_gap", timestamp)
            previous_state = "unknown"
        values = []
        for cell in frame["cells"].values():
            quality[cell["status"]] = quality.get(cell["status"], 0) + 1
            if cell["value"] is not None:
                values.append(cell["value"])
        maximum = max(values) if values else None
        if maximum is not None and maximum >= threshold:
            state = "contact"
        elif len(values) == len(frame["cells"]):
            state = "clear"
        else:
            state = "unknown"
        frame_rows.append({"timestamp_ns": timestamp, "usable_taxels": len(values),
                           "total_taxels": len(frame["cells"]), "max_value": maximum,
                           "contact_state": state, "gap_before": gap})
        if state == "contact":
            if active is None:
                active = {"event_id": len(events) + 1, "first_contact_ns": timestamp,
                          "last_contact_ns": timestamp, "peak_value": maximum,
                          "left_censored": previous_state != "clear"}
            active["last_contact_ns"] = timestamp
            active["peak_value"] = max(active["peak_value"], maximum)
        else:
            finish("release_observed" if state == "clear" else "unknown_frame", timestamp)
        previous_timestamp, previous_state = timestamp, state
    finish("end_of_recording", "")
    summary = {"synthetic": True, "unit": "normalized", "threshold": threshold,
               "max_gap_ms": max_gap_ms, "frames": len(frames), "events": len(events),
               "unknown_frames": sum(row["contact_state"] == "unknown" for row in frame_rows),
               "contact_frames": sum(row["contact_state"] == "contact" for row in frame_rows),
               "quality_counts": quality}
    return frame_rows, events, summary


def write_csv(path, fieldnames, rows):
    with Path(path).open("w", encoding="utf-8", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)


def plot_frames(frames, frame_rows, output, rows, columns, threshold):
    import matplotlib
    matplotlib.use("Agg")
    import matplotlib.pyplot as plt
    import numpy as np  # Installed by Matplotlib; used only to mask unknown plot cells.

    # Show the first incomplete frame so the missing-data policy is visible.
    chosen = next((f for f in frames if any(c["value"] is None for c in f["cells"].values())), frames[0])
    grid = np.full((rows, columns), np.nan)
    for (row, column), cell in chosen["cells"].items():
        if cell["value"] is not None:
            grid[row, column] = cell["value"]
    cmap = plt.get_cmap("viridis").copy()
    cmap.set_bad("#c7c7c7")
    fig, ax = plt.subplots(figsize=(6, 4), layout="constrained")
    heatmap = ax.imshow(np.ma.masked_invalid(grid), vmin=0, vmax=1, cmap=cmap)
    for row in range(rows):
        for column in range(columns):
            value = grid[row, column]
            ax.text(column, row, "unknown" if np.isnan(value) else f"{value:.2f}",
                    ha="center", va="center", color="black" if np.isnan(value) or value > .6 else "white")
    ax.set(xticks=range(columns), yticks=range(rows), xlabel="Column", ylabel="Row",
           title=f"Synthetic array at {chosen['timestamp_ns'] / 1e9:g} s\nGray = unknown, not zero")
    fig.colorbar(heatmap, ax=ax, label="Normalized teaching signal")
    fig.savefig(output / "heatmap.png", dpi=160)
    plt.close(fig)

    times = [(f["timestamp_ns"] - frames[0]["timestamp_ns"]) / 1e9 for f in frames]
    maxima = [f["max_value"] if f["max_value"] is not None else float("nan") for f in frame_rows]
    fig, ax = plt.subplots(figsize=(8, 4), layout="constrained")
    # Points avoid suggesting interpolation across missing observations or time gaps.
    ax.scatter(times, maxima, label="Maximum of usable taxels", color="#2955a3", marker="o")
    for state, color, marker in [("contact", "#c34b20", "s"), ("unknown", "#656565", "x")]:
        selected = [i for i, f in enumerate(frame_rows) if f["contact_state"] == state]
        ax.scatter([times[i] for i in selected], [maxima[i] for i in selected],
                   label=f"Frame state: {state}", color=color, marker=marker, s=65)
    ax.axhline(threshold, color="#c34b20", linestyle="--", label=f"Teaching threshold: {threshold:g}")
    ax.set(xlabel="Synthetic elapsed time (s)", ylabel="Normalized teaching signal", ylim=(-.05, 1.05),
           title="Synthetic contact exercise — unknown is not clear")
    ax.legend(loc="upper center", bbox_to_anchor=(0.5, -0.18), ncol=2, fontsize=8)
    fig.savefig(output / "timeline.png", dpi=160)
    plt.close(fig)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--input", type=Path, default=Path(__file__).with_name("synthetic_tactile.csv"))
    parser.add_argument("--output", type=Path, default=Path("results"))
    parser.add_argument("--rows", type=int, default=2)
    parser.add_argument("--columns", type=int, default=2)
    parser.add_argument("--threshold", type=float, default=0.6)
    parser.add_argument("--max-gap-ms", type=float, default=150.0)
    args = parser.parse_args()
    try:
        frames = load_frames(args.input, args.rows, args.columns)
        frame_rows, events, summary = analyze(frames, args.threshold, args.max_gap_ms)
    except (ValueError, OSError) as exc:
        parser.exit(2, f"Input error: {exc}\n")
    args.output.mkdir(parents=True, exist_ok=True)
    processed = []
    for frame in frames:
        for (row, column), cell in sorted(frame["cells"].items()):
            processed.append({"timestamp_ns": frame["timestamp_ns"], "sensor_id": frame["sensor_id"],
                              "row": row, "column": column, "raw_value": cell["raw_value"],
                              "source_valid": cell["source_valid"], "usable_value": cell["value"],
                              "unit": "normalized", "status": cell["status"]})
    write_csv(args.output / "processed.csv", list(processed[0]), processed)
    write_csv(args.output / "frames.csv", list(frame_rows[0]), frame_rows)
    write_csv(args.output / "contact_events.csv", ["event_id", "first_contact_ns", "last_contact_ns",
              "peak_value", "left_censored", "end_reason", "right_censored", "boundary_timestamp_ns",
              "observed_span_ms"], events)
    (args.output / "summary.json").write_text(json.dumps(summary, indent=2) + "\n", encoding="utf-8")
    plot_frames(frames, frame_rows, args.output, args.rows, args.columns, args.threshold)
    print(f"frames={summary['frames']} events={summary['events']} unknown_frames={summary['unknown_frames']}")
    print("wrote processed.csv, frames.csv, contact_events.csv, summary.json, heatmap.png, timeline.png")


if __name__ == "__main__":
    main()
