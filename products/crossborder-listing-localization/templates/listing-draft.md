# Listing 本地化交付

## 1. Claim Ledger

粘贴完成的 Claim Ledger。

## 2. Blocking Gaps

| gap | failure_code | why_it_blocks | owner | next_evidence |
|---|---|---|---|---|
|  | invalid_config / invalid_input / insufficient_evidence / review_required / capability_unavailable |  |  |  |

## 3. Internal Market Draft

### Title

### Bullets

### Description

### Search Terms

## 4. Human Review

- [ ] 每条公开主张有授权来源
- [ ] 没有跨 SKU 合并事实
- [ ] 目标语言由具名语言审核人复核并记录决定与日期
- [ ] 当前渠道规则由具名渠道政策负责人核验并记录来源、决定与日期
- [ ] 具名业务发布负责人记录最终决定与日期
- [ ] 未知和内部备注不会进入发布候选

## 5. Channel-ready Candidate

仅在没有发布所需的阻塞事实、且人工复核完成后填写；否则写 `not_ready`。

## 6. Delivery Manifest

使用 `templates/delivery-manifest.md`。无效输入时草稿和候选为 `not_generated`；其他发布条件未满足时 Manifest 为 `not_ready`。
