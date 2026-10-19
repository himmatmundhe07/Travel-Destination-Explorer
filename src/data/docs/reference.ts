import type { Page } from "@/lib/types";

export const reference: Page[] = [
  {
    slug: ["reference", "configuration"],
    title: "Configuration",
    description: "Every option accepted by `orbit.config.ts`, with types and defaults.",
    icon: "settings",
    blocks: [
      { type: "heading", id: "options", text: "Options" },
      {
        type: "table",
        head: ["Option", "Type", "Default"],
        rows: [
          ["`appDir`", "`string`", '`"app"`'],
          ["`trailingSlash`", "`boolean`", "`false`"],
          ["`strictRoutes`", "`boolean`", "`true`"],
          ["`output`", '`"server" | "static"`', '`"server"`'],
        ],
      },
      { type: "heading", id: "example", text: "Example" },
      {
        type: "code",
        filename: "orbit.config.ts",
        language: "ts",
        code: `import type { OrbitConfig } from "orbit";

const config: OrbitConfig = {
  appDir: "app",
  strictRoutes: true,
  output: "static",
};

export default config;`,
      },
      {
        type: "callout",
        variant: "info",
        label: "Convention Note:",
        text: "`orbit.config.ts` is evaluated at build time. Restart the dev server after changing it.",
      },
    ],
  },
  {
    slug: ["reference", "cli-commands"],
    title: "CLI Commands",
    description: "The commands available through `orbit-cli`.",
    icon: "terminal",
    blocks: [
      { type: "heading", id: "commands", text: "Commands" },
      {
        type: "table",
        head: ["Command", "Description"],
        rows: [
          ["`orbit create <name>`", "Scaffold a new project from a template"],
          ["`orbit dev`", "Start the development server with fast refresh"],
          ["`orbit build`", "Create an optimized production build"],
          ["`orbit start`", "Serve the production build"],
          ["`orbit verify --path <url>`", "Check a URL against the route manifest"],
          ["`orbit sync --manifest`", "Regenerate `orbit.routes.json`"],
        ],
      },
      { type: "heading", id: "verifying-routes", text: "Verifying routes" },
      {
        type: "paragraph",
        text: "When a page returns a 404 unexpectedly, `orbit verify` checks the path against the route manifest and reports why it did not match:",
      },
      {
        type: "code",
        filename: "Terminal",
        language: "bash",
        code: `$ orbit verify --path "/docs/routing/catch-all-param"
ERR_ROUTER_SLUG_UNMATCHED: No route matching slug segment in manifest tree.
> Suggested resolution: run orbit sync --manifest or inspect orbit.routes.json`,
      },
    ],
  },
];
