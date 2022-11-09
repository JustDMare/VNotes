import type { Note } from "./editor";

export type NavigationNoteReference = Omit<
  Note,
  "content" | "createdTime" | "lastUpdatedTime"
>;
