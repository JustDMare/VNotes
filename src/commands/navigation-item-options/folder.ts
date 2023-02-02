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
        eventStore.openCreateItemDialog("create-folder", folderId);
      },
    },
    {
      name: "New note",
      icon: NoteIcon,
      action: () => {
        eventStore.openCreateItemDialog("create-note", folderId);
      },
    },
    {
      name: "Rename",
      icon: NoteIcon,
      action: () => {
        eventStore.openRenameItemDialog("rename-folder", folderId);
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
