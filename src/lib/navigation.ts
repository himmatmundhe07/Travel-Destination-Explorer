import { groups } from "@/data/groups";
import { getPages } from "./content";
import { hrefFor } from "./routes";
import type { NavItem, NavSection } from "./types";

/**
 * Sidebar tree, built from the docs content: one section per top-level folder.
 * "Introduction" (the /docs overview) opens the first section, and the guides
 * that belong to Routing hang off that item for the Guides context.
 */
export function getNavSections(): NavSection[] {
  const sections: NavSection[] = [];

  for (const page of getPages("docs")) {
    const [folder] = page.slug;
    let section = sections.find((s) => s.title === groups.docs[folder]?.title);
    if (!section) {
      section = { title: groups.docs[folder]?.title ?? folder, items: [] };
      sections.push(section);
    }
    const item: NavItem = {
      title: page.title,
      href: hrefFor("docs", page.slug),
      icon: page.icon ?? "folder",
    };
    if (page.slug.join("/") === "core-concepts/routing") {
      item.guides = getPages("guides").map((guide) => ({
        title: guide.title,
        href: hrefFor("guides", guide.slug),
      }));
    }
    section.items.push(item);
  }

  sections[0]?.items.unshift({ title: "Introduction", href: "/docs", icon: "enter" });
  return sections;
}
