import Link from "next/link";
import { ArrowRightIcon, FolderIcon } from "@/components/ui/icons";
import { getCrumbs } from "@/lib/content";
import type { ResolvedGroup } from "@/lib/content";
import { pluralize } from "@/lib/format";
import { hrefFor } from "@/lib/routes";
import type { Collection } from "@/lib/types";
import { ArticleHeader } from "./article-header";
import { InlineText } from "./inline-text";

const cardClass =
  "group flex items-center gap-4 rounded-lg border border-line bg-subtle p-4 transition-colors hover:border-brand-line";

/** Index page for a folder (e.g. /docs/core-concepts): its sub-folders first, then its pages. */
export function GroupView({ collection, group }: { collection: Collection; group: ResolvedGroup }) {
  return (
    <div className="mx-auto w-full max-w-[44rem]">
      <ArticleHeader
        crumbs={getCrumbs(collection, group.slug)}
        title={group.title}
        description={group.description}
      />
      <ul className="mt-8 space-y-3">
        {group.groups.map((child) => (
          <li key={child.slug.join("/")}>
            <Link href={hrefFor(collection, child.slug)} className={cardClass}>
              <FolderIcon className="size-5 shrink-0 text-brand" />
              <span className="min-w-0 flex-1">
                <span className="block text-[15px] font-semibold text-ink">{child.title}</span>
                <span className="mt-1 block text-[13px] leading-5 text-ink-muted">
                  {child.description}
                </span>
                <span className="mt-1.5 block font-mono text-[11px] text-ink-soft">
                  {pluralize(child.pageCount, "page")}
                </span>
              </span>
              <ArrowRightIcon className="size-4 shrink-0 text-ink-soft group-hover:text-brand" />
            </Link>
          </li>
        ))}
        {group.pages.map((page) => (
          <li key={page.slug.join("/")}>
            <Link href={hrefFor(collection, page.slug)} className={cardClass}>
              <span className="min-w-0 flex-1">
                <span className="block text-[15px] font-semibold text-ink">{page.title}</span>
                <span className="mt-1 block text-[13px] leading-5 text-ink-muted">
                  <InlineText text={page.description} />
                </span>
              </span>
              <ArrowRightIcon className="size-4 shrink-0 text-ink-soft group-hover:text-brand" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
