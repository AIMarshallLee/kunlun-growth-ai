#!/usr/bin/env node

/**
 * Dependency-free audit for the static marketing site.
 * Usage: node scripts/audit-site.mjs [site-root]
 */
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const siteRoot = path.resolve(process.argv[2] || path.join(scriptDir, '..'));
const origin = 'https://kunlungrowth.com';
const failures = [];
const notes = [];

function fail(message) {
  failures.push(message);
  console.error(`FAIL ${message}`);
}

function pass(message) {
  console.log(`PASS ${message}`);
}

function walk(dir) {
  const result = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) result.push(...walk(full));
    else if (entry.isFile() && entry.name.toLowerCase().endsWith('.html')) result.push(full);
  }
  return result;
}

function textOnly(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

function routeForFile(file) {
  const relative = path.relative(siteRoot, file).split(path.sep).join('/');
  if (relative === 'index.html') return '/';
  if (relative.endsWith('/index.html')) return `/${relative.slice(0, -'index.html'.length)}`;
  return `/${relative}`;
}

function fileForRoute(route) {
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(route, origin).pathname);
  } catch {
    return null;
  }
  if (!pathname.startsWith('/') || pathname.includes('\\0') || pathname.includes('/../')) return null;
  const clean = pathname.replace(/^\/+/, '');
  const candidates = [];
  if (!clean || clean.endsWith('/')) candidates.push(path.join(siteRoot, clean, 'index.html'));
  else candidates.push(path.join(siteRoot, clean), path.join(siteRoot, clean, 'index.html'));
  for (const candidate of candidates) {
    const resolved = path.resolve(candidate);
    if (resolved.startsWith(`${siteRoot}${path.sep}`) || resolved === siteRoot) {
      if (fs.existsSync(resolved) && fs.statSync(resolved).isFile()) return resolved;
    }
  }
  return null;
}

function attr(tag, name) {
  const match = tag.match(new RegExp(`\\b${name}\\s*=\\s*(["'])([\\s\\S]*?)\\1`, 'i'));
  return match ? match[2].trim() : '';
}

function tags(html, tagName) {
  return html.match(new RegExp(`<${tagName}\\b[^>]*>`, 'gi')) || [];
}

function checkEnterprisePage(file, html) {
  const page = textOnly(html).toLowerCase();
  const required = [
    ['品牌性质（企业 AI 服务/咨询）', /昆仑增长|kunlun growth/],
    ['企业 AI 定位', /企业\s*ai/],
    ['Marshall', /marshall/],
    ['商务邮箱', /marshall\s*@\s*kunlungrowth\.com/],
    ['三类场景（销售、运营/内容、客服）', /销售/],
    ['三类场景（销售、运营/内容、客服）', /运营|内容/],
    ['三类场景（销售、运营/内容、客服）', /客服/],
    ['20分钟', /20\s*分钟|20-minute|20 minute/],
    ['非客户案例声明', /不[^。；,，]{0,24}(客户案例|客户成果|客户案例参考)/],
    ['不承诺效果/结果', /不承诺[^。；,，]{0,24}(效果|结果|收益)|效果[^。；,，]{0,12}(不作承诺|不保证)/],
    ['敏感数据边界', /(敏感|保密|隐私)[^。]{0,40}(边界|不需要|不接入|脱敏|权限|禁止|不得|不使用|授权)/],
  ];
  for (const [label, pattern] of required) {
    if (!pattern.test(page)) fail(`${routeForFile(file)} 缺少 ${label}`);
  }
}

const htmlFiles = walk(siteRoot);
if (htmlFiles.length === 0) fail(`未找到 HTML 文件：${siteRoot}`);
const routeMap = new Map(htmlFiles.map((file) => [routeForFile(file), file]));
const seenTitles = new Map();
const seenDescriptions = new Map();
const seenCanonicals = new Map();

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8');
  const route = routeForFile(file);
  const title = html.match(/<title\b[^>]*>[\s\S]*?<\/title>/gi) || [];
  const descriptions = tags(html, 'meta').filter((tag) => /^description$/i.test(attr(tag, 'name')));
  const canonicals = tags(html, 'link').filter((tag) => /^canonical$/i.test(attr(tag, 'rel')));
  const h1s = tags(html, 'h1');
  if (title.length !== 1 || !title[0].replace(/^<[\s\S]*?>/, '').replace(/<\/title>\s*$/i, '').trim()) fail(`${route} 必须恰好有一个非空 title`);
  if (descriptions.length !== 1 || !attr(descriptions[0], 'content')) fail(`${route} 必须恰好有一个非空 meta description`);
  if (canonicals.length !== 1 || !attr(canonicals[0], 'href')) fail(`${route} 必须恰好有一个 canonical`);
  if (h1s.length !== 1) fail(`${route} 必须恰好有一个 H1（当前 ${h1s.length} 个）`);
  const titleText = title[0]?.replace(/^<[\s\S]*?>/, '').replace(/<\/title>\s*$/i, '').trim();
  const descriptionText = descriptions[0] ? attr(descriptions[0], 'content') : '';
  const canonicalUrl = canonicals[0] ? attr(canonicals[0], 'href') : '';
  const expectedCanonical = `${origin}${route}`;
  if (canonicalUrl && canonicalUrl !== expectedCanonical) {
    fail(`${route} canonical 必须为 ${expectedCanonical}（当前 ${canonicalUrl}）`);
  }
  for (const [label, value, registry] of [
    ['title', titleText, seenTitles],
    ['meta description', descriptionText, seenDescriptions],
    ['canonical', canonicalUrl, seenCanonicals],
  ]) {
    if (!value) continue;
    if (registry.has(value)) fail(`${route} 与 ${registry.get(value)} 重复 ${label}`);
    else registry.set(value, route);
  }
  const robots = tags(html, 'meta').filter((tag) => /^(robots|googlebot)$/i.test(attr(tag, 'name'))).map((tag) => attr(tag, 'content').toLowerCase()).join(',');
  if (/\bnoindex\b/.test(robots) || /<meta\b[^>]*\bcontent\s*=\s*["'][^"']*\bnoindex\b/i.test(html)) fail(`${route} 不得包含 noindex`);

  for (const script of html.match(/<script\b[^>]*type\s*=\s*(["'])application\/ld\+json\1[^>]*>[\s\S]*?<\/script>/gi) || []) {
    const body = script.replace(/^<[\s\S]*?>/, '').replace(/<\/script>\s*$/i, '').trim();
    try { JSON.parse(body); } catch (error) { fail(`${route} JSON-LD 不可解析：${error.message}`); }
  }

  const links = [...tags(html, 'a'), ...tags(html, 'link'), ...tags(html, 'script')]
    .map((tag) => attr(tag, tag.toLowerCase().startsWith('<script') ? 'src' : 'href'))
    .filter(Boolean);
  for (const href of links) {
    let url;
    try { url = new URL(href, `${origin}${route}`); } catch { fail(`${route} 链接 URL 无法解析：${href}`); continue; }
    if (url.protocol !== 'https:' && url.protocol !== 'http:') continue;
    if (url.hostname !== 'kunlungrowth.com') continue;
    if (!fileForRoute(url.pathname)) fail(`${route} 站内链接不存在：${href}`);
  }
  if (route === '/enterprise-ai/' || route.startsWith('/enterprise-ai/')) checkEnterprisePage(file, html);
}

const sitemapPath = path.join(siteRoot, 'sitemap.xml');
if (!fs.existsSync(sitemapPath)) fail('缺少 sitemap.xml');
else {
  const sitemap = fs.readFileSync(sitemapPath, 'utf8');
  const urls = [...sitemap.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/gi)].map((match) => match[1]);
  if (urls.length === 0) fail('sitemap.xml 没有 loc URL');
  const sitemapRoutes = new Set();
  for (const value of urls) {
    let url;
    try { url = new URL(value); } catch { fail(`sitemap URL 无法解析：${value}`); continue; }
    if (url.hostname !== 'kunlungrowth.com') fail(`sitemap URL 域名不是 kunlungrowth.com：${value}`);
    if (!fileForRoute(url.pathname)) fail(`sitemap URL 未映射到文件：${value}`);
    if (sitemapRoutes.has(url.pathname)) fail(`sitemap URL 重复：${value}`);
    sitemapRoutes.add(url.pathname);
  }
  for (const route of routeMap.keys()) {
    if (!sitemapRoutes.has(route)) fail(`HTML 页面未列入 sitemap：${route}`);
  }
  pass(`sitemap.xml 映射检查（${urls.length} 个 URL）`);
}

const robotsPath = path.join(siteRoot, 'robots.txt');
if (!fs.existsSync(robotsPath)) fail('缺少 robots.txt');
else {
  const robotsText = fs.readFileSync(robotsPath, 'utf8');
  const robotsLines = robotsText.split(/\r?\n/).map((line) => line.trim());
  if (!robotsLines.some((line) => /^User-agent:\s*\*$/i.test(line))) fail('robots.txt 缺少 User-agent: *');
  if (!robotsLines.some((line) => /^Allow:\s*\/$/i.test(line))) fail('robots.txt 缺少 Allow: /');
  if (/^Disallow:\s*\/\s*$/im.test(robotsText)) fail('robots.txt 不得全站 Disallow: /');
  if (!robotsLines.includes(`Sitemap: ${origin}/sitemap.xml`)) {
    fail(`robots.txt 必须声明 Sitemap: ${origin}/sitemap.xml`);
  }
  pass('robots.txt 抓取与 sitemap 声明检查');
}

const vercelConfigPath = path.join(siteRoot, 'vercel.json');
if (!fs.existsSync(vercelConfigPath)) fail('缺少 vercel.json');
else {
  let vercelConfig;
  try { vercelConfig = JSON.parse(fs.readFileSync(vercelConfigPath, 'utf8')); }
  catch (error) { fail(`vercel.json 不可解析：${error.message}`); }
  if (vercelConfig) {
    const configuredHeaders = new Set(
      (vercelConfig.headers || []).flatMap((rule) => rule.headers || []).map((header) => String(header.key || '').toLowerCase()),
    );
    for (const requiredHeader of [
      'content-security-policy',
      'x-content-type-options',
      'x-frame-options',
      'referrer-policy',
      'permissions-policy',
      'strict-transport-security',
    ]) {
      if (!configuredHeaders.has(requiredHeader)) fail(`vercel.json 缺少安全响应头 ${requiredHeader}`);
    }
    pass('vercel.json 安全响应头检查');
  }
}

if (!routeMap.has('/enterprise-ai/')) fail('缺少强制审计页面 /enterprise-ai/（新页尚未出现时这是预期失败）');
else pass('/enterprise-ai/ 强制商业边界检查');

if (htmlFiles.length && failures.length === 0) pass(`静态站审计通过（${htmlFiles.length} 个 HTML 文件）`);
else console.error(`审计失败：${failures.length} 项；HTML 文件 ${htmlFiles.length} 个`);
process.exitCode = failures.length ? 1 : 0;
