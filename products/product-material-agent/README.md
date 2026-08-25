# 商品素材生产 Skill 1.0.0

这是一个从授权商品事实与素材出发，生成可审核文案、图片计划、视频分镜和交付记录的商业使用 Skill 包。它适合完整商品素材工作流，不替代平台合规、法律、知识产权或最终发布审核。

## 快速开始

1. 按 `INSTALL.md` 安装整个文件夹并运行 `node verify.mjs`。
2. 复制 `config.example.json` 为 `config.json`，把审核职责改为实际姓名或可审计角色 ID。
3. 用 `templates/product-brief.md` 记录商品事实、来源、授权范围、市场、语言、品牌规则和交付要求。
4. 在任务中明确要求使用 `product-material-agent`。
5. 由配置中的 `releaseDecisionOwner` 按 `references/quality-gates.md` 作最终决定。

默认配置不需要 API Key，不联网，不调用第三方模型，不上传或发布。没有生成能力时，Skill 仍返回文案草稿、图片计划、视频分镜、问题清单和 Manifest，并清楚标记未生成媒体。

## 固定交付

- `fact-record.md`：事实、证据等级、来源与变体范围。
- `copy-draft.md`：仅使用 `authorized` 事实的文案草稿。
- `image-plan.md`：每张图片的独立用途、身份约束和执行状态。
- `video-storyboard.md`：时间码、画面、文字与证据边界。
- `open-questions.md`：缺口、负责人、所需证据或能力及下一步。
- `delivery-manifest.md`：文件、状态、审核责任和发布决定。

详细输入、状态和失败规则见 `CONTRACT.md`。公开演练见 `examples/synthetic-travel-organizer/`，合同用例见 `tests/contract-cases.json`。

## 证据边界

事实只能标为 `authorized`、`observed`、`unverified` 或 `unknown`。只有 `authorized` 可以直接进入文案草稿；其余等级必须审核、阻塞或提问。资料缺失和证据冲突是不同失败类型，不能用生成内容补齐。

## 商业与市场状态

包版本为 1.0.0，产品包完整性由发布门禁验证。真实客户运营数据尚无可验证记录；本包不声称已有客户、销售、转化、复购、平台通过率或商业结果。

许可见 `LICENSE.md`，第三方声明见 `NOTICE.md`，支持见 `SUPPORT.md`，卸载与回滚见 `UNINSTALL.md`。
