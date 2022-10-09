import type { NoteReference } from "./note-reference";

export default interface Folder {
  folderID: string;
  parentID: string | null;
  name: string;
  createdTime: string;
  lastUpdatedTime: string;
  content: (Folder | NoteReference)[];
  numberOfItems: number;
}
