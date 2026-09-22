# TouchSight learns bare-hand touch prediction from glove recordings

TouchSight, a video-based tactile prediction model from Danyan Zhou, Jinxuan Lu and colleagues at Tsinghua University, Xspark AI and collaborating universities, was submitted to arXiv on September 17, 2026. It learns from pressure-glove recordings and generated bare-hand imagery to estimate dense hand contact signals from egocentric RGB video. The accompanying TwinTouch-20H dataset tests how far measured tactile labels can travel when the glove’s visual appearance is removed. [Original paper record](https://arxiv.org/abs/2609.20414).

The distinction is consequential: the model predicts touch at inference, but its training still depends on instrumented recordings. An apparently bare hand in a generated clip is not evidence that its tactile labels were measured from an uninstrumented person.

## Key takeaways

- TwinTouch-20H pairs approximately 10 hours of original glove video with 10 hours of generated bare-hand video; these share measured tactile labels rather than representing 20 independent hours of contact collection.
- The model uses 500 hours of HumanTouch supervision in the paper, while the publicly described initial HumanTouch release is approximately 100 hours. Public files do not establish access to the full training corpus.
- Quantitative force evaluation, geometry-derived contact evaluation and qualitative results on natural bare-hand video are separate tests; none is a demonstrated robot-policy improvement.

## How are the paired videos constructed?

The authors select glove recordings across 52 interaction tasks and 10 scenes, then use Seedance 2.0 to replace glove appearance and vary the background. The original tactile labels are reused for the generated video. Reviewers overlay the original hand at 40% opacity to reject changes in pose, motion, objects or interaction, as well as incomplete glove removal and distorted hands. [Dataset construction, Section III](https://arxiv.org/html/2609.20414v1).

This supplies appearance variation without making a second physical measurement. HumanTouch episodes are split into training, validation and test sets before their generated counterparts inherit those assignments. Keeping each original and its derivative together is important: splitting paired views independently could let essentially the same interaction appear on both sides of evaluation.

For a broader data-selection workflow, see the [tactile dataset directory](/datasets). Treat paired recordings, frames, episodes and hours as distinct units when comparing resources.

## What does TouchSight predict?

TouchSight combines frozen DINOv3 visual features and geometry-aware VGGT features, temporal attention and region queries for fingers and palms. It consumes eight-frame RGB clips and does not require external hand-pose reconstruction at inference. Glove supervision uses 275 trusted taxels per hand: 80 finger taxels and 195 palm taxels. Another 85 physical channels and the layout’s padding are excluded from losses and metrics. [Method and Appendix A](https://arxiv.org/html/2609.20414v1).

Five additional hand–object interaction datasets contribute geometric contact labels, not measured forces. Their contact target marks a hand vertex when an object vertex is within 1 cm. These examples are excluded from the force loss. The model therefore learns from several supervision types; describing every label as a tactile measurement would obscure their origin.

## What do the reported results support?

On generated bare-hand TwinTouch test clips, Table III compares the full model with a version trained without generated visual augmentation. All values below are author-reported. Force-error values follow the paper’s glove-signal scale and must not be relabeled as newtons or kilopascals. [Evaluation definitions and Table III](https://arxiv.org/html/2609.20414v1).

| TwinTouch metric | Without generated augmentation | Full model |
| --- | --- | --- |
| Mean absolute error, lower is better | 1.851 | 1.671 |
| Active-taxel error, lower is better | 12.077 | 10.026 |
| Volumetric intersection-over-union, higher is better | 0.239 | 0.300 |
| Temporal Pearson correlation, higher is better | 0.255 | 0.272 |

The active-taxel metric evaluates locations above five raw glove units. Its larger error matters because averages across inactive regions can conceal weaker prediction where contact actually occurs. Separately, the OakInk2 contact test reports F1 of 0.373 versus 0.329 for HACO, but HACO has higher recall: 0.623 versus 0.311. “Better contact prediction” therefore depends on which metric and error tradeoff matter.

Natural videos from Ego-Exo4D, Ego4D and EgoDex lack measured tactile ground truth in this evaluation. Their visualizations provide qualitative generalization evidence, not a quantitative validation of physical force recovery on arbitrary bare hands.

## What can readers actually download?

The paper’s 500-hour HumanTouch training source, TwinTouch’s 20 hours of paired visual observations and the public HumanTouch subset are three different resources or scopes. SparkLab’s [official HumanTouch page](https://xsparkai.com/sparklab/humantouch/) describes an initial approximately 100-hour release and links ModelScope and Hugging Face.

On September 20, RoboSkin verified a public, ungated [Hugging Face file listing](https://huggingface.co/datasets/chuqiaoLyu/Xspark-HumanTouch/tree/81822a10cac5def2638db546eaeced581d71a8b5) containing Parquet, video and metadata files. Its [pinned README](https://huggingface.co/datasets/chuqiaoLyu/Xspark-HumanTouch/blob/81822a10cac5def2638db546eaeced581d71a8b5/README.md) still describes roughly 100 hours, warns that uploading is ongoing, and lists an AIGC edition as in preparation. The README defers licensing to [ModelScope, whose dataset page displays CC-BY-NC-4.0](https://www.modelscope.cn/datasets/chuqiaoLyu/Xspark-HumanTouch). That noncommercial condition matters for reuse; it does not license unreleased TwinTouch data or model weights. We did not decode the complete payload or independently total its duration.

No dedicated TwinTouch-20H download or TouchSight checkpoint/code release was verified in the paper and linked materials reviewed. The public HumanTouch files should not be presented as the complete 500-hour training set or as a confirmed TwinTouch release.

## Why the distinction matters

RoboSkin analysis: generated appearance may help reuse expensive measured labels, but the resulting predictions need provenance. Store whether each field is measured, geometry-derived, generated or predicted; preserve episode relationships and excluded sensor channels. The [LeRobot format guide](/guides/lerobot-dataset-format) and [tactile calibration guide](/guides/tactile-sensor-calibration) explain useful integration checks without certifying compatibility with this release.

TouchSight remains a preprint. The reviewed study does not demonstrate a robot policy trained on its predictions, and RoboSkin has not reproduced it. Compare [DexTouch-WM’s separate human-to-robot world-model experiments](/research/dextouch-wm-human-touch-world-model-2026) before equating a contact estimator with action-conditioned robot dynamics.

## Sources

- [TouchSight arXiv record, September 17, 2026](https://arxiv.org/abs/2609.20414)
- [TouchSight v1: TwinTouch construction, metrics and appendix](https://arxiv.org/html/2609.20414v1)
- [SparkLab HumanTouch acquisition and release description](https://xsparkai.com/sparklab/humantouch/)
- [HumanTouch public repository at the reviewed revision](https://huggingface.co/datasets/chuqiaoLyu/Xspark-HumanTouch/tree/81822a10cac5def2638db546eaeced581d71a8b5)
- [ModelScope HumanTouch repository and displayed data license](https://www.modelscope.cn/datasets/chuqiaoLyu/Xspark-HumanTouch)
