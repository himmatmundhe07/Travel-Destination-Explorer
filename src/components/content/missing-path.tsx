"use client";

import { usePathname } from "next/navigation";
import { SearchIcon } from "@/components/ui/icons";

/** "Quick path lookup": the requested path pre-filled in a form that searches the docs. */
export function PathLookup() {
  const pathname = usePathname();
  return (
    <form
      action="/search"
      className="rounded-lg border border-line bg-subtle p-4 text-left"
    >
      <div className="flex items-center justify-between font-mono text-[10.5px] tracking-wider text-ink-soft uppercase">
        <label htmlFor="path-lookup">Quick path lookup</label>
        <span className="normal-case">Search query cache</span>
      </div>
      <div className="mt-3 flex items-center gap-2 rounded-md border border-line-strong bg-surface p-1 pl-3 focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/15">
        <SearchIcon className="size-3.5 shrink-0 text-ink-soft" />
        <input
          id="path-lookup"
          // Re-keyed so the field follows the URL when navigating between not-found pages.
          key={pathname}
          name="q"
          defaultValue={pathname}
          className="min-w-0 flex-1 bg-transparent font-mono text-xs text-ink outline-none"
        />
        <button
          type="submit"
          className="rounded bg-brand px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-brand-strong"
        >
          Search
        </button>
      </div>
    </form>
  );
}

/** Router trace echoing the path that failed to resolve. */
export function DiagnosticLog() {
  const pathname = usePathname();
  return (
    <figure className="overflow-hidden rounded-lg border border-code-line bg-code text-left">
      <figcaption className="flex items-center justify-between border-b border-code-line px-4 py-2 font-mono text-[10.5px] text-slate-400">
        <span>orbit-diagnostic.log</span>
        <span>HTTP 404</span>
      </figcaption>
      <pre className="overflow-x-auto px-4 py-3 font-mono text-xs leading-6 whitespace-pre">
        <span className="block text-slate-500"># Diagnostic router trace</span>
        <span className="block text-slate-100">
          <span className="text-slate-500">$ </span>orbit-cli verify <span className="text-blue-300">--path</span>{" "}
          <span className="text-sky-300">&quot;{pathname}&quot;</span>
        </span>
        <span className="block text-rose-300">
          ERR_ROUTER_SLUG_UNMATCHED: No route matching slug segment in manifest tree.
        </span>
        <span className="block text-slate-400">
          &gt; Suggested resolution: run <span className="text-blue-300">orbit sync --manifest</span> or inspect{" "}
          <span className="text-blue-300">orbit.routes.json</span>
        </span>
      </pre>
    </figure>
  );
}
