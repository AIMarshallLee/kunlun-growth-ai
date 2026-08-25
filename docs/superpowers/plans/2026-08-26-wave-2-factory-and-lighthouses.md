# Wave 2 Product Factory and Lighthouse Skills Implementation Plan

> **For Codex:** Execute this plan task by task. Use test-driven development for every behavior change, keep the existing three 1.0.0 product packages read-only, and run the named verification command after every task.

**Goal:** Build a zero-runtime-dependency product factory, register all eight Wave 2 product candidates, and ship two independently installable 1.0.0 lighthouse Skill ZIPs without changing the three frozen 1.0.0 products or their release manifest.

**Architecture:** `D:\ChatGPT\agent` remains a read-only research source. This repository receives one sanitized evidence manifest, validates declarative product definitions, scaffolds only common package structure, and verifies product-authored domain contracts. A dedicated Wave 2 packer creates deterministic ZIPs and a separate release manifest; existing packages and `scripts/package-skills.ps1` remain untouched.

**Tech Stack:** Node.js standard library, Node test runner, PowerShell `System.IO.Compression`, Markdown, JSON, existing npm lint/TypeScript/Next.js build commands.

**Approved design:** `docs/superpowers/specs/2026-08-26-wave-2-product-factory-design.md`

## Execution boundaries

- This plan implements Wave A only: the factory, eight validated candidate definitions, `product-fact-normalizer`, and `community-qa-drafter`.
- The other six products remain definitions, not delivery ZIPs. Their product-specific implementation gets a new plan only after the factory interface passes both lighthouse packages.
- Do not edit `products/product-material-agent/`, `products/crossborder-listing-localization/`, `products/product-media-qa/`, `products/release-manifest.json`, or `scripts/package-skills.ps1`.
- Do not edit site pages, browser E2E, operations files, `.env*`, or any file under `D:\ChatGPT\agent`.
- Use Node standard-library code inside product ZIPs. No package manager installation may be required after installation.
- Development source manifests start at `0.1.0 / draft / awaiting / internal`. Promote a lighthouse to `1.0.0 / package_ready / awaiting / internal` only in Task 10 after its complete gate passes.
- Package status never implies market validation. Real interviews, payment, first-run success, support cost, and case permission remain an external operating gate.

## Stable public interfaces

Create and preserve these interfaces for the six later products:

```js
// product-factory/lib/definition.mjs
export function assertSafeSlug(slug) {}
export function validateProductDefinition(value) {}
export async function loadProductDefinition(definitionPath) {}

// product-factory/lib/scaffold.mjs
export async function createSkillScaffold(definition, destination, options = {}) {}

// product-factory/lib/check-wave-2-package.mjs
export async function checkWave2SkillPackage(packageDirectory) {}

// product-factory/lib/evaluate-contract-case.mjs
export function evaluateContractCase(manifest, testCase) {}
```

`validateProductDefinition` and `loadProductDefinition` return a normalized plain object or throw an `Error`. `createSkillScaffold` returns the sorted list of files it created, refuses an existing destination, stages work under the destination parent, and cleans the staging directory after any failure. `checkWave2SkillPackage` returns the absolute package root or throws. `evaluateContractCase` returns a deterministic result object and performs no network or filesystem mutation.

## Common product definition contract

Every definition uses this exact top-level shape:

```json
{
  "schemaVersion": 1,
  "slug": "product-fact-normalizer",
  "name": "Product Fact Normalizer",
  "category": "ecommerce",
  "version": "0.1.0",
  "packageStatus": "draft",
  "marketValidationStatus": "awaiting",
  "publicStatus": "internal",
  "compatibleHosts": ["Codex", "WorkBuddy", "SKILL.md-compatible hosts"],
  "evidenceLevels": ["authorized", "observed", "unverified", "unknown"],
  "resultStates": ["pass", "fail", "not_evaluable", "review"],
  "requiredReviewerFields": ["reviewers.factReviewer", "reviewers.releaseDecisionOwner"],
  "outputs": ["source-ledger.json", "normalized-facts.json", "conflicts.json", "gaps.json", "review-checklist.md", "delivery-manifest.json"],
  "sourceEvidence": ["wave2-e01"],
  "domainRules": ["conflict_blocks_release", "weak_evidence_cannot_approve_fact", "provenance_required", "no_external_actions"],
  "nonGoals": ["network access", "credential storage", "automatic publishing", "guaranteed business outcomes"]
}
```

Allowed categories are `ecommerce` and `education`. Allowed package states are `draft`, `package_ready`, `released`, and `withdrawn`. Allowed market states are `awaiting`, `pilot`, `validated`, and `rejected`. Allowed public states are `internal`, `waitlist`, `available`, and `paused`.

---

### Task 1: Pin the frozen baseline and Wave A scope

**Files:**

- Create: `product-factory/frozen-baseline.json`
- Create: `tests/wave-2-baseline.test.mjs`
- Modify: `package.json`

**Step 1: Write the failing baseline test**

Create `tests/wave-2-baseline.test.mjs` with a test that reads `product-factory/frozen-baseline.json`, `products/release-manifest.json`, and `scripts/package-skills.ps1`. It must assert:

```js
const expected = new Map([
  ["product-material-agent", "765B021731700FBFCE90BA74C667840DE535079314CDE4E497D9CFBDC17BE188"],
  ["crossborder-listing-localization", "E4108CC45AB6F4A9C0F2D9466313DEAA3E01290BA7BF7FAEA1D796EA56FF7363"],
  ["product-media-qa", "A109DC6852EC06761313A4B35B06953626962A47A756878E4E1C089ED537EB9C"],
]);
assert.deepEqual(release.products.map((item) => item.slug), [...expected.keys()]);
for (const item of release.products) assert.equal(item.sha256, expected.get(item.slug));
assert.doesNotMatch(packScript, /product-fact-normalizer|community-qa-drafter/);
```

The same test must assert that the baseline declares only two Wave A build targets and all eight candidate slugs:

```js
assert.deepEqual(baseline.waveABuildTargets, ["product-fact-normalizer", "community-qa-drafter"]);
assert.equal(new Set(baseline.wave2CandidateDefinitions).size, 8);
```

**Step 2: Run the test to prove it fails**

Run: `node --test tests/wave-2-baseline.test.mjs`

Expected: FAIL because `product-factory/frozen-baseline.json` does not exist.

**Step 3: Add the frozen baseline**

Create `product-factory/frozen-baseline.json` with `schemaVersion: 1`, the three frozen ZIP names and exact SHA-256 values above, these Wave A targets, and these eight candidate slugs:

```json
[
  "product-fact-normalizer",
  "variant-spec-consistency",
  "presales-support-drafter",
  "review-question-insights",
  "course-outline-lesson-plan",
  "assignment-rubric-builder",
  "community-qa-drafter",
  "next-step-learning-coach"
]
```

Add scripts to `package.json` without changing existing script values:

```json
"test:wave2": "node --test tests/wave-2-*.test.mjs",
"package:wave2": "powershell -NoProfile -ExecutionPolicy Bypass -File scripts/package-wave-2-skills.ps1"
```

**Step 4: Verify the baseline**

Run: `node --test tests/wave-2-baseline.test.mjs`

Expected: PASS; old release manifest has exactly three pinned entries and the old packer contains no Wave 2 slug.

**Step 5: Commit checkpoint**

Do not commit automatically in the shared dirty worktree. Record the changed file list and continue. If the repository owner later requests commits, use: `git add product-factory/frozen-baseline.json tests/wave-2-baseline.test.mjs package.json && git commit -m "test: pin wave 2 product scope"`.

---

### Task 2: Validate product definitions without third-party runtime dependencies

**Files:**

- Create: `product-factory/schemas/product-definition.schema.json`
- Create: `product-factory/lib/definition.mjs`
- Create: `scripts/check-product-definition.mjs`
- Create: `tests/wave-2-definition.test.mjs`

**Step 1: Write failing validation tests**

Cover one valid object plus failures for missing output, unknown enum, duplicate array member, unsafe slug, absolute source path, and unrecognized key:

```js
assert.equal(validateProductDefinition(valid).slug, "product-fact-normalizer");
assert.throws(() => validateProductDefinition({ ...valid, slug: "../escape" }), /safe lowercase slug/i);
assert.throws(() => validateProductDefinition({ ...valid, outputs: [] }), /outputs/i);
assert.throws(() => validateProductDefinition({ ...valid, publicStatus: "published" }), /publicStatus/i);
assert.throws(() => validateProductDefinition({ ...valid, outputs: ["gaps.json", "gaps.json"] }), /duplicate/i);
assert.throws(() => validateProductDefinition({ ...valid, unknownKey: true }), /unknownKey/i);
```

Also verify `loadProductDefinition` rejects malformed JSON and the CLI exits non-zero for an invalid file.

**Step 2: Run the test to prove it fails**

Run: `node --test tests/wave-2-definition.test.mjs`

Expected: FAIL because the validator module does not exist.

**Step 3: Create the descriptive JSON Schema**

`product-definition.schema.json` must set `additionalProperties: false`, declare every field in the common contract as required, apply `^[a-z0-9]+(?:-[a-z0-9]+)*$` to `slug`, and set `minItems: 1` plus `uniqueItems: true` on every array. The schema documents the contract; runtime enforcement is implemented in the standard-library module so installed tooling requires no schema package.

**Step 4: Implement the runtime validator**

Use explicit allowed-key and enum sets. Normalize only by copying values; do not silently repair definitions:

```js
export function assertSafeSlug(slug) {
  if (typeof slug !== "string" || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error("slug must be a safe lowercase slug");
  }
}

function assertUniqueStrings(value, field) {
  if (!Array.isArray(value) || value.length === 0 || value.some((item) => typeof item !== "string" || !item.trim())) {
    throw new Error(`${field} must contain non-empty strings`);
  }
  if (new Set(value).size !== value.length) throw new Error(`${field} contains a duplicate value`);
}
```

Reject any output containing `..`, `\\`, a drive prefix, or a leading slash. Require version `0.x.y` while package status is `draft`; allow semantic versions for later states. `loadProductDefinition` reads UTF-8 JSON and wraps parse errors with the file path.

**Step 5: Add the CLI**

`scripts/check-product-definition.mjs` accepts exactly one path, calls `loadProductDefinition`, prints `PASS: <slug> <version>`, and sets a non-zero exit on error by allowing the thrown error to reach Node.

**Step 6: Verify validation**

Run: `node --test tests/wave-2-definition.test.mjs`

Expected: PASS for the valid object; every unsafe or ambiguous definition fails with the asserted message.

---

### Task 3: Build an atomic, non-overwriting scaffold generator

**Files:**

- Create: `product-factory/shared/package-root-files.json`
- Create: `product-factory/shared/security-boundaries.md`
- Create: `product-factory/shared/reviewer-contract.md`
- Create: `product-factory/shared/release-gates.json`
- Create: `product-factory/templates/README.md.template`
- Create: `product-factory/templates/config.example.json.template`
- Create: `product-factory/templates/manifest.json.template`
- Create: `product-factory/lib/scaffold.mjs`
- Create: `scripts/create-skill-package.mjs`
- Create: `tests/wave-2-scaffold.test.mjs`

**Step 1: Write failing filesystem-safety tests**

Use `mkdtemp` and cover deterministic output, refusal to overwrite an existing directory, cleanup after a forced template error, and containment under the requested parent:

```js
const files = await createSkillScaffold(definition, destination, { templateRoot });
assert.deepEqual(files, [...files].sort());
await assert.rejects(() => createSkillScaffold(definition, destination, { templateRoot }), /already exists/i);
assert.equal((await readdir(parent)).some((name) => name.includes(".staging-")), false);
```

**Step 2: Run the test to prove it fails**

Run: `node --test tests/wave-2-scaffold.test.mjs`

Expected: FAIL because the scaffold module does not exist.

**Step 3: Define generated and authored file boundaries**

`package-root-files.json` must list the common root set including `PARTNER-DELIVERY.md`. Mark these product-authored files as non-generatable release content:

```json
[
  "SKILL.md",
  "CONTRACT.md",
  "PARTNER-DELIVERY.md",
  "references/quality-gates.md",
  "examples/public-example.md",
  "tests/contract-cases.json",
  "TEST-REPORT.md"
]
```

The generator may create those files only with an explicit draft banner `PACKAGE_DRAFT_NOT_RELEASEABLE`; the Wave 2 checker must reject that banner.

**Step 4: Implement atomic scaffolding**

Resolve the destination parent, assert `basename(destination) === definition.slug`, create a sibling staging directory with `mkdtemp`, render the common files, then rename staging to destination. On any exception, recursively remove only the verified staging path. Never remove or replace the destination.

The generated `config.example.json` must contain:

```json
{
  "schemaVersion": 1,
  "evidenceMode": "strict",
  "networkAccess": false,
  "externalActions": [],
  "reviewers": {
    "releaseDecisionOwner": "replace-with-auditable-role-id"
  }
}
```

Merge product-specific reviewer fields into `reviewers` with distinct `replace-with-<role>-id` values.

**Step 5: Add the CLI**

`scripts/create-skill-package.mjs <definition.json> <products-directory>` loads the definition and creates exactly `<products-directory>/<slug>`. It must reject more or fewer arguments and print the sorted created-file count on success.

**Step 6: Verify scaffolding**

Run: `node --test tests/wave-2-scaffold.test.mjs`

Expected: PASS; repeat generation is byte-identical in separate directories, overwrite attempts fail, and no staging debris remains.

---

### Task 4: Implement the Wave 2 package checker and self-contained verifier template

**Files:**

- Create: `product-factory/lib/package-files.mjs`
- Create: `product-factory/lib/evaluate-contract-case.mjs`
- Create: `product-factory/lib/check-wave-2-package.mjs`
- Create: `product-factory/templates/verify.mjs`
- Create: `scripts/check-wave-2-package.mjs`
- Create: `tests/wave-2-package-checker.test.mjs`

**Step 1: Write failing checker tests**

Build a complete temporary fixture and mutate one condition at a time. Require rejection for:

- missing `PARTNER-DELIVERY.md`;
- `PACKAGE_DRAFT_NOT_RELEASEABLE` in any release file;
- empty required directory;
- `config.json`, `.env`, `node_modules`, a likely key, or an absolute customer path;
- wrong lifecycle combination, such as `package_ready + validated + internal` with no validation records;
- fewer than 10 cases or missing 5/3/2 case-type counts;
- contract case without provenance, owner, remediation, or retest status;
- undeclared output or unsupported domain rule;
- checksum coverage drift.

Use exact category counts:

```js
assert.deepEqual(countCaseTypes(cases), { contract: 5, forward: 3, adversarial: 2 });
```

**Step 2: Run the test to prove it fails**

Run: `node --test tests/wave-2-package-checker.test.mjs`

Expected: FAIL because the checker does not exist.

**Step 3: Implement shared file and checksum helpers**

`package-files.mjs` exports `listPackageFiles`, `parseChecksums`, `getPath`, and `containsPossibleSecret`. Use forward-slash relative paths, sorted results, no symlink traversal, and the existing secret pattern from `scripts/check-skill-package.mjs`. Also reject text matching a Windows drive absolute path or a customer home path when it appears in distributable examples.

**Step 4: Implement declarative case evaluation**

`evaluateContractCase` validates the case envelope first:

```js
const requiredIssueFields = ["subject", "evidenceLevel", "provenance", "owner", "remediation", "retestStatus"];
const allowedRetest = new Set(["not_started", "ready", "passed", "failed"]);
const allowedResult = new Set(["pass", "fail", "not_evaluable", "review"]);
```

Then apply only declared rules. The initial rule registry contains:

```js
const rules = {
  conflict_blocks_release,
  weak_evidence_cannot_approve_fact,
  provenance_required,
  source_required_for_answer,
  unknown_question_requires_handoff,
  sensitive_question_requires_handoff,
  no_external_actions,
};
```

An unknown rule is a hard failure. The returned object is `{ result, issues, releaseEligible }`; `releaseEligible` is true only when `result === "pass"`, `issues` is empty, and no reviewer approval is pending.

**Step 5: Implement the checker**

Require the common root files/directories, valid manifest/config, exact lifecycle enums, `networkAccessRequired: false`, `runtimeDependencies: []`, `externalActions: []`, at least two compatible hosts, all definition outputs declared, and every reviewer field present in example config. A live `config.json` is permitted during clean-install testing but must differ from all example reviewer values and remains outside checksums.

For a release package require `version === "1.0.0"`, `packageStatus === "package_ready"`, `marketValidationStatus === "awaiting"`, and `publicStatus === "internal"`. The checker must not accept `validated` without a positive integer `marketValidationEvidenceRecords` and a non-empty permission-safe evidence reference list.

**Step 6: Create the installed verifier template**

`product-factory/templates/verify.mjs` must be a standalone copy, importing only `node:*` modules and reading no file outside its own root. It reproduces the release checks, evaluates all contract cases, and prints:

```text
PASS: <slug> <version>; <file-count> files; 10 contract cases
```

It must not import `product-factory/` because that path is absent after installation.

**Step 7: Verify package checking**

Run: `node --test tests/wave-2-package-checker.test.mjs`

Expected: PASS; all mutations fail for the intended reason and a complete temporary package passes both the repository checker and copied verifier.

---

### Task 5: Import sanitized evidence and register all eight candidates

**Files:**

- Create: `product-factory/imported-evidence/wave-2-scenarios.json`
- Create: `product-factory/definitions/product-fact-normalizer.json`
- Create: `product-factory/definitions/variant-spec-consistency.json`
- Create: `product-factory/definitions/presales-support-drafter.json`
- Create: `product-factory/definitions/review-question-insights.json`
- Create: `product-factory/definitions/course-outline-lesson-plan.json`
- Create: `product-factory/definitions/assignment-rubric-builder.json`
- Create: `product-factory/definitions/community-qa-drafter.json`
- Create: `product-factory/definitions/next-step-learning-coach.json`
- Create: `tests/wave-2-registry.test.mjs`

**Step 1: Write the failing registry test**

Assert one-to-one coverage between the baseline candidate list and definition filenames, unique outputs per product, a resolvable source evidence ID, and no private/raw text fields:

```js
assert.deepEqual(definitionSlugs.sort(), baseline.wave2CandidateDefinitions.toSorted());
for (const definition of definitions) {
  validateProductDefinition(definition);
  assert.ok(definition.sourceEvidence.every((id) => evidenceById.has(id)));
}
assert.doesNotMatch(JSON.stringify(evidence), /cookie|api[_-]?key|payment[_-]?record|raw[_-]?post/i);
```

**Step 2: Run the test to prove it fails**

Run: `node --test tests/wave-2-registry.test.mjs`

Expected: FAIL because the evidence manifest and definitions do not exist.

**Step 3: Create the sanitized evidence manifest**

Use eight records with fields: `id`, `scenarioId`, `summary`, `evidenceLevel`, `sourceType`, `sourceReference`, `risks`, `recommendedInputs`, `recommendedOutputs`, `reviewedBy`, and `reviewedOn`. `sourceReference` may point to the local synthesized research file by filename and scenario ID, but must not copy paid content or include a user directory. Set `evidenceLevel` to `observed` only for direct repo/package evidence; otherwise use `unverified` until an authorized reviewer confirms it.

**Step 4: Author all eight definitions**

Use the exact outputs and risks approved in the design. Only the two lighthouses declare a fully implemented `domainRules` set. The other six definitions declare their expected rule identifiers but remain `0.1.0 / draft / awaiting / internal`; they are not added to a release manifest or ZIP target.

For `community-qa-drafter`, use:

```json
"requiredReviewerFields": ["reviewers.knowledgeOwner", "reviewers.safeguardingReviewer", "reviewers.releaseDecisionOwner"],
"domainRules": ["source_required_for_answer", "unknown_question_requires_handoff", "sensitive_question_requires_handoff", "no_external_actions"],
"outputs": ["answer-drafts.json", "source-citations.json", "unknown-items.json", "handoff-queue.json", "knowledge-gaps.json", "run-manifest.json"]
```

**Step 5: Verify registry integrity**

Run: `node --test tests/wave-2-registry.test.mjs`

Expected: PASS; exactly eight unique validated definitions map to sanitized evidence and only two match Wave A build targets.

---

### Task 6: Author Product Fact Normalizer as a complete product

**Files:**

- Create: `products/product-fact-normalizer/SKILL.md`
- Create: `products/product-fact-normalizer/README.md`
- Create: `products/product-fact-normalizer/INSTALL.md`
- Create: `products/product-fact-normalizer/UNINSTALL.md`
- Create: `products/product-fact-normalizer/CHANGELOG.md`
- Create: `products/product-fact-normalizer/LICENSE.md`
- Create: `products/product-fact-normalizer/NOTICE.md`
- Create: `products/product-fact-normalizer/SUPPORT.md`
- Create: `products/product-fact-normalizer/CONTRACT.md`
- Create: `products/product-fact-normalizer/PARTNER-DELIVERY.md`
- Create: `products/product-fact-normalizer/RELEASE-CHECKLIST.md`
- Create: `products/product-fact-normalizer/TEST-REPORT.md`
- Create: `products/product-fact-normalizer/config.example.json`
- Create: `products/product-fact-normalizer/manifest.json`
- Create: `products/product-fact-normalizer/templates/input-brief.md`
- Create: `products/product-fact-normalizer/templates/normalized-facts.schema.json`
- Create: `products/product-fact-normalizer/templates/review-checklist.md`
- Create: `products/product-fact-normalizer/references/quality-gates.md`
- Create: `products/product-fact-normalizer/references/evidence-levels.md`
- Create: `products/product-fact-normalizer/examples/public-example.md`
- Create: `products/product-fact-normalizer/examples/synthetic-input.json`
- Create: `products/product-fact-normalizer/examples/synthetic-expected-output.json`
- Create: `products/product-fact-normalizer/tests/contract-cases.json`

**Step 1: Write the ten product cases first**

Author exactly 5 `contract`, 3 `forward`, and 2 `adversarial` cases. The case envelope is:

```json
{
  "id": "pfn-contract-conflict-01",
  "type": "contract",
  "input": {
    "facts": [
      {"field": "material", "value": "cotton", "evidenceLevel": "authorized", "provenance": "supplier-sheet-row-4"},
      {"field": "material", "value": "polyester", "evidenceLevel": "observed", "provenance": "care-label-image-1"}
    ],
    "requestedExternalActions": []
  },
  "expected": {
    "result": "fail",
    "releaseEligible": false,
    "issues": [{"subject": "material", "evidenceLevel": "authorized", "provenance": "supplier-sheet-row-4 + care-label-image-1", "owner": "factReviewer", "remediation": "resolve the source conflict", "retestStatus": "not_started"}]
  },
  "reason": "Conflicting product facts must block release."
}
```

Required scenarios: clean authorized facts, missing required field, conflicting facts, weak evidence approval attempt, external action request, multi-source merge, empty image observations, packaging/unit normalization, prompt injection asking to invent certification, and embedded likely credential.

**Step 2: Run the checker to prove content is incomplete**

Run: `node scripts/check-wave-2-package.mjs products/product-fact-normalizer`

Expected: FAIL until the full root contract, manifest, verifier, checksums, and content exist.

**Step 3: Author product-specific contracts and templates**

`SKILL.md` triggers when a user supplies product facts or source materials and needs a normalized fact ledger. It must explicitly stop on missing authorization, conflict, unknown evidence, credentials, or a request to publish/send.

`CONTRACT.md` defines six outputs exactly as the definition does. `normalized-facts.json` may mark a fact `approved` only with `authorized` or appropriate `observed` evidence and non-empty provenance. `unverified` and `unknown` always remain unresolved. Every unresolved record carries `owner`, `remediation`, and `retestStatus`.

`PARTNER-DELIVERY.md` specifies the customer preflight, reviewer assignment, first run, fact review, delivery, support capture, rollback, and prohibited promises. State that the package does not grant resale, white-label, or automatic publishing rights.

Use the repository's existing commercial license and notice wording exactly, changing only the product name where the existing text requires it. Do not alter the old product license files.

**Step 4: Author a public synthetic example**

Use a fictional travel organizer with authorized dimensions, observed pockets, an unresolved material conflict, and no brand/customer identity. The expected output must demonstrate partial useful output plus a blocked release decision; do not present synthetic outcomes as customer evidence.

**Step 5: Create the development manifest/config**

Set `version: "0.1.0"`, `packageStatus: "draft"`, `marketValidationStatus: "awaiting"`, `publicStatus: "internal"`, `marketValidationEvidenceRecords: 0`, `networkAccessRequired: false`, and `runtimeDependencies: []`. Include the exact definition outputs/rules and require `factReviewer`, `rightsReviewer`, and `releaseDecisionOwner`.

**Step 6: Verify authored content has no draft banners or secrets**

Run: `rg -n "PACKAGE_DRAFT_NOT_RELEASEABLE|TBD|FIXME|sk-[A-Za-z0-9_-]{10,}|API[_-]?KEY\s*=" products/product-fact-normalizer`

Expected: no output. The adversarial credential case uses a neutral marker such as `CREDENTIAL_REDACTED`, not a key-shaped string.

---

### Task 7: Make Product Fact Normalizer independently verifiable

**Files:**

- Create: `products/product-fact-normalizer/verify.mjs`
- Create: `products/product-fact-normalizer/CHECKSUMS.sha256`
- Create: `tests/wave-2-product-fact-normalizer.test.mjs`
- Modify: `products/product-fact-normalizer/TEST-REPORT.md`

**Step 1: Write failing semantic mutation tests**

Copy the package to a temporary directory, mutate one case, refresh only the mutated file checksum, and assert verifier failure for:

```js
[
  [cases => { cases[0].input.facts[0].provenance = ""; }, /provenance/i],
  [cases => { cases[0].input.facts[0].evidenceLevel = "unknown"; cases[0].expected.releaseEligible = true; }, /evidence|release/i],
  [cases => { cases[0].input.requestedExternalActions = ["publish"]; }, /external action/i],
  [cases => { cases[1].expected.issues[0].owner = ""; }, /owner/i],
]
```

Also assert that the untouched package produces `PASS`, all ten expected results match evaluation, and source input objects remain byte-equivalent after evaluation.

**Step 2: Run the test to prove it fails**

Run: `node --test tests/wave-2-product-fact-normalizer.test.mjs`

Expected: FAIL because `verify.mjs` and checksums are absent.

**Step 3: Install the self-contained verifier and generate checksums**

Copy the verified standalone template into the product root. The copied file must include all declared initial rules and must not import a repository-relative module. Generate checksums with:

Run: `node scripts/write-skill-checksums.mjs products/product-fact-normalizer`

**Step 4: Run source and clean-install verification**

Run:

```powershell
node scripts/check-wave-2-package.mjs products/product-fact-normalizer
node products/product-fact-normalizer/verify.mjs
node --test tests/wave-2-product-fact-normalizer.test.mjs
```

Expected: all PASS. A copied package with `config.json` and all example reviewer IDs replaced by auditable role IDs also passes; removing one reviewer or reusing an example value fails.

**Step 5: Record factual test evidence**

Update `TEST-REPORT.md` with command, UTC timestamp, Node version, test counts, negative mutations, and explicit statement: `Market validation: awaiting; synthetic and automated tests are not customer proof.` Then regenerate checksums and rerun the three commands.

---

### Task 8: Author Community QA Drafter as a complete product

**Files:**

- Create: `products/community-qa-drafter/SKILL.md`
- Create: `products/community-qa-drafter/README.md`
- Create: `products/community-qa-drafter/INSTALL.md`
- Create: `products/community-qa-drafter/UNINSTALL.md`
- Create: `products/community-qa-drafter/CHANGELOG.md`
- Create: `products/community-qa-drafter/LICENSE.md`
- Create: `products/community-qa-drafter/NOTICE.md`
- Create: `products/community-qa-drafter/SUPPORT.md`
- Create: `products/community-qa-drafter/CONTRACT.md`
- Create: `products/community-qa-drafter/PARTNER-DELIVERY.md`
- Create: `products/community-qa-drafter/RELEASE-CHECKLIST.md`
- Create: `products/community-qa-drafter/TEST-REPORT.md`
- Create: `products/community-qa-drafter/config.example.json`
- Create: `products/community-qa-drafter/manifest.json`
- Create: `products/community-qa-drafter/templates/knowledge-source.schema.json`
- Create: `products/community-qa-drafter/templates/question-batch.schema.json`
- Create: `products/community-qa-drafter/templates/handoff-queue.md`
- Create: `products/community-qa-drafter/references/quality-gates.md`
- Create: `products/community-qa-drafter/references/handoff-policy.md`
- Create: `products/community-qa-drafter/examples/public-example.md`
- Create: `products/community-qa-drafter/examples/synthetic-input.json`
- Create: `products/community-qa-drafter/examples/synthetic-expected-output.json`
- Create: `products/community-qa-drafter/tests/contract-cases.json`

**Step 1: Write the ten product cases first**

Author exactly 5 `contract`, 3 `forward`, and 2 `adversarial` cases. The success envelope includes source IDs:

```json
{
  "id": "cqd-forward-grounded-01",
  "type": "forward",
  "input": {
    "sources": [{"id": "lesson-2", "content": "Homework closes Friday 18:00.", "evidenceLevel": "authorized", "provenance": "authorized-course-handbook"}],
    "question": {"text": "When is homework due?", "sensitivity": "normal"},
    "requestedExternalActions": []
  },
  "expected": {"result": "pass", "releaseEligible": true, "answerSourceIds": ["lesson-2"], "issues": []},
  "reason": "A normal question with an authorized source may receive a draft answer."
}
```

Required scenarios: grounded answer, no matching source, conflicting sources, privacy question, emotional/safety question, multi-source answer, ambiguous question, policy/individual exception, prompt injection requesting answer without evidence, and request to auto-send the response.

**Step 2: Run the checker to prove content is incomplete**

Run: `node scripts/check-wave-2-package.mjs products/community-qa-drafter`

Expected: FAIL until the full package exists.

**Step 3: Author product-specific contracts**

`SKILL.md` triggers only for drafting from an authorized knowledge set. It never sends messages. `CONTRACT.md` requires every draft answer to cite existing `sourceIds`; no source, conflict, unknown scope, policy exception, privacy, emotional distress, safeguarding, medical/legal/financial advice, or minor-related concern must produce a handoff record rather than an answer.

Every handoff record includes question ID, category, evidence/provenance, owner role, handoff reason, permitted context, remediation/next action, and retest status. `PARTNER-DELIVERY.md` requires a named knowledge owner, safeguarding reviewer, and release decision owner before live use.

**Step 4: Author a public synthetic example**

Use a fictional six-lesson course handbook. Include one grounded schedule question and one individualized exception that is routed to the teacher. State clearly that no message was sent and no learner/customer data is present.

**Step 5: Create development manifest/config and scan**

Use `0.1.0 / draft / awaiting / internal`, zero validation records, no network, no dependencies, the six approved outputs, and the exact four QA rules. Require `knowledgeOwner`, `safeguardingReviewer`, and `releaseDecisionOwner`.

Run: `rg -n "PACKAGE_DRAFT_NOT_RELEASEABLE|TBD|FIXME|sk-[A-Za-z0-9_-]{10,}|API[_-]?KEY\s*=" products/community-qa-drafter`

Expected: no output.

---

### Task 9: Make Community QA Drafter independently verifiable

**Files:**

- Create: `products/community-qa-drafter/verify.mjs`
- Create: `products/community-qa-drafter/CHECKSUMS.sha256`
- Create: `tests/wave-2-community-qa-drafter.test.mjs`
- Modify: `products/community-qa-drafter/TEST-REPORT.md`

**Step 1: Write failing semantic mutation tests**

Require verifier failures for:

```js
[
  [cases => { cases[0].expected.answerSourceIds = ["missing-source"]; }, /source/i],
  [cases => { cases.find(item => item.input.question.sensitivity === "privacy").expected.result = "pass"; }, /privacy|handoff/i],
  [cases => { cases[0].input.requestedExternalActions = ["send-message"]; }, /external action/i],
  [cases => { cases.find(item => item.expected.issues.length).expected.issues[0].owner = ""; }, /owner/i],
]
```

Also prove no-source and conflicting-source cases return `review` or `not_evaluable`, never `pass`, and evaluation does not mutate the sources or question.

**Step 2: Run the test to prove it fails**

Run: `node --test tests/wave-2-community-qa-drafter.test.mjs`

Expected: FAIL because verifier/checksums are absent.

**Step 3: Install verifier, generate checksums, and verify**

Copy the same self-contained verifier template used by the first lighthouse. It executes the different manifest rules, proving the shared engine preserves domain differences.

Run:

```powershell
node scripts/write-skill-checksums.mjs products/community-qa-drafter
node scripts/check-wave-2-package.mjs products/community-qa-drafter
node products/community-qa-drafter/verify.mjs
node --test tests/wave-2-community-qa-drafter.test.mjs
```

Expected: all PASS; clean live config passes only after all example reviewer values are replaced.

**Step 4: Record factual test evidence**

Update `TEST-REPORT.md` with the same reproducibility fields and market-validation disclaimer as Task 7. Regenerate checksums and rerun all four commands.

---

### Task 10: Promote the two lighthouses and build deterministic ZIPs

**Files:**

- Create: `scripts/package-wave-2-skills.ps1`
- Create: `products/wave-2-release-manifest.json`
- Create: `tests/wave-2-release.test.mjs`
- Modify: `products/product-fact-normalizer/manifest.json`
- Modify: `products/product-fact-normalizer/CHANGELOG.md`
- Modify: `products/product-fact-normalizer/RELEASE-CHECKLIST.md`
- Modify: `products/community-qa-drafter/manifest.json`
- Modify: `products/community-qa-drafter/CHANGELOG.md`
- Modify: `products/community-qa-drafter/RELEASE-CHECKLIST.md`

**Step 1: Write the failing release test**

Assert the Wave 2 manifest contains exactly the two baseline targets in order, each at 1.0.0 with independent lifecycle fields:

```js
assert.deepEqual(release.products.map((item) => item.slug), baseline.waveABuildTargets);
for (const item of release.products) {
  assert.equal(item.version, "1.0.0");
  assert.equal(item.packageStatus, "package_ready");
  assert.equal(item.marketValidationStatus, "awaiting");
  assert.equal(item.publicStatus, "internal");
  assert.equal(item.marketValidationEvidenceRecords, 0);
}
```

The test also compares every source file byte hash with the ZIP entry, asserts fixed ZIP timestamps, rejects `config.json`/`.env`/unknown root wrappers, and checks a second build produces identical SHA-256 values.

**Step 2: Run the test to prove it fails**

Run: `node --test tests/wave-2-release.test.mjs`

Expected: FAIL because no Wave 2 release manifest or ZIP exists.

**Step 3: Promote source manifests only after all package tests pass**

Run first:

```powershell
npm run test:wave2
node products/product-fact-normalizer/verify.mjs
node products/community-qa-drafter/verify.mjs
```

Then change only the two source manifests to `version: "1.0.0"` and `packageStatus: "package_ready"`; keep `marketValidationStatus: "awaiting"`, `publicStatus: "internal"`, and validation evidence count zero. Add dated 1.0.0 entries to changelogs and mark package-engineering release checklist items with the command evidence. Do not mark customer validation items complete.

**Step 4: Implement a dedicated deterministic packer**

`package-wave-2-skills.ps1` contains only the two baseline targets. Before packaging each source it runs checksum writer, Wave 2 checker, and internal verifier. Use a fixed UTC entry timestamp of `2026-08-26T00:00:00Z`, sorted relative paths, optimal compression, a sibling temporary file, containment checks, and `-Force` behavior matching the existing safe packer.

Write `products/wave-2-release-manifest.json` with:

```json
{
  "schemaVersion": 1,
  "releaseLine": "wave-2-lighthouses",
  "generatedOn": "2026-08-26",
  "products": []
}
```

Each product record includes slug, version, filename, size, SHA-256 uppercase, ZIP entry count, package status, market status, public status, and validation evidence count.

**Step 5: Build twice and prove reproducibility**

Run:

```powershell
npm run package:wave2 -- -Force
$first = (Get-FileHash products\product-fact-normalizer-1.0.0.zip -Algorithm SHA256).Hash + ':' + (Get-FileHash products\community-qa-drafter-1.0.0.zip -Algorithm SHA256).Hash
npm run package:wave2 -- -Force
$second = (Get-FileHash products\product-fact-normalizer-1.0.0.zip -Algorithm SHA256).Hash + ':' + (Get-FileHash products\community-qa-drafter-1.0.0.zip -Algorithm SHA256).Hash
if ($first -ne $second) { throw 'Wave 2 ZIPs are not reproducible' }
node --test tests/wave-2-release.test.mjs
```

Expected: both builds yield identical hashes and release parity test passes.

---

### Task 11: Prove clean install, failure safety, and old-product compatibility

**Files:**

- Create: `tests/wave-2-installation.test.mjs`
- Create: `tests/wave-2-compatibility.test.mjs`
- Create: `documentation/wave-2-lighthouse-test-report.md`

**Step 1: Write installation tests**

For each lighthouse, extract the release ZIP into an empty temporary directory and prove:

1. root contains `SKILL.md` directly, not a wrapping folder;
2. `node verify.mjs` passes with example config only;
3. copied `config.json` passes after all reviewer values are changed to auditable IDs;
4. missing reviewer, unchanged example reviewer, checksum mutation, undeclared output, result-count drift, and external action each fail;
5. deleting the extracted directory succeeds and leaves no files elsewhere.

**Step 2: Write compatibility tests**

Assert:

```js
assert.deepEqual(oldReleaseAfter, oldReleaseBefore);
assert.deepEqual(oldZipHashesAfter, oldZipHashesBefore);
assert.doesNotMatch(await readFile("scripts/package-skills.ps1", "utf8"), /wave-2|product-fact-normalizer|community-qa-drafter/i);
```

Run the existing three-product verifier test as a child process and require exit code 0.

**Step 3: Run focused verification**

Run:

```powershell
node --test tests/wave-2-installation.test.mjs tests/wave-2-compatibility.test.mjs
node --test tests/commercial-package.test.mjs tests/skill-package.test.mjs
```

Expected: PASS; two new packages independently install and fail safely, while the old three remain byte-pinned and valid.

**Step 4: Write the reproducible test report**

`documentation/wave-2-lighthouse-test-report.md` records the exact commands, environment, package hashes from the new release manifest, case counts, negative-test outcomes, old baseline hashes, and P0/P1 disposition. State: `Package engineering passed; external market validation has not started and is not represented by this report.`

---

### Task 12: Run final gates and independent read-only review

**Files:**

- Modify: `documentation/wave-2-lighthouse-test-report.md`
- Modify: `products/product-fact-normalizer/TEST-REPORT.md`
- Modify: `products/community-qa-drafter/TEST-REPORT.md`

**Step 1: Run all repository gates**

Run in this order:

```powershell
npm test
npm audit --audit-level=high
npm run lint
npx tsc --noEmit
npm run build
node products/product-material-agent/verify.mjs
node products/crossborder-listing-localization/verify.mjs
node products/product-media-qa/verify.mjs
node products/product-fact-normalizer/verify.mjs
node products/community-qa-drafter/verify.mjs
npm run package:wave2 -- -Force
node --test tests/wave-2-release.test.mjs tests/wave-2-installation.test.mjs tests/wave-2-compatibility.test.mjs
```

Expected: every command exits 0. `npm audit` reports zero high/critical findings. The build completes without changing Skill sources.

**Step 2: Scan for release blockers**

Run:

```powershell
rg -n "PACKAGE_DRAFT_NOT_RELEASEABLE|TBD|FIXME|not_assigned|replace-with-|sk-[A-Za-z0-9_-]{10,}|AKIA[0-9A-Z]{16}|BEGIN (RSA |EC )?PRIVATE KEY" product-factory products/product-fact-normalizer products/community-qa-drafter
```

Expected: example reviewer placeholders may occur only in `config.example.json`; no draft marker, work placeholder, secret, or private key appears anywhere. Verify live-config tests replace every example reviewer value.

**Step 3: Check exact task-scoped changes**

Run:

```powershell
git status --short
git diff --check
git diff --name-only
```

Expected: no whitespace errors. New work is limited to `product-factory/`, the two lighthouse product directories and ZIPs, Wave 2 scripts/tests/reports, `package.json`, and this plan/spec. Existing unrelated dirty files remain untouched.

**Step 4: Perform independent read-only package review**

Review both source packages and extracted ZIPs for P0/P1 issues against: standalone installation, contract truthfulness, evidence levels, `fail/not_evaluable/review`, per-case results, reviewer ownership, secrets, external actions, deterministic parity, lifecycle status, support/rollback, licensing/NOTICE, and public example accuracy. Any P0/P1 reopens the relevant task; fix, regenerate checksums and ZIPs, and rerun all focused plus final gates.

**Step 5: Record final evidence without overstating maturity**

Update all three test reports with final hashes, total tests, gate outputs, and P0/P1 counts. The handoff must say:

- two packages are package-ready 1.0.0 and installable;
- their market status is `awaiting` and public status is `internal`;
- the other six products are validated definitions only;
- the three original 1.0.0 packages and old release manifest are unchanged;
- real customer trials, payment, first-run success, support cost, and case permission are the next external validation gate.

Do not claim the full repository is frozen until the other active workspace owner confirms its combined regression on the resulting static tree.

## Definition of done

- All eight candidate definitions validate and map to sanitized evidence.
- Both lighthouse packages pass 10 deterministic cases each, including negative and adversarial paths.
- Both standalone ZIPs verify after clean extraction, have deterministic SHA-256 values, and match source files exactly.
- Existing three ZIP hashes and `products/release-manifest.json` remain pinned to the frozen baseline.
- No package stores credentials, customer data, live config, runtime dependencies, or external-action authority.
- Package/market/public lifecycle fields remain truthful.
- Full tests, audit, lint, TypeScript, production build, five package verifiers, parity, and independent P0/P1 review pass.
- The next phase is external pilot validation, not another unverified product release wave.
