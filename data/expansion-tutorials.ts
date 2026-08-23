export const expansionTutorials = {
  "merchant-center-disapproval-triage": {
    short: "Merchant Center 拒登诊断台",
    eyebrow: "Google Merchant Center · 商品恢复实战",
    titleHtml: "用 AI 整理<em>拒登证据与修复队列</em>",
    sub: "读取商品级和账户级问题，生成可核对的修复草稿与复审证据；不绕过政策、不反复盲目申请复审。",
    chips: ["⏱ 约 <b>40 分钟</b>", "🧩 3 个步骤", "🛒 Merchant Center", "🔒 人工提交复审"],
    introIcon: "🚦", introTitle: "先理解问题，再修数据。", intro: "Limited 或 Not approved 只是状态，真正要处理的是对应的问题范围、受影响商品和官方要求。",
    goalLead: "完成一份拒登诊断表、修复队列和复审前检查单。", goal: "为一个真实问题建立 issue-pack.md，保留截图、商品 ID、官方规则、修改证据和负责人。",
    outcomes: [["问题地图", "区分账户级与商品级问题。"], ["修复队列", "按影响与证据完整度排序。"], ["复审包", "只在问题确已修复后提交。"]],
    criteria: ["保存原始问题截图", "逐条链接官方要求", "不伪造商品或公司信息", "修复源数据而非表面文案", "抽检受影响商品", "复审由账户负责人提交"],
    module: "从状态提示走到证据闭环", moduleSub: "AI 负责归类和检查，人负责修数据、判断政策与提交复审。",
    steps: [
      { title: "导出问题与影响范围", time: "10 分钟", target: "确认到底哪里被限制", blocks: [{ type: "list", items: ["保存问题名称、状态、首次发现时间和截止日期", "导出受影响商品 ID 与目标国家", "区分账户级、数据源级和商品级问题", "打开官方说明并保存链接"] }], done: "每个问题都有状态、范围、商品和规则链接。" },
      { title: "生成证据化修复队列", time: "18 分钟", target: "把提示翻译成可执行任务", blocks: [{ type: "prompt", label: "诊断提示词", text: "根据以下 Merchant Center 问题、商品页、feed 字段和官方规则，输出：问题范围、可能冲突、需要核实的事实、源系统、负责人、修复证据和回查方法。无法从资料确认的内容写待确认。不要建议规避政策、创建新账户或伪造资质。" }, { type: "note", kind: "warn", icon: "⚠️", label: "原则", text: "优先修商品页或源 feed；不要只在导出文件里临时覆盖。" }], done: "每项修复都有事实来源、负责人和验证方法。" },
      { title: "抽检后再申请复审", time: "12 分钟", target: "只提交已经完成的修复", blocks: [{ type: "list", items: ["抽检主商品和变体的页面/feed 一致性", "保存修改前后截图与同步时间", "确认账户级要求已经全部处理", "由账户负责人决定是否 Request review"] }, { type: "note", kind: "ok", icon: "✅", label: "验收", text: "复审包能让第三方快速看懂问题、修改和证据。" }], done: "复审决定与证据均有记录，不重复盲目提交。" }
    ],
    faq: [["问题很多先修哪个", "影响范围不同", "先处理账户级和会造成误购的 P0 问题"], ["AI 能直接改 feed 吗", "错误修改会扩大影响", "只生成修复草稿，由数据负责人应用"], ["修完马上复审吗", "同步可能尚未完成", "先回查页面和 Merchant Center 状态"], ["复审没通过怎么办", "可能仍有未修项或证据不足", "查看新反馈并建立下一轮差异清单"]],
    sources: [["Google：Issues in Merchant Center", "https://support.google.com/merchants/answer/12153802?hl=en-GB"], ["Google：Product visibility and status", "https://support.google.com/merchants/answer/12488713?hl=en"], ["Google：Request a review", "https://support.google.com/merchants/answer/13585221?hl=en-IE"]]
  },
  "tiktok-affiliate-creator-ops": {
    short: "TikTok Shop 达人合作台账",
    eyebrow: "YouTube 3.18 万观看 · TikTok Shop 官方流程",
    titleHtml: "把达人邀约、样品和授权<em>放进一张台账</em>",
    sub: "AI 辅助整理达人匹配理由和创作 brief；佣金、样品、内容审批与广告授权由卖家和创作者按平台流程确认。",
    chips: ["⏱ 约 <b>50 分钟</b>", "🧩 3 个步骤", "🤝 Affiliate Center", "🔒 授权范围可追溯"],
    introIcon: "🤝", introTitle: "合作增长建立在真实授权上。", intro: "Open、Target、样品和广告授权是不同环节。把它们混在一起，最容易产生交付、费用和素材使用争议。",
    goalLead: "为一个 SKU 建立 10 位候选达人的合作与授权台账。", goal: "完成 creator-ops.csv、创作 brief 和样品/授权审批记录，不承诺销售额。",
    outcomes: [["候选清单", "匹配理由有证据。"], ["合作 brief", "商品事实和禁区写清楚。"], ["授权台账", "内容与广告使用范围可追踪。"]],
    criteria: ["只用平台允许的数据筛选", "佣金由负责人设置", "样品数量有上限", "内容权利与广告授权分开记录", "不伪造达人表现", "不承诺收益"],
    module: "从候选达人到可审计合作", moduleSub: "AI 做整理和 brief，人确认产品、费用、样品、内容与授权。",
    steps: [
      { title: "建立达人筛选表", time: "15 分钟", target: "选择与商品和市场真正匹配的人", blocks: [{ type: "code", label: "台账字段", text: "creator | market | category_fit | audience_fit | content_quality | collaboration_type | evidence | owner | status" }, { type: "prompt", label: "筛选提示词", text: "根据平台提供的达人资料和品牌目标，生成候选匹配摘要。只引用输入中的公开或平台数据，列出匹配证据、风险和待人工确认项；不要推断收入、人口属性或私密信息。" }], done: "10 位候选达人都有匹配证据与人工负责人。" },
      { title: "制作事实型创作 brief", time: "18 分钟", target: "让创作者知道能说什么", blocks: [{ type: "list", items: ["商品事实、演示范围与目标市场", "禁止主张、平台政策与品牌安全要求", "交付格式、时间、修改轮次与沟通方式", "样品、佣金、固定费用与内容审批状态"] }, { type: "note", kind: "danger", icon: "🛑", label: "授权", text: "自然发布、卖家转载和广告投放不是同一种权利，必须分别确认。" }], done: "brief 已由商品和合作负责人审核。" },
      { title: "追踪样品、内容与授权", time: "17 分钟", target: "每一步都有状态和期限", blocks: [{ type: "list", items: ["在 Affiliate Center 建立合适的合作类型", "记录样品申请、批准、发货与签收", "记录视频提交、修改、发布和产品链接", "记录 ACA/视频码授权范围、期限和撤回状态"] }, { type: "note", kind: "ok", icon: "✅", label: "验收", text: "任何素材能否用于广告，都能在台账中得到明确答案。" }], done: "合作结果、费用和素材权利均可回溯。" }
    ],
    faq: [["达人匹配能全自动吗", "表现与品牌适配需要判断", "AI 只做候选摘要，由合作负责人选择"], ["样品能自动批准吗", "可能造成库存和成本风险", "设置配额并保留人工回退"], ["达人视频能直接投广告吗", "需要相应授权", "核对 ACA 或视频码及有效期"], ["视频效果不好怎么办", "不代表达人或商品必然无效", "按 brief、素材和真实数据复盘"]],
    sources: [["YouTube：AI TikTok Shop 课程与风险讨论", "https://www.youtube.com/watch?v=1XO4S9ZKLDY"], ["TikTok Shop：Setting Up Affiliate Collaborations", "https://seller-us.tiktok.com/university/essay?from=feature_guide&identity=1&knowledge_id=6837873164896001&role=1&shop_region=US"], ["TikTok Shop：Manage samples", "https://seller-us.tiktok.com/university/essay?default_language=en&identity=1&knowledge_id=5694209038927617"], ["TikTok Shop：Affiliate Creative for Ads", "https://seller-us.tiktok.com/university/course?content_id=2120705643824942&lang=en&learning_id=6414287660697358"]]
  },
  "klaviyo-lifecycle-map": {
    short: "AI 邮件生命周期地图",
    eyebrow: "X 1.4 万观看 · YouTube 2.66 万观看 · Klaviyo 官方",
    titleHtml: "用 AI 画出<em>跨境邮件生命周期</em>",
    sub: "先设计 Welcome、弃购、购后与召回的触发和退出条件，再由 AI 起草受约束的内容；发布前核对同意、频次和交易/营销边界。",
    chips: ["⏱ 约 <b>55 分钟</b>", "🧩 3 个步骤", "✉️ Klaviyo Flows", "🔒 同意与频次优先"],
    introIcon: "✉️", introTitle: "流程先于文案。", intro: "一封漂亮邮件解决不了错误触发、重复发送或未经同意的营销。先画清客户旅程，再写内容。",
    goalLead: "完成四条核心流程的只读蓝图和一条草稿流程。", goal: "交付 lifecycle-map.md：触发、过滤、分支、延迟、退出、频控、指标与审核人。",
    outcomes: [["流程地图", "四条生命周期互不打架。"], ["内容草稿", "每封邮件有单一任务。"], ["发布清单", "同意、频控和退出均可核验。"]],
    criteria: ["邮件与 SMS 同意分开", "交易与营销消息分开", "避免重复平台弃购邮件", "启用适当频控", "价格/优惠人工确认", "上线前预览测试"],
    module: "从客户事件到受控沟通", moduleSub: "AI 帮你画流程和起草，发送权限、同意与商业承诺留给负责人。",
    steps: [
      { title: "画四条核心流程", time: "18 分钟", target: "明确谁在什么时候进入和退出", blocks: [{ type: "code", label: "流程范围", text: "Welcome | Abandoned Cart | Post-purchase | Winback" }, { type: "list", items: ["为每条流程写触发、过滤与退出条件", "区分新客、复购客和已完成购买者", "标出交易通知和营销内容", "检查 Shopify 或其他工具是否已有重复发送"] }], done: "四条流程均有入口、出口和互斥说明。" },
      { title: "生成受限内容草稿", time: "20 分钟", target: "每封只完成一个任务", blocks: [{ type: "prompt", label: "邮件提示词", text: "根据品牌事实、目标市场和流程节点，起草一封 [语言] 邮件。输出主题、预览文字、正文、CTA、事实来源和人工审核项。不得生成未经批准的折扣、库存紧迫感、虚假评价或送达承诺；保留退订与偏好管理位置。" }, { type: "note", kind: "warn", icon: "⚠️", label: "SMS", text: "短信有独立同意、静默时间和地区要求，不要把邮件同意当成短信同意。" }], done: "草稿没有未经证实的优惠或承诺。" },
      { title: "测试触发、频次与退出", time: "17 分钟", target: "用测试账户走完整流程", blocks: [{ type: "list", items: ["用测试档案进入每条流程", "验证条件分支、延迟和购买后退出", "检查 Smart Sending/频控与静默时间", "预览桌面、移动端、链接和个性化变量", "先设 Draft/Manual，再由负责人转 Live"] }, { type: "note", kind: "ok", icon: "✅", label: "验收", text: "测试用户不会收到重复、错误市场或错误语言消息。" }], done: "流程蓝图与实测记录均已保存。" }
    ],
    faq: [["先做哪条流程", "取决于业务和数据质量", "通常先完成 Welcome、弃购和购后基础流程"], ["AI 能自动开优惠吗", "优惠影响价格与利润", "只起草占位符，由负责人批准"], ["邮件和 SMS 能共用同意吗", "渠道同意可能不同", "分别记录并按地区规则处理"], ["为什么用户收到两封弃购", "多个平台同时发送", "盘点并停用重复流程"]],
    sources: [["X：2026 Ecommerce Email Flow Map", "https://x.com/maxwellcopy/status/2031713136105971991"], ["YouTube：Klaviyo abandoned cart flow", "https://www.youtube.com/watch?v=lwFXhMDLS_c"], ["Klaviyo：Getting started with flows", "https://help.klaviyo.com/hc/en-us/articles/115002774932"], ["Klaviyo：Smart Sending", "https://help.klaviyo.com/hc/en-us/articles/115002779311"]]
  },
  "returns-root-cause-lab": {
    short: "AI 退货原因根因台",
    eyebrow: "Shopify Reports · 售后改进实战",
    titleHtml: "把退货记录变成<em>商品改进任务</em>",
    sub: "分析去标识化的退货原因、SKU、市场和批次，找出值得调查的模式；不让 AI 自动批准退款，也不把相关性写成根因。",
    chips: ["⏱ 约 <b>40 分钟</b>", "🧩 3 个步骤", "↩️ Returns Analytics", "🔒 不自动退款"],
    introIcon: "↩️", introTitle: "退货率不是答案，原因链才是。", intro: "尺码、包装、描述、物流和质量问题需要不同负责人。AI 适合分类和发现异常，根因必须靠证据验证。",
    goalLead: "完成一份按 SKU × 市场 × 原因拆分的退货调查表。", goal: "交付 returns-lab.csv 和三项待验证改进任务，每项都有负责人和验证方法。",
    outcomes: [["原因地图", "统一散乱的退货描述。"], ["异常清单", "定位需调查的 SKU/市场。"], ["改进任务", "把问题分配给页面、包装、物流或质检。"]],
    criteria: ["客户数据已去标识化", "区分退款与实物退回", "样本量可见", "不把相关性当因果", "不自动改变退货规则", "任务由负责人验收"],
    module: "从售后记录到可验证改进", moduleSub: "先清洗原因，再找异常；最后用实物、页面或物流证据验证。",
    steps: [
      { title: "准备最小必要数据", time: "10 分钟", target: "建立可比较的退货表", blocks: [{ type: "code", label: "建议字段", text: "return_date | sku | market | batch | return_reason | reversed_qty | refund_type | shipping_issue | notes" }, { type: "note", kind: "warn", icon: "⚠️", label: "隐私", text: "移除姓名、联系方式、地址、订单号等不必要字段。" }], done: "数据能按 SKU、市场和原因统计且不含个人信息。" },
      { title: "分类并标记异常", time: "16 分钟", target: "得到调查线索而非武断结论", blocks: [{ type: "prompt", label: "分析提示词", text: "对以下退货数据做主题归类和分组统计。列出每个主题的数量、占比、样本量、异常 SKU/市场、代表性原始描述和可能需要的验证证据。不要宣布根因，不要评价客户，不要建议自动拒绝或批准退款。" }], done: "所有异常都有样本量与原始记录支持。" },
      { title: "建立验证与改进任务", time: "14 分钟", target: "让正确团队处理正确问题", blocks: [{ type: "list", items: ["描述误解 → 商品页/尺码/FAQ 核验", "损坏或包装 → 仓库和包装抽检", "延迟或未收到 → 物流路线与承运商调查", "质量或批次 → 质检与供应商记录核验"] }, { type: "note", kind: "ok", icon: "✅", label: "验收", text: "每项任务都有证据、负责人、截止日期和后续观察窗口。" }], done: "至少三项调查任务已被相应负责人接收。" }
    ],
    faq: [["退货最多的 SKU 就该下架吗", "销量与样本量可能不同", "先看退货率、原因和实物证据"], ["能用 AI 判定客户责任吗", "数据不足且存在公平风险", "遵循政策并由客服人工处理"], ["负面描述能删吗", "会失去改进证据", "去标识化后保留原意"], ["分析后立刻改政策吗", "政策改动影响所有客户", "先验证根因并由负责人批准"]],
    sources: [["Shopify：Sales reports and reversals", "https://help.shopify.com/en/manual/reports-and-analytics/shopify-reports/report-types/default-reports/sales-report"], ["Shopify：Returns and exchanges", "https://help.shopify.com/en/manual/fulfillment/managing-orders/returns"]]
  },
  "shopify-inventory-risk-review": {
    short: "Shopify AI 补货风险周报",
    eyebrow: "Shopify Inventory · 采购前人工决策",
    titleHtml: "用 AI 做<em>缺货与积压情景周报</em>",
    sub: "基于销量、在库、在途与交期生成风险情景；AI 不创建采购单、不承诺预测准确，也不替采购负责人决定数量。",
    chips: ["⏱ 约 <b>35 分钟</b>", "🧩 3 个步骤", "📦 Inventory Reports", "🔒 采购单人工批准"],
    introIcon: "📦", introTitle: "预测是情景，不是订单。", intro: "库存数据缺失、新品无历史或促销变化都会让预测失真。先暴露假设，再讨论补货。",
    goalLead: "为 20 个 SKU 生成一份缺货、健康、积压三类风险周报。", goal: "完成 inventory-risk.csv、假设表和待审批采购建议，不直接改变库存。",
    outcomes: [["数据快照", "销量、在库、在途与交期可核对。"], ["风险情景", "基准、保守和促销三种假设。"], ["审批清单", "每项建议有人负责。"]],
    criteria: ["保留原始报表日期", "新品与 N/A 单独处理", "在途和交期有来源", "促销影响明确标记", "不自动创建采购单", "负责人确认最终数量"],
    module: "把库存数据转成可讨论情景", moduleSub: "AI 负责计算和标记风险，采购负责人结合现金、供应商与促销计划决策。",
    steps: [
      { title: "建立周度库存快照", time: "10 分钟", target: "统一计算口径", blocks: [{ type: "list", items: ["导出日均销量、在库、库存剩余天数和调整记录", "补充在途数量、预计到货和供应商交期", "标记新品、断货、促销和异常批次", "记录报表区间与时区"] }], done: "20 个 SKU 的输入字段与来源齐全或明确标为缺失。" },
      { title: "生成三种库存情景", time: "14 分钟", target: "让假设显性化", blocks: [{ type: "prompt", label: "情景提示词", text: "根据以下库存快照，为每个 SKU 计算基准、需求下降和促销上升三种情景下的库存剩余天数与潜在风险。列出公式、假设、缺失字段和置信限制。不要创建采购单、修改库存或给出保证性预测。" }], done: "每个风险标签都能看到输入、公式和假设。" },
      { title: "人工形成采购待办", time: "11 分钟", target: "把风险交给责任人", blocks: [{ type: "code", label: "审批字段", text: "sku | risk | scenario | suggested_range | cash_impact | supplier_constraint | owner | approve/reject" }, { type: "note", kind: "danger", icon: "🛑", label: "权限", text: "建议区间不是采购数量；采购单只能由授权人员确认并记录供应商条款。" }], done: "所有采购建议均处于批准、拒绝或待补证据状态。" }
    ],
    faq: [["新品没有销量怎么办", "无法形成可靠历史预测", "单独标为新品情景并小批验证"], ["AI 建议补很多货", "可能忽略现金和交期", "查看假设并由采购负责人判断"], ["库存报告显示 N/A", "销售数据不足", "不要强行填预测值"], ["促销前怎么处理", "历史需求可能不适用", "单独建立促销情景并写明假设"]],
    sources: [["Shopify：Inventory reports", "https://help.shopify.com/en/manual/reports-and-analytics/shopify-reports/report-types/default-reports/inventory-reports"], ["Shopify：Purchase orders", "https://help.shopify.com/en/manual/products/inventory/purchase-orders"], ["Shopify：Forecasting orders", "https://help.shopify.com/en/manual/fulfillment/managing-orders/analytics/forecasting-orders"]]
  },
  "chargeback-evidence-pack": {
    short: "AI 拒付证据整理包",
    eyebrow: "Shopify Payments · 支付争议响应",
    titleHtml: "让 AI 整理时间线，<em>让负责人提交证据</em>",
    sub: "根据争议类型整理订单、物流、沟通和政策证据；不生成不存在的材料、不保证胜诉，也不让 AI 代表商家作法律判断。",
    chips: ["⏱ 约 <b>35 分钟</b>", "🧩 3 个步骤", "💳 Chargebacks", "🔒 不伪造证据"],
    introIcon: "💳", introTitle: "强证据比长解释重要。", intro: "发卡行和卡组织作最终决定。AI 的角色是检查缺口、排时间线和写清标签。",
    goalLead: "为一笔真实争议创建证据目录、时间线和提交前检查单。", goal: "完成 dispute-pack.md，所有证据均来自真实系统记录并由支付负责人审核。",
    outcomes: [["争议摘要", "明确类型、金额、期限与主张。"], ["证据目录", "强证据优先且标签清楚。"], ["提交清单", "决定响应或接受争议。"]],
    criteria: ["记录官方截止日期", "证据均为真实记录", "客户数据最小化", "不修改截图内容", "不保证结果", "由授权负责人提交"],
    module: "从散乱记录到清晰响应", moduleSub: "先读争议类型，再收集最相关的直接证据；AI 只做整理和缺口检查。",
    steps: [
      { title: "读取争议与期限", time: "8 分钟", target: "确定需要证明什么", blocks: [{ type: "list", items: ["保存争议类型、金额、币种和响应截止日", "下载可用的 issuer claim", "确认是未收到、未授权、重复收费还是其他类型", "决定是否确实需要接受争议"] }], done: "争议主张和截止日期已由负责人确认。" },
      { title: "整理真实证据与时间线", time: "17 分钟", target: "最强证据放在前面", blocks: [{ type: "prompt", label: "证据整理提示词", text: "根据争议主张和以下真实记录，生成事实时间线与证据目录。每项写：文件名、日期、证明内容、与争议的关系、是否含敏感信息。仅引用已提供材料；缺少的证据列为缺口，不得虚构配送、沟通、验证或客户确认。" }, { type: "note", kind: "warn", icon: "⚠️", label: "隐私", text: "只保留处理争议所必需的客户和支付信息。" }], done: "每份证据都有清晰标签且能直接支持某项事实。" },
      { title: "人工审核并提交", time: "10 分钟", target: "在截止前完成有责任人的决定", blocks: [{ type: "list", items: ["核对截图完整性、日期和地址一致性", "删除无关或重复材料", "确认政策在购买时已展示", "由支付负责人决定提交响应或接受争议"] }, { type: "note", kind: "ok", icon: "✅", label: "验收", text: "保存最终提交版本和平台确认记录，但不承诺结果。" }], done: "响应在期限内由授权人员提交或明确接受。" }
    ],
    faq: [["证据多是不是更好", "无关材料会掩盖重点", "优先直接证据和客户确认"], ["能补做一张签收截图吗", "伪造证据不可接受", "只使用承运商和系统真实记录"], ["有物流签收就稳赢吗", "最终决定不由商家或 Shopify 作出", "清楚提交证据但不保证结果"], ["AI 能选是否接受吗", "涉及资金与责任判断", "由支付负责人决定"]],
    sources: [["Shopify：Responding to chargebacks", "https://help.shopify.com/en/manual/payments/chargebacks/chargeback-process"], ["Shopify：Managing chargebacks in admin", "https://help.shopify.com/en/manual/payments/chargebacks/chargebacks-in-admin"]]
  },
  "product-media-accessibility-audit": {
    short: "AI 商品媒体无障碍巡检",
    eyebrow: "Shopify Product Media · Accessibility",
    titleHtml: "给商品图片补上<em>真正有用的替代文本</em>",
    sub: "AI 根据已审核图片生成 alt text 草稿，再由人核对视觉事实、用途和重复内容；不堆关键词、不写图片中不存在的卖点。",
    chips: ["⏱ 约 <b>30 分钟</b>", "🧩 3 个步骤", "♿ Alt text", "🔒 人工逐图核对"],
    introIcon: "♿", introTitle: "替代文本描述图片，不替图片做广告。", intro: "同一商品的主图、细节图和场景图需要不同描述。准确、简短和有区分度比关键词密度更重要。",
    goalLead: "为一个商品的最多 10 张媒体创建 alt text 审核表。", goal: "完成 media-alt.csv，并只将通过审核的文本录入 Shopify。",
    outcomes: [["图片清单", "每张图的用途可见。"], ["描述草稿", "只描述可见事实。"], ["审核记录", "重复、遗漏和错误均被标记。"]],
    criteria: ["描述可见内容", "不重复商品标题", "不堆关键词", "不写功效或价格", "装饰图正确处理", "人工比对图片"],
    module: "让每张商品图都能被理解", moduleSub: "AI 提供初稿，人确认准确性、简洁性和是否真正帮助无法看图的用户。",
    steps: [
      { title: "建立媒体用途清单", time: "8 分钟", target: "知道每张图为什么存在", blocks: [{ type: "code", label: "字段", text: "media_id | sku | image_role | visible_details | text_in_image | locale | alt_draft | reviewer | status" }, { type: "list", items: ["区分主图、角度、细节、尺寸、包装和场景", "标记图片中的必要文字", "识别纯装饰或重复图片", "确认目标语言"] }], done: "每张图片都有用途和唯一 media_id。" },
      { title: "生成并批量质检草稿", time: "12 分钟", target: "只描述可见且相关的事实", blocks: [{ type: "prompt", label: "Alt text 提示词", text: "根据图片及其商品事实卡，为每张图写简短替代文本草稿。描述商品、关键可见特征和该图独有信息；不要写价格、优惠、SEO 关键词堆砌、无法看见的材质/功效或“图片显示”。若信息不确定，标记需人工确认。" }], done: "草稿简短、互不重复且没有不可见主张。" },
      { title: "逐图审核并保存", time: "10 分钟", target: "保证文本与图片一一对应", blocks: [{ type: "list", items: ["真人打开原图逐句核对", "检查同一语言下的术语一致性", "修正文字识别、数量、颜色和方向错误", "只保存审核通过的 alt text"] }, { type: "note", kind: "ok", icon: "✅", label: "验收", text: "抽查商品页：图片顺序、替代文本和目标语言一致。" }], done: "所有媒体均处于通过、需修改或无需 alt 三种明确状态。" }
    ],
    faq: [["Alt text 越长越好吗", "冗长会降低可用性", "保持简洁并描述关键信息"], ["能写商品卖点吗", "替代文本应描述图片", "只写图中可见且有用的事实"], ["同一商品图能用同一句吗", "不同图提供不同信息", "按图的独有内容分别描述"], ["AI 建议能直接接受吗", "可能识别错误或补写事实", "逐图人工核对后保存"]],
    sources: [["Shopify：Adding alt text to media", "https://help.shopify.com/en/manual/products/product-media/add-alt-text"], ["Shopify：Media editor", "https://help.shopify.com/en/manual/shopify-admin/productivity-tools/media-editor"]]
  },
  "google-ai-max-guardrail-test": {
    short: "Google AI Max 护栏实验",
    eyebrow: "YouTube 5.52 万观看 · Google Ads 官方",
    titleHtml: "给 AI Max 加上<em>品牌与落地页护栏</em>",
    sub: "在已有 Search Campaign 基线之上设计小流量实验，先核对品牌排除、URL 边界和文案事实，再由广告负责人决定是否应用。",
    chips: ["⏱ 约 <b>45 分钟</b>", "🧩 3 个步骤", "🔎 Google AI Max", "🔒 预算人工审批"],
    introIcon: "🔎", introTitle: "自动扩展之前，先定义不能扩展到哪里。", intro: "AI Max 可以扩大匹配和素材变化，实验的价值是看清增量与风险，而不是替账户负责人自动扩量。",
    goalLead: "完成一份 AI Max 实验 brief、排除清单和结果模板。", goal: "只创建可审核的实验草稿，不承诺 ROAS，不修改生产预算。",
    outcomes: [["基线快照", "当前查询、落地页和转化口径清楚。"], ["护栏清单", "品牌、URL 和禁用词有边界。"], ["实验模板", "人工决定应用或结束。"]],
    criteria: ["已有可比较基线", "品牌排除已审核", "URL 范围明确", "文案事实可证明", "转化口径不变", "预算与应用人工确认"],
    module: "让自动化在实验边界内学习", moduleSub: "先锁定品牌、页面与转化目标，再运行小范围实验并保留人工应用门。",
    steps: [
      { title: "保存基线与风险清单", time: "12 分钟", target: "知道当前表现和不能触碰的边界", blocks: [{ type: "list", items: ["保存活动设置、查询类别、落地页和转化目标", "列出品牌词、竞品词、受限商品和不允许访问的 URL", "核对地区、语言、预算和广告政策", "定义主指标与护栏指标"] }], done: "实验前状态和排除清单均已保存。" },
      { title: "生成实验配置草稿", time: "18 分钟", target: "一次只开启可解释的变化", blocks: [{ type: "prompt", label: "配置审核提示词", text: "根据以下 Search Campaign 基线、品牌规则、URL 清单和产品事实，生成 AI Max 实验配置检查表。标出需要人工设置的品牌排除、URL 排除、禁用词、地区、预算和转化目标；不要生成未经证实文案，不要更改账户。" }, { type: "note", kind: "warn", icon: "⚠️", label: "控制变量", text: "实验期间不要同时大改出价、预算、落地页和转化定义。" }], done: "实验草稿能清楚解释控制组与处理组差异。" },
      { title: "观察并人工决策", time: "15 分钟", target: "用报告而非单日波动作结论", blocks: [{ type: "list", items: ["按预设窗口观察并检查查询与落地页质量", "记录品牌安全、转化质量和成本护栏", "标记数据不足或受学习期影响的结果", "由广告负责人应用、结束或重新设计实验"] }, { type: "note", kind: "ok", icon: "✅", label: "验收", text: "结果报告同时包含收益信号、风险信号和不确定性。" }], done: "最终决定与理由已记录，不自动扩量。" }
    ],
    faq: [["能直接在主活动开启吗", "无法保留清晰对照", "优先使用适用的实验流程"], ["AI 写的广告能直接发布吗", "可能超出商品事实或品牌规则", "逐条审核资产和落地页"], ["一天数据很好能扩预算吗", "短期波动不代表稳定结果", "按预设窗口和负责人决策"], ["品牌词被扩到不合适页面", "URL/品牌护栏不足", "检查排除和落地页范围"]],
    sources: [["YouTube：Google Ads AI Max for Search", "https://www.youtube.com/watch?v=Rvx_-dnwIUU"], ["Google Ads：About AI Max", "https://support.google.com/google-ads/answer/15910187?hl=en"], ["Google Ads：AI Max experiments", "https://support.google.com/google-ads/answer/16450159?hl=en"]]
  },
  "meta-advantage-catalog-control": {
    short: "Meta Advantage+ 目录扩量台",
    eyebrow: "YouTube 3.86 万观看 · Meta 官方自动化资料",
    titleHtml: "让 Advantage+ 扩量，<em>让目录与预算可控</em>",
    sub: "先核对 Pixel/CAPI、商品目录和客户边界，再创建小范围自动化广告草稿；不把平台归因数字直接当作增量收益。",
    chips: ["⏱ 约 <b>45 分钟</b>", "🧩 3 个步骤", "📣 Meta Advantage+", "🔒 人工发布与扩量"],
    introIcon: "📣", introTitle: "自动投放需要可信信号和干净目录。", intro: "当事件重复、商品状态错误或素材与落地页不一致时，更强的自动化只会更快放大问题。",
    goalLead: "完成目录、事件、受众和预算四部分的上线前审计。", goal: "交付 advantage-control.md，只保留待发布草稿和人工审批记录。",
    outcomes: [["目录审计", "商品、价格和库存一致。"], ["信号审计", "核心事件不重复。"], ["扩量规则", "预算和停止条件预先写清。"]],
    criteria: ["目录与落地页一致", "Purchase 事件去重", "现有客户策略明确", "素材已授权", "预算有上限", "不以平台单点归因承诺增量"],
    module: "在自动化前治理目录与信号", moduleSub: "AI 帮你检查异常和生成 brief，广告负责人掌握发布、预算和扩量。",
    steps: [
      { title: "核对目录与转化信号", time: "15 分钟", target: "先确保系统读到正确商品和购买事件", blocks: [{ type: "list", items: ["抽检商品 ID、标题、价格、库存和落地页", "检查 ViewContent、AddToCart、Purchase 事件", "核对 Pixel 与 CAPI 去重状态", "保存当前数据共享与同意设置"] }], done: "抽检商品与核心事件均有测试记录。" },
      { title: "建立自动化投放护栏", time: "15 分钟", target: "把受众、素材和预算边界写清", blocks: [{ type: "prompt", label: "护栏提示词", text: "根据以下商品目录、转化事件、目标市场和品牌规则，生成 Advantage+ 上线检查表。包含：可用商品、需排除商品、现有客户策略、素材授权、禁用主张、预算上限、停止条件和人工审批人。不要创建广告或预测收益。" }], done: "上线前清单已由商品、数据和广告负责人会签。" },
      { title: "小范围发布与对账", time: "15 分钟", target: "同时看平台和店铺侧证据", blocks: [{ type: "list", items: ["由负责人发布并记录版本、预算和日期", "检查广告实际展示商品与页面", "对照平台购买、Shopify 订单和重复事件", "达到停止条件时人工暂停，扩量需新审批"] }, { type: "note", kind: "ok", icon: "✅", label: "验收", text: "报告区分平台归因、站内订单和可能的增量假设。" }], done: "投放结果能回到目录、事件和预算版本。" }
    ],
    faq: [["平台购买比 Shopify 多", "归因窗口或事件重复可能不同", "先审计事件与口径"], ["目录里有缺货商品", "同步或商品集筛选有问题", "暂停相关商品并修源数据"], ["能自动加预算吗", "会扩大成本和品牌风险", "设置上限并由负责人审批"], ["AI 素材能直接用吗", "可能失真或未授权", "按商品事实和授权逐份审核"]],
    sources: [["YouTube：Advantage+ Shopping Guide", "https://www.youtube.com/watch?v=ZFPVr5UHUF4"], ["Meta：Advertising automation", "https://www.facebook.com/business/ads/automation"], ["Meta：Advantage+ audience", "https://www.facebook.com/business/ads/meta-advantage-plus/audience"]]
  },
  "pinterest-performance-plus-test": {
    short: "Pinterest Performance+ 实验",
    eyebrow: "YouTube 41.13 万观看 · Pinterest Business 官方",
    titleHtml: "建立 Pinterest <em>视觉商品广告实验</em>",
    sub: "为跨境商品准备经过审核的 feed、视觉素材和小额实验，再观察学习期与站内结果；AI 背景或文案默认只作候选。",
    chips: ["⏱ 约 <b>45 分钟</b>", "🧩 3 个步骤", "📌 Pinterest Performance+", "🔒 不自动扩预算"],
    introIcon: "📌", introTitle: "视觉发现也需要可追溯实验。", intro: "Pinterest 的商品和视觉语境与其他渠道不同。先确保素材、目录和事件正确，再让自动化学习。",
    goalLead: "完成一个国家、一个商品组的 Performance+ 实验草稿。", goal: "输出 pinterest-test.md、10 份审核素材和事件验证记录。",
    outcomes: [["素材包", "每份素材有来源与用途。"], ["事件记录", "核心转化信号可测试。"], ["实验台账", "学习期与变更被记录。"]],
    criteria: ["feed 与落地页一致", "素材授权清楚", "AI 图不改变商品", "地区与年龄边界明确", "学习期不频繁改动", "预算人工批准"],
    module: "从视觉素材到受控学习", moduleSub: "先准备可信 feed 和素材，再建立固定边界的 Performance+ 测试。",
    steps: [
      { title: "准备商品与素材包", time: "16 分钟", target: "让目录和图片表达同一商品", blocks: [{ type: "list", items: ["抽检商品 ID、价格、库存、图片和落地页", "准备 10 份不同构图但事实一致的素材", "记录每份素材的授权、版本和目标 Pin 场景", "AI 生成内容逐图比对实物"] }], done: "商品 feed 与 10 份素材均通过人工审核。" },
      { title: "验证测量并配置草稿", time: "15 分钟", target: "先测试事件，再设定实验", blocks: [{ type: "prompt", label: "设置提示词", text: "根据以下 Pinterest 商品 feed、素材清单、目标市场和测量设置，生成 Performance+ 上线检查表。列出 Tag/CAPI 事件、国家、年龄、客户排除、预算上限、学习期注意事项和停止条件；不要创建或发布广告。" }], done: "事件测试和广告边界均有截图记录。" },
      { title: "发布、等待与复盘", time: "14 分钟", target: "避免学习期内追涨杀跌", blocks: [{ type: "list", items: ["负责人确认预算并发布", "学习期间只处理政策或严重数据错误", "对照平台结果、站内订单和商品级表现", "记录表现素材但不宣称必然因果"] }, { type: "note", kind: "ok", icon: "✅", label: "验收", text: "实验报告写明变更时间、数据限制和下一轮假设。" }], done: "负责人决定保留、停止或重新测试。" }
    ],
    faq: [["AI 背景能直接上吗", "可能改变商品或文化语境", "逐图审核并保留原始素材"], ["学习期能换素材吗", "频繁变更会污染判断", "除严重问题外按计划观察"], ["平台订单和店铺不一致", "归因口径可能不同", "做事件和订单对账"], ["表现好就加预算吗", "扩量会改变竞价环境", "按上限和人工审批执行"]],
    sources: [["YouTube：Pinterest Performance+ targeting", "https://www.youtube.com/watch?v=wVOevyRKUpk"], ["Pinterest：Performance+", "https://help.pinterest.com/en/business/article/pinterest-performance-plus"], ["Pinterest Academy：Performance webinar", "https://www.pinterestacademy.com/student/page/2337424-webinar-pinterest-performance"]]
  },
  "shopify-meta-capi-audit": {
    short: "Shopify × Meta CAPI 信号审计",
    eyebrow: "YouTube 21.23 万观看 · Meta for Business 官方",
    titleHtml: "给 AI 广告补齐<em>可信转化信号</em>",
    sub: "通过官方渠道核对 Pixel、Conversions API、事件去重与隐私设置；不手工上传原始个人信息，也不把更多数据等同于更好效果。",
    chips: ["⏱ 约 <b>40 分钟</b>", "🧩 3 个步骤", "📡 Pixel / CAPI", "🔒 同意与最小化"],
    introIcon: "📡", introTitle: "错误信号会训练出错误决策。", intro: "事件重复、金额错误或同意配置不匹配，会同时伤害报表和广告系统。先审计，再优化。",
    goalLead: "完成 ViewContent、AddToCart 和 Purchase 三个事件的测试与去重记录。", goal: "交付 signal-audit.md，不更改未经批准的隐私或数据共享设置。",
    outcomes: [["事件地图", "浏览到购买路径清楚。"], ["去重检查", "浏览器与服务器事件可核对。"], ["治理记录", "同意、隐私和负责人明确。"]],
    criteria: ["使用官方 Shopify 渠道", "测试订单可识别", "事件金额与币种正确", "Pixel/CAPI 去重", "同意设置经负责人审核", "不输出原始 PII"],
    module: "让测量信号准确、最小且可解释", moduleSub: "AI 帮你整理测试结果，数据和隐私负责人决定配置。",
    steps: [
      { title: "保存当前连接与政策", time: "10 分钟", target: "先知道系统正在发送什么", blocks: [{ type: "list", items: ["记录 Shopify Facebook & Instagram 渠道状态", "记录 Pixel、数据共享级别和目标市场", "保存隐私政策、Cookie/同意设置与负责人", "创建可识别的测试计划"] }], done: "当前配置与责任人已形成快照。" },
      { title: "运行事件与去重测试", time: "18 分钟", target: "核对事件名称、次数、金额和币种", blocks: [{ type: "prompt", label: "审计提示词", text: "根据以下浏览器事件、服务器事件和 Shopify 测试订单日志，生成事件对账表。检查 ViewContent、AddToCart、InitiateCheckout、Purchase 的次数、event_id、金额、币种和时间；标记重复、缺失和无法确认项。不要输出个人信息或建议绕过同意。" }], done: "每个核心事件均通过或有明确修复任务。" },
      { title: "修复后复测并签收", time: "12 分钟", target: "让生产信号有负责人", blocks: [{ type: "list", items: ["只通过官方设置修正允许的配置", "再次走测试浏览与测试订单", "检查重复事件和金额", "由数据/隐私负责人签收最终状态"] }, { type: "note", kind: "ok", icon: "✅", label: "验收", text: "审计报告不包含客户原始个人信息。" }], done: "事件准确性和同意设置都有复核记录。" }
    ],
    faq: [["Pixel 和 CAPI 都有是不是重复", "需要正确 event_id 去重", "检查测试事件与对账"], ["数据共享越高越好吗", "涉及同意与最小化", "由隐私负责人按市场规则决定"], ["购买金额不对", "币种或事件参数可能错误", "用测试订单逐项核对"], ["能上传客户名单补数据吗", "可能涉及额外同意与政策", "不在本教程执行，先走隐私审批"]],
    sources: [["YouTube：Meta CAPI with Shopify", "https://www.youtube.com/watch?v=5Fu-CcxpbsE"], ["Shopify：Meta data sharing", "https://help.shopify.com/en/manual/promoting-marketing/analyze-marketing/meta-data-sharing"], ["Shopify：Meta pixel", "https://help.shopify.com/en/manual/promoting-marketing/analyze-marketing/meta-pixel"]]
  },
  "support-knowledge-gap": {
    short: "客服对话到知识库缺口",
    eyebrow: "X 4.1 万观看 · Shopify Knowledge Base",
    titleHtml: "把客服对话变成<em>可核验的知识缺口</em>",
    sub: "去标识化客服对话，归纳重复问题并回链商品、配送和政策资料；不自动发布 FAQ，也不让 AI 决定退款或投诉处理。",
    chips: ["⏱ 约 <b>40 分钟</b>", "🧩 3 个步骤", "📚 Knowledge Base", "🔒 对话先去标识化"],
    introIcon: "📚", introTitle: "客服问题是知识库的真实测试。", intro: "同一个问题反复出现，往往说明页面、政策或内部知识存在缺口，而不只是客服回复慢。",
    goalLead: "从 50 条去标识化对话中形成知识缺口清单。", goal: "交付 kb-gap.csv 和最多 5 条待审核 FAQ，不自动发布。",
    outcomes: [["问题主题", "重复意图与市场差异可见。"], ["证据缺口", "哪些答案缺资料一目了然。"], ["更新队列", "FAQ、页面与内部流程分别负责。"]],
    criteria: ["移除个人和订单信息", "保留对话原意", "答案回链真实资料", "退款与投诉必须升级", "多语言由人工审核", "FAQ 发布需负责人确认"],
    module: "从真实问题回到资料源", moduleSub: "AI 分类问题与缺口，人补事实、审语言并决定发布。",
    steps: [
      { title: "导出并去标识化对话", time: "10 分钟", target: "只保留分析所需信息", blocks: [{ type: "list", items: ["确认对话使用范围和保存期限", "移除姓名、邮箱、地址、订单号和支付信息", "保留市场、语言、主题、日期和对话文本", "排除安全、健康或法律个案并转人工"] }], done: "分析集不含不必要的客户身份信息。" },
      { title: "归纳主题与证据缺口", time: "16 分钟", target: "区分已有答案、缺证据和必须升级", blocks: [{ type: "prompt", label: "知识缺口提示词", text: "分析以下去标识化客服对话，按商品、尺寸、配送、退换、支付、使用和其他主题归类。对每个主题输出数量、代表性问题、现有资料是否能回答、缺失证据、目标市场差异和是否必须人工处理。不要生成退款决定或客户个人结论。" }], done: "每个主题都被标为已覆盖、需补资料或必须人工处理。" },
      { title: "起草并人工审核 FAQ", time: "14 分钟", target: "只发布有证据的答案", blocks: [{ type: "prompt", label: "FAQ 提示词", text: "根据已确认的商品与政策资料，为知识缺口表中优先级最高的问题起草最多 5 条 FAQ。每条包含简短问题、事实型回答、来源、适用市场、不能承诺的内容和复核日期。资料不足时不写答案。" }, { type: "note", kind: "ok", icon: "✅", label: "验收", text: "商品、客服和市场负责人共同审核后才能发布。" }], done: "FAQ 草稿与知识缺口队列均有负责人。" }
    ],
    faq: [["能直接把客服对话喂给 AI 吗", "含有个人和订单信息", "先去标识化并限制范围"], ["高频问题都该做 FAQ 吗", "部分问题需要个案处理", "只发布能稳定、公开回答的问题"], ["AI 能翻译所有市场吗", "政策和语气可能不同", "逐市场人工审核"], ["FAQ 能减少退款吗", "需要后续数据验证", "把它作为假设而非承诺"]],
    sources: [["X：客服对话到帮助文档工作流", "https://x.com/tibo_maker/status/1953750606738309211"], ["Shopify：Knowledge Base", "https://help.shopify.com/en/manual/promoting-marketing/knowledge-base"], ["Shopify：Managing FAQs", "https://help.shopify.com/en/manual/promoting-marketing/knowledge-base/managing-faqs"]]
  },
  "creative-pattern-remix-safe": {
    short: "爆款结构安全拆解",
    eyebrow: "X 1.09 万观看 · TikTok 知识产权规则",
    titleHtml: "学内容结构，<em>不复制创作者作品</em>",
    sub: "只抽象 Hook、镜头长度、节奏和信息顺序，再使用品牌自有素材重新创作；不下载重剪、不复制台词、不仿冒创作者。",
    chips: ["⏱ 约 <b>45 分钟</b>", "🧩 3 个步骤", "🎞️ Structure Remix", "🔒 版权与授权优先"],
    introIcon: "🎞️", introTitle: "模式可以研究，表达不能偷走。", intro: "对热门内容最有价值的学习是结构假设，而不是换皮复刻。",
    goalLead: "从 5 条公开内容提炼结构模式，创作 3 条完全使用自有素材的分镜。", goal: "交付 pattern-map.md、原创 brief 和授权记录。",
    outcomes: [["结构地图", "只记录抽象模式。"], ["原创分镜", "产品、台词与画面重新设计。"], ["授权表", "所有输入和输出权利可追踪。"]],
    criteria: ["不下载或重剪原视频", "不复制台词与独特表达", "不模仿创作者身份或声音", "只用自有/授权素材", "产品事实已审核", "发布前做相似性检查"],
    module: "从观察模式到原创表达", moduleSub: "AI 帮你抽象节奏与结构，但素材、脚本和角色必须重新创作。",
    steps: [
      { title: "只记录抽象结构", time: "12 分钟", target: "把作品和模式分开", blocks: [{ type: "code", label: "可记录字段", text: "opening_type | shot_count | avg_shot_length | proof_order | objection | cta_position" }, { type: "note", kind: "danger", icon: "🚫", label: "不可记录为模板", text: "原台词、独特角色、音乐、画面和标志性表达不得直接复制。" }], done: "5 条内容只留下抽象结构数据和原始链接。" },
      { title: "生成原创创作 brief", time: "18 分钟", target: "用品牌自有事实重新设计", blocks: [{ type: "prompt", label: "原创提示词", text: "根据以下抽象结构模式和品牌自有商品事实，设计 3 条原创短视频分镜。更换具体情节、台词、视觉表达、人物设定和节奏细节，只保留一般性信息顺序假设。不得模仿原创作者身份、声音、台词、画面或音乐；列出所需自有/授权素材。" }], done: "每条分镜均能在不查看原视频时独立完成。" },
      { title: "授权与相似性复核", time: "15 分钟", target: "上线前检查表达是否真正独立", blocks: [{ type: "list", items: ["核对图片、视频、音乐、字体和人物授权", "并排检查是否出现相同台词、镜头或标志性表达", "确认产品主张来自事实卡", "记录创作者、版本和审批人"] }, { type: "note", kind: "ok", icon: "✅", label: "验收", text: "最终作品只使用自有或明确授权的素材。" }], done: "三个原创分镜均通过授权与相似性检查。" }
    ],
    faq: [["热门视频能下载分析吗", "下载和再利用可能受权利限制", "保存链接并只记录抽象观察"], ["改几个词算原创吗", "仍可能复制核心表达", "重新设计脚本、画面和角色"], ["能克隆创作者声音吗", "涉及身份与声音授权", "使用自有或明确授权声音"], ["结构也有版权吗", "具体法律判断因地区而异", "避免复制具体表达并保留创作记录"]],
    sources: [["X：AI 内容结构复用讨论", "https://x.com/erichustls/status/2021963571622547495"], ["TikTok Ads：Intellectual property policy", "https://ads.tiktok.com/help/article/tiktok-ads-policy-intellectual-property-infringement"], ["TikTok Ads：Content Suite", "https://ads.tiktok.com/resources/help/article/about-tiktok-content-suite"]]
  },
  "multilingual-product-demo": {
    short: "多语言产品演示短片",
    eyebrow: "X 16.14 万观看 · 商品录屏工作流",
    titleHtml: "把真实录屏变成<em>多语言产品演示</em>",
    sub: "从真实商品操作或功能录屏出发，生成脚本、字幕和配音草稿；逐条核对功能、包装、尺寸与声音授权。",
    chips: ["⏱ 约 <b>50 分钟</b>", "🧩 3 个步骤", "🎥 Screen Demo", "🔒 不虚构功能"],
    introIcon: "🎥", introTitle: "演示应证明功能，而不是想象功能。", intro: "真实录屏提供事实锚点，AI 负责整理节奏和语言版本；任何产品能力都必须在画面或资料中得到证明。",
    goalLead: "为一个商品或工具制作 30–45 秒双语演示草稿。", goal: "交付原始录屏、事实时间轴、双语脚本、字幕和声音授权记录。",
    outcomes: [["事实时间轴", "每句旁白对应真实画面。"], ["双语脚本", "功能和术语一致。"], ["发布检查", "字幕、声音和媒体权利已审核。"]],
    criteria: ["只用真实录屏", "功能逐句有证据", "翻译不扩大主张", "声音与音乐有授权", "字幕与画面同步", "人工预览成片"],
    module: "从事实录屏到跨语言讲解", moduleSub: "先锁定画面证据，再写脚本、翻译和字幕，最后做逐句验收。",
    steps: [
      { title: "录制并标记事实时间轴", time: "15 分钟", target: "知道每一秒能证明什么", blocks: [{ type: "list", items: ["录制完整、未经剪辑的真实操作", "标记每个动作、结果和等待时间", "记录产品版本、市场和已知限制", "删除账号、订单或客户敏感信息"] }], done: "时间轴中的每项能力都能在原始录屏中找到。" },
      { title: "生成脚本与语言版本", time: "20 分钟", target: "旁白不超出画面事实", blocks: [{ type: "prompt", label: "演示提示词", text: "根据以下录屏时间轴和产品事实，写 30–45 秒演示脚本，包含时间码、镜头、旁白、字幕和画面说明。再翻译为 [目标语言]，保持型号、数字、功能、限制和 CTA 一致。不要补充画面未证明的能力、速度或效果。" }, { type: "note", kind: "warn", icon: "⚠️", label: "声音", text: "不要克隆未经明确授权的真人声音。" }], done: "每句双语旁白都回链到时间码和事实来源。" },
      { title: "剪辑、字幕与逐句验收", time: "15 分钟", target: "发布前消除功能和语言错误", blocks: [{ type: "list", items: ["检查镜头未隐藏失败或限制", "逐句核对字幕、数字、单位和按钮名称", "检查声音、音乐、字体和截图授权", "输出 draft、review 和 approved 三个状态"] }, { type: "note", kind: "ok", icon: "✅", label: "验收", text: "让未参与制作的人按视频复现操作，记录歧义。" }], done: "成片草稿通过产品、语言和权利审核。" }
    ],
    faq: [["能用 AI 补录缺失画面吗", "会失去真实演示属性", "重新录制真实画面或明确标为概念"], ["翻译后功能更强了", "模型扩大了主张", "回到事实时间轴逐句修正"], ["能模仿名人配音吗", "缺少声音与身份授权", "使用自有或明确授权声音"], ["画面里有客户信息", "存在隐私风险", "重新录制或可靠遮挡后再使用"]],
    sources: [["X：录屏转演示视频工作流", "https://x.com/DerekFeehrer/status/2028887848901067042"], ["Shopify：Product media", "https://help.shopify.com/en/manual/products/product-media"], ["Shopify：Media editor", "https://help.shopify.com/en/manual/shopify-admin/productivity-tools/media-editor"]]
  },
  "amazon-search-term-mining": {
    short: "Amazon 搜索词淘金台",
    eyebrow: "Amazon Ads · Sponsored Products",
    titleHtml: "用 AI 整理<em>关键词与否词候选</em>",
    sub: "分析搜索词报告，区分可扩展、需观察和否词候选；AI 不直接改广告，不因少量点击删除潜在词。",
    chips: ["⏱ 约 <b>40 分钟</b>", "🧩 3 个步骤", "🅰️ Amazon Ads", "🔒 人工应用关键词"],
    introIcon: "🅰️", introTitle: "搜索词是客户语言，也是广告证据。", intro: "同一个词在不同匹配、ASIN 和时间窗口下含义不同。先保留上下文，再归类。",
    goalLead: "从一份 Sponsored Products 搜索词报告生成审核队列。", goal: "交付 search-term-review.csv，不自动添加关键词或否词。",
    outcomes: [["词表清洗", "查询、匹配和商品上下文完整。"], ["候选分组", "扩展、观察和否定分开。"], ["应用记录", "每项变更有理由和负责人。"]],
    criteria: ["保留报告区间", "显示点击与转化样本", "品牌词单独处理", "不因少量数据武断否定", "Listing 相关性人工核对", "广告负责人应用"],
    module: "从搜索词报告到可审核动作", moduleSub: "AI 做清洗和候选分类，广告负责人结合利润、库存和 Listing 判断。",
    steps: [
      { title: "整理报告与业务上下文", time: "10 分钟", target: "保证每个词都有商品和时间背景", blocks: [{ type: "code", label: "字段", text: "query | campaign | ad_group | match_type | asin | clicks | spend | orders | sales | date_range" }, { type: "list", items: ["记录币种与归因窗口", "补充商品毛利、库存和品牌词标记", "移除客户个人信息", "保留原始导出文件"] }], done: "词表能回到原活动、商品和报告窗口。" },
      { title: "生成三类候选", time: "18 分钟", target: "把归类与决定分开", blocks: [{ type: "prompt", label: "搜索词提示词", text: "分析以下 Amazon Ads 搜索词报告和商品事实。将查询分为：可扩展关键词候选、继续观察、否词候选。每项给出相关性证据、样本量、成本/订单信号、风险和需要人工确认的信息。不要直接修改广告，不把少量点击或单次转化写成确定结论。" }], done: "每个候选都附商品相关性和样本限制。" },
      { title: "人工审核并记录应用", time: "12 分钟", target: "避免误杀或无边界扩词", blocks: [{ type: "list", items: ["核对搜索意图与 Listing 页面", "检查品牌、竞品和受限词风险", "结合库存、利润和预算决定", "记录添加、否定、观察或拒绝及日期"] }, { type: "note", kind: "ok", icon: "✅", label: "验收", text: "下一周期可按同一口径回看变更影响。" }], done: "所有实际广告变更均由负责人执行并留痕。" }
    ],
    faq: [["有花费没订单就否掉吗", "样本量和转化周期可能不足", "结合相关性与预设阈值观察"], ["AI 能看懂所有搜索意图吗", "可能忽略语境和品牌规则", "人工核对 Listing 与市场语言"], ["竞品词能加吗", "涉及政策、品牌与成本判断", "由广告负责人按官方规则决定"], ["关键词表现好能改 Listing 吗", "搜索词不一定等于商品事实", "只把真实相关语言纳入页面审核"]],
    sources: [["Amazon Ads：Sponsored Products targeting", "https://advertising.amazon.com/en-us/library/guides/targeting-with-sponsored-products/"], ["Amazon Ads：Search term report", "https://advertising.amazon.com/help/G3HEFZYWZF84NPS9"]]
  },
  "ai-hs-code-evidence-pack": {
    short: "AI 海关编码证据包",
    eyebrow: "跨境合规 · 仅做候选资料整理",
    titleHtml: "整理 HS 编码候选，<em>不让 AI 最终定码</em>",
    sub: "把材质、用途、结构、原产地和官方候选依据整理给报关行或目的国专业人员；不生成最终海关编码或税额承诺。",
    chips: ["⏱ 约 <b>45 分钟</b>", "🧩 3 个步骤", "🧾 HS evidence", "⚖️ 专业人员最终确认"],
    introIcon: "🧾", introTitle: "编码错误可能影响税费与清关。", intro: "商品名称往往不足以分类。AI 只能整理事实、列出问题和候选依据，最终编码需按目的国规则确认。",
    goalLead: "为一个 SKU 建立可交给报关行审核的商品分类证据包。", goal: "交付 hs-evidence.md，不把候选编码写入生产系统。",
    outcomes: [["事实卡", "材质、用途和结构可证明。"], ["候选问题表", "缺失信息显性化。"], ["审核记录", "专业人员给出最终决定。"]],
    criteria: ["目的国明确", "商品事实有文件证据", "候选与最终值分开", "不承诺税率或清关", "不自动写入店铺", "报关行/专业人员确认"],
    module: "把商品事实交给正确的分类责任人", moduleSub: "AI 只做资料目录和问题清单，最终分类与申报由具备责任的人员完成。",
    steps: [
      { title: "建立商品分类事实卡", time: "15 分钟", target: "描述商品本身而非营销名称", blocks: [{ type: "list", items: ["目标进口国家或地区", "主要材质与成分比例", "主要用途、工作原理和是否成套", "尺寸、功率、附件、原产地与规格文件", "供应商已有分类及其依据"] }], done: "关键事实均有规格书、照片或供应商文件。" },
      { title: "生成候选与缺口清单", time: "15 分钟", target: "只提供研究线索", blocks: [{ type: "prompt", label: "证据整理提示词", text: "根据以下商品事实和目的国官方分类资料，整理可能相关的章节/候选编码研究线索。对每个候选列出支持事实、冲突事实、缺失问题和官方依据链接。明确标注“非最终分类”。不要给出确定编码、税率、清关保证或规避申报建议。" }, { type: "note", kind: "danger", icon: "🛑", label: "法律边界", text: "候选结果不能直接用于报关、商品发布或税费承诺。" }], done: "候选表明确标为研究线索并列出所有不确定性。" },
      { title: "交专业人员确认并回写", time: "15 分钟", target: "建立可审计决定", blocks: [{ type: "list", items: ["将事实包和候选问题交给报关行/专业人员", "记录最终编码、目的国、依据、确认人和日期", "由授权人员更新 Shopify 或报关系统", "商品变化或市场变化时重新复核"] }, { type: "note", kind: "ok", icon: "✅", label: "验收", text: "生产系统中的编码能回到专业确认记录。" }], done: "最终值由具备责任的人员确认并留痕。" }
    ],
    faq: [["AI 给了一个很确定的编码能用吗", "模型信心不等于海关判断", "只作为候选交专业人员确认"], ["不同国家编码一样吗", "后续位数和规则可能不同", "按目的国官方规则核对"], ["能顺便算关税吗", "税率还受原产地和政策影响", "由专业人员用最终编码计算"], ["商品小改版要复核吗", "材质或功能变化可能影响分类", "更新事实卡并重新确认"]],
    sources: [["Shopify：Duties and import taxes", "https://help.shopify.com/en/manual/international/duties-and-import-taxes"], ["Shopify：Product details", "https://help.shopify.com/en/manual/products/details"], ["EU：Selling products safely in the EU", "https://europa.eu/youreurope/business/product-rules-compliance/product-safety-and-liability/selling-products-safely/index_en.htm"]]
  },
  "eu-gpsr-product-file": {
    short: "欧盟 GPSR 商品资料包",
    eyebrow: "EU Product Safety · 高风险人工核验",
    titleHtml: "为欧盟商品建立<em>GPSR 资料缺口清单</em>",
    sub: "AI 只整理制造商、欧盟责任人、追溯、警示和安全资料的缺口；不能判断产品合规，也不能替代法律、合规或市场监管专业意见。",
    chips: ["⏱ 约 <b>55 分钟</b>", "🧩 3 个步骤", "🇪🇺 GPSR", "⚖️ 合规负责人签收"],
    introIcon: "🇪🇺", introTitle: "商品安全资料不是营销文案。", intro: "不同产品可能还受其他欧盟规则约束。本教程只建立资料目录和人工审核路径。",
    goalLead: "为一个拟销往欧盟的普通消费品建立 GPSR 资料缺口表。", goal: "交付 gpsr-file-index.md，不发布商品、不作合规结论。",
    outcomes: [["资料目录", "现有文件与负责人可见。"], ["缺口清单", "缺什么、谁补、何时补。"], ["签收记录", "合规负责人决定后续动作。"]],
    criteria: ["产品范围与市场明确", "制造商/进口商/责任人信息有证据", "安全与警示资料单独管理", "追溯字段可核对", "不由 AI 宣布合规", "上线由合规负责人批准"],
    module: "让商品安全资料可追溯、可交接", moduleSub: "AI 负责盘点和格式化，合规专业人员负责适用性、充分性与最终决定。",
    steps: [
      { title: "建立产品与责任主体目录", time: "18 分钟", target: "先确认谁对什么负责", blocks: [{ type: "list", items: ["产品名称、型号、批次/序列追溯方式", "制造商、进口商和欧盟责任人资料", "目标成员国与销售渠道", "说明书、警示、测试、安全与投诉/事故资料", "可能适用的其他产品专项规则"] }], done: "每份现有资料都有文件、版本、负责人和日期。" },
      { title: "生成资料缺口表", time: "20 分钟", target: "只盘点，不作法律判断", blocks: [{ type: "prompt", label: "缺口盘点提示词", text: "根据以下产品资料与欧盟官方 GPSR 信息，生成资料目录和待合规负责人确认的缺口问题。分类：责任主体、产品识别、追溯、风险/安全资料、警示与说明、多语言、线上展示、事故/召回记录。不要判断产品合规，不要生成虚假测试、声明或责任人信息。" }, { type: "note", kind: "danger", icon: "🛑", label: "高风险", text: "缺少专业确认时，不得将“资料齐全”写成“符合 GPSR”。" }], done: "每个缺口都被写成具体问题并分配负责人。" },
      { title: "专业审核与版本签收", time: "17 分钟", target: "让上线决定有责任链", blocks: [{ type: "list", items: ["由合规/法律/责任人核对适用规则", "补充或修正安全、警示和线上展示资料", "保存专业意见、版本与批准范围", "产品、供应商、市场或规则变化时重新评估"] }, { type: "note", kind: "ok", icon: "✅", label: "验收", text: "平台发布权限与合规签收分离，未批准商品保持草稿。" }], done: "合规负责人明确批准、拒绝或要求补证据。" }
    ],
    faq: [["资料齐全就代表合规吗", "还需判断规则适用与内容充分性", "由合规专业人员确认"], ["AI 能写安全测试报告吗", "测试必须真实完成并有资质记录", "只整理真实文件，不生成证明"], ["欧盟责任人能随便填吗", "需要真实授权和责任关系", "由企业与专业人员确认"], ["商品改包装要复核吗", "警示、追溯或主体信息可能变化", "更新资料并重新签收"]],
    sources: [["EUR-Lex：General Product Safety Regulation summary", "https://eur-lex.europa.eu/EN/legal-content/summary/general-product-safety-regulation-2023.html"], ["European Commission：Product safety", "https://commission.europa.eu/business-economy-euro/doing-business-eu/eu-product-safety-and-labelling/product-safety_en"], ["Your Europe：Selling products safely", "https://europa.eu/youreurope/business/product-rules-compliance/product-safety-and-liability/selling-products-safely/index_en.htm"]]
  }
} as const;
