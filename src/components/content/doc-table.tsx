import { InlineText } from "./inline-text";

export function DocTable({
  head,
  rows,
  firstColumn,
}: {
  head: string[];
  rows: string[][];
  firstColumn?: "path";
}) {
  return (
    <div className="overflow-x-auto rounded-lg border border-line">
      <table className="w-full min-w-[28rem] border-collapse text-left text-[13px]">
        <thead>
          <tr className="border-b border-line bg-subtle">
            {head.map((label) => (
              <th
                key={label}
                scope="col"
                className="px-4 py-2.5 font-mono text-[10.5px] font-semibold tracking-wider text-ink-muted uppercase"
              >
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) =>
                j === 0 && firstColumn === "path" ? (
                  <th
                    key={j}
                    scope="row"
                    className="px-4 py-3 text-left font-mono text-xs font-normal text-brand"
                  >
                    {cell}
                  </th>
                ) : (
                  <td key={j} className="px-4 py-3 align-top text-ink-muted">
                    <InlineText text={cell} />
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
