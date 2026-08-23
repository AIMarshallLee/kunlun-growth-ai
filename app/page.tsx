import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { SiteHeader } from "@/components/site-header";
import { TutorialCard } from "@/components/tutorial-card";
import { tutorialEntries } from "@/lib/tutorials";

export const metadata: Metadata = {
  description:
    "21 篇可以照着完成的 AI 实战教程，每篇包含来源、明确目标、操作步骤、通关标准和风险提醒。首个专题：AI × 跨境电商。",
  alternates: { canonical: "/" },
};

const ecommerceSlugs = [
  "ecom-3d-ad",
  "shopify-agentic",
  "ugc-variants",
  "amazon-ai-listing",
  "ugc-factory",
  "human-loop-store",
];

const ecommerce = tutorialEntries.filter((item) =>
  ecommerceSlugs.includes(item.slug),
);
const latest = tutorialEntries.slice(0, 6);
const firstTutorial = latest[0];

function plainText(value: string) {
  return value.replace(/<[^>]+>/g, "");
}

export default function HomePage() {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "昆仑增长AI实战",
    url: "https://kunlun-growth-ai.vercel.app",
    description: "面向全球中文用户的 AI 实战教程与作品展示平台",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <SiteHeader />
      <main className="home-page">
        <section className="hero-section">
          <div className="shell hero-grid">
            <div className="hero-content">
              <span className="eyebrow">
                KUNLUN FIELD NOTES <i aria-hidden="true" /> AI 实战档案
              </span>
              <h1>
                把 AI 学会，
                <em>更要把它做出来。</em>
              </h1>
              <p className="hero-copy">
                这里有 {tutorialEntries.length} 篇可以照着完成的 AI
                实战教程。从目标、步骤到通关标准，先做出一个可展示的成果。
              </p>
              <div className="hero-actions">
                <Link className="button" href="/tutorials">选一篇，开始做</Link>
                <Link
                  className="button ghost"
                  href="/tutorials?category=%E8%B7%A8%E5%A2%83%E7%94%B5%E5%95%86"
                >
                  进入跨境电商专题
                </Link>
              </div>
              <div className="hero-trust" aria-label="教程内容标准">
                <span>全部带原始来源</span>
                <span>全部带完成标准</span>
                <span>全部带风险提醒</span>
              </div>
            </div>

            <aside className="practice-sheet" aria-label="推荐的第一个实战任务">
              <div className="sheet-topline">
                <span>FIELD TASK / 001</span>
                <span className="status-dot">OPEN</span>
              </div>
              <div className="sheet-stamp" aria-hidden="true">实战</div>
              <p className="sheet-label">建议从这里开始</p>
              <h2>{firstTutorial.short}</h2>
              <p className="sheet-summary">{plainText(firstTutorial.sub)}</p>
              <dl className="sheet-specs">
                <div><dt>预计用时</dt><dd>{plainText(firstTutorial.chips[0])}</dd></div>
                <div><dt>操作步骤</dt><dd>{firstTutorial.steps.length} 步</dd></div>
                <div><dt>完成信号</dt><dd>{firstTutorial.criteria?.length ?? 0} 项自检</dd></div>
              </dl>
              <Link className="sheet-link" href={`/tutorials/${firstTutorial.slug}`}>
                打开任务单 <span aria-hidden="true">↗</span>
              </Link>
            </aside>
          </div>
        </section>

        <section className="signal-strip" aria-label="平台当前内容数据">
          <div className="shell signal-grid">
            <div><b>{tutorialEntries.length}</b><span>篇实战教程</span><small>现在可直接学习</small></div>
            <div><b>{ecommerce.length}</b><span>篇跨境精选任务</span><small>首个垂直专题</small></div>
            <div><b>100%</b><span>带来源与自检标准</span><small>不只给一段提示词</small></div>
            <div><b>首批</b><span>作品正在招募</span><small>暂无虚构案例占位</small></div>
          </div>
        </section>

        <section className="section shell home-featured">
          <div className="section-index">01 / START HERE</div>
          <div className="section-head">
            <div>
              <span className="kicker">AI × CROSS-BORDER E-COMMERCE</span>
              <h2>先从最接近业务的任务开始。</h2>
              <p>商品图、广告素材、Listing 和独立站目录，选一个今天就能完成的成果。</p>
            </div>
            <Link className="arrow-link" href="/tutorials?category=%E8%B7%A8%E5%A2%83%E7%94%B5%E5%95%86">
              查看专题全部任务 <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div className="card-grid three">
            {ecommerce.slice(0, 3).map((tutorial) => (
              <TutorialCard key={tutorial.slug} tutorial={tutorial} slug={tutorial.slug} />
            ))}
          </div>
        </section>

        <section className="method-section">
          <div className="shell method-grid">
            <div className="method-intro">
              <div className="section-index">02 / THE METHOD</div>
              <span className="kicker">一篇教程，一个成果</span>
              <h2>不是“看完了”，<br />而是“做完了”。</h2>
              <p>每篇内容都按同一条实战路径组织，你可以自己判断成果是否过关。</p>
            </div>
            <ol className="method-steps">
              <li><span>01</span><div><strong>选一个具体任务</strong><p>先明确今天要交付什么。</p></div></li>
              <li><span>02</span><div><strong>照着步骤动手</strong><p>提示词、工具与每步目标都在一起。</p></div></li>
              <li><span>03</span><div><strong>对照标准自检</strong><p>用通关条件检查，不凭感觉说完成。</p></div></li>
              <li><span>04</span><div><strong>留下可展示成果</strong><p>作品、链接或记录，由你决定是否提交。</p></div></li>
            </ol>
          </div>
        </section>

        <section className="section shell more-practice">
          <div className="section-index">03 / PRACTICE LIBRARY</div>
          <div className="section-head">
            <div>
              <span className="kicker">MORE WAYS TO BUILD</span>
              <h2>从 Agent、知识库到内容创作。</h2>
              <p>不知道从哪里开始？优先选一篇 60 分钟内能完成的。</p>
            </div>
            <Link className="arrow-link" href="/tutorials">浏览全部 {tutorialEntries.length} 篇 <span aria-hidden="true">↗</span></Link>
          </div>
          <div className="card-grid">
            {latest.map((tutorial) => (
              <TutorialCard key={tutorial.slug} tutorial={tutorial} slug={tutorial.slug} />
            ))}
          </div>
        </section>

        <section className="section status-section">
          <div className="shell">
            <div className="section-index">04 / CURRENT STATUS</div>
            <div className="section-head"><div>
              <span className="kicker">WHAT IS OPEN NOW</span>
              <h2>现在能用什么，写清楚。</h2>
              <p>把已开放、招募中和意向收集分开，不用未来能力冒充当前结果。</p>
            </div></div>
            <div className="status-grid">
              <article><span className="status-badge live">已开放</span><h3>实战教程库</h3><p>{tutorialEntries.length} 篇教程可直接阅读和操作。</p><Link href="/tutorials">进入教程库 →</Link></article>
              <article><span className="status-badge recruiting">首批招募</span><h3>作品广场</h3><p>正在征集真实、可说明、可验证的成果。</p><Link href="/works">查看公开规则 →</Link></article>
              <article><span className="status-badge planned">意向收集</span><h3>项目验证</h3><p>验证标准已公开，当前先从作品提交开始。</p><Link href="/projects">了解验证层级 →</Link></article>
              <article><span className="status-badge planned">意向收集</span><h3>企业挑战</h3><p>可提交问题意向；提交不代表已公开发布。</p><Link href="/challenges">了解当前流程 →</Link></article>
            </div>
          </div>
        </section>

        <section className="section shell final-cta-wrap">
          <div className="callout">
            <div><span className="kicker">YOUR FIRST FIELD TASK</span><h2>今天先做完一件小事。</h2><p>选一篇教程，照着步骤做，用通关标准检查结果。</p></div>
            <div className="callout-actions">
              <Link className="button light" href={`/tutorials/${firstTutorial.slug}`}>开始第一个任务</Link>
              <Link className="button ghost dark" href="/submit">了解作品提交</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
