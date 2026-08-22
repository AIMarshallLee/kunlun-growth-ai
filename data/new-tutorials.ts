export const newTutorials = {
  "agentic-product-data": {
    short: "AI 购物入口商品事实包",
    eyebrow: "X Agentic Commerce 讨论 · Shopify 官方能力",
    titleHtml: "让 AI 购物入口<em>读懂你的商品</em>",
    sub: "不做自动下单机器人。先把商品事实、库存、价格与政策整理成可核验的结构化资料，再决定是否开放给 AI 购物渠道。",
    chips: ["⏱ 约 <b>40 分钟</b>", "🧩 4 个步骤", "🛍 Shopify / Merchant Center", "🔒 不自动改价或履约"],
    introIcon: "🧾",
    introTitle: "AI 推荐先读事实，不读口号。",
    intro: "Agentic storefronts 会使用商店里的产品数据。任何型号、库存、价格、配送或退换承诺不一致，都会直接影响用户判断与售后风险。",
    goalLead: "完成一份可供人工审核的商品事实包，并核对店铺是否允许 AI 购物渠道读取商品。",
    goal: "为一个真实 SKU 建立 facts.json、证据链接表和渠道开关记录；全程不打开直接结账、不修改库存或价格。",
    outcomes: [["一份事实包", "标题、属性、变体、价格与限制均可追溯。"], ["一个渠道决定", "明确哪些 AI 购物渠道允许读取或结账。"], ["一张复核表", "上线前能逐项对照商品页。"]],
    criteria: ["每个关键字段都有来源", "价格、库存和配送不由 AI 猜测", "变体与图片对应", "退换与限制条件可见", "渠道开关由店主确认", "未开启未经授权的直接结账"],
    module: "让商品先成为可信的数据对象",
    moduleSub: "先锁定事实，再补结构化字段；最后才考虑 AI 渠道的发现与结账能力。",
    steps: [
      { title: "选一个低风险 SKU", time: "5 分钟", target: "用真实、资料齐全的商品练习", blocks: [{ type: "list", items: ["优先选择非医疗、非成人、非受限类目", "准备供应商规格、包装清单、实拍图和现有商品页", "记录当前售价、库存、发货地和退换规则", "信息缺失就标记待确认，不补编" ] }, { type: "note", kind: "warn", icon: "⚠️", label: "边界", text: "不要用测试过程生成的标题、价格或政策直接覆盖线上商品。" }], done: "选定一个 SKU，且资料来源已收齐。" },
      { title: "建立商品事实包", time: "12 分钟", target: "把营销文案和可验证事实分开", blocks: [{ type: "prompt", label: "事实包提示词", text: "根据以下原始资料，为一个跨境商品生成 facts.json 草稿。字段包括：sku、brand、title、variant、material、dimensions、package_contents、country_of_origin、price_currency、price、inventory_status、shipping_origin、return_policy、restrictions、evidence_links。没有证据的字段写 null，并列出待确认问题。不要生成功效、优惠、库存数量或配送时效承诺。" }, { type: "note", kind: "tip", icon: "🧠", label: "原则", text: "先让 AI 整理，再由人逐字段回链到规格书、商品页或政策页。" }], done: "facts.json 中每个非空字段都能指出证据来源。" },
      { title: "核对结构化数据与变体", time: "12 分钟", target: "机器读取与落地页展示一致", blocks: [{ type: "list", items: ["检查商品页标题、图片、价格和可售状态", "检查每个尺寸/颜色变体有正确 SKU 和图片", "核对 Merchant Center feed 或 Product JSON-LD 中对应字段", "当价格、库存或政策更新时，安排同步复核" ] }, { type: "note", kind: "danger", icon: "🛑", label: "不可省略", text: "结构化数据和页面不一致会误导用户；发现差异先修数据，不要用提示词掩盖。" }], done: "抽检 1 个主商品和 2 个变体，页面与事实包一致。" },
      { title: "人工决定 AI 渠道权限", time: "11 分钟", target: "渠道访问与直接结账可控", blocks: [{ type: "prompt", label: "审核提示词", text: "审计这份商品事实包和当前商品页。输出：1) 可安全公开给 AI 购物渠道的字段；2) 必须隐藏或补证据的字段；3) 可能造成错误购买的风险；4) 是否建议开启商品发现；5) 是否建议开启直接结账。不要替店主改变任何设置。" }, { type: "note", kind: "ok", icon: "✅", label: "提交物", text: "保存审核结论、渠道开关截图和事实包版本号。" }], done: "店主明确批准或拒绝每个渠道的商品发现与结账设置。" }
    ],
    faq: [["AI 入口显示的商品不对", "产品事实或结构化字段不一致", "先核对落地页、feed 和变体映射"], ["价格变了但 AI 仍显示旧价", "更新尚未同步", "暂停该商品在渠道中的可发现性并复核同步"], ["想让 AI 自动处理退款", "高风险操作没有审批门", "只让 AI 生成客服草稿，由人工确认退款"], ["缺少材质或产地", "供应商资料不完整", "标记待确认，不要生成看似确定的字段"]],
    sources: [["X：Shopify Agentic Commerce API 讨论", "https://x.com/liam_at_shopify/status/2010398156878668254"], ["Shopify：Managing agentic storefronts", "https://help.shopify.com/en/manual/online-sales-channels/agentic-storefronts/agentic-home"], ["Google Merchant Center：结构化商品属性", "https://support.google.com/merchants/answer/6386198?hl=en-001"], ["Shopify Storefront API", "https://shopify.dev/docs/api/storefront/latest"]]
  },
  "ai-product-visual-brief": {
    short: "AI 商品视觉提案包",
    eyebrow: "X 1.02 万浏览 · AI 商品图实战",
    titleHtml: "用 AI 做一套<em>可审核的商品视觉提案</em>",
    sub: "从真实商品资料出发，为一个 SKU 做主图、场景图和短视频的创意草稿；先完成可追溯的提案，不把生成图直接当成商品事实。",
    chips: ["⏱ 约 <b>45 分钟</b>", "🧩 4 个步骤", "📷 图片 / 视频草稿", "🔒 不伪造产品属性"],
    introIcon: "📸",
    introTitle: "视觉创意可以生成，产品事实不能生成。",
    intro: "AI 很适合快速探索构图、场景与镜头语言；但颜色、尺寸、配件、材质和实际效果必须与真实资料保持一致。",
    goalLead: "交付一个包含素材来源、提示词、版本和人工审核结论的视觉提案包。",
    goal: "为一个 SKU 创建 3 张图片草稿与 1 条短视频分镜提案，并形成 visual-brief.md 和审核清单。",
    outcomes: [["一张事实卡", "锁定不能改变的产品特征。"], ["一组创意草稿", "区分主图、场景图与细节图用途。"], ["一份审核记录", "决定哪些内容只能做广告创意，哪些可上架。"]],
    criteria: ["只使用已授权的原始素材", "提示词明确禁止改变产品", "每张图有用途与版本号", "不写无证据功效", "不伪造评价或人物背书", "发布前由商品负责人审核"],
    module: "从商品事实到视觉测试",
    moduleSub: "先设定不可变字段，再做小范围创意变体；审核通过前一律是草稿。",
    steps: [
      { title: "建立不可变事实卡", time: "8 分钟", target: "让生成工具知道什么绝不能改", blocks: [{ type: "list", items: ["真实商品多角度图与包装图", "SKU、颜色、材质、尺寸与配件", "允许出现的场景与人群", "不能出现的功效、文字、Logo 与对比" ] }, { type: "prompt", label: "事实卡提示词", text: "把以下 SKU 资料整理成视觉事实卡：不可改变的产品特征、允许场景、禁止元素、必须人工确认的主张。缺失信息列为待确认。不要补充不存在的卖点。" }], done: "事实卡明确写出至少 5 个不可变字段和所有禁区。" },
      { title: "设计 3 个用途不同的草稿", time: "12 分钟", target: "不把所有图当同一种素材", blocks: [{ type: "list", items: ["主图草稿：纯净背景、完整商品、无促销字", "场景图草稿：只表达已批准的使用情境", "细节图草稿：只放大真实存在的材质或结构" ] }, { type: "note", kind: "warn", icon: "⚠️", label: "注意", text: "平台主图规则因站点与类目而异；先查目标平台规则，再决定是否使用 AI 图。" }], done: "每一张草稿都标明用途，而不是只写“好看”。" },
      { title: "生成并记录版本", time: "15 分钟", target: "每一张图可复现、可审计", blocks: [{ type: "prompt", label: "生成提示词", text: "以参考图中的商品为唯一产品依据。保持款式、颜色、材质、尺寸比例、配件完全一致，不重新设计。生成 [主图/场景图/细节图] 草稿。禁止文字、价格、折扣、品牌 logo、水印、虚假评价、第二件商品和无法从资料证实的功能。输出前说明哪些地方需要人工比对。" }, { type: "list", items: ["保存输入图来源和授权状态", "保存提示词、模型/工具、日期与版本号", "将生成文件命名为 SKU_use_v01", "不把未审核图上传为线上产品媒体" ] }], done: "每份草稿都能找到输入、提示词与版本记录。" },
      { title: "做上架前人工审核", time: "10 分钟", target: "把创意和商品事实分开处理", blocks: [{ type: "prompt", label: "审核提示词", text: "对照商品事实卡审核这组视觉草稿。逐项输出：颜色、轮廓、材质、配件、数量、尺寸比例、人物呈现、文字/Logo、功效暗示、平台用途风险。每项标记通过、需修正或不能发布，并给出证据。" }, { type: "note", kind: "ok", icon: "✅", label: "交付", text: "只将“通过”的素材放入待发布文件夹；其余保留为创意实验记录。" }], done: "最终文件夹区分 approved、revise 与 experiment 三类素材。" }
    ],
    faq: [["生成图与实物颜色不同", "模型重绘或光照改变颜色", "以实拍图为准，必要时不用生成图"], ["出现不存在的配件", "提示词与参考素材约束不足", "增加不可变事实卡并重新审核"], ["能否直接上传为主图", "未核对平台与类目规则", "先人工检查平台规则和商品真实性"], ["想展示用户好评", "没有真实授权或证据", "不要生成或伪造评价素材"]],
    sources: [["X：先做 AI 商品视觉作品集", "https://x.com/iksly2/status/2026193534768824547"], ["Shopify：Product media", "https://help.shopify.com/en/manual/products/product-media"], ["Shopify：Media editor", "https://help.shopify.com/en/manual/shopify-admin/productivity-tools/media-editor"]]
  },
  "tiktok-gmvmax-creative-loop": {
    short: "TikTok Shop AI 创意探索",
    eyebrow: "X TikTok Shop 实战讨论 · 官方 GMV Max 指南",
    titleHtml: "建立 <em>TikTok Shop</em> 创意探索闭环",
    sub: "用 AI 辅助整理真实创作者素材和脚本变体，再让 GMV Max 在符合授权与账户规则的前提下探索创意；不承诺 GMV 或 ROAS。",
    chips: ["⏱ 约 <b>50 分钟</b>", "🧩 4 个步骤", "🎬 创意台账", "🔒 授权 / 人工发布"],
    introIcon: "📈",
    introTitle: "AI 加速变体，真实数据决定保留。",
    intro: "GMV Max 会在合资格创意中探索表现信号。你需要持续提供已授权、事实准确的素材，而不是批量制造不可控内容。",
    goalLead: "为一个产品建立 12 条候选创意的台账、授权状态和复盘规则。",
    goal: "完成一个可用于创意探索的测试包：3 个已批准 Hook × 2 种结构 × 2 个节奏版本，并保留人工审批门。",
    outcomes: [["创意矩阵", "每次只改变有限变量。"], ["授权台账", "可识别哪些素材可用于广告。"], ["复盘口径", "以平台可用数据决定下一轮。"]],
    criteria: ["创作者和广告授权状态清楚", "产品链接与素材对应", "不伪造评价、销量或效果", "每条视频有 ID 与版本", "不以单条数据断言成功", "投放前人工确认预算和发布"],
    module: "让创意探索留下可学习的证据",
    moduleSub: "从真实素材提炼 Hook，再做受控变体；平台探索之后，继续用记录更新下一轮。",
    steps: [
      { title: "盘点可使用的素材", time: "10 分钟", target: "先确认授权再谈生成", blocks: [{ type: "list", items: ["品牌自有产品图、视频与演示素材", "创作者内容的使用范围、有效期和广告授权", "对应 SKU、商品链接与地区", "已知的禁说主张、平台拒审原因" ] }, { type: "note", kind: "danger", icon: "🚫", label: "禁止", text: "不要把未授权创作者内容、伪造评价或虚构顾客身份交给 AI 扩写。" }], done: "每个候选素材都有 owner、授权状态和产品对应关系。" },
      { title: "从真实素材提取 Hook", time: "10 分钟", target: "把观察转成可测试假设", blocks: [{ type: "prompt", label: "Hook 提取提示词", text: "分析以下已授权视频和真实评论摘要。只提取已出现、可被证实的开场方式、产品演示、常见问题和 CTA。输出 3 个 Hook 假设，每个都附对应证据与禁止表述。不要写“保证”“最强”“治愈”“人人有效”或虚构用户经历。" }], done: "得到 3 个带证据的 Hook，而不是一组泛泛卖点。" },
      { title: "生成受控创意矩阵", time: "15 分钟", target: "每轮只学习一两件事", blocks: [{ type: "code", label: "创意台账字段", text: "creative_id | sku | source_asset | authorization | hook | structure | pacing | claim_review | status | publish_date | notes" }, { type: "prompt", label: "分镜提示词", text: "基于已批准 Hook，为同一 SKU 写 4 条 15–25 秒短视频分镜。只改变开场 Hook 或节奏，不改变产品事实、人物身份和 CTA。每条写明镜头、旁白/字幕草稿、需要人工核对的主张，以及不得发布的风险点。" }], done: "至少 12 条候选素材有唯一 ID，且变量清晰。" },
      { title: "发布前审批与复盘", time: "15 分钟", target: "让平台探索而非直觉裁决", blocks: [{ type: "list", items: ["确认 TikTok Shop、广告账户和 GMV Max 访问权限", "确认所有创意可用、已授权且未被拒审", "由负责人确认产品、预算、ROI 目标和发布时间", "定期查看可用创意、探索状态和强表现素材", "从表现较好的结构提炼下一轮单变量变体" ] }, { type: "note", kind: "warn", icon: "⚠️", label: "不要误读", text: "官方说明中，GMV Max 汇总付费与自然信号；不要与口径不同的旧广告数据直接作结论。" }], done: "测试结果被记录为下一轮假设，不被写成保证收益的案例。" }
    ],
    faq: [["很多视频没有进入探索", "授权、可用性、拒审或账户设置有阻塞", "先检查创意状态与授权，不要盲目重复上传"], ["只有一个视频表现好", "变量太多，无法归因", "从胜出视频只复制一个可验证模式"], ["想用 AI 批量铺账号", "可能违反平台规则且难以质控", "保持品牌与创作者授权范围内的合规测试"], ["ROI 目标很紧，没数据", "系统没有足够学习空间", "由账户负责人评估预算和目标，不让 AI 擅自修改"]],
    sources: [["X：TikTok Shop 人类 UGC 与 AI 变体讨论", "https://x.com/maverickecom/status/2035036433707143528"], ["TikTok Shop：How to Use GMV Max Advertising", "https://seller-us.tiktok.com/university/essay?from=feature_guide&identity=1&knowledge_id=8502408340260654&role=1"], ["TikTok Ads：Creative exploration for Product GMV Max", "https://ads.us.tiktok.com/help/article/how-to-improve-creative-exploration-in-product-gmv-max"], ["TikTok Ads：GMV Max Guidelines", "https://ads.tiktok.com/help/article/gmv-max-guidelines?lang=en"]]
  }
} as const;
