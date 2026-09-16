# RoboSkin 研究资源与转化改进交付记录

日期：2026-09-13。工作分支：`codex/research-resource-conversion-20260913`，起点 `475b4a385ac9514d1404adeb6447c5aa1550f219`。修改保留在工作区，未提交、推送、合并或部署生产。项目根目录没有单独的 AGENTS.md，沿用用户目录规则。整合过程中保留了同任务另一线程的表单实现，并协调其暂停继续写入；整合前快照位于 `output/resource-audit-current-task/`。

## 实际改动与主要文件

| 目标 | 已完成 | 主要文件 |
| --- | --- | --- |
| 真实咨询反馈 | 两种咨询表单共用校验和回执识别；HTTP 200本身不算成功；失败保留输入，直接联系需读者自己发送 | `src/lib/form-delivery.mjs`、`ContactForm.tsx`、`CommercialInquiryForm.tsx` |
| 可测试订阅/API | 可选Next服务器表单、Buttondown待确认状态、重复不改状态、Turnstile、同源/体积/蜜罐/短期限流；缺配置503 | `next.config.ts`、`src/lib/form-handlers.mjs`、`src/app/api/{contact,newsletter}/route.ts`、`NewsletterApiForm.tsx`、`AntiSpamChallenge.tsx` |
| 静态模式复用 | 默认仍为静态导出；复用FormSubmit及原Buttondown原生表单；未验证配置保持关闭 | `NewsletterSignup.tsx`、`src/lib/newsletter-config.mjs`、`scripts/generate-agent-markdown.mjs`、`scripts/verify-export.mjs` |
| 定位及转化 | 首页/About/Contact/Services统一独立公开资料+付费来源研究；目录顶部及文章增加轻量入口 | `ResearchResourceActions.tsx`、四个页面、`src/content/site.ts`、`src/app/globals.css` |
| 目录可引用性 | 19条现有记录补充访问、许可、公开文件清单、核查范围、split证据；区分原始来源与目录引用；CSV追加证据列 | `src/lib/dataset-evidence.mjs`、`dataset-tools.mjs`、`TactileDatasetExplorer.tsx` |
| 可复算分析 | 原/datasets内增加分析、未知清单、变更记录、JSON和固定审计快照 | `DatasetAvailabilityAnalysis.tsx`、`src/app/datasets.json/route.ts`、`public/releases/datasets/v2026.09.13.json` |
| 固定/实时范围 | 索引与旧版30条逐字段一致，保留v2026.08.22；旧CSV/JSON字节保留；PDF六条样本固定不覆盖 | `src/lib/research-index-release.ts`、索引页/JSON路由、`public/releases/research-index/`、`src/content/sample-report-2026.json`、PDF生成器及样本页 |
| 内容与搜索 | 匹配文章链接到数据集具体记录；ROS2指南补合成录回流程；清理两篇正文中的AdSense写作措辞；区分页面更新时间与来源核查日期 | `src/app/research/[id]/page.tsx`、`src/content/seo-topic-pages.ts`、`src/lib/blog-data.ts`、`src/lib/seo.ts` |
| 锚点修复 | 数据集目录关闭其说明区的content-visibility延迟布局，避免长页面片段链接因高度改变跳偏 | `SeoTopicArticle.tsx`、`src/app/globals.css` |

样本页现在分别说明：固定PDF含6条数据集、6个研究信号、17个独立来源URL；当前目录有19条，页面预览只展示其中4条。三个范围由相应结构化数组生成。

## 保留并复用的既有功能

没有新建重复目录或增加条目数量。数据集原有筛选、最多三条比较、锚点、CSV、引用复制、原始下载链接和许可说明继续使用。研究索引原有CSV/JSON、版本引用、Research Services、免费PDF、RSS、事件分析继续使用。原始Dataset作者未知时没有用RoboSkin冒充creator；目录整理者单独标记。

## 分析范围与结果

`/datasets#availability-analysis`的统计直接来自19条当前目录记录及其补充证据。编制日是2026-09-13，各记录另有实际核查日，旧科学来源review日期未批量改写。

- 5条列出公开文件清单；1条需要托管方访问授权；4条为已宣布但未核实发布；6条存在入口但访问未核实；3条未知。
- 7条有数据集专属许可说明，12条未知；论文或代码许可证不能代替数据文件条款。
- 1条列出划分文件，1条描述划分协议/工具，17条划分证据未知；没有验证划分成员、泄漏或训练复现。
- 本轮新查6个Hugging Face官方元数据/manifest及revision。未下载payload、重算episode/frame/bytes、检查完整性或跑训练。文件路径数量包括元数据，不能当作样本数量。

这是一份选定目录的证据覆盖分析，不是行业比例，也不把unknown当成“不公开/不许可”。JSON含原记录、补充证据、统计及固定快照链接，可复算。

Search Console只读基线：2026-08-14至2026-09-10，Web搜索，所有国家与设备，175次点击、25,977次曝光；/datasets为4次点击/1,967次曝光，/research-index为4次点击/950次曝光。这说明本次目标已有曝光；是修改前基线，不是本地改动带来的提升。

## 最终验证

- `npm test`：187/187通过；新增测试覆盖真实源码的mock回执、拒绝、重复、挑战/限流、缺配置、固定资产一致性与报告范围。没有真实邮件。
- `npm run lint`、`npx tsc --noEmit`、默认静态 `npm run build` 通过。
- 可选server模式构建通过；本机Next服务实际POST `/api/contact`与`/api/newsletter`均返回503和`ok:false`（配置未开）。已停止server测试进程。最后恢复静态构建。
- `npm run verify:export`通过：117条sitemap URL、121条受保护URL契约（含5条重定向源）、5条noindex URL、191个图谱实体、30条索引记录、50个RSS项目。
- 本轮20个页面/资产HTTP检查、581个站内链接/锚点检查均无失败；含canonical、index/robots、目录和索引导出、历史快照及PDF。
- 浏览器检查1440×900与390×844的核心页面；没有新控制台错误、页面横向溢出或破图。数据大表保留容器内横向滚动，手机比较使用卡片。
- 实测查询、空结果、重置、传感器筛选、3条比较上限和筛选后选择保留、两种引用剪贴板内容。比较CSV实际下载到本机，核对三条ID、名称及证据列。浏览器下载事件监听超时，但文件存在且内容验证通过，没有重复点击下载。
- 两种联系表单在本地缺配置时明确未发送并保留输入；无效邮箱被阻止。订阅关闭区没有邮箱输入框。成功/失败服务商分支用mock测试，未向真实收件箱发测试垃圾。
- 手机锚点回归验证：分析锚点及从研究文章进入UniVTAC记录锚点均出现在可见区域，修复前的大幅定位偏移已消除。

日志在 `.artifacts/resource-*.log`、`.artifacts/resource-link-checks.json`。浏览器视口与减弱动画模拟在检查完成后恢复。

## 预览

```bash
node scripts/preview-export.mjs
```

本轮预览运行在 <http://127.0.0.1:3213/datasets>。可查看 `/datasets#availability-analysis`、`/research-index`、`/research-services`、`/contact`和`/reports/tactile-ai-robot-skin-landscape-2026`。预览只监听本机，POST返回405；它不会发送表单。

## 尚缺依赖

详见 [表单配置说明](research-resource-forms.md)。Buttondown账号仍在人工审核；原生表单的真实确认/退订验证及三项公开配置未就绪，因此订阅仍未开放。服务器方案还需要Buttondown API key、Turnstile配置、精确Origin及真实联系转发服务。现有FormSubmit生产收件效果本轮未重测。

服务器模式是本地可测试代码，不等于托管迁移已完成。未来启用前需要独立预览验证现有Vercel静态路由、Markdown/robots生成资产与API POST路由的配合。本轮没有改生产部署策略。

## 外链草稿与starter kit

- [三类推广草稿](seo/outreach/2026-09-13-resource-promotion-drafts.md)
- [分类外链跟踪CSV](seo/outreach/2026-09-13-resource-link-tracker.csv)
- [公开链接属性证据](seo/outreach/2026-09-13-public-link-evidence.json)

Awesome Robot Learning与Awesome Embodied AI现有正式收录已核对；Dexterous Hands PR仍待审；ROS社区帖是UGC，周报是间接提及；自有仓库分别列出。历史邮件状态沿用其最近证据并明确本轮未重读邮箱，没有把已发送邮件算已获得引用。没有外联动作。

另一个现有checkout `C:/Users/Administrator/roboskin-ros2-tactile-starter-kit`修复了README录包路径，并新增`docs/demo-verification.md`。4项纯Python合同测试通过。说明明确2×2合成CSV与4×4合成publisher的差别；没有运行ROS、colcon或硬件，未声称设备兼容性和实测性能。该仓库修改也保留在工作区，未推送。
