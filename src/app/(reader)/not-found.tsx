import type { Metadata } from "next";
import { NotFoundPanel } from "@/components/content/not-found-panel";

export const metadata: Metadata = {
  title: "Page not found",
};

// Rendered when a docs or guides page calls notFound(). It sits inside the reader layout,
// so the sidebar stays visible and the reader can keep navigating.
export default function ReaderNotFound() {
  return <NotFoundPanel />;
}
