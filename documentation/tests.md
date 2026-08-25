# Verification map

## Existing coverage

| Use case | Rule and negative case | Expected behavior | Evidence | Status |
|---|---|---|---|---|
| Site origin | Invalid, unsafe, or empty origin must not break build | Normalize HTTPS/HTTP origin; otherwise use documented fallback | `tests/release-readiness.test.mjs`, `lib/site-config.ts` | Existing automated |
| SEO inventory | Utility forms must not enter public sitemap; dynamic content must be complete | Unique paths cover 73 tutorials, 20 cases, and all published Skills | `tests/release-readiness.test.mjs`, `app/sitemap.ts` | Existing automated |
| SEO origin consistency | Canonical, Open Graph URL, robots sitemap, and sitemap URLs cannot diverge | All values use the same normalized origin helper | `tests/release-readiness.test.mjs` | Existing automated plus generated-artifact check |
| Analytics disabled | Empty token must not load a tracker | Analytics component returns `null` | `tests/release-readiness.test.mjs`, `components/analytics.tsx` | Existing automated/source check |
| Form endpoint | HTTP, wrong hostname, or wrong path must be rejected | Only HTTPS `formspree.io/f/...` accepted | `tests/release-readiness.test.mjs`, `lib/form-delivery.ts` | Existing automated |
| Contact fallback | No Formspree must not claim provider delivery | Use mailto only with email; otherwise unavailable | `tests/release-readiness.test.mjs`, `scripts/browser-acceptance.mjs` | Existing automated/browser |
| Submission disabled | Missing Formspree must never show demo success | Fields and submit button disabled with explicit message | `tests/release-readiness.test.mjs`, `scripts/browser-acceptance.mjs` | Existing automated/browser |
| Provider failure | Non-2xx or network failure must not be called sent | Return error; page retains field values | `tests/release-readiness.test.mjs`, simulated-500 browser mode | Existing automated/browser |
| Tutorial progress | Corrupt or tampered storage must not crash page; persisted state must not mismatch hydration | Invalid data becomes empty; valid state restores only after hydration | `tests/release-readiness.test.mjs`, `scripts/browser-acceptance.mjs` | Existing automated/browser |
| Case integrity | Source, boundary, related tutorial, and unique slug required | 20 complete cases and valid relations | `tests/cases.test.mjs` | Existing automated |
| Skill package safety | Required files present; credential patterns and dotenv files rejected | Valid packages pass; unsafe packages fail | `tests/skill-package.test.mjs`, `scripts/check-skill-package.mjs` | Existing automated |
| Operational templates | Safe columns and decision fields required | Templates and checker pass | `tests/operations.test.mjs` | Existing automated |
| Static navigation | Every generated relative link resolves | Zero missing local targets | Generated-output link checker recorded in release evidence | Existing release check |

Local release gates are:

```powershell
npm audit --json
npm test
npx tsc --noEmit
npm run lint
npm run build
npm run test:browser
npm run package:static
```

`npm run test:browser` starts the generated `out/` directory in a temporary local server and drives an installed Chrome/Edge through the DevTools Protocol in a new browser context. It checks representative desktop/mobile routes, overflow, runtime/console errors, empty form states, filtering, copying, and tutorial persistence without adding Playwright as a product dependency.

For the provider-failure browser mode, first build with a test-only Formspree-shaped endpoint, then intercept it locally as an HTTP 500 response:

```powershell
$env:NEXT_PUBLIC_FORMSPREE_ENDPOINT='https://formspree.io/f/e2e-test'
npm.cmd run build
$env:BROWSER_ACCEPTANCE_MODE='formspree-failure'
npm.cmd run test:browser
```

No request reaches Formspree in that mode; the browser injects the simulated response before application code runs. Rebuild with the intended production variables afterward.

## Proposed tests

| Use case | Rule and negative case | Expected behavior | Type | Status |
|---|---|---|---|---|
| Real Formspree delivery | Provider configuration must reach the intended owned form | Test message appears in provider dashboard; rejected endpoint does not | Guarded live | Proposed; `EXTERNAL/NOT_RUN` |
| Real analytics | Token must send only expected analytics traffic | Event appears in owned dashboard; no script when removed | Guarded live/privacy review | Proposed; `EXTERNAL/NOT_RUN` |
| Supabase OTP | Redirect allowlist and owned project must be correct | Test mailbox receives link; session creates no privilege | Guarded live | Proposed; `EXTERNAL/NOT_RUN` |
| Git push deploy | Deployment must map to pushed SHA | New deployment ID and production alias reference the recorded commit | Guarded live | Proposed; `EXTERNAL/NOT_RUN` |
| Custom domain | HTTPS, apex/www policy, and canonical must agree | DNS resolves; certificate valid; redirects intentional | Guarded live | Proposed; `EXTERNAL/NOT_RUN` |
| Content HTML safety | Future data ingestion must not introduce arbitrary HTML | Sanitizer rejects script/event-handler payloads | Automated unit/integration | Proposed before accepting runtime or third-party HTML imports |
| Accessibility | Keyboard, labels, contrast, and focus must remain usable | Automated scan plus manual keyboard pass | Automated/manual | Proposed |

## Gaps

| Priority | Rule without full verification | Exposure |
|---|---|---|
| P1 external | Formspree retention, recipient ownership, and spam controls | Contact PII could be retained or routed incorrectly |
| P1 external | DNS/custom-domain/certificate behavior | Users may reach the wrong origin or see invalid TLS |
| P1 external | Push-triggered Vercel deployment | Repository updates may not publish automatically |
| P2 | Browser suite is local but not wired into an owned CI runner | Releases depend on running the documented local gate until CI is added and observed |
| P2 | No CSP compatibility test | Repository-content injection impact is larger if maintainer review fails |
| P2 | No formal accessibility scanner | Some WCAG regressions may escape manual acceptance |

No CI workflow currently gates `main`; GitHub/Vercel integration is not verified. The commands above are required local release gates until an owned CI workflow is added and observed.
