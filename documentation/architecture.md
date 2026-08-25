# Architecture

## Product and assumptions

昆仑增长AI实战 is a public Chinese-language library of AI tutorials, evidence-bounded cases, Skill course packs, and local browser tools. The deployable product in this release is a static site: public content must remain available when Supabase, analytics, and Formspree are all absent.

Key assumptions:

- Repository content is reviewed before build and is trusted as code, not user-generated runtime input.
- All `NEXT_PUBLIC_*` values are browser-visible and must be safe to disclose.
- Form delivery, analytics collection, Git hosting, deployment, and DNS are external services owned by the operator.
- Optional Supabase authentication creates a browser session only. It does not unlock content, persist tutorial progress, or create an application authorization role.

## Stack and build

| Layer | Implementation | Evidence |
|---|---|---|
| UI and routing | Next.js 16.3.3 App Router, React 19.1.1 | `app/`, `package.json` |
| Export | `output: "export"` | `next.config.ts` |
| Content | Repository JSON/TypeScript | `data/`, `lib/tutorials.ts`, `lib/cases.ts`, `lib/skill-products.ts` |
| Browser state | `localStorage` for tutorial steps; component state for opportunity-card drafts | `components/tutorial-document.tsx`, `components/opportunity-card-tool.tsx` |
| Optional auth | Supabase browser client and email OTP | `lib/supabase/client.ts`, `app/login/page.tsx` |
| Optional forms | HTTPS Formspree endpoint; contact-only `mailto:` fallback | `lib/form-delivery.ts`, `app/contact/page.tsx`, `app/submit/page.tsx` |
| Optional analytics | Cloudflare Web Analytics script | `components/analytics.tsx` |
| Hosting | Vercel Next.js project; static `out/` is also portable | `vercel.json`, `.vercel/project.json` |

The production build prerenders every route. There is no application server, server action, API route, database write, payment flow, scheduled job, webhook receiver, automated email sender, or embedded runtime AI agent.

## Components

| Component | Responsibility | Depends on |
|---|---|---|
| `lib/site-config.ts` | Normalizes the public origin and builds canonical, robots, and sitemap values | Public build variables and static route slugs |
| `lib/form-delivery.ts` | Restricts Formspree endpoint format, selects fallback mode, performs explicit POST | Browser `fetch`, public Formspree endpoint |
| Tutorial document | Renders repository-controlled blocks, sources, copy actions, local progress | Static tutorial data, browser clipboard/local storage |
| Case and Skill libraries | Render repository-controlled evidence and product descriptions | Static TypeScript data |
| Opportunity-card tool | Formats user-entered text in memory and copies it | Browser component state and clipboard |
| Optional auth handler | Initializes Supabase browser auth when both public values exist | Supabase browser SDK |
| Analytics | Emits no element without a token; otherwise loads Cloudflare's beacon | Cloudflare public site token |

## Authentication and claims flow

1. An anonymous visitor can load every exported route.
2. If Supabase configuration is missing, login submit shows an unavailable message and performs no network request.
3. If configured, the browser calls `signInWithOtp` and Supabase emails a magic link.
4. The redirect initializes the Supabase browser client through `AuthSessionHandler`.
5. The resulting session is not used by any route, resource, form, or content check in this release.

There is therefore no application role/claim authorization boundary. A Supabase session is identity only, not privilege.

## Trust boundaries

| Crossing | Data | Control |
|---|---|---|
| Repository → static HTML | Tutorial/case/Skill text and links | Maintainer review, tests, source attribution |
| Browser → local storage | Completed tutorial step numbers | Parser rejects malformed, duplicate, non-integer, and out-of-range values |
| Browser → clipboard | User-requested prompt, guide summary, or opportunity card | Explicit button click only |
| Browser → Formspree | Contact or submission form fields | Explicit submit, HTTPS hostname/path allowlist, visible success/error state |
| Browser → email client | Contact form values | Explicit submit in mailto fallback; user must send draft |
| Browser → Supabase | Email and auth session | Only when public Supabase values are configured and user submits login |
| Browser → Cloudflare | Standard web analytics event data | Script absent unless token is configured |
| GitHub → Vercel | Repository contents and commit metadata | External GitHub App authorization; not verified in this release |

## Known risks and assumptions

- `components/tutorial-document.tsx` uses `dangerouslySetInnerHTML` for repository-controlled tutorial titles and chips. Runtime users cannot supply these fields, but maintainers must never merge untrusted HTML into tutorial data without sanitization.
- Formspree becomes a processor of names, email addresses, region, and user-written scenarios when enabled. The operator must configure retention, access, spam controls, and privacy disclosures in the Formspree account.
- Analytics consent requirements vary by jurisdiction. The code only provides opt-in configuration; legal basis and consent UI remain an operator decision before enabling the token.
- The fallback canonical origin is the current Vercel alias. Forks that omit `NEXT_PUBLIC_SITE_URL` build safely but advertise the original origin, so setting an owned domain is a go-live requirement.
- Static security headers do not include a Content Security Policy. Adding one requires testing Next.js inline scripts, Supabase, Formspree, and optional Cloudflare Analytics first.
- External source claims are not independently audited unless a case explicitly states otherwise. Pages preserve the claim boundary and original link.

No scheduled work exists, so there is no `cron.md`. The application does not send transactional or automated email, so there is no `emails.md`.

## Related documents

- [Flows](flows.md)
- [Permissions](permissions.md)
- [Variables and secrets](variables.md)
- [Verification map](tests.md)
- [SEO](seo.md)
- [Automation](automation.md)
- [Deployment and external configuration](deployment.md)
- [Operations, backup, upgrade, rollback, and incidents](operations.md)
- [Go-live checklist](go-live-checklist.md)
- [Release evidence](release-evidence-0.2.0.md)
- [Content license boundary](../CONTENT-LICENSE.md)
- [Third-party notice](../NOTICE.md)
