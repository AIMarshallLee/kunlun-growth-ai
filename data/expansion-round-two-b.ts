export const expansionRoundTwoB = {
  "eu-vat-ioss-evidence-pack": {
    short: "欧盟 VAT / IOSS 证据包",
    eyebrow: "EU VAT · OSS / IOSS · 人工税务复核",
    titleHtml: "用 AI 整理<em>欧盟跨境交易税务证据</em>",
    sub: "把订单、目的国、货值、平台角色和登记信息整理成待复核事实包；AI 不判断税务资格，也不替代会计师或税务机关意见。",
    chips: ["⏱ 约 <b>55 分钟</b>", "🧩 3 个步骤", "🇪🇺 VAT / IOSS", "🔒 税务专家签收"],
    introIcon: "🧾", introTitle: "先把事实收齐，再谈税务路径。", intro: "OSS、IOSS、进口环节和平台代征适用条件不同。教程只建立证据与问题清单，避免让模型凭一张订单下法律结论。",
    goalLead: "为一种真实交易路径建立可交给税务顾问复核的证据包。", goal: "完成 vat-scenario.md、订单样本表和待确认问题，不在店铺中自动修改税率。",
    outcomes: [["交易地图", "货物、卖家、买家与平台角色清楚。"], ["证据清单", "订单与登记资料可追溯。"], ["复核问题", "专家能快速确认适用路径。"]],
    criteria: ["不上传非必要个人信息", "货值与币种来自原订单", "登记号只做格式与来源记录", "区分货物所在地与目的国", "AI 不给最终税务结论", "配置变更由税务负责人批准"],
    module: "把税务猜测改造成证据化复核", moduleSub: "AI 负责整理场景和缺口，税务专家负责资格、税率、申报与系统设置。",
    steps: [
      { title: "画出交易与货物流", time: "18 分钟", target: "明确每个角色与关键时间点", blocks: [{ type: "list", items: ["记录卖家实体、库存起运地与买家目的国", "记录 B2C/B2B、平台是否 deemed supplier", "抽取货值、运费、币种、下单和进口时间", "保存 VAT/IOSS 登记、报关与平台税务报表来源"] }], done: "交易图中的每项事实都有系统或文件来源。" },
      { title: "生成待复核场景表", time: "20 分钟", target: "让专家看到事实、假设与缺口", blocks: [{ type: "prompt", label: "税务证据提示词", text: "根据以下订单样本、货物流、卖家实体、平台角色和登记资料，输出事实表、可能涉及的官方主题、缺失证据和需要税务专家回答的问题。不要判断 OSS/IOSS 资格、税率、申报义务或给出法律结论；每条只引用输入和官方链接。" }, { type: "note", kind: "danger", icon: "🛑", label: "边界", text: "不要把模型输出直接写入税务设置、发票或申报表。" }], done: "表格明确区分已知事实、暂定假设和专家问题。" },
      { title: "专家签收与系统回查", time: "17 分钟", target: "把确认结论落实为可审计记录", blocks: [{ type: "list", items: ["由合格税务顾问或内部税务负责人复核", "记录结论、适用日期、国家和依据版本", "另开变更单处理 Shopify 或 ERP 税务配置", "用测试订单验证显示、发票和报表，不影响真实订单"] }, { type: "note", kind: "ok", icon: "✅", label: "验收", text: "任何税务设置都能追溯到具名审核人和生效日期。" }], done: "证据包、专家意见和后续变更单已关联保存。" }
    ],
    faq: [["AI 能判断是否用 IOSS 吗", "资格取决于完整事实和法规", "AI 只整理材料，由税务专家判断"], ["登记号能让 AI 验证吗", "格式或公开查询不等于资格有效", "记录查询结果并人工核验"], ["旧订单怎么办", "法规和配置可能随时间变化", "按交易日期分批抽样复核"], ["能自动改税率吗", "错误会影响客户和申报", "通过审批变更单人工执行"]],
    sources: [["EU：VAT One Stop Shop", "https://vat-one-stop-shop.ec.europa.eu/"], ["EU：OSS / IOSS Guides", "https://vat-one-stop-shop.ec.europa.eu/guides_en"], ["Shopify：EU tax reference", "https://help.shopify.com/en/manual/taxes/eu/eu-tax-reference"]]
  },
  "customer-data-request-desk": {
    short: "客户数据请求处理台",
    eyebrow: "Privacy Operations · Access / Delete Request",
    titleHtml: "用 AI 建立<em>客户数据请求处理台</em>",
    sub: "统一记录访问、导出、更正与删除请求，先核验身份与适用范围，再由隐私负责人审批；不把客户资料丢进开放模型。",
    chips: ["⏱ 约 <b>45 分钟</b>", "🧩 3 个步骤", "🔐 Privacy Ops", "🔒 最小权限"],
    introIcon: "🔐", introTitle: "隐私请求首先是身份与范围问题。", intro: "客服收到一句‘删掉我的数据’并不代表可以立即删除全部记录。订单、支付、税务、应用副本与法定保留需要被逐项确认。",
    goalLead: "建立一份不含多余个人信息的请求台账与处理清单。", goal: "用测试请求跑通 intake、身份核验、系统盘点、审批与回执全过程。",
    outcomes: [["请求台账", "类型、期限与负责人清楚。"], ["系统地图", "Shopify 与应用副本可追踪。"], ["审批记录", "处理范围与例外有依据。"]],
    criteria: ["先核验请求人身份", "台账只存最少字段", "检查已安装应用与导出副本", "法定保留项单独记录", "删除前需隐私负责人批准", "回执不泄露额外数据"],
    module: "从客服消息到受控隐私流程", moduleSub: "AI 只对去标识化信息分类和查缺，授权人员在官方工具中处理真实数据。",
    steps: [
      { title: "登记并核验请求", time: "12 分钟", target: "确认谁提出了什么请求", blocks: [{ type: "code", label: "最小台账字段", text: "request_id | request_type | region | received_at | due_at | identity_status | systems | owner | approval | closed_at" }, { type: "list", items: ["使用安全渠道确认身份", "记录访问、导出、更正或删除类型", "按适用地区记录内部截止日期", "高风险或争议请求立即升级"] }], done: "请求有唯一编号、身份状态和具名负责人。" },
      { title: "盘点系统与例外", time: "18 分钟", target: "找到数据在哪里以及能否处理", blocks: [{ type: "prompt", label: "去标识化查缺提示词", text: "根据以下系统清单、应用权限、请求类型和公司保留政策，生成处理检查表：需要查询的系统、可能的数据类别、责任人、待法律/隐私确认项和完成证据。不要包含姓名、邮箱、地址、订单号或任何真实个人信息，不要自行判断法律例外。" }, { type: "note", kind: "warn", icon: "⚠️", label: "应用副本", text: "仅处理 Shopify 后台不一定覆盖第三方应用、客服系统和离线导出。" }], done: "每个系统都有查询负责人、结果和待确认例外。" },
      { title: "审批、执行与回执", time: "15 分钟", target: "让实际操作和沟通都可审计", blocks: [{ type: "list", items: ["隐私负责人确认范围与法定保留项", "授权人员在官方工具执行导出或删除", "记录操作时间、系统结果和失败项", "发送最小必要回执并关闭台账"] }, { type: "note", kind: "ok", icon: "✅", label: "验收", text: "测试请求能从收到到关闭完整回放，且模型记录中没有个人信息。" }], done: "请求关闭状态、处理证据与回执版本已保存。" }
    ],
    faq: [["能把客户邮件交给 AI 分类吗", "可能泄露个人信息", "先去标识化，只保留处理所需字段"], ["删除是否包含订单", "可能有法定保留要求", "由隐私或法律负责人确认"], ["应用里的数据怎么办", "第三方可能持有副本", "按应用清单逐一查询和记录"], ["请求人身份不确定", "误交付或误删风险很高", "暂停处理并走安全核验流程"]],
    sources: [["Shopify：Processing customer data requests", "https://help.shopify.com/en/manual/privacy-and-security/privacy/processing-customer-data-requests"], ["Shopify：Store permissions", "https://help.shopify.com/en/manual/your-account/users/roles/permissions/store-permissions"]]
  },
  "product-page-cwv-regression": {
    short: "商品页 Core Web Vitals 回归",
    eyebrow: "Shopify Web Performance · LCP / INP / CLS",
    titleHtml: "用 AI 定位<em>商品页性能回归</em>",
    sub: "对比真实用户指标、页面模板、主题与 App 变更，生成可验证的性能假设；不靠单次跑分下结论，也不让 AI 直接删除生产代码。",
    chips: ["⏱ 约 <b>50 分钟</b>", "🧩 3 个步骤", "⚡ Core Web Vitals", "🔒 复制主题测试"],
    introIcon: "⚡", introTitle: "性能是用户体验，不是一张满分截图。", intro: "LCP、INP、CLS 受真实设备、网络和模板影响。先看时间趋势和页面组，再把变更与指标关联。",
    goalLead: "为一个商品模板完成基线、变更对照和修复验证。", goal: "交付 cwv-regression.md，包含证据、假设、测试结果与回滚路径。",
    outcomes: [["性能基线", "真实用户指标和页面范围清楚。"], ["变更地图", "主题与 App 变化可对照。"], ["修复实验", "影响通过副本主题验证。"]],
    criteria: ["优先使用真实用户数据", "区分移动端与桌面", "保存变更时间线", "一次验证一个假设", "先在主题副本测试", "发布和回滚由负责人批准"],
    module: "从‘网站变慢’到可复现回归", moduleSub: "AI 归纳指标和假设，开发者验证根因并控制上线。",
    steps: [
      { title: "保存基线与页面组", time: "15 分钟", target: "确认哪个指标、哪些页面、何时开始变化", blocks: [{ type: "list", items: ["导出 Shopify Web Performance 趋势", "按商品模板、设备和市场分组", "记录 LCP、INP、CLS 与样本窗口", "列出同期主题发布、App 安装和媒体变更"] }], done: "回归范围和开始时间有数据支持，而非主观感受。" },
      { title: "生成可验证假设", time: "18 分钟", target: "把相关性拆成实验队列", blocks: [{ type: "prompt", label: "性能分析提示词", text: "根据以下真实用户指标、页面模板、主题/App 变更和资源清单，输出最多 5 个性能回归假设。每项写影响指标、证据、反证、最小测试、预期方向和回滚方式。不要把相关性写成因果，不要直接修改代码。" }, { type: "note", kind: "warn", icon: "⚠️", label: "单次跑分", text: "实验室测量用于复现，不应取代真实用户趋势。" }], done: "每个假设都有最小实验和明确回滚方式。" },
      { title: "副本验证并受控上线", time: "17 分钟", target: "证明修复有效且未破坏购物流程", blocks: [{ type: "list", items: ["复制主题并一次应用一个修复", "检查移动端商品图、变体、加购和结账入口", "重复实验室测试并记录环境", "负责人决定发布，发布后继续观察真实用户窗口"] }, { type: "note", kind: "ok", icon: "✅", label: "验收", text: "报告同时记录性能变化和功能回归结果。" }], done: "修复版本、发布决定与回滚点均已保存。" }
    ],
    faq: [["PageSpeed 一次变绿就完成吗", "单次结果波动很大", "结合真实用户窗口持续观察"], ["能直接卸载慢 App 吗", "可能影响业务功能", "在副本评估并由负责人决定"], ["图片一定是 LCP 根因吗", "也可能是主题、字体或脚本", "用证据逐个验证"], ["修复后指标没变", "样本和观察期可能不足", "记录不确定性并延长观察"]],
    sources: [["Shopify：Web performance reports", "https://help.shopify.com/en/manual/online-store/web-performance/web-performance-reports"], ["Shopify：Improving web performance", "https://help.shopify.com/en/manual/online-store/web-performance/improving-web-performance"], ["Google：Core Web Vitals", "https://developers.google.com/search/docs/appearance/core-web-vitals"]]
  },
  "shopify-order-routing-simulator": {
    short: "Shopify 多仓订单路由沙盘",
    eyebrow: "Shopify Fulfillment · Multi-location Routing",
    titleHtml: "用 AI 模拟<em>多仓订单路由与拆单</em>",
    sub: "用测试购物车比较仓库优先级、距离、市场和拆单结果，先在沙盘里发现成本与体验冲突；不自动改生产路由规则。",
    chips: ["⏱ 约 <b>50 分钟</b>", "🧩 3 个步骤", "🏭 Multi-location", "🔒 规则人工发布"],
    introIcon: "🏭", introTitle: "库存可用不等于应该从那里发。", intro: "订单路由同时影响拆包、距离、库存消耗和履约承诺。应先用代表性购物车验证，而不是看一条规则名称。",
    goalLead: "为三个市场、六个购物车场景建立路由测试矩阵。", goal: "完成 routing-simulator.csv 和一份不修改生产配置的规则建议。",
    outcomes: [["场景矩阵", "单品、混合购物车与缺货场景齐全。"], ["结果对照", "仓库、拆单与运费可比较。"], ["变更提案", "收益、风险与回滚写清。"]],
    criteria: ["使用测试商品或草稿订单", "保存当前规则快照", "覆盖主要市场", "记录拆单与预计成本", "不自动改库存", "发布需履约负责人批准"],
    module: "在真实订单前验证履约逻辑", moduleSub: "AI 批量整理测试结果，人决定库存策略和路由优先级。",
    steps: [
      { title: "建立仓库与场景矩阵", time: "15 分钟", target: "覆盖最容易出错的组合", blocks: [{ type: "code", label: "场景字段", text: "scenario | market | sku_set | inventory_by_location | current_rules | routed_location | split_count | rate | promise | notes" }, { type: "list", items: ["保存地点、库存、优先级与现行规则", "设计单 SKU、多 SKU、部分缺货与跨市场购物车", "包含高价值、超重或特殊履约商品", "明确期望结果和不可接受结果"] }], done: "六个场景均有输入、期望和风险条件。" },
      { title: "运行沙盘并解释差异", time: "20 分钟", target: "看清规则实际怎样组合", blocks: [{ type: "prompt", label: "路由对照提示词", text: "根据以下测试购物车、各地点库存、路由规则和实际结果，生成差异表。解释拆单、地点选择、距离、运费和承诺的可能原因，标记需在 Shopify 中人工核实的设置。不要改库存、订单或路由规则。" }], done: "每个异常都回到具体场景与待核验设置。" },
      { title: "提出变更并回归", time: "15 分钟", target: "一次调整一个路由假设", blocks: [{ type: "list", items: ["在沙箱或受控窗口调整候选规则", "重新运行完全相同的场景", "比较拆单、距离、库存与客户显示", "由履约负责人批准生产发布和回滚点"] }, { type: "note", kind: "ok", icon: "✅", label: "验收", text: "变更提案写明受益市场、代价、例外与回滚方式。" }], done: "测试证据与最终决定已形成版本记录。" }
    ],
    faq: [["能用真实订单测试吗", "可能触发履约与客户通知", "优先用测试商品或草稿场景"], ["最近仓一定最好吗", "还受库存、拆单与成本影响", "用多指标比较"], ["AI 能改路由规则吗", "会影响所有新订单", "只生成提案，由负责人发布"], ["规则调整后还要测吗", "组合行为可能变化", "用原场景完整回归"]],
    sources: [["Shopify：Order routing", "https://help.shopify.com/en/manual/fulfillment/setup/order-routing"], ["Shopify：Understanding order routing", "https://help.shopify.com/en/manual/fulfillment/setup/order-routing/understanding-order-routing"], ["Shopify：Location fulfillment", "https://help.shopify.com/en/manual/fulfillment/setup/locations/fulfillment"]]
  },
  "shopify-b2b-catalog-brief": {
    short: "Shopify B2B 目录与阶梯价提案",
    eyebrow: "Shopify B2B · Catalogs · Volume Pricing",
    titleHtml: "用 AI 起草<em>B2B 目录与阶梯价方案</em>",
    sub: "按公司、市场、币种、数量规则和利润边界生成目录提案；不让模型决定客户资格、底价或合同条款。",
    chips: ["⏱ 约 <b>55 分钟</b>", "🧩 3 个步骤", "🏢 Shopify B2B", "🔒 商务审批"],
    introIcon: "🏢", introTitle: "B2B 价格是一组规则，不是一张折扣表。", intro: "客户公司、目录、市场、币种、最小数量和阶梯价互相影响。先把适用对象和利润护栏锁定，再批量生成草案。",
    goalLead: "为一个目标客户群建立 20 个 SKU 的 B2B 目录提案。", goal: "交付 b2b-catalog-brief.csv、例外清单和审批记录，不直接发布价格。",
    outcomes: [["客户分组", "公司与市场适用范围清楚。"], ["目录草案", "数量与阶梯价可核对。"], ["审批包", "利润、例外与生效条件明确。"]],
    criteria: ["公司资格由销售确认", "成本与底价来自批准数据", "币种和税显示明确", "数量规则可履约", "合同价例外单独处理", "发布前财务与商务会签"],
    module: "从客户分组到受控价格目录", moduleSub: "AI 负责校验结构和发现冲突，商务与财务掌握价格决定权。",
    steps: [
      { title: "定义公司与价格边界", time: "18 分钟", target: "明确谁能看到哪套目录", blocks: [{ type: "list", items: ["列出公司、地点、市场与币种", "记录批准成本、建议底价和目标毛利", "区分标准价、合同价与临时例外", "确认最小起订量、增量和可履约上限"] }], done: "每个客户组都有适用条件和审批人。" },
      { title: "生成目录提案与冲突表", time: "20 分钟", target: "批量检查价格和数量规则", blocks: [{ type: "prompt", label: "B2B 目录提示词", text: "根据以下公司分组、SKU、成本、批准底价、币种、MOQ、数量增量和阶梯规则，生成目录草案和冲突清单。不得创造折扣、客户资格、税务结论或合同条款；低于底价、币种不明、阶梯倒挂或库存不可履约的项标记人工处理。" }, { type: "note", kind: "danger", icon: "🛑", label: "底价", text: "模型生成的任何数字都必须与批准输入逐单元格核对。" }], done: "20 个 SKU 均处于通过、冲突或待资料三种状态。" },
      { title: "预览客户体验并审批", time: "17 分钟", target: "确认目录、数量和结账展示一致", blocks: [{ type: "list", items: ["用测试公司账户预览商品与价格", "验证最小数量、增量和阶梯切换", "检查币种、税、付款与草稿订单流程", "财务和商务会签后再安排发布"] }, { type: "note", kind: "ok", icon: "✅", label: "验收", text: "测试公司只看到被分配的目录，且结账价格与批准表一致。" }], done: "目录版本、生效范围和回滚方式已记录。" }
    ],
    faq: [["AI 能推荐折扣吗", "缺乏完整成本和合同语境", "只在批准边界内生成草案"], ["同一公司多个地点怎么办", "目录分配可能不同", "按公司地点逐一测试"], ["能自动发布目录吗", "错误会直接影响成交价", "必须财务和商务审批"], ["阶梯价越多越好吗", "复杂度会增加运营错误", "只保留有商业理由的层级"]],
    sources: [["Shopify：B2B catalogs with Markets", "https://help.shopify.com/en/manual/b2b/markets/catalogs"], ["Shopify：B2B catalogs", "https://help.shopify.com/en/manual/b2b/catalogs"], ["Shopify：B2B overview", "https://help.shopify.com/en/manual/b2b"]]
  },
  "ai-cro-hypothesis-lab": {
    short: "AI CRO 单变量实验台",
    eyebrow: "X 1180 万观看 · Evidence-led CRO",
    titleHtml: "让 AI 把页面问题变成<em>单变量实验</em>",
    sub: "从分析、客服和页面证据提出可证伪假设，复制主题后只改一个变量；不承诺转化提升，也不让 Agent 直接发布。",
    chips: ["⏱ 约 <b>50 分钟</b>", "🧩 3 个步骤", "🧪 CRO Experiment", "🔒 人工发布与回滚"],
    introIcon: "🧪", introTitle: "实验不是让 AI 随机改页面。", intro: "一次改标题、图片、价格和布局，结果再好也无法解释。高质量 CRO 从证据、单一假设和预设停止条件开始。",
    goalLead: "为一个商品页完成一份单变量实验 brief 和主题副本。", goal: "交付 cro-test.md：证据、假设、变体、指标、护栏、周期与回滚，不在主主题直接修改。",
    outcomes: [["证据包", "问题来自真实行为和反馈。"], ["实验 brief", "单一变量与指标明确。"], ["回滚记录", "任何上线都可恢复。"]],
    criteria: ["至少两类独立证据", "一次只改一个核心变量", "不伪造紧迫感或评价", "指标与护栏预先定义", "在主题副本测试", "发布由店铺负责人批准"],
    module: "把优化意见改写成可验证实验", moduleSub: "AI 帮你总结证据和写变体，人控制事实、发布、流量与结论。",
    steps: [
      { title: "建立页面证据包", time: "15 分钟", target: "确认问题值得测试", blocks: [{ type: "list", items: ["保存页面版本、流量和转化基线", "汇总站内搜索、客服和用户测试信号", "标记设备、市场与商品差异", "区分观察事实、解释和个人偏好"] }], done: "实验问题至少由两类可追溯证据支持。" },
      { title: "生成单变量假设", time: "18 分钟", target: "明确改什么、为什么和怎样判定", blocks: [{ type: "prompt", label: "CRO 提示词", text: "根据以下页面、行为数据、客服主题和商品事实，提出最多 3 个可证伪 CRO 假设。每项写证据、目标用户、单一变量、原版/变体差异、主指标、风险护栏、最小观察窗口和反证条件。不得创造折扣、库存紧迫感、评价或效果承诺。" }], done: "选中的假设只有一个核心变量并有失败条件。" },
      { title: "副本实现、质检与发布决定", time: "17 分钟", target: "保护生产主题和购物流程", blocks: [{ type: "list", items: ["复制当前主题并记录版本", "只实现选定变量，保留原版截图", "回归移动端、变体、加购、支付入口和性能", "由负责人决定测试发布、停止或回滚"] }, { type: "note", kind: "ok", icon: "✅", label: "验收", text: "结果报告区分数据、解释与下一轮假设，不把短期波动写成因果。" }], done: "实验、发布决定和回滚点均可追溯。" }
    ],
    faq: [["AI 能直接改主题吗", "可能引入事实和功能错误", "只在副本生成草案并人工质检"], ["测试多久", "取决于流量和业务周期", "预先定义窗口，不看一天结果"], ["能同时测多个页面元素吗", "难以归因", "本教程坚持单一核心变量"], ["没有显著提升怎么办", "无结果也是有效证据", "保留记录并更新假设"]],
    sources: [["X：Fab 的 AI CRO 实践", "https://x.com/fabrice_mayrand/status/2040665047186452733"], ["Shopify：Duplicating themes", "https://help.shopify.com/en/manual/online-store/themes/managing-themes/duplicating-themes"], ["Shopify：Web performance", "https://help.shopify.com/en/manual/online-store/web-performance"]]
  },
  "b2b-lead-triage-desk": {
    short: "跨境 B2B 询盘分流台",
    eyebrow: "X 1.04 万观看 · B2B Lead Operations",
    titleHtml: "用 AI 把跨境询盘变成<em>可响应的销售队列</em>",
    sub: "将表单内容去噪、查缺并按地区、MOQ 和意向分流；价格、交期、付款和合规承诺必须由销售或运营人员确认。",
    chips: ["⏱ 约 <b>40 分钟</b>", "🧩 3 个步骤", "📨 B2B Inquiry", "🔒 真人报价"],
    introIcon: "📨", introTitle: "回复更快，不等于承诺更快。", intro: "询盘分流的目标是把有效信息送到正确负责人，并快速补齐缺口，而不是让模型根据模糊描述自动报价。",
    goalLead: "用 10 条去标识化询盘跑通摘要、查缺、优先级和回复草稿。", goal: "完成 lead-triage.csv 与三类回复模板，不自动发送。",
    outcomes: [["询盘摘要", "需求与缺失信息一目了然。"], ["分流队列", "市场、产品和负责人明确。"], ["回复草稿", "只确认已知事实并提出下一步。"]],
    criteria: ["移除不必要个人信息", "不推断客户规模或支付能力", "MOQ 来自批准规则", "不承诺价格和交期", "高价值与异常询盘人工复核", "发送前由销售确认"],
    module: "从杂乱表单到具名销售下一步", moduleSub: "AI 负责摘要和查缺，销售掌握资格、商业条款和最终沟通。",
    steps: [
      { title: "设计收件与分流规则", time: "12 分钟", target: "先定义什么信息足够进入销售", blocks: [{ type: "code", label: "台账字段", text: "lead_id | market | product | quantity | use_case | deadline | missing_fields | priority_reason | owner | status" }, { type: "list", items: ["定义支持的市场、产品和 MOQ", "列出必须补充的信息", "建立垃圾、普通、优先和需合规复核状态", "为每个区域和产品指定负责人"] }], done: "规则能解释每条询盘为什么进入某个队列。" },
      { title: "批量摘要、查缺与分流", time: "15 分钟", target: "减少阅读时间但不丢失原意", blocks: [{ type: "prompt", label: "询盘分流提示词", text: "根据以下去标识化询盘和已批准销售规则，输出：客户原始需求摘要、明确事实、缺失信息、建议队列、优先级理由、负责人和回复要点。不得推断预算、公司规模或信誉，不得生成价格、交期、付款或合规承诺。" }], done: "10 条询盘均有原文引用、缺口和可解释分流。" },
      { title: "人工确认并回复", time: "13 分钟", target: "让第一次回复只推进一个明确下一步", blocks: [{ type: "list", items: ["销售核对商品、区域与 MOQ", "补充获批的价格或样品流程", "检查语言、时区和所需文件", "人工发送并记录下一步和截止时间"] }, { type: "note", kind: "ok", icon: "✅", label: "验收", text: "回复不含模型猜测，且每条有效询盘都有 owner 和 next_action。" }], done: "发送版本与后续状态已记录。" }
    ],
    faq: [["能自动给线索打分吗", "输入不足会造成偏差", "只作可解释队列建议并人工校准"], ["能自动报价吗", "价格和交期是商业承诺", "必须由销售确认"], ["多语言询盘怎么办", "翻译可能改变规格", "保留原文并由对应语言人员复核"], ["垃圾询盘能直接删除吗", "规则可能误伤真实客户", "先隔离并抽检"]],
    sources: [["X：Corey Ganim 的 B2B 响应实践", "https://x.com/GanimCorey/status/2022753724553105477"], ["Shopify：Forms app", "https://help.shopify.com/en/manual/promoting-marketing/create-marketing/forms-app"], ["Shopify：Customer segmentation", "https://help.shopify.com/en/manual/customers/customer-segmentation"]]
  },
  "customer-account-agent-qa": {
    short: "顾客账户 Agent 回归检查",
    eyebrow: "X 6.6 万观看 · Shopify Customer Accounts",
    titleHtml: "让浏览器 Agent 检查<em>顾客账户关键路径</em>",
    sub: "用测试账号覆盖登录、订单、地址与退货入口，保存证据并交给真人判断；不读取或修改真实客户订单。",
    chips: ["⏱ 约 <b>45 分钟</b>", "🧩 3 个步骤", "🤖 Browser Agent QA", "🔒 仅测试账户"],
    introIcon: "🤖", introTitle: "账户页问题常藏在身份和状态组合里。", intro: "新客、回访客、移动端、无订单和有订单状态都可能看到不同入口。Agent 适合重复走流程，但必须限制账号与写操作。",
    goalLead: "建立 8 个顾客账户场景的可重复回归套件。", goal: "交付 customer-account-qa.md、截图与缺陷记录，不对真实客户数据执行操作。",
    outcomes: [["场景矩阵", "身份、设备与订单状态覆盖。"], ["运行证据", "每一步截图与结果可回放。"], ["缺陷队列", "复现、影响和负责人明确。"]],
    criteria: ["只用专用测试账号", "不访问真实客户订单", "写操作使用沙箱数据", "验证键盘与移动端", "失败保留截图和 URL", "修复后重跑原场景"],
    module: "把账户体验变成可重复检查", moduleSub: "Agent 执行固定步骤，人判断业务正确性、可访问性与严重程度。",
    steps: [
      { title: "建立受限测试矩阵", time: "14 分钟", target: "覆盖关键身份和状态", blocks: [{ type: "list", items: ["准备新客、回访客和有测试订单账号", "覆盖桌面、移动端和键盘导航", "列出登录、资料、地址、订单详情与退货入口", "标注允许读取、允许测试和禁止操作"] }], done: "8 个场景均有前置状态、步骤和预期结果。" },
      { title: "让 Agent 执行并采证", time: "18 分钟", target: "保持动作、判断与证据分离", blocks: [{ type: "prompt", label: "Agent 指令", text: "仅使用提供的测试账号和允许页面，按场景逐步执行。每步记录 URL、可见文本、截图、预期/实际和阻塞点；不得进入真实订单、不得提交退款、取消、支付、地址修改或任何不可逆操作。遇到不确定状态立即停止。" }, { type: "note", kind: "danger", icon: "🛑", label: "停止条件", text: "出现真实客户信息、支付或不可逆按钮时立即停止并升级。" }], done: "每个场景都有通过、失败或阻塞状态与证据。" },
      { title: "人工定级与修复回归", time: "13 分钟", target: "把失败变成可复现缺陷", blocks: [{ type: "list", items: ["人工复看截图和录屏", "按影响用户、频率和是否阻断购物定级", "记录最小复现步骤和责任组件", "修复后用相同测试账号重跑原场景"] }, { type: "note", kind: "ok", icon: "✅", label: "验收", text: "缺陷关闭必须附原失败与修复后通过证据。" }], done: "测试套件可在下一次主题或扩展更新后复用。" }
    ],
    faq: [["能用真实账号检查吗", "可能泄露或修改客户数据", "只用隔离测试账号"], ["Agent 通过就一定没问题吗", "它可能漏掉业务或可访问性问题", "保留人工抽检"], ["退货流程怎么测", "真实提交可能不可逆", "只到安全检查点或使用测试环境"], ["多语言都要跑吗", "入口和文案可能按市场变化", "至少覆盖主要语言和市场"]],
    sources: [["X：Shopify Developers Customer Accounts", "https://x.com/ShopifyDevs/status/2024171944518598965"], ["Shopify Dev：Customer Account UI extensions", "https://shopify.dev/docs/api/customer-account-ui-extensions"], ["Shopify：Customer accounts", "https://help.shopify.com/en/manual/customers/customer-accounts"]]
  },
  "vertical-product-truth-qc": {
    short: "竖版商品视频事实连续性质检",
    eyebrow: "X 5.95 万观看 · Multimodal Video QA",
    titleHtml: "用多模态 AI 检查<em>商品视频逐镜事实</em>",
    sub: "逐镜核对 SKU、颜色、数量、配件、Logo 与画面文字，先生成时间码问题单再人工审片；不把生成视频当作实物证据。",
    chips: ["⏱ 约 <b>40 分钟</b>", "🧩 3 个步骤", "🎬 Vertical Video QC", "🔒 真人终审"],
    introIcon: "🎬", introTitle: "一帧正确，不代表整条视频正确。", intro: "转场、换景和生成补帧最容易让颜色、数量、接口或包装发生漂移。跨帧质检要回到批准的 SKU 事实卡。",
    goalLead: "为一条 9:16 产品视频完成逐镜事实与连续性检查。", goal: "交付 video-truth-qc.csv、时间码问题单和人工签收版本。",
    outcomes: [["事实卡", "可见商品特征有批准来源。"], ["时间码报告", "每个问题可快速定位。"], ["终审记录", "修复版逐项关闭问题。"]],
    criteria: ["使用批准 SKU 事实卡", "逐镜检查而非只看封面", "区分视觉事实与营销主张", "Logo 与文字单独 OCR", "AI 不确定项人工查看", "发布前商品负责人签收"],
    module: "让生成视频始终指向同一真实商品", moduleSub: "模型做高频初筛，商品与品牌负责人完成最终事实审核。",
    steps: [
      { title: "锁定商品事实与检查维度", time: "10 分钟", target: "定义视频中哪些内容不能漂移", blocks: [{ type: "code", label: "检查字段", text: "timecode | sku | color | count | shape | accessory | logo | on_screen_text | claim | confidence | reviewer | status" }, { type: "list", items: ["保存批准主图、包装和规格", "列出颜色、数量、接口与随附配件", "记录允许 Logo、文字和主张", "把风格变化与事实错误分开"] }], done: "事实卡由商品负责人确认且有版本号。" },
      { title: "多模态逐镜初检", time: "17 分钟", target: "输出可定位、可复核的问题", blocks: [{ type: "prompt", label: "视频质检提示词", text: "依据提供的 SKU 事实卡检查整条竖版视频。按时间码列出商品身份、颜色、数量、形状、配件、Logo、画面文字和主张的一致/不一致/无法确认；引用对应事实字段，不要把生成画面当作证据，不要自行补写商品属性。" }], done: "所有异常都有时间码、事实来源和置信状态。" },
      { title: "人工审片、修复与复检", time: "13 分钟", target: "关闭真实问题而非只改报告", blocks: [{ type: "list", items: ["商品负责人逐条打开时间码", "品牌负责人核对 Logo、文字与授权", "剪辑师修复或替换错误镜头", "用同一事实卡复检最终导出文件"] }, { type: "note", kind: "ok", icon: "✅", label: "验收", text: "最终版本的哈希或文件名与签收记录一致。" }], done: "问题单全部关闭或有明确接受风险的批准人。" }
    ],
    faq: [["AI 能看完整视频吗", "支持取决于工具和文件限制", "必要时分段且保留时间码"], ["风格变化算错误吗", "不一定影响商品事实", "按事实卡和品牌规则分别判断"], ["生成视频能证明功能吗", "生成画面不是产品证据", "功能主张必须来自批准资料"], ["为什么还要人工审片", "模型可能漏帧、误读文字或配件", "商品负责人必须终审"]],
    sources: [["X：Google 竖版视频能力展示", "https://x.com/Google/status/2011205533563253091"], ["Google AI：Video understanding", "https://ai.google.dev/gemini-api/docs/video"], ["Google Merchant Center：Image requirements", "https://support.google.com/merchants/answer/6324350"]]
  },
  "campaign-creative-governance": {
    short: "节日与新品创意版本治理",
    eyebrow: "X 41.32 万观看 · Creative Governance",
    titleHtml: "给 AI 创意建立<em>事实、授权与审批链</em>",
    sub: "把节日活动或新品发布拆成批准事实、授权素材、地区禁词和版本状态，让 AI 生成候选而不是失控发布。",
    chips: ["⏱ 约 <b>50 分钟</b>", "🧩 3 个步骤", "🎨 Creative Ops", "🔒 审批后发布"],
    introIcon: "🎨", introTitle: "创意规模越大，版本治理越重要。", intro: "同一活动常同时产生图片、视频、落地页和多语言文案。没有事实卡与版本号，团队很快会发布过期优惠、错误包装或未授权素材。",
    goalLead: "为一个节日或新品活动建立可复用的创意工作台。", goal: "完成 creative-governance.md、10 份候选资产的来源与审批记录。",
    outcomes: [["事实锁", "商品、日期、价格与禁用主张固定。"], ["资产台账", "来源、授权和版本可追溯。"], ["审批包", "地区、渠道和发布状态明确。"]],
    criteria: ["事实来自批准资料", "素材授权和有效期可查", "AI 内容明确标记", "地区禁用词分别配置", "旧版本能被撤回", "发布人不是生成者本人"],
    module: "从灵感生成到可控创意供应链", moduleSub: "AI 提高候选产量，治理层确保每份资产都准确、获权且适合目标市场。",
    steps: [
      { title: "建立活动事实锁", time: "14 分钟", target: "先定义所有创意共同遵守的真相", blocks: [{ type: "list", items: ["锁定 SKU、包装、颜色和功能事实", "锁定价格、优惠、日期和库存表达边界", "列出各市场禁用主张和文化风险", "登记 Logo、字体、人物、音乐和素材授权"] }], done: "事实锁有版本、负责人和生效日期。" },
      { title: "生成候选并登记来源", time: "20 分钟", target: "让每份创意都能追溯输入和生成过程", blocks: [{ type: "prompt", label: "创意工作台提示词", text: "根据批准事实锁、授权素材、目标市场、渠道规格和地区禁用词，生成创意 brief、镜头/版式候选与文案草稿。每份输出标记使用的事实、素材来源、AI 生成部分、目标地区和人工审核项；不得创造折扣、库存、评价、功效或授权。" }, { type: "note", kind: "warn", icon: "⚠️", label: "版本", text: "导出文件名必须包含 campaign、locale、channel、version 和 status。" }], done: "10 份候选均有来源、版本和待审核项。" },
      { title: "分层审核与发布交接", time: "16 分钟", target: "让事实、品牌、地区和渠道各有责任人", blocks: [{ type: "list", items: ["商品负责人审事实和演示", "品牌/版权负责人审视觉与授权", "本地市场负责人审语言与文化", "投放负责人只接收 Approved 版本并记录去向"] }, { type: "note", kind: "ok", icon: "✅", label: "验收", text: "过期活动能按资产 ID 找到全部发布去向并撤回。" }], done: "批准、拒绝和撤回版本均有具名记录。" }
    ],
    faq: [["AI 生成就代表可商用吗", "工具权限不等于所有输入和元素获权", "逐项登记来源和许可"], ["能让模型自动本地化吗", "地区语境和禁词会不同", "生成草稿后由本地人员审核"], ["怎样避免旧优惠继续投放", "缺少版本和发布去向", "维护资产 ID、有效期与撤回清单"], ["生成者能自己批准吗", "容易遗漏事实和授权风险", "至少采用独立复核"]],
    sources: [["X：Flow by Google 创意工作流", "https://x.com/FlowbyGoogle/status/2026704701069074603"], ["Google Flow：Help", "https://support.google.com/flow/answer/16353333"], ["Google Ads：Asset policy", "https://support.google.com/adspolicy/answer/6021546"]]
  }
} as const;
