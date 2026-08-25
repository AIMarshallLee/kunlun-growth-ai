import { CaseLibrary } from "@/components/case-library";
import { Footer } from "@/components/footer";
import { SiteHeader } from "@/components/site-header";
import { caseCategories, caseStudies } from "@/lib/cases";
import { buildPageMetadata } from "@/lib/site-config";

export const metadata = buildPageMetadata("/cases", "AI 落地案例库", "20 个保留来源、公开结果和适用边界的跨境 AI 落地案例。");

export default function CasesPage() {
  return <><SiteHeader /><main className="page shell">
    <span className="eyebrow">AI APPLICATION CASES · EVIDENCE FIRST</span>
    <h1 className="page-title">案例不是成功保证，<br />是下一场实验的起点。</h1>
    <p className="page-lead">首批 20 个跨境 AI 落地案例，保留原始来源、公开结果和适用边界；再把启发连接到可执行教程。</p>
    <div className="case-disclosure"><strong>阅读原则</strong><span>案例数字来自平台、供应商或客户公开披露，本站未独立审计，也不代表你能复制相同结果。</span></div>
    <CaseLibrary items={caseStudies} categories={caseCategories} />
  </main><Footer /></>;
}
