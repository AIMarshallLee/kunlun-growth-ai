import Link from "next/link";
import type { CaseStudy } from "@/lib/cases";

export function CaseCard({ item }: { item: CaseStudy }) {
  return <Link className="tutorial-card case-card" href={`/cases/${item.slug}`}>
    <span className="pill">{item.category}</span>
    <h3>{item.title}</h3>
    <p>{item.summary}</p>
    <div className="card-meta"><span>核验于 {item.verifiedAt}</span><span>来源：{item.source.name}</span></div>
    <span className="card-cta">查看证据与下一步 <b>→</b></span>
  </Link>;
}
