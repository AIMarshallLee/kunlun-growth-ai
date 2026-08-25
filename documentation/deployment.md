# Deployment and external configuration

## Known local bindings

| Item | Value | Verification state |
|---|---|---|
| Git remote | `https://github.com/MarshallPD/kunlun-growth-ai.git` | Local git config verified |
| Local branch/base SHA | `main` / recorded in release evidence | Local only; worktree contains uncommitted release changes |
| Vercel team | `daseanles-projects` | `.vercel/project.json` |
| Vercel project | `kunlun-growth-ai` | `.vercel/project.json` |
| Vercel project ID | `prj_NgbW4ELFOZt5phWNrgZ1rAmpQ6XY` | `.vercel/project.json` |
| Vercel org ID | `team_10nIXrBPnAYvODQZ5kuIB9dk` | `.vercel/project.json` |
| Production alias | `https://kunlun-growth-ai.vercel.app` | Existing direct deployment, not proof of Git automation |
| GitHub App authorization | Only `MarshallPD/kunlun-growth-ai` is allowed | `EXTERNAL/NOT_RUN`; current browser session is not the repository owner |
| Push → deployment | Commit SHA must map to a new Vercel deployment | `EXTERNAL/NOT_RUN` |
| Custom domain and DNS | Owned apex/subdomain | `EXTERNAL/NOT_RUN` |

## Reproducible local release

Use Node 20.9 or newer. On Windows PowerShell:

```powershell
cd D:\ChatGPT\kunlun-growth-ai
npm.cmd ci
npm.cmd audit --json
npm.cmd test
npx.cmd tsc --noEmit
npm.cmd run lint
npm.cmd run build
npm.cmd run test:browser
npm.cmd run package:static
```

`next build` produces both Next build data and the portable `out/` export. Vercel must keep `framework: nextjs` and `outputDirectory: .next`; changing the Vercel Output Directory to `out` recreates the earlier missing `routes-manifest.json` failure. Generic static hosts may publish `out/`, but must preserve Next's generated clean-URL and RSC-prefetch routing. Run `npm run test:browser` against the generated export before upload, then repeat a browser smoke test on the chosen host.

## Environment configuration

Copy `.env.example` to `.env.local` for local testing. In Vercel, set the same public variables in Project Settings → Environment Variables, then rebuild. All values are bundled into public assets.

Minimum owned-domain launch setting:

```text
NEXT_PUBLIC_SITE_URL=https://your-owned-domain.example
```

Optional settings:

```text
NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN=
NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/your-form-id
NEXT_PUBLIC_CONTACT_EMAIL=hello@example.com
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

Never use a Supabase service-role key or any private provider token.

## GitHub and Vercel connection

One manual external action remains:

> Sign in to GitHub as `MarshallPD`, keep the current Vercel GitHub App page open, and install/configure the app for **only** `MarshallPD/kunlun-growth-ai`.

After that single action, run:

```powershell
cd D:\ChatGPT\kunlun-growth-ai
npx.cmd vercel@latest git connect https://github.com/MarshallPD/kunlun-growth-ai.git --scope daseanles-projects
```

Set production branch to `main`. To prove automation:

1. Record the commit SHA before push: `git rev-parse HEAD`.
2. Push that commit to `origin/main`.
3. Record the new Vercel deployment ID and creation time.
4. Confirm its source commit equals the pushed SHA and status is Ready.
5. Confirm `https://kunlun-growth-ai.vercel.app` resolves to that deployment.

Until all five records exist, status remains `EXTERNAL/NOT_RUN`. A direct CLI deployment is not equivalent evidence.

Manual direct-deployment fallback:

```powershell
npx.cmd vercel@latest --prod --yes --scope daseanles-projects
```

## Domain and DNS

1. Add the final domain in Vercel Project Settings → Domains.
2. Use the exact DNS records Vercel shows; do not infer apex or CNAME targets from old screenshots.
3. Choose one canonical host (apex or `www`) and configure the other to redirect.
4. Set `NEXT_PUBLIC_SITE_URL` to the canonical HTTPS host and rebuild.
5. Verify certificate validity, HTTP→HTTPS, apex/www redirect, canonical tags, robots, and sitemap on the live domain.

State: `EXTERNAL/NOT_RUN`.

## Formspree

1. Create a form in the operating Formspree account.
2. Configure and verify the recipient mailbox, spam controls, retention, and allowed origin if used.
3. Put only the public `https://formspree.io/f/...` endpoint in `NEXT_PUBLIC_FORMSPREE_ENDPOINT`.
4. Submit one synthetic contact and one synthetic work; verify both in the dashboard.
5. Force a failed request and verify the UI retains entered values and reports failure.

Without the endpoint, contact uses the configured mailto fallback and submission is visibly disabled. State for real provider delivery: `EXTERNAL/NOT_RUN`.

## Cloudflare Web Analytics

1. Complete the applicable privacy/consent review.
2. Create or select the owned Web Analytics site.
3. Set its public token and rebuild.
4. Confirm the beacon appears only after configuration and the owned dashboard receives a synthetic visit.
5. Remove the token and rebuild to confirm the kill switch.

State: `EXTERNAL/NOT_RUN`.

## Optional Supabase OTP

Configure Supabase only if identity is intentionally exposed. Add the final site URL and `/tutorials` redirect to the project's auth URL allowlist, then set the public URL and publishable key. This release creates a session only; it has no schema, RLS, protected pages, or cloud tutorial progress.

State: `EXTERNAL/NOT_RUN`.
