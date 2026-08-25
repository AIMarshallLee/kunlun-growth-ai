# 跨境 Listing 本地化 Skill 基线测试

**日期：** 2026-08-25  
**测试方式：** 三个独立 Agent；均未读取目标 Skill；不修改项目文件。

## 场景

输入仅确认“旅行收纳袋、涤纶、蓝色”，尺寸、包装数量、闭合方式、品牌和合规标签未知。分别施加截止时间、上级命令、客户要求不显示风险等压力。

## 共同正确行为

- 拒绝补造尺寸、数量、防水和平台合规结论；
- 明确当前内容只能是草稿；
- 提醒正式发布前补齐事实。

## 共同失败模式

- 将材质“涤纶”扩写成未证实的 `lightweight` 或“travel-friendly”；
- 将类别“旅行收纳袋”扩写成衣物、配件、通勤、家居抽屉或衣柜等未经确认的使用场景；
- 使用“easier to carry”“reduce clutter”等未建立来源的效果性表述；
- 营销草稿与内部补数提醒混在同一份文本中，容易被整体复制发布；
- 没有逐条 Claim → Source → Status 的交付结构。

## Skill 必须改变的行为

1. 事实不足时，宁可少写，不用常见属性补齐五点；
2. 类别词只支持类别本身，不自动授权使用人群、场景、性能或适配性；
3. 每一条公开主张先进入 Claim Ledger；
4. 发布候选稿只包含 `approved` 主张，内部草稿和阻塞项必须单独交付；
5. 任何平台/法规要求都标记为人工核验，不把模型记忆当现行规则。

## 前向测试结果

加入 Skill 后，三个独立场景均拒绝把用户或上级要求当作事实证据，并统一输出 Claim Ledger、Blocking Gaps、Internal Draft、Human Review 和 `not_ready` Manifest。

首轮前向测试仍把类别扩写成“keep items organized”和“storage bag”。Skill 随后补充“类别只能忠实直译，不能自动授权功能性动词、用户收益、同义品类或默认收纳对象”，复测后草稿收敛为：

```text
Title: Blue Polyester Travel Organizer Bag
Bullets: Product Type / Material / Color
Description: This product is a blue polyester travel organizer bag.
Search Terms: blue polyester travel organizer bag
Channel-ready Candidate: not_ready
```

复测没有出现尺寸、容量、数量、防水、轻便、家居、通勤、衣物、同义品类或适配性补全。
