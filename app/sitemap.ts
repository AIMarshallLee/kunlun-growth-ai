import type { MetadataRoute } from "next";
import { caseStudies } from "@/lib/cases";
import { skillProducts } from "@/lib/skill-products";
import { buildSitemapEntries, getSitemapPaths } from "@/lib/site-config";
import { tutorialEntries } from "@/lib/tutorials";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = getSitemapPaths({
    tutorialSlugs: tutorialEntries.map(({ slug }) => slug),
    caseSlugs: caseStudies.map(({ slug }) => slug),
    skillSlugs: skillProducts.map(({ slug }) => slug),
  });
  return buildSitemapEntries(paths);
}
