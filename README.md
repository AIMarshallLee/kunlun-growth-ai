# 昆仑增长AI实战

面向全球中文用户的 AI 实战、案例、Skill 小课包与真实应用验证静态站。首个赛道为 **AI × 跨境电商**。

## 当前交付边界

- 公开教程、案例、Skill、工具和静态页面无需登录即可浏览。
- 教程进度保存在当前浏览器；当前没有云端进度。
- Supabase 为可选邮箱 OTP 会话，未配置不影响公开站点；配置后也不会解锁额外内容。
- Formspree 可选：未配置时联系表单降级为邮件草稿，投稿通道显式停用。
- Cloudflare Web Analytics 可选：没有公开 token 时不会加载分析脚本。
- 本仓库没有支付、自动下载、数据库迁移、审核队列、定时任务或运行时 AI Agent。

## 环境要求

- Node.js 20.9 或更高版本
- npm 10 或更高版本
- Windows 打包脚本使用 PowerShell

## 本地运行与完整验收

```powershell
cd D:\ChatGPT\kunlun-growth-ai
npm.cmd ci
Copy-Item .env.example .env.local
npm.cmd run dev
```

不复制环境文件也能构建和安全运行。完整本地发布门：

```powershell
npm.cmd audit --json
npm.cmd test
npx.cmd tsc --noEmit
npm.cmd run lint
npm.cmd run build
npm.cmd run check:static
npm.cmd run test:browser
npm.cmd run package:static
```

静态导出位于 `out/`；版本化 ZIP 与 SHA-256 位于 `releases/`。

## 公开配置

所有 `NEXT_PUBLIC_*` 值都会进入浏览器静态文件，不能放任何私钥或客户秘密。

| 变量 | 作用 | 未配置行为 |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | canonical、robots、sitemap 的统一域名 | 使用现有 Vercel 生产别名作为安全回退 |
| `NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN` | Cloudflare Web Analytics | 不加载分析脚本 |
| `NEXT_PUBLIC_FORMSPREE_ENDPOINT` | 联系与投稿接收 | 联系降级；投稿停用 |
| `NEXT_PUBLIC_CONTACT_EMAIL` | 联系邮件草稿回退 | 没有 Formspree 时联系不可用 |
| `NEXT_PUBLIC_SUPABASE_URL` | 可选 OTP 项目地址 | 登录页明确提示未配置 |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | 可选公开/可发布 key | 登录页明确提示未配置 |

不要填写 Supabase service-role key、GitHub/Vercel/Cloudflare API token、支付凭据或客户数据。

## Vercel

项目已保持 Next.js 静态导出：

- Build command：`npm run build`
- Vercel Output Directory：`.next`
- Portable static output：`out/`
- Production branch：连接 Git 后设为 `main`

不要把 Vercel Output Directory 改成 `out`；该项目由 Vercel 的 Next.js 框架集成读取 `.next`，通用静态主机才直接发布 `out/`。

GitHub App 授权、Push→部署、DNS、真实 Formspree/分析/Supabase 验证属于外部步骤；没有对应记录前统一标记 `EXTERNAL/NOT_RUN`。详见 [部署说明](documentation/deployment.md) 和 [上线清单](documentation/go-live-checklist.md)。

## 许可与来源

软件代码采用 MIT License。教程、案例、品牌与第三方来源不自动随代码开源；请同时阅读 [内容授权边界](CONTENT-LICENSE.md) 和 [第三方 NOTICE](NOTICE.md)。每篇教程/案例页面保留原作者、机构、原文链接和公开主张边界。

## 审核与运维文档

从 [架构说明](documentation/architecture.md) 开始。该目录还包含流程、权限、变量、测试、SEO、自动化、部署、备份、升级、回滚、故障处理和上线清单。
