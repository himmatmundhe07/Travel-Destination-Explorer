"use client";

import Link from "next/link";
import { useEffect } from "react";

/** Body of the error screens; shared by the root and (reader) error boundaries. */
export function ErrorPanel({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const digest = error instanceof Error && "digest" in error ? String(error.digest) : undefined;

  return (
    <div className="mx-auto w-full max-w-xl py-12 text-center">
      <p className="inline-block rounded border border-line-strong bg-subtle px-2 py-1 font-mono text-[10.5px] tracking-wider text-ink-muted uppercase">
        Status: UNEXPECTED_ERROR
      </p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-ink">Something went wrong</h1>
      <p className="mt-3 text-[15px] leading-7 text-ink-muted">
        This page couldn&apos;t be displayed. Try again, or head back to the documentation.
      </p>
      <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
        <button
          type="button"
          onClick={retry}
          className="inline-flex h-9 items-center justify-center rounded-md bg-brand px-4 text-sm font-medium text-white transition-colors hover:bg-brand-strong"
        >
          Try again
        </button>
        <Link
          href="/docs"
          className="inline-flex h-9 items-center justify-center rounded-md border border-line-strong bg-surface px-4 text-sm font-medium text-ink transition-colors hover:bg-subtle"
        >
          Back to Documentation
        </Link>
      </div>
      {digest && <p className="mt-6 font-mono text-xs text-ink-soft">Reference: {digest}</p>}
    </div>
  );
}
