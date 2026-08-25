import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/footer";
import { SiteHeader } from "@/components/site-header";
import { TutorialCard } from "@/components/tutorial-card";
import { caseStudies, getCaseStudy } from "@/lib/cases";
import { getTutorial } from "@/lib/tutorials";

export function generateStaticParams() { return caseStudies.map(({ slug }) => ({ slug })); }

export default async function CaseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getCaseStudy(slug);
  if (!item) notFound();
  const relatedTutorials = item.relatedTutorials.map((tutorialSlug) => ({ slug: tutorialSlug, tutorial: getTutorial(tutorialSlug) })).filter((entry): entry is { slug: string; tutorial: NonNullable<ReturnType<typeof getTutorial>> } => Boolean(entry.tutorial));

  return <><SiteHeader /><main className="detail shell case-detail">
    <Link className="back" href="/cases">← 返回案例库</Link>
    <section className="detail-hero"><span className="pill">{item.category}</span><h1>{item.title}</h1><p>{item.summary}</p><div className="detail-chips"><span>✓ 核验于 {item.verifiedAt}</span><span>↗ {item.source.name}</span><span>🔗 {relatedTutorials.length} 篇关联教程</span></div></section>
    <div className="case-detail-grid">
      <article>
        <section className="case-section"><span className="kicker">PUBLIC RESULT</span><h2>公开披露了什么？</h2><p>{item.result}</p></section>
        <section className="case-section action"><span className="kicker">YOUR NEXT MOVE</span><h2>今天可以怎么开始？</h2><p>{item.action}</p></section>
        <section className="case-section"><span className="kicker">RELATED PRACTICE</span><h2>把启发变成一场实战</h2><div className="case-related-grid">{relatedTutorials.map(({ slug: tutorialSlug, tutorial }) => <TutorialCard key={tutorialSlug} slug={tutorialSlug} tutorial={tutorial} />)}</div></section>
      </article>
      <aside>
        <div className="side-card"><strong>证据边界</strong><p>{item.source.claimBoundary}</p></div>
        <div className="side-card"><strong>原始来源</strong><a className="case-source" href={item.source.url} target="_blank" rel="noreferrer">{item.source.name} ↗</a><p>请在作出预算、库存或合规决定前重新打开原文核验。</p></div>
        <div className="side-card"><strong>适合怎样使用？</strong><ul><li>学习问题拆解方式</li><li>提取一条可验证假设</li><li>不照搬公开结果</li><li>高风险动作保留人工批准</li></ul></div>
      </aside>
    </div>
  </main><Footer /></>;
}
