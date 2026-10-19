import Link from "next/link";
import { CodeIcon, FileIcon, NavIcon } from "@/components/ui/icons";
import { site } from "@/data/site";
import type { NavSection } from "@/lib/types";

/**
 * Presentational sidebar. `pathname` decides which item is active and whether the
 * Guides context is shown; it is empty while the client wrapper is still resolving it.
 */
export function SidebarView({ sections, pathname }: { sections: NavSection[]; pathname: string }) {
  const inGuides = pathname.startsWith("/guides");

  return (
    <nav aria-label="Documentation" className="flex min-h-full flex-col">
      <div className="px-2 pb-4">
        {inGuides && (
          <p className="mb-2 flex items-center gap-1.5 font-mono text-[10px] font-semibold tracking-wider text-brand uppercase">
            <FileIcon className="size-3" /> Guides context
          </p>
        )}
        <p className="text-sm font-semibold text-ink">
          {inGuides ? "Next.js App Router" : site.tagline}
        </p>
        <p className="mt-0.5 font-mono text-[10.5px] text-ink-soft">{site.versionLabel}</p>
      </div>
      <hr className="border-line" />

      <div className="flex-1 space-y-6 py-5">
        {sections.map((section) => (
          <section key={section.title}>
            <h2 className="px-2 font-mono text-[10px] font-semibold tracking-wider text-ink-soft uppercase">
              {section.title}
            </h2>
            <ul className="mt-2 space-y-0.5">
              {section.items.map((item) => {
                const guideActive = inGuides && item.guides !== undefined;
                const active = item.href === pathname || guideActive;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={item.href === pathname ? "page" : undefined}
                      className={`flex items-center gap-2.5 rounded-r-md border-l-2 px-2.5 py-1.5 text-[13px] transition-colors ${
                        active
                          ? "border-brand bg-brand-soft font-medium text-brand"
                          : "border-transparent text-ink-muted hover:bg-line/40 hover:text-ink"
                      }`}
                    >
                      <NavIcon name={item.icon} className="size-3.5 shrink-0" />
                      {item.title}
                    </Link>
                    {guideActive && (
                      <ul className="mt-1 mb-1 space-y-0.5 pl-9">
                        {item.guides?.map((guide) => (
                          <li key={guide.href}>
                            <Link
                              href={guide.href}
                              aria-current={guide.href === pathname ? "page" : undefined}
                              className={`block rounded px-1.5 py-1 text-xs transition-colors ${
                                guide.href === pathname
                                  ? "font-semibold text-brand"
                                  : "text-ink-muted hover:text-ink"
                              }`}
                            >
                              {guide.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>

      <ul className="space-y-1 border-t border-line pt-4 text-xs text-ink-muted">
        <li>
          <a
            href={site.links.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-2 py-1 hover:text-ink"
          >
            <CodeIcon className="size-3.5" /> GitHub Repo
          </a>
        </li>
        <li>
          <Link href="/docs/reference/configuration" className="flex items-center gap-2 px-2 py-1 hover:text-ink">
            <FileIcon className="size-3.5" /> API Reference
          </Link>
        </li>
      </ul>
    </nav>
  );
}
