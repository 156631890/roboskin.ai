# 全站 SEO 内容与导航改进 · 2026-09-22

## 结论与证据范围

基线为 `main` 提交 `635777289781cb9e0270f769f1fbe1d206d04ba5`。对 130 个 sitemap 页面执行构建 HTML 检查；标题、描述没有重复，正文内部目标与锚点有效。生产抽样检查首页、Resources、Products、Solutions、Robot Touch Sensor、robots.txt、sitemap.xml、deployment.json：200；不存在的测试 URL 返回 404。部署标识仍是上述基线提交。

这不是 GSC「已抓取但未收录」原因的确定诊断。本轮未读取 GSC、Bing Webmaster Tools、Ahrefs 的实际查询、点击、索引或外链报告，未测量真实用户 Core Web Vitals，也未复核所有外部引用链接与所有论文事实。入口页用途重叠、文案以站点介绍为主、资源目录平铺，是可从代码和页面观察到的内容问题；搜索引擎是否因此未收录仍待后台证据。

## 已实施

- 9 个重点页面：`/products` 变为三阶段学习路径；`/solutions` 变为四类问题的评估入口；`/applications` 按机器人接触表面组织；`/resources` 增加任务入口并把专题目录分为六组；`/research` 使用正常的论文评述文案；`/faq` 回答传感器选择、测力、滑移、数据、Python／ROS 2 等问题；报告页增加可直接阅读的六步评估清单并明确固定 PDF 版本；两篇传感器指南分别负责信号入门与硬件评估，补充对照表与实际目标链接。
- 106 个页面通过共用组件新增章节导航。既有编程教程目录继续使用原组件；已有明确 section ID 保持不变，新 ID 避免重名，目录和正文共用同一生成方法。不把导航改动包装成论文内容更新。
- 七个入口页的 title/description 与页面作用对应；仅内容发生实质变化的静态页／指南更新内容日期。研究文章的论文日期与发布日期不批量刷新。`/products` 的 ItemList 改为指向三条真实目标路径。
- 删除静态元信息里覆盖全站的通用关键词列表；未知静态路由的元信息／WebPage／面包屑配置现在直接报错，避免默默使用首页 canonical。删除关键词列表不是排名提升承诺。
- 新增 `npm run audit:seo`，并加入现有 `verify:export`。用 DOM 解析最终 HTML，检查标题／描述缺失与重复、H1、canonical、sitemap 中的 noindex／重定向、内部目标与锚点。生成的逐页清单见 [sitewide-page-inventory-2026-09-22.md](sitewide-page-inventory-2026-09-22.md)。
- 保留所有现有公开 URL、5 条旧地址重定向和5个既有 noindex 页面，不把合法 404 重定向到首页。

## 验证

实际本地执行：200 项测试通过、ESLint 通过、Next.js 构建 154/154 页面、原静态导出校验通过（130 sitemap URL、134 个 URL 合约条目、5 个 noindex、193 个图谱实体、30 个研究记录、50 条 RSS），新增全站检查通过。

本地使用 Node 24.19.0 与现有 lockfile 对应的依赖；仓库 CI 使用 Node 22。`@mixmark-io/domino` 已是 Turndown 的锁定依赖，本次仅显式声明相同 2.2.0 版本供 DOM 检查使用，没有升级其版本。PR 自身的 CI、Vercel 预览和生产发布是后续独立证据，不能用上述本地结果代替。

新增行为测试覆盖：页面 HTML 与 hydration 内容分离、首页 canonical 错配、noindex 混入 sitemap、重复标题／描述、坏锚点／链接、已存在文件和外部链接、章节重名与既有 ID、资源目录不遗漏或重复页面。三个原测试里的旧营销文案断言随页面用途更新；没有删除 URL／schema／内容安全断言来让失败通过。

## Google 与 Bing 发布后清单

1. 比较部署标识与合并提交，抽查9个重点页和一篇 Research、一篇 News，确认正文、canonical、状态码和目录跳转为新版本。
2. 抓取完整 sitemap，确认130个规范页仍可访问、5个预期 noindex 不在 sitemap，旧路由单跳到对应页；无替代页面的失效 URL 保留真实404／410，并修复内部来源链接。
3. GSC：对重点页记录「网页索引编制状态」「上次抓取」「用户声明 canonical」「Google 选择 canonical」。以网址检查区分可抓取、已索引、待处理；需要重新抓取时再请求索引，不因测试通过就标记 GSC 验证成功。
4. Bing Webmaster Tools：同样检查 URL Inspection、Site Explorer、sitemap 读取和索引状态；IndexNow 仅在部署确实更新且 key 配置有效时提交变更 URL，记录平台受理，不将受理视为已收录。
5. GSC/Bing 按页导出发布前后相同长度的14日／28日窗口：查询、国家、设备、曝光、点击、CTR、平均位置。先比较同一搜索意图，避免把刚发布的新论文热度当成模板效果。无数据标记为无数据。
6. 有曝光但点击少：结合具体查询核对标题、描述和页面承诺；已抓取未收录：先排查 canonical／重复与初始 HTML，再看是否回答了独立问题、有独特评估或可复用内容；未被发现：检查入口和 sitemap。
7. 多页出现相同查询只能作为重叠线索；需比较页面意图和实际表现后决定合并，不能仅因同义词就删页、noindex 或改 canonical。

本次没有合并、生产部署、提交 GSC 验证或发送 IndexNow。PR #11 的 Agile-WAM 数值修正仍是独立工作，本分支没有覆盖其 News 数据。

## 下一轮真正影响增长的工作

优先用实际查询选择选题：DIGIT／GelSight Mini／ReSkin 的校准与数据接口、触觉数据集下载与许可证、滑移检测评估、ROS 2 重放。每次更新增加可核查的比较、示例或工程判断，记录主来源和局限。宽泛的 Physical AI／humanoid robots 主题继续作为背景入口；没有搜索量数据时不宣称这些是低竞争高流量词。

对报告下载与研究服务询问单独观察行为和有效询盘；DR、收录数量、曝光、点击和商业转化是不同指标。上述改动改善内容用途和可发现性，不能保证收录、排名、流量或 AI 引用。

## 本轮查阅的官方依据

- [Google：有用、可靠、以人为本的内容](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- [Google：标题链接](https://developers.google.com/search/docs/appearance/title-link)
- [Google：可抓取且有描述性的链接](https://developers.google.com/search/docs/crawling-indexing/links-crawlable)
- [Bing：URL Inspection](https://www.bing.com/webmasters/help/url-inspection-55a30305)

Bing Guidelines 帮助入口本轮只返回应用壳，未把它当作已读取完整条款的证据。自动化清单不替代账号内的实际 URL Inspection。
