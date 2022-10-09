import type { SidebarNoteReference } from "./note-reference";

export default interface Folder {
  folderID: string;
  parentID: string | null;
  name: string;
  createdTime: string;
  lastUpdatedTime: string;
  content: { folders: SidebarFolderReference[]; notes: SidebarNoteReference[] };
  numberOfItems: number;
}

export type SidebarFolderReference = Omit<
  Folder,
  "createdTime" | "lastUpdatedTime"
>;
