import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleView } from "@/components/content/article-view";
import { GroupView } from "@/components/content/group-view";
import { OverviewView } from "@/components/content/overview-view";
import { overview } from "@/data/overview";
import { getStaticSlugs, resolve } from "@/lib/content";

type Props = PageProps<"/docs/[[...slug]]">;

// Optional catch-all: one file serves /docs (empty slug), /docs/core-concepts (a folder index)
// and /docs/core-concepts/routing (a page). Known slugs are prerendered; others call notFound().
export function generateStaticParams() {
  return [{ slug: [] }, ...getStaticSlugs("docs").map((slug) => ({ slug }))];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug = [] } = await params;
  if (slug.length === 0) return { title: overview.title, description: overview.description };
  const resolved = resolve("docs", slug);
  if (!resolved) return { title: "Page not found" };
  return resolved.kind === "page"
    ? { title: resolved.page.title, description: resolved.page.description.replace(/`/g, "") }
    : { title: resolved.group.title, description: resolved.group.description };
}

export default async function DocsPage({ params }: Props) {
  const { slug = [] } = await params;
  if (slug.length === 0) return <OverviewView />;

  const resolved = resolve("docs", slug);
  if (!resolved) notFound();

  return resolved.kind === "page" ? (
    <ArticleView collection="docs" page={resolved.page} />
  ) : (
    <GroupView collection="docs" group={resolved.group} />
  );
}
