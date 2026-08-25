# Automation

## Runtime automation inventory

The application contains no embedded AI agent, LLM workflow, tool-calling path, webhook receiver, scheduled job, automatic publication, payment automation, or autonomous business action. AI appears in content and downloadable Skill packages, not as a runtime actor on the website.

## Static build and Vercel deployment

| Property | Value |
|---|---|
| Trigger | Intended: push to `main`; current verified trigger: manual local commands only |
| Owner | Repository maintainer and Vercel project member |
| Automatic | Intended after GitHub App connection; `EXTERNAL/NOT_RUN` |
| Inputs | Repository commit and public build variables |
| Tools/APIs | GitHub repository read by Vercel; Vercel build and deployment APIs |
| Output contract | Next build exits zero, static routes generated, Vercel deployment becomes Ready and records source commit |
| App-owned side effects | None at runtime; build produces static files |
| External side effects | Vercel creates deployment/alias; GitHub records commit |
| Approval gate | Maintainer push/merge and external GitHub App installation |
| Logging | Git commit history and Vercel deployment/build logs |
| Retry | Manual retry or redeploy; no hidden infinite retry loop |
| Kill switch | Disconnect Git integration or disable production branch in Vercel |

Hard guardrails live in code/config, not prompts: pinned dependencies, static export, public-variable boundary, Formspree allowlist, tests, and build exit status. There is no steering prompt.

## Analytics beacon

Cloudflare Web Analytics is a configured external script, not an agent. It loads only when the public token is non-empty. The operator disables it by removing the variable and rebuilding. Provider-side retention and collection controls live in the owned Cloudflare account.

## Form delivery

Formspree submission occurs only after an explicit user action. There is no background retry, automatic publication, or follow-up email owned by this app. A non-2xx response is returned to the user as an error; the operator can disable the path by removing the endpoint and rebuilding.
