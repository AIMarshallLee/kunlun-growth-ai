# 变更记录

## 1.0.0 — 2026-08-26

- 增加输入、输出、失败、证据等级与人工审核合同；
- 增加商用许可、第三方声明、最小配置、支持、卸载、回滚和发布检查资料；
- 将 `release_ready` 收紧为全部必需资产通过、三类未解决结果为0、必要具名批准齐全且最终负责人签署；
- 为逐文件结果和问题复测增加 `evidence_level`、`provenance`、检查人、负责人和复测人字段；
- 强制 `pass` 对应可打开的 `actual_file`、非空 provenance、授权参考、目标规格和全部适用门槛通过记录；
- 固定并逐一核验 `inspection_owner`、`rights_or_policy_reviewer`、`business_reviewer` 三类批准，最终发布负责人单独签署；
- 增加去敏合同案例、真实合成 PNG/MP4/SRT 夹具解析和离线测试报告，不宣称真实客户运营数据或平台通过率。

## 0.9.0 — 2026-08-25

- 建立 `pass / fail / not_evaluable / review` 结果枚举；
- 建立逐文件 Asset Inventory、Issue Log 和批次发布门槛；
- 增加图片、视频、文字主张、身份与交付完整性的分层检查；
- 作为候补演练版发布，未完成外部非开发者验证。
