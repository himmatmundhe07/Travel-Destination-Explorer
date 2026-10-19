import type { Metadata } from "next";
import { NotFoundPanel } from "@/components/content/not-found-panel";

export const metadata: Metadata = {
  title: "Page not found",
};

// Handles URLs outside /docs and /guides (e.g. /nope). It renders in the root layout only,
// so there is no sidebar; docs and guides use the not-found in the (reader) group instead.
export default function RootNotFound() {
  return (
    <main className="flex-1 px-4 py-10 sm:px-8">
      <NotFoundPanel />
    </main>
  );
}
