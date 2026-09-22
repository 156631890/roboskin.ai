# ZeroTouch learns visual grasp-force control from tactile supervision

Researchers at the Intelligent Space Robotics Laboratory of the Skolkovo Institute of Science and Technology introduced ZeroTouch in a September 18, 2026 preprint. Dmitriy Kosenkov and colleagues train a model with tactile measurements, then use wrist-camera RGB, gripper position and local gravity direction to estimate contact and stop gripper closure without tactile input. The study connects visual force prediction to physical grasp tests, while exposing the limits of inferring hidden loads from appearance. [Paper and submission record](https://arxiv.org/abs/2609.21726).

## Key takeaways

- ZeroTouch predicts a deformation map, six-axis force and torque, and a grasp-specific compression target; an upstream controller still supplies arm motion and grasp pose.
- Normal-force mean absolute error is 0.531 N on the validation set and 0.828 N on the final test set. The smaller number is not the held-out test result.
- Physical success is 19/20, 16/20 and 18/20 under three specified shifts. These are small, controlled lift-and-hold experiments, not general manipulation success rates. [Evaluation and results](https://arxiv.org/html/2609.21726v1#S5).

## What does the robot predict instead of measuring?

A frozen DINOv2 visual encoder supplies image features. Gripper position and gravity direction in the local gripper frame condition those features before attention associates visual regions with an 18 × 24 grid of tactile queries. The model predicts dense deformation and a six-axis wrench: three forces and three moments. A separate output estimates the desired compression for the selected grasp. The gravity input helps distinguish orientations that can look similar while producing different mechanical loads. [Framework](https://arxiv.org/html/2609.21726v1#S3).

During training, a DM-Tac W2 vision-based tactile sensor supplies deformation and wrench references. At deployment, the predicted current compression is compared with the predicted target to determine when closure stops. Under the paper's convention, stronger compression is more negative. This is contact-state estimation and gripper regulation; selecting the approach trajectory remains outside ZeroTouch's scope.

## Where does the desired force come from?

The target is empirical. During collection, closure is adjusted until a grasp lifts the object 5 cm, holds it for 2 seconds without observable slip, and returns it. For successful demonstrations, the target is the median normal force in a settled interval after closure, rather than the transient force peak. It is not a theoretical minimum-safe force or a globally optimal setting. [Target construction](https://arxiv.org/html/2609.21726v1#S3).

The dataset contains 270 episodes and 15,316 synchronized samples: 187 training episodes, 31 validation episodes, 46 final test episodes and six diagnostic episodes. Validation selects the model and checkpoint. Normalization uses training data only, and wrench error is averaged within each episode before averaging across episodes, so long recordings do not automatically dominate the reported score. [Dataset and evaluation](https://arxiv.org/html/2609.21726v1#S4).

## What do the error figures actually measure?

The abstract highlights a validation normal-force error reduction from 2.017 N for state-only input to 0.531 N for the full architecture. Table II reports 0.828 N on the final test set. The desired compression target has test error of 0.679 N and signed bias of −0.490 N, indicating a tendency toward stronger predicted compression under the negative-force convention. Several moment components deteriorate more than normal force. [Tables I and II](https://arxiv.org/html/2609.21726v1#S5).

Those distinctions matter because stopping depends on the crossing of two predictions. Their errors can partially cancel, allowing a useful stopping point even when neither force estimate is individually accurate. Successful closure therefore does not independently validate both estimates. The sensor itself supplies the force reference; the authors report no independent external force/torque calibration.

## How did it perform on physical grasps?

The tests change object identity, grasp placement or internal loading. Each method receives the same upstream arm motion and target grasp configuration; the comparison concerns gripper-closure control. A success requires a 5 cm lift and a secure 2-second hold. [Physical protocol and Table III](https://arxiv.org/html/2609.21726v1#S5).

| Evaluation condition | ZeroTouch | OpenVLA | SmolVLA |
| --- | --- | --- | --- |
| Unseen can | 19/20 | 5/20 | 2/20 |
| Familiar bottle, unseen off-center grasp | 16/20 | 8/20 | 5/20 |
| Water-filled bottle, empty-container training condition | 18/20 | 11/20 | 7/20 |

These results favor ZeroTouch within this protocol. They should not become a ranking of the models' complete vision-language-action capabilities: approach planning is controlled externally, and the paper's protocol does not test general instruction following.

## Limitations, access and engineering relevance

RoboSkin analysis: the valuable separation is between measured training supervision, inferred contact at runtime and the downstream stopping rule. It suggests a way to reuse tactile data when deployment hardware is constrained. The [tactile dataset directory](/datasets) and [calibration guide](/guides/tactile-sensor-calibration) provide context for inspecting those references.

Hidden loading remains a key limitation. A container can look similar while requiring different compression, and the authors explicitly acknowledge that insufficient visual evidence cannot reliably reveal its physical properties. The evaluated objects and load shifts are limited. [Limitations](https://arxiv.org/html/2609.21726v1#S6).

As checked September 21, no project-specific code, checkpoint or dataset download was verified in the paper or arXiv record. The work remains a preprint, and RoboSkin has not reproduced it. For another use of human touch data, compare the distinct action-conditioned experiments in [DexTouch-WM](/research/dextouch-wm-human-touch-world-model-2026); its objective differs from ZeroTouch's grasp-force estimator.

## Sources

- [ZeroTouch arXiv record: September 18, 2026](https://arxiv.org/abs/2609.21726)
- [ZeroTouch v1: methods, tables and limitations](https://arxiv.org/html/2609.21726v1)
