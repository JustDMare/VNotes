import type Folder from "./folder";
import type { NoteReference } from "./note-reference";

export default interface Workspace {
  workspaceID: string;
  rootFolders: Folder[];
  rootNotes: NoteReference[];
}
