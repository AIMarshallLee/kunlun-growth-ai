# 昆仑增长企业 AI 营销站

这是无构建依赖的静态企业 AI 营销站。当前源快照来自 [kunlungrowth.com](https://kunlungrowth.com)，来源时间与回滚部署 ID 记录在 [`source-manifest.json`](./source-manifest.json)，部署前逐 URL SHA-256 基线记录在 [`source-baseline-sha256.txt`](./source-baseline-sha256.txt)。`rollbackDeployment` / `rollbackDeploymentUrl` 是回滚依据，不把本地审计结果或预览部署当作客户案例、线上效果或正式验收证据。

## 本地审计

在本目录运行：

```bash
node scripts/audit-site.mjs
```

脚本递归检查每个 HTML 的唯一 `title`、description、canonical、H1，拒绝 `noindex`，解析全部 JSON-LD，检查同域链接是否能映射到静态文件，并校验 sitemap URL 映射。`/enterprise-ai/` 出现后，还会强制检查昆仑增长的企业 AI 服务性质、Marshall 与商务邮箱、销售/客服/内容三类场景、20 分钟沟通入口，以及“不是客户案例”、不承诺效果和敏感/保密资料边界等声明。页面尚未出现时，审计会如实以失败退出。

## 部署前后流程

1. 部署前运行审计；失败先修复或明确记录阻塞项，不以截图替代审计。
2. 检查 `source-manifest.json` 的来源快照与回滚部署信息，确认本次变更仅属于营销站。
3. 用 Vercel 预览部署检查首页、`/enterprise-ai/`、sitemap、robots 与关键站内链接，再运行一次审计。
4. 发布后在正式域名复核页面、canonical、响应头与 sitemap；保留部署 URL、审计输出和回滚 ID。
5. 任何客户案例、效果数据、敏感资料处理能力或线上业务证据，都必须另行取得可核验来源与人工确认。

## 域名映射边界

本目录不修改 DNS、域名绑定、Vercel 项目设置或任何正式域名映射。`vercel.json` 只声明静态站安全响应头及 clean/trailing URL 策略；需要绑定或切换域名时，必须由具备账户权限的人单独确认并执行。
