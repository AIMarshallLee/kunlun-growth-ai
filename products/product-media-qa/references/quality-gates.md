# 批次质量门槛

1. `required_asset_count > 0`，Required manifest 中每个资产都有实际路径和唯一的逐文件结果。
2. 实际文件数量、可打开性、格式和关键元数据已检查。
3. 商品身份、变体、可见结构和附件与授权参考一致。
4. 画面文字和产品主张均有授权事实来源。
5. 视频检查覆盖完整时间线及所需音轨/字幕。
6. 所有 blocker/high 问题已用实际修复文件复测关闭。
7. 每个结果都记录 `evidence_level`、`provenance`、检查人和检查时间；`preview_only`、`verbal_only` 或 `missing` 不能支持 `pass`。
8. 所需人工审核记录审核人姓名或可追溯标识、角色、决定、时间和证据来源；未决 `review` 不得留在发布批次中。
9. Manifest 的统计与逐文件 Inventory、Issue Log 完全一致，且没有开放问题。
10. 具名的 `accountable_decision_owner` 记录最终决定和时间。

## 严格发布公式

只有以下条件全部为真时，`batch_decision` 才能为 `release_ready`：

```text
required_asset_count > 0
pass_count === required_asset_count
fail_count === 0
not_evaluable_count === 0
review_count === 0
open_issue_count === 0
required_named_approvals_recorded === true  # inspection_owner + rights_or_policy_reviewer + business_reviewer
accountable_decision_owner_recorded === true
final_decision_by === accountable_decision_owner
```

任一门槛不满足，批次决定为 `blocked`。
