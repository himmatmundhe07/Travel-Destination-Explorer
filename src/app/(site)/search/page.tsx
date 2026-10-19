import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ArticleHeader } from "@/components/content/article-header";
import { SearchIcon } from "@/components/ui/icons";
import { Skeleton } from "@/components/ui/skeleton";
import { getPages } from "@/lib/content";
import { hrefFor } from "@/lib/routes";
import { getSearchEntries, searchEntries, snippet } from "@/lib/search";

export const metadata: Metadata = {
  title: "Search",
};

export default function SearchPage({ searchParams }: PageProps<"/search">) {
  return (
    <div>
      <ArticleHeader
        crumbs={[{ label: "Orbit Docs", href: "/docs" }, { label: "Search" }]}
        title="Search"
        description="Search every documentation page and guide."
      />
      {/* The query is only known at request time, so everything that depends on it streams in. */}
      <Suspense fallback={<SearchSkeleton />}>
        <SearchResults searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function SearchResults({ searchParams }: { searchParams: PageProps<"/search">["searchParams"] }) {
  const { q } = await searchParams;
  const query = (Array.isArray(q) ? q[0] : q)?.trim() ?? "";
  const results = searchEntries(getSearchEntries(), query, 20);

  return (
    <>
      <form action="/search" className="mt-8">
        <label htmlFor="search-q" className="sr-only">
          Search documentation
        </label>
        <div className="flex items-center gap-2 rounded-md border border-line-strong bg-surface p-1 pl-3 focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/15">
          <SearchIcon className="size-4 shrink-0 text-ink-soft" />
          <input
            id="search-q"
            name="q"
            // Re-keyed so the field resets when the query changes via navigation.
            key={query}
            defaultValue={query}
            placeholder="Search documentation..."
            className="min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-ink-soft"
          />
          <button
            type="submit"
            className="rounded bg-brand px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-brand-strong"
          >
            Search
          </button>
        </div>
      </form>

      {query === "" ? (
        <section className="mt-8">
          <h2 className="text-sm font-semibold text-ink">Browse everything</h2>
          <ul className="mt-3 divide-y divide-line rounded-lg border border-line">
            {[...getPages("docs").map((p) => ({ p, c: "docs" as const })), ...getPages("guides").map((p) => ({ p, c: "guides" as const }))].map(
              ({ p, c }) => (
                <li key={`${c}/${p.slug.join("/")}`}>
                  <Link
                    href={hrefFor(c, p.slug)}
                    className="flex items-center justify-between px-4 py-2.5 text-sm text-ink hover:bg-subtle"
                  >
                    {p.title}
                    <span className="font-mono text-[11px] text-ink-soft">{c}</span>
                  </Link>
                </li>
              ),
            )}
          </ul>
        </section>
      ) : results.length === 0 ? (
        <p className="mt-8 rounded-lg border border-dashed border-line-strong px-4 py-8 text-center text-sm text-ink-muted">
          No pages match <strong className="text-ink">{query}</strong>. Try a broader term, or{" "}
          <Link href="/docs" className="font-medium text-brand hover:underline">
            browse the documentation
          </Link>
          .
        </p>
      ) : (
        <section aria-label="Results" className="mt-8">
          <p className="text-xs text-ink-muted">
            {results.length} {results.length === 1 ? "result" : "results"} for{" "}
            <strong className="text-ink">{query}</strong>
          </p>
          <ul className="mt-3 space-y-3">
            {results.map(({ entry }) => {
              const excerpt = snippet(entry.text, query) || entry.description;
              return (
                <li key={entry.href}>
                  <Link
                    href={entry.href}
                    className="block rounded-lg border border-line bg-surface p-4 transition-colors hover:border-brand-line hover:bg-subtle"
                  >
                    <span className="block font-mono text-[10.5px] text-ink-soft">{entry.section}</span>
                    <span className="mt-1 block text-[15px] font-semibold text-ink">{entry.title}</span>
                    <span className="mt-1 block text-[13px] leading-6 text-ink-muted">{excerpt}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </>
  );
}

function SearchSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading results" className="mt-8 animate-pulse space-y-3">
      <Skeleton className="h-11 w-full rounded-md" />
      <Skeleton className="h-20 w-full rounded-lg" />
      <Skeleton className="h-20 w-full rounded-lg" />
    </div>
  );
}
