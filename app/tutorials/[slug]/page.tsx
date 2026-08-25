import { notFound } from "next/navigation";
import { TutorialDocument } from "@/components/tutorial-document";
import { relatedSkillProductsForTutorial } from "@/lib/skill-products";
import { buildPageMetadata } from "@/lib/site-config";
import { getTutorial, sourceAuthor, tutorialEntries } from "@/lib/tutorials";

export function generateStaticParams() { return tutorialEntries.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tutorial = getTutorial(slug);
  if (!tutorial) return {};
  const title = tutorial.titleHtml.replace(/<[^>]+>/g, "");
  return buildPageMetadata(`/tutorials/${slug}`, title, tutorial.sub);
}

export default async function TutorialDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tutorial = getTutorial(slug);
  if (!tutorial) notFound();
  return <TutorialDocument tutorial={tutorial} sourceAuthors={(tutorial.sources || []).map(([, url]) => sourceAuthor(url))} relatedSkills={relatedSkillProductsForTutorial(slug)} />;
}
