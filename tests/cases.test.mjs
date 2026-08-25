import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { caseCategories, caseStudies, getCaseStudy } from "../lib/cases.ts";
import { buildOpportunityCard } from "../lib/opportunity-card.ts";

async function tutorialSlugs() {
  const legacy = JSON.parse(await readFile(new URL("../data/tutorials.json", import.meta.url), "utf8"));
  const { newTutorials } = await import("../data/new-tutorials.ts");
  const { expansionTutorials } = await import("../data/expansion-tutorials.ts");
  const { expansionRoundTwoA } = await import("../data/expansion-round-two-a.ts");
  const { expansionRoundTwoB } = await import("../data/expansion-round-two-b.ts");
  const { expansionRoundTwoC } = await import("../data/expansion-round-two-c.ts");
  return new Set(Object.keys({ ...legacy, ...newTutorials, ...expansionTutorials, ...expansionRoundTwoA, ...expansionRoundTwoB, ...expansionRoundTwoC }));
}

test("launches exactly 20 complete, uniquely-addressable case studies", () => {
  assert.equal(caseStudies.length, 20);
  assert.equal(new Set(caseStudies.map(({ slug }) => slug)).size, 20);
  for (const item of caseStudies) {
    assert.match(item.slug, /^[a-z0-9-]+$/);
    assert.ok(item.title.length >= 8);
    assert.ok(item.summary.length >= 20);
    assert.ok(item.result.length >= 10);
    assert.ok(item.action.length >= 10);
    assert.match(item.source.url, /^https:\/\//);
    assert.ok(item.source.claimBoundary.includes("未独立"));
    assert.match(item.verifiedAt, /^2026-\d{2}-\d{2}$/);
    assert.ok(item.relatedTutorials.length >= 1);
  }
});

test("all related tutorial slugs exist in the 73-tutorial library", async () => {
  const slugs = await tutorialSlugs();
  assert.equal(slugs.size, 73);
  for (const item of caseStudies) {
    for (const slug of item.relatedTutorials) assert.ok(slugs.has(slug), `${item.slug} links missing tutorial ${slug}`);
  }
});

test("case lookup and categories expose stable navigation data", () => {
  assert.equal(getCaseStudy("best-buy-gift-finder")?.title.startsWith("Best Buy"), true);
  assert.equal(getCaseStudy("missing-case"), undefined);
  assert.ok(caseCategories.includes("选品与市场洞察"));
  assert.equal(new Set(caseCategories).size, caseCategories.length);
});

test("opportunity card formatter keeps facts, risks and stop conditions visible", () => {
  const card = buildOpportunityCard({
    product: "折叠旅行水壶",
    market: "德国",
    demandEvidence: "站内搜索连续 4 周增长",
    customerPain: "体积太大，不便登机",
    competition: "主流产品容量相似但不可折叠",
    margin: "售价 29 欧元，目标贡献毛利 35%",
    risks: "食品接触材料、退货运费",
    test: "100 个访问的小流量落地页测试",
    stopCondition: "加购率低于 3% 或合规资料不全",
  });

  assert.match(card, /德国/);
  assert.match(card, /站内搜索连续 4 周增长/);
  assert.match(card, /食品接触材料、退货运费/);
  assert.match(card, /停止条件/);
  assert.match(card, /加购率低于 3%/);
});

test("case library and opportunity tool are discoverable site routes", async () => {
  const casesPage = await readFile(new URL("../app/cases/page.tsx", import.meta.url), "utf8");
  const caseDetail = await readFile(new URL("../app/cases/[slug]/page.tsx", import.meta.url), "utf8");
  const toolPage = await readFile(new URL("../app/tools/product-opportunity-card/page.tsx", import.meta.url), "utf8");
  const header = await readFile(new URL("../components/site-header.tsx", import.meta.url), "utf8");
  const footer = await readFile(new URL("../components/footer.tsx", import.meta.url), "utf8");

  assert.match(casesPage, /caseStudies/);
  assert.match(caseDetail, /generateStaticParams/);
  assert.match(caseDetail, /relatedTutorials/);
  assert.match(toolPage, /OpportunityCardTool/);
  assert.match(header, /href="\/cases"/);
  assert.match(footer, /href="\/cases"/);
});

test("case library stays compatible with static export", async () => {
  const casesPage = await readFile(new URL("../app/cases/page.tsx", import.meta.url), "utf8");
  assert.doesNotMatch(casesPage, /searchParams/);
  assert.match(casesPage, /CaseLibrary/);
});
