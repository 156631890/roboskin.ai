# Agile-WAM pairs fast touch prediction with robot actions

Researchers at the University of California, Davis and Analog Devices introduced Agile-WAM, a tactile world-action model for contact-rich robot control, in a September 17, 2026 arXiv preprint. Led in the author list by Hanchu Zhou and Brendan Lynch, the study tests whether a compact model can generate robot actions while predicting how vision and touch will change. It reports nine simulated tasks and five physical manipulation tasks. [Paper and submission record](https://arxiv.org/abs/2609.20761).

The practical question is how to retain useful contact prediction without the cost of generating full future images. Agile-WAM predicts compact internal representations instead. The results justify examining that design, while inconsistencies between the abstract and tables make the exact evaluation conditions especially important.

## Key takeaways

- Table II reports 62 successful trials out of 100 across five physical tasks, compared with 48/100 for the authors’ tactile-enabled VITA baseline; performance does not improve on every task.
- Vision and touch use different prediction horizons: future vision aligns with the executed action segment, while touch predicts the next frame.
- Table III reports 10.35 ms inference on an RTX 4090, whereas the abstract states 11.9 ms. These are source-reported figures, and neither establishes a complete robot control-loop rate.

## What changes in the model?

A world-action model learns robot actions together with future observations. Agile-WAM combines an RGB image, a tactile observation and robot state into a shared latent representation. A lightweight flow-matching network transforms that representation into action, visual and tactile latents; an action decoder produces the commands. The visual encoder uses an ImageNet-pretrained ResNet-18, so “lightweight” does not mean that every component is trained without prior knowledge. [Method, Section III](https://arxiv.org/html/2609.20761v1).

The model predicts 16 actions and executes eight before replanning. Visual prediction targets the longer, eight-step horizon, while tactile prediction targets the next frame. The authors’ rationale is that adjacent images can be nearly identical even when contact changes abruptly. This is different from rendering a photorealistic future video or independently proving that an action is safe.

For the larger architectural context, see RoboSkin’s [visuo-tactile world-model comparison](/guides/visuo-tactile-world-models-robot-manipulation). Its planning and transfer distinctions also apply here.

## What happened on the physical robot?

The physical experiments use a seven-degree-of-freedom Flexiv Rizon 4, an Intel RealSense D405 wrist camera and an Analog Devices 32 × 32 piezoresistive pressure sensor on the gripper. Vision and tactile acquisition are reported at 30 Hz. Each task has 50 teleoperated training demonstrations and 20 evaluation episodes per policy. These physical pressure observations should not be confused with the simulation benchmark’s 10 × 14 × 3 tactile force field. [Experimental setup and Table II](https://arxiv.org/html/2609.20761v1).

| Physical task | Agile-WAM | VITA-VT tactile baseline |
| --- | --- | --- |
| Gear assembly | 16/20 | 11/20 |
| Peg insertion | 11/20 | 12/20 |
| Power-plug insertion | 13/20 | 7/20 |
| Ethernet-cable insertion | 6/20 | 3/20 |
| Ethernet-cable unplugging | 17/20 | 15/20 |

Summing the table gives 62/100 versus 48/100: a 14-percentage-point difference, or approximately 29.2% relative improvement. The abstract instead states 29.4%; the displayed integer counts do not reproduce that exact percentage. RoboSkin reports the counts so readers can inspect the denominator. These small task cohorts do not establish a population-wide reliability improvement.

Peg insertion is a counterexample to an across-the-board gain: VITA-VT scores one additional success. Ethernet insertion remains difficult, with Agile-WAM succeeding in six of 20 trials. The simulation protocol also selects the highest success rate reached during training and averages across three seeds, which should be retained when comparing it with a fixed-checkpoint evaluation.

## How fast is it, and what does latency include?

Table III reports 10.35 ± 0.14 ms from observation input to action generation on one NVIDIA RTX 4090, using FP32, batch size one, a 16-action output and an average over 50 runs. The flow models use six integration steps; the diffusion baselines use 100 denoising steps. A speed comparison therefore includes different sampling budgets. [Inference protocol, Section IV-B2](https://arxiv.org/html/2609.20761v1).

The abstract and official project page instead quote 11.9 ms. The reviewed materials do not reconcile the two values, so this article does not select one as an independently verified measurement. The table’s 96.62 Hz figure is an inference-supported maximum, not a demonstrated rate for sensing, transport, actuation and feedback together. The physical sensors operate at 30 Hz, and eight actions are executed per plan.

## Why it matters for engineering

RoboSkin analysis: the useful idea is to match prediction horizons to each signal’s dynamics, rather than assume vision and pressure need identical timing. A reproduction should measure sensor-to-command latency, action timing and failure recovery together. The [ROS 2 tactile integration guide](/guides/ros2-tactile-sensing) explains the timestamp and transport checks that model-only timing leaves out.

The same analysis argues against assuming edge-device readiness from an RTX 4090 result. Performance on an embedded processor, unseen sensors or different contact materials remains a separate question.

## Limitations and availability

As checked on September 20, the [official project](https://hanchuzhou.github.io/TARO_project_page/) shows task demonstrations and labels its code “coming soon.” No linked checkpoint or experiment-dataset download was verified there. The arXiv record does not state peer-reviewed acceptance. RoboSkin reviewed the paper and project, but did not run the model or reproduce any robot trials.

Use the [benchmark directory](/benchmarks) to compare protocols and the [tactile sensor guide](/sensors) to check hardware assumptions. The cover is an original explanatory diagram, not an experimental image.

## Sources

- [Agile-WAM arXiv record, submitted September 17, 2026](https://arxiv.org/abs/2609.20761)
- [Agile-WAM v1: methods, task counts and inference table](https://arxiv.org/html/2609.20761v1)
- [Official project: demonstrations and code status](https://hanchuzhou.github.io/TARO_project_page/)
