"use client";

import { usePathname } from "next/navigation";
import type { NavSection } from "@/lib/types";
import { SidebarView } from "./sidebar-view";

export function Sidebar({ sections }: { sections: NavSection[] }) {
  return <SidebarView sections={sections} pathname={usePathname()} />;
}
