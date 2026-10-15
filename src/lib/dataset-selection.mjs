// Editorial interpretation of the existing, dated source records, not new experiments.
export const datasetSelectionReviewed = '2026-10-15';
const limitations = {
  'bench2dex': 'Simulation demonstrations support controlled perturbation studies. Multiple supported hands do not establish zero-shot cross-hand or physical-sensor transfer.',
  'univtac-encoder-pretraining-corpus': 'Use for simulated contact representations. Contact samples are not policy trajectories; public file counts do not establish equivalence to the paper corpus.',
  'univtac-benchmark-dataset': 'Use the matching simulator version and task package. Simulated GelSight channels do not establish performance on a physical GelSight sensor.',
  't-rex': 'Use for the recorded bimanual embodiment and tactile streams. The public subset is distinct from the complete paper corpus; transfer to another hand requires evaluation.',
  'egotouch': 'Human glove pressure and hand pose can inform representation or retargeting research. They are not robot action labels or calibrated signals for a different sensor.',
  'prism-industrial-skill': 'Contact-rich industrial collection is task and hardware dependent. Check the released action schema, force conventions and access conditions before planning policy training.',
  'softvtbench': 'Soft-contact experiments depend on the reported objects, deformation and sensor setup. Do not extend reported success to arbitrary materials or contact forces.',
  'robotacdex': 'A described collection is not a verified downloadable training package. Confirm release, action schema and dataset terms before committing to reproduction.',
  'ht-bench': 'Full-hand prediction and retrieval tasks do not by themselves validate closed-loop control. Check whether data, splits and evaluation code are actually released.',
  'rct': 'Use for material/contact representations and the documented sensor-disjoint protocol. Contact sequences do not supply a general manipulation-policy benchmark.',
  'tactidex': 'Human demonstration and hand-object annotations require retargeting for robot control. Download availability and dataset-file terms must be established separately.',
  'freetacman': 'Human-collected tactile demonstrations need an explicit mapping to the target robot, action space and sensor. Collection convenience is not transfer evidence.',
  'humanoid-vta': 'Full-hand coverage is tied to the collection embodiment. Pressure maps do not establish calibrated shear, fingertip geometry or another hand’s control performance.',
  'sparsh-x': 'Check which data, encoders and sensor modalities are included in the selected release. A multisensory resource does not guarantee a shared schema or cross-sensor accuracy.',
  'touch-and-go': 'Use aligned human-collected visual and tactile observations for perception. They do not provide a standardized robot-action or closed-loop slip benchmark.',
  'tvl': 'Use touch, vision and language for multimodal representations. Language alignment does not establish manipulation success, force calibration or action supervision.',
  'objectfolder-real': 'Object-level real observations support multisensory perception. A fixed object collection is not a long-horizon robot-manipulation dataset.',
  'objectfolder-2': 'Simulated object signals support controlled representation experiments. Rendering fidelity and transfer to real sensors require separate tests.',
  'tacverse': 'Cross-sensor comparisons require the documented sensor and task splits. Do not compare accuracy numbers across different split or few-shot settings.',
  'vtdexmanip': 'Separate visual-tactile pretraining from the simulator policy benchmark. Neither alone demonstrates transfer to a physical hand or a new sensor.',
};

/** @param {import('./robotics-datasets').RoboticsDatasetEntry} entry */
export function getDatasetSelection(entry) {
  return {
    intendedUse: `${entry.tasks.join('; ')}. Collection: ${entry.robot.join('; ')}.`,
    useLimitations: limitations[entry.id] ?? entry.generalization ?? 'Applicability outside the recorded tasks, collection platform and sensor has not been established. Check target-domain evaluation before reuse.',
    basis: 'Editorial guidance from the linked source record; not an independent reproduction.',
  };
}
