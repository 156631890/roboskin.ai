# RoboSkin Knowledge Graph Gap Roadmap

Date: 2026-08-22

## Decision

The next graph release should increase semantic relationships before it increases page count. The current graph is source-backed, but too many records are connected only to evidence URLs. Adding hundreds of isolated records would create a directory, not a useful tactile-robotics knowledge graph.

Do not create one thin URL per entity. Continue to use crawlable directory fragments until an entity has a complete original brief, at least two primary-source classes and three meaningful relationships, or verified search demand that the directory cannot satisfy.

## Audited baseline

| Measure | Count |
| --- | ---: |
| Entities | 110 |
| Papers | 25 |
| Documentation records | 1 |
| Datasets | 14 |
| Benchmarks | 10 |
| Sensors | 13 |
| Models | 10 |
| Organizations | 26 |
| Robots | 11 |
| URL-keyed source records | 152 |
| Total edges | 297 |
| `supportedBy` edges | 185 |
| Non-`supportedBy` edges | 112 |
| `trainedOn` edges | 0 |
| `usesDataset` edges | 0 |
| `evaluatedBy` edges | 1 |

The source-record count is URL-keyed rather than publication-keyed. At least three arXiv works currently appear through both `/abs/` and versioned `/html/` URLs, so 152 must not be described as 152 unique publications.

## Next implementation batch

The first nine candidates have the highest immediate relationship value. Each record still requires primary-source review before it is added.

| Priority | Candidate | Proposed type | Relationship value | Primary-source starting point |
| ---: | --- | --- | --- | --- |
| 1 | Open X-Embodiment | dataset | Can connect Octo and OpenVLA to training data and the robot-learning cluster. | Google DeepMind repository and arXiv:2310.08864 |
| 2 | DROID | dataset | Can connect OpenVLA, pi0, Franka Panda, teleoperation and robotics datasets. | Official DROID project and arXiv:2403.12945 |
| 3 | Unitree G1 | robot | Connects RoboTacDex, Tac4Loco, humanoids and robot hands. | Unitree product documentation plus the relevant primary papers |
| 4 | ALOHA research setup | robot or research setup | Connects Octo, pi0, ViperX, teleoperation and demonstration data. | Official ALOHA and ALOHA 2 project sources |
| 5 | GelSight | organization/company | Connects GelSight Mini, DIGIT, Digit 360, Touch and Go, ObjectFolder and TacBench. | Official GelSight company and product pages |
| 6 | BridgeData V2 | dataset | Connects WidowX-250, OpenVLA and Octo. | Official BridgeData V2 project and arXiv:2308.12952 |
| 7 | TouchWorld | model | Connects an existing research brief, foundation-model and world-model clusters. | Official project and arXiv:2607.07287 |
| 8 | Tac4Loco | paper | Brings an existing full research page into the graph and connects Unitree G1. | Existing RoboSkin brief and arXiv:2608.15766 |
| 9 | Universal Robots UR5 | robot | Preserves the distinction between UR5 and UR5e and connects Octo evidence. | Universal Robots documentation and the Octo primary source |

Second-wave candidates: Unitree Robotics, RoboTacDex, Tac4Loco model/policy, University of Hong Kong, AgileX Piper, FeelWorld, HiTac-WAM, T-Rex, ViTacWorld and HRDexDB.

Hardware and institution follow-up candidates: RealMan RM75-6F, Inspire RH56-DFX, Gwangju Institute of Science and Technology, XELA Robotics, SynTouch, Max Planck Institute for Intelligent Systems, Xense Photon, eFlesh and the open-source magnetic tactile calibration paper.

## Acceptance gate

For each 20–30-node batch:

1. Every factual field must be traceable to a primary source and include a review date.
2. The batch should add at least 40–60 non-`supportedBy` relationships.
3. It should open or strengthen model-to-dataset, paper-to-model, model-to-robot, sensor-to-organization, or dataset-to-robot paths.
4. Announced-but-unreleased datasets must not receive a download URL or inferred license.
5. Dataset and benchmark records with the same name must retain distinct semantic roles.
6. No standalone entity page should be generated solely to increase URL count.

Before expansion, improve source identity normalization for arXiv abstract/HTML/version variants so public graph counts distinguish URL records from unique publications.
