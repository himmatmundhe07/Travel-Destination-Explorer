import type { Collection, Group } from "@/lib/types";

/**
 * Titles for the folders of each collection, keyed by their slug path.
 * A key matches the leading segments of a page slug: the page
 * ["core-concepts", "routing"] lives in the "core-concepts" group.
 */
export const groups: Record<Collection, Record<string, Group>> = {
  docs: {
    "getting-started": {
      title: "Getting Started",
      description: "Install Orbit, scaffold a project, and learn how it is laid out.",
    },
    "core-concepts": {
      title: "Core Concepts",
      description: "Routing, layouts, and data loading: the building blocks of every Orbit app.",
    },
    reference: {
      title: "Reference",
      description: "Configuration options and CLI commands.",
    },
  },
  guides: {
    nextjs: {
      title: "Next.js",
      description: "Guides for developers who know the Next.js App Router and want to apply it in Orbit.",
    },
    "nextjs/app-router": {
      title: "App Router",
      description: "Step-by-step guides that map App Router conventions onto Orbit.",
    },
  },
};
