Pinned public LeRobot episode inspection — checked 2026-10-25

Source: https://huggingface.co/datasets/lerobot/koch_pick_place_1_lego
Revision: afc0b3e54679cb8a94283fbab5a4ccf0d405f10b
The dataset card declares Apache-2.0. Its robot_type is unknown. No tactile
channel is declared, and this check does not certify units or hardware identity.

This ZIP contains scripts, a source hash manifest and our reference report.
It does not contain the third-party dataset or video. The downloader retrieves
about 410 MB of unchanged public shards. Only episode 0 is tested; shared shards
also contain other episodes. A fresh environment needs additional package space.

Tested: Windows x64, Python 3.13.3, LeRobot 0.6.1 and CPU PyTorch 2.11.0.
Install uv using https://docs.astral.sh/uv/getting-started/installation/.
PowerShell, from this extracted folder:

uv venv .venv --python 3.13
uv pip install --python .\.venv\Scripts\python.exe --torch-backend cpu -r requirements-windows-py313.lock.txt
.\.venv\Scripts\python.exe download_sample.py
.\.venv\Scripts\python.exe verify_public_sample.py

The downloader uses the pinned public revision, checks byte counts and SHA-256,
and does not send credentials. Existing matching files are reused; mismatches
or unfinished .part files stop the run rather than overwrite evidence.
The verifier uses offline Hub mode and creates verification.json. For another
run use --output verification-second.json. It never uploads, trains or controls
hardware. Other operating systems have not been tested.

Reference scope: all 445 numeric rows in episode 0; 6D state/action exact
agreement with Parquet; two camera streams decoded across the episode; five
complete official-loader samples at frames 0, 111, 222, 333 and 444. A half-frame
offset is rejected by the explicit 0.0001-second matching tolerance.

File timestamp agreement is not measured acquisition latency, physical camera
synchronization, visualizer UI verification or policy training readiness. The
nominal 30 Hz grid may be generated or resampled. No tactile validation, force
calibration, robot experiment or ROS 2 execution is claimed.

The reference report is an observed result, not an expected-output substitute.
Check your own report and preserve failures. Code is Apache-2.0; source data
retains its own license. Dataset authorship remains with the upstream source.
