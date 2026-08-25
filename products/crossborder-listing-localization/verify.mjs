import { createHash } from "node:crypto";
import { access, readdir, readFile } from "node:fs/promises";
import { relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL(".", import.meta.url));
const requiredRootFiles = [
  "SKILL.md", "README.md", "INSTALL.md", "UNINSTALL.md", "CHANGELOG.md",
  "LICENSE.md", "NOTICE.md", "SUPPORT.md", "CONTRACT.md", "RELEASE-CHECKLIST.md",
  "TEST-REPORT.md", "config.example.json", "manifest.json", "CHECKSUMS.sha256", "verify.mjs",
];
const requiredDirectories = ["templates", "references", "examples", "tests"];
const secretPattern = /(?:(?:^|[^A-Za-z0-9])sk-[A-Za-z0-9_-]{10,}|AKIA[0-9A-Z]{16}|gh[pousr]_[A-Za-z0-9_]{20,}|github_pat_[A-Za-z0-9_]{20,}|-----BEGIN (?:RSA |EC )?PRIVATE KEY-----|(?:^|\n)\s*[A-Z][A-Z0-9_]*(?:API[_-]?KEY|TOKEN|SECRET|PASSWORD|PRIVATE[_-]?KEY)[A-Z0-9_]*\s*=\s*["']?[^\s"']{8,}|eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,})/im;

for (const file of requiredRootFiles) await access(resolve(root, file));
for (const directory of requiredDirectories) {
  const entries = await readdir(resolve(root, directory));
  assert(entries.length > 0, `Required directory is empty: ${directory}`);
}

const manifest = JSON.parse(await readFile(resolve(root, "manifest.json"), "utf8"));
const exampleConfig = JSON.parse(await readFile(resolve(root, "config.example.json"), "utf8"));
let configName = "config.example.json";
try { await access(resolve(root, "config.json")); configName = "config.json"; } catch {}
const config = JSON.parse(await readFile(resolve(root, configName), "utf8"));
assert(manifest.entrypoint === "SKILL.md", "manifest entrypoint must be SKILL.md");
assert(manifest.version === "1.0.0", "commercial package version must be 1.0.0");
assert(manifest.packageStatus === "commercial-ready", "manifest packageStatus must be commercial-ready");
assert(manifest.marketValidationStatus === "awaiting-real-customer-operations-data", "market validation status must remain explicit");
assert(config.schemaVersion === 1 && config.evidenceMode === "strict", "config must use schemaVersion 1 and strict evidence mode");
validateReviewers(manifest, config, exampleConfig, configName === "config.json");

const files = await listFiles(root);
for (const file of files) {
  const base = file.split("/").at(-1);
  assert(!base.startsWith(".env") && !file.split("/").includes("node_modules"), `Forbidden package entry: ${file}`);
  const bytes = await readFile(resolve(root, ...file.split("/")));
  assert(!secretPattern.test(bytes.toString("utf8")), `Possible secret in ${file}`);
}
const checksums = parseChecksums(await readFile(resolve(root, "CHECKSUMS.sha256"), "utf8"));
const coveredFiles = files.filter((file) => file !== "CHECKSUMS.sha256" && file !== "config.json");
assert(checksums.size === coveredFiles.length, "checksum entry count must match package file count");
for (const file of coveredFiles) {
  const expected = checksums.get(file);
  assert(expected, `Missing checksum for ${file}`);
  const actual = createHash("sha256").update(await readFile(resolve(root, ...file.split("/")))).digest("hex");
  assert(expected === actual, `Checksum mismatch for ${file}`);
}

const publicExample = resolve(root, ...manifest.publicExample.split("/"));
await access(publicExample);
const cases = JSON.parse(await readFile(resolve(root, "tests", "contract-cases.json"), "utf8"));
assert(Array.isArray(cases) && cases.length >= 2, "tests/contract-cases.json must contain at least two cases");
for (const item of cases) {
  assert(item.id && item.expectedStatus && item.reason, "each contract case needs id, expectedStatus, and reason");
}
assert(Array.isArray(manifest.requiredContractTerms) && manifest.requiredContractTerms.length >= 4, "manifest must declare contract terms");
const contractText = [
  await readFile(resolve(root, "SKILL.md"), "utf8"),
  await readFile(resolve(root, "CONTRACT.md"), "utf8"),
  await readFile(resolve(root, "references", "quality-gates.md"), "utf8"),
].join("\n").toLowerCase();
for (const term of manifest.requiredContractTerms) {
  assert(contractText.includes(String(term).toLowerCase()), `Missing contract term: ${term}`);
}

for (const fixture of manifest.fixtureChecks ?? []) await verifyFixture(fixture);
console.log(`PASS: ${manifest.slug} ${manifest.version}; ${coveredFiles.length} files; ${cases.length} contract cases`);

async function verifyFixture(fixture) {
  const path = resolve(root, ...fixture.path.split("/"));
  const bytes = await readFile(path);
  if (fixture.type === "png") {
    assert(bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])), `Invalid PNG signature: ${fixture.path}`);
    assert(bytes.readUInt32BE(16) === fixture.width && bytes.readUInt32BE(20) === fixture.height, `Unexpected PNG dimensions: ${fixture.path}`);
    return;
  }
  if (fixture.type === "mp4") {
    assert(bytes.subarray(4, 8).toString("ascii") === "ftyp", `Invalid MP4 signature: ${fixture.path}`);
    const seconds = readMp4Duration(bytes);
    assert(seconds >= fixture.minDurationSeconds && seconds <= fixture.maxDurationSeconds, `Unexpected MP4 duration: ${seconds}`);
    if (fixture.hasVideo) assert(bytes.includes(Buffer.from("vide")), "MP4 video handler is missing");
    if (fixture.hasAudio) assert(bytes.includes(Buffer.from("soun")), "MP4 audio handler is missing");
    return;
  }
  if (fixture.type === "srt") {
    const text = bytes.toString("utf8");
    const cues = text.match(/\d{2}:\d{2}:\d{2},\d{3}\s+-->\s+\d{2}:\d{2}:\d{2},\d{3}/g) ?? [];
    assert(cues.length >= fixture.minCues, `Not enough subtitle cues: ${fixture.path}`);
    return;
  }
  throw new Error(`Unsupported fixture type: ${fixture.type}`);
}

function readMp4Duration(bytes) {
  const marker = bytes.indexOf(Buffer.from("mvhd"));
  assert(marker >= 0, "MP4 mvhd box is missing");
  const version = bytes[marker + 4];
  if (version === 0) {
    const timescale = bytes.readUInt32BE(marker + 16);
    return bytes.readUInt32BE(marker + 20) / timescale;
  }
  if (version === 1) {
    const timescale = bytes.readUInt32BE(marker + 24);
    return Number(bytes.readBigUInt64BE(marker + 28)) / timescale;
  }
  throw new Error(`Unsupported mvhd version: ${version}`);
}

async function listFiles(directory) {
  const files = [];
  async function visit(current) {
    for (const entry of await readdir(current, { withFileTypes: true })) {
      const path = resolve(current, entry.name);
      if (entry.isDirectory()) await visit(path);
      if (entry.isFile()) files.push(relative(directory, path).split(sep).join("/"));
    }
  }
  await visit(directory);
  return files.sort();
}

function parseChecksums(content) {
  const result = new Map();
  for (const line of content.split(/\r?\n/).filter(Boolean)) {
    const match = line.match(/^([a-f0-9]{64})  ([^\\].*)$/);
    assert(match && !match[2].startsWith("/") && !match[2].split("/").includes("..") && !result.has(match[2]), "Invalid checksum entry");
    result.set(match[2], match[1]);
  }
  return result;
}

function validateReviewers(manifest, config, exampleConfig, isLiveConfig) {
  assert(Array.isArray(manifest.requiredReviewerFields) && manifest.requiredReviewerFields.length > 0, "manifest must declare required reviewer fields");
  for (const field of manifest.requiredReviewerFields) {
    const value = getPath(config, field);
    assert(typeof value === "string" && /^[\p{L}\p{N}](?:[\p{L}\p{N} ._@'-]*[\p{L}\p{N}])?$/u.test(value.trim()), `Reviewer ${field} must be an auditable identifier`);
    assert(value.trim().toLowerCase() !== "not_assigned", `Reviewer ${field} must be assigned`);
    if (isLiveConfig) assert(value.trim() !== String(getPath(exampleConfig, field) ?? "").trim(), `Live config must replace example reviewer ${field}`);
  }
}

function getPath(target, path) {
  return path.split(".").reduce((current, key) => current?.[key], target);
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}
