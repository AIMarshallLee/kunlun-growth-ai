import { caseStudies } from "../data/cases.ts";

export { caseStudies };
export type { CaseStudy, CaseCategory } from "../data/cases.ts";

export const caseCategories = [...new Set(caseStudies.map(({ category }) => category))];

export function getCaseStudy(slug: string) {
  return caseStudies.find((item) => item.slug === slug);
}
