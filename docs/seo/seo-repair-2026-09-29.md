# RoboSkin 最小 SEO 修复验收，2026-09-29

原始审查基线和首次修改前重新核对的 `main`：`adc5075c9d7dba3eb75c1636e83a670437abb2b0`。在独立检出目录和 `codex/seo-budgets-schema-20260929` 分支完成；未改动此前工作区或覆盖其他未提交工作。提交前 main 新增了四篇 9 月 29 日 News，已无冲突同步至最新 `9e07e4ef76bceb74abe30af6641409168ec7ec47`，并重新完成 Node 22 全套门槛。

## 结论与范围

原始基线的 161 页构建输出复现历史 **49 个超长标题、27 个超长描述，涉及 66 个 URL**。逐项编辑后均为 **0**；长度例外清单为空。同步最新 main 后的 165 个 sitemap 页面也全部通过，新增四篇 News 无长度问题。共用 schema 的 **11 类规则问题、8 个构建器根因、45 个 URL、209 处错误字段实例**均已修复。

只改 SEO 字段、共享元数据／schema 生成与验证。H1、正文、完整来源标题、日期、许可和实验数据未更改。现有重定向、intentional noindex、多 sitemap 策略保持原样；不是这次清理目标。

## 长度验收

下表的修复前数量对应原始审查基线 161 页；最终输出为 165 页，新增四篇 News 均为 0/0，不影响历史问题计数。使用最终 HTML DOM 的 title / meta description；标题计入 ` | RoboSkin.ai`。阈值分别为 >70 和 >160 Unicode 码点，属于项目审计规则，不是 Google 排名硬性门槛。

| 页面类型 | 页面数 | 标题超长，修复前 → 后 | 描述超长，修复前 → 后 |
|---|---:|---:|---:|
| Home | 1 | 0 → 0 | 0 → 0 |
| Topic / other | 36 | 5 → 0 | 7 → 0 |
| Directory | 9 | 1 → 0 | 2 → 0 |
| Research | 46 | 23 → 0 | 7 → 0 |
| News | 50 | 12 → 0 | 4 → 0 |
| Sensor detail | 3 | 1 → 0 | 1 → 0 |
| Guide | 13 | 6 → 0 | 4 → 0 |
| Application | 3 | 1 → 0 | 2 → 0 |
| 合计 | 161 | 49 → 0 | 27 → 0 |

例外：**无**。完整 76 个字段的原文、新文、URL、类型和长度见 [`seo-repair-2026-09-29.json`](./seo-repair-2026-09-29.json)。正常字段未被批量改写。

## Schema 验收

字段实例按一次输出对象上的错误属性计数。数组中的多个值不重复计数，同一构建器在不同 URL 输出则分别计数。下面 URL 数不能直接相加；并集为 45。

| 独立规则 | 受影响 URL 数 | 字段实例，修复前 → 后 |
|---|---:|---:|
| DefinedTerm.isPartOf，domain | 10 | 10 → 0 |
| DefinedTerm.keywords，domain | 10 | 10 → 0 |
| Thing.manufacturer，domain | 3 | 26 → 0 |
| Thing.citation，domain | 2 | 15 → 0 |
| Thing.category，domain | 1 | 24 → 0 |
| Thing.isPartOf，domain | 1 | 24 → 0 |
| TechArticle.reviewedBy，domain | 33 | 33 → 0 |
| CreativeWork.isPartOf，range | 2 | 25 → 0 |
| Dataset.additionalProperty，domain | 2 | 23 → 0 |
| Thing.additionalProperty，domain | 1 | 14 → 0 |
| CreativeWork.additionalProperty，domain | 1 | 5 → 0 |

8 个构建器根因及最小处理：

| 构建器 | 历史错误字段实例 | 处理 |
|---|---:|---|
| buildSeoTopicGraph | 49 | reviewedBy 留在 WebPage；DefinedTerm 的 keywords 移到 WebPage，网站归属也由 WebPage 表达 |
| buildPhysicalAiDefinedTermJsonLd | 4 | 保留术语及 subjectOf，关键词放入相连 WebPage，添加 mainEntityOfPage |
| buildDatasetCatalogJsonLd | 23 | 来源机构放入有引用的 CreativeWork 说明及 mentions，不推断 creator |
| buildRobotAiModelDirectoryJsonLd | 20 | 去掉指向 ItemList 的 isPartOf；保留 mainEntityOfPage 与列表成员关系 |
| buildRobotWorldModelEvidenceJsonLd | 10 | 同上；证据字段改为 hasPart → WebPageElement 的 name/text |
| buildTactileSensorsJsonLd | 20 | 仅证实制造关系的硬件用 Product；特性、资源、来源和限制保存在相连 CreativeWork 中 |
| buildResearchRobotDirectoryJsonLd | 57 | 已证实硬件用 Product；研究配置保留 Thing，分类与证据放在 CreativeWork，移除错误 isPartOf |
| buildResearchOrganizationDirectoryJsonLd | 26 | 已核实硬件采用 Product，制造证据通过 subjectOf → CreativeWork 保存 |

保留已有实体 @id、引用 URL、ItemList 成员、DataCatalog 关系和机构关系。未新增价格、offers、评分或未经证实的作者。Product 仅用于已有制造证据记录，并不宣称有库存或符合 Google 商品富媒体要求。

词汇固定为 Schema.org 30.1，附官方来源和 SHA-256，可经独立脚本更新。测试覆盖属性域、类型继承、属性值范围、跨 JSON-LD 块 @id 解析；所有实际输出的本地实体引用已解析，无未验证引用。词汇语义通过不等于 Google 富媒体资格或搜索引擎收录。

## 必测页面

以下全部包含于最新 165 页 DOM 审计。名称、规范 URL、唯一元数据、H1、链接及 schema 语义均通过。

| URL | 类型 | 最终 title 长度 | description 长度 |
|---|---|---:|---:|
| / | Home | 42 | 151 |
| /robot-skin | Topic / other | 58 | 157 |
| /guides/tactile-sensor-for-robots | Guide | 64 | 143 |
| /datasets | Directory | 68 | 158 |
| /robotics-datasets | Directory | 65 | 150 |
| /robot-foundation-models | Directory | 66 | 156 |
| /robot-world-models | Directory | 64 | 159 |
| /sensors | Directory | 62 | 153 |
| /robots | Directory | 65 | 144 |
| /organizations | Directory | 58 | 158 |
| /news/blind-grasp-reflex-proprioceptive-dexterous-hand | News | 67 | 146 |
| /research/univtac-platform-encoder-benchmark-2026 | Research | 63 | 144 |

## 验证分层

| 层级 | 实际状态 |
|---|---|
| 本地执行 | Node 22.23.3，217/217 测试通过；lint 通过；编辑阶段 SEO 门槛通过。也在 Node 24.19.0 做过首轮检查 |
| 生产模式构建输出 | next build 通过，189 个静态页面；生成 174 个 agent Markdown 表示；verify:export 通过，165 个 sitemap URL、169 个保护 URL 条目、5 个重定向源、5 个 intentional noindex、193 个图谱实体、30 个 research-index 条目、50 个 RSS 项 |
| 差异保护检查 | 实际比较原始基线和修复输出，历史 161 个 H1、已有 JSON-LD @id 与引用 URL 均保留；News/Research/主题记录的非 SEO 字段保持一致 |
| GitHub CI | 本报告生成时尚未触发本分支 CI；以 PR 最新 head 的后续结果为准，不能用本地结果冒充 |
| 正式站线上验收 | 未部署本分支，未将本地输出当作线上结果。已更新 verify-production，可在授权部署后按实际生产 SHA 执行 |
| Ahrefs 后续复抓 | 尚未执行。旧 crawl 不会因本地通过而自动清零，需要上线后重新抓取并核对新日期和本次 URL 清单 |

## 发布门槛和下一步

`npm run check:seo-metadata` 在编辑阶段校验 SEO 字段与回退；`prebuild` 自动执行，渲染不裁切。原有 CI 的 `npm run verify:export` 继续执行扩展后的 DOM 审计，因此未经处理的超限内容会阻止发布。

在 PR 审阅和同一 head 的 CI 通过后再决定合并。正式部署后核对 SHA，执行 `EXPECTED_COMMIT_SHA=<生产 SHA> node scripts/verify-production.mjs https://roboskin.ai`，然后进行 Ahrefs 新 crawl。未提交 GSC 问题验证，也未改变 Bing/GSC 配置。

维护说明见 [`metadata-and-schema-contract.md`](./metadata-and-schema-contract.md)。
