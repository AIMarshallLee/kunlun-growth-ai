import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/footer";
import { SiteHeader } from "@/components/site-header";
import { getSkillProduct, skillProducts } from "@/lib/skill-products";
import { buildPageMetadata } from "@/lib/site-config";

export function generateStaticParams() {
  return skillProducts.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const product = getSkillProduct((await params).slug);
  if (!product) return {};
  return buildPageMetadata(`/skills/${product.slug}`, product.title, product.summary);
}

export default async function SkillDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getSkillProduct(slug);
  if (!product) notFound();
  const isAvailable = product.availability === "available";
  const primaryAction = isAvailable ? "购买咨询" : "登记意向";
  const rightsAction = isAvailable ? "领取课程权益" : "登记课程权益意向";
  const purchaseHref = `/contact?product=${product.slug}`;
  const rightsHref = `${purchaseHref}&rights=course`;
  return <><SiteHeader /><main className="detail shell skill-detail">
    <Link className="back" href="/skills">← 返回 Skill 小课包</Link>
    <section className="detail-hero"><span className="pill">{product.category} · {product.status}</span><h1>{product.title}</h1><p>{product.summary}</p><div className="detail-chips">{product.tools.map((tool) => <span key={tool}>{tool}</span>)}</div><div className="detail-actions"><Link className="button" href={purchaseHref}>{primaryAction}</Link><Link className="button ghost" href={rightsHref}>{rightsAction}</Link></div></section>
    <div className="skill-detail-grid">
      <div className="skill-detail-main">
        <section><h2>适合谁，解决什么</h2><p>{product.problem}</p><ul>{product.audience.map((item) => <li key={item}>{item}</li>)}</ul><h3>不适用场景</h3><ul>{product.exclusions.map((item) => <li key={item}>{item}</li>)}</ul></section>
        <section><h2>{isAvailable ? "你会获得什么" : "计划包含什么"}</h2><ul>{product.delivery.map((item) => <li key={item}>{item}</li>)}</ul></section>
        <section><h2>开始前需要准备</h2><ul>{product.inputs.map((item) => <li key={item}>{item}</li>)}</ul></section>
        <section><h2>演示输出结构</h2><ul>{product.demo.map((item) => <li key={item}>{item}</li>)}</ul><p className="detail-note">演示展示的是输出结构和已去敏工作流，不是客户经营成果。</p></section>
        <section><h2>公开去敏样例</h2><p><strong>输入：</strong>{product.publicExample.input}</p><p><strong>输出：</strong>{product.publicExample.output}</p><p className="detail-note">{product.publicExample.disclosure}</p></section>
        <section><h2>使用边界</h2><ul>{product.boundaries.map((item) => <li key={item}>{item}</li>)}</ul><p className="detail-note">不保证商业结果。涉及平台规则、合规、版权、价格、医疗、金融或法律判断时，请由对应负责人审核。</p></section>
        <section><h2>{isAvailable ? "价格与人工交付" : "开放意向登记"}</h2><p>{isAvailable ? `${product.priceLabel}。第一期不直接接入支付或自动下载。团队确认付款或课程权益后，在工作时间内发送对应版本、安装说明和支持入口。` : "该小课包尚未完成可售验证，当前仅收集需求与课程权益意向；不收款、不发送下载包，也不承诺上线时间。"}</p></section>
        <section><h2>常见问题</h2><div className="skill-faq">{product.faq.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></section>
      </div>
      <aside><div className="side-card"><strong>版本与更新</strong><p>版本：{product.version}</p><p>最后更新：{product.updatedAt}</p><p>{product.changes}</p></div><div className="side-card"><strong>市场验证状态</strong><p>{product.marketValidation}</p><p>产品包完整可交付，不等于已经获得市场业绩或适配所有业务。</p></div><div className="side-card"><strong>安全提醒</strong><p>请不要提交 API Key、客户隐私数据、支付卡信息或真实订单数据。所有密钥只应在你自己的环境中配置。</p></div><div className="side-card"><strong>课程学员</strong><p>{isAvailable ? "如课程包含本包权益，请使用“领取课程权益”，团队会人工核验，不要求重复购买。" : "该包仍在验证中；课程学员可登记未来权益意向，不代表已获得交付。"}</p><Link className="card-cta" href={rightsHref}>{isAvailable ? "申请课程权益 →" : "登记课程权益意向 →"}</Link></div></aside>
    </div>
  </main><Footer /></>;
}
