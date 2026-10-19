import Link from "next/link";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/ui/icons";
import type { NavLink } from "@/lib/types";

/** Previous / next links at the bottom of an article. */
export function PagePager({ prev, next }: { prev?: NavLink; next?: NavLink }) {
  return (
    <nav aria-label="Pagination" className="mt-12 flex items-start justify-between gap-6 border-t border-line pt-6">
      {prev ? (
        <Link href={prev.href} className="group block">
          <span className="flex items-center gap-1.5 font-mono text-[11px] text-ink-soft">
            <ArrowLeftIcon className="size-3" /> Previous
          </span>
          <span className="mt-1 block text-sm font-semibold text-ink group-hover:text-brand">
            {prev.title}
          </span>
        </Link>
      ) : (
        <span />
      )}
      {next && (
        <Link href={next.href} className="group block text-right">
          <span className="flex items-center justify-end gap-1.5 font-mono text-[11px] text-ink-soft">
            Next <ArrowRightIcon className="size-3" />
          </span>
          <span className="mt-1 block text-sm font-semibold text-ink group-hover:text-brand">
            {next.title}
          </span>
        </Link>
      )}
    </nav>
  );
}
