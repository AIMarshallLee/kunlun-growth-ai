# Variables and secrets

All configured variables in this static release use the `NEXT_PUBLIC_` prefix and are intentionally visible in generated browser assets. None is a secret.

| Name | Used by | Scope | Source | Rotation | Risk |
|---|---|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | canonical, robots, sitemap | Build/client-visible | Owned production origin | Change when canonical domain changes; rebuild | Wrong value creates incorrect SEO ownership |
| `NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN` | Cloudflare beacon | Client-visible | Cloudflare Web Analytics site | Rotate/remove in Cloudflare; rebuild | Enables external analytics collection; consent decision required |
| `NEXT_PUBLIC_FORMSPREE_ENDPOINT` | contact and submission forms | Client-visible | Formspree form endpoint | Replace/disable in Formspree; rebuild | Receives contact PII and public submission data; spam/retention controls required |
| `NEXT_PUBLIC_CONTACT_EMAIL` | contact mailto fallback | Client-visible | Operator mailbox | Replace mailbox; rebuild | Public address may receive spam; draft is not confirmed delivery |
| `NEXT_PUBLIC_SUPABASE_URL` | browser auth client | Client-visible | Supabase project settings | Change project; rebuild | Sends login traffic to configured project |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | browser auth client | Client-visible | Supabase project settings | Rotate in Supabase; rebuild | Must remain publishable/anon only; never use service role |

## Secret confirmation

- No server-only secret is required to build or serve the public site.
- No Supabase service-role key, GitHub token, Vercel token, Formspree account credential, Cloudflare API token, payment credential, or customer secret may be stored in these variables.
- `.env.local`, provider exports, and token files are git-ignored and must not appear in `out/` or release archives.

## Pre-go-live variable checklist

- Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS origin with no path.
- Leave analytics empty until privacy/consent review is complete.
- Create a Formspree form owned by the operating account, configure recipients and spam controls, then set its public `/f/` endpoint.
- Set a monitored contact address if mailto fallback is desired.
- Leave Supabase empty unless email OTP is intentionally offered; configuring it does not enable cloud progress.
- Build again after every variable change because static values are embedded at build time.
- Search the generated `out/` and archive for common credential patterns before release.
