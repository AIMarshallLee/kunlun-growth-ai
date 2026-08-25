# Delivery Manifest

- product_slug_or_sku:
- variant:
- package_version: 1.0.0
- required_asset_count:
- inspected_actual_asset_count:
- pass_count:
- fail_count:
- not_evaluable_count:
- review_count:
- open_issue_count:
- batch_decision: release_ready / blocked
- open_blocker_issue_ids:
- source_reference_checked_by:
- file_properties_checked_by:
- text_and_claims_checked_by:
- required_human_approvals:
- named_approval_records: reviewer identifier / role / approve-or-reject / ISO 8601 / provenance
- required_named_approvals_recorded: true / false
- accountable_decision_owner:
- accountable_decision_owner_recorded: true / false
- final_decision_by:
- final_decision_at:
- retested_at:

`release_ready` is valid only when `required_asset_count > 0`, `pass_count === required_asset_count`, `fail_count === 0`, `not_evaluable_count === 0`, `review_count === 0`, `open_issue_count === 0`, every required named approval is recorded, and `final_decision_by` equals the `accountable_decision_owner`. Otherwise use `blocked`.
