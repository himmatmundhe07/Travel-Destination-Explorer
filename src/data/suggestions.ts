import type { NavIconName } from "@/lib/types";

/** Articles offered on the not-found screen. Titles and blurbs are written for that context. */
export const suggestedArticles: {
  icon: NavIconName;
  title: string;
  description: string;
  href: string;
}[] = [
  {
    icon: "download",
    title: "Quickstart & Installation",
    description:
      "Step-by-step setup guide to initialize your Orbit project scaffolding, package requirements, and environment flags.",
    href: "/docs/getting-started/installation",
  },
  {
    icon: "route",
    title: "Routing and Catch-All Rules",
    description:
      "Comprehensive overview of file-based routing protocols, dynamic segment syntax, and custom 404 fallback handlers.",
    href: "/docs/core-concepts/routing",
  },
  {
    icon: "settings",
    title: "Configuration Reference",
    description:
      "Schema definitions, runtime parameters, and full schema dictionary for `orbit.config.ts`.",
    href: "/docs/reference/configuration",
  },
];
