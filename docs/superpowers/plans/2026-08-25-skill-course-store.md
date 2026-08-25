# Skill 小课包商店 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a static, public Skill 小课包 catalog with three detail pages, a safe purchase inquiry flow, course-rights links, and the first distributable product-material package.

**Architecture:** Keep public catalog metadata in a typed local module and statically generate a catalog route plus one route per product. Reuse the existing site header, footer, contact page, and CSS conventions. Keep payment and delivery manual: the form captures only minimal contact and product context, then explains that no payment or automatic download occurs in version one.

**Tech Stack:** Next.js 15 static export, React 19, TypeScript, Node built-in test runner, existing CSS.

**Spec:** `docs/PRD-skill-course-store.md`

## Global Constraints

- Preserve all existing uncommitted work; only touch files required for the Skill store.
- Do not implement payment, automated fulfillment, memberships, online agent execution, or credential storage.
- Do not include API keys, customer data, cookies, tokens, or restricted source assets in public files or ZIP packages.
- Public pages must be compatible with `output: "export"`; no `searchParams`, server-only data, or runtime-only routes.
- Every public product page must show the ten PRD detail sections and clearly state AI output/claim review boundaries.
- Do not create commits in this shared dirty worktree; report changed files and verification results instead.

---

### Task 1: Model the three public product records

**Files:**
- Create: `lib/skill-products.ts`
- Create: `tests/skill-products.test.mjs`

**Interfaces:**
- Produces `SkillProduct`, `skillProducts`, `skillCategories`, `getSkillProduct(slug)`, and `relatedSkillProductsForTutorial(slug)`.
- Consumes no runtime data or secrets.

- [ ] **Step 1: Write the failing test**

```js
import assert from "node:assert/strict";
import test from "node:test";
import { getSkillProduct, skillCategories, skillProducts } from "../lib/skill-products.ts";

test("ships three distinct source-grounded skill course products", () => {
  assert.equal(skillProducts.length, 3);
  assert.deepEqual(skillCategories, ["跨境电商", "教育"]);
  assert.equal(new Set(skillProducts.map((item) => item.slug)).size, 3);
  for (const item of skillProducts) {
    assert.match(item.slug, /^[a-z0-9-]+$/);
    assert.equal(item.category, "跨境电商");
    assert.equal(item.delivery.length >= 4, true);
    assert.equal(item.faq.length >= 4, true);
    assert.equal(item.updatedAt, "2026-08-25");
    assert.equal(item.boundaries.join(" ").includes("不保证"), true);
  }
});

test("finds products by stable slug and returns undefined for a missing product", () => {
  assert.equal(getSkillProduct("product-material-agent")?.title, "商品素材生产 Skill 小课包");
  assert.equal(getSkillProduct("missing-skill"), undefined);
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --disable-warning=MODULE_TYPELESS_PACKAGE_JSON --experimental-strip-types --test tests/skill-products.test.mjs`

Expected: FAIL because `lib/skill-products.ts` does not exist.

- [ ] **Step 3: Implement the minimal typed product module**

```ts
export type SkillProduct = {
  slug: string;
  title: string;
  category: "跨境电商" | "教育";
  status: "已演练" | "已验证";
  // Detail-page fields: audience, problem, exclusions, delivery, inputs,
  // demo, boundaries, priceLabel, faq, updatedAt, changes, relatedTutorials.
};

export const skillProducts: SkillProduct[] = [/* three PRD records */];
export const skillCategories = ["跨境电商", "教育"] as const;
export function getSkillProduct(slug: string) {
  return skillProducts.find((item) => item.slug === slug);
}
```

Populate the three approved offerings: product-material production, cross-border Listing localization, and product image/video QA. Mark only the product-material offer as `已演练`; mark the other two as `已演练`, not `已验证`, unless an evidence record is added in this implementation.

- [ ] **Step 4: Run the product module test to verify it passes**

Run: `node --disable-warning=MODULE_TYPELESS_PACKAGE_JSON --experimental-strip-types --test tests/skill-products.test.mjs`

Expected: PASS.

### Task 2: Create the product card and static catalog/detail routes

**Files:**
- Create: `components/skill-product-card.tsx`
- Create: `app/skills/page.tsx`
- Create: `app/skills/[slug]/page.tsx`
- Modify: `app/globals.css`
- Modify: `tests/skill-products.test.mjs`

**Interfaces:**
- Consumes `SkillProduct`, `skillProducts`, and `getSkillProduct` from `lib/skill-products.ts`.
- Produces static `/skills` and `/skills/<slug>` routes and `generateStaticParams()`.

- [ ] **Step 1: Add a failing route/discoverability test**

```js
import { readFile } from "node:fs/promises";

test("publishes static catalog and detail routes with the required sales boundaries", async () => {
  const catalog = await readFile(new URL("../app/skills/page.tsx", import.meta.url), "utf8");
  const detail = await readFile(new URL("../app/skills/[slug]/page.tsx", import.meta.url), "utf8");
  assert.match(catalog, /skillProducts/);
  assert.match(catalog, /跨境电商/);
  assert.match(catalog, /教育/);
  assert.match(detail, /generateStaticParams/);
  assert.match(detail, /购买咨询/);
  assert.match(detail, /不保证商业结果/);
  assert.doesNotMatch(catalog + detail, /searchParams/);
});
```

- [ ] **Step 2: Run the route test to verify it fails**

Run: `node --disable-warning=MODULE_TYPELESS_PACKAGE_JSON --experimental-strip-types --test tests/skill-products.test.mjs`

Expected: FAIL because catalog and detail files do not exist.

- [ ] **Step 3: Implement static pages and minimal component styling**

Create a product card showing category, status, outcome, delivery count, price label, and a details link. The catalog must show cross-border products and an explicit education roadmap/rights notice without client filtering. The detail route must call `notFound()` for unknown slugs, export every slug via `generateStaticParams()`, and render the ten PRD sections with headings. The CTA must link to `/contact?product=<slug>` and course-rights CTA to the same route with `&rights=course`.

- [ ] **Step 4: Run the route test to verify it passes**

Run: `node --disable-warning=MODULE_TYPELESS_PACKAGE_JSON --experimental-strip-types --test tests/skill-products.test.mjs`

Expected: PASS.

### Task 3: Make the product store discoverable without breaking existing navigation

**Files:**
- Modify: `components/site-header.tsx`
- Modify: `components/footer.tsx`
- Modify: `app/page.tsx`
- Modify: `tests/skill-products.test.mjs`

**Interfaces:**
- Consumes `/skills` route.
- Produces navigation links and a homepage callout to the catalog.

- [ ] **Step 1: Add a failing navigation test**

```js
test("links the skill catalog from navigation, footer, and homepage", async () => {
  const header = await readFile(new URL("../components/site-header.tsx", import.meta.url), "utf8");
  const footer = await readFile(new URL("../components/footer.tsx", import.meta.url), "utf8");
  const home = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  for (const source of [header, footer, home]) assert.match(source, /href="\/skills"/);
});
```

- [ ] **Step 2: Run the navigation test to verify it fails**

Run: `node --disable-warning=MODULE_TYPELESS_PACKAGE_JSON --experimental-strip-types --test tests/skill-products.test.mjs`

Expected: FAIL because no existing source links to `/skills`.

- [ ] **Step 3: Add one link per required location**

Add “Skill 小课包” to the header and footer. Add a restrained homepage section or existing callout action with a direct `/skills` link and honest manual-delivery wording. Do not alter unrelated home content.

- [ ] **Step 4: Run the navigation test to verify it passes**

Run: `node --disable-warning=MODULE_TYPELESS_PACKAGE_JSON --experimental-strip-types --test tests/skill-products.test.mjs`

Expected: PASS.

### Task 4: Expand the inquiry form for manual product delivery

**Files:**
- Modify: `app/contact/page.tsx`
- Modify: `app/forms.css` only if required for the new controls
- Modify: `tests/skill-products.test.mjs`

**Interfaces:**
- Consumes `product` and `rights` from browser query parameters, plus `skillProducts` for product labels.
- Produces a client form that displays the selected product and collects only the PRD minimum fields.

- [ ] **Step 1: Add a failing safe-inquiry test**

```js
test("purchase inquiry records product context and warns against sensitive data", async () => {
  const contact = await readFile(new URL("../app/contact/page.tsx", import.meta.url), "utf8");
  assert.match(contact, /useSearchParams/);
  assert.match(contact, /选择小课包/);
  assert.match(contact, /课程学员/);
  assert.match(contact, /API Key/);
  assert.match(contact, /不直接接入支付/);
  assert.match(contact, /skillProducts/);
});
```

- [ ] **Step 2: Run the inquiry test to verify it fails**

Run: `node --disable-warning=MODULE_TYPELESS_PACKAGE_JSON --experimental-strip-types --test tests/skill-products.test.mjs`

Expected: FAIL because the current contact page has no product context or safety notice.

- [ ] **Step 3: Implement minimal query-prefilled purchase inquiry fields**

Keep the existing resource/contact form usable. Add an optional “购买小课包” route state that preselects a valid product slug, displays the rights state, and changes form labels/confirmation copy. Add identity type, scenario, current tool (optional), course-rights choice, a visible sensitive-data warning, and wording that payment/download are manually confirmed. Do not add payment controls or persist secrets.

- [ ] **Step 4: Run the inquiry test to verify it passes**

Run: `node --disable-warning=MODULE_TYPELESS_PACKAGE_JSON --experimental-strip-types --test tests/skill-products.test.mjs`

Expected: PASS.

### Task 5: Package the first distributable product-material Skill and connect course rights

**Files:**
- Create: `products/product-material-agent/INSTALL.md`
- Create: `products/product-material-agent/CHANGELOG.md`
- Create: `products/product-material-agent/templates/product-brief.md`
- Create: `products/product-material-agent/templates/delivery-manifest.md`
- Create: `products/product-material-agent/examples/README.md`
- Copy/Create: `products/product-material-agent/SKILL.md`
- Copy/Create: `products/product-material-agent/references/brief-schema.md`
- Copy/Create: `products/product-material-agent/references/quality-gates.md`
- Create: `scripts/check-skill-package.mjs`
- Modify: `tests/skill-products.test.mjs`

**Interfaces:**
- Produces a source-controlled package directory with the exact six top-level deliverables required by the PRD.
- `scripts/check-skill-package.mjs <path>` exits zero only when required files exist and forbidden secret patterns are absent.

- [ ] **Step 1: Add a failing package test**

```js
import { access, readFile } from "node:fs/promises";

test("product-material package contains installable, source-safe delivery files", async () => {
  const base = new URL("../products/product-material-agent/", import.meta.url);
  for (const file of ["SKILL.md", "INSTALL.md", "CHANGELOG.md", "templates/product-brief.md", "templates/delivery-manifest.md", "examples/README.md", "references/brief-schema.md", "references/quality-gates.md"]) {
    await access(new URL(file, base));
  }
  const skill = await readFile(new URL("SKILL.md", base), "utf8");
  assert.doesNotMatch(skill, /DASHSCOPE|QIANWEN|sk-[A-Za-z0-9]/i);
});
```

- [ ] **Step 2: Run the package test to verify it fails**

Run: `node --disable-warning=MODULE_TYPELESS_PACKAGE_JSON --experimental-strip-types --test tests/skill-products.test.mjs`

Expected: FAIL because the product package directory does not exist.

- [ ] **Step 3: Create the versioned package and checker**

Use the previously validated provider-neutral product-material Skill content as the source. Add clear Codex and WorkBuddy installation steps, a no-provider first-run route, two editable templates, an explicitly synthetic/structure-only example readme, and version `1.0.0` changelog. The checker must reject common key prefixes and environment files; it must not create a ZIP automatically.

- [ ] **Step 4: Run package test and checker to verify they pass**

Run:

```bash
node --disable-warning=MODULE_TYPELESS_PACKAGE_JSON --experimental-strip-types --test tests/skill-products.test.mjs
node scripts/check-skill-package.mjs products/product-material-agent
```

Expected: both commands PASS.

### Task 6: Verify static export, lint, and all relevant tests

**Files:**
- Modify only if a verification failure directly concerns the new Skill store.

**Interfaces:**
- Produces verified static routes and a delivery-ready implementation report.

- [ ] **Step 1: Run targeted tests**

Run: `node --disable-warning=MODULE_TYPELESS_PACKAGE_JSON --experimental-strip-types --test tests/skill-products.test.mjs`

Expected: PASS.

- [ ] **Step 2: Run full test suite**

Run: `npm test`

Expected: new Skill tests PASS. Record the pre-existing case static-export failure separately if it remains.

- [ ] **Step 3: Run lint and static build**

Run:

```bash
npm run lint
npm run build
```

Expected: the build produces `/skills` and all three static product routes. If a failure is isolated to existing unrelated code, report the file, test/build output, and why it was not modified.

- [ ] **Step 4: Inspect generated public output**

Run: `Get-ChildItem out/skills -Recurse -File`

Expected: catalog and each `slug/index.html` exist.

## Plan self-review

- PRD coverage: Tasks 1–5 cover product metadata, three catalog/detail entries, purchase inquiry, manual delivery package, course-rights links, security boundaries, versioning, and static compatibility. Task 6 covers release verification.
- Explicitly deferred per PRD: payments, automatic delivery, subscription, online agents, credential storage, and analytics backend.
- Existing baseline failure: `tests/cases.test.mjs` currently fails because an existing cases page uses `searchParams`; it is not modified by this plan unless it blocks the static build and cannot be safely isolated.
