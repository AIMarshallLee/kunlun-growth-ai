import { createHash } from "node:crypto";
import { readdir, readFile, writeFile } from "node:fs/promises";
import { relative, resolve, sep } from "node:path";
import { pathToFileURL } from "node:url";

export async function writeSkillChecksums(packageDirectory) {
  const root = resolve(packageDirectory);
  const files = [];

  async function visit(directory) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const path = resolve(directory, entry.name);
      if (entry.isDirectory()) await visit(path);
      if (entry.isFile()) {
        const name = relative(root, path).split(sep).join("/");
        if (name !== "CHECKSUMS.sha256") files.push(name);
      }
    }
  }

  await visit(root);
  files.sort();
  const lines = [];
  for (const file of files) {
    const content = await readFile(resolve(root, ...file.split("/")));
    lines.push(`${createHash("sha256").update(content).digest("hex")}  ${file}`);
  }
  const destination = resolve(root, "CHECKSUMS.sha256");
  await writeFile(destination, `${lines.join("\n")}\n`, "utf8");
  return { destination, fileCount: files.length };
}

const invokedFromCommandLine = process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href;
if (invokedFromCommandLine) {
  if (!process.argv[2]) throw new Error("Usage: node scripts/write-skill-checksums.mjs <package-directory>");
  const result = await writeSkillChecksums(process.argv[2]);
  console.log(`WROTE: ${result.destination} (${result.fileCount} files)`);
}
