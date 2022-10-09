import type { NoteSidebarReference } from "./note-reference";

export default interface Folder {
  folderID: string;
  parentID: string | null;
  name: string;
  createdTime: string;
  lastUpdatedTime: string;
  content: (FolderSidebarReference | NoteSidebarReference)[];
  numberOfItems: number;
}

export type FolderSidebarReference = Omit<
  Folder,
  "createdTime" | "lastUpdatedTime"
>;
