# 发布前质量门槛

1. **真实性：** 每个文案事实均为 `authorized` 并能回链到来源；`observed` 只进入人工审核，`unverified` 与 `unknown` 不包装成卖点。
2. **身份一致：** 产品类型、轮廓、颜色、结构、Logo 和变体与选定源资产一致。
3. **可用性：** 每张图片有不同用途，目标尺寸下可辨认，没有意外文字、水印、无关道具或明显缺陷。
4. **视频：** 首帧和关键镜头保持真实产品身份；时长、编码、声音/字幕符合 Brief。
5. **交付：** 六个固定输出存在且能打开，格式符合要求，Manifest 记录工作流状态、证据范围、缺口和发布决定。
6. **责任：** 事实、素材授权、品牌和 `releaseDecisionOwner` 均为具名人员或可审计角色 ID。
7. **安全：** 包和交付目录不含凭证；未自动联网、付费、上传、发布、覆盖或删除客户资产。

状态必须是 `ready_for_review`、`blocked_invalid_input`、`blocked_missing_evidence`、`blocked_evidence_conflict` 或 `blocked_capability` 之一。真实性或身份一致出现关键问题时不得发布。缺少资料与证据冲突必须分别记录；模型、工具或文件能力不足使用 `blocked_capability`。阻塞时仍交付事实记录、问题清单和 Manifest，并写清负责人、所需证据或能力及下一步。

`ready_for_review` 仅表示可以开始人工审核。只有 `releaseDecisionOwner` 在全部门槛通过后可以记录批准；本包不会自动发布。
