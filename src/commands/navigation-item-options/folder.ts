import { useEventStore } from "@/stores/event";
import { NoteIcon } from "@/components/icons";
import type { NavigationItemOption } from "./interfaces";

export function getFolderOptions(folderId: string): NavigationItemOption[] {
  const eventStore = useEventStore();

  return [
    {
      name: "New sub-folder",
      icon: NoteIcon,
      action: () => {
        eventStore.openCreateAndRenameItemDialog("create-folder", folderId);
      },
    },
    {
      name: "New note",
      icon: NoteIcon,
      action: () => {
        eventStore.openCreateAndRenameItemDialog("create-note", folderId);
      },
    },
    {
      name: "Rename",
      icon: NoteIcon,
      action: () => {
        eventStore.openCreateAndRenameItemDialog("rename-folder", folderId);
      },
    },
    {
      name: "Delete",
      icon: NoteIcon,
      action: () => {
        console.log("Delete");
      },
    },
  ];
}
