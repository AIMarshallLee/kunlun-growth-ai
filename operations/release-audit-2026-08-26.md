# 三个商用 Skill 包 1.0.0 发布审计

**审计日期：** 2026-08-26  
**审计范围：** `product-material-agent`、`crossborder-listing-localization`、`product-media-qa`；没有第四个产品。  
**包完整性结论：** 三个 1.0.0 包均达到本项目的商用交付门禁。  
**市场验证结论：** 尚无可验证的真实客户运营数据，不宣称市场成熟或商业效果。

## 正式发布物

| 产品 | ZIP | 字节 | 条目 | SHA-256 |
|---|---|---:|---:|---|
| 商品素材生产 | `products/product-material-agent-1.0.0.zip` | 29725 | 24 | `765B021731700FBFCE90BA74C667840DE535079314CDE4E497D9CFBDC17BE188` |
| 跨境 Listing 本地化 | `products/crossborder-listing-localization-1.0.0.zip` | 33093 | 26 | `E4108CC45AB6F4A9C0F2D9466313DEAA3E01290BA7BF7FAEA1D796EA56FF7363` |
| 商品图 / 视频质检 | `products/product-media-qa-1.0.0.zip` | 51191 | 30 | `A109DC6852EC06761313A4B35B06953626962A47A756878E4E1C089ED537EB9C` |

机器清单见 `products/release-manifest.json`。旧的 Listing 与媒体质检 0.9.0 ZIP 已移入 Windows 回收站；商品素材 1.0.0 旧归档已由本次完整版本替换。

## 商用包合同

三个 ZIP 根目录都包含：

- `SKILL.md`、`README.md`、`INSTALL.md`、`UNINSTALL.md`、`CHANGELOG.md`；
- `LICENSE.md`、`NOTICE.md`、`SUPPORT.md`、`CONTRACT.md`；
- `RELEASE-CHECKLIST.md`、`TEST-REPORT.md`；
- `config.example.json`、`manifest.json`、`CHECKSUMS.sha256`、`verify.mjs`；
- 非空的 `templates/`、`references/`、`examples/` 和 `tests/`。

每包只需复制 `config.example.json` 为 `config.json`，把责任人和少量业务默认值改为本次任务值；不需要把 API Key 写入包。干净解压后的三个正式 ZIP 均已实际复制配置并再次运行 `node verify.mjs`，退出码均为0。自校验继续扫描本地配置中的疑似密钥，但允许它作为唯一的本地可变文件，不把正常配置误判为发布文件篡改。

## 自动化与行为证据

- 商品素材：23个发布文件、5个合同案例；四级事实证据、五种工作流状态和六项固定输出均由合同与自校验固定。
- Listing：25个发布文件、3个合同案例；四级事实证据、`approved / blocked / review`、六项输出和 `ready / not_ready` 合同已固定；保留原压力测试和类别扩写回归证据。
- 媒体质检：29个发布文件、5个合同案例；六级证据、四态结果、逐文件结果、具名审核、owner/fix/retest 与严格发布公式已固定；每个 `pass` 必须对应实际可打开的 `actual_file`、非空 provenance、授权参考、目标规格和全部适用门槛通过记录。
- 媒体实际夹具：自校验读取 `expected-metadata.json`，实际解析合成 PNG 的签名、64×64、颜色类型2和非动画状态；解析 MP4 box/track/sample entry，确认1.0秒、64×64、25fps、H.264视频、AAC音频和单音频流；严格解析 UTF-8 SRT 的2条字幕及0.0–1.0秒首尾时间。
- 媒体必要审批固定为 `inspection_owner`、`rights_or_policy_reviewer`、`business_reviewer` 三类并逐一验证，最终发布负责人另行签署，单条审批不能冒充全部审批。
- 严格发布公式：`pass_count === required_asset_count`，且 `fail_count`、`not_evaluable_count`、`review_count`、开放问题均为0，所需具名批准和最终责任人记录完整；否则 `blocked`。
- 未经当次任务明确授权，三个包均不联网、付费、上传、发布、覆盖或删除客户资产。

## 工程门禁

- 包内自校验：3/3 PASS；
- 干净安装并复制 `config.json`：3/3 PASS；
- 责任人配置负向测试：保留任一示例责任人或缺任一必需责任人均被拒绝；含空格真实姓名可用；
- 媒体合同负向测试：计数漂移、问题 owner 缺失、元数据漂移、弱证据冒充 pass、审批角色缺失、actual-file 路径不存在和 provenance 缺失均被拒绝；
- ZIP 与源目录逐文件哈希一致：3/3 PASS；
- ZIP 整体 SHA-256 与发布清单一致：3/3 PASS；
- 商用包专项自动测试：9/9 PASS；
- 使用固定时间戳、排序条目和相同压缩设置连续打包两次，三个 ZIP 的大小与 SHA-256 全部一致；
- 常见密钥、环境文件、未完成标记和未声明依赖：发布包扫描未发现。

共享工作树上的全仓测试、ESLint、TypeScript、静态站生产构建与 E2E 由“教程Html制作”会话在本次包产物完成后统一执行。在其回传联合全回归结果前，本审计只确认三个 Skill 产品包及其 ZIP，不宣称整个仓库已经最终冻结。

官方 Python `quick_validate.py` 没有作为通过证据，因为当前 Python 环境缺少它依赖的 `PyYAML`。本次没有安装或污染全局 Python；项目级 Node 检查器、包内零依赖自校验、合同案例、实际媒体夹具与 ZIP 逐文件比对共同构成替代证据。

## 独立复核 P0 / P1 关闭

独立只读审查曾判定“不允许合并”，主要 P0/P1 为：两个候补包不可售、商业根文件缺失、媒体 `review` 与发布公式矛盾、测试不验证 ZIP、网站状态混乱、复制配置后校验失败。当前关闭情况：

- 两个 0.9.0 包已升级为完整 1.0.0，三个网站产品均为“正式发布 / available”；
- 商业根文件、授权、Notice、支持、卸载、回滚、配置、合同、测试报告和发布清单全部入包；
- 媒体 `review_count` 必须为0，所有必需资产最终均为 `pass` 才可发布；
- 自动测试验证 ZIP SHA-256、ZIP 条目与源文件逐文件内容；
- 网站新增独立“市场验证状态”，不再用客户数据缺口否定包完整性，也不把包完整性写成市场业绩；
- 安装回归测试证明复制 `config.json` 后三个包仍可自校验。

最终独立只读终审结论：P0 = 0、P1 = 0、P2 = 0，三个 Skill 产品包可以发布。三个包的最后一次自校验、负向合同测试、确定性打包和逐文件 parity 均已通过。共享工作树联合全回归仍由“教程Html制作”会话最终签字；在其确认前不把本结论扩大为“整个仓库已经最终冻结”。

## 真实运营数据门禁

目前可验证真实客户数、付费转化、复购、退款、客单价和平台通过率均无记录。该事实不替代产品包完整性，但限制以下说法：不得声称“市场验证完成”“高转化”“客户成功案例”或“平台保证通过”。

首批运营应记录：安装成功率、首次有效输出率、首次运行耗时、人工修改量、阻塞问题关闭时间、退款原因和复购；媒体包还应记录已授权真实文件的格式覆盖、漏检/误报、复测与发布后缺陷。达到预设样本量后再更新市场验证状态。
