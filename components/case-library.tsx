"use client";

import { useState } from "react";
import { CaseCard } from "@/components/case-card";
import type { CaseCategory, CaseStudy } from "@/lib/cases";

export function CaseLibrary({ items, categories }: { items: CaseStudy[]; categories: CaseCategory[] }) {
  const [category, setCategory] = useState<CaseCategory | undefined>();
  const results = category ? items.filter((item) => item.category === category) : items;

  return <>
    <div className="filters case-filters">
      <button className={!category ? "active" : ""} onClick={() => setCategory(undefined)} type="button">全部 {items.length}</button>
      {categories.map((item) => <button key={item} className={category === item ? "active" : ""} onClick={() => setCategory(item)} type="button">{item}</button>)}
    </div>
    <div className="card-grid">{results.map((item) => <CaseCard key={item.slug} item={item} />)}</div>
  </>;
}
