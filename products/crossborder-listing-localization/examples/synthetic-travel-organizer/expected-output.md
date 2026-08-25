# 预期输出结构

## 1. Claim Ledger

| proposed_claim | source | evidence_level | status | block_reason | reviewer_or_gap_owner |
|---|---|---|---|---|---|
| Travel organizer bag | synthetic supplied product name | authorized | approved | none | Synthetic Language Reviewer |
| Polyester | synthetic supplied material field | authorized | approved | none | Synthetic Business Owner |
| Blue | synthetic supplied color field | authorized | approved | none | Synthetic Business Owner |
| Lightweight / waterproof / large capacity | no supplied evidence | unknown | blocked | missing_evidence | Synthetic Business Owner |
| Clothing, commuting, or home storage | no supplied evidence | unknown | blocked | missing_evidence | Synthetic Business Owner |

## 2. Blocking Gaps

| gap | failure_code | why_it_blocks | owner | next_evidence |
|---|---|---|---|---|
| dimensions, package quantity, closure, capacity | insufficient_evidence | publication fields are unknown | Synthetic Business Owner | authorized current-SKU specification |
| current channel requirements | review_required | no authorized current policy source was supplied | Synthetic Channel Owner | authorized current channel source and recorded decision |
| release approvals | review_required | named reviewers have not recorded decisions | Synthetic Language Reviewer / Synthetic Channel Owner / Synthetic Business Owner | dated review decisions |

## 3. Internal Market Draft

**Title:** Blue Polyester Travel Organizer Bag

**Draft bullets:**

- Polyester material.
- Blue color.

**Draft description:** Blue polyester travel organizer bag.

没有足够事实生成完整五点。不得用同类商品的常见属性补齐。

## 4. Human Review Checklist

- Language reviewer: Synthetic Language Reviewer — pending
- Channel policy owner: Synthetic Channel Owner — pending current policy source
- Business release owner: Synthetic Business Owner — pending blocking facts and prior reviews

## 5. Channel-ready Candidate

`not_ready`

## 6. Delivery Manifest

- contract_version: 1.0
- package_version: 1.0.0
- product_slug_or_sku: synthetic-travel-organizer-blue
- manifest_status: not_ready
- failure_codes: insufficient_evidence / review_required
- approved_claim_count: 3
- blocked_claim_count: 2
- review_claim_count: 0
- unresolved_gaps: dimensions, package quantity, closure, capacity, current policy source, three review decisions
- next_step_and_owner: Synthetic Business Owner supplies authorized facts; Synthetic Channel Owner supplies current policy source; all named reviewers record decisions
- release_decision_reason: contract release formula is not satisfied

此结果只证明离线结构演练完成，不证明目标平台规则、语言质量、外部用户使用或商业结果。
