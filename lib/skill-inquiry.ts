export type SkillInquiry = {
  product: string;
  rights: string;
  identity: string;
  name: string;
  email: string;
  region: string;
  tool: string;
  scenario: string;
};

export function buildInquiryMailto(recipient: string, inquiry: SkillInquiry) {
  const subject = `[昆仑增长AI实战] ${inquiry.rights}：${inquiry.product}`;
  const body = [
    `产品：${inquiry.product}`,
    `咨询类型：${inquiry.rights}`,
    `身份：${inquiry.identity}`,
    `名称：${inquiry.name}`,
    `邮箱：${inquiry.email}`,
    `地区：${inquiry.region || "未填写"}`,
    `当前工具：${inquiry.tool || "未填写"}`,
    "",
    "使用场景：",
    inquiry.scenario,
    "",
    "我确认以上内容不含 API Key、客户隐私数据、支付卡信息、Cookie、令牌或真实订单数据。",
  ].join("\n");
  return `mailto:${encodeURIComponent(recipient)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
