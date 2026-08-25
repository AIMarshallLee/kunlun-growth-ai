# Operations

## Backups

The source of truth is the Git repository plus external provider configuration.

- Before each production release, preserve the tested commit SHA and versioned archive with its SHA-256 sidecar.
- Keep `data/`, `products/`, `operations/`, `documentation/`, and source links in Git history.
- Record Vercel environment variable names, domain settings, and deployment ID without copying tokens into the repository.
- Record Formspree recipients/retention settings, Cloudflare site ID, and Supabase redirect allowlist in the operator's secure runbook.
- Test archive extraction into a temporary directory and serve the extracted files before treating it as a backup.

Do not treat the generated `out/` directory alone as a source backup; it cannot safely reconstruct maintainable source files.

## Dependency and framework upgrades

1. Work in an isolated branch/worktree when the current working tree is clean.
2. Run the full baseline gates and save output.
3. Inspect `npm outdated` and `npm audit --json`.
4. Upgrade one dependency group at a time; framework and matching lint config move together.
5. Run tests, type checking, lint, production build, generated links, and browser acceptance.
6. Inspect generated route count, robots, sitemap, canonical tags, and release archive hash.
7. Deploy to preview and repeat critical browser flows before production.

Next.js 16 requires Node 20.9 or newer. The static release currently pins Next.js and `eslint-config-next` to 16.3.3 because the previous version carried high-severity transitive advisories.

## Rollback

### Vercel

1. Identify the last known-good deployment ID and its commit SHA.
2. Promote/redeploy that exact deployment from Vercel; do not guess from an alias timestamp.
3. Confirm the production alias, canonical, robots, sitemap, and critical pages.
4. Revert the bad source commit with `git revert`; do not use `git reset --hard` on a shared branch.

### Generic static host

1. Verify the stored `.sha256` against the last known-good ZIP.
2. Extract into a new release directory, not over the active files.
3. Switch the host's release pointer or upload atomically.
4. Keep the failed release for investigation until incident closure.

### Configuration rollback

- Remove the analytics token and rebuild to stop the beacon.
- Remove the Formspree endpoint and rebuild to disable public submission and restore contact mailto/unavailable mode.
- Remove Supabase values and rebuild to return login to explicit unavailable mode.
- Restore the previous `NEXT_PUBLIC_SITE_URL` only if DNS/canonical ownership also matches it.

## Incident handling

| Incident | Immediate containment | Evidence to preserve | Recovery |
|---|---|---|---|
| Unauthorized/incorrect content | Redeploy last known-good artifact; remove page from source | Bad URL, source commit, screenshots, access logs | Correct source, review attribution/license, full gate |
| Form spam or PII concern | Disable Formspree endpoint and rebuild; restrict provider form | Provider event IDs, timestamps, settings | Adjust retention/spam controls and privacy notice before re-enable |
| Analytics/privacy concern | Remove analytics token and rebuild | Deployed commit, beacon requests, provider settings | Complete consent/legal review before re-enable |
| Broken deployment | Promote known-good Vercel deployment | Build logs, deployment IDs, commit SHAs | Fix in source and preview-test |
| Canonical/DNS mismatch | Stop further DNS edits; restore known-good records | DNS responses, certificate, current environment value | Align DNS, domain redirect, and site URL, then rebuild |
| Suspected secret in repository/artifact | Revoke/rotate externally first; remove from source and history using approved process | Secret type and affected commits without copying value | Rebuild from clean history and scan artifact |

## Routine release watch

- Review `npm audit` and dependency advisories before each release.
- Check original links and source boundaries when editing tutorial/case content.
- Check Formspree delivery and recipient ownership after provider changes.
- Monitor 404s and broken external links without copying private request data into public logs.
- Keep the production alias, custom domain, and canonical origin aligned.
