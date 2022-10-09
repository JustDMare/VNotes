import type { FolderSidebarReference } from "./folder";
import type { NoteSidebarReference } from "./note-reference";

export default interface Workspace {
  workspaceID: string;
  content: (FolderSidebarReference | NoteSidebarReference)[];
}
