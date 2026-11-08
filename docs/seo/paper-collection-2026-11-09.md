# RoboSkin 论文收录扩充：2026-11-09

模块缺失：无。保留原论文阅读方法、研究分流、旧解读、图片、FAQ、来源和链接。状态为 `review_pending`，没有人工批准、合并或生产发布。

## 交付范围

- 主页面：`/research/robot-skin-papers`，在既有页面增加 13 条带原始来源的收录记录；不是新增 13 篇新闻，也不是改写旧研究索引的版本化数据集。
- `/research` 的既有入口改为“Recent papers and lab sources”，便于发现。
- 9 条近期论文/修订记录，2 条近期出版或录用信息，2 条明确分开的较早机构资料。
- 每条保留作者或首作者、来源所列机构、论文日期、修订/公告日期、发表状态、研究用途、限制、原文及适用的站内解读。
- 英语读者关键词：recent tactile robotics papers、robot skin papers、LumiTac、ToFTouch、physical tactile cues、tactile simulation、visual-tactile learning。这里是主题与阅读意图映射，不是搜索量排名。

## 当前版本与事实口径

本轮开始时 PR #148 head 为 `5dd871582d90eab99971ec03cb49fd965331f423`，main 与生产 `/deployment.json` 均为 `a2938e46bbff89572f54d85ecae0212bdbe98e36`。隔离 checkout 为 `C:/Users/Administrator/Projects/roboskin-content-20261108`；前一轮 3 篇新闻和资源页改动保留。

检索截止为北京时间 2026-11-09；该日对应的部分请求时间仍是 UTC 2026-11-08。通过公开搜索、arXiv 原始记录/全文、实验室官网、机构出版库和出版社页面发现并核对。没有声称穷尽全网、覆盖全部实验室、机构权威排行榜或完成实验复现。

| 收录 | 首次日期与本轮关注事件 | 来源状态与关键边界 |
| --- | --- | --- |
| TactileLab | 2026-11-05 v1 | 预印本；全文和官方项目；流映射假设、代码 coming soon；论文机构表与项目机构表分别核对 |
| VTAM | 2026-03-24；2026-11-05 v2 | 预印本；视频预训练、任务适配、触觉编码器迁移分开 |
| OpenTac | 2026-10-22；2026-11-05 v2 | 核对当前版本元数据和官方项目；旧站内详解仍是 v1/October commit；CoRL demo 不推断为论文录用 |
| Which Physical Tactile Cues Matter… | 2026-11-04 v1 | arXiv 作者备注称 ROBIO 2026 accepted；未独立核实 proceedings。全文 Table I 每方法 90 次、总共 720 次跨八配置，不混用分母 |
| LumiTac | 2026-11-04 v1 | NUS 预印本；全文区分约 304 Hz 更新、0.722 ms 软件处理与模拟/实物演示 |
| PanoTac | 2026-11-02 v1 | NYU/CUNY/Columbia 预印本；读过全文，链接既有分析；密集表示不等于逐点标定三轴力 |
| ToFTouch | 2026-11-02 v1 | Amazon Robotics/Columbia 预印本；全文标题有前缀而 abstract 元数据没有；接近感知与接触测量分开 |
| TouchScale | 2026-10-07；2026-11-02 v3 | 预印本；全文及前一轮数据卡核验；论文 500h 与 11-08 卡片100h分开；机构是作者单位而非各机构背书 |
| VisTacAlign | 2026-09-25；2026-10-13 v2 | 新核对 v2 全文/力比例原始单位与局限；ETH/Stanford；旧新闻明确 v1，不冒充已修订全文 |
| Tactile-Based Robotic Manipulation… | 2026-10-21 提前在线 | UIUC；Annual Reviews 官方 metadata/abstract；in press，版权年2027不替代上线日期；未取得订阅全文 |
| T-Rex | 2026-06-15；2026-11-05 官方公告 | Panasonic 公告报告 CoRL accepted；不声称公告是新论文；保留任务部分得分及数据子集边界 |
| TensorTouch | 2025-06-09 v1 | Stanford/UPenn；ARM Lab 当前列 IEEE T-RO；只核对原摘要、项目和机构列表，IEEE 页未提供可用正文；明确非11月新论文 |
| Brain-Aligned Tactile Representations… | 2026-06 | CMU 官方硕士论文库，CMU-RI-TR-26-65；仅元数据/摘要核验，不标成同行评审会议论文 |

原始链接及逐条可审阅正文位于 `src/content/recent-tactile-papers.ts`，直接生成页面小节。出版机构页面、原始论文、官方实验室资料为证据；搜索聚合站只作为发现线索，不作为论文结果的依据。

## 质量与验证

- Next.js 构建、ESLint 通过；29 项相关既有测试通过，没有为文案新增镜像测试。
- `npm run verify:export` 通过：216 sitemap URL、221 路由契约（含6个重定向）、6 noindex、203图谱实体、30个既有结构化研究索引记录、50条RSS。标题/描述唯一，H1、canonical、内链及锚点通过。
- 13 条记录在桌面、390px手机、No-JS三种视图逐条可见，39次记录可见性断言通过；原有 claim-trace 小节存在，页面无水平溢出。Agent已查看桌面/手机截图核对排版；不是人工内容批准。
- 最终 HTTP HTML 与生成 Markdown 均包含所有13个完整标题；元数据、正文、schema、Markdown保存为待审快照。
- 23 个外部来源链接中22个直接GET返回200；Annual Reviews直接GET返回403，但网页检索工具成功读取官方页面的作者、在线日期、in-press状态和摘要。未绕过访问控制，也未声称取得全文。
- 额外运行的旧脚本 `scripts/check-seo-topic-pages.mjs` 报 `/applications/humanoid-robot-skin` 缺失：它只在单个源文件中搜索路径文字，未加载分拆内容模块；基线同样没有该路径字面量。该脚本不在当前CI内。本轮未修改它或相关旧路由；真实构建导出与当前SEO测试通过。最终远端全量验证以 PR 当前head checks为准。

证据目录：`E:/codex-builds/roboskin-content-20261108/collection-20261109/`。含来源响应和哈希、链接状态、构建/测试/导出日志、三视图结果、截图、实际HTML审核快照。第三方全文只保存在本机，没有提交到仓库或镜像到站点。快照摘要见 `paper-collection-2026-11-09-snapshot.json`。

| 发布前检查 | 结果 | 依据 |
| --- | --- | --- |
| C01–C04 URL、意图、标题和摘要 | 通过 | 既有单一研究入口；构建输出和元数据检查 |
| C06–C09 内容增量、承诺、事实和结构 | 通过 | 13条事实范围清晰的文献记录；日期与来源分开；无全网穷尽或权威排名承诺 |
| C10–C13 媒体、外链、责任与日期 | 通过 | 原示意图片保留；原始链接逐条核验；Editorial Team与更新日期可见；不是冒充实验结果 |
| C14、C16 可读取、索引和内链 | 通过 | HTML、桌面、手机、No-JS及Markdown；全站导出SEO检查 |

C05无新增项目禁词表；C15无新增语言版本；C17无新增工具、交易、下载或表单功能。Google Live、Google Indexed、生产新内容验收未执行，未发出新索引提交。技术通过不代表人工审核、生产发布、搜索收录或流量增长。

## 后续内容工作流

优先保持本页的作者/机构、源版本、发表状态可追溯。新论文、旧论文修订、论文录用、代码/数据公开是四种不同事件；已有论文复用原canonical解读。下一批可围绕LumiTac的完整时序链、ToFTouch接近/接触边界、上海科技大学对照实验设计深化，但需重新核对全文和长期资源页，不把本索引自动复制成多篇新闻。

保留原定时研究巡检；没有新增调度、付费检索或自动发布。人工审批仍待完成，本次用户要求扩充论文收录，不作为对前一版内容的隐含批准。
