# 商品素材交付 Manifest

## 项目信息

- 产品：`unknown`
- SKU / 变体：`unknown`
- 目标市场：`unknown`
- 交付版本：`not_assigned`
- 工作流状态：`blocked_invalid_input`
- 发布决定：`not_approved`
- 事实审核负责人：`not_assigned`
- 素材授权负责人：`not_assigned`
- 品牌审核负责人：`not_assigned`
- 发布决策负责人：`not_assigned`

## 固定输出

| 文件 | 用途 | 结果状态 | 证据范围 | 审核状态 |
|---|---|---|---|---|
| `fact-record.md` | 事实与来源记录 | `not_generated` | `unknown` | `not_reviewed` |
| `copy-draft.md` | 渠道文案草稿 | `not_generated` | `unknown` | `not_reviewed` |
| `image-plan.md` | 图片用途与制作计划 | `not_generated` | `unknown` | `not_reviewed` |
| `video-storyboard.md` | 分时视频分镜 | `not_generated` | `unknown` | `not_reviewed` |
| `open-questions.md` | 缺口、负责人、下一步 | `not_generated` | `unknown` | `not_reviewed` |
| `delivery-manifest.md` | 状态与交付记录 | `generated` | 本文件 | `not_reviewed` |

## 事实与质量检查

- [ ] 每项文案事实均为 `authorized`，并记录来源 ID 和适用变体。
- [ ] `observed` 事实仅作为中性观察进入人工审核。
- [ ] `unverified` 与 `unknown` 未进入可发布文案。
- [ ] 产品类型、颜色、结构、Logo 和变体与授权资产一致。
- [ ] 没有无依据的材料、性能、认证、产地、价格、配送或保修承诺。
- [ ] 图片用途不同，没有重复构图、意外文字、水印或明显画面缺陷。
- [ ] 视频首帧、关键镜头、时长和文件格式符合 Brief。
- [ ] 需要人工确认的市场、平台或合规事项已单列。
- [ ] 交付目录不含密钥、客户隐私数据或未授权素材。

## 阻塞项与发布决定

- 阻塞类型：`blocked_invalid_input`
- 仍缺少的资料或能力：`not_recorded`
- 证据冲突：`none_recorded`
- 下一步：补齐必需输入与具名审核责任
- 负责人：`not_assigned`
- 发布决定：`not_approved`
- 决定理由：尚未完成合同检查

`ready_for_review` 不等于允许发布。只有配置中的 `releaseDecisionOwner` 可以在全部检查后记录 `approved`；本包不执行发布。
