import { ArticleSkeleton } from "@/components/content/article-skeleton";

// The page depends on the [[...slug]] param, so navigation shows this instantly
// while the matching page streams in. The sidebar in the layout above stays put.
export default function Loading() {
  return <ArticleSkeleton label="Loading documentation" />;
}
