# 合成旅行收纳袋预期输出

此文件展示六项固定输出的内容边界，不代表生成了独立文件、媒体资产、客户成果或平台通过记录。

## 1. `fact-record.md`

工作流状态：`ready_for_review`

| 事实 | 等级 | 来源 | 处理 |
|---|---|---|---|
| 无品牌灰色旅行收纳袋 | `authorized` | A-01 | 可用于草稿 |
| 聚酯纤维主体 | `authorized` | A-02 | 可用于草稿 |
| 28 × 20 × 10 cm | `authorized` | A-03 | 仅适用 `STO-GRAY-01` |
| 拉链开合、一个网布顶面 | `authorized` | A-04 | 可用于草稿与镜头计划 |
| 一个提手 | `authorized` | A-05 | 可用于草稿与镜头计划 |
| 可能防泼水 | `unverified` | 无可用来源 | 从草稿排除 |
| 承重、内部分隔、产地、认证、价格、保修 | `unknown` | 未提供 | 从草稿排除并提问 |

没有授权媒体，因此没有 `observed` 事实。

## 2. `copy-draft.md`

审核状态：`not_approved`

**Title**  
Gray Polyester Travel Organizer with Zippered Closure, Mesh Top Panel and Carry Handle, 28 × 20 × 10 cm

**Description**  
This gray travel organizer is made with a polyester body and measures 28 × 20 × 10 cm. It has a zippered closure, one mesh top panel and one carry handle.

**Factual bullets**

- Gray travel organizer
- Polyester body
- 28 × 20 × 10 cm
- Zippered closure with one mesh top panel
- One carry handle

文案没有出现防泼水、承重、内部结构、产地、认证、价格、保修或商业效果。

## 3. `image-plan.md`

执行状态：全部 `planned_only`，媒体状态 `not_generated`。

| 镜头 | 独立用途 | 计划 | 证据约束 |
|---|---|---|---|
| I-01 | 主图 | 中性背景的整体正面视图 | 必须先取得 SKU 授权源图；保持灰色与真实轮廓 |
| I-02 | 开合细节 | 拉链区域近景 | 只展示 A-04，不添加锁扣或双拉头 |
| I-03 | 材料结构 | 网布顶面近景 | 只展示 A-02、A-04，不宣称透气性能 |
| I-04 | 尺寸说明 | 三向尺寸标注图 | 仅使用 A-03；不加入容量或承重 |
| I-05 | 提手细节 | 单个提手的中近景 | 只展示 A-05，不演示承重 |

## 4. `video-storyboard.md`

执行状态：`planned_only`；视频状态：`not_generated`。

| 时间 | 画面 | 屏幕文字 | 约束 |
|---|---|---|---|
| 0.0–2.0 秒 | 整体静态视图，轻微横移 | Gray travel organizer | 需先取得授权源图 |
| 2.0–4.0 秒 | 拉链与网布顶面细节 | Zippered closure · Mesh top panel | 不演示防水或性能 |
| 4.0–6.0 秒 | 提手与尺寸信息 | 28 × 20 × 10 cm | 不做承重演示；尺寸仅适用指定 SKU |

## 5. `open-questions.md`

| 问题 | 类型 | 负责人 | 所需证据 / 下一步 |
|---|---|---|---|
| 是否需要实际生成图片或视频？ | 能力范围 | `synthetic-release-owner-role` | 如需要，另行批准提供方、预算和授权源图 |
| 能否使用防泼水说法？ | 缺少证据 | `synthetic-fact-review-role` | 提供适用该 SKU 的授权测试或规格；此前排除 |
| 是否提供承重、内部分隔、产地、认证、价格或保修？ | 未知事实 | `synthetic-fact-review-role` | 提供授权来源，或继续保持 `unknown` |

## 6. `delivery-manifest.md`

- 输入：`synthetic-travel-organizer-001` / `STO-GRAY-01`
- 固定输出：六项文本内容齐备
- 工作流状态：`ready_for_review`
- 图片文件：`not_generated`
- 视频文件：`not_generated`
- 事实审核：`synthetic-fact-review-role`，待记录
- 素材授权审核：`synthetic-rights-review-role`，待记录
- 品牌审核：`synthetic-brand-review-role`，待记录
- 发布决定负责人：`synthetic-release-owner-role`
- 发布决定：`not_approved`
- 自动联网、付费、上传或发布：未执行

`ready_for_review` 只表示计划和草稿可以交给人工审核，不表示可以发布。
