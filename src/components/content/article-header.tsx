import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import type { Crumb } from "@/lib/types";
import { InlineText } from "./inline-text";

export function ArticleHeader({
  crumbs,
  title,
  description,
  badge,
  meta,
}: {
  crumbs: Crumb[];
  title: string;
  description: string;
  badge?: string;
  meta?: string;
}) {
  return (
    <header>
      <Breadcrumbs items={crumbs} />
      {badge && (
        <p className="mt-3 flex items-center gap-2.5 font-mono text-[11px] text-ink-muted">
          <span className="rounded-[3px] bg-brand-soft px-1.5 py-0.5 font-semibold text-brand">
            {badge}
          </span>
          {meta}
        </p>
      )}
      <h1 className={`${badge ? "mt-2" : "mt-4"} text-[32px] font-semibold tracking-tight text-ink`}>
        {title}
      </h1>
      <p className="mt-3 max-w-2xl text-[15.5px] leading-7 text-ink-muted">
        <InlineText text={description} />
      </p>
      <hr className="mt-6 border-line" />
    </header>
  );
}
