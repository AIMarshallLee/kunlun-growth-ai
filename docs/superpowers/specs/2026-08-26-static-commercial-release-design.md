# Static Commercial Release Design

## Goal

Turn the current Next.js tutorial library into a commercially deployable static release that can build and run safely with no Supabase, analytics, or form configuration, while becoming production-ready after repository, domain, and external provider settings are supplied.

## Approved approach

The application remains a Next.js static export. It does not add an application server, payment system, background worker, or privileged secret. Optional browser-facing integrations are configured at build time:

- `NEXT_PUBLIC_SITE_URL` supplies the single canonical origin used by page metadata, `robots.txt`, and `sitemap.xml`.
- `NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN` enables Cloudflare Web Analytics; an empty value emits no analytics script.
- `NEXT_PUBLIC_FORMSPREE_ENDPOINT` enables contact and submission delivery to Formspree.
- `NEXT_PUBLIC_CONTACT_EMAIL` is the contact-only fallback when Formspree is unavailable.
- Supabase publishable configuration may enable email OTP sessions, but the current release has no protected content and no cloud progress persistence.

Every variable is public by design. Service-role keys, private API keys, provider credentials, and customer secrets must never be added to `NEXT_PUBLIC_*` variables or the static bundle.

## Public SEO surface

The indexable route inventory is defined once in `lib/site-config.ts`. It includes the home page, public collection pages, public utility page, every tutorial, every case, and every published Skill product. The same origin normalizer and route inventory drive:

- canonical metadata for each indexable page;
- `app/robots.ts`;
- `app/sitemap.ts`;
- release tests that reject duplicate paths, inconsistent origins, and missing generated HTML.

Contact, login, and submission routes are functional utilities but are not included in the sitemap. They receive `noindex` metadata through route layouts.

When `NEXT_PUBLIC_SITE_URL` is absent, the build uses `https://kunlun-growth-ai.vercel.app` as a safe, valid fallback so an unconfigured build never crashes or emits a malformed URL. A commercial launch checklist still requires setting the owned production domain.

## Form behavior

One validated Formspree endpoint accepts both contact and submission forms with an explicit `formType` field.

- Contact with Formspree: submit asynchronously and show sent, sending, or retryable error state.
- Contact without Formspree but with contact email: open an encoded `mailto:` draft and state that the user must send it.
- Contact with neither: show an unavailable state; do not claim delivery.
- Submission with Formspree: submit asynchronously and show sent or retryable error state.
- Submission without Formspree: visibly disable submission before data entry and disable the submit button. No success state is shown and no data is discarded silently.

Formspree URLs must use HTTPS, the `formspree.io` hostname, and a `/f/` form path. A failed network request leaves uncontrolled form fields in place for retry.

## Analytics behavior

Cloudflare Web Analytics is opt-in. The script is emitted only when the trimmed token is non-empty. The token is a public site identifier, not a secret. No consent claim is made by the code; the operator must decide whether consent controls are required in the target jurisdiction before enabling analytics.

## Trust and permission boundaries

All tutorial, case, Skill, and project content is public. Browser local storage stores only tutorial step completion. The opportunity-card tool keeps draft content in page memory. Form data crosses from browser to Formspree only after an explicit submit action, or to the user's email client after an explicit contact action. Optional Supabase authentication creates a browser session but grants no additional application capability in this release.

## Licensing and content boundary

Repository software is released under MIT. Brand names, logos, site-specific editorial content, tutorial source material, third-party claims, and linked source works are excluded unless separately licensed. `NOTICE.md` records template inspiration and the on-page source-credit model. `CONTENT-LICENSE.md` explains reuse rules and takedown handling.

## Release and operations

The repository supplies:

- a pinned Node-compatible dependency lock;
- a Vercel static-export configuration;
- an environment example with public-variable warnings;
- a PowerShell release packager that creates a versioned ZIP and SHA-256 sidecar from `out/`;
- shipping documentation for architecture, flows, permissions, variables, tests, SEO, and deployment automation;
- deployment, domain, analytics, forms, backup, upgrade, rollback, incident handling, and go-live instructions.

The local artifact version is `0.2.0`. A release is locally verified only after audit, tests, type checking, lint, production build, generated-link checks, browser interactions, archive creation, and hash verification succeed. GitHub/Vercel authorization, push-triggered deployment, DNS, and real provider configuration remain `EXTERNAL/NOT_RUN` until evidence exists.

## Non-goals

- No payment or automatic digital delivery.
- No Supabase database schema, RLS policy, cloud tutorial progress, or submission queue.
- No server-side secret handling.
- No automatic email sending.
- No cron jobs, webhooks, embedded runtime agents, or unattended business actions.
- No claim that Git push deployment, custom-domain DNS, analytics collection, or Formspree delivery was verified without external records.

## Verification criteria

1. An empty environment builds and serves all public pages without exceptions.
2. Canonical URLs, robots sitemap reference, and sitemap entries share the normalized site origin.
3. Automated tests pin Formspree validation and every configured/unconfigured form mode.
4. Submission is visibly disabled without Formspree and cannot display a false success state.
5. `npm audit` reports zero known vulnerabilities at the verification time.
6. Tests, TypeScript, ESLint, and `next build` exit zero.
7. Every generated internal link resolves to an exported file.
8. The versioned archive and `.sha256` sidecar match.
9. All unverified external actions are labeled `EXTERNAL/NOT_RUN`.
