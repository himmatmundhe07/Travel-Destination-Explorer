import type { Metadata } from "next";
import { GroupView } from "@/components/content/group-view";
import { getCollectionIndex } from "@/lib/content";

const description = "Step-by-step guides for working with Orbit, grouped by the framework they build on.";

export const metadata: Metadata = {
  title: "Guides",
  description,
};

// A plain page.tsx: the [...slug] route beside it needs at least one segment, so /guides itself lives here.
export default function GuidesIndexPage() {
  return <GroupView collection="guides" group={getCollectionIndex("guides", description)} />;
}
