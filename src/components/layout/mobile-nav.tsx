"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { ChevronDownIcon } from "@/components/ui/icons";

/**
 * The sidebar as a disclosure on small screens. Keying <details> by pathname remounts it
 * closed after every navigation, so a tapped link doesn't leave the menu covering the page.
 */
export function MobileNav({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <details key={pathname} className="group border-b border-line bg-sidebar lg:hidden">
      <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-[13px] font-medium text-ink">
        Browse documentation
        <ChevronDownIcon className="size-4 transition-transform group-open:rotate-180" />
      </summary>
      <div className="border-t border-line px-3 py-4">{children}</div>
    </details>
  );
}
