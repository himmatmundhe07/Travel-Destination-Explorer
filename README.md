# Orbit Docs: Document Explorer

A documentation interface built with the Next.js App Router: sections, nested pages, a sidebar, breadcrumbs, an "On this page" table of contents, search, and a docs-aware 404 screen. It is project 2 of the *nextjs_projects_ui* practice set, and the UI follows the four provided screens.

"Orbit" is a fictional framework. Every page of documentation is local dummy data in `src/data`, with no backend or database.

## Tech stack

- **Next.js 16.4** (App Router, Turbopack), with `cacheComponents` and `partialPrefetching` enabled
- **React 19.3**
- **TypeScript** (strict)
- **Tailwind CSS v4**, with design tokens in `src/app/globals.css`
- No other runtime dependencies: syntax highlighting and search are small modules in `src/lib`

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000 (redirects to /docs)
npm run build    # production build, prerenders every known page
npm run start    # serve the production build
npm run lint
```

## Screens → routes

| Design screen | Route |
| --- | --- |
| `1_documentation_home.png` | `/docs` |
| `2_documentation_article_routing.png` | `/docs/core-concepts/routing` |
| `3_documentation_page_not_found.png` | `not-found.tsx` (e.g. `/docs/routing/catch-all-param`) |
| `4_nested_guide_dynamic_routes.png` | `/guides/nextjs/app-router/dynamic-routes` |

Routes without a design of their own, added because the designs link to them:

- **Folder indexes** such as `/docs/core-concepts`, `/guides/nextjs` and `/guides/nextjs/app-router`. The breadcrumbs in designs 2 and 4 show these levels, so each one has to be a real page.
- **`/guides`**, the target of the "Guides" tab in the header.
- **`/about`**, the third header tab. It also holds the "Documentation License" and "Changelog" sections that the home page footer links to.
- **`/search`**, which the header search and the 404 "Quick path lookup" submit to.
- All other docs pages in the sidebar (Installation, Project Setup, Layouts, and so on), written in the same style.

## Routes

| Route | Segment type | Rendering |
| --- | --- | --- |
| `/` | n/a | Redirects to `/docs` (`redirects()` in `next.config.ts`) |
| `/docs/[[...slug]]` | **Optional catch-all** | Prerendered for `/docs`, every folder and every page |
| `/guides` | static | Prerendered |
| `/guides/[...slug]` | **Catch-all** | Prerendered for every folder and guide |
| `/search` | static + search params | Static shell; results stream in because `?q=` is only known at request time |
| `/about` | static | Prerendered |

### Routing decisions

- **`/docs` uses an optional catch-all (`[[...slug]]`).** One file serves the overview (empty slug), folder indexes (one segment) and articles (two segments). The overview is a different page from an article, so a required catch-all would not have matched `/docs`. A separate `docs/page.tsx` would have duplicated the lookup logic.
- **`/guides` uses a required catch-all (`[...slug]`) plus an explicit `guides/page.tsx`.** This is the contrast with docs: `[...slug]` needs at least one segment, so the `/guides` index is its own file. The route handles any depth, which suits guides that are grouped by framework and then by topic (`nextjs/app-router/dynamic-routes`).
- **Why catch-all and not `[section]/[page]`.** Folder depth is not fixed: docs go two levels deep and guides three, and every level is a valid URL. Nested dynamic segments would need a file per level, and each file would repeat the same lookup. With catch-alls, one resolver in `src/lib/content.ts` maps a slug to a page, a folder index, or nothing.
- **Route groups: `(reader)` and `(site)`.** They share the root layout (header) but differ below it:
  - `(reader)` holds `/docs` and `/guides`. Its layout adds the sidebar, plus a collapsible menu on mobile. It also holds a `not-found.tsx` and an `error.tsx`, so a missing or broken page keeps the sidebar.
  - `(site)` holds `/about` and `/search`, which have no sidebar, in a centered single column.

  The group names never appear in URLs. Without groups, the sidebar would have to be conditionally rendered or repeated.
- **One sidebar layout for both docs and guides.** The sidebar reads the pathname to switch between the "Core Documentation" and "Guides context" headers and to expand the guides under Routing. This is how design 4 differs from design 2 while sharing one layout file.
- **Query parameters, not paths, for search.** `/search?q=…` is optional state on a single page.

## Rendering strategy

Cache Components is on, so each route is prerendered to a static shell where possible:

- **Docs and guides** export `generateStaticParams` with every known slug (pages and folder indexes), so all of them are prerendered at build time. Unknown slugs render on request and call `notFound()`. (`dynamicParams` is not available with Cache Components.)
- **`/search`** reads `searchParams`, which exist only at request time. The page shell, the title and the heading are static, and the form and results sit behind `<Suspense>` with a skeleton.
- **The header nav, the sidebar and the 404 lookup** use `usePathname()`, which suspends on paths that weren't prerendered. Each sits behind `<Suspense>` with a non-suspending fallback (a plain nav, a sidebar with nothing active), so the layout never blocks.
- **Client Components are used only where the browser is needed:** the active-state nav and sidebar, the search box, the scroll-spy table of contents, the copy button, the feedback box, the mobile menu, the 404 path panels and the error boundaries. Everything else is a Server Component, including syntax highlighting, which runs at render time.
- **No `'use cache'`.** Data comes from local modules, so there is no fetch to cache.

## Loading, errors and missing data

| Concern | Where | Why |
| --- | --- | --- |
| Loading | `(reader)/docs/[[...slug]]/loading.tsx`, `(reader)/guides/[...slug]/loading.tsx` | The pages depend on the catch-all param. With Partial Prefetching, navigation needs a Suspense boundary to stay instant, and `loading.tsx` provides it. The skeleton replaces only the content, so the sidebar and header don't flicker. |
| Loading | `<Suspense>` in `search/page.tsx` | Covers only the part that reads `?q=`. |
| Missing pages | `notFound()` in both catch-all pages, rendered by `(reader)/not-found.tsx` | Unknown slugs, and a guide path under the docs or the reverse. The screen keeps the sidebar, echoes the failing path, and offers search and suggestions. |
| Unknown URLs | `app/not-found.tsx` | URLs outside `/docs` and `/guides` get the same screen without a sidebar, and a real 404 status. |
| Runtime errors | `(reader)/error.tsx` and `app/error.tsx` | Content is local, so the realistic failures are bugs or malformed pages. Two boundaries share one `ErrorPanel`: the reader one keeps the sidebar visible, and the root one covers `/about`, `/search` and layout-level failures. Both offer *Try again* and a way back. |

> Because content streams behind `loading.tsx`, an unknown docs or guides slug that reaches `notFound()` after streaming starts is served with HTTP 200 and `<meta name="robots" content="noindex">`, not a 404 status. This is documented Next.js behaviour. URLs outside those routes return a real 404.

## Folder structure

```
src/
├── app/
│   ├── layout.tsx                      # root layout: fonts + sticky header
│   ├── globals.css                     # Tailwind + design tokens
│   ├── not-found.tsx                   # unknown URLs outside docs/guides
│   ├── error.tsx                       # root error boundary
│   ├── (reader)/                       # route group: pages with the sidebar
│   │   ├── layout.tsx                  # sidebar (+ mobile menu)
│   │   ├── not-found.tsx               # docs-aware 404 (design 3)
│   │   ├── error.tsx                   # error boundary that keeps the sidebar
│   │   ├── docs/[[...slug]]/           # optional catch-all: page.tsx + loading.tsx
│   │   └── guides/
│   │       ├── page.tsx                # /guides index
│   │       └── [...slug]/              # catch-all: page.tsx + loading.tsx
│   └── (site)/                         # route group: plain pages
│       ├── layout.tsx
│       ├── about/page.tsx
│       └── search/page.tsx
├── components/
│   ├── ui/        # generic: icons, breadcrumbs, skeleton
│   ├── layout/    # header, nav, search box, sidebar, mobile menu
│   └── content/   # documentation components: blocks, code, tables, TOC, views
├── data/          # dummy content: docs/, guides, overview, groups, site, suggestions
└── lib/
    ├── types.ts       # Page, Block, Group, NavSection, …
    ├── content.ts     # lookups: findPage, resolve, getAdjacent, getCrumbs
    ├── navigation.ts  # sidebar tree built from the content
    ├── search.ts      # ranking, snippets, search index
    ├── highlight.ts   # small syntax highlighter
    ├── routes.ts      # href builders
    └── format.ts
```

## Components

- **`components/ui`:** generic pieces that know nothing about documentation: icons, `Breadcrumbs`, `Skeleton`.
- **`components/layout`:** the app shell.
  - `SiteHeader`, with `NavLinks` (Client Component for the active tab) and `SearchBox`
  - `Sidebar` (client wrapper) and `SidebarView` (presentational)
  - `MobileNav`
- **`components/content`:** documentation building blocks.
  - `Blocks` renders a page's content, using `CodeBlock`, `Callout`, `DocTable` and `InlineText`
  - `ArticleView`, `GroupView` and `OverviewView` are the three page bodies
  - `NotFoundPanel` is shared by both not-found files, and `ErrorPanel` by both error boundaries
- **Page-specific code** stays in the page file (for example `SearchResults` in `search/page.tsx`).

A split between a presentational component and a thin client wrapper (`SidebarView` and `Sidebar`, `NavList` and `NavLinks`) lets the Suspense fallback render the same markup without calling `usePathname`.

## Data and types

- Content is typed as `Page` objects made of `Block`s: paragraph, heading, list, callout, code, table. Pages never contain JSX, so adding a page means adding data only.
- Text fields accept two bits of inline markup, `` `code` `` and `[label](/href)`, parsed by `InlineText`.
- `src/data/groups.ts` titles the folders. `src/data/docs/*` and `src/data/guides.ts` hold the pages, and their array order is the reading order.
- **Derived, not hardcoded:**
  - the sidebar (built from the pages)
  - previous and next links (neighbours in the page list)
  - breadcrumbs (built from each slug segment)
  - "On this page" (built from heading blocks)
  - guide step numbers
  - the search index

## Search

- The header box shows live suggestions as you type, supports arrow keys, Enter and Escape, and is focused with ⌘K or Ctrl+K. Enter without a selection opens `/search?q=…`.
- `/search` ranks pages on the server: matches in a title weigh more than headings, which weigh more than descriptions, which weigh more than body text. A small stemmer lets "route", "routes" and "routing" match each other.
- The 404 "Quick path lookup" submits the failing path to the same page: `/docs/routing/catch-all-param` finds the Routing page.

## Testing checklist

Checked on the dev server and with `npm run build` and `npm run start`:

- Every route visited directly and through in-app navigation: header tabs, sidebar (including the guide sub-items), cards, breadcrumbs at every level, previous/next links, folder indexes.
- Invalid input, all rendering the not-found screen:
  - unknown docs and guide slugs
  - a docs folder name used under `/guides`
  - unknown top-level URLs
  - extra segments after a page
- Search: live suggestions, keyboard selection, the empty-query list, a query with no matches, and the 404 lookup.
- The error boundary, triggered with a temporary throw: the sidebar stayed visible, and *Try again* recovered the page.
- "On this page" scroll-spy, including the last heading at the bottom of the page. Copy button and the guide feedback box.
- Desktop (1280 and 1400px) and mobile (375px): no page-level horizontal overflow, and the sidebar menu closes after navigating.

## Design notes

- Design 4 shows the first code sample with a missing `<` in the closing `</h1>` tag. The typo is fixed in the data.
- Design 4 has no table of contents, so guides don't show one. Docs articles do, on screens wider than 1280px.
- The footer links on the home page (License, Changelog) point to sections of `/about`. "GitHub Repo", "Report broken link" and "Community Discord" are placeholder external links, since the framework is fictional.
- The code highlighter is intentionally small. It covers the sample languages used here (TSX, TS and shell), not general-purpose highlighting.
