import Link from "next/link";
import { Suspense } from "react";
import { OrbitIcon, SearchIcon } from "@/components/ui/icons";
import { site } from "@/data/site";
import { getSearchEntries, toSuggestion } from "@/lib/search";
import { NavLinks } from "./nav-links";
import { NavList } from "./nav-list";
import { SearchBox } from "./search-box";

export function SiteHeader() {
  const suggestions = getSearchEntries().map(toSuggestion);

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-surface/95 backdrop-blur">
      <div className="flex h-14 w-full items-center gap-4 px-4 sm:px-6">
        <div className="flex h-full items-center gap-5 sm:gap-8">
          <Link href="/docs" className="flex items-center gap-2 text-sm font-semibold text-ink">
            <OrbitIcon className="size-5 text-brand" />
            <span className="hidden min-[420px]:inline">{site.name}</span>
          </Link>
          {/* usePathname suspends on dynamic params that weren't prerendered, so the
              active-state nav falls back to a plain nav. */}
          <Suspense fallback={<NavList />}>
            <NavLinks />
          </Suspense>
        </div>

        <div className="ml-auto flex items-center gap-3">
          <div className="hidden sm:block">
            <SearchBox entries={suggestions} />
          </div>
          <Link
            href="/search"
            aria-label="Search"
            className="rounded-md p-2 text-ink-muted hover:bg-subtle hover:text-ink sm:hidden"
          >
            <SearchIcon className="size-4" />
          </Link>
          <span className="hidden rounded-md border border-line-strong bg-subtle px-2 py-1 font-mono text-[11px] text-ink-muted sm:inline-flex">
            {site.version}
          </span>
        </div>
      </div>
    </header>
  );
}
