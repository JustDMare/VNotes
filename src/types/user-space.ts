import type { SidebarFolderReference } from "./folder";
import type { SidebarNoteReference } from "./note-reference";

export default interface UserSpace {
  userSpaceID: string;
  content: { folders: SidebarFolderReference[]; notes: SidebarNoteReference[] };
}
