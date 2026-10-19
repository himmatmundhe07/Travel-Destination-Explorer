"use client";

import { useState } from "react";

type Answer = "yes" | "no";

/** "Was this guide helpful?" box. Nothing is sent anywhere; the answer only changes the UI. */
export function Feedback() {
  const [answer, setAnswer] = useState<Answer | null>(null);

  const button =
    "rounded-md border border-line-strong bg-surface px-3 py-1.5 text-xs font-medium text-ink transition-colors hover:bg-subtle";

  return (
    <div className="mt-6 flex flex-col gap-3 rounded-lg border border-line bg-subtle px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      {answer ? (
        <p role="status" className="text-[13px] text-ink-muted">
          {answer === "yes"
            ? "Thanks for the feedback. Glad this helped."
            : "Thanks for the feedback. We'll work on making this guide better."}
        </p>
      ) : (
        <>
          <p className="text-[13px] text-ink-muted">Was this guide helpful?</p>
          <div className="flex gap-2">
            <button type="button" className={button} onClick={() => setAnswer("yes")}>
              Yes, thanks!
            </button>
            <button type="button" className={button} onClick={() => setAnswer("no")}>
              Could be better
            </button>
          </div>
        </>
      )}
    </div>
  );
}
