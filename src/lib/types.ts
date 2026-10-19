/**
 * Content model for the documentation explorer.
 *
 * Text fields support a tiny inline markup so data stays plain strings:
 *   `code`          → inline code
 *   [label](/href)  → link
 * See components/content/inline-text.tsx.
 */

export type Collection = "docs" | "guides";

export type CalloutVariant = "info" | "warning";

export type NavIconName =
  | "enter"
  | "download"
  | "folder"
  | "route"
  | "layout"
  | "refresh"
  | "settings"
  | "terminal";

export type Block =
  | { type: "paragraph"; text: string }
  | { type: "heading"; id: string; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "callout"; variant: CalloutVariant; label: string; text: string }
  | { type: "code"; filename?: string; language?: CodeLanguage; code: string }
  | { type: "table"; head: string[]; rows: string[][]; firstColumn?: "path" };

export type CodeLanguage = "tsx" | "ts" | "bash" | "json" | "text";

/** A readable page. `slug` is the full path below its collection root. */
export interface Page {
  slug: string[];
  title: string;
  description: string;
  icon?: NavIconName;
  /** Shown as "Estimated read" on guides. */
  readMinutes?: number;
  blocks: Block[];
}

/** A folder in the content tree, e.g. "core-concepts" or "nextjs/app-router". */
export interface Group {
  title: string;
  description: string;
}

export interface OverviewCard {
  icon: NavIconName;
  title: string;
  text: string;
  cta: string;
  href: string;
}

export interface Overview {
  title: string;
  description: string;
  cards: OverviewCard[];
  callout: { label: string; text: string };
  quickSetup: { title: string; code: string };
}

export interface Crumb {
  label: string;
  href?: string;
}

export interface SearchEntry {
  title: string;
  href: string;
  /** Section label, e.g. "Core Concepts" or "Guides · App Router". */
  section: string;
  description: string;
  headings: string[];
  text: string;
}

export interface NavLink {
  title: string;
  href: string;
}

export interface NavItem extends NavLink {
  icon: NavIconName;
  /** Nested guides shown under this item while the Guides context is active. */
  guides?: NavLink[];
}

export interface NavSection {
  title: string;
  items: NavItem[];
}
