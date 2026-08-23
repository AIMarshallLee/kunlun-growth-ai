export const expansionRoundTwoC = {
  "ai-dropship-supplier-gate": {
    short: "AI 选品后的供应商核验门",
    eyebrow: "YouTube 1695 万观看 · Mark Tilbury · 核验于 2026-08-23",
    titleHtml: "AI 选品之后，先过<em>供应商与履约核验门</em>",
    sub: "把热门‘AI dropshipping’流程改造成供应商证据、样品、时效、召回与退款责任检查；不承诺被动收入，也不让 Agent 自动付款下单。",
    chips: ["⏱ 约 <b>60 分钟</b>", "🧩 3 个步骤", "📦 Supplier Due Diligence", "🔒 真人签约与付款"],
    introIcon: "📦", introTitle: "选品只是猜想，履约才是生意。", intro: "视频热度能提供灵感，但不能证明供应商、质量、知识产权或交付可靠。先用可验证证据把候选供应商逐个过门。",
    goalLead: "为一个候选商品、三家供应商建立可审计的准入对照。", goal: "完成 supplier-gate.csv、样品测试计划和责任问题单，不自动签约、付款或上架。",
    outcomes: [["证据对照", "主体、地址、资质与条款有来源。"], ["样品计划", "质量、包装与时效可实测。"], ["准入决定", "通过、补证或淘汰理由清楚。"]],
    criteria: ["主体信息来自可核验文件", "必须实际订购样品", "知识产权与召回责任单列", "运费和交期不用模型猜", "退款与缺陷责任写清", "签约付款由负责人审批"],
    module: "把 AI 选品热度转成供应链证据", moduleSub: "AI 帮你整理 RFQ 和差异，人负责验厂、样品、合同、付款与合规判断。",
    steps: [
      { title: "建立供应商证据表", time: "20 分钟", target: "确认在和谁、以什么条件合作", blocks: [{ type: "code", label: "核验字段", text: "supplier | legal_entity | address | product_match | certifications | sample | MOQ | lead_time | shipping | defect_terms | recall_owner | evidence | status" }, { type: "list", items: ["保存公司主体、联系人和收款主体", "索取与目标市场相关的测试或资质文件", "记录 MOQ、生产周期、运输与追踪方式", "单列缺陷、退款、召回和侵权责任"] }], done: "三家候选的每个关键字段都有文件、链接或待补证状态。" },
      { title: "AI 对照与样品测试设计", time: "22 分钟", target: "发现差异而不是替你选供应商", blocks: [{ type: "prompt", label: "供应商核验提示词", text: "根据以下 RFQ、供应商文件、目标市场要求和商品规格，生成逐项对照：已证实事实、文件冲突、过期/缺失证据、样品测试项目、需要书面确认的条款和风险。不得推断资质真实性、自动评分信誉、建议付款或保证交期。" }, { type: "note", kind: "danger", icon: "🛑", label: "付款", text: "任何定金、下单、签约或账号授权都必须由具名负责人在受控渠道执行。" }], done: "差异表能直接转成补证邮件和样品验收清单。" },
      { title: "样品实测与准入会签", time: "18 分钟", target: "用实物和条款关闭关键风险", blocks: [{ type: "list", items: ["对样品做尺寸、功能、包装和运输损伤测试", "比对样品、详情页素材与量产规格", "验证真实发货时间与追踪体验", "采购、合规和运营共同记录通过/补证/淘汰"] }, { type: "note", kind: "ok", icon: "✅", label: "验收", text: "准入结论能回溯到实物测试、证据文件和具名批准人。" }], done: "只有通过核验的供应商进入下一步小批量测试。" }
    ],
    faq: [["高播放视频推荐的商品能直接做吗", "热度不等于需求或合规", "只作为假设，重新做市场和供应链核验"], ["证书截图可信吗", "可能过期或不对应型号", "核对签发机构、范围、日期与商品"], ["AI 能帮我选最低价吗", "低价可能隐藏质量和履约成本", "按总成本与证据由采购决定"], ["能跳过样品省时间吗", "无法验证真实商品和包装", "不建议进入销售前跳过"]],
    sources: [["YouTube：Mark Tilbury · I Tried AI Dropshipping For 7 Days", "https://www.youtube.com/watch?v=xfOT2elC2Ok"], ["Shopify：Dropshipping legal and safety", "https://help.shopify.com/en/manual/compliance/legal/dropshipping"], ["Shopify：Terms of Service", "https://www.shopify.com/legal/terms"]]
  },
  "google-virtual-tryon-readiness": {
    short: "服装商品图虚拟试穿适配巡检",
    eyebrow: "YouTube 1.07 万观看 · Planet Ai · 核验于 2026-08-23",
    titleHtml: "让服装商品图通过<em>AI 虚拟试穿适配巡检</em>",
    sub: "批量检查类目、分辨率、整件展示、遮挡和变体一致性，形成待修图片队列；明确虚拟可视化不等于合身保证或尺码建议。",
    chips: ["⏱ 约 <b>35 分钟</b>", "🧩 3 个步骤", "👗 Google Virtual Try-on", "🔒 图片人工复核"],
    introIcon: "👗", introTitle: "输入图质量决定试穿体验的上限。", intro: "虚拟试穿需要系统能识别完整服装和变体。裁切、遮挡、错误类目或图文不一致会直接降低可用性。",
    goalLead: "为一个服装系列最多 30 张主图完成适配巡检。", goal: "交付 vto-readiness.csv 与重拍/修图队列，不修改实物特征。",
    outcomes: [["适配清单", "图片和变体逐项对应。"], ["问题队列", "裁切、遮挡与质量问题可定位。"], ["发布说明", "能力边界和用户预期写清。"]],
    criteria: ["商品类目与变体正确", "整件服装清晰可见", "图片达到官方质量要求", "不改变颜色和版型", "试穿不宣传合身保证", "最终图由商品负责人核对"],
    module: "先治理商品图，再启用可视化体验", moduleSub: "AI 发现批量问题，摄影和商品团队负责重拍、修图与事实签收。",
    steps: [
      { title: "导出商品与图片矩阵", time: "10 分钟", target: "确保每张图知道自己属于哪个变体", blocks: [{ type: "code", label: "巡检字段", text: "sku | category | color | image_url | resolution | full_garment | occlusion | crop | text_overlay | page_match | status" }, { type: "list", items: ["导出 SKU、类目、颜色和主图 URL", "标记整件展示、裁切和遮挡", "检查主图与详情页变体对应", "保留原始图片版本"] }], done: "30 张图片均能对应唯一 SKU 和颜色变体。" },
      { title: "AI 批量巡检并查缺", time: "13 分钟", target: "把技术问题和商品事实问题分开", blocks: [{ type: "prompt", label: "图片巡检提示词", text: "依据商品字段和官方虚拟试穿图片要求，逐图输出：类目/变体是否一致、整件是否可见、裁切、遮挡、清晰度、文字覆盖、颜色疑点和待人工确认项。不要判断尺码是否合身，不要修改人体、服装版型、颜色或图中细节。" }], done: "每张图都有通过、需重拍、需修图或待人工确认状态。" },
      { title: "人工修复与前台核对", time: "12 分钟", target: "让体验与真实商品保持一致", blocks: [{ type: "list", items: ["摄影或设计按问题队列修复", "商品负责人比对实物和变体", "重新上传并检查前台商品页", "在说明中区分可视化参考与尺码/合身建议"] }, { type: "note", kind: "ok", icon: "✅", label: "验收", text: "抽检图像、变体和商品页一致，且没有合身保证话术。" }], done: "最终图片与巡检记录形成可追溯版本。" }
    ],
    faq: [["虚拟试穿能推荐尺码吗", "可视化与尺码判断不同", "不要把它写成合身保证"], ["能用 AI 补全被裁掉的衣服吗", "可能创造不存在的版型", "优先重拍真实商品"], ["模特图可以用吗", "适用条件取决于官方要求", "逐项核对并保留清晰整件图"], ["所有类目都支持吗", "支持范围会更新", "以官方当前列表为准"]],
    sources: [["YouTube：Planet Ai · Google AI Virtual Try-On", "https://www.youtube.com/watch?v=LRSlPWwsnVs"], ["Google Merchant Center：Virtual try-on image requirements", "https://support.google.com/merchants/answer/16159685?hl=en-GB"]]
  },
  "amazon-ai-video-review": {
    short: "Amazon Ads AI 视频发布前质检",
    eyebrow: "YouTube 1.43 万观看 · Amazon News · 核验于 2026-08-23",
    titleHtml: "从 ASIN 生成候选，再做<em>Amazon AI 视频事实质检</em>",
    sub: "用官方生成器做多版候选，逐镜核对商品、Logo、字幕、主张和落地页，再进行小预算测试；生成画面不能当成真实功能证明。",
    chips: ["⏱ 约 <b>50 分钟</b>", "🧩 3 个步骤", "📺 Amazon Ads", "🔒 广告负责人发布"],
    introIcon: "📺", introTitle: "生成更快，审核不能更松。", intro: "模型可能从 ASIN 自动组合图片、文案和动作。每个镜头仍要回到商品详情、授权素材和广告政策逐项核验。",
    goalLead: "为一个 ASIN 生成最多 6 个候选并选出 2 个可测试版本。", goal: "交付 amazon-video-qc.csv、最终视频与小预算测试 brief。",
    outcomes: [["候选版本", "创意差异和来源可见。"], ["逐镜质检", "商品事实和素材权利可核对。"], ["测试 brief", "预算、指标与停止条件预设。"]],
    criteria: ["ASIN 页面事实准确", "生成镜头不伪造功能", "Logo 和音乐已授权", "字幕与画面逐帧核对", "广告与落地页一致", "预算和发布人工批准"],
    module: "把 AI 视频生成接入广告审核流程", moduleSub: "生成器提供候选，商品、品牌和广告负责人共同把关。",
    steps: [
      { title: "锁定 ASIN 事实与素材", time: "14 分钟", target: "给生成器一个可靠边界", blocks: [{ type: "list", items: ["保存当前 ASIN 标题、要点、图片和落地页", "列出批准卖点、禁用主张和目标市场", "登记 Logo、音乐、人物和图片授权", "记录不能被生成画面替代的真实演示"] }], done: "事实卡和素材授权由商品/品牌负责人确认。" },
      { title: "生成多版并逐镜 QC", time: "21 分钟", target: "用版本差异找创意，不牺牲准确性", blocks: [{ type: "prompt", label: "视频 QC 提示词", text: "根据以下 ASIN 事实卡、授权素材和候选视频，按版本和时间码检查：商品身份、颜色、数量、功能演示、Logo、字幕、价格/优惠、音乐和落地页一致性。标记证据、严重度和修复建议；不得把生成画面当作功能证明或补写商品事实。" }, { type: "note", kind: "danger", icon: "🛑", label: "真实演示", text: "若镜头表现了商品未实测的效果，删除或替换，不能只加免责声明。" }], done: "6 个候选均有通过/拒绝理由，2 个版本完成逐镜关闭。" },
      { title: "小预算测试与对账", time: "15 分钟", target: "让测试回答明确问题", blocks: [{ type: "list", items: ["保持商品、受众和转化口径一致", "由广告负责人设置预算上限与停止条件", "上线后检查实际展示和落地页", "对照广告报告与 Amazon 订单信号，记录不确定性"] }, { type: "note", kind: "ok", icon: "✅", label: "验收", text: "报告不把平台归因或短期波动写成必然增量。" }], done: "测试版本、预算、结果和下一步假设已记录。" }
    ],
    faq: [["ASIN 生成的视频能直接投吗", "可能有事实或授权错误", "必须逐镜人工审核"], ["能展示夸张功能效果吗", "生成画面不是产品证据", "只保留已批准且可证明的演示"], ["一次生成多少版", "数量不是目标", "本教程最多 6 版并只测试 2 版"], ["表现好能自动扩预算吗", "会扩大成本与风险", "按审批规则人工决策"]],
    sources: [["YouTube：Amazon News · AI Video generator", "https://www.youtube.com/watch?v=pvq9-DEey4c"], ["Amazon Ads：AI video generator guide", "https://advertising.amazon.com/library/guides/ai-video-generator"], ["Amazon Ads：Video generator and live image", "https://advertising.amazon.com/library/news/ai-video-generator-live-image/"]]
  },
  "youtube-shopping-ai-script": {
    short: "YouTube Shopping 标签与 AI 脚本实验",
    eyebrow: "YouTube 4.83 万观看 · 10X INCOME · 核验于 2026-08-23",
    titleHtml: "把 YouTube Shopping 热门玩法改成<em>可信商品脚本实验</em>",
    sub: "先核验资格与商品证据，再写有人类观点和真实演示的原创脚本、正确添加商品标签并复盘；删除所有收益保证。",
    chips: ["⏱ 约 <b>55 分钟</b>", "🧩 3 个步骤", "▶️ YouTube Shopping", "🔒 原创与披露"],
    introIcon: "▶️", introTitle: "能挂商品，不等于值得推荐。", intro: "高热视频常把资格、选品、脚本和收益混成捷径。可信流程应从亲自核验商品、明确合作关系和原创价值开始。",
    goalLead: "为一个亲自核验过的商品完成一条可发布的视频脚本和标签检查。", goal: "交付 evidence-card.md、原创脚本、披露清单和 Shopping Analytics 复盘模板。",
    outcomes: [["商品证据卡", "功能、限制和体验来自可验证资料。"], ["原创脚本", "包含真实观点、演示与边界。"], ["复盘模板", "点击、观看与购物信号分开看。"]],
    criteria: ["先核验频道和地区资格", "本人使用或核验商品", "合作与利益关系清楚披露", "不复制他人视频脚本", "标签对应画面中的商品", "不承诺收入或效果"],
    module: "从热门收益叙事回到可信内容", moduleSub: "AI 帮你组织证据和结构，创作者必须提供原创观点、真实演示和最终判断。",
    steps: [
      { title: "核验资格与商品证据", time: "16 分钟", target: "先确认能做、能说、能标记什么", blocks: [{ type: "list", items: ["查看当前 YouTube Shopping 资格和地区要求", "保存商品页、规格、价格时点与退货信息", "记录亲测观察、限制和不确定点", "明确 affiliate、赠品或品牌合作披露"] }], done: "商品证据卡不依赖热门视频的收益或效果说法。" },
      { title: "生成原创脚本并事实审校", time: "23 分钟", target: "让 AI 搭结构，让人类贡献价值", blocks: [{ type: "prompt", label: "Shopping 脚本提示词", text: "根据以下商品证据卡、我的真实使用观察、目标观众和披露要求，起草一条原创 YouTube 视频结构：问题、真实演示、优点、限制、适合/不适合人群、披露、商品标签出现时机和 CTA。不得复制来源视频措辞，不得承诺收入、效果、库存或价格，不确定事实标记待核验。" }, { type: "note", kind: "warn", icon: "⚠️", label: "原创性", text: "只有模板化 AI 旁白和素材拼接，可能缺乏观众价值；加入真实判断、演示和编辑。" }], done: "逐句事实审校完成，披露自然清楚且脚本包含真实观点。" },
      { title: "发布检查与数据复盘", time: "16 分钟", target: "正确标记商品并区分内容与购物信号", blocks: [{ type: "list", items: ["确认标签与视频实际出现商品一致", "检查标题、缩略图、描述和披露", "发布后记录观看留存、标签点击和购物信号", "把结论写成下一条内容假设而非收入承诺"] }, { type: "note", kind: "ok", icon: "✅", label: "验收", text: "报告能说明观众行为，不把单条视频结果推广为稳定收益。" }], done: "发布版本、标签与复盘数据已关联保存。" }
    ],
    faq: [["能直接照热门视频脚本拍吗", "会有版权和原创性风险", "只研究结构，重写并加入亲测价值"], ["没用过商品能推荐吗", "容易转述错误主张", "至少完成证据核验并诚实说明体验范围"], ["AI 配音可以吗", "关键是原创价值与政策合规", "保留人类观点、编辑和必要披露"], ["能写月入多少吗", "无法保证且可能误导", "只报告自己的可验证历史结果"]],
    sources: [["YouTube：10X INCOME · YouTube Shopping Affiliate & AI", "https://www.youtube.com/watch?v=z5Bi5VQcTJo"], ["YouTube Creator Academy：Shopping", "https://creatoracademy.youtube.com/page/course/merchandise?hl=en-GB"], ["YouTube Creator Academy：Brand deals", "https://creatoracademy.youtube.com/page/course/brand-deals"]]
  },
  "youtube-ai-authenticity-check": {
    short: "AI 商品视频原创性与变现核验",
    eyebrow: "YouTube 18.42 万观看 · Editminds-English · 核验于 2026-08-23",
    titleHtml: "别信‘全面封杀 AI’，做一次<em>原创性与变现核验</em>",
    sub: "把热门误读还原为政策检查：审查批量模板、重复素材、人类观点、实测、授权和合成披露；不把 AI 使用本身等同于违规。",
    chips: ["⏱ 约 <b>40 分钟</b>", "🧩 3 个步骤", "🧭 YouTube Policy", "🔒 官方政策优先"],
    introIcon: "🧭", introTitle: "平台关注的是价值与真实性，不是一个‘AI’标签。", intro: "标题党常把对 mass-produced、repetitious 或 inauthentic 内容的说明夸大成全面禁令。先读官方政策，再审自己的内容流程。",
    goalLead: "为 10 条商品视频建立原创性、授权与披露审计表。", goal: "交付 authenticity-audit.csv 和整改队列，不根据二手解读删除频道内容。",
    outcomes: [["政策事实卡", "官方要求与二手说法分开。"], ["视频审计", "原创贡献和重复模式可见。"], ["整改队列", "补充观点、授权或披露有优先级。"]],
    criteria: ["引用当前官方政策", "不把 AI 使用直接判违规", "记录脚本与素材来源", "识别批量模板重复", "合成内容按要求披露", "重大决定由频道负责人确认"],
    module: "从恐慌标题回到逐条政策证据", moduleSub: "AI 帮你做内容差异对照，人解释创作价值、权利与政策适用。",
    steps: [
      { title: "建立官方政策事实卡", time: "10 分钟", target: "确认平台真正写了什么", blocks: [{ type: "list", items: ["保存 YouTube 官方政策页面和访问日期", "摘录适用于自己频道的主题并用自己的话概括", "把‘全面禁止 AI’等二手说法列为待核验", "记录尚不确定或需申诉支持的问题"] }], done: "所有关键判断都有官方链接与核验日期。" },
      { title: "批量审计 10 条视频", time: "17 分钟", target: "找出重复生产与价值不足的证据", blocks: [{ type: "prompt", label: "原创性审计提示词", text: "根据以下 10 条视频的脚本、素材来源、旁白、剪辑、实测、观点、披露和官方政策事实卡，生成逐条审计。区分 AI 使用、批量模板重复、缺少原创价值、版权/授权、误导性合成和待人工判断项；不要仅因使用 AI 就判违规或预测变现结果。" }], done: "每条视频都有证据化状态，而不是凭风格主观打分。" },
      { title: "人工整改与发布护栏", time: "13 分钟", target: "补足真实创作价值和权利记录", blocks: [{ type: "list", items: ["增加真实测试、比较、判断或教学过程", "替换无权素材并保存许可", "按要求补充合成或商业关系披露", "由频道负责人决定更新、下架或保留"] }, { type: "note", kind: "ok", icon: "✅", label: "验收", text: "整改后能说明创作者具体贡献，而不只是换模板、声音或字幕。" }], done: "10 条视频均有处理决定与证据。" }
    ],
    faq: [["YouTube 禁止 AI 视频了吗", "热门说法常过度简化", "查看当前官方政策和具体内容质量"], ["AI 配音会失去变现吗", "单一技术选择不能决定结果", "关注原创价值、权利和真实披露"], ["模板重复怎么判断", "需要看频道整体和具体差异", "用脚本、画面和观点对照后人工判断"], ["AI 能决定删除视频吗", "后果重大且政策适用需判断", "只生成审计建议，由负责人决定"]],
    sources: [["YouTube：Editminds-English · Monetization Ban on AI Content", "https://www.youtube.com/watch?v=w7JG79aYJKQ"], ["YouTube Creator Academy：YPP policies and guidelines", "https://creatoracademy.youtube.com/page/lesson/ypp-welcome_policies-and-guidelines_list"]]
  },
  "shopify-magic-brand-voice": {
    short: "Shopify Magic 品牌语气卡",
    eyebrow: "YouTube 3.60 万观看 · Shopify 官方 · 核验于 2026-08-23",
    titleHtml: "先锁事实与禁词，再用 Shopify Magic <em>生成品牌文案</em>",
    sub: "建立事实表、品牌语气卡和禁用表达，分别起草首页、活动横幅和社媒版本并逐句审校；不让模型创造折扣、评价或产品功效。",
    chips: ["⏱ 约 <b>40 分钟</b>", "🧩 3 个步骤", "✨ Shopify Magic", "🔒 逐句事实审核"],
    introIcon: "✨", introTitle: "语气一致之前，事实必须一致。", intro: "品牌口吻可以活泼、克制或专业，但商品规格、价格、优惠、库存和政策不能跟着文风变化。",
    goalLead: "为一个活动完成品牌语气卡和三渠道文案包。", goal: "交付 brand-voice.md、homepage/social/banner 三版草稿与逐句事实记录。",
    outcomes: [["事实底稿", "可说与不可说边界清楚。"], ["语气卡", "词汇、节奏与示例可复用。"], ["渠道文案", "三版内容一致但任务不同。"]],
    criteria: ["商品事实来自批准资料", "折扣与日期人工确认", "不用虚假评价或紧迫感", "每个渠道有单一任务", "多语言由本地人员复核", "发布前逐句签收"],
    module: "让生成文案可控、可查、可复用", moduleSub: "Magic 负责生成候选，品牌和商品负责人确保每句话都准确且适合场景。",
    steps: [
      { title: "建立事实表与语气卡", time: "13 分钟", target: "固定所有文案共享的输入", blocks: [{ type: "list", items: ["记录产品、受众、场景和批准卖点", "记录价格、优惠、日期、库存的责任人", "列出禁用主张、禁词和必须披露信息", "写 3 个符合和 3 个不符合品牌语气的例子"] }], done: "事实表和语气卡由商品与品牌负责人确认。" },
      { title: "生成三渠道候选", time: "15 分钟", target: "同一事实，不同任务和长度", blocks: [{ type: "prompt", label: "品牌文案提示词", text: "根据批准事实表和品牌语气卡，分别起草：首页主标题+副标题、活动横幅、社媒贴文。每版标注目标、使用的事实和待人工确认项；不得创造折扣、库存紧迫感、评价、功效、日期或送达承诺。不确定内容保留占位符。" }], done: "三版候选各有单一 CTA，且没有输入之外的商业事实。" },
      { title: "逐句核验并留版本", time: "12 分钟", target: "让发布内容可追溯到事实与批准人", blocks: [{ type: "list", items: ["逐句标注事实来源或纯风格表达", "核对链接、价格、日期和目标市场", "本地人员复核翻译与文化语境", "保存 Draft、Approved、Published 版本和发布位置"] }, { type: "note", kind: "ok", icon: "✅", label: "验收", text: "随机抽一句发布文案，能找到事实来源、审核人和版本。" }], done: "三渠道最终稿均通过逐句审核。" }
    ],
    faq: [["Shopify Magic 会自动发布吗", "生成与发布应分开", "只生成草稿并人工审核"], ["品牌语气越详细越好吗", "过度规则会让内容僵硬", "保留少量明确原则和正反例"], ["能让 AI 创建折扣吗", "折扣影响利润和承诺", "只使用已批准数字"], ["多语言能一次生成吗", "可能出现事实和文化偏差", "分语言生成并由本地人员复核"]],
    sources: [["YouTube：Shopify · Shopify Magic", "https://www.youtube.com/watch?v=ZivyR2zjH08"], ["Shopify：Shopify Magic", "https://help.shopify.com/en/manual/shopify-admin/productivity-tools/shopify-magic"]]
  }
} as const;
