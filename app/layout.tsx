import type { Metadata } from "next";
import "./globals.css";
import "./forms.css";
import "./tutorial.css";
import "./cases.css";
import "./skills.css";
import { AuthSessionHandler } from "@/components/auth-session-handler";
import { Analytics } from "@/components/analytics";
import { getSiteOrigin } from "@/lib/site-config";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteOrigin()),
  title: { default: "昆仑增长AI实战｜从教程到真实应用", template: "%s｜昆仑增长AI实战" },
  description: "面向全球中文用户的 AI 实战、作品与真实应用验证平台。首个赛道：AI × 跨境电商。",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body><AuthSessionHandler />{children}<Analytics /></body></html>;
}
