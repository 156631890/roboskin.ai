# Official LeRobot numeric writer/loader exercise

Verified on 2026-09-16 with Windows x64, CPython 3.13.3, uv 0.9.28,
LeRobot 0.6.1, PyTorch 2.11.0+cpu, datasets 4.8.5, PyArrow 25.0.1 and
NumPy 2.2.6. The generated dataset format is v3.0; package and format
versions are different identifiers.

This optional exercise has larger dependencies than the separate PyArrow-only
numeric checker. It creates a new synthetic dataset with the official writer,
calls `finalize()`, then reads every frame using the official local loader.
No hardware, GPU, account, Hub upload or policy is required. Hub access is
disabled inside the script. It does not load the limited fixtures from the
separate numeric checker.

Install uv using its official instructions at https://docs.astral.sh/uv/getting-started/installation/.
From this extracted folder, run these verified Windows PowerShell commands:

```powershell
uv venv .venv --python 3.13
uv pip install --python .\.venv\Scripts\python.exe --torch-backend cpu -r requirements-windows-py313.lock.txt
.\.venv\Scripts\python.exe verify_loader.py --output results
```

Choose a fresh `--output` directory for each run. The script refuses to
overwrite existing results. The lock file records the tested Windows/Python
environment; other platforms and versions have not been tested here.
`requirements.txt` states the direct dependency, while the lock file also
fixes the resolved transitive versions and CPU wheels.

Actual output from the verification run:

```text
PASS: LeRobot 0.6.1 wrote and loaded 8 numeric frames in 2 episodes (v3.0).
```

The output directory contains `dataset/data/`, `dataset/meta/`, and
`verification.json`. The supplied `outputs/` folder contains the real generated
data and report. A second clean environment using the lock file produced the
same verification report.

Checked behavior:

- Official writer rejects a missing `action` field and a state vector with
  the wrong shape, before recording the valid examples.
- Two episodes of four frames each; episode/frame/global indices agree.
- Timestamps reset per episode and follow the writer's generated 10 Hz grid.
- State/action vectors have shape (2,), tactile vectors shape (4,); values
  survive the numeric round trip exactly.
- Metadata totals, shapes and format identifier match the stored samples.

All numbers are synthetic arbitrary values. `observation.tactile` is an
example custom feature, not physical pressure or force and not a promise that
any LeRobot policy accepts tactile inputs. All four values are present in this
example; it does not demonstrate missing-value handling. The separate numeric
checker covers missing values and validity masks. Timestamp spacing is generated
by software, not a measured acquisition rate or latency.

Video encoding/decoding, image alignment, policy training, real robot data,
hardware calibration and full format compatibility certification were not tested.
The script runs the installed Apache-2.0 LeRobot package; it does not vendor its
implementation. This script is Apache-2.0 (`LICENSE-CODE.txt`); the independent
synthetic data and generated report are CC0-1.0 (`LICENSE-DATA.txt`).
