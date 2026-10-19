import { Skeleton } from "@/components/ui/skeleton";

/** Loading UI for article-shaped routes, shown instantly while the page content streams in. */
export function ArticleSkeleton({ label }: { label: string }) {
  return (
    <div aria-busy="true" aria-label={label} className="mx-auto w-full max-w-[44rem] animate-pulse">
      <Skeleton className="h-3 w-56" />
      <Skeleton className="mt-5 h-9 w-72" />
      <Skeleton className="mt-4 h-3.5 w-full max-w-xl" />
      <Skeleton className="mt-2 h-3.5 w-2/3" />
      <hr className="mt-6 border-line" />
      <Skeleton className="mt-8 h-6 w-40" />
      <div className="mt-4 space-y-2.5">
        <Skeleton className="h-3.5 w-full" />
        <Skeleton className="h-3.5 w-full" />
        <Skeleton className="h-3.5 w-4/5" />
      </div>
      <Skeleton className="mt-6 h-16 w-full rounded-md" />
      <Skeleton className="mt-8 h-6 w-48" />
      <Skeleton className="mt-4 h-40 w-full rounded-lg" />
    </div>
  );
}
