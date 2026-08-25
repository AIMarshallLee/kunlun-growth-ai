import type { MetadataRoute } from "next";
import { buildRobotsRules } from "@/lib/site-config";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return buildRobotsRules();
}
