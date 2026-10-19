import { CodeIcon, FolderIcon } from "@/components/ui/icons";
import { type TokenKind, tokenizeCode } from "@/lib/highlight";
import type { CodeLanguage } from "@/lib/types";
import { CopyButton } from "./copy-button";

const darkColors: Record<TokenKind, string> = {
  plain: "text-slate-100",
  comment: "text-slate-500",
  string: "text-sky-300",
  keyword: "text-slate-400",
  type: "text-blue-400",
  tag: "text-sky-300",
  prompt: "text-slate-500",
  flag: "text-blue-300",
};

const lightColors: Record<TokenKind, string> = {
  plain: "text-ink",
  comment: "text-ink-soft",
  string: "text-brand",
  keyword: "text-ink-muted",
  type: "text-brand",
  tag: "text-brand",
  prompt: "text-ink-soft",
  flag: "text-brand",
};

/** The text a reader should copy: shell prompts are dropped, everything else is verbatim. */
const copyText = (code: string, language: CodeLanguage) =>
  language === "bash"
    ? code
        .split("\n")
        .filter((line) => line.startsWith("$ "))
        .map((line) => line.slice(2))
        .join("\n")
    : code;

export function CodeBlock({
  code,
  filename,
  language = "text",
  tone = "dark",
}: {
  code: string;
  filename?: string;
  language?: CodeLanguage;
  tone?: "dark" | "light";
}) {
  const dark = tone === "dark";
  const colors = dark ? darkColors : lightColors;
  const isShell = language === "bash";

  return (
    <figure
      className={`overflow-hidden rounded-lg border ${
        dark ? "border-code-line bg-code" : "border-line bg-surface"
      }`}
    >
      <figcaption
        className={`flex items-center justify-between gap-3 px-4 py-2.5 font-mono text-[11px] ${
          dark ? "border-b border-code-line text-slate-300" : "border-b border-line bg-subtle text-ink-muted"
        }`}
      >
        <span className="flex min-w-0 items-center gap-2">
          {!isShell &&
            (language === "text" ? (
              <FolderIcon className="size-3.5 shrink-0" />
            ) : (
              <CodeIcon className="size-3.5 shrink-0" />
            ))}
          <span className="truncate">{filename ?? "Code"}</span>
        </span>
        <CopyButton text={copyText(code, language)} tone={dark ? "dark" : "light"} />
      </figcaption>
      <pre className="overflow-x-auto px-4 py-4 font-mono text-[12.5px] leading-6">
        <code>
          {tokenizeCode(code, language).map((line, i) => (
            <span key={i} className="block min-h-6 whitespace-pre">
              {line.map((token, j) => (
                <span key={j} className={colors[token.kind]}>
                  {token.text}
                </span>
              ))}
            </span>
          ))}
        </code>
      </pre>
    </figure>
  );
}
