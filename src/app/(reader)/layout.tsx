import { Suspense } from "react";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Sidebar } from "@/components/layout/sidebar";
import { SidebarView } from "@/components/layout/sidebar-view";
import { getNavSections } from "@/lib/navigation";

// Route group: shared by /docs and /guides only. The group name stays out of the URL, so
// /about and /search (in the (site) group) get the header without this sidebar.
export default function ReaderLayout({ children }: LayoutProps<"/">) {
  const sections = getNavSections();

  // The sidebar reads the pathname (client) to mark the active item and pick the
  // Docs or Guides context. Until that resolves, show it with nothing active.
  const sidebar = (
    <Suspense fallback={<SidebarView sections={sections} pathname="" />}>
      <Sidebar sections={sections} />
    </Suspense>
  );

  return (
    <div className="flex flex-1 flex-col lg:flex-row">
      <aside className="hidden w-64 shrink-0 border-r border-line bg-sidebar lg:block">
        <div className="sticky top-14 max-h-[calc(100vh-3.5rem)] overflow-y-auto px-3 py-6">
          {sidebar}
        </div>
      </aside>

      {/* Below lg the sidebar collapses into a disclosure above the content. */}
      <Suspense>
        <MobileNav>{sidebar}</MobileNav>
      </Suspense>

      <main className="min-w-0 flex-1 px-4 py-8 sm:px-8 lg:px-12 lg:py-10">{children}</main>
    </div>
  );
}
