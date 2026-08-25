import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createReadStream } from "node:fs";
import { access, mkdtemp, rm, stat } from "node:fs/promises";
import { createServer } from "node:http";
import { tmpdir } from "node:os";
import { dirname, extname, join, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outputDir = join(root, "out");
const mode = process.env.BROWSER_ACCEPTANCE_MODE === "formspree-failure" ? "formspree-failure" : "empty";
const mime = new Map([
  [".css", "text/css; charset=utf-8"],
  [".html", "text/html; charset=utf-8"],
  [".ico", "image/x-icon"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".png", "image/png"],
  [".svg", "image/svg+xml"],
  [".txt", "text/plain; charset=utf-8"],
  [".webp", "image/webp"],
  [".xml", "application/xml; charset=utf-8"],
]);

const delay = (milliseconds) => new Promise((resolvePromise) => setTimeout(resolvePromise, milliseconds));

function assertNoBrowserErrors(errors) {
  if (errors.length > 0) throw new Error(`Browser errors (${errors.length}):\n${errors.slice(0, 20).join("\n")}`);
}

async function existingFile(paths) {
  for (const path of paths) {
    try { await access(path); return path; } catch { /* Try the next known browser path. */ }
  }
  throw new Error("Chrome/Edge not found. Set BROWSER_EXECUTABLE to a Chromium-compatible browser.");
}

async function resolveStaticFile(requestPath) {
  const pathname = decodeURIComponent(new URL(requestPath, "http://localhost").pathname);
  const relative = pathname === "/" ? "index.html" : pathname.replace(/^\/+/, "");
  const candidates = extname(relative)
    ? [relative]
    : [`${relative}.html`, join(relative, "index.html")];
  const filename = relative.slice(relative.lastIndexOf("/") + 1);
  if (filename.startsWith("__next.") && filename.endsWith(".__PAGE__.txt")) {
    const directory = relative.slice(0, Math.max(0, relative.lastIndexOf("/")));
    const routeParts = filename.slice(0, -".__PAGE__.txt".length).split(".");
    if (routeParts.length >= 2) candidates.unshift(join(directory, `${routeParts[0]}.${routeParts[1]}`, ...routeParts.slice(2), "__PAGE__.txt"));
  }
  for (const candidate of candidates) {
    const absolute = resolve(outputDir, candidate);
    if (absolute !== outputDir && !absolute.startsWith(`${outputDir}${sep}`)) continue;
    try { if ((await stat(absolute)).isFile()) return absolute; } catch { /* Try the next export shape. */ }
  }
  return undefined;
}

async function startStaticServer() {
  const server = createServer(async (request, response) => {
    if (new URL(request.url || "/", "http://localhost").pathname === "/favicon.ico") { response.writeHead(204); response.end(); return; }
    const file = await resolveStaticFile(request.url || "/");
    if (!file) { response.writeHead(404); response.end("Not found"); return; }
    response.writeHead(200, { "Content-Type": mime.get(extname(file)) || "application/octet-stream", "Cache-Control": "no-store" });
    createReadStream(file).pipe(response);
  });
  await new Promise((resolvePromise, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolvePromise);
  });
  const address = server.address();
  assert(address && typeof address === "object");
  return { server, origin: `http://127.0.0.1:${address.port}` };
}

async function launchBrowser(executable, profileDir) {
  const child = spawn(executable, [
    "--headless=new",
    "--disable-gpu",
    "--disable-breakpad",
    "--disable-crash-reporter",
    "--no-first-run",
    "--no-default-browser-check",
    "--remote-debugging-port=0",
    `--user-data-dir=${profileDir}`,
    "about:blank",
  ], { stdio: ["ignore", "ignore", "pipe"], windowsHide: true });
  const endpoint = await new Promise((resolvePromise, reject) => {
    const timeout = setTimeout(() => reject(new Error("Timed out waiting for the browser debugging endpoint.")), 15000);
    let stderr = "";
    child.once("error", (error) => { clearTimeout(timeout); reject(error); });
    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
      const match = stderr.match(/DevTools listening on (ws:\/\/[^\s]+)/);
      if (match) { clearTimeout(timeout); resolvePromise(match[1]); }
    });
    child.once("exit", (code) => { clearTimeout(timeout); reject(new Error(`Browser exited before startup (code ${code}).\n${stderr}`)); });
  });
  return { child, endpoint };
}

class CdpClient {
  constructor(endpoint) {
    this.socket = new WebSocket(endpoint);
    this.nextId = 1;
    this.pending = new Map();
    this.listeners = new Map();
  }

  async open() {
    if (this.socket.readyState === WebSocket.OPEN) return;
    await new Promise((resolvePromise, reject) => {
      this.socket.addEventListener("open", resolvePromise, { once: true });
      this.socket.addEventListener("error", () => reject(new Error("Could not connect to the browser debugging endpoint.")), { once: true });
    });
    this.socket.addEventListener("message", (event) => {
      const message = JSON.parse(String(event.data));
      if (message.id) {
        const pending = this.pending.get(message.id);
        if (!pending) return;
        this.pending.delete(message.id);
        if (message.error) pending.reject(new Error(`${pending.method}: ${message.error.message}`));
        else pending.resolve(message.result || {});
        return;
      }
      for (const listener of this.listeners.get(message.method) || []) listener(message);
    });
  }

  send(method, params = {}, sessionId) {
    const id = this.nextId++;
    return new Promise((resolvePromise, reject) => {
      this.pending.set(id, { resolve: resolvePromise, reject, method });
      this.socket.send(JSON.stringify({ id, method, params, ...(sessionId ? { sessionId } : {}) }));
    });
  }

  on(method, listener) {
    const listeners = this.listeners.get(method) || [];
    listeners.push(listener);
    this.listeners.set(method, listeners);
  }

  close() { this.socket.close(); }
}

async function evaluate(client, sessionId, expression) {
  const result = await client.send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true }, sessionId);
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text || "Browser evaluation failed.");
  return result.result?.value;
}

async function waitForReady(client, sessionId) {
  for (let attempt = 0; attempt < 100; attempt += 1) {
    if (await evaluate(client, sessionId, "document.readyState === 'complete'")) { await delay(150); return; }
    await delay(50);
  }
  throw new Error("Page did not become ready.");
}

async function navigate(client, sessionId, url) {
  const result = await client.send("Page.navigate", { url }, sessionId);
  if (result.errorText) throw new Error(result.errorText);
  await waitForReady(client, sessionId);
}

function setValueExpression(selector, value) {
  return `(() => { const element = document.querySelector(${JSON.stringify(selector)}); if (!element) return false; const prototype = element instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype; Object.getOwnPropertyDescriptor(prototype, 'value').set.call(element, ${JSON.stringify(value)}); element.dispatchEvent(new Event('input', { bubbles: true })); element.dispatchEvent(new Event('change', { bubbles: true })); return true; })()`;
}

async function runEmptyConfigAcceptance(client, sessionId, origin, errors) {
  const routes = ["/", "/tutorials", "/tutorials/codex-app", "/cases", "/skills", "/skills/product-material-agent", "/tools/product-opportunity-card", "/contact", "/submit"];
  await client.send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false }, sessionId);
  for (const route of routes) {
    await navigate(client, sessionId, `${origin}${route}`);
    assert.equal(await evaluate(client, sessionId, "document.querySelectorAll('main').length"), 1, `${route} must render one main element`);
    assert.equal(await evaluate(client, sessionId, "document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1"), true, `${route} overflows on desktop`);
  }

  await navigate(client, sessionId, `${origin}/submit`);
  assert.equal(await evaluate(client, sessionId, "document.querySelector('fieldset')?.disabled"), true);
  assert.equal(await evaluate(client, sessionId, "document.querySelector('button[type=submit]')?.disabled"), true);
  assert.equal(await evaluate(client, sessionId, "document.body.innerText.includes('投稿通道尚未配置')"), true);

  await navigate(client, sessionId, `${origin}/contact`);
  assert.equal(await evaluate(client, sessionId, setValueExpression("input[name=name]", "E2E Contact")), true);
  assert.equal(await evaluate(client, sessionId, setValueExpression("input[name=email]", "e2e@example.com")), true);
  assert.equal(await evaluate(client, sessionId, setValueExpression("textarea[name=scenario]", "E2E unavailable delivery check")), true);
  await evaluate(client, sessionId, "document.querySelector('.check input')?.click(); document.querySelector('form')?.requestSubmit(); true");
  await delay(100);
  assert.equal(await evaluate(client, sessionId, "document.body.innerText.includes('你的内容没有被发送')"), true);
  assert.equal(await evaluate(client, sessionId, "document.body.innerText.includes('咨询已发送')"), false);
  assert.equal(await evaluate(client, sessionId, "document.querySelector('input[name=name]')?.value"), "E2E Contact");

  await navigate(client, sessionId, `${origin}/cases`);
  assert.equal(await evaluate(client, sessionId, "document.querySelectorAll('.case-card').length"), 20);
  await evaluate(client, sessionId, "Array.from(document.querySelectorAll('.case-filters button')).find((button) => button.textContent.includes('选品与市场洞察'))?.click(); true");
  await delay(100);
  assert.equal(await evaluate(client, sessionId, "document.querySelectorAll('.case-card').length"), 3);
  assert.equal(await evaluate(client, sessionId, "document.querySelector('.case-filters button.active')?.textContent.includes('选品与市场洞察')"), true);

  await navigate(client, sessionId, `${origin}/tools/product-opportunity-card`);
  assert.equal(await evaluate(client, sessionId, setValueExpression(".opportunity-form input", "E2E Opportunity")), true);
  assert.equal(await evaluate(client, sessionId, "document.querySelector('.opportunity-preview pre')?.textContent.includes('E2E Opportunity')"), true);
  await evaluate(client, sessionId, "document.querySelector('.opportunity-preview button')?.click(); true");
  await delay(150);
  assert.equal(await evaluate(client, sessionId, "document.querySelector('.opportunity-preview button')?.textContent"), "已复制");

  await navigate(client, sessionId, `${origin}/tutorials/codex-app`);
  await evaluate(client, sessionId, "document.querySelector('.guide-step input[type=checkbox]')?.click(); true");
  await delay(100);
  assert.match(await evaluate(client, sessionId, "document.querySelector('.guide-progress small')?.textContent"), /^1 \/ 7/);
  await navigate(client, sessionId, `${origin}/tutorials/codex-app`);
  assert.match(await evaluate(client, sessionId, "document.querySelector('.guide-progress small')?.textContent"), /^1 \/ 7/);
  assert.equal(await evaluate(client, sessionId, "document.querySelectorAll('.guide-step input[type=checkbox]:checked').length"), 1);

  await client.send("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 1, mobile: true }, sessionId);
  for (const route of routes) {
    await navigate(client, sessionId, `${origin}${route}`);
    assert.equal(await evaluate(client, sessionId, "document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1"), true, `${route} overflows on mobile`);
  }
  assertNoBrowserErrors(errors);
  return { routes: routes.length, desktopOverflow: 0, mobileOverflow: 0, consoleErrors: 0, progress: "1 / 7", filteredCases: 3 };
}

async function fillAndSubmit(client, sessionId, values, checkboxSelector = ".check input") {
  for (const [selector, value] of values) assert.equal(await evaluate(client, sessionId, setValueExpression(selector, value)), true, `missing ${selector}`);
  await evaluate(client, sessionId, `document.querySelector(${JSON.stringify(checkboxSelector)})?.click(); document.querySelector('form')?.requestSubmit(); true`);
  await delay(200);
}

async function runFormspreeFailureAcceptance(client, sessionId, origin, errors) {
  await navigate(client, sessionId, `${origin}/contact`);
  await fillAndSubmit(client, sessionId, [
    ["input[name=name]", "E2E Contact Failure"],
    ["input[name=email]", "e2e@example.com"],
    ["textarea[name=scenario]", "Keep this failed contact inquiry"],
  ]);
  assert.equal(await evaluate(client, sessionId, "document.body.innerText.includes('发送失败，已填写内容仍保留')"), true);
  assert.equal(await evaluate(client, sessionId, "document.querySelector('input[name=name]')?.value"), "E2E Contact Failure");

  await navigate(client, sessionId, `${origin}/submit`);
  await fillAndSubmit(client, sessionId, [
    ["input[name=title]", "E2E Submission Failure"],
    ["input[name=author]", "E2E Team"],
    ["textarea[name=summary]", "Keep this failed submission"],
    ["input[name=publicUrl]", "https://example.com/e2e"],
  ]);
  assert.equal(await evaluate(client, sessionId, "document.body.innerText.includes('发送失败，已填写内容仍保留')"), true);
  assert.equal(await evaluate(client, sessionId, "document.querySelector('input[name=title]')?.value"), "E2E Submission Failure");
  assert.equal(await evaluate(client, sessionId, "document.body.innerText.includes('投稿已发送')"), false);
  assertNoBrowserErrors(errors);
  return { contactFailureRetained: true, submissionFailureRetained: true, consoleErrors: 0 };
}

await access(join(outputDir, "index.html"));
const executable = await existingFile([
  process.env.BROWSER_EXECUTABLE,
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].filter(Boolean));
const profileDir = await mkdtemp(join(tmpdir(), "kunlun-browser-acceptance-"));
const { server, origin } = await startStaticServer();
let browserProcess;
let client;
let contextId;
try {
  const launched = await launchBrowser(executable, profileDir);
  browserProcess = launched.child;
  client = new CdpClient(launched.endpoint);
  await client.open();
  ({ browserContextId: contextId } = await client.send("Target.createBrowserContext"));
  const { targetId } = await client.send("Target.createTarget", { url: "about:blank", browserContextId: contextId });
  const attached = await client.send("Target.attachToTarget", { targetId, flatten: true });
  const sessionId = attached.sessionId;
  const errors = [];
  client.on("Runtime.exceptionThrown", (event) => { if (event.sessionId === sessionId) errors.push(event.params.exceptionDetails.text || "runtime exception"); });
  client.on("Runtime.consoleAPICalled", (event) => { if (event.sessionId === sessionId && event.params.type === "error") errors.push("console.error"); });
  client.on("Log.entryAdded", (event) => {
    if (event.sessionId === sessionId && event.params.entry.level === "error") {
      const entry = event.params.entry;
      errors.push(`${entry.text}${entry.url ? ` · ${entry.url}` : ""}`);
    }
  });
  await Promise.all([
    client.send("Page.enable", {}, sessionId),
    client.send("Runtime.enable", {}, sessionId),
    client.send("Log.enable", {}, sessionId),
  ]);
  if (mode === "empty") {
    await client.send("Browser.grantPermissions", { browserContextId: contextId, origin, permissions: ["clipboardReadWrite", "clipboardSanitizedWrite"] }).catch(() => {});
  }
  if (mode === "formspree-failure") {
    await client.send("Page.addScriptToEvaluateOnNewDocument", { source: `(() => { const originalFetch = window.fetch.bind(window); window.fetch = (input, init) => String(input).startsWith('https://formspree.io/f/') ? Promise.resolve(new Response('simulated failure', { status: 500 })) : originalFetch(input, init); })();` }, sessionId);
  }
  const result = mode === "formspree-failure"
    ? await runFormspreeFailureAcceptance(client, sessionId, origin, errors)
    : await runEmptyConfigAcceptance(client, sessionId, origin, errors);
  console.log(JSON.stringify({ mode, browser: executable, ...result }, null, 2));
} finally {
  if (client && contextId) await client.send("Target.disposeBrowserContext", { browserContextId: contextId }).catch(() => {});
  if (client) await client.send("Browser.close").catch(() => {});
  if (browserProcess && browserProcess.exitCode === null) {
    await Promise.race([
      new Promise((resolvePromise) => browserProcess.once("exit", resolvePromise)),
      delay(3000),
    ]);
  }
  if (browserProcess && browserProcess.exitCode === null) browserProcess.kill();
  if (client) client.close();
  await new Promise((resolvePromise) => server.close(resolvePromise));
  if (profileDir.startsWith(`${tmpdir()}${sep}`)) await rm(profileDir, { recursive: true, force: true, maxRetries: 10, retryDelay: 100 });
}
