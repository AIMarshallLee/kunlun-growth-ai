"use client";
import { useState } from "react";
import { Footer } from "@/components/footer";
import { SiteHeader } from "@/components/site-header";
import { getFormMode, submitToFormspree } from "@/lib/form-delivery";

type SubmitState = "idle" | "sending" | "sent" | "error";

export default function SubmitPage() {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const formspreeEndpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT?.trim() || "";
  const formMode = getFormMode("submission", formspreeEndpoint, "");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (formMode === "disabled") return;
    const data = new FormData(event.currentTarget);
    data.set("formType", "submission");
    setSubmitState("sending");
    const result = await submitToFormspree(formspreeEndpoint, data);
    setSubmitState(result === "sent" ? "sent" : "error");
  }

  return <><SiteHeader /><main className="page shell">
    <span className="eyebrow">SUBMIT A WORK OR PROJECT</span>
    <h1 className="page-title">先把真实成果拿出来。</h1>
    <p className="page-lead">作品默认公开。请勿提交客户隐私、商业秘密、无授权素材，或无法说明来源和效果的数据。</p>
    {formMode === "disabled" && <p className="form-message">投稿通道尚未配置，当前已显式停用。请不要在此页填写内容；配置 Formspree 后才会开放提交。</p>}
    <form className="form-card wide" onSubmit={submit}>
      <fieldset disabled={formMode === "disabled" || submitState === "sending"}>
        <div className="form-grid">
          <label>我提交的是<select name="submissionType" defaultValue="work"><option value="work">教程完成作品</option><option value="project">可试用 AI 项目</option><option value="resource">寻求资源 / 机构联系</option></select></label>
          <label>名称<input required name="title" placeholder="例如：一张商品图做 3D 广告" /></label>
          <label>作者 / 团队<input required name="author" placeholder="公开展示的名称" /></label>
          <label>来源教程或项目链接<input name="sourceUrl" type="url" placeholder="https://" /></label>
        </div>
        <label>一句话说明<textarea required name="summary" rows={4} placeholder="解决谁的什么问题？做出了什么？哪些地方仍有限制？" /></label>
        <label>可公开的体验、演示或作品链接<input required name="publicUrl" type="url" placeholder="https://" /></label>
        <label className="check"><input required name="rightsConfirmed" type="checkbox" />我确认内容真实、拥有公开权利，并理解平台会先审核再公开。</label>
      </fieldset>
      <button className="button" type="submit" disabled={formMode === "disabled"}>{submitState === "sending" ? "正在发送…" : "提交审核"}</button>
      {submitState === "sent" && <p className="form-message">投稿已发送，团队会先进行来源、权利和公开范围审核。</p>}
      {submitState === "error" && <p className="form-message">发送失败，已填写内容仍保留在本页。请检查网络后重试；本站没有记录这次投稿。</p>}
    </form>
  </main><Footer /></>;
}
