# Release evidence — 0.2.0

Recorded on 2026-08-26 (Asia/Shanghai). This document distinguishes local proof from external configuration. It does not claim that Git push automation, DNS, analytics, Formspree delivery, or Supabase OTP has been verified.

## Candidate identity

| Item | Recorded value |
|---|---|
| Application | Kunlun Growth AI Practice / 昆仑增长AI实战 |
| Version | `0.2.0` |
| Node / npm | `v24.15.0` / `11.12.1` |
| Next.js | `16.3.3` |
| Local branch / HEAD | `main` / `698aaf3f3ab3e26dba8adbde89454061726f3d9c` |
| Git remote | `https://github.com/MarshallPD/kunlun-growth-ai.git` |
| Remote `main` observed by `git ls-remote` | `3a3d91c7e03897c2cca1a9e5eb811ee1a66b4a6e` |
| Worktree | Dirty and intentionally uncommitted; 61 status entries at gate start |
| Gate source inventory | 198 files, excluding `.git`, dependencies, build outputs, static releases, Vercel state, and verification scratch directories |
| Gate start fingerprint | `a364956423b5bd132100a97b4d128a55d87f920a1b64383049d9b4419099234b` |
| Gate end fingerprint | `a364956423b5bd132100a97b4d128a55d87f920a1b64383049d9b4419099234b` |

The matching start/end fingerprints prove that no source, Skill package, or product ZIP changed during the joint gate. This evidence file was added after that comparison and does not enter the Next build or static ZIP.

## Joint local gate

| Command / check | Result |
|---|---|
| `npm audit --json` | Exit 0; 0 info/low/moderate/high/critical vulnerabilities; 422 dependencies audited |
| `npm test` | Exit 0; 54/54 passed |
| `npx tsc --noEmit` | Exit 0 |
| `npm run lint` | Exit 0 |
| Three package `verify.mjs` commands | 3/3 PASS: 23, 25, and 29 covered files; 5, 3, and 5 contract cases |
| Empty-variable `npm run build` | Exit 0; 112 static pages generated |
| `npm run check:static` | 110 HTML; 1,364 internal links; 105 sitemap URLs; 0 missing links; 0 analytics scripts |
| `npm run test:browser` with empty configuration | Exit 0 in a fresh headless Chrome context; 9 representative routes; desktop overflow 0; 390px mobile overflow 0; runtime/console errors 0; case filter 20→3; tutorial progress restored as 1/7; copy interaction passed |
| Browser failure mode | Test-only Formspree-shaped endpoint was intercepted locally as HTTP 500; contact and submission values remained; no success claim; runtime/console errors 0 |
| Final empty-variable rebuild | Exit 0; performed after failure-mode test so the candidate contains no test endpoint |
| Final static and empty-browser checks | Both repeated after the final rebuild and passed |
| `npm run package:static` | Exit 0 |
| Independent archive inspection | 569 file entries; 110 HTML; no unsafe parent or absolute ZIP paths |
| Independent extracted archive check | Same 110 HTML / 1,364 links / 105 sitemap URLs / 0 missing / 0 analytics result |

The original React hydration mismatch was reproduced as React error 418, traced to reading tutorial `localStorage` during the client initial render, and fixed by restoring progress only after hydration. A regression source test and the fresh-context Chrome acceptance both pass.

## Static candidate

| Item | Value |
|---|---|
| Archive | `D:\ChatGPT\kunlun-growth-ai\releases\kunlun-growth-ai-0.2.0-static.zip` |
| SHA sidecar | `D:\ChatGPT\kunlun-growth-ai\releases\kunlun-growth-ai-0.2.0-static.zip.sha256` |
| SHA-256 | `d50141c04140a7dc28c449b3ce9ebdf6325367199c80eac12d0d69680c24756c` |

The archive hash was recomputed independently with `Get-FileHash` and matched the sidecar. Extraction was verified from a new system-temporary directory. Host command policy blocked automated recursive cleanup of that scratch directory; it is outside the repository and is not part of the release.

## Skill package parity

Package-level owner handoff, independent review, embedded verification, negative tests, deterministic double packaging, source/ZIP parity, and release-manifest hash checks all passed. Market-validation claims remain explicitly separate from technical package readiness.

| Package | Bytes | SHA-256 |
|---|---:|---|
| `product-material-agent-1.0.0.zip` | 29,725 | `765B021731700FBFCE90BA74C667840DE535079314CDE4E497D9CFBDC17BE188` |
| `crossborder-listing-localization-1.0.0.zip` | 33,093 | `E4108CC45AB6F4A9C0F2D9466313DEAA3E01290BA7BF7FAEA1D796EA56FF7363` |
| `product-media-qa-1.0.0.zip` | 51,191 | `A109DC6852EC06761313A4B35B06953626962A47A756878E4E1C089ED537EB9C` |

Machine-readable package evidence is in `products/release-manifest.json`; the review narrative is in `operations/release-audit-2026-08-26.md`.

## Locally closed risks

- Public routes build and hydrate with Supabase, analytics, forms, and contact email unset.
- Contact unavailable state explicitly says nothing was sent; submission is visibly disabled.
- Provider failure does not clear fields or claim success.
- Canonical, Open Graph URL, robots sitemap, and sitemap entries use the same normalized `NEXT_PUBLIC_SITE_URL` origin helper and are covered by tests.
- Empty analytics token produces no beacon script.
- Software dependencies report no known npm audit vulnerabilities.
- MIT software license, third-party notice, content-license boundary, configuration example, architecture, flows, permissions, variables, tests, SEO, automation, deployment, operations, rollback, incident handling, and go-live checklist are present.

No locally solvable P0 or P1 remains in this candidate.

## External state — not release proof

| Item | State | Evidence boundary |
|---|---|---|
| Existing Vercel production alias | Existing deployment `dpl_AJuxF4XiBMFACg9ypWiPeCZLS4dc` was observed Ready at `https://kunlun-growth-ai.vercel.app` | This does not map a Git commit to an automatic deployment |
| GitHub App authorization for `MarshallPD/kunlun-growth-ai` | `EXTERNAL/NOT_RUN` | Requires the repository-owner GitHub login |
| Push → Vercel deployment | `EXTERNAL/NOT_RUN` | No pushed candidate SHA and new deployment record were produced in this run |
| Custom domain / DNS / certificate | `EXTERNAL/NOT_RUN` | No owned domain was changed or verified |
| Production Formspree endpoint and mailbox receipt | `EXTERNAL/NOT_RUN` | Only local empty/failure modes were tested |
| Cloudflare analytics dashboard | `EXTERNAL/NOT_RUN` | Empty-token kill switch verified locally; no real token configured |
| Supabase OTP and redirect allowlist | `EXTERNAL/NOT_RUN` | Optional auth remains unconfigured |

The only GitHub/Vercel action to take before testing push automation is to sign in to GitHub as `MarshallPD` and authorize Vercel for only `MarshallPD/kunlun-growth-ai`. Do not call the repository deployed from Git until a pushed commit SHA is linked to a new Ready deployment ID.
