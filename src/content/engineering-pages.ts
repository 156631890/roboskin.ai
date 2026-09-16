import type { ProgrammingPage } from '@/content/programming-pages';

const checked = '2026-09-16';
const lr = '/tutorials/lerobot-validation';
const cal = '/tutorials/tactile-calibration';
const overview = { label: 'Robotics programming learning path', href: '/robotics-programming', description: 'Choose a data or tactile-feedback starting point.' };
const datasets = { label: 'Find robot and tactile datasets', href: '/datasets', description: 'Compare fields, access conditions and original dataset licenses.' };
const teleop = { label: 'Robot data collection and teleoperation', href: '/robot-teleoperation', description: 'Plan demonstrations, synchronization and quality review before export.' };
const python = { label: 'Process tactile CSV data with Python', href: '/guides/python-tactile-data-processing', description: 'Generate heatmaps and teaching contact events without hardware.' };
const ros = { label: 'ROS 2 tactile messages and replay', href: '/guides/ros2-tactile-sensing', description: 'Follow a source-checked message workflow with explicit runtime limits.' };
const lerobotSource = 'https://github.com/huggingface/lerobot/blob/89236ea0f4f81a81ca566081e20dd1ff5f823cbe/src/lerobot/datasets';

export const lerobotTutorial: ProgrammingPage = {
  path: '/guides/lerobot-dataset-format',
  title: 'LeRobot Dataset Format Explained: Episodes, Timestamps and Validation',
  h1: 'LeRobot Dataset Format Explained: Episodes, Timestamps and Validation',
  description: 'Understand LeRobot dataset v3 metadata, Parquet, video and episode timing. Run a small Python checker on synthetic numeric data and inspect its limits.',
  kicker: 'Robot data tutorial', intent: 'Understand the LeRobot dataset format and run bounded robot dataset validation before training.',
  published: checked, updated: checked, priority: 0.8, changeFrequency: 'monthly', schemaType: 'TechArticle', visualKey: 'resources',
  keywords: ['lerobot dataset format', 'lerobot dataset v3', 'robot dataset validation'],
  verification: 'Checked on September 16, 2026. The PyArrow-only numeric checker passed 16 behavior tests on Windows x64. A separate LeRobot 0.6.1 exercise also wrote and loaded 8 numeric frames across 2 episodes through the official writer and loader, and rejected missing action and wrong-shape inputs. Neither exercise tests video decoding, policy training, real hardware or complete format compatibility.',
  quickAnswer: ['LeRobot dataset v3.0 separates storage files from episodes: multiple episodes can share Parquet and MP4 shards, while metadata identifies each episode and its offsets. A filename is not an episode boundary.', 'Start by checking what each observation and action means, then check shapes, timestamps and episode coverage. Passing a numeric check does not establish that a policy can use the data.'],
  sections: [
    { id: 'version', heading: 'Which version does this guide describe?', body: [
      'This guide describes the v3.0 dataset format. That format identifier is separate from the LeRobot Python package version. The official main-branch documentation and source were checked on September 16, 2026; the inspected source commit is 89236ea0f4f81a81ca566081e20dd1ff5f823cbe and its CODEBASE_VERSION is v3.0.',
      'The documentation still contains older installation and migration language. Its simplified layout lists meta/tasks.jsonl, whereas the inspected implementation uses meta/tasks.parquet and names tasks.jsonl as a legacy path. Use the metadata and code revision belonging to your dataset; do not mix v2.1 per-episode filenames with v3 shard offsets. The exercise below needs PyArrow only and does not install LeRobot.',
    ], links: [{ label: 'Official LeRobotDataset v3.0 guide', href: 'https://huggingface.co/docs/lerobot/lerobot-dataset-v3' }, { label: 'Inspected path constants and legacy names', href: `${lerobotSource}/utils.py` }, { label: 'Inspected version and episode metadata', href: `${lerobotSource}/dataset_metadata.py` }] },
    { id: 'layout', heading: 'Read the storage layout before a training sample', body: [
      'The layout below is a simplified map of a v3 dataset with video, not the contents of our deliberately smaller fixture. A shard may hold several episodes. Camera streams use their own files, and an episode is reconstructed through metadata rather than by pairing similarly named files.',
    ], code: [{ label: 'Typical v3 paths — not a download manifest', language: 'text', value: `meta/info.json
meta/stats.json
meta/tasks.parquet
meta/episodes/chunk-000/file-000.parquet
data/chunk-000/file-000.parquet
videos/observation.images.front/chunk-000/file-000.mp4` }], table: { headers: ['Component', 'What it describes', 'What to inspect'], rows: [
      ['meta/info.json', 'Format version, FPS, feature names, shapes, dtypes and path templates.', 'Read features and data_path/video_path before assuming a vector order or camera layout.'],
      ['meta/stats.json', 'Feature statistics used by normalization pipelines.', 'Check the population and split used to compute them; statistics are outside this checker.'],
      ['meta/tasks.parquet', 'Task text and task identifiers in the inspected implementation.', 'A numeric task_index alone does not explain the instruction. Task-text mapping is outside this exercise.'],
      ['meta/episodes/', 'Episode length, global row boundaries and shard references; video-related offsets when present.', 'dataset_from_index is inclusive; dataset_to_index is exclusive. Do not infer boundaries from filenames.'],
      ['data/', 'Per-frame state, action, timestamp and index columns in Parquet.', 'Match each vector to its feature specification and each row to the episode table.'],
      ['videos/', 'Encoded camera streams, potentially shared by several episodes.', 'Use camera-specific metadata and timestamps; decoding and frame alignment require separate tests.'],
    ] } },
    { id: 'fields', heading: 'State, action and time are different contracts', body: [
      'observation.state records the observed robot state. action describes the target used by a particular controller or policy. They can have different dimensions and units. The format alone cannot tell you whether an action is a joint target, pose delta or another command. Record coordinate frames, dimension order and normalization alongside the dataset.',
      'The inspected writer generates frame_index within each episode and timestamp = frame_index / fps. timestamp is therefore an episode-relative time in seconds in this workflow; it resets between episodes. It is not a UNIX timestamp, a sensor capture timestamp or a measured end-to-end delay. Preserve capture and receive clocks separately when collecting real streams, document how they are aligned, and retain alignment residuals before resampling.',
    ], table: { headers: ['Fixture field', 'Meaning', 'Unit or validity'], rows: [
      ['index / episode_index / frame_index / task_index', 'Global row / episode / row within episode / task identifier.', 'Non-negative integers; task text is not supplied in this numeric subset.'],
      ['timestamp', 'frame_index / 10 in two separate four-frame episodes.', 'Seconds; 0, 0.1, 0.2, 0.3 within each episode.'],
      ['observation.state [3]', 'Synthetic x, y, z position.', 'Metres in an invented demonstration frame; not measured robot state.'],
      ['action [2]', 'Synthetic dx, dy values for inspecting a two-dimensional vector.', 'Metres; illustrative data only, never sent to a robot.'],
      ['observation.tactile [4]', 'Four independently designed teaching taxels in row-major 2 × 2 order.', 'Arbitrary units, not newtons or pressure; an invalid sample remains unknown.'],
      ['observation.tactile_valid [4]', 'Boolean validity for the four custom tactile values.', 'One false flag accompanies a null; a null marked true is an error.'],
    ] }, links: [{ label: 'Source: writer-generated frame indices and timestamps', href: `${lerobotSource}/dataset_writer.py` }, teleop] },
    { id: 'download', heading: 'Download the complete numeric exercise', body: [
      'The ZIP includes check_dataset.py, generate_fixtures.py, test_validator.py, requirements.txt, two tiny Parquet fixtures, an example field contract and the reports produced in our run. All data is independently generated synthetic data. It does not reuse robot demonstrations or represent a physical tactile sensor.',
      'This is intentionally not a complete loadable LeRobot dataset: the fixtures omit task-text metadata, statistics, images and videos. The checker validates a small numeric snapshot using v3 field and boundary conventions. Use it to learn failure modes or adapt the checks to an export; use the official loader and your policy pipeline for subsequent compatibility checks.',
      'The only third-party dependency is pyarrow==23.0.1. The recorded environment is CPython 3.13.3 on Windows x64. No robot, tactile sensor, GPU, ROS installation, Hugging Face account or model download is required. Code is Apache-2.0; generated fixtures and example contracts are CC0-1.0. Third-party datasets keep their own licenses.',
    ], links: [
      { label: 'Download Python checker, synthetic fixtures and reports (ZIP)', href: `${lr}/lerobot-numeric-validation.zip`, download: true },
      { label: 'Download check_dataset.py', href: `${lr}/check_dataset.py`, download: true },
      { label: 'Read the field contract and limitations', href: `${lr}/README.md`, download: true },
      { label: 'Download example-contract.json', href: `${lr}/example-contract.json`, download: true },
    ] },
    { id: 'run', heading: 'Run the checker and inspect both outcomes', body: [
      'Extract the ZIP into a fresh directory and open a terminal there. The commands read the included fixtures and write JSON reports to a separate results directory. The invalid run intentionally exits with code 1; this is the expected failure demonstration. A passing run exits with code 0.',
      'PowerShell commands below use the virtual environment directly, so activation and execution-policy changes are unnecessary. On macOS or Linux, use the second block; that command variant has not been executed in this Windows verification environment.',
    ], code: [
      { label: 'Windows PowerShell — run from the extracted folder', language: 'powershell', value: String.raw`python -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\python.exe -B check_dataset.py fixtures/valid --report results/valid-report.json
.\.venv\Scripts\python.exe -B check_dataset.py fixtures/invalid --report results/invalid-report.json
.\.venv\Scripts\python.exe -B -m unittest -v test_validator` },
      { label: 'macOS / Linux command variant — not locally executed', language: 'bash', value: `python3 -m venv .venv
.venv/bin/python -m pip install -r requirements.txt
.venv/bin/python -B check_dataset.py fixtures/valid --report results/valid-report.json
.venv/bin/python -B check_dataset.py fixtures/invalid --report results/invalid-report.json
.venv/bin/python -B -m unittest -v test_validator` },
      { label: 'Actual local output — first line of each run', language: 'text', value: 'PASS (numeric subset): 8 frames, 2 episodes, 0 errors, 1 unknown tactile values\nFAIL (numeric subset): 8 frames, 2 episodes, 17 errors, 1 unknown tactile values' },
    ], links: [{ label: 'Inspect the actual passing JSON report', href: `${lr}/outputs/valid-report.json`, download: true }, { label: 'Inspect the actual failing JSON report', href: `${lr}/outputs/invalid-report.json`, download: true }, { label: 'Environment and test evidence', href: `${lr}/verification.json`, download: true }] },
    { id: 'checks', heading: 'What the checks catch, and what a pass leaves open', body: [
      'The valid fixture has eight frames across two episodes in one data shard. One tactile value is explicitly unknown and is not replaced with zero. The invalid fixture removes action, shortens one state vector, repeats a timestamp and corrupts an episode endpoint. Some faults cause several diagnostics, so the error count is not a count of independent defects.',
      'The default time tolerance is 0.0001 seconds against frame_index/fps. This is an exercise consistency tolerance, not a synchronization guarantee for real sensors. The checker loads all rows into memory, expects a complete contiguous snapshot starting at index and episode zero, and accepts one-dimensional numeric/boolean features only. It is not a streaming validator for a large production corpus.',
    ], table: { headers: ['Check', 'Detected failure', 'Limit'], rows: [
      ['Required fields and finite values', 'Missing action/state fields, null valid measurements, NaN and invalid index values.', 'Does not certify Arrow dtype conformance or measurement accuracy.'],
      ['Feature dimensions', 'Vector lengths that disagree with features in info.json.', 'Cannot determine whether a joint order or coordinate frame is physically correct.'],
      ['Episode-relative timing', 'Duplicate/backward times or disagreement with the declared fixed-rate grid.', 'Cannot measure original capture jitter, clock offsets or sensor latency from resampled rows.'],
      ['Episode boundaries and shard references', 'Gaps, overlaps, inconsistent lengths, unmatched frame/episode IDs and incomplete row coverage.', 'Requires a complete small snapshot, not an arbitrary episode selection.'],
      ['Explicit unsupported inputs', 'Video layout and nonnumeric or multidimensional feature declarations.', 'No video decoding, task-text mapping, statistics, train/test leakage or policy compatibility validation.'],
    ] } },
    { id: 'tactile-extension', heading: 'Add tactile fields only with an explicit consumer', body: [
      'observation.tactile and observation.tactile_valid are RoboSkin example field designs. They are not a universal LeRobot tactile schema, and a policy does not gain tactile support merely because these columns exist. A policy adapter must deliberately consume the representation, validity mask, timing and normalization; its training and evaluation must include that modality.',
      'Our earlier CSV exercise uses separate time, unit and validity fields. It is an independent synthetic exercise with normalized values and its own schema, not a direct export of this arbitrary-unit fixture. To convert real logs, first segment episodes, choose a reference time axis, preserve capture/receive clock provenance, align observations to actions and document exclusions. ROS messages and bags provide transport and recording; they do not define the learning dataset or calibrate its values.',
    ], links: [python, ros, { label: 'Check calibration before interpreting tactile values', href: '/guides/tactile-sensor-calibration' }, { label: 'Check VLA model input and data requirements', href: '/robot-vla-models' }] },
    { id: 'official-loader', heading: 'Optional: run the official numeric writer and loader', body: [
      'This second exercise uses LeRobot 0.6.1 to create, finalize and reload a local dataset in format v3.0. It generates its own complete numeric example; the limited PyArrow fixtures above are not presented as official-loader-ready exports. No Hub account, upload, GPU or robot is required. The script disables Hub access.',
      'On Windows x64 with CPython 3.13.3 and uv 0.9.28, we checked 2 episodes, 8 frames, metadata totals, episode/frame/global indices, per-episode timestamps and the exact state, action and tactile arrays. Before the valid write, the official writer rejected a missing action and a wrong-shaped state vector. A second clean environment produced the same report using the supplied dependency lock.',
      'This optional environment is substantially larger than the PyArrow-only checker: it installs the official package and CPU PyTorch dependencies. Tested versions are LeRobot 0.6.1, PyTorch 2.11.0+cpu, datasets 4.8.5, PyArrow 25.0.1 and NumPy 2.2.6. Video encoding/decoding, task-policy compatibility and training remain untested. The custom observation.tactile vector contains four synthetic normalized arbitrary values, with no implied policy support or physical unit.',
    ], links: [
      { label: 'Download the official-loader exercise, generated data and report (ZIP)', href: '/tutorials/lerobot-loader/lerobot-official-loader.zip', download: true },
      { label: 'Read the complete loader verification script', href: '/tutorials/lerobot-loader/verify_loader.py', download: true },
      { label: 'Inspect the actual loader verification report', href: '/tutorials/lerobot-loader/outputs/verification.json', download: true },
      { label: 'Read dependencies, field meanings and licenses', href: '/tutorials/lerobot-loader/README.md', download: true },
      { label: 'Official uv installation instructions', href: 'https://docs.astral.sh/uv/getting-started/installation/' },
      { label: 'LeRobot 0.6.1 package and dependency metadata', href: 'https://pypi.org/project/lerobot/0.6.1/' },
    ], code: [
      { label: 'Windows PowerShell — from the extracted official-loader folder, with uv installed', language: 'powershell', value: 'uv venv .venv --python 3.13\nuv pip install --python .\\.venv\\Scripts\\python.exe --torch-backend cpu -r requirements-windows-py313.lock.txt\n.\\.venv\\Scripts\\python.exe verify_loader.py --output results' },
      { label: 'Actual official-loader result', language: 'text', value: 'PASS: LeRobot 0.6.1 wrote and loaded 8 numeric frames in 2 episodes (v3.0).' },
    ] },
    { id: 'troubleshooting', heading: 'Resolve common validation failures', body: [
      'A missing field usually means the export mapping or shard selection is wrong. Compare the actual Parquet columns with info.json; do not add fabricated zero vectors to make a check pass. A timestamp failure may be an episode segmentation error, a duplicated row or a mismatch between declared FPS and the export grid. Preserve the raw log while correcting the export.',
      'Boundary failures require comparing inclusive starts and exclusive ends with the actual global row indices. Do not treat each shard as one episode. Dimension failures require checking the feature definition and controller mapping before padding or truncating vectors.',
      'An unreadable Parquet file can be an incomplete download or a writer that was not closed. The official v3 guide calls for dataset.finalize() before upload to flush buffered metadata and close writers. The optional official-loader exercise above runs finalize(); the lightweight PyArrow checker does not use that API.',
    ] },
  ],
  faqs: [
    { question: 'Is this a complete LeRobot v3 validator?', answer: 'No. It checks a documented numeric subset. A passing report does not certify official loader compatibility, video alignment, task metadata, statistics, training readiness or real-world validity.' },
    { question: 'Why can the timestamp go back to zero?', answer: 'In the inspected writer, time is frame_index divided by FPS within each episode. An episode reset is expected; a repeated or decreasing timestamp inside the same episode is not.' },
    { question: 'Can every LeRobot policy train with these tactile fields?', answer: 'No. The tactile columns and validity mask are example designs. A matching policy data adapter, representation, training procedure and evaluation are required.' },
  ],
  relatedLinks: [overview, datasets, teleop, python],
  sources: [
    { label: 'Official LeRobotDataset v3.0 documentation — checked 2026-09-16', href: 'https://huggingface.co/docs/lerobot/lerobot-dataset-v3' },
    { label: 'Pinned LeRobot source: dataset metadata and version', href: `${lerobotSource}/dataset_metadata.py` },
    { label: 'Pinned LeRobot source: storage paths', href: `${lerobotSource}/utils.py` },
    { label: 'Pinned LeRobot source: writer timing and finalization', href: `${lerobotSource}/dataset_writer.py` },
  ],
};

export const calibrationTutorial: ProgrammingPage = {
  path: '/guides/tactile-sensor-calibration',
  title: 'Tactile Sensor Calibration: DIGIT and GelSight Mini Workflows',
  h1: 'Tactile Sensor Calibration: DIGIT and GelSight Mini Workflows',
  description: 'Plan DIGIT and GelSight Mini calibration: separate image baselines, depth reconstruction and force estimation, then record references, repeats and uncertainty.',
  kicker: 'Tactile engineering guide', intent: 'Choose and document an appropriate tactile sensor calibration workflow without conflating image, depth and force.',
  published: checked, updated: checked, priority: 0.8, changeFrequency: 'monthly', schemaType: 'TechArticle', visualKey: 'resources',
  keywords: ['tactile sensor calibration', 'DIGIT calibration', 'GelSight Mini calibration', 'robotic tactile sensing'],
  verification: 'Official sensor materials, source READMEs and the 3D Cal paper were checked on September 16, 2026. This is a source-based workflow and a blank recording template. RoboSkin has not run DIGIT, GelSight Mini, a calibration rig, TouchNet training or a force experiment for this guide. No measured accuracy or hardware compatibility is claimed.',
  quickAnswer: ['Tactile sensor calibration starts with a target quantity. A stable reference image supports image comparison; geometry calibration supports depth reconstruction; force estimation needs force reference measurements and its own validation.', 'DIGIT and GelSight Mini are vision-based tactile sensors. Their camera images and depth demonstrations should not be relabeled as calibrated newtons or pressure.'],
  sections: [
    { id: 'targets', heading: 'Choose one calibration target at a time', body: ['In robotic tactile sensing, calibration links a sensor output to a defined reference under stated conditions. Decide the target, unit, coordinate frame and operating range before collecting examples. A model can be useful for geometry without being a force sensor.'], table: { headers: ['Target', 'Reference and procedure', 'What it does not establish'], rows: [
      ['Image baseline', 'Record repeated no-contact frames at fixed illumination, exposure, focus, crop and resolution. Characterize drift and noise.', 'RGB differences alone do not identify depth in millimetres or force in newtons.'],
      ['Geometry / depth', 'Use known probe geometry and controlled displacement/position labels; fit or assess an image-to-gradient/depth mapping.', 'Depth reconstruction is not a calibrated normal/shear force model.'],
      ['Force estimation', 'Collect synchronized, independently measured normal/shear loads with a suitable load cell or force/torque reference across relevant contact conditions.', 'A depth model, gel stiffness assumption or uncalibrated motor current does not supply this reference.'],
    ] } },
    { id: 'source-scope', heading: 'What the DIGIT and GelSight Mini sources support', body: [
      'The original DIGIT interface documents connecting by serial number, reading camera frames and selecting supported stream settings. The reviewed README specifies a default VGA 640 × 480 stream at 30 fps. Those defaults describe the interface, not a per-device calibration certificate. This guide concerns original DIGIT, not DIGIT 360 or other later sensors.',
      'GelSight Mini’s official gsrobotics examples cover live image viewing, recording, marker tracking, depth estimation and point clouds. Pixel-to-millimetre conversion depends on the documented model and image resolution; do not transfer a constant to a different crop, lens, gel or reconstruction. Marker displacement is a useful observation but is not force in newtons without a corresponding reference calibration.',
      'The 3D Cal paper (arXiv:2511.03078v1) demonstrates automated probing of DIGIT and GelSight Mini with a repurposed FDM printer. TouchNet predicts surface gradients, which are integrated into depth maps. The paper explicitly describes force-sensor integration for normal and shear targets as future work. Its reconstruction results are the authors’ experiments; no numbers here are a RoboSkin reproduction.',
    ], links: [
      { label: 'Original DIGIT official sensor page', href: 'https://digit.ml/digit.html' },
      { label: 'DIGIT interface README at the inspected commit', href: 'https://github.com/facebookresearch/digit-interface/tree/87a28bbf2beee8008a5308e9a12d72e1bc4fefb9' },
      { label: 'GelSight Mini official product and developer entry', href: 'https://www.gelsightmini.com/' },
      { label: 'Official gsrobotics examples at the inspected commit', href: 'https://github.com/gelsightinc/gsrobotics/tree/321d6a22da64529138ff10237335038fd8c5189f' },
      { label: '3D Cal paper: collection, reconstruction and limits', href: 'https://arxiv.org/html/2511.03078v1' },
    ] },
    { id: 'prepare', heading: 'Prepare the sensor, reference and record', body: [
      'For either sensor, record model, serial number, gel identity/condition, mount, camera settings, software revision and an unmodified raw image stream. Use a repeatable mount and confirm the field of view. Save a new baseline after changes to gel, optics, illumination, exposure or geometry. Retain the previous calibration instead of silently overwriting it.',
      'For depth work, prepare an independently characterized probe and positioning reference, define the sensor coordinate system and retain uncertainties in probe size, alignment and displacement. A commanded printer position is not automatically the true indentation depth. The 3D Cal authors used a spherical probe and a purpose-built mount; reproduce only a workflow appropriate to your actual equipment and device limits.',
      'For force work, add a reference transducer with a known range, unit and calibration record. Define axis signs, normal/shear components, loading and unloading directions, dwell times and synchronization. No force procedure can be completed from the supplied blank template alone.',
    ] },
    { id: 'digit-workflow', heading: 'DIGIT workflow: baseline first, then a geometry model', body: [
      '1. Identify the original DIGIT by serial number and inspect the raw stream using its official interface. Record the chosen resolution/FPS and available illumination/exposure controls. Fix configurable image settings for the run; if a control is unavailable or automatic, record that limitation.',
      '2. With no contact, capture a short sequence after the image stabilizes. Save the baseline images and summarize per-channel mean, temporal variation and saturated pixels in a defined region. Choose an acceptance threshold from the intended task; this guide supplies no universal noise threshold.',
      '3. For geometry calibration, collect contacts at a planned spread of surface locations and reference indentations with a known probe. Include independent repeated load/unload cycles and baseline checks between groups. Record reference uncertainty, probe placement and invalid captures. Do not count adjacent video frames as independent experimental repeats.',
      '4. Fit or fine-tune an appropriate reconstruction using the selected source workflow, holding out locations and contact sessions. Compare reconstructed depth against independently defined geometry on held-out contacts and objects. Keep the original images, reference labels and model revision together; no training command or device movement is executed by this guide.',
    ], links: [{ label: 'DIGIT interface and evidence boundaries', href: '/sensors/digit' }, { label: '3D Cal author project and software entry', href: 'https://rohankotanu.github.io/3DCal/' }] },
    { id: 'mini-workflow', heading: 'GelSight Mini workflow: record the gel and reconstruction settings', body: [
      '1. Identify the Mini, gel type and whether the surface carries markers. Confirm image capture with the official live-view example before assessing depth. Record the raw resolution, processing resolution, crop and any marker-removal settings.',
      '2. Capture stable no-contact references in the same configuration used for contacts. Inspect uneven illumination, saturation, contamination and gel damage. Baseline adjustment can improve image consistency; it does not validate a metric reconstruction.',
      '3. Use the official depth/point-cloud example to inspect the reconstruction interface, then evaluate with a known geometry and independently defined spatial scale. The demo is a starting point for verification. If using 3D Cal, keep its sensor-specific acquisition, training and hold-out records rather than assuming a downloaded model transfers unchanged to your Mini.',
      '4. For marker gels, retain marker positions and tracking failures as separate signals. If a task needs force, acquire synchronized reference load data and evaluate a separate force model. A marker motion plot or a plausible point cloud is not evidence of force accuracy.',
    ], links: [{ label: 'GelSight Mini software, gel and evidence details', href: '/sensors/gelsight-mini' }] },
    { id: 'template', heading: 'Download a calibration record template', body: [
      'Use one row per reference comparison at a contact location, repeat and loading phase. A header-only CSV is provided so no placeholder values can be mistaken for measurements. The accompanying field dictionary groups identification, units, references, repeated trials, environment, clocks and evidence paths. Both files are CC0-1.0.',
      'Record a reference value and uncertainty with its unit; an estimate and its unit; planned repeat count and actual repeat index; temperature, humidity, gel condition and camera settings. Preserve sample and receive timestamps with their clock domains and a synchronization method. Leave unavailable measurements blank with an explanation; do not fill missing references with zero.',
      'Set evidence_type to hardware_measurement, synthetic_demo or source_note. Keep these in separate runs and reports. This download contains no synthetic or hardware measurements; the Python and LeRobot exercises elsewhere use explicitly synthetic data and cannot establish a device calibration.',
    ], links: [
      { label: 'Download blank calibration-record-template.csv', href: `${cal}/calibration-record-template.csv`, download: true },
      { label: 'Download field dictionary and recording instructions', href: `${cal}/README.md`, download: true },
      { label: 'Download CC0 data/template license', href: `${cal}/LICENSE-DATA.txt`, download: true },
    ] },
    { id: 'evaluate', heading: 'Evaluate error, repeatability and drift', body: [
      'Use held-out contacts and sessions. For each valid matched reference, calculate residual = estimate − reference in the same unit and coordinate convention. Report bias (mean residual), MAE (mean absolute residual) and RMSE (square root of mean squared residual), with sample counts, invalid counts and reference uncertainty. Do not pool millimetres, newtons and pixels into one error metric.',
      'For depth maps, report the evaluated region, alignment method and masking rules; separate contact and non-contact regions so a large flat background cannot hide contact errors. Examine spatial error across the sensing surface and performance on held-out geometries. For forces, report normal and shear axes separately, plus load-range coverage, hysteresis and held-out sessions.',
      'Repeatability requires independent contacts at matched conditions. Compare repeated load/unload cycles and baseline measurements across time, temperature and gel condition. Report drift and failed measurements. Pick acceptance criteria for the application before testing; no sensor accuracy, threshold or minimum sample count is established by this guide.',
    ] },
    { id: 'troubleshooting', heading: 'Common calibration failures', body: ['Keep acquisition faults separate from reconstruction and reference faults. Check the simplest observable layer first.'], table: { headers: ['Symptom', 'Inspect first', 'Useful next action'], rows: [
      ['Baseline changes with no contact', 'Exposure, illumination, warm-up, mount and gel condition.', 'Retain before/after baselines; stabilize or record configuration changes before refitting.'],
      ['Good central depth, poor edges', 'Spatial sampling, illumination and missing training locations.', 'Plot held-out residuals by surface location; expand reference coverage where justified.'],
      ['Depth scale changes after resize', 'Crop, processing resolution and pixel-to-metric mapping.', 'Re-establish scale against the reference geometry; do not reuse an unrelated constant.'],
      ['Marker jumps or missing tracks', 'Marker mask, contact deformation and tracking reinitialization.', 'Mark invalid spans; retain raw frames and avoid silently filling failed tracks with zero.'],
      ['Different force on load and unload', 'Gel hysteresis, loading rate, reference alignment and time synchronization.', 'Record loading phase and independently validate the force model across the claimed conditions.'],
      ['Low training error but poor new contacts', 'Leakage across adjacent frames, positions, objects or sessions.', 'Split by physical contact/session and test held-out geometries before reporting transfer.'],
    ] } },
    { id: 'connect', heading: 'Connect calibration to processing and manipulation', body: [
      'Version each calibration and associate it with the observations that use it. Keep raw image or sensor units and validity flags alongside derived depth or force, recording the transformation and model revision. Sampling time, host receive time and end-to-end latency are distinct; a dataset timestamp does not substitute for those measurements.',
      'For tactile sensing in robotics, the next question is whether the calibrated quantity supports a specific action or evaluation. A depth estimate may describe local contact geometry; a force estimate may support a separately validated contact task. Both need a task-specific protocol before a manipulation claim.',
    ], links: [python, ros, { label: 'Store observations with episode and timestamp checks', href: '/guides/lerobot-dataset-format' }, { label: 'See how tactile feedback enters manipulation', href: '/tactile-manipulation' }] },
  ],
  faqs: [
    { question: 'Does 3D Cal provide a complete force calibration workflow?', answer: 'The reviewed paper demonstrates RGB-to-gradient/depth reconstruction for DIGIT and GelSight Mini. Force-sensor integration is described as future work. Force estimation needs independent load references and a validated mapping.' },
    { question: 'Can I copy a calibration between two sensors?', answer: 'Transfer is a hypothesis to test. Gel, camera settings, optics, mounting and wear can change the mapping. Validate against references on the receiving device before claiming accuracy.' },
    { question: 'What can I complete without hardware?', answer: 'Read the source-based workflow, prepare the blank record template, and run the separate synthetic Python and dataset-checking exercises. Actual device calibration and error measurements require sensors and suitable reference equipment.' },
  ],
  relatedLinks: [overview, python, { label: 'Compare tactile sensors', href: '/sensors', description: 'Check measurement principles, interfaces and calibration requirements.' }, { label: 'Tactile manipulation', href: '/tactile-manipulation', description: 'Connect measurement quality to a contact task and its evaluation.' }],
  sources: [
    { label: '3D Cal: An Open-Source Software Library for Calibrating Tactile Sensors — checked 2026-09-16', href: 'https://arxiv.org/abs/2511.03078' },
    { label: '3D Cal author project', href: 'https://rohankotanu.github.io/3DCal/' },
    { label: 'DIGIT official documentation — checked 2026-09-16', href: 'https://digit.ml/digit.html' },
    { label: 'DIGIT interface pinned source', href: 'https://github.com/facebookresearch/digit-interface/tree/87a28bbf2beee8008a5308e9a12d72e1bc4fefb9' },
    { label: 'GelSight Mini official site — checked 2026-09-16', href: 'https://www.gelsightmini.com/' },
    { label: 'GelSight gsrobotics pinned source', href: 'https://github.com/gelsightinc/gsrobotics/tree/321d6a22da64529138ff10237335038fd8c5189f' },
  ],
};

export const engineeringPages = [lerobotTutorial, calibrationTutorial];
