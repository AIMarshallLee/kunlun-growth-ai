export const expansionRoundTwoA = {
  "shopify-fraud-review-desk": {
    short: "Shopify 高风险订单复核台",
    eyebrow: "Shopify Fraud Analysis · 发货前人工决策",
    titleHtml: "让 AI 整理<em>高风险订单复核证据</em>",
    sub: "汇总风险建议、指标与支付状态，形成发货前复核包；AI 只整理证据，真人决定验证、收款、发货、取消或退款。",
    chips: ["⏱ 约 <b>40 分钟</b>", "🧩 3 个步骤", "🛡️ Fraud Analysis + Flow", "🔒 真人最终决定"],
    introIcon: "🛡️",
    introTitle: "风险提示是调查入口，不是欺诈判决。",
    intro: "Shopify 的风险建议和指标能提示值得复核的订单，但覆盖范围会受支付方式、方案与分析状态影响。先保留原始证据，再按商店批准的流程调查。",
    goalLead: "为一笔被标记的订单建立可审计的发货前复核包。",
    goal: "交付 fraud-review.md、Flow 护栏草稿和人工决定记录，不让 AI 自动取消、退款或履约。",
    outcomes: [["风险快照", "建议、指标、支付和履约状态可回查。"], ["复核清单", "事实、缺口和验证动作彼此分开。"], ["决定记录", "真人选择、理由与后续动作均留痕。"]],
    criteria: ["保存原始风险建议与指标", "只处理复核所需的最少数据", "区分待分析与无风险建议", "不把信号写成欺诈事实", "AI 不执行取消退款或发货", "账户负责人签署最终决定"],
    module: "从风险信号走到人工决定",
    moduleSub: "AI 负责去标识化整理、差异检查和记录；订单负责人核实事实并承担最终操作。",
    steps: [
      {
        title: "冻结订单风险快照",
        time: "10 分钟",
        target: "先保存系统当时显示了什么",
        blocks: [
          { type: "list", items: ["记录订单编号、风险建议级别、分析状态和查看时间", "保存风险指标原文及 AVS、CVV、IP 或行为类提示的可见结果", "记录支付授权/捕获、履约、取消与退款状态", "标注支付方式、Shopify Payments 使用情况和第三方风控来源", "对外部 AI 输入移除姓名、地址、电话、邮箱和完整支付信息"] },
          { type: "prompt", label: "快照整理提示词", text: "根据以下已去标识化的订单风险页面，按原文整理：风险建议、每条指标、支付状态、履约状态、信息缺口和采集时间。只能转述输入，不得判断客户是否欺诈，也不得建议自动取消、退款、捕获或发货。" },
          { type: "note", kind: "warn", icon: "⚠️", label: "覆盖限制", text: "部分离线或无法验证的支付订单可能没有风险建议；“待分析”也不能被当成低风险。" },
          { type: "note", kind: "ok", icon: "✅", label: "验收", text: "第三方只看快照，就能分清系统原文、订单状态和仍待确认的事实。" }
        ],
        done: "风险信号、状态、时间和数据最小化记录均已保存。"
      },
      {
        title: "建立证据化人工复核包",
        time: "18 分钟",
        target: "把信号变成有限、可执行的核实任务",
        blocks: [
          { type: "list", items: ["逐条写明指标支持什么、不能证明什么", "核对同一订单内商品、数量、支付与履约信息是否自洽", "按商店已批准 SOP 列出可用的客户或内部核实动作", "为每个信息缺口分配负责人和截止时间", "保留客户联系结果，但不额外索取或上传不必要的敏感资料"] },
          { type: "prompt", label: "复核包提示词", text: "将以下风险快照和商店人工复核 SOP 整理成表格：系统信号、支持证据、冲突证据、不能得出的结论、待核实问题、允许的核实动作、负责人和截止时间。AI 只整理证据；真人决定订单处置。不要评价客户身份，不要编造验证结果。" },
          { type: "note", kind: "danger", icon: "🛑", label: "决策边界", text: "高风险建议并不等于已证实欺诈。AI 不得基于单一 IP、地址差异或模型分数决定取消、退款、收款或发货。" },
          { type: "note", kind: "ok", icon: "✅", label: "验收", text: "每个复核动作都能回链到风险指标或内部 SOP，且没有自动处置指令。" }
        ],
        done: "复核包已把证据、未知项、动作和责任人完整分开。"
      },
      {
        title: "用 Flow 建队列并由真人签收",
        time: "12 分钟",
        target: "让高风险订单被看见，但不越过人工决定",
        blocks: [
          { type: "list", items: ["以 Order risk analyzed 作为风险分析完成后的触发点", "仅设计标签、内部通知或进入人工复核队列等低风险动作", "用测试订单分别验证低、中、高风险和分析延迟场景", "记录工作流版本、启用人、测试时间和回退方法", "由订单负责人选择验证、捕获、履约、取消或退款，并记录理由"] },
          { type: "prompt", label: "Flow 审核提示词", text: "审查以下 Shopify Flow 草稿。输出触发器、条件、动作、分析未完成时的行为、误触发风险、测试用例和回退步骤。标出所有会捕获付款、取消、退款或履约的动作并要求移除或交由真人批准；不要生成自动处置决定。" },
          { type: "note", kind: "warn", icon: "⚠️", label: "触发时机", text: "风险分析可能晚于订单创建完成；用 Order created 代替 Order risk analyzed，可能在建议就绪前运行。" },
          { type: "note", kind: "ok", icon: "✅", label: "验收", text: "工作流只负责排队和提醒，最终处置能回到具名真人、证据包和时间戳。" }
        ],
        done: "复核队列通过测试，最终订单操作由负责人签署并留痕。"
      }
    ],
    faq: [["高风险订单一定要取消吗", "风险建议只是潜在拒付信号", "按证据和商店 SOP 由真人决定"], ["Flow 能自动取消高风险订单吗", "自动动作可能误伤真实客户", "本教程仅用 Flow 标记、通知和排队"], ["没有风险建议就是安全吗", "支付类型或分析覆盖可能不同", "先确认分析状态与适用范围"], ["能把完整订单发给公共 AI 吗", "订单含个人和支付相关信息", "先去标识化并只提供最小必要字段"]],
    sources: [["Shopify：Fraud analysis", "https://help.shopify.com/en/manual/fulfillment/managing-orders/protecting-orders/fraud-analysis"], ["Shopify：Managing high-risk orders with Shopify Flow", "https://help.shopify.com/en/manual/fulfillment/managing-orders/protecting-orders/shopify-flow"]]
  },

  "shopify-payout-reconciliation": {
    short: "Shopify 多币种回款对账台",
    eyebrow: "Shopify Payments · 现金入账核对",
    titleHtml: "把付款、费用与银行入账<em>逐笔对上</em>",
    sub: "用 Payout reconciliation report 和 payout details 建立差异清单；AI 只整理交易证据，财务人员决定会计归类与关账。",
    chips: ["⏱ 约 <b>45 分钟</b>", "🧩 3 个步骤", "💰 Shopify Payments", "🔒 财务人工签收"],
    introIcon: "💰",
    introTitle: "回款报告解释资金流，不等于收入报表。",
    intro: "订单日期、交易日期、付款批次和银行入账日可能不同。对账先统一日期、币种与范围，再讨论差异，避免把正常时序误报成漏款。",
    goalLead: "完成一个付款周期的 Shopify Payments 到银行入账对账。",
    goal: "交付 payout-recon.csv、差异队列和财务签收记录，不自动生成或过账会计分录。",
    outcomes: [["范围快照", "日期、币种和报告边界明确。"], ["逐笔勾稽", "交易、费用、付款和存款可追溯。"], ["差异队列", "未匹配项有原因、证据与负责人。"]],
    criteria: ["锁定报告日期与付款币种", "保留原始导出和生成时间", "区分资金流与收入报表", "第三方支付单独处理", "AI 不生成最终会计结论", "财务负责人签署关账"],
    module: "从付款批次到银行存款闭环",
    moduleSub: "先锁定 Shopify Payments 范围，再逐笔匹配与解释差异，最后由财务人员确认。",
    steps: [
      {
        title: "锁定报告范围与原始证据",
        time: "12 分钟",
        target: "让所有人使用同一日期和币种口径",
        blocks: [
          { type: "list", items: ["在 Finance > Documents 选择 Payout Reconciliation Report", "记录起止日期、时区、付款币种和生成时间", "导出或保存相关付款批次的 payout details", "另存对应银行流水并遮蔽完整账户号码", "列出第三方支付方式、Shopify 账单费用和其他不在报告范围的项目"] },
          { type: "prompt", label: "范围检查提示词", text: "读取以下报告说明、导出字段和已去标识化银行流水表头，生成对账范围卡：期间、时区、付款币种、包含项目、明确排除项、文件版本和缺失文件。不要把付款对账报告称为收入报表，不要推测缺失金额。" },
          { type: "note", kind: "warn", icon: "⚠️", label: "范围", text: "Payout reconciliation report 只反映 Shopify Payments 余额活动，不包含第三方处理的付款或 Shopify 账单费用。" },
          { type: "note", kind: "ok", icon: "✅", label: "验收", text: "报告、付款明细与银行流水都标有同一核对周期、币种和版本。" }
        ],
        done: "原始文件和范围卡已冻结，排除项清楚可见。"
      },
      {
        title: "建立逐笔勾稽表",
        time: "20 分钟",
        target: "解释每笔余额活动如何进入付款批次",
        blocks: [
          { type: "list", items: ["标准化 transaction_date、type、order/reference、gross、fee、net、payout_id 和 currency", "按 payout_id 汇总交易、调整、费用与净额", "把付款净额与同币种银行存款匹配", "将退款、拒付或调整保留为独立行，不与销售净额相互覆盖", "对舍入和导出精度差异保留原值与标准化值"] },
          { type: "prompt", label: "逐笔匹配提示词", text: "根据以下 Shopify Payments 报告、付款明细和已去标识化银行流水，按 payout_id 与币种建立匹配表。输出原始金额、费用、净额、银行入账、差额、匹配证据和置信限制；无法唯一匹配的项目标为待人工核对。不要生成会计分录或擅自合并不同币种。" },
          { type: "note", kind: "danger", icon: "🛑", label: "会计边界", text: "资金到账时间与销售确认口径不同。AI 只能勾稽证据，不能决定收入、费用、应收或汇兑损益的最终归类。" },
          { type: "note", kind: "ok", icon: "✅", label: "验收", text: "每笔银行存款都能回到一个付款批次，或明确进入未匹配队列。" }
        ],
        done: "逐笔勾稽表保留原值、计算过程与匹配证据。"
      },
      {
        title: "清理差异并完成财务签收",
        time: "13 分钟",
        target: "把未匹配金额变成有主人的调查任务",
        blocks: [
          { type: "list", items: ["按时间差、币种差、费用、退款/拒付、调整、缺失文件和重复记录分类", "对每项差异保存 payout_id、金额、证据和下一步", "设置金额阈值与老化天数，但由财务负责人批准", "对无法解释的项目回到 Shopify 付款详情或银行原始凭证", "记录已解决、结转调查或升级，并由财务负责人签字"] },
          { type: "prompt", label: "差异队列提示词", text: "将以下未匹配记录按可能的时间差、范围排除、币种、费用、退款/拒付、调整、重复或数据缺失归类。每项列出支持证据、反证、需要补取的原始文件、负责人和复核日期。无法证实时写“未知”，不要冲销、核销或过账。" },
          { type: "note", kind: "warn", icon: "⚠️", label: "误差处理", text: "不要用一笔手工调平项掩盖多个不同原因；不同付款币种也不能直接相加比较。" },
          { type: "note", kind: "ok", icon: "✅", label: "验收", text: "差异总额等于所有未匹配行之和，且每项都有财务状态和责任人。" }
        ],
        done: "本周期已由财务负责人签收，未结项差异进入下一期跟踪。"
      }
    ],
    faq: [["报告金额为什么不等于销售额", "它记录 Shopify Payments 资金活动而非收入确认", "用销售/财务报表另做收入核对"], ["第三方先买后付在哪里", "第三方处理的付款可能不在该报告中", "从对应提供商单独取数并建子账"], ["同一订单能有多行吗", "付款、费用、退款或调整可能分开出现", "保留交易类型后再按 payout_id 汇总"], ["AI 能自动关账吗", "归类和重大差异需要专业判断", "AI 只整理证据，由财务人员签收"]],
    sources: [["Shopify：Payout reconciliation report", "https://help.shopify.com/en/manual/payments/shopify-payments/payouts/payout-reconciliation-report"], ["Shopify：Viewing and exporting payout details", "https://help.shopify.com/en/manual/payments/shopify-payments/payouts/view-details"]]
  },

  "crossborder-shipping-rate-qa": {
    short: "跨境运费回归测试台",
    eyebrow: "Shopify Shipping Profiles · 结账运费 QA",
    titleHtml: "用测试矩阵查清<em>跨境运费为什么不显示</em>",
    sub: "覆盖市场、地址、商品、仓库、profile、zone 与混合购物车，记录结账实际结果；AI 只辅助比对，运费配置由运营负责人批准。",
    chips: ["⏱ 约 <b>50 分钟</b>", "🧩 3 个步骤", "🚚 Shipping Profiles", "🧪 测试后再发布"],
    introIcon: "🚚",
    introTitle: "结账运费是多层配置共同计算的结果。",
    intro: "商品归属、可履约地点、市场、配送区域、购物车价格或重量，以及多 profile 合并规则都会改变显示结果。逐层测试比盲改费率更快。",
    goalLead: "为两个目标市场和一组混合购物车完成运费回归测试。",
    goal: "交付 shipping-matrix.csv、失败复现记录和配置变更签收单，不使用真实客户资料下单。",
    outcomes: [["配置地图", "商品到 profile、地点、zone 和 rate 可追溯。"], ["测试矩阵", "单品与混合购物车覆盖边界。"], ["失败队列", "缺失或异常费率有复现和负责人。"]],
    criteria: ["使用测试地址而非客户资料", "记录商品重量与默认包裹", "覆盖市场和配送区域", "测试单 profile 与混合购物车", "保留预期值和实际值", "生产变更由运营负责人批准"],
    module: "从配置链路到结账回归",
    moduleSub: "先画配置地图，再执行可复现测试，最后只修证据指向的那一层。",
    steps: [
      {
        title: "画出运费配置与用例矩阵",
        time: "17 分钟",
        target: "明确每个测试为何应该出现某个费率",
        blocks: [
          { type: "list", items: ["列出目标国家是否属于启用市场和 shipping zone", "记录每个 SKU/variant 所属 general 或 custom shipping profile", "记录可履约地点、地点组、库存、商品重量和默认包裹", "列出价格型、重量型、承运商或第三方费率及边界条件", "设计单 profile、跨 profile、跨地点和临界价格/重量购物车"] },
          { type: "prompt", label: "矩阵生成提示词", text: "根据以下 Shopify 市场、商品、地点、shipping profile、zone、rate 和包裹设置，生成最小回归矩阵。每例输出目标地址、购物车、库存地点、价格/重量、预期服务名、预期计算逻辑和待确认假设。不得编造费率或用真实客户地址。" },
          { type: "note", kind: "warn", icon: "⚠️", label: "计算口径", text: "重量型费率会受商品重量和默认包裹影响；价格型费率使用折扣后的购物车金额并在税前判断。" },
          { type: "note", kind: "ok", icon: "✅", label: "验收", text: "每个测试用例都能回链到市场、profile、地点、zone 和具体 rate 条件。" }
        ],
        done: "测试矩阵覆盖正常、边界和组合购物车，所有预期值都有配置依据。"
      },
      {
        title: "在结账逐例复现并定位",
        time: "20 分钟",
        target: "用实际显示结果缩小故障层级",
        blocks: [
          { type: "list", items: ["用获准的测试地址逐例进入结账并保存时间戳截图", "记录显示的服务名、币种、金额、错误信息和购物车内容", "失败时依次核对商品、地点、市场、profile、zone、rate 和包裹", "对承运商或应用费率记录请求条件及提供商状态", "把预期与实际差异写成可重复步骤，不先修改设置"] },
          { type: "prompt", label: "故障定位提示词", text: "比较以下测试用例的预期配置和结账实际结果。只沿商品 → 地点/库存 → 市场 → shipping profile → zone → rate → 包裹/承运商链路列出证据、最可能的断点、反证和下一项只读检查。不要直接建议批量改价或删除 profile。" },
          { type: "note", kind: "danger", icon: "🛑", label: "组合费率", text: "跨 profile 或地点的购物车可能合并费率；服务名不一致时，结账展示也可能与单品测试不同，不能把组合金额直接当成重复收费。" },
          { type: "note", kind: "ok", icon: "✅", label: "验收", text: "每个失败都有固定购物车、地址、截图、时间和首个证据化断点。" }
        ],
        done: "所有异常都可复现，并被定位到配置链路中的具体待核查层。"
      },
      {
        title: "小步修复并跑全量回归",
        time: "13 分钟",
        target: "修一个原因，不制造新的市场缺口",
        blocks: [
          { type: "list", items: ["为拟变更项记录修改前值、修改后值、负责人和回退值", "先由运营负责人批准商品归属、地点、zone 或 rate 变更", "复测原失败用例，再重跑全部正常与边界用例", "核对同名服务在混合 profile 下的合并显示", "保存通过率、剩余异常和第三方升级单"] },
          { type: "prompt", label: "回归摘要提示词", text: "根据以下修改记录和测试结果，生成回归摘要：变更项、影响范围、原失败是否关闭、新失败、未测试区域、回退条件和待签收人。只有实际执行并留有截图的用例才能标为通过；不要替运营人员发布配置。" },
          { type: "note", kind: "warn", icon: "⚠️", label: "应用控制", text: "第三方应用创建的 shipping profile 可能由应用继续管理；修改前先确认控制方和回退路径。" },
          { type: "note", kind: "ok", icon: "✅", label: "验收", text: "目标市场的正常、临界和混合购物车均通过，或有明确阻塞人与升级记录。" }
        ],
        done: "批准的最小修复已完成全量回归，测试证据与回退方案已归档。"
      }
    ],
    faq: [["为什么单品有运费，混合购物车变贵", "不同 profile 或地点的费率可能被合并", "按组合规则核对地点、费率名与金额"], ["提示无法配送先改哪里", "商品、市场、地点、zone 或 rate 都可能断开", "按配置链路逐层只读排查"], ["价格门槛按折扣前还是后", "价格型费率按折扣后、税前的购物车值判断", "把折扣边界加入测试矩阵"], ["承运商费率不返回怎么办", "地址、重量、包裹、服务或提供商都可能影响", "先完成 Shopify 侧检查，再带复现联系提供商"]],
    sources: [["Shopify：Shipping profiles", "https://help.shopify.com/en/manual/fulfillment/setup/shipping-profiles"], ["Shopify：Troubleshooting and testing shipping rates", "https://help.shopify.com/en/manual/fulfillment/setup/shipping-rates/troubleshooting"], ["Shopify：Combined shipping rates", "https://help.shopify.com/en/manual/fulfillment/setup/shipping-profiles/combined-shipping-rates"]]
  },

  "shopify-market-fx-guardrails": {
    short: "Shopify 市场汇率护栏",
    eyebrow: "Shopify Markets · 本地币与利润底线",
    titleHtml: "给本地币定价加上<em>汇率与毛利护栏</em>",
    sub: "盘点自动/手动汇率、固定价、调价、取整与转换费用，生成情景表；AI 只整理和计算，商业负责人决定价格。",
    chips: ["⏱ 约 <b>45 分钟</b>", "🧩 3 个步骤", "💱 Markets FX", "🔒 定价人工批准"],
    introIcon: "💱",
    introTitle: "本地价格稳定，不代表结算利润稳定。",
    intro: "展示币种、店铺币种和付款币种可能不同；自动汇率、手动汇率、固定国际价格与交易时点还会彼此影响。先让公式和优先级可见，再设护栏。",
    goalLead: "为一个目标市场和五个代表 SKU 建立汇率与毛利情景表。",
    goal: "交付 market-fx.csv、异常阈值和人工审批记录，不由 AI 直接修改汇率、调价或固定价格。",
    outcomes: [["配置快照", "币种、汇率模式与价格覆盖关系明确。"], ["情景测算", "价格、费用和利润假设可复算。"], ["护栏清单", "触发条件、负责人和回退路径清楚。"]],
    criteria: ["记录店铺本地与付款币种", "保留自动或手动汇率模式", "固定价与调价单独标记", "费用取整使用实际配置", "AI 不发布价格变更", "商业与财务负责人签收"],
    module: "从币种配置到可审批利润护栏",
    moduleSub: "AI 将公式、优先级和波动情景透明化；真人结合市场策略、费用与利润决定是否调整。",
    steps: [
      {
        title: "冻结市场定价配置快照",
        time: "14 分钟",
        target: "先确认每个价格由什么规则生成",
        blocks: [
          { type: "list", items: ["记录店铺币种、目标市场基础币种、本地展示币种与付款币种", "记录目标市场使用自动还是手动汇率及查看时间", "列出 SKU 的基础价、固定国际价格和市场百分比调价", "记录该商店实际适用的转换费与价格取整设置", "保存一个商品在 Markets 中的价格计算明细截图"] },
          { type: "prompt", label: "配置审计提示词", text: "根据以下 Shopify Markets 配置和商品价格明细，按 SKU 整理：基础价、展示币种、汇率模式、汇率、转换费、调价、取整、固定国际价格和最终展示价。标出优先级冲突、缺失字段与采集时间；不得猜测费用或修改设置。" },
          { type: "note", kind: "warn", icon: "⚠️", label: "优先级", text: "固定国际价格可能优先于手动换算；只看汇率字段，可能无法解释客户实际看到的价格。" },
          { type: "note", kind: "ok", icon: "✅", label: "验收", text: "五个 SKU 的展示价都能沿基础价、汇率、费用、调价、取整或固定价回算。" }
        ],
        done: "目标市场的币种和价格规则已形成带时间戳的配置快照。"
      },
      {
        title: "测算汇率与交易时点情景",
        time: "18 分钟",
        target: "看见波动如何穿透到收入和毛利",
        blocks: [
          { type: "list", items: ["用当前配置计算基准展示价和预计付款币种金额", "设置获批的汇率上行、下行和成本变化情景", "分别标出自动汇率、手动汇率与固定价 SKU", "加入转换费、支付费、商品成本和跨境履约成本的真实输入", "单列延迟捕获、退款和拒付的交易时点风险"] },
          { type: "prompt", label: "情景测算提示词", text: "使用以下已确认的基础价、汇率、转换费、调价、取整、固定价、支付费、商品成本和履约成本，计算基准、汇率上行、汇率下行三种情景。逐行展示公式、输入来源、展示价、预计净收入和毛利率；未知费用留空。AI 只做情景整理，真人决定价格。" },
          { type: "note", kind: "danger", icon: "🛑", label: "财务风险", text: "付款捕获、退款或拒付可能使用不同交易时点的汇率。情景值不是到账保证，也不能替代真实付款明细。" },
          { type: "note", kind: "ok", icon: "✅", label: "验收", text: "任何毛利结果都能从原始输入复算，且自动、手动和固定价没有混用同一公式。" }
        ],
        done: "三种情景均展示公式、来源、限制和对毛利底线的影响。"
      },
      {
        title: "设人工护栏并做市场预览",
        time: "13 分钟",
        target: "让异常触发复核，而不是自动改价",
        blocks: [
          { type: "list", items: ["为展示价偏差、毛利率和手动汇率老化设置建议阈值", "为每条阈值指定观察频率、证据来源和负责人", "由商业与财务负责人批准保留、调价、固定价或汇率变更", "用目标市场预览或测试结账核对币种、价格、取整与折扣", "记录变更前后值、批准人、生效时间和回退方案"] },
          { type: "prompt", label: "护栏提案提示词", text: "根据以下情景表生成只读护栏提案：指标、建议阈值、触发证据、误报风险、复核人、允许动作和回退条件。所有汇率、百分比调价与固定价修改都标为“待人工批准”，不得生成自动发布指令。" },
          { type: "note", kind: "warn", icon: "⚠️", label: "变更控制", text: "切换市场基础币种或自动/手动模式可能改变既有价格行为；先保存快照并确认影响范围。" },
          { type: "note", kind: "ok", icon: "✅", label: "验收", text: "目标市场预览与批准后的情景一致，每个护栏都只有提醒和升级动作。" }
        ],
        done: "护栏、批准记录、预览证据和回退值均已归档。"
      }
    ],
    faq: [["自动汇率多久变一次", "官方会定期随市场更新，实际价格还受费用和取整影响", "保存查看时间并用市场价格明细核对"], ["手动汇率能完全消除风险吗", "实际兑换、退款和捕获时点仍会变化", "把它当稳定展示价的工具并持续复核"], ["为什么改汇率后某些 SKU 不变", "固定国际价格可能覆盖换算结果", "检查 SKU 的固定价与市场调价"], ["AI 能自动守住毛利吗", "成本、费用和商业策略需要负责人判断", "AI 只算情景并提醒，由真人决定"]],
    sources: [["Shopify：Setting up currencies for markets", "https://help.shopify.com/en/manual/markets/customizations/local-currencies"], ["Shopify：Currency conversions and exchange rates", "https://help.shopify.com/en/manual/international/pricing/exchange-rates"]]
  },

  "onsite-search-zero-result-ops": {
    short: "站内零结果搜索修复台",
    eyebrow: "Shopify Search & Discovery · 搜索运营",
    titleHtml: "把零结果词变成<em>可验证的找货改进</em>",
    sub: "分析无结果、无点击与高频查询，提出同义词、商品信息或提升候选；AI 只生成候选，运营人员审核并发布。",
    chips: ["⏱ 约 <b>40 分钟</b>", "🧩 3 个步骤", "🔎 Search & Discovery", "🧪 小批量回测"],
    introIcon: "🔎",
    introTitle: "零结果可能是词汇缺口，也可能是店里根本没有商品。",
    intro: "同义词无法替代缺货、未发布或商品数据错误。先保留查询频次和上下文，再决定修改搜索、商品信息还是明确告知无货。",
    goalLead: "从最近一周期的搜索报告中建立前 20 个查询的修复队列。",
    goal: "交付 search-zero-ops.csv、五项小批量改进和回测记录，不自动批量添加同义词或提升商品。",
    outcomes: [["查询证据", "无结果、无点击和高频词分开。"], ["修复候选", "每项建议能回到真实商品事实。"], ["回测记录", "修改前后结果与副作用可比较。"]],
    criteria: ["保存报告区间与原始查询", "显示查询次数和样本限制", "核对真实商品与库存状态", "同义词不扩大商品含义", "AI 不批量发布搜索设置", "运营负责人抽检并签收"],
    module: "从搜索查询到小步可逆优化",
    moduleSub: "先用报告确定问题优先级，再把商品事实、语言差异与搜索设置分开处理。",
    steps: [
      {
        title: "建立搜索问题基线",
        time: "12 分钟",
        target: "知道哪些词值得先看",
        blocks: [
          { type: "list", items: ["导出或记录 Searches with no results、Searches with no clicks 和 Searches by search query", "保存报告日期范围、市场、语言和查询次数", "补充点击率、购买率及样本量可见时的对应数据", "对查询做大小写、空格和明显拼写变体的可逆标准化", "保留原始查询文本，不含客户身份或会话信息"] },
          { type: "prompt", label: "基线整理提示词", text: "根据以下 Shopify Search & Discovery 报告，按原始查询、标准化查询、市场/语言、查询次数、无结果、无点击、点击率和购买率整理基线。只合并明显的格式或拼写变体，保留原词与样本限制，不推断用户身份或购买意图。" },
          { type: "note", kind: "warn", icon: "⚠️", label: "报告口径", text: "Search & Discovery 应用中的可见指标可能采用固定的近期窗口；跨周期比较要确认相同日期范围。" },
          { type: "note", kind: "ok", icon: "✅", label: "验收", text: "前 20 个问题词都保留原文、次数、类型、市场、语言和报告区间。" }
        ],
        done: "搜索基线已按证据排序，没有把零结果与无点击混成一类。"
      },
      {
        title: "生成事实型修复候选",
        time: "16 分钟",
        target: "区分词汇问题、商品问题和真实无货",
        blocks: [
          { type: "list", items: ["搜索现有商品、博客和页面是否已覆盖该词", "核对商品标题、描述、产品类型、标签和发布/库存状态", "将候选分为同义词、拼写、商品信息、商品提升、导航内容或真实无商品", "为每个同义词核对是否在该市场确实等义", "给每项候选附上目标商品、证据、风险和负责人"] },
          { type: "prompt", label: "候选诊断提示词", text: "结合以下问题查询、店内可搜索内容和商品事实，为每个词给出：问题类型、支持证据、可能修复、可能副作用、待人工确认项和不应匹配的商品。不要虚构库存、商品属性或同义关系；AI 只生成候选，运营人员决定。" },
          { type: "note", kind: "danger", icon: "🛑", label: "相关性风险", text: "错误同义词或无边界提升会把不相关商品推给客户。受限品、健康功效、规格与兼容性词尤其必须逐项人工核对。" },
          { type: "note", kind: "ok", icon: "✅", label: "验收", text: "每个候选都有目标内容、真实事实、不应匹配范围和明确审核人。" }
        ],
        done: "修复候选已按证据与风险分级，真实无商品的查询没有被强行匹配。"
      },
      {
        title: "小批量应用并回测",
        time: "12 分钟",
        target: "验证找货改善而不污染其他查询",
        blocks: [
          { type: "list", items: ["每轮只选择少量已批准的同义词、商品信息或提升改动", "保存修改前的结果页截图、排序和零结果状态", "由运营负责人在 Search & Discovery 或商品后台应用", "测试原查询、反向词、不应匹配词、移动端和目标语言", "在下一可比报告周期记录无结果、点击和购买信号变化"] },
          { type: "prompt", label: "回测提示词", text: "比较以下修改前后测试与同口径报告，输出原查询是否有结果、首屏相关性、不应匹配商品、点击/购买信号、样本限制和保留/回退建议。没有足够数据时标为继续观察，不把相关性变化写成销售因果。" },
          { type: "note", kind: "warn", icon: "⚠️", label: "因果限制", text: "点击或购买变化还会受流量、库存、价格和活动影响；一次回测不能证明搜索设置带来销售增长。" },
          { type: "note", kind: "ok", icon: "✅", label: "验收", text: "原问题查询更容易找到相关内容，且反向用例没有出现明显误匹配。" }
        ],
        done: "五项小批量改进完成回测，保留、观察或回退决定均已留痕。"
      }
    ],
    faq: [["零结果词都要加同义词吗", "可能是无货、未发布或商品信息缺失", "先查真实商品事实再选修复类型"], ["无点击等于结果不相关吗", "价格、图片、库存和意图都可能影响点击", "结合结果页抽检和更多数据判断"], ["能一次导入几百个同义词吗", "错误映射会大面积污染搜索", "按高频低风险词小批量测试"], ["搜索优化后销量会上升吗", "报告只能提供相关信号而非因果保证", "用可比周期持续观察并保留其他变量"]],
    sources: [["Shopify：Search & Discovery reports and analytics", "https://help.shopify.com/en/manual/online-store/storefront-search/search-and-discovery-analytics"], ["Shopify：Storefront search", "https://help.shopify.com/en/manual/online-store/search-and-discovery/search"]]
  },

  "amazon-fba-margin-audit": {
    short: "Amazon FBA 费用利润审计",
    eyebrow: "Amazon Revenue Calculator · 单 SKU 利润复核",
    titleHtml: "把 FBA 费用估算变成<em>可复算的利润底稿</em>",
    sub: "核对类目、价格、尺寸、重量与履约输入，比较估算和实际费用；AI 只整理情景，财务或商品负责人决定价格与履约方式。",
    chips: ["⏱ 约 <b>45 分钟</b>", "🧩 3 个步骤", "📦 FBA + Revenue Calculator", "🔒 人工利润签收"],
    introIcon: "📦",
    introTitle: "计算器给的是估算，不是利润保证。",
    intro: "销售计划费、类目销售佣金与 FBA 等可选服务成本口径不同，尺寸、重量、价格或类目一变，结果也会变。审计的重点是保留输入和差异。",
    goalLead: "为一个真实 SKU 完成 FBA 基准、压力与自配送对比。",
    goal: "交付 fba-margin-audit.csv、费用证据索引和人工决定记录，不自动调价或切换履约方式。",
    outcomes: [["输入事实卡", "商品、类目、尺寸重量和价格有来源。"], ["利润情景", "每项费用和成本能回算。"], ["差异队列", "估算与实际偏差有负责人。"]],
    criteria: ["锁定站点币种与计算日期", "尺寸重量来自真实包装", "销售佣金按实际类目核对", "估算与实际费用分开", "AI 不自动调价或切换 FBA", "财务或商品负责人签收"],
    module: "从费用估算到单 SKU 利润底稿",
    moduleSub: "先冻结真实输入，再做透明情景，最后用实际结算反查误差。",
    steps: [
      {
        title: "建立 SKU 与费用输入事实卡",
        time: "14 分钟",
        target: "避免用错类目、尺寸或价格",
        blocks: [
          { type: "list", items: ["记录站点、币种、ASIN/SKU、类目和销售计划", "记录售价、折扣、客户运费及计算日期", "用实际包装记录长宽高、单件重量和包装版本", "保存 Revenue Calculator 或库存页面的费用估算截图", "补充采购、头程、贴标、广告等企业内部成本，并标明来源"] },
          { type: "prompt", label: "输入审计提示词", text: "审查以下 Amazon 费用估算和企业成本表，输出字段、数值、币种、日期、原始来源、缺失项和单位冲突。重点核对类目、售价、包装尺寸与重量。不要自行填充费率、税费或成本，也不要把估算写成实际费用。" },
          { type: "note", kind: "warn", icon: "⚠️", label: "输入敏感", text: "FBA 成本会随商品属性和所用服务变化；旧尺寸、错误类目或不同站点费率会让利润结果失真。" },
          { type: "note", kind: "ok", icon: "✅", label: "验收", text: "所有非零输入都有单位、日期和证据，未知成本保留为空。" }
        ],
        done: "SKU 事实卡与原始估算已冻结，输入缺口清楚可见。"
      },
      {
        title: "计算三种利润情景",
        time: "18 分钟",
        target: "看见价格、退货和成本变化的影响",
        blocks: [
          { type: "list", items: ["用 Revenue Calculator 比较 FBA 与自配送估算", "分别建立基准、成本上升和售价下降情景", "逐行列出收入、销售佣金、FBA/履约估算和内部成本", "将销售计划月费等固定成本按获批口径单独分摊", "输出单件贡献、毛利率和盈亏平衡价，并保留公式"] },
          { type: "prompt", label: "利润测算提示词", text: "使用以下已核验输入计算基准、成本上升和售价下降三种单件利润情景，并并列 FBA 与自配送。逐项展示公式、销售收入、Amazon 费用估算、企业内部成本、单件贡献和毛利率；未知项不得默认为零。结果标注“估算，实际成本可能不同”。" },
          { type: "note", kind: "danger", icon: "🛑", label: "决策边界", text: "Revenue Calculator 结果是估算。AI 不得据此自动改价、停售、补货或切换履约方式。" },
          { type: "note", kind: "ok", icon: "✅", label: "验收", text: "任一情景都可从事实卡重新计算，固定成本与单件变动成本没有混写。" }
        ],
        done: "三种情景和两种履约方式均形成可复算利润底稿。"
      },
      {
        title: "用实际费用回查并签收",
        time: "13 分钟",
        target: "把估算偏差变成下一轮改进",
        blocks: [
          { type: "list", items: ["选择同 SKU 的实际交易或结算费用记录", "逐项比较估算费用、实际费用、绝对差和差异率", "核查价格、类目、尺寸重量、服务或日期是否变化", "为无法解释的费用建立 Seller Central 调查事项", "由财务或商品负责人决定保留、重测或调整业务方案"] },
          { type: "prompt", label: "差异复盘提示词", text: "比较以下费用估算与实际费用，按费用项输出差额、差异率、可能关联的输入变化、支持证据、反证和待核查动作。不能确认原因时写“未知”；不要代替财务归类，也不要生成自动调价或履约变更。" },
          { type: "note", kind: "warn", icon: "⚠️", label: "样本限制", text: "单笔订单可能受特殊尺寸、退货或服务影响，不要用一个异常样本覆盖整个 SKU。" },
          { type: "note", kind: "ok", icon: "✅", label: "验收", text: "重大差异都有原始费用记录、责任人和复核结论，最终商业动作由真人签收。" }
        ],
        done: "估算与实际差异已完成复盘，利润底稿版本和签收人已记录。"
      }
    ],
    faq: [["计算器结果能当实际利润吗", "页面明确提供的是费用与收入预估", "用实际结算持续回查"], ["只扣 FBA 费就够了吗", "还可能有销售计划、销售佣金和企业内部成本", "按真实使用项逐项建账"], ["尺寸重量用商品页数据可以吗", "包装后的实际值可能不同", "使用最新真实包装测量并留证"], ["AI 能自动选择 FBA 吗", "履约还涉及库存、现金和服务体验", "AI 只做情景，负责人决定"]],
    sources: [["Amazon：Estimate fees and costs", "https://sell.amazon.com/pricing/estimate"], ["Amazon：Fulfillment by Amazon", "https://sell.amazon.com/fulfillment-by-amazon"], ["Amazon：Pricing", "https://sell.amazon.com/pricing"]]
  },

  "tiktok-shop-appeal-pack": {
    short: "TikTok Shop 申诉证据包",
    eyebrow: "TikTok Shop Account Health · 违规响应",
    titleHtml: "把违规通知整理成<em>可核验的申诉包</em>",
    sub: "锁定通知、时限、政策与原始证明，生成受约束的陈述草稿；AI 只整理证据，真人决定是否申诉并亲自提交。",
    chips: ["⏱ 约 <b>50 分钟</b>", "🧩 3 个步骤", "⚖️ Violation & Appeal", "🔒 真人决定与提交"],
    introIcon: "⚖️",
    introTitle: "申诉不是改写故事，而是对应通知提交真实证据。",
    intro: "不同违规可能有不同选项和截止时间。先以 Seller Center 当前通知为准，保留原始材料与来源，再由有权限的人选择纠正、申诉或寻求支持。",
    goalLead: "为一条真实违规记录建立完整、原创、可追溯的申诉候选包。",
    goal: "交付 appeal-index.md、陈述草稿和人工提交清单，不伪造资料、不重复盲目提交。",
    outcomes: [["通知快照", "违规、影响、时限和可用选项清楚。"], ["证据索引", "每份材料真实、相关且有来源。"], ["申诉草稿", "逐项回应且由真人审核提交。"]],
    criteria: ["保存违规通知原文", "以当前页面时限为准", "只使用原创真实证据", "逐条对应政策和事实", "AI 不决定或提交申诉", "账户负责人完成最终签收"],
    module: "从违规通知到真人可提交证据包",
    moduleSub: "AI 做原文提取、证据索引与差异检查；账户、法律或合规负责人作最终判断。",
    steps: [
      {
        title: "冻结违规记录与时限",
        time: "12 分钟",
        target: "确保回应的是正确案件和当前选项",
        blocks: [
          { type: "list", items: ["在 Seller Center 的违规记录保存 case ID、通知原文和截图", "记录受影响商品/功能、执行动作、通知时间和页面截止时间", "保存页面提供的 Correction、Appeal 或支持选项", "打开通知引用的政策并保存版本与访问日期", "记录已进行的任何操作，避免重复或冲突提交"] },
          { type: "prompt", label: "通知提取提示词", text: "从以下违规页面原文中逐字提取 case ID、违规名称、被指事实、影响范围、执行状态、可用选项、截止时间、材料要求和政策链接。将缺失信息标为待确认，不推断平台意图，也不决定是否申诉。" },
          { type: "note", kind: "warn", icon: "⚠️", label: "时限", text: "官方指南给出常见申诉窗口，但具体案件可能更短；始终以 Seller Center 当前案件页面显示的期限为准。" },
          { type: "note", kind: "ok", icon: "✅", label: "验收", text: "负责人无需重新翻找页面，就能确认案件、影响、当前选项和最晚处理时间。" }
        ],
        done: "违规原文、政策、时限和已做动作已形成不可混淆的案件快照。"
      },
      {
        title: "建立原始证据索引",
        time: "20 分钟",
        target: "让每项主张都有真实材料支持",
        blocks: [
          { type: "list", items: ["按通知要求收集原始文件、图片、视频或交易记录", "记录文件来源、签发人、日期、版本和对应违规点", "检查主体名称、商品、时间与案件是否一致", "区分有利证据、冲突证据和仍缺失的证明", "遮蔽与案件无关的个人或支付信息，但保留可验证要素"] },
          { type: "prompt", label: "证据索引提示词", text: "根据以下违规通知和真实材料元数据，生成证据索引：文件名、来源、日期、对应通知事实、支持内容、冲突或缺口、隐私处理和人工核验人。不得生成、修改或美化证明，不得把无关材料写成支持证据。" },
          { type: "note", kind: "danger", icon: "🛑", label: "真实性", text: "伪造、拼接或篡改凭证会扩大账户风险。AI 只能整理已有证据，真人确认真实性与提交适当性。" },
          { type: "note", kind: "ok", icon: "✅", label: "验收", text: "每份材料能回到原件并明确对应哪个违规事实，不相关材料已剔除。" }
        ],
        done: "证据包完成来源、相关性、一致性和隐私检查。"
      },
      {
        title: "起草回应并由真人提交",
        time: "18 分钟",
        target: "用简洁事实回应，不越过平台流程",
        blocks: [
          { type: "list", items: ["按通知顺序写案件识别、事实说明和证据编号", "只陈述材料能证明的内容，并主动标明仍不确定项", "逐个核对附件可打开、清晰、未过期且符合页面要求", "由账户/法律/合规负责人决定纠正、申诉或不提交", "在获批后由授权真人提交，并保存回执、版本和后续期限"] },
          { type: "prompt", label: "申诉草稿提示词", text: "基于以下违规原文和已核验证据索引，起草简洁回应：案件编号、被指事实、逐项事实说明、证据编号和请求。不得添加未证实陈述、情绪化指责、伪造证明或成功保证。醒目标注“AI 仅整理，须由授权真人决定、审核并提交”。" },
          { type: "note", kind: "danger", icon: "🛑", label: "最终决定", text: "AI 不能判断违规是否错误，也不能替账户持有人提交。申诉结果由平台决定，提交并不保证通过。" },
          { type: "note", kind: "ok", icon: "✅", label: "验收", text: "最终提交版本与证据索引逐项一致，具名负责人、回执和下一期限均已保存。" }
        ],
        done: "授权真人完成决定与提交，案件状态进入可追踪队列。"
      }
    ],
    faq: [["收到违规就一定要申诉吗", "页面可能提供纠正、申诉或其他选项", "由负责人按事实和当前页面决定"], ["AI 能帮我补一张缺失证明吗", "伪造材料会增加处罚风险", "只提交真实原件或向签发方补取"], ["通用申诉模板能直接交吗", "每案事实、政策和材料要求不同", "逐项对应通知和真实证据"], ["第一次被拒后能一直重提吗", "平台对次数和时限有约束", "查看案件当前选项并由真人决定下一步"]],
    sources: [["TikTok Shop：How to appeal a violation", "https://seller-us.tiktok.com/university/essay?default_language=en&knowledge_id=2683575734798126"], ["TikTok Shop：Violation & Appeal Guide", "https://seller-us.tiktok.com/university/essay?knowledge_id=6110391400302350&lang=en"]]
  },

  "google-consent-mode-audit": {
    short: "Google Consent Mode 信号核验",
    eyebrow: "Google Tags × Shopify Privacy · 隐私信号 QA",
    titleHtml: "逐状态核对<em>同意默认值与更新信号</em>",
    sub: "验证 banner 选择是否正确传递到 Google 标签；AI 只整理测试证据，隐私、法律与技术负责人决定配置和上线。",
    chips: ["⏱ 约 <b>55 分钟</b>", "🧩 3 个步骤", "🍪 Consent Mode v2", "⚖️ 真人合规决定"],
    introIcon: "🍪",
    introTitle: "Consent Mode 传递选择，不替你取得有效同意。",
    intro: "需要先由企业确定适用地区、banner 和数据用途，再测试 ad_storage、analytics_storage、ad_user_data 与 ad_personalization 的默认值、更新时机和撤回。",
    goalLead: "完成 EEA、英国和瑞士测试路径的同意信号证据包。",
    goal: "交付 consent-audit.md、状态矩阵和缺陷队列，不让 AI 决定法律依据或直接发布标签。",
    outcomes: [["实施地图", "banner、CMP、Shopify 与 Google 标签关系清楚。"], ["状态证据", "拒绝、同意、部分同意和撤回可复现。"], ["签收队列", "技术缺陷与法律问题分别分派。"]],
    criteria: ["地区和法律要求由真人确认", "记录四类 consent 信号", "默认值先于测量命令核验", "覆盖同意拒绝与撤回", "AI 不决定或发布隐私配置", "隐私与技术负责人共同签收"],
    module: "从隐私选择到可验证标签状态",
    moduleSub: "AI 做测试矩阵、日志对比和证据索引；律师、隐私与技术团队决定应有行为及修复。",
    steps: [
      {
        title: "画出同意实施与责任地图",
        time: "17 分钟",
        target: "先定义由谁设置、传递和验证信号",
        blocks: [
          { type: "list", items: ["记录目标地区、活跃 Shopify Markets 和经真人批准的 banner 范围", "盘点 Shopify Customer privacy、第三方 CMP、Google tag/GTM、应用像素和自定义像素", "列出 ad_storage、analytics_storage、ad_user_data、ad_personalization 的预期默认值", "记录同意、拒绝、部分同意和撤回时的预期更新", "为法律要求、banner 文案、代码和测试分别指定负责人"] },
          { type: "prompt", label: "实施地图提示词", text: "根据以下已批准的隐私要求和技术配置，整理地区 → banner/CMP → Shopify Customer Privacy → Google 标签 → consent 类型的实施地图。列出默认值、更新来源、触发时机、所有者和未知项。不得提供法律结论或自行把任何状态设为 granted。" },
          { type: "note", kind: "danger", icon: "🛑", label: "合规边界", text: "自动隐私设置和 Consent Mode 都不能替代法律意见。AI 只整理证据，真人决定适用地区、文案、默认状态和数据用途。" },
          { type: "note", kind: "ok", icon: "✅", label: "验收", text: "每个信号都能找到设置方、更新方、预期状态和具名责任人。" }
        ],
        done: "地区、工具、四类信号和责任边界已形成单一实施地图。"
      },
      {
        title: "逐状态执行浏览器与诊断测试",
        time: "23 分钟",
        target: "证明选择发生前后标签收到什么",
        blocks: [
          { type: "list", items: ["为每次测试使用新的浏览器会话并记录地区、页面、时间和版本", "在未交互时检查默认状态是否先于 config/event 等测量命令", "分别执行全部拒绝、全部同意、部分同意与撤回", "在当前页和跳转后检查 consent update、持久化与四类信号", "结合浏览器网络证据与 Google Ads 提供的同意信号核验入口保存结果"] },
          { type: "prompt", label: "状态对比提示词", text: "比较以下四条测试路径的时间序列：banner 显示、用户动作、default、update、页面跳转、四类 consent 值和网络请求。输出预期、实际、首个偏差、证据位置和复现步骤。不要把请求存在与否直接解释成法律合规。" },
          { type: "note", kind: "warn", icon: "⚠️", label: "时序", text: "默认同意状态应在发送测量数据的命令之前设置；异步 banner 还需由技术负责人检查更新等待与竞态。" },
          { type: "note", kind: "ok", icon: "✅", label: "验收", text: "四条路径都能从用户选择追到 default/update 与后续页面状态，截图和日志时间一致。" }
        ],
        done: "拒绝、同意、部分同意和撤回路径均有可复现技术证据。"
      },
      {
        title: "修复分流并完成人工签收",
        time: "15 分钟",
        target: "把代码缺陷与政策问题交给正确负责人",
        blocks: [
          { type: "list", items: ["按地区范围、默认时序、值映射、更新、持久化和第三方标签分类缺陷", "将法律适用或文案问题交隐私/法律负责人，将代码问题交技术负责人", "只在获批测试环境应用最小修复并保留回退版本", "重跑四条状态路径及未受影响地区回归", "由隐私和技术负责人共同批准生产发布与监控计划"] },
          { type: "prompt", label: "审计报告提示词", text: "把以下测试差异整理成审计表：地区、状态路径、预期、实际、证据、风险类别、负责人、修复草稿、回退和复测结果。所有法律判断、默认值选择与生产发布均标为真人决定；不要自动改 banner、CMP 或标签。" },
          { type: "note", kind: "danger", icon: "🛑", label: "发布控制", text: "错误修复可能扩大数据收集或中断测量。未经隐私和技术双重批准，不得发布生产配置。" },
          { type: "note", kind: "ok", icon: "✅", label: "验收", text: "所有 P0/P1 缺陷已关闭或有阻塞记录，批准版本通过完整状态与地区回归。" }
        ],
        done: "审计证据、复测结果和双重签收已归档。"
      }
    ],
    faq: [["装了 cookie banner 就完成 Consent Mode 吗", "banner 选择还需正确传给 Google 标签", "同时核验 Customer Privacy 集成和四类信号"], ["看到网络请求就是违规吗", "Basic 与 Advanced 实现行为不同且需结合信号判断", "由技术与隐私负责人按官方资料评估"], ["只测接受全部可以吗", "拒绝、部分同意和撤回更容易暴露映射错误", "四条路径都要从新会话测试"], ["AI 能决定哪些地区默认 denied 吗", "这是法律与业务责任", "AI 只整理已批准规则，由真人决定"]],
    sources: [["Google：Set up consent mode on websites", "https://developers.google.com/tag-platform/security/guides/consent"], ["Google Ads：Verify consent signals for EEA users", "https://support.google.com/google-ads/answer/16142339?hl=en"], ["Shopify：Configuring customer privacy settings", "https://help.shopify.com/en/manual/privacy-and-security/privacy/customer-privacy-settings/privacy-settings"]]
  },

  "amazon-account-health-response": {
    short: "Amazon Account Health 响应台",
    eyebrow: "Amazon Seller Central · 政策问题闭环",
    titleHtml: "把账户健康警报变成<em>事实与整改证据</em>",
    sub: "锁定警报、政策、受影响范围与真实整改记录，生成回应草稿；AI 只整理证据，账户负责人决定并提交。",
    chips: ["⏱ 约 <b>50 分钟</b>", "🧩 3 个步骤", "🅰️ Account Health", "🔒 真人最终响应"],
    introIcon: "🅰️",
    introTitle: "先处理实际问题，再组织回应文字。",
    intro: "Account Health 汇总客户服务、配送表现和政策合规等信号。任何响应都应以 Seller Central 当前警报、政策与页面要求为准。",
    goalLead: "为一条真实 Account Health 警报建立可审计响应包。",
    goal: "交付 account-health-case.md、整改证据索引和人工提交记录，不伪造根因或保证恢复。",
    outcomes: [["案件快照", "警报、指标、政策和时限明确。"], ["整改链路", "根因假设、纠正与预防有真实证据。"], ["响应记录", "真人决定、提交与后续状态可追踪。"]],
    criteria: ["保存 Seller Central 警报原文", "逐条链接当前政策", "根因与假设明确分开", "只使用真实整改证据", "AI 不决定或提交响应", "账户负责人签署最终版本"],
    module: "从账户警报到证据化人工响应",
    moduleSub: "AI 做原文提取、时间线和证据缺口检查；账户、运营与合规负责人承担最终行动。",
    steps: [
      {
        title: "冻结警报、指标与政策范围",
        time: "13 分钟",
        target: "确认平台具体要求处理什么",
        blocks: [
          { type: "list", items: ["在 Seller Central Account Health 保存警报原文、状态和时间", "记录受影响 ASIN、订单、配送方式、市场或账户功能", "保存页面显示的指标、期限、可用动作和提交入口", "打开警报链接的政策并记录访问日期", "建立已做操作时间线，避免不同团队重复处理"] },
          { type: "prompt", label: "案件提取提示词", text: "从以下 Account Health 页面和政策原文提取：警报名称、被指事实、影响对象、指标、状态、期限、页面要求、政策链接和已做动作。只使用原文；无法确认的内容写待确认，不判断责任或提交路径。" },
          { type: "note", kind: "warn", icon: "⚠️", label: "当前页面优先", text: "公开政策是背景，具体案件状态、期限与可用动作以 Seller Central 当前显示为准。" },
          { type: "note", kind: "ok", icon: "✅", label: "验收", text: "案件编号、影响范围、政策、期限与下一入口均能被另一位负责人复核。" }
        ],
        done: "账户健康案件快照已冻结，警报事实与团队判断没有混写。"
      },
      {
        title: "验证根因并记录整改证据",
        time: "22 分钟",
        target: "用记录证明做了什么改变",
        blocks: [
          { type: "list", items: ["按时间线收集订单、Listing、库存、配送或操作日志中的相关事实", "将可能根因写成假设，并为每项列支持证据与反证", "记录已完成的立即纠正动作及前后证据", "为预防动作指定流程、负责人、检查频率和生效日期", "核对整改未引入虚假商品信息、绕过政策或新账户规避"] },
          { type: "prompt", label: "根因验证提示词", text: "基于以下警报、政策和真实操作记录，生成：事实时间线、根因假设、支持证据、反证、已完成纠正、预防措施、负责人和仍缺证据。不要把假设写成事实，不要建议规避政策、创建替代账户或伪造记录。" },
          { type: "note", kind: "danger", icon: "🛑", label: "证据边界", text: "AI 只能整理证据，不能替卖家宣布根因已解决。所有整改必须真实完成并由业务负责人核验。" },
          { type: "note", kind: "ok", icon: "✅", label: "验收", text: "每项纠正与预防措施都有前后记录、负责人和验证方法。" }
        ],
        done: "根因假设经过证据校准，真实整改与预防记录已成包。"
      },
      {
        title: "起草响应并由负责人提交",
        time: "15 分钟",
        target: "逐项回应当前页面要求",
        blocks: [
          { type: "list", items: ["按 Seller Central 当前表单要求组织事实、整改和证据编号", "删除无法证明的结论、承诺与无关附件", "由账户、运营和必要的合规/法律负责人复核", "由授权真人决定是否及如何提交并保存最终版本与回执", "设置后续检查时间，记录新反馈和账户状态变化"] },
          { type: "prompt", label: "响应草稿提示词", text: "根据以下已核验案件快照和整改证据，按当前页面要求起草简洁响应：事实、根因说明、立即纠正、预防措施和证据编号。不得编造政策引用、成功保证或未完成动作；醒目标注 AI 只整理、真人决定并提交。" },
          { type: "note", kind: "danger", icon: "🛑", label: "最终责任", text: "AI 不得点击提交或代表账户持有人作政策声明。Amazon 决定案件结果，完整材料也不构成恢复保证。" },
          { type: "note", kind: "ok", icon: "✅", label: "验收", text: "提交内容逐项对应当前要求，最终版本、附件、提交人、回执和后续日期一致。" }
        ],
        done: "真人完成最终决定和提交，账户状态进入持续跟踪。"
      }
    ],
    faq: [["账户健康分数下降就一定会停用吗", "分数是风险信号，具体状态看当前页面", "优先处理真实警报和期限"], ["能先写整改再慢慢执行吗", "未完成动作不能写成事实", "先完成并保存证据再回应"], ["AI 能判断根因吗", "模型可能忽略流程和政策上下文", "只生成假设，由负责人用记录验证"], ["响应提交后就结束了吗", "平台可能提供新反馈或状态变化", "保存回执并持续跟踪整改效果"]],
    sources: [["Amazon：Seller policies", "https://sell.amazon.com/blog/selling-policies"], ["Amazon：Seller Central", "https://sell.amazon.com/tools/seller-central"]]
  },

  "tiktok-live-commerce-runbook": {
    short: "TikTok LIVE 带货运行手册",
    eyebrow: "TikTok Shop LIVE · 开播前中后 SOP",
    titleHtml: "把一场直播拆成<em>可执行的运行手册</em>",
    sub: "统一商品、脚本、角色、异常处置与复盘；AI 起草清单和口播提示，价格、主张、投放与停播由真人决定。",
    chips: ["⏱ 约 <b>60 分钟</b>", "🧩 3 个步骤", "📱 LIVE Shopping", "🔴 真人控场与预算"],
    introIcon: "📱",
    introTitle: "直播增长先靠运行纪律，再谈自动投流。",
    intro: "直播中的商品链接、库存、价格、口播和评论都会实时影响客户。清晰的角色、核准事实卡和停播条件，比临场让 AI 自由发挥更安全。",
    goalLead: "为一场 60 分钟 TikTok Shop LIVE 完成可彩排运行手册。",
    goal: "交付 live-runbook.md、商品事实卡、异常卡与复盘表，不让 AI 自主开播、改价、承诺或调整广告预算。",
    outcomes: [["开播包", "商品、脚本、角色和设备准备齐全。"], ["控场卡", "上品、互动和异常都有明确指令。"], ["复盘表", "内容、交易与投流信号可分开分析。"]],
    criteria: ["商品与优惠事实已批准", "主持制片审核角色明确", "评论与异常有人处理", "库存价格和链接经彩排", "AI 不改预算或商业承诺", "直播负责人签署开播决定"],
    module: "从开播准备到直播复盘闭环",
    moduleSub: "AI 负责整理事实、节奏和记录；主持、制片、客服与广告负责人实时决策。",
    steps: [
      {
        title: "制作开播包并完整彩排",
        time: "25 分钟",
        target: "让人、货、场和链接在开播前对齐",
        blocks: [
          { type: "list", items: ["建立商品顺序、准确标题、价格、库存、变体和批准优惠事实卡", "写 60 分钟流程：开场、演示、问答、复述和收尾", "分配主持、制片、商品操作、评论审核、客服和异常决策人", "检查网络、灯光、声音、账号权限、LIVE Showcase 与商品链接", "完整彩排上品、置顶、变体选择、优惠说明和停播口令"] },
          { type: "prompt", label: "运行手册提示词", text: "根据以下已批准商品事实、优惠、库存和直播目标，起草分钟级 run-of-show：环节、主持提示、演示、置顶商品、评论问题、负责人和转场。不得编造功效、稀缺、价格、送达或销量承诺；所有商业事实标注审核来源。" },
          { type: "note", kind: "danger", icon: "🛑", label: "事实风险", text: "AI 生成的口播不能直接使用。商品主张、优惠、库存与送达信息须由相应负责人逐句批准。" },
          { type: "note", kind: "ok", icon: "✅", label: "验收", text: "彩排能完成每次上品和转场，任何人都知道谁有权暂停或结束直播。" }
        ],
        done: "开播包、角色、设备、商品链接和异常口令均通过彩排。"
      },
      {
        title: "按控场卡直播并实时留痕",
        time: "20 分钟",
        target: "保持节奏，同时让异常有明确出口",
        blocks: [
          { type: "list", items: ["制片按时间轴提示环节，商品操作员核对置顶商品", "主持只使用批准事实卡回答价格、规格和优惠问题", "评论审核员处理垃圾信息并把复杂售后转交客服", "记录库存不足、链接错误、价格冲突、违规评论和技术故障时间", "触发批准条件时由真人暂停商品、纠正口播或停止直播"] },
          { type: "prompt", label: "现场提示词", text: "把以下已批准事实和常见问题压缩成主持/制片/评论审核三张现场卡。每项包含可说内容、不可说内容、转交角色和停止条件。未知问题统一回答“需要核实”，不得生成临场折扣、功效或交付保证。" },
          { type: "note", kind: "warn", icon: "⚠️", label: "真人控场", text: "AI 不应读取并自动回复所有评论，也不能自动切换商品或优惠；实时语境和平台风险必须由真人判断。" },
          { type: "note", kind: "ok", icon: "✅", label: "验收", text: "每次商品切换、纠正与异常都有时间、执行人和结果，直播没有未经批准的承诺。" }
        ],
        done: "直播按运行手册完成，异常与偏离均被实时记录和人工处理。"
      },
      {
        title: "复盘内容、交易与投流",
        time: "15 分钟",
        target: "把一场直播变成下一场的可验证改进",
        blocks: [
          { type: "list", items: ["保存直播时长、观看、互动、商品点击、订单和退款等可用平台指标", "将关键峰谷对齐商品、脚本、异常和投流时间线", "区分内容表现、库存/价格问题与广告流量影响", "如使用 LIVE GMV Max，记录账号连接、活动状态、预算/ROI 设置和被暂停的既有广告", "由直播与广告负责人选择下一场保留、修改或停止的假设"] },
          { type: "prompt", label: "复盘提示词", text: "根据以下直播时间线、平台指标、异常记录和广告状态，输出事实摘要、内容假设、交易摩擦、投流影响、样本限制和下一场 A/B 测试。不要把相关性写成因果，不建议自动提高预算；所有价格、预算和 ROI 目标由真人决定。" },
          { type: "note", kind: "danger", icon: "🛑", label: "广告联动", text: "启用中的 LIVE GMV Max 可能暂停既有 LIVE Shopping Ads，且活动结束后不一定自动恢复；广告负责人必须检查并决定后续状态。" },
          { type: "note", kind: "ok", icon: "✅", label: "验收", text: "下一场只选择少量可验证改动，预算、账号和被暂停广告都有具名负责人确认。" }
        ],
        done: "复盘已区分内容、交易和投流信号，下一场实验与责任人明确。"
      }
    ],
    faq: [["能让 AI 全程自动主持吗", "实时商品事实、评论和平台风险需要判断", "AI 只做提示卡，由真人主持控场"], ["直播中能临时加优惠吗", "价格和库存承诺会影响客户与利润", "只使用预先批准的优惠或由负责人明确批准"], ["观看上涨就代表脚本有效吗", "投流、时段和商品也会影响", "把时间线与多场可比数据一起看"], ["开 LIVE GMV Max 会影响旧广告吗", "活动可能暂停官方账号的既有 LIVE Shopping Ads", "开关前后都由广告负责人检查状态"]],
    sources: [["TikTok Shop：All Things LIVE Shopping", "https://seller-us.tiktok.com/university/essay?knowledge_id=2799697140090667&lang=en"], ["TikTok Shop：LIVE GMV Max", "https://seller-us.tiktok.com/university/course?learning_id=6398011023722254"]]
  }
} as const;
