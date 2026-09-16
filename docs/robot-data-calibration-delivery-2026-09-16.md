# Robot data、LeRobot 与触觉标定本地交付

日期：2026-09-16。项目：`C:\Users\Administrator\roboskin.ai`。
分支：`codex/research-resource-conversion-20260913`；本轮开始 HEAD：`475b4a385ac9514d1404adeb6447c5aa1550f219`。
保留开始时 68 项未提交状态记录及之前的编程成果，没有提交、合并、生产部署、外部 PR 修改或推广发送。

## 页面与搜索意图

| 页面 | 本轮结果 | 关键词与读者需求 |
| --- | --- | --- |
| `/guides/lerobot-dataset-format` | 新增完整教程、源码、合成 Parquet、异常样例、真实 JSON 输出与 ZIP | lerobot dataset format、lerobot dataset v3、robot dataset validation；理解格式并练习有范围的数据检查 |
| `/guides/tactile-sensor-calibration` | 新增 DIGIT/Mini 分设备流程、误差评估、排错和空白记录模板 | tactile sensor calibration、DIGIT calibration、GelSight Mini calibration；选择正确标定目标并记录参考、单位、重复和环境 |
| `/robotics-programming` | 复用原入口，增加 Work with Robot Data / Add Tactile Feedback | robotics programming；从基础编程进入采集、数据处理和触觉反馈 |
| `/guides/python-tactile-data-processing` | 保留已验证项目，补充标定、episode 和采集内链 | Python tactile data processing；处理缺失数据、图与教学接触事件，再理解真实测量和训练格式 |
| `/robot-teleoperation` | 新增 Robot Data Collection 模块与原始 UMI/GELLO 比较 | robot data collection、robot teleoperation；理解采集方式、时钟、失败标签与导出 |
| `/robot-vla-models` | 补充 OpenVLA/OpenPI 数据接口与原始来源；触觉标签改为 Documented / Not documented / Unconfirmed | vision language action models；检查输入、代码、数据条件及触觉证据，保留 foundation-models 分类边界 |
| `/tactile-ai` | 增加从感知到可用学习信号的段落及教程内链 | robotic tactile sensing；把触觉 AI 与标定、质量及学习数据衔接 |
| `/sensors`、`/guides/tactile-sensor-for-robots` | 增加选择后如何标定、处理和评估的入口 | tactile sensing in robotics；从传感器原则进入工程准备 |
| `/tactile-manipulation` | 增加应用试验前的数据准备段落 | tactile sensing in robotics；区分传感故障、数据质量和实际操作结果 |
| `/sensors/digit`、`/sensors/gelsight-mini` | 保留型号页，加入标定记录和数据处理入口 | 原型号用户的工程下一步 |
| `/resources` | 扩展 Programming & Tutorials 分组 | 可抓取入口与教程发现 |

没有新增同义主题页面，没有改写首页核心定位，没有重写无关研究文章。ROS 原教程及其 URL 保留，本轮没有把其未执行的运行步骤改成已验证。

## 主要文件

- `src/content/engineering-pages.ts`：两篇新教程正文、metadata 输入、FAQ、来源和核查日期。
- `src/app/guides/lerobot-dataset-format/page.tsx`、`src/app/guides/tactile-sensor-calibration/page.tsx`：实际路由；LeRobot 页面直接读取下载源码。
- `src/content/programming-pages.ts`：编程两条路线、Python 下一步及保留下载类型的类型调整。
- `src/content/seo-topic-pages.ts`：注册新内容；现有采集、VLA、数据和触觉页的补充段落。
- `src/content/sensor-detail-pages.ts`：DIGIT/Mini 标定入口。
- `src/components/SeoTopicArticle.tsx`：通用正文描述性链接与可键盘聚焦的滚动表格。
- `src/components/VlaModelIndex.tsx`：用证据状态代替含糊的 yes/no 标签，不改变已有研究数据。
- `src/content/site.ts`：Resources 分组。
- `src/components/AnalyticsTracker.tsx`、`src/lib/growth-batches.mjs`：复用现有 Vercel Analytics，覆盖两篇教程及两组下载。
- `config/protected-urls.json`、`tests/url-contract.test.mjs`：新增 URL 及既有编程 URL 契约；不删除既有保护项。开始时清单为 123 项，但测试仍期望 121，本轮同步为 125。
- `public/llms.txt`：增加教程入口。`src/app/sitemap.ts` 沿用按 seoTopicPages 生成的既有实现，无需复制路由表。
- `public/tutorials/lerobot-validation/`：完整 checker、生成器、16 项行为测试、依赖、字段契约、两个 fixture、真实输出、验证记录、许可和 ZIP。
- `public/tutorials/tactile-calibration/`：45 列空白 CSV、字段字典、CC0 许可。
- `scripts/package-lerobot-validation.py`：重新生成、验证并打包下载项目。
- `docs/engineering-source-review-2026-09-16.json`：实际读取来源、日期、字节与哈希。
- `docs/tactile-simulation-reserve-2026-09-16.md`：TacEx 下一阶段选题与版本边界。
- `docs/seo/outreach/2026-09-16-robot-data-calibration-draft.md`：已准备、未发送的英文介绍。

## 示例运行

从教程下载 ZIP 并解压，在该目录的 PowerShell 中运行：

```powershell
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\python.exe -B check_dataset.py fixtures/valid --report results/valid-report.json
.\.venv\Scripts\python.exe -B check_dataset.py fixtures/invalid --report results/invalid-report.json
.\.venv\Scripts\python.exe -B -m unittest -v test_validator
```

验证环境：CPython 3.13.3 / Windows x64 / PyArrow 23.0.1，唯一第三方依赖是 PyArrow。无机器人、传感器、GPU、ROS 或账户要求。

实际有效样例：8 帧、2 episodes、0 errors、1 unknown tactile value，退出码 0。
实际异常样例：8 帧、2 episodes、17 diagnostics，退出码 1（预期）。四个根本缺陷：缺 action、state 维度错误、重复 timestamp、episode endpoint 错误；一个缺陷可能导致多个诊断。
16 项行为测试通过。ZIP 在第二个全新 venv 解压重跑，两份 JSON 与随包输出逐字节一致。

ZIP：20,571 字节；SHA-256：`c6892913c5d9aa8fc519e534f1d2d6ea4070ea2b33d0c6a95ff72b3e9d2661c5`。

校准模板没有测量行，不会将占位数字当作真实实验结果。其 45 个列名不重复，包含参考单位、参考不确定度、计划重复次数、实际重复索引、环境、两类时钟和有效性。

## 验证和证据

- `npm test`：188/188 通过。
- `npm run lint`：通过；VLA 标签最终修改后另做该组件 lint。
- `npx tsc --noEmit`：通过；Next 构建也检查类型。
- `npm run build`：通过，包含两个静态教程路由与 agent Markdown 输出。
- `npm run verify:export`：通过；121 sitemap URLs、125 protected URL entries（含重定向源）、5 noindex URLs 等既有契约通过。
- HTTP 检查：18 个新旧页面、214 个站内链接/锚点、38 个下载文件通过；下载逐字节匹配 public 文件。
- 新教程各有独立 title、description、H1、canonical，进入 sitemap；JSON-LD 为真实 TechArticle/FAQ/Breadcrumb，未把 fixture 标为研究 Dataset。旧发布日期保留，实质修改页更新日期。
- 完整 Python 源码与下载同源；PowerShell 命令反斜线及示例文件名已从导出 HTML 核对。
- 浏览器：1440 px / 390 px 各 10 个相关页面，加 1101 px 导航断点，共 21 组；无 document 水平溢出、无 JavaScript page errors；代码和表格在各自容器内滚动。
- 实际操作：复制按钮显示 Copied；手机导航打开后进入 Resources，再进入标定教程；356 px 表格容器内 580 px 表格可横滚；新增下载与入口事件在现有队列中出现。
- 静态预览的 `/_vercel/insights/script.js` 404 是既有环境限制，未伪装成控制台零输出；本轮只验证事件产生与队列，没有宣称线上入库。

证据位于 `.artifacts/engineering-20260916/`：`sources*.json`、固定代码/页面快照、`build.log`、`npm-test.log`、`preview-audit.json`、`download-verification.json`、`browser-audit.json`、`browser-summary.json`、交互检查及真实截图。`.artifacts` 不属于公开下载。

## 预览

当前静态预览：<http://127.0.0.1:3216>。

- <http://127.0.0.1:3216/guides/lerobot-dataset-format>
- <http://127.0.0.1:3216/guides/tactile-sensor-calibration>
- <http://127.0.0.1:3216/robotics-programming>
- <http://127.0.0.1:3216/robot-teleoperation>
- <http://127.0.0.1:3216/robot-vla-models>

若预览服务关闭：

```powershell
cd C:\Users\Administrator\roboskin.ai
npm run build
$env:PORT='3216'
node scripts/preview-export.mjs
```

该静态服务只用于内容预览，不提交表单或执行生产 API。也可以 `npm run dev -- --port 3217` 在独立端口查看开发版本。

## 明确边界与发布阻塞

本轮内容与代码没有剩余已知发布阻塞，尚未部署、合并或创建提交。发布动作需要另行安排。

以下是页面已经明确披露的验证边界，不应改写成已经完成的实验证据：

- LeRobot：核实 format v3.0 及固定源提交，发现 docs tasks.jsonl 与当前代码 tasks.parquet 的差异。示例只检查小型完整 numeric snapshot；没有官方 loader、video、stats、task 文本映射或策略训练兼容性测试。真实数据需补对应系统验证。
- DIGIT/Mini：无硬件、参考探头/位移装置、负载参考或实际测量；未做重建训练、设备精度或力标定。3D Cal 深度工作不能描述成完整力标定。
- VLA：新增 OpenVLA/OpenPI 模块核查 README 级接口与数据条件，未跑模型训练/推理；其他既有研究条目保留各自核查日期。
- ROS 2：沿用上一轮源/上游构建证据；当前 Windows 未运行发布、订阅、录包、回放，没有伪造终端输出。
- TacEx：只有下一阶段文档，核实的上游组合为 Isaac Sim 4.5 / Isaac Lab 2.1.1 / Python 3.10；没有安装仿真，不推断兼容新版本。
- 未访问 Search Console，缺少搜索表现基线；未以此阻塞实现。真实环境中的 Analytics 事件入库应在发布后确认。

上线后按页面与来源观察：相关搜索曝光/点击、教程访问、教程入口点击、示例下载、订阅成功、研究咨询。复用 Tutorial Visit / Tutorial Open / Tutorial Example Download 和既有订阅咨询事件，通过路径区分两个新教程。按周记录变化和转化率，不预设搜索量、排名或增长承诺。
