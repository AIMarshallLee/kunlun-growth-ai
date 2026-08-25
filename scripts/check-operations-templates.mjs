import { access, readFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(process.cwd());
const ledgerPath = resolve(root, "operations/lead-and-delivery-ledger-template.csv");
const evidencePath = resolve(root, "operations/product-evidence-card-template.md");
const discoveryScriptPath = resolve(root, "operations/customer-discovery-script.md");
const discoveryLogPath = resolve(root, "operations/customer-discovery-log-template.csv");
const weeklyReviewPath = resolve(root, "operations/weekly-growth-review-template.md");
const monthlyDecisionPath = resolve(root, "operations/monthly-product-decision-template.md");
const expectedHeader = "lead_id,source,product_slug,identity,scenario_summary,status,entitlement,delivery_version,delivered_at,first_run_status,feedback_summary,case_permission";
const expectedDiscoveryHeader = "lead_id,product_slug,current_task,current_approach,time_or_cost,tool_environment,willingness_signal,rejection_reason,follow_up_permission";
const evidenceGates = ["内容完整", "安全检查", "目标工具演练", "外部使用", "质量门槛", "反馈回收", "结论"];
const discoveryPrompts = ["当前任务", "当前做法", "时间或成本", "工具环境", "愿付费信号", "拒绝原因", "后续许可"];
const weeklySections = ["漏斗", "交付", "风险", "下一周实验", "敏感数据事件"];
const monthlySections = ["证据", "结论", "版本行动", "停止条件", "负责人", "继续 / 修订 / 候补 / 停售"];
const forbidden = /api[_ -]?key|cookie|token|payment card|订单号/i;

await access(ledgerPath);
await access(evidencePath);
await access(discoveryScriptPath);
await access(discoveryLogPath);
await access(weeklyReviewPath);
await access(monthlyDecisionPath);

const ledger = await readFile(ledgerPath, "utf8");
const evidence = await readFile(evidencePath, "utf8");
const discoveryScript = await readFile(discoveryScriptPath, "utf8");
const discoveryLog = await readFile(discoveryLogPath, "utf8");
const weeklyReview = await readFile(weeklyReviewPath, "utf8");
const monthlyDecision = await readFile(monthlyDecisionPath, "utf8");

if (ledger.trim().split("\n")[0] !== expectedHeader) throw new Error("Unexpected lead and delivery ledger header");
if (forbidden.test(ledger)) throw new Error("Lead and delivery ledger template contains a forbidden data field");
for (const gate of evidenceGates) if (!evidence.includes(gate)) throw new Error(`Product evidence card is missing: ${gate}`);
if (discoveryLog.trim().split("\n")[0] !== expectedDiscoveryHeader) throw new Error("Unexpected customer discovery log header");
if (forbidden.test(discoveryScript) || forbidden.test(discoveryLog)) throw new Error("Customer discovery templates contain a forbidden data field");
for (const prompt of discoveryPrompts) if (!discoveryScript.includes(prompt)) throw new Error(`Customer discovery script is missing: ${prompt}`);
for (const section of weeklySections) if (!weeklyReview.includes(section)) throw new Error(`Weekly review is missing: ${section}`);
for (const section of monthlySections) if (!monthlyDecision.includes(section)) throw new Error(`Monthly decision is missing: ${section}`);

console.log("PASS: operations templates are present and use the approved safe fields");
