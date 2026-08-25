# Claim Ledger

| claim_id | proposed_claim | source | evidence_level | variant | status | block_reason | reviewer_or_gap_owner | notes |
|---|---|---|---|---|---|---|---|---|
| C-001 |  |  | authorized / observed / unverified / unknown |  | approved / blocked / review | missing_evidence / conflicting_evidence / contradicted_by_evidence / wrong_variant / none |  |  |

只有由当前 SKU / 变体 `authorized` 事实支持的 `approved` 主张可以进入内部市场草稿。`review` 主张在具名负责人确认前不得进入发布候选；`blocked` 主张必须删除或补证据。缺证据与证据否定必须使用不同 `block_reason`。
