import type { Note } from "@/types";

export default interface Folder {
  folderID: string;
  parentID: string;
  name: string;
  createdTime: string;
  lastUpdatedTime: string;
  notes: Note[];
  folders: Folder[];
  numberOfItems: number;
}
