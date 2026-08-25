import { Footer } from "@/components/footer";
import { SiteHeader } from "@/components/site-header";
import { TutorialCard } from "@/components/tutorial-card";
import { categoryFor, tutorialEntries } from "@/lib/tutorials";
import { buildPageMetadata } from "@/lib/site-config";
import Link from "next/link";

export const metadata = buildPageMetadata("/tutorials", "AI 实战教程合集", "少看一点演示，多跑通一条能复用、可验证的 AI 增长流程。");

export default function TutorialsPage() {
  const category = undefined;
  const categories = [...new Set(tutorialEntries.map((item) => categoryFor(item.slug)))];
  const results = category ? tutorialEntries.filter((item) => categoryFor(item.slug) === category) : tutorialEntries;
  return <><SiteHeader /><main className="page shell"><span className="eyebrow">KUNLUN PRACTICE LIBRARY</span><h1 className="page-title">所有教程，都指向一个可验证的成果。</h1><p className="page-lead">少看一点演示，多跑通一条能复用的增长流程。</p><div className="filters"><Link className={!category ? "active" : ""} href="/tutorials">全部 {tutorialEntries.length}</Link>{categories.map((item) => <Link key={item} className={category === item ? "active" : ""} href={`/tutorials?category=${encodeURIComponent(item)}`}>{item}</Link>)}</div><div className="card-grid">{results.map((tutorial) => <TutorialCard key={tutorial.slug} tutorial={tutorial} slug={tutorial.slug} />)}</div></main><Footer /></>;
}
