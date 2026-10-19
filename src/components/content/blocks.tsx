import type { Block } from "@/lib/types";
import { Callout } from "./callout";
import { CodeBlock } from "./code-block";
import { DocTable } from "./doc-table";
import { InlineText } from "./inline-text";

/** Renders a page's content blocks. `numbered` adds the step numbers used by guides. */
export function Blocks({ blocks, numbered = false }: { blocks: Block[]; numbered?: boolean }) {
  // Step number of each heading block, by block index (1-based), computed up front.
  const stepNumbers = new Map<number, number>();
  blocks.forEach((block, i) => {
    if (block.type === "heading") stepNumbers.set(i, stepNumbers.size + 1);
  });

  return (
    <div className="space-y-5">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "heading": {
            return (
              <h2
                key={i}
                id={block.id}
                className="flex items-center gap-2.5 pt-5 text-[22px] font-semibold tracking-tight text-ink"
              >
                {numbered && (
                  <span
                    aria-hidden="true"
                    className="inline-flex size-5 shrink-0 items-center justify-center rounded-[3px] bg-brand font-mono text-[11px] font-semibold text-white"
                  >
                    {stepNumbers.get(i)}
                  </span>
                )}
                {block.text}
              </h2>
            );
          }
          case "paragraph":
            return (
              <p key={i} className="text-[14.5px] leading-7 text-ink-muted">
                <InlineText text={block.text} />
              </p>
            );
          case "list": {
            const List = block.ordered ? "ol" : "ul";
            return (
              <List
                key={i}
                className={`space-y-1.5 pl-5 text-[14.5px] leading-7 text-ink-muted marker:text-brand ${
                  block.ordered ? "list-decimal" : "list-disc"
                }`}
              >
                {block.items.map((item) => (
                  <li key={item}>
                    <InlineText text={item} />
                  </li>
                ))}
              </List>
            );
          }
          case "callout":
            return <Callout key={i} variant={block.variant} label={block.label} text={block.text} />;
          case "code":
            return (
              <CodeBlock key={i} code={block.code} filename={block.filename} language={block.language} />
            );
          case "table":
            return (
              <DocTable key={i} head={block.head} rows={block.rows} firstColumn={block.firstColumn} />
            );
        }
      })}
    </div>
  );
}
