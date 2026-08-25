# 三个商用 Skill 产品包 1.0.0 实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 交付三个可安装、可配置、可验证、可卸载和可回滚的 1.0.0 Skill 商品包，并让网站准确展示包完整性与市场验证状态。

**Architecture:** 每个包包含统一根合同和零第三方依赖的 `verify.mjs`；项目级检查器与测试负责跨包和 ZIP 验收，网站数据把可交付状态与市场验证状态分离。

**Tech Stack:** Markdown、JSON、Node.js 标准库、Node Test Runner、Next.js 15、PowerShell/ZIP、FFmpeg 仅用于生成合成测试夹具。

**Spec:** `docs/superpowers/specs/2026-08-26-commercial-skill-packages-design.md`

## Global Constraints

- 只交付 `product-material-agent`、`crossborder-listing-localization`、`product-media-qa` 三个产品。
- 三个正式版本均为 `1.0.0`，ZIP 小于100MB，包内不含密钥、客户数据、账号或未声明第三方依赖。
- 包不自动联网、收款、上传、发布、覆盖或删除客户资产。
- 包完整性与真实市场验证分别展示，不虚构客户、营收、转化或平台通过率。
- 所有实现先由失败测试定义，再最小修改至通过。

---

### Task 1: 统一商用包检查器与失败测试

**Files:**
- Modify: `scripts/check-skill-package.mjs`
- Modify: `tests/skill-package.test.mjs`

**Interfaces:**
- Consumes: Skill 包目录路径。
- Produces: `checkSkillPackage(path)`；缺商业根文件、无效 JSON、清单不一致、哈希错误或疑似密钥时抛错。

- [ ] 写测试，要求完整根文件、非空内容目录、合法 `config.example.json`/`manifest.json`、`CHECKSUMS.sha256` 全覆盖。
- [ ] 运行 `node --test tests/skill-package.test.mjs`，确认旧包因缺文件而失败。
- [ ] 用 Node 标准库实现清单、哈希、密钥和目录检查。
- [ ] 重新运行测试并确认通过。

### Task 2: 商品素材包 1.0.0

**Files:**
- Create: `products/product-material-agent/{README.md,UNINSTALL.md,LICENSE.md,NOTICE.md,SUPPORT.md,CONTRACT.md,RELEASE-CHECKLIST.md,TEST-REPORT.md,config.example.json,manifest.json,CHECKSUMS.sha256,verify.mjs}`
- Create: `products/product-material-agent/tests/contract-cases.json`
- Create: `products/product-material-agent/examples/synthetic-travel-organizer/{input.md,expected-output.md}`
- Modify: `products/product-material-agent/{SKILL.md,INSTALL.md,CHANGELOG.md}`

**Interfaces:**
- Consumes: 授权事实、资产路径、市场、语言、品牌规则和配置。
- Produces: 事实记录、文案、图像计划、视频分镜、问题清单和交付 Manifest；失败返回阻塞项和所需证据。

- [ ] 添加项目级失败测试，断言商用根文件、合同枚举和包内验证命令。
- [ ] 补齐合同、配置、公开样例、授权、支持、卸载、回滚和发布资料。
- [ ] 运行包内 `node verify.mjs` 与项目测试，确认通过。

### Task 3: Listing 本地化包 1.0.0

**Files:**
- Create: `products/crossborder-listing-localization/{README.md,UNINSTALL.md,LICENSE.md,NOTICE.md,SUPPORT.md,CONTRACT.md,RELEASE-CHECKLIST.md,TEST-REPORT.md,config.example.json,manifest.json,CHECKSUMS.sha256,verify.mjs}`
- Create: `products/crossborder-listing-localization/tests/contract-cases.json`
- Modify: `products/crossborder-listing-localization/{SKILL.md,INSTALL.md,CHANGELOG.md}`
- Modify: `products/crossborder-listing-localization/templates/delivery-manifest.md`

**Interfaces:**
- Consumes: 商品事实、市场语言、渠道规则和审核责任。
- Produces: Claim Ledger、阻塞项、内部草稿、候选稿、审核清单和 `ready/not_ready` Manifest。

- [ ] 添加失败测试，断言 1.0.0、四级事实证据、三种主张状态、固定输出和失败合同。
- [ ] 补齐统一商用资料并更新现有公开合成样例。
- [ ] 运行包内和项目级测试，确认通过。

### Task 4: 媒体质检包 1.0.0

**Files:**
- Create: `products/product-media-qa/{README.md,UNINSTALL.md,LICENSE.md,NOTICE.md,SUPPORT.md,CONTRACT.md,RELEASE-CHECKLIST.md,TEST-REPORT.md,config.example.json,manifest.json,CHECKSUMS.sha256,verify.mjs}`
- Create: `products/product-media-qa/tests/contract-cases.json`
- Create: `products/product-media-qa/tests/fixtures/{hero.png,clip.mp4,clip.srt,expected-metadata.json}`
- Modify: `products/product-media-qa/{SKILL.md,INSTALL.md,CHANGELOG.md}`
- Modify: `products/product-media-qa/references/quality-gates.md`
- Modify: `products/product-media-qa/templates/{asset-inventory.md,delivery-manifest.md,issue-log.md,qa-brief.md}`

**Interfaces:**
- Consumes: 实际候选文件、授权参考、渠道规格、必需清单和审核责任。
- Produces: 逐文件 Inventory、Issue Log、Batch Decision、Manifest；任一未解决结果阻塞发布。

- [ ] 添加失败测试，断言四态、六级证据、逐文件结果、负责人/修复/复测和严格发布公式。
- [ ] 生成无品牌合成 PNG/MP4/SRT 夹具并记录期望元数据。
- [ ] 补齐统一商用资料；修正 `review` 与 `release_ready` 的矛盾。
- [ ] 运行包内验证、媒体元数据测试和项目测试，确认通过。

### Task 5: 网站、ZIP 与发布清单

**Files:**
- Modify: `lib/skill-products.ts`
- Modify: `app/skills/[slug]/page.tsx`
- Modify: `operations/product-validation-log.md`
- Modify: `operations/release-audit-2026-08-26.md`
- Create: `products/release-manifest.json`
- Modify: `tests/skill-products.test.mjs`
- Create: `tests/commercial-package.test.mjs`

**Interfaces:**
- Consumes: 三个已验证源包和 1.0.0 ZIP。
- Produces: 三个可交付详情页、独立市场验证披露、ZIP 哈希与发布审计。

- [ ] 先写失败测试，要求三个 `available/正式发布/1.0.0` 且 `marketValidation` 不为空。
- [ ] 更新网站文案，把人工咨询交付与市场验证状态分开。
- [ ] 生成每包 `CHECKSUMS.sha256`、三个 1.0.0 ZIP 和 `products/release-manifest.json`。
- [ ] 验证 ZIP 内容与源目录逐文件一致，且 ZIP SHA-256 与发布清单一致。

### Task 6: 发布门禁与独立复核

**Files:**
- Modify: `operations/release-audit-2026-08-26.md`
- Modify: `.gitignore`

**Interfaces:**
- Consumes: 全部测试、构建、ZIP 和审查结果。
- Produces: 清零 P0/P1 的最终审计和可供用户审查的三个包。

- [ ] 运行 `npm test`、`npm run lint`、`npm run build`、三个包内 `node verify.mjs` 和三个 ZIP 验证。
- [ ] 运行 `git diff --check`，忽略或排除 `out/` 与 `tsconfig.tsbuildinfo`。
- [ ] 请求独立只读审查，修复所有 P0/P1 后复测。
- [ ] 把最终版本、大小、SHA-256、真实测试证据和市场验证缺口写入发布审计。
