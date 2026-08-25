"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Footer } from "@/components/footer";
import { SiteHeader } from "@/components/site-header";
import { getFormMode, submitToFormspree } from "@/lib/form-delivery";
import { buildInquiryMailto } from "@/lib/skill-inquiry";
import { getSkillProduct, skillProducts } from "@/lib/skill-products";

type SubmitState = "idle" | "sending" | "sent" | "error" | "email" | "unavailable";

function ContactForm() {
  const searchParams = useSearchParams();
  const requestedSlug = searchParams.get("product") || "";
  const initialProduct = getSkillProduct(requestedSlug)?.slug || "";
  const [productSlug, setProductSlug] = useState(initialProduct);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const courseRights = searchParams.get("rights") === "course";
  const selectedProduct = getSkillProduct(productSlug);
  const isPurchaseInquiry = Boolean(selectedProduct);
  const isAvailable = selectedProduct?.availability === "available";
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "";
  const formspreeEndpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT?.trim() || "";
  const formMode = getFormMode("contact", formspreeEndpoint, contactEmail);

  async function submitInquiry(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const currentProduct = getSkillProduct(String(data.get("product") || ""));
    const rights = currentProduct
      ? currentProduct.availability === "available"
        ? data.get("courseRights") === "on" ? "课程权益" : "购买咨询"
        : "小课包意向登记"
      : "资源与机构联系";
    data.set("formType", "contact");
    data.set("productTitle", currentProduct?.title || "资源与机构联系");
    data.set("inquiryType", rights);

    if (formMode === "formspree") {
      setSubmitState("sending");
      const result = await submitToFormspree(formspreeEndpoint, data);
      setSubmitState(result === "sent" ? "sent" : "error");
      return;
    }
    if (formMode === "disabled") {
      setSubmitState("unavailable");
      return;
    }
    setSubmitState("email");
    window.location.href = buildInquiryMailto(contactEmail, {
      product: currentProduct?.title || "资源与机构联系",
      rights,
      identity: String(data.get("identity") || ""),
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      region: String(data.get("region") || ""),
      tool: String(data.get("tool") || ""),
      scenario: String(data.get("scenario") || ""),
    });
  }

  return <><SiteHeader /><main className="page shell">
    <span className="eyebrow">{isPurchaseInquiry ? "SKILL COURSE PACK · HUMAN DELIVERY" : "RESOURCE & INSTITUTION CONNECTION"}</span>
    <h1 className="page-title">{isPurchaseInquiry ? isAvailable ? "先确认适用，再安排交付。" : "登记需求，等待验证完成。" : "留下需求，不公开敏感信息。"}</h1>
    <p className="page-lead">{isPurchaseInquiry ? isAvailable ? "第一期不直接接入支付或自动下载。发送咨询邮件后，团队会人工确认付款或课程权益，并发送对应版本和安装说明。" : "该小课包仍在验证，当前只接受意向与课程权益登记，不收款、不自动下载，也不承诺交付时间。" : "第一阶段只做资源和机构联系。平台不公开具体融资条款，不构成投资建议或融资承诺。"}</p>
    <p className="form-note"><strong>安全提醒：</strong>不要填写 API Key、客户隐私数据、支付卡信息、Cookie、令牌或真实订单数据。密钥只能在你自己的工具或环境中配置。</p>
    <form className="form-card wide" onSubmit={submitInquiry}>
      {selectedProduct && <p className="form-message"><strong>当前咨询：</strong>{selectedProduct.title}{courseRights ? "（课程学员权益）" : isAvailable ? "（付费小课包）" : "（开放意向登记）"}</p>}
      <div className="form-grid">
        <label>选择小课包<select name="product" value={productSlug} onChange={(event) => { setProductSlug(event.target.value); setSubmitState("idle"); }}><option value="">暂不选择，仅咨询资源</option>{skillProducts.map((product) => <option key={product.slug} value={product.slug}>{product.title}</option>)}</select></label>
        <label>我是<select name="identity" defaultValue={courseRights ? "课程学员" : "企业需求方"}><option>企业需求方</option><option>课程学员</option><option>跨境电商服务商</option><option>项目团队</option><option>产业园区 / 服务机构</option><option>AI 工具厂商</option></select></label>
        <label>机构或姓名<input required name="name" placeholder="用于人工联系的名称" /></label>
        <label>邮箱<input required name="email" type="email" placeholder="you@example.com" /></label>
        <label>所在地区<input name="region" placeholder="中国 / 海外中文市场" /></label>
        <label>当前工具（可选）<input name="tool" placeholder="如 Codex、WorkBuddy 或尚未使用" /></label>
      </div>
      {selectedProduct && <label className="check"><input name="courseRights" type="checkbox" defaultChecked={courseRights} />我是课程学员，{isAvailable ? "申请核验本小课包权益。" : "登记未来的小课包权益意向。"}</label>}
      <label>{selectedProduct ? "使用场景" : "希望连接什么资源"}<textarea required name="scenario" rows={5} placeholder={selectedProduct ? "请描述商品任务、目标市场、目前卡点和希望先完成的结果；请勿填写密钥或客户机密。" : "请描述行业、阶段、目标和限制。不要填写募资金额、股权条件、客户机密或任何密钥。"} /></label>
      <label className="check"><input required type="checkbox" />我同意平台仅为人工联系、权益核验和交付使用这些信息，不默认公开我的联系信息。</label>
      <button className="button" type="submit" disabled={submitState === "sending"}>{submitState === "sending" ? "正在发送…" : formMode === "formspree" ? "发送咨询" : selectedProduct ? isAvailable ? "打开购买咨询邮件" : "打开意向登记邮件" : "打开联系邮件"}</button>
      {submitState === "sent" && <p className="form-message">咨询已发送。团队会按你填写的邮箱人工联系。</p>}
      {submitState === "error" && <p className="form-message">发送失败，已填写内容仍保留在本页。请检查网络后重试，或稍后再提交。</p>}
      {submitState === "email" && <p className="form-message">已打开你的邮件应用草稿。请检查内容后自行发送；本站无法确认邮件是否送达。</p>}
      {submitState === "unavailable" && <p className="form-message">本站尚未配置 Formspree 或人工联系邮箱，当前不能接收表单；你的内容没有被发送。</p>}
    </form>
  </main><Footer /></>;
}

export default function ContactPage() {
  return <Suspense fallback={<><SiteHeader /><main className="page shell"><p className="page-lead">正在准备联系表单…</p></main><Footer /></>}><ContactForm /></Suspense>;
}
