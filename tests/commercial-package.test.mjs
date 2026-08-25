import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { createHash } from "node:crypto";
import { copyFile, cp, mkdtemp, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { promisify } from "node:util";
import test from "node:test";

import { checkSkillPackage } from "../scripts/check-skill-package.mjs";

const execFileAsync = promisify(execFile);
const root = resolve(import.meta.dirname, "..");
const packages = ["product-material-agent", "crossborder-listing-localization", "product-media-qa"];

test("all three commercial packages pass their own zero-dependency verifier", async () => {
  for (const slug of packages) {
    const packageRoot = join(root, "products", slug);
    await checkSkillPackage(packageRoot);
    const { stdout } = await execFileAsync(process.execPath, [join(packageRoot, "verify.mjs")], { cwd: packageRoot });
    assert.match(stdout, /PASS/);
  }
});

test("a clean install still verifies after the user creates config.json", async () => {
  for (const slug of packages) {
    const installedRoot = await mkdtemp(join(tmpdir(), `kunlun-installed-${slug}-`));
    try {
      await cp(join(root, "products", slug), installedRoot, { recursive: true });
      await copyFile(join(installedRoot, "config.example.json"), join(installedRoot, "config.json"));
      const config = JSON.parse(await readFile(join(installedRoot, "config.json"), "utf8"));
      const manifest = JSON.parse(await readFile(join(installedRoot, "manifest.json"), "utf8"));
      for (const [index, field] of manifest.requiredReviewerFields.entries()) {
        setPath(config, field, index === 0 ? "Jane Smith" : `${slug}-${field.split(".").at(-1)}-01`);
      }
      config.productSku = "synthetic-desk-organizer-gray";
      await writeFile(join(installedRoot, "config.json"), `${JSON.stringify(config, null, 2)}\n`);
      const { stdout } = await execFileAsync(process.execPath, [join(installedRoot, "verify.mjs")], { cwd: installedRoot });
      assert.match(stdout, /PASS/);
    } finally {
      await rm(installedRoot, { recursive: true, force: true });
    }
  }
});

test("a live config must replace every example reviewer with an auditable identifier", async () => {
  for (const slug of packages) {
    const installedRoot = await mkdtemp(join(tmpdir(), `kunlun-unconfigured-${slug}-`));
    try {
      await cp(join(root, "products", slug), installedRoot, { recursive: true });
      await copyFile(join(installedRoot, "config.example.json"), join(installedRoot, "config.json"));
      await assert.rejects(
        () => execFileAsync(process.execPath, [join(installedRoot, "verify.mjs")], { cwd: installedRoot }),
        /reviewer|replace|auditable/i,
      );
    } finally {
      await rm(installedRoot, { recursive: true, force: true });
    }
  }
});

test("a live config is rejected when any required reviewer is missing", async () => {
  for (const slug of packages) {
    const installedRoot = await mkdtemp(join(tmpdir(), `kunlun-missing-reviewer-${slug}-`));
    try {
      await cp(join(root, "products", slug), installedRoot, { recursive: true });
      const config = JSON.parse(await readFile(join(installedRoot, "config.example.json"), "utf8"));
      const manifest = JSON.parse(await readFile(join(installedRoot, "manifest.json"), "utf8"));
      for (const field of manifest.requiredReviewerFields) setPath(config, field, `${slug}-${field.split(".").at(-1)}-01`);
      deletePath(config, manifest.requiredReviewerFields.at(-1));
      await writeFile(join(installedRoot, "config.json"), `${JSON.stringify(config, null, 2)}\n`);
      await assert.rejects(
        () => execFileAsync(process.execPath, [join(installedRoot, "verify.mjs")], { cwd: installedRoot }),
        /reviewer|auditable|assigned/i,
      );
    } finally {
      await rm(installedRoot, { recursive: true, force: true });
    }
  }
});

test("media verifier rejects contract count drift and incomplete issue ownership", async () => {
  for (const mutation of [
    (cases) => { cases[0].expected.counts.not_evaluable_count = 1; },
    (cases) => { delete cases[0].expected.issues[0].owner; },
  ]) {
    const installedRoot = await mkdtemp(join(tmpdir(), "kunlun-media-contract-drift-"));
    try {
      await cp(join(root, "products", "product-media-qa"), installedRoot, { recursive: true });
      const relativePath = "tests/contract-cases.json";
      const target = join(installedRoot, ...relativePath.split("/"));
      const cases = JSON.parse(await readFile(target, "utf8"));
      mutation(cases);
      await writeFile(target, `${JSON.stringify(cases, null, 2)}\n`);
      await updateChecksum(installedRoot, relativePath);
      await assert.rejects(
        () => execFileAsync(process.execPath, [join(installedRoot, "verify.mjs")], { cwd: installedRoot }),
        /count|asset|issue|owner/i,
      );
    } finally {
      await rm(installedRoot, { recursive: true, force: true });
    }
  }
});

test("media verifier consumes expected metadata instead of trusting fixture labels", async () => {
  const installedRoot = await mkdtemp(join(tmpdir(), "kunlun-media-metadata-drift-"));
  try {
    await cp(join(root, "products", "product-media-qa"), installedRoot, { recursive: true });
    const relativePath = "tests/fixtures/expected-metadata.json";
    const target = join(installedRoot, ...relativePath.split("/"));
    const metadata = JSON.parse(await readFile(target, "utf8"));
    metadata.files["clip.mp4"].width = 65;
    await writeFile(target, `${JSON.stringify(metadata, null, 2)}\n`);
    await updateChecksum(installedRoot, relativePath);
    await assert.rejects(
      () => execFileAsync(process.execPath, [join(installedRoot, "verify.mjs")], { cwd: installedRoot }),
      /metadata|width|dimension/i,
    );
  } finally {
    await rm(installedRoot, { recursive: true, force: true });
  }
});

test("media release rejects weak pass evidence and missing required approval roles", async () => {
  for (const [mutation, pattern] of [
    [(cases) => { cases.find((item) => item.expectedStatus === "release_ready").input.required_assets[0].evidence_level = "preview_only"; }, /actual_file|evidence|pass/i],
    [(cases) => { cases.find((item) => item.expectedStatus === "release_ready").input.named_approval_records = [{ reviewer: "rights-reviewer-01", role: "rights_or_policy_reviewer", decision: "approved", time: "2026-08-26T00:00:00Z", provenance: "synthetic approval record" }]; }, /approval|role/i],
    [(cases) => { cases.find((item) => item.expectedStatus === "release_ready").input.required_assets[0].path = "tests/fixtures/does-not-exist.png"; }, /actual_file|file|path|ENOENT/i],
    [(cases) => { delete cases.find((item) => item.expectedStatus === "release_ready").input.required_assets[0].provenance; }, /provenance/i],
  ]) {
    const installedRoot = await mkdtemp(join(tmpdir(), "kunlun-media-release-gate-"));
    try {
      await cp(join(root, "products", "product-media-qa"), installedRoot, { recursive: true });
      const relativePath = "tests/contract-cases.json";
      const target = join(installedRoot, ...relativePath.split("/"));
      const cases = JSON.parse(await readFile(target, "utf8"));
      mutation(cases);
      await writeFile(target, `${JSON.stringify(cases, null, 2)}\n`);
      await updateChecksum(installedRoot, relativePath);
      await assert.rejects(
        () => execFileAsync(process.execPath, [join(installedRoot, "verify.mjs")], { cwd: installedRoot }),
        pattern,
      );
    } finally {
      await rm(installedRoot, { recursive: true, force: true });
    }
  }
});

test("release manifest pins three 1.0.0 ZIP files by SHA-256", async () => {
  const manifest = JSON.parse(await readFile(join(root, "products", "release-manifest.json"), "utf8"));
  assert.equal(manifest.schemaVersion, 1);
  assert.equal(manifest.products.length, 3);
  for (const release of manifest.products) {
    assert.equal(release.version, "1.0.0");
    assert.equal(release.packageStatus, "commercial-ready");
    assert.equal(release.marketValidationStatus, "awaiting-real-customer-operations-data");
    const bytes = await readFile(join(root, "products", release.file));
    assert.equal(createHash("sha256").update(bytes).digest("hex").toUpperCase(), release.sha256);
    assert.equal(bytes.length, release.sizeBytes);
    assert.equal(release.zipEntryCount > 10, true);
  }
});

test("every source package is fully represented by its release ZIP", async (t) => {
  if (process.platform !== "win32") return t.skip("ZIP parity check uses the Windows PowerShell runtime used to build releases");
  const manifest = JSON.parse(await readFile(join(root, "products", "release-manifest.json"), "utf8"));
  for (const release of manifest.products) {
    const sourceRoot = join(root, "products", release.slug);
    const sourceFiles = await listFiles(sourceRoot);
    const script = [
      "$ErrorActionPreference='Stop'",
      "Add-Type -AssemblyName System.IO.Compression.FileSystem",
      `$archive=[System.IO.Compression.ZipFile]::OpenRead('${join(root, "products", release.file).replaceAll("'", "''")}')`,
      "$sha=[System.Security.Cryptography.SHA256]::Create()",
      "$rows=@()",
      "try { foreach($entry in $archive.Entries | Where-Object { $_.Name }) { $stream=$entry.Open(); try { $hash=([BitConverter]::ToString($sha.ComputeHash($stream))).Replace('-','') } finally { $stream.Dispose() }; $rows += [ordered]@{path=$entry.FullName;sha256=$hash} } } finally { $sha.Dispose(); $archive.Dispose() }",
      "$rows | ConvertTo-Json -Compress",
    ].join("; ");
    const { stdout } = await execFileAsync("powershell.exe", ["-NoProfile", "-Command", script]);
    const rows = JSON.parse(stdout.trim());
    const zipEntries = Array.isArray(rows) ? rows : [rows];
    assert.equal(zipEntries.length, sourceFiles.length);
    for (const file of sourceFiles) {
      const row = zipEntries.find((entry) => entry.path === file);
      assert.ok(row, `${release.file} is missing ${file}`);
      const source = await readFile(join(sourceRoot, ...file.split("/")));
      assert.equal(row.sha256, createHash("sha256").update(source).digest("hex").toUpperCase());
    }
  }
});

async function listFiles(directory, prefix = "") {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const relative = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) files.push(...await listFiles(join(directory, entry.name), relative));
    if (entry.isFile()) files.push(relative);
  }
  return files.sort();
}

function setPath(target, path, value) {
  const parts = path.split(".");
  const key = parts.pop();
  let current = target;
  for (const part of parts) current = current[part] ??= {};
  current[key] = value;
}

function deletePath(target, path) {
  const parts = path.split(".");
  const key = parts.pop();
  let current = target;
  for (const part of parts) current = current?.[part];
  if (current) delete current[key];
}

async function updateChecksum(packageRoot, relativePath) {
  const checksumPath = join(packageRoot, "CHECKSUMS.sha256");
  const hash = createHash("sha256").update(await readFile(join(packageRoot, ...relativePath.split("/")))).digest("hex");
  const lines = (await readFile(checksumPath, "utf8")).split(/\r?\n/);
  const updated = lines.map((line) => line.endsWith(`  ${relativePath}`) ? `${hash}  ${relativePath}` : line);
  await writeFile(checksumPath, updated.join("\n"));
}
