# Robot data and tactile calibration introduction — prepared, not sent

Prepared 2026-09-16 for local review. Production links below must be published
and checked before any future distribution. No email, community post, submission
or external PR was sent, created or modified for this round.

## Short English introduction

**From robot data files to meaningful tactile feedback**

RoboSkin.ai has prepared two engineering guides for developers starting to work
with robot demonstrations and tactile observations.

The LeRobot guide explains v3 episode boundaries, timestamps, metadata and video
shards, then walks through a small downloadable Python checker. You can run it
without a robot, tactile sensor, GPU or ROS installation. It reads synthetic
Parquet fixtures and exports JSON reports: a valid two-episode example passes,
while a deliberately broken example exposes missing fields, a repeated timestamp,
an array-dimension error and inconsistent episode boundaries. The numeric checks
and 16 behavior tests ran in a clean Windows environment with CPython 3.13.3 and
PyArrow 23.0.1. This is a teaching validator for a numeric subset, not a full
official LeRobot compatibility test or a training-ready research dataset.

The calibration guide separates image baselines, depth reconstruction and force
estimation for original DIGIT and GelSight Mini. It links the official materials
and 3D Cal paper, and provides a blank record template for reference measurements,
units, independent repeats and environmental conditions. It is a source-based
workflow, not a new hardware experiment or a sensor accuracy claim.

Both guides connect to a verified synthetic tactile CSV exercise, the site's
robot data collection guide and its dataset directory.

- Learning path: https://roboskin.ai/robotics-programming
- LeRobot guide: https://roboskin.ai/guides/lerobot-dataset-format
- Open Python source, fixtures, tests and reports: https://roboskin.ai/tutorials/lerobot-validation/lerobot-numeric-validation.zip
- Calibration guide: https://roboskin.ai/guides/tactile-sensor-calibration
- Blank recording template: https://roboskin.ai/tutorials/tactile-calibration/calibration-record-template.csv
- Python plots and contact events: https://roboskin.ai/guides/python-tactile-data-processing
- ROS starter kit: https://github.com/roboskin-ai/ros2-tactile-starter-kit

The checker code is Apache-2.0; the original synthetic fixtures and calibration
record template are CC0-1.0. The ROS guide separately identifies source/upstream
build checks and locally unexecuted publishing, recording and replay steps.

## Evidence and existing-contact handling

Actual local preview screenshots are in `.artifacts/engineering-20260916/`,
including `lerobot-1440.png`, `calibration-390.png`, `lerobot-code-390.png` and
`navigation-390.png`. They show the local preview, not deployed production pages.
Actual JSON outputs are in `public/tutorials/lerobot-validation/outputs/`.
No hardware or simulator demonstration footage was created.

Reviewed the earlier local programming introduction and its recorded contact
summary (`2026-09-16-programming-tutorial-draft.md`). Existing directory entries,
pending PRs, the starter-kit Discourse thread and previously contacted newsletters
remain untouched. This round selected no recipients and made no live inbox or
PR-status claims. Before any later authorized outreach, recheck the chosen
recipient's actual record and the production URLs to avoid duplicate contact.
