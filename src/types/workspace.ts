import type { SidebarFolderReference } from "./folder";
import type { SidebarNoteReference } from "./note-reference";

export default interface Workspace {
  workspaceID: string;
  content: { folders: SidebarFolderReference[]; notes: SidebarNoteReference[] };
}
