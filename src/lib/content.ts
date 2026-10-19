import { docsPages } from "@/data/docs";
import { groups } from "@/data/groups";
import { guidePages } from "@/data/guides";
import { collectionLabel, collectionRoot, hrefFor } from "./routes";
import type { Collection, Crumb, Group, Page } from "./types";

const pages: Record<Collection, Page[]> = {
  docs: docsPages,
  guides: guidePages,
};

const sameSlug = (a: string[], b: string[]) => a.length === b.length && a.every((s, i) => s === b[i]);

export function getPages(collection: Collection): Page[] {
  return pages[collection];
}

export function findPage(collection: Collection, slug: string[]): Page | undefined {
  return pages[collection].find((page) => sameSlug(page.slug, slug));
}

export interface ChildGroup extends Group {
  slug: string[];
  /** Number of pages anywhere below this folder. */
  pageCount: number;
}

export interface ResolvedGroup extends Group {
  slug: string[];
  /** Pages directly inside this folder. */
  pages: Page[];
  /** Folders directly inside this folder. */
  groups: ChildGroup[];
}

const isDirectChild = (slug: string[], parent: string[]) =>
  slug.length === parent.length + 1 && parent.every((segment, i) => slug[i] === segment);

const startsWithSlug = (slug: string[], prefix: string[]) =>
  prefix.every((segment, i) => slug[i] === segment);

/** Folders and pages directly below `slug` (an empty slug is the collection root). */
function getChildren(collection: Collection, slug: string[]) {
  return {
    pages: pages[collection].filter((page) => isDirectChild(page.slug, slug)),
    groups: Object.entries(groups[collection])
      .map(([key, group]) => ({ ...group, slug: key.split("/") }))
      .filter((group) => isDirectChild(group.slug, slug))
      .map((group) => ({
        ...group,
        pageCount: pages[collection].filter((page) => startsWithSlug(page.slug, group.slug)).length,
      })),
  };
}

/** A folder such as "core-concepts" or "nextjs/app-router", with what sits directly inside it. */
export function findGroup(collection: Collection, slug: string[]): ResolvedGroup | undefined {
  const group = groups[collection][slug.join("/")];
  if (!group) return undefined;
  return { ...group, slug, ...getChildren(collection, slug) };
}

/** The collection's own index (e.g. /guides): its top-level folders and pages. */
export function getCollectionIndex(collection: Collection, description: string): ResolvedGroup {
  return {
    title: collectionLabel[collection],
    description,
    slug: [],
    ...getChildren(collection, []),
  };
}

export type Resolved =
  | { kind: "page"; page: Page }
  | { kind: "group"; group: ResolvedGroup };

/** What a URL below a collection points at: a page, a folder index, or nothing (→ notFound). */
export function resolve(collection: Collection, slug: string[]): Resolved | undefined {
  const page = findPage(collection, slug);
  if (page) return { kind: "page", page };
  const group = findGroup(collection, slug);
  if (group) return { kind: "group", group };
  return undefined;
}

/** Every slug that should be prerendered: all pages plus all folder indexes. */
export function getStaticSlugs(collection: Collection): string[][] {
  return [
    ...Object.keys(groups[collection]).map((key) => key.split("/")),
    ...pages[collection].map((page) => page.slug),
  ];
}

/** Title of the folder a page lives in, e.g. "Core Concepts". */
export function getGroupTitle(collection: Collection, page: Page): string {
  const parent = page.slug.slice(0, -1).join("/");
  return groups[collection][parent]?.title ?? collectionLabel[collection];
}

/** Previous and next page in reading order, which is the order of the data arrays. */
export function getAdjacent(collection: Collection, page: Page) {
  const list = pages[collection];
  const index = list.indexOf(page);
  return { prev: list[index - 1], next: list[index + 1] };
}

/** Every folder and page below a collection becomes a breadcrumb, so each level is a real URL. */
export function getCrumbs(collection: Collection, slug: string[]): Crumb[] {
  const crumbs: Crumb[] = [{ label: collectionLabel[collection], href: collectionRoot[collection] }];
  slug.forEach((segment, index) => {
    const path = slug.slice(0, index + 1);
    const isLast = index === slug.length - 1;
    const title =
      (isLast ? findPage(collection, path)?.title : undefined) ??
      groups[collection][path.join("/")]?.title ??
      segment;
    crumbs.push({ label: title, href: isLast ? undefined : hrefFor(collection, path) });
  });
  return crumbs;
}

export function getHeadings(page: Page) {
  return page.blocks.flatMap((block) =>
    block.type === "heading" ? [{ id: block.id, text: block.text }] : [],
  );
}
