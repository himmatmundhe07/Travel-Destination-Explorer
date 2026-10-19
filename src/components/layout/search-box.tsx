"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { SearchIcon } from "@/components/ui/icons";
import { searchHref } from "@/lib/routes";
import { searchEntries } from "@/lib/search";
import type { SearchEntry } from "@/lib/types";

/** Header search: live suggestions while typing, Enter opens the full results page, ⌘K / Ctrl+K focuses it. */
export function SearchBox({ entries }: { entries: SearchEntry[] }) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const listId = useId();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);

  const results = open ? searchEntries(entries, query, 6) : [];

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  function close() {
    setOpen(false);
    setActive(-1);
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (results.length === 0) return;
      const step = event.key === "ArrowDown" ? 1 : -1;
      setActive((active + step + results.length) % results.length);
    } else if (event.key === "Enter") {
      event.preventDefault();
      const target = results[active]?.entry.href ?? (query.trim() ? searchHref(query.trim()) : null);
      if (target) {
        router.push(target);
        close();
        inputRef.current?.blur();
      }
    } else if (event.key === "Escape") {
      close();
      inputRef.current?.blur();
    }
  }

  return (
    <div className="relative">
      <div className="flex h-8 w-44 items-center gap-2 rounded-md border border-line-strong bg-subtle px-2.5 text-ink-muted transition-colors focus-within:border-brand focus-within:bg-surface focus-within:ring-2 focus-within:ring-brand/15 lg:w-64">
        <SearchIcon className="size-3.5 shrink-0" />
        <input
          ref={inputRef}
          type="search"
          role="combobox"
          aria-expanded={results.length > 0}
          aria-controls={listId}
          aria-activedescendant={active >= 0 ? `${listId}-${active}` : undefined}
          aria-label="Search documentation"
          autoComplete="off"
          value={query}
          placeholder="Search documentation..."
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
            setActive(-1);
          }}
          onFocus={() => setOpen(true)}
          onBlur={close}
          onKeyDown={onKeyDown}
          className="min-w-0 flex-1 bg-transparent text-xs text-ink outline-none placeholder:text-ink-soft [&::-webkit-search-cancel-button]:hidden"
        />
        <kbd className="hidden rounded border border-line-strong bg-surface px-1 font-mono text-[10px] text-ink-muted lg:inline">
          ⌘K
        </kbd>
      </div>

      {open && query.trim() !== "" && (
        <div
          // Keep focus in the input so a click on a result isn't swallowed by the blur handler.
          onMouseDown={(event) => event.preventDefault()}
          className="absolute right-0 z-40 mt-2 w-80 overflow-hidden rounded-lg border border-line bg-surface shadow-lg"
        >
          {results.length > 0 ? (
            <ul id={listId} role="listbox" aria-label="Search suggestions">
              {results.map(({ entry }, index) => (
                <li
                  key={entry.href}
                  id={`${listId}-${index}`}
                  role="option"
                  aria-selected={index === active}
                >
                  <Link
                    href={entry.href}
                    onClick={close}
                    className={`block px-3 py-2.5 ${index === active ? "bg-brand-soft" : "hover:bg-subtle"}`}
                  >
                    <span className="block text-[13px] font-medium text-ink">{entry.title}</span>
                    <span className="block font-mono text-[10.5px] text-ink-soft">{entry.section}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-3 py-3 text-[13px] text-ink-muted">
              No matches. Press Enter to search the full text.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
