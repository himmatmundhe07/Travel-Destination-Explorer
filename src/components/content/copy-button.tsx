"use client";

import { useEffect, useState } from "react";
import { CheckIcon, CopyIcon } from "@/components/ui/icons";

type Status = "idle" | "copied" | "failed";

/** Clipboard API first; falls back to a hidden textarea for browsers or contexts that block it. */
async function writeToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.cssText = "position:fixed;top:0;left:0;opacity:0";
    document.body.appendChild(textarea);
    textarea.select();
    try {
      return document.execCommand("copy");
    } catch {
      return false;
    } finally {
      textarea.remove();
    }
  }
}

export function CopyButton({ text, tone }: { text: string; tone: "dark" | "light" }) {
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    if (status === "idle") return;
    const timer = setTimeout(() => setStatus("idle"), 1800);
    return () => clearTimeout(timer);
  }, [status]);

  const color =
    tone === "dark" ? "text-slate-300 hover:text-white" : "text-brand hover:text-brand-strong";
  const label = status === "copied" ? "Copied" : status === "failed" ? "Failed" : "Copy";

  return (
    <button
      type="button"
      onClick={async () => setStatus((await writeToClipboard(text)) ? "copied" : "failed")}
      className={`inline-flex items-center gap-1.5 font-mono text-[11px] font-medium transition-colors ${color}`}
    >
      {status === "copied" ? <CheckIcon className="size-3.5" /> : <CopyIcon className="size-3.5" />}
      <span aria-live="polite">{label}</span>
    </button>
  );
}
