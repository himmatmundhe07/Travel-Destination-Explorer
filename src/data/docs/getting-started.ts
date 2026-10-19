import type { Page } from "@/lib/types";

export const gettingStarted: Page[] = [
  {
    slug: ["getting-started", "installation"],
    title: "Installation",
    description: "Install the Orbit CLI and generate a new project in under a minute.",
    icon: "download",
    blocks: [
      { type: "heading", id: "prerequisites", text: "Prerequisites" },
      {
        type: "paragraph",
        text: "Orbit runs on any machine with a current Node.js runtime. Before you begin, make sure the following are available:",
      },
      {
        type: "list",
        items: [
          "Node.js 20.9 or later",
          "A package manager: `npm`, `pnpm`, or `yarn`",
          "A terminal that supports ANSI colors",
        ],
      },
      {
        type: "callout",
        variant: "info",
        label: "Version Check:",
        text: "Run `node --version` to confirm your runtime before continuing. Older versions fail with `ERR_UNSUPPORTED_RUNTIME`.",
      },
      { type: "heading", id: "create-a-project", text: "Create a project" },
      {
        type: "paragraph",
        text: "The Orbit CLI scaffolds a complete project from a template. Run it with `npx` so nothing needs to be installed globally:",
      },
      {
        type: "code",
        filename: "Terminal",
        language: "bash",
        code: `$ npx orbit-cli create my-app --template standard
$ cd my-app`,
      },
      { type: "heading", id: "choose-a-template", text: "Choose a template" },
      {
        type: "table",
        head: ["Template", "Best for", "Includes"],
        rows: [
          ["`standard`", "Most applications", "Routing, layouts, and data loading"],
          ["`minimal`", "Prototypes and experiments", "A single route and the dev server"],
          ["`docs`", "Documentation sites", "Sidebar navigation and search"],
        ],
      },
      { type: "heading", id: "start-the-dev-server", text: "Start the dev server" },
      {
        type: "paragraph",
        text: "Start the development server from inside the new project. It reloads automatically when you edit a file:",
      },
      {
        type: "code",
        filename: "Terminal",
        language: "bash",
        code: `$ npm run dev
> ready on http://localhost:3000`,
      },
    ],
  },
  {
    slug: ["getting-started", "project-setup"],
    title: "Project Setup",
    description: "Learn how a new Orbit project is organized and how to configure it.",
    icon: "folder",
    blocks: [
      { type: "heading", id: "project-structure", text: "Project structure" },
      {
        type: "paragraph",
        text: "A new project follows a predictable layout. Everything under `app/` is a route, and everything outside it is shared code:",
      },
      {
        type: "code",
        filename: "my-app",
        language: "text",
        code: `my-app/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── docs/
│       └── [[...slug]]/page.tsx
├── components/
├── orbit.config.ts
└── package.json`,
      },
      { type: "heading", id: "the-configuration-file", text: "The configuration file" },
      {
        type: "paragraph",
        text: "`orbit.config.ts` is the single place to change framework behavior. The defaults suit most projects, so the file starts nearly empty:",
      },
      {
        type: "code",
        filename: "orbit.config.ts",
        language: "ts",
        code: `import type { OrbitConfig } from "orbit";

const config: OrbitConfig = {
  appDir: "app",
  trailingSlash: false,
};

export default config;`,
      },
      { type: "heading", id: "environment-variables", text: "Environment variables" },
      {
        type: "paragraph",
        text: "Variables prefixed with `ORBIT_PUBLIC_` are exposed to the browser. Everything else stays on the server.",
      },
      {
        type: "callout",
        variant: "warning",
        label: "Safety Tip:",
        text: "Never prefix secrets with `ORBIT_PUBLIC_`. Prefixed variables are inlined into the client bundle at build time.",
      },
    ],
  },
];
