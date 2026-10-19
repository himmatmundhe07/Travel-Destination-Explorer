import type { CodeLanguage } from "./types";

export type TokenKind = "plain" | "comment" | "string" | "keyword" | "type" | "tag" | "prompt" | "flag";

export interface Token {
  text: string;
  kind: TokenKind;
}

const KEYWORDS =
  "export|default|function|return|const|let|type|import|from|async|await|if|else|new|interface|extends";

// Order matters: earlier alternatives win. Each group maps to a TokenKind below.
const CODE_PATTERN = new RegExp(
  [
    "(\\/\\/[^\\n]*)", // 1 comment
    "('[^'\\n]*'|\"[^\"\\n]*\"|`[^`\\n]*`)", // 2 string
    `\\b(${KEYWORDS})\\b`, // 3 keyword
    "(?<=<\\/?)([A-Za-z][\\w.-]*)", // 4 jsx tag name
    "\\b([A-Z][A-Za-z0-9]*)\\b", // 5 type / component
  ].join("|"),
  "g",
);

const kinds: TokenKind[] = ["comment", "string", "keyword", "tag", "type"];

function tokenizeCodeLine(line: string): Token[] {
  const tokens: Token[] = [];
  let last = 0;
  for (const match of line.matchAll(CODE_PATTERN)) {
    if (match.index > last) tokens.push({ text: line.slice(last, match.index), kind: "plain" });
    const group = match.findIndex((value, i) => i > 0 && value !== undefined);
    tokens.push({ text: match[0], kind: kinds[group - 1] });
    last = match.index + match[0].length;
  }
  if (last < line.length) tokens.push({ text: line.slice(last), kind: "plain" });
  return tokens;
}

function tokenizeShellLine(line: string): Token[] {
  if (line.startsWith("$ ")) {
    const rest = line.slice(2).split(/(\s--?[a-z][\w-]*)/g);
    return [
      { text: "$ ", kind: "prompt" },
      ...rest.map((text, i): Token => ({ text, kind: i % 2 ? "flag" : "plain" })),
    ];
  }
  if (line.startsWith(">") || line.startsWith("#")) return [{ text: line, kind: "comment" }];
  return [{ text: line, kind: "plain" }];
}

/** A deliberately small highlighter: enough for the snippets in this site, no dependency. */
export function tokenizeCode(code: string, language: CodeLanguage = "text"): Token[][] {
  const lines = code.split("\n");
  if (language === "bash") return lines.map(tokenizeShellLine);
  if (language === "text") return lines.map((line) => [{ text: line, kind: "plain" as const }]);
  return lines.map(tokenizeCodeLine);
}
