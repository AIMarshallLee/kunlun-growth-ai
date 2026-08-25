import Link from "next/link";
import { Footer } from "@/components/footer";
import { OpportunityCardTool } from "@/components/opportunity-card-tool";
import { SiteHeader } from "@/components/site-header";

export default function ProductOpportunityCardPage() {
  return <><SiteHeader /><main className="page shell">
    <span className="eyebrow">FREE TOOL · LOCAL ONLY</span>
    <h1 className="page-title">把“这个品可能能卖”，<br />变成一张可停止的验证卡。</h1>
    <p className="page-lead">整理需求证据、利润假设、风险、最小实验和停止条件。工具不预测销量，不替你决定采购或上架。</p>
    <div className="detail-actions"><Link className="button ghost" href="/cases/amazon-product-opportunity-explorer">先看 Amazon 选品案例</Link><Link className="button ghost" href="/tutorials/amazon-search-term-mining">打开关联教程</Link></div>
    <OpportunityCardTool />
  </main><Footer /></>;
}
