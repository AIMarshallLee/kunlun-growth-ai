import type { Metadata } from "next";
import "./globals.css";
import "./forms.css";
import "./tutorial.css";
import "./site-refresh.css";
import { AuthProvider } from "@/components/auth-provider";
import { createClient } from "@/lib/supabase/server";

const siteUrl = "https://kunlun-growth-ai.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "昆仑增长AI实战｜可照着完成的 AI 教程",
    template: "%s | 昆仑增长AI实战",
  },
  description:
    "21 篇可以照着完成的 AI 实战教程，每篇包含来源、明确目标、操作步骤、通关标准和风险提醒。",
  keywords: [
    "AI实战", "AI教程", "跨境电商AI", "Agent自动化",
    "Next.js", "Supabase", "开源", "中文AI社区",
  ],
  authors: [{ name: "昆仑增长AI实战" }],
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "昆仑增长AI实战",
    locale: "zh_CN",
    title: "昆仑增长AI实战｜可照着完成的 AI 教程",
    description:
      "21 篇带来源、操作步骤和通关标准的 AI 实战教程。首个专题：AI × 跨境电商。",
  },
  twitter: {
    card: "summary_large_image",
    title: "昆仑增长AI实战",
    description:
      "选一个 AI 任务，照着步骤做，用通关标准检查结果。",
  },
  alternates: {
    canonical: "/",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  let initialSession = null;

  const hasConfig =
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (hasConfig) {
    try {
      const supabase = await createClient();
      const { data } = await supabase.auth.getSession();
      initialSession = data.session;
    } catch {
      // Supabase 未配置或出错，以未登录状态渲染
    }
  }

  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `(function() {
            try {
              var theme = localStorage.getItem('theme');
              var isDark = theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches);
              if (isDark) document.documentElement.setAttribute('data-theme','dark');
            } catch(e) {}
          })();`
        }} />
      </head>
      <body>
        <AuthProvider initialSession={initialSession}>{children}</AuthProvider>
      </body>
    </html>
  );
}
