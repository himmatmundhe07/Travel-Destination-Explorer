import type { Collection } from "./types";

export const collectionRoot: Record<Collection, string> = {
  docs: "/docs",
  guides: "/guides",
};

export const collectionLabel: Record<Collection, string> = {
  docs: "Documentation",
  guides: "Guides",
};

/** URL for a slug path inside a collection; an empty slug is the collection root. */
export function hrefFor(collection: Collection, slug: string[]): string {
  return slug.length ? `${collectionRoot[collection]}/${slug.join("/")}` : collectionRoot[collection];
}

export const searchHref = (query: string) => `/search?q=${encodeURIComponent(query)}`;
