"use client"; // Error boundaries must be Client Components

import { ErrorPanel } from "@/components/content/error-panel";

// Fallback for everything outside the reader group (/about, /search, and layout-level failures).
// The header stays visible because error.tsx renders inside the root layout.
export default function RootError({ error, retry }: { error: unknown; retry: () => void }) {
  return (
    <main className="flex-1 px-4 py-6 sm:px-8">
      <ErrorPanel error={error} retry={retry} />
    </main>
  );
}
