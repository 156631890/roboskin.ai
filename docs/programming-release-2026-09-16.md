# Programming and engineering tutorial release

用户于 2026-09-16 明确授权“提交部署”。发布分支为 `codex/programming-release-20260916`，基于当时的 `origin/main`：`dd5b4c52e1b482d4a7fc1d80b3d9cfc9f6bfdb0c`。

本次发布包含前两轮已经交付的 robotics programming、Python 触觉处理、ROS 2 教程升级、LeRobot 格式教程、DIGIT/GelSight Mini 标定流程、下载示例、采集/VLA/传感器上下文链接和 Analytics 事件。

发布树通过工作前快照提取教程改动，不包含原工作区尚未提交的表单、研究报告、目录分析和服务器运行模式变更。原工作区及那些未提交内容保持原样。新建 worktree：`.worktrees/programming-release-20260916`。

集成保留了远端已经上线的两项改动：VLA quick-start、移动端证据布局及其内容/事件批次；Resources 中的 SHYSEMI 链接。没有用旧工作区版本覆盖它们。ROS 教程的目录入口使用现有 `/datasets`，没有链接尚未发布的 availability-analysis 模块。

发布树继续使用原有静态导出配置、表单和订阅行为。这里的验证计数应与原整合工作区的交付记录区别看待：原工作区的 188 项测试包含了 17 项独立表单/资源功能测试；本次发布树包含 171 项，未删除任何原主分支测试。

发布前验证：

- 独立 `npm ci`，`npm test` 171/171，Lint、TypeScript、Next 构建通过。
- `verify:export` 核对 121 sitemap URLs、125 protected URL entries（包含 redirect sources）等现有契约。
- 原始 Python 下载已在干净环境验证；移入发布树的文件逐字节保留。
- HTTP 验证脚本对 18 页、223 个内部链接/锚点、38 个下载文件执行检查，包括 canonical、sitemap、JSON-LD、下载源码同源和 PowerShell 命令。

更详细的正文、数据语义、许可与未完成硬件验证范围见 `robotics-programming-delivery-2026-09-16.md` 和 `robot-data-calibration-delivery-2026-09-16.md`。这两份是原工作区的交付快照；本文件记录实际发布范围。

生产发布使用 Vercel 已关联的 `roboskin-ai` 项目。计划先创建 production-target 构建但暂不分配域名，核验完成后再 promote。生产 URL、部署 ID、提交 SHA 与上线检查另保存在实际部署完成后的本地交接记录中。

生产操作不发送推广邮件、社区帖子或表单测试消息，不修改既有外部 PR。
