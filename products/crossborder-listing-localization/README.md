# Cross-border Listing Localization

**版本：** 1.0.0  
**产品 slug：** `crossborder-listing-localization`

本包把当前 SKU 的授权商品事实整理为可审核的跨境 Listing 本地化交付。核心原则是先记录事实和证据，再决定主张状态；事实不足时保持 `not_ready`，不使用同类商品常识、竞品页面或模型记忆补齐卖点。

## 适用范围

- 从一个源市场向指定目标市场和语言起草 Listing；
- 审核标题、卖点、描述和搜索词中的事实边界；
- 分离内部草稿、阻塞项、人工审核和渠道候选稿；
- 为语言、渠道政策和业务发布指定具名负责人。

## 非目标

本包不提供或替代法律意见、平台合规认证、专业翻译终审、商品事实调查、模型服务、账号、API Key、在线发布、自动上传或商业效果保证。它不会自动联网、收款、修改线上 Listing 或保存客户数据。

## 最小安装

1. 按 `INSTALL.md` 安装整个文件夹；
2. 把 `config.example.json` 复制为同目录的 `config.json`；
3. 修改目标市场、语言和渠道，并为三个审核角色填写实际负责人；
4. 使用 `examples/synthetic-travel-organizer/input.md` 完成首次离线运行；
5. 按 `CONTRACT.md` 和 `references/quality-gates.md` 核对结果。

离线流程没有第三方运行依赖，也不需要模型 API。宿主工具本身的安装与账号不属于本包。

## 固定交付

每次运行都按顺序返回：

1. Claim Ledger；
2. Blocking Gaps；
3. Internal Market Draft；
4. Human Review Checklist；
5. Channel-ready Candidate；
6. Delivery Manifest。

事实证据等级固定为 `authorized / observed / unverified / unknown`，主张状态固定为 `approved / blocked / review`，最终状态固定为 `ready / not_ready`。只有满足 `CONTRACT.md` 发布公式的结果才能标记为 `ready`。

## 公开安全示例

`examples/synthetic-travel-organizer/` 只包含合成商品事实，不含客户、订单、账号、密钥、品牌或真实经营数据。输入和预期输出分别见 `input.md` 与 `expected-output.md`。

自动合同案例位于 `tests/contract-cases.json`。正式发布包使用 `node verify.mjs` 做离线校验；测试范围和限制见 `TEST-REPORT.md`。

## 文件导航

- `SKILL.md`：Agent 执行入口；
- `CONTRACT.md`：输入、输出、证据、审核和失败合同；
- `config.example.json`：无密钥配置样例；
- `templates/`：Brief、Claim Ledger、草稿与 Manifest；
- `references/`：主张政策和质量门槛；
- `INSTALL.md` / `UNINSTALL.md`：安装、卸载和回滚；
- `SUPPORT.md`：支持范围和入口；
- `LICENSE.md` / `NOTICE.md`：商业使用许可和第三方声明。

## 市场验证披露

本包的 1.0.0 表示包结构和离线合同达到发布门禁，不表示市场成熟。包内没有可验证的真实客户数、付费转化、复购、退款、客单价、平台通过率或商业效果数据。
