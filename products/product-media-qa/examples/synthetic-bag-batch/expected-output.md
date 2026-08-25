# 预期输出结构

## Asset results

| asset | evidence_level | provenance | result | reason |
|---|---|---|---|---|
| hero.png | missing | supplied synthetic input | not_evaluable | actual file and source reference missing |
| video.mp4 | missing | supplied synthetic input | not_evaluable | actual file, metadata and timeline inspection missing |

## Content findings from supplied description

| finding | evidence_level | result | evidence |
|---|---|---|---|
| described deep-blue color vs approved black | verbal_only | fail | supplied description conflicts with the authorized fact record; this is not an asset-file result |
| described “100% Waterproof” | verbal_only | fail | no approved performance evidence; this is not an asset-file result |
| described “20L” | verbal_only | fail | capacity is unknown; this is not an asset-file result |
| described zipper | missing | not_evaluable | structure reference missing |

## Batch decision

`blocked`

`pass_count: 0`、`fail_count: 0`、`not_evaluable_count: 2`、`review_count: 0`，所以没有实际文件和源参考时不得签发 `pass` 或 `release_ready`。文字描述中的明确冲突可以登记为 intake content finding，但不能计入实际文件的 `fail_count`，也不能冒充已完成文件级检查。

## Issue Log

| issue_id | asset_id_or_path | result | evidence_level | provenance | owner | required_fix_or_evidence | retest_result |
|---|---|---|---|---|---|---|---|
| I-001 | hero.png | not_evaluable | missing | supplied synthetic input | media-owner-01 | supply the actual hero file and authorized product reference; inspect again | open |
| I-002 | video.mp4 | not_evaluable | missing | supplied synthetic input | media-owner-01 | supply the actual video, metadata, timeline and authorized reference; inspect again | open |

## Delivery Manifest

- product_slug_or_sku: synthetic-bag-001
- variant: deep-blue-description-against-black-reference
- package_version: 1.0.0
- required_asset_count: 2
- inspected_actual_asset_count: 0
- pass_count: 0
- fail_count: 0
- not_evaluable_count: 2
- review_count: 0
- open_issue_count: 2
- batch_decision: blocked
- open_blocker_issue_ids: I-001, I-002
- source_reference_checked_by: not_evaluable — authorized reference missing
- file_properties_checked_by: not_evaluable — actual files missing
- text_and_claims_checked_by: synthetic-reviewer-01
- required_human_approvals: inspection owner, asset rights/policy reviewer and business reviewer
- named_approval_records: none
- required_named_approvals_recorded: false
- accountable_decision_owner: synthetic-release-owner-01
- accountable_decision_owner_recorded: true
- final_decision_by: none
- final_decision_at: none
- retested_at: none

该公开样例使用纯合成数据，`blocked` 是故意且正确的结果；它展示缺少真实文件或授权证据时，Skill 会保留逐文件问题、责任人和复测门禁，而不会伪造“可发布”。
