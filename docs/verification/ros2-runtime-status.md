# ROS 2 runtime verification status — 2026-09-16

The executable harness is `scripts/verify-ros2-runtime.py`. The prepared GitHub
Actions workflow is stored here as `ros2-tutorial-workflow.yml`; it is not an
active workflow. It uses `osrf/ros:lyrical-desktop` and pins starter-kit commit
`7bf81d2575e3ef4b62034f4771daf948033b4d76`.

The current local machine has no Docker or installed WSL distribution. A push
containing the workflow under `.github/workflows/` was rejected by GitHub because
the current OAuth login lacks the `workflow` scope. That workflow was moved to
this documentation folder so the unrelated website improvements can be pushed.
No ROS runtime success is claimed. The website retains the source/build-only
verification statement.

Once the workflow permission is available, place the prepared YAML at
`.github/workflows/verify-ros2-tutorial.yml` and run it on the release branch.
It builds the actual pinned kit, launches only its synthetic demo, validates
shape/units/validity, records messages, stops live publishing, and checks replayed
payloads and header stamps against the recording. It captures logs, a real message,
bag metadata and a JSON report. It does not control hardware or measure physical
acquisition rate, calibration accuracy or sensor-to-action latency.

Only after a successful run and review of the uploaded artifact should the ROS
tutorial's verification statement and output examples change. Container runtime
verification would still not establish bare-host installation or sensor support.
