import Link from "next/link";
import type { SkillProduct } from "@/lib/skill-products";

export function SkillProductCard({ product }: { product: SkillProduct }) {
  return <article className="skill-card">
    <div className="skill-card-top"><span className="pill">{product.category}</span><span className="skill-status">{product.status}</span></div>
    <h2>{product.title}</h2>
    <p>{product.summary}</p>
    <ul>{product.delivery.slice(0, 3).map((item) => <li key={item}>{item}</li>)}</ul>
    <div className="skill-card-bottom"><small>{product.priceLabel}</small><Link className="card-cta" href={`/skills/${product.slug}`}>查看小课包 →</Link></div>
  </article>;
}
