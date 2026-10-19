import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleView } from "@/components/content/article-view";
import { GroupView } from "@/components/content/group-view";
import { getStaticSlugs, resolve } from "@/lib/content";

type Props = PageProps<"/guides/[...slug]">;

// Required catch-all: matches /guides/nextjs, /guides/nextjs/app-router and every guide below
// them. The /guides index itself is a separate page.tsx, since [...slug] needs at least one segment.
export function generateStaticParams() {
  return getStaticSlugs("guides").map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const resolved = resolve("guides", slug);
  if (!resolved) return { title: "Guide not found" };
  return resolved.kind === "page"
    ? { title: resolved.page.title, description: resolved.page.description }
    : { title: resolved.group.title, description: resolved.group.description };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const resolved = resolve("guides", slug);
  if (!resolved) notFound();

  return resolved.kind === "page" ? (
    <ArticleView collection="guides" page={resolved.page} />
  ) : (
    <GroupView collection="guides" group={resolved.group} />
  );
}
