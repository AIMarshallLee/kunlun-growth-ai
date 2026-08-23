"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/hooks/use-auth";
import { createClient } from "@/lib/supabase/client";
import { Brand } from "./brand";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  const { user, loading, signOut } = useAuth();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!user) return;
    const supabase = createClient();
    (async () => {
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("display_name, avatar_url")
          .eq("id", user.id)
          .maybeSingle();
        if (!error && data) {
          setAvatarUrl(data.avatar_url);
          setDisplayName(data.display_name || "");
        }
      } catch {
        // 忽略网络异常
      }
    })();
  }, [user]);

  useEffect(() => {
    if (!menuOpen) return;

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [menuOpen]);

  const initial = (displayName || user?.email || "U")[0].toUpperCase();

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Brand />
        <nav aria-label="主导航">
          <Link href="/tutorials">实战教程</Link>
          <Link href="/works">作品广场</Link>
          <Link href="/projects">项目验证</Link>
          <Link href="/challenges">企业挑战</Link>
        </nav>
        <div className="header-actions">
          <ThemeToggle />
          {!loading && user ? (
            <>
              <Link
                href="/account/dashboard"
                title="个人中心"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  textDecoration: "none",
                }}
              >
                {avatarUrl ? (
                  <Image
                    src={avatarUrl}
                    alt="头像"
                    width={32}
                    height={32}
                    style={{
                      borderRadius: "50%",
                      objectFit: "cover",
                      border: "2px solid var(--line)",
                    }}
                  />
                ) : (
                  <span
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      display: "grid",
                      placeItems: "center",
                      fontSize: "14px",
                      fontWeight: "900",
                      color: "#fff",
                      background: "linear-gradient(145deg,#8d6eff,#4f2dc9)",
                    }}
                  >
                    {initial}
                  </span>
                )}
                <span className="text-link" style={{ fontSize: "13px" }}>
                  {displayName || user.email?.split("@")[0]}
                </span>
              </Link>
              <button
                className="text-link"
                onClick={() => signOut()}
                style={{
                  cursor: "pointer",
                  background: "none",
                  border: "none",
                  font: "inherit",
                  padding: 0,
                }}
              >
                退出
              </button>
            </>
          ) : (
            <Link className="text-link" href="/login">
              登录
            </Link>
          )}
          <Link className="button small" href="/submit">
            提交作品
          </Link>
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? "关闭导航" : "打开导航"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>
        <nav
          id="mobile-navigation"
          className={`mobile-nav${menuOpen ? " open" : ""}`}
          aria-label="移动端导航"
          aria-hidden={!menuOpen}
        >
          <Link href="/tutorials" onClick={() => setMenuOpen(false)}>实战教程</Link>
          <Link href="/works" onClick={() => setMenuOpen(false)}>作品广场</Link>
          <Link href="/projects" onClick={() => setMenuOpen(false)}>项目验证</Link>
          <Link href="/challenges" onClick={() => setMenuOpen(false)}>企业挑战</Link>
          <Link href={user ? "/account/dashboard" : "/login"} onClick={() => setMenuOpen(false)}>
            {user ? "个人中心" : "登录"}
          </Link>
          <Link href="/submit" onClick={() => setMenuOpen(false)}>提交作品意向</Link>
        </nav>
      </div>
    </header>
  );
}
