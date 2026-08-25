# Load-bearing flows

## Public content load

- Actor: anonymous visitor or search bot.
- Precondition: static host can serve exported files.
- Success: requested public page renders with canonical metadata and source boundaries.

Sequence:

1. Host serves generated HTML, CSS, and JavaScript. No auth check is expected.
2. Repository-controlled data is already embedded in the static output. No runtime database read occurs.
3. Client components hydrate copy, filters, progress, and form behavior.

Trust crossing: repository → build → public browser. Deny case: a route not generated at build returns the static 404 page.

## Tutorial progress

- Actor: anonymous or Supabase-authenticated visitor.
- Precondition: tutorial page is open.
- Success: checked steps persist in the same browser when storage is available.

Sequence:

1. Browser reads `kunlun-guide-<tutorial.short>` from local storage.
2. `parseCompletedSteps` accepts only unique integer step numbers within the tutorial length.
3. A checkbox changes React state and attempts to write the normalized list.
4. If local storage is corrupt, blocked, or full, the tutorial still works with in-memory state.

No server, provider, or cross-device write occurs. Auth does not change the outcome.

## Contact or purchase inquiry

- Actor: visitor who explicitly submits the contact form.
- Precondition: required browser fields are valid.
- Success: Formspree acknowledges the request, or the user's email client opens a draft that the user sends.

Sequence and checks:

1. UI collects identity, email, product context, region, tool, scenario, consent, and no credentials.
2. `getFormMode("contact", ...)` checks configuration.
3. Formspree mode: the browser validates an HTTPS `formspree.io/f/...` endpoint and POSTs FormData.
4. A 2xx response shows sent. A non-2xx or network failure shows a retryable error and leaves fields in the page.
5. Mailto mode: the browser constructs an encoded draft. The UI states that opening a draft is not delivery.
6. Disabled mode: the UI states no data was sent.

Trust crossing: browser → Formspree or browser → local email client. There is no app-owned queue, database record, or delivery retry.

## Public submission

- Actor: visitor submitting a work, project, or resource request.
- Precondition: Formspree is configured and required fields plus rights confirmation are valid.
- Success: Formspree returns 2xx and the UI shows that the item entered human review.

Authorization and deny cases:

- There is no authenticated-only rule; the form is public when configured.
- Without Formspree, the fieldset and submit button are disabled before submission and the page explicitly says the channel is off.
- On provider failure, no success message is shown and entered fields remain available for retry.

Trust crossing: browser → Formspree. The submission is not automatically published and creates no local repository change.

## Optional email OTP session

- Actor: visitor entering an email on `/login`.
- Precondition: both Supabase public values are present.
- Success: Supabase accepts the OTP request and the browser later receives a session after redirect.

Checks and deny cases:

- Missing configuration denies the network action with an explanatory message.
- Supabase, not this static site, validates the email link and session.
- Session presence grants no protected resource and does not persist progress in this release.

Trust crossing: browser → Supabase. Side effects: Supabase may send an email and store authentication records under the operator's account.

## Git push to deployment

- Actor: repository maintainer.
- Precondition: Vercel GitHub App is installed only for `MarshallPD/kunlun-growth-ai`, project is connected, and production branch is `main`.
- Success: a pushed commit produces a new Vercel deployment tied to the same commit SHA.

This flow is `EXTERNAL/NOT_RUN`. Direct CLI deployment records do not prove it. Verification requires recording the pushed SHA, Vercel deployment ID, deployment timestamp, and production alias after the push.
