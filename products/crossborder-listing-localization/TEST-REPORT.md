# 1.0.0 测试报告

**产品：** `crossborder-listing-localization`  
**版本：** 1.0.0  
**测试日期：** 2026-08-26  
**环境：** Windows PowerShell、Node.js 标准库、离线文件

## 结果摘要

| 检查 | 结果 | 证据 |
|---|---|---|
| 配置合同 | PASS | `config.example.json` 可解析；`schemaVersion` 为 1，`evidenceMode` 为 `strict`；语言、渠道政策和发布决定三项示例责任人必须在 live `config.json` 中全部替换 |
| Manifest 合同 | PASS | 必需顶层键、1.0.0、`commercial-ready`、独立市场验证状态和零运行依赖声明存在 |
| 合同术语 | PASS | Manifest 声明的四级证据、三种主张状态和最终状态均出现在执行合同与质量门槛中 |
| 固定输出 | PASS | Manifest 和合同声明六项固定输出 |
| 合同案例数据 | PASS | `tests/contract-cases.json` 可解析，包含3个具名案例；每项有 `id`、`expectedStatus` 和 `reason` |
| 公开示例边界 | PASS | 合成示例保持未证实主张为 `blocked`，列出具名责任，并以 `not_ready` 结束 |

上述机器检查使用 Node.js 标准库读取实际 JSON 和合同文件，失败时以非零退出码结束。本轮实际输出为：

```text
PASS: Listing config, manifest, contract terms, six outputs, and 3 contract cases validated.
```

## 合同案例

1. `sparse-facts-stay-not-ready`：只有类别、材料和颜色获得授权，尺寸、数量、结构、容量和当前渠道规则缺失；预期 `not_ready`，相邻卖点为 `blocked`；
2. `review-is-not-approval`：有来源的术语仍待具名语言审核人决定；预期 `review_required` 和 `not_ready`；
3. `invalid-required-input-blocks-draft`：目标语言为空且事实未验证；预期 `invalid_input`，草稿和候选均为 `not_generated`。

这些案例是可重复读取的离线合同夹具，不是客户数据或市场运行结果。它们验证结构、枚举和预期边界；最终 Agent 行为仍需用同一输入做前向运行并由人工复核。

## 已有行为证据

包内 `examples/offline-validation.md` 记录了前一轮合成输入下的三组无 Skill 压力基线、三组加载 Skill 的独立前向测试，以及类别语义扩写修订后的复测。该证据支持继续保留严格来源边界，但不证明真实客户使用、翻译终审、平台审核或商业结果。

安装配置负向回归同时证明：含空格的实际姓名可用；缺任一责任人或保留任一示例值都会以非零退出。

## 发布集成边界

`node verify.mjs` 已通过：校验25个包内文件和3个合同案例，运行依赖仅为 Node.js 标准库；`CHECKSUMS.sha256` 已覆盖除自身和本地 `config.json` 外的全部发布文件。ZIP 与源目录哈希比对、ZIP SHA-256 由统一发布审计记录，避免在包内形成自引用哈希。

## 市场验证披露

本包没有可验证的真实客户运营、付费转化、复购、退款、客单价、平台通过率或商业效果数据。该缺口不改变离线合同结果，但禁止宣称市场成熟。
