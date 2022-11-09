import type { NavigationFolderReference } from "./folder";
import type { NavigationNoteReference } from "./note-reference";

export default interface UserSpace {
  userSpaceID: string;
  content: {
    folders: NavigationFolderReference[];
    notes: NavigationNoteReference[];
  };
}
