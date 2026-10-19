import Link from "next/link";

export const headerNav = [
  { href: "/docs", label: "Documentation" },
  { href: "/guides", label: "Guides" },
  { href: "/about", label: "About" },
];

/** Presentational header nav; `activeHref` is resolved by the client wrapper in nav-links.tsx. */
export function NavList({ activeHref }: { activeHref?: string }) {
  return (
    <nav aria-label="Primary" className="flex h-full items-stretch gap-4 sm:gap-6">
      {headerNav.map((item) => {
        const active = item.href === activeHref;
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`relative flex items-center text-[13px] transition-colors ${
              active
                ? "font-medium text-brand after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:bg-brand"
                : "text-ink-muted hover:text-ink"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
