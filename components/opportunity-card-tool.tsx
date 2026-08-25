"use client";

import { useMemo, useState } from "react";
import { buildOpportunityCard, type OpportunityCardInput } from "@/lib/opportunity-card";

const initialValue: OpportunityCardInput = { product: "", market: "", demandEvidence: "", customerPain: "", competition: "", margin: "", risks: "", test: "", stopCondition: "" };

const fields: Array<[keyof OpportunityCardInput, string, string]> = [
  ["product", "候选商品", "例如：折叠旅行水壶"], ["market", "目标市场", "例如：德国"],
  ["demandEvidence", "需求证据", "搜索、评论、订单或访谈里看到了什么？"], ["customerPain", "客户问题", "用户现在为什么犹豫或不满意？"],
  ["competition", "竞争差异", "现有方案缺了什么？"], ["margin", "利润假设", "售价、到岸成本与贡献毛利底线"],
  ["risks", "风险与待核验", "合规、知识产权、供应商、退货或履约风险"], ["test", "最小验证", "用多小的预算、流量或样品开始？"],
  ["stopCondition", "停止条件", "出现什么结果就停止，而不是继续加码？"],
];

export function OpportunityCardTool() {
  const [value, setValue] = useState(initialValue);
  const [copied, setCopied] = useState(false);
  const output = useMemo(() => buildOpportunityCard(value), [value]);
  const update = (key: keyof OpportunityCardInput, nextValue: string) => setValue((current) => ({ ...current, [key]: nextValue }));
  async function copy() { await navigator.clipboard.writeText(output); setCopied(true); window.setTimeout(() => setCopied(false), 1500); }

  return <div className="opportunity-layout"><form className="form-card opportunity-form" onSubmit={(event) => event.preventDefault()}>{fields.map(([key, label, placeholder]) => <label key={key}>{label}{["demandEvidence", "customerPain", "competition", "risks", "test", "stopCondition"].includes(key) ? <textarea rows={3} value={value[key]} placeholder={placeholder} onChange={(event) => update(key, event.target.value)} /> : <input value={value[key]} placeholder={placeholder} onChange={(event) => update(key, event.target.value)} />}</label>)}<p className="form-note">内容只保存在当前浏览器页面，不会上传或保存。</p></form><section className="opportunity-preview"><div><span className="kicker">LIVE PREVIEW</span><h2>AI 选品机会卡</h2></div><pre>{output}</pre><button className="button" type="button" onClick={copy}>{copied ? "已复制" : "复制机会卡"}</button></section></div>;
}
