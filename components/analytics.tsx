import Script from "next/script";
import { getAnalyticsToken } from "@/lib/site-config";

export function Analytics() {
  const token = getAnalyticsToken();
  if (!token) return null;
  return <Script src="https://static.cloudflareinsights.com/beacon.min.js" strategy="afterInteractive" data-cf-beacon={JSON.stringify({ token })} />;
}
