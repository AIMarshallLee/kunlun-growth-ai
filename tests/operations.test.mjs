import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

async function exists(path) {
  try {
    await access(new URL(path, root));
    return true;
  } catch {
    return false;
  }
}

test("ships a private lead and delivery ledger with only safe operational fields", async () => {
  assert.equal(await exists("operations/lead-and-delivery-ledger-template.csv"), true);
  const ledger = await readFile(new URL("operations/lead-and-delivery-ledger-template.csv", root), "utf8");
  const header = ledger.trim().split("\n")[0];
  assert.equal(header, "lead_id,source,product_slug,identity,scenario_summary,status,entitlement,delivery_version,delivered_at,first_run_status,feedback_summary,case_permission");
  assert.doesNotMatch(ledger, /api[_ -]?key|cookie|token|payment card|订单号/i);
});

test("ships a product evidence card with all six verification gates", async () => {
  assert.equal(await exists("operations/product-evidence-card-template.md"), true);
  const card = await readFile(new URL("operations/product-evidence-card-template.md", root), "utf8");
  for (const gate of ["内容完整", "安全检查", "目标工具演练", "外部使用", "质量门槛", "反馈回收", "结论"]) assert.match(card, new RegExp(gate));
});

test("ships an operations template checker", async () => {
  assert.equal(await exists("scripts/check-operations-templates.mjs"), true);
});

test("ships a safe discovery script and anonymized discovery log", async () => {
  assert.equal(await exists("operations/customer-discovery-script.md"), true);
  assert.equal(await exists("operations/customer-discovery-log-template.csv"), true);
  const script = await readFile(new URL("operations/customer-discovery-script.md", root), "utf8");
  const log = await readFile(new URL("operations/customer-discovery-log-template.csv", root), "utf8");
  for (const prompt of ["当前任务", "当前做法", "时间或成本", "工具环境", "愿付费信号", "拒绝原因", "后续许可"]) assert.match(script, new RegExp(prompt));
  assert.match(log, /^lead_id,product_slug,current_task,current_approach,time_or_cost,tool_environment,willingness_signal,rejection_reason,follow_up_permission\r?$/m);
  assert.doesNotMatch(script + log, /api[_ -]?key|cookie|token|真实订单|客户文件/i);
});

test("ships weekly and monthly review templates with explicit decisions", async () => {
  assert.equal(await exists("operations/weekly-growth-review-template.md"), true);
  assert.equal(await exists("operations/monthly-product-decision-template.md"), true);
  const weekly = await readFile(new URL("operations/weekly-growth-review-template.md", root), "utf8");
  const monthly = await readFile(new URL("operations/monthly-product-decision-template.md", root), "utf8");
  for (const heading of ["漏斗", "交付", "风险", "下一周实验", "敏感数据事件"]) assert.match(weekly, new RegExp(heading));
  for (const heading of ["证据", "结论", "版本行动", "停止条件", "负责人"]) assert.match(monthly, new RegExp(heading));
  assert.match(monthly, /继续 \/ 修订 \/ 候补 \/ 停售/);
});
