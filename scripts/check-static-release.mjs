import { access, readFile, readdir } from "node:fs/promises";
import { extname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = resolve(import.meta.dirname, "..");

async function listFiles(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await listFiles(path));
    if (entry.isFile()) files.push(path);
  }
  return files;
}

function outputCandidates(outRoot, pathname) {
  const decoded = decodeURIComponent(pathname).replace(/^\/+/, "").replace(/\/$/, "");
  if (!decoded) return [join(outRoot, "index.html")];
  if (extname(decoded)) return [join(outRoot, ...decoded.split("/"))];
  return [
    join(outRoot, ...`${decoded}.html`.split("/")),
    join(outRoot, ...decoded.split("/"), "index.html"),
    join(outRoot, ...decoded.split("/")),
  ];
}

async function firstExisting(paths) {
  for (const path of paths) {
    try {
      await access(path);
      return path;
    } catch {
      // Try the next static-export shape.
    }
  }
  return "";
}

function pagePath(outRoot, htmlFile) {
  const local = relative(outRoot, htmlFile).split(sep).join("/");
  if (local === "index.html") return "/";
  return `/${local.replace(/\.html$/, "")}`;
}

function canonicalFromHtml(html) {
  const tag = html.match(/<link\b[^>]*\brel=["']canonical["'][^>]*>/i)?.[0] || "";
  return tag.match(/\bhref=["']([^"']+)["']/i)?.[1] || "";
}

export async function checkStaticRelease(outRoot = join(repoRoot, "out")) {
  const allFiles = await listFiles(outRoot);
  const htmlFiles = allFiles.filter((file) => file.endsWith(".html"));
  const missingLinks = [];
  let internalLinks = 0;

  for (const htmlFile of htmlFiles) {
    const html = await readFile(htmlFile, "utf8");
    const base = new URL(pagePath(outRoot, htmlFile), "https://local.invalid");
    for (const match of html.matchAll(/\bhref=["']([^"']+)["']/gi)) {
      const href = match[1].replaceAll("&amp;", "&");
      if (/^(?:https?:|mailto:|tel:|javascript:|data:|#)/i.test(href)) continue;
      const target = new URL(href, base);
      if (target.origin !== base.origin) continue;
      internalLinks += 1;
      if (!await firstExisting(outputCandidates(outRoot, target.pathname))) {
        missingLinks.push(`${relative(outRoot, htmlFile)} -> ${href}`);
      }
    }
  }

  if (missingLinks.length) throw new Error(`Missing generated links:\n${missingLinks.join("\n")}`);

  const sitemapXml = await readFile(join(outRoot, "sitemap.xml"), "utf8");
  const sitemapUrls = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  if (!sitemapUrls.length) throw new Error("sitemap.xml has no URLs");
  const origin = new URL(sitemapUrls[0]).origin;
  for (const value of sitemapUrls) {
    const url = new URL(value);
    if (url.origin !== origin) throw new Error(`Sitemap origin mismatch: ${value}`);
    const htmlFile = await firstExisting(outputCandidates(outRoot, url.pathname));
    if (!htmlFile) throw new Error(`Sitemap URL has no generated HTML: ${value}`);
    const canonical = canonicalFromHtml(await readFile(htmlFile, "utf8"));
    if (!canonical || new URL(canonical).href !== new URL(value).href) throw new Error(`Canonical mismatch: ${relative(outRoot, htmlFile)} expected ${value}, got ${canonical || "missing"}`);
  }

  const robots = await readFile(join(outRoot, "robots.txt"), "utf8");
  if (!robots.includes(`Sitemap: ${origin}/sitemap.xml`)) throw new Error("robots.txt sitemap origin does not match sitemap.xml");

  for (const route of ["contact", "login", "submit"]) {
    const html = await readFile(join(outRoot, `${route}.html`), "utf8");
    if (!/<meta\b[^>]*\bname=["']robots["'][^>]*\bcontent=["'][^"']*noindex/i.test(html)) throw new Error(`${route}.html is missing robots noindex metadata`);
  }

  for (const htmlFile of htmlFiles) {
    const html = await readFile(htmlFile, "utf8");
    if (html.includes("static.cloudflareinsights.com/beacon.min.js")) throw new Error("Analytics script is present in an unconfigured build");
  }

  return {
    htmlFiles: htmlFiles.length,
    internalLinks,
    sitemapUrls: sitemapUrls.length,
    origin,
    missingLinks: 0,
    analyticsScripts: 0,
  };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const result = await checkStaticRelease(process.argv[2] ? resolve(process.argv[2]) : undefined);
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
}
