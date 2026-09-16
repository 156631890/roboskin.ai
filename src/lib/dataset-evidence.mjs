// Access audit metadata is separate from scientific-source review dates.
export const datasetAudit = { version: 'v2026.09.13', compiledAt: '2026-09-13', scope: 'Current RoboSkin tactile directory only; not an industry census.' };
export const datasetAccessEvidence = {
  "univtac-encoder-pretraining-corpus": {
    "access": "announced",
    "accessCheckedAt": "2026-08-22",
    "licenseStatus": "unknown",
    "dataLicense": "Unknown: a dataset-file license has not been verified separately from paper or code terms.",
    "publicFileScale": "Unknown: no independently recounted public-file total in this record.",
    "verificationScope": "Existing source review only. No new dataset-file download, checksum validation, training run, or hardware test in this audit.",
    "splitStatus": "unknown",
    "splitDetails": "Unknown: no train/test split manifest verified in this audit.",
    "formatStatus": "described",
    "formatDetails": "The paper defines synchronized samples containing I_marked, I_pure, a dense depth map, projected fiducial-marker coordinates, and a 7D object pose. No standalone public corpus package, file manifest, checksum set, or machine-readable split was verified.",
    "sources": [
      "https://univtac.github.io/"
    ]
  },
  "univtac-benchmark-dataset": {
    "access": "public-files",
    "accessCheckedAt": "2026-09-13",
    "licenseStatus": "documented",
    "dataLicense": "mit in the provider dataset-card metadata at the pinned revision; individual asset terms were not inspected.",
    "publicFileScale": "2,344 paths in the provider file manifest, including metadata. Bytes, frames and episodes were not independently recounted.",
    "verificationScope": "Official hosting API and file manifest inspected at the pinned revision. No dataset payloads downloaded; no checksums, schema validation or training run.",
    "splitStatus": "unknown",
    "splitDetails": "Unknown: no train/test split manifest verified in this audit.",
    "formatStatus": "described",
    "formatDetails": "Task directories contain HDF5 episodes with head and wrist observations, robot state, atom and episode metadata, and bilateral GelSight Mini RGB, marker, depth, and pose fields. The current Hugging Face Dataset Viewer fails schema generation with a CastError, while the hosted files remain available for download.",
    "sources": [
      "https://huggingface.co/datasets/byml/UniVTAC/tree/e1aee7b0c95543b535e0146b2de3ee1bc6ddaabd"
    ],
    "revision": "e1aee7b0c95543b535e0146b2de3ee1bc6ddaabd",
    "listedFileCount": 2344,
    "dataLicenseUrl": "https://opensource.org/license/mit"
  },
  "t-rex": {
    "access": "public-files",
    "accessCheckedAt": "2026-09-13",
    "licenseStatus": "documented",
    "dataLicense": "mit in the provider dataset-card metadata at the pinned revision; individual asset terms were not inspected.",
    "publicFileScale": "7,903 paths in the provider file manifest, including metadata. Bytes, frames and episodes were not independently recounted.",
    "verificationScope": "Official hosting API and file manifest inspected at the pinned revision. No dataset payloads downloaded; no checksums, schema validation or training run.",
    "splitStatus": "unknown",
    "splitDetails": "Unknown: no train/test split manifest verified in this audit.",
    "formatStatus": "described",
    "formatDetails": "LeRobotDataset v3.0 with head and bilateral wrist videos, robot state, current and target joint positions, ten fingertip tactile streams, deformation maps, 6D wrenches, and episode metadata. The official repository provides selective download, inspection, and 3D replay examples.",
    "sources": [
      "https://huggingface.co/datasets/zekaiwang/trex_dataset/tree/bf0eb24c4b8bdd95752b553f0fc50e46a22f1cc8"
    ],
    "revision": "bf0eb24c4b8bdd95752b553f0fc50e46a22f1cc8",
    "listedFileCount": 7903,
    "dataLicenseUrl": "https://opensource.org/license/mit"
  },
  "egotouch": {
    "access": "public-files",
    "accessCheckedAt": "2026-09-13",
    "licenseStatus": "unknown",
    "dataLicense": "Unknown: a dataset-file license has not been verified separately from paper or code terms.",
    "publicFileScale": "22,897 paths in the provider file manifest, including metadata. Bytes, frames and episodes were not independently recounted.",
    "verificationScope": "Official hosting API and file manifest inspected at the pinned revision. No dataset payloads downloaded; no checksums, schema validation or training run.",
    "splitStatus": "files-listed",
    "splitDetails": "Split-named files listed: split.json. Contents and leakage were not validated.",
    "formatStatus": "described",
    "formatDetails": "The official repository documents variable-length 30 FPS HDF5 episodes containing three 640 x 480 RGB views, bimanual hand-pose arrays, bilateral pressure grids, camera poses, masks when available, metadata, and timestamps. The Hugging Face repository also exposes scene folders and split.json.",
    "sources": [
      "https://huggingface.co/datasets/zhouzhoujy/EgoTouch/tree/cfdbb0ac31cc2af4247943820aa250575e7e6637"
    ],
    "revision": "cfdbb0ac31cc2af4247943820aa250575e7e6637",
    "listedFileCount": 22897
  },
  "prism-industrial-skill": {
    "access": "announced",
    "accessCheckedAt": "2026-08-22",
    "licenseStatus": "unknown",
    "dataLicense": "Unknown: a dataset-file license has not been verified separately from paper or code terms.",
    "publicFileScale": "Unknown: no independently recounted public-file total in this record.",
    "verificationScope": "Existing source review only. No new dataset-file download, checksum validation, training run, or hardware test in this audit.",
    "splitStatus": "unknown",
    "splitDetails": "Unknown: no train/test split manifest verified in this audit.",
    "formatStatus": "described",
    "formatDetails": "The paper describes timestamped episode files in a common cross-platform schema and reports conversion to LeRobot v3.0 for its experiments. The unreleased public package and final file inventory could not be inspected.",
    "sources": [
      "https://tengbo-yu.github.io/PRISM/"
    ]
  },
  "softvtbench": {
    "access": "public-files",
    "accessCheckedAt": "2026-09-13",
    "licenseStatus": "documented",
    "dataLicense": "apache-2.0 in the provider dataset-card metadata at the pinned revision; individual asset terms were not inspected.",
    "publicFileScale": "16,060 paths in the provider file manifest, including metadata. Bytes, frames and episodes were not independently recounted.",
    "verificationScope": "Official hosting API and file manifest inspected at the pinned revision. No dataset payloads downloaded; no checksums, schema validation or training run.",
    "splitStatus": "unknown",
    "splitDetails": "Unknown: no train/test split manifest verified in this audit.",
    "formatStatus": "described",
    "formatDetails": "HDF5 trajectories with synchronized policy observations, robot actions, simulator state, and evaluator fields, plus third-person, wrist, and bilateral tactile MP4 videos documented by the current dataset card.",
    "sources": [
      "https://huggingface.co/datasets/Arthur12137/SoftVTBench/tree/fd2793a19310b5ba4ac6518f9a17ff43d56f6651"
    ],
    "revision": "fd2793a19310b5ba4ac6518f9a17ff43d56f6651",
    "listedFileCount": 16060,
    "dataLicenseUrl": "https://www.apache.org/licenses/LICENSE-2.0"
  },
  "robotacdex": {
    "access": "announced",
    "accessCheckedAt": "2026-08-22",
    "licenseStatus": "unknown",
    "dataLicense": "Unknown: a dataset-file license has not been verified separately from paper or code terms.",
    "publicFileScale": "Unknown: no independently recounted public-file total in this record.",
    "verificationScope": "Existing source review only. No new dataset-file download, checksum validation, training run, or hardware test in this audit.",
    "splitStatus": "unknown",
    "splitDetails": "Unknown: no train/test split manifest verified in this audit.",
    "formatStatus": "described",
    "formatDetails": "The v1 paper describes 30 Hz synchronized trajectories containing four 640 x 480 RGB-D views, arm and finger states and actions, bilateral tactile signals, and semantic annotations. It does not state the public package format, directory schema, compression, checksums, or train-validation-test file layout.",
    "sources": [
      "https://arxiv.org/abs/2606.31836"
    ]
  },
  "ht-bench": {
    "access": "announced",
    "accessCheckedAt": "2026-08-22",
    "licenseStatus": "unknown",
    "dataLicense": "Unknown: a dataset-file license has not been verified separately from paper or code terms.",
    "publicFileScale": "Unknown: no independently recounted public-file total in this record.",
    "verificationScope": "Existing source review only. No new dataset-file download, checksum validation, training run, or hardware test in this audit.",
    "splitStatus": "unknown",
    "splitDetails": "Unknown: no train/test split manifest verified in this audit.",
    "formatStatus": "described",
    "formatDetails": "Synchronized egocentric RGB and full-hand tactile maps; the benchmark pipeline normalizes tactile maps to 224 x 224.",
    "sources": [
      "https://arxiv.org/abs/2606.19161v2"
    ]
  },
  "rct": {
    "access": "linked-unverified",
    "accessCheckedAt": "2026-08-16",
    "licenseStatus": "documented",
    "dataLicense": "CC BY 4.0 dataset; Apache-2.0 applies to code, according to the existing project review.",
    "publicFileScale": "Unknown: no independently recounted public-file total in this record.",
    "verificationScope": "Existing source review only. No new dataset-file download, checksum validation, training run, or hardware test in this audit.",
    "splitStatus": "protocol-described",
    "splitDetails": "Existing source review documents split tools. File-level membership and train/test leakage were not independently validated.",
    "formatStatus": "described",
    "formatDetails": "Ordered contact sequences with material, category, sensor, position, depth, force, image, and descriptor metadata.",
    "sources": [
      "https://figshare.com/s/a5ed417ba6602ccad0f6"
    ],
    "dataLicenseUrl": "https://creativecommons.org/licenses/by/4.0/"
  },
  "tactidex": {
    "access": "unknown",
    "accessCheckedAt": "2026-08-16",
    "licenseStatus": "unknown",
    "dataLicense": "Unknown: a dataset-file license has not been verified separately from paper or code terms.",
    "publicFileScale": "Unknown: no independently recounted public-file total in this record.",
    "verificationScope": "Existing source review only. No new dataset-file download, checksum validation, training run, or hardware test in this audit.",
    "splitStatus": "unknown",
    "splitDetails": "Unknown: no train/test split manifest verified in this audit.",
    "formatStatus": "described",
    "formatDetails": "Synchronized tactile pressure, hand-object kinematics, 6D pose, language, and hierarchical task annotations.",
    "sources": [
      "https://tactidex.github.io/"
    ]
  },
  "freetacman": {
    "access": "public-files",
    "accessCheckedAt": "2026-09-13",
    "licenseStatus": "documented",
    "dataLicense": "mit in the provider dataset-card metadata at the pinned revision; individual asset terms were not inspected.",
    "publicFileScale": "24,915 paths in the provider file manifest, including metadata. Bytes, frames and episodes were not independently recounted.",
    "verificationScope": "Official hosting API and file manifest inspected at the pinned revision. No dataset payloads downloaded; no checksums, schema validation or training run.",
    "splitStatus": "unknown",
    "splitDetails": "Unknown: no train/test split manifest verified in this audit.",
    "formatStatus": "described",
    "formatDetails": "MP4 wrist and tactile videos plus timestamped trajectory files containing TCP pose, quaternion, Euler angles, and gripper distance.",
    "sources": [
      "https://huggingface.co/datasets/OpenDriveLab/FreeTacMan/tree/030316fb41d6fa1e58cccb4bbe0f6fddbb932671"
    ],
    "revision": "030316fb41d6fa1e58cccb4bbe0f6fddbb932671",
    "listedFileCount": 24915,
    "dataLicenseUrl": "https://opensource.org/license/mit"
  },
  "humanoid-vta": {
    "access": "unknown",
    "accessCheckedAt": "2026-08-16",
    "licenseStatus": "unknown",
    "dataLicense": "Unknown: a dataset-file license has not been verified separately from paper or code terms.",
    "publicFileScale": "Unknown: no independently recounted public-file total in this record.",
    "verificationScope": "Existing source review only. No new dataset-file download, checksum validation, training run, or hardware test in this audit.",
    "splitStatus": "unknown",
    "splitDetails": "Unknown: no train/test split manifest verified in this audit.",
    "formatStatus": "described",
    "formatDetails": "Synchronized visual, 2,124-channel hand tactile, proprioceptive, action, and external pressure signals; public file format not stated.",
    "sources": [
      "https://arxiv.org/abs/2510.25725"
    ]
  },
  "sparsh-x": {
    "access": "unknown",
    "accessCheckedAt": "2026-08-16",
    "licenseStatus": "unknown",
    "dataLicense": "Unknown: a dataset-file license has not been verified separately from paper or code terms.",
    "publicFileScale": "Unknown: no independently recounted public-file total in this record.",
    "verificationScope": "Existing source review only. No new dataset-file download, checksum validation, training run, or hardware test in this audit.",
    "splitStatus": "unknown",
    "splitDetails": "Unknown: no train/test split manifest verified in this audit.",
    "formatStatus": "described",
    "formatDetails": "Four synchronized Digit 360 modalities; public file format not stated on the reviewed paper page.",
    "sources": [
      "https://arxiv.org/abs/2506.14754"
    ]
  },
  "touch-and-go": {
    "access": "linked-unverified",
    "accessCheckedAt": "2026-08-19",
    "licenseStatus": "unknown",
    "dataLicense": "Unknown: a dataset-file license has not been verified separately from paper or code terms.",
    "publicFileScale": "Unknown: no independently recounted public-file total in this record.",
    "verificationScope": "Existing source review only. No new dataset-file download, checksum validation, training run, or hardware test in this audit.",
    "splitStatus": "unknown",
    "splitDetails": "Unknown: no train/test split manifest verified in this audit.",
    "formatStatus": "described",
    "formatDetails": "Synchronized egocentric video and GelSight tactile recordings with detected-touch timing and material annotations.",
    "sources": [
      "https://touch-and-go.github.io/"
    ]
  },
  "tvl": {
    "access": "linked-unverified",
    "accessCheckedAt": "2026-08-19",
    "licenseStatus": "unknown",
    "dataLicense": "Unknown: a dataset-file license has not been verified separately from paper or code terms.",
    "publicFileScale": "Unknown: no independently recounted public-file total in this record.",
    "verificationScope": "Existing source review only. No new dataset-file download, checksum validation, training run, or hardware test in this audit.",
    "splitStatus": "unknown",
    "splitDetails": "Unknown: no train/test split manifest verified in this audit.",
    "formatStatus": "described",
    "formatDetails": "Temporally aligned touch, vision, and open-vocabulary language examples; 10% of labels are human annotations and 90% are VLM-generated in the paper.",
    "sources": [
      "https://tactile-vlm.github.io/"
    ]
  },
  "objectfolder-real": {
    "access": "linked-unverified",
    "accessCheckedAt": "2026-08-19",
    "licenseStatus": "unknown",
    "dataLicense": "Unknown: a dataset-file license has not been verified separately from paper or code terms.",
    "publicFileScale": "Unknown: no independently recounted public-file total in this record.",
    "verificationScope": "Existing source review only. No new dataset-file download, checksum validation, training run, or hardware test in this audit.",
    "splitStatus": "unknown",
    "splitDetails": "Unknown: no train/test split manifest verified in this audit.",
    "formatStatus": "described",
    "formatDetails": "Multisensory measurements aligned to object surface locations, including mesh, visual, acoustic, and tactile assets.",
    "sources": [
      "https://objectfolder.stanford.edu/"
    ]
  },
  "objectfolder-2": {
    "access": "linked-unverified",
    "accessCheckedAt": "2026-08-19",
    "licenseStatus": "documented",
    "dataLicense": "CC BY 4.0 for ObjectFolder 2.0 according to the existing review of the official download page.",
    "publicFileScale": "Unknown: no independently recounted public-file total in this record.",
    "verificationScope": "Existing source review only. No new dataset-file download, checksum validation, training run, or hardware test in this audit.",
    "splitStatus": "unknown",
    "splitDetails": "Unknown: no train/test split manifest verified in this audit.",
    "formatStatus": "described",
    "formatDetails": "Object File implicit neural representations with query parameters for view, lighting, impact, contact location, gel rotation, and indentation depth.",
    "sources": [
      "https://objectfolder.stanford.edu/objectfolder2-0-download"
    ],
    "dataLicenseUrl": "https://creativecommons.org/licenses/by/4.0/"
  },
  "tacverse": {
    "access": "gated",
    "accessCheckedAt": "2026-09-13",
    "licenseStatus": "documented",
    "dataLicense": "cc-by-4.0 in the provider dataset-card metadata at the pinned revision; individual asset terms were not inspected.",
    "publicFileScale": "7 paths in the provider file manifest, including metadata. Bytes, frames and episodes were not independently recounted.",
    "verificationScope": "Official hosting API and file manifest inspected at the pinned revision. No dataset payloads downloaded; no checksums, schema validation or training run.",
    "splitStatus": "unknown",
    "splitDetails": "Unknown: no train/test split manifest verified in this audit.",
    "formatStatus": "described",
    "formatDetails": "Multi-sensor tactile images and task labels organized for within-sensor, zero-shot cross-sensor, and few-shot protocols.",
    "sources": [
      "https://huggingface.co/datasets/Lan-2025/Tactile/tree/0bc27afe0d8f6c878b79e1eb0825255541ccaceb"
    ],
    "revision": "0bc27afe0d8f6c878b79e1eb0825255541ccaceb",
    "listedFileCount": 7,
    "dataLicenseUrl": "https://creativecommons.org/licenses/by/4.0/"
  },
  "vtdexmanip": {
    "access": "linked-unverified",
    "accessCheckedAt": "2026-08-19",
    "licenseStatus": "unknown",
    "dataLicense": "Unknown: a dataset-file license has not been verified separately from paper or code terms.",
    "publicFileScale": "Unknown: no independently recounted public-file total in this record.",
    "verificationScope": "Existing source review only. No new dataset-file download, checksum validation, training run, or hardware test in this audit.",
    "splitStatus": "unknown",
    "splitDetails": "Unknown: no train/test split manifest verified in this audit.",
    "formatStatus": "described",
    "formatDetails": "Visual-tactile pretraining data and an Isaac Gym policy benchmark; inspect the official repository for the current file layout.",
    "sources": [
      "https://lqts.github.io/VTDexManip/"
    ]
  }
};

/** @type {Record<string, string>} */
export const accessLabels = {
  'public-files': 'Public file manifest', gated: 'Registration / approval required',
  announced: 'Announced; release not verified', 'linked-unverified': 'Download route linked; files not verified', unknown: 'Access unknown',
};

export function getDatasetEvidence(entry) {
  return datasetAccessEvidence[entry.id] ?? {
    access: 'unknown', accessCheckedAt: entry.sourceReviewed, licenseStatus: 'unknown',
    dataLicense: 'Unknown: verify dataset-file terms separately from code and paper licenses.',
    publicFileScale: 'Unknown: public file totals not independently checked.',
    verificationScope: 'Source documentation only; no dataset payload or hardware verification.',
    splitStatus: 'unknown', splitDetails: 'Unknown: split files not verified.',
    formatStatus: 'described', formatDetails: entry.dataFormat, sources: [entry.paperUrl],
  };
}

export function summarizeDatasetEvidence(entries) {
  const result = { total: entries.length, access: /** @type {Record<string, number>} */ ({}), licenseDocumented: 0, licenseUnknown: 0, splitFilesListed: 0, splitProtocolDescribed: 0, splitUnknown: 0, manifestInspected: 0 };
  for (const entry of entries) {
    const evidence = getDatasetEvidence(entry);
    result.access[evidence.access] = (result.access[evidence.access] ?? 0) + 1;
    result[evidence.licenseStatus === 'documented' ? 'licenseDocumented' : 'licenseUnknown']++;
    result[evidence.splitStatus === 'files-listed' ? 'splitFilesListed' : evidence.splitStatus === 'protocol-described' ? 'splitProtocolDescribed' : 'splitUnknown']++;
    if (evidence.revision) result.manifestInspected++;
  }
  return result;
}
