# 商品素材生产合同

本合同定义 `product-material-agent` 1.0.0 的稳定输入、输出、证据、状态、审核和失败行为。`SKILL.md`、模板与示例必须服从本合同。

## 1. 必需输入

- 有效的 `config.json`：`schemaVersion` 为 `1`，`evidenceMode` 为 `strict`，且四项审核责任为具名人员或可审计角色 ID；
- 商品名称或可审计产品 ID、SKU / 变体范围；
- 至少一项经授权的商品事实及其来源 ID；
- 已授权资产路径与用途；若本次仅需文本和计划，可明确写 `none_for_plan_only_scope`；
- 目标市场、语言和渠道；
- 品牌规则与禁止说法；
- 请求的文案、图片计划、视频分镜和文件约束。

可选输入包括已授权模型提供方、预算上限、现行渠道规则、参考版式和交付命名规则。配置只记录选项，不记录凭证。

必需输入或配置无效时，不得生成标记为可发布的结果，状态必须为 `blocked_invalid_input`。

## 2. 证据等级

| 等级 | 判定 | 允许行为 |
|---|---|---|
| `authorized` | 事实由权利人提供或明确批准，来源、用途、变体和适用范围清楚。 | 可进入相同范围的文案草稿。 |
| `observed` | 事实可从授权资产直接看见或测量，但未单独获批为主张。 | 可进入事实记录和中性审核说明，不直接作为发布主张。 |
| `unverified` | 说法存在，但来源、授权、范围、时效或一致性不足。 | 从文案中排除，并记录所需证据。 |
| `unknown` | 没有提供，且不能从授权资产安全观察。 | 保持未知并提问，不推断。 |

生成媒体、旧 Listing、竞品页面和模型常识不能把事实提升为 `authorized`。

## 3. 固定输出

每次运行必须产生以下六个 UTF-8 Markdown 文件；即使阻塞也保持文件名稳定：

1. `fact-record.md`：事实 ID、内容、证据等级、来源 ID、授权用途、适用变体和审核状态。
2. `copy-draft.md`：只含 `authorized` 事实；阻塞段落写 `not_generated` 与原因。
3. `image-plan.md`：镜头 ID、独立用途、构图、身份约束、来源资产和执行状态。
4. `video-storyboard.md`：时间码、画面、动作、文案、证据来源和执行状态。
5. `open-questions.md`：问题、阻塞类型、负责人、所需证据或能力和下一步。
6. `delivery-manifest.md`：输入摘要、文件清单、工作流状态、人工审核、发布决定和时间记录。

固定输出可以是计划和草稿，不代表图片或视频文件已经生成。不存在的媒体必须标为 `not_generated`。

## 4. 工作流状态与失败

Manifest 必须且只能记录一个状态：

- `ready_for_review`：请求范围内的草稿或计划完整，每个事实可追踪；仍需人工审核。
- `blocked_invalid_input`：配置、格式、必需字段或审核责任无效。
- `blocked_missing_evidence`：请求依赖尚未提供的证明；不得用 `unknown` 或 `unverified` 填补。
- `blocked_evidence_conflict`：来源互相矛盾、无法读取，或来源不能证明对应说法。
- `blocked_capability`：请求的模型、工具、文件读取或生成能力不可用。

`blocked_missing_evidence` 与 `blocked_evidence_conflict` 必须分开记录。任何阻塞都要返回已完成的事实记录、问题清单和 Manifest；受影响的其他输出标为 `not_generated`，并记录阻塞项、负责人、所需证据或能力、下一步。不得伪造完成、文件、检查结果或可发布状态。

生成服务未配置但请求仅为文案和计划时，可以返回 `ready_for_review`；若请求明确要求实际生成媒体，则返回 `blocked_capability`。

## 5. 审核与发布

- `factReviewer`：确认事实、来源和变体范围；
- `assetRightsReviewer`：确认素材权利、人物授权和允许用途；
- `brandReviewer`：确认品牌语气、视觉身份和禁止元素；
- `releaseDecisionOwner`：在前三项检查和文件检查完成后，唯一有权记录发布批准。

角色值必须是实际姓名或可审计角色 ID，不能是空值或 `not_assigned`。`ready_for_review` 不等于获准发布。本包只生成审查材料，不自动联网、付费、上传、发布、覆盖或删除客户资产。
