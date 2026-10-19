import { overview } from "@/data/overview";
import { getGroupTitle, getPages } from "./content";
import { hrefFor } from "./routes";
import type { Block, Collection, Page, SearchEntry } from "./types";

/** Strips the inline markup (`code`, [label](href)) so it doesn't pollute search text. */
export const stripInline = (text: string) =>
  text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/`([^`]+)`/g, "$1");

function blockText(block: Block): string {
  switch (block.type) {
    case "paragraph":
    case "heading":
      return stripInline(block.text);
    case "list":
      return block.items.map(stripInline).join(" ");
    case "callout":
      return stripInline(block.text);
    case "code":
      return block.code;
    case "table":
      return [...block.head, ...block.rows.flat()].map(stripInline).join(" ");
  }
}

function toEntry(collection: Collection, page: Page): SearchEntry {
  const group = getGroupTitle(collection, page);
  return {
    title: page.title,
    href: hrefFor(collection, page.slug),
    section: collection === "guides" ? `Guides · ${group}` : group,
    description: stripInline(page.description),
    headings: page.blocks.flatMap((b) => (b.type === "heading" ? [stripInline(b.text)] : [])),
    text: page.blocks.map(blockText).join(" "),
  };
}

export function getSearchEntries(): SearchEntry[] {
  const intro: SearchEntry = {
    title: "Introduction",
    href: "/docs",
    section: "Documentation",
    description: overview.description,
    headings: overview.cards.map((card) => card.title),
    text: overview.cards.map((card) => card.text).join(" "),
  };
  return [
    intro,
    ...getPages("docs").map((page) => toEntry("docs", page)),
    ...getPages("guides").map((page) => toEntry("guides", page)),
  ];
}

/** Light entries for the header's live suggestions; the full text stays on the server. */
export const toSuggestion = ({ title, href, section, description, headings }: SearchEntry) => ({
  title,
  href,
  section,
  description,
  headings,
  text: "",
});

// Words that carry no meaning when a whole URL path is used as the query.
const STOP_WORDS = new Set(["docs", "guides", "the", "and", "all"]);

export function tokenize(query: string): string[] {
  return query
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((token) => token.length > 1 && !STOP_WORDS.has(token));
}

/** Crude stemmer so "route", "routes" and "routing" all match each other. */
const stem = (token: string) => (token.length > 4 ? token.replace(/(ing|es|s|e)$/, "") : token);

export interface SearchResult {
  entry: SearchEntry;
  score: number;
}

/** Ranks entries by how many query terms they contain, weighting titles over body text. */
export function searchEntries(entries: SearchEntry[], query: string, limit = 8): SearchResult[] {
  const tokens = tokenize(query).map(stem);
  if (tokens.length === 0) return [];

  return entries
    .map((entry) => {
      const title = entry.title.toLowerCase();
      const headings = entry.headings.join(" ").toLowerCase();
      const description = entry.description.toLowerCase();
      const text = entry.text.toLowerCase();
      let score = 0;
      for (const token of tokens) {
        if (title.includes(token)) score += 6;
        if (headings.includes(token)) score += 3;
        if (description.includes(token)) score += 2;
        if (text.includes(token)) score += 1;
      }
      return { entry, score };
    })
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score || a.entry.title.localeCompare(b.entry.title))
    .slice(0, limit);
}

/** A short excerpt of the body around the first matching term. */
export function snippet(text: string, query: string, length = 150): string {
  const lower = text.toLowerCase();
  const hit = tokenize(query)
    .map((token) => lower.indexOf(stem(token)))
    .filter((index) => index >= 0)
    .sort((a, b) => a - b)[0];
  if (hit === undefined) return "";
  const start = Math.max(0, hit - 40);
  const excerpt = text.slice(start, start + length).trim();
  return `${start > 0 ? "…" : ""}${excerpt}${start + length < text.length ? "…" : ""}`;
}
