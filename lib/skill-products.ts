export type SkillProduct = {
  slug: string;
  title: string;
  category: "跨境电商" | "教育";
  status: "正式发布" | "已演练" | "已验证" | "即将推出";
  availability: "available" | "waitlist";
  version: string;
  summary: string;
  audience: string[];
  problem: string;
  exclusions: string[];
  tools: string[];
  delivery: string[];
  inputs: string[];
  demo: string[];
  publicExample: { input: string; output: string; disclosure: string };
  boundaries: string[];
  priceLabel: string;
  faq: Array<[string, string]>;
  updatedAt: string;
  changes: string;
  marketValidation: string;
  relatedTutorials: string[];
};

export const skillCategories = ["跨境电商", "教育"] as const;

export const skillProducts: SkillProduct[] = [
  {
    slug: "product-material-agent",
    title: "商品素材生产 Skill 小课包",
    category: "跨境电商",
    status: "正式发布",
    availability: "available",
    version: "1.0.0",
    summary: "把已授权的商品事实和源图整理为本地化文案、镜头计划、视频分镜与发布前质检清单。",
    audience: ["跨境电商运营", "商品内容团队", "需要完成作品的课程学员"],
    problem: "商品资料分散、卖点容易越界、图片和视频需求缺少统一生产规范。",
    exclusions: ["不自动生成或发布媒体", "不托管 API Key 或客户商品数据", "不保证商业结果"],
    tools: ["Codex", "WorkBuddy", "兼容 SKILL.md 的工具"],
    delivery: ["商品素材生产 Skill", "产品事实表模板", "素材计划模板", "交付 Manifest", "质量门槛与去敏示例"],
    inputs: ["有授权的产品事实", "源图或明确的资产清单", "目标市场与语言", "品牌规则与禁止说法"],
    demo: ["输出事实来源与缺口", "为主图、细节图和视频定义不同镜头目的", "缺少生成服务时交付可执行脚本，不伪造媒体"],
    publicExample: {
      input: "合成商品事实：黑色涤纶旅行收纳袋；尺寸、容量、防水和闭合方式未知。",
      output: "只使用已授权事实生成文案、五图镜头计划、六秒视频分镜和阻塞项，不生成或伪造媒体。",
      disclosure: "这是无品牌、无客户数据的合成输入输出，不代表客户经营成果。",
    },
    boundaries: ["AI 输出必须人工审核", "模型服务费用由用户自行承担（如使用）", "不保证商业结果，也不替代合规判断"],
    priceLabel: "首发咨询报价 · 课程学员可申请权益",
    faq: [
      ["支持什么工具？", "已提供 Codex 与 WorkBuddy 的安装说明；其他兼容 SKILL.md 的工具需由用户自行确认。"],
      ["会自动生成图片和视频吗？", "本包先保证事实、脚本和质检流程。是否生成媒体取决于用户自行授权的工具和服务。"],
      ["需要提供 API Key 吗？", "不需要。请只在自己的工具或环境中配置；不要通过表单、聊天或邮件发送。"],
      ["如何获得更新？", "人工交付会记录版本；重大兼容性或内容更新会在变更记录中说明。"],
    ],
    updatedAt: "2026-08-26",
    changes: "1.0.0：商用首发；包含配置、输入输出合同、授权、支持、回滚、自校验、公开样例和发布清单。",
    marketValidation: "尚无可验证的真实客户运营数据；不据此声称销量、转化或客户成果。",
    relatedTutorials: ["ai-product-visual-brief", "agent-skill"],
  },
  {
    slug: "crossborder-listing-localization",
    title: "跨境 Listing 本地化 Skill 小课包",
    category: "跨境电商",
    status: "正式发布",
    availability: "available",
    version: "1.0.0",
    summary: "把可追溯商品事实转成目标市场的 Listing 草稿，并把待确认信息清楚交回人工。",
    audience: ["负责多市场 Listing 的运营", "品牌内容团队", "跨境服务商"],
    problem: "直译忽略尺寸、变体、配送和市场限制，造成承诺不一致。",
    exclusions: ["不替代翻译审校或法律审核", "不自行判断市场合规", "不保证转化或排名"],
    tools: ["Codex", "WorkBuddy", "兼容 SKILL.md 的工具"],
    delivery: ["本地化 Skill", "市场 Brief 模板", "Listing 文案模板", "来源与缺口复核表", "去敏示例"],
    inputs: ["已确认商品事实", "目标市场和语言", "现行政策与品牌语气", "需保留的变体信息"],
    demo: ["标题、卖点和描述草稿", "事实来源和未知字段分离", "市场负责人需确认的清单"],
    publicExample: {
      input: "合成商品事实：蓝色、涤纶、旅行收纳袋；其他属性均为 unknown。",
      output: "英文标题与三条事实型要点、Claim Ledger、阻塞项和 not_ready Manifest，不补造用途或性能。",
      disclosure: "这是去敏合成样例，不代表渠道审核、排名或转化结果。",
    },
    boundaries: ["翻译和合规必须人工确认", "不得把未知字段写成卖点", "不保证商业结果，也不提供法律结论"],
    priceLabel: "正式版咨询报价 · 课程学员可申请权益",
    faq: [
      ["包含所有语言吗？", "先按订单确认的目标市场交付；未测试语言不会默认承诺兼容。"],
      ["能直接发布到店铺吗？", "不能。第一期只交付可审核的文案和检查表。"],
      ["是否会保留商品资料？", "不要求上传客户商品数据；用户应在自己的环境中运行。"],
      ["更新包含什么？", "以购买时的版本说明为准，重大修正会记录在变更日志。"],
    ],
    updatedAt: "2026-08-26",
    changes: "1.0.0：商用首发；补齐配置、合同、授权、支持、回滚、自校验、公开样例和发布清单。",
    marketValidation: "尚无可验证的真实客户运营数据；产品包完整性不等于市场成熟度。",
    relatedTutorials: ["crossborder-localization-qc", "amazon-ai-listing"],
  },
  {
    slug: "product-media-qa",
    title: "商品图 / 视频质检 Skill 小课包",
    category: "跨境电商",
    status: "正式发布",
    availability: "available",
    version: "1.0.0",
    summary: "在发布前检查商品身份、变体、文字、画面缺陷、文件完整性和人工复核项。",
    audience: ["商品运营", "创意制作团队", "跨境电商服务商"],
    problem: "素材在发布前缺少一致的真伪、变体和交付检查，容易出现错品、错色或无依据卖点。",
    exclusions: ["不保证识别全部缺陷", "不替代平台审核", "不自动发布或替换素材"],
    tools: ["Codex", "WorkBuddy", "兼容 SKILL.md 的工具"],
    delivery: ["媒体质检 Skill", "问题分级表", "发布前检查清单", "交付 Manifest", "去敏示例"],
    inputs: ["商品事实和源图", "候选图片或视频", "目标渠道规格", "已授权品牌规则"],
    demo: ["身份和可见事实核对", "严重问题与人工复核项分类", "文件、尺寸、时长和交付清单检查"],
    publicExample: {
      input: "合成 64×64 PNG、1 秒 MP4、字幕文件与人工定义的商品参考和交付规格。",
      output: "逐文件 Inventory、四态结果、Issue Log、复测责任和严格 Batch Decision；任何未解决项都阻塞发布。",
      disclosure: "这是无品牌合成夹具和去敏报告，不是客户素材或平台通过证明。",
    },
    boundaries: ["机器检查不是最终批准", "疑似侵权、合规或安全问题必须人工升级", "不保证商业结果或平台通过率"],
    priceLabel: "正式版咨询报价 · 课程学员可申请权益",
    faq: [
      ["能替代人工质检吗？", "不能。它帮助统一检查顺序和记录证据，最终发布仍由负责人决定。"],
      ["支持哪些文件？", "购买前确认目标渠道和文件类型；未测试格式不会默认支持。"],
      ["会上传我的素材吗？", "Skill 默认基于用户本地或已授权环境工作，不要求上传到本站。"],
      ["包含更新吗？", "更新范围以交付版本说明为准，并保留变更记录。"],
    ],
    updatedAt: "2026-08-26",
    changes: "1.0.0：商用首发；补齐配置、合同、授权、支持、回滚、自校验、媒体夹具和严格发布公式。",
    marketValidation: "尚无可验证的真实客户运营数据；真实媒体类型和宿主能力仍需按订单复核。",
    relatedTutorials: ["vertical-product-truth-qc", "amazon-ai-video-review"],
  },
];

export function getSkillProduct(slug: string) {
  return skillProducts.find((item) => item.slug === slug);
}

export function relatedSkillProductsForTutorial(slug: string) {
  return skillProducts.filter((item) => item.relatedTutorials.includes(slug));
}
