import type { Overview } from "@/lib/types";

/** Content of the documentation home page (/docs). */
export const overview: Overview = {
  title: "Documentation",
  description:
    "Welcome to Orbit Docs. Explore the core architecture, installation guides, and complete API references for building scalable modern web applications.",
  cards: [
    {
      icon: "enter",
      title: "Getting Started",
      text: "Quickstart guides, prerequisites, and initial project configuration.",
      cta: "Start reading",
      href: "/docs/getting-started/installation",
    },
    {
      icon: "route",
      title: "Core Concepts",
      text: "Deep dive into nested routing patterns, catch-all paths, and data loading.",
      cta: "Explore concepts",
      href: "/docs/core-concepts/routing",
    },
    {
      icon: "settings",
      title: "Reference",
      text: "Detailed configuration parameters, flags, and CLI commands.",
      cta: "View reference",
      href: "/docs/reference/configuration",
    },
  ],
  callout: {
    label: "Architecture Alignment",
    text: "Orbit 1.0 utilizes unified server-driven component composition with strict compile-time static checks. Ensure you review the configuration parameters before migration.",
  },
  quickSetup: {
    title: "Terminal — Quick Setup",
    code: `$ npx orbit-cli create my-app --template standard
$ cd my-app && npm run dev`,
  },
};
