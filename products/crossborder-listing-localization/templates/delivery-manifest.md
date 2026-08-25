# 交付 Manifest

- contract_version: 1.0
- package_version: 1.0.0
- product_slug_or_sku:
- variant:
- source_market:
- target_market_and_language:
- target_channel:
- config_path:
- brief_path:
- claim_ledger_path:
- internal_draft_path:
- human_review_checklist_path:
- channel_candidate_path:
- manifest_status: ready / not_ready
- failure_codes: invalid_config / invalid_input / insufficient_evidence / review_required / capability_unavailable / none
- approved_claim_count:
- blocked_claim_count:
- review_claim_count:
- block_reasons: missing_evidence / conflicting_evidence / contradicted_by_evidence / wrong_variant / none
- unresolved_gaps:
- current_policy_source:
- language_reviewer_name:
- language_review_decision_and_date:
- channel_policy_owner_name:
- channel_policy_decision_and_date:
- business_release_owner_name:
- business_release_decision_and_date:
- next_step_and_owner:
- release_decision_reason:
- delivered_at:

`ready` 只允许在 `CONTRACT.md` 的发布公式全部满足时使用；任何未解决 `blocked`、`review`、必需字段、当前规则来源或人工批准都会保持 `not_ready`。
