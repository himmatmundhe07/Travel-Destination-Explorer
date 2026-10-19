import type { Page } from "@/lib/types";
import { coreConcepts } from "./core-concepts";
import { gettingStarted } from "./getting-started";
import { reference } from "./reference";

/** Reading order: sidebar order and previous/next links both follow this list. */
export const docsPages: Page[] = [...gettingStarted, ...coreConcepts, ...reference];
