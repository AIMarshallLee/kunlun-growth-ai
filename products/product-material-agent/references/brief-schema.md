# 产品 Brief 结构

在资料来自多个文件时，先整理成统一记录：

```text
product_name:
category:
brand:
sku_or_variant:
fact_record: [事实 ID + 内容 + authorized/observed/unverified/unknown + 来源 + 适用范围]
prohibited_or_unverified_claims: [内容 + 原因 + 负责人 + 所需证据]
identity_cues: [轮廓、颜色、可见细节]
source_assets: [来源 ID + 路径 + 授权用途 + 适用变体]
markets_and_languages: []
channels: []
requested_deliverables: []
file_constraints: [尺寸、时长、文件类型]
brand_style: [语气、配色、字体、禁止元素]
reviewers: [事实审核 + 素材授权审核 + 品牌审核 + releaseDecisionOwner]
generation_mode: disabled 或 authorized_provider；只记录模式，不记录凭证
```

`authorized` 是经权利人提供或明确批准且用途清楚的事实；`observed` 是从授权资产直接可见或可测但未被单独批准的事实；`unverified` 是来源、范围或一致性不足的说法；`unknown` 是没有提供且不能安全观察的字段。只有 `authorized` 可直接进入文案草稿。

没有直接来源的字段写 `unknown`。变体事实必须分开保存，不能把不同 SKU 的属性合并。缺资料使用 `blocked_missing_evidence`；来源互相矛盾或不能证明说法使用 `blocked_evidence_conflict`，两者不得合并。
