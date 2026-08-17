import type { Metadata } from "next";
import "./globals.css";
import "./forms.css";
import { AuthSessionHandler } from "@/components/auth-session-handler";

export const metadata: Metadata = {
  title: "昆仑增长AI实战｜从教程到真实应用",
  description: "面向全球中文用户的 AI 实战、作品与真实应用验证平台。首个赛道：AI × 跨境电商。",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body><AuthSessionHandler />{children}</body></html>;
}
