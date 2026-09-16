# Python tactile data processing exercise

A complete, hardware-free CSV exercise by RoboSkin.ai. The source data is an
independently generated teaching sequence, not a sensor capture, physical
simulation, calibrated detector or learning benchmark.

Tutorial: https://roboskin.ai/guides/python-tactile-data-processing
Learning path: https://roboskin.ai/robotics-programming

These URLs are the intended publication routes. This package was prepared for
local review on 2026-09-16; production publication is a separate action.

## Verified environment and run

Windows x64, CPython 3.13.3, Matplotlib 3.10.6, NumPy 2.5.3.
Matplotlib is the one top-level dependency; its transitive dependencies are
recorded in requirements-lock.txt. No ROS, robot, tactile sensor or GPU is needed.

Inside the extracted `python-tactile` directory, run in PowerShell:

```powershell
python -m venv .venv
.venv\Scripts\python.exe -m pip install -r requirements-lock.txt
.venv\Scripts\python.exe process_tactile.py --input synthetic_tactile.csv --output results --threshold 0.6
.venv\Scripts\python.exe -m unittest discover -s . -p "test_*.py" -v
```

POSIX equivalent (Linux/macOS not executed in this validation):

```bash
python3 -m venv .venv
.venv/bin/python -m pip install -r requirements-lock.txt
.venv/bin/python process_tactile.py --input synthetic_tactile.csv --output results --threshold 0.6
.venv/bin/python -m unittest discover -s . -p 'test_*.py' -v
```

Actual output:

```text
frames=12 events=3 unknown_frames=3
wrote processed.csv, frames.csv, contact_events.csv, summary.json, heatmap.png, timeline.png
```

Twelve behavior tests passed. Plotting uses Matplotlib's noninteractive Agg
backend. No desktop window is opened. Running again replaces files of the same
name in the output directory; choose `--output another-run` to retain a run.

## Files

- `process_tactile.py`: full processor, CLI and plots.
- `synthetic_tactile.csv`: 47 rows representing 12 frames of a 2 × 2 array.
- `generate_sample.py`: recreates that independent synthetic fixture.
- `test_process_tactile.py`: validity, missing-data, layout, timestamp and event tests.
- `requirements.txt`: minimum direct dependency.
- `requirements-lock.txt`: exact installed versions used for validation.
- `results/processed.csv`: 48 taxel records with raw and usable values.
- `results/frames.csv`: frame maxima, usable counts, state and gap flags.
- `results/contact_events.csv`: observed event segments and censored boundaries.
- `results/summary.json`: machine-readable totals and chosen parameters.
- `results/heatmap.png` and `results/timeline.png`: actual generated figures.
- `verification.json`: environment and validation scope.
- `LICENSE.txt`: Apache-2.0 code and original documentation license.
- `DATA-LICENSE.txt`: CC0-1.0 dedication for original synthetic data and results.

## Input contract

The header must be exactly:

```text
timestamp_ns,sensor_id,row,column,value,unit,valid
```

`timestamp_ns` is an integer elapsed time in nanoseconds from a synthetic origin,
not Unix time, receipt time or latency. Equal times group taxels into one frame.
Times must be nonnegative and nondecreasing in the file. The gap policy uses
`--max-gap-ms` (150 by default), not an inferred sampling rate.

`sensor_id` identifies one surface per file. `row` and `column` are zero-based
logical coordinates; `--rows` and `--columns` default to 2. Duplicate taxels in a
frame, out-of-bounds coordinates and mixed sensors are rejected.

`value` is a dimensionless signal with `unit=normalized`. A usable value must
be finite and within [0, 1]. This is not force in N or pressure in Pa. `valid`
must be 0 or 1. Even a value marked 1 is checked. Explicitly invalid cells,
blank/nonfinite/out-of-range values and absent taxels remain unknown. Raw text
and the source flag remain in the processed export. Unknown usable values are
blank; they are never replaced with zero.

## Teaching contact events

At least one usable value >= 0.6 establishes `contact`. A completely usable
frame below 0.6 is `clear`. A partial/all-missing frame without a known crossing
is `unknown`. The threshold is configurable with `--threshold`, and is not a
calibrated contact detection algorithm. There is no denoising or hysteresis.

Unknown frames and gaps > 150 ms split observed contact segments. A segment
without a preceding clear frame has `left_censored=True`. A segment ended by
unknown data, a time gap or the file end has `right_censored=True`.
`observed_span_ms` spans first to last observed contact, not physical duration.
`boundary_timestamp_ns` records the following clear/unknown/gap observation;
it is blank at file end. `end_reason` explains that boundary.

In the supplied fixture the segments cover 0.2–0.3 s, 0.5 s and 0.9–1.0 s.
The first two end at unknown frames. The third has a clear observation at 1.1 s.
There are 45 usable taxels, one invalid flag, one absent taxel and one blank
value. Changing the data or parameters can legitimately change these totals.

## Relationship to the ROS 2 starter kit

Source inspected: https://github.com/roboskin-ai/ros2-tactile-starter-kit
Commit: 7bf81d2575e3ef4b62034f4771daf948033b4d76 (Apache-2.0).

Its `sample_data/tactile_frame.csv` is one 2 × 2 frame with three normalized
channels and no event sequence. This exercise therefore supplies independent
single-signal time-series data with explicit units and missing observations.
It reuses the concepts of a taxel grid and validity mask, not the fixture or a
claimed ROS recording. No CSV-to-ROS publisher is provided.

The starter kit's experimental `roboskin_tactile_msgs/msg/TactileArray` uses
channel-major layout: `((channel * rows) + row) * columns + column`. A future
single-signal adapter could use `channels=[signal]`, `units=[normalized]`, and
`valid=0` for unknown cells, with an explicitly agreed numeric placeholder.
The validity mask is per taxel, so multiple channels need an agreed invalidity
policy. Specify clock domain, acquisition timing and geometry before adapting
timestamps to ROS messages. Never relabel elapsed fixture time as a hardware
measurement timestamp or use old replay stamps as live transport latency.

The ROS tutorial describes actual starter-kit commands and its separate
verification boundary: https://roboskin.ai/guides/ros2-tactile-sensing

## Licensing and attribution

Copyright 2026 RoboSkin.ai contributors. Code and original documentation:
Apache-2.0. Original synthetic CSV and generated results: CC0-1.0. Third-party
Python packages retain their own licenses. No research dataset was copied.
