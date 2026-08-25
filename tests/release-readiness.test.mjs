import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

import { caseStudies } from "../lib/cases.ts";
import {
  getFormMode,
  getFormspreeEndpoint,
  submitToFormspree,
} from "../lib/form-delivery.ts";
import { skillProducts } from "../lib/skill-products.ts";
import { parseCompletedSteps } from "../lib/tutorial-progress.ts";
import {
  FALLBACK_SITE_ORIGIN,
  absoluteSiteUrl,
  buildPageMetadata,
  buildRobotsRules,
  buildSitemapEntries,
  getAnalyticsToken,
  getSiteOrigin,
  getSitemapPaths,
} from "../lib/site-config.ts";

async function getTutorialSlugs() {
  const legacy = JSON.parse(await readFile(new URL("../data/tutorials.json", import.meta.url), "utf8"));
  const { newTutorials } = await import("../data/new-tutorials.ts");
  const { expansionTutorials } = await import("../data/expansion-tutorials.ts");
  const { expansionRoundTwoA } = await import("../data/expansion-round-two-a.ts");
  const { expansionRoundTwoB } = await import("../data/expansion-round-two-b.ts");
  const { expansionRoundTwoC } = await import("../data/expansion-round-two-c.ts");
  return Object.keys({ ...legacy, ...newTutorials, ...expansionTutorials, ...expansionRoundTwoA, ...expansionRoundTwoB, ...expansionRoundTwoC });
}

test("one normalized origin drives absolute public URLs", () => {
  assert.equal(getSiteOrigin("https://example.com/path/?ignored=yes"), "https://example.com");
  assert.equal(getSiteOrigin("javascript:alert(1)"), FALLBACK_SITE_ORIGIN);
  assert.equal(getSiteOrigin(""), FALLBACK_SITE_ORIGIN);
  assert.equal(absoluteSiteUrl("/tutorials", "https://example.com"), "https://example.com/tutorials");
});

test("sitemap paths are unique and cover every public detail route", async () => {
  const tutorialSlugs = await getTutorialSlugs();
  const paths = getSitemapPaths({
    tutorialSlugs,
    caseSlugs: caseStudies.map(({ slug }) => slug),
    skillSlugs: skillProducts.map(({ slug }) => slug),
  });
  assert.equal(new Set(paths).size, paths.length);
  assert.equal(paths.filter((path) => path.startsWith("/tutorials/")).length, tutorialSlugs.length);
  assert.equal(paths.filter((path) => path.startsWith("/cases/")).length, caseStudies.length);
  assert.equal(paths.filter((path) => path.startsWith("/skills/")).length, skillProducts.length);
  assert.ok(paths.includes("/tools/product-opportunity-card"));
  for (const utilityPath of ["/contact", "/login", "/submit"]) assert.equal(paths.includes(utilityPath), false);
});

test("canonical metadata, robots and sitemap share the configured origin", () => {
  const origin = getSiteOrigin("https://www.example.com/some/path");
  const metadata = buildPageMetadata("/tutorials/demo", "Demo", "A public demo", origin);
  const robots = buildRobotsRules(origin);
  const sitemap = buildSitemapEntries(["/", "/tutorials/demo"], origin);
  assert.equal(metadata.alternates.canonical, "https://www.example.com/tutorials/demo");
  assert.equal(metadata.openGraph.url, "https://www.example.com/tutorials/demo");
  assert.equal(robots.sitemap, "https://www.example.com/sitemap.xml");
  assert.deepEqual(sitemap.map(({ url }) => url), ["https://www.example.com/", "https://www.example.com/tutorials/demo"]);
});

test("Next metadata routes and noindex utility layouts are wired to shared helpers", async () => {
  const robots = await readFile(new URL("../app/robots.ts", import.meta.url), "utf8");
  const sitemap = await readFile(new URL("../app/sitemap.ts", import.meta.url), "utf8");
  assert.match(robots, /buildRobotsRules/);
  assert.match(sitemap, /buildSitemapEntries/);
  assert.match(sitemap, /getSitemapPaths/);
  assert.match(robots, /dynamic\s*=\s*"force-static"/);
  assert.match(sitemap, /dynamic\s*=\s*"force-static"/);
  for (const route of ["contact", "login", "submit"]) {
    const layout = await readFile(new URL(`../app/${route}/layout.tsx`, import.meta.url), "utf8");
    assert.match(layout, /index:\s*false/);
  }
});

test("analytics is rendered only through the opt-in analytics component", async () => {
  const layout = await readFile(new URL("../app/layout.tsx", import.meta.url), "utf8");
  const analytics = await readFile(new URL("../components/analytics.tsx", import.meta.url), "utf8");
  assert.match(layout, /<Analytics\s*\/>/);
  assert.match(analytics, /getAnalyticsToken/);
  assert.match(analytics, /static\.cloudflareinsights\.com\/beacon\.min\.js/);
});

test("every indexable page declares canonical metadata through the shared helper", async () => {
  const pages = [
    "../app/page.tsx",
    "../app/about/page.tsx",
    "../app/cases/page.tsx",
    "../app/cases/[slug]/page.tsx",
    "../app/tutorials/page.tsx",
    "../app/tutorials/[slug]/page.tsx",
    "../app/skills/page.tsx",
    "../app/skills/[slug]/page.tsx",
    "../app/works/page.tsx",
    "../app/projects/page.tsx",
    "../app/challenges/page.tsx",
    "../app/tools/product-opportunity-card/page.tsx",
  ];
  for (const page of pages) {
    const source = await readFile(new URL(page, import.meta.url), "utf8");
    assert.match(source, /buildPageMetadata/, `${page} must use shared canonical metadata`);
  }
});

test("analytics is absent unless a non-empty public token is configured", () => {
  assert.equal(getAnalyticsToken(undefined), "");
  assert.equal(getAnalyticsToken("  "), "");
  assert.equal(getAnalyticsToken(" public-site-token "), "public-site-token");
});

test("only an HTTPS Formspree form endpoint is accepted", () => {
  assert.equal(getFormspreeEndpoint(""), "");
  assert.equal(getFormspreeEndpoint("http://formspree.io/f/demo"), "");
  assert.equal(getFormspreeEndpoint("https://evil.example/f/demo"), "");
  assert.equal(getFormspreeEndpoint("https://formspree.io/not-a-form/demo"), "");
  assert.equal(getFormspreeEndpoint("https://formspree.io/f/demo/"), "https://formspree.io/f/demo");
});

test("submission is disabled while contact falls back to mailto without Formspree", () => {
  assert.equal(getFormMode("submission", "", "hello@example.com"), "disabled");
  assert.equal(getFormMode("contact", "", "hello@example.com"), "mailto");
  assert.equal(getFormMode("contact", "", ""), "disabled");
  assert.equal(getFormMode("submission", "https://formspree.io/f/demo", ""), "formspree");
});

test("Formspree delivery returns sent only for an accepted provider response", async () => {
  const data = new FormData();
  data.set("formType", "contact");
  const accepted = await submitToFormspree("https://formspree.io/f/demo", data, async () => new Response("{}", { status: 200 }));
  const rejected = await submitToFormspree("https://formspree.io/f/demo", data, async () => new Response("{}", { status: 422 }));
  const unavailable = await submitToFormspree("https://formspree.io/f/demo", data, async () => { throw new Error("offline"); });
  assert.equal(accepted, "sent");
  assert.equal(rejected, "error");
  assert.equal(unavailable, "error");
});

test("the public configuration example is complete and the release is versioned", async () => {
  const envExample = await readFile(new URL("../.env.example", import.meta.url), "utf8");
  const packageJson = JSON.parse(await readFile(new URL("../package.json", import.meta.url), "utf8"));
  for (const name of [
    "NEXT_PUBLIC_SITE_URL",
    "NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN",
    "NEXT_PUBLIC_FORMSPREE_ENDPOINT",
    "NEXT_PUBLIC_CONTACT_EMAIL",
    "NEXT_PUBLIC_SUPABASE_URL",
    "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
  ]) assert.match(envExample, new RegExp(`^${name}=`, "m"));
  assert.equal(packageJson.version, "0.2.0");
});

test("contact and submission pages expose Formspree states without false delivery", async () => {
  const contact = await readFile(new URL("../app/contact/page.tsx", import.meta.url), "utf8");
  const submission = await readFile(new URL("../app/submit/page.tsx", import.meta.url), "utf8");
  for (const source of [contact, submission]) {
    assert.match(source, /NEXT_PUBLIC_FORMSPREE_ENDPOINT/);
    assert.match(source, /submitToFormspree/);
    assert.match(source, /发送失败/);
  }
  assert.match(contact, /getFormMode\("contact"/);
  assert.match(contact, /buildInquiryMailto/);
  assert.match(submission, /getFormMode\("submission"/);
  assert.match(submission, /disabled=\{formMode === "disabled"\}/);
  assert.match(submission, /投稿通道尚未配置/);
  assert.doesNotMatch(submission, /setDone\(true\)/);
});

test("deployment config preserves Next output and ships repeatable static packaging", async () => {
  const vercel = JSON.parse(await readFile(new URL("../vercel.json", import.meta.url), "utf8"));
  const packageJson = JSON.parse(await readFile(new URL("../package.json", import.meta.url), "utf8"));
  assert.equal(vercel.framework, "nextjs");
  assert.equal(vercel.buildCommand, "npm run build");
  assert.equal(vercel.outputDirectory, ".next");
  const headerNames = new Set(vercel.headers?.flatMap(({ headers }) => headers.map(({ key }) => key)) || []);
  for (const name of ["X-Content-Type-Options", "Referrer-Policy", "Permissions-Policy", "X-Frame-Options"]) assert.ok(headerNames.has(name));
  assert.equal(packageJson.scripts["package:static"], "powershell -NoProfile -ExecutionPolicy Bypass -File scripts/package-static-release.ps1");
  assert.equal(packageJson.scripts["check:static"], "node scripts/check-static-release.mjs");
  assert.equal(packageJson.scripts["test:browser"], "node scripts/browser-acceptance.mjs");
  await access(new URL("../scripts/package-static-release.ps1", import.meta.url));
  await access(new URL("../scripts/check-static-release.mjs", import.meta.url));
  await access(new URL("../scripts/browser-acceptance.mjs", import.meta.url));
});

test("corrupt or tampered tutorial progress cannot crash a tutorial", () => {
  assert.deepEqual(parseCompletedSteps("not-json", 7), []);
  assert.deepEqual(parseCompletedSteps('{"unexpected":true}', 7), []);
  assert.deepEqual(parseCompletedSteps("[1,2,2,0,8,3.5,\"4\"]", 7), [1, 2]);
});

test("tutorial progress is restored after hydration instead of during the server render", async () => {
  const source = await readFile(new URL("../components/tutorial-document.tsx", import.meta.url), "utf8");
  assert.match(source, /useState<number\[\]>\(\[\]\)/);
  assert.match(source, /useEffect\(\(\) => \{[\s\S]*localStorage\.getItem\(storageKey\)/);
  assert.doesNotMatch(source, /useState<number\[\]>\(\(\) =>[\s\S]*localStorage\.getItem/);
});
