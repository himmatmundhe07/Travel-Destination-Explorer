import Link from "next/link";
import { Suspense } from "react";
import { ArrowLeftIcon, ArrowRightIcon, NavIcon } from "@/components/ui/icons";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { site } from "@/data/site";
import { suggestedArticles } from "@/data/suggestions";
import { InlineText } from "./inline-text";
import { DiagnosticLog, PathLookup } from "./missing-path";

/** The "Page not found" screen. Rendered inside the docs layout (sidebar kept) or on its own. */
export function NotFoundPanel() {
  return (
    <div className="mx-auto w-full max-w-3xl">
      <Breadcrumbs
        items={[{ label: "Documentation", href: "/docs" }, { label: "404 Not Found" }]}
      />
      <p className="mt-4 inline-block rounded border border-line-strong bg-subtle px-2 py-1 font-mono text-[10.5px] tracking-wider text-ink-muted uppercase">
        Status: 404_PAGE_NOT_FOUND
      </p>
      <h1 className="mt-3 text-[32px] font-semibold tracking-tight text-ink">Page not found</h1>
      <p className="mt-3 max-w-xl text-[15px] leading-7 text-ink-muted">
        The documentation page you requested could not be located. The path may have changed or
        the slug identifier might be invalid.
      </p>
      <Link
        href="/docs"
        className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-brand hover:text-brand-strong"
      >
        <ArrowLeftIcon className="size-3.5" /> Back to Documentation
      </Link>
      <hr className="mt-6 border-line" />

      <div className="mt-8">
        <Suspense fallback={<div className="h-[104px] animate-pulse rounded-lg bg-subtle" />}>
          <PathLookup />
        </Suspense>
      </div>

      <section className="mt-10">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-base font-semibold text-ink">Suggested articles</h2>
          <p className="font-mono text-[10.5px] text-ink-soft">Frequently accessed resources</p>
        </div>
        <ul className="mt-3 space-y-3">
          {suggestedArticles.map((article) => (
            <li key={article.href}>
              <Link
                href={article.href}
                className="group flex items-center gap-3 rounded-lg border border-line bg-surface p-4 transition-colors hover:border-brand-line hover:bg-subtle"
              >
                <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-md border border-line bg-subtle text-brand">
                  <NavIcon name={article.icon} className="size-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold text-ink">{article.title}</span>
                  <span className="mt-0.5 block text-xs leading-5 text-ink-muted">
                    <InlineText text={article.description} />
                  </span>
                </span>
                <ArrowRightIcon className="size-4 shrink-0 text-ink-soft group-hover:text-brand" />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-8">
        <Suspense fallback={<div className="h-28 animate-pulse rounded-lg bg-code/10" />}>
          <DiagnosticLog />
        </Suspense>
      </div>

      <div className="mt-8 flex flex-col gap-2 border-t border-line pt-4 text-xs text-ink-muted sm:flex-row sm:items-center sm:justify-between">
        <p>Looking for something specific that should be here?</p>
        <p className="flex items-center gap-4">
          <a href={site.links.reportBrokenLink} className="hover:text-ink">
            Report broken link
          </a>
          <a href={site.links.community} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
            Community Discord
          </a>
        </p>
      </div>
    </div>
  );
}
