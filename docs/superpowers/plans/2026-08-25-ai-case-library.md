# AI Case Library Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a 20-item AI ecommerce case library and a local product-opportunity card tool without changing the existing 73 tutorials.

**Architecture:** Store curated case records in a typed local module, expose small lookup helpers, statically generate list/detail pages, and keep the tool's formatter as a pure tested function. Pages reuse the current header, footer, cards, typography, and static-export model.

**Tech Stack:** Next.js 15 static export, React 19, TypeScript 5.9, Node built-in test runner.

**Spec:** `docs/superpowers/specs/2026-08-25-ai-case-library-design.md`

## Global Constraints

- Keep all 73 existing tutorials unchanged.
- Launch exactly 20 case records with source, claim boundary, verified date, and valid related tutorial slugs.
- Do not copy third-party images, charts, or long passages.
- The opportunity-card tool stores and sends no user data.

---

### Task 1: Content contract and tests

**Files:**
- Create: `tests/cases.test.mjs`
- Create: `data/cases.ts`
- Create: `lib/cases.ts`
- Create: `lib/opportunity-card.ts`
- Modify: `package.json`

**Interfaces:**
- Produces: `caseStudies`, `getCaseStudy(slug)`, `caseCategories`, `buildOpportunityCard(input)`.

- [ ] Write tests for 20 unique complete cases, valid tutorial relations, lookup behavior, and deterministic opportunity-card output.
- [ ] Run `npm.cmd test` and confirm failure because the production modules do not exist.
- [ ] Add the minimal typed data and helpers.
- [ ] Run `npm.cmd test` and confirm all tests pass.

### Task 2: Case list and detail pages

**Files:**
- Create: `components/case-card.tsx`
- Create: `app/cases/page.tsx`
- Create: `app/cases/[slug]/page.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: `caseStudies`, `getCaseStudy`, `caseCategories`, and existing tutorial helpers.

- [ ] Add source assertions to the test and confirm they fail before pages exist.
- [ ] Implement category-filtered case cards and static detail pages.
- [ ] Add only the CSS required by those pages.
- [ ] Run tests and `npx.cmd tsc --noEmit`.

### Task 3: Opportunity-card tool and discovery links

**Files:**
- Create: `components/opportunity-card-tool.tsx`
- Create: `app/tools/product-opportunity-card/page.tsx`
- Modify: `components/site-header.tsx`
- Modify: `components/footer.tsx`
- Modify: `app/page.tsx`
- Modify: `app/forms.css`

**Interfaces:**
- Consumes: `buildOpportunityCard(input)` and existing site chrome.

- [ ] Add failing source assertions for navigation and tool route.
- [ ] Implement the local-only form, copy action, navigation, footer, and homepage case CTA.
- [ ] Run tests, TypeScript, ESLint, and production build.

### Task 4: Publish and verify

**Files:**
- No production file changes expected.

- [ ] Review `git diff --check` and stage only files from this feature.
- [ ] Commit and push `main`.
- [ ] Deploy the bound Vercel project.
- [ ] Verify `/cases`, one detail page, and the tool page return HTTP 200.
