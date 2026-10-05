# RoboSkin.ai E-E-A-T 内容可信度优化

日期：2026-10-04（Asia/Shanghai）。基线：main / 生产 `96714f0b542e1ccb27264fa865d33de6a276b2a7`。英文站面向触觉机器人领域的工程师和研究者；本次目标是帮助读者核对来源、责任主体和证据，再使用研究资源。

## 当前官方依据

本次实际读取并保存了 Google 官方页面，而不是把第三方的“E-E-A-T 分数”当作排名规则。

- [Creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)：页面标注 Last updated 2026-10-01 UTC。Google 说明信任最重要，E-E-A-T 本身不是独立的具体排名因素；强调原创价值、清楚的来源和作者背景、Who / How / Why，以及主内容能否帮助页面完成目的。文档更新日期不等于一个新算法的发布日期。
- [Article structured data](https://developers.google.com/search/docs/appearance/structured-data/article)：页面标注 Last updated 2026-09-08 UTC。作者类型与可见署名一致；组织可作为作者，author.url 应指向可识别责任主体的真实页面。
- [Search Quality Evaluator Guidelines](https://guidelines.raterhub.com/searchqualityevaluatorguidelines.pdf)：本次下载官方当前版本，HTTP Last-Modified 为 2025-09-11。评价员指南用于内容自查；评价员反馈不直接决定某页排名。不将其描述为未经确认的 2026 新版。

## 三项已完成改进与验收

1. **让读者直接找到作者和责任主体。** 研究文章增加标题附近的机构署名和语义化日期；News / Research 作者元数据加入真实作者 URL；技术指南署名链接到现有编辑政策。共享说明链接到已公开的 Steven Yang 编辑负责人、证据方法和纠错入口。保留机构作者，不将负责人冒充每篇科学论文作者或同行评审人。
2. **把解释、来源报告与实际测试区分清楚。** 政策列出来源审阅、文件检查、代码运行或回放、物理实验各自需要的记录和不能证明的事项。研究配图明确标为解释性图像，新闻保留已有图注并提供缺失时的说明。About 页链接到现有来源索引、数据可用性审计和实验协议记录。没有新增虚构实验、资历、机构任职、认证、评价或排名承诺。
3. **公开制作过程、利益边界和纠错方法。** 增加自动化与解释性图像规则、付费研究与公开内容的独立性说明，以及提交纠错所需的上下文。Organization JSON-LD 的 correctionsPolicy / ethicsPolicy 链接到真实可见段落。只更新实质改变的 About / 编辑政策日期；文章、论文和数据记录日期保持原值。

## 实际范围与保留情况

144 个正文受影响页面：70 篇 News、44 篇 Research、28 个技术主题页，以及 About 和编辑政策。共享 Organization 的政策链接也出现在使用根布局的其他页面。

模块缺失：无（核对 7 个代表页面的既有主内容标题、内链、表格和研究正文，并核对源数据文件未变）。论文正文、引用、实验条件、数据记录、下载、筛选、表单源代码、目录和 sitemap URL 集合均保留。文章 datePublished / dateModified 未批量刷新；新增文章日期没有伪装成重新研究。

本地预览未注入生产订阅配置，因此本地页脚显示原有的“Newsletter is not open yet”分支；Newsletter 组件和生产环境配置没有修改，生产订阅状态须在发布验收时核对，不能从本地预览推断。

## 验证证据

- 本地 208 / 208 测试、lint、build、verify:export 通过。
- 静态导出检查覆盖 181 个 sitemap URL、185 个 protected entries、6 个 intentional noindex URL；DOM 审计验证 H1、唯一元数据、canonical、内部页面和锚点。
- 对构建 HTML 的专项验收检查了 144 个正文受影响页的责任说明、作者链接、日期和政策锚点；对 7 个上线前样本比对原始内链、标题、表格、科学正文、科学日期和引用。
- 浏览器核对研究署名、证据方法跳转、负责人和纠错入口，检查桌面与手机布局、图注以及表格内部滚动。具体截图与控制台结果保存在本次本机运行记录。
- 最终合并 SHA、对应 CI、Vercel READY、正式域名、生产验收和 IndexNow 接收结果另存运行记录；本地结果不替代生产结果。

## 仍需真实材料和效果数据支持的部分

外部声誉、独立引用和实际操作经验不能由内链或 JSON-LD 制造。只有具备真实履历、可公开的运行记录或实验记录时才能扩展相关主张。本次没有新增外链、虚构审稿或将来源审阅包装成硬件经验。

当前开放 PR #26 的整站 SEO 长度与 schema 语义门槛属于另一项已存在的修复，本次不重复实现或合并其整批变更。新增字段通过本次可见内容和链接验收，不声称整站所有历史 schema 语义问题已清零。

上线表示透明度与可核验性改进生效，不表示 Google 已重新抓取、排名提高或获得富媒体展示。后续可观察相关页面的 GSC 表现、原始资源使用和纠错反馈；本次未使用未经读取的流量、排名或搜索量数字。
