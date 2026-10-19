import Link from "next/link";
import { ArrowRightIcon, InfoIcon, NavIcon } from "@/components/ui/icons";
import { overview } from "@/data/overview";
import { site } from "@/data/site";
import { ArticleHeader } from "./article-header";
import { CodeBlock } from "./code-block";

/** The documentation home (/docs): section cards, a callout and a quick-start snippet. */
export function OverviewView() {
  return (
    <div className="mx-auto w-full max-w-[44rem]">
      <ArticleHeader
        crumbs={[{ label: "Orbit Docs", href: "/docs" }, { label: "Overview" }]}
        title={overview.title}
        description={overview.description}
      />

      <ul className="mt-8 space-y-4">
        {overview.cards.map((card) => (
          <li key={card.href} className="rounded-lg border border-line bg-subtle p-5">
            <h2 className="flex items-center gap-2.5 text-base font-semibold text-ink">
              <NavIcon name={card.icon} className="size-4 text-brand" />
              {card.title}
            </h2>
            <p className="mt-1.5 text-[13.5px] text-ink-muted">{card.text}</p>
            <hr className="mt-4 border-line" />
            <Link
              href={card.href}
              className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-medium text-brand hover:text-brand-strong"
            >
              {card.cta}
              <ArrowRightIcon className="size-3.5" />
            </Link>
          </li>
        ))}
      </ul>

      <aside className="mt-8 flex gap-3 rounded-r-md border-l-[3px] border-brand bg-brand-soft/70 px-4 py-3.5">
        <InfoIcon className="mt-0.5 size-4 shrink-0 text-brand" />
        <div>
          <p className="text-[13.5px] font-semibold text-ink">{overview.callout.label}</p>
          <p className="mt-0.5 text-[13px] leading-6 text-ink-muted">{overview.callout.text}</p>
        </div>
      </aside>

      <div className="mt-8">
        <CodeBlock
          tone="light"
          language="bash"
          filename={overview.quickSetup.title}
          code={overview.quickSetup.code}
        />
      </div>

      <footer className="mt-12 flex flex-col gap-2 border-t border-line pt-5 text-xs text-ink-muted sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-center gap-2">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-brand" />
          {site.release}
        </p>
        <p className="flex items-center gap-4">
          <Link href={site.links.license} className="hover:text-ink">
            Documentation License
          </Link>
          <Link href={site.links.changelog} className="hover:text-ink">
            Changelog
          </Link>
        </p>
      </footer>
    </div>
  );
}
