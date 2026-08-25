import { readFile } from "node:fs/promises";

const allowedKeys = new Set([
  "schemaVersion",
  "slug",
  "name",
  "category",
  "version",
  "packageStatus",
  "marketValidationStatus",
  "publicStatus",
  "compatibleHosts",
  "evidenceLevels",
  "resultStates",
  "requiredReviewerFields",
  "outputs",
  "sourceEvidence",
  "domainRules",
  "nonGoals",
]);

const requiredKeys = [...allowedKeys];
const categories = new Set(["ecommerce", "education"]);
const packageStatuses = new Set(["draft", "package_ready", "released", "withdrawn"]);
const marketValidationStatuses = new Set(["awaiting", "pilot", "validated", "rejected"]);
const publicStatuses = new Set(["internal", "waitlist", "available", "paused"]);
const evidenceLevels = new Set(["authorized", "observed", "unverified", "unknown"]);
const resultStates = new Set(["pass", "fail", "not_evaluable", "review"]);
const draftVersionPattern = /^0\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/;
const semverPattern = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/;

export function assertSafeSlug(slug) {
  if (typeof slug !== "string" || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error("slug must be a safe lowercase slug");
  }
}

function assertEnum(value, field, allowed) {
  if (typeof value !== "string" || !allowed.has(value)) {
    throw new Error(`${field} must be a recognized value`);
  }
}

function assertUniqueStrings(value, field, minimum = 1) {
  if (
    !Array.isArray(value) ||
    value.length < minimum ||
    value.some((item) => typeof item !== "string" || !item.trim())
  ) {
    throw new Error(`${field} must contain at least ${minimum} non-empty strings`);
  }
  if (new Set(value).size !== value.length) throw new Error(`${field} contains a duplicate value`);
}

function assertExactStringSet(value, field, expected) {
  assertUniqueStrings(value, field);
  if (value.length !== expected.size || value.some((item) => !expected.has(item))) {
    throw new Error(`${field} must contain the required values exactly once`);
  }
}

function assertSafeOutputs(outputs) {
  assertUniqueStrings(outputs, "outputs");
  if (outputs.some((output) => output.includes("..") || output.includes("\\") || /^[A-Za-z]:/.test(output) || output.startsWith("/"))) {
    throw new Error("outputs must contain safe relative paths");
  }
}

export function validateProductDefinition(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error("product definition must be an object");
  }

  for (const key of Object.keys(value)) {
    if (!allowedKeys.has(key)) throw new Error(`product definition contains an unrecognized key: ${key}`);
  }
  for (const key of requiredKeys) {
    if (!(key in value)) throw new Error(`product definition is missing required field: ${key}`);
  }

  if (value.schemaVersion !== 1) throw new Error("schemaVersion must be 1");
  assertSafeSlug(value.slug);
  if (typeof value.name !== "string" || !value.name.trim()) throw new Error("name must be a non-empty string");
  assertEnum(value.category, "category", categories);
  assertEnum(value.packageStatus, "packageStatus", packageStatuses);
  assertEnum(value.marketValidationStatus, "marketValidationStatus", marketValidationStatuses);
  assertEnum(value.publicStatus, "publicStatus", publicStatuses);

  if (
    typeof value.version !== "string" ||
    (value.packageStatus === "draft" ? !draftVersionPattern.test(value.version) : !semverPattern.test(value.version))
  ) {
    throw new Error("version is not valid for packageStatus");
  }

  assertUniqueStrings(value.compatibleHosts, "compatibleHosts", 2);
  assertExactStringSet(value.evidenceLevels, "evidenceLevels", evidenceLevels);
  assertExactStringSet(value.resultStates, "resultStates", resultStates);
  assertUniqueStrings(value.requiredReviewerFields, "requiredReviewerFields");
  assertSafeOutputs(value.outputs);
  assertUniqueStrings(value.sourceEvidence, "sourceEvidence");
  assertUniqueStrings(value.domainRules, "domainRules");
  assertUniqueStrings(value.nonGoals, "nonGoals");

  return {
    schemaVersion: value.schemaVersion,
    slug: value.slug,
    name: value.name,
    category: value.category,
    version: value.version,
    packageStatus: value.packageStatus,
    marketValidationStatus: value.marketValidationStatus,
    publicStatus: value.publicStatus,
    compatibleHosts: [...value.compatibleHosts],
    evidenceLevels: [...value.evidenceLevels],
    resultStates: [...value.resultStates],
    requiredReviewerFields: [...value.requiredReviewerFields],
    outputs: [...value.outputs],
    sourceEvidence: [...value.sourceEvidence],
    domainRules: [...value.domainRules],
    nonGoals: [...value.nonGoals],
  };
}

export async function loadProductDefinition(definitionPath) {
  const text = await readFile(definitionPath, "utf8");
  let value;
  try {
    value = JSON.parse(text);
  } catch (error) {
    throw new Error(`Unable to parse product definition ${definitionPath} as JSON: ${error.message}`);
  }
  return validateProductDefinition(value);
}
