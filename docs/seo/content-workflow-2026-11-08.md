# RoboSkin 2026-11-08 内容与关键词更新

模块缺失：无。保留现有 URL、正文、图片、表格、工具、表单、下载和索引规则；新增内容复用现有模板。旧数据集版本快照未覆盖。

状态：`review_pending`。本文件是可审阅内容批次和验证记录，不是人工批准或生产发布证明。

## 范围与基线

- 实际基线：`origin/main` / `a2938e46bbff89572f54d85ecae0212bdbe98e36`。本轮开始时生产 `/deployment.json` 返回同一 SHA。
- 独立工作副本：`C:/Users/Administrator/Projects/roboskin-content-20261108`；分支 `codex/content-workflow-20261108`。未修改主目录未提交工作，也未混入 PR #147。
- 网站是面向英语研究者和工程团队的触觉/机器人研究资源站。本批目标是帮助读者找到论文、判断数据可用性和选择实验方案；观察资源使用与合格研究询盘，不以篇数代替增长。
- 本轮未取得新的 GSC 查询报表、关键词月搜索量或归一化 Trends 对比。公开英语搜索结果没有固定国家/设备过滤，不能代表美国排名。下面是近期研究及搜索意图候选，不声称“高搜索量、低竞争”。

## 完成的页面

| 页面 | 更新内容 | 主要意图与来源日期 |
| --- | --- | --- |
| `/news/tactilelab-shear-sensitive-simulation` | 新增完整研究新闻；说明 tactile flow、接触假设、传感器可观测性与实验检查 | TactileLab / tactile simulation；v1 2026-11-05 |
| `/news/vtam-visuo-tactile-world-action-model` | 新增完整修订解读；区分视频预训练、触觉适配、推理和迁移 | VTAM / visuo-tactile world-action model；v2 2026-11-05，首次提交 03-24 |
| `/news/touchscale-dataset-release-and-robot-learning` | 新增数据集新闻；明确研究总量、公开卡片、访问和许可差异 | TouchScale dataset / access / license；v3 2026-11-02，首次提交 10-07 |
| `/datasets` | 新增 TouchScale 目录记录、release-scope 说明及一致的导出快照；目录由 26 条增至 27 条 | tactile dataset / human visual-tactile data |
| `/robot-world-models` | 新增 VTAM 证据记录与训练/推理契约说明；证据表由 5 条增至 6 条 | tactile world-action model / no tactile pretraining |
| `/tactile-manipulation` | 新增 TactileLab 接触条件、传感器迁移限制与验证方法 | shear-sensitive manipulation / tactile sim-to-real |
| `/research/t-rex-tactile-reactive-dexterous-manipulation-2026` | 在原页补入 Panasonic 11-05 公告与 CoRL 日程；保留原论文、部分得分及公开子集限制 | T-Rex / tactile-reactive manipulation；没有另造重复新闻 URL |

三个新页有独立 title、description、来源日期、证据状态、正文和下一步链接，自动进入 News、RSS、sitemap 与 Markdown 表示。复用站内编辑示意封面，明确不是项目硬件照片或实验结果。

## 关键词到页面的映射

| 关键词簇 | 读者任务 | 主页面决策 |
| --- | --- | --- |
| TactileLab; simulated tactile flow; shear-sensitive tactile simulation | 理解新方法及适用边界 | 新 TactileLab 新闻；长期方法并入 `/tactile-manipulation` |
| tactile sim-to-real; sticking contact; tactile sensor transfer | 判断自己的接触条件是否适用 | `/tactile-manipulation#tactilelab-contact-assumption` |
| VTAM; VTAM v2; visuo-tactile world-action model | 查找修订内容及原始研究 | 新 VTAM 新闻 |
| tactile world model; world-action model inference; tactile pretraining | 比较模型接口与实验成本 | `/robot-world-models`，不拆近义词页面 |
| TouchScale dataset; TouchScale download; TouchScale license | 判断访问、许可和可用范围 | 新 TouchScale 新闻及 `/datasets#dataset-touchscale` |
| human visual-tactile data; tactile dataset for robot learning | 判断观察与动作标签是否满足训练 | `/datasets#touchscale-release-scope` |
| T-Rex; tactile-reactive dexterous manipulation | 追踪官方公告和已有研究 | 更新原 T-Rex 研究页 |
| EmArm whole-arm tactile sensing | 追踪报道日期与论文日期 | 暂不新建；站内已有覆盖，近期二手报道日期不能冒充首次研究发布日期 |

TactileLab 来自本次真实 research:watch 输出，随后查阅全文与官方项目。VTAM 与 TouchScale 的英语 SERP 以论文/研究解读和项目/数据卡为主，分别适合解释和资源使用意图。这是选题依据，不是热度或排名测量。

## 关键事实与核验边界

| ID | 可核验主张 | 原始来源 | 状态/限制 |
| --- | --- | --- | --- |
| TL-1 | TactileLab v1 发布于 11-05；使用接触深度和模拟触觉流 | https://arxiv.org/html/2611.07881v1 | attributed；未运行模拟器 |
| TL-2 | real-to-sim 存在 sticking-contact 假设；markerless GelSight Mini 的流恢复有限 | 同上，VIII-C/D | attributed；不宣称通用滑移鲁棒性 |
| TL-3 | 官方项目仍标 Code Coming soon | https://yijionglin.github.io/tactilelab/ | 11-08 页面核对；不宣称公开可运行代码 |
| VT-1 | VTAM v2 日期为 11-05，初次提交为 03-24；视频预训练与触觉适配不同 | https://arxiv.org/abs/2603.23481v2 | verified metadata / attributed methods |
| VT-2 | 光流代理不是已标定力；编码器迁移不等于完整策略无需适配 | https://arxiv.org/html/2603.23481v2 | 来源解释；不宣称本站复现或通用速度优势 |
| TS-1 | TouchScale v3 为 11-02；500 小时为论文研究总量，且无人类数据动作标签 | https://arxiv.org/html/2610.10288v3 | attributed；没有下载或训练 |
| TS-2 | 公开卡片仍描述 100 小时/15,324 episodes、CC BY-NC 4.0 和访问条件 | https://huggingface.co/datasets/2077AIDataFoundation/TouchScale | 11-08 公共页面真实 GET；不把过期计划当完成 |
| TS-3 | API 返回仓库 SHA `74914cc2e11d0a7f37ddbe5d57db4fe4e14a0a7e` | https://huggingface.co/api/datasets/2077AIDataFoundation/TouchScale | 版本元数据已核对；固定 README raw 返回 401，未取得，不声称 pinned-file inspection |
| TR-1 | Panasonic 11-05 公告说明 CoRL 接受/日程和约 5 Hz / 20 Hz 不同更新路径 | https://news.panasonic.com/global/press/en261105-2 | attributed；未来会期不写成已举行，未新增独立复现主张 |

AI 完成来源整理、草稿及工程检查；没有新增个人测试经历、专家签名或人工审批。公开责任主体沿用真实网站 Editorial Team。来源 HTML 与哈希存于本机 `.artifacts/content-20261108/sources/`，不提交第三方全文。

## 工作流改进

1. 原有四组 submittedDate 查询增加四组 lastUpdatedDate 查询，避免漏掉旧论文的重要修订。
2. 按 arXiv ID 合并并保留最新版本，分列首次发表与更新日期。
3. 从 News/Research 的 primary source 识别站内已有主 URL；背景引用不会被当成该论文的主页面。
4. 数据集、世界模型和触觉模拟标题优先分流到对应资源页；候选不得直接发布。
5. Trends 请求失败或覆盖不完整时标未知；只有完整空响应才写未发现匹配信号。主题匹配数不冒充热度。
6. 维持现有每天 09:17 Asia/Shanghai 和只读权限，没有新增定时器、付费服务或自动发布。每个 fetch/curl 各有 20 秒超时上限，12 个源加间隔的最坏等待约 502 秒，适配原 10 分钟上限。现有 OAuth 凭证缺 workflow scope，因此保留原 YAML 文件，未请求扩大权限。

真实运行：更新前 4/4、更新后 8/8 arXiv 批次成功；US/GB/DE/CA 四个 Trends RSS 都成功，匹配热词为 0。新版输出 30 条去重候选，已验证 TactileLab、VTAM 和 OpenTac 的原页分流。该报告不声称完成跨历史报告去重或穷尽所有新论文。

## 验证与审核状态

- 完整测试：358/358 通过。随后目录契约数字更新对应的 3 项测试通过，既有断言未弱化。
- 构建和 ESLint 通过。C 盘空间不足时仅将本次 `.next`、`out` 缓存放入 E 盘，并补齐缓存目录的依赖解析；未清理其他项目。
- `verify:export` 及 on-page SEO：216 个 sitemap URL、221 个受保护路由契约（含 6 个重定向）、6 个 noindex URL、203 个图谱实体、50 条 RSS 项通过。所有 sitemap 页的 title/description 唯一，H1、canonical、站内目的地和锚点有效。
- 7 个变更正文页面 × 桌面/390px 手机/No-JS，共 21 次浏览器检查通过：正常响应、关键事实/限制可读取、单 H1、无页面水平溢出。已有 content-visibility 区域滚动后检查，没有把脚本中的文字当正文。
- Google Live、Google Indexed、生产新版本验收：待发布后按已有授权检查；没有发出新一轮索引请求。
- 内容人工审核：待完成。当前代码和本地构建均不是生产已更新的证明。

| 发布检查 | 结果 | 证据 |
| --- | --- | --- |
| C01–C04 URL、意图、标题与摘要 | 通过 | 新页全文、最终 HTML 与全站导出检查 |
| C06–C09 内容增量、承诺、事实和结构 | 通过 | 逐页来源/事实边界，资源配套更新 |
| C10–C13 图片、外链、责任与日期 | 通过 | 原有编辑封面及明确说明，版本日期与来源记录 |
| C14、C16 可读取与内链 | 通过 | 21 次浏览器检查、导出与 on-page 审计 |
| C17 数据集筛选、比较与导出 | 通过 | 本机浏览器操作与 JSON 快照一致性检查，见本地证据 |

C05 没有额外项目禁词表；C15 无新增语言版本。质量检查不等于人工内容批准。发布结论：当前版本待人工审核，未合并、未生产发布。

## 观察与后续

批准并上线后，以真实上线日期建立批次。7 天检查发现/索引和资源使用，28 天检查同口径查询曝光、点击、CTR、资源导出及合格询盘；低样本延长观察。新增页无历史查询基线，不能用旧 GSC 数据为其估算收益。后续候选优先验证 LumiTac、Which Physical Tactile Cues Matter 和 OopsieRecover 的完整来源与现有覆盖，未审之前不自动发文。

回退范围：本 PR 的新增记录、附加段落、工作流逻辑及新快照；原页面和旧快照保留，可按本批提交回退。
