import { site } from "@/data/site";
import { getAdjacent, getCrumbs, getHeadings } from "@/lib/content";
import { hrefFor } from "@/lib/routes";
import type { Collection, NavLink, Page } from "@/lib/types";
import { ArticleHeader } from "./article-header";
import { Blocks } from "./blocks";
import { Feedback } from "./feedback";
import { PagePager } from "./page-pager";
import { TableOfContents } from "./toc";

const toLink = (collection: Collection, page: Page): NavLink => ({
  title: page.title,
  href: hrefFor(collection, page.slug),
});

/**
 * One readable page. Docs show an "On this page" rail; guides use numbered steps and
 * a feedback box instead, as in the designs.
 */
export function ArticleView({ collection, page }: { collection: Collection; page: Page }) {
  const isGuide = collection === "guides";
  const { prev, next } = getAdjacent(collection, page);
  const headings = getHeadings(page);

  return (
    <div className="mx-auto flex w-full max-w-[60rem] gap-12">
      <article className="min-w-0 max-w-[44rem] flex-1">
        <ArticleHeader
          crumbs={getCrumbs(collection, page.slug)}
          title={page.title}
          description={page.description}
          badge={isGuide ? "GUIDE" : undefined}
          meta={isGuide && page.readMinutes ? `Estimated read: ${page.readMinutes} min` : undefined}
        />
        <div className="mt-8">
          <Blocks blocks={page.blocks} numbered={isGuide} />
        </div>
        <PagePager
          // The first docs page follows the overview, which isn't part of the page list.
          prev={prev ? toLink(collection, prev) : !isGuide ? { title: "Introduction", href: "/docs" } : undefined}
          next={next ? toLink(collection, next) : undefined}
        />
        {isGuide && <Feedback />}
      </article>

      {!isGuide && headings.length > 1 && (
        <aside className="hidden w-48 shrink-0 xl:block">
          <div className="sticky top-24">
            <TableOfContents headings={headings} editHref={site.links.repo} />
          </div>
        </aside>
      )}
    </div>
  );
}
