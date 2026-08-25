# SEO

## Rendering and preview approach

All indexable pages are prerendered as static HTML. `lib/site-config.ts` provides the normalized site origin, canonical metadata helper, public route inventory, robots values, and sitemap entries. Page metadata also supplies Open Graph title, description, URL, site name, and locale.

`NEXT_PUBLIC_SITE_URL` is the configured origin. An empty or invalid value safely falls back to `https://kunlun-growth-ai.vercel.app`; owned-domain launch requires overriding it and rebuilding.

## Route policy

| Route family | Index | Data allowed in metadata | Canonical source |
|---|---:|---|---|
| `/` and `/about` | Yes | Repository editorial text | `buildPageMetadata` |
| `/tutorials` and `/tutorials/[slug]` | Yes | Repository tutorial title/summary only | `buildPageMetadata` |
| `/cases` and `/cases/[slug]` | Yes | Repository case title/summary only | `buildPageMetadata` |
| `/skills` and `/skills/[slug]` | Yes | Repository product title/summary only | `buildPageMetadata` |
| `/works`, `/projects`, `/challenges` | Yes | Repository editorial text | `buildPageMetadata` |
| `/tools/product-opportunity-card` | Yes | Static tool description; never the user's draft | `buildPageMetadata` |
| `/contact`, `/login`, `/submit` | No | Static utility copy only | Route layouts set `noindex, nofollow`; excluded from sitemap |

## Dynamic metadata safety

Dynamic values come from repository-controlled files, not URL query strings or user submissions. Tutorial `titleHtml` is converted to plain text by stripping tags before it becomes a metadata title. User-entered opportunity-card and form content is never included in metadata or sitemap output.

## Bot and human routing

Bots and humans receive the same exported HTML. There is no user-agent rewrite, cloaking, edge metadata service, or dynamic bot route.

## Release checks

- `out/robots.txt` references exactly the configured sitemap origin.
- Every URL in `out/sitemap.xml` shares that origin and maps to a generated local HTML page.
- Every indexable generated HTML file contains the expected canonical origin.
- Utility forms contain robots noindex metadata and are absent from the sitemap.
- The final HTTPS domain, redirect policy, and `NEXT_PUBLIC_SITE_URL` are checked together after DNS configuration.
