# Numeric LeRobot v3-style snapshot exercise

Original synthetic teaching data by RoboSkin.ai, 2026-09-16. No hardware data,
physics simulation, model training, or robot commands. This is **not a complete
LeRobot dataset or an official compatibility validator**.

## Run

Extract the ZIP and run these commands in that folder with Windows PowerShell:

```powershell
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\python.exe -B check_dataset.py fixtures/valid --report results/valid-report.json
.\.venv\Scripts\python.exe -B check_dataset.py fixtures/invalid --report results/invalid-report.json
.\.venv\Scripts\python.exe -B -m unittest -v test_validator
```

The invalid command is expected to exit 1; the valid command exits 0. Reports
must be outside the input folder. Input files are not modified. For macOS/Linux
use `python3 -m venv .venv` and `.venv/bin/python` (not locally executed).

Verified: CPython 3.13.3, Windows x64, PyArrow 23.0.1. PyArrow is the only
third-party dependency. No ROS, GPU, LeRobot/PyTorch install or account needed.

## Contents and actual results

- `check_dataset.py`: full checker and CLI.
- `generate_fixtures.py`: reproducible synthetic fixture generator.
- `test_validator.py`: 16 behavior tests.
- `fixtures/valid/` and `fixtures/invalid/`: each contains `meta/info.json`,
  `meta/episodes/chunk-000/file-000.parquet`, `data/chunk-000/file-000.parquet`.
- `example-contract.json`: explicitly custom units, dimensions and semantics.
- `outputs/*-report.json`: actual local outputs; reruns can use `results/`.
- `verification.json`: environment and execution evidence.

The valid fixture has 8 frames, 2 episodes and 1 unknown tactile value. The
invalid fixture has missing action, a shortened state vector, a duplicated
timestamp and an incorrect episode endpoint. It reports 17 diagnostics; a
single root defect can cause multiple messages. No invalid value becomes zero.

## Contract

See `example-contract.json`. Index fields are scalar integers. `timestamp` is
seconds relative to episode start. FPS is 10; every episode has frame indices
0..3 and timestamps 0, 0.1, 0.2, 0.3. `observation.state` is a synthetic 3D
position in metres; `action` is a synthetic 2D displacement in metres, not a
hardware command. Their different dimensions are intentional.

`observation.tactile` contains four arbitrary-unit taxels in 2 x 2 row-major
order. `observation.tactile_valid` is a custom boolean mask. These are example
designs, not universal LeRobot fields. One null is paired with false. Any
false-marked value is treated as unknown, even if a number is stored there;
the checker reports the count without replacing values. A true-marked null
fails. This contract does not establish that an official loader or a policy
will accept null tactile values or consume the mask.

The sample is independent of the site's earlier Python tactile CSV project
and the ROS starter kit. Their schemas and unit contracts differ;
conversion requires an explicit mapping, validity handling and synchronization.

## Scope

Checks include required fields, finite valid numeric values, 1D feature lengths,
global row indices, counts, exclusive episode ends, gaps/overlaps, frame indices,
shard references, strictly increasing timestamps within each episode and
agreement with frame_index / fps (default tolerance 0.0001 s).

The reader loads all data into RAM. It expects a small, complete numeric snapshot
with contiguous indices starting at zero. Unsupported versions, multidimensional
features, image/video declarations and nonnumeric types fail explicitly.

Excluded: task-text mapping, feature statistics/normalization, Arrow dtype
conformance, video codecs/decoding/alignment, physical units or frame correctness,
clock synchronization, original capture jitter, dataset split leakage, official
loader compatibility, policy compatibility and hardware performance. A PASS is
only a pass of the listed subset checks. Fixtures omit tasks, statistics and
videos and have not been loaded with LeRobotDataset.

## Sources and license

Source review: 2026-09-16.

- https://huggingface.co/docs/lerobot/lerobot-dataset-v3
- https://github.com/huggingface/lerobot/tree/89236ea0f4f81a81ca566081e20dd1ff5f823cbe/src/lerobot/datasets

The inspected source specifies v3.0. It uses `meta/tasks.parquet`; the docs'
simplified list still mentions legacy `meta/tasks.jsonl`. Dataset format version
is separate from package version. This project uses no copied LeRobot code.

Original code: Apache-2.0, see LICENSE-CODE.txt. Original generated fixture data
and field contract: CC0-1.0, see LICENSE-DATA.txt. Third-party libraries and
datasets retain their own terms.
