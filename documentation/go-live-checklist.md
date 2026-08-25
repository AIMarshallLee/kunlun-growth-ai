# Go-live checklist

## Local release gates

- [ ] `npm audit --json` reports 0 vulnerabilities.
- [ ] `npm test` exits 0 with the recorded test count.
- [ ] `npx tsc --noEmit` exits 0.
- [ ] `npm run lint` exits 0.
- [ ] An empty optional environment builds successfully with `npm run build`.
- [ ] `npm run test:browser` exits 0 in a fresh Chrome/Edge context with no runtime or console errors.
- [ ] Simulated Formspree 500 browser mode keeps both contact and submission field values.
- [ ] Every sitemap URL maps to generated HTML and all generated internal links resolve.
- [ ] Desktop and 390px mobile acceptance covers home, tutorial, case, Skill, tool, contact, and submission pages.
- [ ] Tutorial progress survives reload and corrupt progress does not break rendering.
- [ ] Contact fallback is explicit; unconfigured submission is disabled and cannot claim success.
- [ ] `npm run package:static` creates version `0.2.0` archive and matching SHA-256 sidecar.
- [ ] Archive extraction and local serving succeed.
- [ ] `LICENSE`, `NOTICE.md`, `CONTENT-LICENSE.md`, and `documentation/` are included in the source handoff.

## Repository and deployment — external

- [ ] `EXTERNAL/NOT_RUN`: Sign in as `MarshallPD` and authorize Vercel for only `MarshallPD/kunlun-growth-ai`.
- [ ] `EXTERNAL/NOT_RUN`: Connect the Vercel project and set production branch to `main`.
- [ ] `EXTERNAL/NOT_RUN`: Push a recorded SHA and prove a new Ready deployment references that SHA.
- [ ] `EXTERNAL/NOT_RUN`: Confirm production alias points to that deployment.

## Domain and SEO — external

- [ ] `EXTERNAL/NOT_RUN`: Add the owned domain to Vercel and apply the exact displayed DNS records.
- [ ] `EXTERNAL/NOT_RUN`: Choose apex or `www` as canonical and verify redirect behavior.
- [ ] `EXTERNAL/NOT_RUN`: Set `NEXT_PUBLIC_SITE_URL` to the canonical HTTPS origin and rebuild.
- [ ] `EXTERNAL/NOT_RUN`: Verify live certificate, canonical tags, robots, sitemap, Open Graph, and 404.

## Forms, analytics, and optional auth — external

- [ ] `EXTERNAL/NOT_RUN`: Configure Formspree recipient, retention, spam controls, and endpoint.
- [ ] `EXTERNAL/NOT_RUN`: Send synthetic contact and submission forms and verify provider receipt.
- [ ] `EXTERNAL/NOT_RUN`: Complete privacy/consent review before setting analytics token.
- [ ] `EXTERNAL/NOT_RUN`: Verify analytics in the owned dashboard and verify removal kill switch.
- [ ] `EXTERNAL/NOT_RUN`: If Supabase login is enabled, configure redirect allowlist and test OTP with no added privilege.

## Operational readiness

- [ ] Name the repository, Vercel, domain, Formspree, Cloudflare, and optional Supabase owners.
- [ ] Record last known-good deployment ID, commit SHA, archive path, and hash in the private runbook.
- [ ] Rehearse Vercel and static-archive rollback.
- [ ] Confirm a monitored contact/takedown path.
- [ ] Confirm no secret exists in tracked files or the release archive.
