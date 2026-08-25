# Static Commercial Release Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Produce a safe, versioned static commercial release whose only unfinished work is external account, DNS, and real provider configuration.

**Architecture:** Keep Next.js `output: "export"`; centralize public origin, sitemap paths, Formspree validation, and analytics opt-in in pure helpers. Public integrations are build-time client configuration with explicit disabled fallbacks. Documentation records implemented and unverified state separately.

**Tech Stack:** Next.js 16.3.3, React 19.1.1, TypeScript 5.9.2, Node test runner, Vercel static export, optional Supabase browser auth, Formspree, Cloudflare Web Analytics.

**Spec:** `docs/superpowers/specs/2026-08-26-static-commercial-release-design.md`

## Global Constraints

- The site must build with all optional environment variables empty.
- No private credential may appear in a `NEXT_PUBLIC_*` variable or static artifact.
- `NEXT_PUBLIC_SITE_URL` is the only configured origin for canonical, robots, and sitemap output.
- The missing-site-URL fallback is exactly `https://kunlun-growth-ai.vercel.app`.
- Contact falls back to `mailto:`; submission is disabled when Formspree is missing.
- External GitHub/Vercel authorization, DNS, and real provider checks remain `EXTERNAL/NOT_RUN` without evidence.
- Preserve unrelated dirty-worktree changes and do not commit or push them.

---

### Task 1: Configuration and release readiness tests

**Files:**
- Create: `tests/release-readiness.test.mjs`
- Create: `lib/site-config.ts`
- Create: `lib/form-delivery.ts`
- Create: `components/analytics.tsx`
- Modify: `.env.example`
- Modify: `package.json`

**Interfaces:**
- Produces: `getSiteOrigin(value?: string): string`, `absoluteSiteUrl(path: string, origin?: string): string`, `getSitemapPaths(): string[]`, `getFormspreeEndpoint(value?: string): string`, `getFormMode(kind, endpoint, email): "formspree" | "mailto" | "disabled"`, `submitToFormspree(endpoint, data, fetcher?): Promise<"sent" | "error">`, and `getAnalyticsToken(value?: string): string`.

- [ ] **Step 1: Write failing tests for URL, form, analytics, and route behavior**

```js
test("one normalized origin drives absolute public URLs", () => {
  assert.equal(getSiteOrigin("https://example.com/path/"), "https://example.com");
  assert.equal(absoluteSiteUrl("/tutorials", "https://example.com"), "https://example.com/tutorials");
});

test("submission is disabled while contact falls back to mailto without Formspree", () => {
  assert.equal(getFormMode("submission", "", "hello@example.com"), "disabled");
  assert.equal(getFormMode("contact", "", "hello@example.com"), "mailto");
});
```

- [ ] **Step 2: Run the focused test and confirm missing-module failure**

Run: `node --disable-warning=MODULE_TYPELESS_PACKAGE_JSON --experimental-strip-types --test tests/release-readiness.test.mjs`

Expected: FAIL because `lib/site-config.ts` and `lib/form-delivery.ts` do not exist.

- [ ] **Step 3: Implement the smallest pure helpers and opt-in analytics component**

```ts
export const FALLBACK_SITE_ORIGIN = "https://kunlun-growth-ai.vercel.app";

export function getSiteOrigin(value = process.env.NEXT_PUBLIC_SITE_URL) {
  try {
    const url = new URL(value || FALLBACK_SITE_ORIGIN);
    return url.origin;
  } catch {
    return FALLBACK_SITE_ORIGIN;
  }
}
```

- [ ] **Step 4: Add public variables and version 0.2.0**

Add the site URL, analytics token, Formspree endpoint, contact email, and optional Supabase publishable fields to `.env.example`. Change `package.json` version to `0.2.0` and update the lockfile.

- [ ] **Step 5: Run focused and full tests**

Run: `npm test`

Expected: all tests pass.

### Task 2: SEO metadata, robots, and sitemap

**Files:**
- Create: `app/robots.ts`
- Create: `app/sitemap.ts`
- Create: `app/contact/layout.tsx`
- Create: `app/login/layout.tsx`
- Create: `app/submit/layout.tsx`
- Modify: `app/layout.tsx`
- Modify: public route pages under `app/`
- Modify: `tests/release-readiness.test.mjs`

**Interfaces:**
- Consumes: `getSiteOrigin`, `absoluteSiteUrl`, and `getSitemapPaths`.
- Produces: static `robots.txt`, static `sitemap.xml`, canonical metadata for every sitemap route, and noindex metadata for contact/login/submit.

- [ ] **Step 1: Extend tests for robots, sitemap uniqueness, and dynamic route coverage**

```js
test("sitemap paths are unique and include all public content details", () => {
  const paths = getSitemapPaths();
  assert.equal(new Set(paths).size, paths.length);
  assert.equal(paths.filter((path) => path.startsWith("/tutorials/")).length, tutorialEntries.length);
});
```

- [ ] **Step 2: Run focused tests and confirm the new assertions fail**

Run: `node --disable-warning=MODULE_TYPELESS_PACKAGE_JSON --experimental-strip-types --test tests/release-readiness.test.mjs`

Expected: FAIL until the complete route inventory and metadata helper exist.

- [ ] **Step 3: Implement metadata routes and canonical metadata**

Use `MetadataRoute.Robots` and `MetadataRoute.Sitemap`. Public page metadata must call one helper that sets `alternates.canonical` and Open Graph URL from the same normalized origin.

- [ ] **Step 4: Build and inspect generated SEO artifacts**

Run: `npm run build`

Expected: `out/robots.txt`, `out/sitemap.xml`, and canonical link elements on every sitemap HTML page.

### Task 3: Safe Formspree delivery and explicit fallbacks

**Files:**
- Modify: `app/contact/page.tsx`
- Modify: `app/submit/page.tsx`
- Modify: `lib/form-delivery.ts`
- Modify: `tests/release-readiness.test.mjs`

**Interfaces:**
- Consumes: `getFormspreeEndpoint`, `getFormMode`, `submitToFormspree`.
- Produces: contact `formspree|mailto|disabled` states and submission `formspree|disabled` states.

- [ ] **Step 1: Add failing tests for endpoint validation and delivery failures**

```js
test("only a Formspree HTTPS form endpoint is accepted", () => {
  assert.equal(getFormspreeEndpoint("http://formspree.io/f/demo"), "");
  assert.equal(getFormspreeEndpoint("https://evil.example/f/demo"), "");
  assert.equal(getFormspreeEndpoint("https://formspree.io/f/demo"), "https://formspree.io/f/demo");
});
```

- [ ] **Step 2: Run focused tests and confirm validation/delivery assertions fail**

Run: `node --disable-warning=MODULE_TYPELESS_PACKAGE_JSON --experimental-strip-types --test tests/release-readiness.test.mjs`

Expected: FAIL because the stricter behavior is absent.

- [ ] **Step 3: Implement minimal delivery states**

Contact sends FormData to Formspree when configured, opens a mail draft only when Formspree is absent and contact email exists, and otherwise reports unavailable. Submission renders a prominent disabled message and disabled button when Formspree is absent; on network failure it preserves field values and offers retry.

- [ ] **Step 4: Run focused and full tests**

Run: `npm test`

Expected: all tests pass.

### Task 4: Deployment hardening and versioned package

**Files:**
- Modify: `vercel.json`
- Create: `scripts/package-static-release.ps1`
- Modify: `package.json`
- Modify: `.gitignore`

**Interfaces:**
- Consumes: `out/` generated by `npm run build` and package version `0.2.0`.
- Produces: `releases/kunlun-growth-ai-0.2.0-static.zip` and matching `.sha256` sidecar.

- [ ] **Step 1: Add a release test for safe headers and package command presence**

The test reads `vercel.json` and `package.json`, verifies static Next settings remain intact, and checks that the package script names an existing PowerShell file.

- [ ] **Step 2: Run the focused test and confirm it fails**

Run: `node --disable-warning=MODULE_TYPELESS_PACKAGE_JSON --experimental-strip-types --test tests/release-readiness.test.mjs`

Expected: FAIL because the release script and security headers are absent.

- [ ] **Step 3: Add security headers and exact-target packaging**

The packager validates that all output files live below `out/`, removes only the exact previous version archive and hash file, compresses the exported directory, and writes the uppercase SHA-256 plus archive filename.

- [ ] **Step 4: Build and package**

Run: `npm run build`

Run: `npm run package:static`

Expected: versioned archive and sidecar exist; `Get-FileHash` matches the sidecar.

### Task 5: Shipping artifacts, license, and operations handoff

**Files:**
- Create: `documentation/architecture.md`
- Create: `documentation/flows.md`
- Create: `documentation/permissions.md`
- Create: `documentation/variables.md`
- Create: `documentation/tests.md`
- Create: `documentation/seo.md`
- Create: `documentation/automation.md`
- Create: `documentation/deployment.md`
- Create: `documentation/operations.md`
- Create: `documentation/go-live-checklist.md`
- Create: `LICENSE`
- Create: `NOTICE.md`
- Create: `CONTENT-LICENSE.md`
- Modify: `README.md`

**Interfaces:**
- Consumes: implemented routes, configuration helpers, tests, Vercel project metadata, and verified command output.
- Produces: the durable review and operations set required to deploy, audit, recover, and hand off the site.

- [ ] **Step 1: Document architecture, flows, permissions, variables, tests, SEO, and automation**

Each shipping artifact distinguishes implemented behavior from proposed or external state. `architecture.md` links every other document and states that there is no cron, automated email, payment, protected content, cloud progress, or embedded runtime agent.

- [ ] **Step 2: Add licensing and content boundaries**

Apply MIT to repository software only. Exclude third-party works, source claims, brand assets, and editorial content unless separately licensed. Credit template inspiration and point to the per-tutorial/per-case source links as the detailed author index.

- [ ] **Step 3: Document deploy, domain, analytics, forms, backups, upgrades, rollback, incidents, and go-live**

Provide exact commands for clean install, gates, static build, package, direct Vercel deployment, Git integration, DNS, and rollback. Mark GitHub App installation, push-triggered deploy, DNS, analytics, Formspree, and Supabase live verification as `EXTERNAL/NOT_RUN`.

- [ ] **Step 4: Correct README claims**

Remove the nonexistent Supabase migration instruction. State that optional Supabase configuration currently creates a session only and does not provide cloud progress or protected data.

### Task 6: Full verification and evidence record

**Files:**
- Create: `documentation/release-evidence-0.2.0.md`

**Interfaces:**
- Produces: exact local version, base Git SHA, archive SHA-256, command exits, generated page/link counts, browser interaction results, and external `NOT_RUN` states.

- [ ] **Step 1: Run dependency and quality gates**

Run: `npm audit --json`

Run: `npm test`

Run: `npx tsc --noEmit`

Run: `npm run lint`

Run: `npm run build`

Expected: zero audit vulnerabilities and all commands exit zero.

- [ ] **Step 2: Verify generated files and links**

Check every relative `href` in `out/**/*.html`, every sitemap URL's local HTML counterpart, robots/sitemap origin consistency, security headers configuration, and archive hash.

- [ ] **Step 3: Re-run browser acceptance**

At desktop and 390px mobile widths, verify home, tutorial collection/detail, case collection/detail, Skills collection/detail, opportunity tool, contact fallback, disabled submission, progress persistence, and copy actions. Record console errors and horizontal overflow.

- [ ] **Step 4: Record repository and deployment truth**

Record local branch/SHA/dirty state, configured Git remote, Vercel project metadata, and latest known direct deployment. Do not mark auto deployment, DNS, Supabase, analytics, or Formspree verified without a matching external record.
