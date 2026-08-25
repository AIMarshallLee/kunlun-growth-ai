import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdir, mkdtemp, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

import { checkSkillPackage } from "../scripts/check-skill-package.mjs";

async function createPackageFixture(root, { emptyExamples = false, invalidFrontmatter = false, description = "Use when testing a complete skill package." } = {}) {
  for (const directory of ["templates", "references", "examples", "tests"]) await mkdir(join(root, directory), { recursive: true });
  await writeFile(join(root, "SKILL.md"), invalidFrontmatter ? "# Missing frontmatter\n" : `---\nname: test-skill\ndescription: ${description}\n---\n\n# Test\n`);
  for (const file of ["README.md", "INSTALL.md", "UNINSTALL.md", "CHANGELOG.md", "LICENSE.md", "NOTICE.md", "SUPPORT.md", "CONTRACT.md", "RELEASE-CHECKLIST.md", "TEST-REPORT.md"]) {
    await writeFile(join(root, file), `# ${file}\n`);
  }
  await writeFile(join(root, "config.example.json"), JSON.stringify({ schemaVersion: 1, evidenceMode: "strict", reviewers: { releaseDecisionOwner: "Product Owner" } }, null, 2));
  await writeFile(join(root, "manifest.json"), JSON.stringify({
    slug: "test-skill",
    version: "1.0.0",
    entrypoint: "SKILL.md",
    configExample: "config.example.json",
    contract: "CONTRACT.md",
    license: "LICENSE.md",
    support: "SUPPORT.md",
    publicExample: "examples/offline-validation.md",
    testCommand: "node verify.mjs",
    compatibleHosts: ["Codex", "WorkBuddy"],
    runtimeDependencies: [],
    requiredReviewerFields: ["reviewers.releaseDecisionOwner"],
  }, null, 2));
  await writeFile(join(root, "verify.mjs"), "console.log('PASS');\n");
  await writeFile(join(root, "templates", "task-brief.md"), "# Brief\n");
  await writeFile(join(root, "references", "quality-gates.md"), "# Gates\n");
  if (!emptyExamples) await writeFile(join(root, "examples", "offline-validation.md"), "# Validation\n");
  await writeFile(join(root, "tests", "contract-cases.json"), "[]\n");
  await writeChecksums(root);
}

async function writeChecksums(root) {
  const files = [];
  async function visit(directory, prefix = "") {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const relative = prefix ? `${prefix}/${entry.name}` : entry.name;
      if (relative === "CHECKSUMS.sha256") continue;
      if (entry.isDirectory()) await visit(join(directory, entry.name), relative);
      if (entry.isFile()) files.push(relative);
    }
  }
  await visit(root);
  files.sort();
  const lines = [];
  for (const relative of files) {
    const hash = createHash("sha256").update(await readFile(join(root, ...relative.split("/")))).digest("hex");
    lines.push(`${hash}  ${relative}`);
  }
  await writeFile(join(root, "CHECKSUMS.sha256"), `${lines.join("\n")}\n`);
}

test("rejects a legacy exercise package without the commercial root contract", async () => {
  const root = await mkdtemp(join(tmpdir(), "kunlun-skill-package-"));
  try {
    for (const directory of ["templates", "references", "examples"]) await mkdir(join(root, directory), { recursive: true });
    await writeFile(join(root, "SKILL.md"), "---\nname: legacy-skill\ndescription: Legacy exercise package.\n---\n");
    await writeFile(join(root, "INSTALL.md"), "# Install\n");
    await writeFile(join(root, "CHANGELOG.md"), "# Changelog\n");
    await writeFile(join(root, "templates", "brief.md"), "# Brief\n");
    await writeFile(join(root, "references", "gates.md"), "# Gates\n");
    await writeFile(join(root, "examples", "example.md"), "# Example\n");
    await assert.rejects(() => checkSkillPackage(root), /README\.md|commercial/i);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("package checker accepts different task-specific filenames inside required folders", async () => {
  const root = await mkdtemp(join(tmpdir(), "kunlun-skill-package-"));
  try {
    await createPackageFixture(root);
    assert.equal(await checkSkillPackage(root), root);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("package checker rejects an empty required content folder", async () => {
  const root = await mkdtemp(join(tmpdir(), "kunlun-skill-package-"));
  try {
    await createPackageFixture(root, { emptyExamples: true });
    await assert.rejects(() => checkSkillPackage(root), /examples.*empty/i);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("package checker rejects a SKILL entrypoint without valid discoverable frontmatter", async () => {
  const root = await mkdtemp(join(tmpdir(), "kunlun-skill-package-"));
  try {
    await createPackageFixture(root, { invalidFrontmatter: true });
    await assert.rejects(() => checkSkillPackage(root), /frontmatter/i);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("package checker accepts a concise action-oriented description", async () => {
  const root = await mkdtemp(join(tmpdir(), "kunlun-skill-package-"));
  try {
    await createPackageFixture(root, { description: "Create source-grounded ecommerce materials from supplied facts." });
    assert.equal(await checkSkillPackage(root), root);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("package checker rejects content changed after checksums were written", async () => {
  const root = await mkdtemp(join(tmpdir(), "kunlun-skill-package-"));
  try {
    await createPackageFixture(root);
    await writeFile(join(root, "README.md"), "# Tampered after release\n");
    await assert.rejects(() => checkSkillPackage(root), /checksum mismatch/i);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("package checker rejects an invalid example configuration", async () => {
  const root = await mkdtemp(join(tmpdir(), "kunlun-skill-package-"));
  try {
    await createPackageFixture(root);
    await writeFile(join(root, "config.example.json"), "{ invalid json\n");
    await assert.rejects(() => checkSkillPackage(root), /config\.example\.json.*valid JSON/i);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
