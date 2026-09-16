# Resource integration and official-loader verification

用户本次授权“帮我操作”，承接同步 main、发布现有目录／咨询改进、补运行验证的安排。

## Code integration

已将教程发布提交 `32465c30dd3ffc361450650d23f065f8488422b5` 快进到 origin/main。
原工作区 `codex/research-resource-conversion-20260913` 保持原样；使用临时 Git index
保存原有 118 个修改／新增文件到本地快照 `fae87fb23f39ead6688a3cb6c9b8a928339ce2db`，
再在独立 worktree `.worktrees/resource-release-20260916` 合入已上线版本。

本批包含：19 条数据集目录的访问／许可／文件／split 证据、可复算分析、JSON 和固定快照；
研究索引历史文件与免费报告范围说明；咨询入口；明确的表单回执与失败处理。
默认仍是静态导出。已有可选 server API 代码保持关闭，没有切换 Vercel 托管模式。
保留 main 上已有 VLA 手机布局、SHYSEMI 链接和全部编程教程。
单独的 VIGOR 资源链接分支未进入这次整合，未改动它。

## Additional LeRobot evidence

本地实际安装 PyPI 发布版 LeRobot 0.6.1。上游 main 的 pyproject 已写 0.6.2，但该版本
尚无 PyPI 发布，因此没有把 main 版本号当作可安装版本。两个干净的 Windows x64 /
CPython 3.13.3 环境使用 uv 0.9.28，固定依赖 PyTorch 2.11.0+cpu、datasets 4.8.5、
PyArrow 25.0.1、NumPy 2.2.6。

`public/tutorials/lerobot-loader/verify_loader.py` 通过官方 writer 创建并 finalize，
再通过官方 loader 读取 2 个 episode、8 帧 format v3.0 数值数据，检查字段维度、值、
索引、时间戳与 info 元数据；官方 writer 拒绝缺失 action 和错误 state 维度。
第二个锁定依赖环境的 verification.json 与第一份逐字节相同。
脚本、依赖、真实生成数据、报告、许可与 ZIP 均可下载，已接入现有 LeRobot 教程及下载事件。
原 PyArrow-only checker 保持独立、轻量；它的部分 fixture 没有被宣称为官方可加载数据集。

这是合成数值数据的有限验证，未测视频、模型训练或真实机器人。自定义触觉向量不代表策略支持。

## External dependencies actually checked

- Vercel 生产仅存在 `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT`，读取后确认其值为空。没有修改环境变量。
  页面新增填写前提示与禁用的在线发送按钮，保留携带填写内容的邮件／WhatsApp 草稿链接。
  打开草稿必须由访客自己选择；本任务未发送任何邮件或咨询。
- Buttondown 已登录页面仍显示 Account under review，并要求账号持有人本人填写审核信息。
  未代填身份审核，未启用订阅；RSS 保持可用。已询问用户控制的测试邮箱，回复前不做真实邮件验证。
- 本机没有 Docker 或已安装 WSL 发行版。ROS 运行脚本已完成，但 GitHub 拒绝写入 workflow，
  原因是现有 OAuth 缺少 workflow scope。准备文件转存 `docs/verification/`，不伪称已经运行。
  详见 `docs/verification/ros2-runtime-status.md`。额外权限已向用户说明，其他工作继续。
- 无 DIGIT / GelSight Mini 硬件及参考测量装置，硬件精度／力标定仍未验证。

## Checks and evidence

188 项既有／相关行为测试、Lint、TypeScript（包含在 Next build）、静态构建与导出检查通过后发布。
固定公开下载目录使用 .gitattributes 保留原始字节，避免 Windows checkout 自动改变 CSV 换行。
浏览器验证目录、报告、联系和咨询页面，检查缺配置时不发送及保留输入；教程代码块、表格和
手机布局也在发布前核对。仅教程目录锚点滚动留出导航栏高度，没有无关视觉重构。

原工作区 `.artifacts/resource-release-20260916/` 保存快照清单、安装／构建／测试日志、
两份 loader 报告、网页与下载审计、浏览器证据。生产部署号、最终提交号和发布后结果另记入
原工作区的本地交接记录；此前 9 月 13 日文档中的“未发布”描述属于历史状态。
