import type { NoteReference } from "./note-reference";

export default interface Folder {
  folderID: string;
  parentID: string;
  name: string;
  createdTime: string;
  lastUpdatedTime: string;
  content: (Folder | NoteReference)[];
  numberOfItems: number;
}
