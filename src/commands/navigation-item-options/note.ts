import { useEventStore } from "@/stores/event";
import { NoteIcon } from "@/components/icons";
import type { NavigationItemOption } from "./interfaces";

export function getNoteOptions(noteId: string): NavigationItemOption[] {
  const eventStore = useEventStore();

  return [
    {
      name: "Rename",
      icon: NoteIcon,
      action: () => {
        eventStore.openCreateAndRenameItemDialog("rename-note", noteId);
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
