# 触觉仿真下一阶段储备

核查日期：2026-09-16。本轮没有创建 `/guides/tactile-simulation`，没有把待完成选题作为可用教程链接。当前路由没有同意图完整教程；现有 sensor/research 页面只包含局部仿真背景。

候选意图：tactile simulation、tactile sensor simulation、Isaac Lab tactile simulation。帮助读者区分图像生成、接触物理和可用于策略学习的信号。延续本站触觉与工程资料定位。

核查主源：[TacEx](https://github.com/DH-Ng/TacEx/tree/adceed41afb7cb48f9ec1f66a662fb8e5a06627f)，固定提交 `adceed41afb7cb48f9ec1f66a662fb8e5a06627f`。实际读取 README、文件树和 [Local-Installation.md](https://github.com/DH-Ng/TacEx/blob/adceed41afb7cb48f9ec1f66a662fb8e5a06627f/docs/source/installation/Local-Installation.md)。仅资料与代码路径核查，未安装运行。

| 项目 | 源中说明 | 必须保留的边界 |
| --- | --- | --- |
| 传感器 | 当前 README 只确认 GelSight Mini | 不能把可扩展设计写成 DIGIT 或任意传感器已支持 |
| 图像输出 | Taxim 路线的 GPU 触觉 RGB 生成 | 图像相似性不等于物理力准确 |
| 标记运动 | FOTS，以及基于 FEM/UIPC 的标记运动路线 | 不同路线的假设和计算成本应分别说明 |
| 接触物理 | UIPC 的 incremental potential contact，支持 FEM 软体、刚体、布等路线 | 属于上游功能描述，本地尚未复现或测量误差 |
| 软件组合 | Isaac Sim 4.5、Isaac Lab 2.1.1、Python 3.10 | 不推断兼容最新版 Isaac Lab/Sim |
| 上游测试平台 | Ubuntu 22.04、RTX 4090、driver 550.163.01、CUDA 12.4 | 上游报告，不是本站验证 |
| 安装限制 | git-lfs USD 资源、递归 submodules；UIPC 有编译步骤 | 需记录资源下载、磁盘、GPU/驱动与编译工具链 |
| UIPC 构建材料 | 本地安装文档列 CMake 3.26、GCC 11.4、CUDA 12.4 | 先按固定提交恢复环境，不直接使用新版本依赖替换 |
| 成熟度 | README 标为 preview/beta | 不描述为生产就绪或通用 sim-to-real 保证 |

下一轮实施顺序：

1. 在独立 Ubuntu/GPU 环境恢复源声明的组合，保存实际版本、submodule SHA、LFS 资源状态和完整日志。
2. 按固定提交文档验证基本 RGB demo，再单独验证 UIPC；当前文档路径 `scripts/demos/tactile_sim_approaches/check_taxim_sim.py` 只作为上游待运行入口，不作为已执行命令示例。
3. 保存真实生成的 RGB、标记和形变结果，注明各路输出单位、频率和接触物理配置；性能数字必须来自该环境测量。
4. 对照真实参考数据才能讨论物理误差和 sim-to-real；缺少硬件时只交付仿真范围内证据。
5. 再决定是否发布完整教程、下载项目和可复现截图。通过 `/robotics-programming`、传感器及标定教程建立内链。

本轮不执行安装，不展示仿真结果，不新增页面占位。这个储备不阻塞已完成的数值检查与标定资料教程。
