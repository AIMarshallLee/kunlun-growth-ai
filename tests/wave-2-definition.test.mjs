import assert from "node:assert/strict";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";

import {
  assertSafeSlug,
  loadProductDefinition,
  validateProductDefinition,
} from "../product-factory/lib/definition.mjs";

const valid = {
  schemaVersion: 1,
  slug: "product-fact-normalizer",
  name: "Product Fact Normalizer",
  category: "ecommerce",
  version: "0.1.0",
  packageStatus: "draft",
  marketValidationStatus: "awaiting",
  publicStatus: "internal",
  compatibleHosts: ["chatgpt", "claude"],
  evidenceLevels: ["authorized", "observed", "unverified", "unknown"],
  resultStates: ["pass", "fail", "not_evaluable", "review"],
  requiredReviewerFields: ["reviewer", "reviewedAt"],
  outputs: ["gaps.json"],
  sourceEvidence: ["evidence-001"],
  domainRules: ["Normalize only provided facts."],
  nonGoals: ["Do not invent missing facts."],
};

test("validates and returns a copied product definition", () => {
  const normalized = validateProductDefinition(valid);

  assert.equal(normalized.slug, "product-fact-normalizer");
  assert.notStrictEqual(normalized, valid);
  assert.notStrictEqual(normalized.outputs, valid.outputs);
});

test("rejects an unsafe slug", () => {
  assert.throws(() => assertSafeSlug("../escape"), /safe lowercase slug/i);
  assert.throws(() => validateProductDefinition({ ...valid, slug: "../escape" }), /safe lowercase slug/i);
});

test("rejects an empty outputs array", () => {
  assert.throws(() => validateProductDefinition({ ...valid, outputs: [] }), /outputs/i);
});

test("rejects an unknown public status", () => {
  assert.throws(() => validateProductDefinition({ ...valid, publicStatus: "published" }), /publicStatus/i);
});

test("rejects duplicate array members", () => {
  assert.throws(
    () => validateProductDefinition({ ...valid, outputs: ["gaps.json", "gaps.json"] }),
    /duplicate/i,
  );
});

test("rejects unrecognized definition keys", () => {
  assert.throws(() => validateProductDefinition({ ...valid, unknownKey: true }), /unknownKey/i);
  assert.throws(() => validateProductDefinition({ ...valid, sourcePaths: ["C:/customer/source.txt"] }), /sourcePaths/i);
});

test("rejects an absolute output path", () => {
  assert.throws(() => validateProductDefinition({ ...valid, outputs: ["/gaps.json"] }), /outputs/i);
});

test("requires draft definitions to use a 0.x.y version", () => {
  assert.throws(() => validateProductDefinition({ ...valid, version: "1.0.0" }), /version/i);
});

test("accepts three-part versions after draft and rejects prerelease versions", () => {
  assert.equal(
    validateProductDefinition({ ...valid, packageStatus: "package_ready", version: "1.2.3" }).version,
    "1.2.3",
  );
  assert.throws(
    () => validateProductDefinition({ ...valid, packageStatus: "package_ready", version: "1.2.3-beta" }),
    /version/i,
  );
});

test("requires every contract field and enforces all common arrays", () => {
  for (const field of Object.keys(valid)) {
    const { [field]: _omitted, ...withoutField } = valid;
    assert.throws(() => validateProductDefinition(withoutField), new RegExp(field, "i"));
  }

  for (const field of ["requiredReviewerFields", "outputs", "sourceEvidence", "domainRules", "nonGoals"]) {
    assert.throws(() => validateProductDefinition({ ...valid, [field]: [""] }), new RegExp(field, "i"));
    assert.throws(() => validateProductDefinition({ ...valid, [field]: ["same", "same"] }), /duplicate/i);
  }

  assert.throws(() => validateProductDefinition({ ...valid, compatibleHosts: ["chatgpt"] }), /compatibleHosts/i);
  assert.throws(() => validateProductDefinition({ ...valid, category: "other" }), /category/i);
  assert.throws(() => validateProductDefinition({ ...valid, packageStatus: "unknown" }), /packageStatus/i);
  assert.throws(() => validateProductDefinition({ ...valid, marketValidationStatus: "unknown" }), /marketValidationStatus/i);
  assert.throws(() => validateProductDefinition({ ...valid, schemaVersion: 2 }), /schemaVersion/i);
  assert.throws(() => validateProductDefinition({ ...valid, name: "  " }), /name/i);
});

test("rejects escaping and absolute output paths", () => {
  for (const output of ["../gaps.json", "nested\\gaps.json", "C:gaps.json", "C:/gaps.json", "/gaps.json"]) {
    assert.throws(() => validateProductDefinition({ ...valid, outputs: [output] }), /outputs/i);
  }
});

test("requires the exact evidence-level and result-state sets", () => {
  assert.throws(
    () => validateProductDefinition({ ...valid, evidenceLevels: ["authorized", "observed", "unknown", "unknown"] }),
    /evidenceLevels/i,
  );
  assert.throws(
    () => validateProductDefinition({ ...valid, resultStates: ["pass", "fail", "review"] }),
    /resultStates/i,
  );
  assert.throws(
    () => validateProductDefinition({ ...valid, evidenceLevels: ["authorized", "observed", "unverified", "other"] }),
    /evidenceLevels/i,
  );
  assert.throws(
    () => validateProductDefinition({ ...valid, resultStates: ["pass", "fail", "not_evaluable", "other"] }),
    /resultStates/i,
  );
});

test("loadProductDefinition rejects malformed JSON with the file path", async () => {
  const directory = await mkdtemp(join(tmpdir(), "product-definition-"));
  const definitionPath = join(directory, "definition-malformed.json");

  try {
    await writeFile(definitionPath, "{not json", "utf8");
    await assert.rejects(loadProductDefinition(definitionPath), /definition-malformed\.json.*JSON/i);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test("the CLI exits non-zero for an invalid definition", async () => {
  const directory = await mkdtemp(join(tmpdir(), "product-definition-"));
  const definitionPath = join(directory, "definition-invalid.json");

  try {
    await writeFile(definitionPath, JSON.stringify({ ...valid, outputs: ["/gaps.json"] }), "utf8");
    const result = spawnSync(process.execPath, ["scripts/check-product-definition.mjs", definitionPath], {
      cwd: new URL("..", import.meta.url),
      encoding: "utf8",
    });

    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /outputs/i);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test("the schema describes each required contract field and non-empty unique arrays", async () => {
  const schema = JSON.parse(
    await readFile(new URL("../product-factory/schemas/product-definition.schema.json", import.meta.url), "utf8"),
  );
  const fields = Object.keys(valid);

  assert.deepEqual(schema.required, fields);
  assert.equal(schema.additionalProperties, false);
  assert.equal(schema.properties.slug.pattern, "^[a-z0-9]+(?:-[a-z0-9]+)*$");
  for (const field of ["compatibleHosts", "requiredReviewerFields", "outputs", "sourceEvidence", "domainRules", "nonGoals"]) {
    const arraySchema = schema.properties[field].$ref
      ? schema.$defs[schema.properties[field].$ref.slice("#/$defs/".length)]
      : schema.properties[field];
    assert.equal(arraySchema.minItems >= 1, true, `${field} has a non-empty minimum`);
    assert.equal(arraySchema.uniqueItems, true, `${field} requires unique values`);
  }
  for (const field of ["evidenceLevels", "resultStates"]) {
    assert.equal(schema.properties[field].minItems >= 1, true, `${field} has a non-empty minimum`);
    assert.equal(schema.properties[field].uniqueItems, true, `${field} requires unique values`);
  }
});
