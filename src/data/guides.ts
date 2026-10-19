import type { Page } from "@/lib/types";

/** Guides live under /guides/nextjs/app-router/… and use numbered headings. */
export const guidePages: Page[] = [
  {
    slug: ["nextjs", "app-router", "defining-routes"],
    title: "Defining Routes",
    description:
      "Create your first routes with folders and page files, then nest them to build deeper URLs.",
    readMinutes: 3,
    blocks: [
      { type: "heading", id: "creating-a-route", text: "Creating a route" },
      {
        type: "paragraph",
        text: "A route is a folder that contains a `page.tsx` file. The folder name becomes the URL segment, so `app/about/page.tsx` is served at `/about`.",
      },
      {
        type: "code",
        filename: "app/about/page.tsx",
        language: "tsx",
        code: `export default function AboutPage() {
  return <h1>About Orbit</h1>;
}`,
      },
      { type: "heading", id: "nesting-routes", text: "Nesting routes" },
      {
        type: "paragraph",
        text: "Nest folders to nest URL segments. A `page.tsx` is only required in the folders you want to be publicly reachable:",
      },
      {
        type: "code",
        filename: "app",
        language: "text",
        code: `app/
├── blog/
│   ├── page.tsx          → /blog
│   └── archive/
│       └── page.tsx      → /blog/archive`,
      },
      { type: "heading", id: "reserved-files", text: "Reserved file names" },
      {
        type: "paragraph",
        text: "Some file names have a special meaning inside a route folder:",
      },
      {
        type: "table",
        head: ["File", "Purpose"],
        rows: [
          ["`page.tsx`", "The UI that makes a route publicly accessible"],
          ["`layout.tsx`", "Shared UI that wraps a segment and its children"],
          ["`loading.tsx`", "Instant loading UI shown while a segment streams in"],
          ["`error.tsx`", "Error boundary for a segment"],
          ["`not-found.tsx`", "UI rendered when `notFound()` is called"],
        ],
      },
    ],
  },
  {
    slug: ["nextjs", "app-router", "dynamic-routes"],
    title: "Dynamic Routes",
    description:
      "Learn how to define dynamic route segments and handle catch-all parameters in nested application architectures.",
    readMinutes: 4,
    blocks: [
      {
        type: "callout",
        variant: "info",
        label: "Prerequisite Knowledge:",
        text: "In the App Router, dynamic segments allow segments of your URL path to be variable without relying on query parameters. Dynamic segments are evaluated at request time or pre-rendered at build time with `generateStaticParams()`.",
      },
      { type: "heading", id: "creating-the-segment-folder", text: "Creating the segment folder" },
      {
        type: "paragraph",
        text: "A Dynamic Segment can be created by wrapping a folder's name in square brackets: `[id]` or `[slug]`. For example, to handle an arbitrary project ID within Orbit, organize your app directory structure as follows:",
      },
      {
        type: "code",
        filename: "app/projects/[id]/page.tsx",
        language: "tsx",
        code: `export default function ProjectPage({ params }: { params: { id: string } }) {
  return (
    <section className="project-container">
      <h1>Active Project ID: {params.id}</h1>
    </section>
  );
}`,
      },
      { type: "heading", id: "accessing-route-parameters", text: "Accessing route parameters" },
      {
        type: "paragraph",
        text: "Dynamic segment values are passed as the `params` object inside the page, layout, and metadata generator functions. In asynchronous environments, you resolve or destructure this object directly from your component arguments.",
      },
      {
        type: "table",
        firstColumn: "path",
        head: ["Route Pattern", "Example URL", "Resolved Params"],
        rows: [
          ["app/blog/[slug]/page.js", "/blog/hello-world", "`{ slug: 'hello-world' }`"],
          [
            "app/shop/[category]/[item]/page.js",
            "/shop/shoes/boots",
            "`{ category: 'shoes', item: 'boots' }`",
          ],
        ],
      },
      {
        type: "heading",
        id: "handling-optional-catch-all-segments",
        text: "Handling optional catch-all segments",
      },
      {
        type: "paragraph",
        text: "When building docs systems or multi-level CMS trees, paths can vary in depth. Use double brackets `[[...slug]]` to make catch-all segments optional, matching both the root parent path and arbitrarily nested sub-paths.",
      },
      {
        type: "code",
        filename: "app/docs/[[...slug]]/page.tsx",
        language: "tsx",
        code: `type Props = {
  params: { slug?: string[] }
};

export default function DocsReader({ params }: Props) {
  const currentPath = params.slug ? params.slug.join('/') : 'index';
  return <article>Displaying documentation tree: {currentPath}</article>;
}`,
      },
      { type: "heading", id: "providing-fallback-behavior", text: "Providing fallback behavior" },
      {
        type: "paragraph",
        text: "When dynamic segments fail to resolve to a known record in your backend database or content source, trigger the standard `notFound()` boundary to render your application's customized `not-found.tsx` view immediately.",
      },
      {
        type: "callout",
        variant: "warning",
        label: "Safety Tip:",
        text: "Never serve un-sanitized dynamic route parameters directly into raw HTML or arbitrary queries. Always validate incoming params using schemas like Zod or Orbit Schema Validator before performing IO operations.",
      },
    ],
  },
  {
    slug: ["nextjs", "app-router", "parallel-intercepting"],
    title: "Parallel & Intercepting",
    description:
      "Render several pages in one layout at the same time, and show a route inside the current one without leaving it.",
    readMinutes: 6,
    blocks: [
      { type: "heading", id: "defining-a-slot", text: "Defining a slot" },
      {
        type: "paragraph",
        text: "Parallel routes are defined with named slots. A folder prefixed with `@` is a slot, and its content is passed to the parent layout as a prop instead of becoming a URL segment.",
      },
      {
        type: "code",
        filename: "app/dashboard",
        language: "text",
        code: `app/dashboard/
├── layout.tsx
├── page.tsx
├── @analytics/page.tsx
└── @team/page.tsx`,
      },
      { type: "heading", id: "rendering-slots", text: "Rendering slots" },
      {
        type: "paragraph",
        text: "The parent layout receives each slot alongside `children` and decides where to place it:",
      },
      {
        type: "code",
        filename: "app/dashboard/layout.tsx",
        language: "tsx",
        code: `export default function DashboardLayout({
  children,
  analytics,
  team,
}: {
  children: React.ReactNode;
  analytics: React.ReactNode;
  team: React.ReactNode;
}) {
  return (
    <>
      {children}
      {analytics}
      {team}
    </>
  );
}`,
      },
      { type: "heading", id: "intercepting-a-route", text: "Intercepting a route" },
      {
        type: "paragraph",
        text: "Intercepting routes load another route inside the current layout, for example to open a photo in a modal while keeping the gallery visible. Prefix the folder with `(.)` to intercept a sibling segment, or `(..)` to intercept one level up.",
      },
      {
        type: "callout",
        variant: "warning",
        label: "Safety Tip:",
        text: "A slot with no matching content renders `default.tsx`. Always add one, or a hard refresh on a nested URL will return a 404.",
      },
    ],
  },
];
