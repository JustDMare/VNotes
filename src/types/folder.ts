import type { NavigationNoteReference } from "./note-reference";

export default interface Folder {
  folderID: string;
  parentID: string | null;
  name: string;
  createdTime: string;
  lastUpdatedTime: string;
  content: {
    folders: NavigationFolderReference[];
    notes: NavigationNoteReference[];
  };
  numberOfItems: number;
}

export type NavigationFolderReference = Omit<
  Folder,
  "createdTime" | "lastUpdatedTime"
>;
