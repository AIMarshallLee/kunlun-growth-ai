export const FALLBACK_SITE_ORIGIN = "https://kunlun-growth-ai.vercel.app";

export type SitemapSlugs = {
  tutorialSlugs: string[];
  caseSlugs: string[];
  skillSlugs: string[];
};

const publicStaticPaths = [
  "/",
  "/about",
  "/tutorials",
  "/cases",
  "/skills",
  "/works",
  "/projects",
  "/challenges",
  "/tools/product-opportunity-card",
];

export function getSiteOrigin(value = process.env.NEXT_PUBLIC_SITE_URL) {
  try {
    const url = new URL(value || FALLBACK_SITE_ORIGIN);
    if (url.protocol !== "https:" && url.protocol !== "http:") return FALLBACK_SITE_ORIGIN;
    return url.origin;
  } catch {
    return FALLBACK_SITE_ORIGIN;
  }
}

export function absoluteSiteUrl(path: string, origin = getSiteOrigin()) {
  return new URL(path, `${getSiteOrigin(origin)}/`).toString().replace(/\/$/, path === "/" ? "/" : "");
}

export function getSitemapPaths({ tutorialSlugs, caseSlugs, skillSlugs }: SitemapSlugs) {
  return [
    ...publicStaticPaths,
    ...tutorialSlugs.map((slug) => `/tutorials/${slug}`),
    ...caseSlugs.map((slug) => `/cases/${slug}`),
    ...skillSlugs.map((slug) => `/skills/${slug}`),
  ];
}

export function getAnalyticsToken(value = process.env.NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN) {
  return value?.trim() || "";
}

export function buildPageMetadata(path: string, title: string, description: string, origin = getSiteOrigin()) {
  const canonical = absoluteSiteUrl(path, origin);
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website" as const,
      siteName: "昆仑增长AI实战",
      locale: "zh_CN",
    },
  };
}

export function buildRobotsRules(origin = getSiteOrigin()) {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: absoluteSiteUrl("/sitemap.xml", origin),
  };
}

export function buildSitemapEntries(paths: string[], origin = getSiteOrigin()) {
  return paths.map((path) => ({ url: absoluteSiteUrl(path, origin) }));
}
