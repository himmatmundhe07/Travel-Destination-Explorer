import type { Metadata } from "next";
import { ArticleHeader } from "@/components/content/article-header";
import { Blocks } from "@/components/content/blocks";
import type { Block } from "@/lib/types";

export const metadata: Metadata = {
  title: "About",
  description: "About this documentation explorer and how its routes are organized.",
};

const blocks: Block[] = [
  { type: "heading", id: "about-this-project", text: "About this project" },
  {
    type: "paragraph",
    text: "Orbit Docs is a practice project for the Next.js App Router: a documentation interface with sections, nested pages, navigation, and breadcrumbs. Orbit is a fictional framework, and every page is local dummy data in `src/data`, so there is no backend or database.",
  },
  { type: "heading", id: "route-map", text: "Route map" },
  {
    type: "table",
    firstColumn: "path",
    head: ["Route", "Segment type", "Try it"],
    rows: [
      ["/docs/[[...slug]]", "Optional catch-all", "[/docs](/docs), [/docs/core-concepts/routing](/docs/core-concepts/routing)"],
      ["/guides", "Static", "[/guides](/guides)"],
      [
        "/guides/[...slug]",
        "Catch-all",
        "[/guides/nextjs/app-router/dynamic-routes](/guides/nextjs/app-router/dynamic-routes)",
      ],
      ["/search", "Static + search params", "[/search?q=catch-all](/search?q=catch-all)"],
      ["not-found", "Fallback", "[/docs/routing/catch-all-param](/docs/routing/catch-all-param)"],
    ],
  },
  { type: "heading", id: "license", text: "Documentation License" },
  {
    type: "paragraph",
    text: "The text and code samples in this site were written for the exercise and carry no real framework's license. Use them freely.",
  },
  { type: "heading", id: "changelog", text: "Changelog" },
  {
    type: "list",
    items: [
      "`v1.0.4`: stable release. Fixed catch-all matching for trailing slashes.",
      "`v1.0.0`: first stable release of the unified routing and layout model.",
      "`v0.9.0`: release candidate with `[[...slug]]` optional catch-all segments.",
    ],
  },
];

export default function AboutPage() {
  return (
    <div>
      <ArticleHeader
        crumbs={[{ label: "Orbit Docs", href: "/docs" }, { label: "About" }]}
        title="About"
        description="A practice project for the Next.js App Router."
      />
      <div className="mt-8">
        <Blocks blocks={blocks} />
      </div>
    </div>
  );
}
