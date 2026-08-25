import { Footer } from "@/components/footer";
import { SiteHeader } from "@/components/site-header";
import { SkillProductCard } from "@/components/skill-product-card";
import { skillCategories, skillProducts } from "@/lib/skill-products";
import { buildPageMetadata } from "@/lib/site-config";

export const metadata = buildPageMetadata("/skills", "Skill 小课包", "面向跨境电商与课程学员的 Skill、教程和模板小课包；第一期采用人工确认与交付。");

export default function SkillsPage() {
  const ecommerce = skillProducts.filter((item) => item.category === "跨境电商");
  return <><SiteHeader /><main className="page shell skill-page">
    <span className="eyebrow">SKILL COURSE PACKS · HUMAN DELIVERY</span>
    <h1 className="page-title">把能跑通的 AI 工作流，<br />带进你的真实业务。</h1>
    <p className="page-lead">每个小课包都包含 Skill、教程、模板和示例。第一期不接在线支付或自动下载：先确认你要解决的问题，再由团队人工完成交付。</p>
    <div className="skill-trust"><span>✦ 事实来源优先</span><span>✦ 不交出 API Key</span><span>✦ 人工审核不可省略</span></div>
    <section className="skill-section" aria-labelledby="ecommerce-skills"><div className="section-head"><div><span className="kicker">{skillCategories[0]}</span><h2 id="ecommerce-skills">首发：跨境电商小课包</h2><p>先解决商品内容、Listing 本地化与发布前质检三个高频任务。</p></div></div><div className="card-grid three">{ecommerce.map((product) => <SkillProductCard key={product.slug} product={product} />)}</div></section>
    <section className="education-roadmap" aria-labelledby="education-skills"><div><span className="kicker">{skillCategories[1]}</span><h2 id="education-skills">课程权益先行</h2><p>教育方向的小课包将在需求验证后独立上架。现阶段，课程学员可以申请与课程匹配的 Skill、练习模板和首次运行支持。</p></div><p><strong>不重复收费：</strong>课程权益由人工核验；没有线上 Agent、自动生成或自动发货承诺。</p></section>
    <section className="skill-process" aria-label="购买与交付流程"><h2>从咨询到首次运行</h2><ol><li><b>01</b><strong>确认适用场景</strong><span>查看输入要求、边界与示例。</span></li><li><b>02</b><strong>提交购买咨询</strong><span>只留下必要联系信息和使用场景。</span></li><li><b>03</b><strong>人工核验与交付</strong><span>确认付款或课程权益后发送对应版本。</span></li><li><b>04</b><strong>完成首次运行</strong><span>按安装说明使用自己的工具和数据。</span></li></ol></section>
  </main><Footer /></>;
}
