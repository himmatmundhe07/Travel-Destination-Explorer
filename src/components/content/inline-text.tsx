import Link from "next/link";
import { Fragment } from "react";

// `code` and [label](href): the only inline markup the content data uses.
const INLINE = /`([^`]+)`|\[([^\]]+)\]\(([^)]+)\)/g;

export function InlineText({ text }: { text: string }) {
  const nodes: React.ReactNode[] = [];
  let last = 0;

  for (const match of text.matchAll(INLINE)) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    const [, code, label, href] = match;
    if (code !== undefined) {
      nodes.push(
        <code
          key={match.index}
          className="rounded border border-line bg-subtle px-1.5 py-0.5 font-mono text-[0.84em] text-ink"
        >
          {code}
        </code>,
      );
    } else {
      nodes.push(
        <Link
          key={match.index}
          href={href}
          className="font-medium text-brand underline-offset-2 hover:underline"
        >
          {label}
        </Link>,
      );
    }
    last = match.index + match[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));

  return nodes.map((node, i) => <Fragment key={i}>{node}</Fragment>);
}
