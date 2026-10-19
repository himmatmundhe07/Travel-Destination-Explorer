"use client";

import { useEffect, useState } from "react";
import { PencilIcon } from "@/components/ui/icons";

interface Heading {
  id: string;
  text: string;
}

// A heading counts as "reached" once it scrolls above this offset (below the sticky header).
const REACHED_OFFSET = 120;

/** "On this page" list with scroll-spy: the last heading scrolled past the header is active. */
export function TableOfContents({ headings, editHref }: { headings: Heading[]; editHref: string }) {
  const [activeId, setActiveId] = useState(headings[0]?.id);

  useEffect(() => {
    const elements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    function update() {
      // The last heading may never reach the offset on a short final section,
      // so reaching the bottom of the page activates it directly.
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      let current = elements[0];
      if (atBottom) {
        current = elements[elements.length - 1];
      } else {
        for (const el of elements) {
          if (el.getBoundingClientRect().top <= REACHED_OFFSET) current = el;
        }
      }
      setActiveId(current.id);
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [headings]);

  return (
    <nav aria-label="On this page" className="text-sm">
      <p className="font-mono text-[10.5px] font-semibold tracking-wider text-ink-soft uppercase">
        On this page
      </p>
      <ul className="mt-3 space-y-0.5">
        {headings.map((heading) => {
          const active = heading.id === activeId;
          return (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                aria-current={active ? "location" : undefined}
                className={`block rounded px-2 py-1.5 text-[13px] transition-colors ${
                  active
                    ? "bg-brand-soft font-medium text-brand"
                    : "text-ink-muted hover:text-ink"
                }`}
              >
                {heading.text}
              </a>
            </li>
          );
        })}
      </ul>
      <a
        href={editHref}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 flex items-center gap-1.5 border-t border-line px-2 pt-4 text-xs text-ink-muted transition-colors hover:text-ink"
      >
        <PencilIcon className="size-3" />
        Edit this page on GitHub
      </a>
    </nav>
  );
}
