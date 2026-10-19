/** Placeholder block for loading states. Wrap groups in `animate-pulse`. */
export function Skeleton({ className }: { className: string }) {
  return <div className={`rounded bg-line/70 ${className}`} />;
}
