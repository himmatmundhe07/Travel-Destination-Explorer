"use client"; // Error boundaries must be Client Components

import { ErrorPanel } from "@/components/content/error-panel";

// A second boundary scoped to /docs and /guides. Because it sits inside the (reader) layout,
// a failing page keeps the sidebar, and readers can navigate straight to another page.
export default function ReaderError({ error, retry }: { error: unknown; retry: () => void }) {
  return <ErrorPanel error={error} retry={retry} />;
}
