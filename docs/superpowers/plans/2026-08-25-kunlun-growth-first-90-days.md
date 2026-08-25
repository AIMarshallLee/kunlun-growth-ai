# 昆仑增长AI首个90天实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 用一个真实可交付小课包跑通咨询、人工交付、首次运行、反馈和案例闭环，并用证据决定后续产品扩张。

**Architecture:** 静态网站继续只承载公开目录、产品边界和联系意向。团队的私有台账承载客户联系、核验、交付和反馈；下载包继续本地版本化，只有完成验证的包可售。

**Tech Stack:** Next.js 静态站、版本化 Skill 文件夹/ZIP、团队私有台账、业务邮箱。

**Spec:** `docs/superpowers/specs/2026-08-25-kunlun-growth-operating-system-design.md`

## Global Constraints

- 不要求、不存储或不传输 API Key、Cookie、令牌、支付卡、客户机密或真实订单数据。
- 未通过“内容完整、安全检查、目标工具演练、外部使用、质量门槛、反馈回收”的产品不可计入已验证或对外销售。
- 网站不伪造提交成功、销量、客户成果或模型能力；外部动作必须由用户或授权团队执行。
- 每周复盘以结构化证据为准；每月对每个候选产品作继续、修订、候补或停售决策。

---

### Task 1: 建立人工交付台账与首批产品证据卡

**Files:**
- Create: `operations/lead-and-delivery-ledger-template.csv`
- Create: `operations/product-evidence-card-template.md`
- Test: `scripts/check-operations-templates.mjs`

**Interfaces:**
- Consumes: `products/<skill-name>/CHANGELOG.md` 的版本号和网站产品 slug。
- Produces: 可由团队复制使用的线索/交付台账模板和每个产品的验证证据卡。

- [ ] **Step 1: 写失败检查**

在检查脚本中要求 CSV 表头包含：`lead_id,source,product_slug,identity,scenario_summary,status,entitlement,delivery_version,delivered_at,first_run_status,feedback_summary,case_permission`；要求证据卡包含六个验证门槛和“结论”字段。

- [ ] **Step 2: 运行检查并确认失败**

Run: `node scripts/check-operations-templates.mjs`

Expected: 因模板尚不存在而失败。

- [ ] **Step 3: 创建最小模板**

CSV 仅写表头和一个去敏示例行；证据卡写明产品、版本、演练日期、六个门槛、未解决风险、结论。不要写任何真实客户信息。

- [ ] **Step 4: 运行检查并确认通过**

Run: `node scripts/check-operations-templates.mjs`

Expected: 输出 `PASS`。

### Task 2: 启用诚实的业务收件与咨询处理

**Files:**
- Modify: `.env.example`
- Modify: `app/contact/page.tsx`
- Modify: `docs/PRD-skill-course-store.md`
- Test: `tests/skill-products.test.mjs`

**Interfaces:**
- Consumes: `NEXT_PUBLIC_CONTACT_EMAIL` 和 `buildInquiryMailto(recipient, inquiry)`。
- Produces: 配置了公开业务邮箱时可由用户自行发送的咨询邮件草稿；未配置时明确不可收件。

- [ ] **Step 1: 写失败测试**

在 `tests/skill-products.test.mjs` 断言联系页不含“已记录为演示咨询”，同时包含未配置收件邮箱的提示与 `mailto:` 构造器。

- [ ] **Step 2: 运行目标测试确认失败**

Run: `npm test -- --test-name-pattern "purchase inquiry"`

Expected: 对旧的虚假成功提示失败。

- [ ] **Step 3: 最小实现**

读取 `NEXT_PUBLIC_CONTACT_EMAIL`；在提交时用所有已填写的非敏感字段构造邮件草稿；未配置时保留输入并显示不可收件说明。不要把信息写入浏览器分析或公开页面。

- [ ] **Step 4: 运行测试确认通过**

Run: `npm test`

Expected: 全部测试通过。

### Task 3: 完成三个候选产品的验证决策页

**Files:**
- Modify: `lib/skill-products.ts`
- Modify: `app/skills/[slug]/page.tsx`
- Modify: `tests/skill-products.test.mjs`
- Create: `operations/product-validation-log.md`

**Interfaces:**
- Consumes: 每个产品的 `availability`、`status`、`version` 与证据卡。
- Produces: 已验证产品可咨询交付；候补产品只能登记意向，不收款、不下载、不承诺上线。

- [ ] **Step 1: 写失败测试**

为每个 `availability === "available"` 产品断言存在对应的内容包、安装说明和通过的包检查；为每个 `waitlist` 产品断言详情页显示“意向登记”“不收款”“不发送下载包”。

- [ ] **Step 2: 运行目标测试确认失败**

Run: `npm test -- --test-name-pattern "delivered package|future packages"`

Expected: 缺少包或状态文案时失败。

- [ ] **Step 3: 最小实现**

只有证据卡结论为“已验证”的产品才设置 `available`；其余保持 `waitlist`。将实际演练日期、版本和未解决风险写入私有验证日志，不在公开页面夸大结果。

- [ ] **Step 4: 运行验证**

Run: `npm test && npm run lint && npm run build`

Expected: 测试、静态构建和类型检查通过。

### Task 4: 收集10个目标用户的需求证据

**Files:**
- Create: `operations/customer-discovery-script.md`
- Create: `operations/customer-discovery-log-template.csv`
- Test: `scripts/check-operations-templates.mjs`

**Interfaces:**
- Consumes: 产品 slug、私有台账的线索编号。
- Produces: 可用于10次目标用户访谈/咨询的去敏记录和一致的问题框架。

- [ ] **Step 1: 写失败检查**

扩展脚本，要求访谈模板包含：当前任务、当前做法、时间/成本、可接受替代方案、工具环境、愿付费信号、拒绝原因、后续许可；禁止 API Key、真实订单和客户文件字段。

- [ ] **Step 2: 运行检查确认失败**

Run: `node scripts/check-operations-templates.mjs`

Expected: 新模板未创建而失败。

- [ ] **Step 3: 创建访谈脚本与日志模板**

脚本只问真实工作流和验证信号；日志用匿名 `lead_id`，不录入受保护数据。

- [ ] **Step 4: 运行检查确认通过**

Run: `node scripts/check-operations-templates.mjs`

Expected: 输出 `PASS`。

### Task 5: 每周复盘与第90天产品决策

**Files:**
- Create: `operations/weekly-growth-review-template.md`
- Create: `operations/monthly-product-decision-template.md`
- Test: `scripts/check-operations-templates.mjs`

**Interfaces:**
- Consumes: 台账的咨询、交付、首次运行、反馈与案例授权字段。
- Produces: 每周复盘记录和继续/修订/候补/停售的月度决策。

- [ ] **Step 1: 写失败检查**

要求周复盘含漏斗、交付、风险、下一周实验；要求月度决策含证据、结论、版本行动、停止条件和负责人。 

- [ ] **Step 2: 运行检查确认失败**

Run: `node scripts/check-operations-templates.mjs`

Expected: 复盘模板未创建而失败。

- [ ] **Step 3: 创建最小复盘模板**

每周模板要求记录“是否发生敏感数据事件”；月度模板要求对每个产品明确结论，不允许用模糊的“持续观察”。

- [ ] **Step 4: 运行全量验证**

Run: `node scripts/check-operations-templates.mjs && npm test && npm run lint && npm run build`

Expected: 操作模板、产品测试、代码风格和静态站构建全部通过。

## Execution Notes

任务1、4、5创建的是不含真实客户资料的可复用运营模板；真实咨询、付款、交付、回访和案例授权必须由授权团队在私有环境执行。除非获得用户在执行当时的明确授权，本计划不发送邮件、发布网站、处理支付或联系外部客户。
