"""Create independent, hand-designed teaching data. Apache-2.0.

This is not sensor acquisition, a ROS capture, or a physical simulation.
The CSV and generated results are licensed under CC0-1.0 (see DATA-LICENSE.txt).
"""
import csv
from pathlib import Path

with Path(__file__).with_name("synthetic_tactile.csv").open("w", newline="", encoding="utf-8") as handle:
    writer = csv.writer(handle)
    writer.writerow(["timestamp_ns", "sensor_id", "row", "column", "value", "unit", "valid"])
    peaks = [.1, .2, .7, .85, .95, .8, .1, .1, .1, .9, .75, .1]
    for frame, peak in enumerate(peaks):
        for row, column in [(0, 0), (0, 1), (1, 0), (1, 1)]:
            if frame == 6 and (row, column) == (1, 1):
                continue  # Missing observation: the loader restores an unknown cell.
            value = peak if (row, column) == (0, 0) else .1
            if frame == 8 and (row, column) == (0, 1):
                value = ""  # Missing numeric value despite a usable source flag.
            valid = 0 if frame == 4 and (row, column) == (0, 0) else 1
            writer.writerow([frame * 100_000_000, "teaching_surface", row, column, value, "normalized", valid])
