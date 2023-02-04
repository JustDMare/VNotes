import { useEventStore } from "@/stores/event";
import { NoteIcon } from "@/components/icons";
import type { NavigationItemOption } from "./interfaces";
import { i18n } from "@/i18n/i18n.plugin";

export function getNoteOptions(noteId: string): NavigationItemOption[] {
  const eventStore = useEventStore();
  const t = i18n.global.t;
  return [
    {
      name: t("navigationItemOptions.rename"),
      icon: NoteIcon,
      action: () => {
        eventStore.openRenameItemDialog("rename-note", noteId);
      },
    },
    {
      name: t("navigationItemOptions.delete"),
      icon: NoteIcon,
      action: () => {
        console.log("Delete");
      },
    },
  ];
}
