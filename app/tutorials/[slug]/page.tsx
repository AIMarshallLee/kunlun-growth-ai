import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/footer";
import { SiteHeader } from "@/components/site-header";
import { getTutorial, sourceAuthor, tutorialEntries } from "@/lib/tutorials";

export function generateStaticParams() { return tutorialEntries.map(({ slug }) => ({ slug })); }

export default async function TutorialDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tutorial = getTutorial(slug);
  if (!tutorial) notFound();
  return <><SiteHeader /><main className="detail shell"><Link className="back" href="/tutorials">← 返回教程库</Link><section className="detail-hero"><span className="eyebrow">{tutorial.eyebrow}</span><h1 dangerouslySetInnerHTML={{ __html: tutorial.titleHtml }} /><p>{tutorial.sub}</p><div className="detail-chips">{tutorial.chips.map((chip) => <span key={chip} dangerouslySetInnerHTML={{ __html: chip }} />)}</div><div className="detail-actions"><Link className="button" href={`/login?next=/tutorials/${slug}`}>登录并保存进度</Link><Link className="button ghost" href="/submit">完成后提交作品</Link></div></section><section className="goal-box"><span>{tutorial.introIcon || "✦"}</span><div><strong>{tutorial.introTitle || "成果优先"}</strong><p>{tutorial.intro || tutorial.goal}</p></div></section><section className="content-grid"><div><h2>本次通关目标</h2><p className="goal">{tutorial.goal}</p><h2>开始实战</h2><div className="steps">{tutorial.steps.map((step, index) => <article className="step" key={step.title}><span className="step-number">{String(index + 1).padStart(2, "0")}</span><div><div className="step-top"><h3>{step.title}</h3><span>{step.time}</span></div><p className="step-target">目标：{step.target}</p><p className="step-done">验收：{step.done}</p></div></article>)}</div></div><aside><div className="side-card"><strong>通关标准</strong><ul>{tutorial.criteria?.map((item) => <li key={item}>{item}</li>)}</ul></div><div className="side-card"><strong>来源与作者</strong><p>本教程保留原始来源，不以热门帖中的收益或效果宣称作为事实。</p><ul className="sources">{tutorial.sources?.map(([label, url]) => <li key={url}><a href={url} target="_blank" rel="noreferrer">{label}</a><small>作者 / 机构：{sourceAuthor(url)}</small></li>)}</ul></div></aside></section><section className="submit-banner"><div><span className="kicker">DONE? SHOW THE RESULT</span><h2>完成后，把你的作品放进广场。</h2><p>作品默认公开；你可以随时编辑、隐藏或撤回。</p></div><Link className="button" href={`/submit?tutorial=${slug}`}>提交这个成果</Link></section></main><Footer /></>;
}
