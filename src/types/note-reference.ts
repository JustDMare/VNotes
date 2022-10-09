import type { Note } from "./editor";

export type SidebarNoteReference = Omit<
  Note,
  "content" | "createdTime" | "lastUpdatedTime"
>;
