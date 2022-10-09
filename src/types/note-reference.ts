import type { Note } from "./editor";

export type NoteSidebarReference = Omit<
  Note,
  "content" | "createdTime" | "lastUpdatedTime"
>;
