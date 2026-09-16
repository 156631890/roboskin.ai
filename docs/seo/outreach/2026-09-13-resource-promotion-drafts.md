# RoboSkin 研究资源推广草稿（未发送）

编制日期：2026-09-13。三组材料均为本地草稿。新访问证据及分析目前仅在本分支预览；发布新版后才能对外声称这些改进已上线。没有发送邮件、发帖、提交 PR 或付款。

使用前先查本目录历史 `outreach-log.csv` 和本轮 `2026-09-13-resource-link-tracker.csv`，避免重复提交。已收录的资源不再要求收录；Awesome-Dexterous-Hands PR #1 仍待审；Weekly Robotics 与 IEEE RAS 的历史跟进已发送，继续等待，不再催促。媒体草稿不是对已有编辑承诺的改写或再次投稿。

## 1. 数据集目录：供机器人研究者和开源清单维护者使用

目标：<https://roboskin.ai/datasets>；分析锚点：`#availability-analysis`；机器可读入口：`/datasets.json`。

建议一句话：

> A source-linked tactile robotics dataset directory that separates paper-reported collections, hosted-file evidence, data licenses and reproduction conditions, with stable record links and downloadable comparisons.

可选 README 条目（待审稿，不自动提交）：

```markdown
- [RoboSkin tactile robotics datasets](https://roboskin.ai/datasets) — Cross-project comparison of sensors, tasks, access evidence, dataset-file licenses and split documentation; stable record links, source references and CSV/JSON exports.
```

给维护者的短说明：

> I maintain RoboSkin.ai, an independent research resource. This directory may help readers compare tactile datasets before downloading them. It distinguishes author-reported scale from hosted manifests and identifies unknown data licenses and splits rather than borrowing the code license. The original project and paper remain the primary citation; the directory has a separate citation for its curation. If comparison directories fit your scope, the suggested entry above can sit beside the original datasets. No endorsement or reciprocal link is requested.

证据边界：本轮仅六个托管项目补查元数据与文件清单；未下载完整payload、重算episode/frame/bytes、运行训练或验证硬件。分析分母是目录内记录，不代表整个行业；不要将“public manifest”写成“已完整下载验证”。

## 2. 研究索引：供研究综述、技术编辑和行业媒体使用

目标：<https://roboskin.ai/research-index>；固定引用：<https://github.com/roboskin-ai/tactile-research-index/releases/tag/v2026.08.22>。实际 release URL 以 `src/lib/research-index-release.ts` 为准。

建议一句话：

> A structured tactile research index with source links, explicit evidence boundaries, CSV/JSON exports and a preserved release snapshot for repeatable citation.

编辑简介草稿：

> RoboSkin.ai maintains a source-based index of tactile sensing research. Readers can compare modalities, data outputs, evidence levels and stated limitations, then trace each record back to its primary source. The live directory and a fixed release are identified separately, so an article can cite the version actually used. RoboSkin's public index and sample report are free to read; commissioned services add a defined research question and a source-based comparison, not experimental validation.

媒体选题摘要草稿（独立素材，不自动投递）：

> **What makes a tactile dataset reusable?** A short methodology piece could examine three separately auditable questions: can the files be located, are the data-file reuse terms documented, and are training/evaluation partitions specified? A small RoboSkin directory audit provides a worked example with explicit unknowns and reproducible counts. Its results describe that sample only. The article would link the original projects and explain why file manifests, paper sample counts and validated reproduction are different kinds of evidence.

不要把旧 PDF 的六条样本说成完整索引。数量不写进长期介绍；需要数字时从固定版本/导出复算并附日期。

## 3. ROS 2 tactile starter kit：供工程社区使用

目标：<https://roboskin.ai/guides/ros2-tactile-sensing>；代码：<https://github.com/roboskin-ai/ros2-tactile-starter-kit>。

建议一句话：

> An experimental ROS 2 tactile-array message contract with a deterministic synthetic publisher, monitor and rosbag2 QoS example for discussing inspectable recording and replay.

技术演示说明草稿：

> The demo publishes three normalized channels on a 4 × 4 synthetic tactile grid. The accompanying 2 × 2 CSV is a separate small fixture. A recording walkthrough covers inspecting a message, recording with the supplied QoS settings, stopping the live publisher and checking replay with the monitor. The interface documents timestamps, frame IDs, channel-major layout and a validity mask. It is not an official ROS standard or a commercial sensor driver. Contract checks, a ROS build and real-device verification are reported separately; no unmeasured hardware compatibility, latency or force accuracy is claimed.

演示制作清单：在有 ROS 的环境记录真实终端输出和bag信息，屏幕始终显示“Synthetic data — no physical sensor”；记录commit、ROS/RMW、命令及失败条件。不要用生成的视频或代码推导值冒充实际运行录像。本地kit新增 `docs/demo-verification.md`；本轮只完成四项纯Python合同测试。

## 既有外链本轮核查

- Awesome Robot Learning：README仍有 `/datasets`，外部维护者正式收录；GitHub渲染链接含 `nofollow`。
- Awesome Embodied AI：README仍有ROS指南，外部维护者正式收录；含 `nofollow`。
- Awesome-Dexterous-Hands PR #1：open，未合并，不计正式引用。
- ROS Discourse主题57650：公开社区自发帖，直接指南链接含 `noopener nofollow ugc`；不是媒体编辑背书。
- ROS周报57728：链接到社区帖子，属于间接提及，不计到RoboSkin的直接外链。
- 自有GitHub仓库：资源分发入口，独立标为自有，不计外部编辑收录。

跟踪表是围绕三类资源的重点子集，不是全站外链总表。状态枚举：待准备、已发送、待审、已上线、拒绝、失效；另设“引用类别”和“是否直接链接”，避免混算。
