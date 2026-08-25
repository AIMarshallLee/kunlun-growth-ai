# Asset Inventory

| asset_id | required | expected_role | actual_path | evidence_level | provenance | exists | opens | format | dimensions_or_duration | duplicate_group | inspected_by | inspected_at | result | result_reason |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| A-001 | yes / no |  |  | actual_file / authorized_reference / specification / preview_only / verbal_only / missing | file path, document ID, or supplied source | yes / no | yes / no / not_checked |  |  |  |  | ISO 8601 | pass / fail / not_evaluable / review |  |

`pass` requires inspection of the actual candidate file plus every applicable authorized reference and specification. A preview, verbal description, filename, or missing source cannot support `pass`.
