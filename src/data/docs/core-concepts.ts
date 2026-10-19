import type { Page } from "@/lib/types";

export const coreConcepts: Page[] = [
  {
    slug: ["core-concepts", "routing"],
    title: "Routing",
    description:
      "Orbit uses a file-system based routing mechanism with support for static paths, nested segments, and catch-all routes.",
    icon: "route",
    blocks: [
      { type: "heading", id: "overview", text: "Overview" },
      {
        type: "paragraph",
        text: "Every directory inside the `app` directory maps directly to a matching URL path segment. When an incoming request reaches your edge cluster, Orbit analyzes the matching segment tree and evaluates each layout node before rendering leaf page handlers.",
      },
      {
        type: "paragraph",
        text: "Route resolution runs deterministically with zero runtime regex overhead. Leaf pages defined via `page.tsx` or `route.ts` automatically export their execution strategy to either static edge renderers or dynamic compute clusters.",
      },
      {
        type: "callout",
        variant: "info",
        label: "Convention Note:",
        text: "Orbit reserves system file identifiers including `layout.tsx`, `loading.tsx`, and `error.tsx` to isolate distinct lifecycle tiers.",
      },
      { type: "heading", id: "catch-all-routes", text: "Catch-all Routes" },
      {
        type: "paragraph",
        text: "Dynamic segments can be extended to catch all subsequent URL segments by prepending an ellipsis inside square brackets: `[...slug]`. The matched parameters are parsed into an array of path parts.",
      },
      {
        type: "code",
        filename: "app/[...slug]/page.tsx",
        language: "tsx",
        code: `// app/[...slug]/page.tsx
export default function Page({ params }: { params: { slug: string[] } }) {
  return <div>Path: {params.slug.join('/')}</div>;
}`,
      },
      {
        type: "table",
        firstColumn: "path",
        head: ["Route Pattern", "Example URL", "Params Object"],
        rows: [
          ["app/shop/[...slug]/page.tsx", "/shop/clothes", "`{ slug: ['clothes'] }`"],
          ["app/shop/[...slug]/page.tsx", "/shop/clothes/tops", "`{ slug: ['clothes', 'tops'] }`"],
        ],
      },
      { type: "heading", id: "route-groups", text: "Route Groups" },
      {
        type: "paragraph",
        text: "Folders wrapped with parentheses, such as `(marketing)` or `(dashboard)`, serve purely as organizational conventions and are omitted from the final URL path resolution. Refer to the [nested layout hierarchy](/docs/core-concepts/layouts) or explore [multi-root application strategies](/guides/nextjs/app-router/parallel-intercepting) for complex multi-tenant projects.",
      },
    ],
  },
  {
    slug: ["core-concepts", "layouts"],
    title: "Layouts",
    description: "Layouts wrap groups of routes with shared UI that persists across navigation.",
    icon: "layout",
    blocks: [
      { type: "heading", id: "root-layout", text: "Root layout" },
      {
        type: "paragraph",
        text: "Every app has a root layout in `app/layout.tsx`. It wraps all routes and must render the `html` and `body` elements.",
      },
      {
        type: "code",
        filename: "app/layout.tsx",
        language: "tsx",
        code: `export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}`,
      },
      { type: "heading", id: "nested-layouts", text: "Nested layouts" },
      {
        type: "paragraph",
        text: "A `layout.tsx` inside a folder wraps every route below it. Layouts persist across navigation, so state and scroll position are preserved when you move between sibling pages.",
      },
      {
        type: "callout",
        variant: "info",
        label: "Convention Note:",
        text: "Layouts do not re-render when child routes change. Use `template.tsx` when you need a fresh instance on every navigation.",
      },
      { type: "heading", id: "sharing-a-layout", text: "Sharing a layout across routes" },
      {
        type: "paragraph",
        text: "Wrap folders in parentheses to share a layout without adding a URL segment:",
      },
      {
        type: "code",
        filename: "app",
        language: "text",
        code: `app/
├── (marketing)/layout.tsx   → /about, /pricing
└── (dashboard)/layout.tsx   → /overview, /settings`,
      },
    ],
  },
  {
    slug: ["core-concepts", "data-fetching"],
    title: "Data Fetching",
    description: "Load data on the server, choose a caching strategy, and stream slow content.",
    icon: "refresh",
    blocks: [
      { type: "heading", id: "server-components", text: "Server components" },
      {
        type: "paragraph",
        text: "Pages are server components by default, so they can fetch data directly. Await the result in the component body:",
      },
      {
        type: "code",
        filename: "app/projects/page.tsx",
        language: "tsx",
        code: `export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <ul>
      {projects.map((project) => (
        <li key={project.id}>{project.name}</li>
      ))}
    </ul>
  );
}`,
      },
      { type: "heading", id: "caching-strategies", text: "Caching strategies" },
      {
        type: "table",
        head: ["Strategy", "Behavior", "Use when"],
        rows: [
          ["`static`", "Rendered once at build time", "Content rarely changes"],
          ["`revalidate`", "Re-rendered in the background after an interval", "Content changes on a schedule"],
          ["`dynamic`", "Rendered on every request", "Content depends on the request"],
        ],
      },
      { type: "heading", id: "handling-slow-data", text: "Handling slow data" },
      {
        type: "paragraph",
        text: "Wrap slow components in a `Suspense` boundary so the rest of the page streams immediately. Add a `loading.tsx` file to show a skeleton while a whole route loads.",
      },
      {
        type: "callout",
        variant: "warning",
        label: "Safety Tip:",
        text: "Avoid awaiting data in a layout when only one page needs it. The layout blocks every route beneath it.",
      },
    ],
  },
];
