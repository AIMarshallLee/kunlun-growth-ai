import { createHash } from "node:crypto";
import { access, readdir, readFile } from "node:fs/promises";
import { relative, resolve, sep } from "node:path";
import { pathToFileURL } from "node:url";

const requiredFiles = [
  "SKILL.md",
  "README.md",
  "INSTALL.md",
  "UNINSTALL.md",
  "CHANGELOG.md",
  "LICENSE.md",
  "NOTICE.md",
  "SUPPORT.md",
  "CONTRACT.md",
  "RELEASE-CHECKLIST.md",
  "TEST-REPORT.md",
  "config.example.json",
  "manifest.json",
  "CHECKSUMS.sha256",
  "verify.mjs",
];
const requiredDirectories = ["templates", "references", "examples", "tests"];
const forbiddenNames = new Set(["node_modules"]);
const secretPattern = /(?:(?:^|[^A-Za-z0-9])sk-[A-Za-z0-9_-]{10,}|AKIA[0-9A-Z]{16}|gh[pousr]_[A-Za-z0-9_]{20,}|github_pat_[A-Za-z0-9_]{20,}|-----BEGIN (?:RSA |EC )?PRIVATE KEY-----|(?:^|\n)\s*[A-Z][A-Z0-9_]*(?:API[_-]?KEY|TOKEN|SECRET|PASSWORD|PRIVATE[_-]?KEY)[A-Z0-9_]*\s*=\s*["']?[^\s"']{8,}|eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,})/im;

export function containsPossibleSecret(content) {
  return secretPattern.test(content);
}

export async function checkSkillPackage(packageDirectory) {
  const root = resolve(packageDirectory);
  for (const file of requiredFiles) await access(resolve(root, file));
  for (const directory of requiredDirectories) {
    const directoryPath = resolve(root, directory);
    await access(directoryPath);
    if ((await readdir(directoryPath)).length === 0) throw new Error(`Required directory ${directory} is empty`);
  }

  const skillEntry = await readFile(resolve(root, "SKILL.md"), "utf8");
  const frontmatter = skillEntry.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const name = frontmatter?.[1].match(/^name:\s*([a-z0-9-]+)\s*$/m)?.[1];
  const description = frontmatter?.[1].match(/^description:\s*(.+)\s*$/m)?.[1];
  if (!frontmatter || frontmatter[1].length > 1024 || !name || !description?.trim()) {
    throw new Error("SKILL.md frontmatter must contain a valid name and a non-empty description");
  }

  const manifest = await readJson(resolve(root, "manifest.json"), "manifest.json");
  const config = await readJson(resolve(root, "config.example.json"), "config.example.json");
  if (manifest.slug !== name || !/^\d+\.\d+\.\d+$/.test(manifest.version ?? "") || manifest.entrypoint !== "SKILL.md") {
    throw new Error("manifest.json must match the SKILL name and declare a semantic version and SKILL.md entrypoint");
  }
  for (const [field, expected] of Object.entries({
    configExample: "config.example.json",
    contract: "CONTRACT.md",
    license: "LICENSE.md",
    support: "SUPPORT.md",
    testCommand: "node verify.mjs",
  })) {
    if (manifest[field] !== expected) throw new Error(`manifest.json field ${field} must be ${expected}`);
  }
  if (!Array.isArray(manifest.compatibleHosts) || manifest.compatibleHosts.length < 2 || !Array.isArray(manifest.runtimeDependencies)) {
    throw new Error("manifest.json must declare compatibleHosts and runtimeDependencies");
  }
  if (typeof manifest.publicExample !== "string" || !manifest.publicExample.startsWith("examples/")) {
    throw new Error("manifest.json must declare a public example inside examples/");
  }
  if (config.schemaVersion !== 1 || config.evidenceMode !== "strict" || !config.reviewers?.releaseDecisionOwner?.trim()) {
    throw new Error("config.example.json must use schemaVersion 1, strict evidence mode, and a release decision owner");
  }
  if (!Array.isArray(manifest.requiredReviewerFields) || manifest.requiredReviewerFields.length === 0) {
    throw new Error("manifest.json must declare requiredReviewerFields");
  }
  for (const field of manifest.requiredReviewerFields) {
    if (typeof getPath(config, field) !== "string" || !getPath(config, field).trim()) {
      throw new Error(`config.example.json must define reviewer field ${field}`);
    }
  }

  const packageFiles = await listFiles(root);
  const checksumText = await readFile(resolve(root, "CHECKSUMS.sha256"), "utf8");
  const checksumEntries = parseChecksums(checksumText);
  const expectedFiles = packageFiles.filter((file) => file !== "CHECKSUMS.sha256");
  if (checksumEntries.size !== expectedFiles.length || expectedFiles.some((file) => !checksumEntries.has(file))) {
    throw new Error("CHECKSUMS.sha256 must cover every package file except itself exactly once");
  }
  for (const file of expectedFiles) {
    const actual = createHash("sha256").update(await readFile(resolve(root, ...file.split("/")))).digest("hex");
    if (checksumEntries.get(file) !== actual) throw new Error(`Checksum mismatch for ${file}`);
  }

  async function scan(directory) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      if (forbiddenNames.has(entry.name) || entry.name.startsWith(".env")) throw new Error(`Forbidden package entry: ${entry.name}`);
      const path = resolve(directory, entry.name);
      if (entry.isDirectory()) await scan(path);
      if (entry.isFile() && containsPossibleSecret(await readFile(path, "utf8"))) throw new Error(`Possible secret in: ${path}`);
    }
  }
  await scan(root);
  return root;
}

async function readJson(path, label) {
  try {
    return JSON.parse(await readFile(path, "utf8"));
  } catch {
    throw new Error(`${label} must contain valid JSON`);
  }
}

async function listFiles(root) {
  const files = [];
  async function visit(directory) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const path = resolve(directory, entry.name);
      if (entry.isDirectory()) await visit(path);
      if (entry.isFile()) files.push(relative(root, path).split(sep).join("/"));
    }
  }
  await visit(root);
  return files.sort();
}

function getPath(target, path) {
  return path.split(".").reduce((current, key) => current?.[key], target);
}

function parseChecksums(content) {
  const entries = new Map();
  for (const line of content.split(/\r?\n/).filter(Boolean)) {
    const match = line.match(/^([a-f0-9]{64})  ([^\\].*)$/);
    if (!match || match[2].startsWith("/") || match[2].split("/").includes("..") || entries.has(match[2])) {
      throw new Error("CHECKSUMS.sha256 contains an invalid or duplicate entry");
    }
    entries.set(match[2], match[1]);
  }
  return entries;
}

const invokedFromCommandLine = process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href;
if (invokedFromCommandLine) {
  if (!process.argv[2]) throw new Error("Usage: node scripts/check-skill-package.mjs <package-directory>");
  console.log(`PASS: ${await checkSkillPackage(process.argv[2])}`);
}
