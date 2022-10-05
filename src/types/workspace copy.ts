import type Folder from "./folder";
import type { NoteReference } from "./note-reference";

export default interface WorkspaceWithTree {
  workspaceID: string;
  rootFolders: Folder[];
  rootNotes: NoteReference[];
}
