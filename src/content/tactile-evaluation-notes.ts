import type { ProgrammingSection } from '@/content/programming-pages';

export const tactileTimingAudit: ProgrammingSection = {
  id: 'tactile-timing-audit',
  heading: 'Audit tactile data synchronization before closing the control loop',
  body: [
    'A tactile stream can publish at the expected rate and still reach the controller too late for a contact decision. Record capture time, receive time, feature-ready time and command time on a common time base. When the sensor supplies its own clock, preserve its original stamp and the synchronization method. If capture time is unavailable, label the stamp as host receive time and leave capture-to-receive delay unknown.',
    'Treat age and alignment as separate acceptance criteria. Sample age is the time between tactile capture and the decision that consumes it. Inter-stream skew is the difference between capture times of the samples put into the same observation. ROS 2 message_filters associates messages using header timestamps under its selected policy. Approximate synchronization only limits association according to that policy. Clock offsets, buffering, stale data and the time to produce a command still need measurement.',
    'Consider an illustrative receive trace in milliseconds on an already aligned clock. The tactile sample is captured at 100, arrives at 114, and becomes a feature at 125. The state sample is captured at 107. The controller chooses a command at 139. The pair has 7 ms capture skew and the tactile sample is 39 ms old at decision time. A 10 ms pairing limit would pass this pair. An application-defined age limit of 30 ms would reject it. If you silently replace capture time with receive time, the reported age falls to 25 ms and the stale input appears to pass.',
    'Instrument the live system before configuring the limit. Capture skipped sequence numbers, out-of-order arrivals, time since the last valid observation and periods where matching failed. Report the unmatched count alongside the timing percentiles. A small p95 skew computed only on retained pairs can coexist with many rejected contacts. Use representative load, including simultaneous camera capture, and record the clock-reset and dropout recovery behavior in its own trace.',
    'Run the main trace, stale trace and a gap or reset trace through the same consumer. Record what command is issued in each case. Select an application-specific fallback with the controller owner, then verify it on a supervised bench. The numbers here describe a teaching trace. They establish no ROS 2 runtime measurement or physical response for a particular sensor.',
  ],
  table: {
    headers: ['Reported measurement', 'Illustrative calculation', 'Acceptance evidence to retain'],
    rows: [
      ['Pair skew', '|107 − 100| = 7 ms', 'Original timestamps, time-base conversion and unmatched count'],
      ['Tactile transport delay', '114 − 100 = 14 ms', 'Capture and receive stamps, including the meaning of the stamp'],
      ['Feature processing delay', '125 − 114 = 11 ms', 'Scheduling and feature completion across representative load'],
      ['Tactile age at decision', '139 − 100 = 39 ms', 'Decision stamps and the count that exceeded the task deadline'],
    ],
  },
  links: [
    { label: 'ROS 2 message_filters synchronization policies', href: 'https://docs.ros.org/en/rolling/p/message_filters/doc/index.html' },
    { label: 'ROS 2 QoS and compatibility policies', href: 'https://docs.ros.org/en/rolling/Concepts/Intermediate/About-Quality-of-Service-Settings.html' },
    { label: 'Check timing after LeRobot export', href: '/guides/lerobot-dataset-format' },
  ],
};

export const tactileDatasetSplitAudit: ProgrammingSection = {
  id: 'tactile-split-audit',
  heading: 'Audit LeRobot tactile episodes for train–test leakage',
  body: [
    'Set the split unit from the deployment claim before converting the dataset. A claim about new trials on the same rig needs disjoint original recordings. A claim about unseen objects, operators or sensor replacements needs the corresponding group held out. Report which axes recur on both sides. Distinct episode IDs alone establish distinct rows in metadata and can still share a recording, object or hardware instance.',
    'Build a provenance manifest before clipping, resampling or augmenting the raw recordings. For each original run retain an immutable run identifier, episode IDs derived from it, the actual object identity, operator or collection session, sensor and skin revision, calibration revision and time range. When the same raw interval yields a cropped episode and a full episode, both inherit the same group. If the archive does not identify the original run, report the independence claim as unresolved.',
    'For an illustrative 12-episode set, two operator sessions each contain three source runs, and each run is exported in a full and a trimmed version. Splitting by episode can put the trimmed version in validation and the full version in training. Splitting by six original runs and keeping both versions together removes that particular overlap. A held-out-operator claim still requires a split by the two sessions. If the objective is new objects, hold out object identity as well or describe the axes separately.',
    'Assign each group before fitting tactile normalizers, learned imputation, or calibration parameters from task data. Compute training statistics from training groups. Tune decisions on a validation group and keep held-out test groups out of that tuning. If a separate fixture calibration is fixed before the data split, keep its independent provenance. A schema and timestamp checker can confirm numeric structure while the provenance audit still fails.',
    'After export, join the manifest to LeRobot episode metadata, not to the file names. LeRobot v3 can store multiple episodes in shared Parquet or video shards. Check that every exported episode appears once in the manifest, that source-group intersections between splits are empty for the declared holdout, and that each validation episode decodes to the correct camera sequence and offsets. Report the number of groups along with the frame count.',
  ],
  table: {
    headers: ['Generalization claim', 'Split unit to hold out', 'Report explicitly'],
    rows: [
      ['New recording with the same equipment', 'Original recording or independent run', 'Derived clips grouped with their source'],
      ['New objects', 'Physical object identity or declared object family', 'Identity boundary and repeat captures'],
      ['New operator or collection setup', 'Operator or session, as stated in the claim', 'What remained fixed across collections'],
      ['Replacement tactile skin', 'Physical skin unit or fabrication batch', 'Fit, adaptation and evaluation skin IDs'],
    ],
  },
  links: [
    { label: 'Official LeRobot v3 storage and episode metadata', href: 'https://huggingface.co/docs/lerobot/lerobot-dataset-v3' },
    { label: 'Pinned LeRobot reader implementation', href: 'https://github.com/huggingface/lerobot/blob/89236ea0f4f81a81ca566081e20dd1ff5f823cbe/src/lerobot/datasets/dataset_reader.py' },
    { label: 'Inspect tactile dataset access and split evidence', href: '/datasets' },
  ],
};

export const tactilePairedTrialsAudit = {
  id: 'paired-touch-trials',
  heading: 'Design paired trials to measure what touch adds',
  body: [
    'Translate “tactile sensing helps” into a comparison with a measurable outcome. For insertion, decide whether success means full seating within the time limit, within an agreed peak load, or both. Use the same initial offset, plug, fixture, camera input, success rule and controller constraints for both conditions. Where the training protocol differs, document the trained policies, demonstration counts, and optimization budget separately.',
    'Make each pair the same initial condition tested with and without touch, then alternate or randomize the condition order. Reset the fixture between attempts, and record grip-pad wear, robot state and any changes to mounting geometry. Group repeated initial conditions by object or session when analyzing uncertainty. Multiple attempts with the same part and fixture can share the same failure and should not mechanically count as independent objects.',
    'In an illustrative 20-pair run, eight pairs succeed under both conditions and six fail under both. Touch alone succeeds in five pairs, while vision alone succeeds in one. The aggregate rates are 13/20 versus 9/20, a 20 percentage-point difference. The six discordant pairs carry the evidence for the paired binary contrast. Under independent pairs, the two-sided exact sign test on those six gives 0.219. This example shows why the counts and pairing matter even when a rate difference looks large. It is arithmetic, with no measurement from RoboSkin hardware.',
    'Preserve peak force, completion time, recovery attempts and dropped tactile observations alongside success. A comparison can favor a tactile policy on completion and still expose an unacceptable force trade-off. Record aborts and missing data under a rule set before the run. Report which conditions generated those errors and include protocol deviations rather than removing them after seeing the outcome.',
    'TacO is a useful comparison model because it evaluates named tasks and specific sensor configurations. Its task-specific selections and acquisition setups matter when interpreting results. Pairing an evaluation does not isolate modality when fingertip mechanics, acquisition or training also change. Report the system comparison and record the variables you would match in a follow-up experiment.',
  ],
  table: {
    headers: ['Paired outcome', 'Example count', 'What to inspect in the raw trace'],
    rows: [
      ['Both succeed', '8', 'Whether peak force, elapsed time or recovery effort differs'],
      ['Touch succeeds, vision alone fails', '5', 'The contact event that preceded the successful correction'],
      ['Vision alone succeeds, touch fails', '1', 'Stale inputs, false contact detections and control changes'],
      ['Both fail', '6', 'Shared fixture, policy or task constraints'],
    ],
  },
  links: [
    { label: 'TacO authors’ task designs and experiments', href: 'https://arxiv.org/html/2605.21976v1' },
    { label: 'Use the sensor task evaluation template', href: '/sensors#task-selector' },
    { label: 'Check timing before comparing manipulation outcomes', href: '/guides/ros2-tactile-sensing#tactile-timing-audit' },
  ],
};
