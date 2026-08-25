import Link from "next/link";
import { Brand } from "./brand";

export function SiteHeader() {
  return <header className="site-header"><div className="shell header-inner"><Brand /><nav aria-label="主导航"><Link href="/tutorials">实战教程</Link><Link href="/cases">案例库</Link><Link href="/works">作品广场</Link><Link href="/projects">AI 项目</Link><Link href="/challenges">企业挑战</Link></nav><div className="header-actions"><Link className="text-link" href="/login">登录</Link><Link className="button small" href="/submit">提交作品</Link></div></div></header>;
}
