# Robotics Programming 本地交付记录

记录日期：2026-09-16。目标来源：当前用户会话，未提供单独任务 ID。

- 实际目录：`C:\Users\Administrator\roboskin.ai`
- 分支：`codex/research-resource-conversion-20260913`
- HEAD：`475b4a385ac9514d1404adeb6447c5aa1550f219`
- 开始时已有 49 项未提交改动，已保留。本次继续在原工作区做范围内增量修改；没有提交、合并、推送或生产部署。
- 本轮触及的既有文件快照与开始状态保存在 `.artifacts/programming-20260916/before/` 和 `status-before.txt`。
- 当前本地预览：<http://127.0.0.1:3216/robotics-programming>，预览进程 PID 25160。进程状态需在后续会话重新核对。

## 检查结论与数据来源

| 检查项 | 实际数据来源 / 本轮处理 |
| --- | --- |
| `/resources` | `src/app/resources/page.tsx` 读取 `src/content/site.ts` 的 resourceSections 和 seoTopicPages；增加 Programming & Tutorials 分组。 |
| `/ai-robotics` | SeoTopicArticle + `seo-topic-pages.ts`；只加编程学习入口，不重写正文。 |
| `/robot-learning` | 同一主题内容系统；保留现有内容，三页教程链接到它。 |
| `/datasets` | 主题内容、`tactile-datasets.ts`、现有数据集浏览器和可用性分析；只增加读取与质量检查教程入口。 |
| 原 ROS 2 教程 | 已存在的概念页；保留 URL，替换为基于真实 starter-kit 代码的版本化操作教程。 |
| 首页与导航 | `src/app/page.tsx`、`site.ts`、Navigation；保留核心标题，新增轻量卡片和 Resources 导航入口。 |
| sitemap | `src/app/sitemap.ts` 遍历 seoTopicPages；复用机制，无重复 sitemap 条目。补充 protected-urls 校验契约。 |
| 同类内容 | 源码检索未发现承担相同搜索意图的 robotics programming / robot programming / Python robotics 总览或 Python 实践页面。近义词集中于一个总览。 |

## 页面与文件

新增页面：

- `/robotics-programming` → `src/app/robotics-programming/page.tsx`
- `/guides/python-tactile-data-processing` → `src/app/guides/python-tactile-data-processing/page.tsx`

升级页面：`/guides/ros2-tactile-sensing`，文件为原路由的 `page.tsx`。

新增实现：

- `src/content/programming-pages.ts`：三页英文内容、命令、字段说明、FAQ、来源和验证范围。
- `src/components/ProgrammingArticle.tsx`：可直接读取的正文、目录、表格、图片、下载和下一步入口；复用现有 SEO / JSON-LD 生成器，并使面包屑与可见导航一致。
- `src/components/CodeBlock.tsx`：代码复制、成功状态和失败后的手工复制提示。
- `src/components/programming.css`：沿用品牌的教程阅读布局；手机代码块与表格内部滚动。
- `public/tutorials/python-tactile/`：完整示例及 17 个可下载文件，详见该目录 README。
- `scripts/package-python-tactile.py`：将明确列出的 16 个交付文件打包为 ZIP，排除缓存和虚拟环境。
- `docs/seo/outreach/2026-09-16-programming-tutorial-draft.md`：英文介绍、素材说明和历史外联去重记录。

修改的配套文件：

- `src/content/seo-topic-pages.ts`：接入新内容模块；原 ROS 条目迁入该模块，保留唯一 URL；增加 AI Robotics 内链。
- `src/content/site.ts`：Resources 分组和主导航 Resources 入口。
- `src/app/resources/page.tsx`：分组锚点，并避免在后续主题列表重复展示三页教程。
- `src/app/page.tsx`：轻量教程卡片；已按首页浅色背景修正文字对比度。
- `src/app/datasets/page.tsx`：Python 读取与质量检查入口。
- `src/components/AnalyticsTracker.tsx`：教程访问、入口点击、下载事件；修正首次访问时队列尚未初始化导致漏记的问题，仍使用同一 Vercel Analytics 队列和脚本。
- `src/lib/growth-batches.mjs`：教程归入 `programming-2026-09-16`，现有阅读深度与订阅归因可复用。
- `public/llms.txt`、`config/protected-urls.json`：补充发现入口及新 URL 校验契约。
- `tests/growth-next-actions.test.mjs`、`tests/navigation.test.mjs`：更新既有测试的内容来源与导航契约。
- `tests/referral-landing.test.mjs`：增加教程访问在重复 effect 下去重、返回页面再次计数的行为测试。

正文没有趋势爆发、搜索量、关键词难度、排名或增长预测。沿用站点编辑团队身份，没有把第三方研究作者当成教程作者。原 ROS 条目没有可信 datePublished 字段，因此没有根据 Git 创建时间猜测发布日期；新页也没有提前声称已在生产发布。三页实质内容更新日期为 2026-09-16，已有研究文章日期未刷新。

## Python 运行与验证

下载包：`public/tutorials/python-tactile/python-tactile-project.zip`，88,621 字节。
SHA-256：`0c80711c18a0dd331c0a3be7f2fc4aa853a6415a31e26441f83d10931541a097`。

在解压后的 `python-tactile` 目录，用 PowerShell 运行：

```powershell
python -m venv .venv
.venv\Scripts\python.exe -m pip install -r requirements-lock.txt
.venv\Scripts\python.exe process_tactile.py --input synthetic_tactile.csv --output results --threshold 0.6
.venv\Scripts\python.exe -m unittest discover -s . -p "test_*.py" -v
```

已在 Windows x64、CPython 3.13.3、Matplotlib 3.10.6、NumPy 2.5.3 上验证。第一次新建虚拟环境安装最小依赖并生成 lock；最终 ZIP 解压到独立目录后再次建立干净虚拟环境，用 lock 安装并完整复跑。

实际结果：12 帧、3 段教学接触事件、3 帧 unknown；45 个 usable 单元、1 个 invalid_flag、1 个 missing_taxel、1 个 missing_value。12 项行为测试通过。CSV / JSON / PNG 六个结果文件在第二次运行中全部与包内参考结果逐字节一致。浏览器实际点击下载所得 ZIP 也与源包逐字节一致。

无效或缺失值保留为 unknown；有效的零仍是零。raw_value 与 source_valid 保留，usable_value 对未知值留空。未知帧和过大的时间间隔切分事件，并标出边界未被观测到的情况。0.6 是教学阈值，不是经过硬件标定的接触检测算法。

数据为独立构造的 2 × 2 时间序列，明确区别于 starter kit 的单帧 CSV 和默认 4 × 4 ROS 发布器。代码及原始文档 Apache-2.0；独立合成 CSV 与原始生成结果 CC0-1.0。没有提供或宣称 CSV-to-ROS 适配器。

## ROS 2 验证边界

已访问并克隆 <https://github.com/roboskin-ai/ros2-tactile-starter-kit>，固定提交 `7bf81d2575e3ef4b62034f4771daf948033b4d76`。

- 读取实际 msg、package.xml、setup.py、publisher、monitor、launch、QoS、样例和许可。
- 本地 4 项依赖无关 contract tests 与 Python compileall 通过。
- 核实 GitHub Actions 运行 `32648006098`：同一提交在 `osrf/ros:lyrical-desktop` 中依赖安装、colcon 构建、接口检查成功。
- 从官方镜像 Dockerfile 核对 Ubuntu Resolute，并从 ROS 官方文档源码及 Lyrical CLI 源码核对安装入口、`--topics`、`--once` 与录包／回放 QoS 参数。
- 修正 README 中示例录包路径与实际克隆目录名不一致的问题；网站使用 `src/ros2-tactile-starter-kit/...`。

目标组合为 Ubuntu 26.04 / ROS 2 Lyrical。当前 Windows 没有 ROS 2、Docker 或已安装的 WSL 发行版，因此本地安装、colcon、实际发布／订阅、录包与回放未执行。上游 CI 没有覆盖发布、录包和回放。教程明确区分这两类证据，没有假造 ROS 消息输出、终端截图、延迟、传感器或执行器结果。

下一步若需完成 ROS 实测：在该组合的独立环境按教程运行，保存原始启动／监测输出、`ros2 bag info` 与回放证据，再更新验证段落。硬件驱动、标定、控制和商业传感器兼容性不在本轮范围。

## 网站验收证据

证据目录：`.artifacts/programming-20260916/`。

| 检查 | 结果 / 文件 |
| --- | --- |
| 改动前既有测试 | 187/187，`site-tests-baseline.log` |
| 最终测试 | 188/188，`site-tests-final.log` |
| ESLint | 通过，`lint-final.log` |
| 独立 TypeScript 检查 | `npx tsc --noEmit` 通过，`typecheck-final.log` |
| 最后一次构建 | 成功并包含 Next.js 类型和 lint 检查；生成 143 个静态构建条目和 128 份 agent Markdown，`build-final.log` |
| 导出校验 | 119 sitemap URL、123 URL 契约记录（含 5 个重定向源）通过，`export-verification.log` |
| HTTP / 文件一致性 | 8 个相关页面、71 个内链／锚点、17 个下载；canonical、JSON-LD、站点地图唯一性和正文完整脚本一致性通过，`preview-audit.json` |
| 浏览器 | 1440 px / 390 px 的 8 页，以及 1101 px 导航断点，共 17 组检查，无页面横向溢出、导航重叠或 JS 页面异常，`browser-audit.json` |
| 手机交互 | 复制成功状态、表格键盘横向滚动、移动菜单 Escape 关闭及焦点返回通过；下载实际落盘并核对 hash |
| Analytics | 实际观察到 Tutorial Visit、Tutorial Open、Tutorial Example Download 与 Reading Depth 队列事件；`copy-and-events.json` |

本地静态预览的 `/_vercel/insights/script.js` 返回 404，是首页和现有页面同样存在的 Vercel 托管端点缺失；没有将它隐藏或声称线上统计已入库。首次教程访问事件的排队已验证，远端入库需要上线后检查。浏览器自动化不允许读取剪贴板，因此以原生写入成功后的 Copied 状态验证复制；没有读取系统剪贴板。

实际截图包括：`overview-1440.png`、`overview-390.png`、`python-1440.png`、`python-390.png`、`ros2-1440.png`、`ros2-390.png`、`python-mobile-code.png`、`python-mobile-plot.png`、`home-tutorial-card-desktop.png`、`home-tutorial-card-mobile.png`、`resources-tutorials-desktop.png`、`datasets-tutorial-mobile.png`。

## 本地预览与后续观察

若预览进程已退出，在项目根目录运行：

```powershell
npm run build
$env:PORT = '3216'
node scripts/preview-export.mjs
```

- <http://127.0.0.1:3216/robotics-programming>
- <http://127.0.0.1:3216/guides/python-tactile-data-processing>
- <http://127.0.0.1:3216/guides/ros2-tactile-sensing>

上线后按周观察，不预设排名或流量承诺：

1. Search Console：三个 URL 的收录、相关查询曝光、点击、CTR；把同名无关查询分开分析。
2. 现有 Vercel Analytics：页面浏览量、Tutorial Visit、Tutorial Open、Reading Depth，按路径、来源和设备区分。
3. Tutorial Example Download：区分 ZIP、脚本、CSV 和结果文件点击；这是下载意图事件，不等于完整下载或成功运行。
4. 复用现有 Newsletter Subscribe Attempt / Newsletter Request Accepted / Provider Handoff 等事件；以实际配置和 provider 结果区分提交、接收与订阅确认。本地预览没有为本轮另行启用订阅服务。
5. 现有 Contact Intent、Submit Source Intent、Contact Form Success 等咨询路径；不要把入口点击当成成功咨询。

外联只准备英文材料。已核对本地历史台账；没有发送消息、重复推广或修改既有待审 PR。生产发布和进一步 ROS 运行环境准备仍需后续任务明确安排。
