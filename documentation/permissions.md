# Permissions

## Roles and claims

| Role | Source | Current capability |
|---|---|---|
| Anonymous visitor | No token | Read all public pages; use local tools; submit configured public forms |
| Supabase-authenticated visitor | Supabase browser session | Same capabilities as anonymous; no protected resource exists |
| Repository maintainer | GitHub repository permission | Change code/content and initiate a release outside the app |
| Vercel project member | Vercel account/team permission | Configure environment, domains, deployments, and rollback outside the app |
| External provider operator | Formspree/Cloudflare/Supabase account permission | Configure and inspect that provider outside the app |

Application scope is not derived from a database. The optional Supabase token is not consulted by any authorization decision.

## Resource and operation matrix

| Resource / operation | Anonymous | Authenticated visitor | Maintainer/operator |
|---|---:|---:|---:|
| Read tutorials, cases, Skills, projects, works | Allow | Allow | Allow |
| Store tutorial progress in own browser | Allow | Allow | Not applicable |
| Generate/copy opportunity card in own browser | Allow | Allow | Not applicable |
| Send configured contact form | Allow with explicit submit | Allow with explicit submit | Provider can view received data |
| Send configured public submission | Allow with explicit submit | Allow with explicit submit | Provider can view; maintainer reviews manually |
| Publish or edit site content | Deny | Deny | Git repository permission required |
| Configure domain/environment/deployment | Deny | Deny | External hosting permission required |
| Access provider dashboards or retained form data | Deny | Deny | External provider permission required |

## Database and row-level security

There is no application database schema or data table in this release. No row-level security policy exists or is claimed. The repository has Supabase client dependencies for optional email OTP only; it does not include the previously described migration or cloud progress tables.

If cloud progress, private projects, or moderation queues are added, they require a separate schema, RLS matrix, negative authorization tests, data retention policy, and server-side privileged boundary before release.
