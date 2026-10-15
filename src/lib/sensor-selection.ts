export type SensorTask = {
  id: string;
  label: string;
  question: string;
  candidates: { id: string; reason: string }[];
  measure: string;
  match: string;
  boundary: string;
};

// Candidate routes use the existing sensor records; these are evaluation plans, not measured rankings.
export const sensorTasks: SensorTask[] = [
  {
    id: 'slip', label: 'Slip detection',
    question: 'Can the sensing pipeline detect loss of grip early enough for your controller?',
    candidates: [
      { id: 'gelsight-mini', reason: 'Marker motion offers shear cues; a temporal model and slip ground truth are still needed.' },
      { id: 'anyskin', reason: 'Magnetic deformation signals provide a candidate route for slip-aware contact policies; test each replacement skin and mounting.' },
      { id: 'biotac', reason: 'Vibration and fluid-pressure channels offer another route to dynamic contact evidence. Verify the exact revision and available driver.' },
    ],
    measure: 'Report incipient versus gross slip separately, missed events, false alarms and detection-to-controller delay. State how slip onset was labeled.',
    match: 'Use the same objects, surface condition, normal load, sliding speed, sampling window, event definition and held-out split. Include processing and communication time.',
    boundary: 'Frame rate, force resolution and a slip-related signal are not slip-detection accuracy. These candidates have not been tested head to head by RoboSkin.',
  },
  {
    id: 'dexterity', label: 'Dexterous manipulation',
    question: 'Which contact signals and fingertip geometry fit the hand and manipulation task?',
    candidates: [
      { id: 'digit', reason: 'Compact image-based fingertip for contact geometry; budget for image processing and the archived interface.' },
      { id: 'densetact-2', reason: 'Curved fingertip with learned shape and wrench estimation; include calibration collection in integration effort.' },
      { id: 'tactip', reason: 'Soft optical fingertip family with marker-based perception; specify the actual morphology, camera and skin.' },
    ],
    measure: 'Report task success and trial count, drops, contact recovery and total loop delay. Compare against vision-only or proprioception-only control on the same hand.',
    match: 'Match hand geometry, object set, initial poses, controller, training budget, force limits and evaluation split. Separate trained-object and unseen-object results.',
    boundary: 'A reconstruction or wrench error is not manipulation success. Different hands, task difficulty and control policies prevent a direct ranking.',
  },
  {
    id: 'coverage', label: 'Full-hand coverage',
    question: 'Where must the hand sense contact: fingertips, finger sides, joints or palm?',
    candidates: [
      { id: 'uskin', reason: 'Modular arrays have finger and palm integration paths. Check the exact module layout and readout configuration.' },
      { id: 'reskin', reason: 'Replaceable patches offer a route to selected contact surfaces; full-hand electronics, wiring and coverage need a separate design.' },
      { id: 'anyskin', reason: 'Replaceable interfaces can inform end-effector layouts; they do not establish a ready-made full-hand solution.' },
    ],
    measure: 'Map instrumented area and blind spots, normal/shear observability, simultaneous-contact readout, wiring, joint clearance and replacement effort.',
    match: 'Use the same hand CAD, contact locations, taxel definition, contact force, bending configuration and number of active modules. Measure rate with the full system connected.',
    boundary: 'Image pixels, physical taxels and inferred force-map cells are different quantities. A single patch or module specification does not describe whole-hand performance.',
  },
];
