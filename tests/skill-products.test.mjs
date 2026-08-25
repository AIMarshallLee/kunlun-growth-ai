import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import { resolve } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { getSkillProduct, skillCategories, skillProducts } from "../lib/skill-products.ts";
import { buildInquiryMailto } from "../lib/skill-inquiry.ts";
import { checkSkillPackage, containsPossibleSecret } from "../scripts/check-skill-package.mjs";

test("ships three distinct source-grounded skill course products", () => {
  assert.equal(skillProducts.length, 3);
  assert.deepEqual(skillCategories, ["跨境电商", "教育"]);
  assert.equal(new Set(skillProducts.map((item) => item.slug)).size, 3);
  for (const item of skillProducts) {
    assert.match(item.slug, /^[a-z0-9-]+$/);
    assert.equal(item.category, "跨境电商");
    assert.equal(item.delivery.length >= 4, true);
    assert.equal(item.faq.length >= 4, true);
    assert.equal(item.publicExample.input.length > 0, true);
    assert.equal(item.publicExample.output.length > 0, true);
    assert.match(item.publicExample.disclosure, /合成|去敏/);
    assert.match(item.updatedAt, /^\d{4}-\d{2}-\d{2}$/);
    assert.equal(item.updatedAt >= "2026-08-25", true);
    assert.equal(item.boundaries.join(" ").includes("不保证"), true);
  }
});

test("all three complete packages are available while market validation remains explicit", () => {
  assert.equal(skillProducts.filter((item) => item.availability === "available").length, 3);
  assert.equal(skillProducts.filter((item) => item.availability === "waitlist").length, 0);
  for (const product of skillProducts) {
    assert.equal(product.status, "正式发布");
    assert.equal(product.version, "1.0.0");
    assert.match(product.marketValidation, /真实客户|运营数据/);
  }
});

test("builds a minimal human-delivery email without credentials", () => {
  const href = buildInquiryMailto("sales@example.com", {
    product: "商品素材生产 Skill 小课包",
    rights: "课程权益",
    identity: "课程学员",
    name: "王小明",
    email: "user@example.com",
    region: "杭州",
    tool: "Codex",
    scenario: "为已授权商品整理英文素材计划",
  });
  assert.match(href, /^mailto:sales%40example\.com\?subject=/);
  assert.match(decodeURIComponent(href), /商品素材生产 Skill 小课包/);
  assert.match(decodeURIComponent(href), /user@example.com/);
  assert.doesNotMatch(href, /API Key|token|secret/i);
});

test("package scanner rejects common credentials and dotenv files", () => {
  assert.equal(containsPossibleSecret("DASHSCOPE_API_KEY=not-a-real-secret"), true);
  assert.equal(containsPossibleSecret("GH_TOKEN=ghp_0123456789abcdefghijk"), true);
  assert.equal(containsPossibleSecret("token: eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.signaturevalue"), true);
  assert.equal(containsPossibleSecret("Use your own API Key in the host application."), false);
  assert.equal(containsPossibleSecret("product_sku=synthetic-desk-organizer-gray"), false);
});

test("finds products by stable slug and returns undefined for a missing product", () => {
  assert.equal(getSkillProduct("product-material-agent")?.title, "商品素材生产 Skill 小课包");
  assert.equal(getSkillProduct("missing-skill"), undefined);
});

test("publishes static catalog and detail routes with the required sales boundaries", async () => {
  const catalog = await readFile(new URL("../app/skills/page.tsx", import.meta.url), "utf8");
  const detail = await readFile(new URL("../app/skills/[slug]/page.tsx", import.meta.url), "utf8");
  assert.match(catalog, /skillProducts/);
  assert.match(catalog, /跨境电商/);
  assert.match(catalog, /教育/);
  assert.match(detail, /generateStaticParams/);
  assert.match(detail, /generateMetadata/);
  assert.match(detail, /购买咨询/);
  assert.match(detail, /product\.availability/);
  assert.match(detail, /不保证商业结果/);
  assert.match(detail, /公开去敏样例/);
  assert.doesNotMatch(catalog + detail, /searchParams/);
});

test("links the skill catalog from navigation, footer, and homepage", async () => {
  const header = await readFile(new URL("../components/site-header.tsx", import.meta.url), "utf8");
  const footer = await readFile(new URL("../components/footer.tsx", import.meta.url), "utf8");
  const home = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  for (const source of [header, footer, home]) assert.match(source, /href="\/skills"/);
});

test("purchase inquiry records product context and warns against sensitive data", async () => {
  const contact = await readFile(new URL("../app/contact/page.tsx", import.meta.url), "utf8");
  assert.match(contact, /useSearchParams/);
  assert.match(contact, /选择小课包/);
  assert.match(contact, /课程学员/);
  assert.match(contact, /API Key/);
  assert.match(contact, /不直接接入支付/);
  assert.match(contact, /skillProducts/);
  assert.match(contact, /NEXT_PUBLIC_CONTACT_EMAIL/);
  assert.match(contact, /buildInquiryMailto/);
});

test("product-material package contains installable, source-safe delivery files", async () => {
  const base = new URL("../products/product-material-agent/", import.meta.url);
  for (const file of ["SKILL.md", "INSTALL.md", "CHANGELOG.md", "templates/product-brief.md", "templates/delivery-manifest.md", "examples/README.md", "references/brief-schema.md", "references/quality-gates.md"]) {
    await access(new URL(file, base));
  }
  const skill = await readFile(new URL("SKILL.md", base), "utf8");
  assert.doesNotMatch(skill, /DASHSCOPE|QIANWEN|sk-[A-Za-z0-9]/i);
  const validation = await readFile(new URL("examples/offline-validation.md", base), "utf8");
  assert.match(validation, /已完成/);
  assert.match(validation, /不生成图片或视频/);
});

test("listing localization is a complete 1.0.0 package with a separate market-validation disclosure", async () => {
  const product = getSkillProduct("crossborder-listing-localization");
  assert.equal(product?.status, "正式发布");
  assert.equal(product?.availability, "available");
  assert.equal(product?.version, "1.0.0");
  const packagePath = fileURLToPath(new URL("../products/crossborder-listing-localization/", import.meta.url));
  assert.equal(await checkSkillPackage(packagePath), resolve(packagePath));
});

test("product media QA is a complete 1.0.0 package with a separate market-validation disclosure", async () => {
  const product = getSkillProduct("product-media-qa");
  assert.equal(product?.status, "正式发布");
  assert.equal(product?.availability, "available");
  assert.equal(product?.version, "1.0.0");
  const packagePath = fileURLToPath(new URL("../products/product-media-qa/", import.meta.url));
  assert.equal(await checkSkillPackage(packagePath), resolve(packagePath));
});

test("related tutorial pages offer the matching skill course-rights path", async () => {
  const tutorialPage = await readFile(new URL("../app/tutorials/[slug]/page.tsx", import.meta.url), "utf8");
  const document = await readFile(new URL("../components/tutorial-document.tsx", import.meta.url), "utf8");
  assert.match(tutorialPage, /relatedSkillProductsForTutorial/);
  assert.match(document, /课程权益/);
  assert.match(document, /\/contact\?product=/);
});
